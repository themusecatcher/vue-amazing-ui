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
} from "./chunk-FHZO4SJ4.js";
import {
  __publicField
} from "./chunk-LNEMQRCO.js";

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
  if (isNaN(amount))
    return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addMonths.mjs
function addMonths(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount))
    return constructFrom(date, NaN);
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

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/eachDayOfInterval.mjs
function eachDayOfInterval(interval, options) {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);
  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startDate : +endDate;
  const currentDate = reversed ? endDate : startDate;
  currentDate.setHours(0, 0, 0, 0);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step)
    return [];
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
  if (!step)
    return [];
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
    if (!matchResult)
      return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
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
      if (hours === 0)
        hours = 12;
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
    if (hours === 0)
      hours = 24;
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
  if (throwTokens.includes(token))
    throw new RangeError(_message);
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
    if (!part.isToken)
      return part.value;
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
    if (flags.timestampIsSet)
      return date;
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
    if (flags.timestampIsSet)
      return date;
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
    if (flags.timestampIsSet)
      return date;
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

// node_modules/.pnpm/@vuepic+vue-datepicker@8.6.0_vue@3.4.27_typescript@5.4.5_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Yt() {
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
Yt.compatConfig = {
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
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
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
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
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
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Wa.compatConfig = {
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
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
za.compatConfig = {
  MODE: 3
};
var st = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var Mn = (e, t) => {
  const l = Ba(e, t);
  return l || W();
};
var rl = (e, t) => t.dateInTz ? st(new Date(e), t.dateInTz) : W(e);
var Ba = (e, t) => {
  if (!e)
    return null;
  if (!t)
    return W(e);
  const l = W(e);
  return t.exactMatch ? rl(e, t) : st(l, t.timezone);
};
var ol = (e) => {
  if (!e)
    return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), n = new Date(t.toLocaleString("en-US", { timeZone: e })), a = n.getTimezoneOffset() / 60;
  return (+l - +n) / (1e3 * 60 * 60) - a;
};
var xe = ((e) => (e.month = "month", e.year = "year", e))(xe || {});
var kt = ((e) => (e.top = "top", e.bottom = "bottom", e))(kt || {});
var Dt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Dt || {});
var Le = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(Le || {});
var sl = ["timestamp", "date", "iso"];
var ze = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(ze || {});
var Re = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Re || {});
function an(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function ul(e) {
  return (t) => format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var il = (e, t, l) => {
  const n = [1, 2, 3, 4, 5, 6, 7];
  let a;
  if (e !== null)
    try {
      a = n.map(ul(e));
    } catch {
      a = n.map(an(t));
    }
  else
    a = n.map(an(t));
  const m = a.slice(0, l), v = a.slice(l + 1, a.length);
  return [a[l]].concat(...v).concat(...m);
};
var Ua = (e, t, l) => {
  const n = [];
  for (let a = +e[0]; a <= +e[1]; a++)
    n.push({ value: +a, text: Tn(a, t) });
  return l ? n.reverse() : n;
};
var Dn = (e, t, l) => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
    const v = m < 10 ? `0${m}` : m;
    return /* @__PURE__ */ new Date(`2017-${v}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const m = l === "long" ? "MMMM" : "MMM";
      return n.map((v, r) => {
        const P = format(st(v, "UTC"), m, { locale: e });
        return {
          text: P.charAt(0).toUpperCase() + P.substring(1),
          value: r
        };
      });
    } catch {
    }
  const a = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return n.map((m, v) => {
    const r = a.format(m);
    return {
      text: r.charAt(0).toUpperCase() + r.substring(1),
      value: v
    };
  });
};
var dl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ye = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var cl = (e) => ({ type: "dot", ...e ?? {} });
var $n = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var ja = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Be = (e) => e;
var nn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var ln = (e) => e === null;
var An = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var fl = (e) => {
  const t = [], l = (n) => n.filter((a) => a);
  for (let n = 0; n < e.length; n += 3) {
    const a = [e[n], e[n + 1], e[n + 2]];
    t.push(l(a));
  }
  return t;
};
var Ut = (e, t, l) => {
  const n = l != null, a = t != null;
  if (!n && !a)
    return false;
  const m = +l, v = +t;
  return n && a ? +e > m || +e < v : n ? +e > m : a ? +e < v : false;
};
var _t = (e, t) => fl(e).map((l) => l.map((n) => {
  const { active: a, disabled: m, isBetween: v, highlighted: r } = t(n);
  return {
    ...n,
    active: a,
    disabled: m,
    className: {
      dp__overlay_cell_active: a,
      dp__overlay_cell: !a,
      dp__overlay_cell_disabled: m,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: m && a,
      dp__cell_in_between: v,
      "dp--highlighted": r
    }
  };
}));
var mt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var vl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function ml(e, t) {
  let l = [...document.querySelectorAll(vl())];
  l = l.filter((a) => !e.contains(a) || a.hasAttribute("data-datepicker-instance"));
  const n = l.indexOf(e);
  if (n >= 0 && (t ? n - 1 >= 0 : n + 1 <= l.length))
    return l[n + (t ? -1 : 1)];
}
var pl = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Tn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Ka = (e) => format(e, "dd-MM-yyyy");
var wa = (e) => Array.isArray(e);
var na = (e, t) => t.get(Ka(e));
var gl = (e, t) => e ? t ? t instanceof Map ? !!na(e, t) : t(W(e)) : false : true;
var je = (e, t, l = false) => {
  if (e.key === Re.enter || e.key === Re.space)
    return l && e.preventDefault(), t();
};
var rn = (e, t, l, n, a, m) => {
  const v = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: m });
  return isValid(v) && isDate(v) ? n || a ? v : set(v, {
    hours: +l.hours,
    minutes: +(l == null ? void 0 : l.minutes),
    seconds: +(l == null ? void 0 : l.seconds),
    milliseconds: 0
  }) : null;
};
var yl = (e, t, l, n, a, m) => {
  const v = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return rn(e, t, v, n, a, m);
  if (Array.isArray(t)) {
    let r = null;
    for (const P of t)
      if (r = rn(e, P, v, n, a, m), r)
        break;
    return r;
  }
  return typeof t == "function" ? t(e) : null;
};
var W = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var hl = (e, t, l) => {
  if (t) {
    const a = (e.getMonth() + 1).toString().padStart(2, "0"), m = e.getDate().toString().padStart(2, "0"), v = e.getHours().toString().padStart(2, "0"), r = e.getMinutes().toString().padStart(2, "0"), P = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${a}-${m}T${v}:${r}:${P}.000Z`;
  }
  const n = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(n).toISOString();
};
var qe = (e) => {
  let t = W(JSON.parse(JSON.stringify(e)));
  return t = setHours(t, 0), t = setMinutes(t, 0), t = setSeconds(t, 0), t = setMilliseconds(t, 0), t;
};
var pt = (e, t, l, n) => {
  let a = e ? W(e) : W();
  return (t || t === 0) && (a = setHours(a, +t)), (l || l === 0) && (a = setMinutes(a, +l)), (n || n === 0) && (a = setSeconds(a, +n)), setMilliseconds(a, 0);
};
var Ce = (e, t) => !e || !t ? false : isBefore(qe(e), qe(t));
var he = (e, t) => !e || !t ? false : isEqual(qe(e), qe(t));
var Oe = (e, t) => !e || !t ? false : isAfter(qe(e), qe(t));
var oa = (e, t, l) => e != null && e[0] && (e != null && e[1]) ? Oe(l, e[0]) && Ce(l, e[1]) : e != null && e[0] && t ? Oe(l, e[0]) && Ce(l, t) || Ce(l, e[0]) && Oe(l, t) : false;
var et = (e) => {
  const t = set(new Date(e), { date: 1 });
  return qe(t);
};
var Ma = (e, t, l) => t && (l || l === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((n) => n === t ? [n, l] : [n, isNaN(+e[n]) ? void 0 : +e[n]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var $t = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Sn = (e, t) => {
  if (t) {
    const l = getYear(W(t));
    if (l > e)
      return 12;
    if (l === e)
      return getMonth(W(t));
  }
};
var Rn = (e, t) => {
  if (t) {
    const l = getYear(W(t));
    return l < e ? -1 : l === e ? getMonth(W(t)) : void 0;
  }
};
var Ot = (e) => {
  if (e)
    return getYear(W(e));
};
var Pn = (e, t) => {
  const l = Oe(e, t) ? t : e, n = Oe(t, e) ? t : e;
  return eachDayOfInterval({ start: l, end: n });
};
var bl = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var ut = (e, t) => {
  const l = startOfWeek(e, { weekStartsOn: +t }), n = endOfWeek(e, { weekStartsOn: +t });
  return [l, n];
};
var Cn = (e, t) => {
  const l = {
    hours: getHours(W()),
    minutes: getMinutes(W()),
    seconds: t ? getSeconds(W()) : 0
  };
  return Object.assign(l, e);
};
var vt = (e, t, l) => [set(W(e), { date: 1 }), set(W(), { month: t, year: l, date: 1 })];
var it = (e, t, l) => {
  let n = e ? W(e) : W();
  return (t || t === 0) && (n = setMonth(n, t)), l && (n = setYear(n, l)), n;
};
var _n = (e, t, l, n, a) => {
  if (!n || a && !t || !a && !l)
    return false;
  const m = a ? addMonths(e, 1) : subMonths(e, 1), v = [getMonth(m), getYear(m)];
  return a ? !wl(...v, t) : !kl(...v, l);
};
var kl = (e, t, l) => Ce(...vt(l, e, t)) || he(...vt(l, e, t));
var wl = (e, t, l) => Oe(...vt(l, e, t)) || he(...vt(l, e, t));
var On = (e, t, l, n, a, m, v) => {
  if (typeof t == "function" && !v)
    return t(e);
  const r = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], m, r)}${a && !e[1] ? "" : n}${e[1] ? format(e[1], m, r) : ""}` : format(e, m, r);
};
var Tt = (e) => {
  if (e)
    return null;
  throw new Error(ja.prop("partial-range"));
};
var Zt = (e, t) => {
  if (t)
    return e();
  throw new Error(ja.prop("range"));
};
var Ya = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Ml = (e, t) => set(t ?? W(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Da = (e, t, l, n) => {
  if (!e)
    return true;
  if (n) {
    const a = l === "max" ? isBefore(e, t) : isAfter(e, t), m = { seconds: 0, milliseconds: 0 };
    return a || isEqual(set(e, m), set(t, m));
  }
  return l === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var $a = (e, t, l) => e ? Ml(e, t) : W(l ?? t);
var on = (e, t, l, n, a) => {
  if (Array.isArray(n)) {
    const v = $a(e, n[0], t), r = $a(e, n[1], t);
    return Da(n[0], v, l, !!t) && Da(n[1], r, l, !!t) && a;
  }
  const m = $a(e, n, t);
  return Da(n, m, l, !!t) && a;
};
var Aa = (e) => set(W(), $t(e));
var Dl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(W(l)) === t).map((l) => getMonth(l)) : [];
var Bn = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((n) => n.month === t && n.year === l);
var Ga = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Lt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Yn = () => {
  const e = (n) => {
    Lt.menuFocused = n;
  }, t = (n) => {
    Lt.shiftKeyInMenu !== n && (Lt.shiftKeyInMenu = n);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Lt.shiftKeyInMenu, menuFocused: Lt.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Te = reactive({
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
var Ta = ref(null);
var xt = ref(false);
var Sa = ref(false);
var Ra = ref(false);
var Pa = ref(false);
var Fe = ref(0);
var _e = ref(0);
var yt = () => {
  const e = computed(() => xt.value ? [...Te.selectionGrid, Te.actionRow].filter((b) => b.length) : Sa.value ? [
    ...Te.timePicker[0],
    ...Te.timePicker[1],
    Pa.value ? [] : [Ta.value],
    Te.actionRow
  ].filter((b) => b.length) : Ra.value ? [...Te.monthPicker, Te.actionRow] : [Te.monthYear, ...Te.calendar, Te.time, Te.actionRow].filter((b) => b.length)), t = (b) => {
    Fe.value = b ? Fe.value + 1 : Fe.value - 1;
    let E = null;
    e.value[_e.value] && (E = e.value[_e.value][Fe.value]), !E && e.value[_e.value + (b ? 1 : -1)] ? (_e.value = _e.value + (b ? 1 : -1), Fe.value = b ? 0 : e.value[_e.value].length - 1) : E || (Fe.value = b ? Fe.value - 1 : Fe.value + 1);
  }, l = (b) => {
    if (_e.value === 0 && !b || _e.value === e.value.length && b)
      return;
    _e.value = b ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][Fe.value] && Fe.value !== 0 && (Fe.value = e.value[_e.value].length - 1) : _e.value = b ? _e.value - 1 : _e.value + 1;
  }, n = (b) => {
    let E = null;
    e.value[_e.value] && (E = e.value[_e.value][Fe.value]), E ? E.focus({ preventScroll: !xt.value }) : Fe.value = b ? Fe.value - 1 : Fe.value + 1;
  }, a = () => {
    t(true), n(true);
  }, m = () => {
    t(false), n(false);
  }, v = () => {
    l(false), n(true);
  }, r = () => {
    l(true), n(true);
  }, P = (b, E) => {
    Te[E] = b;
  }, C = (b, E) => {
    Te[E] = b;
  }, k = () => {
    Fe.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: P,
    buildMultiLevelMatrix: C,
    setTimePickerBackRef: (b) => {
      Ta.value = b;
    },
    setSelectionGrid: (b) => {
      xt.value = b, k(), b || (Te.selectionGrid = []);
    },
    setTimePicker: (b, E = false) => {
      Sa.value = b, Pa.value = E, k(), b || (Te.timePicker[0] = [], Te.timePicker[1] = []);
    },
    setTimePickerElements: (b, E = 0) => {
      Te.timePicker[E] = b;
    },
    arrowRight: a,
    arrowLeft: m,
    arrowUp: v,
    arrowDown: r,
    clearArrowNav: () => {
      Te.monthYear = [], Te.calendar = [], Te.time = [], Te.actionRow = [], Te.selectionGrid = [], Te.timePicker[0] = [], Te.timePicker[1] = [], xt.value = false, Sa.value = false, Pa.value = false, Ra.value = false, k(), Ta.value = null;
    },
    setMonthPicker: (b) => {
      Ra.value = b, k();
    },
    refSets: Te
    // exposed for testing
  };
};
var sn = (e) => ({
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
var $l = (e) => ({
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
var un = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Al = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...l, count: un(false) };
  const n = t ? e : {}, a = t ? n.count ?? true : e, m = un(a);
  return Object.assign(l, n, { count: m });
};
var Tl = (e, t, l) => e || (typeof l == "string" ? l : t);
var Sl = (e) => typeof e == "boolean" ? e ? sn({}) : false : sn(e);
var Rl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Pl = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Cl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var _l = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Ol = (e) => ({ ...{
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
var Bl = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((l) => W(l)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var Yl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Il = (e, t) => {
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
var Nl = (e, t) => e ? typeof e == "string" ? { timezone: e, exactMatch: false, dateInTz: void 0, emitTimezone: t, convertModel: true } : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: t ?? e.emitTimezone,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: t };
var Ca = (e, t) => new Map(
  e.map((l) => {
    const n = Mn(l, t);
    return [Ka(n), n];
  })
);
var El = (e, t) => e.length ? new Map(
  e.map((l) => {
    const n = Mn(l.date, t);
    return [Ka(n), l];
  })
) : null;
var Fl = (e, t, l, n, a, m, v) => ({
  minDate: Ba(e, v),
  maxDate: Ba(t, v),
  disabledDates: wa(l) ? Ca(l, v) : l,
  allowedDates: wa(n) ? Ca(n, v) : null,
  highlight: typeof a == "object" && wa(a == null ? void 0 : a.dates) ? Ca(a.dates, v) : a,
  markers: El(m, v)
});
var Ll = (e, t) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: +t } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Pe = (e) => {
  const t = () => {
    const F = e.enableSeconds ? ":ss" : "", B = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${B}${F}` : `hh${B}${F} aa`;
  }, l = () => {
    var F;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((F = O.value) == null ? void 0 : F.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, n = (F) => Cn(F, e.enableSeconds), a = () => X.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [n(e.startTime[0]), n(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? n(e.startTime) : null, m = computed(() => Al(e.multiCalendars)), v = computed(() => a()), r = computed(() => $l(e.ariaLabels)), P = computed(() => Pl(e.filters)), C = computed(() => Sl(e.transitions)), k = computed(() => Cl(e.actionRow)), g = computed(
    () => Tl(e.previewFormat, e.format, l())
  ), h2 = computed(() => Rl(e.textInput)), _ = computed(() => _l(e.inline)), j = computed(() => Ol(e.config)), T = computed(() => Bl(e.highlight)), O = computed(() => Yl(e.weekNumbers)), b = computed(() => Nl(e.timezone, e.emitTimezone)), E = computed(() => Ll(e.multiDates, e.multiDatesLimit)), I = computed(
    () => Fl(
      e.minDate,
      e.maxDate,
      e.disabledDates,
      e.allowedDates,
      T.value,
      e.markers,
      b.value
    )
  ), X = computed(
    () => Il(e.range, {
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
  );
  return {
    defaultedTransitions: C,
    defaultedMultiCalendars: m,
    defaultedStartTime: v,
    defaultedAriaLabels: r,
    defaultedFilters: P,
    defaultedActionRow: k,
    defaultedPreviewFormat: g,
    defaultedTextInput: h2,
    defaultedInline: _,
    defaultedConfig: j,
    defaultedHighlight: T,
    defaultedWeekNumbers: O,
    defaultedRange: X,
    propDates: I,
    defaultedTz: b,
    defaultedMultiDates: E,
    getDefaultPattern: l,
    getDefaultStartTime: a
  };
};
var Hl = (e, t, l) => {
  const n = ref(), { defaultedTextInput: a, defaultedRange: m, defaultedTz: v, defaultedMultiDates: r, getDefaultPattern: P } = Pe(t), C = ref(""), k = toRef(t, "format"), g = toRef(t, "formatLocale");
  watch(
    n,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", n.value, $(true));
    },
    { deep: true }
  ), watch(m, (c, ae) => {
    c.enabled !== ae.enabled && (n.value = null);
  }), watch(k, () => {
    f();
  });
  const h2 = (c) => v.value.timezone && v.value.convertModel ? st(c, v.value.timezone) : c, _ = (c) => {
    if (v.value.timezone && v.value.convertModel) {
      const ae = ol(v.value.timezone);
      return addHours(c, ae);
    }
    return c;
  }, j = (c, ae, V = false) => On(
    c,
    t.format,
    t.formatLocale,
    a.value.rangeSeparator,
    t.modelAuto,
    ae ?? P(),
    V
  ), T = (c) => c ? t.modelType ? oe(c) : {
    hours: getHours(c),
    minutes: getMinutes(c),
    seconds: t.enableSeconds ? getSeconds(c) : 0
  } : null, O = (c) => t.modelType ? oe(c) : { month: getMonth(c), year: getYear(c) }, b = (c) => Array.isArray(c) ? r.value.enabled ? c.map((ae) => E(ae, setYear(W(), ae))) : Zt(
    () => [
      setYear(W(), c[0]),
      c[1] ? setYear(W(), c[1]) : Tt(m.value.partialRange)
    ],
    m.value.enabled
  ) : setYear(W(), +c), E = (c, ae) => (typeof c == "string" || typeof c == "number") && t.modelType ? J(c) : ae, I = (c) => Array.isArray(c) ? [
    E(
      c[0],
      pt(null, +c[0].hours, +c[0].minutes, c[0].seconds)
    ),
    E(
      c[1],
      pt(null, +c[1].hours, +c[1].minutes, c[1].seconds)
    )
  ] : E(c, pt(null, c.hours, c.minutes, c.seconds)), X = (c) => {
    const ae = set(W(), { date: 1 });
    return Array.isArray(c) ? r.value.enabled ? c.map((V) => E(V, it(ae, +V.month, +V.year))) : Zt(
      () => [
        E(c[0], it(ae, +c[0].month, +c[0].year)),
        E(
          c[1],
          c[1] ? it(ae, +c[1].month, +c[1].year) : Tt(m.value.partialRange)
        )
      ],
      m.value.enabled
    ) : E(c, it(ae, +c.month, +c.year));
  }, F = (c) => {
    if (Array.isArray(c))
      return c.map((ae) => J(ae));
    throw new Error(ja.dateArr("multi-dates"));
  }, B = (c) => {
    if (Array.isArray(c) && m.value.enabled) {
      const ae = c[0], V = c[1];
      return [
        W(Array.isArray(ae) ? ae[0] : null),
        W(Array.isArray(V) ? V[0] : null)
      ];
    }
    return W(c[0]);
  }, U = (c) => t.modelAuto ? Array.isArray(c) ? [J(c[0]), J(c[1])] : t.autoApply ? [J(c)] : [J(c), null] : Array.isArray(c) ? Zt(
    () => c[1] ? [
      J(c[0]),
      c[1] ? J(c[1]) : Tt(m.value.partialRange)
    ] : [J(c[0])],
    m.value.enabled
  ) : J(c), y = () => {
    Array.isArray(n.value) && m.value.enabled && n.value.length === 1 && n.value.push(Tt(m.value.partialRange));
  }, ie = () => {
    const c = n.value;
    return [
      oe(c[0]),
      c[1] ? oe(c[1]) : Tt(m.value.partialRange)
    ];
  }, se = () => n.value[1] ? ie() : oe(Be(n.value[0])), re = () => (n.value || []).map((c) => oe(c)), Y = (c = false) => (c || y(), t.modelAuto ? se() : r.value.enabled ? re() : Array.isArray(n.value) ? Zt(() => ie(), m.value.enabled) : oe(Be(n.value))), H = (c) => !c || Array.isArray(c) && !c.length ? null : t.timePicker ? I(Be(c)) : t.monthPicker ? X(Be(c)) : t.yearPicker ? b(Be(c)) : r.value.enabled ? F(Be(c)) : t.weekPicker ? B(Be(c)) : U(Be(c)), ne = (c) => {
    const ae = H(c);
    Ya(Be(ae)) ? (n.value = Be(ae), f()) : (n.value = null, C.value = "");
  }, L = () => {
    const c = (ae) => format(ae, a.value.format);
    return `${c(n.value[0])} ${a.value.rangeSeparator} ${n.value[1] ? c(n.value[1]) : ""}`;
  }, R = () => l.value && n.value ? Array.isArray(n.value) ? L() : format(n.value, a.value.format) : j(n.value), p = () => n.value ? r.value.enabled ? n.value.map((c) => j(c)).join("; ") : a.value.enabled && typeof a.value.format == "string" ? R() : j(n.value) : "", f = () => {
    !t.format || typeof t.format == "string" || a.value.enabled && typeof a.value.format == "string" ? C.value = p() : C.value = t.format(n.value);
  }, J = (c) => {
    if (t.utc) {
      const ae = new Date(c);
      return t.utc === "preserve" ? new Date(ae.getTime() + ae.getTimezoneOffset() * 6e4) : ae;
    }
    return t.modelType ? sl.includes(t.modelType) ? h2(new Date(c)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? h2(
      parse(c, P(), /* @__PURE__ */ new Date(), { locale: g.value })
    ) : h2(
      parse(c, t.modelType, /* @__PURE__ */ new Date(), { locale: g.value })
    ) : h2(new Date(c));
  }, oe = (c) => c ? t.utc ? hl(c, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +_(c) : t.modelType === "iso" ? _(c).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? j(_(c)) : j(_(c), t.modelType, true) : _(c) : "", w = (c, ae = false, V = false) => {
    if (V)
      return c;
    if (e("update:model-value", c), v.value.emitTimezone && ae) {
      const pe = Array.isArray(c) ? c.map((s) => st(Be(s), v.value.emitTimezone)) : st(Be(c), v.value.emitTimezone);
      e("update:model-timezone-value", pe);
    }
  }, M = (c) => Array.isArray(n.value) ? r.value.enabled ? n.value.map((ae) => c(ae)) : [
    c(n.value[0]),
    n.value[1] ? c(n.value[1]) : Tt(m.value.partialRange)
  ] : c(Be(n.value)), z = () => {
    if (Array.isArray(n.value)) {
      const c = ut(n.value[0], t.weekStart), ae = n.value[1] ? ut(n.value[1], t.weekStart) : [];
      return [c.map((V) => W(V)), ae.map((V) => W(V))];
    }
    return ut(n.value, t.weekStart).map((c) => W(c));
  }, d = (c, ae) => w(Be(M(c)), false, ae), S = (c) => {
    const ae = z();
    return c ? ae : e("update:model-value", z());
  }, $ = (c = false) => (c || f(), t.monthPicker ? d(O, c) : t.timePicker ? d(T, c) : t.yearPicker ? d(getYear, c) : t.weekPicker ? S(c) : w(Y(c), true, c));
  return {
    inputValue: C,
    internalModelValue: n,
    checkBeforeEmit: () => n.value ? m.value.enabled ? m.value.partialRange ? n.value.length >= 1 : n.value.length === 2 : !!n.value : false,
    parseExternalModelValue: ne,
    formatInputValue: f,
    emitModelValue: $
  };
};
var Vl = (e, t) => {
  const { defaultedFilters: l, propDates: n } = Pe(e), { validateMonthYearInRange: a } = ht(e), m = (k, g) => {
    let h2 = k;
    return l.value.months.includes(getMonth(h2)) ? (h2 = g ? addMonths(k, 1) : subMonths(k, 1), m(h2, g)) : h2;
  }, v = (k, g) => {
    let h2 = k;
    return l.value.years.includes(getYear(h2)) ? (h2 = g ? addYears(k, 1) : subYears(k, 1), v(h2, g)) : h2;
  }, r = (k, g = false) => {
    const h2 = set(W(), { month: e.month, year: e.year });
    let _ = k ? addMonths(h2, 1) : subMonths(h2, 1);
    e.disableYearSelect && (_ = setYear(_, e.year));
    let j = getMonth(_), T = getYear(_);
    l.value.months.includes(j) && (_ = m(_, k), j = getMonth(_), T = getYear(_)), l.value.years.includes(T) && (_ = v(_, k), T = getYear(_)), a(j, T, k, e.preventMinMaxNavigation) && P(j, T, g);
  }, P = (k, g, h2) => {
    t("update-month-year", { month: k, year: g, fromNav: h2 });
  }, C = computed(() => (k) => _n(
    set(W(), { month: e.month, year: e.year }),
    n.value.maxDate,
    n.value.minDate,
    e.preventMinMaxNavigation,
    k
  ));
  return { handleMonthYearChange: r, isDisabled: C, updateMonthYear: P };
};
var St = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(St || {});
var Wl = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: n,
  inline: a,
  emit: m,
  props: v,
  slots: r
}) => {
  const P = ref({}), C = ref(false), k = ref({
    top: "0",
    left: "0"
  }), g = ref(false), h2 = toRef(v, "teleportCenter");
  watch(h2, () => {
    k.value = JSON.parse(JSON.stringify({})), X();
  });
  const _ = (R) => {
    if (v.teleport) {
      const p = R.getBoundingClientRect();
      return {
        left: p.left + window.scrollX,
        top: p.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, j = (R, p) => {
    k.value.left = `${R + p - P.value.width}px`;
  }, T = (R) => {
    k.value.left = `${R}px`;
  }, O = (R, p) => {
    v.position === St.left && T(R), v.position === St.right && j(R, p), v.position === St.center && (k.value.left = `${R + p / 2 - P.value.width / 2}px`);
  }, b = (R) => {
    const { width: p, height: f } = R.getBoundingClientRect(), { top: J, left: oe } = v.altPosition ? v.altPosition(R) : _(R);
    return { top: +J, left: +oe, width: p, height: f };
  }, E = () => {
    k.value.left = "50%", k.value.top = "50%", k.value.transform = "translate(-50%, -50%)", k.value.position = "fixed", delete k.value.opacity;
  }, I = () => {
    const R = Ye(l), { top: p, left: f, transform: J } = v.altPosition(R);
    k.value = { top: `${p}px`, left: `${f}px`, transform: J ?? "" };
  }, X = (R = true) => {
    var p;
    if (!a.value.enabled) {
      if (h2.value)
        return E();
      if (v.altPosition !== null)
        return I();
      if (R) {
        const f = v.teleport ? (p = t.value) == null ? void 0 : p.$el : e.value;
        f && (P.value = f.getBoundingClientRect()), m("recalculate-position");
      }
      return re();
    }
  }, F = ({ inputEl: R, left: p, width: f }) => {
    window.screen.width > 768 && !C.value && O(p, f), y(R);
  }, B = (R) => {
    const { top: p, left: f, height: J, width: oe } = b(R);
    k.value.top = `${J + p + +v.offset}px`, g.value = false, C.value || (k.value.left = `${f + oe / 2 - P.value.width / 2}px`), F({ inputEl: R, left: f, width: oe });
  }, U = (R) => {
    const { top: p, left: f, width: J } = b(R);
    k.value.top = `${p - +v.offset - P.value.height}px`, g.value = true, F({ inputEl: R, left: f, width: J });
  }, y = (R) => {
    if (v.autoPosition) {
      const { left: p, width: f } = b(R), { left: J, right: oe } = P.value;
      if (!C.value) {
        if (Math.abs(J) !== Math.abs(oe)) {
          if (J <= 0)
            return C.value = true, T(p);
          if (oe >= document.documentElement.clientWidth)
            return C.value = true, j(p, f);
        }
        return O(p, f);
      }
    }
  }, ie = () => {
    const R = Ye(l);
    if (R) {
      const { height: p } = P.value, { top: f, height: J } = R.getBoundingClientRect(), w = window.innerHeight - f - J, M = f;
      return p <= w ? kt.bottom : p > w && p <= M ? kt.top : w >= M ? kt.bottom : kt.top;
    }
    return kt.bottom;
  }, se = (R) => ie() === kt.bottom ? B(R) : U(R), re = () => {
    const R = Ye(l);
    if (R)
      return v.autoPosition ? se(R) : B(R);
  }, Y = function(R) {
    if (R) {
      const p = R.scrollHeight > R.clientHeight, J = window.getComputedStyle(R).overflowY.indexOf("hidden") !== -1;
      return p && !J;
    }
    return true;
  }, H = function(R) {
    return !R || R === document.body || R.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : Y(R) ? R : H(R.assignedSlot ? R.assignedSlot.parentNode : R.parentNode);
  }, ne = (R) => {
    if (R)
      switch (v.position) {
        case St.left:
          return { left: 0, transform: "translateX(0)" };
        case St.right:
          return { left: `${R.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${R.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: g,
    menuStyle: k,
    xCorrect: C,
    setMenuPosition: X,
    getScrollableParent: H,
    shadowRender: (R, p) => {
      var z, d, S;
      const f = document.createElement("div"), J = (z = Ye(l)) == null ? void 0 : z.getBoundingClientRect();
      f.setAttribute("id", "dp--temp-container");
      const oe = (d = n.value) != null && d.clientWidth ? n.value : document.body;
      oe.append(f);
      const w = ne(J), M = h(
        R,
        {
          ...p,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...w }
        },
        Object.fromEntries(
          Object.keys(r).filter(($) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes($)).map(($) => [$, r[$]])
        )
      );
      render(M, f), P.value = (S = M.el) == null ? void 0 : S.getBoundingClientRect(), render(null, f), oe.removeChild(f);
    }
  };
};
var ft = [
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
  { name: "top-extra", use: ["shared", "month-year"] }
];
var zl = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Ul = {
  all: () => ft,
  monthYear: () => ft.filter((e) => e.use.includes("month-year")),
  input: () => zl,
  timePicker: () => ft.filter((e) => e.use.includes("time")),
  action: () => ft.filter((e) => e.use.includes("action")),
  calendar: () => ft.filter((e) => e.use.includes("calendar")),
  menu: () => ft.filter((e) => e.use.includes("menu")),
  shared: () => ft.filter((e) => e.use.includes("shared")),
  yearMode: () => ft.filter((e) => e.use.includes("year-mode"))
};
var Qe = (e, t, l) => {
  const n = [];
  return Ul[t]().forEach((a) => {
    e[a.name] && n.push(a.name);
  }), l != null && l.length && l.forEach((a) => {
    a.slot && n.push(a.slot);
  }), n;
};
var Kt = (e) => {
  const t = computed(() => (n) => e.value ? n ? e.value.open : e.value.close : ""), l = computed(() => (n) => e.value ? n ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: l };
};
var Gt = (e, t) => {
  const { defaultedRange: l, defaultedTz: n } = Pe(e), a = W(st(W(), n.value.timezone)), m = ref([{ month: getMonth(a), year: getYear(a) }]), v = (g) => {
    const h2 = {
      hours: getHours(a),
      minutes: getMinutes(a),
      seconds: 0
    };
    return l.value.enabled ? [h2[g], h2[g]] : h2[g];
  }, r = reactive({
    hours: v("hours"),
    minutes: v("minutes"),
    seconds: v("seconds")
  });
  watch(
    l,
    (g, h2) => {
      g.enabled !== h2.enabled && (r.hours = v("hours"), r.minutes = v("minutes"), r.seconds = v("seconds"));
    },
    { deep: true }
  );
  const P = computed({
    get: () => e.internalModelValue,
    set: (g) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", g);
    }
  }), C = computed(
    () => (g) => m.value[g] ? m.value[g].month : 0
  ), k = computed(
    () => (g) => m.value[g] ? m.value[g].year : 0
  );
  return {
    calendars: m,
    time: r,
    modelValue: P,
    month: C,
    year: k,
    today: a
  };
};
var jl = (e, t) => {
  const { defaultedMultiCalendars: l, defaultedMultiDates: n, defaultedHighlight: a, defaultedTz: m, propDates: v, defaultedRange: r } = Pe(t), { isDisabled: P } = ht(t), C = ref(null), k = ref(st(/* @__PURE__ */ new Date(), m.value.timezone)), g = (d) => {
    !d.current && t.hideOffsetDates || (C.value = d.value);
  }, h2 = () => {
    C.value = null;
  }, _ = (d) => Array.isArray(e.value) && r.value.enabled && e.value[0] && C.value ? d ? Oe(C.value, e.value[0]) : Ce(C.value, e.value[0]) : true, j = (d, S) => {
    const $ = () => e.value ? S ? e.value[0] || null : e.value[1] : null, de = e.value && Array.isArray(e.value) ? $() : null;
    return he(W(d.value), de);
  }, T = (d) => {
    const S = Array.isArray(e.value) ? e.value[0] : null;
    return d ? !Ce(C.value ?? null, S) : true;
  }, O = (d, S = true) => (r.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !d.current ? false : he(W(d.value), e.value[S ? 0 : 1]) : r.value.enabled ? j(d, S) && T(S) || he(d.value, Array.isArray(e.value) ? e.value[0] : null) && _(S) : false, b = (d, S) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const $ = he(d.value, C.value);
      return S ? Oe(e.value[0], d.value) && $ : Ce(e.value[0], d.value) && $;
    }
    return false;
  }, E = (d) => !e.value || t.hideOffsetDates && !d.current ? false : r.value.enabled ? t.modelAuto && Array.isArray(e.value) ? he(d.value, e.value[0] ? e.value[0] : k.value) : false : n.value.enabled && Array.isArray(e.value) ? e.value.some((S) => he(S, d.value)) : he(d.value, e.value ? e.value : k.value), I = (d) => {
    if (r.value.autoRange || t.weekPicker) {
      if (C.value) {
        if (t.hideOffsetDates && !d.current)
          return false;
        const S = addDays(C.value, +r.value.autoRange), $ = ut(W(C.value), t.weekStart);
        return t.weekPicker ? he($[1], W(d.value)) : he(S, W(d.value));
      }
      return false;
    }
    return false;
  }, X = (d) => {
    if (r.value.autoRange || t.weekPicker) {
      if (C.value) {
        const S = addDays(C.value, +r.value.autoRange);
        if (t.hideOffsetDates && !d.current)
          return false;
        const $ = ut(W(C.value), t.weekStart);
        return t.weekPicker ? Oe(d.value, $[0]) && Ce(d.value, $[1]) : Oe(d.value, C.value) && Ce(d.value, S);
      }
      return false;
    }
    return false;
  }, F = (d) => {
    if (r.value.autoRange || t.weekPicker) {
      if (C.value) {
        if (t.hideOffsetDates && !d.current)
          return false;
        const S = ut(W(C.value), t.weekStart);
        return t.weekPicker ? he(S[0], d.value) : he(C.value, d.value);
      }
      return false;
    }
    return false;
  }, B = (d) => oa(e.value, C.value, d.value), U = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, y = () => t.modelAuto ? $n(t.internalModelValue) : true, ie = (d) => {
    if (t.weekPicker)
      return false;
    const S = r.value.enabled ? !O(d) && !O(d, false) : true;
    return !P(d.value) && !E(d) && !(!d.current && t.hideOffsetDates) && S;
  }, se = (d) => r.value.enabled ? t.modelAuto ? U() && E(d) : false : E(d), re = (d) => a.value ? gl(d.value, v.value.highlight) : false, Y = (d) => {
    const S = P(d.value);
    return S && (typeof a.value == "function" ? !a.value(d.value, S) : !a.value.options.highlightDisabled);
  }, H = (d) => {
    var S;
    return typeof a.value == "function" ? a.value(d.value) : (S = a.value.weekdays) == null ? void 0 : S.includes(d.value.getDay());
  }, ne = (d) => (r.value.enabled || t.weekPicker) && (!(l.value.count > 0) || d.current) && y() && !(!d.current && t.hideOffsetDates) && !E(d) ? B(d) : false, L = (d) => {
    const { isRangeStart: S, isRangeEnd: $ } = J(d), de = r.value.enabled ? S || $ : false;
    return {
      dp__cell_offset: !d.current,
      dp__pointer: !t.disabled && !(!d.current && t.hideOffsetDates) && !P(d.value),
      dp__cell_disabled: P(d.value),
      dp__cell_highlight: !Y(d) && (re(d) || H(d)) && !se(d) && !de && !F(d) && !(ne(d) && t.weekPicker) && !$,
      dp__cell_highlight_active: !Y(d) && (re(d) || H(d)) && se(d),
      dp__today: !t.noToday && he(d.value, k.value) && d.current,
      "dp--past": Ce(d.value, k.value),
      "dp--future": Oe(d.value, k.value)
    };
  }, R = (d) => ({
    dp__active_date: se(d),
    dp__date_hover: ie(d)
  }), p = (d) => {
    if (e.value && !Array.isArray(e.value)) {
      const S = ut(e.value, t.weekStart);
      return {
        ...w(d),
        dp__range_start: he(S[0], d.value),
        dp__range_end: he(S[1], d.value),
        dp__range_between_week: Oe(d.value, S[0]) && Ce(d.value, S[1])
      };
    }
    return {
      ...w(d)
    };
  }, f = (d) => {
    if (e.value && Array.isArray(e.value)) {
      const S = ut(e.value[0], t.weekStart), $ = e.value[1] ? ut(e.value[1], t.weekStart) : [];
      return {
        ...w(d),
        dp__range_start: he(S[0], d.value) || he($[0], d.value),
        dp__range_end: he(S[1], d.value) || he($[1], d.value),
        dp__range_between_week: Oe(d.value, S[0]) && Ce(d.value, S[1]) || Oe(d.value, $[0]) && Ce(d.value, $[1]),
        dp__range_between: Oe(d.value, S[1]) && Ce(d.value, $[0])
      };
    }
    return {
      ...w(d)
    };
  }, J = (d) => {
    const S = l.value.count > 0 ? d.current && O(d) && y() : O(d) && y(), $ = l.value.count > 0 ? d.current && O(d, false) && y() : O(d, false) && y();
    return { isRangeStart: S, isRangeEnd: $ };
  }, oe = (d) => {
    const { isRangeStart: S, isRangeEnd: $ } = J(d);
    return {
      dp__range_start: S,
      dp__range_end: $,
      dp__range_between: ne(d),
      dp__date_hover: he(d.value, C.value) && !S && !$ && !t.weekPicker,
      dp__date_hover_start: b(d, true),
      dp__date_hover_end: b(d, false)
    };
  }, w = (d) => ({
    ...oe(d),
    dp__cell_auto_range: X(d),
    dp__cell_auto_range_start: F(d),
    dp__cell_auto_range_end: I(d)
  }), M = (d) => r.value.enabled ? r.value.autoRange ? w(d) : t.modelAuto ? { ...R(d), ...oe(d) } : t.weekPicker ? f(d) : oe(d) : t.weekPicker ? p(d) : R(d);
  return {
    setHoverDate: g,
    clearHoverDate: h2,
    getDayClassData: (d) => t.hideOffsetDates && !d.current ? {} : {
      ...L(d),
      ...M(d),
      [t.dayClass ? t.dayClass(d.value) : ""]: true,
      [t.calendarCellClassName]: !!t.calendarCellClassName
    }
  };
};
var ht = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: n, defaultedMultiDates: a } = Pe(e), m = (Y) => n.value.disabledDates ? typeof n.value.disabledDates == "function" ? n.value.disabledDates(W(Y)) : !!na(Y, n.value.disabledDates) : false, v = (Y) => {
    const H = n.value.maxDate ? Oe(Y, n.value.maxDate) : false, ne = n.value.minDate ? Ce(Y, n.value.minDate) : false, L = m(Y), p = t.value.months.map((M) => +M).includes(getMonth(Y)), f = e.disabledWeekDays.length ? e.disabledWeekDays.some((M) => +M === getDay(Y)) : false, J = g(Y), oe = getYear(Y), w = oe < +e.yearRange[0] || oe > +e.yearRange[1];
    return !(H || ne || L || p || w || f || J);
  }, r = (Y, H) => Ce(...vt(n.value.minDate, Y, H)) || he(...vt(n.value.minDate, Y, H)), P = (Y, H) => Oe(...vt(n.value.maxDate, Y, H)) || he(...vt(n.value.maxDate, Y, H)), C = (Y, H, ne) => {
    let L = false;
    return n.value.maxDate && ne && P(Y, H) && (L = true), n.value.minDate && !ne && r(Y, H) && (L = true), L;
  }, k = (Y, H, ne, L) => {
    let R = false;
    return L ? n.value.minDate && n.value.maxDate ? R = C(Y, H, ne) : (n.value.minDate && r(Y, H) || n.value.maxDate && P(Y, H)) && (R = true) : R = true, R;
  }, g = (Y) => Array.isArray(n.value.allowedDates) && !n.value.allowedDates.length ? true : n.value.allowedDates ? !na(Y, n.value.allowedDates) : false, h2 = (Y) => !v(Y), _ = (Y) => l.value.noDisabledRange ? !eachDayOfInterval({ start: Y[0], end: Y[1] }).some((ne) => h2(ne)) : true, j = (Y) => {
    if (Y) {
      const H = getYear(Y);
      return H >= +e.yearRange[0] && H <= e.yearRange[1];
    }
    return true;
  }, T = (Y, H) => !!(Array.isArray(Y) && Y[H] && (l.value.maxRange || l.value.minRange) && j(Y[H])), O = (Y, H, ne = 0) => {
    if (T(H, ne) && j(Y)) {
      const L = differenceInCalendarDays(Y, H[ne]), R = Pn(H[ne], Y), p = R.length === 1 ? 0 : R.filter((J) => h2(J)).length, f = Math.abs(L) - (l.value.minMaxRawRange ? 0 : p);
      if (l.value.minRange && l.value.maxRange)
        return f >= +l.value.minRange && f <= +l.value.maxRange;
      if (l.value.minRange)
        return f >= +l.value.minRange;
      if (l.value.maxRange)
        return f <= +l.value.maxRange;
    }
    return true;
  }, b = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, E = (Y) => Array.isArray(Y) ? [Y[0] ? Aa(Y[0]) : null, Y[1] ? Aa(Y[1]) : null] : Aa(Y), I = (Y, H, ne) => Y.find(
    (L) => +L.hours === getHours(H) && L.minutes === "*" ? true : +L.minutes === getMinutes(H) && +L.hours === getHours(H)
  ) && ne, X = (Y, H, ne) => {
    const [L, R] = Y, [p, f] = H;
    return !I(L, p, ne) && !I(R, f, ne) && ne;
  }, F = (Y, H) => {
    const ne = Array.isArray(H) ? H : [H];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? X(e.disabledTimes, ne, Y) : !ne.some((L) => I(e.disabledTimes, L, Y)) : Y;
  }, B = (Y, H) => {
    const ne = Array.isArray(H) ? [$t(H[0]), H[1] ? $t(H[1]) : void 0] : $t(H), L = !e.disabledTimes(ne);
    return Y && L;
  }, U = (Y, H) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? F(H, Y) : B(H, Y) : H, y = (Y) => {
    let H = true;
    if (!Y || b())
      return true;
    const ne = !n.value.minDate && !n.value.maxDate ? E(Y) : Y;
    return (e.maxTime || n.value.maxDate) && (H = on(
      e.maxTime,
      n.value.maxDate,
      "max",
      Be(ne),
      H
    )), (e.minTime || n.value.minDate) && (H = on(
      e.minTime,
      n.value.minDate,
      "min",
      Be(ne),
      H
    )), U(Y, H);
  }, ie = (Y) => {
    if (!e.monthPicker)
      return true;
    let H = true;
    const ne = W(et(Y));
    if (n.value.minDate && n.value.maxDate) {
      const L = W(et(n.value.minDate)), R = W(et(n.value.maxDate));
      return Oe(ne, L) && Ce(ne, R) || he(ne, L) || he(ne, R);
    }
    if (n.value.minDate) {
      const L = W(et(n.value.minDate));
      H = Oe(ne, L) || he(ne, L);
    }
    if (n.value.maxDate) {
      const L = W(et(n.value.maxDate));
      H = Ce(ne, L) || he(ne, L);
    }
    return H;
  }, se = computed(() => (Y) => !e.enableTimePicker || e.ignoreTimeValidation ? true : y(Y)), re = computed(() => (Y) => e.monthPicker ? Array.isArray(Y) && (l.value.enabled || a.value.enabled) ? !Y.filter((ne) => !ie(ne)).length : ie(Y) : true);
  return {
    isDisabled: h2,
    validateDate: v,
    validateMonthYearInRange: k,
    isDateRangeAllowed: _,
    checkMinMaxRange: O,
    isValidTime: y,
    isTimeValid: se,
    isMonthValid: re
  };
};
var sa = () => {
  const e = computed(() => (n, a) => n == null ? void 0 : n.includes(a)), t = computed(() => (n, a) => n.count ? n.solo ? true : a === 0 : true), l = computed(() => (n, a) => n.count ? n.solo ? true : a === n.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var Kl = (e, t, l) => {
  const n = ref(0), a = reactive({
    [Dt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Dt.calendar]: false,
    [Dt.header]: false
  }), m = computed(() => e.monthPicker || e.timePicker), v = (g) => {
    var h2;
    if ((h2 = e.flow) != null && h2.length) {
      if (!g && m.value)
        return k();
      a[g] = true, Object.keys(a).filter((_) => !a[_]).length || k();
    }
  }, r = () => {
    var g;
    (g = e.flow) != null && g.length && n.value !== -1 && (n.value += 1, t("flow-step", n.value), k());
  }, P = () => {
    n.value = -1;
  }, C = (g, h2, ..._) => {
    var j, T;
    e.flow[n.value] === g && l.value && ((T = (j = l.value)[h2]) == null || T.call(j, ..._));
  }, k = () => {
    C(Le.month, "toggleMonthPicker", true), C(Le.year, "toggleYearPicker", true), C(Le.calendar, "toggleTimePicker", false, true), C(Le.time, "toggleTimePicker", true, true);
    const g = e.flow[n.value];
    (g === Le.hours || g === Le.minutes || g === Le.seconds) && C(g, "toggleTimePicker", true, true, g);
  };
  return { childMount: v, updateFlowStep: r, resetFlow: P, flowStep: n };
};
var ua = {
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
  enableMinutes: { type: Boolean, default: true }
};
var at = {
  ...ua,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) }
};
var Gl = {
  key: 1,
  class: "dp__input_wrap"
};
var Ql = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var ql = {
  key: 2,
  class: "dp__clear_icon"
};
var Xl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...ua
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
    const n = l, a = e, {
      defaultedTextInput: m,
      defaultedAriaLabels: v,
      defaultedInline: r,
      defaultedConfig: P,
      defaultedRange: C,
      defaultedMultiDates: k,
      getDefaultPattern: g,
      getDefaultStartTime: h2
    } = Pe(a), { checkMinMaxRange: _ } = ht(a), j = ref(), T = ref(null), O = ref(false), b = ref(false), E = computed(
      () => ({
        dp__pointer: !a.disabled && !a.readonly && !m.value.enabled,
        dp__disabled: a.disabled,
        dp__input_readonly: !m.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !a.hideInputIcon,
        dp__input_valid: !!a.state,
        dp__input_invalid: a.state === false,
        dp__input_focus: O.value || a.isMenuOpen,
        dp__input_reg: !m.value.enabled,
        [a.inputClassName]: !!a.inputClassName
      })
    ), I = () => {
      n("set-input-date", null), a.clearable && a.autoApply && (n("set-empty-date"), j.value = null);
    }, X = (f) => {
      const J = h2();
      return yl(
        f,
        m.value.format ?? g(),
        J ?? Cn({}, a.enableSeconds),
        a.inputValue,
        b.value,
        a.formatLocale
      );
    }, F = (f) => {
      const { rangeSeparator: J } = m.value, [oe, w] = f.split(`${J}`);
      if (oe) {
        const M = X(oe.trim()), z = w ? X(w.trim()) : null;
        if (isAfter(M, z))
          return;
        const d = M && z ? [M, z] : [M];
        _(z, d, 0) && (j.value = M ? d : null);
      }
    }, B = () => {
      b.value = true;
    }, U = (f) => {
      if (C.value.enabled)
        F(f);
      else if (k.value.enabled) {
        const J = f.split(";");
        j.value = J.map((oe) => X(oe.trim())).filter((oe) => oe);
      } else
        j.value = X(f);
    }, y = (f) => {
      var oe;
      const J = typeof f == "string" ? f : (oe = f.target) == null ? void 0 : oe.value;
      J !== "" ? (m.value.openMenu && !a.isMenuOpen && n("open"), U(J), n("set-input-date", j.value)) : I(), b.value = false, n("update:input-value", J);
    }, ie = (f) => {
      m.value.enabled ? (U(f.target.value), m.value.enterSubmit && Ya(j.value) && a.inputValue !== "" ? (n("set-input-date", j.value, true), j.value = null) : m.value.enterSubmit && a.inputValue === "" && (j.value = null, n("clear"))) : Y(f);
    }, se = (f) => {
      m.value.enabled && m.value.tabSubmit && U(f.target.value), m.value.tabSubmit && Ya(j.value) && a.inputValue !== "" ? (n("set-input-date", j.value, true, true), j.value = null) : m.value.tabSubmit && a.inputValue === "" && (j.value = null, n("clear", true));
    }, re = () => {
      O.value = true, n("focus"), nextTick().then(() => {
        var f;
        m.value.enabled && m.value.selectOnFocus && ((f = T.value) == null || f.select());
      });
    }, Y = (f) => {
      f.preventDefault(), mt(f, P.value, true), m.value.enabled && m.value.openMenu && !r.value.input && !a.isMenuOpen ? n("open") : m.value.enabled || n("toggle");
    }, H = () => {
      n("real-blur"), O.value = false, (!a.isMenuOpen || r.value.enabled && r.value.input) && n("blur"), a.autoApply && m.value.enabled && j.value && !a.isMenuOpen && (n("set-input-date", j.value), n("select-date"), j.value = null);
    }, ne = (f) => {
      mt(f, P.value, true), n("clear");
    }, L = (f) => {
      if (f.key === "Tab" && se(f), f.key === "Enter" && ie(f), !m.value.enabled) {
        if (f.code === "Tab")
          return;
        f.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var f;
        (f = T.value) == null || f.focus({ preventScroll: true });
      },
      setParsedDate: (f) => {
        j.value = f;
      }
    }), (f, J) => {
      var oe;
      return openBlock(), createElementBlock("div", { onClick: Y }, [
        f.$slots.trigger && !f.$slots["dp-input"] && !unref(r).enabled ? renderSlot(f.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !f.$slots.trigger && (!unref(r).enabled || unref(r).input) ? (openBlock(), createElementBlock("div", Gl, [
          f.$slots["dp-input"] && !f.$slots.trigger && (!unref(r).enabled || unref(r).enabled && unref(r).input) ? renderSlot(f.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: y,
            onEnter: ie,
            onTab: se,
            onClear: ne,
            onBlur: H,
            onKeypress: L,
            onPaste: B,
            openMenu: () => f.$emit("open"),
            closeMenu: () => f.$emit("close"),
            toggleMenu: () => f.$emit("toggle")
          }) : createCommentVNode("", true),
          f.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: f.uid ? `dp-input-${f.uid}` : void 0,
            ref_key: "inputRef",
            ref: T,
            "data-test": "dp-input",
            name: f.name,
            class: normalizeClass(E.value),
            inputmode: unref(m).enabled ? "text" : "none",
            placeholder: f.placeholder,
            disabled: f.disabled,
            readonly: f.readonly,
            required: f.required,
            value: e.inputValue,
            autocomplete: f.autocomplete,
            "aria-label": (oe = unref(v)) == null ? void 0 : oe.input,
            "aria-disabled": f.disabled || void 0,
            "aria-invalid": f.state === false ? true : void 0,
            onInput: y,
            onBlur: H,
            onFocus: re,
            onKeypress: L,
            onKeydown: L,
            onPaste: B
          }, null, 42, Ql)),
          createBaseVNode("div", {
            onClick: J[2] || (J[2] = (w) => n("toggle"))
          }, [
            f.$slots["input-icon"] && !f.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: J[0] || (J[0] = (w) => n("toggle"))
            }, [
              renderSlot(f.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !f.$slots["input-icon"] && !f.hideInputIcon && !f.$slots["dp-input"] ? (openBlock(), createBlock(unref(Yt), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: J[1] || (J[1] = (w) => n("toggle"))
            })) : createCommentVNode("", true)
          ]),
          f.$slots["clear-icon"] && e.inputValue && f.clearable && !f.disabled && !f.readonly ? (openBlock(), createElementBlock("span", ql, [
            renderSlot(f.$slots, "clear-icon", { clear: ne })
          ])) : createCommentVNode("", true),
          f.clearable && !f.$slots["clear-icon"] && e.inputValue && !f.disabled && !f.readonly ? (openBlock(), createBlock(unref(wn), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: J[3] || (J[3] = withModifiers((w) => ne(w), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var Jl = ["title"];
var Zl = ["disabled"];
var xl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...at
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const l = t, n = e, {
      defaultedActionRow: a,
      defaultedPreviewFormat: m,
      defaultedMultiCalendars: v,
      defaultedTextInput: r,
      defaultedInline: P,
      defaultedRange: C,
      defaultedMultiDates: k,
      getDefaultPattern: g
    } = Pe(n), { isTimeValid: h2, isMonthValid: _ } = ht(n), { buildMatrix: j } = yt(), T = ref(null), O = ref(null), b = ref(false), E = ref({}), I = ref(null), X = ref(null);
    onMounted(() => {
      n.arrowNavigation && j([Ye(T), Ye(O)], "actionRow"), F(), window.addEventListener("resize", F);
    }), onUnmounted(() => {
      window.removeEventListener("resize", F);
    });
    const F = () => {
      b.value = false, setTimeout(() => {
        var p, f;
        const L = (p = I.value) == null ? void 0 : p.getBoundingClientRect(), R = (f = X.value) == null ? void 0 : f.getBoundingClientRect();
        L && R && (E.value.maxWidth = `${R.width - L.width - 20}px`), b.value = true;
      }, 0);
    }, B = computed(() => C.value.enabled && !C.value.partialRange && n.internalModelValue ? n.internalModelValue.length === 2 : true), U = computed(
      () => !h2.value(n.internalModelValue) || !_.value(n.internalModelValue) || !B.value
    ), y = () => {
      const L = m.value;
      return n.timePicker || n.monthPicker, L(Be(n.internalModelValue));
    }, ie = () => {
      const L = n.internalModelValue;
      return v.value.count > 0 ? `${se(L[0])} - ${se(L[1])}` : [se(L[0]), se(L[1])];
    }, se = (L) => On(
      L,
      m.value,
      n.formatLocale,
      r.value.rangeSeparator,
      n.modelAuto,
      g()
    ), re = computed(() => !n.internalModelValue || !n.menuMount ? "" : typeof m.value == "string" ? Array.isArray(n.internalModelValue) ? n.internalModelValue.length === 2 && n.internalModelValue[1] ? ie() : k.value.enabled ? n.internalModelValue.map((L) => `${se(L)}`) : n.modelAuto ? `${se(n.internalModelValue[0])}` : `${se(n.internalModelValue[0])} -` : se(n.internalModelValue) : y()), Y = () => k.value.enabled ? "; " : " - ", H = computed(
      () => Array.isArray(re.value) ? re.value.join(Y()) : re.value
    ), ne = () => {
      h2.value(n.internalModelValue) && _.value(n.internalModelValue) && B.value ? l("select-date") : l("invalid-select");
    };
    return (L, R) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: X,
      class: "dp__action_row"
    }, [
      L.$slots["action-row"] ? renderSlot(L.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: L.internalModelValue,
        disabled: U.value,
        selectDate: () => L.$emit("select-date"),
        closePicker: () => L.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(a).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: H.value,
          style: normalizeStyle(E.value)
        }, [
          L.$slots["action-preview"] && b.value ? renderSlot(L.$slots, "action-preview", {
            key: 0,
            value: L.internalModelValue
          }) : createCommentVNode("", true),
          !L.$slots["action-preview"] && b.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(H.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, Jl)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: I,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          L.$slots["action-buttons"] ? renderSlot(L.$slots, "action-buttons", {
            key: 0,
            value: L.internalModelValue
          }) : createCommentVNode("", true),
          L.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(P).enabled && unref(a).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: T,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: R[0] || (R[0] = (p) => L.$emit("close-picker")),
              onKeydown: R[1] || (R[1] = (p) => unref(je)(p, () => L.$emit("close-picker")))
            }, toDisplayString(L.cancelText), 545)) : createCommentVNode("", true),
            unref(a).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: R[2] || (R[2] = (p) => L.$emit("select-now")),
              onKeydown: R[3] || (R[3] = (p) => unref(je)(p, () => L.$emit("select-now")))
            }, toDisplayString(L.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(a).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: O,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: U.value,
              "data-test": "select-button",
              onKeydown: R[4] || (R[4] = (p) => unref(je)(p, () => ne())),
              onClick: ne
            }, toDisplayString(L.selectText), 41, Zl)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var er = { class: "dp__selection_grid_header" };
var tr = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var ar = ["aria-label"];
var Qt = defineComponent({
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
    const { setSelectionGrid: n, buildMultiLevelMatrix: a, setMonthPicker: m } = yt(), v = l, r = e, { defaultedAriaLabels: P, defaultedTextInput: C, defaultedConfig: k } = Pe(
      r
    ), { hideNavigationButtons: g } = sa(), h2 = ref(false), _ = ref(null), j = ref(null), T = ref([]), O = ref(), b = ref(null), E = ref(0), I = ref(null);
    onBeforeUpdate(() => {
      _.value = null;
    }), onMounted(() => {
      nextTick().then(() => re()), r.noOverlayFocus || F(), X(true);
    }), onUnmounted(() => X(false));
    const X = (M) => {
      var z;
      r.arrowNavigation && ((z = r.headerRefs) != null && z.length ? m(M) : n(M));
    }, F = () => {
      var z;
      const M = Ye(j);
      M && (C.value.enabled || (_.value ? (z = _.value) == null || z.focus({ preventScroll: true }) : M.focus({ preventScroll: true })), h2.value = M.clientHeight < M.scrollHeight);
    }, B = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !r.useRelative,
        "dp--overlay-relative": r.useRelative
      })
    ), U = computed(
      () => r.useRelative ? { height: `${r.height}px`, width: "260px" } : void 0
    ), y = computed(() => ({
      dp__overlay_col: true
    })), ie = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: h2.value,
        dp__button_bottom: r.isLast
      })
    ), se = computed(() => {
      var M, z;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((M = r.items) == null ? void 0 : M.length) <= 6,
        dp__container_block: ((z = r.items) == null ? void 0 : z.length) > 6
      };
    });
    watch(
      () => r.items,
      () => re(false),
      { deep: true }
    );
    const re = (M = true) => {
      nextTick().then(() => {
        const z = Ye(_), d = Ye(j), S = Ye(b), $ = Ye(I), de = S ? S.getBoundingClientRect().height : 0;
        d && (d.getBoundingClientRect().height ? E.value = d.getBoundingClientRect().height - de : E.value = k.value.modeHeight - de), z && $ && M && ($.scrollTop = z.offsetTop - $.offsetTop - (E.value / 2 - z.getBoundingClientRect().height) - de);
      });
    }, Y = (M) => {
      M.disabled || v("selected", M.value);
    }, H = () => {
      v("toggle"), v("reset-flow");
    }, ne = () => {
      r.escClose && H();
    }, L = (M, z, d, S) => {
      M && ((z.active || z.value === r.focusValue) && (_.value = M), r.arrowNavigation && (Array.isArray(T.value[d]) ? T.value[d][S] = M : T.value[d] = [M], R()));
    }, R = () => {
      var z, d;
      const M = (z = r.headerRefs) != null && z.length ? [r.headerRefs].concat(T.value) : T.value.concat([r.skipButtonRef ? [] : [b.value]]);
      a(Be(M), (d = r.headerRefs) != null && d.length ? "monthPicker" : "selectionGrid");
    }, p = (M) => {
      r.arrowNavigation || mt(M, k.value, true);
    }, f = (M) => {
      O.value = M, v("hover-value", M);
    }, J = () => {
      if (H(), !r.isLast) {
        const M = pl(r.menuWrapRef ?? null, "action-row");
        if (M) {
          const z = An(M);
          z == null || z.focus();
        }
      }
    }, oe = (M) => {
      switch (M.key) {
        case Re.esc:
          return ne();
        case Re.arrowLeft:
          return p(M);
        case Re.arrowRight:
          return p(M);
        case Re.arrowUp:
          return p(M);
        case Re.arrowDown:
          return p(M);
        default:
          return;
      }
    }, w = (M) => {
      if (M.key === Re.enter)
        return H();
      if (M.key === Re.tab)
        return J();
    };
    return t({ focusGrid: F }), (M, z) => {
      var d;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: j,
        class: normalizeClass(B.value),
        style: normalizeStyle(U.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: oe
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: I,
          class: normalizeClass(se.value),
          role: "grid",
          style: normalizeStyle({ "--dp-overlay-height": `${E.value}px` })
        }, [
          createBaseVNode("div", er, [
            renderSlot(M.$slots, "header")
          ]),
          M.$slots.overlay ? renderSlot(M.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(M.items, (S, $) => (openBlock(), createElementBlock("div", {
            key: $,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: M.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(S, (de, c) => (openBlock(), createElementBlock("div", {
              key: de.value,
              ref_for: true,
              ref: (ae) => L(ae, de, $, c),
              role: "gridcell",
              class: normalizeClass(y.value),
              "aria-selected": de.active || void 0,
              "aria-disabled": de.disabled || void 0,
              tabindex: "0",
              "data-test": de.text,
              onClick: (ae) => Y(de),
              onKeydown: (ae) => unref(je)(ae, () => Y(de), true),
              onMouseover: (ae) => f(de.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(de.className)
              }, [
                M.$slots.item ? renderSlot(M.$slots, "item", {
                  key: 0,
                  item: de
                }) : createCommentVNode("", true),
                M.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(de.text), 1)
                ], 64))
              ], 2)
            ], 42, tr))), 128))
          ], 2))), 128))
        ], 6),
        M.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: b,
          type: "button",
          "aria-label": (d = unref(P)) == null ? void 0 : d.toggleOverlay,
          class: normalizeClass(ie.value),
          tabindex: "0",
          onClick: H,
          onKeydown: w
        }, [
          renderSlot(M.$slots, "button-icon")
        ], 42, ar)), [
          [vShow, !unref(g)(M.hideNavigation, M.type)]
        ]) : createCommentVNode("", true)
      ], 38);
    };
  }
});
var ia = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const t = e, l = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), n = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (a, m) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !a.stretch,
        "dp--menu--inner-stretched": a.stretch,
        dp__flex_display: a.multiCalendars > 0,
        "dp--flex-display-collapsed": a.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (v, r) => (openBlock(), createElementBlock("div", {
        key: v,
        class: normalizeClass(n.value)
      }, [
        renderSlot(a.$slots, "default", {
          instance: v,
          index: r
        })
      ], 2))), 128))
    ], 2));
  }
});
var nr = ["aria-label", "aria-disabled"];
var Ht = defineComponent({
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
    const l = t, n = ref(null);
    return onMounted(() => l("set-ref", n)), (a, m) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: n,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": a.ariaLabel,
      "aria-disabled": a.disabled || void 0,
      onClick: m[0] || (m[0] = (v) => a.$emit("activate")),
      onKeydown: m[1] || (m[1] = (v) => unref(je)(v, () => a.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: a.disabled }])
      }, [
        renderSlot(a.$slots, "default")
      ], 2)
    ], 40, nr));
  }
});
var lr = { class: "dp--year-mode-picker" };
var rr = ["aria-label", "data-test"];
var In = defineComponent({
  __name: "YearModePicker",
  props: {
    ...at,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const l = t, n = e, { showRightIcon: a, showLeftIcon: m } = sa(), { defaultedConfig: v, defaultedMultiCalendars: r, defaultedAriaLabels: P, defaultedTransitions: C } = Pe(n), { showTransition: k, transitionName: g } = Kt(C), h2 = (T = false, O) => {
      l("toggle-year-picker", { flow: T, show: O });
    }, _ = (T) => {
      l("year-select", T);
    }, j = (T = false) => {
      l("handle-year", T);
    };
    return (T, O) => {
      var b, E, I;
      return openBlock(), createElementBlock("div", lr, [
        unref(m)(unref(r), e.instance) ? (openBlock(), createBlock(Ht, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (b = unref(P)) == null ? void 0 : b.prevYear,
          disabled: e.isDisabled(false),
          onActivate: O[0] || (O[0] = (X) => j(false))
        }, {
          default: withCtx(() => [
            T.$slots["arrow-left"] ? renderSlot(T.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            T.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (E = unref(P)) == null ? void 0 : E.openYearsOverlay,
          "data-test": `year-mode-btn-${e.instance}`,
          onClick: O[1] || (O[1] = () => h2(false)),
          onKeydown: O[2] || (O[2] = withKeys(() => h2(false), ["enter"]))
        }, [
          T.$slots.year ? renderSlot(T.$slots, "year", {
            key: 0,
            year: e.year
          }) : createCommentVNode("", true),
          T.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, rr),
        unref(a)(unref(r), e.instance) ? (openBlock(), createBlock(Ht, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (I = unref(P)) == null ? void 0 : I.nextYear,
          disabled: e.isDisabled(true),
          onActivate: O[3] || (O[3] = (X) => j(true))
        }, {
          default: withCtx(() => [
            T.$slots["arrow-right"] ? renderSlot(T.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            T.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(g)(e.showYearPicker),
          css: unref(k)
        }, {
          default: withCtx(() => [
            e.showYearPicker ? (openBlock(), createBlock(Qt, {
              key: 0,
              items: e.items,
              "text-input": T.textInput,
              "esc-close": T.escClose,
              config: T.config,
              "is-last": T.autoApply && !unref(v).keepActionRow,
              "hide-navigation": T.hideNavigation,
              "aria-labels": T.ariaLabels,
              type: "year",
              onToggle: h2,
              onSelected: O[4] || (O[4] = (X) => _(X))
            }, createSlots({
              "button-icon": withCtx(() => [
                T.$slots["calendar-icon"] ? renderSlot(T.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                T.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yt), { key: 1 }))
              ]),
              _: 2
            }, [
              T.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: X }) => [
                  renderSlot(T.$slots, "year-overlay-value", {
                    text: X.text,
                    value: X.value
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
var Qa = (e, t, l) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((n) => he(e, n))) {
      const n = t.value.filter((a) => !he(a, e));
      t.value = n.length ? n : null;
    } else
      (l && +l > t.value.length || !l) && t.value.push(e);
  else
    t.value = [e];
};
var qa = (e, t, l) => {
  let n = e.value ? e.value.slice() : [];
  return n.length === 2 && n[1] !== null && (n = []), n.length ? Ce(t, n[0]) ? (n.unshift(t), l("range-start", n[0]), l("range-start", n[1])) : (n[1] = t, l("range-end", t)) : (n = [t], l("range-start", t)), n;
};
var da = (e, t, l, n) => {
  e && (e[0] && e[1] && l && t("auto-apply"), e[0] && !e[1] && n && l && t("auto-apply"));
};
var Nn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => st(W(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = st(W(e.value), e.timezone));
};
var En = (e, t, l, n) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && n.value.partialRange) ? n.value.fixedStart && (Oe(e, t.value[0]) || he(e, t.value[0])) ? [t.value[0], e] : n.value.fixedEnd && (Ce(e, t.value[1]) || he(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var Fn = ({
  multiCalendars: e,
  highlight: t,
  propDates: l,
  calendars: n,
  modelValue: a,
  props: m,
  filters: v,
  year: r,
  month: P,
  emit: C
}) => {
  const k = computed(() => Ua(m.yearRange, m.locale, m.reverseYears)), g = ref([false]), h2 = computed(() => (B, U) => {
    const y = set(et(/* @__PURE__ */ new Date()), {
      month: P.value(B),
      year: r.value(B)
    }), ie = U ? endOfYear(y) : startOfYear(y);
    return _n(
      ie,
      l.value.maxDate,
      l.value.minDate,
      m.preventMinMaxNavigation,
      U
    );
  }), _ = () => {
    for (let B = 0; B < e.value.count; B++)
      if (B === 0)
        n.value[B] = n.value[0];
      else {
        const U = set(W(), n.value[B - 1]);
        n.value[B] = { month: getMonth(U), year: getYear(addYears(U, 1)) };
      }
  }, j = (B) => {
    if (!B)
      return _();
    const U = set(W(), n.value[B]);
    return n.value[0].year = getYear(subYears(U, e.value.count - 1)), _();
  }, T = (B) => m.focusStartDate ? B[0] : B[1] ? B[1] : B[0], O = () => {
    if (a.value) {
      const B = Array.isArray(a.value) ? T(a.value) : a.value;
      n.value[0] = { month: getMonth(B), year: getYear(B) };
    }
  };
  onMounted(() => {
    O(), e.value.count && _();
  });
  const b = (B, U) => {
    n.value[U].year = B, C("update-month-year", { instance: U, year: B, month: n.value[U].month }), e.value.count && !e.value.solo && j(U);
  }, E = computed(() => (B) => _t(k.value, (U) => {
    var re;
    const y = r.value(B) === U.value, ie = Ut(
      U.value,
      Ot(l.value.minDate),
      Ot(l.value.maxDate)
    ) || ((re = v.value.years) == null ? void 0 : re.includes(r.value(B))), se = Ga(t.value, U.value);
    return { active: y, disabled: ie, highlighted: se };
  })), I = (B, U) => {
    b(B, U), F(U);
  }, X = (B, U = false) => {
    if (!h2.value(B, U)) {
      const y = U ? r.value(B) + 1 : r.value(B) - 1;
      b(y, B);
    }
  }, F = (B, U = false, y) => {
    U || C("reset-flow"), y !== void 0 ? g.value[B] = y : g.value[B] = !g.value[B], g.value[B] ? C("overlay-toggle", { open: true, overlay: Le.year }) : (C("overlay-closed"), C("overlay-toggle", { open: false, overlay: Le.year }));
  };
  return {
    isDisabled: h2,
    groupedYears: E,
    showYearPicker: g,
    selectYear: b,
    toggleYearPicker: F,
    handleYearSelect: I,
    handleYear: X
  };
};
var or = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: m,
    defaultedRange: v,
    defaultedHighlight: r,
    propDates: P,
    defaultedTz: C,
    defaultedFilters: k,
    defaultedMultiDates: g
  } = Pe(e), { modelValue: h2, year: _, month: j, calendars: T } = Gt(e, t), O = computed(() => Dn(e.formatLocale, e.locale, e.monthNameFormat)), b = ref(null), { checkMinMaxRange: E } = ht(e), {
    selectYear: I,
    groupedYears: X,
    showYearPicker: F,
    toggleYearPicker: B,
    handleYearSelect: U,
    handleYear: y,
    isDisabled: ie
  } = Fn({
    modelValue: h2,
    multiCalendars: l,
    highlight: r,
    calendars: T,
    year: _,
    propDates: P,
    month: j,
    filters: k,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (h2.value && e.focusStartDate || !h2.value) && I(getYear(W(e.startDate)), 0);
  });
  const se = (S) => S ? { month: getMonth(S), year: getYear(S) } : { month: null, year: null }, re = () => h2.value ? Array.isArray(h2.value) ? h2.value.map((S) => se(S)) : se(h2.value) : se(), Y = (S, $) => {
    const de = T.value[S], c = re();
    return Array.isArray(c) ? c.some((ae) => ae.year === (de == null ? void 0 : de.year) && ae.month === $) : (de == null ? void 0 : de.year) === c.year && $ === c.month;
  }, H = (S, $, de) => {
    var ae, V;
    const c = re();
    return Array.isArray(c) ? _.value($) === ((ae = c[de]) == null ? void 0 : ae.year) && S === ((V = c[de]) == null ? void 0 : V.month) : false;
  }, ne = (S, $) => {
    if (v.value.enabled) {
      const de = re();
      if (Array.isArray(h2.value) && Array.isArray(de)) {
        const c = H(S, $, 0) || H(S, $, 1), ae = it(et(W()), S, _.value($));
        return oa(h2.value, b.value, ae) && !c;
      }
      return false;
    }
    return false;
  }, L = computed(() => (S) => _t(O.value, ($) => {
    var pe;
    const de = Y(S, $.value), c = Ut(
      $.value,
      Sn(_.value(S), P.value.minDate),
      Rn(_.value(S), P.value.maxDate)
    ) || Dl(P.value.disabledDates, _.value(S)).includes($.value) || ((pe = k.value.months) == null ? void 0 : pe.includes($.value)), ae = ne($.value, S), V = Bn(r.value, $.value, _.value(S));
    return { active: de, disabled: c, isBetween: ae, highlighted: V };
  })), R = (S, $) => it(et(W()), S, _.value($)), p = (S, $) => {
    const de = h2.value ? h2.value : et(/* @__PURE__ */ new Date());
    h2.value = it(de, S, _.value($)), t("auto-apply"), t("update-flow-step");
  }, f = (S, $) => {
    const de = R(S, $);
    v.value.fixedEnd || v.value.fixedStart ? h2.value = En(de, h2, t, v) : h2.value ? E(de, h2.value) && (h2.value = qa(h2, R(S, $), t)) : h2.value = [R(S, $)], nextTick().then(() => {
      da(h2.value, t, e.autoApply, e.modelAuto);
    });
  }, J = (S, $) => {
    Qa(R(S, $), h2, g.value.limit), t("auto-apply", true);
  }, oe = (S, $) => (T.value[$].month = S, M($, T.value[$].year, S), g.value.enabled ? J(S, $) : v.value.enabled ? f(S, $) : p(S, $)), w = (S, $) => {
    I(S, $), M($, S, null);
  }, M = (S, $, de) => {
    let c = de;
    if (!c && c !== 0) {
      const ae = re();
      c = Array.isArray(ae) ? ae[S].month : ae.month;
    }
    t("update-month-year", { instance: S, year: $, month: c });
  };
  return {
    groupedMonths: L,
    groupedYears: X,
    year: _,
    isDisabled: ie,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: m,
    showYearPicker: F,
    modelValue: h2,
    presetDate: (S, $) => {
      Nn({
        value: S,
        modelValue: h2,
        range: v.value.enabled,
        timezone: $ ? void 0 : C.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (S, $) => {
      b.value = R(S, $);
    },
    selectMonth: oe,
    selectYear: w,
    toggleYearPicker: B,
    handleYearSelect: U,
    handleYear: y,
    getModelMonthYear: re
  };
};
var sr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...at
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
    const n = l, a = useSlots(), m = Qe(a, "yearMode"), v = e;
    onMounted(() => {
      v.shadow || n("mount", null);
    });
    const {
      groupedMonths: r,
      groupedYears: P,
      year: C,
      isDisabled: k,
      defaultedMultiCalendars: g,
      defaultedConfig: h2,
      showYearPicker: _,
      modelValue: j,
      presetDate: T,
      setHoverDate: O,
      selectMonth: b,
      selectYear: E,
      toggleYearPicker: I,
      handleYearSelect: X,
      handleYear: F,
      getModelMonthYear: B
    } = or(v, n);
    return t({ getSidebarProps: () => ({
      modelValue: j,
      year: C,
      getModelMonthYear: B,
      selectMonth: b,
      selectYear: E,
      handleYear: F
    }), presetDate: T, toggleYearPicker: (y) => I(0, y) }), (y, ie) => (openBlock(), createBlock(ia, {
      "multi-calendars": unref(g).count,
      collapse: y.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: se }) => [
        y.$slots["top-extra"] ? renderSlot(y.$slots, "top-extra", {
          key: 0,
          value: y.internalModelValue
        }) : createCommentVNode("", true),
        y.$slots["month-year"] ? renderSlot(y.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(C),
          months: unref(r)(se),
          years: unref(P)(se),
          selectMonth: unref(b),
          selectYear: unref(E),
          instance: se
        }))) : (openBlock(), createBlock(Qt, {
          key: 2,
          items: unref(r)(se),
          "arrow-navigation": y.arrowNavigation,
          "is-last": y.autoApply && !unref(h2).keepActionRow,
          "esc-close": y.escClose,
          height: unref(h2).modeHeight,
          config: y.config,
          "no-overlay-focus": !!(y.noOverlayFocus || y.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (re) => unref(b)(re, se),
          onHoverValue: (re) => unref(O)(re, se)
        }, createSlots({
          header: withCtx(() => [
            createVNode(In, mergeProps(y.$props, {
              items: unref(P)(se),
              instance: se,
              "show-year-picker": unref(_)[se],
              year: unref(C)(se),
              "is-disabled": (re) => unref(k)(se, re),
              onHandleYear: (re) => unref(F)(se, re),
              onYearSelect: (re) => unref(X)(re, se),
              onToggleYearPicker: (re) => unref(I)(se, re == null ? void 0 : re.flow, re == null ? void 0 : re.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(m), (re, Y) => ({
                name: re,
                fn: withCtx((H) => [
                  renderSlot(y.$slots, re, normalizeProps(guardReactiveProps(H)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          y.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: re }) => [
              renderSlot(y.$slots, "month-overlay-value", {
                text: re.text,
                value: re.value
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
var ur = (e, t) => {
  const { modelValue: l } = Gt(e, t), n = ref(null), { defaultedHighlight: a, defaultedMultiDates: m, defaultedFilters: v, defaultedRange: r, propDates: P } = Pe(e), C = ref();
  onMounted(() => {
    e.startDate && (l.value && e.focusStartDate || !l.value) && (C.value = getYear(W(e.startDate)));
  });
  const k = (O) => Array.isArray(l.value) ? l.value.some((b) => getYear(b) === O) : l.value ? getYear(l.value) === O : false, g = (O) => r.value.enabled && Array.isArray(l.value) ? oa(l.value, n.value, _(O)) : false, h2 = computed(() => _t(Ua(e.yearRange, e.locale, e.reverseYears), (O) => {
    const b = k(O.value), E = Ut(
      O.value,
      Ot(P.value.minDate),
      Ot(P.value.maxDate)
    ) || v.value.years.includes(O.value), I = g(O.value) && !b, X = Ga(a.value, O.value);
    return { active: b, disabled: E, isBetween: I, highlighted: X };
  })), _ = (O) => setYear(et(/* @__PURE__ */ new Date()), O);
  return {
    groupedYears: h2,
    modelValue: l,
    focusYear: C,
    setHoverValue: (O) => {
      n.value = setYear(et(/* @__PURE__ */ new Date()), O);
    },
    selectYear: (O) => {
      var b;
      if (t("update-month-year", { instance: 0, year: O }), m.value.enabled)
        return l.value ? Array.isArray(l.value) && (((b = l.value) == null ? void 0 : b.map((I) => getYear(I))).includes(O) ? l.value = l.value.filter((I) => getYear(I) !== O) : l.value.push(setYear(qe(W()), O))) : l.value = [setYear(qe(W()), O)], t("auto-apply", true);
      r.value.enabled ? (l.value = qa(l, _(O), t), nextTick().then(() => {
        da(l.value, t, e.autoApply, e.modelAuto);
      })) : (l.value = _(O), t("auto-apply"));
    }
  };
};
var ir = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...at
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
    const n = l, a = e, { groupedYears: m, modelValue: v, focusYear: r, selectYear: P, setHoverValue: C } = ur(a, n), { defaultedConfig: k } = Pe(a);
    return t({ getSidebarProps: () => ({
      modelValue: v,
      selectYear: P
    }) }), (h2, _) => (openBlock(), createElementBlock("div", null, [
      h2.$slots["top-extra"] ? renderSlot(h2.$slots, "top-extra", {
        key: 0,
        value: h2.internalModelValue
      }) : createCommentVNode("", true),
      h2.$slots["month-year"] ? renderSlot(h2.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(m),
        selectYear: unref(P)
      }))) : (openBlock(), createBlock(Qt, {
        key: 2,
        items: unref(m),
        "is-last": h2.autoApply && !unref(k).keepActionRow,
        height: unref(k).modeHeight,
        config: h2.config,
        "no-overlay-focus": !!(h2.noOverlayFocus || h2.textInput),
        "focus-value": unref(r),
        type: "year",
        "use-relative": "",
        onSelected: unref(P),
        onHoverValue: unref(C)
      }, createSlots({ _: 2 }, [
        h2.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: j }) => [
            renderSlot(h2.$slots, "year-overlay-value", {
              text: j.text,
              value: j.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var dr = {
  key: 0,
  class: "dp__time_input"
};
var cr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var fr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var vr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var mr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var pr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var gr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var yr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var hr = { key: 0 };
var br = ["aria-label"];
var kr = defineComponent({
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
    "overlay-closed",
    "overlay-opened",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: l }) {
    const n = l, a = e, { setTimePickerElements: m, setTimePickerBackRef: v } = yt(), { defaultedAriaLabels: r, defaultedTransitions: P, defaultedFilters: C, defaultedConfig: k, defaultedRange: g } = Pe(a), { transitionName: h2, showTransition: _ } = Kt(P), j = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), T = ref("AM"), O = ref(null), b = ref([]), E = ref();
    onMounted(() => {
      n("mounted");
    });
    const I = (s) => set(/* @__PURE__ */ new Date(), {
      hours: s.hours,
      minutes: s.minutes,
      seconds: a.enableSeconds ? s.seconds : 0,
      milliseconds: 0
    }), X = computed(
      () => (s) => R(s, a[s]) || B(s, a[s])
    ), F = computed(() => ({ hours: a.hours, minutes: a.minutes, seconds: a.seconds })), B = (s, N) => g.value.enabled && !g.value.disableTimeRangeValidation ? !a.validateTime(s, N) : false, U = (s, N) => {
      if (g.value.enabled && !g.value.disableTimeRangeValidation) {
        const x = N ? +a[`${s}Increment`] : -+a[`${s}Increment`], q = a[s] + x;
        return !a.validateTime(s, q);
      }
      return false;
    }, y = computed(() => (s) => !w(+a[s] + +a[`${s}Increment`], s) || U(s, true)), ie = computed(() => (s) => !w(+a[s] - +a[`${s}Increment`], s) || U(s, false)), se = (s, N) => add(set(W(), s), N), re = (s, N) => sub(set(W(), s), N), Y = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !a.timePickerInline,
        dp__time_col_reg_block: !a.enableSeconds && a.is24 && !a.timePickerInline,
        dp__time_col_reg_inline: !a.enableSeconds && a.is24 && a.timePickerInline,
        dp__time_col_reg_with_button: !a.enableSeconds && !a.is24,
        dp__time_col_sec: a.enableSeconds && a.is24,
        dp__time_col_sec_with_button: a.enableSeconds && !a.is24
      })
    ), H = computed(() => {
      const s = [{ type: "hours" }];
      return a.enableMinutes && s.push({ type: "", separator: true }, {
        type: "minutes"
      }), a.enableSeconds && s.push({ type: "", separator: true }, {
        type: "seconds"
      }), s;
    }), ne = computed(() => H.value.filter((s) => !s.separator)), L = computed(() => (s) => {
      if (s === "hours") {
        const N = de(+a.hours);
        return { text: N < 10 ? `0${N}` : `${N}`, value: N };
      }
      return { text: a[s] < 10 ? `0${a[s]}` : `${a[s]}`, value: a[s] };
    }), R = (s, N) => {
      var q;
      if (!a.disabledTimesConfig)
        return false;
      const x = a.disabledTimesConfig(a.order, s === "hours" ? N : void 0);
      return x[s] ? !!((q = x[s]) != null && q.includes(N)) : true;
    }, p = (s, N) => N !== "hours" || T.value === "AM" ? s : s + 12, f = (s) => {
      const N = a.is24 ? 24 : 12, x = s === "hours" ? N : 60, q = +a[`${s}GridIncrement`], u = s === "hours" && !a.is24 ? q : 0, K = [];
      for (let ce = u; ce < x; ce += q)
        K.push({ value: a.is24 ? ce : p(ce, s), text: ce < 10 ? `0${ce}` : `${ce}` });
      return s === "hours" && !a.is24 && K.unshift({ value: T.value === "PM" ? 12 : 0, text: "12" }), _t(K, (ce) => ({ active: false, disabled: C.value.times[s].includes(ce.value) || !w(ce.value, s) || R(s, ce.value) || B(s, ce.value) }));
    }, J = (s) => s >= 0 ? s : 59, oe = (s) => s >= 0 ? s : 23, w = (s, N) => {
      const x = a.minTime ? I(Ma(a.minTime)) : null, q = a.maxTime ? I(Ma(a.maxTime)) : null, u = I(
        Ma(
          F.value,
          N,
          N === "minutes" || N === "seconds" ? J(s) : oe(s)
        )
      );
      return x && q ? (isBefore(u, q) || isEqual(u, q)) && (isAfter(u, x) || isEqual(u, x)) : x ? isAfter(u, x) || isEqual(u, x) : q ? isBefore(u, q) || isEqual(u, q) : true;
    }, M = (s) => a[`no${s[0].toUpperCase() + s.slice(1)}Overlay`], z = (s) => {
      M(s) || (j[s] = !j[s], j[s] ? n("overlay-opened", s) : n("overlay-closed", s));
    }, d = (s) => s === "hours" ? getHours : s === "minutes" ? getMinutes : getSeconds, S = () => {
      E.value && clearTimeout(E.value);
    }, $ = (s, N = true, x) => {
      const q = N ? se : re, u = N ? +a[`${s}Increment`] : -+a[`${s}Increment`];
      w(+a[s] + u, s) && n(
        `update:${s}`,
        d(s)(q({ [s]: +a[s] }, { [s]: +a[`${s}Increment`] }))
      ), !(x != null && x.keyboard) && k.value.timeArrowHoldThreshold && (E.value = setTimeout(() => {
        $(s, N);
      }, k.value.timeArrowHoldThreshold));
    }, de = (s) => a.is24 ? s : (s >= 12 ? T.value = "PM" : T.value = "AM", dl(s)), c = () => {
      T.value === "PM" ? (T.value = "AM", n("update:hours", a.hours - 12)) : (T.value = "PM", n("update:hours", a.hours + 12)), n("am-pm-change", T.value);
    }, ae = (s) => {
      j[s] = true;
    }, V = (s, N, x) => {
      if (s && a.arrowNavigation) {
        Array.isArray(b.value[N]) ? b.value[N][x] = s : b.value[N] = [s];
        const q = b.value.reduce(
          (u, K) => K.map((ce, $e) => [...u[$e] || [], K[$e]]),
          []
        );
        v(a.closeTimePickerBtn), O.value && (q[1] = q[1].concat(O.value)), m(q, a.order);
      }
    }, pe = (s, N) => (z(s), n(`update:${s}`, N));
    return t({ openChildCmp: ae }), (s, N) => {
      var x;
      return s.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", dr, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(H.value, (q, u) => {
          var K, ce, $e;
          return openBlock(), createElementBlock("div", {
            key: u,
            class: normalizeClass(Y.value)
          }, [
            q.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (we) => V(we, u, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !s.timePickerInline,
                  dp__inc_dec_button_inline: s.timePickerInline,
                  dp__tp_inline_btn_top: s.timePickerInline,
                  dp__inc_dec_button_disabled: y.value(q.type)
                }),
                "data-test": `${q.type}-time-inc-btn-${a.order}`,
                "aria-label": (K = unref(r)) == null ? void 0 : K.incrementValue(q.type),
                tabindex: "0",
                onKeydown: (we) => unref(je)(we, () => $(q.type, true, { keyboard: true }), true),
                onClick: (we) => unref(k).timeArrowHoldThreshold ? void 0 : $(q.type, true),
                onMousedown: (we) => unref(k).timeArrowHoldThreshold ? $(q.type, true) : void 0,
                onMouseup: S
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  fr,
                  vr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  s.$slots["arrow-up"] ? renderSlot(s.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  s.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, cr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (we) => V(we, u, 1),
                type: "button",
                "aria-label": (ce = unref(r)) == null ? void 0 : ce.openTpOverlay(q.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !s.timePickerInline,
                  dp__time_display_inline: s.timePickerInline,
                  "dp--time-invalid": X.value(q.type),
                  "dp--time-overlay-btn": !X.value(q.type)
                }),
                disabled: M(q.type),
                tabindex: "0",
                "data-test": `${q.type}-toggle-overlay-btn-${a.order}`,
                onKeydown: (we) => unref(je)(we, () => z(q.type), true),
                onClick: (we) => z(q.type)
              }, [
                s.$slots[q.type] ? renderSlot(s.$slots, q.type, {
                  key: 0,
                  text: L.value(q.type).text,
                  value: L.value(q.type).value
                }) : createCommentVNode("", true),
                s.$slots[q.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(L.value(q.type).text), 1)
                ], 64))
              ], 42, mr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (we) => V(we, u, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !s.timePickerInline,
                  dp__inc_dec_button_inline: s.timePickerInline,
                  dp__tp_inline_btn_bottom: s.timePickerInline,
                  dp__inc_dec_button_disabled: ie.value(q.type)
                }),
                "data-test": `${q.type}-time-dec-btn-${a.order}`,
                "aria-label": ($e = unref(r)) == null ? void 0 : $e.decrementValue(q.type),
                tabindex: "0",
                onKeydown: (we) => unref(je)(we, () => $(q.type, false, { keyboard: true }), true),
                onClick: (we) => unref(k).timeArrowHoldThreshold ? void 0 : $(q.type, false),
                onMousedown: (we) => unref(k).timeArrowHoldThreshold ? $(q.type, false) : void 0,
                onMouseup: S
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  gr,
                  yr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  s.$slots["arrow-down"] ? renderSlot(s.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  s.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
                ], 64))
              ], 42, pr)
            ], 64))
          ], 2);
        }), 128)),
        s.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", hr, [
          s.$slots["am-pm-button"] ? renderSlot(s.$slots, "am-pm-button", {
            key: 0,
            toggle: c,
            value: T.value
          }) : createCommentVNode("", true),
          s.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: O,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (x = unref(r)) == null ? void 0 : x.amPmButton,
            tabindex: "0",
            onClick: c,
            onKeydown: N[0] || (N[0] = (q) => unref(je)(q, () => c(), true))
          }, toDisplayString(T.value), 41, br))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(ne.value, (q, u) => (openBlock(), createBlock(Transition, {
          key: u,
          name: unref(h2)(j[q.type]),
          css: unref(_)
        }, {
          default: withCtx(() => [
            j[q.type] ? (openBlock(), createBlock(Qt, {
              key: 0,
              items: f(q.type),
              "is-last": s.autoApply && !unref(k).keepActionRow,
              "esc-close": s.escClose,
              type: q.type,
              "text-input": s.textInput,
              config: s.config,
              "arrow-navigation": s.arrowNavigation,
              "aria-labels": s.ariaLabels,
              onSelected: (K) => pe(q.type, K),
              onToggle: (K) => z(q.type),
              onResetFlow: N[1] || (N[1] = (K) => s.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                s.$slots["clock-icon"] ? renderSlot(s.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                s.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(s.timePickerInline ? unref(Yt) : unref(Va)), { key: 1 }))
              ]),
              _: 2
            }, [
              s.$slots[`${q.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: K }) => [
                  renderSlot(s.$slots, `${q.type}-overlay-value`, {
                    text: K.text,
                    value: K.value
                  })
                ]),
                key: "0"
              } : void 0,
              s.$slots[`${q.type}-overlay-header`] ? {
                name: "header",
                fn: withCtx(() => [
                  renderSlot(s.$slots, `${q.type}-overlay-header`, {
                    toggle: () => z(q.type)
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
var wr = { class: "dp--tp-wrap" };
var Mr = ["aria-label", "tabindex"];
var Dr = ["tabindex"];
var $r = ["aria-label"];
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
    ...at
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
    const n = l, a = e, { buildMatrix: m, setTimePicker: v } = yt(), r = useSlots(), { defaultedTransitions: P, defaultedAriaLabels: C, defaultedTextInput: k, defaultedConfig: g, defaultedRange: h2 } = Pe(a), { transitionName: _, showTransition: j } = Kt(P), { hideNavigationButtons: T } = sa(), O = ref(null), b = ref(null), E = ref([]), I = ref(null);
    onMounted(() => {
      n("mount"), !a.timePicker && a.arrowNavigation ? m([Ye(O.value)], "time") : v(true, a.timePicker);
    });
    const X = computed(() => h2.value.enabled && a.modelAuto ? $n(a.internalModelValue) : true), F = ref(false), B = (p) => ({
      hours: Array.isArray(a.hours) ? a.hours[p] : a.hours,
      minutes: Array.isArray(a.minutes) ? a.minutes[p] : a.minutes,
      seconds: Array.isArray(a.seconds) ? a.seconds[p] : a.seconds
    }), U = computed(() => {
      const p = [];
      if (h2.value.enabled)
        for (let f = 0; f < 2; f++)
          p.push(B(f));
      else
        p.push(B(0));
      return p;
    }), y = (p, f = false, J = "") => {
      f || n("reset-flow"), F.value = p, n(p ? "overlay-opened" : "overlay-closed", Le.time), a.arrowNavigation && v(p), nextTick(() => {
        J !== "" && E.value[0] && E.value[0].openChildCmp(J);
      });
    }, ie = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: a.autoApply && !g.value.keepActionRow
    })), se = Qe(r, "timePicker"), re = (p, f, J) => h2.value.enabled ? f === 0 ? [p, U.value[1][J]] : [U.value[0][J], p] : p, Y = (p) => {
      n("update:hours", p);
    }, H = (p) => {
      n("update:minutes", p);
    }, ne = (p) => {
      n("update:seconds", p);
    }, L = () => {
      if (I.value && !k.value.enabled && !a.noOverlayFocus) {
        const p = An(I.value);
        p && p.focus({ preventScroll: true });
      }
    }, R = (p) => {
      n("overlay-closed", p);
    };
    return t({ toggleTimePicker: y }), (p, f) => {
      var J;
      return openBlock(), createElementBlock("div", wr, [
        !p.timePicker && !p.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: O,
          type: "button",
          class: normalizeClass(ie.value),
          "aria-label": (J = unref(C)) == null ? void 0 : J.openTimePicker,
          tabindex: p.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: f[0] || (f[0] = (oe) => unref(je)(oe, () => y(true))),
          onClick: f[1] || (f[1] = (oe) => y(true))
        }, [
          p.$slots["clock-icon"] ? renderSlot(p.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          p.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
        ], 42, Mr)), [
          [vShow, !unref(T)(p.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(_)(F.value),
          css: unref(j) && !p.timePickerInline
        }, {
          default: withCtx(() => {
            var oe;
            return [
              F.value || p.timePicker || p.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: I,
                class: normalizeClass({
                  dp__overlay: !p.timePickerInline,
                  "dp--overlay-absolute": !a.timePicker && !p.timePickerInline,
                  "dp--overlay-relative": a.timePicker
                }),
                style: normalizeStyle(p.timePicker ? { height: `${unref(g).modeHeight}px` } : void 0),
                tabindex: p.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    p.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  p.$slots["time-picker-overlay"] ? renderSlot(p.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: Y,
                    setMinutes: H,
                    setSeconds: ne
                  }) : createCommentVNode("", true),
                  p.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(p.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(U.value, (w, M) => withDirectives((openBlock(), createBlock(kr, mergeProps({
                      key: M,
                      ref_for: true
                    }, {
                      ...p.$props,
                      order: M,
                      hours: w.hours,
                      minutes: w.minutes,
                      seconds: w.seconds,
                      closeTimePickerBtn: b.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: M === 0 ? p.fixedStart : p.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: E,
                      "validate-time": (z, d) => e.validateTime(z, re(d, M, z)),
                      "onUpdate:hours": (z) => Y(re(z, M, "hours")),
                      "onUpdate:minutes": (z) => H(re(z, M, "minutes")),
                      "onUpdate:seconds": (z) => ne(re(z, M, "seconds")),
                      onMounted: L,
                      onOverlayClosed: R,
                      onOverlayOpened: f[2] || (f[2] = (z) => p.$emit("overlay-opened", z)),
                      onAmPmChange: f[3] || (f[3] = (z) => p.$emit("am-pm-change", z))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(se), (z, d) => ({
                        name: z,
                        fn: withCtx((S) => [
                          renderSlot(p.$slots, z, mergeProps({ ref_for: true }, S))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, M === 0 ? true : X.value]
                    ])), 128))
                  ], 2)),
                  !p.timePicker && !p.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: b,
                    type: "button",
                    class: normalizeClass(ie.value),
                    "aria-label": (oe = unref(C)) == null ? void 0 : oe.closeTimePicker,
                    tabindex: "0",
                    onKeydown: f[4] || (f[4] = (w) => unref(je)(w, () => y(false))),
                    onClick: f[5] || (f[5] = (w) => y(false))
                  }, [
                    p.$slots["calendar-icon"] ? renderSlot(p.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    p.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yt), { key: 1 }))
                  ], 42, $r)), [
                    [vShow, !unref(T)(p.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Dr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Hn = (e, t, l, n) => {
  const { defaultedRange: a } = Pe(e), m = (I, X) => Array.isArray(t[I]) ? t[I][X] : t[I], v = (I) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[I] : t.seconds : 0, r = (I, X) => I ? X !== void 0 ? pt(I, m("hours", X), m("minutes", X), v(X)) : pt(I, t.hours, t.minutes, v()) : setSeconds(W(), v(X)), P = (I, X) => {
    t[I] = X;
  }, C = computed(() => e.modelAuto && a.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : a.value.enabled), k = (I, X) => {
    const F = Object.fromEntries(
      Object.keys(t).map((B) => B === I ? [B, X] : [B, t[B]].slice())
    );
    if (C.value && !a.value.disableTimeRangeValidation) {
      const B = (y) => l.value ? pt(
        l.value[y],
        F.hours[y],
        F.minutes[y],
        F.seconds[y]
      ) : null, U = (y) => setMilliseconds(l.value[y], 0);
      return !(he(B(0), B(1)) && (isAfter(B(0), U(1)) || isBefore(B(1), U(0))));
    }
    return true;
  }, g = (I, X) => {
    k(I, X) && (P(I, X), n && n());
  }, h2 = (I) => {
    g("hours", I);
  }, _ = (I) => {
    g("minutes", I);
  }, j = (I) => {
    g("seconds", I);
  }, T = (I, X, F, B) => {
    X && h2(I), !X && !F && _(I), F && j(I), l.value && B(l.value);
  }, O = (I) => {
    if (I) {
      const X = Array.isArray(I), F = X ? [+I[0].hours, +I[1].hours] : +I.hours, B = X ? [+I[0].minutes, +I[1].minutes] : +I.minutes, U = X ? [+I[0].seconds, +I[1].seconds] : +I.seconds;
      P("hours", F), P("minutes", B), e.enableSeconds && P("seconds", U);
    }
  }, b = (I, X) => {
    const F = {
      hours: Array.isArray(t.hours) ? t.hours[I] : t.hours,
      disabledArr: []
    };
    return (X || X === 0) && (F.hours = X), Array.isArray(e.disabledTimes) && (F.disabledArr = a.value.enabled && Array.isArray(e.disabledTimes[I]) ? e.disabledTimes[I] : e.disabledTimes), F;
  }, E = computed(() => (I, X) => {
    var F;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: B, hours: U } = b(I, X), y = B.filter((ie) => +ie.hours === U);
      return ((F = y[0]) == null ? void 0 : F.minutes) === "*" ? { hours: [U], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (y == null ? void 0 : y.map((ie) => +ie.minutes)) ?? [],
        seconds: (y == null ? void 0 : y.map((ie) => ie.seconds ? +ie.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: P,
    updateHours: h2,
    updateMinutes: _,
    updateSeconds: j,
    getSetDateTime: r,
    updateTimeValues: T,
    getSecondsValue: v,
    assignStartTime: O,
    validateTime: k,
    disabledTimesConfig: E
  };
};
var Ar = (e, t) => {
  const { modelValue: l, time: n } = Gt(e, t), { defaultedStartTime: a, defaultedRange: m } = Pe(e), { updateTimeValues: v, getSetDateTime: r, setTime: P, assignStartTime: C, disabledTimesConfig: k, validateTime: g } = Hn(e, n, l, h2);
  function h2() {
    t("update-flow-step");
  }
  const _ = (F) => {
    const { hours: B, minutes: U, seconds: y } = F;
    return { hours: +B, minutes: +U, seconds: y ? +y : 0 };
  }, j = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const B = _(e.startTime[0]), U = _(e.startTime[1]);
        return [set(W(), B), set(W(), U)];
      }
      const F = _(e.startTime);
      return set(W(), F);
    }
    return m.value.enabled ? [null, null] : null;
  }, T = () => {
    if (m.value.enabled) {
      const [F, B] = j();
      l.value = [r(F, 0), r(B, 1)];
    } else
      l.value = r(j());
  }, O = (F) => Array.isArray(F) ? [$t(W(F[0])), $t(W(F[1]))] : [$t(F ?? W())], b = (F, B, U) => {
    P("hours", F), P("minutes", B), P("seconds", e.enableSeconds ? U : 0);
  }, E = () => {
    const [F, B] = O(l.value);
    return m.value.enabled ? b(
      [F.hours, B.hours],
      [F.minutes, B.minutes],
      [F.seconds, B.seconds]
    ) : b(F.hours, F.minutes, F.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return C(a.value), l.value ? E() : T();
  });
  const I = () => {
    Array.isArray(l.value) ? l.value = l.value.map((F, B) => F && r(F, B)) : l.value = r(l.value), t("time-update");
  };
  return {
    modelValue: l,
    time: n,
    disabledTimesConfig: k,
    updateTime: (F, B = true, U = false) => {
      v(F, B, U, I);
    },
    validateTime: g
  };
};
var Tr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...at
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
    const n = l, a = e, m = useSlots(), v = Qe(m, "timePicker"), r = ref(null), { time: P, modelValue: C, disabledTimesConfig: k, updateTime: g, validateTime: h2 } = Ar(a, n);
    return onMounted(() => {
      a.shadow || n("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: C,
      time: P,
      updateTime: g
    }), toggleTimePicker: (T, O = false, b = "") => {
      var E;
      (E = r.value) == null || E.toggleTimePicker(T, O, b);
    } }), (T, O) => (openBlock(), createBlock(ia, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ln, mergeProps({
          ref_key: "tpRef",
          ref: r
        }, T.$props, {
          hours: unref(P).hours,
          minutes: unref(P).minutes,
          seconds: unref(P).seconds,
          "internal-model-value": T.internalModelValue,
          "disabled-times-config": unref(k),
          "validate-time": unref(h2),
          "onUpdate:hours": O[0] || (O[0] = (b) => unref(g)(b)),
          "onUpdate:minutes": O[1] || (O[1] = (b) => unref(g)(b, false)),
          "onUpdate:seconds": O[2] || (O[2] = (b) => unref(g)(b, false, true)),
          onAmPmChange: O[3] || (O[3] = (b) => T.$emit("am-pm-change", b)),
          onResetFlow: O[4] || (O[4] = (b) => T.$emit("reset-flow")),
          onOverlayClosed: O[5] || (O[5] = (b) => T.$emit("overlay-toggle", { open: false, overlay: b })),
          onOverlayOpened: O[6] || (O[6] = (b) => T.$emit("overlay-toggle", { open: true, overlay: b }))
        }), createSlots({ _: 2 }, [
          renderList(unref(v), (b, E) => ({
            name: b,
            fn: withCtx((I) => [
              renderSlot(T.$slots, b, normalizeProps(guardReactiveProps(I)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var Sr = { class: "dp--header-wrap" };
var Rr = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Pr = { key: 0 };
var Cr = { class: "dp__month_year_wrap" };
var _r = ["aria-label", "data-test", "onClick", "onKeydown"];
var Or = defineComponent({
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
    ...at
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed", "overlay-opened"],
  setup(e, { expose: t, emit: l }) {
    const n = l, a = e, {
      defaultedTransitions: m,
      defaultedAriaLabels: v,
      defaultedMultiCalendars: r,
      defaultedFilters: P,
      defaultedConfig: C,
      defaultedHighlight: k,
      propDates: g
    } = Pe(a), { transitionName: h2, showTransition: _ } = Kt(m), { buildMatrix: j } = yt(), { handleMonthYearChange: T, isDisabled: O, updateMonthYear: b } = Vl(a, n), { showLeftIcon: E, showRightIcon: I } = sa(), X = ref(false), F = ref(false), B = ref([null, null, null, null]);
    onMounted(() => {
      n("mount");
    });
    const U = (w) => ({
      get: () => a[w],
      set: (M) => {
        const z = w === xe.month ? xe.year : xe.month;
        n("update-month-year", { [w]: M, [z]: a[z] }), w === xe.month ? L(true) : R(true);
      }
    }), y = computed(U(xe.month)), ie = computed(U(xe.year)), se = computed(() => (w) => ({
      month: a.month,
      year: a.year,
      items: w === xe.month ? a.months : a.years,
      instance: a.instance,
      updateMonthYear: b,
      toggle: w === xe.month ? L : R
    })), re = computed(() => {
      const w = a.months.find((M) => M.value === a.month);
      return w || { text: "", value: 0 };
    }), Y = computed(() => _t(a.months, (w) => {
      const M = a.month === w.value, z = Ut(
        w.value,
        Sn(a.year, g.value.minDate),
        Rn(a.year, g.value.maxDate)
      ) || P.value.months.includes(w.value), d = Bn(k.value, w.value, a.year);
      return { active: M, disabled: z, highlighted: d };
    })), H = computed(() => _t(a.years, (w) => {
      const M = a.year === w.value, z = Ut(
        w.value,
        Ot(g.value.minDate),
        Ot(g.value.maxDate)
      ) || P.value.years.includes(w.value), d = Ga(k.value, w.value);
      return { active: M, disabled: z, highlighted: d };
    })), ne = (w, M, z) => {
      z !== void 0 ? w.value = z : w.value = !w.value, w.value ? n("overlay-opened", M) : n("overlay-closed", M);
    }, L = (w = false, M) => {
      p(w), ne(X, Le.month, M);
    }, R = (w = false, M) => {
      p(w), ne(F, Le.year, M);
    }, p = (w) => {
      w || n("reset-flow");
    }, f = (w, M) => {
      a.arrowNavigation && (B.value[M] = Ye(w), j(B.value, "monthYear"));
    }, J = computed(() => {
      var w, M;
      return [
        {
          type: xe.month,
          index: 1,
          toggle: L,
          modelValue: y.value,
          updateModelValue: (z) => y.value = z,
          text: re.value.text,
          showSelectionGrid: X.value,
          items: Y.value,
          ariaLabel: (w = v.value) == null ? void 0 : w.openMonthsOverlay
        },
        {
          type: xe.year,
          index: 2,
          toggle: R,
          modelValue: ie.value,
          updateModelValue: (z) => ie.value = z,
          text: Tn(a.year, a.locale),
          showSelectionGrid: F.value,
          items: H.value,
          ariaLabel: (M = v.value) == null ? void 0 : M.openYearsOverlay
        }
      ];
    }), oe = computed(() => a.disableYearSelect ? [J.value[0]] : a.yearFirst ? [...J.value].reverse() : J.value);
    return t({
      toggleMonthPicker: L,
      toggleYearPicker: R,
      handleMonthYearChange: T
    }), (w, M) => {
      var z, d, S;
      return openBlock(), createElementBlock("div", Sr, [
        w.$slots["month-year"] ? (openBlock(), createElementBlock("div", Rr, [
          renderSlot(w.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(b), handleMonthYearChange: unref(T), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          w.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Pr, [
            renderSlot(w.$slots, "top-extra", { value: w.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Cr, [
            unref(E)(unref(r), e.instance) && !w.vertical ? (openBlock(), createBlock(Ht, {
              key: 0,
              "aria-label": (z = unref(v)) == null ? void 0 : z.prevMonth,
              disabled: unref(O)(false),
              onActivate: M[0] || (M[0] = ($) => unref(T)(false, true)),
              onSetRef: M[1] || (M[1] = ($) => f($, 0))
            }, {
              default: withCtx(() => [
                w.$slots["arrow-left"] ? renderSlot(w.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                w.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: w.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(oe.value, ($, de) => (openBlock(), createElementBlock(Fragment, {
                key: $.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (c) => f(c, de + 1),
                  type: "button",
                  class: "dp__btn dp__month_year_select",
                  tabindex: "0",
                  "aria-label": $.ariaLabel,
                  "data-test": `${$.type}-toggle-overlay-${e.instance}`,
                  onClick: $.toggle,
                  onKeydown: (c) => unref(je)(c, () => $.toggle(), true)
                }, [
                  w.$slots[$.type] ? renderSlot(w.$slots, $.type, {
                    key: 0,
                    text: $.text,
                    value: a[$.type]
                  }) : createCommentVNode("", true),
                  w.$slots[$.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString($.text), 1)
                  ], 64))
                ], 40, _r),
                createVNode(Transition, {
                  name: unref(h2)($.showSelectionGrid),
                  css: unref(_)
                }, {
                  default: withCtx(() => [
                    $.showSelectionGrid ? (openBlock(), createBlock(Qt, {
                      key: 0,
                      items: $.items,
                      "arrow-navigation": w.arrowNavigation,
                      "hide-navigation": w.hideNavigation,
                      "is-last": w.autoApply && !unref(C).keepActionRow,
                      "skip-button-ref": false,
                      config: w.config,
                      type: $.type,
                      "header-refs": [],
                      "esc-close": w.escClose,
                      "menu-wrap-ref": w.menuWrapRef,
                      "text-input": w.textInput,
                      "aria-labels": w.ariaLabels,
                      onSelected: $.updateModelValue,
                      onToggle: $.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        w.$slots["calendar-icon"] ? renderSlot(w.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        w.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yt), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      w.$slots[`${$.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: c }) => [
                          renderSlot(w.$slots, `${$.type}-overlay-value`, {
                            text: c.text,
                            value: c.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      w.$slots[`${$.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(w.$slots, `${$.type}-overlay`, mergeProps({ ref_for: true }, se.value($.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      w.$slots[`${$.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(w.$slots, `${$.type}-overlay-header`, {
                            toggle: $.toggle
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
            unref(E)(unref(r), e.instance) && w.vertical ? (openBlock(), createBlock(Ht, {
              key: 1,
              "aria-label": (d = unref(v)) == null ? void 0 : d.prevMonth,
              disabled: unref(O)(false),
              onActivate: M[2] || (M[2] = ($) => unref(T)(false, true))
            }, {
              default: withCtx(() => [
                w.$slots["arrow-up"] ? renderSlot(w.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                w.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(I)(unref(r), e.instance) ? (openBlock(), createBlock(Ht, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(O)(true),
              "aria-label": (S = unref(v)) == null ? void 0 : S.nextMonth,
              onActivate: M[3] || (M[3] = ($) => unref(T)(true, true)),
              onSetRef: M[4] || (M[4] = ($) => f($, w.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                w.$slots[w.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(w.$slots, w.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                w.$slots[w.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(w.vertical ? unref(za) : unref(Ha)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Br = ["aria-label"];
var Yr = {
  class: "dp__calendar_header",
  role: "row"
};
var Ir = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Nr = ["aria-label"];
var Er = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Fr = ["aria-label"];
var Lr = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Hr = { class: "dp__cell_inner" };
var Vr = ["id", "aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Wr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
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
  setup(e, { expose: t, emit: l }) {
    const n = l, a = e, { buildMultiLevelMatrix: m } = yt(), {
      defaultedTransitions: v,
      defaultedConfig: r,
      defaultedAriaLabels: P,
      defaultedMultiCalendars: C,
      defaultedWeekNumbers: k,
      defaultedMultiDates: g
    } = Pe(a), h2 = ref(null), _ = ref({
      bottom: "",
      left: "",
      transform: ""
    }), j = ref([]), T = ref(null), O = ref(true), b = ref(""), E = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), I = ref([]), X = ref({ left: "50%" }), F = ref(false), B = computed(() => a.calendar ? a.calendar(a.mappedDates) : a.mappedDates), U = computed(() => a.dayNames ? Array.isArray(a.dayNames) ? a.dayNames : a.dayNames(a.locale, +a.weekStart) : il(a.formatLocale, a.locale, +a.weekStart));
    onMounted(() => {
      n("mount", { cmp: "calendar", refs: j }), r.value.noSwipe || T.value && (T.value.addEventListener("touchstart", J, { passive: false }), T.value.addEventListener("touchend", oe, { passive: false }), T.value.addEventListener("touchmove", w, { passive: false })), a.monthChangeOnScroll && T.value && T.value.addEventListener("wheel", d, { passive: false });
    });
    const y = (V) => V ? a.vertical ? "vNext" : "next" : a.vertical ? "vPrevious" : "previous", ie = (V, pe) => {
      if (a.transitions) {
        const s = qe(it(W(), a.month, a.year));
        b.value = Oe(qe(it(W(), V, pe)), s) ? v.value[y(true)] : v.value[y(false)], O.value = false, nextTick(() => {
          O.value = true;
        });
      }
    }, se = computed(
      () => ({
        [a.calendarClassName]: !!a.calendarClassName
      })
    ), re = computed(() => (V) => {
      const pe = cl(V);
      return {
        dp__marker_dot: pe.type === "dot",
        dp__marker_line: pe.type === "line"
      };
    }), Y = computed(() => (V) => he(V, h2.value)), H = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: C.value.count > 0 && a.instance !== 0
    })), ne = computed(() => (V) => a.hideOffsetDates ? V.current : true), L = (V) => format(V, "yyyy-MM-dd"), R = async (V, pe, s) => {
      const N = Ye(j.value[pe][s]);
      if (N) {
        const { width: x, height: q } = N.getBoundingClientRect();
        h2.value = V.value;
        let u = { left: `${x / 2}px` }, K = -50;
        if (await nextTick(), I.value[0]) {
          const { left: ce, width: $e } = I.value[0].getBoundingClientRect();
          ce < 0 && (u = { left: "0" }, K = 0, X.value.left = `${x / 2}px`), window.innerWidth < ce + $e && (u = { right: "0" }, K = 0, X.value.left = `${$e - x / 2}px`);
        }
        _.value = {
          bottom: `${q}px`,
          ...u,
          transform: `translateX(${K}%)`
        }, n("tooltip-open", V.marker);
      }
    }, p = async (V, pe, s) => {
      var N, x;
      if (F.value && g.value.enabled && g.value.dragSelect)
        return n("select-date", V);
      n("set-hover-date", V), (x = (N = V.marker) == null ? void 0 : N.tooltip) != null && x.length && await R(V, pe, s);
    }, f = (V) => {
      h2.value && (h2.value = null, _.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), n("tooltip-close", V.marker));
    }, J = (V) => {
      E.value.startX = V.changedTouches[0].screenX, E.value.startY = V.changedTouches[0].screenY;
    }, oe = (V) => {
      E.value.endX = V.changedTouches[0].screenX, E.value.endY = V.changedTouches[0].screenY, M();
    }, w = (V) => {
      a.vertical && !a.inline && V.preventDefault();
    }, M = () => {
      const V = a.vertical ? "Y" : "X";
      Math.abs(E.value[`start${V}`] - E.value[`end${V}`]) > 10 && n("handle-swipe", E.value[`start${V}`] > E.value[`end${V}`] ? "right" : "left");
    }, z = (V, pe, s) => {
      V && (Array.isArray(j.value[pe]) ? j.value[pe][s] = V : j.value[pe] = [V]), a.arrowNavigation && m(j.value, "calendar");
    }, d = (V) => {
      a.monthChangeOnScroll && (V.preventDefault(), n("handle-scroll", V));
    }, S = (V) => k.value.type === "local" ? getWeek(V.value, { weekStartsOn: +a.weekStart }) : k.value.type === "iso" ? getISOWeek(V.value) : typeof k.value.type == "function" ? k.value.type(V.value) : "", $ = (V) => {
      const pe = V[0];
      return k.value.hideOnOffsetDates ? V.some((s) => s.current) ? S(pe) : "" : S(pe);
    }, de = (V, pe) => {
      g.value.enabled || (mt(V, r.value), n("select-date", pe));
    }, c = (V) => {
      mt(V, r.value);
    }, ae = (V) => {
      g.value.enabled && g.value.dragSelect ? (F.value = true, n("select-date", V)) : g.value.enabled && n("select-date", V);
    };
    return t({ triggerTransition: ie }), (V, pe) => {
      var s;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(H.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: T,
          role: "grid",
          class: normalizeClass(se.value),
          "aria-label": (s = unref(P)) == null ? void 0 : s.calendarWrap
        }, [
          createBaseVNode("div", Yr, [
            V.weekNumbers ? (openBlock(), createElementBlock("div", Ir, toDisplayString(V.weekNumName), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(U.value, (N, x) => {
              var q, u;
              return openBlock(), createElementBlock("div", {
                key: x,
                class: "dp__calendar_header_item",
                role: "gridcell",
                "data-test": "calendar-header",
                "aria-label": (u = (q = unref(P)) == null ? void 0 : q.weekDay) == null ? void 0 : u.call(q, x)
              }, [
                V.$slots["calendar-header"] ? renderSlot(V.$slots, "calendar-header", {
                  key: 0,
                  day: N,
                  index: x
                }) : createCommentVNode("", true),
                V.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(N), 1)
                ], 64))
              ], 8, Nr);
            }), 128))
          ]),
          Er,
          createVNode(Transition, {
            name: b.value,
            css: !!V.transitions
          }, {
            default: withCtx(() => {
              var N;
              return [
                O.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "dp__calendar",
                  role: "rowgroup",
                  "aria-label": ((N = unref(P)) == null ? void 0 : N.calendarDays) || void 0,
                  onMouseleave: pe[1] || (pe[1] = (x) => F.value = false)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(B.value, (x, q) => (openBlock(), createElementBlock("div", {
                    key: q,
                    class: "dp__calendar_row",
                    role: "row"
                  }, [
                    V.weekNumbers ? (openBlock(), createElementBlock("div", Lr, [
                      createBaseVNode("div", Hr, toDisplayString($(x.days)), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(x.days, (u, K) => {
                      var ce, $e, we;
                      return openBlock(), createElementBlock("div", {
                        id: L(u.value),
                        ref_for: true,
                        ref: (le) => z(le, q, K),
                        key: K + q,
                        role: "gridcell",
                        class: "dp__calendar_item",
                        "aria-selected": (u.classData.dp__active_date || u.classData.dp__range_start || u.classData.dp__range_start) ?? void 0,
                        "aria-disabled": u.classData.dp__cell_disabled || void 0,
                        "aria-label": ($e = (ce = unref(P)) == null ? void 0 : ce.day) == null ? void 0 : $e.call(ce, u),
                        tabindex: "0",
                        "data-test": u.value,
                        onClick: withModifiers((le) => de(le, u), ["prevent"]),
                        onKeydown: (le) => unref(je)(le, () => V.$emit("select-date", u)),
                        onMouseenter: (le) => p(u, q, K),
                        onMouseleave: (le) => f(u),
                        onMousedown: (le) => ae(u),
                        onMouseup: pe[0] || (pe[0] = (le) => F.value = false)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["dp__cell_inner", u.classData])
                        }, [
                          V.$slots.day && ne.value(u) ? renderSlot(V.$slots, "day", {
                            key: 0,
                            day: +u.text,
                            date: u.value
                          }) : createCommentVNode("", true),
                          V.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createTextVNode(toDisplayString(u.text), 1)
                          ], 64)),
                          u.marker && ne.value(u) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                            V.$slots.marker ? renderSlot(V.$slots, "marker", {
                              key: 0,
                              marker: u.marker,
                              day: +u.text,
                              date: u.value
                            }) : (openBlock(), createElementBlock("div", {
                              key: 1,
                              class: normalizeClass(re.value(u.marker)),
                              style: normalizeStyle(u.marker.color ? { backgroundColor: u.marker.color } : {})
                            }, null, 6))
                          ], 64)) : createCommentVNode("", true),
                          Y.value(u.value) ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_for: true,
                            ref_key: "activeTooltip",
                            ref: I,
                            class: "dp__marker_tooltip",
                            style: normalizeStyle(_.value)
                          }, [
                            (we = u.marker) != null && we.tooltip ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: "dp__tooltip_content",
                              onClick: c
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(u.marker.tooltip, (le, nt) => (openBlock(), createElementBlock("div", {
                                key: nt,
                                class: "dp__tooltip_text"
                              }, [
                                V.$slots["marker-tooltip"] ? renderSlot(V.$slots, "marker-tooltip", {
                                  key: 0,
                                  tooltip: le,
                                  day: u.value
                                }) : createCommentVNode("", true),
                                V.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createBaseVNode("div", {
                                    class: "dp__tooltip_mark",
                                    style: normalizeStyle(le.color ? { backgroundColor: le.color } : {})
                                  }, null, 4),
                                  createBaseVNode("div", null, toDisplayString(le.text), 1)
                                ], 64))
                              ]))), 128)),
                              createBaseVNode("div", {
                                class: "dp__arrow_bottom_tp",
                                style: normalizeStyle(X.value)
                              }, null, 4)
                            ])) : createCommentVNode("", true)
                          ], 4)) : createCommentVNode("", true)
                        ], 2)
                      ], 40, Vr);
                    }), 128))
                  ]))), 128))
                ], 40, Fr)) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 8, ["name", "css"])
        ], 10, Br)
      ], 2);
    };
  }
});
var dn = (e) => Array.isArray(e);
var zr = (e, t, l, n) => {
  const a = ref([]), m = ref(/* @__PURE__ */ new Date()), v = ref(), { modelValue: r, calendars: P, time: C, today: k } = Gt(e, t), {
    defaultedMultiCalendars: g,
    defaultedStartTime: h2,
    defaultedRange: _,
    defaultedConfig: j,
    defaultedTz: T,
    propDates: O,
    defaultedMultiDates: b
  } = Pe(e), { validateMonthYearInRange: E, isDisabled: I, isDateRangeAllowed: X, checkMinMaxRange: F } = ht(e), { updateTimeValues: B, getSetDateTime: U, setTime: y, assignStartTime: ie, validateTime: se, disabledTimesConfig: re } = Hn(e, C, r, n), Y = computed(
    () => (o) => P.value[o] ? P.value[o].month : 0
  ), H = computed(
    () => (o) => P.value[o] ? P.value[o].year : 0
  ), ne = (o) => !j.value.keepViewOnOffsetClick || o ? true : !v.value, L = (o, D, G, ve = false) => {
    var De, Ge;
    ne(ve) && (P.value[o] || (P.value[o] = { month: 0, year: 0 }), P.value[o].month = ln(D) ? (De = P.value[o]) == null ? void 0 : De.month : D, P.value[o].year = ln(G) ? (Ge = P.value[o]) == null ? void 0 : Ge.year : G);
  }, R = () => {
    e.autoApply && t("select-date");
  };
  watch(
    r,
    (o, D) => {
      JSON.stringify(o) !== JSON.stringify(D) && J();
    },
    { deep: true }
  ), onMounted(() => {
    e.shadow || (r.value || (V(), h2.value && ie(h2.value)), J(true), e.focusStartDate && e.startDate && V());
  });
  const p = computed(() => {
    var o;
    return (o = e.flow) != null && o.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), f = () => {
    e.autoApply && p.value && t("auto-apply");
  }, J = (o = false) => {
    if (r.value)
      return Array.isArray(r.value) ? (a.value = r.value, $(o)) : M(r.value, o);
    if (g.value.count && o && !e.startDate)
      return w(W(), o);
  }, oe = () => Array.isArray(r.value) && _.value.enabled ? getMonth(r.value[0]) === getMonth(r.value[1] ?? r.value[0]) : false, w = (o, D = false) => {
    if ((!g.value.count || !g.value.static || D) && L(0, getMonth(o), getYear(o)), g.value.count && (!g.value.solo || !r.value || oe()))
      for (let G = 1; G < g.value.count; G++) {
        const ve = set(W(), { month: Y.value(G - 1), year: H.value(G - 1) }), De = add(ve, { months: 1 });
        P.value[G] = { month: getMonth(De), year: getYear(De) };
      }
  }, M = (o, D) => {
    w(o), y("hours", getHours(o)), y("minutes", getMinutes(o)), y("seconds", getSeconds(o)), g.value.count && D && ae();
  }, z = (o) => {
    if (g.value.count) {
      if (g.value.solo)
        return 0;
      const D = getMonth(o[0]), G = getMonth(o[1]);
      return Math.abs(G - D) < g.value.count ? 0 : 1;
    }
    return 1;
  }, d = (o, D) => {
    o[1] && _.value.showLastInRange ? w(o[z(o)], D) : w(o[0], D);
    const G = (ve, De) => [
      ve(o[0]),
      o[1] ? ve(o[1]) : C[De][1]
    ];
    y("hours", G(getHours, "hours")), y("minutes", G(getMinutes, "minutes")), y("seconds", G(getSeconds, "seconds"));
  }, S = (o, D) => {
    if ((_.value.enabled || e.weekPicker) && !b.value.enabled)
      return d(o, D);
    if (b.value.enabled && D) {
      const G = o[o.length - 1];
      return M(G, D);
    }
  }, $ = (o) => {
    const D = r.value;
    S(D, o), g.value.count && g.value.solo && ae();
  }, de = (o, D) => {
    const G = set(W(), { month: Y.value(D), year: H.value(D) }), ve = o < 0 ? addMonths(G, 1) : subMonths(G, 1);
    E(getMonth(ve), getYear(ve), o < 0, e.preventMinMaxNavigation) && (L(D, getMonth(ve), getYear(ve)), t("update-month-year", { instance: D, month: getMonth(ve), year: getYear(ve) }), g.value.count && !g.value.solo && c(D), l());
  }, c = (o) => {
    for (let D = o - 1; D >= 0; D--) {
      const G = subMonths(set(W(), { month: Y.value(D + 1), year: H.value(D + 1) }), 1);
      L(D, getMonth(G), getYear(G));
    }
    for (let D = o + 1; D <= g.value.count - 1; D++) {
      const G = addMonths(set(W(), { month: Y.value(D - 1), year: H.value(D - 1) }), 1);
      L(D, getMonth(G), getYear(G));
    }
  }, ae = () => {
    if (Array.isArray(r.value) && r.value.length === 2) {
      const o = W(
        W(r.value[1] ? r.value[1] : addMonths(r.value[0], 1))
      ), [D, G] = [getMonth(r.value[0]), getYear(r.value[0])], [ve, De] = [getMonth(r.value[1]), getYear(r.value[1])];
      (D !== ve || D === ve && G !== De) && g.value.solo && L(1, getMonth(o), getYear(o));
    } else
      r.value && !Array.isArray(r.value) && (L(0, getMonth(r.value), getYear(r.value)), w(W()));
  }, V = () => {
    e.startDate && (L(0, getMonth(W(e.startDate)), getYear(W(e.startDate))), g.value.count && c(0));
  }, pe = (o, D) => {
    if (e.monthChangeOnScroll) {
      const G = (/* @__PURE__ */ new Date()).getTime() - m.value.getTime(), ve = Math.abs(o.deltaY);
      let De = 500;
      ve > 1 && (De = 100), ve > 100 && (De = 0), G > De && (m.value = /* @__PURE__ */ new Date(), de(e.monthChangeOnScroll !== "inverse" ? -o.deltaY : o.deltaY, D));
    }
  }, s = (o, D, G = false) => {
    e.monthChangeOnArrows && e.vertical === G && N(o, D);
  }, N = (o, D) => {
    de(o === "right" ? -1 : 1, D);
  }, x = (o) => {
    if (O.value.markers)
      return na(o.value, O.value.markers);
  }, q = (o, D) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [o == 0, true];
      case "fair":
        return [o == 0 || D > o, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, u = (o, D, G, ve) => {
    if (e.sixWeeks && o.length < 6) {
      const De = 6 - o.length, Ge = (D.getDay() + 7 - ve) % 7, Xt = 6 - (G.getDay() + 7 - ve) % 7, [Ft, ba] = q(Ge, Xt);
      for (let bt = 1; bt <= De; bt++)
        if (ba ? !!(bt % 2) == Ft : Ft) {
          const Jt = o[0].days[0], ka = K(addDays(Jt.value, -7), getMonth(D));
          o.unshift({ days: ka });
        } else {
          const Jt = o[o.length - 1], ka = Jt.days[Jt.days.length - 1], Wn = K(addDays(ka.value, 1), getMonth(D));
          o.push({ days: Wn });
        }
    }
    return o;
  }, K = (o, D) => {
    const G = W(o), ve = [];
    for (let De = 0; De < 7; De++) {
      const Ge = addDays(G, De), Et = getMonth(Ge) !== D;
      ve.push({
        text: e.hideOffsetDates && Et ? "" : Ge.getDate(),
        value: Ge,
        current: !Et,
        classData: {}
      });
    }
    return ve;
  }, ce = (o, D) => {
    const G = [], ve = new Date(D, o), De = new Date(D, o + 1, 0), Ge = e.weekStart, Et = startOfWeek(ve, { weekStartsOn: Ge }), Xt = (Ft) => {
      const ba = K(Ft, o);
      if (G.push({ days: ba }), !G[G.length - 1].days.some(
        (bt) => he(qe(bt.value), qe(De))
      )) {
        const bt = addDays(Ft, 7);
        Xt(bt);
      }
    };
    return Xt(Et), u(G, ve, De, Ge);
  }, $e = (o) => {
    const D = pt(W(o.value), C.hours, C.minutes, Ke());
    t("date-update", D), b.value.enabled ? Qa(D, r, b.value.limit) : r.value = D, n(), nextTick().then(() => {
      f();
    });
  }, we = (o) => _.value.noDisabledRange ? Pn(a.value[0], o).some((G) => I(G)) : false, le = () => {
    a.value = r.value ? r.value.slice() : [], a.value.length === 2 && !(_.value.fixedStart || _.value.fixedEnd) && (a.value = []);
  }, nt = (o, D) => {
    const G = [
      W(o.value),
      addDays(W(o.value), +_.value.autoRange)
    ];
    X(G) ? (D && Ze(o.value), a.value = G) : t("invalid-date", o.value);
  }, Ze = (o) => {
    const D = getMonth(W(o)), G = getYear(W(o));
    if (L(0, D, G), g.value.count > 0)
      for (let ve = 1; ve < g.value.count; ve++) {
        const De = bl(
          set(W(o), { year: Y.value(ve - 1), month: H.value(ve - 1) })
        );
        L(ve, De.month, De.year);
      }
  }, ca = (o) => {
    if (we(o.value) || !F(o.value, r.value, _.value.fixedStart ? 0 : 1))
      return t("invalid-date", o.value);
    a.value = En(W(o.value), r, t, _);
  }, It = (o, D) => {
    if (le(), _.value.autoRange)
      return nt(o, D);
    if (_.value.fixedStart || _.value.fixedEnd)
      return ca(o);
    a.value[0] ? F(W(o.value), r.value) && !we(o.value) ? Ce(W(o.value), W(a.value[0])) ? (a.value.unshift(W(o.value)), t("range-end", a.value[0])) : (a.value[1] = W(o.value), t("range-end", a.value[1])) : (e.autoApply && t("auto-apply-invalid", o.value), t("invalid-date", o.value)) : (a.value[0] = W(o.value), t("range-start", a.value[0]));
  }, Ke = (o = true) => e.enableSeconds ? Array.isArray(C.seconds) ? o ? C.seconds[0] : C.seconds[1] : C.seconds : 0, Nt = (o) => {
    a.value[o] = pt(
      a.value[o],
      C.hours[o],
      C.minutes[o],
      Ke(o !== 1)
    );
  }, fa = () => {
    var o, D;
    a.value[0] && a.value[1] && +((o = a.value) == null ? void 0 : o[0]) > +((D = a.value) == null ? void 0 : D[1]) && (a.value.reverse(), t("range-start", a.value[0]), t("range-end", a.value[1]));
  }, qt = () => {
    a.value.length && (a.value[0] && !a.value[1] ? Nt(0) : (Nt(0), Nt(1), n()), fa(), r.value = a.value.slice(), da(a.value, t, e.autoApply, e.modelAuto));
  }, va = (o, D = false) => {
    if (I(o.value) || !o.current && e.hideOffsetDates)
      return t("invalid-date", o.value);
    if (v.value = JSON.parse(JSON.stringify(o)), !_.value.enabled)
      return $e(o);
    dn(C.hours) && dn(C.minutes) && !b.value.enabled && (It(o, D), qt());
  }, ma = (o, D) => {
    var ve;
    L(o, D.month, D.year, true), g.value.count && !g.value.solo && c(o), t("update-month-year", { instance: o, month: D.month, year: D.year }), l(g.value.solo ? o : void 0);
    const G = (ve = e.flow) != null && ve.length ? e.flow[e.flowStep] : void 0;
    !D.fromNav && (G === Le.month || G === Le.year) && n();
  }, pa = (o, D) => {
    Nn({
      value: o,
      modelValue: r,
      range: _.value.enabled,
      timezone: D ? void 0 : T.value.timezone
    }), R(), e.multiCalendars && nextTick().then(() => J(true));
  }, ga = () => {
    _.value.enabled ? r.value && Array.isArray(r.value) && r.value[0] ? r.value = Ce(W(), r.value[0]) ? [W(), r.value[0]] : [r.value[0], W()] : r.value = [W()] : r.value = W(), R();
  }, ya = () => {
    if (Array.isArray(r.value))
      if (b.value.enabled) {
        const o = ha();
        r.value[r.value.length - 1] = U(o);
      } else
        r.value = r.value.map((o, D) => o && U(o, D));
    else
      r.value = U(r.value);
    t("time-update");
  }, ha = () => Array.isArray(r.value) && r.value.length ? r.value[r.value.length - 1] : null;
  return {
    calendars: P,
    modelValue: r,
    month: Y,
    year: H,
    time: C,
    disabledTimesConfig: re,
    today: k,
    validateTime: se,
    getCalendarDays: ce,
    getMarker: x,
    handleScroll: pe,
    handleSwipe: N,
    handleArrow: s,
    selectDate: va,
    updateMonthYear: ma,
    presetDate: pa,
    selectCurrentDate: ga,
    updateTime: (o, D = true, G = false) => {
      B(o, D, G, ya);
    }
  };
};
var Ur = { key: 0 };
var jr = defineComponent({
  __name: "DatePicker",
  props: {
    ...at
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
    const n = l, a = e, {
      calendars: m,
      month: v,
      year: r,
      modelValue: P,
      time: C,
      disabledTimesConfig: k,
      today: g,
      validateTime: h2,
      getCalendarDays: _,
      getMarker: j,
      handleArrow: T,
      handleScroll: O,
      handleSwipe: b,
      selectDate: E,
      updateMonthYear: I,
      presetDate: X,
      selectCurrentDate: F,
      updateTime: B
    } = zr(a, n, oe, w), U = useSlots(), { setHoverDate: y, getDayClassData: ie, clearHoverDate: se } = jl(P, a), { defaultedMultiCalendars: re } = Pe(a), Y = ref([]), H = ref([]), ne = ref(null), L = Qe(U, "calendar"), R = Qe(U, "monthYear"), p = Qe(U, "timePicker"), f = (s) => {
      a.shadow || n("mount", s);
    };
    watch(
      m,
      () => {
        a.shadow || setTimeout(() => {
          n("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const J = computed(() => (s) => _(v.value(s), r.value(s)).map((N) => ({
      ...N,
      days: N.days.map((x) => (x.marker = j(x), x.classData = ie(x), x))
    })));
    function oe(s) {
      var N;
      s || s === 0 ? (N = H.value[s]) == null || N.triggerTransition(v.value(s), r.value(s)) : H.value.forEach((x, q) => x.triggerTransition(v.value(q), r.value(q)));
    }
    function w() {
      n("update-flow-step");
    }
    const M = (s, N = false) => {
      E(s, N), a.spaceConfirm && n("select-date");
    }, z = (s, N, x = 0) => {
      var q;
      (q = Y.value[x]) == null || q.toggleMonthPicker(s, N);
    }, d = (s, N, x = 0) => {
      var q;
      (q = Y.value[x]) == null || q.toggleYearPicker(s, N);
    }, S = (s, N, x) => {
      var q;
      (q = ne.value) == null || q.toggleTimePicker(s, N, x);
    }, $ = (s) => {
      if (!a.range) {
        const N = P.value ? P.value : g, x = s ? startOfWeek(N, { weekStartsOn: 1 }) : endOfWeek(N, { weekStartsOn: 1 });
        E({
          value: x,
          current: getMonth(N) === v.value(0),
          text: "",
          classData: {}
        });
      }
    }, de = (s) => {
      var N;
      (N = Y.value[0]) == null || N.handleMonthYearChange(s, true);
    }, c = (s) => {
      I(0, { month: v.value(0), year: r.value(0) + (s ? 1 : -1), fromNav: true });
    }, ae = (s, N) => {
      s === Le.time && n(`time-picker-${N ? "open" : "close"}`), n("overlay-toggle", { open: N, overlay: s });
    }, V = (s) => {
      n("overlay-toggle", { open: false, overlay: s }), n("focus-menu");
    };
    return t({
      clearHoverDate: se,
      presetDate: X,
      selectCurrentDate: F,
      toggleMonthPicker: z,
      toggleYearPicker: d,
      toggleTimePicker: S,
      handleArrow: T,
      updateMonthYear: I,
      getSidebarProps: () => ({
        modelValue: P,
        month: v,
        year: r,
        time: C,
        updateTime: B,
        updateMonthYear: I,
        selectDate: E,
        presetDate: X
      }),
      changeMonth: de,
      changeYear: c,
      selectWeekDate: $
    }), (s, N) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(ia, {
        "multi-calendars": unref(re).count,
        collapse: s.collapse
      }, {
        default: withCtx(({ instance: x, index: q }) => [
          s.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Or, mergeProps({
            key: 0,
            ref: (u) => {
              u && (Y.value[q] = u);
            },
            months: unref(Dn)(s.formatLocale, s.locale, s.monthNameFormat),
            years: unref(Ua)(s.yearRange, s.locale, s.reverseYears),
            month: unref(v)(x),
            year: unref(r)(x),
            instance: x
          }, s.$props, {
            onMount: N[0] || (N[0] = (u) => f(unref(Dt).header)),
            onResetFlow: N[1] || (N[1] = (u) => s.$emit("reset-flow")),
            onUpdateMonthYear: (u) => unref(I)(x, u),
            onOverlayClosed: V,
            onOverlayOpened: N[2] || (N[2] = (u) => s.$emit("overlay-toggle", { open: true, overlay: u }))
          }), createSlots({ _: 2 }, [
            renderList(unref(R), (u, K) => ({
              name: u,
              fn: withCtx((ce) => [
                renderSlot(s.$slots, u, normalizeProps(guardReactiveProps(ce)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Wr, mergeProps({
            ref: (u) => {
              u && (H.value[q] = u);
            },
            "mapped-dates": J.value(x),
            month: unref(v)(x),
            year: unref(r)(x),
            instance: x
          }, s.$props, {
            onSelectDate: (u) => unref(E)(u, x !== 1),
            onHandleSpace: (u) => M(u, x !== 1),
            onSetHoverDate: N[3] || (N[3] = (u) => unref(y)(u)),
            onHandleScroll: (u) => unref(O)(u, x),
            onHandleSwipe: (u) => unref(b)(u, x),
            onMount: N[4] || (N[4] = (u) => f(unref(Dt).calendar)),
            onResetFlow: N[5] || (N[5] = (u) => s.$emit("reset-flow")),
            onTooltipOpen: N[6] || (N[6] = (u) => s.$emit("tooltip-open", u)),
            onTooltipClose: N[7] || (N[7] = (u) => s.$emit("tooltip-close", u))
          }), createSlots({ _: 2 }, [
            renderList(unref(L), (u, K) => ({
              name: u,
              fn: withCtx((ce) => [
                renderSlot(s.$slots, u, normalizeProps(guardReactiveProps({ ...ce })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      s.enableTimePicker ? (openBlock(), createElementBlock("div", Ur, [
        s.$slots["time-picker"] ? renderSlot(s.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(C), updateTime: unref(B) }))) : (openBlock(), createBlock(Ln, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: ne
        }, s.$props, {
          hours: unref(C).hours,
          minutes: unref(C).minutes,
          seconds: unref(C).seconds,
          "internal-model-value": s.internalModelValue,
          "disabled-times-config": unref(k),
          "validate-time": unref(h2),
          onMount: N[8] || (N[8] = (x) => f(unref(Dt).timePicker)),
          "onUpdate:hours": N[9] || (N[9] = (x) => unref(B)(x)),
          "onUpdate:minutes": N[10] || (N[10] = (x) => unref(B)(x, false)),
          "onUpdate:seconds": N[11] || (N[11] = (x) => unref(B)(x, false, true)),
          onResetFlow: N[12] || (N[12] = (x) => s.$emit("reset-flow")),
          onOverlayClosed: N[13] || (N[13] = (x) => ae(x, false)),
          onOverlayOpened: N[14] || (N[14] = (x) => ae(x, true)),
          onAmPmChange: N[15] || (N[15] = (x) => s.$emit("am-pm-change", x))
        }), createSlots({ _: 2 }, [
          renderList(unref(p), (x, q) => ({
            name: x,
            fn: withCtx((u) => [
              renderSlot(s.$slots, x, normalizeProps(guardReactiveProps(u)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Kr = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: n,
    defaultedConfig: a,
    defaultedHighlight: m,
    defaultedRange: v,
    propDates: r,
    defaultedFilters: P,
    defaultedMultiDates: C
  } = Pe(e), { modelValue: k, year: g, month: h2, calendars: _ } = Gt(e, t), { isDisabled: j } = ht(e), { selectYear: T, groupedYears: O, showYearPicker: b, isDisabled: E, toggleYearPicker: I, handleYearSelect: X, handleYear: F } = Fn({
    modelValue: k,
    multiCalendars: n,
    highlight: m,
    calendars: _,
    propDates: r,
    month: h2,
    year: g,
    filters: P,
    props: e,
    emit: t
  }), B = (p, f) => [p, f].map((J) => format(J, "MMMM", { locale: e.formatLocale })).join("-"), U = computed(() => (p) => k.value ? Array.isArray(k.value) ? k.value.some((f) => isSameQuarter(p, f)) : isSameQuarter(k.value, p) : false), y = (p) => {
    if (v.value.enabled) {
      if (Array.isArray(k.value)) {
        const f = he(p, k.value[0]) || he(p, k.value[1]);
        return oa(k.value, l.value, p) && !f;
      }
      return false;
    }
    return false;
  }, ie = (p, f) => p.quarter === getQuarter(f) && p.year === getYear(f), se = (p) => typeof m.value == "function" ? m.value({ quarter: getQuarter(p), year: getYear(p) }) : !!m.value.quarters.find((f) => ie(f, p)), re = computed(() => (p) => {
    const f = set(/* @__PURE__ */ new Date(), { year: g.value(p) });
    return eachQuarterOfInterval({
      start: startOfYear(f),
      end: endOfYear(f)
    }).map((J) => {
      const oe = startOfQuarter(J), w = endOfQuarter(J), M = j(J), z = y(oe), d = se(oe);
      return {
        text: B(oe, w),
        value: oe,
        active: U.value(oe),
        highlighted: d,
        disabled: M,
        isBetween: z
      };
    });
  }), Y = (p) => {
    Qa(p, k, C.value.limit), t("auto-apply", true);
  }, H = (p) => {
    k.value = qa(k, p, t), da(k.value, t, e.autoApply, e.modelAuto);
  }, ne = (p) => {
    k.value = p, t("auto-apply");
  };
  return {
    defaultedConfig: a,
    defaultedMultiCalendars: n,
    groupedYears: O,
    year: g,
    isDisabled: E,
    quarters: re,
    showYearPicker: b,
    modelValue: k,
    setHoverDate: (p) => {
      l.value = p;
    },
    selectYear: T,
    selectQuarter: (p, f, J) => {
      if (!J)
        return _.value[f].month = getMonth(endOfQuarter(p)), C.value.enabled ? Y(p) : v.value.enabled ? H(p) : ne(p);
    },
    toggleYearPicker: I,
    handleYearSelect: X,
    handleYear: F
  };
};
var Gr = { class: "dp--quarter-items" };
var Qr = ["data-test", "disabled", "onClick", "onMouseover"];
var qr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...at
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
    const n = l, a = e, m = useSlots(), v = Qe(m, "yearMode"), {
      defaultedMultiCalendars: r,
      defaultedConfig: P,
      groupedYears: C,
      year: k,
      isDisabled: g,
      quarters: h2,
      modelValue: _,
      showYearPicker: j,
      setHoverDate: T,
      selectQuarter: O,
      toggleYearPicker: b,
      handleYearSelect: E,
      handleYear: I
    } = Kr(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: _,
      year: k,
      selectQuarter: O,
      handleYearSelect: E,
      handleYear: I
    }) }), (F, B) => (openBlock(), createBlock(ia, {
      "multi-calendars": unref(r).count,
      collapse: F.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: U }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(P).modeHeight}px` })
        }, [
          F.$slots["top-extra"] ? renderSlot(F.$slots, "top-extra", {
            key: 0,
            value: F.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(In, mergeProps(F.$props, {
              items: unref(C)(U),
              instance: U,
              "show-year-picker": unref(j)[U],
              year: unref(k)(U),
              "is-disabled": (y) => unref(g)(U, y),
              onHandleYear: (y) => unref(I)(U, y),
              onYearSelect: (y) => unref(E)(y, U),
              onToggleYearPicker: (y) => unref(b)(U, y == null ? void 0 : y.flow, y == null ? void 0 : y.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(v), (y, ie) => ({
                name: y,
                fn: withCtx((se) => [
                  renderSlot(F.$slots, y, normalizeProps(guardReactiveProps(se)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Gr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(h2)(U), (y, ie) => (openBlock(), createElementBlock("div", { key: ie }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": y.active,
                  "dp--qr-btn-between": y.isBetween,
                  "dp--qr-btn-disabled": y.disabled,
                  "dp--highlighted": y.highlighted
                }]),
                "data-test": y.value,
                disabled: y.disabled,
                onClick: (se) => unref(O)(y.value, U, y.disabled),
                onMouseover: (se) => unref(T)(y.value)
              }, [
                F.$slots.quarter ? renderSlot(F.$slots, "quarter", {
                  key: 0,
                  value: y.value,
                  text: y.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(y.text), 1)
                ], 64))
              ], 42, Qr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Xr = ["id", "aria-label"];
var Jr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Zr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var xr = [
  Zr
];
var eo = {
  key: 0,
  class: "dp__sidebar_left"
};
var to = ["data-test", "onClick", "onKeydown"];
var ao = {
  key: 2,
  class: "dp__sidebar_right"
};
var no = {
  key: 3,
  class: "dp__action_extra"
};
var cn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...ua,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    getInputRect: { type: Function, default: () => ({}) }
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
    const n = l, a = e, m = ref(null), v = computed(() => {
      const { openOnTop: u, ...K } = a;
      return {
        ...K,
        flowStep: y.value,
        collapse: a.collapse,
        noOverlayFocus: a.noOverlayFocus,
        menuWrapRef: m.value
      };
    }), { setMenuFocused: r, setShiftKey: P, control: C } = Yn(), k = useSlots(), { defaultedTextInput: g, defaultedInline: h2, defaultedConfig: _ } = Pe(a), j = ref(null), T = ref(0), O = ref(null), b = ref(false), E = ref(null);
    onMounted(() => {
      if (!a.shadow) {
        b.value = true, I(), window.addEventListener("resize", I);
        const u = Ye(m);
        if (u && !g.value.enabled && !h2.value.enabled && (r(true), ne()), u) {
          const K = (ce) => {
            _.value.allowPreventDefault && ce.preventDefault(), mt(ce, _.value, true);
          };
          u.addEventListener("pointerdown", K), u.addEventListener("mousedown", K);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", I);
    });
    const I = () => {
      const u = Ye(O);
      u && (T.value = u.getBoundingClientRect().width);
    }, { arrowRight: X, arrowLeft: F, arrowDown: B, arrowUp: U } = yt(), { flowStep: y, updateFlowStep: ie, childMount: se, resetFlow: re } = Kl(a, n, E), Y = computed(() => a.monthPicker ? sr : a.yearPicker ? ir : a.timePicker ? Tr : a.quarterPicker ? qr : jr), H = computed(() => {
      var ce;
      if (_.value.arrowLeft)
        return _.value.arrowLeft;
      const u = (ce = m.value) == null ? void 0 : ce.getBoundingClientRect(), K = a.getInputRect();
      return K.width < T.value && K.left <= ((u == null ? void 0 : u.left) ?? 0) ? `${K.width / 2}px` : "50%";
    }), ne = () => {
      const u = Ye(m);
      u && u.focus({ preventScroll: true });
    }, L = computed(() => {
      var u;
      return ((u = E.value) == null ? void 0 : u.getSidebarProps()) || {};
    }), R = () => {
      a.openOnTop && n("recalculate-position");
    }, p = Qe(k, "action"), f = computed(() => a.monthPicker || a.yearPicker ? Qe(k, "monthYear") : a.timePicker ? Qe(k, "timePicker") : Qe(k, "shared")), J = computed(() => a.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), oe = computed(() => ({
      dp__menu_disabled: a.disabled,
      dp__menu_readonly: a.readonly,
      "dp-menu-loading": a.loading
    })), w = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !h2.value.enabled,
        dp__relative: h2.value.enabled,
        [a.menuClassName]: !!a.menuClassName
      })
    ), M = (u) => {
      mt(u, _.value, true);
    }, z = () => {
      a.escClose && n("close-picker");
    }, d = (u) => {
      if (a.arrowNavigation) {
        if (u === ze.up)
          return U();
        if (u === ze.down)
          return B();
        if (u === ze.left)
          return F();
        if (u === ze.right)
          return X();
      } else
        u === ze.right || u === ze.up ? ae("handleArrow", ze.left, 0, u === ze.up) : ae("handleArrow", ze.right, 0, u === ze.down);
    }, S = (u) => {
      P(u.shiftKey), !a.disableMonthYearSelect && u.code === Re.tab && u.target.classList.contains("dp__menu") && C.value.shiftKeyInMenu && (u.preventDefault(), mt(u, _.value, true), n("close-picker"));
    }, $ = () => {
      ne(), n("time-picker-close");
    }, de = (u) => {
      var K, ce, $e;
      (K = E.value) == null || K.toggleTimePicker(false, false), (ce = E.value) == null || ce.toggleMonthPicker(false, false, u), ($e = E.value) == null || $e.toggleYearPicker(false, false, u);
    }, c = (u, K = 0) => {
      var ce, $e, we;
      return u === "month" ? (ce = E.value) == null ? void 0 : ce.toggleMonthPicker(false, true, K) : u === "year" ? ($e = E.value) == null ? void 0 : $e.toggleYearPicker(false, true, K) : u === "time" ? (we = E.value) == null ? void 0 : we.toggleTimePicker(true, false) : de(K);
    }, ae = (u, ...K) => {
      var ce, $e;
      (ce = E.value) != null && ce[u] && (($e = E.value) == null || $e[u](...K));
    }, V = () => {
      ae("selectCurrentDate");
    }, pe = (u, K) => {
      ae("presetDate", u, K);
    }, s = () => {
      ae("clearHoverDate");
    }, N = (u, K) => {
      ae("updateMonthYear", u, K);
    }, x = (u, K) => {
      u.preventDefault(), d(K);
    }, q = (u) => {
      if (S(u), u.key === Re.home || u.key === Re.end)
        return ae("selectWeekDate", u.key === Re.home);
      if (u.key === Re.pageUp || u.key === Re.pageDown)
        return u.shiftKey ? ae("changeYear", u.key === Re.pageUp) : ae("changeMonth", u.key === Re.pageUp);
      switch (u.key) {
        case Re.esc:
          return z();
        case Re.arrowLeft:
          return x(u, ze.left);
        case Re.arrowRight:
          return x(u, ze.right);
        case Re.arrowUp:
          return x(u, ze.up);
        case Re.arrowDown:
          return x(u, ze.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: N,
      switchView: c
    }), (u, K) => {
      var ce, $e, we;
      return openBlock(), createElementBlock("div", {
        id: u.uid ? `dp-menu-${u.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: m,
        tabindex: "0",
        role: "dialog",
        "aria-label": (ce = u.ariaLabels) == null ? void 0 : ce.menu,
        class: normalizeClass(w.value),
        style: normalizeStyle({ "--dp-arrow-left": H.value }),
        onMouseleave: s,
        onClick: M,
        onKeydown: q
      }, [
        (u.disabled || u.readonly) && unref(h2).enabled || u.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(oe.value)
        }, [
          u.loading ? (openBlock(), createElementBlock("div", Jr, xr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        !unref(h2).enabled && !u.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(J.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: O,
          class: normalizeClass({
            dp__menu_content_wrapper: (($e = u.presetDates) == null ? void 0 : $e.length) || !!u.$slots["left-sidebar"] || !!u.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((we = u.presetDates) == null ? void 0 : we.length) || !!u.$slots["left-sidebar"] || !!u.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${T.value}px` })
        }, [
          u.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", eo, [
            renderSlot(u.$slots, "left-sidebar", normalizeProps(guardReactiveProps(L.value)))
          ])) : createCommentVNode("", true),
          u.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(u.presetDates, (le, nt) => (openBlock(), createElementBlock(Fragment, { key: nt }, [
              le.slot ? renderSlot(u.$slots, le.slot, {
                key: 0,
                presetDate: pe,
                label: le.label,
                value: le.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(le.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": le.testId ?? void 0,
                onClick: withModifiers((Ze) => pe(le.value, le.noTz), ["prevent"]),
                onKeydown: (Ze) => unref(je)(Ze, () => pe(le.value, le.noTz), true)
              }, toDisplayString(le.label), 47, to))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: j,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(Y.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: E
            }, v.value, {
              "flow-step": unref(y),
              onMount: unref(se),
              onUpdateFlowStep: unref(ie),
              onResetFlow: unref(re),
              onFocusMenu: ne,
              onSelectDate: K[0] || (K[0] = (le) => u.$emit("select-date")),
              onDateUpdate: K[1] || (K[1] = (le) => u.$emit("date-update", le)),
              onTooltipOpen: K[2] || (K[2] = (le) => u.$emit("tooltip-open", le)),
              onTooltipClose: K[3] || (K[3] = (le) => u.$emit("tooltip-close", le)),
              onAutoApply: K[4] || (K[4] = (le) => u.$emit("auto-apply", le)),
              onRangeStart: K[5] || (K[5] = (le) => u.$emit("range-start", le)),
              onRangeEnd: K[6] || (K[6] = (le) => u.$emit("range-end", le)),
              onInvalidFixedRange: K[7] || (K[7] = (le) => u.$emit("invalid-fixed-range", le)),
              onTimeUpdate: K[8] || (K[8] = (le) => u.$emit("time-update")),
              onAmPmChange: K[9] || (K[9] = (le) => u.$emit("am-pm-change", le)),
              onTimePickerOpen: K[10] || (K[10] = (le) => u.$emit("time-picker-open", le)),
              onTimePickerClose: $,
              onRecalculatePosition: R,
              onUpdateMonthYear: K[11] || (K[11] = (le) => u.$emit("update-month-year", le)),
              onAutoApplyInvalid: K[12] || (K[12] = (le) => u.$emit("auto-apply-invalid", le)),
              onInvalidDate: K[13] || (K[13] = (le) => u.$emit("invalid-date", le)),
              onOverlayToggle: K[14] || (K[14] = (le) => u.$emit("overlay-toggle", le)),
              "onUpdate:internalModelValue": K[15] || (K[15] = (le) => u.$emit("update:internal-model-value", le))
            }), createSlots({ _: 2 }, [
              renderList(f.value, (le, nt) => ({
                name: le,
                fn: withCtx((Ze) => [
                  renderSlot(u.$slots, le, normalizeProps(guardReactiveProps({ ...Ze })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          u.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", ao, [
            renderSlot(u.$slots, "right-sidebar", normalizeProps(guardReactiveProps(L.value)))
          ])) : createCommentVNode("", true),
          u.$slots["action-extra"] ? (openBlock(), createElementBlock("div", no, [
            u.$slots["action-extra"] ? renderSlot(u.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: V
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !u.autoApply || unref(_).keepActionRow ? (openBlock(), createBlock(xl, mergeProps({
          key: 2,
          "menu-mount": b.value
        }, v.value, {
          "calendar-width": T.value,
          onClosePicker: K[16] || (K[16] = (le) => u.$emit("close-picker")),
          onSelectDate: K[17] || (K[17] = (le) => u.$emit("select-date")),
          onInvalidSelect: K[18] || (K[18] = (le) => u.$emit("invalid-select")),
          onSelectNow: V
        }), createSlots({ _: 2 }, [
          renderList(unref(p), (le, nt) => ({
            name: le,
            fn: withCtx((Ze) => [
              renderSlot(u.$slots, le, normalizeProps(guardReactiveProps({ ...Ze })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Xr);
    };
  }
});
var lo = typeof window < "u" ? window : void 0;
var _a = () => {
};
var ro = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var oo = (e, t, l, n) => {
  if (!e)
    return _a;
  let a = _a;
  const m = watch(
    () => unref(e),
    (r) => {
      a(), r && (r.addEventListener(t, l, n), a = () => {
        r.removeEventListener(t, l, n), a = _a;
      });
    },
    { immediate: true, flush: "post" }
  ), v = () => {
    m(), a();
  };
  return ro(v), v;
};
var so = (e, t, l, n = {}) => {
  const { window: a = lo, event: m = "pointerdown" } = n;
  return a ? oo(a, m, (r) => {
    const P = Ye(e), C = Ye(t);
    !P || !C || P === r.target || r.composedPath().includes(P) || r.composedPath().includes(C) || l(r);
  }, { passive: true }) : void 0;
};
var uo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...ua
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
    const n = l, a = e, m = useSlots(), v = ref(false), r = toRef(a, "modelValue"), P = toRef(a, "timezone"), C = ref(null), k = ref(null), g = ref(null), h2 = ref(false), _ = ref(null), j = ref(false), T = ref(false), O = ref(false), { setMenuFocused: b, setShiftKey: E } = Yn(), { clearArrowNav: I } = yt(), { validateDate: X, isValidTime: F } = ht(a), {
      defaultedTransitions: B,
      defaultedTextInput: U,
      defaultedInline: y,
      defaultedConfig: ie,
      defaultedRange: se,
      defaultedMultiDates: re
    } = Pe(a), { menuTransition: Y, showTransition: H } = Kt(B);
    onMounted(() => {
      d(a.modelValue), nextTick().then(() => {
        if (!y.value.enabled) {
          const o = oe(_.value);
          o == null || o.addEventListener("scroll", x), window == null || window.addEventListener("resize", q);
        }
      }), y.value.enabled && (v.value = true), window == null || window.addEventListener("keyup", u), window == null || window.addEventListener("keydown", K);
    }), onUnmounted(() => {
      if (!y.value.enabled) {
        const o = oe(_.value);
        o == null || o.removeEventListener("scroll", x), window == null || window.removeEventListener("resize", q);
      }
      window == null || window.removeEventListener("keyup", u), window == null || window.removeEventListener("keydown", K);
    });
    const ne = Qe(m, "all", a.presetDates), L = Qe(m, "input");
    watch(
      [r, P],
      () => {
        d(r.value);
      },
      { deep: true }
    );
    const { openOnTop: R, menuStyle: p, xCorrect: f, setMenuPosition: J, getScrollableParent: oe, shadowRender: w } = Wl({
      menuRef: C,
      menuRefInner: k,
      inputRef: g,
      pickerWrapperRef: _,
      inline: y,
      emit: n,
      props: a,
      slots: m
    }), {
      inputValue: M,
      internalModelValue: z,
      parseExternalModelValue: d,
      emitModelValue: S,
      formatInputValue: $,
      checkBeforeEmit: de
    } = Hl(n, a, h2), c = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: a.dark,
        dp__theme_light: !a.dark,
        dp__flex_display: y.value.enabled,
        "dp--flex-display-collapsed": O.value,
        dp__flex_display_with_input: y.value.input
      })
    ), ae = computed(() => a.dark ? "dp__theme_dark" : "dp__theme_light"), V = computed(() => a.teleport ? {
      to: typeof a.teleport == "boolean" ? "body" : a.teleport,
      disabled: !a.teleport || y.value.enabled
    } : {}), pe = computed(() => ({ class: "dp__outer_menu_wrap" })), s = computed(() => y.value.enabled && (a.timePicker || a.monthPicker || a.yearPicker || a.quarterPicker)), N = () => {
      var o, D;
      return (D = (o = g.value) == null ? void 0 : o.$el) == null ? void 0 : D.getBoundingClientRect();
    }, x = () => {
      v.value && (ie.value.closeOnScroll ? Ke() : J());
    }, q = () => {
      var D;
      v.value && J();
      const o = (D = k.value) == null ? void 0 : D.$el.getBoundingClientRect().width;
      O.value = document.body.offsetWidth <= o;
    }, u = (o) => {
      o.key === "Tab" && !y.value.enabled && !a.teleport && ie.value.tabOutClosesMenu && (_.value.contains(document.activeElement) || Ke()), T.value = o.shiftKey;
    }, K = (o) => {
      T.value = o.shiftKey;
    }, ce = () => {
      !a.disabled && !a.readonly && (w(cn, a), J(false), v.value = true, v.value && n("open"), v.value || It(), d(a.modelValue));
    }, $e = () => {
      var o;
      M.value = "", It(), (o = g.value) == null || o.setParsedDate(null), n("update:model-value", null), n("update:model-timezone-value", null), n("cleared"), ie.value.closeOnClearValue && Ke();
    }, we = () => {
      const o = z.value;
      return !o || !Array.isArray(o) && X(o) ? true : Array.isArray(o) ? re.value.enabled || o.length === 2 && X(o[0]) && X(o[1]) ? true : se.value.partialRange && !a.timePicker ? X(o[0]) : false : false;
    }, le = () => {
      de() && we() ? (S(), Ke()) : n("invalid-select", z.value);
    }, nt = (o) => {
      Ze(), S(), ie.value.closeOnAutoApply && !o && Ke();
    }, Ze = () => {
      g.value && U.value.enabled && g.value.setParsedDate(z.value);
    }, ca = (o = false) => {
      a.autoApply && F(z.value) && we() && (se.value.enabled && Array.isArray(z.value) ? (se.value.partialRange || z.value.length === 2) && nt(o) : nt(o));
    }, It = () => {
      U.value.enabled || (z.value = null);
    }, Ke = () => {
      y.value.enabled || (v.value && (v.value = false, f.value = false, b(false), E(false), I(), n("closed"), M.value && d(r.value)), It(), n("blur"));
    }, Nt = (o, D, G = false) => {
      if (!o) {
        z.value = null;
        return;
      }
      const ve = Array.isArray(o) ? !o.some((Ge) => !X(Ge)) : X(o), De = F(o);
      ve && De && (z.value = o, D && (j.value = G, le(), n("text-submit")));
    }, fa = () => {
      a.autoApply && F(z.value) && S(), Ze();
    }, qt = () => v.value ? Ke() : ce(), va = (o) => {
      z.value = o;
    }, ma = () => {
      U.value.enabled && (h2.value = true, $()), n("focus");
    }, pa = () => {
      if (U.value.enabled && (h2.value = false, d(a.modelValue), j.value)) {
        const o = ml(_.value, T.value);
        o == null || o.focus();
      }
      n("blur");
    }, ga = (o) => {
      k.value && k.value.updateMonthYear(0, {
        month: nn(o.month),
        year: nn(o.year)
      });
    }, ya = (o) => {
      d(o ?? a.modelValue);
    }, ha = (o, D) => {
      var G;
      (G = k.value) == null || G.switchView(o, D);
    }, Xa = (o) => ie.value.onClickOutside ? ie.value.onClickOutside(o) : Ke();
    return so(C, g, () => Xa(we)), t({
      closeMenu: Ke,
      selectDate: le,
      clearValue: $e,
      openMenu: ce,
      onScroll: x,
      formatInputValue: $,
      // exposed for testing purposes
      updateInternalModelValue: va,
      // modify internal modelValue
      setMonthYear: ga,
      parseModel: ya,
      switchView: ha,
      toggleMenu: qt
    }), (o, D) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: _,
      class: normalizeClass(c.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(Xl, mergeProps({
        ref_key: "inputRef",
        ref: g,
        "input-value": unref(M),
        "onUpdate:inputValue": D[0] || (D[0] = (G) => isRef(M) ? M.value = G : null),
        "is-menu-open": v.value
      }, o.$props, {
        onClear: $e,
        onOpen: ce,
        onSetInputDate: Nt,
        onSetEmptyDate: unref(S),
        onSelectDate: le,
        onToggle: qt,
        onClose: Ke,
        onFocus: ma,
        onBlur: pa,
        onRealBlur: D[1] || (D[1] = (G) => h2.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(L), (G, ve) => ({
          name: G,
          fn: withCtx((De) => [
            renderSlot(o.$slots, G, normalizeProps(guardReactiveProps(De)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(o.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(V.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(Y)(unref(R)),
            css: unref(H) && !unref(y).enabled
          }, {
            default: withCtx(() => [
              v.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: C
              }, pe.value, {
                class: { "dp--menu-wrapper": !unref(y).enabled },
                style: unref(y).enabled ? void 0 : unref(p)
              }), [
                createVNode(cn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: k
                }, o.$props, {
                  "internal-model-value": unref(z),
                  "onUpdate:internalModelValue": D[2] || (D[2] = (G) => isRef(z) ? z.value = G : null),
                  class: { [ae.value]: true, "dp--menu-wrapper": o.teleport },
                  "open-on-top": unref(R),
                  "no-overlay-focus": s.value,
                  collapse: O.value,
                  "get-input-rect": N,
                  onClosePicker: Ke,
                  onSelectDate: le,
                  onAutoApply: ca,
                  onTimeUpdate: fa,
                  onFlowStep: D[3] || (D[3] = (G) => o.$emit("flow-step", G)),
                  onUpdateMonthYear: D[4] || (D[4] = (G) => o.$emit("update-month-year", G)),
                  onInvalidSelect: D[5] || (D[5] = (G) => o.$emit("invalid-select", unref(z))),
                  onAutoApplyInvalid: D[6] || (D[6] = (G) => o.$emit("invalid-select", G)),
                  onInvalidFixedRange: D[7] || (D[7] = (G) => o.$emit("invalid-fixed-range", G)),
                  onRecalculatePosition: unref(J),
                  onTooltipOpen: D[8] || (D[8] = (G) => o.$emit("tooltip-open", G)),
                  onTooltipClose: D[9] || (D[9] = (G) => o.$emit("tooltip-close", G)),
                  onTimePickerOpen: D[10] || (D[10] = (G) => o.$emit("time-picker-open", G)),
                  onTimePickerClose: D[11] || (D[11] = (G) => o.$emit("time-picker-close", G)),
                  onAmPmChange: D[12] || (D[12] = (G) => o.$emit("am-pm-change", G)),
                  onRangeStart: D[13] || (D[13] = (G) => o.$emit("range-start", G)),
                  onRangeEnd: D[14] || (D[14] = (G) => o.$emit("range-end", G)),
                  onDateUpdate: D[15] || (D[15] = (G) => o.$emit("date-update", G)),
                  onInvalidDate: D[16] || (D[16] = (G) => o.$emit("invalid-date", G)),
                  onOverlayToggle: D[17] || (D[17] = (G) => o.$emit("overlay-toggle", G))
                }), createSlots({ _: 2 }, [
                  renderList(unref(ne), (G, ve) => ({
                    name: G,
                    fn: withCtx((De) => [
                      renderSlot(o.$slots, G, normalizeProps(guardReactiveProps({ ...De })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "no-overlay-focus", "collapse", "onRecalculatePosition"])
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
  const e = uo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var io = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Vn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(io).forEach(([e, t]) => {
  e !== "default" && (Vn[e] = t);
});
export {
  Vn as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
