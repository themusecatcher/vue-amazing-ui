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
  useAttrs,
  useSlots,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-EJFAB46I.js";
import {
  __publicField
} from "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/toDate.mjs
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    return new Date(argument);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/constructFrom.mjs
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addDays.mjs
function addDays(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addMonths.mjs
function addMonths(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  const dayOfMonth = _date.getDate();
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
    return _date;
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/add.mjs
function add(date, duration) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const _date = toDate(date);
  const dateWithMonths = months || years ? addMonths(_date, months + years * 12) : _date;
  const dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1e3;
  const finalDate = constructFrom(date, dateWithDays.getTime() + msToAdd);
  return finalDate;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addMilliseconds.mjs
function addMilliseconds(date, amount) {
  const timestamp = +toDate(date);
  return constructFrom(date, timestamp + amount);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/constants.mjs
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addHours.mjs
function addHours(date, amount) {
  return addMilliseconds(date, amount * millisecondsInHour);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/defaultOptions.mjs
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfWeek.mjs
function startOfWeek(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfISOWeek.mjs
function startOfISOWeek(date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getISOWeekYear.mjs
function getISOWeekYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfDay.mjs
function startOfDay(date) {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/differenceInCalendarDays.mjs
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = startOfDay(dateLeft);
  const startOfDayRight = startOfDay(dateRight);
  const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfISOWeekYear.mjs
function startOfISOWeekYear(date) {
  const year = getISOWeekYear(date);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addQuarters.mjs
function addQuarters(date, amount) {
  const months = amount * 3;
  return addMonths(date, months);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addYears.mjs
function addYears(date, amount) {
  return addMonths(date, amount * 12);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/compareAsc.mjs
function compareAsc(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const diff = _dateLeft.getTime() - _dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isDate.mjs
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isValid.mjs
function isValid(date) {
  if (!isDate(date) && typeof date !== "number") {
    return false;
  }
  const _date = toDate(date);
  return !isNaN(Number(_date));
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getQuarter.mjs
function getQuarter(date) {
  const _date = toDate(date);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/differenceInCalendarYears.mjs
function differenceInCalendarYears(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  return _dateLeft.getFullYear() - _dateRight.getFullYear();
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/differenceInYears.mjs
function differenceInYears(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const sign = compareAsc(_dateLeft, _dateRight);
  const difference = Math.abs(differenceInCalendarYears(_dateLeft, _dateRight));
  _dateLeft.setFullYear(1584);
  _dateRight.setFullYear(1584);
  const isLastYearNotFull = compareAsc(_dateLeft, _dateRight) === -sign;
  const result = sign * (difference - +isLastYearNotFull);
  return result === 0 ? 0 : result;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/eachDayOfInterval.mjs
function eachDayOfInterval(interval, options) {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);
  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startDate : +endDate;
  const currentDate = reversed ? endDate : startDate;
  currentDate.setHours(0, 0, 0, 0);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+currentDate <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return reversed ? dates.reverse() : dates;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfQuarter.mjs
function startOfQuarter(date) {
  const _date = toDate(date);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3;
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/eachQuarterOfInterval.mjs
function eachQuarterOfInterval(interval, options) {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);
  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startOfQuarter(startDate) : +startOfQuarter(endDate);
  let currentDate = reversed ? startOfQuarter(endDate) : startOfQuarter(startDate);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+currentDate <= endTime) {
    dates.push(toDate(currentDate));
    currentDate = addQuarters(currentDate, step);
  }
  return reversed ? dates.reverse() : dates;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfMonth.mjs
function startOfMonth(date) {
  const _date = toDate(date);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/endOfYear.mjs
function endOfYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfYear.mjs
function startOfYear(date) {
  const cleanDate = toDate(date);
  const _date = constructFrom(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/endOfWeek.mjs
function endOfWeek(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/endOfQuarter.mjs
function endOfQuarter(date) {
  const _date = toDate(date);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3 + 3;
  _date.setMonth(month, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs
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
var formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options == null ? void 0 : options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/formatLong.mjs
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

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/localize.mjs
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
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
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
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
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
    argumentCallback: (quarter) => quarter - 1
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

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/_lib/buildMatchFn.mjs
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/match.mjs
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
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
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
    valueCallback: (value) => parseInt(value, 10)
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
    valueCallback: (index) => index + 1
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

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US.mjs
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getDayOfYear.mjs
function getDayOfYear(date) {
  const _date = toDate(date);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getISOWeek.mjs
function getISOWeek(date) {
  const _date = toDate(date);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getWeekYear.mjs
function getWeekYear(date, options) {
  var _a2, _b, _c, _d;
  const _date = toDate(date);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const firstWeekOfNextYear = constructFrom(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfWeekYear.mjs
function startOfWeekYear(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getWeek.mjs
function getWeek(date, options) {
  const _date = toDate(date);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/addLeadingZeros.mjs
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/format/lightFormatters.mjs
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
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
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/format/formatters.mjs
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
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
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
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
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
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
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
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
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
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
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
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
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
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
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
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
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
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
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
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
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
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
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
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
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
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
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
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
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
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
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
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
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
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    const timestamp = date.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/format/longFormatters.mjs
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/protectedTokens.mjs
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/format.mjs
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  var _a2, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e2 = options == null ? void 0 : options.locale) == null ? void 0 : _e2.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  const originalDate = toDate(date);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token) || !(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getDay.mjs
function getDay(date) {
  const _date = toDate(date);
  const day = _date.getDay();
  return day;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getDaysInMonth.mjs
function getDaysInMonth(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth2 = constructFrom(date, 0);
  lastDayOfMonth2.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth2.setHours(0, 0, 0, 0);
  return lastDayOfMonth2.getDate();
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getDefaultOptions.mjs
function getDefaultOptions2() {
  return Object.assign({}, getDefaultOptions());
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getHours.mjs
function getHours(date) {
  const _date = toDate(date);
  const hours = _date.getHours();
  return hours;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getISODay.mjs
function getISODay(date) {
  const _date = toDate(date);
  let day = _date.getDay();
  if (day === 0) {
    day = 7;
  }
  return day;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getMinutes.mjs
function getMinutes(date) {
  const _date = toDate(date);
  const minutes = _date.getMinutes();
  return minutes;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getMonth.mjs
function getMonth(date) {
  const _date = toDate(date);
  const month = _date.getMonth();
  return month;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getSeconds.mjs
function getSeconds(date) {
  const _date = toDate(date);
  const seconds = _date.getSeconds();
  return seconds;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getYear.mjs
function getYear(date) {
  return toDate(date).getFullYear();
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isAfter.mjs
function isAfter(date, dateToCompare) {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return _date.getTime() > _dateToCompare.getTime();
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isBefore.mjs
function isBefore(date, dateToCompare) {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return +_date < +_dateToCompare;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isEqual.mjs
function isEqual(leftDate, rightDate) {
  const _dateLeft = toDate(leftDate);
  const _dateRight = toDate(rightDate);
  return +_dateLeft === +_dateRight;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/transpose.mjs
function transpose(fromDate, constructor) {
  const date = constructor instanceof Date ? constructFrom(constructor, 0) : new constructor(0);
  date.setFullYear(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  );
  date.setHours(
    fromDate.getHours(),
    fromDate.getMinutes(),
    fromDate.getSeconds(),
    fromDate.getMilliseconds()
  );
  return date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/Setter.mjs
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = class {
  constructor() {
    __publicField(this, "subPriority", 0);
  }
  validate(_utcDate, _options) {
    return true;
  }
};
var ValueSetter = class extends Setter {
  constructor(value, validateValue, setValue, priority, subPriority) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }
  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }
  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
};
var DateToSystemTimezoneSetter = class extends Setter {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", TIMEZONE_UNIT_PRIORITY);
    __publicField(this, "subPriority", -1);
  }
  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return constructFrom(date, transpose(date, Date));
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/Parser.mjs
var Parser = class {
  run(dateString, token, match2, options) {
    const result = this.parse(dateString, token, match2, options);
    if (!result) {
      return null;
    }
    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: result.rest
    };
  }
  validate(_utcDate, _value, _options) {
    return true;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/EraParser.mjs
var EraParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 140);
    __publicField(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
      case "GGGGG":
        return match2.era(dateString, { width: "narrow" });
      case "GGGG":
      default:
        return match2.era(dateString, { width: "wide" }) || match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
    }
  }
  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/constants.mjs
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

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/utils.mjs
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
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
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
  const isCommonEra = currentYear > 0;
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/YearParser.mjs
var YearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy"
    });
    switch (token) {
      case "y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value) {
    const currentYear = date.getFullYear();
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.mjs
var LocalWeekYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY"
    });
    switch (token) {
      case "Y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "Yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options);
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate
      );
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return startOfWeek(date, options);
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.mjs
var ISOWeekYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token) {
    if (token === "R") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return startOfISOWeek(firstWeekOfYear);
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.mjs
var ExtendedYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token) {
    if (token === "u") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/QuarterParser.mjs
var QuarterParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "Q":
      case "QQ":
        return parseNDigits(token.length, dateString);
      case "Qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
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
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.mjs
var StandAloneQuarterParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "q":
      case "qq":
        return parseNDigits(token.length, dateString);
      case "qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
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
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/MonthParser.mjs
var MonthParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    __publicField(this, "priority", 110);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      case "M":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      case "MM":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "Mo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      case "MMM":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return match2.month(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return match2.month(dateString, { width: "wide", context: "formatting" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.mjs
var StandAloneMonthParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 110);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      case "L":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      case "LL":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "Lo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      case "LLL":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return match2.month(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return match2.month(dateString, { width: "wide", context: "standalone" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setWeek.mjs
function setWeek(date, week, options) {
  const _date = toDate(date);
  const diff = getWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.mjs
var LocalWeekParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "w":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "wo":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options);
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setISOWeek.mjs
function setISOWeek(date, week) {
  const _date = toDate(date);
  const diff = getISOWeek(_date) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.mjs
var ISOWeekParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "I":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "Io":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value));
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/DateParser.mjs
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
var DateParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subPriority", 1);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "d":
        return parseNumericPattern(numericPatterns.date, dateString);
      case "do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear2 = isLeapYearIndex(year);
    const month = date.getMonth();
    if (isLeapYear2) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }
  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.mjs
var DayOfYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subpriority", 1);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "D":
      case "DD":
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      case "Do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear2 = isLeapYearIndex(year);
    if (isLeapYear2) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }
  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setDay.mjs
function setDay(date, day, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const currentDay = _date.getDay();
  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;
  const delta = 7 - weekStartsOn;
  const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(_date, diff);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/DayParser.mjs
var DayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/LocalDayParser.mjs
var LocalDayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      case "e":
      case "ee":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      case "eo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      case "eee":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "eeeee":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.mjs
var StandAloneLocalDayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      case "c":
      case "cc":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      case "co":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      case "ccc":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      case "ccccc":
        return match2.day(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return match2.day(dateString, { width: "wide", context: "standalone" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setISODay.mjs
function setISODay(date, day) {
  const _date = toDate(date);
  const currentDay = getISODay(_date);
  const diff = day - currentDay;
  return addDays(_date, diff);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISODayParser.mjs
var ISODayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => {
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
        return match2.ordinalNumber(dateString, { unit: "day" });
      case "iii":
        return mapValue(
          match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiiii":
        return mapValue(
          match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiiiii":
        return mapValue(
          match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiii":
      default:
        return mapValue(
          match2.day(dateString, {
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
          }),
          valueCallback
        );
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 7;
  }
  set(date, _flags, value) {
    date = setISODay(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/AMPMParser.mjs
var AMPMParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
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
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.mjs
var AMPMMidnightParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
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
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.mjs
var DayPeriodParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(dateString, token, match2) {
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
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.mjs
var Hour1to12Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "h":
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      case "ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 12;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.mjs
var Hour0to23Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "H":
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      case "Ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 23;
  }
  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.mjs
var Hour0To11Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "K":
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      case "Ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.mjs
var Hour1To24Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "k":
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      case "ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 24;
  }
  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/MinuteParser.mjs
var MinuteParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 60);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "m":
        return parseNumericPattern(numericPatterns.minute, dateString);
      case "mo":
        return match2.ordinalNumber(dateString, { unit: "minute" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/SecondParser.mjs
var SecondParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 50);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "s":
        return parseNumericPattern(numericPatterns.second, dateString);
      case "so":
        return match2.ordinalNumber(dateString, { unit: "second" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.mjs
var FractionOfSecondParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 30);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token) {
    const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3));
    return mapValue(parseNDigits(token.length, dateString), valueCallback);
  }
  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.mjs
var ISOTimezoneWithZParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(dateString, token) {
    switch (token) {
      case "X":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "XX":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "XXXX":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "XXXXX":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "XXX":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.mjs
var ISOTimezoneParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(dateString, token) {
    switch (token) {
      case "x":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "xx":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "xxxx":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "xxxxx":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "xxx":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.mjs
var TimestampSecondsParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 40);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value * 1e3), { timestampIsSet: true }];
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.mjs
var TimestampMillisecondsParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 20);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }];
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers.mjs
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

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse.mjs
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dateStr, formatStr, referenceDate, options) {
  var _a2, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions2();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e2 = options == null ? void 0 : options.locale) == null ? void 0 : _e2.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (formatStr === "") {
    if (dateStr === "") {
      return toDate(referenceDate);
    } else {
      return constructFrom(referenceDate, NaN);
    }
  }
  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  const setters = [new DateToSystemTimezoneSetter()];
  const tokens = formatStr.match(longFormattingTokensRegExp2).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter in longFormatters) {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp2);
  const usedTokens = [];
  for (let token of tokens) {
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    if (!(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    const firstCharacter = token[0];
    const parser = parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`
        );
      }
      usedTokens.push({ token: firstCharacter, fullToken: token });
      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions
      );
      if (!parseResult) {
        return constructFrom(referenceDate, NaN);
      }
      setters.push(parseResult.setter);
      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString2(token);
      }
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return constructFrom(referenceDate, NaN);
      }
    }
  }
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return constructFrom(referenceDate, NaN);
  }
  const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index, array) => array.indexOf(priority) === index).map(
    (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
  ).map((setterArray) => setterArray[0]);
  let date = toDate(referenceDate);
  if (isNaN(date.getTime())) {
    return constructFrom(referenceDate, NaN);
  }
  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return constructFrom(referenceDate, NaN);
    }
    const result = setter.set(date, flags, subFnOptions);
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
    } else {
      date = result;
    }
  }
  return constructFrom(referenceDate, date);
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isSameQuarter.mjs
function isSameQuarter(dateLeft, dateRight) {
  const dateLeftStartOfQuarter = startOfQuarter(dateLeft);
  const dateRightStartOfQuarter = startOfQuarter(dateRight);
  return +dateLeftStartOfQuarter === +dateRightStartOfQuarter;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/subDays.mjs
function subDays(date, amount) {
  return addDays(date, -amount);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setMonth.mjs
function setMonth(date, month) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const day = _date.getDate();
  const dateWithDesiredMonth = constructFrom(date, 0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/set.mjs
function set(date, values) {
  let _date = toDate(date);
  if (isNaN(+_date)) {
    return constructFrom(date, NaN);
  }
  if (values.year != null) {
    _date.setFullYear(values.year);
  }
  if (values.month != null) {
    _date = setMonth(_date, values.month);
  }
  if (values.date != null) {
    _date.setDate(values.date);
  }
  if (values.hours != null) {
    _date.setHours(values.hours);
  }
  if (values.minutes != null) {
    _date.setMinutes(values.minutes);
  }
  if (values.seconds != null) {
    _date.setSeconds(values.seconds);
  }
  if (values.milliseconds != null) {
    _date.setMilliseconds(values.milliseconds);
  }
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setHours.mjs
function setHours(date, hours) {
  const _date = toDate(date);
  _date.setHours(hours);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setMilliseconds.mjs
function setMilliseconds(date, milliseconds) {
  const _date = toDate(date);
  _date.setMilliseconds(milliseconds);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setMinutes.mjs
function setMinutes(date, minutes) {
  const _date = toDate(date);
  _date.setMinutes(minutes);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setSeconds.mjs
function setSeconds(date, seconds) {
  const _date = toDate(date);
  _date.setSeconds(seconds);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setYear.mjs
function setYear(date, year) {
  const _date = toDate(date);
  if (isNaN(+_date)) {
    return constructFrom(date, NaN);
  }
  _date.setFullYear(year);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/subMonths.mjs
function subMonths(date, amount) {
  return addMonths(date, -amount);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/sub.mjs
function sub(date, duration) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const dateWithoutMonths = subMonths(date, months + years * 12);
  const dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
  const minutestoSub = minutes + hours * 60;
  const secondstoSub = seconds + minutestoSub * 60;
  const mstoSub = secondstoSub * 1e3;
  const finalDate = constructFrom(date, dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/subYears.mjs
function subYears(date, amount) {
  return addYears(date, -amount);
}

// node_modules/.pnpm/@vuepic+vue-datepicker@9.0.2_vue@3.4.38_typescript@5.5.4_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Et() {
  const e = useAttrs();
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img",
      ...e
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
Et.compatConfig = {
  MODE: 3
};
function Mn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
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
Mn.compatConfig = {
  MODE: 3
};
function za() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
za.compatConfig = {
  MODE: 3
};
function Ha() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
Ha.compatConfig = {
  MODE: 3
};
function Ua() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
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
Ua.compatConfig = {
  MODE: 3
};
function Va() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Va.compatConfig = {
  MODE: 3
};
function Wa() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Wa.compatConfig = {
  MODE: 3
};
var qe = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var ja = (e, t, l) => {
  const a = Na(e, t, l);
  return a || K();
};
var fl = (e, t, l) => {
  const a = t.dateInTz ? qe(new Date(e), t.dateInTz) : K(e);
  return l ? Ge(a, true) : a;
};
var Na = (e, t, l) => {
  if (!e) return null;
  const a = l ? Ge(K(e), true) : K(e);
  return t ? t.exactMatch ? fl(e, t, l) : qe(a, t.timezone) : a;
};
var vl = (e) => {
  if (!e) return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), a = new Date(t.toLocaleString("en-US", { timeZone: e })), n = a.getTimezoneOffset() / 60;
  return (+l - +a) / (1e3 * 60 * 60) - n;
};
var nt = ((e) => (e.month = "month", e.year = "year", e))(nt || {});
var Mt = ((e) => (e.top = "top", e.bottom = "bottom", e))(Mt || {});
var Tt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Tt || {});
var He = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
var ml = ["timestamp", "date", "iso"];
var je = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(je || {});
var Pe = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Pe || {});
function ln(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function pl(e) {
  return (t) => format(qe(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var yl = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(pl(e));
    } catch {
      n = a.map(ln(t));
    }
  else
    n = a.map(ln(t));
  const i = n.slice(0, l), c = n.slice(l + 1, n.length);
  return [n[l]].concat(...c).concat(...i);
};
var Ka = (e, t, l) => {
  const a = [];
  for (let n = +e[0]; n <= +e[1]; n++)
    a.push({ value: +n, text: Sn(n, t) });
  return l ? a.reverse() : a;
};
var $n = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    const c = i < 10 ? `0${i}` : i;
    return /* @__PURE__ */ new Date(`2017-${c}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const i = l === "long" ? "LLLL" : "LLL";
      return a.map((c, w) => {
        const f = format(qe(c, "UTC"), i, { locale: e });
        return {
          text: f.charAt(0).toUpperCase() + f.substring(1),
          value: w
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return a.map((i, c) => {
    const w = n.format(i);
    return {
      text: w.charAt(0).toUpperCase() + w.substring(1),
      value: c
    };
  });
};
var gl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var hl = (e) => ({ type: "dot", ...e ?? {} });
var An = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ga = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ye = (e) => e;
var rn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var on = (e) => e === null;
var Tn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var bl = (e) => {
  const t = [], l = (a) => a.filter((n) => n);
  for (let a = 0; a < e.length; a += 3) {
    const n = [e[a], e[a + 1], e[a + 2]];
    t.push(l(n));
  }
  return t;
};
var Gt = (e, t, l) => {
  const a = l != null, n = t != null;
  if (!a && !n) return false;
  const i = +l, c = +t;
  return a && n ? +e > i || +e < c : a ? +e > i : n ? +e < c : false;
};
var Yt = (e, t) => bl(e).map((l) => l.map((a) => {
  const { active: n, disabled: i, isBetween: c, highlighted: w } = t(a);
  return {
    ...a,
    active: n,
    disabled: i,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: i,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: i && n,
      dp__cell_in_between: c,
      "dp--highlighted": w
    }
  };
}));
var yt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var kl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function wl(e, t) {
  let l = [...document.querySelectorAll(kl())];
  l = l.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = l.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= l.length))
    return l[a + (t ? -1 : 1)];
}
var Ea = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Sn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Qa = (e) => format(e, "dd-MM-yyyy");
var $a = (e) => Array.isArray(e);
var sa = (e, t) => t.get(Qa(e));
var Dl = (e, t) => e ? t ? t instanceof Map ? !!sa(e, t) : t(K(e)) : false : true;
var Ke = (e, t, l = false, a) => {
  if (e.key === Pe.enter || e.key === Pe.space)
    return l && e.preventDefault(), t();
  if (a) return a(e);
};
var sn = () => ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].some(
  (e) => navigator.userAgent.includes(e)
) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
var un = (e, t, l, a, n, i) => {
  const c = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: i });
  return isValid(c) && isDate(c) ? a || n ? c : set(c, {
    hours: +l.hours,
    minutes: +(l == null ? void 0 : l.minutes),
    seconds: +(l == null ? void 0 : l.seconds),
    milliseconds: 0
  }) : null;
};
var Ml = (e, t, l, a, n, i) => {
  const c = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return un(e, t, c, a, n, i);
  if (Array.isArray(t)) {
    let w = null;
    for (const f of t)
      if (w = un(e, f, c, a, n, i), w)
        break;
    return w;
  }
  return typeof t == "function" ? t(e) : null;
};
var K = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var $l = (e, t, l) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), i = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), w = e.getMinutes().toString().padStart(2, "0"), f = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${i}T${c}:${w}:${f}.000Z`;
  }
  const a = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(a).toISOString();
};
var Ge = (e, t) => {
  const l = K(JSON.parse(JSON.stringify(e))), a = set(l, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(a) : a;
};
var gt = (e, t, l, a) => {
  let n = e ? K(e) : K();
  return (t || t === 0) && (n = setHours(n, +t)), (l || l === 0) && (n = setMinutes(n, +l)), (a || a === 0) && (n = setSeconds(n, +a)), setMilliseconds(n, 0);
};
var Oe = (e, t) => !e || !t ? false : isBefore(Ge(e), Ge(t));
var Me = (e, t) => !e || !t ? false : isEqual(Ge(e), Ge(t));
var Be = (e, t) => !e || !t ? false : isAfter(Ge(e), Ge(t));
var da = (e, t, l) => e != null && e[0] && (e != null && e[1]) ? Be(l, e[0]) && Oe(l, e[1]) : e != null && e[0] && t ? Be(l, e[0]) && Oe(l, t) || Oe(l, e[0]) && Be(l, t) : false;
var lt = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Ge(t);
};
var Aa = (e, t, l) => t && (l || l === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a) => a === t ? [a, l] : [a, isNaN(+e[a]) ? void 0 : +e[a]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var St = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Pn = (e, t) => {
  if (t) {
    const l = getYear(K(t));
    if (l > e) return 12;
    if (l === e) return getMonth(K(t));
  }
};
var Rn = (e, t) => {
  if (t) {
    const l = getYear(K(t));
    return l < e ? -1 : l === e ? getMonth(K(t)) : void 0;
  }
};
var It = (e) => {
  if (e) return getYear(K(e));
};
var Cn = (e, t) => {
  const l = Be(e, t) ? t : e, a = Be(t, e) ? t : e;
  return eachDayOfInterval({ start: l, end: a });
};
var Al = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var it = (e, t) => {
  const l = startOfWeek(e, { weekStartsOn: +t }), a = endOfWeek(e, { weekStartsOn: +t });
  return [l, a];
};
var On = (e, t) => {
  const l = {
    hours: getHours(K()),
    minutes: getMinutes(K()),
    seconds: t ? getSeconds(K()) : 0
  };
  return Object.assign(l, e);
};
var pt = (e, t, l) => [set(K(e), { date: 1 }), set(K(), { month: t, year: l, date: 1 })];
var dt = (e, t, l) => {
  let a = e ? K(e) : K();
  return (t || t === 0) && (a = setMonth(a, t)), l && (a = setYear(a, l)), a;
};
var _n = (e, t, l, a, n) => {
  if (!a || n && !t || !n && !l) return false;
  const i = n ? addMonths(e, 1) : subMonths(e, 1), c = [getMonth(i), getYear(i)];
  return n ? !Sl(...c, t) : !Tl(...c, l);
};
var Tl = (e, t, l) => Oe(...pt(l, e, t)) || Me(...pt(l, e, t));
var Sl = (e, t, l) => Be(...pt(l, e, t)) || Me(...pt(l, e, t));
var Bn = (e, t, l, a, n, i, c) => {
  if (typeof t == "function" && !c) return t(e);
  const w = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], i, w)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], i, w) : ""}` : format(e, i, w);
};
var Rt = (e) => {
  if (e) return null;
  throw new Error(Ga.prop("partial-range"));
};
var ta = (e, t) => {
  if (t) return e();
  throw new Error(Ga.prop("range"));
};
var Fa = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Pl = (e, t) => set(t ?? K(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Ta = (e, t, l, a) => {
  if (!e) return true;
  if (a) {
    const n = l === "max" ? isBefore(e, t) : isAfter(e, t), i = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e, i), set(t, i));
  }
  return l === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Sa = (e, t, l) => e ? Pl(e, t) : K(l ?? t);
var dn = (e, t, l, a, n) => {
  if (Array.isArray(a)) {
    const c = Sa(e, a[0], t), w = Sa(e, a[1], t);
    return Ta(a[0], c, l, !!t) && Ta(a[1], w, l, !!t) && n;
  }
  const i = Sa(e, a, t);
  return Ta(a, i, l, !!t) && n;
};
var Pa = (e) => set(K(), St(e));
var Rl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(K(l)) === t).map((l) => getMonth(l)) : [];
var Yn = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((a) => a.month === t && a.year === l);
var qa = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var In = (e) => format(e, "yyyy-MM-dd");
var Ht = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Nn = () => {
  const e = (a) => {
    Ht.menuFocused = a;
  }, t = (a) => {
    Ht.shiftKeyInMenu !== a && (Ht.shiftKeyInMenu = a);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Ht.shiftKeyInMenu, menuFocused: Ht.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Se = reactive({
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
var Ra = ref(null);
var aa = ref(false);
var Ca = ref(false);
var Oa = ref(false);
var _a = ref(false);
var ze = ref(0);
var _e = ref(0);
var bt = () => {
  const e = computed(() => aa.value ? [...Se.selectionGrid, Se.actionRow].filter((v) => v.length) : Ca.value ? [
    ...Se.timePicker[0],
    ...Se.timePicker[1],
    _a.value ? [] : [Ra.value],
    Se.actionRow
  ].filter((v) => v.length) : Oa.value ? [...Se.monthPicker, Se.actionRow] : [Se.monthYear, ...Se.calendar, Se.time, Se.actionRow].filter((v) => v.length)), t = (v) => {
    ze.value = v ? ze.value + 1 : ze.value - 1;
    let O = null;
    e.value[_e.value] && (O = e.value[_e.value][ze.value]), !O && e.value[_e.value + (v ? 1 : -1)] ? (_e.value = _e.value + (v ? 1 : -1), ze.value = v ? 0 : e.value[_e.value].length - 1) : O || (ze.value = v ? ze.value - 1 : ze.value + 1);
  }, l = (v) => {
    if (_e.value === 0 && !v || _e.value === e.value.length && v) return;
    _e.value = v ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][ze.value] && ze.value !== 0 && (ze.value = e.value[_e.value].length - 1) : _e.value = v ? _e.value - 1 : _e.value + 1;
  }, a = (v) => {
    let O = null;
    e.value[_e.value] && (O = e.value[_e.value][ze.value]), O ? O.focus({ preventScroll: !aa.value }) : ze.value = v ? ze.value - 1 : ze.value + 1;
  }, n = () => {
    t(true), a(true);
  }, i = () => {
    t(false), a(false);
  }, c = () => {
    l(false), a(true);
  }, w = () => {
    l(true), a(true);
  }, f = (v, O) => {
    Se[O] = v;
  }, F = (v, O) => {
    Se[O] = v;
  }, p = () => {
    ze.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: f,
    buildMultiLevelMatrix: F,
    setTimePickerBackRef: (v) => {
      Ra.value = v;
    },
    setSelectionGrid: (v) => {
      aa.value = v, p(), v || (Se.selectionGrid = []);
    },
    setTimePicker: (v, O = false) => {
      Ca.value = v, _a.value = O, p(), v || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (v, O = 0) => {
      Se.timePicker[O] = v;
    },
    arrowRight: n,
    arrowLeft: i,
    arrowUp: c,
    arrowDown: w,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], aa.value = false, Ca.value = false, _a.value = false, Oa.value = false, p(), Ra.value = null;
    },
    setMonthPicker: (v) => {
      Oa.value = v, p();
    },
    refSets: Se
    // exposed for testing
  };
};
var cn = (e) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e ?? {}
});
var Cl = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (t) => `Increment ${t}`,
  decrementValue: (t) => `Decrement ${t}`,
  openTpOverlay: (t) => `Open ${t} overlay`,
  amPmButton: "Switch AM/PM mode",
  openYearsOverlay: "Open years overlay",
  openMonthsOverlay: "Open months overlay",
  nextMonth: "Next month",
  prevMonth: "Previous month",
  nextYear: "Next year",
  prevYear: "Previous year",
  day: void 0,
  weekDay: void 0,
  clearInput: "Clear value",
  calendarIcon: "Calendar icon",
  timePicker: "Time picker",
  monthPicker: (t) => `Month picker${t ? " overlay" : ""}`,
  yearPicker: (t) => `Year picker${t ? " overlay" : ""}`,
  timeOverlay: (t) => `${t} overlay`,
  ...e ?? {}
});
var fn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Ol = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e) return { ...l, count: fn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, i = fn(n);
  return Object.assign(l, a, { count: i });
};
var _l = (e, t, l) => e || (typeof l == "string" ? l : t);
var Bl = (e) => typeof e == "boolean" ? e ? cn({}) : false : cn(e);
var Yl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: "open",
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Il = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Nl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var El = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Fl = (e) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0,
  tabOutClosesMenu: true,
  arrowLeft: void 0,
  keepViewOnOffsetClick: false,
  timeArrowHoldThreshold: 0,
  shadowDom: false
}, ...e ?? {} });
var Ll = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((l) => K(l)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var zl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Hl = (e) => {
  const t = {
    noDisabledRange: false,
    showLastInRange: true,
    minMaxRawRange: false,
    partialRange: true,
    disableTimeRangeValidation: false,
    maxRange: void 0,
    minRange: void 0,
    autoRange: void 0,
    fixedStart: false,
    fixedEnd: false
  };
  return typeof e == "object" ? { enabled: true, ...t, ...e } : {
    enabled: e,
    ...t
  };
};
var Ul = (e) => e ? typeof e == "string" ? {
  timezone: e,
  exactMatch: false,
  dateInTz: void 0,
  emitTimezone: void 0,
  convertModel: true
} : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: e.emitTimezone ?? void 0,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: void 0 };
var Ba = (e, t, l) => new Map(
  e.map((a) => {
    const n = ja(a, t, l);
    return [Qa(n), n];
  })
);
var Vl = (e, t) => e.length ? new Map(
  e.map((l) => {
    const a = ja(l.date, t);
    return [Qa(a), l];
  })
) : null;
var Wl = (e) => {
  var t;
  return {
    minDate: Na(e.minDate, e.timezone, e.isSpecific),
    maxDate: Na(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: $a(e.disabledDates) ? Ba(e.disabledDates, e.timezone, e.isSpecific) : e.disabledDates,
    allowedDates: $a(e.allowedDates) ? Ba(e.allowedDates, e.timezone, e.isSpecific) : null,
    highlight: typeof e.highlight == "object" && $a((t = e.highlight) == null ? void 0 : t.dates) ? Ba(e.highlight.dates, e.timezone) : e.highlight,
    markers: Vl(e.markers, e.timezone)
  };
};
var jl = (e) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: null } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Kl = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((l) => {
      const a = l, n = e[a], i = typeof e[a] == "string" ? { [n]: true } : Object.fromEntries(n.map((c) => [c, true]));
      return [l, i];
    })
  )
});
var Ce = (e) => {
  const t = () => {
    const oe = e.enableSeconds ? ":ss" : "", Z = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${Z}${oe}` : `hh${Z}${oe} aa`;
  }, l = () => {
    var oe;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((oe = H.value) == null ? void 0 : oe.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (oe) => On(oe, e.enableSeconds), n = () => G.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, i = computed(() => Ol(e.multiCalendars)), c = computed(() => n()), w = computed(() => Cl(e.ariaLabels)), f = computed(() => Il(e.filters)), F = computed(() => Bl(e.transitions)), p = computed(() => Nl(e.actionRow)), _ = computed(
    () => _l(e.previewFormat, e.format, l())
  ), k = computed(() => Yl(e.textInput)), R = computed(() => El(e.inline)), z = computed(() => Fl(e.config)), N = computed(() => Ll(e.highlight)), H = computed(() => zl(e.weekNumbers)), v = computed(() => Ul(e.timezone)), O = computed(() => jl(e.multiDates)), S = computed(
    () => Wl({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: N.value,
      markers: e.markers,
      timezone: v.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), G = computed(() => Hl(e.range)), ae = computed(() => Kl(e.ui));
  return {
    defaultedTransitions: F,
    defaultedMultiCalendars: i,
    defaultedStartTime: c,
    defaultedAriaLabels: w,
    defaultedFilters: f,
    defaultedActionRow: p,
    defaultedPreviewFormat: _,
    defaultedTextInput: k,
    defaultedInline: R,
    defaultedConfig: z,
    defaultedHighlight: N,
    defaultedWeekNumbers: H,
    defaultedRange: G,
    propDates: S,
    defaultedTz: v,
    defaultedMultiDates: O,
    defaultedUI: ae,
    getDefaultPattern: l,
    getDefaultStartTime: n
  };
};
var Gl = (e, t, l) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: i, defaultedTz: c, defaultedMultiDates: w, getDefaultPattern: f } = Ce(t), F = ref(""), p = toRef(t, "format"), _ = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, b(true));
    },
    { deep: true }
  ), watch(i, (s, le) => {
    s.enabled !== le.enabled && (a.value = null);
  }), watch(p, () => {
    Q();
  });
  const k = (s) => c.value.timezone && c.value.convertModel ? qe(s, c.value.timezone) : s, R = (s) => {
    if (c.value.timezone && c.value.convertModel) {
      const le = vl(c.value.timezone);
      return addHours(s, le);
    }
    return s;
  }, z = (s, le, pe = false) => Bn(
    s,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    le ?? f(),
    pe
  ), N = (s) => s ? t.modelType ? ne(s) : {
    hours: getHours(s),
    minutes: getMinutes(s),
    seconds: t.enableSeconds ? getSeconds(s) : 0
  } : null, H = (s) => t.modelType ? ne(s) : { month: getMonth(s), year: getYear(s) }, v = (s) => Array.isArray(s) ? w.value.enabled ? s.map((le) => O(le, setYear(K(), le))) : ta(
    () => [
      setYear(K(), s[0]),
      s[1] ? setYear(K(), s[1]) : Rt(i.value.partialRange)
    ],
    i.value.enabled
  ) : setYear(K(), +s), O = (s, le) => (typeof s == "string" || typeof s == "number") && t.modelType ? A(s) : le, S = (s) => Array.isArray(s) ? [
    O(
      s[0],
      gt(null, +s[0].hours, +s[0].minutes, s[0].seconds)
    ),
    O(
      s[1],
      gt(null, +s[1].hours, +s[1].minutes, s[1].seconds)
    )
  ] : O(s, gt(null, s.hours, s.minutes, s.seconds)), G = (s) => {
    const le = set(K(), { date: 1 });
    return Array.isArray(s) ? w.value.enabled ? s.map((pe) => O(pe, dt(le, +pe.month, +pe.year))) : ta(
      () => [
        O(s[0], dt(le, +s[0].month, +s[0].year)),
        O(
          s[1],
          s[1] ? dt(le, +s[1].month, +s[1].year) : Rt(i.value.partialRange)
        )
      ],
      i.value.enabled
    ) : O(s, dt(le, +s.month, +s.year));
  }, ae = (s) => {
    if (Array.isArray(s))
      return s.map((le) => A(le));
    throw new Error(Ga.dateArr("multi-dates"));
  }, oe = (s) => {
    if (Array.isArray(s) && i.value.enabled) {
      const le = s[0], pe = s[1];
      return [
        K(Array.isArray(le) ? le[0] : null),
        K(Array.isArray(pe) ? pe[0] : null)
      ];
    }
    return K(s[0]);
  }, Z = (s) => t.modelAuto ? Array.isArray(s) ? [A(s[0]), A(s[1])] : t.autoApply ? [A(s)] : [A(s), null] : Array.isArray(s) ? ta(
    () => s[1] ? [
      A(s[0]),
      s[1] ? A(s[1]) : Rt(i.value.partialRange)
    ] : [A(s[0])],
    i.value.enabled
  ) : A(s), P = () => {
    Array.isArray(a.value) && i.value.enabled && a.value.length === 1 && a.value.push(Rt(i.value.partialRange));
  }, x = () => {
    const s = a.value;
    return [
      ne(s[0]),
      s[1] ? ne(s[1]) : Rt(i.value.partialRange)
    ];
  }, Y = () => a.value[1] ? x() : ne(Ye(a.value[0])), q = () => (a.value || []).map((s) => ne(s)), ie = (s = false) => (s || P(), t.modelAuto ? Y() : w.value.enabled ? q() : Array.isArray(a.value) ? ta(() => x(), i.value.enabled) : ne(Ye(a.value))), fe = (s) => !s || Array.isArray(s) && !s.length ? null : t.timePicker ? S(Ye(s)) : t.monthPicker ? G(Ye(s)) : t.yearPicker ? v(Ye(s)) : w.value.enabled ? ae(Ye(s)) : t.weekPicker ? oe(Ye(s)) : Z(Ye(s)), h2 = (s) => {
    const le = fe(s);
    Fa(Ye(le)) ? (a.value = Ye(le), Q()) : (a.value = null, F.value = "");
  }, U = () => {
    const s = (le) => format(le, n.value.format);
    return `${s(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? s(a.value[1]) : ""}`;
  }, ee = () => l.value && a.value ? Array.isArray(a.value) ? U() : format(a.value, n.value.format) : z(a.value), y = () => a.value ? w.value.enabled ? a.value.map((s) => z(s)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? ee() : z(a.value) : "", Q = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? F.value = y() : F.value = t.format(a.value);
  }, A = (s) => {
    if (t.utc) {
      const le = new Date(s);
      return t.utc === "preserve" ? new Date(le.getTime() + le.getTimezoneOffset() * 6e4) : le;
    }
    return t.modelType ? ml.includes(t.modelType) ? k(new Date(s)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? k(
      parse(s, f(), /* @__PURE__ */ new Date(), { locale: _.value })
    ) : k(
      parse(s, t.modelType, /* @__PURE__ */ new Date(), { locale: _.value })
    ) : k(new Date(s));
  }, ne = (s) => s ? t.utc ? $l(s, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +R(s) : t.modelType === "iso" ? R(s).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? z(R(s)) : z(R(s), t.modelType, true) : R(s) : "", de = (s, le = false, pe = false) => {
    if (pe) return s;
    if (e("update:model-value", s), c.value.emitTimezone && le) {
      const $ = Array.isArray(s) ? s.map((ge) => qe(Ye(ge), c.value.emitTimezone)) : qe(Ye(s), c.value.emitTimezone);
      e("update:model-timezone-value", $);
    }
  }, d = (s) => Array.isArray(a.value) ? w.value.enabled ? a.value.map((le) => s(le)) : [
    s(a.value[0]),
    a.value[1] ? s(a.value[1]) : Rt(i.value.partialRange)
  ] : s(Ye(a.value)), m = () => {
    if (Array.isArray(a.value)) {
      const s = it(a.value[0], t.weekStart), le = a.value[1] ? it(a.value[1], t.weekStart) : [];
      return [s.map((pe) => K(pe)), le.map((pe) => K(pe))];
    }
    return it(a.value, t.weekStart).map((s) => K(s));
  }, L = (s, le) => de(Ye(d(s)), false, le), u = (s) => {
    const le = m();
    return s ? le : e("update:model-value", m());
  }, b = (s = false) => (s || Q(), t.monthPicker ? L(H, s) : t.timePicker ? L(N, s) : t.yearPicker ? L(getYear, s) : t.weekPicker ? u(s) : de(ie(s), true, s));
  return {
    inputValue: F,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? i.value.enabled ? i.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: h2,
    formatInputValue: Q,
    emitModelValue: b
  };
};
var Ql = (e, t) => {
  const { defaultedFilters: l, propDates: a } = Ce(e), { validateMonthYearInRange: n } = kt(e), i = (p, _) => {
    let k = p;
    return l.value.months.includes(getMonth(k)) ? (k = _ ? addMonths(p, 1) : subMonths(p, 1), i(k, _)) : k;
  }, c = (p, _) => {
    let k = p;
    return l.value.years.includes(getYear(k)) ? (k = _ ? addYears(p, 1) : subYears(p, 1), c(k, _)) : k;
  }, w = (p, _ = false) => {
    const k = set(K(), { month: e.month, year: e.year });
    let R = p ? addMonths(k, 1) : subMonths(k, 1);
    e.disableYearSelect && (R = setYear(R, e.year));
    let z = getMonth(R), N = getYear(R);
    l.value.months.includes(z) && (R = i(R, p), z = getMonth(R), N = getYear(R)), l.value.years.includes(N) && (R = c(R, p), N = getYear(R)), n(z, N, p, e.preventMinMaxNavigation) && f(z, N, _);
  }, f = (p, _, k) => {
    t("update-month-year", { month: p, year: _, fromNav: k });
  }, F = computed(() => (p) => _n(
    set(K(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    p
  ));
  return { handleMonthYearChange: w, isDisabled: F, updateMonthYear: f };
};
var ca = {
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
  timezone: { type: [String, Object], default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  dayClass: {
    type: Function,
    default: null
  },
  yearRange: { type: Array, default: () => [1900, 2100] },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
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
  reverseYears: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  highlight: {
    type: [Function, Object],
    default: null
  },
  teleport: { type: [Boolean, String, Object], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function, Object],
    default: null
  },
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
  multiDates: { type: [Object, Boolean], default: false },
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
  range: { type: [Boolean, Object], default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: [Boolean, Object], default: false },
  textInput: { type: [Boolean, Object], default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 },
  quarterPicker: { type: Boolean, default: false },
  yearFirst: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  onInternalModelChange: { type: [Function, Object], default: null },
  enableMinutes: { type: Boolean, default: true },
  ui: { type: Object, default: () => ({}) }
};
var rt = {
  ...ca,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) },
  isTextInputDate: { type: Boolean, default: false }
};
var ql = ["title"];
var Xl = ["disabled"];
var Jl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...rt
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const l = t, a = e, {
      defaultedActionRow: n,
      defaultedPreviewFormat: i,
      defaultedMultiCalendars: c,
      defaultedTextInput: w,
      defaultedInline: f,
      defaultedRange: F,
      defaultedMultiDates: p
    } = Ce(a), { isTimeValid: _, isMonthValid: k } = kt(a), { buildMatrix: R } = bt(), z = ref(null), N = ref(null), H = ref(false), v = ref({}), O = ref(null), S = ref(null);
    onMounted(() => {
      a.arrowNavigation && R([Ie(z), Ie(N)], "actionRow"), G(), window.addEventListener("resize", G);
    }), onUnmounted(() => {
      window.removeEventListener("resize", G);
    });
    const G = () => {
      H.value = false, setTimeout(() => {
        var ee, y;
        const h2 = (ee = O.value) == null ? void 0 : ee.getBoundingClientRect(), U = (y = S.value) == null ? void 0 : y.getBoundingClientRect();
        h2 && U && (v.value.maxWidth = `${U.width - h2.width - 20}px`), H.value = true;
      }, 0);
    }, ae = computed(() => F.value.enabled && !F.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), oe = computed(
      () => !_.value(a.internalModelValue) || !k.value(a.internalModelValue) || !ae.value
    ), Z = () => {
      const h2 = i.value;
      return a.timePicker || a.monthPicker, h2(Ye(a.internalModelValue));
    }, P = () => {
      const h2 = a.internalModelValue;
      return c.value.count > 0 ? `${x(h2[0])} - ${x(h2[1])}` : [x(h2[0]), x(h2[1])];
    }, x = (h2) => Bn(
      h2,
      i.value,
      a.formatLocale,
      w.value.rangeSeparator,
      a.modelAuto,
      i.value
    ), Y = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof i.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? P() : p.value.enabled ? a.internalModelValue.map((h2) => `${x(h2)}`) : a.modelAuto ? `${x(a.internalModelValue[0])}` : `${x(a.internalModelValue[0])} -` : x(a.internalModelValue) : Z()), q = () => p.value.enabled ? "; " : " - ", ie = computed(
      () => Array.isArray(Y.value) ? Y.value.join(q()) : Y.value
    ), fe = () => {
      _.value(a.internalModelValue) && k.value(a.internalModelValue) && ae.value ? l("select-date") : l("invalid-select");
    };
    return (h2, U) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: S,
      class: "dp__action_row"
    }, [
      h2.$slots["action-row"] ? renderSlot(h2.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: h2.internalModelValue,
        disabled: oe.value,
        selectDate: () => h2.$emit("select-date"),
        closePicker: () => h2.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ie.value,
          style: normalizeStyle(v.value)
        }, [
          h2.$slots["action-preview"] && H.value ? renderSlot(h2.$slots, "action-preview", {
            key: 0,
            value: h2.internalModelValue
          }) : createCommentVNode("", true),
          !h2.$slots["action-preview"] && H.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ie.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, ql)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: O,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          h2.$slots["action-buttons"] ? renderSlot(h2.$slots, "action-buttons", {
            key: 0,
            value: h2.internalModelValue
          }) : createCommentVNode("", true),
          h2.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(f).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: z,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: U[0] || (U[0] = (ee) => h2.$emit("close-picker")),
              onKeydown: U[1] || (U[1] = (ee) => unref(Ke)(ee, () => h2.$emit("close-picker")))
            }, toDisplayString(h2.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: U[2] || (U[2] = (ee) => h2.$emit("select-now")),
              onKeydown: U[3] || (U[3] = (ee) => unref(Ke)(ee, () => h2.$emit("select-now")))
            }, toDisplayString(h2.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: N,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: oe.value,
              "data-test": "select-button",
              onKeydown: U[4] || (U[4] = (ee) => unref(Ke)(ee, () => fe())),
              onClick: fe
            }, toDisplayString(h2.selectText), 41, Xl)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var Zl = ["role", "aria-label", "tabindex"];
var xl = { class: "dp__selection_grid_header" };
var er = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var tr = ["aria-label"];
var qt = defineComponent({
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
    focusValue: {},
    menuWrapRef: {},
    ariaLabels: {},
    overlayLabel: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: l }) {
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: i } = bt(), c = l, w = e, { defaultedAriaLabels: f, defaultedTextInput: F, defaultedConfig: p } = Ce(
      w
    ), { hideNavigationButtons: _ } = ma(), k = ref(false), R = ref(null), z = ref(null), N = ref([]), H = ref(), v = ref(null), O = ref(0), S = ref(null);
    onBeforeUpdate(() => {
      R.value = null;
    }), onMounted(() => {
      nextTick().then(() => q()), w.noOverlayFocus || ae(), G(true);
    }), onUnmounted(() => G(false));
    const G = (d) => {
      var m;
      w.arrowNavigation && ((m = w.headerRefs) != null && m.length ? i(d) : a(d));
    }, ae = () => {
      var m;
      const d = Ie(z);
      d && (F.value.enabled || (R.value ? (m = R.value) == null || m.focus({ preventScroll: true }) : d.focus({ preventScroll: true })), k.value = d.clientHeight < d.scrollHeight);
    }, oe = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !w.useRelative,
        "dp--overlay-relative": w.useRelative
      })
    ), Z = computed(
      () => w.useRelative ? { height: `${w.height}px`, width: "var(--dp-menu-min-width)" } : void 0
    ), P = computed(() => ({
      dp__overlay_col: true
    })), x = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: k.value,
        dp__button_bottom: w.isLast
      })
    ), Y = computed(() => {
      var d, m;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((d = w.items) == null ? void 0 : d.length) <= 6,
        dp__container_block: ((m = w.items) == null ? void 0 : m.length) > 6
      };
    });
    watch(
      () => w.items,
      () => q(false),
      { deep: true }
    );
    const q = (d = true) => {
      nextTick().then(() => {
        const m = Ie(R), L = Ie(z), u = Ie(v), b = Ie(S), I = u ? u.getBoundingClientRect().height : 0;
        L && (L.getBoundingClientRect().height ? O.value = L.getBoundingClientRect().height - I : O.value = p.value.modeHeight - I), m && b && d && (b.scrollTop = m.offsetTop - b.offsetTop - (O.value / 2 - m.getBoundingClientRect().height) - I);
      });
    }, ie = (d) => {
      d.disabled || c("selected", d.value);
    }, fe = () => {
      c("toggle"), c("reset-flow");
    }, h2 = () => {
      w.escClose && fe();
    }, U = (d, m, L, u) => {
      d && ((m.active || m.value === w.focusValue) && (R.value = d), w.arrowNavigation && (Array.isArray(N.value[L]) ? N.value[L][u] = d : N.value[L] = [d], ee()));
    }, ee = () => {
      var m, L;
      const d = (m = w.headerRefs) != null && m.length ? [w.headerRefs].concat(N.value) : N.value.concat([w.skipButtonRef ? [] : [v.value]]);
      n(Ye(d), (L = w.headerRefs) != null && L.length ? "monthPicker" : "selectionGrid");
    }, y = (d) => {
      w.arrowNavigation || yt(d, p.value, true);
    }, Q = (d) => {
      H.value = d, c("hover-value", d);
    }, A = () => {
      if (fe(), !w.isLast) {
        const d = Ea(w.menuWrapRef ?? null, "action-row");
        if (d) {
          const m = Tn(d);
          m == null || m.focus();
        }
      }
    }, ne = (d) => {
      switch (d.key) {
        case Pe.esc:
          return h2();
        case Pe.arrowLeft:
          return y(d);
        case Pe.arrowRight:
          return y(d);
        case Pe.arrowUp:
          return y(d);
        case Pe.arrowDown:
          return y(d);
        default:
          return;
      }
    }, de = (d) => {
      if (d.key === Pe.enter) return fe();
      if (d.key === Pe.tab) return A();
    };
    return t({ focusGrid: ae }), (d, m) => {
      var L;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: z,
        class: normalizeClass(oe.value),
        style: normalizeStyle(Z.value),
        role: d.useRelative ? void 0 : "dialog",
        "aria-label": d.overlayLabel,
        tabindex: d.useRelative ? void 0 : "0",
        onKeydown: ne,
        onClick: m[0] || (m[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: S,
          class: normalizeClass(Y.value),
          style: normalizeStyle({ "--dp-overlay-height": `${O.value}px` }),
          role: "grid"
        }, [
          createBaseVNode("div", xl, [
            renderSlot(d.$slots, "header")
          ]),
          d.$slots.overlay ? renderSlot(d.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(d.items, (u, b) => (openBlock(), createElementBlock("div", {
            key: b,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: d.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(u, (I, s) => (openBlock(), createElementBlock("div", {
              key: I.value,
              ref_for: true,
              ref: (le) => U(le, I, b, s),
              role: "gridcell",
              class: normalizeClass(P.value),
              "aria-selected": I.active || void 0,
              "aria-disabled": I.disabled || void 0,
              tabindex: "0",
              "data-test": I.text,
              onClick: withModifiers((le) => ie(I), ["prevent"]),
              onKeydown: (le) => unref(Ke)(le, () => ie(I), true),
              onMouseover: (le) => Q(I.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(I.className)
              }, [
                d.$slots.item ? renderSlot(d.$slots, "item", {
                  key: 0,
                  item: I
                }) : createCommentVNode("", true),
                d.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(I.text), 1)
                ], 64))
              ], 2)
            ], 42, er))), 128))
          ], 2))), 128))
        ], 6),
        d.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: v,
          type: "button",
          "aria-label": (L = unref(f)) == null ? void 0 : L.toggleOverlay,
          class: normalizeClass(x.value),
          tabindex: "0",
          onClick: fe,
          onKeydown: de
        }, [
          renderSlot(d.$slots, "button-icon")
        ], 42, tr)), [
          [vShow, !unref(_)(d.hideNavigation, d.type)]
        ]) : createCommentVNode("", true)
      ], 46, Zl);
    };
  }
});
var fa = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const t = e, l = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), a = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (n, i) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0,
        "dp--flex-display-collapsed": n.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (c, w) => (openBlock(), createElementBlock("div", {
        key: c,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: c,
          index: w
        })
      ], 2))), 128))
    ], 2));
  }
});
var ar = ["data-dp-element", "aria-label", "aria-disabled"];
var Ut = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    elName: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: t }) {
    const l = t, a = ref(null);
    return onMounted(() => l("set-ref", a)), (n, i) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a,
      type: "button",
      "data-dp-element": n.elName,
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: i[0] || (i[0] = (c) => n.$emit("activate")),
      onKeydown: i[1] || (i[1] = (c) => unref(Ke)(c, () => n.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, ar));
  }
});
var nr = ["aria-label", "data-test"];
var En = defineComponent({
  __name: "YearModePicker",
  props: {
    ...rt,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const l = t, a = e, { showRightIcon: n, showLeftIcon: i } = ma(), { defaultedConfig: c, defaultedMultiCalendars: w, defaultedAriaLabels: f, defaultedTransitions: F, defaultedUI: p } = Ce(a), { showTransition: _, transitionName: k } = Xt(F), R = ref(false), z = (v = false, O) => {
      R.value = !R.value, l("toggle-year-picker", { flow: v, show: O });
    }, N = (v) => {
      R.value = false, l("year-select", v);
    }, H = (v = false) => {
      l("handle-year", v);
    };
    return (v, O) => {
      var S, G, ae, oe, Z;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["dp--year-mode-picker", { "dp--hidden-el": R.value }])
        }, [
          unref(i)(unref(w), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 0,
            ref: "mpPrevIconRef",
            "aria-label": (S = unref(f)) == null ? void 0 : S.prevYear,
            disabled: e.isDisabled(false),
            class: normalizeClass((G = unref(p)) == null ? void 0 : G.navBtnPrev),
            onActivate: O[0] || (O[0] = (P) => H(false))
          }, {
            default: withCtx(() => [
              v.$slots["arrow-left"] ? renderSlot(v.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              v.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
          createBaseVNode("button", {
            ref: "mpYearButtonRef",
            class: "dp__btn dp--year-select",
            type: "button",
            "aria-label": `${e.year}-${(ae = unref(f)) == null ? void 0 : ae.openYearsOverlay}`,
            "data-test": `year-mode-btn-${e.instance}`,
            onClick: O[1] || (O[1] = () => z(false)),
            onKeydown: O[2] || (O[2] = withKeys(() => z(false), ["enter"]))
          }, [
            v.$slots.year ? renderSlot(v.$slots, "year", {
              key: 0,
              year: e.year
            }) : createCommentVNode("", true),
            v.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(e.year), 1)
            ], 64))
          ], 40, nr),
          unref(n)(unref(w), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 1,
            ref: "mpNextIconRef",
            "aria-label": (oe = unref(f)) == null ? void 0 : oe.nextYear,
            disabled: e.isDisabled(true),
            class: normalizeClass((Z = unref(p)) == null ? void 0 : Z.navBtnNext),
            onActivate: O[3] || (O[3] = (P) => H(true))
          }, {
            default: withCtx(() => [
              v.$slots["arrow-right"] ? renderSlot(v.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
              v.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true)
        ], 2),
        createVNode(Transition, {
          name: unref(k)(e.showYearPicker),
          css: unref(_)
        }, {
          default: withCtx(() => {
            var P, x;
            return [
              e.showYearPicker ? (openBlock(), createBlock(qt, {
                key: 0,
                items: e.items,
                "text-input": v.textInput,
                "esc-close": v.escClose,
                config: v.config,
                "is-last": v.autoApply && !unref(c).keepActionRow,
                "hide-navigation": v.hideNavigation,
                "aria-labels": v.ariaLabels,
                "overlay-label": (x = (P = unref(f)) == null ? void 0 : P.yearPicker) == null ? void 0 : x.call(P, true),
                type: "year",
                onToggle: z,
                onSelected: O[4] || (O[4] = (Y) => N(Y))
              }, createSlots({
                "button-icon": withCtx(() => [
                  v.$slots["calendar-icon"] ? renderSlot(v.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                  v.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                ]),
                _: 2
              }, [
                v.$slots["year-overlay-value"] ? {
                  name: "item",
                  fn: withCtx(({ item: Y }) => [
                    renderSlot(v.$slots, "year-overlay-value", {
                      text: Y.text,
                      value: Y.value
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation", "aria-labels", "overlay-label"])) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ], 64);
    };
  }
});
var Xa = (e, t, l) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((a) => Me(e, a))) {
      const a = t.value.filter((n) => !Me(n, e));
      t.value = a.length ? a : null;
    } else (l && +l > t.value.length || !l) && t.value.push(e);
  else
    t.value = [e];
};
var Ja = (e, t, l) => {
  let a = e.value ? e.value.slice() : [];
  return a.length === 2 && a[1] !== null && (a = []), a.length ? Oe(t, a[0]) ? (a.unshift(t), l("range-start", a[0]), l("range-start", a[1])) : (a[1] = t, l("range-end", t)) : (a = [t], l("range-start", t)), a;
};
var va = (e, t, l, a) => {
  e && (e[0] && e[1] && l && t("auto-apply"), e[0] && !e[1] && a && l && t("auto-apply"));
};
var Fn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => qe(K(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = qe(K(e.value), e.timezone));
};
var Ln = (e, t, l, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Be(e, t.value[0]) || Me(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (Oe(e, t.value[1]) || Me(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var zn = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: a,
  calendars: n,
  modelValue: i,
  props: c,
  filters: w,
  year: f,
  month: F,
  emit: p
}) => {
  const _ = computed(() => Ka(c.yearRange, c.locale, c.reverseYears)), k = ref([false]), R = computed(() => (Y, q) => {
    const ie = set(lt(/* @__PURE__ */ new Date()), {
      month: F.value(Y),
      year: f.value(Y)
    }), fe = q ? endOfYear(ie) : startOfYear(ie);
    return _n(
      fe,
      a.value.maxDate,
      a.value.minDate,
      c.preventMinMaxNavigation,
      q
    );
  }), z = () => Array.isArray(i.value) && e.value.solo && i.value[1], N = () => {
    for (let Y = 0; Y < e.value.count; Y++)
      if (Y === 0)
        n.value[Y] = n.value[0];
      else if (Y === e.value.count - 1 && z())
        n.value[Y] = {
          month: getMonth(i.value[1]),
          year: getYear(i.value[1])
        };
      else {
        const q = set(K(), n.value[Y - 1]);
        n.value[Y] = { month: getMonth(q), year: getYear(addYears(q, 1)) };
      }
  }, H = (Y) => {
    if (!Y) return N();
    const q = set(K(), n.value[Y]);
    return n.value[0].year = getYear(subYears(q, e.value.count - 1)), N();
  }, v = (Y, q) => {
    const ie = differenceInYears(q, Y);
    return t.value.showLastInRange && ie > 1 ? q : Y;
  }, O = (Y) => c.focusStartDate || e.value.solo ? Y[0] : Y[1] ? v(Y[0], Y[1]) : Y[0], S = () => {
    if (i.value) {
      const Y = Array.isArray(i.value) ? O(i.value) : i.value;
      n.value[0] = { month: getMonth(Y), year: getYear(Y) };
    }
  }, G = () => {
    S(), e.value.count && N();
  };
  watch(i, (Y, q) => {
    c.isTextInputDate && JSON.stringify(Y ?? {}) !== JSON.stringify(q ?? {}) && G();
  }), onMounted(() => {
    G();
  });
  const ae = (Y, q) => {
    n.value[q].year = Y, p("update-month-year", { instance: q, year: Y, month: n.value[q].month }), e.value.count && !e.value.solo && H(q);
  }, oe = computed(() => (Y) => Yt(_.value, (q) => {
    var U;
    const ie = f.value(Y) === q.value, fe = Gt(
      q.value,
      It(a.value.minDate),
      It(a.value.maxDate)
    ) || ((U = w.value.years) == null ? void 0 : U.includes(f.value(Y))), h2 = qa(l.value, q.value);
    return { active: ie, disabled: fe, highlighted: h2 };
  })), Z = (Y, q) => {
    ae(Y, q), x(q);
  }, P = (Y, q = false) => {
    if (!R.value(Y, q)) {
      const ie = q ? f.value(Y) + 1 : f.value(Y) - 1;
      ae(ie, Y);
    }
  }, x = (Y, q = false, ie) => {
    q || p("reset-flow"), ie !== void 0 ? k.value[Y] = ie : k.value[Y] = !k.value[Y], k.value[Y] ? p("overlay-toggle", { open: true, overlay: He.year }) : (p("overlay-closed"), p("overlay-toggle", { open: false, overlay: He.year }));
  };
  return {
    isDisabled: R,
    groupedYears: oe,
    showYearPicker: k,
    selectYear: ae,
    toggleYearPicker: x,
    handleYearSelect: Z,
    handleYear: P
  };
};
var lr = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    defaultedRange: c,
    defaultedHighlight: w,
    propDates: f,
    defaultedTz: F,
    defaultedFilters: p,
    defaultedMultiDates: _
  } = Ce(e), k = () => {
    e.isTextInputDate && G(getYear(K(e.startDate)), 0);
  }, { modelValue: R, year: z, month: N, calendars: H } = Jt(e, t, k), v = computed(() => $n(e.formatLocale, e.locale, e.monthNameFormat)), O = ref(null), { checkMinMaxRange: S } = kt(e), {
    selectYear: G,
    groupedYears: ae,
    showYearPicker: oe,
    toggleYearPicker: Z,
    handleYearSelect: P,
    handleYear: x,
    isDisabled: Y
  } = zn({
    modelValue: R,
    multiCalendars: l,
    range: c,
    highlight: w,
    calendars: H,
    year: z,
    propDates: f,
    month: N,
    filters: p,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (R.value && e.focusStartDate || !R.value) && G(getYear(K(e.startDate)), 0);
  });
  const q = (b) => b ? { month: getMonth(b), year: getYear(b) } : { month: null, year: null }, ie = () => R.value ? Array.isArray(R.value) ? R.value.map((b) => q(b)) : q(R.value) : q(), fe = (b, I) => {
    const s = H.value[b], le = ie();
    return Array.isArray(le) ? le.some((pe) => pe.year === (s == null ? void 0 : s.year) && pe.month === I) : (s == null ? void 0 : s.year) === le.year && I === le.month;
  }, h2 = (b, I, s) => {
    var pe, $;
    const le = ie();
    return Array.isArray(le) ? z.value(I) === ((pe = le[s]) == null ? void 0 : pe.year) && b === (($ = le[s]) == null ? void 0 : $.month) : false;
  }, U = (b, I) => {
    if (c.value.enabled) {
      const s = ie();
      if (Array.isArray(R.value) && Array.isArray(s)) {
        const le = h2(b, I, 0) || h2(b, I, 1), pe = dt(lt(K()), b, z.value(I));
        return da(R.value, O.value, pe) && !le;
      }
      return false;
    }
    return false;
  }, ee = computed(() => (b) => Yt(v.value, (I) => {
    var ge;
    const s = fe(b, I.value), le = Gt(
      I.value,
      Pn(z.value(b), f.value.minDate),
      Rn(z.value(b), f.value.maxDate)
    ) || Rl(f.value.disabledDates, z.value(b)).includes(I.value) || ((ge = p.value.months) == null ? void 0 : ge.includes(I.value)), pe = U(I.value, b), $ = Yn(w.value, I.value, z.value(b));
    return { active: s, disabled: le, isBetween: pe, highlighted: $ };
  })), y = (b, I) => dt(lt(K()), b, z.value(I)), Q = (b, I) => {
    const s = R.value ? R.value : lt(/* @__PURE__ */ new Date());
    R.value = dt(s, b, z.value(I)), t("auto-apply"), t("update-flow-step");
  }, A = (b, I) => {
    const s = y(b, I);
    c.value.fixedEnd || c.value.fixedStart ? R.value = Ln(s, R, t, c) : R.value ? S(s, R.value) && (R.value = Ja(R, y(b, I), t)) : R.value = [y(b, I)], nextTick().then(() => {
      va(R.value, t, e.autoApply, e.modelAuto);
    });
  }, ne = (b, I) => {
    Xa(y(b, I), R, _.value.limit), t("auto-apply", true);
  }, de = (b, I) => (H.value[I].month = b, m(I, H.value[I].year, b), _.value.enabled ? ne(b, I) : c.value.enabled ? A(b, I) : Q(b, I)), d = (b, I) => {
    G(b, I), m(I, b, null);
  }, m = (b, I, s) => {
    let le = s;
    if (!le && le !== 0) {
      const pe = ie();
      le = Array.isArray(pe) ? pe[b].month : pe.month;
    }
    t("update-month-year", { instance: b, year: I, month: le });
  };
  return {
    groupedMonths: ee,
    groupedYears: ae,
    year: z,
    isDisabled: Y,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    showYearPicker: oe,
    modelValue: R,
    presetDate: (b, I) => {
      Fn({
        value: b,
        modelValue: R,
        range: c.value.enabled,
        timezone: I ? void 0 : F.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (b, I) => {
      O.value = y(b, I);
    },
    selectMonth: de,
    selectYear: d,
    toggleYearPicker: Z,
    handleYearSelect: P,
    handleYear: x,
    getModelMonthYear: ie
  };
};
var rr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year",
    "update-flow-step",
    "mount",
    "invalid-fixed-range",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = useSlots(), i = Je(n, "yearMode"), c = e;
    onMounted(() => {
      c.shadow || a("mount", null);
    });
    const {
      groupedMonths: w,
      groupedYears: f,
      year: F,
      isDisabled: p,
      defaultedMultiCalendars: _,
      defaultedConfig: k,
      showYearPicker: R,
      modelValue: z,
      presetDate: N,
      setHoverDate: H,
      selectMonth: v,
      selectYear: O,
      toggleYearPicker: S,
      handleYearSelect: G,
      handleYear: ae,
      getModelMonthYear: oe
    } = lr(c, a);
    return t({ getSidebarProps: () => ({
      modelValue: z,
      year: F,
      getModelMonthYear: oe,
      selectMonth: v,
      selectYear: O,
      handleYear: ae
    }), presetDate: N, toggleYearPicker: (P) => S(0, P) }), (P, x) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(_).count,
      collapse: P.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: Y }) => [
        P.$slots["top-extra"] ? renderSlot(P.$slots, "top-extra", {
          key: 0,
          value: P.internalModelValue
        }) : createCommentVNode("", true),
        P.$slots["month-year"] ? renderSlot(P.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(F),
          months: unref(w)(Y),
          years: unref(f)(Y),
          selectMonth: unref(v),
          selectYear: unref(O),
          instance: Y
        }))) : (openBlock(), createBlock(qt, {
          key: 2,
          items: unref(w)(Y),
          "arrow-navigation": P.arrowNavigation,
          "is-last": P.autoApply && !unref(k).keepActionRow,
          "esc-close": P.escClose,
          height: unref(k).modeHeight,
          config: P.config,
          "no-overlay-focus": !!(P.noOverlayFocus || P.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (q) => unref(v)(q, Y),
          onHoverValue: (q) => unref(H)(q, Y)
        }, createSlots({
          header: withCtx(() => [
            createVNode(En, mergeProps(P.$props, {
              items: unref(f)(Y),
              instance: Y,
              "show-year-picker": unref(R)[Y],
              year: unref(F)(Y),
              "is-disabled": (q) => unref(p)(Y, q),
              onHandleYear: (q) => unref(ae)(Y, q),
              onYearSelect: (q) => unref(G)(q, Y),
              onToggleYearPicker: (q) => unref(S)(Y, q == null ? void 0 : q.flow, q == null ? void 0 : q.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i), (q, ie) => ({
                name: q,
                fn: withCtx((fe) => [
                  renderSlot(P.$slots, q, normalizeProps(guardReactiveProps(fe)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          P.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: q }) => [
              renderSlot(P.$slots, "month-overlay-value", {
                text: q.text,
                value: q.value
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var or = (e, t) => {
  const l = () => {
    e.isTextInputDate && (p.value = getYear(K(e.startDate)));
  }, { modelValue: a } = Jt(e, t, l), n = ref(null), { defaultedHighlight: i, defaultedMultiDates: c, defaultedFilters: w, defaultedRange: f, propDates: F } = Ce(e), p = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (p.value = getYear(K(e.startDate)));
  });
  const _ = (v) => Array.isArray(a.value) ? a.value.some((O) => getYear(O) === v) : a.value ? getYear(a.value) === v : false, k = (v) => f.value.enabled && Array.isArray(a.value) ? da(a.value, n.value, z(v)) : false, R = computed(() => Yt(Ka(e.yearRange, e.locale, e.reverseYears), (v) => {
    const O = _(v.value), S = Gt(
      v.value,
      It(F.value.minDate),
      It(F.value.maxDate)
    ) || w.value.years.includes(v.value), G = k(v.value) && !O, ae = qa(i.value, v.value);
    return { active: O, disabled: S, isBetween: G, highlighted: ae };
  })), z = (v) => setYear(lt(startOfYear(/* @__PURE__ */ new Date())), v);
  return {
    groupedYears: R,
    modelValue: a,
    focusYear: p,
    setHoverValue: (v) => {
      n.value = setYear(lt(/* @__PURE__ */ new Date()), v);
    },
    selectYear: (v) => {
      var O;
      if (t("update-month-year", { instance: 0, year: v }), c.value.enabled)
        return a.value ? Array.isArray(a.value) && (((O = a.value) == null ? void 0 : O.map((G) => getYear(G))).includes(v) ? a.value = a.value.filter((G) => getYear(G) !== v) : a.value.push(setYear(Ge(K()), v))) : a.value = [setYear(Ge(startOfYear(K())), v)], t("auto-apply", true);
      f.value.enabled ? (a.value = Ja(a, z(v), t), nextTick().then(() => {
        va(a.value, t, e.autoApply, e.modelAuto);
      })) : (a.value = z(v), t("auto-apply"));
    }
  };
};
var sr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { groupedYears: i, modelValue: c, focusYear: w, selectYear: f, setHoverValue: F } = or(n, a), { defaultedConfig: p } = Ce(n);
    return t({ getSidebarProps: () => ({
      modelValue: c,
      selectYear: f
    }) }), (k, R) => (openBlock(), createElementBlock("div", null, [
      k.$slots["top-extra"] ? renderSlot(k.$slots, "top-extra", {
        key: 0,
        value: k.internalModelValue
      }) : createCommentVNode("", true),
      k.$slots["month-year"] ? renderSlot(k.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(i),
        selectYear: unref(f)
      }))) : (openBlock(), createBlock(qt, {
        key: 2,
        items: unref(i),
        "is-last": k.autoApply && !unref(p).keepActionRow,
        height: unref(p).modeHeight,
        config: k.config,
        "no-overlay-focus": !!(k.noOverlayFocus || k.textInput),
        "focus-value": unref(w),
        type: "year",
        "use-relative": "",
        onSelected: unref(f),
        onHoverValue: unref(F)
      }, createSlots({ _: 2 }, [
        k.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: z }) => [
            renderSlot(k.$slots, "year-overlay-value", {
              text: z.text,
              value: z.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var ur = {
  key: 0,
  class: "dp__time_input"
};
var ir = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var dr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var cr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var fr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var vr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var mr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var pr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var yr = { key: 0 };
var gr = ["aria-label"];
var hr = defineComponent({
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
    "overlay-opened",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { setTimePickerElements: i, setTimePickerBackRef: c } = bt(), { defaultedAriaLabels: w, defaultedTransitions: f, defaultedFilters: F, defaultedConfig: p, defaultedRange: _ } = Ce(n), { transitionName: k, showTransition: R } = Xt(f), z = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), N = ref("AM"), H = ref(null), v = ref([]), O = ref(), S = ref(false);
    onMounted(() => {
      a("mounted");
    });
    const G = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: n.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), ae = computed(
      () => (r) => y(r, n[r]) || Z(r, n[r])
    ), oe = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), Z = (r, B) => _.value.enabled && !_.value.disableTimeRangeValidation ? !n.validateTime(r, B) : false, P = (r, B) => {
      if (_.value.enabled && !_.value.disableTimeRangeValidation) {
        const C = B ? +n[`${r}Increment`] : -+n[`${r}Increment`], V = n[r] + C;
        return !n.validateTime(r, V);
      }
      return false;
    }, x = computed(() => (r) => !d(+n[r] + +n[`${r}Increment`], r) || P(r, true)), Y = computed(() => (r) => !d(+n[r] - +n[`${r}Increment`], r) || P(r, false)), q = (r, B) => add(set(K(), r), B), ie = (r, B) => sub(set(K(), r), B), fe = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), h2 = computed(() => {
      const r = [{ type: "hours" }];
      return n.enableMinutes && r.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && r.push({ type: "", separator: true }, {
        type: "seconds"
      }), r;
    }), U = computed(() => h2.value.filter((r) => !r.separator)), ee = computed(() => (r) => {
      if (r === "hours") {
        const B = s(+n.hours);
        return { text: B < 10 ? `0${B}` : `${B}`, value: B };
      }
      return { text: n[r] < 10 ? `0${n[r]}` : `${n[r]}`, value: n[r] };
    }), y = (r, B) => {
      var V;
      if (!n.disabledTimesConfig) return false;
      const C = n.disabledTimesConfig(n.order, r === "hours" ? B : void 0);
      return C[r] ? !!((V = C[r]) != null && V.includes(B)) : true;
    }, Q = (r, B) => B !== "hours" || N.value === "AM" ? r : r + 12, A = (r) => {
      const B = n.is24 ? 24 : 12, C = r === "hours" ? B : 60, V = +n[`${r}GridIncrement`], se = r === "hours" && !n.is24 ? V : 0, M = [];
      for (let E = se; E < C; E += V)
        M.push({ value: n.is24 ? E : Q(E, r), text: E < 10 ? `0${E}` : `${E}` });
      return r === "hours" && !n.is24 && M.unshift({ value: N.value === "PM" ? 12 : 0, text: "12" }), Yt(M, (E) => ({ active: false, disabled: F.value.times[r].includes(E.value) || !d(E.value, r) || y(r, E.value) || Z(r, E.value) }));
    }, ne = (r) => r >= 0 ? r : 59, de = (r) => r >= 0 ? r : 23, d = (r, B) => {
      const C = n.minTime ? G(Aa(n.minTime)) : null, V = n.maxTime ? G(Aa(n.maxTime)) : null, se = G(
        Aa(
          oe.value,
          B,
          B === "minutes" || B === "seconds" ? ne(r) : de(r)
        )
      );
      return C && V ? (isBefore(se, V) || isEqual(se, V)) && (isAfter(se, C) || isEqual(se, C)) : C ? isAfter(se, C) || isEqual(se, C) : V ? isBefore(se, V) || isEqual(se, V) : true;
    }, m = (r) => n[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], L = (r) => {
      m(r) || (z[r] = !z[r], z[r] ? (S.value = true, a("overlay-opened", r)) : (S.value = false, a("overlay-closed", r)));
    }, u = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, b = () => {
      O.value && clearTimeout(O.value);
    }, I = (r, B = true, C) => {
      const V = B ? q : ie, se = B ? +n[`${r}Increment`] : -+n[`${r}Increment`];
      d(+n[r] + se, r) && a(
        `update:${r}`,
        u(r)(V({ [r]: +n[r] }, { [r]: +n[`${r}Increment`] }))
      ), !(C != null && C.keyboard) && p.value.timeArrowHoldThreshold && (O.value = setTimeout(() => {
        I(r, B);
      }, p.value.timeArrowHoldThreshold));
    }, s = (r) => n.is24 ? r : (r >= 12 ? N.value = "PM" : N.value = "AM", gl(r)), le = () => {
      N.value === "PM" ? (N.value = "AM", a("update:hours", n.hours - 12)) : (N.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", N.value);
    }, pe = (r) => {
      z[r] = true;
    }, $ = (r, B, C) => {
      if (r && n.arrowNavigation) {
        Array.isArray(v.value[B]) ? v.value[B][C] = r : v.value[B] = [r];
        const V = v.value.reduce(
          (se, M) => M.map((E, ce) => [...se[ce] || [], M[ce]]),
          []
        );
        c(n.closeTimePickerBtn), H.value && (V[1] = V[1].concat(H.value)), i(V, n.order);
      }
    }, ge = (r, B) => (L(r), a(`update:${r}`, B));
    return t({ openChildCmp: pe }), (r, B) => {
      var C;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ur, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(h2.value, (V, se) => {
          var M, E, ce;
          return openBlock(), createElementBlock("div", {
            key: se,
            class: normalizeClass(fe.value)
          }, [
            V.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              S.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(":")
              ], 64))
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => $(he, se, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_top: r.timePickerInline,
                  dp__inc_dec_button_disabled: x.value(V.type),
                  "dp--hidden-el": S.value
                }),
                "data-test": `${V.type}-time-inc-btn-${n.order}`,
                "aria-label": (M = unref(w)) == null ? void 0 : M.incrementValue(V.type),
                tabindex: "0",
                onKeydown: (he) => unref(Ke)(he, () => I(V.type, true, { keyboard: true }), true),
                onClick: (he) => unref(p).timeArrowHoldThreshold ? void 0 : I(V.type, true),
                onMousedown: (he) => unref(p).timeArrowHoldThreshold ? I(V.type, true) : void 0,
                onMouseup: b
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-up"] ? renderSlot(r.$slots, "tp-inline-arrow-up", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    dr,
                    cr
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, ir),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => $(he, se, 1),
                type: "button",
                "aria-label": `${ee.value(V.type).text}-${(E = unref(w)) == null ? void 0 : E.openTpOverlay(V.type)}`,
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !r.timePickerInline,
                  dp__time_display_inline: r.timePickerInline,
                  "dp--time-invalid": ae.value(V.type),
                  "dp--time-overlay-btn": !ae.value(V.type),
                  "dp--hidden-el": S.value
                }),
                disabled: m(V.type),
                tabindex: "0",
                "data-test": `${V.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (he) => unref(Ke)(he, () => L(V.type), true),
                onClick: (he) => L(V.type)
              }, [
                r.$slots[V.type] ? renderSlot(r.$slots, V.type, {
                  key: 0,
                  text: ee.value(V.type).text,
                  value: ee.value(V.type).value
                }) : createCommentVNode("", true),
                r.$slots[V.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(ee.value(V.type).text), 1)
                ], 64))
              ], 42, fr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => $(he, se, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_bottom: r.timePickerInline,
                  dp__inc_dec_button_disabled: Y.value(V.type),
                  "dp--hidden-el": S.value
                }),
                "data-test": `${V.type}-time-dec-btn-${n.order}`,
                "aria-label": (ce = unref(w)) == null ? void 0 : ce.decrementValue(V.type),
                tabindex: "0",
                onKeydown: (he) => unref(Ke)(he, () => I(V.type, false, { keyboard: true }), true),
                onClick: (he) => unref(p).timeArrowHoldThreshold ? void 0 : I(V.type, false),
                onMousedown: (he) => unref(p).timeArrowHoldThreshold ? I(V.type, false) : void 0,
                onMouseup: b
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-down"] ? renderSlot(r.$slots, "tp-inline-arrow-down", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    mr,
                    pr
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-down"] ? renderSlot(r.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, vr)
            ], 64))
          ], 2);
        }), 128)),
        r.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", yr, [
          r.$slots["am-pm-button"] ? renderSlot(r.$slots, "am-pm-button", {
            key: 0,
            toggle: le,
            value: N.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: H,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (C = unref(w)) == null ? void 0 : C.amPmButton,
            tabindex: "0",
            onClick: le,
            onKeydown: B[0] || (B[0] = (V) => unref(Ke)(V, () => le(), true))
          }, toDisplayString(N.value), 41, gr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(U.value, (V, se) => (openBlock(), createBlock(Transition, {
          key: se,
          name: unref(k)(z[V.type]),
          css: unref(R)
        }, {
          default: withCtx(() => {
            var M, E;
            return [
              z[V.type] ? (openBlock(), createBlock(qt, {
                key: 0,
                items: A(V.type),
                "is-last": r.autoApply && !unref(p).keepActionRow,
                "esc-close": r.escClose,
                type: V.type,
                "text-input": r.textInput,
                config: r.config,
                "arrow-navigation": r.arrowNavigation,
                "aria-labels": r.ariaLabels,
                "overlay-label": (E = (M = unref(w)).timeOverlay) == null ? void 0 : E.call(M, V.type),
                onSelected: (ce) => ge(V.type, ce),
                onToggle: (ce) => L(V.type),
                onResetFlow: B[1] || (B[1] = (ce) => r.$emit("reset-flow"))
              }, createSlots({
                "button-icon": withCtx(() => [
                  r.$slots["clock-icon"] ? renderSlot(r.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(r.timePickerInline ? unref(Et) : unref(Ua)), { key: 1 }))
                ]),
                _: 2
              }, [
                r.$slots[`${V.type}-overlay-value`] ? {
                  name: "item",
                  fn: withCtx(({ item: ce }) => [
                    renderSlot(r.$slots, `${V.type}-overlay-value`, {
                      text: ce.text,
                      value: ce.value
                    })
                  ]),
                  key: "0"
                } : void 0,
                r.$slots[`${V.type}-overlay-header`] ? {
                  name: "header",
                  fn: withCtx(() => [
                    renderSlot(r.$slots, `${V.type}-overlay-header`, {
                      toggle: () => L(V.type)
                    })
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "overlay-label", "onSelected", "onToggle"])) : createCommentVNode("", true)
            ];
          }),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var br = { class: "dp--tp-wrap" };
var kr = ["aria-label", "tabindex"];
var wr = ["role", "aria-label", "tabindex"];
var Dr = ["aria-label"];
var Hn = defineComponent({
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
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { buildMatrix: i, setTimePicker: c } = bt(), w = useSlots(), { defaultedTransitions: f, defaultedAriaLabels: F, defaultedTextInput: p, defaultedConfig: _, defaultedRange: k } = Ce(n), { transitionName: R, showTransition: z } = Xt(f), { hideNavigationButtons: N } = ma(), H = ref(null), v = ref(null), O = ref([]), S = ref(null), G = ref(false);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? i([Ie(H.value)], "time") : c(true, n.timePicker);
    });
    const ae = computed(() => k.value.enabled && n.modelAuto ? An(n.internalModelValue) : true), oe = ref(false), Z = (A) => ({
      hours: Array.isArray(n.hours) ? n.hours[A] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[A] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[A] : n.seconds
    }), P = computed(() => {
      const A = [];
      if (k.value.enabled)
        for (let ne = 0; ne < 2; ne++)
          A.push(Z(ne));
      else
        A.push(Z(0));
      return A;
    }), x = (A, ne = false, de = "") => {
      ne || a("reset-flow"), oe.value = A, a(A ? "overlay-opened" : "overlay-closed", He.time), n.arrowNavigation && c(A), nextTick(() => {
        de !== "" && O.value[0] && O.value[0].openChildCmp(de);
      });
    }, Y = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !_.value.keepActionRow
    })), q = Je(w, "timePicker"), ie = (A, ne, de) => k.value.enabled ? ne === 0 ? [A, P.value[1][de]] : [P.value[0][de], A] : A, fe = (A) => {
      a("update:hours", A);
    }, h2 = (A) => {
      a("update:minutes", A);
    }, U = (A) => {
      a("update:seconds", A);
    }, ee = () => {
      if (S.value && !p.value.enabled && !n.noOverlayFocus) {
        const A = Tn(S.value);
        A && A.focus({ preventScroll: true });
      }
    }, y = (A) => {
      G.value = false, a("overlay-closed", A);
    }, Q = (A) => {
      G.value = true, a("overlay-opened", A);
    };
    return t({ toggleTimePicker: x }), (A, ne) => {
      var de;
      return openBlock(), createElementBlock("div", br, [
        !A.timePicker && !A.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: H,
          type: "button",
          class: normalizeClass({ ...Y.value, "dp--hidden-el": oe.value }),
          "aria-label": (de = unref(F)) == null ? void 0 : de.openTimePicker,
          tabindex: A.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: ne[0] || (ne[0] = (d) => unref(Ke)(d, () => x(true))),
          onClick: ne[1] || (ne[1] = (d) => x(true))
        }, [
          A.$slots["clock-icon"] ? renderSlot(A.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          A.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ua), { key: 1 }))
        ], 42, kr)), [
          [vShow, !unref(N)(A.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(R)(oe.value),
          css: unref(z) && !A.timePickerInline
        }, {
          default: withCtx(() => {
            var d, m;
            return [
              oe.value || A.timePicker || A.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: S,
                role: A.timePickerInline ? void 0 : "dialog",
                class: normalizeClass({
                  dp__overlay: !A.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !A.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(A.timePicker ? { height: `${unref(_).modeHeight}px` } : void 0),
                "aria-label": (d = unref(F)) == null ? void 0 : d.timePicker,
                tabindex: A.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    A.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  A.$slots["time-picker-overlay"] ? renderSlot(A.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: fe,
                    setMinutes: h2,
                    setSeconds: U
                  }) : createCommentVNode("", true),
                  A.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(A.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(P.value, (L, u) => withDirectives((openBlock(), createBlock(hr, mergeProps({
                      key: u,
                      ref_for: true
                    }, {
                      ...A.$props,
                      order: u,
                      hours: L.hours,
                      minutes: L.minutes,
                      seconds: L.seconds,
                      closeTimePickerBtn: v.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: u === 0 ? unref(k).fixedStart : unref(k).fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: O,
                      "validate-time": (b, I) => e.validateTime(b, ie(I, u, b)),
                      "onUpdate:hours": (b) => fe(ie(b, u, "hours")),
                      "onUpdate:minutes": (b) => h2(ie(b, u, "minutes")),
                      "onUpdate:seconds": (b) => U(ie(b, u, "seconds")),
                      onMounted: ee,
                      onOverlayClosed: y,
                      onOverlayOpened: Q,
                      onAmPmChange: ne[2] || (ne[2] = (b) => A.$emit("am-pm-change", b))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(q), (b, I) => ({
                        name: b,
                        fn: withCtx((s) => [
                          renderSlot(A.$slots, b, mergeProps({ ref_for: true }, s))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, u === 0 ? true : ae.value]
                    ])), 128))
                  ], 2)),
                  !A.timePicker && !A.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: v,
                    type: "button",
                    class: normalizeClass({ ...Y.value, "dp--hidden-el": G.value }),
                    "aria-label": (m = unref(F)) == null ? void 0 : m.closeTimePicker,
                    tabindex: "0",
                    onKeydown: ne[3] || (ne[3] = (L) => unref(Ke)(L, () => x(false))),
                    onClick: ne[4] || (ne[4] = (L) => x(false))
                  }, [
                    A.$slots["calendar-icon"] ? renderSlot(A.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    A.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                  ], 42, Dr)), [
                    [vShow, !unref(N)(A.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, wr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Un = (e, t, l, a) => {
  const { defaultedRange: n } = Ce(e), i = (S, G) => Array.isArray(t[S]) ? t[S][G] : t[S], c = (S) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[S] : t.seconds : 0, w = (S, G) => S ? G !== void 0 ? gt(S, i("hours", G), i("minutes", G), c(G)) : gt(S, t.hours, t.minutes, c()) : setSeconds(K(), c(G)), f = (S, G) => {
    t[S] = G;
  }, F = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : n.value.enabled), p = (S, G) => {
    const ae = Object.fromEntries(
      Object.keys(t).map((oe) => oe === S ? [oe, G] : [oe, t[oe]].slice())
    );
    if (F.value && !n.value.disableTimeRangeValidation) {
      const oe = (P) => l.value ? gt(
        l.value[P],
        ae.hours[P],
        ae.minutes[P],
        ae.seconds[P]
      ) : null, Z = (P) => setMilliseconds(l.value[P], 0);
      return !(Me(oe(0), oe(1)) && (isAfter(oe(0), Z(1)) || isBefore(oe(1), Z(0))));
    }
    return true;
  }, _ = (S, G) => {
    p(S, G) && (f(S, G), a && a());
  }, k = (S) => {
    _("hours", S);
  }, R = (S) => {
    _("minutes", S);
  }, z = (S) => {
    _("seconds", S);
  }, N = (S, G, ae, oe) => {
    G && k(S), !G && !ae && R(S), ae && z(S), l.value && oe(l.value);
  }, H = (S) => {
    if (S) {
      const G = Array.isArray(S), ae = G ? [+S[0].hours, +S[1].hours] : +S.hours, oe = G ? [+S[0].minutes, +S[1].minutes] : +S.minutes, Z = G ? [+S[0].seconds, +S[1].seconds] : +S.seconds;
      f("hours", ae), f("minutes", oe), e.enableSeconds && f("seconds", Z);
    }
  }, v = (S, G) => {
    const ae = {
      hours: Array.isArray(t.hours) ? t.hours[S] : t.hours,
      disabledArr: []
    };
    return (G || G === 0) && (ae.hours = G), Array.isArray(e.disabledTimes) && (ae.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[S]) ? e.disabledTimes[S] : e.disabledTimes), ae;
  }, O = computed(() => (S, G) => {
    var ae;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: oe, hours: Z } = v(S, G), P = oe.filter((x) => +x.hours === Z);
      return ((ae = P[0]) == null ? void 0 : ae.minutes) === "*" ? { hours: [Z], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (P == null ? void 0 : P.map((x) => +x.minutes)) ?? [],
        seconds: (P == null ? void 0 : P.map((x) => x.seconds ? +x.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: f,
    updateHours: k,
    updateMinutes: R,
    updateSeconds: z,
    getSetDateTime: w,
    updateTimeValues: N,
    getSecondsValue: c,
    assignStartTime: H,
    validateTime: p,
    disabledTimesConfig: O
  };
};
var Mr = (e, t) => {
  const l = () => {
    e.isTextInputDate && G();
  }, { modelValue: a, time: n } = Jt(e, t, l), { defaultedStartTime: i, defaultedRange: c, defaultedTz: w } = Ce(e), { updateTimeValues: f, getSetDateTime: F, setTime: p, assignStartTime: _, disabledTimesConfig: k, validateTime: R } = Un(e, n, a, z);
  function z() {
    t("update-flow-step");
  }
  const N = (Z) => {
    const { hours: P, minutes: x, seconds: Y } = Z;
    return { hours: +P, minutes: +x, seconds: Y ? +Y : 0 };
  }, H = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const P = N(e.startTime[0]), x = N(e.startTime[1]);
        return [set(K(), P), set(K(), x)];
      }
      const Z = N(e.startTime);
      return set(K(), Z);
    }
    return c.value.enabled ? [null, null] : null;
  }, v = () => {
    if (c.value.enabled) {
      const [Z, P] = H();
      a.value = [
        qe(F(Z, 0), w.value.timezone),
        qe(F(P, 1), w.value.timezone)
      ];
    } else
      a.value = qe(F(H()), w.value.timezone);
  }, O = (Z) => Array.isArray(Z) ? [St(K(Z[0])), St(K(Z[1]))] : [St(Z ?? K())], S = (Z, P, x) => {
    p("hours", Z), p("minutes", P), p("seconds", e.enableSeconds ? x : 0);
  }, G = () => {
    const [Z, P] = O(a.value);
    return c.value.enabled ? S(
      [Z.hours, P.hours],
      [Z.minutes, P.minutes],
      [Z.seconds, P.seconds]
    ) : S(Z.hours, Z.minutes, Z.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return _(i.value), a.value ? G() : v();
  });
  const ae = () => {
    Array.isArray(a.value) ? a.value = a.value.map((Z, P) => Z && F(Z, P)) : a.value = F(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: k,
    updateTime: (Z, P = true, x = false) => {
      f(Z, P, x, ae);
    },
    validateTime: R
  };
};
var $r = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "time-update",
    "am-pm-change",
    "mount",
    "reset-flow",
    "update-flow-step",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = useSlots(), c = Je(i, "timePicker"), w = ref(null), { time: f, modelValue: F, disabledTimesConfig: p, updateTime: _, validateTime: k } = Mr(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: F,
      time: f,
      updateTime: _
    }), toggleTimePicker: (N, H = false, v = "") => {
      var O;
      (O = w.value) == null || O.toggleTimePicker(N, H, v);
    } }), (N, H) => (openBlock(), createBlock(fa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Hn, mergeProps({
          ref_key: "tpRef",
          ref: w
        }, N.$props, {
          hours: unref(f).hours,
          minutes: unref(f).minutes,
          seconds: unref(f).seconds,
          "internal-model-value": N.internalModelValue,
          "disabled-times-config": unref(p),
          "validate-time": unref(k),
          "onUpdate:hours": H[0] || (H[0] = (v) => unref(_)(v)),
          "onUpdate:minutes": H[1] || (H[1] = (v) => unref(_)(v, false)),
          "onUpdate:seconds": H[2] || (H[2] = (v) => unref(_)(v, false, true)),
          onAmPmChange: H[3] || (H[3] = (v) => N.$emit("am-pm-change", v)),
          onResetFlow: H[4] || (H[4] = (v) => N.$emit("reset-flow")),
          onOverlayClosed: H[5] || (H[5] = (v) => N.$emit("overlay-toggle", { open: false, overlay: v })),
          onOverlayOpened: H[6] || (H[6] = (v) => N.$emit("overlay-toggle", { open: true, overlay: v }))
        }), createSlots({ _: 2 }, [
          renderList(unref(c), (v, O) => ({
            name: v,
            fn: withCtx((S) => [
              renderSlot(N.$slots, v, normalizeProps(guardReactiveProps(S)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var Ar = { class: "dp--header-wrap" };
var Tr = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Sr = { key: 0 };
var Pr = { class: "dp__month_year_wrap" };
var Rr = ["data-dp-element", "aria-label", "data-test", "onClick", "onKeydown"];
var Cr = defineComponent({
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
    ...rt
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed", "overlay-opened"],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTransitions: i,
      defaultedAriaLabels: c,
      defaultedMultiCalendars: w,
      defaultedFilters: f,
      defaultedConfig: F,
      defaultedHighlight: p,
      propDates: _,
      defaultedUI: k
    } = Ce(n), { transitionName: R, showTransition: z } = Xt(i), { buildMatrix: N } = bt(), { handleMonthYearChange: H, isDisabled: v, updateMonthYear: O } = Ql(n, a), { showLeftIcon: S, showRightIcon: G } = ma(), ae = ref(false), oe = ref(false), Z = ref(false), P = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const x = (m) => ({
      get: () => n[m],
      set: (L) => {
        const u = m === nt.month ? nt.year : nt.month;
        a("update-month-year", { [m]: L, [u]: n[u] }), m === nt.month ? y(true) : Q(true);
      }
    }), Y = computed(x(nt.month)), q = computed(x(nt.year)), ie = computed(() => (m) => ({
      month: n.month,
      year: n.year,
      items: m === nt.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: O,
      toggle: m === nt.month ? y : Q
    })), fe = computed(() => {
      const m = n.months.find((L) => L.value === n.month);
      return m || { text: "", value: 0 };
    }), h2 = computed(() => Yt(n.months, (m) => {
      const L = n.month === m.value, u = Gt(
        m.value,
        Pn(n.year, _.value.minDate),
        Rn(n.year, _.value.maxDate)
      ) || f.value.months.includes(m.value), b = Yn(p.value, m.value, n.year);
      return { active: L, disabled: u, highlighted: b };
    })), U = computed(() => Yt(n.years, (m) => {
      const L = n.year === m.value, u = Gt(
        m.value,
        It(_.value.minDate),
        It(_.value.maxDate)
      ) || f.value.years.includes(m.value), b = qa(p.value, m.value);
      return { active: L, disabled: u, highlighted: b };
    })), ee = (m, L, u) => {
      u !== void 0 ? m.value = u : m.value = !m.value, m.value ? (Z.value = true, a("overlay-opened", L)) : (Z.value = false, a("overlay-closed", L));
    }, y = (m = false, L) => {
      A(m), ee(ae, He.month, L);
    }, Q = (m = false, L) => {
      A(m), ee(oe, He.year, L);
    }, A = (m) => {
      m || a("reset-flow");
    }, ne = (m, L) => {
      n.arrowNavigation && (P.value[L] = Ie(m), N(P.value, "monthYear"));
    }, de = computed(() => {
      var m, L, u, b, I, s;
      return [
        {
          type: nt.month,
          index: 1,
          toggle: y,
          modelValue: Y.value,
          updateModelValue: (le) => Y.value = le,
          text: fe.value.text,
          showSelectionGrid: ae.value,
          items: h2.value,
          ariaLabel: (m = c.value) == null ? void 0 : m.openMonthsOverlay,
          overlayLabel: ((u = (L = c.value).monthPicker) == null ? void 0 : u.call(L, true)) ?? void 0
        },
        {
          type: nt.year,
          index: 2,
          toggle: Q,
          modelValue: q.value,
          updateModelValue: (le) => q.value = le,
          text: Sn(n.year, n.locale),
          showSelectionGrid: oe.value,
          items: U.value,
          ariaLabel: (b = c.value) == null ? void 0 : b.openYearsOverlay,
          overlayLabel: ((s = (I = c.value).yearPicker) == null ? void 0 : s.call(I, true)) ?? void 0
        }
      ];
    }), d = computed(() => n.disableYearSelect ? [de.value[0]] : n.yearFirst ? [...de.value].reverse() : de.value);
    return t({
      toggleMonthPicker: y,
      toggleYearPicker: Q,
      handleMonthYearChange: H
    }), (m, L) => {
      var u, b, I, s, le, pe;
      return openBlock(), createElementBlock("div", Ar, [
        m.$slots["month-year"] ? (openBlock(), createElementBlock("div", Tr, [
          renderSlot(m.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(O), handleMonthYearChange: unref(H), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          m.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Sr, [
            renderSlot(m.$slots, "top-extra", { value: m.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Pr, [
            unref(S)(unref(w), e.instance) && !m.vertical ? (openBlock(), createBlock(Ut, {
              key: 0,
              "aria-label": (u = unref(c)) == null ? void 0 : u.prevMonth,
              disabled: unref(v)(false),
              class: normalizeClass((b = unref(k)) == null ? void 0 : b.navBtnPrev),
              "el-name": "action-prev",
              onActivate: L[0] || (L[0] = ($) => unref(H)(false, true)),
              onSetRef: L[1] || (L[1] = ($) => ne($, 0))
            }, {
              default: withCtx(() => [
                m.$slots["arrow-left"] ? renderSlot(m.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                m.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: m.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(d.value, ($, ge) => (openBlock(), createElementBlock(Fragment, {
                key: $.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (r) => ne(r, ge + 1),
                  type: "button",
                  "data-dp-element": `overlay-${$.type}`,
                  class: normalizeClass(["dp__btn dp__month_year_select", { "dp--hidden-el": Z.value }]),
                  "aria-label": `${$.text}-${$.ariaLabel}`,
                  "data-test": `${$.type}-toggle-overlay-${e.instance}`,
                  onClick: $.toggle,
                  onKeydown: (r) => unref(Ke)(r, () => $.toggle(), true)
                }, [
                  m.$slots[$.type] ? renderSlot(m.$slots, $.type, {
                    key: 0,
                    text: $.text,
                    value: n[$.type]
                  }) : createCommentVNode("", true),
                  m.$slots[$.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString($.text), 1)
                  ], 64))
                ], 42, Rr),
                createVNode(Transition, {
                  name: unref(R)($.showSelectionGrid),
                  css: unref(z)
                }, {
                  default: withCtx(() => [
                    $.showSelectionGrid ? (openBlock(), createBlock(qt, {
                      key: 0,
                      items: $.items,
                      "arrow-navigation": m.arrowNavigation,
                      "hide-navigation": m.hideNavigation,
                      "is-last": m.autoApply && !unref(F).keepActionRow,
                      "skip-button-ref": false,
                      config: m.config,
                      type: $.type,
                      "header-refs": [],
                      "esc-close": m.escClose,
                      "menu-wrap-ref": m.menuWrapRef,
                      "text-input": m.textInput,
                      "aria-labels": m.ariaLabels,
                      "overlay-label": $.overlayLabel,
                      onSelected: $.updateModelValue,
                      onToggle: $.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        m.$slots["calendar-icon"] ? renderSlot(m.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        m.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      m.$slots[`${$.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: r }) => [
                          renderSlot(m.$slots, `${$.type}-overlay-value`, {
                            text: r.text,
                            value: r.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      m.$slots[`${$.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(m.$slots, `${$.type}-overlay`, mergeProps({ ref_for: true }, ie.value($.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      m.$slots[`${$.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(m.$slots, `${$.type}-overlay-header`, {
                            toggle: $.toggle
                          })
                        ]),
                        key: "2"
                      } : void 0
                    ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "menu-wrap-ref", "text-input", "aria-labels", "overlay-label", "onSelected", "onToggle"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ], 64))), 128))
            ], 2),
            unref(S)(unref(w), e.instance) && m.vertical ? (openBlock(), createBlock(Ut, {
              key: 1,
              "aria-label": (I = unref(c)) == null ? void 0 : I.prevMonth,
              "el-name": "action-prev",
              disabled: unref(v)(false),
              class: normalizeClass((s = unref(k)) == null ? void 0 : s.navBtnPrev),
              onActivate: L[2] || (L[2] = ($) => unref(H)(false, true))
            }, {
              default: withCtx(() => [
                m.$slots["arrow-up"] ? renderSlot(m.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                m.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(G)(unref(w), e.instance) ? (openBlock(), createBlock(Ut, {
              key: 2,
              ref: "rightIcon",
              "el-name": "action-next",
              disabled: unref(v)(true),
              "aria-label": (le = unref(c)) == null ? void 0 : le.nextMonth,
              class: normalizeClass((pe = unref(k)) == null ? void 0 : pe.navBtnNext),
              onActivate: L[3] || (L[3] = ($) => unref(H)(true, true)),
              onSetRef: L[4] || (L[4] = ($) => ne($, m.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(m.$slots, m.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(m.vertical ? unref(Wa) : unref(Ha)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label", "class"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Or = {
  class: "dp__calendar_header",
  role: "row"
};
var _r = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Br = ["aria-label"];
var Yr = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Ir = {
  key: 0,
  class: "dp__calendar_item dp__week_num",
  role: "gridcell"
};
var Nr = { class: "dp__cell_inner" };
var Er = ["id", "aria-pressed", "aria-disabled", "aria-label", "data-test", "onClick", "onTouchend", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Fr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
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
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { buildMultiLevelMatrix: i } = bt(), {
      defaultedTransitions: c,
      defaultedConfig: w,
      defaultedAriaLabels: f,
      defaultedMultiCalendars: F,
      defaultedWeekNumbers: p,
      defaultedMultiDates: _,
      defaultedUI: k
    } = Ce(n), R = ref(null), z = ref({
      bottom: "",
      left: "",
      transform: ""
    }), N = ref([]), H = ref(null), v = ref(true), O = ref(""), S = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), G = ref([]), ae = ref({ left: "50%" }), oe = ref(false), Z = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), P = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : yl(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: N }), w.value.noSwipe || H.value && (H.value.addEventListener("touchstart", ne, { passive: false }), H.value.addEventListener("touchend", de, { passive: false }), H.value.addEventListener("touchmove", d, { passive: false })), n.monthChangeOnScroll && H.value && H.value.addEventListener("wheel", u, { passive: false });
    });
    const x = ($) => $ ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", Y = ($, ge) => {
      if (n.transitions) {
        const r = Ge(dt(K(), n.month, n.year));
        O.value = Be(Ge(dt(K(), $, ge)), r) ? c.value[x(true)] : c.value[x(false)], v.value = false, nextTick(() => {
          v.value = true;
        });
      }
    }, q = computed(
      () => ({
        ...k.value.calendar ?? {}
      })
    ), ie = computed(() => ($) => {
      const ge = hl($);
      return {
        dp__marker_dot: ge.type === "dot",
        dp__marker_line: ge.type === "line"
      };
    }), fe = computed(() => ($) => Me($, R.value)), h2 = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: F.value.count > 0 && n.instance !== 0
    })), U = computed(() => ($) => n.hideOffsetDates ? $.current : true), ee = async ($, ge) => {
      const { width: r, height: B } = $.getBoundingClientRect();
      R.value = ge.value;
      let C = { left: `${r / 2}px` }, V = -50;
      if (await nextTick(), G.value[0]) {
        const { left: se, width: M } = G.value[0].getBoundingClientRect();
        se < 0 && (C = { left: "0" }, V = 0, ae.value.left = `${r / 2}px`), window.innerWidth < se + M && (C = { right: "0" }, V = 0, ae.value.left = `${M - r / 2}px`);
      }
      z.value = {
        bottom: `${B}px`,
        ...C,
        transform: `translateX(${V}%)`
      };
    }, y = async ($, ge, r) => {
      var C, V, se;
      const B = Ie(N.value[ge][r]);
      B && ((C = $.marker) != null && C.customPosition && ((se = (V = $.marker) == null ? void 0 : V.tooltip) != null && se.length) ? z.value = $.marker.customPosition(B) : await ee(B, $), a("tooltip-open", $.marker));
    }, Q = async ($, ge, r) => {
      var B, C;
      if (oe.value && _.value.enabled && _.value.dragSelect)
        return a("select-date", $);
      a("set-hover-date", $), (C = (B = $.marker) == null ? void 0 : B.tooltip) != null && C.length && await y($, ge, r);
    }, A = ($) => {
      R.value && (R.value = null, z.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", $.marker));
    }, ne = ($) => {
      S.value.startX = $.changedTouches[0].screenX, S.value.startY = $.changedTouches[0].screenY;
    }, de = ($) => {
      S.value.endX = $.changedTouches[0].screenX, S.value.endY = $.changedTouches[0].screenY, m();
    }, d = ($) => {
      n.vertical && !n.inline && $.preventDefault();
    }, m = () => {
      const $ = n.vertical ? "Y" : "X";
      Math.abs(S.value[`start${$}`] - S.value[`end${$}`]) > 10 && a("handle-swipe", S.value[`start${$}`] > S.value[`end${$}`] ? "right" : "left");
    }, L = ($, ge, r) => {
      $ && (Array.isArray(N.value[ge]) ? N.value[ge][r] = $ : N.value[ge] = [$]), n.arrowNavigation && i(N.value, "calendar");
    }, u = ($) => {
      n.monthChangeOnScroll && ($.preventDefault(), a("handle-scroll", $));
    }, b = ($) => p.value.type === "local" ? getWeek($.value, { weekStartsOn: +n.weekStart }) : p.value.type === "iso" ? getISOWeek($.value) : typeof p.value.type == "function" ? p.value.type($.value) : "", I = ($) => {
      const ge = $[0];
      return p.value.hideOnOffsetDates ? $.some((r) => r.current) ? b(ge) : "" : b(ge);
    }, s = ($, ge, r = true) => {
      r && sn() || !r && !sn() || _.value.enabled || (yt($, w.value), a("select-date", ge));
    }, le = ($) => {
      yt($, w.value);
    }, pe = ($) => {
      _.value.enabled && _.value.dragSelect ? (oe.value = true, a("select-date", $)) : _.value.enabled && a("select-date", $);
    };
    return t({ triggerTransition: Y }), ($, ge) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(h2.value)
    }, [
      createBaseVNode("div", {
        ref_key: "calendarWrapRef",
        ref: H,
        class: normalizeClass(q.value),
        role: "grid"
      }, [
        createBaseVNode("div", Or, [
          $.weekNumbers ? (openBlock(), createElementBlock("div", _r, toDisplayString($.weekNumName), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(P.value, (r, B) => {
            var C, V;
            return openBlock(), createElementBlock("div", {
              key: B,
              class: "dp__calendar_header_item",
              role: "gridcell",
              "data-test": "calendar-header",
              "aria-label": (V = (C = unref(f)) == null ? void 0 : C.weekDay) == null ? void 0 : V.call(C, B)
            }, [
              $.$slots["calendar-header"] ? renderSlot($.$slots, "calendar-header", {
                key: 0,
                day: r,
                index: B
              }) : createCommentVNode("", true),
              $.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(r), 1)
              ], 64))
            ], 8, Br);
          }), 128))
        ]),
        Yr,
        createVNode(Transition, {
          name: O.value,
          css: !!$.transitions
        }, {
          default: withCtx(() => [
            v.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: ge[1] || (ge[1] = (r) => oe.value = false)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (r, B) => (openBlock(), createElementBlock("div", {
                key: B,
                class: "dp__calendar_row",
                role: "row"
              }, [
                $.weekNumbers ? (openBlock(), createElementBlock("div", Ir, [
                  createBaseVNode("div", Nr, toDisplayString(I(r.days)), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(r.days, (C, V) => {
                  var se, M, E;
                  return openBlock(), createElementBlock("div", {
                    id: unref(In)(C.value),
                    ref_for: true,
                    ref: (ce) => L(ce, B, V),
                    key: V + B,
                    role: "gridcell",
                    class: "dp__calendar_item",
                    "aria-pressed": (C.classData.dp__active_date || C.classData.dp__range_start || C.classData.dp__range_start) ?? void 0,
                    "aria-disabled": C.classData.dp__cell_disabled || void 0,
                    "aria-label": (M = (se = unref(f)) == null ? void 0 : se.day) == null ? void 0 : M.call(se, C),
                    tabindex: "0",
                    "data-test": C.value,
                    onClick: withModifiers((ce) => s(ce, C), ["prevent"]),
                    onTouchend: (ce) => s(ce, C, false),
                    onKeydown: (ce) => unref(Ke)(ce, () => $.$emit("select-date", C)),
                    onMouseenter: (ce) => Q(C, B, V),
                    onMouseleave: (ce) => A(C),
                    onMousedown: (ce) => pe(C),
                    onMouseup: ge[0] || (ge[0] = (ce) => oe.value = false)
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__cell_inner", C.classData])
                    }, [
                      $.$slots.day && U.value(C) ? renderSlot($.$slots, "day", {
                        key: 0,
                        day: +C.text,
                        date: C.value
                      }) : createCommentVNode("", true),
                      $.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(C.text), 1)
                      ], 64)),
                      C.marker && U.value(C) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        $.$slots.marker ? renderSlot($.$slots, "marker", {
                          key: 0,
                          marker: C.marker,
                          day: +C.text,
                          date: C.value
                        }) : (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(ie.value(C.marker)),
                          style: normalizeStyle(C.marker.color ? { backgroundColor: C.marker.color } : {})
                        }, null, 6))
                      ], 64)) : createCommentVNode("", true),
                      fe.value(C.value) ? (openBlock(), createElementBlock("div", {
                        key: 3,
                        ref_for: true,
                        ref_key: "activeTooltip",
                        ref: G,
                        class: "dp__marker_tooltip",
                        style: normalizeStyle(z.value)
                      }, [
                        (E = C.marker) != null && E.tooltip ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: "dp__tooltip_content",
                          onClick: le
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(C.marker.tooltip, (ce, he) => (openBlock(), createElementBlock("div", {
                            key: he,
                            class: "dp__tooltip_text"
                          }, [
                            $.$slots["marker-tooltip"] ? renderSlot($.$slots, "marker-tooltip", {
                              key: 0,
                              tooltip: ce,
                              day: C.value
                            }) : createCommentVNode("", true),
                            $.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("div", {
                                class: "dp__tooltip_mark",
                                style: normalizeStyle(ce.color ? { backgroundColor: ce.color } : {})
                              }, null, 4),
                              createBaseVNode("div", null, toDisplayString(ce.text), 1)
                            ], 64))
                          ]))), 128)),
                          createBaseVNode("div", {
                            class: "dp__arrow_bottom_tp",
                            style: normalizeStyle(ae.value)
                          }, null, 4)
                        ])) : createCommentVNode("", true)
                      ], 4)) : createCommentVNode("", true)
                    ], 2)
                  ], 40, Er);
                }), 128))
              ]))), 128))
            ], 32)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ], 2)
    ], 2));
  }
});
var vn = (e) => Array.isArray(e);
var Lr = (e, t, l, a) => {
  const n = ref([]), i = ref(/* @__PURE__ */ new Date()), c = ref(), w = () => ne(e.isTextInputDate), { modelValue: f, calendars: F, time: p, today: _ } = Jt(e, t, w), {
    defaultedMultiCalendars: k,
    defaultedStartTime: R,
    defaultedRange: z,
    defaultedConfig: N,
    defaultedTz: H,
    propDates: v,
    defaultedMultiDates: O
  } = Ce(e), { validateMonthYearInRange: S, isDisabled: G, isDateRangeAllowed: ae, checkMinMaxRange: oe } = kt(e), { updateTimeValues: Z, getSetDateTime: P, setTime: x, assignStartTime: Y, validateTime: q, disabledTimesConfig: ie } = Un(e, p, f, a), fe = computed(
    () => (D) => F.value[D] ? F.value[D].month : 0
  ), h2 = computed(
    () => (D) => F.value[D] ? F.value[D].year : 0
  ), U = (D) => !N.value.keepViewOnOffsetClick || D ? true : !c.value, ee = (D, g, W, re = false) => {
    var Ae, Fe;
    U(re) && (F.value[D] || (F.value[D] = { month: 0, year: 0 }), F.value[D].month = on(g) ? (Ae = F.value[D]) == null ? void 0 : Ae.month : g, F.value[D].year = on(W) ? (Fe = F.value[D]) == null ? void 0 : Fe.year : W);
  }, y = () => {
    e.autoApply && t("select-date");
  };
  onMounted(() => {
    e.shadow || (f.value || ($(), R.value && Y(R.value)), ne(true), e.focusStartDate && e.startDate && $());
  });
  const Q = computed(() => {
    var D;
    return (D = e.flow) != null && D.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), A = () => {
    e.autoApply && Q.value && t("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : false);
  }, ne = (D = false) => {
    if (f.value)
      return Array.isArray(f.value) ? (n.value = f.value, I(D)) : m(f.value, D);
    if (k.value.count && D && !e.startDate)
      return d(K(), D);
  }, de = () => Array.isArray(f.value) && z.value.enabled ? getMonth(f.value[0]) === getMonth(f.value[1] ?? f.value[0]) : false, d = (D = /* @__PURE__ */ new Date(), g = false) => {
    if ((!k.value.count || !k.value.static || g) && ee(0, getMonth(D), getYear(D)), k.value.count && (!k.value.solo || !f.value || de()))
      for (let W = 1; W < k.value.count; W++) {
        const re = set(K(), { month: fe.value(W - 1), year: h2.value(W - 1) }), Ae = add(re, { months: 1 });
        F.value[W] = { month: getMonth(Ae), year: getYear(Ae) };
      }
  }, m = (D, g) => {
    d(D), x("hours", getHours(D)), x("minutes", getMinutes(D)), x("seconds", getSeconds(D)), k.value.count && g && pe();
  }, L = (D) => {
    if (k.value.count) {
      if (k.value.solo) return 0;
      const g = getMonth(D[0]), W = getMonth(D[1]);
      return Math.abs(W - g) < k.value.count ? 0 : 1;
    }
    return 1;
  }, u = (D, g) => {
    D[1] && z.value.showLastInRange ? d(D[L(D)], g) : d(D[0], g);
    const W = (re, Ae) => [
      re(D[0]),
      D[1] ? re(D[1]) : p[Ae][1]
    ];
    x("hours", W(getHours, "hours")), x("minutes", W(getMinutes, "minutes")), x("seconds", W(getSeconds, "seconds"));
  }, b = (D, g) => {
    if ((z.value.enabled || e.weekPicker) && !O.value.enabled)
      return u(D, g);
    if (O.value.enabled && g) {
      const W = D[D.length - 1];
      return m(W, g);
    }
  }, I = (D) => {
    const g = f.value;
    b(g, D), k.value.count && k.value.solo && pe();
  }, s = (D, g) => {
    const W = set(K(), { month: fe.value(g), year: h2.value(g) }), re = D < 0 ? addMonths(W, 1) : subMonths(W, 1);
    S(getMonth(re), getYear(re), D < 0, e.preventMinMaxNavigation) && (ee(g, getMonth(re), getYear(re)), t("update-month-year", { instance: g, month: getMonth(re), year: getYear(re) }), k.value.count && !k.value.solo && le(g), l());
  }, le = (D) => {
    for (let g = D - 1; g >= 0; g--) {
      const W = subMonths(set(K(), { month: fe.value(g + 1), year: h2.value(g + 1) }), 1);
      ee(g, getMonth(W), getYear(W));
    }
    for (let g = D + 1; g <= k.value.count - 1; g++) {
      const W = addMonths(set(K(), { month: fe.value(g - 1), year: h2.value(g - 1) }), 1);
      ee(g, getMonth(W), getYear(W));
    }
  }, pe = () => {
    if (Array.isArray(f.value) && f.value.length === 2) {
      const D = K(
        K(f.value[1] ? f.value[1] : addMonths(f.value[0], 1))
      ), [g, W] = [getMonth(f.value[0]), getYear(f.value[0])], [re, Ae] = [getMonth(f.value[1]), getYear(f.value[1])];
      (g !== re || g === re && W !== Ae) && k.value.solo && ee(1, getMonth(D), getYear(D));
    } else f.value && !Array.isArray(f.value) && (ee(0, getMonth(f.value), getYear(f.value)), d(K()));
  }, $ = () => {
    e.startDate && (ee(0, getMonth(K(e.startDate)), getYear(K(e.startDate))), k.value.count && le(0));
  }, ge = (D, g) => {
    if (e.monthChangeOnScroll) {
      const W = (/* @__PURE__ */ new Date()).getTime() - i.value.getTime(), re = Math.abs(D.deltaY);
      let Ae = 500;
      re > 1 && (Ae = 100), re > 100 && (Ae = 0), W > Ae && (i.value = /* @__PURE__ */ new Date(), s(e.monthChangeOnScroll !== "inverse" ? -D.deltaY : D.deltaY, g));
    }
  }, r = (D, g, W = false) => {
    e.monthChangeOnArrows && e.vertical === W && B(D, g);
  }, B = (D, g) => {
    s(D === "right" ? -1 : 1, g);
  }, C = (D) => {
    if (v.value.markers)
      return sa(D.value, v.value.markers);
  }, V = (D, g) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [D == 0, true];
      case "fair":
        return [D == 0 || g > D, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, se = (D, g, W, re) => {
    if (e.sixWeeks && D.length < 6) {
      const Ae = 6 - D.length, Fe = (g.getDay() + 7 - re) % 7, xt = 6 - (W.getDay() + 7 - re) % 7, [zt, Da] = V(Fe, xt);
      for (let Dt = 1; Dt <= Ae; Dt++)
        if (Da ? !!(Dt % 2) == zt : zt) {
          const ea = D[0].days[0], Ma = M(addDays(ea.value, -7), getMonth(g));
          D.unshift({ days: Ma });
        } else {
          const ea = D[D.length - 1], Ma = ea.days[ea.days.length - 1], Wn = M(addDays(Ma.value, 1), getMonth(g));
          D.push({ days: Wn });
        }
    }
    return D;
  }, M = (D, g) => {
    const W = K(D), re = [];
    for (let Ae = 0; Ae < 7; Ae++) {
      const Fe = addDays(W, Ae), wt = getMonth(Fe) !== g;
      re.push({
        text: e.hideOffsetDates && wt ? "" : Fe.getDate(),
        value: Fe,
        current: !wt,
        classData: {}
      });
    }
    return re;
  }, E = (D, g) => {
    const W = [], re = new Date(g, D), Ae = new Date(g, D + 1, 0), Fe = e.weekStart, wt = startOfWeek(re, { weekStartsOn: Fe }), xt = (zt) => {
      const Da = M(zt, D);
      if (W.push({ days: Da }), !W[W.length - 1].days.some(
        (Dt) => Me(Ge(Dt.value), Ge(Ae))
      )) {
        const Dt = addDays(zt, 7);
        xt(Dt);
      }
    };
    return xt(wt), se(W, re, Ae, Fe);
  }, ce = (D) => {
    const g = gt(K(D.value), p.hours, p.minutes, Xe());
    t("date-update", g), O.value.enabled ? Xa(g, f, O.value.limit) : f.value = g, a(), nextTick().then(() => {
      A();
    });
  }, he = (D) => z.value.noDisabledRange ? Cn(n.value[0], D).some((W) => G(W)) : false, et = () => {
    n.value = f.value ? f.value.slice() : [], n.value.length === 2 && !(z.value.fixedStart || z.value.fixedEnd) && (n.value = []);
  }, ve = (D, g) => {
    const W = [
      K(D.value),
      addDays(K(D.value), +z.value.autoRange)
    ];
    ae(W) ? (g && vt(D.value), n.value = W) : t("invalid-date", D.value);
  }, vt = (D) => {
    const g = getMonth(K(D)), W = getYear(K(D));
    if (ee(0, g, W), k.value.count > 0)
      for (let re = 1; re < k.value.count; re++) {
        const Ae = Al(
          set(K(D), { year: h2.value(re - 1), month: fe.value(re - 1) })
        );
        ee(re, Ae.month, Ae.year);
      }
  }, ot = (D) => {
    if (he(D.value) || !oe(D.value, f.value, z.value.fixedStart ? 0 : 1))
      return t("invalid-date", D.value);
    n.value = Ln(K(D.value), f, t, z);
  }, Ft = (D, g) => {
    if (et(), z.value.autoRange) return ve(D, g);
    if (z.value.fixedStart || z.value.fixedEnd) return ot(D);
    n.value[0] ? oe(K(D.value), f.value) && !he(D.value) ? Oe(K(D.value), K(n.value[0])) ? (n.value.unshift(K(D.value)), t("range-end", n.value[0])) : (n.value[1] = K(D.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", D.value), t("invalid-date", D.value)) : (n.value[0] = K(D.value), t("range-start", n.value[0]));
  }, Xe = (D = true) => e.enableSeconds ? Array.isArray(p.seconds) ? D ? p.seconds[0] : p.seconds[1] : p.seconds : 0, Lt = (D) => {
    n.value[D] = gt(
      n.value[D],
      p.hours[D],
      p.minutes[D],
      Xe(D !== 1)
    );
  }, pa = () => {
    var D, g;
    n.value[0] && n.value[1] && +((D = n.value) == null ? void 0 : D[0]) > +((g = n.value) == null ? void 0 : g[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, Zt = () => {
    n.value.length && (n.value[0] && !n.value[1] ? Lt(0) : (Lt(0), Lt(1), a()), pa(), f.value = n.value.slice(), va(n.value, t, e.autoApply, e.modelAuto));
  }, ya = (D, g = false) => {
    if (G(D.value) || !D.current && e.hideOffsetDates) return t("invalid-date", D.value);
    if (c.value = JSON.parse(JSON.stringify(D)), !z.value.enabled) return ce(D);
    vn(p.hours) && vn(p.minutes) && !O.value.enabled && (Ft(D, g), Zt());
  }, ga = (D, g) => {
    var re;
    ee(D, g.month, g.year, true), k.value.count && !k.value.solo && le(D), t("update-month-year", { instance: D, month: g.month, year: g.year }), l(k.value.solo ? D : void 0);
    const W = (re = e.flow) != null && re.length ? e.flow[e.flowStep] : void 0;
    !g.fromNav && (W === He.month || W === He.year) && a();
  }, ha = (D, g) => {
    Fn({
      value: D,
      modelValue: f,
      range: z.value.enabled,
      timezone: g ? void 0 : H.value.timezone
    }), y(), e.multiCalendars && nextTick().then(() => ne(true));
  }, ba = () => {
    const D = ja(K(), H.value);
    z.value.enabled ? f.value && Array.isArray(f.value) && f.value[0] ? f.value = Oe(D, f.value[0]) ? [D, f.value[0]] : [f.value[0], D] : f.value = [D] : f.value = D, y();
  }, ka = () => {
    if (Array.isArray(f.value))
      if (O.value.enabled) {
        const D = wa();
        f.value[f.value.length - 1] = P(D);
      } else
        f.value = f.value.map((D, g) => D && P(D, g));
    else
      f.value = P(f.value);
    t("time-update");
  }, wa = () => Array.isArray(f.value) && f.value.length ? f.value[f.value.length - 1] : null;
  return {
    calendars: F,
    modelValue: f,
    month: fe,
    year: h2,
    time: p,
    disabledTimesConfig: ie,
    today: _,
    validateTime: q,
    getCalendarDays: E,
    getMarker: C,
    handleScroll: ge,
    handleSwipe: B,
    handleArrow: r,
    selectDate: ya,
    updateMonthYear: ga,
    presetDate: ha,
    selectCurrentDate: ba,
    updateTime: (D, g = true, W = false) => {
      Z(D, g, W, ka);
    },
    assignMonthAndYear: d
  };
};
var zr = { key: 0 };
var Hr = defineComponent({
  __name: "DatePicker",
  props: {
    ...rt
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
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      calendars: i,
      month: c,
      year: w,
      modelValue: f,
      time: F,
      disabledTimesConfig: p,
      today: _,
      validateTime: k,
      getCalendarDays: R,
      getMarker: z,
      handleArrow: N,
      handleScroll: H,
      handleSwipe: v,
      selectDate: O,
      updateMonthYear: S,
      presetDate: G,
      selectCurrentDate: ae,
      updateTime: oe,
      assignMonthAndYear: Z
    } = Lr(n, a, de, d), P = useSlots(), { setHoverDate: x, getDayClassData: Y, clearHoverDate: q } = lo(f, n), { defaultedMultiCalendars: ie } = Ce(n), fe = ref([]), h2 = ref([]), U = ref(null), ee = Je(P, "calendar"), y = Je(P, "monthYear"), Q = Je(P, "timePicker"), A = (r) => {
      n.shadow || a("mount", r);
    };
    watch(
      i,
      () => {
        n.shadow || setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    ), watch(
      ie,
      (r, B) => {
        r.count - B.count > 0 && Z();
      },
      { deep: true }
    );
    const ne = computed(() => (r) => R(c.value(r), w.value(r)).map((B) => ({
      ...B,
      days: B.days.map((C) => (C.marker = z(C), C.classData = Y(C), C))
    })));
    function de(r) {
      var B;
      r || r === 0 ? (B = h2.value[r]) == null || B.triggerTransition(c.value(r), w.value(r)) : h2.value.forEach((C, V) => C.triggerTransition(c.value(V), w.value(V)));
    }
    function d() {
      a("update-flow-step");
    }
    const m = (r, B = false) => {
      O(r, B), n.spaceConfirm && a("select-date");
    }, L = (r, B, C = 0) => {
      var V;
      (V = fe.value[C]) == null || V.toggleMonthPicker(r, B);
    }, u = (r, B, C = 0) => {
      var V;
      (V = fe.value[C]) == null || V.toggleYearPicker(r, B);
    }, b = (r, B, C) => {
      var V;
      (V = U.value) == null || V.toggleTimePicker(r, B, C);
    }, I = (r, B) => {
      var C;
      if (!n.range) {
        const V = f.value ? f.value : _, se = B ? new Date(B) : V, M = r ? startOfWeek(se, { weekStartsOn: 1 }) : endOfWeek(se, { weekStartsOn: 1 });
        O({
          value: M,
          current: getMonth(se) === c.value(0),
          text: "",
          classData: {}
        }), (C = document.getElementById(In(M))) == null || C.focus();
      }
    }, s = (r) => {
      var B;
      (B = fe.value[0]) == null || B.handleMonthYearChange(r, true);
    }, le = (r) => {
      S(0, { month: c.value(0), year: w.value(0) + (r ? 1 : -1), fromNav: true });
    }, pe = (r, B) => {
      r === He.time && a(`time-picker-${B ? "open" : "close"}`), a("overlay-toggle", { open: B, overlay: r });
    }, $ = (r) => {
      a("overlay-toggle", { open: false, overlay: r }), a("focus-menu");
    };
    return t({
      clearHoverDate: q,
      presetDate: G,
      selectCurrentDate: ae,
      toggleMonthPicker: L,
      toggleYearPicker: u,
      toggleTimePicker: b,
      handleArrow: N,
      updateMonthYear: S,
      getSidebarProps: () => ({
        modelValue: f,
        month: c,
        year: w,
        time: F,
        updateTime: oe,
        updateMonthYear: S,
        selectDate: O,
        presetDate: G
      }),
      changeMonth: s,
      changeYear: le,
      selectWeekDate: I
    }), (r, B) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(fa, {
        "multi-calendars": unref(ie).count,
        collapse: r.collapse
      }, {
        default: withCtx(({ instance: C, index: V }) => [
          r.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Cr, mergeProps({
            key: 0,
            ref: (se) => {
              se && (fe.value[V] = se);
            },
            months: unref($n)(r.formatLocale, r.locale, r.monthNameFormat),
            years: unref(Ka)(r.yearRange, r.locale, r.reverseYears),
            month: unref(c)(C),
            year: unref(w)(C),
            instance: C
          }, r.$props, {
            onMount: B[0] || (B[0] = (se) => A(unref(Tt).header)),
            onResetFlow: B[1] || (B[1] = (se) => r.$emit("reset-flow")),
            onUpdateMonthYear: (se) => unref(S)(C, se),
            onOverlayClosed: $,
            onOverlayOpened: B[2] || (B[2] = (se) => r.$emit("overlay-toggle", { open: true, overlay: se }))
          }), createSlots({ _: 2 }, [
            renderList(unref(y), (se, M) => ({
              name: se,
              fn: withCtx((E) => [
                renderSlot(r.$slots, se, normalizeProps(guardReactiveProps(E)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Fr, mergeProps({
            ref: (se) => {
              se && (h2.value[V] = se);
            },
            "mapped-dates": ne.value(C),
            month: unref(c)(C),
            year: unref(w)(C),
            instance: C
          }, r.$props, {
            onSelectDate: (se) => unref(O)(se, C !== 1),
            onHandleSpace: (se) => m(se, C !== 1),
            onSetHoverDate: B[3] || (B[3] = (se) => unref(x)(se)),
            onHandleScroll: (se) => unref(H)(se, C),
            onHandleSwipe: (se) => unref(v)(se, C),
            onMount: B[4] || (B[4] = (se) => A(unref(Tt).calendar)),
            onResetFlow: B[5] || (B[5] = (se) => r.$emit("reset-flow")),
            onTooltipOpen: B[6] || (B[6] = (se) => r.$emit("tooltip-open", se)),
            onTooltipClose: B[7] || (B[7] = (se) => r.$emit("tooltip-close", se))
          }), createSlots({ _: 2 }, [
            renderList(unref(ee), (se, M) => ({
              name: se,
              fn: withCtx((E) => [
                renderSlot(r.$slots, se, normalizeProps(guardReactiveProps({ ...E })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      r.enableTimePicker ? (openBlock(), createElementBlock("div", zr, [
        r.$slots["time-picker"] ? renderSlot(r.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(F), updateTime: unref(oe) }))) : (openBlock(), createBlock(Hn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: U
        }, r.$props, {
          hours: unref(F).hours,
          minutes: unref(F).minutes,
          seconds: unref(F).seconds,
          "internal-model-value": r.internalModelValue,
          "disabled-times-config": unref(p),
          "validate-time": unref(k),
          onMount: B[8] || (B[8] = (C) => A(unref(Tt).timePicker)),
          "onUpdate:hours": B[9] || (B[9] = (C) => unref(oe)(C)),
          "onUpdate:minutes": B[10] || (B[10] = (C) => unref(oe)(C, false)),
          "onUpdate:seconds": B[11] || (B[11] = (C) => unref(oe)(C, false, true)),
          onResetFlow: B[12] || (B[12] = (C) => r.$emit("reset-flow")),
          onOverlayClosed: B[13] || (B[13] = (C) => pe(C, false)),
          onOverlayOpened: B[14] || (B[14] = (C) => pe(C, true)),
          onAmPmChange: B[15] || (B[15] = (C) => r.$emit("am-pm-change", C))
        }), createSlots({ _: 2 }, [
          renderList(unref(Q), (C, V) => ({
            name: C,
            fn: withCtx((se) => [
              renderSlot(r.$slots, C, normalizeProps(guardReactiveProps(se)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Ur = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: a,
    defaultedConfig: n,
    defaultedHighlight: i,
    defaultedRange: c,
    propDates: w,
    defaultedFilters: f,
    defaultedMultiDates: F
  } = Ce(e), { modelValue: p, year: _, month: k, calendars: R } = Jt(e, t), { isDisabled: z } = kt(e), { selectYear: N, groupedYears: H, showYearPicker: v, isDisabled: O, toggleYearPicker: S, handleYearSelect: G, handleYear: ae } = zn({
    modelValue: p,
    multiCalendars: a,
    range: c,
    highlight: i,
    calendars: R,
    propDates: w,
    month: k,
    year: _,
    filters: f,
    props: e,
    emit: t
  }), oe = (y, Q) => [y, Q].map((A) => format(A, "MMMM", { locale: e.formatLocale })).join("-"), Z = computed(() => (y) => p.value ? Array.isArray(p.value) ? p.value.some((Q) => isSameQuarter(y, Q)) : isSameQuarter(p.value, y) : false), P = (y) => {
    if (c.value.enabled) {
      if (Array.isArray(p.value)) {
        const Q = Me(y, p.value[0]) || Me(y, p.value[1]);
        return da(p.value, l.value, y) && !Q;
      }
      return false;
    }
    return false;
  }, x = (y, Q) => y.quarter === getQuarter(Q) && y.year === getYear(Q), Y = (y) => typeof i.value == "function" ? i.value({ quarter: getQuarter(y), year: getYear(y) }) : !!i.value.quarters.find((Q) => x(Q, y)), q = computed(() => (y) => {
    const Q = set(/* @__PURE__ */ new Date(), { year: _.value(y) });
    return eachQuarterOfInterval({
      start: startOfYear(Q),
      end: endOfYear(Q)
    }).map((A) => {
      const ne = startOfQuarter(A), de = endOfQuarter(A), d = z(A), m = P(ne), L = Y(ne);
      return {
        text: oe(ne, de),
        value: ne,
        active: Z.value(ne),
        highlighted: L,
        disabled: d,
        isBetween: m
      };
    });
  }), ie = (y) => {
    Xa(y, p, F.value.limit), t("auto-apply", true);
  }, fe = (y) => {
    p.value = Ja(p, y, t), va(p.value, t, e.autoApply, e.modelAuto);
  }, h2 = (y) => {
    p.value = y, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: H,
    year: _,
    isDisabled: O,
    quarters: q,
    showYearPicker: v,
    modelValue: p,
    setHoverDate: (y) => {
      l.value = y;
    },
    selectYear: N,
    selectQuarter: (y, Q, A) => {
      if (!A)
        return R.value[Q].month = getMonth(endOfQuarter(y)), F.value.enabled ? ie(y) : c.value.enabled ? fe(y) : h2(y);
    },
    toggleYearPicker: S,
    handleYearSelect: G,
    handleYear: ae
  };
};
var Vr = { class: "dp--quarter-items" };
var Wr = ["data-test", "disabled", "onClick", "onMouseover"];
var jr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end",
    "overlay-toggle",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = useSlots(), c = Je(i, "yearMode"), {
      defaultedMultiCalendars: w,
      defaultedConfig: f,
      groupedYears: F,
      year: p,
      isDisabled: _,
      quarters: k,
      modelValue: R,
      showYearPicker: z,
      setHoverDate: N,
      selectQuarter: H,
      toggleYearPicker: v,
      handleYearSelect: O,
      handleYear: S
    } = Ur(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: R,
      year: p,
      selectQuarter: H,
      handleYearSelect: O,
      handleYear: S
    }) }), (ae, oe) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(w).count,
      collapse: ae.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: Z }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(f).modeHeight}px` })
        }, [
          ae.$slots["top-extra"] ? renderSlot(ae.$slots, "top-extra", {
            key: 0,
            value: ae.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(En, mergeProps(ae.$props, {
              items: unref(F)(Z),
              instance: Z,
              "show-year-picker": unref(z)[Z],
              year: unref(p)(Z),
              "is-disabled": (P) => unref(_)(Z, P),
              onHandleYear: (P) => unref(S)(Z, P),
              onYearSelect: (P) => unref(O)(P, Z),
              onToggleYearPicker: (P) => unref(v)(Z, P == null ? void 0 : P.flow, P == null ? void 0 : P.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(c), (P, x) => ({
                name: P,
                fn: withCtx((Y) => [
                  renderSlot(ae.$slots, P, normalizeProps(guardReactiveProps(Y)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Vr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(k)(Z), (P, x) => (openBlock(), createElementBlock("div", { key: x }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": P.active,
                  "dp--qr-btn-between": P.isBetween,
                  "dp--qr-btn-disabled": P.disabled,
                  "dp--highlighted": P.highlighted
                }]),
                "data-test": P.value,
                disabled: P.disabled,
                onClick: (Y) => unref(H)(P.value, Z, P.disabled),
                onMouseover: (Y) => unref(N)(P.value)
              }, [
                ae.$slots.quarter ? renderSlot(ae.$slots, "quarter", {
                  key: 0,
                  value: P.value,
                  text: P.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(P.text), 1)
                ], 64))
              ], 42, Wr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Kr = ["id", "tabindex", "role", "aria-label"];
var Gr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Qr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var qr = [
  Qr
];
var Xr = {
  key: 1,
  class: "dp--menu-header"
};
var Jr = {
  key: 0,
  class: "dp__sidebar_left"
};
var Zr = ["data-test", "onClick", "onKeydown"];
var xr = {
  key: 2,
  class: "dp__sidebar_right"
};
var eo = {
  key: 3,
  class: "dp__action_extra"
};
var mn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...ca,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    getInputRect: { type: Function, default: () => ({}) },
    isTextInputDate: { type: Boolean, default: false }
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
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = ref(null), c = computed(() => {
      const { openOnTop: M, ...E } = n;
      return {
        ...E,
        flowStep: x.value,
        collapse: n.collapse,
        noOverlayFocus: n.noOverlayFocus,
        menuWrapRef: i.value
      };
    }), { setMenuFocused: w, setShiftKey: f, control: F } = Nn(), p = useSlots(), { defaultedTextInput: _, defaultedInline: k, defaultedConfig: R, defaultedUI: z } = Ce(n), N = ref(null), H = ref(0), v = ref(null), O = ref(false), S = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        O.value = true, G(), window.addEventListener("resize", G);
        const M = Ie(i);
        if (M && !_.value.enabled && !k.value.enabled && (w(true), ee()), M) {
          const E = (ce) => {
            R.value.allowPreventDefault && ce.preventDefault(), yt(ce, R.value, true);
          };
          M.addEventListener("pointerdown", E), M.addEventListener("mousedown", E);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", G);
    });
    const G = () => {
      const M = Ie(v);
      M && (H.value = M.getBoundingClientRect().width);
    }, { arrowRight: ae, arrowLeft: oe, arrowDown: Z, arrowUp: P } = bt(), { flowStep: x, updateFlowStep: Y, childMount: q, resetFlow: ie, handleFlow: fe } = ro(n, a, S), h2 = computed(() => n.monthPicker ? rr : n.yearPicker ? sr : n.timePicker ? $r : n.quarterPicker ? jr : Hr), U = computed(() => {
      var ce;
      if (R.value.arrowLeft) return R.value.arrowLeft;
      const M = (ce = i.value) == null ? void 0 : ce.getBoundingClientRect(), E = n.getInputRect();
      return (E == null ? void 0 : E.width) < (H == null ? void 0 : H.value) && (E == null ? void 0 : E.left) <= ((M == null ? void 0 : M.left) ?? 0) ? `${(E == null ? void 0 : E.width) / 2}px` : (E == null ? void 0 : E.right) >= ((M == null ? void 0 : M.right) ?? 0) && (E == null ? void 0 : E.width) < (H == null ? void 0 : H.value) ? `${(H == null ? void 0 : H.value) - (E == null ? void 0 : E.width) / 2}px` : "50%";
    }), ee = () => {
      const M = Ie(i);
      M && M.focus({ preventScroll: true });
    }, y = computed(() => {
      var M;
      return ((M = S.value) == null ? void 0 : M.getSidebarProps()) || {};
    }), Q = () => {
      n.openOnTop && a("recalculate-position");
    }, A = Je(p, "action"), ne = computed(() => n.monthPicker || n.yearPicker ? Je(p, "monthYear") : n.timePicker ? Je(p, "timePicker") : Je(p, "shared")), de = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), d = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), m = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !k.value.enabled,
        dp__relative: k.value.enabled,
        ...z.value.menu ?? {}
      })
    ), L = (M) => {
      yt(M, R.value, true);
    }, u = () => {
      n.escClose && a("close-picker");
    }, b = (M) => {
      if (n.arrowNavigation) {
        if (M === je.up) return P();
        if (M === je.down) return Z();
        if (M === je.left) return oe();
        if (M === je.right) return ae();
      } else M === je.left || M === je.up ? $("handleArrow", je.left, 0, M === je.up) : $("handleArrow", je.right, 0, M === je.down);
    }, I = (M) => {
      f(M.shiftKey), !n.disableMonthYearSelect && M.code === Pe.tab && M.target.classList.contains("dp__menu") && F.value.shiftKeyInMenu && (M.preventDefault(), yt(M, R.value, true), a("close-picker"));
    }, s = () => {
      ee(), a("time-picker-close");
    }, le = (M) => {
      var E, ce, he;
      (E = S.value) == null || E.toggleTimePicker(false, false), (ce = S.value) == null || ce.toggleMonthPicker(false, false, M), (he = S.value) == null || he.toggleYearPicker(false, false, M);
    }, pe = (M, E = 0) => {
      var ce, he, et;
      return M === "month" ? (ce = S.value) == null ? void 0 : ce.toggleMonthPicker(false, true, E) : M === "year" ? (he = S.value) == null ? void 0 : he.toggleYearPicker(false, true, E) : M === "time" ? (et = S.value) == null ? void 0 : et.toggleTimePicker(true, false) : le(E);
    }, $ = (M, ...E) => {
      var ce, he;
      (ce = S.value) != null && ce[M] && ((he = S.value) == null || he[M](...E));
    }, ge = () => {
      $("selectCurrentDate");
    }, r = (M, E) => {
      $("presetDate", M, E);
    }, B = () => {
      $("clearHoverDate");
    }, C = (M, E) => {
      $("updateMonthYear", M, E);
    }, V = (M, E) => {
      M.preventDefault(), b(E);
    }, se = (M) => {
      var E, ce, he;
      if (I(M), M.key === Pe.home || M.key === Pe.end)
        return $(
          "selectWeekDate",
          M.key === Pe.home,
          M.target.getAttribute("id")
        );
      switch ((M.key === Pe.pageUp || M.key === Pe.pageDown) && (M.shiftKey ? ($("changeYear", M.key === Pe.pageUp), (E = Ea(i.value, "overlay-year")) == null || E.focus()) : ($("changeMonth", M.key === Pe.pageUp), (ce = Ea(i.value, M.key === Pe.pageUp ? "action-prev" : "action-next")) == null || ce.focus()), M.target.getAttribute("id") && ((he = i.value) == null || he.focus({ preventScroll: true }))), M.key) {
        case Pe.esc:
          return u();
        case Pe.arrowLeft:
          return V(M, je.left);
        case Pe.arrowRight:
          return V(M, je.right);
        case Pe.arrowUp:
          return V(M, je.up);
        case Pe.arrowDown:
          return V(M, je.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: C,
      switchView: pe,
      handleFlow: fe
    }), (M, E) => {
      var ce, he, et;
      return openBlock(), createElementBlock("div", {
        id: M.uid ? `dp-menu-${M.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: i,
        tabindex: unref(k).enabled ? void 0 : "0",
        role: unref(k).enabled ? void 0 : "dialog",
        "aria-label": (ce = M.ariaLabels) == null ? void 0 : ce.menu,
        class: normalizeClass(m.value),
        style: normalizeStyle({ "--dp-arrow-left": U.value }),
        onMouseleave: B,
        onClick: L,
        onKeydown: se
      }, [
        (M.disabled || M.readonly) && unref(k).enabled || M.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(d.value)
        }, [
          M.loading ? (openBlock(), createElementBlock("div", Gr, qr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        M.$slots["menu-header"] ? (openBlock(), createElementBlock("div", Xr, [
          renderSlot(M.$slots, "menu-header")
        ])) : createCommentVNode("", true),
        !unref(k).enabled && !M.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(de.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: v,
          class: normalizeClass({
            dp__menu_content_wrapper: ((he = M.presetDates) == null ? void 0 : he.length) || !!M.$slots["left-sidebar"] || !!M.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((et = M.presetDates) == null ? void 0 : et.length) || !!M.$slots["left-sidebar"] || !!M.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${H.value}px` })
        }, [
          M.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Jr, [
            renderSlot(M.$slots, "left-sidebar", normalizeProps(guardReactiveProps(y.value)))
          ])) : createCommentVNode("", true),
          M.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(M.presetDates, (ve, vt) => (openBlock(), createElementBlock(Fragment, { key: vt }, [
              ve.slot ? renderSlot(M.$slots, ve.slot, {
                key: 0,
                presetDate: r,
                label: ve.label,
                value: ve.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(ve.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": ve.testId ?? void 0,
                onClick: withModifiers((ot) => r(ve.value, ve.noTz), ["prevent"]),
                onKeydown: (ot) => unref(Ke)(ot, () => r(ve.value, ve.noTz), true)
              }, toDisplayString(ve.label), 47, Zr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: N,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(h2.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: S
            }, c.value, {
              "flow-step": unref(x),
              onMount: unref(q),
              onUpdateFlowStep: unref(Y),
              onResetFlow: unref(ie),
              onFocusMenu: ee,
              onSelectDate: E[0] || (E[0] = (ve) => M.$emit("select-date")),
              onDateUpdate: E[1] || (E[1] = (ve) => M.$emit("date-update", ve)),
              onTooltipOpen: E[2] || (E[2] = (ve) => M.$emit("tooltip-open", ve)),
              onTooltipClose: E[3] || (E[3] = (ve) => M.$emit("tooltip-close", ve)),
              onAutoApply: E[4] || (E[4] = (ve) => M.$emit("auto-apply", ve)),
              onRangeStart: E[5] || (E[5] = (ve) => M.$emit("range-start", ve)),
              onRangeEnd: E[6] || (E[6] = (ve) => M.$emit("range-end", ve)),
              onInvalidFixedRange: E[7] || (E[7] = (ve) => M.$emit("invalid-fixed-range", ve)),
              onTimeUpdate: E[8] || (E[8] = (ve) => M.$emit("time-update")),
              onAmPmChange: E[9] || (E[9] = (ve) => M.$emit("am-pm-change", ve)),
              onTimePickerOpen: E[10] || (E[10] = (ve) => M.$emit("time-picker-open", ve)),
              onTimePickerClose: s,
              onRecalculatePosition: Q,
              onUpdateMonthYear: E[11] || (E[11] = (ve) => M.$emit("update-month-year", ve)),
              onAutoApplyInvalid: E[12] || (E[12] = (ve) => M.$emit("auto-apply-invalid", ve)),
              onInvalidDate: E[13] || (E[13] = (ve) => M.$emit("invalid-date", ve)),
              onOverlayToggle: E[14] || (E[14] = (ve) => M.$emit("overlay-toggle", ve)),
              "onUpdate:internalModelValue": E[15] || (E[15] = (ve) => M.$emit("update:internal-model-value", ve))
            }), createSlots({ _: 2 }, [
              renderList(ne.value, (ve, vt) => ({
                name: ve,
                fn: withCtx((ot) => [
                  renderSlot(M.$slots, ve, normalizeProps(guardReactiveProps({ ...ot })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          M.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", xr, [
            renderSlot(M.$slots, "right-sidebar", normalizeProps(guardReactiveProps(y.value)))
          ])) : createCommentVNode("", true),
          M.$slots["action-extra"] ? (openBlock(), createElementBlock("div", eo, [
            M.$slots["action-extra"] ? renderSlot(M.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: ge
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !M.autoApply || unref(R).keepActionRow ? (openBlock(), createBlock(Jl, mergeProps({
          key: 3,
          "menu-mount": O.value
        }, c.value, {
          "calendar-width": H.value,
          onClosePicker: E[16] || (E[16] = (ve) => M.$emit("close-picker")),
          onSelectDate: E[17] || (E[17] = (ve) => M.$emit("select-date")),
          onInvalidSelect: E[18] || (E[18] = (ve) => M.$emit("invalid-select")),
          onSelectNow: ge
        }), createSlots({ _: 2 }, [
          renderList(unref(A), (ve, vt) => ({
            name: ve,
            fn: withCtx((ot) => [
              renderSlot(M.$slots, ve, normalizeProps(guardReactiveProps({ ...ot })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Kr);
    };
  }
});
var Ct = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Ct || {});
var to = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: a,
  inline: n,
  emit: i,
  props: c,
  slots: w
}) => {
  const { defaultedConfig: f } = Ce(c), F = ref({}), p = ref(false), _ = ref({
    top: "0",
    left: "0"
  }), k = ref(false), R = toRef(c, "teleportCenter");
  watch(R, () => {
    _.value = JSON.parse(JSON.stringify({})), ae();
  });
  const z = (y) => {
    if (c.teleport) {
      const Q = y.getBoundingClientRect();
      return {
        left: Q.left + window.scrollX,
        top: Q.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, N = (y, Q) => {
    _.value.left = `${y + Q - F.value.width}px`;
  }, H = (y) => {
    _.value.left = `${y}px`;
  }, v = (y, Q) => {
    c.position === Ct.left && H(y), c.position === Ct.right && N(y, Q), c.position === Ct.center && (_.value.left = `${y + Q / 2 - F.value.width / 2}px`);
  }, O = (y) => {
    const { width: Q, height: A } = y.getBoundingClientRect(), { top: ne, left: de } = c.altPosition ? c.altPosition(y) : z(y);
    return { top: +ne, left: +de, width: Q, height: A };
  }, S = () => {
    _.value.left = "50%", _.value.top = "50%", _.value.transform = "translate(-50%, -50%)", _.value.position = "fixed", delete _.value.opacity;
  }, G = () => {
    const y = Ie(l), { top: Q, left: A, transform: ne } = c.altPosition(y);
    _.value = { top: `${Q}px`, left: `${A}px`, transform: ne ?? "" };
  }, ae = (y = true) => {
    var Q;
    if (!n.value.enabled) {
      if (R.value) return S();
      if (c.altPosition !== null) return G();
      if (y) {
        const A = c.teleport ? (Q = t.value) == null ? void 0 : Q.$el : e.value;
        A && (F.value = A.getBoundingClientRect()), i("recalculate-position");
      }
      return ie();
    }
  }, oe = ({ inputEl: y, left: Q, width: A }) => {
    window.screen.width > 768 && !p.value && v(Q, A), x(y);
  }, Z = (y) => {
    const { top: Q, left: A, height: ne, width: de } = O(y);
    _.value.top = `${ne + Q + +c.offset}px`, k.value = false, p.value || (_.value.left = `${A + de / 2 - F.value.width / 2}px`), oe({ inputEl: y, left: A, width: de });
  }, P = (y) => {
    const { top: Q, left: A, width: ne } = O(y);
    _.value.top = `${Q - +c.offset - F.value.height}px`, k.value = true, oe({ inputEl: y, left: A, width: ne });
  }, x = (y) => {
    if (c.autoPosition) {
      const { left: Q, width: A } = O(y), { left: ne, right: de } = F.value;
      if (!p.value) {
        if (Math.abs(ne) !== Math.abs(de)) {
          if (ne <= 0)
            return p.value = true, H(Q);
          if (de >= document.documentElement.clientWidth)
            return p.value = true, N(Q, A);
        }
        return v(Q, A);
      }
    }
  }, Y = () => {
    const y = Ie(l);
    if (y) {
      const { height: Q } = F.value, { top: A, height: ne } = y.getBoundingClientRect(), d = window.innerHeight - A - ne, m = A;
      return Q <= d ? Mt.bottom : Q > d && Q <= m ? Mt.top : d >= m ? Mt.bottom : Mt.top;
    }
    return Mt.bottom;
  }, q = (y) => Y() === Mt.bottom ? Z(y) : P(y), ie = () => {
    const y = Ie(l);
    if (y)
      return c.autoPosition ? q(y) : Z(y);
  }, fe = function(y) {
    if (y) {
      const Q = y.scrollHeight > y.clientHeight, ne = window.getComputedStyle(y).overflowY.indexOf("hidden") !== -1;
      return Q && !ne;
    }
    return true;
  }, h2 = function(y) {
    return !y || y === document.body || y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : fe(y) ? y : h2(
      y.assignedSlot && f.value.shadowDom ? y.assignedSlot.parentNode : y.parentNode
    );
  }, U = (y) => {
    if (y)
      switch (c.position) {
        case Ct.left:
          return { left: 0, transform: "translateX(0)" };
        case Ct.right:
          return { left: `${y.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${y.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: k,
    menuStyle: _,
    xCorrect: p,
    setMenuPosition: ae,
    getScrollableParent: h2,
    shadowRender: (y, Q) => {
      var u, b, I;
      const A = document.createElement("div"), ne = (u = Ie(l)) == null ? void 0 : u.getBoundingClientRect();
      A.setAttribute("id", "dp--temp-container");
      const de = (b = a.value) != null && b.clientWidth ? a.value : document.body;
      de.append(A);
      const d = U(ne), m = f.value.shadowDom ? Object.keys(w).filter(
        (s) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(s)
      ) : Object.keys(w), L = h(
        y,
        {
          ...Q,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...d }
        },
        Object.fromEntries(m.map((s) => [s, w[s]]))
      );
      render(L, A), F.value = (I = L.el) == null ? void 0 : I.getBoundingClientRect(), render(null, A), de.removeChild(A);
    }
  };
};
var mt = [
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
  { name: "hours-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-header", use: ["calendar", "time", "shared"] },
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
  { name: "quarter", use: ["shared"] },
  { name: "top-extra", use: ["shared", "month-year"] },
  { name: "tp-inline-arrow-up", use: ["shared", "time"] },
  { name: "tp-inline-arrow-down", use: ["shared", "time"] },
  { name: "menu-header", use: ["menu"] }
];
var ao = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var no = {
  all: () => mt,
  monthYear: () => mt.filter((e) => e.use.includes("month-year")),
  input: () => ao,
  timePicker: () => mt.filter((e) => e.use.includes("time")),
  action: () => mt.filter((e) => e.use.includes("action")),
  calendar: () => mt.filter((e) => e.use.includes("calendar")),
  menu: () => mt.filter((e) => e.use.includes("menu")),
  shared: () => mt.filter((e) => e.use.includes("shared")),
  yearMode: () => mt.filter((e) => e.use.includes("year-mode"))
};
var Je = (e, t, l) => {
  const a = [];
  return no[t]().forEach((n) => {
    e[n.name] && a.push(n.name);
  }), l != null && l.length && l.forEach((n) => {
    n.slot && a.push(n.slot);
  }), a;
};
var Xt = (e) => {
  const t = computed(() => (a) => e.value ? a ? e.value.open : e.value.close : ""), l = computed(() => (a) => e.value ? a ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: l };
};
var Jt = (e, t, l) => {
  const { defaultedRange: a, defaultedTz: n } = Ce(e), i = K(qe(K(), n.value.timezone)), c = ref([{ month: getMonth(i), year: getYear(i) }]), w = (k) => {
    const R = {
      hours: getHours(i),
      minutes: getMinutes(i),
      seconds: 0
    };
    return a.value.enabled ? [R[k], R[k]] : R[k];
  }, f = reactive({
    hours: w("hours"),
    minutes: w("minutes"),
    seconds: w("seconds")
  });
  watch(
    a,
    (k, R) => {
      k.enabled !== R.enabled && (f.hours = w("hours"), f.minutes = w("minutes"), f.seconds = w("seconds"));
    },
    { deep: true }
  );
  const F = computed({
    get: () => e.internalModelValue,
    set: (k) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", k);
    }
  }), p = computed(
    () => (k) => c.value[k] ? c.value[k].month : 0
  ), _ = computed(
    () => (k) => c.value[k] ? c.value[k].year : 0
  );
  return watch(
    F,
    (k, R) => {
      l && JSON.stringify(k ?? {}) !== JSON.stringify(R ?? {}) && l();
    },
    { deep: true }
  ), {
    calendars: c,
    time: f,
    modelValue: F,
    month: p,
    year: _,
    today: i
  };
};
var lo = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedMultiDates: a,
    defaultedUI: n,
    defaultedHighlight: i,
    defaultedTz: c,
    propDates: w,
    defaultedRange: f
  } = Ce(t), { isDisabled: F } = kt(t), p = ref(null), _ = ref(qe(/* @__PURE__ */ new Date(), c.value.timezone)), k = (u) => {
    !u.current && t.hideOffsetDates || (p.value = u.value);
  }, R = () => {
    p.value = null;
  }, z = (u) => Array.isArray(e.value) && f.value.enabled && e.value[0] && p.value ? u ? Be(p.value, e.value[0]) : Oe(p.value, e.value[0]) : true, N = (u, b) => {
    const I = () => e.value ? b ? e.value[0] || null : e.value[1] : null, s = e.value && Array.isArray(e.value) ? I() : null;
    return Me(K(u.value), s);
  }, H = (u) => {
    const b = Array.isArray(e.value) ? e.value[0] : null;
    return u ? !Oe(p.value ?? null, b) : true;
  }, v = (u, b = true) => (f.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !u.current ? false : Me(K(u.value), e.value[b ? 0 : 1]) : f.value.enabled ? N(u, b) && H(b) || Me(u.value, Array.isArray(e.value) ? e.value[0] : null) && z(b) : false, O = (u, b) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const I = Me(u.value, p.value);
      return b ? Be(e.value[0], u.value) && I : Oe(e.value[0], u.value) && I;
    }
    return false;
  }, S = (u) => !e.value || t.hideOffsetDates && !u.current ? false : f.value.enabled ? t.modelAuto && Array.isArray(e.value) ? Me(u.value, e.value[0] ? e.value[0] : _.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((b) => Me(b, u.value)) : Me(u.value, e.value ? e.value : _.value), G = (u) => {
    if (f.value.autoRange || t.weekPicker) {
      if (p.value) {
        if (t.hideOffsetDates && !u.current) return false;
        const b = addDays(p.value, +f.value.autoRange), I = it(K(p.value), t.weekStart);
        return t.weekPicker ? Me(I[1], K(u.value)) : Me(b, K(u.value));
      }
      return false;
    }
    return false;
  }, ae = (u) => {
    if (f.value.autoRange || t.weekPicker) {
      if (p.value) {
        const b = addDays(p.value, +f.value.autoRange);
        if (t.hideOffsetDates && !u.current) return false;
        const I = it(K(p.value), t.weekStart);
        return t.weekPicker ? Be(u.value, I[0]) && Oe(u.value, I[1]) : Be(u.value, p.value) && Oe(u.value, b);
      }
      return false;
    }
    return false;
  }, oe = (u) => {
    if (f.value.autoRange || t.weekPicker) {
      if (p.value) {
        if (t.hideOffsetDates && !u.current) return false;
        const b = it(K(p.value), t.weekStart);
        return t.weekPicker ? Me(b[0], u.value) : Me(p.value, u.value);
      }
      return false;
    }
    return false;
  }, Z = (u) => da(e.value, p.value, u.value), P = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, x = () => t.modelAuto ? An(t.internalModelValue) : true, Y = (u) => {
    if (t.weekPicker) return false;
    const b = f.value.enabled ? !v(u) && !v(u, false) : true;
    return !F(u.value) && !S(u) && !(!u.current && t.hideOffsetDates) && b;
  }, q = (u) => f.value.enabled ? t.modelAuto ? P() && S(u) : false : S(u), ie = (u) => i.value ? Dl(u.value, w.value.highlight) : false, fe = (u) => {
    const b = F(u.value);
    return b && (typeof i.value == "function" ? !i.value(u.value, b) : !i.value.options.highlightDisabled);
  }, h2 = (u) => {
    var b;
    return typeof i.value == "function" ? i.value(u.value) : (b = i.value.weekdays) == null ? void 0 : b.includes(u.value.getDay());
  }, U = (u) => (f.value.enabled || t.weekPicker) && (!(l.value.count > 0) || u.current) && x() && !(!u.current && t.hideOffsetDates) && !S(u) ? Z(u) : false, ee = (u) => {
    const { isRangeStart: b, isRangeEnd: I } = ne(u), s = f.value.enabled ? b || I : false;
    return {
      dp__cell_offset: !u.current,
      dp__pointer: !t.disabled && !(!u.current && t.hideOffsetDates) && !F(u.value),
      dp__cell_disabled: F(u.value),
      dp__cell_highlight: !fe(u) && (ie(u) || h2(u)) && !q(u) && !s && !oe(u) && !(U(u) && t.weekPicker) && !I,
      dp__cell_highlight_active: !fe(u) && (ie(u) || h2(u)) && q(u),
      dp__today: !t.noToday && Me(u.value, _.value) && u.current,
      "dp--past": Oe(u.value, _.value),
      "dp--future": Be(u.value, _.value)
    };
  }, y = (u) => ({
    dp__active_date: q(u),
    dp__date_hover: Y(u)
  }), Q = (u) => {
    if (e.value && !Array.isArray(e.value)) {
      const b = it(e.value, t.weekStart);
      return {
        ...d(u),
        dp__range_start: Me(b[0], u.value),
        dp__range_end: Me(b[1], u.value),
        dp__range_between_week: Be(u.value, b[0]) && Oe(u.value, b[1])
      };
    }
    return {
      ...d(u)
    };
  }, A = (u) => {
    if (e.value && Array.isArray(e.value)) {
      const b = it(e.value[0], t.weekStart), I = e.value[1] ? it(e.value[1], t.weekStart) : [];
      return {
        ...d(u),
        dp__range_start: Me(b[0], u.value) || Me(I[0], u.value),
        dp__range_end: Me(b[1], u.value) || Me(I[1], u.value),
        dp__range_between_week: Be(u.value, b[0]) && Oe(u.value, b[1]) || Be(u.value, I[0]) && Oe(u.value, I[1]),
        dp__range_between: Be(u.value, b[1]) && Oe(u.value, I[0])
      };
    }
    return {
      ...d(u)
    };
  }, ne = (u) => {
    const b = l.value.count > 0 ? u.current && v(u) && x() : v(u) && x(), I = l.value.count > 0 ? u.current && v(u, false) && x() : v(u, false) && x();
    return { isRangeStart: b, isRangeEnd: I };
  }, de = (u) => {
    const { isRangeStart: b, isRangeEnd: I } = ne(u);
    return {
      dp__range_start: b,
      dp__range_end: I,
      dp__range_between: U(u),
      dp__date_hover: Me(u.value, p.value) && !b && !I && !t.weekPicker,
      dp__date_hover_start: O(u, true),
      dp__date_hover_end: O(u, false)
    };
  }, d = (u) => ({
    ...de(u),
    dp__cell_auto_range: ae(u),
    dp__cell_auto_range_start: oe(u),
    dp__cell_auto_range_end: G(u)
  }), m = (u) => f.value.enabled ? f.value.autoRange ? d(u) : t.modelAuto ? { ...y(u), ...de(u) } : t.weekPicker ? A(u) : de(u) : t.weekPicker ? Q(u) : y(u);
  return {
    setHoverDate: k,
    clearHoverDate: R,
    getDayClassData: (u) => t.hideOffsetDates && !u.current ? {} : {
      ...ee(u),
      ...m(u),
      [t.dayClass ? t.dayClass(u.value, t.internalModelValue) : ""]: true,
      ...n.value.calendarCell ?? {}
    }
  };
};
var kt = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: a, defaultedMultiDates: n } = Ce(e), i = (h2) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(K(h2)) : !!sa(h2, a.value.disabledDates) : false, c = (h2) => a.value.maxDate ? e.yearPicker ? getYear(h2) > getYear(a.value.maxDate) : Be(h2, a.value.maxDate) : false, w = (h2) => a.value.minDate ? e.yearPicker ? getYear(h2) < getYear(a.value.minDate) : Oe(h2, a.value.minDate) : false, f = (h2) => {
    const U = c(h2), ee = w(h2), y = i(h2), A = t.value.months.map((L) => +L).includes(getMonth(h2)), ne = e.disabledWeekDays.length ? e.disabledWeekDays.some((L) => +L === getDay(h2)) : false, de = R(h2), d = getYear(h2), m = d < +e.yearRange[0] || d > +e.yearRange[1];
    return !(U || ee || y || A || m || ne || de);
  }, F = (h2, U) => Oe(...pt(a.value.minDate, h2, U)) || Me(...pt(a.value.minDate, h2, U)), p = (h2, U) => Be(...pt(a.value.maxDate, h2, U)) || Me(...pt(a.value.maxDate, h2, U)), _ = (h2, U, ee) => {
    let y = false;
    return a.value.maxDate && ee && p(h2, U) && (y = true), a.value.minDate && !ee && F(h2, U) && (y = true), y;
  }, k = (h2, U, ee, y) => {
    let Q = false;
    return y && (a.value.minDate || a.value.maxDate) ? a.value.minDate && a.value.maxDate ? Q = _(h2, U, ee) : (a.value.minDate && F(h2, U) || a.value.maxDate && p(h2, U)) && (Q = true) : Q = true, Q;
  }, R = (h2) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !sa(h2, a.value.allowedDates) : false, z = (h2) => !f(h2), N = (h2) => l.value.noDisabledRange ? !eachDayOfInterval({ start: h2[0], end: h2[1] }).some((ee) => z(ee)) : true, H = (h2) => {
    if (h2) {
      const U = getYear(h2);
      return U >= +e.yearRange[0] && U <= e.yearRange[1];
    }
    return true;
  }, v = (h2, U) => !!(Array.isArray(h2) && h2[U] && (l.value.maxRange || l.value.minRange) && H(h2[U])), O = (h2, U, ee = 0) => {
    if (v(U, ee) && H(h2)) {
      const y = differenceInCalendarDays(h2, U[ee]), Q = Cn(U[ee], h2), A = Q.length === 1 ? 0 : Q.filter((de) => z(de)).length, ne = Math.abs(y) - (l.value.minMaxRawRange ? 0 : A);
      if (l.value.minRange && l.value.maxRange)
        return ne >= +l.value.minRange && ne <= +l.value.maxRange;
      if (l.value.minRange) return ne >= +l.value.minRange;
      if (l.value.maxRange) return ne <= +l.value.maxRange;
    }
    return true;
  }, S = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, G = (h2) => Array.isArray(h2) ? [h2[0] ? Pa(h2[0]) : null, h2[1] ? Pa(h2[1]) : null] : Pa(h2), ae = (h2, U, ee) => h2.find(
    (y) => +y.hours === getHours(U) && y.minutes === "*" ? true : +y.minutes === getMinutes(U) && +y.hours === getHours(U)
  ) && ee, oe = (h2, U, ee) => {
    const [y, Q] = h2, [A, ne] = U;
    return !ae(y, A, ee) && !ae(Q, ne, ee) && ee;
  }, Z = (h2, U) => {
    const ee = Array.isArray(U) ? U : [U];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? oe(e.disabledTimes, ee, h2) : !ee.some((y) => ae(e.disabledTimes, y, h2)) : h2;
  }, P = (h2, U) => {
    const ee = Array.isArray(U) ? [St(U[0]), U[1] ? St(U[1]) : void 0] : St(U), y = !e.disabledTimes(ee);
    return h2 && y;
  }, x = (h2, U) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? Z(U, h2) : P(U, h2) : U, Y = (h2) => {
    let U = true;
    if (!h2 || S()) return true;
    const ee = !a.value.minDate && !a.value.maxDate ? G(h2) : h2;
    return (e.maxTime || a.value.maxDate) && (U = dn(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ye(ee),
      U
    )), (e.minTime || a.value.minDate) && (U = dn(
      e.minTime,
      a.value.minDate,
      "min",
      Ye(ee),
      U
    )), x(h2, U);
  }, q = (h2) => {
    if (!e.monthPicker) return true;
    let U = true;
    const ee = K(lt(h2));
    if (a.value.minDate && a.value.maxDate) {
      const y = K(lt(a.value.minDate)), Q = K(lt(a.value.maxDate));
      return Be(ee, y) && Oe(ee, Q) || Me(ee, y) || Me(ee, Q);
    }
    if (a.value.minDate) {
      const y = K(lt(a.value.minDate));
      U = Be(ee, y) || Me(ee, y);
    }
    if (a.value.maxDate) {
      const y = K(lt(a.value.maxDate));
      U = Oe(ee, y) || Me(ee, y);
    }
    return U;
  }, ie = computed(() => (h2) => !e.enableTimePicker || e.ignoreTimeValidation ? true : Y(h2)), fe = computed(() => (h2) => e.monthPicker ? Array.isArray(h2) && (l.value.enabled || n.value.enabled) ? !h2.filter((ee) => !q(ee)).length : q(h2) : true);
  return {
    isDisabled: z,
    validateDate: f,
    validateMonthYearInRange: k,
    isDateRangeAllowed: N,
    checkMinMaxRange: O,
    isValidTime: Y,
    isTimeValid: ie,
    isMonthValid: fe
  };
};
var ma = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), l = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var ro = (e, t, l) => {
  const a = ref(0), n = reactive({
    [Tt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Tt.calendar]: false,
    [Tt.header]: false
  }), i = computed(() => e.monthPicker || e.timePicker), c = (_) => {
    var k;
    if ((k = e.flow) != null && k.length) {
      if (!_ && i.value) return p();
      n[_] = true, Object.keys(n).filter((R) => !n[R]).length || p();
    }
  }, w = () => {
    var _, k;
    (_ = e.flow) != null && _.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), p()), ((k = e.flow) == null ? void 0 : k.length) === a.value && nextTick().then(() => f());
  }, f = () => {
    a.value = -1;
  }, F = (_, k, ...R) => {
    var z, N;
    e.flow[a.value] === _ && l.value && ((N = (z = l.value)[k]) == null || N.call(z, ...R));
  }, p = (_ = 0) => {
    _ && (a.value += _), F(He.month, "toggleMonthPicker", true), F(He.year, "toggleYearPicker", true), F(He.calendar, "toggleTimePicker", false, true), F(He.time, "toggleTimePicker", true, true);
    const k = e.flow[a.value];
    (k === He.hours || k === He.minutes || k === He.seconds) && F(k, "toggleTimePicker", true, true, k);
  };
  return { childMount: c, updateFlowStep: w, resetFlow: f, handleFlow: p, flowStep: a };
};
var oo = {
  key: 1,
  class: "dp__input_wrap"
};
var so = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-disabled", "aria-invalid"];
var uo = {
  key: 2,
  class: "dp--clear-btn"
};
var io = ["aria-label"];
var co = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...ca
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
    "real-blur",
    "text-input"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTextInput: i,
      defaultedAriaLabels: c,
      defaultedInline: w,
      defaultedConfig: f,
      defaultedRange: F,
      defaultedMultiDates: p,
      defaultedUI: _,
      getDefaultPattern: k,
      getDefaultStartTime: R
    } = Ce(n), { checkMinMaxRange: z } = kt(n), N = ref(), H = ref(null), v = ref(false), O = ref(false), S = ref(false), G = ref(null), ae = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !i.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !i.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: typeof n.state == "boolean" ? n.state : false,
        dp__input_invalid: typeof n.state == "boolean" ? !n.state : false,
        dp__input_focus: v.value || n.isMenuOpen,
        dp__input_reg: !i.value.enabled,
        ..._.value.input ?? {}
      })
    ), oe = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), N.value = null);
    }, Z = (d) => {
      const m = R();
      return Ml(
        d,
        i.value.format ?? k(),
        m ?? On({}, n.enableSeconds),
        n.inputValue,
        S.value,
        n.formatLocale
      );
    }, P = (d) => {
      const { rangeSeparator: m } = i.value, [L, u] = d.split(`${m}`);
      if (L) {
        const b = Z(L.trim()), I = u ? Z(u.trim()) : null;
        if (isAfter(b, I)) return;
        const s = b && I ? [b, I] : [b];
        z(I, s, 0) && (N.value = b ? s : null);
      }
    }, x = () => {
      S.value = true;
    }, Y = (d) => {
      if (F.value.enabled)
        P(d);
      else if (p.value.enabled) {
        const m = d.split(";");
        N.value = m.map((L) => Z(L.trim())).filter((L) => L);
      } else
        N.value = Z(d);
    }, q = (d) => {
      var L;
      const m = typeof d == "string" ? d : (L = d.target) == null ? void 0 : L.value;
      m !== "" ? (i.value.openMenu && !n.isMenuOpen && a("open"), Y(m), a("set-input-date", N.value)) : oe(), S.value = false, a("update:input-value", m), a("text-input", d, N.value);
    }, ie = (d) => {
      i.value.enabled ? (Y(d.target.value), i.value.enterSubmit && Fa(N.value) && n.inputValue !== "" ? (a("set-input-date", N.value, true), N.value = null) : i.value.enterSubmit && n.inputValue === "" && (N.value = null, a("clear"))) : U(d);
    }, fe = (d, m) => {
      var L;
      G.value && m && !O.value && (d.preventDefault(), O.value = true, (L = G.value) == null || L.focus()), i.value.enabled && i.value.tabSubmit && Y(d.target.value), i.value.tabSubmit && Fa(N.value) && n.inputValue !== "" ? (a("set-input-date", N.value, true, true), N.value = null) : i.value.tabSubmit && n.inputValue === "" && (N.value = null, a("clear", true));
    }, h2 = () => {
      v.value = true, a("focus"), nextTick().then(() => {
        var d;
        i.value.enabled && i.value.selectOnFocus && ((d = H.value) == null || d.select());
      });
    }, U = (d) => {
      if (d.preventDefault(), yt(d, f.value, true), i.value.enabled && i.value.openMenu && !w.value.input) {
        if (i.value.openMenu === "open" && !n.isMenuOpen) return a("open");
        if (i.value.openMenu === "toggle") return a("toggle");
      } else i.value.enabled || a("toggle");
    }, ee = () => {
      a("real-blur"), v.value = false, (!n.isMenuOpen || w.value.enabled && w.value.input) && a("blur"), n.autoApply && i.value.enabled && N.value && !n.isMenuOpen && (a("set-input-date", N.value), a("select-date"), N.value = null);
    }, y = (d) => {
      yt(d, f.value, true), a("clear");
    }, Q = (d, m) => {
      if (d.key === "Tab" && fe(d, m), d.key === "Enter" && ie(d), !i.value.enabled) {
        if (d.code === "Tab") return;
        d.preventDefault();
      }
    }, A = () => {
      var d;
      (d = H.value) == null || d.focus({ preventScroll: true });
    }, ne = (d) => {
      N.value = d;
    }, de = (d) => {
      d.key === Pe.tab && (O.value = false, fe(d));
    };
    return t({
      focusInput: A,
      setParsedDate: ne
    }), (d, m) => {
      var L, u;
      return openBlock(), createElementBlock("div", { onClick: U }, [
        d.$slots.trigger && !d.$slots["dp-input"] && !unref(w).enabled ? renderSlot(d.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !d.$slots.trigger && (!unref(w).enabled || unref(w).input) ? (openBlock(), createElementBlock("div", oo, [
          d.$slots["dp-input"] && !d.$slots.trigger && (!unref(w).enabled || unref(w).enabled && unref(w).input) ? renderSlot(d.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: q,
            onEnter: ie,
            onTab: fe,
            onClear: y,
            onBlur: ee,
            onKeypress: Q,
            onPaste: x,
            onFocus: h2,
            openMenu: () => d.$emit("open"),
            closeMenu: () => d.$emit("close"),
            toggleMenu: () => d.$emit("toggle")
          }) : createCommentVNode("", true),
          d.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: d.uid ? `dp-input-${d.uid}` : void 0,
            ref_key: "inputRef",
            ref: H,
            "data-test": "dp-input",
            name: d.name,
            class: normalizeClass(ae.value),
            inputmode: unref(i).enabled ? "text" : "none",
            placeholder: d.placeholder,
            disabled: d.disabled,
            readonly: d.readonly,
            required: d.required,
            value: e.inputValue,
            autocomplete: d.autocomplete,
            "aria-disabled": d.disabled || void 0,
            "aria-invalid": d.state === false ? true : void 0,
            onInput: q,
            onBlur: ee,
            onFocus: h2,
            onKeypress: Q,
            onKeydown: m[0] || (m[0] = (b) => Q(b, true)),
            onPaste: x
          }, null, 42, so)),
          createBaseVNode("div", {
            onClick: m[3] || (m[3] = (b) => a("toggle"))
          }, [
            d.$slots["input-icon"] && !d.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: m[1] || (m[1] = (b) => a("toggle"))
            }, [
              renderSlot(d.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !d.$slots["input-icon"] && !d.hideInputIcon && !d.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
              key: 1,
              "aria-label": (L = unref(c)) == null ? void 0 : L.calendarIcon,
              class: "dp__input_icon dp__input_icons",
              onClick: m[2] || (m[2] = (b) => a("toggle"))
            }, null, 8, ["aria-label"])) : createCommentVNode("", true)
          ]),
          d.$slots["clear-icon"] && e.inputValue && d.clearable && !d.disabled && !d.readonly ? (openBlock(), createElementBlock("span", uo, [
            renderSlot(d.$slots, "clear-icon", { clear: y })
          ])) : createCommentVNode("", true),
          d.clearable && !d.$slots["clear-icon"] && e.inputValue && !d.disabled && !d.readonly ? (openBlock(), createElementBlock("button", {
            key: 3,
            ref_key: "clearBtnRef",
            ref: G,
            "aria-label": (u = unref(c)) == null ? void 0 : u.clearInput,
            class: "dp--clear-btn",
            type: "button",
            onBlur: m[4] || (m[4] = (b) => O.value = false),
            onKeydown: m[5] || (m[5] = (b) => unref(Ke)(b, () => y(b), true, de)),
            onClick: m[6] || (m[6] = withModifiers((b) => y(b), ["prevent"]))
          }, [
            createVNode(unref(Mn), {
              class: "dp__input_icons",
              "data-test": "clear-icon"
            })
          ], 40, io)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var fo = typeof window < "u" ? window : void 0;
var Ya = () => {
};
var vo = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var mo = (e, t, l, a) => {
  if (!e) return Ya;
  let n = Ya;
  const i = watch(
    () => unref(e),
    (w) => {
      n(), w && (w.addEventListener(t, l, a), n = () => {
        w.removeEventListener(t, l, a), n = Ya;
      });
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    i(), n();
  };
  return vo(c), c;
};
var po = (e, t, l, a = {}) => {
  const { window: n = fo, event: i = "pointerdown" } = a;
  return n ? mo(n, i, (w) => {
    const f = Ie(e), F = Ie(t);
    !f || !F || f === w.target || w.composedPath().includes(f) || w.composedPath().includes(F) || l(w);
  }, { passive: true }) : void 0;
};
var yo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...ca
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
    "invalid-date",
    "overlay-toggle",
    "text-input"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = useSlots(), c = ref(false), w = toRef(n, "modelValue"), f = toRef(n, "timezone"), F = ref(null), p = ref(null), _ = ref(null), k = ref(false), R = ref(null), z = ref(false), N = ref(false), H = ref(false), v = ref(false), { setMenuFocused: O, setShiftKey: S } = Nn(), { clearArrowNav: G } = bt(), { validateDate: ae, isValidTime: oe } = kt(n), {
      defaultedTransitions: Z,
      defaultedTextInput: P,
      defaultedInline: x,
      defaultedConfig: Y,
      defaultedRange: q,
      defaultedMultiDates: ie
    } = Ce(n), { menuTransition: fe, showTransition: h2 } = Xt(Z);
    onMounted(() => {
      u(n.modelValue), nextTick().then(() => {
        if (!x.value.enabled) {
          const g = de(R.value);
          g == null || g.addEventListener("scroll", C), window == null || window.addEventListener("resize", V);
        }
      }), x.value.enabled && (c.value = true), window == null || window.addEventListener("keyup", se), window == null || window.addEventListener("keydown", M);
    }), onUnmounted(() => {
      if (!x.value.enabled) {
        const g = de(R.value);
        g == null || g.removeEventListener("scroll", C), window == null || window.removeEventListener("resize", V);
      }
      window == null || window.removeEventListener("keyup", se), window == null || window.removeEventListener("keydown", M);
    });
    const U = Je(i, "all", n.presetDates), ee = Je(i, "input");
    watch(
      [w, f],
      () => {
        u(w.value);
      },
      { deep: true }
    );
    const { openOnTop: y, menuStyle: Q, xCorrect: A, setMenuPosition: ne, getScrollableParent: de, shadowRender: d } = to({
      menuRef: F,
      menuRefInner: p,
      inputRef: _,
      pickerWrapperRef: R,
      inline: x,
      emit: a,
      props: n,
      slots: i
    }), {
      inputValue: m,
      internalModelValue: L,
      parseExternalModelValue: u,
      emitModelValue: b,
      formatInputValue: I,
      checkBeforeEmit: s
    } = Gl(a, n, k), le = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: x.value.enabled,
        "dp--flex-display-collapsed": H.value,
        dp__flex_display_with_input: x.value.input
      })
    ), pe = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), $ = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || x.value.enabled
    } : {}), ge = computed(() => ({ class: "dp__outer_menu_wrap" })), r = computed(() => x.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), B = () => {
      var g, W;
      return (W = (g = _.value) == null ? void 0 : g.$el) == null ? void 0 : W.getBoundingClientRect();
    }, C = () => {
      c.value && (Y.value.closeOnScroll ? Xe() : ne());
    }, V = () => {
      var W;
      c.value && ne();
      const g = (W = p.value) == null ? void 0 : W.$el.getBoundingClientRect().width;
      H.value = document.body.offsetWidth <= g;
    }, se = (g) => {
      g.key === "Tab" && !x.value.enabled && !n.teleport && Y.value.tabOutClosesMenu && (R.value.contains(document.activeElement) || Xe()), N.value = g.shiftKey;
    }, M = (g) => {
      N.value = g.shiftKey;
    }, E = () => {
      !n.disabled && !n.readonly && (d(mn, n), ne(false), c.value = true, c.value && a("open"), c.value || Ft(), u(n.modelValue));
    }, ce = () => {
      var g;
      m.value = "", Ft(), (g = _.value) == null || g.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), Y.value.closeOnClearValue && Xe();
    }, he = () => {
      const g = L.value;
      return !g || !Array.isArray(g) && ae(g) ? true : Array.isArray(g) ? ie.value.enabled || g.length === 2 && ae(g[0]) && ae(g[1]) ? true : q.value.partialRange && !n.timePicker ? ae(g[0]) : false : false;
    }, et = () => {
      s() && he() ? (b(), Xe()) : a("invalid-select", L.value);
    }, ve = (g) => {
      vt(), b(), Y.value.closeOnAutoApply && !g && Xe();
    }, vt = () => {
      _.value && P.value.enabled && _.value.setParsedDate(L.value);
    }, ot = (g = false) => {
      n.autoApply && oe(L.value) && he() && (q.value.enabled && Array.isArray(L.value) ? (q.value.partialRange || L.value.length === 2) && ve(g) : ve(g));
    }, Ft = () => {
      P.value.enabled || (L.value = null);
    }, Xe = () => {
      x.value.enabled || (c.value && (c.value = false, A.value = false, O(false), S(false), G(), a("closed"), m.value && u(w.value)), Ft(), a("blur"));
    }, Lt = (g, W, re = false) => {
      if (!g) {
        L.value = null;
        return;
      }
      const Ae = Array.isArray(g) ? !g.some((wt) => !ae(wt)) : ae(g), Fe = oe(g);
      Ae && Fe && (v.value = true, L.value = g, W && (z.value = re, et(), a("text-submit")), nextTick().then(() => {
        v.value = false;
      }));
    }, pa = () => {
      n.autoApply && oe(L.value) && b(), vt();
    }, Zt = () => c.value ? Xe() : E(), ya = (g) => {
      L.value = g;
    }, ga = () => {
      P.value.enabled && (k.value = true, I()), a("focus");
    }, ha = () => {
      if (P.value.enabled && (k.value = false, u(n.modelValue), z.value)) {
        const g = wl(R.value, N.value);
        g == null || g.focus();
      }
      a("blur");
    }, ba = (g) => {
      p.value && p.value.updateMonthYear(0, {
        month: rn(g.month),
        year: rn(g.year)
      });
    }, ka = (g) => {
      u(g ?? n.modelValue);
    }, wa = (g, W) => {
      var re;
      (re = p.value) == null || re.switchView(g, W);
    }, Za = (g) => Y.value.onClickOutside ? Y.value.onClickOutside(g) : Xe(), D = (g = 0) => {
      var W;
      (W = p.value) == null || W.handleFlow(g);
    };
    return po(F, _, () => Za(he)), t({
      closeMenu: Xe,
      selectDate: et,
      clearValue: ce,
      openMenu: E,
      onScroll: C,
      formatInputValue: I,
      // exposed for testing purposes
      updateInternalModelValue: ya,
      // modify internal modelValue
      setMonthYear: ba,
      parseModel: ka,
      switchView: wa,
      toggleMenu: Zt,
      handleFlow: D,
      dpWrapMenuRef: F
    }), (g, W) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: R,
      class: normalizeClass(le.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(co, mergeProps({
        ref_key: "inputRef",
        ref: _,
        "input-value": unref(m),
        "onUpdate:inputValue": W[0] || (W[0] = (re) => isRef(m) ? m.value = re : null),
        "is-menu-open": c.value
      }, g.$props, {
        onClear: ce,
        onOpen: E,
        onSetInputDate: Lt,
        onSetEmptyDate: unref(b),
        onSelectDate: et,
        onToggle: Zt,
        onClose: Xe,
        onFocus: ga,
        onBlur: ha,
        onRealBlur: W[1] || (W[1] = (re) => k.value = false),
        onTextInput: W[2] || (W[2] = (re) => g.$emit("text-input", re))
      }), createSlots({ _: 2 }, [
        renderList(unref(ee), (re, Ae) => ({
          name: re,
          fn: withCtx((Fe) => [
            renderSlot(g.$slots, re, normalizeProps(guardReactiveProps(Fe)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(g.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps($.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(fe)(unref(y)),
            css: unref(h2) && !unref(x).enabled
          }, {
            default: withCtx(() => [
              c.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: F
              }, ge.value, {
                class: { "dp--menu-wrapper": !unref(x).enabled },
                style: unref(x).enabled ? void 0 : unref(Q)
              }), [
                createVNode(mn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: p
                }, g.$props, {
                  "internal-model-value": unref(L),
                  "onUpdate:internalModelValue": W[3] || (W[3] = (re) => isRef(L) ? L.value = re : null),
                  class: { [pe.value]: true, "dp--menu-wrapper": g.teleport },
                  "open-on-top": unref(y),
                  "no-overlay-focus": r.value,
                  collapse: H.value,
                  "get-input-rect": B,
                  "is-text-input-date": v.value,
                  onClosePicker: Xe,
                  onSelectDate: et,
                  onAutoApply: ot,
                  onTimeUpdate: pa,
                  onFlowStep: W[4] || (W[4] = (re) => g.$emit("flow-step", re)),
                  onUpdateMonthYear: W[5] || (W[5] = (re) => g.$emit("update-month-year", re)),
                  onInvalidSelect: W[6] || (W[6] = (re) => g.$emit("invalid-select", unref(L))),
                  onAutoApplyInvalid: W[7] || (W[7] = (re) => g.$emit("invalid-select", re)),
                  onInvalidFixedRange: W[8] || (W[8] = (re) => g.$emit("invalid-fixed-range", re)),
                  onRecalculatePosition: unref(ne),
                  onTooltipOpen: W[9] || (W[9] = (re) => g.$emit("tooltip-open", re)),
                  onTooltipClose: W[10] || (W[10] = (re) => g.$emit("tooltip-close", re)),
                  onTimePickerOpen: W[11] || (W[11] = (re) => g.$emit("time-picker-open", re)),
                  onTimePickerClose: W[12] || (W[12] = (re) => g.$emit("time-picker-close", re)),
                  onAmPmChange: W[13] || (W[13] = (re) => g.$emit("am-pm-change", re)),
                  onRangeStart: W[14] || (W[14] = (re) => g.$emit("range-start", re)),
                  onRangeEnd: W[15] || (W[15] = (re) => g.$emit("range-end", re)),
                  onDateUpdate: W[16] || (W[16] = (re) => g.$emit("date-update", re)),
                  onInvalidDate: W[17] || (W[17] = (re) => g.$emit("invalid-date", re)),
                  onOverlayToggle: W[18] || (W[18] = (re) => g.$emit("overlay-toggle", re))
                }), createSlots({ _: 2 }, [
                  renderList(unref(U), (re, Ae) => ({
                    name: re,
                    fn: withCtx((Fe) => [
                      renderSlot(g.$slots, re, normalizeProps(guardReactiveProps({ ...Fe })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "no-overlay-focus", "collapse", "is-text-input-date", "onRecalculatePosition"])
              ], 16)) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name", "css"])
        ]),
        _: 3
      }, 16))
    ], 2));
  }
});
var Vn = (() => {
  const e = yo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var go = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Vn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(go).forEach(([e, t]) => {
  e !== "default" && (Vn[e] = t);
});
export {
  Vn as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
