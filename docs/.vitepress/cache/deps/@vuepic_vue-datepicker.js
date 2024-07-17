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
} from "./chunk-Q5BS67JP.js";
import {
  __publicField
} from "./chunk-EQCVQC35.js";

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

// node_modules/.pnpm/@vuepic+vue-datepicker@9.0.0_vue@3.4.31_typescript@5.5.3_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
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
function Dn() {
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
Dn.compatConfig = {
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
  return a || G();
};
var cl = (e, t, l) => {
  const a = t.dateInTz ? qe(new Date(e), t.dateInTz) : G(e);
  return l ? Ge(a, true) : a;
};
var Na = (e, t, l) => {
  if (!e) return null;
  const a = l ? Ge(G(e), true) : G(e);
  return t ? t.exactMatch ? cl(e, t, l) : qe(a, t.timezone) : a;
};
var fl = (e) => {
  if (!e) return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), a = new Date(t.toLocaleString("en-US", { timeZone: e })), n = a.getTimezoneOffset() / 60;
  return (+l - +a) / (1e3 * 60 * 60) - n;
};
var nt = ((e) => (e.month = "month", e.year = "year", e))(nt || {});
var Mt = ((e) => (e.top = "top", e.bottom = "bottom", e))(Mt || {});
var Tt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Tt || {});
var He = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
var vl = ["timestamp", "date", "iso"];
var je = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(je || {});
var Pe = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Pe || {});
function ln(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function ml(e) {
  return (t) => format(qe(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var pl = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(ml(e));
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
    a.push({ value: +n, text: Tn(n, t) });
  return l ? a.reverse() : a;
};
var Mn = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    const c = i < 10 ? `0${i}` : i;
    return /* @__PURE__ */ new Date(`2017-${c}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const i = l === "long" ? "LLLL" : "LLL";
      return a.map((c, k) => {
        const v = format(qe(c, "UTC"), i, { locale: e });
        return {
          text: v.charAt(0).toUpperCase() + v.substring(1),
          value: k
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return a.map((i, c) => {
    const k = n.format(i);
    return {
      text: k.charAt(0).toUpperCase() + k.substring(1),
      value: c
    };
  });
};
var yl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var gl = (e) => ({ type: "dot", ...e ?? {} });
var $n = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ga = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ye = (e) => e;
var rn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var on = (e) => e === null;
var An = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var hl = (e) => {
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
var Yt = (e, t) => hl(e).map((l) => l.map((a) => {
  const { active: n, disabled: i, isBetween: c, highlighted: k } = t(a);
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
      "dp--highlighted": k
    }
  };
}));
var yt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var bl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function kl(e, t) {
  let l = [...document.querySelectorAll(bl())];
  l = l.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = l.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= l.length))
    return l[a + (t ? -1 : 1)];
}
var Ea = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Tn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Qa = (e) => format(e, "dd-MM-yyyy");
var $a = (e) => Array.isArray(e);
var sa = (e, t) => t.get(Qa(e));
var wl = (e, t) => e ? t ? t instanceof Map ? !!sa(e, t) : t(G(e)) : false : true;
var Ke = (e, t, l = false, a) => {
  if (e.key === Pe.enter || e.key === Pe.space)
    return l && e.preventDefault(), t();
  if (a) return a(e);
};
var Dl = () => ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].some(
  (e) => navigator.userAgent.includes(e)
) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
var sn = (e, t, l, a, n, i) => {
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
    return sn(e, t, c, a, n, i);
  if (Array.isArray(t)) {
    let k = null;
    for (const v of t)
      if (k = sn(e, v, c, a, n, i), k)
        break;
    return k;
  }
  return typeof t == "function" ? t(e) : null;
};
var G = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var $l = (e, t, l) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), i = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), k = e.getMinutes().toString().padStart(2, "0"), v = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${i}T${c}:${k}:${v}.000Z`;
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
  const l = G(JSON.parse(JSON.stringify(e))), a = set(l, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(a) : a;
};
var gt = (e, t, l, a) => {
  let n = e ? G(e) : G();
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
var Sn = (e, t) => {
  if (t) {
    const l = getYear(G(t));
    if (l > e) return 12;
    if (l === e) return getMonth(G(t));
  }
};
var Pn = (e, t) => {
  if (t) {
    const l = getYear(G(t));
    return l < e ? -1 : l === e ? getMonth(G(t)) : void 0;
  }
};
var It = (e) => {
  if (e) return getYear(G(e));
};
var Rn = (e, t) => {
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
var Cn = (e, t) => {
  const l = {
    hours: getHours(G()),
    minutes: getMinutes(G()),
    seconds: t ? getSeconds(G()) : 0
  };
  return Object.assign(l, e);
};
var pt = (e, t, l) => [set(G(e), { date: 1 }), set(G(), { month: t, year: l, date: 1 })];
var dt = (e, t, l) => {
  let a = e ? G(e) : G();
  return (t || t === 0) && (a = setMonth(a, t)), l && (a = setYear(a, l)), a;
};
var On = (e, t, l, a, n) => {
  if (!a || n && !t || !n && !l) return false;
  const i = n ? addMonths(e, 1) : subMonths(e, 1), c = [getMonth(i), getYear(i)];
  return n ? !Sl(...c, t) : !Tl(...c, l);
};
var Tl = (e, t, l) => Oe(...pt(l, e, t)) || Me(...pt(l, e, t));
var Sl = (e, t, l) => Be(...pt(l, e, t)) || Me(...pt(l, e, t));
var _n = (e, t, l, a, n, i, c) => {
  if (typeof t == "function" && !c) return t(e);
  const k = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], i, k)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], i, k) : ""}` : format(e, i, k);
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
var Pl = (e, t) => set(t ?? G(), {
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
var Sa = (e, t, l) => e ? Pl(e, t) : G(l ?? t);
var un = (e, t, l, a, n) => {
  if (Array.isArray(a)) {
    const c = Sa(e, a[0], t), k = Sa(e, a[1], t);
    return Ta(a[0], c, l, !!t) && Ta(a[1], k, l, !!t) && n;
  }
  const i = Sa(e, a, t);
  return Ta(a, i, l, !!t) && n;
};
var Pa = (e) => set(G(), St(e));
var Rl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(G(l)) === t).map((l) => getMonth(l)) : [];
var Bn = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((a) => a.month === t && a.year === l);
var qa = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Yn = (e) => format(e, "yyyy-MM-dd");
var Ht = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var In = () => {
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
  const e = computed(() => aa.value ? [...Se.selectionGrid, Se.actionRow].filter((f) => f.length) : Ca.value ? [
    ...Se.timePicker[0],
    ...Se.timePicker[1],
    _a.value ? [] : [Ra.value],
    Se.actionRow
  ].filter((f) => f.length) : Oa.value ? [...Se.monthPicker, Se.actionRow] : [Se.monthYear, ...Se.calendar, Se.time, Se.actionRow].filter((f) => f.length)), t = (f) => {
    ze.value = f ? ze.value + 1 : ze.value - 1;
    let B = null;
    e.value[_e.value] && (B = e.value[_e.value][ze.value]), !B && e.value[_e.value + (f ? 1 : -1)] ? (_e.value = _e.value + (f ? 1 : -1), ze.value = f ? 0 : e.value[_e.value].length - 1) : B || (ze.value = f ? ze.value - 1 : ze.value + 1);
  }, l = (f) => {
    if (_e.value === 0 && !f || _e.value === e.value.length && f) return;
    _e.value = f ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][ze.value] && ze.value !== 0 && (ze.value = e.value[_e.value].length - 1) : _e.value = f ? _e.value - 1 : _e.value + 1;
  }, a = (f) => {
    let B = null;
    e.value[_e.value] && (B = e.value[_e.value][ze.value]), B ? B.focus({ preventScroll: !aa.value }) : ze.value = f ? ze.value - 1 : ze.value + 1;
  }, n = () => {
    t(true), a(true);
  }, i = () => {
    t(false), a(false);
  }, c = () => {
    l(false), a(true);
  }, k = () => {
    l(true), a(true);
  }, v = (f, B) => {
    Se[B] = f;
  }, L = (f, B) => {
    Se[B] = f;
  }, y = () => {
    ze.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: v,
    buildMultiLevelMatrix: L,
    setTimePickerBackRef: (f) => {
      Ra.value = f;
    },
    setSelectionGrid: (f) => {
      aa.value = f, y(), f || (Se.selectionGrid = []);
    },
    setTimePicker: (f, B = false) => {
      Ca.value = f, _a.value = B, y(), f || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (f, B = 0) => {
      Se.timePicker[B] = f;
    },
    arrowRight: n,
    arrowLeft: i,
    arrowUp: c,
    arrowDown: k,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], aa.value = false, Ca.value = false, _a.value = false, Oa.value = false, y(), Ra.value = null;
    },
    setMonthPicker: (f) => {
      Oa.value = f, y();
    },
    refSets: Se
    // exposed for testing
  };
};
var dn = (e) => ({
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
var cn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Ol = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e) return { ...l, count: cn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, i = cn(n);
  return Object.assign(l, a, { count: i });
};
var _l = (e, t, l) => e || (typeof l == "string" ? l : t);
var Bl = (e) => typeof e == "boolean" ? e ? dn({}) : false : dn(e);
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
    dates: Array.isArray(e) ? e.map((l) => G(l)) : [],
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
    const oe = e.enableSeconds ? ":ss" : "", X = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${X}${oe}` : `hh${X}${oe} aa`;
  }, l = () => {
    var oe;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((oe = U.value) == null ? void 0 : oe.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (oe) => Cn(oe, e.enableSeconds), n = () => Q.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, i = computed(() => Ol(e.multiCalendars)), c = computed(() => n()), k = computed(() => Cl(e.ariaLabels)), v = computed(() => Il(e.filters)), L = computed(() => Bl(e.transitions)), y = computed(() => Nl(e.actionRow)), I = computed(
    () => _l(e.previewFormat, e.format, l())
  ), b = computed(() => Yl(e.textInput)), R = computed(() => El(e.inline)), H = computed(() => Fl(e.config)), E = computed(() => Ll(e.highlight)), U = computed(() => zl(e.weekNumbers)), f = computed(() => Ul(e.timezone)), B = computed(() => jl(e.multiDates)), T = computed(
    () => Wl({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: E.value,
      markers: e.markers,
      timezone: f.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), Q = computed(() => Hl(e.range)), te = computed(() => Kl(e.ui));
  return {
    defaultedTransitions: L,
    defaultedMultiCalendars: i,
    defaultedStartTime: c,
    defaultedAriaLabels: k,
    defaultedFilters: v,
    defaultedActionRow: y,
    defaultedPreviewFormat: I,
    defaultedTextInput: b,
    defaultedInline: R,
    defaultedConfig: H,
    defaultedHighlight: E,
    defaultedWeekNumbers: U,
    defaultedRange: Q,
    propDates: T,
    defaultedTz: f,
    defaultedMultiDates: B,
    defaultedUI: te,
    getDefaultPattern: l,
    getDefaultStartTime: n
  };
};
var Gl = (e, t, l) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: i, defaultedTz: c, defaultedMultiDates: k, getDefaultPattern: v } = Ce(t), L = ref(""), y = toRef(t, "format"), I = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, h2(true));
    },
    { deep: true }
  ), watch(i, (s, le) => {
    s.enabled !== le.enabled && (a.value = null);
  }), watch(y, () => {
    K();
  });
  const b = (s) => c.value.timezone && c.value.convertModel ? qe(s, c.value.timezone) : s, R = (s) => {
    if (c.value.timezone && c.value.convertModel) {
      const le = fl(c.value.timezone);
      return addHours(s, le);
    }
    return s;
  }, H = (s, le, pe = false) => _n(
    s,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    le ?? v(),
    pe
  ), E = (s) => s ? t.modelType ? ne(s) : {
    hours: getHours(s),
    minutes: getMinutes(s),
    seconds: t.enableSeconds ? getSeconds(s) : 0
  } : null, U = (s) => t.modelType ? ne(s) : { month: getMonth(s), year: getYear(s) }, f = (s) => Array.isArray(s) ? k.value.enabled ? s.map((le) => B(le, setYear(G(), le))) : ta(
    () => [
      setYear(G(), s[0]),
      s[1] ? setYear(G(), s[1]) : Rt(i.value.partialRange)
    ],
    i.value.enabled
  ) : setYear(G(), +s), B = (s, le) => (typeof s == "string" || typeof s == "number") && t.modelType ? $(s) : le, T = (s) => Array.isArray(s) ? [
    B(
      s[0],
      gt(null, +s[0].hours, +s[0].minutes, s[0].seconds)
    ),
    B(
      s[1],
      gt(null, +s[1].hours, +s[1].minutes, s[1].seconds)
    )
  ] : B(s, gt(null, s.hours, s.minutes, s.seconds)), Q = (s) => {
    const le = set(G(), { date: 1 });
    return Array.isArray(s) ? k.value.enabled ? s.map((pe) => B(pe, dt(le, +pe.month, +pe.year))) : ta(
      () => [
        B(s[0], dt(le, +s[0].month, +s[0].year)),
        B(
          s[1],
          s[1] ? dt(le, +s[1].month, +s[1].year) : Rt(i.value.partialRange)
        )
      ],
      i.value.enabled
    ) : B(s, dt(le, +s.month, +s.year));
  }, te = (s) => {
    if (Array.isArray(s))
      return s.map((le) => $(le));
    throw new Error(Ga.dateArr("multi-dates"));
  }, oe = (s) => {
    if (Array.isArray(s) && i.value.enabled) {
      const le = s[0], pe = s[1];
      return [
        G(Array.isArray(le) ? le[0] : null),
        G(Array.isArray(pe) ? pe[0] : null)
      ];
    }
    return G(s[0]);
  }, X = (s) => t.modelAuto ? Array.isArray(s) ? [$(s[0]), $(s[1])] : t.autoApply ? [$(s)] : [$(s), null] : Array.isArray(s) ? ta(
    () => s[1] ? [
      $(s[0]),
      s[1] ? $(s[1]) : Rt(i.value.partialRange)
    ] : [$(s[0])],
    i.value.enabled
  ) : $(s), S = () => {
    Array.isArray(a.value) && i.value.enabled && a.value.length === 1 && a.value.push(Rt(i.value.partialRange));
  }, ae = () => {
    const s = a.value;
    return [
      ne(s[0]),
      s[1] ? ne(s[1]) : Rt(i.value.partialRange)
    ];
  }, O = () => a.value[1] ? ae() : ne(Ye(a.value[0])), q = () => (a.value || []).map((s) => ne(s)), ie = (s = false) => (s || S(), t.modelAuto ? O() : k.value.enabled ? q() : Array.isArray(a.value) ? ta(() => ae(), i.value.enabled) : ne(Ye(a.value))), fe = (s) => !s || Array.isArray(s) && !s.length ? null : t.timePicker ? T(Ye(s)) : t.monthPicker ? Q(Ye(s)) : t.yearPicker ? f(Ye(s)) : k.value.enabled ? te(Ye(s)) : t.weekPicker ? oe(Ye(s)) : X(Ye(s)), C = (s) => {
    const le = fe(s);
    Fa(Ye(le)) ? (a.value = Ye(le), K()) : (a.value = null, L.value = "");
  }, P = () => {
    const s = (le) => format(le, n.value.format);
    return `${s(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? s(a.value[1]) : ""}`;
  }, x = () => l.value && a.value ? Array.isArray(a.value) ? P() : format(a.value, n.value.format) : H(a.value), m = () => a.value ? k.value.enabled ? a.value.map((s) => H(s)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? x() : H(a.value) : "", K = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? L.value = m() : L.value = t.format(a.value);
  }, $ = (s) => {
    if (t.utc) {
      const le = new Date(s);
      return t.utc === "preserve" ? new Date(le.getTime() + le.getTimezoneOffset() * 6e4) : le;
    }
    return t.modelType ? vl.includes(t.modelType) ? b(new Date(s)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? b(
      parse(s, v(), /* @__PURE__ */ new Date(), { locale: I.value })
    ) : b(
      parse(s, t.modelType, /* @__PURE__ */ new Date(), { locale: I.value })
    ) : b(new Date(s));
  }, ne = (s) => s ? t.utc ? $l(s, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +R(s) : t.modelType === "iso" ? R(s).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? H(R(s)) : H(R(s), t.modelType, true) : R(s) : "", de = (s, le = false, pe = false) => {
    if (pe) return s;
    if (e("update:model-value", s), c.value.emitTimezone && le) {
      const M = Array.isArray(s) ? s.map((ge) => qe(Ye(ge), c.value.emitTimezone)) : qe(Ye(s), c.value.emitTimezone);
      e("update:model-timezone-value", M);
    }
  }, d = (s) => Array.isArray(a.value) ? k.value.enabled ? a.value.map((le) => s(le)) : [
    s(a.value[0]),
    a.value[1] ? s(a.value[1]) : Rt(i.value.partialRange)
  ] : s(Ye(a.value)), p = () => {
    if (Array.isArray(a.value)) {
      const s = it(a.value[0], t.weekStart), le = a.value[1] ? it(a.value[1], t.weekStart) : [];
      return [s.map((pe) => G(pe)), le.map((pe) => G(pe))];
    }
    return it(a.value, t.weekStart).map((s) => G(s));
  }, z = (s, le) => de(Ye(d(s)), false, le), u = (s) => {
    const le = p();
    return s ? le : e("update:model-value", p());
  }, h2 = (s = false) => (s || K(), t.monthPicker ? z(U, s) : t.timePicker ? z(E, s) : t.yearPicker ? z(getYear, s) : t.weekPicker ? u(s) : de(ie(s), true, s));
  return {
    inputValue: L,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? i.value.enabled ? i.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: C,
    formatInputValue: K,
    emitModelValue: h2
  };
};
var Ql = (e, t) => {
  const { defaultedFilters: l, propDates: a } = Ce(e), { validateMonthYearInRange: n } = kt(e), i = (y, I) => {
    let b = y;
    return l.value.months.includes(getMonth(b)) ? (b = I ? addMonths(y, 1) : subMonths(y, 1), i(b, I)) : b;
  }, c = (y, I) => {
    let b = y;
    return l.value.years.includes(getYear(b)) ? (b = I ? addYears(y, 1) : subYears(y, 1), c(b, I)) : b;
  }, k = (y, I = false) => {
    const b = set(G(), { month: e.month, year: e.year });
    let R = y ? addMonths(b, 1) : subMonths(b, 1);
    e.disableYearSelect && (R = setYear(R, e.year));
    let H = getMonth(R), E = getYear(R);
    l.value.months.includes(H) && (R = i(R, y), H = getMonth(R), E = getYear(R)), l.value.years.includes(E) && (R = c(R, y), E = getYear(R)), n(H, E, y, e.preventMinMaxNavigation) && v(H, E, I);
  }, v = (y, I, b) => {
    t("update-month-year", { month: y, year: I, fromNav: b });
  }, L = computed(() => (y) => On(
    set(G(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    y
  ));
  return { handleMonthYearChange: k, isDisabled: L, updateMonthYear: v };
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
      defaultedTextInput: k,
      defaultedInline: v,
      defaultedRange: L,
      defaultedMultiDates: y,
      getDefaultPattern: I
    } = Ce(a), { isTimeValid: b, isMonthValid: R } = kt(a), { buildMatrix: H } = bt(), E = ref(null), U = ref(null), f = ref(false), B = ref({}), T = ref(null), Q = ref(null);
    onMounted(() => {
      a.arrowNavigation && H([Ie(E), Ie(U)], "actionRow"), te(), window.addEventListener("resize", te);
    }), onUnmounted(() => {
      window.removeEventListener("resize", te);
    });
    const te = () => {
      f.value = false, setTimeout(() => {
        var m, K;
        const P = (m = T.value) == null ? void 0 : m.getBoundingClientRect(), x = (K = Q.value) == null ? void 0 : K.getBoundingClientRect();
        P && x && (B.value.maxWidth = `${x.width - P.width - 20}px`), f.value = true;
      }, 0);
    }, oe = computed(() => L.value.enabled && !L.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), X = computed(
      () => !b.value(a.internalModelValue) || !R.value(a.internalModelValue) || !oe.value
    ), S = () => {
      const P = i.value;
      return a.timePicker || a.monthPicker, P(Ye(a.internalModelValue));
    }, ae = () => {
      const P = a.internalModelValue;
      return c.value.count > 0 ? `${O(P[0])} - ${O(P[1])}` : [O(P[0]), O(P[1])];
    }, O = (P) => _n(
      P,
      i.value,
      a.formatLocale,
      k.value.rangeSeparator,
      a.modelAuto,
      I()
    ), q = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof i.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? ae() : y.value.enabled ? a.internalModelValue.map((P) => `${O(P)}`) : a.modelAuto ? `${O(a.internalModelValue[0])}` : `${O(a.internalModelValue[0])} -` : O(a.internalModelValue) : S()), ie = () => y.value.enabled ? "; " : " - ", fe = computed(
      () => Array.isArray(q.value) ? q.value.join(ie()) : q.value
    ), C = () => {
      b.value(a.internalModelValue) && R.value(a.internalModelValue) && oe.value ? l("select-date") : l("invalid-select");
    };
    return (P, x) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: Q,
      class: "dp__action_row"
    }, [
      P.$slots["action-row"] ? renderSlot(P.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: P.internalModelValue,
        disabled: X.value,
        selectDate: () => P.$emit("select-date"),
        closePicker: () => P.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: fe.value,
          style: normalizeStyle(B.value)
        }, [
          P.$slots["action-preview"] && f.value ? renderSlot(P.$slots, "action-preview", {
            key: 0,
            value: P.internalModelValue
          }) : createCommentVNode("", true),
          !P.$slots["action-preview"] && f.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(fe.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, ql)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: T,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          P.$slots["action-buttons"] ? renderSlot(P.$slots, "action-buttons", {
            key: 0,
            value: P.internalModelValue
          }) : createCommentVNode("", true),
          P.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(v).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: E,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: x[0] || (x[0] = (m) => P.$emit("close-picker")),
              onKeydown: x[1] || (x[1] = (m) => unref(Ke)(m, () => P.$emit("close-picker")))
            }, toDisplayString(P.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: x[2] || (x[2] = (m) => P.$emit("select-now")),
              onKeydown: x[3] || (x[3] = (m) => unref(Ke)(m, () => P.$emit("select-now")))
            }, toDisplayString(P.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: U,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: X.value,
              "data-test": "select-button",
              onKeydown: x[4] || (x[4] = (m) => unref(Ke)(m, () => C())),
              onClick: C
            }, toDisplayString(P.selectText), 41, Xl)) : createCommentVNode("", true)
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
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: i } = bt(), c = l, k = e, { defaultedAriaLabels: v, defaultedTextInput: L, defaultedConfig: y } = Ce(
      k
    ), { hideNavigationButtons: I } = ma(), b = ref(false), R = ref(null), H = ref(null), E = ref([]), U = ref(), f = ref(null), B = ref(0), T = ref(null);
    onBeforeUpdate(() => {
      R.value = null;
    }), onMounted(() => {
      nextTick().then(() => q()), k.noOverlayFocus || te(), Q(true);
    }), onUnmounted(() => Q(false));
    const Q = (d) => {
      var p;
      k.arrowNavigation && ((p = k.headerRefs) != null && p.length ? i(d) : a(d));
    }, te = () => {
      var p;
      const d = Ie(H);
      d && (L.value.enabled || (R.value ? (p = R.value) == null || p.focus({ preventScroll: true }) : d.focus({ preventScroll: true })), b.value = d.clientHeight < d.scrollHeight);
    }, oe = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !k.useRelative,
        "dp--overlay-relative": k.useRelative
      })
    ), X = computed(
      () => k.useRelative ? { height: `${k.height}px`, width: "260px" } : void 0
    ), S = computed(() => ({
      dp__overlay_col: true
    })), ae = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: b.value,
        dp__button_bottom: k.isLast
      })
    ), O = computed(() => {
      var d, p;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((d = k.items) == null ? void 0 : d.length) <= 6,
        dp__container_block: ((p = k.items) == null ? void 0 : p.length) > 6
      };
    });
    watch(
      () => k.items,
      () => q(false),
      { deep: true }
    );
    const q = (d = true) => {
      nextTick().then(() => {
        const p = Ie(R), z = Ie(H), u = Ie(f), h2 = Ie(T), N = u ? u.getBoundingClientRect().height : 0;
        z && (z.getBoundingClientRect().height ? B.value = z.getBoundingClientRect().height - N : B.value = y.value.modeHeight - N), p && h2 && d && (h2.scrollTop = p.offsetTop - h2.offsetTop - (B.value / 2 - p.getBoundingClientRect().height) - N);
      });
    }, ie = (d) => {
      d.disabled || c("selected", d.value);
    }, fe = () => {
      c("toggle"), c("reset-flow");
    }, C = () => {
      k.escClose && fe();
    }, P = (d, p, z, u) => {
      d && ((p.active || p.value === k.focusValue) && (R.value = d), k.arrowNavigation && (Array.isArray(E.value[z]) ? E.value[z][u] = d : E.value[z] = [d], x()));
    }, x = () => {
      var p, z;
      const d = (p = k.headerRefs) != null && p.length ? [k.headerRefs].concat(E.value) : E.value.concat([k.skipButtonRef ? [] : [f.value]]);
      n(Ye(d), (z = k.headerRefs) != null && z.length ? "monthPicker" : "selectionGrid");
    }, m = (d) => {
      k.arrowNavigation || yt(d, y.value, true);
    }, K = (d) => {
      U.value = d, c("hover-value", d);
    }, $ = () => {
      if (fe(), !k.isLast) {
        const d = Ea(k.menuWrapRef ?? null, "action-row");
        if (d) {
          const p = An(d);
          p == null || p.focus();
        }
      }
    }, ne = (d) => {
      switch (d.key) {
        case Pe.esc:
          return C();
        case Pe.arrowLeft:
          return m(d);
        case Pe.arrowRight:
          return m(d);
        case Pe.arrowUp:
          return m(d);
        case Pe.arrowDown:
          return m(d);
        default:
          return;
      }
    }, de = (d) => {
      if (d.key === Pe.enter) return fe();
      if (d.key === Pe.tab) return $();
    };
    return t({ focusGrid: te }), (d, p) => {
      var z;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: H,
        class: normalizeClass(oe.value),
        style: normalizeStyle(X.value),
        role: d.useRelative ? void 0 : "dialog",
        "aria-label": d.overlayLabel,
        tabindex: d.useRelative ? void 0 : "0",
        onKeydown: ne,
        onClick: p[0] || (p[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: T,
          class: normalizeClass(O.value),
          style: normalizeStyle({ "--dp-overlay-height": `${B.value}px` }),
          role: "grid"
        }, [
          createBaseVNode("div", xl, [
            renderSlot(d.$slots, "header")
          ]),
          d.$slots.overlay ? renderSlot(d.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(d.items, (u, h2) => (openBlock(), createElementBlock("div", {
            key: h2,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: d.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(u, (N, s) => (openBlock(), createElementBlock("div", {
              key: N.value,
              ref_for: true,
              ref: (le) => P(le, N, h2, s),
              role: "gridcell",
              class: normalizeClass(S.value),
              "aria-selected": N.active || void 0,
              "aria-disabled": N.disabled || void 0,
              tabindex: "0",
              "data-test": N.text,
              onClick: withModifiers((le) => ie(N), ["prevent"]),
              onKeydown: (le) => unref(Ke)(le, () => ie(N), true),
              onMouseover: (le) => K(N.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(N.className)
              }, [
                d.$slots.item ? renderSlot(d.$slots, "item", {
                  key: 0,
                  item: N
                }) : createCommentVNode("", true),
                d.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(N.text), 1)
                ], 64))
              ], 2)
            ], 42, er))), 128))
          ], 2))), 128))
        ], 6),
        d.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: f,
          type: "button",
          "aria-label": (z = unref(v)) == null ? void 0 : z.toggleOverlay,
          class: normalizeClass(ae.value),
          tabindex: "0",
          onClick: fe,
          onKeydown: de
        }, [
          renderSlot(d.$slots, "button-icon")
        ], 42, tr)), [
          [vShow, !unref(I)(d.hideNavigation, d.type)]
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
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (c, k) => (openBlock(), createElementBlock("div", {
        key: c,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: c,
          index: k
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
var Nn = defineComponent({
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
    const l = t, a = e, { showRightIcon: n, showLeftIcon: i } = ma(), { defaultedConfig: c, defaultedMultiCalendars: k, defaultedAriaLabels: v, defaultedTransitions: L, defaultedUI: y } = Ce(a), { showTransition: I, transitionName: b } = Xt(L), R = ref(false), H = (f = false, B) => {
      R.value = !R.value, l("toggle-year-picker", { flow: f, show: B });
    }, E = (f) => {
      R.value = false, l("year-select", f);
    }, U = (f = false) => {
      l("handle-year", f);
    };
    return (f, B) => {
      var T, Q, te, oe, X;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["dp--year-mode-picker", { "dp--hidden-el": R.value }])
        }, [
          unref(i)(unref(k), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 0,
            ref: "mpPrevIconRef",
            "aria-label": (T = unref(v)) == null ? void 0 : T.prevYear,
            disabled: e.isDisabled(false),
            class: normalizeClass((Q = unref(y)) == null ? void 0 : Q.navBtnPrev),
            onActivate: B[0] || (B[0] = (S) => U(false))
          }, {
            default: withCtx(() => [
              f.$slots["arrow-left"] ? renderSlot(f.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              f.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
          createBaseVNode("button", {
            ref: "mpYearButtonRef",
            class: "dp__btn dp--year-select",
            type: "button",
            "aria-label": `${e.year}-${(te = unref(v)) == null ? void 0 : te.openYearsOverlay}`,
            "data-test": `year-mode-btn-${e.instance}`,
            onClick: B[1] || (B[1] = () => H(false)),
            onKeydown: B[2] || (B[2] = withKeys(() => H(false), ["enter"]))
          }, [
            f.$slots.year ? renderSlot(f.$slots, "year", {
              key: 0,
              year: e.year
            }) : createCommentVNode("", true),
            f.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(e.year), 1)
            ], 64))
          ], 40, nr),
          unref(n)(unref(k), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 1,
            ref: "mpNextIconRef",
            "aria-label": (oe = unref(v)) == null ? void 0 : oe.nextYear,
            disabled: e.isDisabled(true),
            class: normalizeClass((X = unref(y)) == null ? void 0 : X.navBtnNext),
            onActivate: B[3] || (B[3] = (S) => U(true))
          }, {
            default: withCtx(() => [
              f.$slots["arrow-right"] ? renderSlot(f.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
              f.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true)
        ], 2),
        createVNode(Transition, {
          name: unref(b)(e.showYearPicker),
          css: unref(I)
        }, {
          default: withCtx(() => {
            var S, ae;
            return [
              e.showYearPicker ? (openBlock(), createBlock(qt, {
                key: 0,
                items: e.items,
                "text-input": f.textInput,
                "esc-close": f.escClose,
                config: f.config,
                "is-last": f.autoApply && !unref(c).keepActionRow,
                "hide-navigation": f.hideNavigation,
                "aria-labels": f.ariaLabels,
                "overlay-label": (ae = (S = unref(v)) == null ? void 0 : S.yearPicker) == null ? void 0 : ae.call(S, true),
                type: "year",
                onToggle: H,
                onSelected: B[4] || (B[4] = (O) => E(O))
              }, createSlots({
                "button-icon": withCtx(() => [
                  f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                  f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                ]),
                _: 2
              }, [
                f.$slots["year-overlay-value"] ? {
                  name: "item",
                  fn: withCtx(({ item: O }) => [
                    renderSlot(f.$slots, "year-overlay-value", {
                      text: O.text,
                      value: O.value
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
var En = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => qe(G(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = qe(G(e.value), e.timezone));
};
var Fn = (e, t, l, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Be(e, t.value[0]) || Me(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (Oe(e, t.value[1]) || Me(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var Ln = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: a,
  calendars: n,
  modelValue: i,
  props: c,
  filters: k,
  year: v,
  month: L,
  emit: y
}) => {
  const I = computed(() => Ka(c.yearRange, c.locale, c.reverseYears)), b = ref([false]), R = computed(() => (O, q) => {
    const ie = set(lt(/* @__PURE__ */ new Date()), {
      month: L.value(O),
      year: v.value(O)
    }), fe = q ? endOfYear(ie) : startOfYear(ie);
    return On(
      fe,
      a.value.maxDate,
      a.value.minDate,
      c.preventMinMaxNavigation,
      q
    );
  }), H = () => Array.isArray(i.value) && e.value.solo && i.value[1], E = () => {
    for (let O = 0; O < e.value.count; O++)
      if (O === 0)
        n.value[O] = n.value[0];
      else if (O === e.value.count - 1 && H())
        n.value[O] = {
          month: getMonth(i.value[1]),
          year: getYear(i.value[1])
        };
      else {
        const q = set(G(), n.value[O - 1]);
        n.value[O] = { month: getMonth(q), year: getYear(addYears(q, 1)) };
      }
  }, U = (O) => {
    if (!O) return E();
    const q = set(G(), n.value[O]);
    return n.value[0].year = getYear(subYears(q, e.value.count - 1)), E();
  }, f = (O, q) => {
    const ie = differenceInYears(q, O);
    return t.value.showLastInRange && ie > 1 ? q : O;
  }, B = (O) => c.focusStartDate || e.value.solo ? O[0] : O[1] ? f(O[0], O[1]) : O[0], T = () => {
    if (i.value) {
      const O = Array.isArray(i.value) ? B(i.value) : i.value;
      n.value[0] = { month: getMonth(O), year: getYear(O) };
    }
  }, Q = () => {
    T(), e.value.count && E();
  };
  watch(i, (O, q) => {
    c.isTextInputDate && JSON.stringify(O ?? {}) !== JSON.stringify(q ?? {}) && Q();
  }), onMounted(() => {
    Q();
  });
  const te = (O, q) => {
    n.value[q].year = O, y("update-month-year", { instance: q, year: O, month: n.value[q].month }), e.value.count && !e.value.solo && U(q);
  }, oe = computed(() => (O) => Yt(I.value, (q) => {
    var P;
    const ie = v.value(O) === q.value, fe = Gt(
      q.value,
      It(a.value.minDate),
      It(a.value.maxDate)
    ) || ((P = k.value.years) == null ? void 0 : P.includes(v.value(O))), C = qa(l.value, q.value);
    return { active: ie, disabled: fe, highlighted: C };
  })), X = (O, q) => {
    te(O, q), ae(q);
  }, S = (O, q = false) => {
    if (!R.value(O, q)) {
      const ie = q ? v.value(O) + 1 : v.value(O) - 1;
      te(ie, O);
    }
  }, ae = (O, q = false, ie) => {
    q || y("reset-flow"), ie !== void 0 ? b.value[O] = ie : b.value[O] = !b.value[O], b.value[O] ? y("overlay-toggle", { open: true, overlay: He.year }) : (y("overlay-closed"), y("overlay-toggle", { open: false, overlay: He.year }));
  };
  return {
    isDisabled: R,
    groupedYears: oe,
    showYearPicker: b,
    selectYear: te,
    toggleYearPicker: ae,
    handleYearSelect: X,
    handleYear: S
  };
};
var lr = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    defaultedRange: c,
    defaultedHighlight: k,
    propDates: v,
    defaultedTz: L,
    defaultedFilters: y,
    defaultedMultiDates: I
  } = Ce(e), b = () => {
    e.isTextInputDate && Q(getYear(G(e.startDate)), 0);
  }, { modelValue: R, year: H, month: E, calendars: U } = Jt(e, t, b), f = computed(() => Mn(e.formatLocale, e.locale, e.monthNameFormat)), B = ref(null), { checkMinMaxRange: T } = kt(e), {
    selectYear: Q,
    groupedYears: te,
    showYearPicker: oe,
    toggleYearPicker: X,
    handleYearSelect: S,
    handleYear: ae,
    isDisabled: O
  } = Ln({
    modelValue: R,
    multiCalendars: l,
    range: c,
    highlight: k,
    calendars: U,
    year: H,
    propDates: v,
    month: E,
    filters: y,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (R.value && e.focusStartDate || !R.value) && Q(getYear(G(e.startDate)), 0);
  });
  const q = (h2) => h2 ? { month: getMonth(h2), year: getYear(h2) } : { month: null, year: null }, ie = () => R.value ? Array.isArray(R.value) ? R.value.map((h2) => q(h2)) : q(R.value) : q(), fe = (h2, N) => {
    const s = U.value[h2], le = ie();
    return Array.isArray(le) ? le.some((pe) => pe.year === (s == null ? void 0 : s.year) && pe.month === N) : (s == null ? void 0 : s.year) === le.year && N === le.month;
  }, C = (h2, N, s) => {
    var pe, M;
    const le = ie();
    return Array.isArray(le) ? H.value(N) === ((pe = le[s]) == null ? void 0 : pe.year) && h2 === ((M = le[s]) == null ? void 0 : M.month) : false;
  }, P = (h2, N) => {
    if (c.value.enabled) {
      const s = ie();
      if (Array.isArray(R.value) && Array.isArray(s)) {
        const le = C(h2, N, 0) || C(h2, N, 1), pe = dt(lt(G()), h2, H.value(N));
        return da(R.value, B.value, pe) && !le;
      }
      return false;
    }
    return false;
  }, x = computed(() => (h2) => Yt(f.value, (N) => {
    var ge;
    const s = fe(h2, N.value), le = Gt(
      N.value,
      Sn(H.value(h2), v.value.minDate),
      Pn(H.value(h2), v.value.maxDate)
    ) || Rl(v.value.disabledDates, H.value(h2)).includes(N.value) || ((ge = y.value.months) == null ? void 0 : ge.includes(N.value)), pe = P(N.value, h2), M = Bn(k.value, N.value, H.value(h2));
    return { active: s, disabled: le, isBetween: pe, highlighted: M };
  })), m = (h2, N) => dt(lt(G()), h2, H.value(N)), K = (h2, N) => {
    const s = R.value ? R.value : lt(/* @__PURE__ */ new Date());
    R.value = dt(s, h2, H.value(N)), t("auto-apply"), t("update-flow-step");
  }, $ = (h2, N) => {
    const s = m(h2, N);
    c.value.fixedEnd || c.value.fixedStart ? R.value = Fn(s, R, t, c) : R.value ? T(s, R.value) && (R.value = Ja(R, m(h2, N), t)) : R.value = [m(h2, N)], nextTick().then(() => {
      va(R.value, t, e.autoApply, e.modelAuto);
    });
  }, ne = (h2, N) => {
    Xa(m(h2, N), R, I.value.limit), t("auto-apply", true);
  }, de = (h2, N) => (U.value[N].month = h2, p(N, U.value[N].year, h2), I.value.enabled ? ne(h2, N) : c.value.enabled ? $(h2, N) : K(h2, N)), d = (h2, N) => {
    Q(h2, N), p(N, h2, null);
  }, p = (h2, N, s) => {
    let le = s;
    if (!le && le !== 0) {
      const pe = ie();
      le = Array.isArray(pe) ? pe[h2].month : pe.month;
    }
    t("update-month-year", { instance: h2, year: N, month: le });
  };
  return {
    groupedMonths: x,
    groupedYears: te,
    year: H,
    isDisabled: O,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    showYearPicker: oe,
    modelValue: R,
    presetDate: (h2, N) => {
      En({
        value: h2,
        modelValue: R,
        range: c.value.enabled,
        timezone: N ? void 0 : L.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (h2, N) => {
      B.value = m(h2, N);
    },
    selectMonth: de,
    selectYear: d,
    toggleYearPicker: X,
    handleYearSelect: S,
    handleYear: ae,
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
      groupedMonths: k,
      groupedYears: v,
      year: L,
      isDisabled: y,
      defaultedMultiCalendars: I,
      defaultedConfig: b,
      showYearPicker: R,
      modelValue: H,
      presetDate: E,
      setHoverDate: U,
      selectMonth: f,
      selectYear: B,
      toggleYearPicker: T,
      handleYearSelect: Q,
      handleYear: te,
      getModelMonthYear: oe
    } = lr(c, a);
    return t({ getSidebarProps: () => ({
      modelValue: H,
      year: L,
      getModelMonthYear: oe,
      selectMonth: f,
      selectYear: B,
      handleYear: te
    }), presetDate: E, toggleYearPicker: (S) => T(0, S) }), (S, ae) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(I).count,
      collapse: S.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: O }) => [
        S.$slots["top-extra"] ? renderSlot(S.$slots, "top-extra", {
          key: 0,
          value: S.internalModelValue
        }) : createCommentVNode("", true),
        S.$slots["month-year"] ? renderSlot(S.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(L),
          months: unref(k)(O),
          years: unref(v)(O),
          selectMonth: unref(f),
          selectYear: unref(B),
          instance: O
        }))) : (openBlock(), createBlock(qt, {
          key: 2,
          items: unref(k)(O),
          "arrow-navigation": S.arrowNavigation,
          "is-last": S.autoApply && !unref(b).keepActionRow,
          "esc-close": S.escClose,
          height: unref(b).modeHeight,
          config: S.config,
          "no-overlay-focus": !!(S.noOverlayFocus || S.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (q) => unref(f)(q, O),
          onHoverValue: (q) => unref(U)(q, O)
        }, createSlots({
          header: withCtx(() => [
            createVNode(Nn, mergeProps(S.$props, {
              items: unref(v)(O),
              instance: O,
              "show-year-picker": unref(R)[O],
              year: unref(L)(O),
              "is-disabled": (q) => unref(y)(O, q),
              onHandleYear: (q) => unref(te)(O, q),
              onYearSelect: (q) => unref(Q)(q, O),
              onToggleYearPicker: (q) => unref(T)(O, q == null ? void 0 : q.flow, q == null ? void 0 : q.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i), (q, ie) => ({
                name: q,
                fn: withCtx((fe) => [
                  renderSlot(S.$slots, q, normalizeProps(guardReactiveProps(fe)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          S.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: q }) => [
              renderSlot(S.$slots, "month-overlay-value", {
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
    e.isTextInputDate && (y.value = getYear(G(e.startDate)));
  }, { modelValue: a } = Jt(e, t, l), n = ref(null), { defaultedHighlight: i, defaultedMultiDates: c, defaultedFilters: k, defaultedRange: v, propDates: L } = Ce(e), y = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (y.value = getYear(G(e.startDate)));
  });
  const I = (f) => Array.isArray(a.value) ? a.value.some((B) => getYear(B) === f) : a.value ? getYear(a.value) === f : false, b = (f) => v.value.enabled && Array.isArray(a.value) ? da(a.value, n.value, H(f)) : false, R = computed(() => Yt(Ka(e.yearRange, e.locale, e.reverseYears), (f) => {
    const B = I(f.value), T = Gt(
      f.value,
      It(L.value.minDate),
      It(L.value.maxDate)
    ) || k.value.years.includes(f.value), Q = b(f.value) && !B, te = qa(i.value, f.value);
    return { active: B, disabled: T, isBetween: Q, highlighted: te };
  })), H = (f) => setYear(lt(startOfYear(/* @__PURE__ */ new Date())), f);
  return {
    groupedYears: R,
    modelValue: a,
    focusYear: y,
    setHoverValue: (f) => {
      n.value = setYear(lt(/* @__PURE__ */ new Date()), f);
    },
    selectYear: (f) => {
      var B;
      if (t("update-month-year", { instance: 0, year: f }), c.value.enabled)
        return a.value ? Array.isArray(a.value) && (((B = a.value) == null ? void 0 : B.map((Q) => getYear(Q))).includes(f) ? a.value = a.value.filter((Q) => getYear(Q) !== f) : a.value.push(setYear(Ge(G()), f))) : a.value = [setYear(Ge(startOfYear(G())), f)], t("auto-apply", true);
      v.value.enabled ? (a.value = Ja(a, H(f), t), nextTick().then(() => {
        va(a.value, t, e.autoApply, e.modelAuto);
      })) : (a.value = H(f), t("auto-apply"));
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
    const a = l, n = e, { groupedYears: i, modelValue: c, focusYear: k, selectYear: v, setHoverValue: L } = or(n, a), { defaultedConfig: y } = Ce(n);
    return t({ getSidebarProps: () => ({
      modelValue: c,
      selectYear: v
    }) }), (b, R) => (openBlock(), createElementBlock("div", null, [
      b.$slots["top-extra"] ? renderSlot(b.$slots, "top-extra", {
        key: 0,
        value: b.internalModelValue
      }) : createCommentVNode("", true),
      b.$slots["month-year"] ? renderSlot(b.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(i),
        selectYear: unref(v)
      }))) : (openBlock(), createBlock(qt, {
        key: 2,
        items: unref(i),
        "is-last": b.autoApply && !unref(y).keepActionRow,
        height: unref(y).modeHeight,
        config: b.config,
        "no-overlay-focus": !!(b.noOverlayFocus || b.textInput),
        "focus-value": unref(k),
        type: "year",
        "use-relative": "",
        onSelected: unref(v),
        onHoverValue: unref(L)
      }, createSlots({ _: 2 }, [
        b.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: H }) => [
            renderSlot(b.$slots, "year-overlay-value", {
              text: H.text,
              value: H.value
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
    const a = l, n = e, { setTimePickerElements: i, setTimePickerBackRef: c } = bt(), { defaultedAriaLabels: k, defaultedTransitions: v, defaultedFilters: L, defaultedConfig: y, defaultedRange: I } = Ce(n), { transitionName: b, showTransition: R } = Xt(v), H = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), E = ref("AM"), U = ref(null), f = ref([]), B = ref(), T = ref(false);
    onMounted(() => {
      a("mounted");
    });
    const Q = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: n.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), te = computed(
      () => (r) => m(r, n[r]) || X(r, n[r])
    ), oe = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), X = (r, Y) => I.value.enabled && !I.value.disableTimeRangeValidation ? !n.validateTime(r, Y) : false, S = (r, Y) => {
      if (I.value.enabled && !I.value.disableTimeRangeValidation) {
        const _ = Y ? +n[`${r}Increment`] : -+n[`${r}Increment`], V = n[r] + _;
        return !n.validateTime(r, V);
      }
      return false;
    }, ae = computed(() => (r) => !d(+n[r] + +n[`${r}Increment`], r) || S(r, true)), O = computed(() => (r) => !d(+n[r] - +n[`${r}Increment`], r) || S(r, false)), q = (r, Y) => add(set(G(), r), Y), ie = (r, Y) => sub(set(G(), r), Y), fe = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), C = computed(() => {
      const r = [{ type: "hours" }];
      return n.enableMinutes && r.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && r.push({ type: "", separator: true }, {
        type: "seconds"
      }), r;
    }), P = computed(() => C.value.filter((r) => !r.separator)), x = computed(() => (r) => {
      if (r === "hours") {
        const Y = s(+n.hours);
        return { text: Y < 10 ? `0${Y}` : `${Y}`, value: Y };
      }
      return { text: n[r] < 10 ? `0${n[r]}` : `${n[r]}`, value: n[r] };
    }), m = (r, Y) => {
      var V;
      if (!n.disabledTimesConfig) return false;
      const _ = n.disabledTimesConfig(n.order, r === "hours" ? Y : void 0);
      return _[r] ? !!((V = _[r]) != null && V.includes(Y)) : true;
    }, K = (r, Y) => Y !== "hours" || E.value === "AM" ? r : r + 12, $ = (r) => {
      const Y = n.is24 ? 24 : 12, _ = r === "hours" ? Y : 60, V = +n[`${r}GridIncrement`], se = r === "hours" && !n.is24 ? V : 0, D = [];
      for (let F = se; F < _; F += V)
        D.push({ value: n.is24 ? F : K(F, r), text: F < 10 ? `0${F}` : `${F}` });
      return r === "hours" && !n.is24 && D.unshift({ value: E.value === "PM" ? 12 : 0, text: "12" }), Yt(D, (F) => ({ active: false, disabled: L.value.times[r].includes(F.value) || !d(F.value, r) || m(r, F.value) || X(r, F.value) }));
    }, ne = (r) => r >= 0 ? r : 59, de = (r) => r >= 0 ? r : 23, d = (r, Y) => {
      const _ = n.minTime ? Q(Aa(n.minTime)) : null, V = n.maxTime ? Q(Aa(n.maxTime)) : null, se = Q(
        Aa(
          oe.value,
          Y,
          Y === "minutes" || Y === "seconds" ? ne(r) : de(r)
        )
      );
      return _ && V ? (isBefore(se, V) || isEqual(se, V)) && (isAfter(se, _) || isEqual(se, _)) : _ ? isAfter(se, _) || isEqual(se, _) : V ? isBefore(se, V) || isEqual(se, V) : true;
    }, p = (r) => n[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], z = (r) => {
      p(r) || (H[r] = !H[r], H[r] ? (T.value = true, a("overlay-opened", r)) : (T.value = false, a("overlay-closed", r)));
    }, u = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, h2 = () => {
      B.value && clearTimeout(B.value);
    }, N = (r, Y = true, _) => {
      const V = Y ? q : ie, se = Y ? +n[`${r}Increment`] : -+n[`${r}Increment`];
      d(+n[r] + se, r) && a(
        `update:${r}`,
        u(r)(V({ [r]: +n[r] }, { [r]: +n[`${r}Increment`] }))
      ), !(_ != null && _.keyboard) && y.value.timeArrowHoldThreshold && (B.value = setTimeout(() => {
        N(r, Y);
      }, y.value.timeArrowHoldThreshold));
    }, s = (r) => n.is24 ? r : (r >= 12 ? E.value = "PM" : E.value = "AM", yl(r)), le = () => {
      E.value === "PM" ? (E.value = "AM", a("update:hours", n.hours - 12)) : (E.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", E.value);
    }, pe = (r) => {
      H[r] = true;
    }, M = (r, Y, _) => {
      if (r && n.arrowNavigation) {
        Array.isArray(f.value[Y]) ? f.value[Y][_] = r : f.value[Y] = [r];
        const V = f.value.reduce(
          (se, D) => D.map((F, ce) => [...se[ce] || [], D[ce]]),
          []
        );
        c(n.closeTimePickerBtn), U.value && (V[1] = V[1].concat(U.value)), i(V, n.order);
      }
    }, ge = (r, Y) => (z(r), a(`update:${r}`, Y));
    return t({ openChildCmp: pe }), (r, Y) => {
      var _;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ur, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(C.value, (V, se) => {
          var D, F, ce;
          return openBlock(), createElementBlock("div", {
            key: se,
            class: normalizeClass(fe.value)
          }, [
            V.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              T.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(":")
              ], 64))
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => M(he, se, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_top: r.timePickerInline,
                  dp__inc_dec_button_disabled: ae.value(V.type),
                  "dp--hidden-el": T.value
                }),
                "data-test": `${V.type}-time-inc-btn-${n.order}`,
                "aria-label": (D = unref(k)) == null ? void 0 : D.incrementValue(V.type),
                tabindex: "0",
                onKeydown: (he) => unref(Ke)(he, () => N(V.type, true, { keyboard: true }), true),
                onClick: (he) => unref(y).timeArrowHoldThreshold ? void 0 : N(V.type, true),
                onMousedown: (he) => unref(y).timeArrowHoldThreshold ? N(V.type, true) : void 0,
                onMouseup: h2
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
                ref: (he) => M(he, se, 1),
                type: "button",
                "aria-label": `${x.value(V.type).text}-${(F = unref(k)) == null ? void 0 : F.openTpOverlay(V.type)}`,
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !r.timePickerInline,
                  dp__time_display_inline: r.timePickerInline,
                  "dp--time-invalid": te.value(V.type),
                  "dp--time-overlay-btn": !te.value(V.type),
                  "dp--hidden-el": T.value
                }),
                disabled: p(V.type),
                tabindex: "0",
                "data-test": `${V.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (he) => unref(Ke)(he, () => z(V.type), true),
                onClick: (he) => z(V.type)
              }, [
                r.$slots[V.type] ? renderSlot(r.$slots, V.type, {
                  key: 0,
                  text: x.value(V.type).text,
                  value: x.value(V.type).value
                }) : createCommentVNode("", true),
                r.$slots[V.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(x.value(V.type).text), 1)
                ], 64))
              ], 42, fr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => M(he, se, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_bottom: r.timePickerInline,
                  dp__inc_dec_button_disabled: O.value(V.type),
                  "dp--hidden-el": T.value
                }),
                "data-test": `${V.type}-time-dec-btn-${n.order}`,
                "aria-label": (ce = unref(k)) == null ? void 0 : ce.decrementValue(V.type),
                tabindex: "0",
                onKeydown: (he) => unref(Ke)(he, () => N(V.type, false, { keyboard: true }), true),
                onClick: (he) => unref(y).timeArrowHoldThreshold ? void 0 : N(V.type, false),
                onMousedown: (he) => unref(y).timeArrowHoldThreshold ? N(V.type, false) : void 0,
                onMouseup: h2
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
            value: E.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: U,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (_ = unref(k)) == null ? void 0 : _.amPmButton,
            tabindex: "0",
            onClick: le,
            onKeydown: Y[0] || (Y[0] = (V) => unref(Ke)(V, () => le(), true))
          }, toDisplayString(E.value), 41, gr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(P.value, (V, se) => (openBlock(), createBlock(Transition, {
          key: se,
          name: unref(b)(H[V.type]),
          css: unref(R)
        }, {
          default: withCtx(() => {
            var D, F;
            return [
              H[V.type] ? (openBlock(), createBlock(qt, {
                key: 0,
                items: $(V.type),
                "is-last": r.autoApply && !unref(y).keepActionRow,
                "esc-close": r.escClose,
                type: V.type,
                "text-input": r.textInput,
                config: r.config,
                "arrow-navigation": r.arrowNavigation,
                "aria-labels": r.ariaLabels,
                "overlay-label": (F = (D = unref(k)).timeOverlay) == null ? void 0 : F.call(D, V.type),
                onSelected: (ce) => ge(V.type, ce),
                onToggle: (ce) => z(V.type),
                onResetFlow: Y[1] || (Y[1] = (ce) => r.$emit("reset-flow"))
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
                      toggle: () => z(V.type)
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
var zn = defineComponent({
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
    const a = l, n = e, { buildMatrix: i, setTimePicker: c } = bt(), k = useSlots(), { defaultedTransitions: v, defaultedAriaLabels: L, defaultedTextInput: y, defaultedConfig: I, defaultedRange: b } = Ce(n), { transitionName: R, showTransition: H } = Xt(v), { hideNavigationButtons: E } = ma(), U = ref(null), f = ref(null), B = ref([]), T = ref(null), Q = ref(false);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? i([Ie(U.value)], "time") : c(true, n.timePicker);
    });
    const te = computed(() => b.value.enabled && n.modelAuto ? $n(n.internalModelValue) : true), oe = ref(false), X = ($) => ({
      hours: Array.isArray(n.hours) ? n.hours[$] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[$] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[$] : n.seconds
    }), S = computed(() => {
      const $ = [];
      if (b.value.enabled)
        for (let ne = 0; ne < 2; ne++)
          $.push(X(ne));
      else
        $.push(X(0));
      return $;
    }), ae = ($, ne = false, de = "") => {
      ne || a("reset-flow"), oe.value = $, a($ ? "overlay-opened" : "overlay-closed", He.time), n.arrowNavigation && c($), nextTick(() => {
        de !== "" && B.value[0] && B.value[0].openChildCmp(de);
      });
    }, O = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !I.value.keepActionRow
    })), q = Je(k, "timePicker"), ie = ($, ne, de) => b.value.enabled ? ne === 0 ? [$, S.value[1][de]] : [S.value[0][de], $] : $, fe = ($) => {
      a("update:hours", $);
    }, C = ($) => {
      a("update:minutes", $);
    }, P = ($) => {
      a("update:seconds", $);
    }, x = () => {
      if (T.value && !y.value.enabled && !n.noOverlayFocus) {
        const $ = An(T.value);
        $ && $.focus({ preventScroll: true });
      }
    }, m = ($) => {
      Q.value = false, a("overlay-closed", $);
    }, K = ($) => {
      Q.value = true, a("overlay-opened", $);
    };
    return t({ toggleTimePicker: ae }), ($, ne) => {
      var de;
      return openBlock(), createElementBlock("div", br, [
        !$.timePicker && !$.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: U,
          type: "button",
          class: normalizeClass({ ...O.value, "dp--hidden-el": oe.value }),
          "aria-label": (de = unref(L)) == null ? void 0 : de.openTimePicker,
          tabindex: $.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: ne[0] || (ne[0] = (d) => unref(Ke)(d, () => ae(true))),
          onClick: ne[1] || (ne[1] = (d) => ae(true))
        }, [
          $.$slots["clock-icon"] ? renderSlot($.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          $.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ua), { key: 1 }))
        ], 42, kr)), [
          [vShow, !unref(E)($.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(R)(oe.value),
          css: unref(H) && !$.timePickerInline
        }, {
          default: withCtx(() => {
            var d, p;
            return [
              oe.value || $.timePicker || $.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: T,
                role: $.timePickerInline ? void 0 : "dialog",
                class: normalizeClass({
                  dp__overlay: !$.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !$.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle($.timePicker ? { height: `${unref(I).modeHeight}px` } : void 0),
                "aria-label": (d = unref(L)) == null ? void 0 : d.timePicker,
                tabindex: $.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    $.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  $.$slots["time-picker-overlay"] ? renderSlot($.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: fe,
                    setMinutes: C,
                    setSeconds: P
                  }) : createCommentVNode("", true),
                  $.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass($.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (z, u) => withDirectives((openBlock(), createBlock(hr, mergeProps({
                      key: u,
                      ref_for: true
                    }, {
                      ...$.$props,
                      order: u,
                      hours: z.hours,
                      minutes: z.minutes,
                      seconds: z.seconds,
                      closeTimePickerBtn: f.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: u === 0 ? unref(b).fixedStart : unref(b).fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: B,
                      "validate-time": (h2, N) => e.validateTime(h2, ie(N, u, h2)),
                      "onUpdate:hours": (h2) => fe(ie(h2, u, "hours")),
                      "onUpdate:minutes": (h2) => C(ie(h2, u, "minutes")),
                      "onUpdate:seconds": (h2) => P(ie(h2, u, "seconds")),
                      onMounted: x,
                      onOverlayClosed: m,
                      onOverlayOpened: K,
                      onAmPmChange: ne[2] || (ne[2] = (h2) => $.$emit("am-pm-change", h2))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(q), (h2, N) => ({
                        name: h2,
                        fn: withCtx((s) => [
                          renderSlot($.$slots, h2, mergeProps({ ref_for: true }, s))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, u === 0 ? true : te.value]
                    ])), 128))
                  ], 2)),
                  !$.timePicker && !$.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: f,
                    type: "button",
                    class: normalizeClass({ ...O.value, "dp--hidden-el": Q.value }),
                    "aria-label": (p = unref(L)) == null ? void 0 : p.closeTimePicker,
                    tabindex: "0",
                    onKeydown: ne[3] || (ne[3] = (z) => unref(Ke)(z, () => ae(false))),
                    onClick: ne[4] || (ne[4] = (z) => ae(false))
                  }, [
                    $.$slots["calendar-icon"] ? renderSlot($.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    $.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                  ], 42, Dr)), [
                    [vShow, !unref(E)($.hideNavigation, "time")]
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
var Hn = (e, t, l, a) => {
  const { defaultedRange: n } = Ce(e), i = (T, Q) => Array.isArray(t[T]) ? t[T][Q] : t[T], c = (T) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[T] : t.seconds : 0, k = (T, Q) => T ? Q !== void 0 ? gt(T, i("hours", Q), i("minutes", Q), c(Q)) : gt(T, t.hours, t.minutes, c()) : setSeconds(G(), c(Q)), v = (T, Q) => {
    t[T] = Q;
  }, L = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : n.value.enabled), y = (T, Q) => {
    const te = Object.fromEntries(
      Object.keys(t).map((oe) => oe === T ? [oe, Q] : [oe, t[oe]].slice())
    );
    if (L.value && !n.value.disableTimeRangeValidation) {
      const oe = (S) => l.value ? gt(
        l.value[S],
        te.hours[S],
        te.minutes[S],
        te.seconds[S]
      ) : null, X = (S) => setMilliseconds(l.value[S], 0);
      return !(Me(oe(0), oe(1)) && (isAfter(oe(0), X(1)) || isBefore(oe(1), X(0))));
    }
    return true;
  }, I = (T, Q) => {
    y(T, Q) && (v(T, Q), a && a());
  }, b = (T) => {
    I("hours", T);
  }, R = (T) => {
    I("minutes", T);
  }, H = (T) => {
    I("seconds", T);
  }, E = (T, Q, te, oe) => {
    Q && b(T), !Q && !te && R(T), te && H(T), l.value && oe(l.value);
  }, U = (T) => {
    if (T) {
      const Q = Array.isArray(T), te = Q ? [+T[0].hours, +T[1].hours] : +T.hours, oe = Q ? [+T[0].minutes, +T[1].minutes] : +T.minutes, X = Q ? [+T[0].seconds, +T[1].seconds] : +T.seconds;
      v("hours", te), v("minutes", oe), e.enableSeconds && v("seconds", X);
    }
  }, f = (T, Q) => {
    const te = {
      hours: Array.isArray(t.hours) ? t.hours[T] : t.hours,
      disabledArr: []
    };
    return (Q || Q === 0) && (te.hours = Q), Array.isArray(e.disabledTimes) && (te.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[T]) ? e.disabledTimes[T] : e.disabledTimes), te;
  }, B = computed(() => (T, Q) => {
    var te;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: oe, hours: X } = f(T, Q), S = oe.filter((ae) => +ae.hours === X);
      return ((te = S[0]) == null ? void 0 : te.minutes) === "*" ? { hours: [X], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (S == null ? void 0 : S.map((ae) => +ae.minutes)) ?? [],
        seconds: (S == null ? void 0 : S.map((ae) => ae.seconds ? +ae.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: v,
    updateHours: b,
    updateMinutes: R,
    updateSeconds: H,
    getSetDateTime: k,
    updateTimeValues: E,
    getSecondsValue: c,
    assignStartTime: U,
    validateTime: y,
    disabledTimesConfig: B
  };
};
var Mr = (e, t) => {
  const l = () => {
    e.isTextInputDate && Q();
  }, { modelValue: a, time: n } = Jt(e, t, l), { defaultedStartTime: i, defaultedRange: c, defaultedTz: k } = Ce(e), { updateTimeValues: v, getSetDateTime: L, setTime: y, assignStartTime: I, disabledTimesConfig: b, validateTime: R } = Hn(e, n, a, H);
  function H() {
    t("update-flow-step");
  }
  const E = (X) => {
    const { hours: S, minutes: ae, seconds: O } = X;
    return { hours: +S, minutes: +ae, seconds: O ? +O : 0 };
  }, U = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const S = E(e.startTime[0]), ae = E(e.startTime[1]);
        return [set(G(), S), set(G(), ae)];
      }
      const X = E(e.startTime);
      return set(G(), X);
    }
    return c.value.enabled ? [null, null] : null;
  }, f = () => {
    if (c.value.enabled) {
      const [X, S] = U();
      a.value = [
        qe(L(X, 0), k.value.timezone),
        qe(L(S, 1), k.value.timezone)
      ];
    } else
      a.value = qe(L(U()), k.value.timezone);
  }, B = (X) => Array.isArray(X) ? [St(G(X[0])), St(G(X[1]))] : [St(X ?? G())], T = (X, S, ae) => {
    y("hours", X), y("minutes", S), y("seconds", e.enableSeconds ? ae : 0);
  }, Q = () => {
    const [X, S] = B(a.value);
    return c.value.enabled ? T(
      [X.hours, S.hours],
      [X.minutes, S.minutes],
      [X.seconds, S.seconds]
    ) : T(X.hours, X.minutes, X.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return I(i.value), a.value ? Q() : f();
  });
  const te = () => {
    Array.isArray(a.value) ? a.value = a.value.map((X, S) => X && L(X, S)) : a.value = L(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: b,
    updateTime: (X, S = true, ae = false) => {
      v(X, S, ae, te);
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
    const a = l, n = e, i = useSlots(), c = Je(i, "timePicker"), k = ref(null), { time: v, modelValue: L, disabledTimesConfig: y, updateTime: I, validateTime: b } = Mr(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: L,
      time: v,
      updateTime: I
    }), toggleTimePicker: (E, U = false, f = "") => {
      var B;
      (B = k.value) == null || B.toggleTimePicker(E, U, f);
    } }), (E, U) => (openBlock(), createBlock(fa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(zn, mergeProps({
          ref_key: "tpRef",
          ref: k
        }, E.$props, {
          hours: unref(v).hours,
          minutes: unref(v).minutes,
          seconds: unref(v).seconds,
          "internal-model-value": E.internalModelValue,
          "disabled-times-config": unref(y),
          "validate-time": unref(b),
          "onUpdate:hours": U[0] || (U[0] = (f) => unref(I)(f)),
          "onUpdate:minutes": U[1] || (U[1] = (f) => unref(I)(f, false)),
          "onUpdate:seconds": U[2] || (U[2] = (f) => unref(I)(f, false, true)),
          onAmPmChange: U[3] || (U[3] = (f) => E.$emit("am-pm-change", f)),
          onResetFlow: U[4] || (U[4] = (f) => E.$emit("reset-flow")),
          onOverlayClosed: U[5] || (U[5] = (f) => E.$emit("overlay-toggle", { open: false, overlay: f })),
          onOverlayOpened: U[6] || (U[6] = (f) => E.$emit("overlay-toggle", { open: true, overlay: f }))
        }), createSlots({ _: 2 }, [
          renderList(unref(c), (f, B) => ({
            name: f,
            fn: withCtx((T) => [
              renderSlot(E.$slots, f, normalizeProps(guardReactiveProps(T)))
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
      defaultedMultiCalendars: k,
      defaultedFilters: v,
      defaultedConfig: L,
      defaultedHighlight: y,
      propDates: I,
      defaultedUI: b
    } = Ce(n), { transitionName: R, showTransition: H } = Xt(i), { buildMatrix: E } = bt(), { handleMonthYearChange: U, isDisabled: f, updateMonthYear: B } = Ql(n, a), { showLeftIcon: T, showRightIcon: Q } = ma(), te = ref(false), oe = ref(false), X = ref(false), S = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const ae = (p) => ({
      get: () => n[p],
      set: (z) => {
        const u = p === nt.month ? nt.year : nt.month;
        a("update-month-year", { [p]: z, [u]: n[u] }), p === nt.month ? m(true) : K(true);
      }
    }), O = computed(ae(nt.month)), q = computed(ae(nt.year)), ie = computed(() => (p) => ({
      month: n.month,
      year: n.year,
      items: p === nt.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: B,
      toggle: p === nt.month ? m : K
    })), fe = computed(() => {
      const p = n.months.find((z) => z.value === n.month);
      return p || { text: "", value: 0 };
    }), C = computed(() => Yt(n.months, (p) => {
      const z = n.month === p.value, u = Gt(
        p.value,
        Sn(n.year, I.value.minDate),
        Pn(n.year, I.value.maxDate)
      ) || v.value.months.includes(p.value), h2 = Bn(y.value, p.value, n.year);
      return { active: z, disabled: u, highlighted: h2 };
    })), P = computed(() => Yt(n.years, (p) => {
      const z = n.year === p.value, u = Gt(
        p.value,
        It(I.value.minDate),
        It(I.value.maxDate)
      ) || v.value.years.includes(p.value), h2 = qa(y.value, p.value);
      return { active: z, disabled: u, highlighted: h2 };
    })), x = (p, z, u) => {
      u !== void 0 ? p.value = u : p.value = !p.value, p.value ? (X.value = true, a("overlay-opened", z)) : (X.value = false, a("overlay-closed", z));
    }, m = (p = false, z) => {
      $(p), x(te, He.month, z);
    }, K = (p = false, z) => {
      $(p), x(oe, He.year, z);
    }, $ = (p) => {
      p || a("reset-flow");
    }, ne = (p, z) => {
      n.arrowNavigation && (S.value[z] = Ie(p), E(S.value, "monthYear"));
    }, de = computed(() => {
      var p, z, u, h2, N, s;
      return [
        {
          type: nt.month,
          index: 1,
          toggle: m,
          modelValue: O.value,
          updateModelValue: (le) => O.value = le,
          text: fe.value.text,
          showSelectionGrid: te.value,
          items: C.value,
          ariaLabel: (p = c.value) == null ? void 0 : p.openMonthsOverlay,
          overlayLabel: ((u = (z = c.value).monthPicker) == null ? void 0 : u.call(z, true)) ?? void 0
        },
        {
          type: nt.year,
          index: 2,
          toggle: K,
          modelValue: q.value,
          updateModelValue: (le) => q.value = le,
          text: Tn(n.year, n.locale),
          showSelectionGrid: oe.value,
          items: P.value,
          ariaLabel: (h2 = c.value) == null ? void 0 : h2.openYearsOverlay,
          overlayLabel: ((s = (N = c.value).yearPicker) == null ? void 0 : s.call(N, true)) ?? void 0
        }
      ];
    }), d = computed(() => n.disableYearSelect ? [de.value[0]] : n.yearFirst ? [...de.value].reverse() : de.value);
    return t({
      toggleMonthPicker: m,
      toggleYearPicker: K,
      handleMonthYearChange: U
    }), (p, z) => {
      var u, h2, N, s, le, pe;
      return openBlock(), createElementBlock("div", Ar, [
        p.$slots["month-year"] ? (openBlock(), createElementBlock("div", Tr, [
          renderSlot(p.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(B), handleMonthYearChange: unref(U), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          p.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Sr, [
            renderSlot(p.$slots, "top-extra", { value: p.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Pr, [
            unref(T)(unref(k), e.instance) && !p.vertical ? (openBlock(), createBlock(Ut, {
              key: 0,
              "aria-label": (u = unref(c)) == null ? void 0 : u.prevMonth,
              disabled: unref(f)(false),
              class: normalizeClass((h2 = unref(b)) == null ? void 0 : h2.navBtnPrev),
              "el-name": "action-prev",
              onActivate: z[0] || (z[0] = (M) => unref(U)(false, true)),
              onSetRef: z[1] || (z[1] = (M) => ne(M, 0))
            }, {
              default: withCtx(() => [
                p.$slots["arrow-left"] ? renderSlot(p.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                p.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: p.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(d.value, (M, ge) => (openBlock(), createElementBlock(Fragment, {
                key: M.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (r) => ne(r, ge + 1),
                  type: "button",
                  "data-dp-element": `overlay-${M.type}`,
                  class: normalizeClass(["dp__btn dp__month_year_select", { "dp--hidden-el": X.value }]),
                  "aria-label": `${M.text}-${M.ariaLabel}`,
                  "data-test": `${M.type}-toggle-overlay-${e.instance}`,
                  onClick: M.toggle,
                  onKeydown: (r) => unref(Ke)(r, () => M.toggle(), true)
                }, [
                  p.$slots[M.type] ? renderSlot(p.$slots, M.type, {
                    key: 0,
                    text: M.text,
                    value: n[M.type]
                  }) : createCommentVNode("", true),
                  p.$slots[M.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(M.text), 1)
                  ], 64))
                ], 42, Rr),
                createVNode(Transition, {
                  name: unref(R)(M.showSelectionGrid),
                  css: unref(H)
                }, {
                  default: withCtx(() => [
                    M.showSelectionGrid ? (openBlock(), createBlock(qt, {
                      key: 0,
                      items: M.items,
                      "arrow-navigation": p.arrowNavigation,
                      "hide-navigation": p.hideNavigation,
                      "is-last": p.autoApply && !unref(L).keepActionRow,
                      "skip-button-ref": false,
                      config: p.config,
                      type: M.type,
                      "header-refs": [],
                      "esc-close": p.escClose,
                      "menu-wrap-ref": p.menuWrapRef,
                      "text-input": p.textInput,
                      "aria-labels": p.ariaLabels,
                      "overlay-label": M.overlayLabel,
                      onSelected: M.updateModelValue,
                      onToggle: M.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        p.$slots["calendar-icon"] ? renderSlot(p.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        p.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      p.$slots[`${M.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: r }) => [
                          renderSlot(p.$slots, `${M.type}-overlay-value`, {
                            text: r.text,
                            value: r.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      p.$slots[`${M.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(p.$slots, `${M.type}-overlay`, mergeProps({ ref_for: true }, ie.value(M.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      p.$slots[`${M.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(p.$slots, `${M.type}-overlay-header`, {
                            toggle: M.toggle
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
            unref(T)(unref(k), e.instance) && p.vertical ? (openBlock(), createBlock(Ut, {
              key: 1,
              "aria-label": (N = unref(c)) == null ? void 0 : N.prevMonth,
              "el-name": "action-prev",
              disabled: unref(f)(false),
              class: normalizeClass((s = unref(b)) == null ? void 0 : s.navBtnPrev),
              onActivate: z[2] || (z[2] = (M) => unref(U)(false, true))
            }, {
              default: withCtx(() => [
                p.$slots["arrow-up"] ? renderSlot(p.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                p.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(Q)(unref(k), e.instance) ? (openBlock(), createBlock(Ut, {
              key: 2,
              ref: "rightIcon",
              "el-name": "action-next",
              disabled: unref(f)(true),
              "aria-label": (le = unref(c)) == null ? void 0 : le.nextMonth,
              class: normalizeClass((pe = unref(b)) == null ? void 0 : pe.navBtnNext),
              onActivate: z[3] || (z[3] = (M) => unref(U)(true, true)),
              onSetRef: z[4] || (z[4] = (M) => ne(M, p.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                p.$slots[p.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(p.$slots, p.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                p.$slots[p.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(p.vertical ? unref(Wa) : unref(Ha)), { key: 1 }))
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
      defaultedConfig: k,
      defaultedAriaLabels: v,
      defaultedMultiCalendars: L,
      defaultedWeekNumbers: y,
      defaultedMultiDates: I,
      defaultedUI: b
    } = Ce(n), R = ref(null), H = ref({
      bottom: "",
      left: "",
      transform: ""
    }), E = ref([]), U = ref(null), f = ref(true), B = ref(""), T = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q = ref([]), te = ref({ left: "50%" }), oe = ref(false), X = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), S = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : pl(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: E }), k.value.noSwipe || U.value && (U.value.addEventListener("touchstart", ne, { passive: false }), U.value.addEventListener("touchend", de, { passive: false }), U.value.addEventListener("touchmove", d, { passive: false })), n.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", u, { passive: false });
    });
    const ae = (M) => M ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", O = (M, ge) => {
      if (n.transitions) {
        const r = Ge(dt(G(), n.month, n.year));
        B.value = Be(Ge(dt(G(), M, ge)), r) ? c.value[ae(true)] : c.value[ae(false)], f.value = false, nextTick(() => {
          f.value = true;
        });
      }
    }, q = computed(
      () => ({
        ...b.value.calendar ?? {}
      })
    ), ie = computed(() => (M) => {
      const ge = gl(M);
      return {
        dp__marker_dot: ge.type === "dot",
        dp__marker_line: ge.type === "line"
      };
    }), fe = computed(() => (M) => Me(M, R.value)), C = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: L.value.count > 0 && n.instance !== 0
    })), P = computed(() => (M) => n.hideOffsetDates ? M.current : true), x = async (M, ge) => {
      const { width: r, height: Y } = M.getBoundingClientRect();
      R.value = ge.value;
      let _ = { left: `${r / 2}px` }, V = -50;
      if (await nextTick(), Q.value[0]) {
        const { left: se, width: D } = Q.value[0].getBoundingClientRect();
        se < 0 && (_ = { left: "0" }, V = 0, te.value.left = `${r / 2}px`), window.innerWidth < se + D && (_ = { right: "0" }, V = 0, te.value.left = `${D - r / 2}px`);
      }
      H.value = {
        bottom: `${Y}px`,
        ..._,
        transform: `translateX(${V}%)`
      };
    }, m = async (M, ge, r) => {
      var _, V, se;
      const Y = Ie(E.value[ge][r]);
      Y && ((_ = M.marker) != null && _.customPosition && ((se = (V = M.marker) == null ? void 0 : V.tooltip) != null && se.length) ? H.value = M.marker.customPosition(Y) : await x(Y, M), a("tooltip-open", M.marker));
    }, K = async (M, ge, r) => {
      var Y, _;
      if (oe.value && I.value.enabled && I.value.dragSelect)
        return a("select-date", M);
      a("set-hover-date", M), (_ = (Y = M.marker) == null ? void 0 : Y.tooltip) != null && _.length && await m(M, ge, r);
    }, $ = (M) => {
      R.value && (R.value = null, H.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", M.marker));
    }, ne = (M) => {
      T.value.startX = M.changedTouches[0].screenX, T.value.startY = M.changedTouches[0].screenY;
    }, de = (M) => {
      T.value.endX = M.changedTouches[0].screenX, T.value.endY = M.changedTouches[0].screenY, p();
    }, d = (M) => {
      n.vertical && !n.inline && M.preventDefault();
    }, p = () => {
      const M = n.vertical ? "Y" : "X";
      Math.abs(T.value[`start${M}`] - T.value[`end${M}`]) > 10 && a("handle-swipe", T.value[`start${M}`] > T.value[`end${M}`] ? "right" : "left");
    }, z = (M, ge, r) => {
      M && (Array.isArray(E.value[ge]) ? E.value[ge][r] = M : E.value[ge] = [M]), n.arrowNavigation && i(E.value, "calendar");
    }, u = (M) => {
      n.monthChangeOnScroll && (M.preventDefault(), a("handle-scroll", M));
    }, h2 = (M) => y.value.type === "local" ? getWeek(M.value, { weekStartsOn: +n.weekStart }) : y.value.type === "iso" ? getISOWeek(M.value) : typeof y.value.type == "function" ? y.value.type(M.value) : "", N = (M) => {
      const ge = M[0];
      return y.value.hideOnOffsetDates ? M.some((r) => r.current) ? h2(ge) : "" : h2(ge);
    }, s = (M, ge, r = true) => {
      r && Dl() || I.value.enabled || (yt(M, k.value), a("select-date", ge));
    }, le = (M) => {
      yt(M, k.value);
    }, pe = (M) => {
      I.value.enabled && I.value.dragSelect ? (oe.value = true, a("select-date", M)) : I.value.enabled && a("select-date", M);
    };
    return t({ triggerTransition: O }), (M, ge) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(C.value)
    }, [
      createBaseVNode("div", {
        ref_key: "calendarWrapRef",
        ref: U,
        class: normalizeClass(q.value),
        role: "grid"
      }, [
        createBaseVNode("div", Or, [
          M.weekNumbers ? (openBlock(), createElementBlock("div", _r, toDisplayString(M.weekNumName), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (r, Y) => {
            var _, V;
            return openBlock(), createElementBlock("div", {
              key: Y,
              class: "dp__calendar_header_item",
              role: "gridcell",
              "data-test": "calendar-header",
              "aria-label": (V = (_ = unref(v)) == null ? void 0 : _.weekDay) == null ? void 0 : V.call(_, Y)
            }, [
              M.$slots["calendar-header"] ? renderSlot(M.$slots, "calendar-header", {
                key: 0,
                day: r,
                index: Y
              }) : createCommentVNode("", true),
              M.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(r), 1)
              ], 64))
            ], 8, Br);
          }), 128))
        ]),
        Yr,
        createVNode(Transition, {
          name: B.value,
          css: !!M.transitions
        }, {
          default: withCtx(() => [
            f.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: ge[1] || (ge[1] = (r) => oe.value = false)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(X.value, (r, Y) => (openBlock(), createElementBlock("div", {
                key: Y,
                class: "dp__calendar_row",
                role: "row"
              }, [
                M.weekNumbers ? (openBlock(), createElementBlock("div", Ir, [
                  createBaseVNode("div", Nr, toDisplayString(N(r.days)), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(r.days, (_, V) => {
                  var se, D, F;
                  return openBlock(), createElementBlock("div", {
                    id: unref(Yn)(_.value),
                    ref_for: true,
                    ref: (ce) => z(ce, Y, V),
                    key: V + Y,
                    role: "gridcell",
                    class: "dp__calendar_item",
                    "aria-pressed": (_.classData.dp__active_date || _.classData.dp__range_start || _.classData.dp__range_start) ?? void 0,
                    "aria-disabled": _.classData.dp__cell_disabled || void 0,
                    "aria-label": (D = (se = unref(v)) == null ? void 0 : se.day) == null ? void 0 : D.call(se, _),
                    tabindex: "0",
                    "data-test": _.value,
                    onClick: withModifiers((ce) => s(ce, _), ["prevent"]),
                    onTouchend: (ce) => s(ce, _, false),
                    onKeydown: (ce) => unref(Ke)(ce, () => M.$emit("select-date", _)),
                    onMouseenter: (ce) => K(_, Y, V),
                    onMouseleave: (ce) => $(_),
                    onMousedown: (ce) => pe(_),
                    onMouseup: ge[0] || (ge[0] = (ce) => oe.value = false)
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__cell_inner", _.classData])
                    }, [
                      M.$slots.day && P.value(_) ? renderSlot(M.$slots, "day", {
                        key: 0,
                        day: +_.text,
                        date: _.value
                      }) : createCommentVNode("", true),
                      M.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(_.text), 1)
                      ], 64)),
                      _.marker && P.value(_) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        M.$slots.marker ? renderSlot(M.$slots, "marker", {
                          key: 0,
                          marker: _.marker,
                          day: +_.text,
                          date: _.value
                        }) : (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(ie.value(_.marker)),
                          style: normalizeStyle(_.marker.color ? { backgroundColor: _.marker.color } : {})
                        }, null, 6))
                      ], 64)) : createCommentVNode("", true),
                      fe.value(_.value) ? (openBlock(), createElementBlock("div", {
                        key: 3,
                        ref_for: true,
                        ref_key: "activeTooltip",
                        ref: Q,
                        class: "dp__marker_tooltip",
                        style: normalizeStyle(H.value)
                      }, [
                        (F = _.marker) != null && F.tooltip ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: "dp__tooltip_content",
                          onClick: le
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_.marker.tooltip, (ce, he) => (openBlock(), createElementBlock("div", {
                            key: he,
                            class: "dp__tooltip_text"
                          }, [
                            M.$slots["marker-tooltip"] ? renderSlot(M.$slots, "marker-tooltip", {
                              key: 0,
                              tooltip: ce,
                              day: _.value
                            }) : createCommentVNode("", true),
                            M.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("div", {
                                class: "dp__tooltip_mark",
                                style: normalizeStyle(ce.color ? { backgroundColor: ce.color } : {})
                              }, null, 4),
                              createBaseVNode("div", null, toDisplayString(ce.text), 1)
                            ], 64))
                          ]))), 128)),
                          createBaseVNode("div", {
                            class: "dp__arrow_bottom_tp",
                            style: normalizeStyle(te.value)
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
var fn = (e) => Array.isArray(e);
var Lr = (e, t, l, a) => {
  const n = ref([]), i = ref(/* @__PURE__ */ new Date()), c = ref(), k = () => ne(e.isTextInputDate), { modelValue: v, calendars: L, time: y, today: I } = Jt(e, t, k), {
    defaultedMultiCalendars: b,
    defaultedStartTime: R,
    defaultedRange: H,
    defaultedConfig: E,
    defaultedTz: U,
    propDates: f,
    defaultedMultiDates: B
  } = Ce(e), { validateMonthYearInRange: T, isDisabled: Q, isDateRangeAllowed: te, checkMinMaxRange: oe } = kt(e), { updateTimeValues: X, getSetDateTime: S, setTime: ae, assignStartTime: O, validateTime: q, disabledTimesConfig: ie } = Hn(e, y, v, a), fe = computed(
    () => (w) => L.value[w] ? L.value[w].month : 0
  ), C = computed(
    () => (w) => L.value[w] ? L.value[w].year : 0
  ), P = (w) => !E.value.keepViewOnOffsetClick || w ? true : !c.value, x = (w, g, W, re = false) => {
    var Ae, Fe;
    P(re) && (L.value[w] || (L.value[w] = { month: 0, year: 0 }), L.value[w].month = on(g) ? (Ae = L.value[w]) == null ? void 0 : Ae.month : g, L.value[w].year = on(W) ? (Fe = L.value[w]) == null ? void 0 : Fe.year : W);
  }, m = () => {
    e.autoApply && t("select-date");
  };
  onMounted(() => {
    e.shadow || (v.value || (M(), R.value && O(R.value)), ne(true), e.focusStartDate && e.startDate && M());
  });
  const K = computed(() => {
    var w;
    return (w = e.flow) != null && w.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), $ = () => {
    e.autoApply && K.value && t("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : false);
  }, ne = (w = false) => {
    if (v.value)
      return Array.isArray(v.value) ? (n.value = v.value, N(w)) : p(v.value, w);
    if (b.value.count && w && !e.startDate)
      return d(G(), w);
  }, de = () => Array.isArray(v.value) && H.value.enabled ? getMonth(v.value[0]) === getMonth(v.value[1] ?? v.value[0]) : false, d = (w = /* @__PURE__ */ new Date(), g = false) => {
    if ((!b.value.count || !b.value.static || g) && x(0, getMonth(w), getYear(w)), b.value.count && (!b.value.solo || !v.value || de()))
      for (let W = 1; W < b.value.count; W++) {
        const re = set(G(), { month: fe.value(W - 1), year: C.value(W - 1) }), Ae = add(re, { months: 1 });
        L.value[W] = { month: getMonth(Ae), year: getYear(Ae) };
      }
  }, p = (w, g) => {
    d(w), ae("hours", getHours(w)), ae("minutes", getMinutes(w)), ae("seconds", getSeconds(w)), b.value.count && g && pe();
  }, z = (w) => {
    if (b.value.count) {
      if (b.value.solo) return 0;
      const g = getMonth(w[0]), W = getMonth(w[1]);
      return Math.abs(W - g) < b.value.count ? 0 : 1;
    }
    return 1;
  }, u = (w, g) => {
    w[1] && H.value.showLastInRange ? d(w[z(w)], g) : d(w[0], g);
    const W = (re, Ae) => [
      re(w[0]),
      w[1] ? re(w[1]) : y[Ae][1]
    ];
    ae("hours", W(getHours, "hours")), ae("minutes", W(getMinutes, "minutes")), ae("seconds", W(getSeconds, "seconds"));
  }, h2 = (w, g) => {
    if ((H.value.enabled || e.weekPicker) && !B.value.enabled)
      return u(w, g);
    if (B.value.enabled && g) {
      const W = w[w.length - 1];
      return p(W, g);
    }
  }, N = (w) => {
    const g = v.value;
    h2(g, w), b.value.count && b.value.solo && pe();
  }, s = (w, g) => {
    const W = set(G(), { month: fe.value(g), year: C.value(g) }), re = w < 0 ? addMonths(W, 1) : subMonths(W, 1);
    T(getMonth(re), getYear(re), w < 0, e.preventMinMaxNavigation) && (x(g, getMonth(re), getYear(re)), t("update-month-year", { instance: g, month: getMonth(re), year: getYear(re) }), b.value.count && !b.value.solo && le(g), l());
  }, le = (w) => {
    for (let g = w - 1; g >= 0; g--) {
      const W = subMonths(set(G(), { month: fe.value(g + 1), year: C.value(g + 1) }), 1);
      x(g, getMonth(W), getYear(W));
    }
    for (let g = w + 1; g <= b.value.count - 1; g++) {
      const W = addMonths(set(G(), { month: fe.value(g - 1), year: C.value(g - 1) }), 1);
      x(g, getMonth(W), getYear(W));
    }
  }, pe = () => {
    if (Array.isArray(v.value) && v.value.length === 2) {
      const w = G(
        G(v.value[1] ? v.value[1] : addMonths(v.value[0], 1))
      ), [g, W] = [getMonth(v.value[0]), getYear(v.value[0])], [re, Ae] = [getMonth(v.value[1]), getYear(v.value[1])];
      (g !== re || g === re && W !== Ae) && b.value.solo && x(1, getMonth(w), getYear(w));
    } else v.value && !Array.isArray(v.value) && (x(0, getMonth(v.value), getYear(v.value)), d(G()));
  }, M = () => {
    e.startDate && (x(0, getMonth(G(e.startDate)), getYear(G(e.startDate))), b.value.count && le(0));
  }, ge = (w, g) => {
    if (e.monthChangeOnScroll) {
      const W = (/* @__PURE__ */ new Date()).getTime() - i.value.getTime(), re = Math.abs(w.deltaY);
      let Ae = 500;
      re > 1 && (Ae = 100), re > 100 && (Ae = 0), W > Ae && (i.value = /* @__PURE__ */ new Date(), s(e.monthChangeOnScroll !== "inverse" ? -w.deltaY : w.deltaY, g));
    }
  }, r = (w, g, W = false) => {
    e.monthChangeOnArrows && e.vertical === W && Y(w, g);
  }, Y = (w, g) => {
    s(w === "right" ? -1 : 1, g);
  }, _ = (w) => {
    if (f.value.markers)
      return sa(w.value, f.value.markers);
  }, V = (w, g) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [w == 0, true];
      case "fair":
        return [w == 0 || g > w, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, se = (w, g, W, re) => {
    if (e.sixWeeks && w.length < 6) {
      const Ae = 6 - w.length, Fe = (g.getDay() + 7 - re) % 7, xt = 6 - (W.getDay() + 7 - re) % 7, [zt, Da] = V(Fe, xt);
      for (let Dt = 1; Dt <= Ae; Dt++)
        if (Da ? !!(Dt % 2) == zt : zt) {
          const ea = w[0].days[0], Ma = D(addDays(ea.value, -7), getMonth(g));
          w.unshift({ days: Ma });
        } else {
          const ea = w[w.length - 1], Ma = ea.days[ea.days.length - 1], Vn = D(addDays(Ma.value, 1), getMonth(g));
          w.push({ days: Vn });
        }
    }
    return w;
  }, D = (w, g) => {
    const W = G(w), re = [];
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
  }, F = (w, g) => {
    const W = [], re = new Date(g, w), Ae = new Date(g, w + 1, 0), Fe = e.weekStart, wt = startOfWeek(re, { weekStartsOn: Fe }), xt = (zt) => {
      const Da = D(zt, w);
      if (W.push({ days: Da }), !W[W.length - 1].days.some(
        (Dt) => Me(Ge(Dt.value), Ge(Ae))
      )) {
        const Dt = addDays(zt, 7);
        xt(Dt);
      }
    };
    return xt(wt), se(W, re, Ae, Fe);
  }, ce = (w) => {
    const g = gt(G(w.value), y.hours, y.minutes, Xe());
    t("date-update", g), B.value.enabled ? Xa(g, v, B.value.limit) : v.value = g, a(), nextTick().then(() => {
      $();
    });
  }, he = (w) => H.value.noDisabledRange ? Rn(n.value[0], w).some((W) => Q(W)) : false, et = () => {
    n.value = v.value ? v.value.slice() : [], n.value.length === 2 && !(H.value.fixedStart || H.value.fixedEnd) && (n.value = []);
  }, ve = (w, g) => {
    const W = [
      G(w.value),
      addDays(G(w.value), +H.value.autoRange)
    ];
    te(W) ? (g && vt(w.value), n.value = W) : t("invalid-date", w.value);
  }, vt = (w) => {
    const g = getMonth(G(w)), W = getYear(G(w));
    if (x(0, g, W), b.value.count > 0)
      for (let re = 1; re < b.value.count; re++) {
        const Ae = Al(
          set(G(w), { year: C.value(re - 1), month: fe.value(re - 1) })
        );
        x(re, Ae.month, Ae.year);
      }
  }, ot = (w) => {
    if (he(w.value) || !oe(w.value, v.value, H.value.fixedStart ? 0 : 1))
      return t("invalid-date", w.value);
    n.value = Fn(G(w.value), v, t, H);
  }, Ft = (w, g) => {
    if (et(), H.value.autoRange) return ve(w, g);
    if (H.value.fixedStart || H.value.fixedEnd) return ot(w);
    n.value[0] ? oe(G(w.value), v.value) && !he(w.value) ? Oe(G(w.value), G(n.value[0])) ? (n.value.unshift(G(w.value)), t("range-end", n.value[0])) : (n.value[1] = G(w.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", w.value), t("invalid-date", w.value)) : (n.value[0] = G(w.value), t("range-start", n.value[0]));
  }, Xe = (w = true) => e.enableSeconds ? Array.isArray(y.seconds) ? w ? y.seconds[0] : y.seconds[1] : y.seconds : 0, Lt = (w) => {
    n.value[w] = gt(
      n.value[w],
      y.hours[w],
      y.minutes[w],
      Xe(w !== 1)
    );
  }, pa = () => {
    var w, g;
    n.value[0] && n.value[1] && +((w = n.value) == null ? void 0 : w[0]) > +((g = n.value) == null ? void 0 : g[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, Zt = () => {
    n.value.length && (n.value[0] && !n.value[1] ? Lt(0) : (Lt(0), Lt(1), a()), pa(), v.value = n.value.slice(), va(n.value, t, e.autoApply, e.modelAuto));
  }, ya = (w, g = false) => {
    if (Q(w.value) || !w.current && e.hideOffsetDates) return t("invalid-date", w.value);
    if (c.value = JSON.parse(JSON.stringify(w)), !H.value.enabled) return ce(w);
    fn(y.hours) && fn(y.minutes) && !B.value.enabled && (Ft(w, g), Zt());
  }, ga = (w, g) => {
    var re;
    x(w, g.month, g.year, true), b.value.count && !b.value.solo && le(w), t("update-month-year", { instance: w, month: g.month, year: g.year }), l(b.value.solo ? w : void 0);
    const W = (re = e.flow) != null && re.length ? e.flow[e.flowStep] : void 0;
    !g.fromNav && (W === He.month || W === He.year) && a();
  }, ha = (w, g) => {
    En({
      value: w,
      modelValue: v,
      range: H.value.enabled,
      timezone: g ? void 0 : U.value.timezone
    }), m(), e.multiCalendars && nextTick().then(() => ne(true));
  }, ba = () => {
    const w = ja(G(), U.value);
    H.value.enabled ? v.value && Array.isArray(v.value) && v.value[0] ? v.value = Oe(w, v.value[0]) ? [w, v.value[0]] : [v.value[0], w] : v.value = [w] : v.value = w, m();
  }, ka = () => {
    if (Array.isArray(v.value))
      if (B.value.enabled) {
        const w = wa();
        v.value[v.value.length - 1] = S(w);
      } else
        v.value = v.value.map((w, g) => w && S(w, g));
    else
      v.value = S(v.value);
    t("time-update");
  }, wa = () => Array.isArray(v.value) && v.value.length ? v.value[v.value.length - 1] : null;
  return {
    calendars: L,
    modelValue: v,
    month: fe,
    year: C,
    time: y,
    disabledTimesConfig: ie,
    today: I,
    validateTime: q,
    getCalendarDays: F,
    getMarker: _,
    handleScroll: ge,
    handleSwipe: Y,
    handleArrow: r,
    selectDate: ya,
    updateMonthYear: ga,
    presetDate: ha,
    selectCurrentDate: ba,
    updateTime: (w, g = true, W = false) => {
      X(w, g, W, ka);
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
      year: k,
      modelValue: v,
      time: L,
      disabledTimesConfig: y,
      today: I,
      validateTime: b,
      getCalendarDays: R,
      getMarker: H,
      handleArrow: E,
      handleScroll: U,
      handleSwipe: f,
      selectDate: B,
      updateMonthYear: T,
      presetDate: Q,
      selectCurrentDate: te,
      updateTime: oe,
      assignMonthAndYear: X
    } = Lr(n, a, de, d), S = useSlots(), { setHoverDate: ae, getDayClassData: O, clearHoverDate: q } = lo(v, n), { defaultedMultiCalendars: ie } = Ce(n), fe = ref([]), C = ref([]), P = ref(null), x = Je(S, "calendar"), m = Je(S, "monthYear"), K = Je(S, "timePicker"), $ = (r) => {
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
      (r, Y) => {
        r.count - Y.count > 0 && X();
      },
      { deep: true }
    );
    const ne = computed(() => (r) => R(c.value(r), k.value(r)).map((Y) => ({
      ...Y,
      days: Y.days.map((_) => (_.marker = H(_), _.classData = O(_), _))
    })));
    function de(r) {
      var Y;
      r || r === 0 ? (Y = C.value[r]) == null || Y.triggerTransition(c.value(r), k.value(r)) : C.value.forEach((_, V) => _.triggerTransition(c.value(V), k.value(V)));
    }
    function d() {
      a("update-flow-step");
    }
    const p = (r, Y = false) => {
      B(r, Y), n.spaceConfirm && a("select-date");
    }, z = (r, Y, _ = 0) => {
      var V;
      (V = fe.value[_]) == null || V.toggleMonthPicker(r, Y);
    }, u = (r, Y, _ = 0) => {
      var V;
      (V = fe.value[_]) == null || V.toggleYearPicker(r, Y);
    }, h2 = (r, Y, _) => {
      var V;
      (V = P.value) == null || V.toggleTimePicker(r, Y, _);
    }, N = (r, Y) => {
      var _;
      if (!n.range) {
        const V = v.value ? v.value : I, se = Y ? new Date(Y) : V, D = r ? startOfWeek(se, { weekStartsOn: 1 }) : endOfWeek(se, { weekStartsOn: 1 });
        B({
          value: D,
          current: getMonth(se) === c.value(0),
          text: "",
          classData: {}
        }), (_ = document.getElementById(Yn(D))) == null || _.focus();
      }
    }, s = (r) => {
      var Y;
      (Y = fe.value[0]) == null || Y.handleMonthYearChange(r, true);
    }, le = (r) => {
      T(0, { month: c.value(0), year: k.value(0) + (r ? 1 : -1), fromNav: true });
    }, pe = (r, Y) => {
      r === He.time && a(`time-picker-${Y ? "open" : "close"}`), a("overlay-toggle", { open: Y, overlay: r });
    }, M = (r) => {
      a("overlay-toggle", { open: false, overlay: r }), a("focus-menu");
    };
    return t({
      clearHoverDate: q,
      presetDate: Q,
      selectCurrentDate: te,
      toggleMonthPicker: z,
      toggleYearPicker: u,
      toggleTimePicker: h2,
      handleArrow: E,
      updateMonthYear: T,
      getSidebarProps: () => ({
        modelValue: v,
        month: c,
        year: k,
        time: L,
        updateTime: oe,
        updateMonthYear: T,
        selectDate: B,
        presetDate: Q
      }),
      changeMonth: s,
      changeYear: le,
      selectWeekDate: N
    }), (r, Y) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(fa, {
        "multi-calendars": unref(ie).count,
        collapse: r.collapse
      }, {
        default: withCtx(({ instance: _, index: V }) => [
          r.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Cr, mergeProps({
            key: 0,
            ref: (se) => {
              se && (fe.value[V] = se);
            },
            months: unref(Mn)(r.formatLocale, r.locale, r.monthNameFormat),
            years: unref(Ka)(r.yearRange, r.locale, r.reverseYears),
            month: unref(c)(_),
            year: unref(k)(_),
            instance: _
          }, r.$props, {
            onMount: Y[0] || (Y[0] = (se) => $(unref(Tt).header)),
            onResetFlow: Y[1] || (Y[1] = (se) => r.$emit("reset-flow")),
            onUpdateMonthYear: (se) => unref(T)(_, se),
            onOverlayClosed: M,
            onOverlayOpened: Y[2] || (Y[2] = (se) => r.$emit("overlay-toggle", { open: true, overlay: se }))
          }), createSlots({ _: 2 }, [
            renderList(unref(m), (se, D) => ({
              name: se,
              fn: withCtx((F) => [
                renderSlot(r.$slots, se, normalizeProps(guardReactiveProps(F)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Fr, mergeProps({
            ref: (se) => {
              se && (C.value[V] = se);
            },
            "mapped-dates": ne.value(_),
            month: unref(c)(_),
            year: unref(k)(_),
            instance: _
          }, r.$props, {
            onSelectDate: (se) => unref(B)(se, _ !== 1),
            onHandleSpace: (se) => p(se, _ !== 1),
            onSetHoverDate: Y[3] || (Y[3] = (se) => unref(ae)(se)),
            onHandleScroll: (se) => unref(U)(se, _),
            onHandleSwipe: (se) => unref(f)(se, _),
            onMount: Y[4] || (Y[4] = (se) => $(unref(Tt).calendar)),
            onResetFlow: Y[5] || (Y[5] = (se) => r.$emit("reset-flow")),
            onTooltipOpen: Y[6] || (Y[6] = (se) => r.$emit("tooltip-open", se)),
            onTooltipClose: Y[7] || (Y[7] = (se) => r.$emit("tooltip-close", se))
          }), createSlots({ _: 2 }, [
            renderList(unref(x), (se, D) => ({
              name: se,
              fn: withCtx((F) => [
                renderSlot(r.$slots, se, normalizeProps(guardReactiveProps({ ...F })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      r.enableTimePicker ? (openBlock(), createElementBlock("div", zr, [
        r.$slots["time-picker"] ? renderSlot(r.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(L), updateTime: unref(oe) }))) : (openBlock(), createBlock(zn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: P
        }, r.$props, {
          hours: unref(L).hours,
          minutes: unref(L).minutes,
          seconds: unref(L).seconds,
          "internal-model-value": r.internalModelValue,
          "disabled-times-config": unref(y),
          "validate-time": unref(b),
          onMount: Y[8] || (Y[8] = (_) => $(unref(Tt).timePicker)),
          "onUpdate:hours": Y[9] || (Y[9] = (_) => unref(oe)(_)),
          "onUpdate:minutes": Y[10] || (Y[10] = (_) => unref(oe)(_, false)),
          "onUpdate:seconds": Y[11] || (Y[11] = (_) => unref(oe)(_, false, true)),
          onResetFlow: Y[12] || (Y[12] = (_) => r.$emit("reset-flow")),
          onOverlayClosed: Y[13] || (Y[13] = (_) => pe(_, false)),
          onOverlayOpened: Y[14] || (Y[14] = (_) => pe(_, true)),
          onAmPmChange: Y[15] || (Y[15] = (_) => r.$emit("am-pm-change", _))
        }), createSlots({ _: 2 }, [
          renderList(unref(K), (_, V) => ({
            name: _,
            fn: withCtx((se) => [
              renderSlot(r.$slots, _, normalizeProps(guardReactiveProps(se)))
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
    propDates: k,
    defaultedFilters: v,
    defaultedMultiDates: L
  } = Ce(e), { modelValue: y, year: I, month: b, calendars: R } = Jt(e, t), { isDisabled: H } = kt(e), { selectYear: E, groupedYears: U, showYearPicker: f, isDisabled: B, toggleYearPicker: T, handleYearSelect: Q, handleYear: te } = Ln({
    modelValue: y,
    multiCalendars: a,
    range: c,
    highlight: i,
    calendars: R,
    propDates: k,
    month: b,
    year: I,
    filters: v,
    props: e,
    emit: t
  }), oe = (m, K) => [m, K].map(($) => format($, "MMMM", { locale: e.formatLocale })).join("-"), X = computed(() => (m) => y.value ? Array.isArray(y.value) ? y.value.some((K) => isSameQuarter(m, K)) : isSameQuarter(y.value, m) : false), S = (m) => {
    if (c.value.enabled) {
      if (Array.isArray(y.value)) {
        const K = Me(m, y.value[0]) || Me(m, y.value[1]);
        return da(y.value, l.value, m) && !K;
      }
      return false;
    }
    return false;
  }, ae = (m, K) => m.quarter === getQuarter(K) && m.year === getYear(K), O = (m) => typeof i.value == "function" ? i.value({ quarter: getQuarter(m), year: getYear(m) }) : !!i.value.quarters.find((K) => ae(K, m)), q = computed(() => (m) => {
    const K = set(/* @__PURE__ */ new Date(), { year: I.value(m) });
    return eachQuarterOfInterval({
      start: startOfYear(K),
      end: endOfYear(K)
    }).map(($) => {
      const ne = startOfQuarter($), de = endOfQuarter($), d = H($), p = S(ne), z = O(ne);
      return {
        text: oe(ne, de),
        value: ne,
        active: X.value(ne),
        highlighted: z,
        disabled: d,
        isBetween: p
      };
    });
  }), ie = (m) => {
    Xa(m, y, L.value.limit), t("auto-apply", true);
  }, fe = (m) => {
    y.value = Ja(y, m, t), va(y.value, t, e.autoApply, e.modelAuto);
  }, C = (m) => {
    y.value = m, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: U,
    year: I,
    isDisabled: B,
    quarters: q,
    showYearPicker: f,
    modelValue: y,
    setHoverDate: (m) => {
      l.value = m;
    },
    selectYear: E,
    selectQuarter: (m, K, $) => {
      if (!$)
        return R.value[K].month = getMonth(endOfQuarter(m)), L.value.enabled ? ie(m) : c.value.enabled ? fe(m) : C(m);
    },
    toggleYearPicker: T,
    handleYearSelect: Q,
    handleYear: te
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
      defaultedMultiCalendars: k,
      defaultedConfig: v,
      groupedYears: L,
      year: y,
      isDisabled: I,
      quarters: b,
      modelValue: R,
      showYearPicker: H,
      setHoverDate: E,
      selectQuarter: U,
      toggleYearPicker: f,
      handleYearSelect: B,
      handleYear: T
    } = Ur(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: R,
      year: y,
      selectQuarter: U,
      handleYearSelect: B,
      handleYear: T
    }) }), (te, oe) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(k).count,
      collapse: te.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: X }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(v).modeHeight}px` })
        }, [
          te.$slots["top-extra"] ? renderSlot(te.$slots, "top-extra", {
            key: 0,
            value: te.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(Nn, mergeProps(te.$props, {
              items: unref(L)(X),
              instance: X,
              "show-year-picker": unref(H)[X],
              year: unref(y)(X),
              "is-disabled": (S) => unref(I)(X, S),
              onHandleYear: (S) => unref(T)(X, S),
              onYearSelect: (S) => unref(B)(S, X),
              onToggleYearPicker: (S) => unref(f)(X, S == null ? void 0 : S.flow, S == null ? void 0 : S.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(c), (S, ae) => ({
                name: S,
                fn: withCtx((O) => [
                  renderSlot(te.$slots, S, normalizeProps(guardReactiveProps(O)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Vr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(b)(X), (S, ae) => (openBlock(), createElementBlock("div", { key: ae }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": S.active,
                  "dp--qr-btn-between": S.isBetween,
                  "dp--qr-btn-disabled": S.disabled,
                  "dp--highlighted": S.highlighted
                }]),
                "data-test": S.value,
                disabled: S.disabled,
                onClick: (O) => unref(U)(S.value, X, S.disabled),
                onMouseover: (O) => unref(E)(S.value)
              }, [
                te.$slots.quarter ? renderSlot(te.$slots, "quarter", {
                  key: 0,
                  value: S.value,
                  text: S.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(S.text), 1)
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
var vn = defineComponent({
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
      const { openOnTop: D, ...F } = n;
      return {
        ...F,
        flowStep: ae.value,
        collapse: n.collapse,
        noOverlayFocus: n.noOverlayFocus,
        menuWrapRef: i.value
      };
    }), { setMenuFocused: k, setShiftKey: v, control: L } = In(), y = useSlots(), { defaultedTextInput: I, defaultedInline: b, defaultedConfig: R, defaultedUI: H } = Ce(n), E = ref(null), U = ref(0), f = ref(null), B = ref(false), T = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        B.value = true, Q(), window.addEventListener("resize", Q);
        const D = Ie(i);
        if (D && !I.value.enabled && !b.value.enabled && (k(true), x()), D) {
          const F = (ce) => {
            R.value.allowPreventDefault && ce.preventDefault(), yt(ce, R.value, true);
          };
          D.addEventListener("pointerdown", F), D.addEventListener("mousedown", F);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", Q);
    });
    const Q = () => {
      const D = Ie(f);
      D && (U.value = D.getBoundingClientRect().width);
    }, { arrowRight: te, arrowLeft: oe, arrowDown: X, arrowUp: S } = bt(), { flowStep: ae, updateFlowStep: O, childMount: q, resetFlow: ie, handleFlow: fe } = ro(n, a, T), C = computed(() => n.monthPicker ? rr : n.yearPicker ? sr : n.timePicker ? $r : n.quarterPicker ? jr : Hr), P = computed(() => {
      var ce;
      if (R.value.arrowLeft) return R.value.arrowLeft;
      const D = (ce = i.value) == null ? void 0 : ce.getBoundingClientRect(), F = n.getInputRect();
      return (F == null ? void 0 : F.width) < (U == null ? void 0 : U.value) && (F == null ? void 0 : F.left) <= ((D == null ? void 0 : D.left) ?? 0) ? `${(F == null ? void 0 : F.width) / 2}px` : (F == null ? void 0 : F.right) >= ((D == null ? void 0 : D.right) ?? 0) && (F == null ? void 0 : F.width) < (U == null ? void 0 : U.value) ? `${(U == null ? void 0 : U.value) - (F == null ? void 0 : F.width) / 2}px` : "50%";
    }), x = () => {
      const D = Ie(i);
      D && D.focus({ preventScroll: true });
    }, m = computed(() => {
      var D;
      return ((D = T.value) == null ? void 0 : D.getSidebarProps()) || {};
    }), K = () => {
      n.openOnTop && a("recalculate-position");
    }, $ = Je(y, "action"), ne = computed(() => n.monthPicker || n.yearPicker ? Je(y, "monthYear") : n.timePicker ? Je(y, "timePicker") : Je(y, "shared")), de = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), d = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), p = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !b.value.enabled,
        dp__relative: b.value.enabled,
        ...H.value.menu ?? {}
      })
    ), z = (D) => {
      yt(D, R.value, true);
    }, u = () => {
      n.escClose && a("close-picker");
    }, h2 = (D) => {
      if (n.arrowNavigation) {
        if (D === je.up) return S();
        if (D === je.down) return X();
        if (D === je.left) return oe();
        if (D === je.right) return te();
      } else D === je.left || D === je.up ? M("handleArrow", je.left, 0, D === je.up) : M("handleArrow", je.right, 0, D === je.down);
    }, N = (D) => {
      v(D.shiftKey), !n.disableMonthYearSelect && D.code === Pe.tab && D.target.classList.contains("dp__menu") && L.value.shiftKeyInMenu && (D.preventDefault(), yt(D, R.value, true), a("close-picker"));
    }, s = () => {
      x(), a("time-picker-close");
    }, le = (D) => {
      var F, ce, he;
      (F = T.value) == null || F.toggleTimePicker(false, false), (ce = T.value) == null || ce.toggleMonthPicker(false, false, D), (he = T.value) == null || he.toggleYearPicker(false, false, D);
    }, pe = (D, F = 0) => {
      var ce, he, et;
      return D === "month" ? (ce = T.value) == null ? void 0 : ce.toggleMonthPicker(false, true, F) : D === "year" ? (he = T.value) == null ? void 0 : he.toggleYearPicker(false, true, F) : D === "time" ? (et = T.value) == null ? void 0 : et.toggleTimePicker(true, false) : le(F);
    }, M = (D, ...F) => {
      var ce, he;
      (ce = T.value) != null && ce[D] && ((he = T.value) == null || he[D](...F));
    }, ge = () => {
      M("selectCurrentDate");
    }, r = (D, F) => {
      M("presetDate", D, F);
    }, Y = () => {
      M("clearHoverDate");
    }, _ = (D, F) => {
      M("updateMonthYear", D, F);
    }, V = (D, F) => {
      D.preventDefault(), h2(F);
    }, se = (D) => {
      var F, ce, he;
      if (N(D), D.key === Pe.home || D.key === Pe.end)
        return M(
          "selectWeekDate",
          D.key === Pe.home,
          D.target.getAttribute("id")
        );
      switch ((D.key === Pe.pageUp || D.key === Pe.pageDown) && (D.shiftKey ? (M("changeYear", D.key === Pe.pageUp), (F = Ea(i.value, "overlay-year")) == null || F.focus()) : (M("changeMonth", D.key === Pe.pageUp), (ce = Ea(i.value, D.key === Pe.pageUp ? "action-prev" : "action-next")) == null || ce.focus()), D.target.getAttribute("id") && ((he = i.value) == null || he.focus({ preventScroll: true }))), D.key) {
        case Pe.esc:
          return u();
        case Pe.arrowLeft:
          return V(D, je.left);
        case Pe.arrowRight:
          return V(D, je.right);
        case Pe.arrowUp:
          return V(D, je.up);
        case Pe.arrowDown:
          return V(D, je.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: _,
      switchView: pe,
      handleFlow: fe
    }), (D, F) => {
      var ce, he, et;
      return openBlock(), createElementBlock("div", {
        id: D.uid ? `dp-menu-${D.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: i,
        tabindex: unref(b).enabled ? void 0 : "0",
        role: unref(b).enabled ? void 0 : "dialog",
        "aria-label": (ce = D.ariaLabels) == null ? void 0 : ce.menu,
        class: normalizeClass(p.value),
        style: normalizeStyle({ "--dp-arrow-left": P.value }),
        onMouseleave: Y,
        onClick: z,
        onKeydown: se
      }, [
        (D.disabled || D.readonly) && unref(b).enabled || D.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(d.value)
        }, [
          D.loading ? (openBlock(), createElementBlock("div", Gr, qr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        D.$slots["menu-header"] ? (openBlock(), createElementBlock("div", Xr, [
          renderSlot(D.$slots, "menu-header")
        ])) : createCommentVNode("", true),
        !unref(b).enabled && !D.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(de.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: f,
          class: normalizeClass({
            dp__menu_content_wrapper: ((he = D.presetDates) == null ? void 0 : he.length) || !!D.$slots["left-sidebar"] || !!D.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((et = D.presetDates) == null ? void 0 : et.length) || !!D.$slots["left-sidebar"] || !!D.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${U.value}px` })
        }, [
          D.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Jr, [
            renderSlot(D.$slots, "left-sidebar", normalizeProps(guardReactiveProps(m.value)))
          ])) : createCommentVNode("", true),
          D.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(D.presetDates, (ve, vt) => (openBlock(), createElementBlock(Fragment, { key: vt }, [
              ve.slot ? renderSlot(D.$slots, ve.slot, {
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
            ref: E,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(C.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: T
            }, c.value, {
              "flow-step": unref(ae),
              onMount: unref(q),
              onUpdateFlowStep: unref(O),
              onResetFlow: unref(ie),
              onFocusMenu: x,
              onSelectDate: F[0] || (F[0] = (ve) => D.$emit("select-date")),
              onDateUpdate: F[1] || (F[1] = (ve) => D.$emit("date-update", ve)),
              onTooltipOpen: F[2] || (F[2] = (ve) => D.$emit("tooltip-open", ve)),
              onTooltipClose: F[3] || (F[3] = (ve) => D.$emit("tooltip-close", ve)),
              onAutoApply: F[4] || (F[4] = (ve) => D.$emit("auto-apply", ve)),
              onRangeStart: F[5] || (F[5] = (ve) => D.$emit("range-start", ve)),
              onRangeEnd: F[6] || (F[6] = (ve) => D.$emit("range-end", ve)),
              onInvalidFixedRange: F[7] || (F[7] = (ve) => D.$emit("invalid-fixed-range", ve)),
              onTimeUpdate: F[8] || (F[8] = (ve) => D.$emit("time-update")),
              onAmPmChange: F[9] || (F[9] = (ve) => D.$emit("am-pm-change", ve)),
              onTimePickerOpen: F[10] || (F[10] = (ve) => D.$emit("time-picker-open", ve)),
              onTimePickerClose: s,
              onRecalculatePosition: K,
              onUpdateMonthYear: F[11] || (F[11] = (ve) => D.$emit("update-month-year", ve)),
              onAutoApplyInvalid: F[12] || (F[12] = (ve) => D.$emit("auto-apply-invalid", ve)),
              onInvalidDate: F[13] || (F[13] = (ve) => D.$emit("invalid-date", ve)),
              onOverlayToggle: F[14] || (F[14] = (ve) => D.$emit("overlay-toggle", ve)),
              "onUpdate:internalModelValue": F[15] || (F[15] = (ve) => D.$emit("update:internal-model-value", ve))
            }), createSlots({ _: 2 }, [
              renderList(ne.value, (ve, vt) => ({
                name: ve,
                fn: withCtx((ot) => [
                  renderSlot(D.$slots, ve, normalizeProps(guardReactiveProps({ ...ot })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          D.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", xr, [
            renderSlot(D.$slots, "right-sidebar", normalizeProps(guardReactiveProps(m.value)))
          ])) : createCommentVNode("", true),
          D.$slots["action-extra"] ? (openBlock(), createElementBlock("div", eo, [
            D.$slots["action-extra"] ? renderSlot(D.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: ge
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !D.autoApply || unref(R).keepActionRow ? (openBlock(), createBlock(Jl, mergeProps({
          key: 3,
          "menu-mount": B.value
        }, c.value, {
          "calendar-width": U.value,
          onClosePicker: F[16] || (F[16] = (ve) => D.$emit("close-picker")),
          onSelectDate: F[17] || (F[17] = (ve) => D.$emit("select-date")),
          onInvalidSelect: F[18] || (F[18] = (ve) => D.$emit("invalid-select")),
          onSelectNow: ge
        }), createSlots({ _: 2 }, [
          renderList(unref($), (ve, vt) => ({
            name: ve,
            fn: withCtx((ot) => [
              renderSlot(D.$slots, ve, normalizeProps(guardReactiveProps({ ...ot })))
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
  slots: k
}) => {
  const { defaultedConfig: v } = Ce(c), L = ref({}), y = ref(false), I = ref({
    top: "0",
    left: "0"
  }), b = ref(false), R = toRef(c, "teleportCenter");
  watch(R, () => {
    I.value = JSON.parse(JSON.stringify({})), te();
  });
  const H = (m) => {
    if (c.teleport) {
      const K = m.getBoundingClientRect();
      return {
        left: K.left + window.scrollX,
        top: K.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, E = (m, K) => {
    I.value.left = `${m + K - L.value.width}px`;
  }, U = (m) => {
    I.value.left = `${m}px`;
  }, f = (m, K) => {
    c.position === Ct.left && U(m), c.position === Ct.right && E(m, K), c.position === Ct.center && (I.value.left = `${m + K / 2 - L.value.width / 2}px`);
  }, B = (m) => {
    const { width: K, height: $ } = m.getBoundingClientRect(), { top: ne, left: de } = c.altPosition ? c.altPosition(m) : H(m);
    return { top: +ne, left: +de, width: K, height: $ };
  }, T = () => {
    I.value.left = "50%", I.value.top = "50%", I.value.transform = "translate(-50%, -50%)", I.value.position = "fixed", delete I.value.opacity;
  }, Q = () => {
    const m = Ie(l), { top: K, left: $, transform: ne } = c.altPosition(m);
    I.value = { top: `${K}px`, left: `${$}px`, transform: ne ?? "" };
  }, te = (m = true) => {
    var K;
    if (!n.value.enabled) {
      if (R.value) return T();
      if (c.altPosition !== null) return Q();
      if (m) {
        const $ = c.teleport ? (K = t.value) == null ? void 0 : K.$el : e.value;
        $ && (L.value = $.getBoundingClientRect()), i("recalculate-position");
      }
      return ie();
    }
  }, oe = ({ inputEl: m, left: K, width: $ }) => {
    window.screen.width > 768 && !y.value && f(K, $), ae(m);
  }, X = (m) => {
    const { top: K, left: $, height: ne, width: de } = B(m);
    I.value.top = `${ne + K + +c.offset}px`, b.value = false, y.value || (I.value.left = `${$ + de / 2 - L.value.width / 2}px`), oe({ inputEl: m, left: $, width: de });
  }, S = (m) => {
    const { top: K, left: $, width: ne } = B(m);
    I.value.top = `${K - +c.offset - L.value.height}px`, b.value = true, oe({ inputEl: m, left: $, width: ne });
  }, ae = (m) => {
    if (c.autoPosition) {
      const { left: K, width: $ } = B(m), { left: ne, right: de } = L.value;
      if (!y.value) {
        if (Math.abs(ne) !== Math.abs(de)) {
          if (ne <= 0)
            return y.value = true, U(K);
          if (de >= document.documentElement.clientWidth)
            return y.value = true, E(K, $);
        }
        return f(K, $);
      }
    }
  }, O = () => {
    const m = Ie(l);
    if (m) {
      const { height: K } = L.value, { top: $, height: ne } = m.getBoundingClientRect(), d = window.innerHeight - $ - ne, p = $;
      return K <= d ? Mt.bottom : K > d && K <= p ? Mt.top : d >= p ? Mt.bottom : Mt.top;
    }
    return Mt.bottom;
  }, q = (m) => O() === Mt.bottom ? X(m) : S(m), ie = () => {
    const m = Ie(l);
    if (m)
      return c.autoPosition ? q(m) : X(m);
  }, fe = function(m) {
    if (m) {
      const K = m.scrollHeight > m.clientHeight, ne = window.getComputedStyle(m).overflowY.indexOf("hidden") !== -1;
      return K && !ne;
    }
    return true;
  }, C = function(m) {
    return !m || m === document.body || m.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : fe(m) ? m : C(
      m.assignedSlot && v.value.shadowDom ? m.assignedSlot.parentNode : m.parentNode
    );
  }, P = (m) => {
    if (m)
      switch (c.position) {
        case Ct.left:
          return { left: 0, transform: "translateX(0)" };
        case Ct.right:
          return { left: `${m.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${m.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: b,
    menuStyle: I,
    xCorrect: y,
    setMenuPosition: te,
    getScrollableParent: C,
    shadowRender: (m, K) => {
      var u, h2, N;
      const $ = document.createElement("div"), ne = (u = Ie(l)) == null ? void 0 : u.getBoundingClientRect();
      $.setAttribute("id", "dp--temp-container");
      const de = (h2 = a.value) != null && h2.clientWidth ? a.value : document.body;
      de.append($);
      const d = P(ne), p = v.value.shadowDom ? Object.keys(k).filter(
        (s) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(s)
      ) : Object.keys(k), z = h(
        m,
        {
          ...K,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...d }
        },
        Object.fromEntries(p.map((s) => [s, k[s]]))
      );
      render(z, $), L.value = (N = z.el) == null ? void 0 : N.getBoundingClientRect(), render(null, $), de.removeChild($);
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
  const { defaultedRange: a, defaultedTz: n } = Ce(e), i = G(qe(G(), n.value.timezone)), c = ref([{ month: getMonth(i), year: getYear(i) }]), k = (b) => {
    const R = {
      hours: getHours(i),
      minutes: getMinutes(i),
      seconds: 0
    };
    return a.value.enabled ? [R[b], R[b]] : R[b];
  }, v = reactive({
    hours: k("hours"),
    minutes: k("minutes"),
    seconds: k("seconds")
  });
  watch(
    a,
    (b, R) => {
      b.enabled !== R.enabled && (v.hours = k("hours"), v.minutes = k("minutes"), v.seconds = k("seconds"));
    },
    { deep: true }
  );
  const L = computed({
    get: () => e.internalModelValue,
    set: (b) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", b);
    }
  }), y = computed(
    () => (b) => c.value[b] ? c.value[b].month : 0
  ), I = computed(
    () => (b) => c.value[b] ? c.value[b].year : 0
  );
  return watch(
    L,
    (b, R) => {
      l && JSON.stringify(b ?? {}) !== JSON.stringify(R ?? {}) && l();
    },
    { deep: true }
  ), {
    calendars: c,
    time: v,
    modelValue: L,
    month: y,
    year: I,
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
    propDates: k,
    defaultedRange: v
  } = Ce(t), { isDisabled: L } = kt(t), y = ref(null), I = ref(qe(/* @__PURE__ */ new Date(), c.value.timezone)), b = (u) => {
    !u.current && t.hideOffsetDates || (y.value = u.value);
  }, R = () => {
    y.value = null;
  }, H = (u) => Array.isArray(e.value) && v.value.enabled && e.value[0] && y.value ? u ? Be(y.value, e.value[0]) : Oe(y.value, e.value[0]) : true, E = (u, h2) => {
    const N = () => e.value ? h2 ? e.value[0] || null : e.value[1] : null, s = e.value && Array.isArray(e.value) ? N() : null;
    return Me(G(u.value), s);
  }, U = (u) => {
    const h2 = Array.isArray(e.value) ? e.value[0] : null;
    return u ? !Oe(y.value ?? null, h2) : true;
  }, f = (u, h2 = true) => (v.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !u.current ? false : Me(G(u.value), e.value[h2 ? 0 : 1]) : v.value.enabled ? E(u, h2) && U(h2) || Me(u.value, Array.isArray(e.value) ? e.value[0] : null) && H(h2) : false, B = (u, h2) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const N = Me(u.value, y.value);
      return h2 ? Be(e.value[0], u.value) && N : Oe(e.value[0], u.value) && N;
    }
    return false;
  }, T = (u) => !e.value || t.hideOffsetDates && !u.current ? false : v.value.enabled ? t.modelAuto && Array.isArray(e.value) ? Me(u.value, e.value[0] ? e.value[0] : I.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((h2) => Me(h2, u.value)) : Me(u.value, e.value ? e.value : I.value), Q = (u) => {
    if (v.value.autoRange || t.weekPicker) {
      if (y.value) {
        if (t.hideOffsetDates && !u.current) return false;
        const h2 = addDays(y.value, +v.value.autoRange), N = it(G(y.value), t.weekStart);
        return t.weekPicker ? Me(N[1], G(u.value)) : Me(h2, G(u.value));
      }
      return false;
    }
    return false;
  }, te = (u) => {
    if (v.value.autoRange || t.weekPicker) {
      if (y.value) {
        const h2 = addDays(y.value, +v.value.autoRange);
        if (t.hideOffsetDates && !u.current) return false;
        const N = it(G(y.value), t.weekStart);
        return t.weekPicker ? Be(u.value, N[0]) && Oe(u.value, N[1]) : Be(u.value, y.value) && Oe(u.value, h2);
      }
      return false;
    }
    return false;
  }, oe = (u) => {
    if (v.value.autoRange || t.weekPicker) {
      if (y.value) {
        if (t.hideOffsetDates && !u.current) return false;
        const h2 = it(G(y.value), t.weekStart);
        return t.weekPicker ? Me(h2[0], u.value) : Me(y.value, u.value);
      }
      return false;
    }
    return false;
  }, X = (u) => da(e.value, y.value, u.value), S = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, ae = () => t.modelAuto ? $n(t.internalModelValue) : true, O = (u) => {
    if (t.weekPicker) return false;
    const h2 = v.value.enabled ? !f(u) && !f(u, false) : true;
    return !L(u.value) && !T(u) && !(!u.current && t.hideOffsetDates) && h2;
  }, q = (u) => v.value.enabled ? t.modelAuto ? S() && T(u) : false : T(u), ie = (u) => i.value ? wl(u.value, k.value.highlight) : false, fe = (u) => {
    const h2 = L(u.value);
    return h2 && (typeof i.value == "function" ? !i.value(u.value, h2) : !i.value.options.highlightDisabled);
  }, C = (u) => {
    var h2;
    return typeof i.value == "function" ? i.value(u.value) : (h2 = i.value.weekdays) == null ? void 0 : h2.includes(u.value.getDay());
  }, P = (u) => (v.value.enabled || t.weekPicker) && (!(l.value.count > 0) || u.current) && ae() && !(!u.current && t.hideOffsetDates) && !T(u) ? X(u) : false, x = (u) => {
    const { isRangeStart: h2, isRangeEnd: N } = ne(u), s = v.value.enabled ? h2 || N : false;
    return {
      dp__cell_offset: !u.current,
      dp__pointer: !t.disabled && !(!u.current && t.hideOffsetDates) && !L(u.value),
      dp__cell_disabled: L(u.value),
      dp__cell_highlight: !fe(u) && (ie(u) || C(u)) && !q(u) && !s && !oe(u) && !(P(u) && t.weekPicker) && !N,
      dp__cell_highlight_active: !fe(u) && (ie(u) || C(u)) && q(u),
      dp__today: !t.noToday && Me(u.value, I.value) && u.current,
      "dp--past": Oe(u.value, I.value),
      "dp--future": Be(u.value, I.value)
    };
  }, m = (u) => ({
    dp__active_date: q(u),
    dp__date_hover: O(u)
  }), K = (u) => {
    if (e.value && !Array.isArray(e.value)) {
      const h2 = it(e.value, t.weekStart);
      return {
        ...d(u),
        dp__range_start: Me(h2[0], u.value),
        dp__range_end: Me(h2[1], u.value),
        dp__range_between_week: Be(u.value, h2[0]) && Oe(u.value, h2[1])
      };
    }
    return {
      ...d(u)
    };
  }, $ = (u) => {
    if (e.value && Array.isArray(e.value)) {
      const h2 = it(e.value[0], t.weekStart), N = e.value[1] ? it(e.value[1], t.weekStart) : [];
      return {
        ...d(u),
        dp__range_start: Me(h2[0], u.value) || Me(N[0], u.value),
        dp__range_end: Me(h2[1], u.value) || Me(N[1], u.value),
        dp__range_between_week: Be(u.value, h2[0]) && Oe(u.value, h2[1]) || Be(u.value, N[0]) && Oe(u.value, N[1]),
        dp__range_between: Be(u.value, h2[1]) && Oe(u.value, N[0])
      };
    }
    return {
      ...d(u)
    };
  }, ne = (u) => {
    const h2 = l.value.count > 0 ? u.current && f(u) && ae() : f(u) && ae(), N = l.value.count > 0 ? u.current && f(u, false) && ae() : f(u, false) && ae();
    return { isRangeStart: h2, isRangeEnd: N };
  }, de = (u) => {
    const { isRangeStart: h2, isRangeEnd: N } = ne(u);
    return {
      dp__range_start: h2,
      dp__range_end: N,
      dp__range_between: P(u),
      dp__date_hover: Me(u.value, y.value) && !h2 && !N && !t.weekPicker,
      dp__date_hover_start: B(u, true),
      dp__date_hover_end: B(u, false)
    };
  }, d = (u) => ({
    ...de(u),
    dp__cell_auto_range: te(u),
    dp__cell_auto_range_start: oe(u),
    dp__cell_auto_range_end: Q(u)
  }), p = (u) => v.value.enabled ? v.value.autoRange ? d(u) : t.modelAuto ? { ...m(u), ...de(u) } : t.weekPicker ? $(u) : de(u) : t.weekPicker ? K(u) : m(u);
  return {
    setHoverDate: b,
    clearHoverDate: R,
    getDayClassData: (u) => t.hideOffsetDates && !u.current ? {} : {
      ...x(u),
      ...p(u),
      [t.dayClass ? t.dayClass(u.value, t.internalModelValue) : ""]: true,
      ...n.value.calendarCell ?? {}
    }
  };
};
var kt = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: a, defaultedMultiDates: n } = Ce(e), i = (C) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(G(C)) : !!sa(C, a.value.disabledDates) : false, c = (C) => a.value.maxDate ? e.yearPicker ? getYear(C) > getYear(a.value.maxDate) : Be(C, a.value.maxDate) : false, k = (C) => a.value.minDate ? e.yearPicker ? getYear(C) < getYear(a.value.minDate) : Oe(C, a.value.minDate) : false, v = (C) => {
    const P = c(C), x = k(C), m = i(C), $ = t.value.months.map((z) => +z).includes(getMonth(C)), ne = e.disabledWeekDays.length ? e.disabledWeekDays.some((z) => +z === getDay(C)) : false, de = R(C), d = getYear(C), p = d < +e.yearRange[0] || d > +e.yearRange[1];
    return !(P || x || m || $ || p || ne || de);
  }, L = (C, P) => Oe(...pt(a.value.minDate, C, P)) || Me(...pt(a.value.minDate, C, P)), y = (C, P) => Be(...pt(a.value.maxDate, C, P)) || Me(...pt(a.value.maxDate, C, P)), I = (C, P, x) => {
    let m = false;
    return a.value.maxDate && x && y(C, P) && (m = true), a.value.minDate && !x && L(C, P) && (m = true), m;
  }, b = (C, P, x, m) => {
    let K = false;
    return m ? a.value.minDate && a.value.maxDate ? K = I(C, P, x) : (a.value.minDate && L(C, P) || a.value.maxDate && y(C, P)) && (K = true) : K = true, K;
  }, R = (C) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !sa(C, a.value.allowedDates) : false, H = (C) => !v(C), E = (C) => l.value.noDisabledRange ? !eachDayOfInterval({ start: C[0], end: C[1] }).some((x) => H(x)) : true, U = (C) => {
    if (C) {
      const P = getYear(C);
      return P >= +e.yearRange[0] && P <= e.yearRange[1];
    }
    return true;
  }, f = (C, P) => !!(Array.isArray(C) && C[P] && (l.value.maxRange || l.value.minRange) && U(C[P])), B = (C, P, x = 0) => {
    if (f(P, x) && U(C)) {
      const m = differenceInCalendarDays(C, P[x]), K = Rn(P[x], C), $ = K.length === 1 ? 0 : K.filter((de) => H(de)).length, ne = Math.abs(m) - (l.value.minMaxRawRange ? 0 : $);
      if (l.value.minRange && l.value.maxRange)
        return ne >= +l.value.minRange && ne <= +l.value.maxRange;
      if (l.value.minRange) return ne >= +l.value.minRange;
      if (l.value.maxRange) return ne <= +l.value.maxRange;
    }
    return true;
  }, T = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, Q = (C) => Array.isArray(C) ? [C[0] ? Pa(C[0]) : null, C[1] ? Pa(C[1]) : null] : Pa(C), te = (C, P, x) => C.find(
    (m) => +m.hours === getHours(P) && m.minutes === "*" ? true : +m.minutes === getMinutes(P) && +m.hours === getHours(P)
  ) && x, oe = (C, P, x) => {
    const [m, K] = C, [$, ne] = P;
    return !te(m, $, x) && !te(K, ne, x) && x;
  }, X = (C, P) => {
    const x = Array.isArray(P) ? P : [P];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? oe(e.disabledTimes, x, C) : !x.some((m) => te(e.disabledTimes, m, C)) : C;
  }, S = (C, P) => {
    const x = Array.isArray(P) ? [St(P[0]), P[1] ? St(P[1]) : void 0] : St(P), m = !e.disabledTimes(x);
    return C && m;
  }, ae = (C, P) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? X(P, C) : S(P, C) : P, O = (C) => {
    let P = true;
    if (!C || T()) return true;
    const x = !a.value.minDate && !a.value.maxDate ? Q(C) : C;
    return (e.maxTime || a.value.maxDate) && (P = un(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ye(x),
      P
    )), (e.minTime || a.value.minDate) && (P = un(
      e.minTime,
      a.value.minDate,
      "min",
      Ye(x),
      P
    )), ae(C, P);
  }, q = (C) => {
    if (!e.monthPicker) return true;
    let P = true;
    const x = G(lt(C));
    if (a.value.minDate && a.value.maxDate) {
      const m = G(lt(a.value.minDate)), K = G(lt(a.value.maxDate));
      return Be(x, m) && Oe(x, K) || Me(x, m) || Me(x, K);
    }
    if (a.value.minDate) {
      const m = G(lt(a.value.minDate));
      P = Be(x, m) || Me(x, m);
    }
    if (a.value.maxDate) {
      const m = G(lt(a.value.maxDate));
      P = Oe(x, m) || Me(x, m);
    }
    return P;
  }, ie = computed(() => (C) => !e.enableTimePicker || e.ignoreTimeValidation ? true : O(C)), fe = computed(() => (C) => e.monthPicker ? Array.isArray(C) && (l.value.enabled || n.value.enabled) ? !C.filter((x) => !q(x)).length : q(C) : true);
  return {
    isDisabled: H,
    validateDate: v,
    validateMonthYearInRange: b,
    isDateRangeAllowed: E,
    checkMinMaxRange: B,
    isValidTime: O,
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
  }), i = computed(() => e.monthPicker || e.timePicker), c = (I) => {
    var b;
    if ((b = e.flow) != null && b.length) {
      if (!I && i.value) return y();
      n[I] = true, Object.keys(n).filter((R) => !n[R]).length || y();
    }
  }, k = () => {
    var I, b;
    (I = e.flow) != null && I.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), y()), ((b = e.flow) == null ? void 0 : b.length) === a.value && nextTick().then(() => v());
  }, v = () => {
    a.value = -1;
  }, L = (I, b, ...R) => {
    var H, E;
    e.flow[a.value] === I && l.value && ((E = (H = l.value)[b]) == null || E.call(H, ...R));
  }, y = (I = 0) => {
    I && (a.value += I), L(He.month, "toggleMonthPicker", true), L(He.year, "toggleYearPicker", true), L(He.calendar, "toggleTimePicker", false, true), L(He.time, "toggleTimePicker", true, true);
    const b = e.flow[a.value];
    (b === He.hours || b === He.minutes || b === He.seconds) && L(b, "toggleTimePicker", true, true, b);
  };
  return { childMount: c, updateFlowStep: k, resetFlow: v, handleFlow: y, flowStep: a };
};
var oo = {
  key: 1,
  class: "dp__input_wrap"
};
var so = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-disabled", "aria-invalid"];
var uo = ["aria-label"];
var io = {
  key: 2,
  class: "dp__clear_icon"
};
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
      defaultedInline: k,
      defaultedConfig: v,
      defaultedRange: L,
      defaultedMultiDates: y,
      defaultedUI: I,
      getDefaultPattern: b,
      getDefaultStartTime: R
    } = Ce(n), { checkMinMaxRange: H } = kt(n), E = ref(), U = ref(null), f = ref(false), B = ref(false), T = ref(false), Q = ref(null), te = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !i.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !i.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: typeof n.state == "boolean" ? n.state : false,
        dp__input_invalid: typeof n.state == "boolean" ? !n.state : false,
        dp__input_focus: f.value || n.isMenuOpen,
        dp__input_reg: !i.value.enabled,
        ...I.value.input ?? {}
      })
    ), oe = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), E.value = null);
    }, X = (d) => {
      const p = R();
      return Ml(
        d,
        i.value.format ?? b(),
        p ?? Cn({}, n.enableSeconds),
        n.inputValue,
        T.value,
        n.formatLocale
      );
    }, S = (d) => {
      const { rangeSeparator: p } = i.value, [z, u] = d.split(`${p}`);
      if (z) {
        const h2 = X(z.trim()), N = u ? X(u.trim()) : null;
        if (isAfter(h2, N)) return;
        const s = h2 && N ? [h2, N] : [h2];
        H(N, s, 0) && (E.value = h2 ? s : null);
      }
    }, ae = () => {
      T.value = true;
    }, O = (d) => {
      if (L.value.enabled)
        S(d);
      else if (y.value.enabled) {
        const p = d.split(";");
        E.value = p.map((z) => X(z.trim())).filter((z) => z);
      } else
        E.value = X(d);
    }, q = (d) => {
      var z;
      const p = typeof d == "string" ? d : (z = d.target) == null ? void 0 : z.value;
      p !== "" ? (i.value.openMenu && !n.isMenuOpen && a("open"), O(p), a("set-input-date", E.value)) : oe(), T.value = false, a("update:input-value", p), a("text-input", d, E.value);
    }, ie = (d) => {
      i.value.enabled ? (O(d.target.value), i.value.enterSubmit && Fa(E.value) && n.inputValue !== "" ? (a("set-input-date", E.value, true), E.value = null) : i.value.enterSubmit && n.inputValue === "" && (E.value = null, a("clear"))) : P(d);
    }, fe = (d, p) => {
      var z;
      if (Q.value && p && !B.value)
        return d.preventDefault(), B.value = true, (z = Q.value) == null ? void 0 : z.focus();
      i.value.enabled && i.value.tabSubmit && O(d.target.value), i.value.tabSubmit && Fa(E.value) && n.inputValue !== "" ? (a("set-input-date", E.value, true, true), E.value = null) : i.value.tabSubmit && n.inputValue === "" && (E.value = null, a("clear", true));
    }, C = () => {
      f.value = true, a("focus"), nextTick().then(() => {
        var d;
        i.value.enabled && i.value.selectOnFocus && ((d = U.value) == null || d.select());
      });
    }, P = (d) => {
      if (d.preventDefault(), yt(d, v.value, true), i.value.enabled && i.value.openMenu && !k.value.input) {
        if (i.value.openMenu === "open" && !n.isMenuOpen) return a("open");
        if (i.value.openMenu === "toggle") return a("toggle");
      } else i.value.enabled || a("toggle");
    }, x = () => {
      a("real-blur"), f.value = false, (!n.isMenuOpen || k.value.enabled && k.value.input) && a("blur"), n.autoApply && i.value.enabled && E.value && !n.isMenuOpen && (a("set-input-date", E.value), a("select-date"), E.value = null);
    }, m = (d) => {
      yt(d, v.value, true), a("clear");
    }, K = (d, p) => {
      if (d.key === "Tab" && fe(d, p), d.key === "Enter" && ie(d), !i.value.enabled) {
        if (d.code === "Tab") return;
        d.preventDefault();
      }
    }, $ = () => {
      var d;
      (d = U.value) == null || d.focus({ preventScroll: true });
    }, ne = (d) => {
      E.value = d;
    }, de = (d) => {
      d.key === Pe.tab && (B.value = false, fe(d));
    };
    return t({
      focusInput: $,
      setParsedDate: ne
    }), (d, p) => {
      var z, u;
      return openBlock(), createElementBlock("div", { onClick: P }, [
        d.$slots.trigger && !d.$slots["dp-input"] && !unref(k).enabled ? renderSlot(d.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !d.$slots.trigger && (!unref(k).enabled || unref(k).input) ? (openBlock(), createElementBlock("div", oo, [
          d.$slots["dp-input"] && !d.$slots.trigger && (!unref(k).enabled || unref(k).enabled && unref(k).input) ? renderSlot(d.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: q,
            onEnter: ie,
            onTab: fe,
            onClear: m,
            onBlur: x,
            onKeypress: K,
            onPaste: ae,
            onFocus: C,
            openMenu: () => d.$emit("open"),
            closeMenu: () => d.$emit("close"),
            toggleMenu: () => d.$emit("toggle")
          }) : createCommentVNode("", true),
          d.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: d.uid ? `dp-input-${d.uid}` : void 0,
            ref_key: "inputRef",
            ref: U,
            "data-test": "dp-input",
            name: d.name,
            class: normalizeClass(te.value),
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
            onBlur: x,
            onFocus: C,
            onKeypress: K,
            onKeydown: p[0] || (p[0] = (h2) => K(h2, true)),
            onPaste: ae
          }, null, 42, so)),
          createBaseVNode("div", {
            "aria-label": (z = unref(c)) == null ? void 0 : z.clearInput,
            onClick: p[3] || (p[3] = (h2) => a("toggle"))
          }, [
            d.$slots["input-icon"] && !d.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: p[1] || (p[1] = (h2) => a("toggle"))
            }, [
              renderSlot(d.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !d.$slots["input-icon"] && !d.hideInputIcon && !d.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
              key: 1,
              "aria-label": (u = unref(c)) == null ? void 0 : u.calendarIcon,
              class: "dp__input_icon dp__input_icons",
              onClick: p[2] || (p[2] = (h2) => a("toggle"))
            }, null, 8, ["aria-label"])) : createCommentVNode("", true)
          ], 8, uo),
          d.$slots["clear-icon"] && e.inputValue && d.clearable && !d.disabled && !d.readonly ? (openBlock(), createElementBlock("span", io, [
            renderSlot(d.$slots, "clear-icon", { clear: m })
          ])) : createCommentVNode("", true),
          d.clearable && !d.$slots["clear-icon"] && e.inputValue && !d.disabled && !d.readonly ? (openBlock(), createElementBlock("button", {
            key: 3,
            ref_key: "clearBtnRef",
            ref: Q,
            class: "dp--clear-btn",
            type: "button",
            onBlur: p[4] || (p[4] = (h2) => B.value = false),
            onKeydown: p[5] || (p[5] = (h2) => unref(Ke)(h2, () => m(h2), true, de)),
            onClick: p[6] || (p[6] = withModifiers((h2) => m(h2), ["prevent"]))
          }, [
            createVNode(unref(Dn), {
              class: "dp__input_icons",
              "data-test": "clear-icon"
            })
          ], 544)) : createCommentVNode("", true)
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
    (k) => {
      n(), k && (k.addEventListener(t, l, a), n = () => {
        k.removeEventListener(t, l, a), n = Ya;
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
  return n ? mo(n, i, (k) => {
    const v = Ie(e), L = Ie(t);
    !v || !L || v === k.target || k.composedPath().includes(v) || k.composedPath().includes(L) || l(k);
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
    const a = l, n = e, i = useSlots(), c = ref(false), k = toRef(n, "modelValue"), v = toRef(n, "timezone"), L = ref(null), y = ref(null), I = ref(null), b = ref(false), R = ref(null), H = ref(false), E = ref(false), U = ref(false), f = ref(false), { setMenuFocused: B, setShiftKey: T } = In(), { clearArrowNav: Q } = bt(), { validateDate: te, isValidTime: oe } = kt(n), {
      defaultedTransitions: X,
      defaultedTextInput: S,
      defaultedInline: ae,
      defaultedConfig: O,
      defaultedRange: q,
      defaultedMultiDates: ie
    } = Ce(n), { menuTransition: fe, showTransition: C } = Xt(X);
    onMounted(() => {
      u(n.modelValue), nextTick().then(() => {
        if (!ae.value.enabled) {
          const g = de(R.value);
          g == null || g.addEventListener("scroll", _), window == null || window.addEventListener("resize", V);
        }
      }), ae.value.enabled && (c.value = true), window == null || window.addEventListener("keyup", se), window == null || window.addEventListener("keydown", D);
    }), onUnmounted(() => {
      if (!ae.value.enabled) {
        const g = de(R.value);
        g == null || g.removeEventListener("scroll", _), window == null || window.removeEventListener("resize", V);
      }
      window == null || window.removeEventListener("keyup", se), window == null || window.removeEventListener("keydown", D);
    });
    const P = Je(i, "all", n.presetDates), x = Je(i, "input");
    watch(
      [k, v],
      () => {
        u(k.value);
      },
      { deep: true }
    );
    const { openOnTop: m, menuStyle: K, xCorrect: $, setMenuPosition: ne, getScrollableParent: de, shadowRender: d } = to({
      menuRef: L,
      menuRefInner: y,
      inputRef: I,
      pickerWrapperRef: R,
      inline: ae,
      emit: a,
      props: n,
      slots: i
    }), {
      inputValue: p,
      internalModelValue: z,
      parseExternalModelValue: u,
      emitModelValue: h2,
      formatInputValue: N,
      checkBeforeEmit: s
    } = Gl(a, n, b), le = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: ae.value.enabled,
        "dp--flex-display-collapsed": U.value,
        dp__flex_display_with_input: ae.value.input
      })
    ), pe = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), M = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || ae.value.enabled
    } : {}), ge = computed(() => ({ class: "dp__outer_menu_wrap" })), r = computed(() => ae.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), Y = () => {
      var g, W;
      return (W = (g = I.value) == null ? void 0 : g.$el) == null ? void 0 : W.getBoundingClientRect();
    }, _ = () => {
      c.value && (O.value.closeOnScroll ? Xe() : ne());
    }, V = () => {
      var W;
      c.value && ne();
      const g = (W = y.value) == null ? void 0 : W.$el.getBoundingClientRect().width;
      U.value = document.body.offsetWidth <= g;
    }, se = (g) => {
      g.key === "Tab" && !ae.value.enabled && !n.teleport && O.value.tabOutClosesMenu && (R.value.contains(document.activeElement) || Xe()), E.value = g.shiftKey;
    }, D = (g) => {
      E.value = g.shiftKey;
    }, F = () => {
      !n.disabled && !n.readonly && (d(vn, n), ne(false), c.value = true, c.value && a("open"), c.value || Ft(), u(n.modelValue));
    }, ce = () => {
      var g;
      p.value = "", Ft(), (g = I.value) == null || g.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), O.value.closeOnClearValue && Xe();
    }, he = () => {
      const g = z.value;
      return !g || !Array.isArray(g) && te(g) ? true : Array.isArray(g) ? ie.value.enabled || g.length === 2 && te(g[0]) && te(g[1]) ? true : q.value.partialRange && !n.timePicker ? te(g[0]) : false : false;
    }, et = () => {
      s() && he() ? (h2(), Xe()) : a("invalid-select", z.value);
    }, ve = (g) => {
      vt(), h2(), O.value.closeOnAutoApply && !g && Xe();
    }, vt = () => {
      I.value && S.value.enabled && I.value.setParsedDate(z.value);
    }, ot = (g = false) => {
      n.autoApply && oe(z.value) && he() && (q.value.enabled && Array.isArray(z.value) ? (q.value.partialRange || z.value.length === 2) && ve(g) : ve(g));
    }, Ft = () => {
      S.value.enabled || (z.value = null);
    }, Xe = () => {
      ae.value.enabled || (c.value && (c.value = false, $.value = false, B(false), T(false), Q(), a("closed"), p.value && u(k.value)), Ft(), a("blur"));
    }, Lt = (g, W, re = false) => {
      if (!g) {
        z.value = null;
        return;
      }
      const Ae = Array.isArray(g) ? !g.some((wt) => !te(wt)) : te(g), Fe = oe(g);
      Ae && Fe && (f.value = true, z.value = g, W && (H.value = re, et(), a("text-submit")), nextTick().then(() => {
        f.value = false;
      }));
    }, pa = () => {
      n.autoApply && oe(z.value) && h2(), vt();
    }, Zt = () => c.value ? Xe() : F(), ya = (g) => {
      z.value = g;
    }, ga = () => {
      S.value.enabled && (b.value = true, N()), a("focus");
    }, ha = () => {
      if (S.value.enabled && (b.value = false, u(n.modelValue), H.value)) {
        const g = kl(R.value, E.value);
        g == null || g.focus();
      }
      a("blur");
    }, ba = (g) => {
      y.value && y.value.updateMonthYear(0, {
        month: rn(g.month),
        year: rn(g.year)
      });
    }, ka = (g) => {
      u(g ?? n.modelValue);
    }, wa = (g, W) => {
      var re;
      (re = y.value) == null || re.switchView(g, W);
    }, Za = (g) => O.value.onClickOutside ? O.value.onClickOutside(g) : Xe(), w = (g = 0) => {
      var W;
      (W = y.value) == null || W.handleFlow(g);
    };
    return po(L, I, () => Za(he)), t({
      closeMenu: Xe,
      selectDate: et,
      clearValue: ce,
      openMenu: F,
      onScroll: _,
      formatInputValue: N,
      // exposed for testing purposes
      updateInternalModelValue: ya,
      // modify internal modelValue
      setMonthYear: ba,
      parseModel: ka,
      switchView: wa,
      toggleMenu: Zt,
      handleFlow: w,
      dpWrapMenuRef: L
    }), (g, W) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: R,
      class: normalizeClass(le.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(co, mergeProps({
        ref_key: "inputRef",
        ref: I,
        "input-value": unref(p),
        "onUpdate:inputValue": W[0] || (W[0] = (re) => isRef(p) ? p.value = re : null),
        "is-menu-open": c.value
      }, g.$props, {
        onClear: ce,
        onOpen: F,
        onSetInputDate: Lt,
        onSetEmptyDate: unref(h2),
        onSelectDate: et,
        onToggle: Zt,
        onClose: Xe,
        onFocus: ga,
        onBlur: ha,
        onRealBlur: W[1] || (W[1] = (re) => b.value = false),
        onTextInput: W[2] || (W[2] = (re) => g.$emit("text-input", re))
      }), createSlots({ _: 2 }, [
        renderList(unref(x), (re, Ae) => ({
          name: re,
          fn: withCtx((Fe) => [
            renderSlot(g.$slots, re, normalizeProps(guardReactiveProps(Fe)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(g.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(M.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(fe)(unref(m)),
            css: unref(C) && !unref(ae).enabled
          }, {
            default: withCtx(() => [
              c.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: L
              }, ge.value, {
                class: { "dp--menu-wrapper": !unref(ae).enabled },
                style: unref(ae).enabled ? void 0 : unref(K)
              }), [
                createVNode(vn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: y
                }, g.$props, {
                  "internal-model-value": unref(z),
                  "onUpdate:internalModelValue": W[3] || (W[3] = (re) => isRef(z) ? z.value = re : null),
                  class: { [pe.value]: true, "dp--menu-wrapper": g.teleport },
                  "open-on-top": unref(m),
                  "no-overlay-focus": r.value,
                  collapse: U.value,
                  "get-input-rect": Y,
                  "is-text-input-date": f.value,
                  onClosePicker: Xe,
                  onSelectDate: et,
                  onAutoApply: ot,
                  onTimeUpdate: pa,
                  onFlowStep: W[4] || (W[4] = (re) => g.$emit("flow-step", re)),
                  onUpdateMonthYear: W[5] || (W[5] = (re) => g.$emit("update-month-year", re)),
                  onInvalidSelect: W[6] || (W[6] = (re) => g.$emit("invalid-select", unref(z))),
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
                  renderList(unref(P), (re, Ae) => ({
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
var Un = (() => {
  const e = yo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var go = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Un
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(go).forEach(([e, t]) => {
  e !== "default" && (Un[e] = t);
});
export {
  Un as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
