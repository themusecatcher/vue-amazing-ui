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

// node_modules/.pnpm/@vuepic+vue-datepicker@8.8.1_vue@3.4.31_typescript@5.5.3_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Et() {
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
Et.compatConfig = {
  MODE: 3
};
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
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      createBaseVNode("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
wn.compatConfig = {
  MODE: 3
};
function La() {
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
La.compatConfig = {
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
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
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
Ha.compatConfig = {
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
      class: "dp__icon"
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
function Ua() {
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
Ua.compatConfig = {
  MODE: 3
};
var Xe = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var Wa = (e, t, l) => {
  const a = Na(e, t, l);
  return a || j();
};
var il = (e, t, l) => {
  const a = t.dateInTz ? Xe(new Date(e), t.dateInTz) : j(e);
  return l ? Ke(a, true) : a;
};
var Na = (e, t, l) => {
  if (!e) return null;
  const a = l ? Ke(j(e), true) : j(e);
  return t ? t.exactMatch ? il(e, t, l) : Xe(a, t.timezone) : a;
};
var dl = (e) => {
  if (!e) return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), a = new Date(t.toLocaleString("en-US", { timeZone: e })), n = a.getTimezoneOffset() / 60;
  return (+l - +a) / (1e3 * 60 * 60) - n;
};
var nt = ((e) => (e.month = "month", e.year = "year", e))(nt || {});
var Mt = ((e) => (e.top = "top", e.bottom = "bottom", e))(Mt || {});
var Tt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Tt || {});
var He = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
var cl = ["timestamp", "date", "iso"];
var je = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(je || {});
var Re = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Re || {});
function nn(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function fl(e) {
  return (t) => format(Xe(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var vl = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(fl(e));
    } catch {
      n = a.map(nn(t));
    }
  else
    n = a.map(nn(t));
  const c = n.slice(0, l), v = n.slice(l + 1, n.length);
  return [n[l]].concat(...v).concat(...c);
};
var ja = (e, t, l) => {
  const a = [];
  for (let n = +e[0]; n <= +e[1]; n++)
    a.push({ value: +n, text: An(n, t) });
  return l ? a.reverse() : a;
};
var Dn = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => {
    const v = c < 10 ? `0${c}` : c;
    return /* @__PURE__ */ new Date(`2017-${v}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const c = l === "long" ? "LLLL" : "LLL";
      return a.map((v, b) => {
        const i = format(Xe(v, "UTC"), c, { locale: e });
        return {
          text: i.charAt(0).toUpperCase() + i.substring(1),
          value: b
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return a.map((c, v) => {
    const b = n.format(c);
    return {
      text: b.charAt(0).toUpperCase() + b.substring(1),
      value: v
    };
  });
};
var ml = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var gl = (e) => ({ type: "dot", ...e ?? {} });
var Mn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ka = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ye = (e) => e;
var ln = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var rn = (e) => e === null;
var $n = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var yl = (e) => {
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
  const c = +l, v = +t;
  return a && n ? +e > c || +e < v : a ? +e > c : n ? +e < v : false;
};
var Yt = (e, t) => yl(e).map((l) => l.map((a) => {
  const { active: n, disabled: c, isBetween: v, highlighted: b } = t(a);
  return {
    ...a,
    active: n,
    disabled: c,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: c,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: c && n,
      dp__cell_in_between: v,
      "dp--highlighted": b
    }
  };
}));
var yt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var pl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function hl(e, t) {
  let l = [...document.querySelectorAll(pl())];
  l = l.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = l.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= l.length))
    return l[a + (t ? -1 : 1)];
}
var bl = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var An = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Ga = (e) => format(e, "dd-MM-yyyy");
var $a = (e) => Array.isArray(e);
var sa = (e, t) => t.get(Ga(e));
var kl = (e, t) => e ? t ? t instanceof Map ? !!sa(e, t) : t(j(e)) : false : true;
var qe = (e, t, l = false) => {
  if (e.key === Re.enter || e.key === Re.space)
    return l && e.preventDefault(), t();
};
var on = (e, t, l, a, n, c) => {
  const v = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: c });
  return isValid(v) && isDate(v) ? a || n ? v : set(v, {
    hours: +l.hours,
    minutes: +(l == null ? void 0 : l.minutes),
    seconds: +(l == null ? void 0 : l.seconds),
    milliseconds: 0
  }) : null;
};
var wl = (e, t, l, a, n, c) => {
  const v = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return on(e, t, v, a, n, c);
  if (Array.isArray(t)) {
    let b = null;
    for (const i of t)
      if (b = on(e, i, v, a, n, c), b)
        break;
    return b;
  }
  return typeof t == "function" ? t(e) : null;
};
var j = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var Dl = (e, t, l) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), c = e.getDate().toString().padStart(2, "0"), v = e.getHours().toString().padStart(2, "0"), b = e.getMinutes().toString().padStart(2, "0"), i = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${c}T${v}:${b}:${i}.000Z`;
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
var Ke = (e, t) => {
  const l = j(JSON.parse(JSON.stringify(e))), a = set(l, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(a) : a;
};
var pt = (e, t, l, a) => {
  let n = e ? j(e) : j();
  return (t || t === 0) && (n = setHours(n, +t)), (l || l === 0) && (n = setMinutes(n, +l)), (a || a === 0) && (n = setSeconds(n, +a)), setMilliseconds(n, 0);
};
var _e = (e, t) => !e || !t ? false : isBefore(Ke(e), Ke(t));
var De = (e, t) => !e || !t ? false : isEqual(Ke(e), Ke(t));
var Be = (e, t) => !e || !t ? false : isAfter(Ke(e), Ke(t));
var da = (e, t, l) => e != null && e[0] && (e != null && e[1]) ? Be(l, e[0]) && _e(l, e[1]) : e != null && e[0] && t ? Be(l, e[0]) && _e(l, t) || _e(l, e[0]) && Be(l, t) : false;
var lt = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Ke(t);
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
var Tn = (e, t) => {
  if (t) {
    const l = getYear(j(t));
    if (l > e) return 12;
    if (l === e) return getMonth(j(t));
  }
};
var Sn = (e, t) => {
  if (t) {
    const l = getYear(j(t));
    return l < e ? -1 : l === e ? getMonth(j(t)) : void 0;
  }
};
var It = (e) => {
  if (e) return getYear(j(e));
};
var Pn = (e, t) => {
  const l = Be(e, t) ? t : e, a = Be(t, e) ? t : e;
  return eachDayOfInterval({ start: l, end: a });
};
var Ml = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var it = (e, t) => {
  const l = startOfWeek(e, { weekStartsOn: +t }), a = endOfWeek(e, { weekStartsOn: +t });
  return [l, a];
};
var Rn = (e, t) => {
  const l = {
    hours: getHours(j()),
    minutes: getMinutes(j()),
    seconds: t ? getSeconds(j()) : 0
  };
  return Object.assign(l, e);
};
var gt = (e, t, l) => [set(j(e), { date: 1 }), set(j(), { month: t, year: l, date: 1 })];
var dt = (e, t, l) => {
  let a = e ? j(e) : j();
  return (t || t === 0) && (a = setMonth(a, t)), l && (a = setYear(a, l)), a;
};
var Cn = (e, t, l, a, n) => {
  if (!a || n && !t || !n && !l) return false;
  const c = n ? addMonths(e, 1) : subMonths(e, 1), v = [getMonth(c), getYear(c)];
  return n ? !Al(...v, t) : !$l(...v, l);
};
var $l = (e, t, l) => _e(...gt(l, e, t)) || De(...gt(l, e, t));
var Al = (e, t, l) => Be(...gt(l, e, t)) || De(...gt(l, e, t));
var _n = (e, t, l, a, n, c, v) => {
  if (typeof t == "function" && !v) return t(e);
  const b = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], c, b)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], c, b) : ""}` : format(e, c, b);
};
var Rt = (e) => {
  if (e) return null;
  throw new Error(Ka.prop("partial-range"));
};
var ta = (e, t) => {
  if (t) return e();
  throw new Error(Ka.prop("range"));
};
var Ea = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Tl = (e, t) => set(t ?? j(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Ta = (e, t, l, a) => {
  if (!e) return true;
  if (a) {
    const n = l === "max" ? isBefore(e, t) : isAfter(e, t), c = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e, c), set(t, c));
  }
  return l === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Sa = (e, t, l) => e ? Tl(e, t) : j(l ?? t);
var sn = (e, t, l, a, n) => {
  if (Array.isArray(a)) {
    const v = Sa(e, a[0], t), b = Sa(e, a[1], t);
    return Ta(a[0], v, l, !!t) && Ta(a[1], b, l, !!t) && n;
  }
  const c = Sa(e, a, t);
  return Ta(a, c, l, !!t) && n;
};
var Pa = (e) => set(j(), St(e));
var Sl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(j(l)) === t).map((l) => getMonth(l)) : [];
var On = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((a) => a.month === t && a.year === l);
var Qa = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Bn = (e) => format(e, "yyyy-MM-dd");
var Ht = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Yn = () => {
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
var _a = ref(false);
var Oa = ref(false);
var ze = ref(0);
var Oe = ref(0);
var bt = () => {
  const e = computed(() => aa.value ? [...Se.selectionGrid, Se.actionRow].filter((y) => y.length) : Ca.value ? [
    ...Se.timePicker[0],
    ...Se.timePicker[1],
    Oa.value ? [] : [Ra.value],
    Se.actionRow
  ].filter((y) => y.length) : _a.value ? [...Se.monthPicker, Se.actionRow] : [Se.monthYear, ...Se.calendar, Se.time, Se.actionRow].filter((y) => y.length)), t = (y) => {
    ze.value = y ? ze.value + 1 : ze.value - 1;
    let F = null;
    e.value[Oe.value] && (F = e.value[Oe.value][ze.value]), !F && e.value[Oe.value + (y ? 1 : -1)] ? (Oe.value = Oe.value + (y ? 1 : -1), ze.value = y ? 0 : e.value[Oe.value].length - 1) : F || (ze.value = y ? ze.value - 1 : ze.value + 1);
  }, l = (y) => {
    if (Oe.value === 0 && !y || Oe.value === e.value.length && y) return;
    Oe.value = y ? Oe.value + 1 : Oe.value - 1, e.value[Oe.value] ? e.value[Oe.value] && !e.value[Oe.value][ze.value] && ze.value !== 0 && (ze.value = e.value[Oe.value].length - 1) : Oe.value = y ? Oe.value - 1 : Oe.value + 1;
  }, a = (y) => {
    let F = null;
    e.value[Oe.value] && (F = e.value[Oe.value][ze.value]), F ? F.focus({ preventScroll: !aa.value }) : ze.value = y ? ze.value - 1 : ze.value + 1;
  }, n = () => {
    t(true), a(true);
  }, c = () => {
    t(false), a(false);
  }, v = () => {
    l(false), a(true);
  }, b = () => {
    l(true), a(true);
  }, i = (y, F) => {
    Se[F] = y;
  }, L = (y, F) => {
    Se[F] = y;
  }, m = () => {
    ze.value = 0, Oe.value = 0;
  };
  return {
    buildMatrix: i,
    buildMultiLevelMatrix: L,
    setTimePickerBackRef: (y) => {
      Ra.value = y;
    },
    setSelectionGrid: (y) => {
      aa.value = y, m(), y || (Se.selectionGrid = []);
    },
    setTimePicker: (y, F = false) => {
      Ca.value = y, Oa.value = F, m(), y || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (y, F = 0) => {
      Se.timePicker[F] = y;
    },
    arrowRight: n,
    arrowLeft: c,
    arrowUp: v,
    arrowDown: b,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], aa.value = false, Ca.value = false, Oa.value = false, _a.value = false, m(), Ra.value = null;
    },
    setMonthPicker: (y) => {
      _a.value = y, m();
    },
    refSets: Se
    // exposed for testing
  };
};
var un = (e) => ({
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
var Pl = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  calendarWrap: "Calendar wrapper",
  calendarDays: "Calendar days",
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
  ...e ?? {}
});
var dn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Rl = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e) return { ...l, count: dn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, c = dn(n);
  return Object.assign(l, a, { count: c });
};
var Cl = (e, t, l) => e || (typeof l == "string" ? l : t);
var _l = (e) => typeof e == "boolean" ? e ? un({}) : false : un(e);
var Ol = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Bl = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Yl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Il = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Nl = (e) => ({ ...{
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
  timeArrowHoldThreshold: 0
}, ...e ?? {} });
var El = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((l) => j(l)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var Fl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Ll = (e, t) => {
  const l = {
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
  return typeof e == "object" ? { enabled: true, ...l, ...e } : {
    enabled: e,
    noDisabledRange: t.noDisabledRange,
    showLastInRange: t.showLastInRange,
    minMaxRawRange: t.minMaxRawRange,
    partialRange: t.partialRange,
    disableTimeRangeValidation: t.disableTimeRangeValidation,
    maxRange: t.maxRange,
    minRange: t.minRange,
    autoRange: t.autoRange,
    fixedStart: t.fixedStart,
    fixedEnd: t.fixedEnd
  };
};
var zl = (e, t) => e ? typeof e == "string" ? { timezone: e, exactMatch: false, dateInTz: void 0, emitTimezone: t, convertModel: true } : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: t ?? e.emitTimezone,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: t };
var Ba = (e, t, l) => new Map(
  e.map((a) => {
    const n = Wa(a, t, l);
    return [Ga(n), n];
  })
);
var Hl = (e, t) => e.length ? new Map(
  e.map((l) => {
    const a = Wa(l.date, t);
    return [Ga(a), l];
  })
) : null;
var Vl = (e) => {
  var t;
  return {
    minDate: Na(e.minDate, e.timezone, e.isSpecific),
    maxDate: Na(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: $a(e.disabledDates) ? Ba(e.disabledDates, e.timezone, e.isSpecific) : e.disabledDates,
    allowedDates: $a(e.allowedDates) ? Ba(e.allowedDates, e.timezone, e.isSpecific) : null,
    highlight: typeof e.highlight == "object" && $a((t = e.highlight) == null ? void 0 : t.dates) ? Ba(e.highlight.dates, e.timezone) : e.highlight,
    markers: Hl(e.markers, e.timezone)
  };
};
var Ul = (e, t) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: +t } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Wl = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((l) => {
      const a = l, n = e[a], c = typeof e[a] == "string" ? { [n]: true } : Object.fromEntries(n.map((v) => [v, true]));
      return [l, c];
    })
  )
});
var Ce = (e) => {
  const t = () => {
    const le = e.enableSeconds ? ":ss" : "", q = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${q}${le}` : `hh${q}${le} aa`;
  }, l = () => {
    var le;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((le = S.value) == null ? void 0 : le.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (le) => Rn(le, e.enableSeconds), n = () => J.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, c = computed(() => Rl(e.multiCalendars)), v = computed(() => n()), b = computed(() => Pl(e.ariaLabels)), i = computed(() => Bl(e.filters)), L = computed(() => _l(e.transitions)), m = computed(() => Yl(e.actionRow)), E = computed(
    () => Cl(e.previewFormat, e.format, l())
  ), k = computed(() => Ol(e.textInput)), _ = computed(() => Il(e.inline)), H = computed(() => Nl(e.config)), N = computed(() => El(e.highlight)), S = computed(() => Fl(e.weekNumbers)), y = computed(() => zl(e.timezone, e.emitTimezone)), F = computed(() => Ul(e.multiDates, e.multiDatesLimit)), P = computed(
    () => Vl({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: N.value,
      markers: e.markers,
      timezone: y.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), J = computed(
    () => Ll(e.range, {
      minMaxRawRange: false,
      maxRange: e.maxRange,
      minRange: e.minRange,
      noDisabledRange: e.noDisabledRange,
      showLastInRange: e.showLastInRange,
      partialRange: e.partialRange,
      disableTimeRangeValidation: e.disableTimeRangeValidation,
      autoRange: e.autoRange,
      fixedStart: e.fixedStart,
      fixedEnd: e.fixedEnd
    })
  ), Z = computed(() => Wl(e.ui));
  return {
    defaultedTransitions: L,
    defaultedMultiCalendars: c,
    defaultedStartTime: v,
    defaultedAriaLabels: b,
    defaultedFilters: i,
    defaultedActionRow: m,
    defaultedPreviewFormat: E,
    defaultedTextInput: k,
    defaultedInline: _,
    defaultedConfig: H,
    defaultedHighlight: N,
    defaultedWeekNumbers: S,
    defaultedRange: J,
    propDates: P,
    defaultedTz: y,
    defaultedMultiDates: F,
    defaultedUI: Z,
    getDefaultPattern: l,
    getDefaultStartTime: n
  };
};
var jl = (e, t, l) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: c, defaultedTz: v, defaultedMultiDates: b, getDefaultPattern: i } = Ce(t), L = ref(""), m = toRef(t, "format"), E = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, T(true));
    },
    { deep: true }
  ), watch(c, (s, oe) => {
    s.enabled !== oe.enabled && (a.value = null);
  }), watch(m, () => {
    z();
  });
  const k = (s) => v.value.timezone && v.value.convertModel ? Xe(s, v.value.timezone) : s, _ = (s) => {
    if (v.value.timezone && v.value.convertModel) {
      const oe = dl(v.value.timezone);
      return addHours(s, oe);
    }
    return s;
  }, H = (s, oe, M = false) => _n(
    s,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    oe ?? i(),
    M
  ), N = (s) => s ? t.modelType ? ee(s) : {
    hours: getHours(s),
    minutes: getMinutes(s),
    seconds: t.enableSeconds ? getSeconds(s) : 0
  } : null, S = (s) => t.modelType ? ee(s) : { month: getMonth(s), year: getYear(s) }, y = (s) => Array.isArray(s) ? b.value.enabled ? s.map((oe) => F(oe, setYear(j(), oe))) : ta(
    () => [
      setYear(j(), s[0]),
      s[1] ? setYear(j(), s[1]) : Rt(c.value.partialRange)
    ],
    c.value.enabled
  ) : setYear(j(), +s), F = (s, oe) => (typeof s == "string" || typeof s == "number") && t.modelType ? D(s) : oe, P = (s) => Array.isArray(s) ? [
    F(
      s[0],
      pt(null, +s[0].hours, +s[0].minutes, s[0].seconds)
    ),
    F(
      s[1],
      pt(null, +s[1].hours, +s[1].minutes, s[1].seconds)
    )
  ] : F(s, pt(null, s.hours, s.minutes, s.seconds)), J = (s) => {
    const oe = set(j(), { date: 1 });
    return Array.isArray(s) ? b.value.enabled ? s.map((M) => F(M, dt(oe, +M.month, +M.year))) : ta(
      () => [
        F(s[0], dt(oe, +s[0].month, +s[0].year)),
        F(
          s[1],
          s[1] ? dt(oe, +s[1].month, +s[1].year) : Rt(c.value.partialRange)
        )
      ],
      c.value.enabled
    ) : F(s, dt(oe, +s.month, +s.year));
  }, Z = (s) => {
    if (Array.isArray(s))
      return s.map((oe) => D(oe));
    throw new Error(Ka.dateArr("multi-dates"));
  }, le = (s) => {
    if (Array.isArray(s) && c.value.enabled) {
      const oe = s[0], M = s[1];
      return [
        j(Array.isArray(oe) ? oe[0] : null),
        j(Array.isArray(M) ? M[0] : null)
      ];
    }
    return j(s[0]);
  }, q = (s) => t.modelAuto ? Array.isArray(s) ? [D(s[0]), D(s[1])] : t.autoApply ? [D(s)] : [D(s), null] : Array.isArray(s) ? ta(
    () => s[1] ? [
      D(s[0]),
      s[1] ? D(s[1]) : Rt(c.value.partialRange)
    ] : [D(s[0])],
    c.value.enabled
  ) : D(s), R = () => {
    Array.isArray(a.value) && c.value.enabled && a.value.length === 1 && a.value.push(Rt(c.value.partialRange));
  }, re = () => {
    const s = a.value;
    return [
      ee(s[0]),
      s[1] ? ee(s[1]) : Rt(c.value.partialRange)
    ];
  }, B = () => a.value[1] ? re() : ee(Ye(a.value[0])), K = () => (a.value || []).map((s) => ee(s)), fe = (s = false) => (s || R(), t.modelAuto ? B() : b.value.enabled ? K() : Array.isArray(a.value) ? ta(() => re(), c.value.enabled) : ee(Ye(a.value))), ce = (s) => !s || Array.isArray(s) && !s.length ? null : t.timePicker ? P(Ye(s)) : t.monthPicker ? J(Ye(s)) : t.yearPicker ? y(Ye(s)) : b.value.enabled ? Z(Ye(s)) : t.weekPicker ? le(Ye(s)) : q(Ye(s)), O = (s) => {
    const oe = ce(s);
    Ea(Ye(oe)) ? (a.value = Ye(oe), z()) : (a.value = null, L.value = "");
  }, A = () => {
    const s = (oe) => format(oe, n.value.format);
    return `${s(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? s(a.value[1]) : ""}`;
  }, w = () => l.value && a.value ? Array.isArray(a.value) ? A() : format(a.value, n.value.format) : H(a.value), o = () => a.value ? b.value.enabled ? a.value.map((s) => H(s)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? w() : H(a.value) : "", z = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? L.value = o() : L.value = t.format(a.value);
  }, D = (s) => {
    if (t.utc) {
      const oe = new Date(s);
      return t.utc === "preserve" ? new Date(oe.getTime() + oe.getTimezoneOffset() * 6e4) : oe;
    }
    return t.modelType ? cl.includes(t.modelType) ? k(new Date(s)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? k(
      parse(s, i(), /* @__PURE__ */ new Date(), { locale: E.value })
    ) : k(
      parse(s, t.modelType, /* @__PURE__ */ new Date(), { locale: E.value })
    ) : k(new Date(s));
  }, ee = (s) => s ? t.utc ? Dl(s, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +_(s) : t.modelType === "iso" ? _(s).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? H(_(s)) : H(_(s), t.modelType, true) : _(s) : "", de = (s, oe = false, M = false) => {
    if (M) return s;
    if (e("update:model-value", s), v.value.emitTimezone && oe) {
      const me = Array.isArray(s) ? s.map((d) => Xe(Ye(d), v.value.emitTimezone)) : Xe(Ye(s), v.value.emitTimezone);
      e("update:model-timezone-value", me);
    }
  }, u = (s) => Array.isArray(a.value) ? b.value.enabled ? a.value.map((oe) => s(oe)) : [
    s(a.value[0]),
    a.value[1] ? s(a.value[1]) : Rt(c.value.partialRange)
  ] : s(Ye(a.value)), I = () => {
    if (Array.isArray(a.value)) {
      const s = it(a.value[0], t.weekStart), oe = a.value[1] ? it(a.value[1], t.weekStart) : [];
      return [s.map((M) => j(M)), oe.map((M) => j(M))];
    }
    return it(a.value, t.weekStart).map((s) => j(s));
  }, se = (s, oe) => de(Ye(u(s)), false, oe), f = (s) => {
    const oe = I();
    return s ? oe : e("update:model-value", I());
  }, T = (s = false) => (s || z(), t.monthPicker ? se(S, s) : t.timePicker ? se(N, s) : t.yearPicker ? se(getYear, s) : t.weekPicker ? f(s) : de(fe(s), true, s));
  return {
    inputValue: L,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? c.value.enabled ? c.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: O,
    formatInputValue: z,
    emitModelValue: T
  };
};
var Kl = (e, t) => {
  const { defaultedFilters: l, propDates: a } = Ce(e), { validateMonthYearInRange: n } = kt(e), c = (m, E) => {
    let k = m;
    return l.value.months.includes(getMonth(k)) ? (k = E ? addMonths(m, 1) : subMonths(m, 1), c(k, E)) : k;
  }, v = (m, E) => {
    let k = m;
    return l.value.years.includes(getYear(k)) ? (k = E ? addYears(m, 1) : subYears(m, 1), v(k, E)) : k;
  }, b = (m, E = false) => {
    const k = set(j(), { month: e.month, year: e.year });
    let _ = m ? addMonths(k, 1) : subMonths(k, 1);
    e.disableYearSelect && (_ = setYear(_, e.year));
    let H = getMonth(_), N = getYear(_);
    l.value.months.includes(H) && (_ = c(_, m), H = getMonth(_), N = getYear(_)), l.value.years.includes(N) && (_ = v(_, m), N = getYear(_)), n(H, N, m, e.preventMinMaxNavigation) && i(H, N, E);
  }, i = (m, E, k) => {
    t("update-month-year", { month: m, year: E, fromNav: k });
  }, L = computed(() => (m) => Cn(
    set(j(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    m
  ));
  return { handleMonthYearChange: b, isDisabled: L, updateMonthYear: i };
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
  emitTimezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: {
    type: Function,
    default: null
  },
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
  multiDates: { type: [Object, Boolean], default: false },
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
  range: { type: [Boolean, Object], default: false },
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
var Gl = ["title"];
var Ql = ["disabled"];
var ql = defineComponent({
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
      defaultedPreviewFormat: c,
      defaultedMultiCalendars: v,
      defaultedTextInput: b,
      defaultedInline: i,
      defaultedRange: L,
      defaultedMultiDates: m,
      getDefaultPattern: E
    } = Ce(a), { isTimeValid: k, isMonthValid: _ } = kt(a), { buildMatrix: H } = bt(), N = ref(null), S = ref(null), y = ref(false), F = ref({}), P = ref(null), J = ref(null);
    onMounted(() => {
      a.arrowNavigation && H([Ie(N), Ie(S)], "actionRow"), Z(), window.addEventListener("resize", Z);
    }), onUnmounted(() => {
      window.removeEventListener("resize", Z);
    });
    const Z = () => {
      y.value = false, setTimeout(() => {
        var o, z;
        const A = (o = P.value) == null ? void 0 : o.getBoundingClientRect(), w = (z = J.value) == null ? void 0 : z.getBoundingClientRect();
        A && w && (F.value.maxWidth = `${w.width - A.width - 20}px`), y.value = true;
      }, 0);
    }, le = computed(() => L.value.enabled && !L.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), q = computed(
      () => !k.value(a.internalModelValue) || !_.value(a.internalModelValue) || !le.value
    ), R = () => {
      const A = c.value;
      return a.timePicker || a.monthPicker, A(Ye(a.internalModelValue));
    }, re = () => {
      const A = a.internalModelValue;
      return v.value.count > 0 ? `${B(A[0])} - ${B(A[1])}` : [B(A[0]), B(A[1])];
    }, B = (A) => _n(
      A,
      c.value,
      a.formatLocale,
      b.value.rangeSeparator,
      a.modelAuto,
      E()
    ), K = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof c.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? re() : m.value.enabled ? a.internalModelValue.map((A) => `${B(A)}`) : a.modelAuto ? `${B(a.internalModelValue[0])}` : `${B(a.internalModelValue[0])} -` : B(a.internalModelValue) : R()), fe = () => m.value.enabled ? "; " : " - ", ce = computed(
      () => Array.isArray(K.value) ? K.value.join(fe()) : K.value
    ), O = () => {
      k.value(a.internalModelValue) && _.value(a.internalModelValue) && le.value ? l("select-date") : l("invalid-select");
    };
    return (A, w) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: J,
      class: "dp__action_row"
    }, [
      A.$slots["action-row"] ? renderSlot(A.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: A.internalModelValue,
        disabled: q.value,
        selectDate: () => A.$emit("select-date"),
        closePicker: () => A.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ce.value,
          style: normalizeStyle(F.value)
        }, [
          A.$slots["action-preview"] && y.value ? renderSlot(A.$slots, "action-preview", {
            key: 0,
            value: A.internalModelValue
          }) : createCommentVNode("", true),
          !A.$slots["action-preview"] && y.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ce.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, Gl)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: P,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          A.$slots["action-buttons"] ? renderSlot(A.$slots, "action-buttons", {
            key: 0,
            value: A.internalModelValue
          }) : createCommentVNode("", true),
          A.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(i).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: N,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: w[0] || (w[0] = (o) => A.$emit("close-picker")),
              onKeydown: w[1] || (w[1] = (o) => unref(qe)(o, () => A.$emit("close-picker")))
            }, toDisplayString(A.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: w[2] || (w[2] = (o) => A.$emit("select-now")),
              onKeydown: w[3] || (w[3] = (o) => unref(qe)(o, () => A.$emit("select-now")))
            }, toDisplayString(A.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: S,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: q.value,
              "data-test": "select-button",
              onKeydown: w[4] || (w[4] = (o) => unref(qe)(o, () => O())),
              onClick: O
            }, toDisplayString(A.selectText), 41, Ql)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var Xl = { class: "dp__selection_grid_header" };
var Jl = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var Zl = ["aria-label"];
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
    ariaLabels: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: l }) {
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: c } = bt(), v = l, b = e, { defaultedAriaLabels: i, defaultedTextInput: L, defaultedConfig: m } = Ce(
      b
    ), { hideNavigationButtons: E } = ma(), k = ref(false), _ = ref(null), H = ref(null), N = ref([]), S = ref(), y = ref(null), F = ref(0), P = ref(null);
    onBeforeUpdate(() => {
      _.value = null;
    }), onMounted(() => {
      nextTick().then(() => K()), b.noOverlayFocus || Z(), J(true);
    }), onUnmounted(() => J(false));
    const J = (u) => {
      var I;
      b.arrowNavigation && ((I = b.headerRefs) != null && I.length ? c(u) : a(u));
    }, Z = () => {
      var I;
      const u = Ie(H);
      u && (L.value.enabled || (_.value ? (I = _.value) == null || I.focus({ preventScroll: true }) : u.focus({ preventScroll: true })), k.value = u.clientHeight < u.scrollHeight);
    }, le = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !b.useRelative,
        "dp--overlay-relative": b.useRelative
      })
    ), q = computed(
      () => b.useRelative ? { height: `${b.height}px`, width: "260px" } : void 0
    ), R = computed(() => ({
      dp__overlay_col: true
    })), re = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: k.value,
        dp__button_bottom: b.isLast
      })
    ), B = computed(() => {
      var u, I;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((u = b.items) == null ? void 0 : u.length) <= 6,
        dp__container_block: ((I = b.items) == null ? void 0 : I.length) > 6
      };
    });
    watch(
      () => b.items,
      () => K(false),
      { deep: true }
    );
    const K = (u = true) => {
      nextTick().then(() => {
        const I = Ie(_), se = Ie(H), f = Ie(y), T = Ie(P), Q = f ? f.getBoundingClientRect().height : 0;
        se && (se.getBoundingClientRect().height ? F.value = se.getBoundingClientRect().height - Q : F.value = m.value.modeHeight - Q), I && T && u && (T.scrollTop = I.offsetTop - T.offsetTop - (F.value / 2 - I.getBoundingClientRect().height) - Q);
      });
    }, fe = (u) => {
      u.disabled || v("selected", u.value);
    }, ce = () => {
      v("toggle"), v("reset-flow");
    }, O = () => {
      b.escClose && ce();
    }, A = (u, I, se, f) => {
      u && ((I.active || I.value === b.focusValue) && (_.value = u), b.arrowNavigation && (Array.isArray(N.value[se]) ? N.value[se][f] = u : N.value[se] = [u], w()));
    }, w = () => {
      var I, se;
      const u = (I = b.headerRefs) != null && I.length ? [b.headerRefs].concat(N.value) : N.value.concat([b.skipButtonRef ? [] : [y.value]]);
      n(Ye(u), (se = b.headerRefs) != null && se.length ? "monthPicker" : "selectionGrid");
    }, o = (u) => {
      b.arrowNavigation || yt(u, m.value, true);
    }, z = (u) => {
      S.value = u, v("hover-value", u);
    }, D = () => {
      if (ce(), !b.isLast) {
        const u = bl(b.menuWrapRef ?? null, "action-row");
        if (u) {
          const I = $n(u);
          I == null || I.focus();
        }
      }
    }, ee = (u) => {
      switch (u.key) {
        case Re.esc:
          return O();
        case Re.arrowLeft:
          return o(u);
        case Re.arrowRight:
          return o(u);
        case Re.arrowUp:
          return o(u);
        case Re.arrowDown:
          return o(u);
        default:
          return;
      }
    }, de = (u) => {
      if (u.key === Re.enter) return ce();
      if (u.key === Re.tab) return D();
    };
    return t({ focusGrid: Z }), (u, I) => {
      var se;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: H,
        class: normalizeClass(le.value),
        style: normalizeStyle(q.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: ee,
        onClick: I[0] || (I[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: P,
          class: normalizeClass(B.value),
          role: "grid",
          style: normalizeStyle({ "--dp-overlay-height": `${F.value}px` })
        }, [
          createBaseVNode("div", Xl, [
            renderSlot(u.$slots, "header")
          ]),
          u.$slots.overlay ? renderSlot(u.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(u.items, (f, T) => (openBlock(), createElementBlock("div", {
            key: T,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: u.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(f, (Q, s) => (openBlock(), createElementBlock("div", {
              key: Q.value,
              ref_for: true,
              ref: (oe) => A(oe, Q, T, s),
              role: "gridcell",
              class: normalizeClass(R.value),
              "aria-selected": Q.active || void 0,
              "aria-disabled": Q.disabled || void 0,
              tabindex: "0",
              "data-test": Q.text,
              onClick: withModifiers((oe) => fe(Q), ["prevent"]),
              onKeydown: (oe) => unref(qe)(oe, () => fe(Q), true),
              onMouseover: (oe) => z(Q.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(Q.className)
              }, [
                u.$slots.item ? renderSlot(u.$slots, "item", {
                  key: 0,
                  item: Q
                }) : createCommentVNode("", true),
                u.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(Q.text), 1)
                ], 64))
              ], 2)
            ], 42, Jl))), 128))
          ], 2))), 128))
        ], 6),
        u.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: y,
          type: "button",
          "aria-label": (se = unref(i)) == null ? void 0 : se.toggleOverlay,
          class: normalizeClass(re.value),
          tabindex: "0",
          onClick: ce,
          onKeydown: de
        }, [
          renderSlot(u.$slots, "button-icon")
        ], 42, Zl)), [
          [vShow, !unref(E)(u.hideNavigation, u.type)]
        ]) : createCommentVNode("", true)
      ], 38);
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
    return (n, c) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0,
        "dp--flex-display-collapsed": n.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (v, b) => (openBlock(), createElementBlock("div", {
        key: v,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: v,
          index: b
        })
      ], 2))), 128))
    ], 2));
  }
});
var xl = ["aria-label", "aria-disabled"];
var Vt = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: t }) {
    const l = t, a = ref(null);
    return onMounted(() => l("set-ref", a)), (n, c) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: c[0] || (c[0] = (v) => n.$emit("activate")),
      onKeydown: c[1] || (c[1] = (v) => unref(qe)(v, () => n.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, xl));
  }
});
var er = { class: "dp--year-mode-picker" };
var tr = ["aria-label", "data-test"];
var In = defineComponent({
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
    const l = t, a = e, { showRightIcon: n, showLeftIcon: c } = ma(), { defaultedConfig: v, defaultedMultiCalendars: b, defaultedAriaLabels: i, defaultedTransitions: L, defaultedUI: m } = Ce(a), { showTransition: E, transitionName: k } = Xt(L), _ = (S = false, y) => {
      l("toggle-year-picker", { flow: S, show: y });
    }, H = (S) => {
      l("year-select", S);
    }, N = (S = false) => {
      l("handle-year", S);
    };
    return (S, y) => {
      var F, P, J, Z, le;
      return openBlock(), createElementBlock("div", er, [
        unref(c)(unref(b), e.instance) ? (openBlock(), createBlock(Vt, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (F = unref(i)) == null ? void 0 : F.prevYear,
          disabled: e.isDisabled(false),
          class: normalizeClass((P = unref(m)) == null ? void 0 : P.navBtnPrev),
          onActivate: y[0] || (y[0] = (q) => N(false))
        }, {
          default: withCtx(() => [
            S.$slots["arrow-left"] ? renderSlot(S.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            S.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (J = unref(i)) == null ? void 0 : J.openYearsOverlay,
          "data-test": `year-mode-btn-${e.instance}`,
          onClick: y[1] || (y[1] = () => _(false)),
          onKeydown: y[2] || (y[2] = withKeys(() => _(false), ["enter"]))
        }, [
          S.$slots.year ? renderSlot(S.$slots, "year", {
            key: 0,
            year: e.year
          }) : createCommentVNode("", true),
          S.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, tr),
        unref(n)(unref(b), e.instance) ? (openBlock(), createBlock(Vt, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (Z = unref(i)) == null ? void 0 : Z.nextYear,
          disabled: e.isDisabled(true),
          class: normalizeClass((le = unref(m)) == null ? void 0 : le.navBtnNext),
          onActivate: y[3] || (y[3] = (q) => N(true))
        }, {
          default: withCtx(() => [
            S.$slots["arrow-right"] ? renderSlot(S.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            S.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(k)(e.showYearPicker),
          css: unref(E)
        }, {
          default: withCtx(() => [
            e.showYearPicker ? (openBlock(), createBlock(qt, {
              key: 0,
              items: e.items,
              "text-input": S.textInput,
              "esc-close": S.escClose,
              config: S.config,
              "is-last": S.autoApply && !unref(v).keepActionRow,
              "hide-navigation": S.hideNavigation,
              "aria-labels": S.ariaLabels,
              type: "year",
              onToggle: _,
              onSelected: y[4] || (y[4] = (q) => H(q))
            }, createSlots({
              "button-icon": withCtx(() => [
                S.$slots["calendar-icon"] ? renderSlot(S.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                S.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
              ]),
              _: 2
            }, [
              S.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: q }) => [
                  renderSlot(S.$slots, "year-overlay-value", {
                    text: q.text,
                    value: q.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation", "aria-labels"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var qa = (e, t, l) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((a) => De(e, a))) {
      const a = t.value.filter((n) => !De(n, e));
      t.value = a.length ? a : null;
    } else (l && +l > t.value.length || !l) && t.value.push(e);
  else
    t.value = [e];
};
var Xa = (e, t, l) => {
  let a = e.value ? e.value.slice() : [];
  return a.length === 2 && a[1] !== null && (a = []), a.length ? _e(t, a[0]) ? (a.unshift(t), l("range-start", a[0]), l("range-start", a[1])) : (a[1] = t, l("range-end", t)) : (a = [t], l("range-start", t)), a;
};
var va = (e, t, l, a) => {
  e && (e[0] && e[1] && l && t("auto-apply"), e[0] && !e[1] && a && l && t("auto-apply"));
};
var Nn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => Xe(j(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = Xe(j(e.value), e.timezone));
};
var En = (e, t, l, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Be(e, t.value[0]) || De(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (_e(e, t.value[1]) || De(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var Fn = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: a,
  calendars: n,
  modelValue: c,
  props: v,
  filters: b,
  year: i,
  month: L,
  emit: m
}) => {
  const E = computed(() => ja(v.yearRange, v.locale, v.reverseYears)), k = ref([false]), _ = computed(() => (B, K) => {
    const fe = set(lt(/* @__PURE__ */ new Date()), {
      month: L.value(B),
      year: i.value(B)
    }), ce = K ? endOfYear(fe) : startOfYear(fe);
    return Cn(
      ce,
      a.value.maxDate,
      a.value.minDate,
      v.preventMinMaxNavigation,
      K
    );
  }), H = () => Array.isArray(c.value) && e.value.solo && c.value[1], N = () => {
    for (let B = 0; B < e.value.count; B++)
      if (B === 0)
        n.value[B] = n.value[0];
      else if (B === e.value.count - 1 && H())
        n.value[B] = {
          month: getMonth(c.value[1]),
          year: getYear(c.value[1])
        };
      else {
        const K = set(j(), n.value[B - 1]);
        n.value[B] = { month: getMonth(K), year: getYear(addYears(K, 1)) };
      }
  }, S = (B) => {
    if (!B) return N();
    const K = set(j(), n.value[B]);
    return n.value[0].year = getYear(subYears(K, e.value.count - 1)), N();
  }, y = (B, K) => {
    const fe = differenceInYears(K, B);
    return t.value.showLastInRange && fe > 1 ? K : B;
  }, F = (B) => v.focusStartDate || e.value.solo ? B[0] : B[1] ? y(B[0], B[1]) : B[0], P = () => {
    if (c.value) {
      const B = Array.isArray(c.value) ? F(c.value) : c.value;
      n.value[0] = { month: getMonth(B), year: getYear(B) };
    }
  }, J = () => {
    P(), e.value.count && N();
  };
  watch(c, (B, K) => {
    v.isTextInputDate && JSON.stringify(B ?? {}) !== JSON.stringify(K ?? {}) && J();
  }), onMounted(() => {
    J();
  });
  const Z = (B, K) => {
    n.value[K].year = B, m("update-month-year", { instance: K, year: B, month: n.value[K].month }), e.value.count && !e.value.solo && S(K);
  }, le = computed(() => (B) => Yt(E.value, (K) => {
    var A;
    const fe = i.value(B) === K.value, ce = Gt(
      K.value,
      It(a.value.minDate),
      It(a.value.maxDate)
    ) || ((A = b.value.years) == null ? void 0 : A.includes(i.value(B))), O = Qa(l.value, K.value);
    return { active: fe, disabled: ce, highlighted: O };
  })), q = (B, K) => {
    Z(B, K), re(K);
  }, R = (B, K = false) => {
    if (!_.value(B, K)) {
      const fe = K ? i.value(B) + 1 : i.value(B) - 1;
      Z(fe, B);
    }
  }, re = (B, K = false, fe) => {
    K || m("reset-flow"), fe !== void 0 ? k.value[B] = fe : k.value[B] = !k.value[B], k.value[B] ? m("overlay-toggle", { open: true, overlay: He.year }) : (m("overlay-closed"), m("overlay-toggle", { open: false, overlay: He.year }));
  };
  return {
    isDisabled: _,
    groupedYears: le,
    showYearPicker: k,
    selectYear: Z,
    toggleYearPicker: re,
    handleYearSelect: q,
    handleYear: R
  };
};
var ar = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: c,
    defaultedRange: v,
    defaultedHighlight: b,
    propDates: i,
    defaultedTz: L,
    defaultedFilters: m,
    defaultedMultiDates: E
  } = Ce(e), k = () => {
    e.isTextInputDate && J(getYear(j(e.startDate)), 0);
  }, { modelValue: _, year: H, month: N, calendars: S } = Jt(e, t, k), y = computed(() => Dn(e.formatLocale, e.locale, e.monthNameFormat)), F = ref(null), { checkMinMaxRange: P } = kt(e), {
    selectYear: J,
    groupedYears: Z,
    showYearPicker: le,
    toggleYearPicker: q,
    handleYearSelect: R,
    handleYear: re,
    isDisabled: B
  } = Fn({
    modelValue: _,
    multiCalendars: l,
    range: v,
    highlight: b,
    calendars: S,
    year: H,
    propDates: i,
    month: N,
    filters: m,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (_.value && e.focusStartDate || !_.value) && J(getYear(j(e.startDate)), 0);
  });
  const K = (T) => T ? { month: getMonth(T), year: getYear(T) } : { month: null, year: null }, fe = () => _.value ? Array.isArray(_.value) ? _.value.map((T) => K(T)) : K(_.value) : K(), ce = (T, Q) => {
    const s = S.value[T], oe = fe();
    return Array.isArray(oe) ? oe.some((M) => M.year === (s == null ? void 0 : s.year) && M.month === Q) : (s == null ? void 0 : s.year) === oe.year && Q === oe.month;
  }, O = (T, Q, s) => {
    var M, me;
    const oe = fe();
    return Array.isArray(oe) ? H.value(Q) === ((M = oe[s]) == null ? void 0 : M.year) && T === ((me = oe[s]) == null ? void 0 : me.month) : false;
  }, A = (T, Q) => {
    if (v.value.enabled) {
      const s = fe();
      if (Array.isArray(_.value) && Array.isArray(s)) {
        const oe = O(T, Q, 0) || O(T, Q, 1), M = dt(lt(j()), T, H.value(Q));
        return da(_.value, F.value, M) && !oe;
      }
      return false;
    }
    return false;
  }, w = computed(() => (T) => Yt(y.value, (Q) => {
    var d;
    const s = ce(T, Q.value), oe = Gt(
      Q.value,
      Tn(H.value(T), i.value.minDate),
      Sn(H.value(T), i.value.maxDate)
    ) || Sl(i.value.disabledDates, H.value(T)).includes(Q.value) || ((d = m.value.months) == null ? void 0 : d.includes(Q.value)), M = A(Q.value, T), me = On(b.value, Q.value, H.value(T));
    return { active: s, disabled: oe, isBetween: M, highlighted: me };
  })), o = (T, Q) => dt(lt(j()), T, H.value(Q)), z = (T, Q) => {
    const s = _.value ? _.value : lt(/* @__PURE__ */ new Date());
    _.value = dt(s, T, H.value(Q)), t("auto-apply"), t("update-flow-step");
  }, D = (T, Q) => {
    const s = o(T, Q);
    v.value.fixedEnd || v.value.fixedStart ? _.value = En(s, _, t, v) : _.value ? P(s, _.value) && (_.value = Xa(_, o(T, Q), t)) : _.value = [o(T, Q)], nextTick().then(() => {
      va(_.value, t, e.autoApply, e.modelAuto);
    });
  }, ee = (T, Q) => {
    qa(o(T, Q), _, E.value.limit), t("auto-apply", true);
  }, de = (T, Q) => (S.value[Q].month = T, I(Q, S.value[Q].year, T), E.value.enabled ? ee(T, Q) : v.value.enabled ? D(T, Q) : z(T, Q)), u = (T, Q) => {
    J(T, Q), I(Q, T, null);
  }, I = (T, Q, s) => {
    let oe = s;
    if (!oe && oe !== 0) {
      const M = fe();
      oe = Array.isArray(M) ? M[T].month : M.month;
    }
    t("update-month-year", { instance: T, year: Q, month: oe });
  };
  return {
    groupedMonths: w,
    groupedYears: Z,
    year: H,
    isDisabled: B,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: c,
    showYearPicker: le,
    modelValue: _,
    presetDate: (T, Q) => {
      Nn({
        value: T,
        modelValue: _,
        range: v.value.enabled,
        timezone: Q ? void 0 : L.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (T, Q) => {
      F.value = o(T, Q);
    },
    selectMonth: de,
    selectYear: u,
    toggleYearPicker: q,
    handleYearSelect: R,
    handleYear: re,
    getModelMonthYear: fe
  };
};
var nr = defineComponent({
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
    const a = l, n = useSlots(), c = Ze(n, "yearMode"), v = e;
    onMounted(() => {
      v.shadow || a("mount", null);
    });
    const {
      groupedMonths: b,
      groupedYears: i,
      year: L,
      isDisabled: m,
      defaultedMultiCalendars: E,
      defaultedConfig: k,
      showYearPicker: _,
      modelValue: H,
      presetDate: N,
      setHoverDate: S,
      selectMonth: y,
      selectYear: F,
      toggleYearPicker: P,
      handleYearSelect: J,
      handleYear: Z,
      getModelMonthYear: le
    } = ar(v, a);
    return t({ getSidebarProps: () => ({
      modelValue: H,
      year: L,
      getModelMonthYear: le,
      selectMonth: y,
      selectYear: F,
      handleYear: Z
    }), presetDate: N, toggleYearPicker: (R) => P(0, R) }), (R, re) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(E).count,
      collapse: R.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: B }) => [
        R.$slots["top-extra"] ? renderSlot(R.$slots, "top-extra", {
          key: 0,
          value: R.internalModelValue
        }) : createCommentVNode("", true),
        R.$slots["month-year"] ? renderSlot(R.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(L),
          months: unref(b)(B),
          years: unref(i)(B),
          selectMonth: unref(y),
          selectYear: unref(F),
          instance: B
        }))) : (openBlock(), createBlock(qt, {
          key: 2,
          items: unref(b)(B),
          "arrow-navigation": R.arrowNavigation,
          "is-last": R.autoApply && !unref(k).keepActionRow,
          "esc-close": R.escClose,
          height: unref(k).modeHeight,
          config: R.config,
          "no-overlay-focus": !!(R.noOverlayFocus || R.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (K) => unref(y)(K, B),
          onHoverValue: (K) => unref(S)(K, B)
        }, createSlots({
          header: withCtx(() => [
            createVNode(In, mergeProps(R.$props, {
              items: unref(i)(B),
              instance: B,
              "show-year-picker": unref(_)[B],
              year: unref(L)(B),
              "is-disabled": (K) => unref(m)(B, K),
              onHandleYear: (K) => unref(Z)(B, K),
              onYearSelect: (K) => unref(J)(K, B),
              onToggleYearPicker: (K) => unref(P)(B, K == null ? void 0 : K.flow, K == null ? void 0 : K.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(c), (K, fe) => ({
                name: K,
                fn: withCtx((ce) => [
                  renderSlot(R.$slots, K, normalizeProps(guardReactiveProps(ce)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          R.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: K }) => [
              renderSlot(R.$slots, "month-overlay-value", {
                text: K.text,
                value: K.value
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
var lr = (e, t) => {
  const l = () => {
    e.isTextInputDate && (m.value = getYear(j(e.startDate)));
  }, { modelValue: a } = Jt(e, t, l), n = ref(null), { defaultedHighlight: c, defaultedMultiDates: v, defaultedFilters: b, defaultedRange: i, propDates: L } = Ce(e), m = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (m.value = getYear(j(e.startDate)));
  });
  const E = (y) => Array.isArray(a.value) ? a.value.some((F) => getYear(F) === y) : a.value ? getYear(a.value) === y : false, k = (y) => i.value.enabled && Array.isArray(a.value) ? da(a.value, n.value, H(y)) : false, _ = computed(() => Yt(ja(e.yearRange, e.locale, e.reverseYears), (y) => {
    const F = E(y.value), P = Gt(
      y.value,
      It(L.value.minDate),
      It(L.value.maxDate)
    ) || b.value.years.includes(y.value), J = k(y.value) && !F, Z = Qa(c.value, y.value);
    return { active: F, disabled: P, isBetween: J, highlighted: Z };
  })), H = (y) => setYear(lt(startOfYear(/* @__PURE__ */ new Date())), y);
  return {
    groupedYears: _,
    modelValue: a,
    focusYear: m,
    setHoverValue: (y) => {
      n.value = setYear(lt(/* @__PURE__ */ new Date()), y);
    },
    selectYear: (y) => {
      var F;
      if (t("update-month-year", { instance: 0, year: y }), v.value.enabled)
        return a.value ? Array.isArray(a.value) && (((F = a.value) == null ? void 0 : F.map((J) => getYear(J))).includes(y) ? a.value = a.value.filter((J) => getYear(J) !== y) : a.value.push(setYear(Ke(j()), y))) : a.value = [setYear(Ke(startOfYear(j())), y)], t("auto-apply", true);
      i.value.enabled ? (a.value = Xa(a, H(y), t), nextTick().then(() => {
        va(a.value, t, e.autoApply, e.modelAuto);
      })) : (a.value = H(y), t("auto-apply"));
    }
  };
};
var rr = defineComponent({
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
    const a = l, n = e, { groupedYears: c, modelValue: v, focusYear: b, selectYear: i, setHoverValue: L } = lr(n, a), { defaultedConfig: m } = Ce(n);
    return t({ getSidebarProps: () => ({
      modelValue: v,
      selectYear: i
    }) }), (k, _) => (openBlock(), createElementBlock("div", null, [
      k.$slots["top-extra"] ? renderSlot(k.$slots, "top-extra", {
        key: 0,
        value: k.internalModelValue
      }) : createCommentVNode("", true),
      k.$slots["month-year"] ? renderSlot(k.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(c),
        selectYear: unref(i)
      }))) : (openBlock(), createBlock(qt, {
        key: 2,
        items: unref(c),
        "is-last": k.autoApply && !unref(m).keepActionRow,
        height: unref(m).modeHeight,
        config: k.config,
        "no-overlay-focus": !!(k.noOverlayFocus || k.textInput),
        "focus-value": unref(b),
        type: "year",
        "use-relative": "",
        onSelected: unref(i),
        onHoverValue: unref(L)
      }, createSlots({ _: 2 }, [
        k.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: H }) => [
            renderSlot(k.$slots, "year-overlay-value", {
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
var or = {
  key: 0,
  class: "dp__time_input"
};
var sr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var ur = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var ir = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var dr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var cr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var fr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var vr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var mr = { key: 0 };
var gr = ["aria-label"];
var yr = defineComponent({
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
    const a = l, n = e, { setTimePickerElements: c, setTimePickerBackRef: v } = bt(), { defaultedAriaLabels: b, defaultedTransitions: i, defaultedFilters: L, defaultedConfig: m, defaultedRange: E } = Ce(n), { transitionName: k, showTransition: _ } = Xt(i), H = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), N = ref("AM"), S = ref(null), y = ref([]), F = ref();
    onMounted(() => {
      a("mounted");
    });
    const P = (d) => set(/* @__PURE__ */ new Date(), {
      hours: d.hours,
      minutes: d.minutes,
      seconds: n.enableSeconds ? d.seconds : 0,
      milliseconds: 0
    }), J = computed(
      () => (d) => w(d, n[d]) || le(d, n[d])
    ), Z = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), le = (d, Y) => E.value.enabled && !E.value.disableTimeRangeValidation ? !n.validateTime(d, Y) : false, q = (d, Y) => {
      if (E.value.enabled && !E.value.disableTimeRangeValidation) {
        const W = Y ? +n[`${d}Increment`] : -+n[`${d}Increment`], C = n[d] + W;
        return !n.validateTime(d, C);
      }
      return false;
    }, R = computed(() => (d) => !de(+n[d] + +n[`${d}Increment`], d) || q(d, true)), re = computed(() => (d) => !de(+n[d] - +n[`${d}Increment`], d) || q(d, false)), B = (d, Y) => add(set(j(), d), Y), K = (d, Y) => sub(set(j(), d), Y), fe = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), ce = computed(() => {
      const d = [{ type: "hours" }];
      return n.enableMinutes && d.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && d.push({ type: "", separator: true }, {
        type: "seconds"
      }), d;
    }), O = computed(() => ce.value.filter((d) => !d.separator)), A = computed(() => (d) => {
      if (d === "hours") {
        const Y = Q(+n.hours);
        return { text: Y < 10 ? `0${Y}` : `${Y}`, value: Y };
      }
      return { text: n[d] < 10 ? `0${n[d]}` : `${n[d]}`, value: n[d] };
    }), w = (d, Y) => {
      var C;
      if (!n.disabledTimesConfig) return false;
      const W = n.disabledTimesConfig(n.order, d === "hours" ? Y : void 0);
      return W[d] ? !!((C = W[d]) != null && C.includes(Y)) : true;
    }, o = (d, Y) => Y !== "hours" || N.value === "AM" ? d : d + 12, z = (d) => {
      const Y = n.is24 ? 24 : 12, W = d === "hours" ? Y : 60, C = +n[`${d}GridIncrement`], te = d === "hours" && !n.is24 ? C : 0, ue = [];
      for (let p = te; p < W; p += C)
        ue.push({ value: n.is24 ? p : o(p, d), text: p < 10 ? `0${p}` : `${p}` });
      return d === "hours" && !n.is24 && ue.unshift({ value: N.value === "PM" ? 12 : 0, text: "12" }), Yt(ue, (p) => ({ active: false, disabled: L.value.times[d].includes(p.value) || !de(p.value, d) || w(d, p.value) || le(d, p.value) }));
    }, D = (d) => d >= 0 ? d : 59, ee = (d) => d >= 0 ? d : 23, de = (d, Y) => {
      const W = n.minTime ? P(Aa(n.minTime)) : null, C = n.maxTime ? P(Aa(n.maxTime)) : null, te = P(
        Aa(
          Z.value,
          Y,
          Y === "minutes" || Y === "seconds" ? D(d) : ee(d)
        )
      );
      return W && C ? (isBefore(te, C) || isEqual(te, C)) && (isAfter(te, W) || isEqual(te, W)) : W ? isAfter(te, W) || isEqual(te, W) : C ? isBefore(te, C) || isEqual(te, C) : true;
    }, u = (d) => n[`no${d[0].toUpperCase() + d.slice(1)}Overlay`], I = (d) => {
      u(d) || (H[d] = !H[d], H[d] ? a("overlay-opened", d) : a("overlay-closed", d));
    }, se = (d) => d === "hours" ? getHours : d === "minutes" ? getMinutes : getSeconds, f = () => {
      F.value && clearTimeout(F.value);
    }, T = (d, Y = true, W) => {
      const C = Y ? B : K, te = Y ? +n[`${d}Increment`] : -+n[`${d}Increment`];
      de(+n[d] + te, d) && a(
        `update:${d}`,
        se(d)(C({ [d]: +n[d] }, { [d]: +n[`${d}Increment`] }))
      ), !(W != null && W.keyboard) && m.value.timeArrowHoldThreshold && (F.value = setTimeout(() => {
        T(d, Y);
      }, m.value.timeArrowHoldThreshold));
    }, Q = (d) => n.is24 ? d : (d >= 12 ? N.value = "PM" : N.value = "AM", ml(d)), s = () => {
      N.value === "PM" ? (N.value = "AM", a("update:hours", n.hours - 12)) : (N.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", N.value);
    }, oe = (d) => {
      H[d] = true;
    }, M = (d, Y, W) => {
      if (d && n.arrowNavigation) {
        Array.isArray(y.value[Y]) ? y.value[Y][W] = d : y.value[Y] = [d];
        const C = y.value.reduce(
          (te, ue) => ue.map((p, V) => [...te[V] || [], ue[V]]),
          []
        );
        v(n.closeTimePickerBtn), S.value && (C[1] = C[1].concat(S.value)), c(C, n.order);
      }
    }, me = (d, Y) => (I(d), a(`update:${d}`, Y));
    return t({ openChildCmp: oe }), (d, Y) => {
      var W;
      return d.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", or, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(ce.value, (C, te) => {
          var ue, p, V;
          return openBlock(), createElementBlock("div", {
            key: te,
            class: normalizeClass(fe.value)
          }, [
            C.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (pe) => M(pe, te, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !d.timePickerInline,
                  dp__inc_dec_button_inline: d.timePickerInline,
                  dp__tp_inline_btn_top: d.timePickerInline,
                  dp__inc_dec_button_disabled: R.value(C.type)
                }),
                "data-test": `${C.type}-time-inc-btn-${n.order}`,
                "aria-label": (ue = unref(b)) == null ? void 0 : ue.incrementValue(C.type),
                tabindex: "0",
                onKeydown: (pe) => unref(qe)(pe, () => T(C.type, true, { keyboard: true }), true),
                onClick: (pe) => unref(m).timeArrowHoldThreshold ? void 0 : T(C.type, true),
                onMousedown: (pe) => unref(m).timeArrowHoldThreshold ? T(C.type, true) : void 0,
                onMouseup: f
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  d.$slots["tp-inline-arrow-up"] ? renderSlot(d.$slots, "tp-inline-arrow-up", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    ur,
                    ir
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  d.$slots["arrow-up"] ? renderSlot(d.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, sr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (pe) => M(pe, te, 1),
                type: "button",
                "aria-label": (p = unref(b)) == null ? void 0 : p.openTpOverlay(C.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !d.timePickerInline,
                  dp__time_display_inline: d.timePickerInline,
                  "dp--time-invalid": J.value(C.type),
                  "dp--time-overlay-btn": !J.value(C.type)
                }),
                disabled: u(C.type),
                tabindex: "0",
                "data-test": `${C.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (pe) => unref(qe)(pe, () => I(C.type), true),
                onClick: (pe) => I(C.type)
              }, [
                d.$slots[C.type] ? renderSlot(d.$slots, C.type, {
                  key: 0,
                  text: A.value(C.type).text,
                  value: A.value(C.type).value
                }) : createCommentVNode("", true),
                d.$slots[C.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(A.value(C.type).text), 1)
                ], 64))
              ], 42, dr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (pe) => M(pe, te, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !d.timePickerInline,
                  dp__inc_dec_button_inline: d.timePickerInline,
                  dp__tp_inline_btn_bottom: d.timePickerInline,
                  dp__inc_dec_button_disabled: re.value(C.type)
                }),
                "data-test": `${C.type}-time-dec-btn-${n.order}`,
                "aria-label": (V = unref(b)) == null ? void 0 : V.decrementValue(C.type),
                tabindex: "0",
                onKeydown: (pe) => unref(qe)(pe, () => T(C.type, false, { keyboard: true }), true),
                onClick: (pe) => unref(m).timeArrowHoldThreshold ? void 0 : T(C.type, false),
                onMousedown: (pe) => unref(m).timeArrowHoldThreshold ? T(C.type, false) : void 0,
                onMouseup: f
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  d.$slots["tp-inline-arrow-down"] ? renderSlot(d.$slots, "tp-inline-arrow-down", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    fr,
                    vr
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  d.$slots["arrow-down"] ? renderSlot(d.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ua), { key: 1 }))
                ], 64))
              ], 42, cr)
            ], 64))
          ], 2);
        }), 128)),
        d.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", mr, [
          d.$slots["am-pm-button"] ? renderSlot(d.$slots, "am-pm-button", {
            key: 0,
            toggle: s,
            value: N.value
          }) : createCommentVNode("", true),
          d.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: S,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (W = unref(b)) == null ? void 0 : W.amPmButton,
            tabindex: "0",
            onClick: s,
            onKeydown: Y[0] || (Y[0] = (C) => unref(qe)(C, () => s(), true))
          }, toDisplayString(N.value), 41, gr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(O.value, (C, te) => (openBlock(), createBlock(Transition, {
          key: te,
          name: unref(k)(H[C.type]),
          css: unref(_)
        }, {
          default: withCtx(() => [
            H[C.type] ? (openBlock(), createBlock(qt, {
              key: 0,
              items: z(C.type),
              "is-last": d.autoApply && !unref(m).keepActionRow,
              "esc-close": d.escClose,
              type: C.type,
              "text-input": d.textInput,
              config: d.config,
              "arrow-navigation": d.arrowNavigation,
              "aria-labels": d.ariaLabels,
              onSelected: (ue) => me(C.type, ue),
              onToggle: (ue) => I(C.type),
              onResetFlow: Y[1] || (Y[1] = (ue) => d.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                d.$slots["clock-icon"] ? renderSlot(d.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                d.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(d.timePickerInline ? unref(Et) : unref(Ha)), { key: 1 }))
              ]),
              _: 2
            }, [
              d.$slots[`${C.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: ue }) => [
                  renderSlot(d.$slots, `${C.type}-overlay-value`, {
                    text: ue.text,
                    value: ue.value
                  })
                ]),
                key: "0"
              } : void 0,
              d.$slots[`${C.type}-overlay-header`] ? {
                name: "header",
                fn: withCtx(() => [
                  renderSlot(d.$slots, `${C.type}-overlay-header`, {
                    toggle: () => I(C.type)
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var pr = { class: "dp--tp-wrap" };
var hr = ["aria-label", "tabindex"];
var br = ["tabindex"];
var kr = ["aria-label"];
var Ln = defineComponent({
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
    const a = l, n = e, { buildMatrix: c, setTimePicker: v } = bt(), b = useSlots(), { defaultedTransitions: i, defaultedAriaLabels: L, defaultedTextInput: m, defaultedConfig: E, defaultedRange: k } = Ce(n), { transitionName: _, showTransition: H } = Xt(i), { hideNavigationButtons: N } = ma(), S = ref(null), y = ref(null), F = ref([]), P = ref(null);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? c([Ie(S.value)], "time") : v(true, n.timePicker);
    });
    const J = computed(() => k.value.enabled && n.modelAuto ? Mn(n.internalModelValue) : true), Z = ref(false), le = (o) => ({
      hours: Array.isArray(n.hours) ? n.hours[o] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[o] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[o] : n.seconds
    }), q = computed(() => {
      const o = [];
      if (k.value.enabled)
        for (let z = 0; z < 2; z++)
          o.push(le(z));
      else
        o.push(le(0));
      return o;
    }), R = (o, z = false, D = "") => {
      z || a("reset-flow"), Z.value = o, a(o ? "overlay-opened" : "overlay-closed", He.time), n.arrowNavigation && v(o), nextTick(() => {
        D !== "" && F.value[0] && F.value[0].openChildCmp(D);
      });
    }, re = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !E.value.keepActionRow
    })), B = Ze(b, "timePicker"), K = (o, z, D) => k.value.enabled ? z === 0 ? [o, q.value[1][D]] : [q.value[0][D], o] : o, fe = (o) => {
      a("update:hours", o);
    }, ce = (o) => {
      a("update:minutes", o);
    }, O = (o) => {
      a("update:seconds", o);
    }, A = () => {
      if (P.value && !m.value.enabled && !n.noOverlayFocus) {
        const o = $n(P.value);
        o && o.focus({ preventScroll: true });
      }
    }, w = (o) => {
      a("overlay-closed", o);
    };
    return t({ toggleTimePicker: R }), (o, z) => {
      var D;
      return openBlock(), createElementBlock("div", pr, [
        !o.timePicker && !o.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: S,
          type: "button",
          class: normalizeClass(re.value),
          "aria-label": (D = unref(L)) == null ? void 0 : D.openTimePicker,
          tabindex: o.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: z[0] || (z[0] = (ee) => unref(qe)(ee, () => R(true))),
          onClick: z[1] || (z[1] = (ee) => R(true))
        }, [
          o.$slots["clock-icon"] ? renderSlot(o.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          o.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
        ], 42, hr)), [
          [vShow, !unref(N)(o.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(_)(Z.value),
          css: unref(H) && !o.timePickerInline
        }, {
          default: withCtx(() => {
            var ee;
            return [
              Z.value || o.timePicker || o.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: P,
                class: normalizeClass({
                  dp__overlay: !o.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !o.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(o.timePicker ? { height: `${unref(E).modeHeight}px` } : void 0),
                tabindex: o.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    o.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  o.$slots["time-picker-overlay"] ? renderSlot(o.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: fe,
                    setMinutes: ce,
                    setSeconds: O
                  }) : createCommentVNode("", true),
                  o.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(o.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(q.value, (de, u) => withDirectives((openBlock(), createBlock(yr, mergeProps({
                      key: u,
                      ref_for: true
                    }, {
                      ...o.$props,
                      order: u,
                      hours: de.hours,
                      minutes: de.minutes,
                      seconds: de.seconds,
                      closeTimePickerBtn: y.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: u === 0 ? o.fixedStart : o.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: F,
                      "validate-time": (I, se) => e.validateTime(I, K(se, u, I)),
                      "onUpdate:hours": (I) => fe(K(I, u, "hours")),
                      "onUpdate:minutes": (I) => ce(K(I, u, "minutes")),
                      "onUpdate:seconds": (I) => O(K(I, u, "seconds")),
                      onMounted: A,
                      onOverlayClosed: w,
                      onOverlayOpened: z[2] || (z[2] = (I) => o.$emit("overlay-opened", I)),
                      onAmPmChange: z[3] || (z[3] = (I) => o.$emit("am-pm-change", I))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(B), (I, se) => ({
                        name: I,
                        fn: withCtx((f) => [
                          renderSlot(o.$slots, I, mergeProps({ ref_for: true }, f))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, u === 0 ? true : J.value]
                    ])), 128))
                  ], 2)),
                  !o.timePicker && !o.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: y,
                    type: "button",
                    class: normalizeClass(re.value),
                    "aria-label": (ee = unref(L)) == null ? void 0 : ee.closeTimePicker,
                    tabindex: "0",
                    onKeydown: z[4] || (z[4] = (de) => unref(qe)(de, () => R(false))),
                    onClick: z[5] || (z[5] = (de) => R(false))
                  }, [
                    o.$slots["calendar-icon"] ? renderSlot(o.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    o.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                  ], 42, kr)), [
                    [vShow, !unref(N)(o.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, br)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var zn = (e, t, l, a) => {
  const { defaultedRange: n } = Ce(e), c = (P, J) => Array.isArray(t[P]) ? t[P][J] : t[P], v = (P) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[P] : t.seconds : 0, b = (P, J) => P ? J !== void 0 ? pt(P, c("hours", J), c("minutes", J), v(J)) : pt(P, t.hours, t.minutes, v()) : setSeconds(j(), v(J)), i = (P, J) => {
    t[P] = J;
  }, L = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : n.value.enabled), m = (P, J) => {
    const Z = Object.fromEntries(
      Object.keys(t).map((le) => le === P ? [le, J] : [le, t[le]].slice())
    );
    if (L.value && !n.value.disableTimeRangeValidation) {
      const le = (R) => l.value ? pt(
        l.value[R],
        Z.hours[R],
        Z.minutes[R],
        Z.seconds[R]
      ) : null, q = (R) => setMilliseconds(l.value[R], 0);
      return !(De(le(0), le(1)) && (isAfter(le(0), q(1)) || isBefore(le(1), q(0))));
    }
    return true;
  }, E = (P, J) => {
    m(P, J) && (i(P, J), a && a());
  }, k = (P) => {
    E("hours", P);
  }, _ = (P) => {
    E("minutes", P);
  }, H = (P) => {
    E("seconds", P);
  }, N = (P, J, Z, le) => {
    J && k(P), !J && !Z && _(P), Z && H(P), l.value && le(l.value);
  }, S = (P) => {
    if (P) {
      const J = Array.isArray(P), Z = J ? [+P[0].hours, +P[1].hours] : +P.hours, le = J ? [+P[0].minutes, +P[1].minutes] : +P.minutes, q = J ? [+P[0].seconds, +P[1].seconds] : +P.seconds;
      i("hours", Z), i("minutes", le), e.enableSeconds && i("seconds", q);
    }
  }, y = (P, J) => {
    const Z = {
      hours: Array.isArray(t.hours) ? t.hours[P] : t.hours,
      disabledArr: []
    };
    return (J || J === 0) && (Z.hours = J), Array.isArray(e.disabledTimes) && (Z.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[P]) ? e.disabledTimes[P] : e.disabledTimes), Z;
  }, F = computed(() => (P, J) => {
    var Z;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: le, hours: q } = y(P, J), R = le.filter((re) => +re.hours === q);
      return ((Z = R[0]) == null ? void 0 : Z.minutes) === "*" ? { hours: [q], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (R == null ? void 0 : R.map((re) => +re.minutes)) ?? [],
        seconds: (R == null ? void 0 : R.map((re) => re.seconds ? +re.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: i,
    updateHours: k,
    updateMinutes: _,
    updateSeconds: H,
    getSetDateTime: b,
    updateTimeValues: N,
    getSecondsValue: v,
    assignStartTime: S,
    validateTime: m,
    disabledTimesConfig: F
  };
};
var wr = (e, t) => {
  const l = () => {
    e.isTextInputDate && J();
  }, { modelValue: a, time: n } = Jt(e, t, l), { defaultedStartTime: c, defaultedRange: v, defaultedTz: b } = Ce(e), { updateTimeValues: i, getSetDateTime: L, setTime: m, assignStartTime: E, disabledTimesConfig: k, validateTime: _ } = zn(e, n, a, H);
  function H() {
    t("update-flow-step");
  }
  const N = (q) => {
    const { hours: R, minutes: re, seconds: B } = q;
    return { hours: +R, minutes: +re, seconds: B ? +B : 0 };
  }, S = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const R = N(e.startTime[0]), re = N(e.startTime[1]);
        return [set(j(), R), set(j(), re)];
      }
      const q = N(e.startTime);
      return set(j(), q);
    }
    return v.value.enabled ? [null, null] : null;
  }, y = () => {
    if (v.value.enabled) {
      const [q, R] = S();
      a.value = [
        Xe(L(q, 0), b.value.timezone),
        Xe(L(R, 1), b.value.timezone)
      ];
    } else
      a.value = Xe(L(S()), b.value.timezone);
  }, F = (q) => Array.isArray(q) ? [St(j(q[0])), St(j(q[1]))] : [St(q ?? j())], P = (q, R, re) => {
    m("hours", q), m("minutes", R), m("seconds", e.enableSeconds ? re : 0);
  }, J = () => {
    const [q, R] = F(a.value);
    return v.value.enabled ? P(
      [q.hours, R.hours],
      [q.minutes, R.minutes],
      [q.seconds, R.seconds]
    ) : P(q.hours, q.minutes, q.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return E(c.value), a.value ? J() : y();
  });
  const Z = () => {
    Array.isArray(a.value) ? a.value = a.value.map((q, R) => q && L(q, R)) : a.value = L(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: k,
    updateTime: (q, R = true, re = false) => {
      i(q, R, re, Z);
    },
    validateTime: _
  };
};
var Dr = defineComponent({
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
    const a = l, n = e, c = useSlots(), v = Ze(c, "timePicker"), b = ref(null), { time: i, modelValue: L, disabledTimesConfig: m, updateTime: E, validateTime: k } = wr(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: L,
      time: i,
      updateTime: E
    }), toggleTimePicker: (N, S = false, y = "") => {
      var F;
      (F = b.value) == null || F.toggleTimePicker(N, S, y);
    } }), (N, S) => (openBlock(), createBlock(fa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ln, mergeProps({
          ref_key: "tpRef",
          ref: b
        }, N.$props, {
          hours: unref(i).hours,
          minutes: unref(i).minutes,
          seconds: unref(i).seconds,
          "internal-model-value": N.internalModelValue,
          "disabled-times-config": unref(m),
          "validate-time": unref(k),
          "onUpdate:hours": S[0] || (S[0] = (y) => unref(E)(y)),
          "onUpdate:minutes": S[1] || (S[1] = (y) => unref(E)(y, false)),
          "onUpdate:seconds": S[2] || (S[2] = (y) => unref(E)(y, false, true)),
          onAmPmChange: S[3] || (S[3] = (y) => N.$emit("am-pm-change", y)),
          onResetFlow: S[4] || (S[4] = (y) => N.$emit("reset-flow")),
          onOverlayClosed: S[5] || (S[5] = (y) => N.$emit("overlay-toggle", { open: false, overlay: y })),
          onOverlayOpened: S[6] || (S[6] = (y) => N.$emit("overlay-toggle", { open: true, overlay: y }))
        }), createSlots({ _: 2 }, [
          renderList(unref(v), (y, F) => ({
            name: y,
            fn: withCtx((P) => [
              renderSlot(N.$slots, y, normalizeProps(guardReactiveProps(P)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var Mr = { class: "dp--header-wrap" };
var $r = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Ar = { key: 0 };
var Tr = { class: "dp__month_year_wrap" };
var Sr = ["aria-label", "data-test", "onClick", "onKeydown"];
var Pr = defineComponent({
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
      defaultedTransitions: c,
      defaultedAriaLabels: v,
      defaultedMultiCalendars: b,
      defaultedFilters: i,
      defaultedConfig: L,
      defaultedHighlight: m,
      propDates: E,
      defaultedUI: k
    } = Ce(n), { transitionName: _, showTransition: H } = Xt(c), { buildMatrix: N } = bt(), { handleMonthYearChange: S, isDisabled: y, updateMonthYear: F } = Kl(n, a), { showLeftIcon: P, showRightIcon: J } = ma(), Z = ref(false), le = ref(false), q = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const R = (u) => ({
      get: () => n[u],
      set: (I) => {
        const se = u === nt.month ? nt.year : nt.month;
        a("update-month-year", { [u]: I, [se]: n[se] }), u === nt.month ? w(true) : o(true);
      }
    }), re = computed(R(nt.month)), B = computed(R(nt.year)), K = computed(() => (u) => ({
      month: n.month,
      year: n.year,
      items: u === nt.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: F,
      toggle: u === nt.month ? w : o
    })), fe = computed(() => {
      const u = n.months.find((I) => I.value === n.month);
      return u || { text: "", value: 0 };
    }), ce = computed(() => Yt(n.months, (u) => {
      const I = n.month === u.value, se = Gt(
        u.value,
        Tn(n.year, E.value.minDate),
        Sn(n.year, E.value.maxDate)
      ) || i.value.months.includes(u.value), f = On(m.value, u.value, n.year);
      return { active: I, disabled: se, highlighted: f };
    })), O = computed(() => Yt(n.years, (u) => {
      const I = n.year === u.value, se = Gt(
        u.value,
        It(E.value.minDate),
        It(E.value.maxDate)
      ) || i.value.years.includes(u.value), f = Qa(m.value, u.value);
      return { active: I, disabled: se, highlighted: f };
    })), A = (u, I, se) => {
      se !== void 0 ? u.value = se : u.value = !u.value, u.value ? a("overlay-opened", I) : a("overlay-closed", I);
    }, w = (u = false, I) => {
      z(u), A(Z, He.month, I);
    }, o = (u = false, I) => {
      z(u), A(le, He.year, I);
    }, z = (u) => {
      u || a("reset-flow");
    }, D = (u, I) => {
      n.arrowNavigation && (q.value[I] = Ie(u), N(q.value, "monthYear"));
    }, ee = computed(() => {
      var u, I;
      return [
        {
          type: nt.month,
          index: 1,
          toggle: w,
          modelValue: re.value,
          updateModelValue: (se) => re.value = se,
          text: fe.value.text,
          showSelectionGrid: Z.value,
          items: ce.value,
          ariaLabel: (u = v.value) == null ? void 0 : u.openMonthsOverlay
        },
        {
          type: nt.year,
          index: 2,
          toggle: o,
          modelValue: B.value,
          updateModelValue: (se) => B.value = se,
          text: An(n.year, n.locale),
          showSelectionGrid: le.value,
          items: O.value,
          ariaLabel: (I = v.value) == null ? void 0 : I.openYearsOverlay
        }
      ];
    }), de = computed(() => n.disableYearSelect ? [ee.value[0]] : n.yearFirst ? [...ee.value].reverse() : ee.value);
    return t({
      toggleMonthPicker: w,
      toggleYearPicker: o,
      handleMonthYearChange: S
    }), (u, I) => {
      var se, f, T, Q, s, oe;
      return openBlock(), createElementBlock("div", Mr, [
        u.$slots["month-year"] ? (openBlock(), createElementBlock("div", $r, [
          renderSlot(u.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(F), handleMonthYearChange: unref(S), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          u.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Ar, [
            renderSlot(u.$slots, "top-extra", { value: u.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Tr, [
            unref(P)(unref(b), e.instance) && !u.vertical ? (openBlock(), createBlock(Vt, {
              key: 0,
              "aria-label": (se = unref(v)) == null ? void 0 : se.prevMonth,
              disabled: unref(y)(false),
              class: normalizeClass((f = unref(k)) == null ? void 0 : f.navBtnPrev),
              onActivate: I[0] || (I[0] = (M) => unref(S)(false, true)),
              onSetRef: I[1] || (I[1] = (M) => D(M, 0))
            }, {
              default: withCtx(() => [
                u.$slots["arrow-left"] ? renderSlot(u.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                u.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: u.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(de.value, (M, me) => (openBlock(), createElementBlock(Fragment, {
                key: M.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (d) => D(d, me + 1),
                  type: "button",
                  class: "dp__btn dp__month_year_select",
                  tabindex: "0",
                  "aria-label": M.ariaLabel,
                  "data-test": `${M.type}-toggle-overlay-${e.instance}`,
                  onClick: M.toggle,
                  onKeydown: (d) => unref(qe)(d, () => M.toggle(), true)
                }, [
                  u.$slots[M.type] ? renderSlot(u.$slots, M.type, {
                    key: 0,
                    text: M.text,
                    value: n[M.type]
                  }) : createCommentVNode("", true),
                  u.$slots[M.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(M.text), 1)
                  ], 64))
                ], 40, Sr),
                createVNode(Transition, {
                  name: unref(_)(M.showSelectionGrid),
                  css: unref(H)
                }, {
                  default: withCtx(() => [
                    M.showSelectionGrid ? (openBlock(), createBlock(qt, {
                      key: 0,
                      items: M.items,
                      "arrow-navigation": u.arrowNavigation,
                      "hide-navigation": u.hideNavigation,
                      "is-last": u.autoApply && !unref(L).keepActionRow,
                      "skip-button-ref": false,
                      config: u.config,
                      type: M.type,
                      "header-refs": [],
                      "esc-close": u.escClose,
                      "menu-wrap-ref": u.menuWrapRef,
                      "text-input": u.textInput,
                      "aria-labels": u.ariaLabels,
                      onSelected: M.updateModelValue,
                      onToggle: M.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        u.$slots["calendar-icon"] ? renderSlot(u.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        u.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      u.$slots[`${M.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: d }) => [
                          renderSlot(u.$slots, `${M.type}-overlay-value`, {
                            text: d.text,
                            value: d.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      u.$slots[`${M.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(u.$slots, `${M.type}-overlay`, mergeProps({ ref_for: true }, K.value(M.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      u.$slots[`${M.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(u.$slots, `${M.type}-overlay-header`, {
                            toggle: M.toggle
                          })
                        ]),
                        key: "2"
                      } : void 0
                    ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "menu-wrap-ref", "text-input", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ], 64))), 128))
            ], 2),
            unref(P)(unref(b), e.instance) && u.vertical ? (openBlock(), createBlock(Vt, {
              key: 1,
              "aria-label": (T = unref(v)) == null ? void 0 : T.prevMonth,
              disabled: unref(y)(false),
              class: normalizeClass((Q = unref(k)) == null ? void 0 : Q.navBtnPrev),
              onActivate: I[2] || (I[2] = (M) => unref(S)(false, true))
            }, {
              default: withCtx(() => [
                u.$slots["arrow-up"] ? renderSlot(u.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                u.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(J)(unref(b), e.instance) ? (openBlock(), createBlock(Vt, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(y)(true),
              "aria-label": (s = unref(v)) == null ? void 0 : s.nextMonth,
              class: normalizeClass((oe = unref(k)) == null ? void 0 : oe.navBtnNext),
              onActivate: I[3] || (I[3] = (M) => unref(S)(true, true)),
              onSetRef: I[4] || (I[4] = (M) => D(M, u.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                u.$slots[u.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(u.$slots, u.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                u.$slots[u.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(u.vertical ? unref(Ua) : unref(za)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label", "class"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Rr = ["aria-label"];
var Cr = {
  class: "dp__calendar_header",
  role: "row"
};
var _r = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Or = ["aria-label"];
var Br = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Yr = ["aria-label"];
var Ir = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Nr = { class: "dp__cell_inner" };
var Er = ["id", "aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
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
    const a = l, n = e, { buildMultiLevelMatrix: c } = bt(), {
      defaultedTransitions: v,
      defaultedConfig: b,
      defaultedAriaLabels: i,
      defaultedMultiCalendars: L,
      defaultedWeekNumbers: m,
      defaultedMultiDates: E,
      defaultedUI: k
    } = Ce(n), _ = ref(null), H = ref({
      bottom: "",
      left: "",
      transform: ""
    }), N = ref([]), S = ref(null), y = ref(true), F = ref(""), P = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), J = ref([]), Z = ref({ left: "50%" }), le = ref(false), q = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), R = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : vl(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: N }), b.value.noSwipe || S.value && (S.value.addEventListener("touchstart", D, { passive: false }), S.value.addEventListener("touchend", ee, { passive: false }), S.value.addEventListener("touchmove", de, { passive: false })), n.monthChangeOnScroll && S.value && S.value.addEventListener("wheel", se, { passive: false });
    });
    const re = (M) => M ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", B = (M, me) => {
      if (n.transitions) {
        const d = Ke(dt(j(), n.month, n.year));
        F.value = Be(Ke(dt(j(), M, me)), d) ? v.value[re(true)] : v.value[re(false)], y.value = false, nextTick(() => {
          y.value = true;
        });
      }
    }, K = computed(
      () => ({
        [n.calendarClassName]: !!n.calendarClassName,
        ...k.value.calendar ?? {}
      })
    ), fe = computed(() => (M) => {
      const me = gl(M);
      return {
        dp__marker_dot: me.type === "dot",
        dp__marker_line: me.type === "line"
      };
    }), ce = computed(() => (M) => De(M, _.value)), O = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: L.value.count > 0 && n.instance !== 0
    })), A = computed(() => (M) => n.hideOffsetDates ? M.current : true), w = async (M, me, d) => {
      const Y = Ie(N.value[me][d]);
      if (Y) {
        const { width: W, height: C } = Y.getBoundingClientRect();
        _.value = M.value;
        let te = { left: `${W / 2}px` }, ue = -50;
        if (await nextTick(), J.value[0]) {
          const { left: p, width: V } = J.value[0].getBoundingClientRect();
          p < 0 && (te = { left: "0" }, ue = 0, Z.value.left = `${W / 2}px`), window.innerWidth < p + V && (te = { right: "0" }, ue = 0, Z.value.left = `${V - W / 2}px`);
        }
        H.value = {
          bottom: `${C}px`,
          ...te,
          transform: `translateX(${ue}%)`
        }, a("tooltip-open", M.marker);
      }
    }, o = async (M, me, d) => {
      var Y, W;
      if (le.value && E.value.enabled && E.value.dragSelect)
        return a("select-date", M);
      a("set-hover-date", M), (W = (Y = M.marker) == null ? void 0 : Y.tooltip) != null && W.length && await w(M, me, d);
    }, z = (M) => {
      _.value && (_.value = null, H.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", M.marker));
    }, D = (M) => {
      P.value.startX = M.changedTouches[0].screenX, P.value.startY = M.changedTouches[0].screenY;
    }, ee = (M) => {
      P.value.endX = M.changedTouches[0].screenX, P.value.endY = M.changedTouches[0].screenY, u();
    }, de = (M) => {
      n.vertical && !n.inline && M.preventDefault();
    }, u = () => {
      const M = n.vertical ? "Y" : "X";
      Math.abs(P.value[`start${M}`] - P.value[`end${M}`]) > 10 && a("handle-swipe", P.value[`start${M}`] > P.value[`end${M}`] ? "right" : "left");
    }, I = (M, me, d) => {
      M && (Array.isArray(N.value[me]) ? N.value[me][d] = M : N.value[me] = [M]), n.arrowNavigation && c(N.value, "calendar");
    }, se = (M) => {
      n.monthChangeOnScroll && (M.preventDefault(), a("handle-scroll", M));
    }, f = (M) => m.value.type === "local" ? getWeek(M.value, { weekStartsOn: +n.weekStart }) : m.value.type === "iso" ? getISOWeek(M.value) : typeof m.value.type == "function" ? m.value.type(M.value) : "", T = (M) => {
      const me = M[0];
      return m.value.hideOnOffsetDates ? M.some((d) => d.current) ? f(me) : "" : f(me);
    }, Q = (M, me) => {
      E.value.enabled || (yt(M, b.value), a("select-date", me));
    }, s = (M) => {
      yt(M, b.value);
    }, oe = (M) => {
      E.value.enabled && E.value.dragSelect ? (le.value = true, a("select-date", M)) : E.value.enabled && a("select-date", M);
    };
    return t({ triggerTransition: B }), (M, me) => {
      var d;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(O.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: S,
          role: "grid",
          class: normalizeClass(K.value),
          "aria-label": (d = unref(i)) == null ? void 0 : d.calendarWrap
        }, [
          createBaseVNode("div", Cr, [
            M.weekNumbers ? (openBlock(), createElementBlock("div", _r, toDisplayString(M.weekNumName), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(R.value, (Y, W) => {
              var C, te;
              return openBlock(), createElementBlock("div", {
                key: W,
                class: "dp__calendar_header_item",
                role: "gridcell",
                "data-test": "calendar-header",
                "aria-label": (te = (C = unref(i)) == null ? void 0 : C.weekDay) == null ? void 0 : te.call(C, W)
              }, [
                M.$slots["calendar-header"] ? renderSlot(M.$slots, "calendar-header", {
                  key: 0,
                  day: Y,
                  index: W
                }) : createCommentVNode("", true),
                M.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(Y), 1)
                ], 64))
              ], 8, Or);
            }), 128))
          ]),
          Br,
          createVNode(Transition, {
            name: F.value,
            css: !!M.transitions
          }, {
            default: withCtx(() => {
              var Y;
              return [
                y.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "dp__calendar",
                  role: "rowgroup",
                  "aria-label": ((Y = unref(i)) == null ? void 0 : Y.calendarDays) || void 0,
                  onMouseleave: me[1] || (me[1] = (W) => le.value = false)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(q.value, (W, C) => (openBlock(), createElementBlock("div", {
                    key: C,
                    class: "dp__calendar_row",
                    role: "row"
                  }, [
                    M.weekNumbers ? (openBlock(), createElementBlock("div", Ir, [
                      createBaseVNode("div", Nr, toDisplayString(T(W.days)), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(W.days, (te, ue) => {
                      var p, V, pe;
                      return openBlock(), createElementBlock("div", {
                        id: unref(Bn)(te.value),
                        ref_for: true,
                        ref: ($e) => I($e, C, ue),
                        key: ue + C,
                        role: "gridcell",
                        class: "dp__calendar_item",
                        "aria-selected": (te.classData.dp__active_date || te.classData.dp__range_start || te.classData.dp__range_start) ?? void 0,
                        "aria-disabled": te.classData.dp__cell_disabled || void 0,
                        "aria-label": (V = (p = unref(i)) == null ? void 0 : p.day) == null ? void 0 : V.call(p, te),
                        tabindex: "0",
                        "data-test": te.value,
                        onClick: withModifiers(($e) => Q($e, te), ["prevent"]),
                        onKeydown: ($e) => unref(qe)($e, () => M.$emit("select-date", te)),
                        onMouseenter: ($e) => o(te, C, ue),
                        onMouseleave: ($e) => z(te),
                        onMousedown: ($e) => oe(te),
                        onMouseup: me[0] || (me[0] = ($e) => le.value = false)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["dp__cell_inner", te.classData])
                        }, [
                          M.$slots.day && A.value(te) ? renderSlot(M.$slots, "day", {
                            key: 0,
                            day: +te.text,
                            date: te.value
                          }) : createCommentVNode("", true),
                          M.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createTextVNode(toDisplayString(te.text), 1)
                          ], 64)),
                          te.marker && A.value(te) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                            M.$slots.marker ? renderSlot(M.$slots, "marker", {
                              key: 0,
                              marker: te.marker,
                              day: +te.text,
                              date: te.value
                            }) : (openBlock(), createElementBlock("div", {
                              key: 1,
                              class: normalizeClass(fe.value(te.marker)),
                              style: normalizeStyle(te.marker.color ? { backgroundColor: te.marker.color } : {})
                            }, null, 6))
                          ], 64)) : createCommentVNode("", true),
                          ce.value(te.value) ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_for: true,
                            ref_key: "activeTooltip",
                            ref: J,
                            class: "dp__marker_tooltip",
                            style: normalizeStyle(H.value)
                          }, [
                            (pe = te.marker) != null && pe.tooltip ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: "dp__tooltip_content",
                              onClick: s
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(te.marker.tooltip, ($e, Ge) => (openBlock(), createElementBlock("div", {
                                key: Ge,
                                class: "dp__tooltip_text"
                              }, [
                                M.$slots["marker-tooltip"] ? renderSlot(M.$slots, "marker-tooltip", {
                                  key: 0,
                                  tooltip: $e,
                                  day: te.value
                                }) : createCommentVNode("", true),
                                M.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createBaseVNode("div", {
                                    class: "dp__tooltip_mark",
                                    style: normalizeStyle($e.color ? { backgroundColor: $e.color } : {})
                                  }, null, 4),
                                  createBaseVNode("div", null, toDisplayString($e.text), 1)
                                ], 64))
                              ]))), 128)),
                              createBaseVNode("div", {
                                class: "dp__arrow_bottom_tp",
                                style: normalizeStyle(Z.value)
                              }, null, 4)
                            ])) : createCommentVNode("", true)
                          ], 4)) : createCommentVNode("", true)
                        ], 2)
                      ], 40, Er);
                    }), 128))
                  ]))), 128))
                ], 40, Yr)) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 8, ["name", "css"])
        ], 10, Rr)
      ], 2);
    };
  }
});
var cn = (e) => Array.isArray(e);
var Lr = (e, t, l, a) => {
  const n = ref([]), c = ref(/* @__PURE__ */ new Date()), v = ref(), b = () => ee(e.isTextInputDate), { modelValue: i, calendars: L, time: m, today: E } = Jt(e, t, b), {
    defaultedMultiCalendars: k,
    defaultedStartTime: _,
    defaultedRange: H,
    defaultedConfig: N,
    defaultedTz: S,
    propDates: y,
    defaultedMultiDates: F
  } = Ce(e), { validateMonthYearInRange: P, isDisabled: J, isDateRangeAllowed: Z, checkMinMaxRange: le } = kt(e), { updateTimeValues: q, getSetDateTime: R, setTime: re, assignStartTime: B, validateTime: K, disabledTimesConfig: fe } = zn(e, m, i, a), ce = computed(
    () => (h2) => L.value[h2] ? L.value[h2].month : 0
  ), O = computed(
    () => (h2) => L.value[h2] ? L.value[h2].year : 0
  ), A = (h2) => !N.value.keepViewOnOffsetClick || h2 ? true : !v.value, w = (h2, g, U, ne = false) => {
    var Ae, Fe;
    A(ne) && (L.value[h2] || (L.value[h2] = { month: 0, year: 0 }), L.value[h2].month = rn(g) ? (Ae = L.value[h2]) == null ? void 0 : Ae.month : g, L.value[h2].year = rn(U) ? (Fe = L.value[h2]) == null ? void 0 : Fe.year : U);
  }, o = () => {
    e.autoApply && t("select-date");
  };
  onMounted(() => {
    e.shadow || (i.value || (me(), _.value && B(_.value)), ee(true), e.focusStartDate && e.startDate && me());
  });
  const z = computed(() => {
    var h2;
    return (h2 = e.flow) != null && h2.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), D = () => {
    e.autoApply && z.value && t("auto-apply");
  }, ee = (h2 = false) => {
    if (i.value)
      return Array.isArray(i.value) ? (n.value = i.value, Q(h2)) : I(i.value, h2);
    if (k.value.count && h2 && !e.startDate)
      return u(j(), h2);
  }, de = () => Array.isArray(i.value) && H.value.enabled ? getMonth(i.value[0]) === getMonth(i.value[1] ?? i.value[0]) : false, u = (h2 = /* @__PURE__ */ new Date(), g = false) => {
    if ((!k.value.count || !k.value.static || g) && w(0, getMonth(h2), getYear(h2)), k.value.count && (!k.value.solo || !i.value || de()))
      for (let U = 1; U < k.value.count; U++) {
        const ne = set(j(), { month: ce.value(U - 1), year: O.value(U - 1) }), Ae = add(ne, { months: 1 });
        L.value[U] = { month: getMonth(Ae), year: getYear(Ae) };
      }
  }, I = (h2, g) => {
    u(h2), re("hours", getHours(h2)), re("minutes", getMinutes(h2)), re("seconds", getSeconds(h2)), k.value.count && g && M();
  }, se = (h2) => {
    if (k.value.count) {
      if (k.value.solo) return 0;
      const g = getMonth(h2[0]), U = getMonth(h2[1]);
      return Math.abs(U - g) < k.value.count ? 0 : 1;
    }
    return 1;
  }, f = (h2, g) => {
    h2[1] && H.value.showLastInRange ? u(h2[se(h2)], g) : u(h2[0], g);
    const U = (ne, Ae) => [
      ne(h2[0]),
      h2[1] ? ne(h2[1]) : m[Ae][1]
    ];
    re("hours", U(getHours, "hours")), re("minutes", U(getMinutes, "minutes")), re("seconds", U(getSeconds, "seconds"));
  }, T = (h2, g) => {
    if ((H.value.enabled || e.weekPicker) && !F.value.enabled)
      return f(h2, g);
    if (F.value.enabled && g) {
      const U = h2[h2.length - 1];
      return I(U, g);
    }
  }, Q = (h2) => {
    const g = i.value;
    T(g, h2), k.value.count && k.value.solo && M();
  }, s = (h2, g) => {
    const U = set(j(), { month: ce.value(g), year: O.value(g) }), ne = h2 < 0 ? addMonths(U, 1) : subMonths(U, 1);
    P(getMonth(ne), getYear(ne), h2 < 0, e.preventMinMaxNavigation) && (w(g, getMonth(ne), getYear(ne)), t("update-month-year", { instance: g, month: getMonth(ne), year: getYear(ne) }), k.value.count && !k.value.solo && oe(g), l());
  }, oe = (h2) => {
    for (let g = h2 - 1; g >= 0; g--) {
      const U = subMonths(set(j(), { month: ce.value(g + 1), year: O.value(g + 1) }), 1);
      w(g, getMonth(U), getYear(U));
    }
    for (let g = h2 + 1; g <= k.value.count - 1; g++) {
      const U = addMonths(set(j(), { month: ce.value(g - 1), year: O.value(g - 1) }), 1);
      w(g, getMonth(U), getYear(U));
    }
  }, M = () => {
    if (Array.isArray(i.value) && i.value.length === 2) {
      const h2 = j(
        j(i.value[1] ? i.value[1] : addMonths(i.value[0], 1))
      ), [g, U] = [getMonth(i.value[0]), getYear(i.value[0])], [ne, Ae] = [getMonth(i.value[1]), getYear(i.value[1])];
      (g !== ne || g === ne && U !== Ae) && k.value.solo && w(1, getMonth(h2), getYear(h2));
    } else i.value && !Array.isArray(i.value) && (w(0, getMonth(i.value), getYear(i.value)), u(j()));
  }, me = () => {
    e.startDate && (w(0, getMonth(j(e.startDate)), getYear(j(e.startDate))), k.value.count && oe(0));
  }, d = (h2, g) => {
    if (e.monthChangeOnScroll) {
      const U = (/* @__PURE__ */ new Date()).getTime() - c.value.getTime(), ne = Math.abs(h2.deltaY);
      let Ae = 500;
      ne > 1 && (Ae = 100), ne > 100 && (Ae = 0), U > Ae && (c.value = /* @__PURE__ */ new Date(), s(e.monthChangeOnScroll !== "inverse" ? -h2.deltaY : h2.deltaY, g));
    }
  }, Y = (h2, g, U = false) => {
    e.monthChangeOnArrows && e.vertical === U && W(h2, g);
  }, W = (h2, g) => {
    s(h2 === "right" ? -1 : 1, g);
  }, C = (h2) => {
    if (y.value.markers)
      return sa(h2.value, y.value.markers);
  }, te = (h2, g) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [h2 == 0, true];
      case "fair":
        return [h2 == 0 || g > h2, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, ue = (h2, g, U, ne) => {
    if (e.sixWeeks && h2.length < 6) {
      const Ae = 6 - h2.length, Fe = (g.getDay() + 7 - ne) % 7, xt = 6 - (U.getDay() + 7 - ne) % 7, [zt, Da] = te(Fe, xt);
      for (let Dt = 1; Dt <= Ae; Dt++)
        if (Da ? !!(Dt % 2) == zt : zt) {
          const ea = h2[0].days[0], Ma = p(addDays(ea.value, -7), getMonth(g));
          h2.unshift({ days: Ma });
        } else {
          const ea = h2[h2.length - 1], Ma = ea.days[ea.days.length - 1], Vn = p(addDays(Ma.value, 1), getMonth(g));
          h2.push({ days: Vn });
        }
    }
    return h2;
  }, p = (h2, g) => {
    const U = j(h2), ne = [];
    for (let Ae = 0; Ae < 7; Ae++) {
      const Fe = addDays(U, Ae), wt = getMonth(Fe) !== g;
      ne.push({
        text: e.hideOffsetDates && wt ? "" : Fe.getDate(),
        value: Fe,
        current: !wt,
        classData: {}
      });
    }
    return ne;
  }, V = (h2, g) => {
    const U = [], ne = new Date(g, h2), Ae = new Date(g, h2 + 1, 0), Fe = e.weekStart, wt = startOfWeek(ne, { weekStartsOn: Fe }), xt = (zt) => {
      const Da = p(zt, h2);
      if (U.push({ days: Da }), !U[U.length - 1].days.some(
        (Dt) => De(Ke(Dt.value), Ke(Ae))
      )) {
        const Dt = addDays(zt, 7);
        xt(Dt);
      }
    };
    return xt(wt), ue(U, ne, Ae, Fe);
  }, pe = (h2) => {
    const g = pt(j(h2.value), m.hours, m.minutes, Je());
    t("date-update", g), F.value.enabled ? qa(g, i, F.value.limit) : i.value = g, a(), nextTick().then(() => {
      D();
    });
  }, $e = (h2) => H.value.noDisabledRange ? Pn(n.value[0], h2).some((U) => J(U)) : false, Ge = () => {
    n.value = i.value ? i.value.slice() : [], n.value.length === 2 && !(H.value.fixedStart || H.value.fixedEnd) && (n.value = []);
  }, ve = (h2, g) => {
    const U = [
      j(h2.value),
      addDays(j(h2.value), +H.value.autoRange)
    ];
    Z(U) ? (g && vt(h2.value), n.value = U) : t("invalid-date", h2.value);
  }, vt = (h2) => {
    const g = getMonth(j(h2)), U = getYear(j(h2));
    if (w(0, g, U), k.value.count > 0)
      for (let ne = 1; ne < k.value.count; ne++) {
        const Ae = Ml(
          set(j(h2), { year: ce.value(ne - 1), month: O.value(ne - 1) })
        );
        w(ne, Ae.month, Ae.year);
      }
  }, ot = (h2) => {
    if ($e(h2.value) || !le(h2.value, i.value, H.value.fixedStart ? 0 : 1))
      return t("invalid-date", h2.value);
    n.value = En(j(h2.value), i, t, H);
  }, Ft = (h2, g) => {
    if (Ge(), H.value.autoRange) return ve(h2, g);
    if (H.value.fixedStart || H.value.fixedEnd) return ot(h2);
    n.value[0] ? le(j(h2.value), i.value) && !$e(h2.value) ? _e(j(h2.value), j(n.value[0])) ? (n.value.unshift(j(h2.value)), t("range-end", n.value[0])) : (n.value[1] = j(h2.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", h2.value), t("invalid-date", h2.value)) : (n.value[0] = j(h2.value), t("range-start", n.value[0]));
  }, Je = (h2 = true) => e.enableSeconds ? Array.isArray(m.seconds) ? h2 ? m.seconds[0] : m.seconds[1] : m.seconds : 0, Lt = (h2) => {
    n.value[h2] = pt(
      n.value[h2],
      m.hours[h2],
      m.minutes[h2],
      Je(h2 !== 1)
    );
  }, ga = () => {
    var h2, g;
    n.value[0] && n.value[1] && +((h2 = n.value) == null ? void 0 : h2[0]) > +((g = n.value) == null ? void 0 : g[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, Zt = () => {
    n.value.length && (n.value[0] && !n.value[1] ? Lt(0) : (Lt(0), Lt(1), a()), ga(), i.value = n.value.slice(), va(n.value, t, e.autoApply, e.modelAuto));
  }, ya = (h2, g = false) => {
    if (J(h2.value) || !h2.current && e.hideOffsetDates) return t("invalid-date", h2.value);
    if (v.value = JSON.parse(JSON.stringify(h2)), !H.value.enabled) return pe(h2);
    cn(m.hours) && cn(m.minutes) && !F.value.enabled && (Ft(h2, g), Zt());
  }, pa = (h2, g) => {
    var ne;
    w(h2, g.month, g.year, true), k.value.count && !k.value.solo && oe(h2), t("update-month-year", { instance: h2, month: g.month, year: g.year }), l(k.value.solo ? h2 : void 0);
    const U = (ne = e.flow) != null && ne.length ? e.flow[e.flowStep] : void 0;
    !g.fromNav && (U === He.month || U === He.year) && a();
  }, ha = (h2, g) => {
    Nn({
      value: h2,
      modelValue: i,
      range: H.value.enabled,
      timezone: g ? void 0 : S.value.timezone
    }), o(), e.multiCalendars && nextTick().then(() => ee(true));
  }, ba = () => {
    const h2 = Wa(j(), S.value);
    H.value.enabled ? i.value && Array.isArray(i.value) && i.value[0] ? i.value = _e(h2, i.value[0]) ? [h2, i.value[0]] : [i.value[0], h2] : i.value = [h2] : i.value = h2, o();
  }, ka = () => {
    if (Array.isArray(i.value))
      if (F.value.enabled) {
        const h2 = wa();
        i.value[i.value.length - 1] = R(h2);
      } else
        i.value = i.value.map((h2, g) => h2 && R(h2, g));
    else
      i.value = R(i.value);
    t("time-update");
  }, wa = () => Array.isArray(i.value) && i.value.length ? i.value[i.value.length - 1] : null;
  return {
    calendars: L,
    modelValue: i,
    month: ce,
    year: O,
    time: m,
    disabledTimesConfig: fe,
    today: E,
    validateTime: K,
    getCalendarDays: V,
    getMarker: C,
    handleScroll: d,
    handleSwipe: W,
    handleArrow: Y,
    selectDate: ya,
    updateMonthYear: pa,
    presetDate: ha,
    selectCurrentDate: ba,
    updateTime: (h2, g = true, U = false) => {
      q(h2, g, U, ka);
    },
    assignMonthAndYear: u
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
      calendars: c,
      month: v,
      year: b,
      modelValue: i,
      time: L,
      disabledTimesConfig: m,
      today: E,
      validateTime: k,
      getCalendarDays: _,
      getMarker: H,
      handleArrow: N,
      handleScroll: S,
      handleSwipe: y,
      selectDate: F,
      updateMonthYear: P,
      presetDate: J,
      selectCurrentDate: Z,
      updateTime: le,
      assignMonthAndYear: q
    } = Lr(n, a, de, u), R = useSlots(), { setHoverDate: re, getDayClassData: B, clearHoverDate: K } = no(i, n), { defaultedMultiCalendars: fe } = Ce(n), ce = ref([]), O = ref([]), A = ref(null), w = Ze(R, "calendar"), o = Ze(R, "monthYear"), z = Ze(R, "timePicker"), D = (Y) => {
      n.shadow || a("mount", Y);
    };
    watch(
      c,
      () => {
        n.shadow || setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    ), watch(
      fe,
      (Y, W) => {
        Y.count - W.count > 0 && q();
      },
      { deep: true }
    );
    const ee = computed(() => (Y) => _(v.value(Y), b.value(Y)).map((W) => ({
      ...W,
      days: W.days.map((C) => (C.marker = H(C), C.classData = B(C), C))
    })));
    function de(Y) {
      var W;
      Y || Y === 0 ? (W = O.value[Y]) == null || W.triggerTransition(v.value(Y), b.value(Y)) : O.value.forEach((C, te) => C.triggerTransition(v.value(te), b.value(te)));
    }
    function u() {
      a("update-flow-step");
    }
    const I = (Y, W = false) => {
      F(Y, W), n.spaceConfirm && a("select-date");
    }, se = (Y, W, C = 0) => {
      var te;
      (te = ce.value[C]) == null || te.toggleMonthPicker(Y, W);
    }, f = (Y, W, C = 0) => {
      var te;
      (te = ce.value[C]) == null || te.toggleYearPicker(Y, W);
    }, T = (Y, W, C) => {
      var te;
      (te = A.value) == null || te.toggleTimePicker(Y, W, C);
    }, Q = (Y, W) => {
      var C;
      if (!n.range) {
        const te = i.value ? i.value : E, ue = W ? new Date(W) : te, p = Y ? startOfWeek(ue, { weekStartsOn: 1 }) : endOfWeek(ue, { weekStartsOn: 1 });
        F({
          value: p,
          current: getMonth(ue) === v.value(0),
          text: "",
          classData: {}
        }), (C = document.getElementById(Bn(p))) == null || C.focus();
      }
    }, s = (Y) => {
      var W;
      (W = ce.value[0]) == null || W.handleMonthYearChange(Y, true);
    }, oe = (Y) => {
      P(0, { month: v.value(0), year: b.value(0) + (Y ? 1 : -1), fromNav: true });
    }, M = (Y, W) => {
      Y === He.time && a(`time-picker-${W ? "open" : "close"}`), a("overlay-toggle", { open: W, overlay: Y });
    }, me = (Y) => {
      a("overlay-toggle", { open: false, overlay: Y }), a("focus-menu");
    };
    return t({
      clearHoverDate: K,
      presetDate: J,
      selectCurrentDate: Z,
      toggleMonthPicker: se,
      toggleYearPicker: f,
      toggleTimePicker: T,
      handleArrow: N,
      updateMonthYear: P,
      getSidebarProps: () => ({
        modelValue: i,
        month: v,
        year: b,
        time: L,
        updateTime: le,
        updateMonthYear: P,
        selectDate: F,
        presetDate: J
      }),
      changeMonth: s,
      changeYear: oe,
      selectWeekDate: Q
    }), (Y, W) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(fa, {
        "multi-calendars": unref(fe).count,
        collapse: Y.collapse
      }, {
        default: withCtx(({ instance: C, index: te }) => [
          Y.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Pr, mergeProps({
            key: 0,
            ref: (ue) => {
              ue && (ce.value[te] = ue);
            },
            months: unref(Dn)(Y.formatLocale, Y.locale, Y.monthNameFormat),
            years: unref(ja)(Y.yearRange, Y.locale, Y.reverseYears),
            month: unref(v)(C),
            year: unref(b)(C),
            instance: C
          }, Y.$props, {
            onMount: W[0] || (W[0] = (ue) => D(unref(Tt).header)),
            onResetFlow: W[1] || (W[1] = (ue) => Y.$emit("reset-flow")),
            onUpdateMonthYear: (ue) => unref(P)(C, ue),
            onOverlayClosed: me,
            onOverlayOpened: W[2] || (W[2] = (ue) => Y.$emit("overlay-toggle", { open: true, overlay: ue }))
          }), createSlots({ _: 2 }, [
            renderList(unref(o), (ue, p) => ({
              name: ue,
              fn: withCtx((V) => [
                renderSlot(Y.$slots, ue, normalizeProps(guardReactiveProps(V)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Fr, mergeProps({
            ref: (ue) => {
              ue && (O.value[te] = ue);
            },
            "mapped-dates": ee.value(C),
            month: unref(v)(C),
            year: unref(b)(C),
            instance: C
          }, Y.$props, {
            onSelectDate: (ue) => unref(F)(ue, C !== 1),
            onHandleSpace: (ue) => I(ue, C !== 1),
            onSetHoverDate: W[3] || (W[3] = (ue) => unref(re)(ue)),
            onHandleScroll: (ue) => unref(S)(ue, C),
            onHandleSwipe: (ue) => unref(y)(ue, C),
            onMount: W[4] || (W[4] = (ue) => D(unref(Tt).calendar)),
            onResetFlow: W[5] || (W[5] = (ue) => Y.$emit("reset-flow")),
            onTooltipOpen: W[6] || (W[6] = (ue) => Y.$emit("tooltip-open", ue)),
            onTooltipClose: W[7] || (W[7] = (ue) => Y.$emit("tooltip-close", ue))
          }), createSlots({ _: 2 }, [
            renderList(unref(w), (ue, p) => ({
              name: ue,
              fn: withCtx((V) => [
                renderSlot(Y.$slots, ue, normalizeProps(guardReactiveProps({ ...V })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      Y.enableTimePicker ? (openBlock(), createElementBlock("div", zr, [
        Y.$slots["time-picker"] ? renderSlot(Y.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(L), updateTime: unref(le) }))) : (openBlock(), createBlock(Ln, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: A
        }, Y.$props, {
          hours: unref(L).hours,
          minutes: unref(L).minutes,
          seconds: unref(L).seconds,
          "internal-model-value": Y.internalModelValue,
          "disabled-times-config": unref(m),
          "validate-time": unref(k),
          onMount: W[8] || (W[8] = (C) => D(unref(Tt).timePicker)),
          "onUpdate:hours": W[9] || (W[9] = (C) => unref(le)(C)),
          "onUpdate:minutes": W[10] || (W[10] = (C) => unref(le)(C, false)),
          "onUpdate:seconds": W[11] || (W[11] = (C) => unref(le)(C, false, true)),
          onResetFlow: W[12] || (W[12] = (C) => Y.$emit("reset-flow")),
          onOverlayClosed: W[13] || (W[13] = (C) => M(C, false)),
          onOverlayOpened: W[14] || (W[14] = (C) => M(C, true)),
          onAmPmChange: W[15] || (W[15] = (C) => Y.$emit("am-pm-change", C))
        }), createSlots({ _: 2 }, [
          renderList(unref(z), (C, te) => ({
            name: C,
            fn: withCtx((ue) => [
              renderSlot(Y.$slots, C, normalizeProps(guardReactiveProps(ue)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Vr = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: a,
    defaultedConfig: n,
    defaultedHighlight: c,
    defaultedRange: v,
    propDates: b,
    defaultedFilters: i,
    defaultedMultiDates: L
  } = Ce(e), { modelValue: m, year: E, month: k, calendars: _ } = Jt(e, t), { isDisabled: H } = kt(e), { selectYear: N, groupedYears: S, showYearPicker: y, isDisabled: F, toggleYearPicker: P, handleYearSelect: J, handleYear: Z } = Fn({
    modelValue: m,
    multiCalendars: a,
    range: v,
    highlight: c,
    calendars: _,
    propDates: b,
    month: k,
    year: E,
    filters: i,
    props: e,
    emit: t
  }), le = (o, z) => [o, z].map((D) => format(D, "MMMM", { locale: e.formatLocale })).join("-"), q = computed(() => (o) => m.value ? Array.isArray(m.value) ? m.value.some((z) => isSameQuarter(o, z)) : isSameQuarter(m.value, o) : false), R = (o) => {
    if (v.value.enabled) {
      if (Array.isArray(m.value)) {
        const z = De(o, m.value[0]) || De(o, m.value[1]);
        return da(m.value, l.value, o) && !z;
      }
      return false;
    }
    return false;
  }, re = (o, z) => o.quarter === getQuarter(z) && o.year === getYear(z), B = (o) => typeof c.value == "function" ? c.value({ quarter: getQuarter(o), year: getYear(o) }) : !!c.value.quarters.find((z) => re(z, o)), K = computed(() => (o) => {
    const z = set(/* @__PURE__ */ new Date(), { year: E.value(o) });
    return eachQuarterOfInterval({
      start: startOfYear(z),
      end: endOfYear(z)
    }).map((D) => {
      const ee = startOfQuarter(D), de = endOfQuarter(D), u = H(D), I = R(ee), se = B(ee);
      return {
        text: le(ee, de),
        value: ee,
        active: q.value(ee),
        highlighted: se,
        disabled: u,
        isBetween: I
      };
    });
  }), fe = (o) => {
    qa(o, m, L.value.limit), t("auto-apply", true);
  }, ce = (o) => {
    m.value = Xa(m, o, t), va(m.value, t, e.autoApply, e.modelAuto);
  }, O = (o) => {
    m.value = o, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: S,
    year: E,
    isDisabled: F,
    quarters: K,
    showYearPicker: y,
    modelValue: m,
    setHoverDate: (o) => {
      l.value = o;
    },
    selectYear: N,
    selectQuarter: (o, z, D) => {
      if (!D)
        return _.value[z].month = getMonth(endOfQuarter(o)), L.value.enabled ? fe(o) : v.value.enabled ? ce(o) : O(o);
    },
    toggleYearPicker: P,
    handleYearSelect: J,
    handleYear: Z
  };
};
var Ur = { class: "dp--quarter-items" };
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
    const a = l, n = e, c = useSlots(), v = Ze(c, "yearMode"), {
      defaultedMultiCalendars: b,
      defaultedConfig: i,
      groupedYears: L,
      year: m,
      isDisabled: E,
      quarters: k,
      modelValue: _,
      showYearPicker: H,
      setHoverDate: N,
      selectQuarter: S,
      toggleYearPicker: y,
      handleYearSelect: F,
      handleYear: P
    } = Vr(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: _,
      year: m,
      selectQuarter: S,
      handleYearSelect: F,
      handleYear: P
    }) }), (Z, le) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(b).count,
      collapse: Z.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: q }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(i).modeHeight}px` })
        }, [
          Z.$slots["top-extra"] ? renderSlot(Z.$slots, "top-extra", {
            key: 0,
            value: Z.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(In, mergeProps(Z.$props, {
              items: unref(L)(q),
              instance: q,
              "show-year-picker": unref(H)[q],
              year: unref(m)(q),
              "is-disabled": (R) => unref(E)(q, R),
              onHandleYear: (R) => unref(P)(q, R),
              onYearSelect: (R) => unref(F)(R, q),
              onToggleYearPicker: (R) => unref(y)(q, R == null ? void 0 : R.flow, R == null ? void 0 : R.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(v), (R, re) => ({
                name: R,
                fn: withCtx((B) => [
                  renderSlot(Z.$slots, R, normalizeProps(guardReactiveProps(B)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Ur, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(k)(q), (R, re) => (openBlock(), createElementBlock("div", { key: re }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": R.active,
                  "dp--qr-btn-between": R.isBetween,
                  "dp--qr-btn-disabled": R.disabled,
                  "dp--highlighted": R.highlighted
                }]),
                "data-test": R.value,
                disabled: R.disabled,
                onClick: (B) => unref(S)(R.value, q, R.disabled),
                onMouseover: (B) => unref(N)(R.value)
              }, [
                Z.$slots.quarter ? renderSlot(Z.$slots, "quarter", {
                  key: 0,
                  value: R.value,
                  text: R.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(R.text), 1)
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
var Kr = ["id", "aria-label"];
var Gr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Qr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var qr = [
  Qr
];
var Xr = {
  key: 0,
  class: "dp__sidebar_left"
};
var Jr = ["data-test", "onClick", "onKeydown"];
var Zr = {
  key: 2,
  class: "dp__sidebar_right"
};
var xr = {
  key: 3,
  class: "dp__action_extra"
};
var fn = defineComponent({
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
    const a = l, n = e, c = ref(null), v = computed(() => {
      const { openOnTop: p, ...V } = n;
      return {
        ...V,
        flowStep: re.value,
        collapse: n.collapse,
        noOverlayFocus: n.noOverlayFocus,
        menuWrapRef: c.value
      };
    }), { setMenuFocused: b, setShiftKey: i, control: L } = Yn(), m = useSlots(), { defaultedTextInput: E, defaultedInline: k, defaultedConfig: _, defaultedUI: H } = Ce(n), N = ref(null), S = ref(0), y = ref(null), F = ref(false), P = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        F.value = true, J(), window.addEventListener("resize", J);
        const p = Ie(c);
        if (p && !E.value.enabled && !k.value.enabled && (b(true), w()), p) {
          const V = (pe) => {
            _.value.allowPreventDefault && pe.preventDefault(), yt(pe, _.value, true);
          };
          p.addEventListener("pointerdown", V), p.addEventListener("mousedown", V);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", J);
    });
    const J = () => {
      const p = Ie(y);
      p && (S.value = p.getBoundingClientRect().width);
    }, { arrowRight: Z, arrowLeft: le, arrowDown: q, arrowUp: R } = bt(), { flowStep: re, updateFlowStep: B, childMount: K, resetFlow: fe, handleFlow: ce } = lo(n, a, P), O = computed(() => n.monthPicker ? nr : n.yearPicker ? rr : n.timePicker ? Dr : n.quarterPicker ? jr : Hr), A = computed(() => {
      var pe;
      if (_.value.arrowLeft) return _.value.arrowLeft;
      const p = (pe = c.value) == null ? void 0 : pe.getBoundingClientRect(), V = n.getInputRect();
      return (V == null ? void 0 : V.width) < (S == null ? void 0 : S.value) && (V == null ? void 0 : V.left) <= ((p == null ? void 0 : p.left) ?? 0) ? `${(V == null ? void 0 : V.width) / 2}px` : (V == null ? void 0 : V.right) >= ((p == null ? void 0 : p.right) ?? 0) && (V == null ? void 0 : V.width) < (S == null ? void 0 : S.value) ? `${(S == null ? void 0 : S.value) - (V == null ? void 0 : V.width) / 2}px` : "50%";
    }), w = () => {
      const p = Ie(c);
      p && p.focus({ preventScroll: true });
    }, o = computed(() => {
      var p;
      return ((p = P.value) == null ? void 0 : p.getSidebarProps()) || {};
    }), z = () => {
      n.openOnTop && a("recalculate-position");
    }, D = Ze(m, "action"), ee = computed(() => n.monthPicker || n.yearPicker ? Ze(m, "monthYear") : n.timePicker ? Ze(m, "timePicker") : Ze(m, "shared")), de = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), u = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), I = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !k.value.enabled,
        dp__relative: k.value.enabled,
        [n.menuClassName]: !!n.menuClassName,
        ...H.value.menu ?? {}
      })
    ), se = (p) => {
      yt(p, _.value, true);
    }, f = () => {
      n.escClose && a("close-picker");
    }, T = (p) => {
      if (n.arrowNavigation) {
        if (p === je.up) return R();
        if (p === je.down) return q();
        if (p === je.left) return le();
        if (p === je.right) return Z();
      } else p === je.left || p === je.up ? me("handleArrow", je.left, 0, p === je.up) : me("handleArrow", je.right, 0, p === je.down);
    }, Q = (p) => {
      i(p.shiftKey), !n.disableMonthYearSelect && p.code === Re.tab && p.target.classList.contains("dp__menu") && L.value.shiftKeyInMenu && (p.preventDefault(), yt(p, _.value, true), a("close-picker"));
    }, s = () => {
      w(), a("time-picker-close");
    }, oe = (p) => {
      var V, pe, $e;
      (V = P.value) == null || V.toggleTimePicker(false, false), (pe = P.value) == null || pe.toggleMonthPicker(false, false, p), ($e = P.value) == null || $e.toggleYearPicker(false, false, p);
    }, M = (p, V = 0) => {
      var pe, $e, Ge;
      return p === "month" ? (pe = P.value) == null ? void 0 : pe.toggleMonthPicker(false, true, V) : p === "year" ? ($e = P.value) == null ? void 0 : $e.toggleYearPicker(false, true, V) : p === "time" ? (Ge = P.value) == null ? void 0 : Ge.toggleTimePicker(true, false) : oe(V);
    }, me = (p, ...V) => {
      var pe, $e;
      (pe = P.value) != null && pe[p] && (($e = P.value) == null || $e[p](...V));
    }, d = () => {
      me("selectCurrentDate");
    }, Y = (p, V) => {
      me("presetDate", p, V);
    }, W = () => {
      me("clearHoverDate");
    }, C = (p, V) => {
      me("updateMonthYear", p, V);
    }, te = (p, V) => {
      p.preventDefault(), T(V);
    }, ue = (p) => {
      var V;
      if (Q(p), p.key === Re.home || p.key === Re.end)
        return me(
          "selectWeekDate",
          p.key === Re.home,
          p.target.getAttribute("id")
        );
      switch ((p.key === Re.pageUp || p.key === Re.pageDown) && (p.shiftKey ? me("changeYear", p.key === Re.pageUp) : me("changeMonth", p.key === Re.pageUp), p.target.getAttribute("id") && ((V = c.value) == null || V.focus({ preventScroll: true }))), p.key) {
        case Re.esc:
          return f();
        case Re.arrowLeft:
          return te(p, je.left);
        case Re.arrowRight:
          return te(p, je.right);
        case Re.arrowUp:
          return te(p, je.up);
        case Re.arrowDown:
          return te(p, je.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: C,
      switchView: M,
      handleFlow: ce
    }), (p, V) => {
      var pe, $e, Ge;
      return openBlock(), createElementBlock("div", {
        id: p.uid ? `dp-menu-${p.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: c,
        tabindex: "0",
        role: "dialog",
        "aria-label": (pe = p.ariaLabels) == null ? void 0 : pe.menu,
        class: normalizeClass(I.value),
        style: normalizeStyle({ "--dp-arrow-left": A.value }),
        onMouseleave: W,
        onClick: se,
        onKeydown: ue
      }, [
        (p.disabled || p.readonly) && unref(k).enabled || p.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(u.value)
        }, [
          p.loading ? (openBlock(), createElementBlock("div", Gr, qr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        !unref(k).enabled && !p.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(de.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: y,
          class: normalizeClass({
            dp__menu_content_wrapper: (($e = p.presetDates) == null ? void 0 : $e.length) || !!p.$slots["left-sidebar"] || !!p.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((Ge = p.presetDates) == null ? void 0 : Ge.length) || !!p.$slots["left-sidebar"] || !!p.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${S.value}px` })
        }, [
          p.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Xr, [
            renderSlot(p.$slots, "left-sidebar", normalizeProps(guardReactiveProps(o.value)))
          ])) : createCommentVNode("", true),
          p.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(p.presetDates, (ve, vt) => (openBlock(), createElementBlock(Fragment, { key: vt }, [
              ve.slot ? renderSlot(p.$slots, ve.slot, {
                key: 0,
                presetDate: Y,
                label: ve.label,
                value: ve.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(ve.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": ve.testId ?? void 0,
                onClick: withModifiers((ot) => Y(ve.value, ve.noTz), ["prevent"]),
                onKeydown: (ot) => unref(qe)(ot, () => Y(ve.value, ve.noTz), true)
              }, toDisplayString(ve.label), 47, Jr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: N,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(O.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: P
            }, v.value, {
              "flow-step": unref(re),
              onMount: unref(K),
              onUpdateFlowStep: unref(B),
              onResetFlow: unref(fe),
              onFocusMenu: w,
              onSelectDate: V[0] || (V[0] = (ve) => p.$emit("select-date")),
              onDateUpdate: V[1] || (V[1] = (ve) => p.$emit("date-update", ve)),
              onTooltipOpen: V[2] || (V[2] = (ve) => p.$emit("tooltip-open", ve)),
              onTooltipClose: V[3] || (V[3] = (ve) => p.$emit("tooltip-close", ve)),
              onAutoApply: V[4] || (V[4] = (ve) => p.$emit("auto-apply", ve)),
              onRangeStart: V[5] || (V[5] = (ve) => p.$emit("range-start", ve)),
              onRangeEnd: V[6] || (V[6] = (ve) => p.$emit("range-end", ve)),
              onInvalidFixedRange: V[7] || (V[7] = (ve) => p.$emit("invalid-fixed-range", ve)),
              onTimeUpdate: V[8] || (V[8] = (ve) => p.$emit("time-update")),
              onAmPmChange: V[9] || (V[9] = (ve) => p.$emit("am-pm-change", ve)),
              onTimePickerOpen: V[10] || (V[10] = (ve) => p.$emit("time-picker-open", ve)),
              onTimePickerClose: s,
              onRecalculatePosition: z,
              onUpdateMonthYear: V[11] || (V[11] = (ve) => p.$emit("update-month-year", ve)),
              onAutoApplyInvalid: V[12] || (V[12] = (ve) => p.$emit("auto-apply-invalid", ve)),
              onInvalidDate: V[13] || (V[13] = (ve) => p.$emit("invalid-date", ve)),
              onOverlayToggle: V[14] || (V[14] = (ve) => p.$emit("overlay-toggle", ve)),
              "onUpdate:internalModelValue": V[15] || (V[15] = (ve) => p.$emit("update:internal-model-value", ve))
            }), createSlots({ _: 2 }, [
              renderList(ee.value, (ve, vt) => ({
                name: ve,
                fn: withCtx((ot) => [
                  renderSlot(p.$slots, ve, normalizeProps(guardReactiveProps({ ...ot })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          p.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Zr, [
            renderSlot(p.$slots, "right-sidebar", normalizeProps(guardReactiveProps(o.value)))
          ])) : createCommentVNode("", true),
          p.$slots["action-extra"] ? (openBlock(), createElementBlock("div", xr, [
            p.$slots["action-extra"] ? renderSlot(p.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: d
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !p.autoApply || unref(_).keepActionRow ? (openBlock(), createBlock(ql, mergeProps({
          key: 2,
          "menu-mount": F.value
        }, v.value, {
          "calendar-width": S.value,
          onClosePicker: V[16] || (V[16] = (ve) => p.$emit("close-picker")),
          onSelectDate: V[17] || (V[17] = (ve) => p.$emit("select-date")),
          onInvalidSelect: V[18] || (V[18] = (ve) => p.$emit("invalid-select")),
          onSelectNow: d
        }), createSlots({ _: 2 }, [
          renderList(unref(D), (ve, vt) => ({
            name: ve,
            fn: withCtx((ot) => [
              renderSlot(p.$slots, ve, normalizeProps(guardReactiveProps({ ...ot })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Kr);
    };
  }
});
var Ct = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Ct || {});
var eo = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: a,
  inline: n,
  emit: c,
  props: v,
  slots: b
}) => {
  const i = ref({}), L = ref(false), m = ref({
    top: "0",
    left: "0"
  }), E = ref(false), k = toRef(v, "teleportCenter");
  watch(k, () => {
    m.value = JSON.parse(JSON.stringify({})), J();
  });
  const _ = (w) => {
    if (v.teleport) {
      const o = w.getBoundingClientRect();
      return {
        left: o.left + window.scrollX,
        top: o.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, H = (w, o) => {
    m.value.left = `${w + o - i.value.width}px`;
  }, N = (w) => {
    m.value.left = `${w}px`;
  }, S = (w, o) => {
    v.position === Ct.left && N(w), v.position === Ct.right && H(w, o), v.position === Ct.center && (m.value.left = `${w + o / 2 - i.value.width / 2}px`);
  }, y = (w) => {
    const { width: o, height: z } = w.getBoundingClientRect(), { top: D, left: ee } = v.altPosition ? v.altPosition(w) : _(w);
    return { top: +D, left: +ee, width: o, height: z };
  }, F = () => {
    m.value.left = "50%", m.value.top = "50%", m.value.transform = "translate(-50%, -50%)", m.value.position = "fixed", delete m.value.opacity;
  }, P = () => {
    const w = Ie(l), { top: o, left: z, transform: D } = v.altPosition(w);
    m.value = { top: `${o}px`, left: `${z}px`, transform: D ?? "" };
  }, J = (w = true) => {
    var o;
    if (!n.value.enabled) {
      if (k.value) return F();
      if (v.altPosition !== null) return P();
      if (w) {
        const z = v.teleport ? (o = t.value) == null ? void 0 : o.$el : e.value;
        z && (i.value = z.getBoundingClientRect()), c("recalculate-position");
      }
      return K();
    }
  }, Z = ({ inputEl: w, left: o, width: z }) => {
    window.screen.width > 768 && !L.value && S(o, z), R(w);
  }, le = (w) => {
    const { top: o, left: z, height: D, width: ee } = y(w);
    m.value.top = `${D + o + +v.offset}px`, E.value = false, L.value || (m.value.left = `${z + ee / 2 - i.value.width / 2}px`), Z({ inputEl: w, left: z, width: ee });
  }, q = (w) => {
    const { top: o, left: z, width: D } = y(w);
    m.value.top = `${o - +v.offset - i.value.height}px`, E.value = true, Z({ inputEl: w, left: z, width: D });
  }, R = (w) => {
    if (v.autoPosition) {
      const { left: o, width: z } = y(w), { left: D, right: ee } = i.value;
      if (!L.value) {
        if (Math.abs(D) !== Math.abs(ee)) {
          if (D <= 0)
            return L.value = true, N(o);
          if (ee >= document.documentElement.clientWidth)
            return L.value = true, H(o, z);
        }
        return S(o, z);
      }
    }
  }, re = () => {
    const w = Ie(l);
    if (w) {
      const { height: o } = i.value, { top: z, height: D } = w.getBoundingClientRect(), de = window.innerHeight - z - D, u = z;
      return o <= de ? Mt.bottom : o > de && o <= u ? Mt.top : de >= u ? Mt.bottom : Mt.top;
    }
    return Mt.bottom;
  }, B = (w) => re() === Mt.bottom ? le(w) : q(w), K = () => {
    const w = Ie(l);
    if (w)
      return v.autoPosition ? B(w) : le(w);
  }, fe = function(w) {
    if (w) {
      const o = w.scrollHeight > w.clientHeight, D = window.getComputedStyle(w).overflowY.indexOf("hidden") !== -1;
      return o && !D;
    }
    return true;
  }, ce = function(w) {
    return !w || w === document.body || w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : fe(w) ? w : ce(w.assignedSlot ? w.assignedSlot.parentNode : w.parentNode);
  }, O = (w) => {
    if (w)
      switch (v.position) {
        case Ct.left:
          return { left: 0, transform: "translateX(0)" };
        case Ct.right:
          return { left: `${w.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${w.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: E,
    menuStyle: m,
    xCorrect: L,
    setMenuPosition: J,
    getScrollableParent: ce,
    shadowRender: (w, o) => {
      var I, se, f;
      const z = document.createElement("div"), D = (I = Ie(l)) == null ? void 0 : I.getBoundingClientRect();
      z.setAttribute("id", "dp--temp-container");
      const ee = (se = a.value) != null && se.clientWidth ? a.value : document.body;
      ee.append(z);
      const de = O(D), u = h(
        w,
        {
          ...o,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...de }
        },
        Object.fromEntries(
          Object.keys(b).filter((T) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(T)).map((T) => [T, b[T]])
        )
      );
      render(u, z), i.value = (f = u.el) == null ? void 0 : f.getBoundingClientRect(), render(null, z), ee.removeChild(z);
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
  { name: "tp-inline-arrow-down", use: ["shared", "time"] }
];
var to = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var ao = {
  all: () => mt,
  monthYear: () => mt.filter((e) => e.use.includes("month-year")),
  input: () => to,
  timePicker: () => mt.filter((e) => e.use.includes("time")),
  action: () => mt.filter((e) => e.use.includes("action")),
  calendar: () => mt.filter((e) => e.use.includes("calendar")),
  menu: () => mt.filter((e) => e.use.includes("menu")),
  shared: () => mt.filter((e) => e.use.includes("shared")),
  yearMode: () => mt.filter((e) => e.use.includes("year-mode"))
};
var Ze = (e, t, l) => {
  const a = [];
  return ao[t]().forEach((n) => {
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
  const { defaultedRange: a, defaultedTz: n } = Ce(e), c = j(Xe(j(), n.value.timezone)), v = ref([{ month: getMonth(c), year: getYear(c) }]), b = (k) => {
    const _ = {
      hours: getHours(c),
      minutes: getMinutes(c),
      seconds: 0
    };
    return a.value.enabled ? [_[k], _[k]] : _[k];
  }, i = reactive({
    hours: b("hours"),
    minutes: b("minutes"),
    seconds: b("seconds")
  });
  watch(
    a,
    (k, _) => {
      k.enabled !== _.enabled && (i.hours = b("hours"), i.minutes = b("minutes"), i.seconds = b("seconds"));
    },
    { deep: true }
  );
  const L = computed({
    get: () => e.internalModelValue,
    set: (k) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", k);
    }
  }), m = computed(
    () => (k) => v.value[k] ? v.value[k].month : 0
  ), E = computed(
    () => (k) => v.value[k] ? v.value[k].year : 0
  );
  return watch(
    L,
    (k, _) => {
      l && JSON.stringify(k ?? {}) !== JSON.stringify(_ ?? {}) && l();
    },
    { deep: true }
  ), {
    calendars: v,
    time: i,
    modelValue: L,
    month: m,
    year: E,
    today: c
  };
};
var no = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedMultiDates: a,
    defaultedUI: n,
    defaultedHighlight: c,
    defaultedTz: v,
    propDates: b,
    defaultedRange: i
  } = Ce(t), { isDisabled: L } = kt(t), m = ref(null), E = ref(Xe(/* @__PURE__ */ new Date(), v.value.timezone)), k = (f) => {
    !f.current && t.hideOffsetDates || (m.value = f.value);
  }, _ = () => {
    m.value = null;
  }, H = (f) => Array.isArray(e.value) && i.value.enabled && e.value[0] && m.value ? f ? Be(m.value, e.value[0]) : _e(m.value, e.value[0]) : true, N = (f, T) => {
    const Q = () => e.value ? T ? e.value[0] || null : e.value[1] : null, s = e.value && Array.isArray(e.value) ? Q() : null;
    return De(j(f.value), s);
  }, S = (f) => {
    const T = Array.isArray(e.value) ? e.value[0] : null;
    return f ? !_e(m.value ?? null, T) : true;
  }, y = (f, T = true) => (i.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !f.current ? false : De(j(f.value), e.value[T ? 0 : 1]) : i.value.enabled ? N(f, T) && S(T) || De(f.value, Array.isArray(e.value) ? e.value[0] : null) && H(T) : false, F = (f, T) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const Q = De(f.value, m.value);
      return T ? Be(e.value[0], f.value) && Q : _e(e.value[0], f.value) && Q;
    }
    return false;
  }, P = (f) => !e.value || t.hideOffsetDates && !f.current ? false : i.value.enabled ? t.modelAuto && Array.isArray(e.value) ? De(f.value, e.value[0] ? e.value[0] : E.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((T) => De(T, f.value)) : De(f.value, e.value ? e.value : E.value), J = (f) => {
    if (i.value.autoRange || t.weekPicker) {
      if (m.value) {
        if (t.hideOffsetDates && !f.current) return false;
        const T = addDays(m.value, +i.value.autoRange), Q = it(j(m.value), t.weekStart);
        return t.weekPicker ? De(Q[1], j(f.value)) : De(T, j(f.value));
      }
      return false;
    }
    return false;
  }, Z = (f) => {
    if (i.value.autoRange || t.weekPicker) {
      if (m.value) {
        const T = addDays(m.value, +i.value.autoRange);
        if (t.hideOffsetDates && !f.current) return false;
        const Q = it(j(m.value), t.weekStart);
        return t.weekPicker ? Be(f.value, Q[0]) && _e(f.value, Q[1]) : Be(f.value, m.value) && _e(f.value, T);
      }
      return false;
    }
    return false;
  }, le = (f) => {
    if (i.value.autoRange || t.weekPicker) {
      if (m.value) {
        if (t.hideOffsetDates && !f.current) return false;
        const T = it(j(m.value), t.weekStart);
        return t.weekPicker ? De(T[0], f.value) : De(m.value, f.value);
      }
      return false;
    }
    return false;
  }, q = (f) => da(e.value, m.value, f.value), R = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, re = () => t.modelAuto ? Mn(t.internalModelValue) : true, B = (f) => {
    if (t.weekPicker) return false;
    const T = i.value.enabled ? !y(f) && !y(f, false) : true;
    return !L(f.value) && !P(f) && !(!f.current && t.hideOffsetDates) && T;
  }, K = (f) => i.value.enabled ? t.modelAuto ? R() && P(f) : false : P(f), fe = (f) => c.value ? kl(f.value, b.value.highlight) : false, ce = (f) => {
    const T = L(f.value);
    return T && (typeof c.value == "function" ? !c.value(f.value, T) : !c.value.options.highlightDisabled);
  }, O = (f) => {
    var T;
    return typeof c.value == "function" ? c.value(f.value) : (T = c.value.weekdays) == null ? void 0 : T.includes(f.value.getDay());
  }, A = (f) => (i.value.enabled || t.weekPicker) && (!(l.value.count > 0) || f.current) && re() && !(!f.current && t.hideOffsetDates) && !P(f) ? q(f) : false, w = (f) => {
    const { isRangeStart: T, isRangeEnd: Q } = ee(f), s = i.value.enabled ? T || Q : false;
    return {
      dp__cell_offset: !f.current,
      dp__pointer: !t.disabled && !(!f.current && t.hideOffsetDates) && !L(f.value),
      dp__cell_disabled: L(f.value),
      dp__cell_highlight: !ce(f) && (fe(f) || O(f)) && !K(f) && !s && !le(f) && !(A(f) && t.weekPicker) && !Q,
      dp__cell_highlight_active: !ce(f) && (fe(f) || O(f)) && K(f),
      dp__today: !t.noToday && De(f.value, E.value) && f.current,
      "dp--past": _e(f.value, E.value),
      "dp--future": Be(f.value, E.value)
    };
  }, o = (f) => ({
    dp__active_date: K(f),
    dp__date_hover: B(f)
  }), z = (f) => {
    if (e.value && !Array.isArray(e.value)) {
      const T = it(e.value, t.weekStart);
      return {
        ...u(f),
        dp__range_start: De(T[0], f.value),
        dp__range_end: De(T[1], f.value),
        dp__range_between_week: Be(f.value, T[0]) && _e(f.value, T[1])
      };
    }
    return {
      ...u(f)
    };
  }, D = (f) => {
    if (e.value && Array.isArray(e.value)) {
      const T = it(e.value[0], t.weekStart), Q = e.value[1] ? it(e.value[1], t.weekStart) : [];
      return {
        ...u(f),
        dp__range_start: De(T[0], f.value) || De(Q[0], f.value),
        dp__range_end: De(T[1], f.value) || De(Q[1], f.value),
        dp__range_between_week: Be(f.value, T[0]) && _e(f.value, T[1]) || Be(f.value, Q[0]) && _e(f.value, Q[1]),
        dp__range_between: Be(f.value, T[1]) && _e(f.value, Q[0])
      };
    }
    return {
      ...u(f)
    };
  }, ee = (f) => {
    const T = l.value.count > 0 ? f.current && y(f) && re() : y(f) && re(), Q = l.value.count > 0 ? f.current && y(f, false) && re() : y(f, false) && re();
    return { isRangeStart: T, isRangeEnd: Q };
  }, de = (f) => {
    const { isRangeStart: T, isRangeEnd: Q } = ee(f);
    return {
      dp__range_start: T,
      dp__range_end: Q,
      dp__range_between: A(f),
      dp__date_hover: De(f.value, m.value) && !T && !Q && !t.weekPicker,
      dp__date_hover_start: F(f, true),
      dp__date_hover_end: F(f, false)
    };
  }, u = (f) => ({
    ...de(f),
    dp__cell_auto_range: Z(f),
    dp__cell_auto_range_start: le(f),
    dp__cell_auto_range_end: J(f)
  }), I = (f) => i.value.enabled ? i.value.autoRange ? u(f) : t.modelAuto ? { ...o(f), ...de(f) } : t.weekPicker ? D(f) : de(f) : t.weekPicker ? z(f) : o(f);
  return {
    setHoverDate: k,
    clearHoverDate: _,
    getDayClassData: (f) => t.hideOffsetDates && !f.current ? {} : {
      ...w(f),
      ...I(f),
      [t.dayClass ? t.dayClass(f.value, t.internalModelValue) : ""]: true,
      [t.calendarCellClassName]: !!t.calendarCellClassName,
      ...n.value.calendarCell ?? {}
    }
  };
};
var kt = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: a, defaultedMultiDates: n } = Ce(e), c = (O) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(j(O)) : !!sa(O, a.value.disabledDates) : false, v = (O) => a.value.maxDate ? e.yearPicker ? getYear(O) > getYear(a.value.maxDate) : Be(O, a.value.maxDate) : false, b = (O) => a.value.minDate ? e.yearPicker ? getYear(O) < getYear(a.value.minDate) : _e(O, a.value.minDate) : false, i = (O) => {
    const A = v(O), w = b(O), o = c(O), D = t.value.months.map((se) => +se).includes(getMonth(O)), ee = e.disabledWeekDays.length ? e.disabledWeekDays.some((se) => +se === getDay(O)) : false, de = _(O), u = getYear(O), I = u < +e.yearRange[0] || u > +e.yearRange[1];
    return !(A || w || o || D || I || ee || de);
  }, L = (O, A) => _e(...gt(a.value.minDate, O, A)) || De(...gt(a.value.minDate, O, A)), m = (O, A) => Be(...gt(a.value.maxDate, O, A)) || De(...gt(a.value.maxDate, O, A)), E = (O, A, w) => {
    let o = false;
    return a.value.maxDate && w && m(O, A) && (o = true), a.value.minDate && !w && L(O, A) && (o = true), o;
  }, k = (O, A, w, o) => {
    let z = false;
    return o ? a.value.minDate && a.value.maxDate ? z = E(O, A, w) : (a.value.minDate && L(O, A) || a.value.maxDate && m(O, A)) && (z = true) : z = true, z;
  }, _ = (O) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !sa(O, a.value.allowedDates) : false, H = (O) => !i(O), N = (O) => l.value.noDisabledRange ? !eachDayOfInterval({ start: O[0], end: O[1] }).some((w) => H(w)) : true, S = (O) => {
    if (O) {
      const A = getYear(O);
      return A >= +e.yearRange[0] && A <= e.yearRange[1];
    }
    return true;
  }, y = (O, A) => !!(Array.isArray(O) && O[A] && (l.value.maxRange || l.value.minRange) && S(O[A])), F = (O, A, w = 0) => {
    if (y(A, w) && S(O)) {
      const o = differenceInCalendarDays(O, A[w]), z = Pn(A[w], O), D = z.length === 1 ? 0 : z.filter((de) => H(de)).length, ee = Math.abs(o) - (l.value.minMaxRawRange ? 0 : D);
      if (l.value.minRange && l.value.maxRange)
        return ee >= +l.value.minRange && ee <= +l.value.maxRange;
      if (l.value.minRange) return ee >= +l.value.minRange;
      if (l.value.maxRange) return ee <= +l.value.maxRange;
    }
    return true;
  }, P = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, J = (O) => Array.isArray(O) ? [O[0] ? Pa(O[0]) : null, O[1] ? Pa(O[1]) : null] : Pa(O), Z = (O, A, w) => O.find(
    (o) => +o.hours === getHours(A) && o.minutes === "*" ? true : +o.minutes === getMinutes(A) && +o.hours === getHours(A)
  ) && w, le = (O, A, w) => {
    const [o, z] = O, [D, ee] = A;
    return !Z(o, D, w) && !Z(z, ee, w) && w;
  }, q = (O, A) => {
    const w = Array.isArray(A) ? A : [A];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? le(e.disabledTimes, w, O) : !w.some((o) => Z(e.disabledTimes, o, O)) : O;
  }, R = (O, A) => {
    const w = Array.isArray(A) ? [St(A[0]), A[1] ? St(A[1]) : void 0] : St(A), o = !e.disabledTimes(w);
    return O && o;
  }, re = (O, A) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? q(A, O) : R(A, O) : A, B = (O) => {
    let A = true;
    if (!O || P()) return true;
    const w = !a.value.minDate && !a.value.maxDate ? J(O) : O;
    return (e.maxTime || a.value.maxDate) && (A = sn(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ye(w),
      A
    )), (e.minTime || a.value.minDate) && (A = sn(
      e.minTime,
      a.value.minDate,
      "min",
      Ye(w),
      A
    )), re(O, A);
  }, K = (O) => {
    if (!e.monthPicker) return true;
    let A = true;
    const w = j(lt(O));
    if (a.value.minDate && a.value.maxDate) {
      const o = j(lt(a.value.minDate)), z = j(lt(a.value.maxDate));
      return Be(w, o) && _e(w, z) || De(w, o) || De(w, z);
    }
    if (a.value.minDate) {
      const o = j(lt(a.value.minDate));
      A = Be(w, o) || De(w, o);
    }
    if (a.value.maxDate) {
      const o = j(lt(a.value.maxDate));
      A = _e(w, o) || De(w, o);
    }
    return A;
  }, fe = computed(() => (O) => !e.enableTimePicker || e.ignoreTimeValidation ? true : B(O)), ce = computed(() => (O) => e.monthPicker ? Array.isArray(O) && (l.value.enabled || n.value.enabled) ? !O.filter((w) => !K(w)).length : K(O) : true);
  return {
    isDisabled: H,
    validateDate: i,
    validateMonthYearInRange: k,
    isDateRangeAllowed: N,
    checkMinMaxRange: F,
    isValidTime: B,
    isTimeValid: fe,
    isMonthValid: ce
  };
};
var ma = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), l = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var lo = (e, t, l) => {
  const a = ref(0), n = reactive({
    [Tt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Tt.calendar]: false,
    [Tt.header]: false
  }), c = computed(() => e.monthPicker || e.timePicker), v = (E) => {
    var k;
    if ((k = e.flow) != null && k.length) {
      if (!E && c.value) return m();
      n[E] = true, Object.keys(n).filter((_) => !n[_]).length || m();
    }
  }, b = () => {
    var E, k;
    (E = e.flow) != null && E.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), m()), ((k = e.flow) == null ? void 0 : k.length) === a.value && nextTick().then(() => i());
  }, i = () => {
    a.value = -1;
  }, L = (E, k, ..._) => {
    var H, N;
    e.flow[a.value] === E && l.value && ((N = (H = l.value)[k]) == null || N.call(H, ..._));
  }, m = (E = 0) => {
    E && (a.value += E), L(He.month, "toggleMonthPicker", true), L(He.year, "toggleYearPicker", true), L(He.calendar, "toggleTimePicker", false, true), L(He.time, "toggleTimePicker", true, true);
    const k = e.flow[a.value];
    (k === He.hours || k === He.minutes || k === He.seconds) && L(k, "toggleTimePicker", true, true, k);
  };
  return { childMount: v, updateFlowStep: b, resetFlow: i, handleFlow: m, flowStep: a };
};
var ro = {
  key: 1,
  class: "dp__input_wrap"
};
var oo = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var so = {
  key: 2,
  class: "dp__clear_icon"
};
var uo = defineComponent({
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
    "real-blur"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTextInput: c,
      defaultedAriaLabels: v,
      defaultedInline: b,
      defaultedConfig: i,
      defaultedRange: L,
      defaultedMultiDates: m,
      defaultedUI: E,
      getDefaultPattern: k,
      getDefaultStartTime: _
    } = Ce(n), { checkMinMaxRange: H } = kt(n), N = ref(), S = ref(null), y = ref(false), F = ref(false), P = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !c.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !c.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: !!n.state,
        dp__input_invalid: n.state === false,
        dp__input_focus: y.value || n.isMenuOpen,
        dp__input_reg: !c.value.enabled,
        [n.inputClassName]: !!n.inputClassName,
        ...E.value.input ?? {}
      })
    ), J = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), N.value = null);
    }, Z = (D) => {
      const ee = _();
      return wl(
        D,
        c.value.format ?? k(),
        ee ?? Rn({}, n.enableSeconds),
        n.inputValue,
        F.value,
        n.formatLocale
      );
    }, le = (D) => {
      const { rangeSeparator: ee } = c.value, [de, u] = D.split(`${ee}`);
      if (de) {
        const I = Z(de.trim()), se = u ? Z(u.trim()) : null;
        if (isAfter(I, se)) return;
        const f = I && se ? [I, se] : [I];
        H(se, f, 0) && (N.value = I ? f : null);
      }
    }, q = () => {
      F.value = true;
    }, R = (D) => {
      if (L.value.enabled)
        le(D);
      else if (m.value.enabled) {
        const ee = D.split(";");
        N.value = ee.map((de) => Z(de.trim())).filter((de) => de);
      } else
        N.value = Z(D);
    }, re = (D) => {
      var de;
      const ee = typeof D == "string" ? D : (de = D.target) == null ? void 0 : de.value;
      ee !== "" ? (c.value.openMenu && !n.isMenuOpen && a("open"), R(ee), a("set-input-date", N.value)) : J(), F.value = false, a("update:input-value", ee);
    }, B = (D) => {
      c.value.enabled ? (R(D.target.value), c.value.enterSubmit && Ea(N.value) && n.inputValue !== "" ? (a("set-input-date", N.value, true), N.value = null) : c.value.enterSubmit && n.inputValue === "" && (N.value = null, a("clear"))) : ce(D);
    }, K = (D) => {
      c.value.enabled && c.value.tabSubmit && R(D.target.value), c.value.tabSubmit && Ea(N.value) && n.inputValue !== "" ? (a("set-input-date", N.value, true, true), N.value = null) : c.value.tabSubmit && n.inputValue === "" && (N.value = null, a("clear", true));
    }, fe = () => {
      y.value = true, a("focus"), nextTick().then(() => {
        var D;
        c.value.enabled && c.value.selectOnFocus && ((D = S.value) == null || D.select());
      });
    }, ce = (D) => {
      D.preventDefault(), yt(D, i.value, true), c.value.enabled && c.value.openMenu && !b.value.input && !n.isMenuOpen ? a("open") : c.value.enabled || a("toggle");
    }, O = () => {
      a("real-blur"), y.value = false, (!n.isMenuOpen || b.value.enabled && b.value.input) && a("blur"), n.autoApply && c.value.enabled && N.value && !n.isMenuOpen && (a("set-input-date", N.value), a("select-date"), N.value = null);
    }, A = (D) => {
      yt(D, i.value, true), a("clear");
    }, w = (D) => {
      if (D.key === "Tab" && K(D), D.key === "Enter" && B(D), !c.value.enabled) {
        if (D.code === "Tab") return;
        D.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var D;
        (D = S.value) == null || D.focus({ preventScroll: true });
      },
      setParsedDate: (D) => {
        N.value = D;
      }
    }), (D, ee) => {
      var de;
      return openBlock(), createElementBlock("div", { onClick: ce }, [
        D.$slots.trigger && !D.$slots["dp-input"] && !unref(b).enabled ? renderSlot(D.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !D.$slots.trigger && (!unref(b).enabled || unref(b).input) ? (openBlock(), createElementBlock("div", ro, [
          D.$slots["dp-input"] && !D.$slots.trigger && (!unref(b).enabled || unref(b).enabled && unref(b).input) ? renderSlot(D.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: re,
            onEnter: B,
            onTab: K,
            onClear: A,
            onBlur: O,
            onKeypress: w,
            onPaste: q,
            onFocus: fe,
            openMenu: () => D.$emit("open"),
            closeMenu: () => D.$emit("close"),
            toggleMenu: () => D.$emit("toggle")
          }) : createCommentVNode("", true),
          D.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: D.uid ? `dp-input-${D.uid}` : void 0,
            ref_key: "inputRef",
            ref: S,
            "data-test": "dp-input",
            name: D.name,
            class: normalizeClass(P.value),
            inputmode: unref(c).enabled ? "text" : "none",
            placeholder: D.placeholder,
            disabled: D.disabled,
            readonly: D.readonly,
            required: D.required,
            value: e.inputValue,
            autocomplete: D.autocomplete,
            "aria-label": (de = unref(v)) == null ? void 0 : de.input,
            "aria-disabled": D.disabled || void 0,
            "aria-invalid": D.state === false ? true : void 0,
            onInput: re,
            onBlur: O,
            onFocus: fe,
            onKeypress: w,
            onKeydown: w,
            onPaste: q
          }, null, 42, oo)),
          createBaseVNode("div", {
            onClick: ee[2] || (ee[2] = (u) => a("toggle"))
          }, [
            D.$slots["input-icon"] && !D.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: ee[0] || (ee[0] = (u) => a("toggle"))
            }, [
              renderSlot(D.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !D.$slots["input-icon"] && !D.hideInputIcon && !D.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: ee[1] || (ee[1] = (u) => a("toggle"))
            })) : createCommentVNode("", true)
          ]),
          D.$slots["clear-icon"] && e.inputValue && D.clearable && !D.disabled && !D.readonly ? (openBlock(), createElementBlock("span", so, [
            renderSlot(D.$slots, "clear-icon", { clear: A })
          ])) : createCommentVNode("", true),
          D.clearable && !D.$slots["clear-icon"] && e.inputValue && !D.disabled && !D.readonly ? (openBlock(), createBlock(unref(wn), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: ee[3] || (ee[3] = withModifiers((u) => A(u), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var io = typeof window < "u" ? window : void 0;
var Ya = () => {
};
var co = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var fo = (e, t, l, a) => {
  if (!e) return Ya;
  let n = Ya;
  const c = watch(
    () => unref(e),
    (b) => {
      n(), b && (b.addEventListener(t, l, a), n = () => {
        b.removeEventListener(t, l, a), n = Ya;
      });
    },
    { immediate: true, flush: "post" }
  ), v = () => {
    c(), n();
  };
  return co(v), v;
};
var vo = (e, t, l, a = {}) => {
  const { window: n = io, event: c = "pointerdown" } = a;
  return n ? fo(n, c, (b) => {
    const i = Ie(e), L = Ie(t);
    !i || !L || i === b.target || b.composedPath().includes(i) || b.composedPath().includes(L) || l(b);
  }, { passive: true }) : void 0;
};
var mo = defineComponent({
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
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, c = useSlots(), v = ref(false), b = toRef(n, "modelValue"), i = toRef(n, "timezone"), L = ref(null), m = ref(null), E = ref(null), k = ref(false), _ = ref(null), H = ref(false), N = ref(false), S = ref(false), y = ref(false), { setMenuFocused: F, setShiftKey: P } = Yn(), { clearArrowNav: J } = bt(), { validateDate: Z, isValidTime: le } = kt(n), {
      defaultedTransitions: q,
      defaultedTextInput: R,
      defaultedInline: re,
      defaultedConfig: B,
      defaultedRange: K,
      defaultedMultiDates: fe
    } = Ce(n), { menuTransition: ce, showTransition: O } = Xt(q);
    onMounted(() => {
      f(n.modelValue), nextTick().then(() => {
        if (!re.value.enabled) {
          const g = de(_.value);
          g == null || g.addEventListener("scroll", C), window == null || window.addEventListener("resize", te);
        }
      }), re.value.enabled && (v.value = true), window == null || window.addEventListener("keyup", ue), window == null || window.addEventListener("keydown", p);
    }), onUnmounted(() => {
      if (!re.value.enabled) {
        const g = de(_.value);
        g == null || g.removeEventListener("scroll", C), window == null || window.removeEventListener("resize", te);
      }
      window == null || window.removeEventListener("keyup", ue), window == null || window.removeEventListener("keydown", p);
    });
    const A = Ze(c, "all", n.presetDates), w = Ze(c, "input");
    watch(
      [b, i],
      () => {
        f(b.value);
      },
      { deep: true }
    );
    const { openOnTop: o, menuStyle: z, xCorrect: D, setMenuPosition: ee, getScrollableParent: de, shadowRender: u } = eo({
      menuRef: L,
      menuRefInner: m,
      inputRef: E,
      pickerWrapperRef: _,
      inline: re,
      emit: a,
      props: n,
      slots: c
    }), {
      inputValue: I,
      internalModelValue: se,
      parseExternalModelValue: f,
      emitModelValue: T,
      formatInputValue: Q,
      checkBeforeEmit: s
    } = jl(a, n, k), oe = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: re.value.enabled,
        "dp--flex-display-collapsed": S.value,
        dp__flex_display_with_input: re.value.input
      })
    ), M = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), me = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || re.value.enabled
    } : {}), d = computed(() => ({ class: "dp__outer_menu_wrap" })), Y = computed(() => re.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), W = () => {
      var g, U;
      return (U = (g = E.value) == null ? void 0 : g.$el) == null ? void 0 : U.getBoundingClientRect();
    }, C = () => {
      v.value && (B.value.closeOnScroll ? Je() : ee());
    }, te = () => {
      var U;
      v.value && ee();
      const g = (U = m.value) == null ? void 0 : U.$el.getBoundingClientRect().width;
      S.value = document.body.offsetWidth <= g;
    }, ue = (g) => {
      g.key === "Tab" && !re.value.enabled && !n.teleport && B.value.tabOutClosesMenu && (_.value.contains(document.activeElement) || Je()), N.value = g.shiftKey;
    }, p = (g) => {
      N.value = g.shiftKey;
    }, V = () => {
      !n.disabled && !n.readonly && (u(fn, n), ee(false), v.value = true, v.value && a("open"), v.value || Ft(), f(n.modelValue));
    }, pe = () => {
      var g;
      I.value = "", Ft(), (g = E.value) == null || g.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), B.value.closeOnClearValue && Je();
    }, $e = () => {
      const g = se.value;
      return !g || !Array.isArray(g) && Z(g) ? true : Array.isArray(g) ? fe.value.enabled || g.length === 2 && Z(g[0]) && Z(g[1]) ? true : K.value.partialRange && !n.timePicker ? Z(g[0]) : false : false;
    }, Ge = () => {
      s() && $e() ? (T(), Je()) : a("invalid-select", se.value);
    }, ve = (g) => {
      vt(), T(), B.value.closeOnAutoApply && !g && Je();
    }, vt = () => {
      E.value && R.value.enabled && E.value.setParsedDate(se.value);
    }, ot = (g = false) => {
      n.autoApply && le(se.value) && $e() && (K.value.enabled && Array.isArray(se.value) ? (K.value.partialRange || se.value.length === 2) && ve(g) : ve(g));
    }, Ft = () => {
      R.value.enabled || (se.value = null);
    }, Je = () => {
      re.value.enabled || (v.value && (v.value = false, D.value = false, F(false), P(false), J(), a("closed"), I.value && f(b.value)), Ft(), a("blur"));
    }, Lt = (g, U, ne = false) => {
      if (!g) {
        se.value = null;
        return;
      }
      const Ae = Array.isArray(g) ? !g.some((wt) => !Z(wt)) : Z(g), Fe = le(g);
      Ae && Fe && (y.value = true, se.value = g, U && (H.value = ne, Ge(), a("text-submit")), nextTick().then(() => {
        y.value = false;
      }));
    }, ga = () => {
      n.autoApply && le(se.value) && T(), vt();
    }, Zt = () => v.value ? Je() : V(), ya = (g) => {
      se.value = g;
    }, pa = () => {
      R.value.enabled && (k.value = true, Q()), a("focus");
    }, ha = () => {
      if (R.value.enabled && (k.value = false, f(n.modelValue), H.value)) {
        const g = hl(_.value, N.value);
        g == null || g.focus();
      }
      a("blur");
    }, ba = (g) => {
      m.value && m.value.updateMonthYear(0, {
        month: ln(g.month),
        year: ln(g.year)
      });
    }, ka = (g) => {
      f(g ?? n.modelValue);
    }, wa = (g, U) => {
      var ne;
      (ne = m.value) == null || ne.switchView(g, U);
    }, Ja = (g) => B.value.onClickOutside ? B.value.onClickOutside(g) : Je(), h2 = (g = 0) => {
      var U;
      (U = m.value) == null || U.handleFlow(g);
    };
    return vo(L, E, () => Ja($e)), t({
      closeMenu: Je,
      selectDate: Ge,
      clearValue: pe,
      openMenu: V,
      onScroll: C,
      formatInputValue: Q,
      // exposed for testing purposes
      updateInternalModelValue: ya,
      // modify internal modelValue
      setMonthYear: ba,
      parseModel: ka,
      switchView: wa,
      toggleMenu: Zt,
      handleFlow: h2
    }), (g, U) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: _,
      class: normalizeClass(oe.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(uo, mergeProps({
        ref_key: "inputRef",
        ref: E,
        "input-value": unref(I),
        "onUpdate:inputValue": U[0] || (U[0] = (ne) => isRef(I) ? I.value = ne : null),
        "is-menu-open": v.value
      }, g.$props, {
        onClear: pe,
        onOpen: V,
        onSetInputDate: Lt,
        onSetEmptyDate: unref(T),
        onSelectDate: Ge,
        onToggle: Zt,
        onClose: Je,
        onFocus: pa,
        onBlur: ha,
        onRealBlur: U[1] || (U[1] = (ne) => k.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(w), (ne, Ae) => ({
          name: ne,
          fn: withCtx((Fe) => [
            renderSlot(g.$slots, ne, normalizeProps(guardReactiveProps(Fe)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(g.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(me.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(ce)(unref(o)),
            css: unref(O) && !unref(re).enabled
          }, {
            default: withCtx(() => [
              v.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: L
              }, d.value, {
                class: { "dp--menu-wrapper": !unref(re).enabled },
                style: unref(re).enabled ? void 0 : unref(z)
              }), [
                createVNode(fn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: m
                }, g.$props, {
                  "internal-model-value": unref(se),
                  "onUpdate:internalModelValue": U[2] || (U[2] = (ne) => isRef(se) ? se.value = ne : null),
                  class: { [M.value]: true, "dp--menu-wrapper": g.teleport },
                  "open-on-top": unref(o),
                  "no-overlay-focus": Y.value,
                  collapse: S.value,
                  "get-input-rect": W,
                  "is-text-input-date": y.value,
                  onClosePicker: Je,
                  onSelectDate: Ge,
                  onAutoApply: ot,
                  onTimeUpdate: ga,
                  onFlowStep: U[3] || (U[3] = (ne) => g.$emit("flow-step", ne)),
                  onUpdateMonthYear: U[4] || (U[4] = (ne) => g.$emit("update-month-year", ne)),
                  onInvalidSelect: U[5] || (U[5] = (ne) => g.$emit("invalid-select", unref(se))),
                  onAutoApplyInvalid: U[6] || (U[6] = (ne) => g.$emit("invalid-select", ne)),
                  onInvalidFixedRange: U[7] || (U[7] = (ne) => g.$emit("invalid-fixed-range", ne)),
                  onRecalculatePosition: unref(ee),
                  onTooltipOpen: U[8] || (U[8] = (ne) => g.$emit("tooltip-open", ne)),
                  onTooltipClose: U[9] || (U[9] = (ne) => g.$emit("tooltip-close", ne)),
                  onTimePickerOpen: U[10] || (U[10] = (ne) => g.$emit("time-picker-open", ne)),
                  onTimePickerClose: U[11] || (U[11] = (ne) => g.$emit("time-picker-close", ne)),
                  onAmPmChange: U[12] || (U[12] = (ne) => g.$emit("am-pm-change", ne)),
                  onRangeStart: U[13] || (U[13] = (ne) => g.$emit("range-start", ne)),
                  onRangeEnd: U[14] || (U[14] = (ne) => g.$emit("range-end", ne)),
                  onDateUpdate: U[15] || (U[15] = (ne) => g.$emit("date-update", ne)),
                  onInvalidDate: U[16] || (U[16] = (ne) => g.$emit("invalid-date", ne)),
                  onOverlayToggle: U[17] || (U[17] = (ne) => g.$emit("overlay-toggle", ne))
                }), createSlots({ _: 2 }, [
                  renderList(unref(A), (ne, Ae) => ({
                    name: ne,
                    fn: withCtx((Fe) => [
                      renderSlot(g.$slots, ne, normalizeProps(guardReactiveProps({ ...Fe })))
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
var Hn = (() => {
  const e = mo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var go = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(go).forEach(([e, t]) => {
  e !== "default" && (Hn[e] = t);
});
export {
  Hn as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
