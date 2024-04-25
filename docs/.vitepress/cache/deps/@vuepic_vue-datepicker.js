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
} from "./chunk-ASRQBPRV.js";
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
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
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
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
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
  var _a, _b, _c, _d;
  const _date = toDate(date);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
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
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
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
  var _a, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
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
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
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
  var _a, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions2();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
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

// node_modules/.pnpm/@vuepic+vue-datepicker@8.5.0_vue@3.4.25_typescript@5.4.5_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
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
function yn() {
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
yn.compatConfig = {
  MODE: 3
};
function Ea() {
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
Ea.compatConfig = {
  MODE: 3
};
function Fa() {
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
Fa.compatConfig = {
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
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
La.compatConfig = {
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
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Wa.compatConfig = {
  MODE: 3
};
var ot = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var hn = (e, t) => {
  const r = Oa(e, t);
  return r || K();
};
var al = (e, t) => t.dateInTz ? ot(new Date(e), t.dateInTz) : K(e);
var Oa = (e, t) => {
  if (!e)
    return null;
  if (!t)
    return K(e);
  const r = K(e);
  return t.exactMatch ? al(e, t) : ot(r, t.timezone);
};
var nl = (e) => {
  if (!e)
    return 0;
  const t = /* @__PURE__ */ new Date(), r = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), n = new Date(t.toLocaleString("en-US", { timeZone: e })), a = n.getTimezoneOffset() / 60;
  return (+r - +n) / (1e3 * 60 * 60) - a;
};
function en(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function ll(e) {
  return (t) => format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var rl = (e, t, r) => {
  const n = [1, 2, 3, 4, 5, 6, 7];
  let a;
  if (e !== null)
    try {
      a = n.map(ll(e));
    } catch {
      a = n.map(en(t));
    }
  else
    a = n.map(en(t));
  const f = a.slice(0, r), v = a.slice(r + 1, a.length);
  return [a[r]].concat(...v).concat(...f);
};
var Ha = (e, t, r) => {
  const n = [];
  for (let a = +e[0]; a <= +e[1]; a++)
    n.push({ value: +a, text: Mn(a, t) });
  return r ? n.reverse() : n;
};
var bn = (e, t, r) => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((f) => {
    const v = f < 10 ? `0${f}` : f;
    return /* @__PURE__ */ new Date(`2017-${v}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const f = r === "long" ? "MMMM" : "MMM";
      return n.map((v, o) => {
        const O = format(ot(v, "UTC"), f, { locale: e });
        return {
          text: O.charAt(0).toUpperCase() + O.substring(1),
          value: o
        };
      });
    } catch {
    }
  const a = new Intl.DateTimeFormat(t, { month: r, timeZone: "UTC" });
  return n.map((f, v) => {
    const o = a.format(f);
    return {
      text: o.charAt(0).toUpperCase() + o.substring(1),
      value: v
    };
  });
};
var ol = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var sl = (e) => ({ type: "dot", ...e ?? {} });
var kn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var za = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Be = (e) => e;
var tn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var an = (e) => e === null;
var wn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var ul = (e) => {
  const t = [], r = (n) => n.filter((a) => a);
  for (let n = 0; n < e.length; n += 3) {
    const a = [e[n], e[n + 1], e[n + 2]];
    t.push(r(a));
  }
  return t;
};
var Ht = (e, t, r) => {
  const n = r != null, a = t != null;
  if (!n && !a)
    return false;
  const f = +r, v = +t;
  return n && a ? +e > f || +e < v : n ? +e > f : a ? +e < v : false;
};
var Rt = (e, t) => ul(e).map((r) => r.map((n) => {
  const { active: a, disabled: f, isBetween: v, highlighted: o } = t(n);
  return {
    ...n,
    active: a,
    disabled: f,
    className: {
      dp__overlay_cell_active: a,
      dp__overlay_cell: !a,
      dp__overlay_cell_disabled: f,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: f && a,
      dp__cell_in_between: v,
      "dp--highlighted": o
    }
  };
}));
var ft = (e, t, r = false) => {
  e && t.allowStopPropagation && (r && e.stopImmediatePropagation(), e.stopPropagation());
};
var il = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function dl(e, t) {
  let r = [...document.querySelectorAll(il())];
  r = r.filter((a) => !e.contains(a) || a.hasAttribute("data-datepicker-instance"));
  const n = r.indexOf(e);
  if (n >= 0 && (t ? n - 1 >= 0 : n + 1 <= r.length))
    return r[n + (t ? -1 : 1)];
}
var cl = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Mn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Ua = (e) => format(e, "dd-MM-yyyy");
var ka = (e) => Array.isArray(e);
var aa = (e, t) => t.get(Ua(e));
var fl = (e, t) => e ? t ? t instanceof Map ? !!aa(e, t) : t(K(e)) : false : true;
var nn = (e, t, r, n, a, f) => {
  const v = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: f });
  return isValid(v) && isDate(v) ? n || a ? v : set(v, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
};
var vl = (e, t, r, n, a, f) => {
  const v = Array.isArray(r) ? r[0] : r;
  if (typeof t == "string")
    return nn(e, t, v, n, a, f);
  if (Array.isArray(t)) {
    let o = null;
    for (const O of t)
      if (o = nn(e, O, v, n, a, f), o)
        break;
    return o;
  }
  return typeof t == "function" ? t(e) : null;
};
var K = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var ml = (e, t, r) => {
  if (t) {
    const a = (e.getMonth() + 1).toString().padStart(2, "0"), f = e.getDate().toString().padStart(2, "0"), v = e.getHours().toString().padStart(2, "0"), o = e.getMinutes().toString().padStart(2, "0"), O = r ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${a}-${f}T${v}:${o}:${O}.000Z`;
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
var Qe = (e) => {
  let t = K(JSON.parse(JSON.stringify(e)));
  return t = setHours(t, 0), t = setMinutes(t, 0), t = setSeconds(t, 0), t = setMilliseconds(t, 0), t;
};
var vt = (e, t, r, n) => {
  let a = e ? K(e) : K();
  return (t || t === 0) && (a = setHours(a, +t)), (r || r === 0) && (a = setMinutes(a, +r)), (n || n === 0) && (a = setSeconds(a, +n)), setMilliseconds(a, 0);
};
var Ce = (e, t) => !e || !t ? false : isBefore(Qe(e), Qe(t));
var be = (e, t) => !e || !t ? false : isEqual(Qe(e), Qe(t));
var Oe = (e, t) => !e || !t ? false : isAfter(Qe(e), Qe(t));
var ra = (e, t, r) => e != null && e[0] && (e != null && e[1]) ? Oe(r, e[0]) && Ce(r, e[1]) : e != null && e[0] && t ? Oe(r, e[0]) && Ce(r, t) || Ce(r, e[0]) && Oe(r, t) : false;
var Ze = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Qe(t);
};
var wa = (e, t, r) => t && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((n) => n === t ? [n, r] : [n, isNaN(+e[n]) ? void 0 : +e[n]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var wt = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Dn = (e, t) => {
  if (t) {
    const r = getYear(K(t));
    if (r > e)
      return 12;
    if (r === e)
      return getMonth(K(t));
  }
};
var $n = (e, t) => {
  if (t) {
    const r = getYear(K(t));
    return r < e ? -1 : r === e ? getMonth(K(t)) : void 0;
  }
};
var Ct = (e) => {
  if (e)
    return getYear(K(e));
};
var An = (e, t) => {
  const r = Oe(e, t) ? t : e, n = Oe(t, e) ? t : e;
  return eachDayOfInterval({ start: r, end: n });
};
var pl = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var st = (e, t) => {
  const r = startOfWeek(e, { weekStartsOn: +t }), n = endOfWeek(e, { weekStartsOn: +t });
  return [r, n];
};
var Tn = (e, t) => {
  const r = {
    hours: getHours(K()),
    minutes: getMinutes(K()),
    seconds: t ? getSeconds(K()) : 0
  };
  return Object.assign(r, e);
};
var ct = (e, t, r) => [set(K(e), { date: 1 }), set(K(), { month: t, year: r, date: 1 })];
var ut = (e, t, r) => {
  let n = e ? K(e) : K();
  return (t || t === 0) && (n = setMonth(n, t)), r && (n = setYear(n, r)), n;
};
var Sn = (e, t, r, n, a) => {
  if (!n || a && !t || !a && !r)
    return false;
  const f = a ? addMonths(e, 1) : subMonths(e, 1), v = [getMonth(f), getYear(f)];
  return a ? !yl(...v, t) : !gl(...v, r);
};
var gl = (e, t, r) => Ce(...ct(r, e, t)) || be(...ct(r, e, t));
var yl = (e, t, r) => Oe(...ct(r, e, t)) || be(...ct(r, e, t));
var Pn = (e, t, r, n, a, f, v) => {
  if (typeof t == "function" && !v)
    return t(e);
  const o = r ? { locale: r } : void 0;
  return Array.isArray(e) ? `${format(e[0], f, o)}${a && !e[1] ? "" : n}${e[1] ? format(e[1], f, o) : ""}` : format(e, f, o);
};
var $t = (e) => {
  if (e)
    return null;
  throw new Error(za.prop("partial-range"));
};
var Jt = (e, t) => {
  if (t)
    return e();
  throw new Error(za.prop("range"));
};
var Ba = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var hl = (e, t) => set(t ?? K(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Ma = (e, t, r, n) => {
  if (!e)
    return true;
  if (n) {
    const a = r === "max" ? isBefore(e, t) : isAfter(e, t), f = { seconds: 0, milliseconds: 0 };
    return a || isEqual(set(e, f), set(t, f));
  }
  return r === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Da = (e, t, r) => e ? hl(e, t) : K(r ?? t);
var ln = (e, t, r, n, a) => {
  if (Array.isArray(n)) {
    const v = Da(e, n[0], t), o = Da(e, n[1], t);
    return Ma(n[0], v, r, !!t) && Ma(n[1], o, r, !!t) && a;
  }
  const f = Da(e, n, t);
  return Ma(n, f, r, !!t) && a;
};
var $a = (e) => set(K(), wt(e));
var bl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((r) => getYear(K(r)) === t).map((r) => getMonth(r)) : [];
var Rn = (e, t, r) => typeof e == "function" ? e({ month: t, year: r }) : !!e.months.find((n) => n.month === t && n.year === r);
var Ka = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Et = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Cn = () => {
  const e = (n) => {
    Et.menuFocused = n;
  }, t = (n) => {
    Et.shiftKeyInMenu !== n && (Et.shiftKeyInMenu = n);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Et.shiftKeyInMenu, menuFocused: Et.menuFocused })),
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
var Aa = ref(null);
var Zt = ref(false);
var Ta = ref(false);
var Sa = ref(false);
var Pa = ref(false);
var Fe = ref(0);
var _e = ref(0);
var pt = () => {
  const e = computed(() => Zt.value ? [...Se.selectionGrid, Se.actionRow].filter((C) => C.length) : Ta.value ? [
    ...Se.timePicker[0],
    ...Se.timePicker[1],
    Pa.value ? [] : [Aa.value],
    Se.actionRow
  ].filter((C) => C.length) : Sa.value ? [...Se.monthPicker, Se.actionRow] : [Se.monthYear, ...Se.calendar, Se.time, Se.actionRow].filter((C) => C.length)), t = (C) => {
    Fe.value = C ? Fe.value + 1 : Fe.value - 1;
    let L = null;
    e.value[_e.value] && (L = e.value[_e.value][Fe.value]), !L && e.value[_e.value + (C ? 1 : -1)] ? (_e.value = _e.value + (C ? 1 : -1), Fe.value = C ? 0 : e.value[_e.value].length - 1) : L || (Fe.value = C ? Fe.value - 1 : Fe.value + 1);
  }, r = (C) => {
    if (_e.value === 0 && !C || _e.value === e.value.length && C)
      return;
    _e.value = C ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][Fe.value] && Fe.value !== 0 && (Fe.value = e.value[_e.value].length - 1) : _e.value = C ? _e.value - 1 : _e.value + 1;
  }, n = (C) => {
    let L = null;
    e.value[_e.value] && (L = e.value[_e.value][Fe.value]), L ? L.focus({ preventScroll: !Zt.value }) : Fe.value = C ? Fe.value - 1 : Fe.value + 1;
  }, a = () => {
    t(true), n(true);
  }, f = () => {
    t(false), n(false);
  }, v = () => {
    r(false), n(true);
  }, o = () => {
    r(true), n(true);
  }, O = (C, L) => {
    Se[L] = C;
  }, B = (C, L) => {
    Se[L] = C;
  }, y = () => {
    Fe.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: O,
    buildMultiLevelMatrix: B,
    setTimePickerBackRef: (C) => {
      Aa.value = C;
    },
    setSelectionGrid: (C) => {
      Zt.value = C, y(), C || (Se.selectionGrid = []);
    },
    setTimePicker: (C, L = false) => {
      Ta.value = C, Pa.value = L, y(), C || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (C, L = 0) => {
      Se.timePicker[L] = C;
    },
    arrowRight: a,
    arrowLeft: f,
    arrowUp: v,
    arrowDown: o,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], Zt.value = false, Ta.value = false, Pa.value = false, Sa.value = false, y(), Aa.value = null;
    },
    setMonthPicker: (C) => {
      Sa.value = C, y();
    },
    refSets: Se
    // exposed for testing
  };
};
var rn = (e) => ({
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
var kl = (e) => ({
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
var on = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var wl = (e) => {
  const t = typeof e == "object" && e, r = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...r, count: on(false) };
  const n = t ? e : {}, a = t ? n.count ?? true : e, f = on(a);
  return Object.assign(r, n, { count: f });
};
var Ml = (e, t, r) => e || (typeof r == "string" ? r : t);
var Dl = (e) => typeof e == "boolean" ? e ? rn({}) : false : rn(e);
var $l = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Al = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Tl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Sl = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Pl = (e) => ({ ...{
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
  keepViewOnOffsetClick: false
}, ...e ?? {} });
var Rl = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((r) => K(r)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var Cl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var _l = (e, t) => {
  const r = {
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
  return typeof e == "object" ? { enabled: true, ...r, ...e } : {
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
var Ol = (e, t) => e ? typeof e == "string" ? { timezone: e, exactMatch: false, dateInTz: void 0, emitTimezone: t, convertModel: true } : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: t ?? e.emitTimezone,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: t };
var Ra = (e, t) => new Map(
  e.map((r) => {
    const n = hn(r, t);
    return [Ua(n), n];
  })
);
var Bl = (e, t) => e.length ? new Map(
  e.map((r) => {
    const n = hn(r.date, t);
    return [Ua(n), r];
  })
) : null;
var Yl = (e, t, r, n, a, f, v) => ({
  minDate: Oa(e, v),
  maxDate: Oa(t, v),
  disabledDates: ka(r) ? Ra(r, v) : r,
  allowedDates: ka(n) ? Ra(n, v) : null,
  highlight: typeof a == "object" && ka(a == null ? void 0 : a.dates) ? Ra(a.dates, v) : a,
  markers: Bl(f, v)
});
var Il = (e, t) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: +t } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Re = (e) => {
  const t = () => {
    const z = e.enableSeconds ? ":ss" : "", F = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${F}${z}` : `hh${F}${z} aa`;
  }, r = () => {
    var z;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((z = W.value) == null ? void 0 : z.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, n = (z) => Tn(z, e.enableSeconds), a = () => Y.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [n(e.startTime[0]), n(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? n(e.startTime) : null, f = computed(() => wl(e.multiCalendars)), v = computed(() => a()), o = computed(() => kl(e.ariaLabels)), O = computed(() => Al(e.filters)), B = computed(() => Dl(e.transitions)), y = computed(() => Tl(e.actionRow)), T = computed(
    () => Ml(e.previewFormat, e.format, r())
  ), b = computed(() => $l(e.textInput)), P = computed(() => Sl(e.inline)), V = computed(() => Pl(e.config)), D = computed(() => Rl(e.highlight)), W = computed(() => Cl(e.weekNumbers)), C = computed(() => Ol(e.timezone, e.emitTimezone)), L = computed(() => Il(e.multiDates, e.multiDatesLimit)), N = computed(
    () => Yl(
      e.minDate,
      e.maxDate,
      e.disabledDates,
      e.allowedDates,
      D.value,
      e.markers,
      C.value
    )
  ), Y = computed(
    () => _l(e.range, {
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
    defaultedTransitions: B,
    defaultedMultiCalendars: f,
    defaultedStartTime: v,
    defaultedAriaLabels: o,
    defaultedFilters: O,
    defaultedActionRow: y,
    defaultedPreviewFormat: T,
    defaultedTextInput: b,
    defaultedInline: P,
    defaultedConfig: V,
    defaultedHighlight: D,
    defaultedWeekNumbers: W,
    defaultedRange: Y,
    propDates: N,
    defaultedTz: C,
    defaultedMultiDates: L,
    getDefaultPattern: r,
    getDefaultStartTime: a
  };
};
var Je = ((e) => (e.month = "month", e.year = "year", e))(Je || {});
var ht = ((e) => (e.top = "top", e.bottom = "bottom", e))(ht || {});
var Mt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Mt || {});
var at = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(at || {});
var Nl = ["timestamp", "date", "iso"];
var El = (e, t, r) => {
  const n = ref(), { defaultedTextInput: a, defaultedRange: f, defaultedTz: v, defaultedMultiDates: o, getDefaultPattern: O } = Re(t), B = ref(""), y = toRef(t, "format"), T = toRef(t, "formatLocale");
  watch(
    n,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", n.value, R(true));
    },
    { deep: true }
  ), watch(y, () => {
    p();
  });
  const b = (d) => v.value.timezone && v.value.convertModel ? ot(d, v.value.timezone) : d, P = (d) => {
    if (v.value.timezone && v.value.convertModel) {
      const le = nl(v.value.timezone);
      return addHours(d, le);
    }
    return d;
  }, V = (d, le, l = false) => Pn(
    d,
    t.format,
    t.formatLocale,
    a.value.rangeSeparator,
    t.modelAuto,
    le ?? O(),
    l
  ), D = (d) => d ? t.modelType ? I(d) : {
    hours: getHours(d),
    minutes: getMinutes(d),
    seconds: t.enableSeconds ? getSeconds(d) : 0
  } : null, W = (d) => t.modelType ? I(d) : { month: getMonth(d), year: getYear(d) }, C = (d) => Array.isArray(d) ? o.value.enabled ? d.map((le) => L(le, setYear(K(), le))) : Jt(
    () => [
      setYear(K(), d[0]),
      d[1] ? setYear(K(), d[1]) : $t(f.value.partialRange)
    ],
    f.value.enabled
  ) : setYear(K(), +d), L = (d, le) => (typeof d == "string" || typeof d == "number") && t.modelType ? X(d) : le, N = (d) => Array.isArray(d) ? [
    L(
      d[0],
      vt(null, +d[0].hours, +d[0].minutes, d[0].seconds)
    ),
    L(
      d[1],
      vt(null, +d[1].hours, +d[1].minutes, d[1].seconds)
    )
  ] : L(d, vt(null, d.hours, d.minutes, d.seconds)), Y = (d) => {
    const le = set(K(), { date: 1 });
    return Array.isArray(d) ? o.value.enabled ? d.map((l) => L(l, ut(le, +l.month, +l.year))) : Jt(
      () => [
        L(d[0], ut(le, +d[0].month, +d[0].year)),
        L(
          d[1],
          d[1] ? ut(le, +d[1].month, +d[1].year) : $t(f.value.partialRange)
        )
      ],
      f.value.enabled
    ) : L(d, ut(le, +d.month, +d.year));
  }, z = (d) => {
    if (Array.isArray(d))
      return d.map((le) => X(le));
    throw new Error(za.dateArr("multi-dates"));
  }, F = (d) => {
    if (Array.isArray(d) && f.value.enabled) {
      const le = d[0], l = d[1];
      return [
        K(Array.isArray(le) ? le[0] : null),
        K(Array.isArray(l) ? l[0] : null)
      ];
    }
    return K(d[0]);
  }, Z = (d) => t.modelAuto ? Array.isArray(d) ? [X(d[0]), X(d[1])] : t.autoApply ? [X(d)] : [X(d), null] : Array.isArray(d) ? Jt(
    () => d[1] ? [
      X(d[0]),
      d[1] ? X(d[1]) : $t(f.value.partialRange)
    ] : [X(d[0])],
    f.value.enabled
  ) : X(d), h2 = () => {
    Array.isArray(n.value) && f.value.enabled && n.value.length === 1 && n.value.push($t(f.value.partialRange));
  }, ie = () => {
    const d = n.value;
    return [
      I(d[0]),
      d[1] ? I(d[1]) : $t(f.value.partialRange)
    ];
  }, oe = () => n.value[1] ? ie() : I(Be(n.value[0])), re = () => (n.value || []).map((d) => I(d)), _ = (d = false) => (d || h2(), t.modelAuto ? oe() : o.value.enabled ? re() : Array.isArray(n.value) ? Jt(() => ie(), f.value.enabled) : I(Be(n.value))), H = (d) => !d || Array.isArray(d) && !d.length ? null : t.timePicker ? N(Be(d)) : t.monthPicker ? Y(Be(d)) : t.yearPicker ? C(Be(d)) : o.value.enabled ? z(Be(d)) : t.weekPicker ? F(Be(d)) : Z(Be(d)), te = (d) => {
    const le = H(d);
    Ba(Be(le)) ? (n.value = Be(le), p()) : (n.value = null, B.value = "");
  }, E = () => {
    const d = (le) => format(le, a.value.format);
    return `${d(n.value[0])} ${a.value.rangeSeparator} ${n.value[1] ? d(n.value[1]) : ""}`;
  }, c = () => r.value && n.value ? Array.isArray(n.value) ? E() : format(n.value, a.value.format) : V(n.value), A = () => n.value ? o.value.enabled ? n.value.map((d) => V(d)).join("; ") : a.value.enabled && typeof a.value.format == "string" ? c() : V(n.value) : "", p = () => {
    !t.format || typeof t.format == "string" || a.value.enabled && typeof a.value.format == "string" ? B.value = A() : B.value = t.format(n.value);
  }, X = (d) => {
    if (t.utc) {
      const le = new Date(d);
      return t.utc === "preserve" ? new Date(le.getTime() + le.getTimezoneOffset() * 6e4) : le;
    }
    return t.modelType ? Nl.includes(t.modelType) ? b(new Date(d)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? b(
      parse(d, O(), /* @__PURE__ */ new Date(), { locale: T.value })
    ) : b(
      parse(d, t.modelType, /* @__PURE__ */ new Date(), { locale: T.value })
    ) : b(new Date(d));
  }, I = (d) => d ? t.utc ? ml(d, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +P(d) : t.modelType === "iso" ? P(d).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? V(P(d)) : V(P(d), t.modelType, true) : P(d) : "", m = (d, le = false, l = false) => {
    if (l)
      return d;
    if (e("update:model-value", d), v.value.emitTimezone && le) {
      const S = Array.isArray(d) ? d.map((x) => ot(Be(x), v.value.emitTimezone)) : ot(Be(d), v.value.emitTimezone);
      e("update:model-timezone-value", S);
    }
  }, U = (d) => Array.isArray(n.value) ? o.value.enabled ? n.value.map((le) => d(le)) : [
    d(n.value[0]),
    n.value[1] ? d(n.value[1]) : $t(f.value.partialRange)
  ] : d(Be(n.value)), ne = () => {
    if (Array.isArray(n.value)) {
      const d = st(n.value[0], t.weekStart), le = n.value[1] ? st(n.value[1], t.weekStart) : [];
      return [d.map((l) => K(l)), le.map((l) => K(l))];
    }
    return st(n.value, t.weekStart).map((d) => K(d));
  }, u = (d, le) => m(Be(U(d)), false, le), k = (d) => {
    const le = ne();
    return d ? le : e("update:model-value", ne());
  }, R = (d = false) => (p(), t.monthPicker ? u(W, d) : t.timePicker ? u(D, d) : t.yearPicker ? u(getYear, d) : t.weekPicker ? k(d) : m(_(d), true, d));
  return {
    inputValue: B,
    internalModelValue: n,
    checkBeforeEmit: () => n.value ? f.value.enabled ? f.value.partialRange ? n.value.length >= 1 : n.value.length === 2 : !!n.value : false,
    parseExternalModelValue: te,
    formatInputValue: p,
    emitModelValue: R
  };
};
var Fl = (e, t) => {
  const { defaultedFilters: r, propDates: n } = Re(e), { validateMonthYearInRange: a } = gt(e), f = (y, T) => {
    let b = y;
    return r.value.months.includes(getMonth(b)) ? (b = T ? addMonths(y, 1) : subMonths(y, 1), f(b, T)) : b;
  }, v = (y, T) => {
    let b = y;
    return r.value.years.includes(getYear(b)) ? (b = T ? addYears(y, 1) : subYears(y, 1), v(b, T)) : b;
  }, o = (y, T = false) => {
    const b = set(K(), { month: e.month, year: e.year });
    let P = y ? addMonths(b, 1) : subMonths(b, 1);
    e.disableYearSelect && (P = setYear(P, e.year));
    let V = getMonth(P), D = getYear(P);
    r.value.months.includes(V) && (P = f(P, y), V = getMonth(P), D = getYear(P)), r.value.years.includes(D) && (P = v(P, y), D = getYear(P)), a(V, D, y, e.preventMinMaxNavigation) && O(V, D, T);
  }, O = (y, T, b) => {
    t("update-month-year", { month: y, year: T, fromNav: b });
  }, B = computed(() => (y) => Sn(
    set(K(), { month: e.month, year: e.year }),
    n.value.maxDate,
    n.value.minDate,
    e.preventMinMaxNavigation,
    y
  ));
  return { handleMonthYearChange: o, isDisabled: B, updateMonthYear: O };
};
var At = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(At || {});
var Ll = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: r,
  pickerWrapperRef: n,
  inline: a,
  emit: f,
  props: v,
  slots: o
}) => {
  const O = ref({}), B = ref(false), y = ref({
    top: "0",
    left: "0"
  }), T = ref(false), b = toRef(v, "teleportCenter");
  watch(b, () => {
    y.value = JSON.parse(JSON.stringify({})), Y();
  });
  const P = (c) => {
    if (v.teleport) {
      const A = c.getBoundingClientRect();
      return {
        left: A.left + window.scrollX,
        top: A.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, V = (c, A) => {
    y.value.left = `${c + A - O.value.width}px`;
  }, D = (c) => {
    y.value.left = `${c}px`;
  }, W = (c, A) => {
    v.position === At.left && D(c), v.position === At.right && V(c, A), v.position === At.center && (y.value.left = `${c + A / 2 - O.value.width / 2}px`);
  }, C = (c) => {
    const { width: A, height: p } = c.getBoundingClientRect(), { top: X, left: I } = v.altPosition ? v.altPosition(c) : P(c);
    return { top: +X, left: +I, width: A, height: p };
  }, L = () => {
    y.value.left = "50%", y.value.top = "50%", y.value.transform = "translate(-50%, -50%)", y.value.position = "fixed", delete y.value.opacity;
  }, N = () => {
    const c = Ie(r), { top: A, left: p, transform: X } = v.altPosition(c);
    y.value = { top: `${A}px`, left: `${p}px`, transform: X ?? "" };
  }, Y = (c = true) => {
    var A;
    if (!a.value.enabled) {
      if (b.value)
        return L();
      if (v.altPosition !== null)
        return N();
      if (c) {
        const p = v.teleport ? (A = t.value) == null ? void 0 : A.$el : e.value;
        p && (O.value = p.getBoundingClientRect()), f("recalculate-position");
      }
      return re();
    }
  }, z = ({ inputEl: c, left: A, width: p }) => {
    window.screen.width > 768 && !B.value && W(A, p), h2(c);
  }, F = (c) => {
    const { top: A, left: p, height: X, width: I } = C(c);
    y.value.top = `${X + A + +v.offset}px`, T.value = false, B.value || (y.value.left = `${p + I / 2 - O.value.width / 2}px`), z({ inputEl: c, left: p, width: I });
  }, Z = (c) => {
    const { top: A, left: p, width: X } = C(c);
    y.value.top = `${A - +v.offset - O.value.height}px`, T.value = true, z({ inputEl: c, left: p, width: X });
  }, h2 = (c) => {
    if (v.autoPosition) {
      const { left: A, width: p } = C(c), { left: X, right: I } = O.value;
      if (!B.value) {
        if (Math.abs(X) !== Math.abs(I)) {
          if (X <= 0)
            return B.value = true, D(A);
          if (I >= document.documentElement.clientWidth)
            return B.value = true, V(A, p);
        }
        return W(A, p);
      }
    }
  }, ie = () => {
    const c = Ie(r);
    if (c) {
      const { height: A } = O.value, { top: p, height: X } = c.getBoundingClientRect(), m = window.innerHeight - p - X, U = p;
      return A <= m ? ht.bottom : A > m && A <= U ? ht.top : m >= U ? ht.bottom : ht.top;
    }
    return ht.bottom;
  }, oe = (c) => ie() === ht.bottom ? F(c) : Z(c), re = () => {
    const c = Ie(r);
    if (c)
      return v.autoPosition ? oe(c) : F(c);
  }, _ = function(c) {
    if (c) {
      const A = c.scrollHeight > c.clientHeight, X = window.getComputedStyle(c).overflowY.indexOf("hidden") !== -1;
      return A && !X;
    }
    return true;
  }, H = function(c) {
    return !c || c === document.body || c.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : _(c) ? c : H(c.assignedSlot ? c.assignedSlot.parentNode : c.parentNode);
  }, te = (c) => {
    if (c)
      switch (v.position) {
        case At.left:
          return { left: 0, transform: "translateX(0)" };
        case At.right:
          return { left: `${c.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${c.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: T,
    menuStyle: y,
    xCorrect: B,
    setMenuPosition: Y,
    getScrollableParent: H,
    shadowRender: (c, A) => {
      var ne, u, k;
      const p = document.createElement("div"), X = (ne = Ie(r)) == null ? void 0 : ne.getBoundingClientRect();
      p.setAttribute("id", "dp--temp-container");
      const I = (u = n.value) != null && u.clientWidth ? n.value : document.body;
      I.append(p);
      const m = te(X), U = h(
        c,
        {
          ...A,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...m }
        },
        Object.fromEntries(
          Object.keys(o).filter((R) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(R)).map((R) => [R, o[R]])
        )
      );
      render(U, p), O.value = (k = U.el) == null ? void 0 : k.getBoundingClientRect(), render(null, p), I.removeChild(p);
    }
  };
};
var dt = [
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
  { name: "quarter", use: ["shared"] },
  { name: "top-extra", use: ["shared", "month-year"] }
];
var Vl = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Wl = {
  all: () => dt,
  monthYear: () => dt.filter((e) => e.use.includes("month-year")),
  input: () => Vl,
  timePicker: () => dt.filter((e) => e.use.includes("time")),
  action: () => dt.filter((e) => e.use.includes("action")),
  calendar: () => dt.filter((e) => e.use.includes("calendar")),
  menu: () => dt.filter((e) => e.use.includes("menu")),
  shared: () => dt.filter((e) => e.use.includes("shared")),
  yearMode: () => dt.filter((e) => e.use.includes("year-mode"))
};
var Ge = (e, t, r) => {
  const n = [];
  return Wl[t]().forEach((a) => {
    e[a.name] && n.push(a.name);
  }), r != null && r.length && r.forEach((a) => {
    a.slot && n.push(a.slot);
  }), n;
};
var Ut = (e) => {
  const t = computed(() => (n) => e.value ? n ? e.value.open : e.value.close : ""), r = computed(() => (n) => e.value ? n ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: r };
};
var Kt = (e, t) => {
  const { defaultedRange: r, defaultedTz: n } = Re(e), a = K(ot(K(), n.value.timezone)), f = ref([{ month: getMonth(a), year: getYear(a) }]), v = reactive({
    hours: r.value.enabled ? [getHours(a), getHours(a)] : getHours(a),
    minutes: r.value.enabled ? [getMinutes(a), getMinutes(a)] : getMinutes(a),
    seconds: r.value.enabled ? [0, 0] : 0
  }), o = computed({
    get: () => e.internalModelValue,
    set: (y) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", y);
    }
  }), O = computed(
    () => (y) => f.value[y] ? f.value[y].month : 0
  ), B = computed(
    () => (y) => f.value[y] ? f.value[y].year : 0
  );
  return {
    calendars: f,
    time: v,
    modelValue: o,
    month: O,
    year: B,
    today: a
  };
};
var Hl = (e, t) => {
  const { defaultedMultiCalendars: r, defaultedMultiDates: n, defaultedHighlight: a, defaultedTz: f, propDates: v, defaultedRange: o } = Re(t), { isDisabled: O } = gt(t), B = ref(null), y = ref(ot(/* @__PURE__ */ new Date(), f.value.timezone)), T = (u) => {
    !u.current && t.hideOffsetDates || (B.value = u.value);
  }, b = () => {
    B.value = null;
  }, P = (u) => Array.isArray(e.value) && o.value.enabled && e.value[0] && B.value ? u ? Oe(B.value, e.value[0]) : Ce(B.value, e.value[0]) : true, V = (u, k) => {
    const R = () => e.value ? k ? e.value[0] || null : e.value[1] : null, de = e.value && Array.isArray(e.value) ? R() : null;
    return be(K(u.value), de);
  }, D = (u) => {
    const k = Array.isArray(e.value) ? e.value[0] : null;
    return u ? !Ce(B.value ?? null, k) : true;
  }, W = (u, k = true) => (o.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !u.current ? false : be(K(u.value), e.value[k ? 0 : 1]) : o.value.enabled ? V(u, k) && D(k) || be(u.value, Array.isArray(e.value) ? e.value[0] : null) && P(k) : false, C = (u, k) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const R = be(u.value, B.value);
      return k ? Oe(e.value[0], u.value) && R : Ce(e.value[0], u.value) && R;
    }
    return false;
  }, L = (u) => !e.value || t.hideOffsetDates && !u.current ? false : o.value.enabled ? t.modelAuto && Array.isArray(e.value) ? be(u.value, e.value[0] ? e.value[0] : y.value) : false : n.value.enabled && Array.isArray(e.value) ? e.value.some((k) => be(k, u.value)) : be(u.value, e.value ? e.value : y.value), N = (u) => {
    if (o.value.autoRange || t.weekPicker) {
      if (B.value) {
        if (t.hideOffsetDates && !u.current)
          return false;
        const k = addDays(B.value, +o.value.autoRange), R = st(K(B.value), t.weekStart);
        return t.weekPicker ? be(R[1], K(u.value)) : be(k, K(u.value));
      }
      return false;
    }
    return false;
  }, Y = (u) => {
    if (o.value.autoRange || t.weekPicker) {
      if (B.value) {
        const k = addDays(B.value, +o.value.autoRange);
        if (t.hideOffsetDates && !u.current)
          return false;
        const R = st(K(B.value), t.weekStart);
        return t.weekPicker ? Oe(u.value, R[0]) && Ce(u.value, R[1]) : Oe(u.value, B.value) && Ce(u.value, k);
      }
      return false;
    }
    return false;
  }, z = (u) => {
    if (o.value.autoRange || t.weekPicker) {
      if (B.value) {
        if (t.hideOffsetDates && !u.current)
          return false;
        const k = st(K(B.value), t.weekStart);
        return t.weekPicker ? be(k[0], u.value) : be(B.value, u.value);
      }
      return false;
    }
    return false;
  }, F = (u) => ra(e.value, B.value, u.value), Z = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, h2 = () => t.modelAuto ? kn(t.internalModelValue) : true, ie = (u) => {
    if (t.weekPicker)
      return false;
    const k = o.value.enabled ? !W(u) && !W(u, false) : true;
    return !O(u.value) && !L(u) && !(!u.current && t.hideOffsetDates) && k;
  }, oe = (u) => o.value.enabled ? t.modelAuto ? Z() && L(u) : false : L(u), re = (u) => a.value ? fl(u.value, v.value.highlight) : false, _ = (u) => {
    const k = O(u.value);
    return k && (typeof a.value == "function" ? !a.value(u.value, k) : !a.value.options.highlightDisabled);
  }, H = (u) => {
    var k;
    return typeof a.value == "function" ? a.value(u.value) : (k = a.value.weekdays) == null ? void 0 : k.includes(u.value.getDay());
  }, te = (u) => (o.value.enabled || t.weekPicker) && (!(r.value.count > 0) || u.current) && h2() && !(!u.current && t.hideOffsetDates) && !L(u) ? F(u) : false, E = (u) => {
    const { isRangeStart: k, isRangeEnd: R } = X(u), de = o.value.enabled ? k || R : false;
    return {
      dp__cell_offset: !u.current,
      dp__pointer: !t.disabled && !(!u.current && t.hideOffsetDates) && !O(u.value),
      dp__cell_disabled: O(u.value),
      dp__cell_highlight: !_(u) && (re(u) || H(u)) && !oe(u) && !de && !z(u) && !(te(u) && t.weekPicker) && !R,
      dp__cell_highlight_active: !_(u) && (re(u) || H(u)) && oe(u),
      dp__today: !t.noToday && be(u.value, y.value) && u.current,
      "dp--past": Ce(u.value, y.value),
      "dp--future": Oe(u.value, y.value)
    };
  }, c = (u) => ({
    dp__active_date: oe(u),
    dp__date_hover: ie(u)
  }), A = (u) => {
    if (e.value && !Array.isArray(e.value)) {
      const k = st(e.value, t.weekStart);
      return {
        ...m(u),
        dp__range_start: be(k[0], u.value),
        dp__range_end: be(k[1], u.value),
        dp__range_between_week: Oe(u.value, k[0]) && Ce(u.value, k[1])
      };
    }
    return {
      ...m(u)
    };
  }, p = (u) => {
    if (e.value && Array.isArray(e.value)) {
      const k = st(e.value[0], t.weekStart), R = e.value[1] ? st(e.value[1], t.weekStart) : [];
      return {
        ...m(u),
        dp__range_start: be(k[0], u.value) || be(R[0], u.value),
        dp__range_end: be(k[1], u.value) || be(R[1], u.value),
        dp__range_between_week: Oe(u.value, k[0]) && Ce(u.value, k[1]) || Oe(u.value, R[0]) && Ce(u.value, R[1]),
        dp__range_between: Oe(u.value, k[1]) && Ce(u.value, R[0])
      };
    }
    return {
      ...m(u)
    };
  }, X = (u) => {
    const k = r.value.count > 0 ? u.current && W(u) && h2() : W(u) && h2(), R = r.value.count > 0 ? u.current && W(u, false) && h2() : W(u, false) && h2();
    return { isRangeStart: k, isRangeEnd: R };
  }, I = (u) => {
    const { isRangeStart: k, isRangeEnd: R } = X(u);
    return {
      dp__range_start: k,
      dp__range_end: R,
      dp__range_between: te(u),
      dp__date_hover: be(u.value, B.value) && !k && !R && !t.weekPicker,
      dp__date_hover_start: C(u, true),
      dp__date_hover_end: C(u, false)
    };
  }, m = (u) => ({
    ...I(u),
    dp__cell_auto_range: Y(u),
    dp__cell_auto_range_start: z(u),
    dp__cell_auto_range_end: N(u)
  }), U = (u) => o.value.enabled ? o.value.autoRange ? m(u) : t.modelAuto ? { ...c(u), ...I(u) } : t.weekPicker ? p(u) : I(u) : t.weekPicker ? A(u) : c(u);
  return {
    setHoverDate: T,
    clearHoverDate: b,
    getDayClassData: (u) => t.hideOffsetDates && !u.current ? {} : {
      ...E(u),
      ...U(u),
      [t.dayClass ? t.dayClass(u.value) : ""]: true,
      [t.calendarCellClassName]: !!t.calendarCellClassName
    }
  };
};
var gt = (e) => {
  const { defaultedFilters: t, defaultedRange: r, propDates: n, defaultedMultiDates: a } = Re(e), f = (_) => n.value.disabledDates ? typeof n.value.disabledDates == "function" ? n.value.disabledDates(K(_)) : !!aa(_, n.value.disabledDates) : false, v = (_) => {
    const H = n.value.maxDate ? Oe(_, n.value.maxDate) : false, te = n.value.minDate ? Ce(_, n.value.minDate) : false, E = f(_), A = t.value.months.map((U) => +U).includes(getMonth(_)), p = e.disabledWeekDays.length ? e.disabledWeekDays.some((U) => +U === getDay(_)) : false, X = T(_), I = getYear(_), m = I < +e.yearRange[0] || I > +e.yearRange[1];
    return !(H || te || E || A || m || p || X);
  }, o = (_, H) => Ce(...ct(n.value.minDate, _, H)) || be(...ct(n.value.minDate, _, H)), O = (_, H) => Oe(...ct(n.value.maxDate, _, H)) || be(...ct(n.value.maxDate, _, H)), B = (_, H, te) => {
    let E = false;
    return n.value.maxDate && te && O(_, H) && (E = true), n.value.minDate && !te && o(_, H) && (E = true), E;
  }, y = (_, H, te, E) => {
    let c = false;
    return E ? n.value.minDate && n.value.maxDate ? c = B(_, H, te) : (n.value.minDate && o(_, H) || n.value.maxDate && O(_, H)) && (c = true) : c = true, c;
  }, T = (_) => Array.isArray(n.value.allowedDates) && !n.value.allowedDates.length ? true : n.value.allowedDates ? !aa(_, n.value.allowedDates) : false, b = (_) => !v(_), P = (_) => r.value.noDisabledRange ? !eachDayOfInterval({ start: _[0], end: _[1] }).some((te) => b(te)) : true, V = (_) => {
    if (_) {
      const H = getYear(_);
      return H >= +e.yearRange[0] && H <= e.yearRange[1];
    }
    return true;
  }, D = (_, H) => !!(Array.isArray(_) && _[H] && (r.value.maxRange || r.value.minRange) && V(_[H])), W = (_, H, te = 0) => {
    if (D(H, te) && V(_)) {
      const E = differenceInCalendarDays(_, H[te]), c = An(H[te], _), A = c.length === 1 ? 0 : c.filter((X) => b(X)).length, p = Math.abs(E) - (r.value.minMaxRawRange ? 0 : A);
      if (r.value.minRange && r.value.maxRange)
        return p >= +r.value.minRange && p <= +r.value.maxRange;
      if (r.value.minRange)
        return p >= +r.value.minRange;
      if (r.value.maxRange)
        return p <= +r.value.maxRange;
    }
    return true;
  }, C = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, L = (_) => Array.isArray(_) ? [_[0] ? $a(_[0]) : null, _[1] ? $a(_[1]) : null] : $a(_), N = (_, H, te) => _.find(
    (E) => +E.hours === getHours(H) && E.minutes === "*" ? true : +E.minutes === getMinutes(H) && +E.hours === getHours(H)
  ) && te, Y = (_, H, te) => {
    const [E, c] = _, [A, p] = H;
    return !N(E, A, te) && !N(c, p, te) && te;
  }, z = (_, H) => {
    const te = Array.isArray(H) ? H : [H];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? Y(e.disabledTimes, te, _) : !te.some((E) => N(e.disabledTimes, E, _)) : _;
  }, F = (_, H) => {
    const te = Array.isArray(H) ? [wt(H[0]), H[1] ? wt(H[1]) : void 0] : wt(H), E = !e.disabledTimes(te);
    return _ && E;
  }, Z = (_, H) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? z(H, _) : F(H, _) : H, h2 = (_) => {
    let H = true;
    if (!_ || C())
      return true;
    const te = !n.value.minDate && !n.value.maxDate ? L(_) : _;
    return (e.maxTime || n.value.maxDate) && (H = ln(
      e.maxTime,
      n.value.maxDate,
      "max",
      Be(te),
      H
    )), (e.minTime || n.value.minDate) && (H = ln(
      e.minTime,
      n.value.minDate,
      "min",
      Be(te),
      H
    )), Z(_, H);
  }, ie = (_) => {
    if (!e.monthPicker)
      return true;
    let H = true;
    const te = K(Ze(_));
    if (n.value.minDate && n.value.maxDate) {
      const E = K(Ze(n.value.minDate)), c = K(Ze(n.value.maxDate));
      return Oe(te, E) && Ce(te, c) || be(te, E) || be(te, c);
    }
    if (n.value.minDate) {
      const E = K(Ze(n.value.minDate));
      H = Oe(te, E) || be(te, E);
    }
    if (n.value.maxDate) {
      const E = K(Ze(n.value.maxDate));
      H = Ce(te, E) || be(te, E);
    }
    return H;
  }, oe = computed(() => (_) => !e.enableTimePicker || e.ignoreTimeValidation ? true : h2(_)), re = computed(() => (_) => e.monthPicker ? Array.isArray(_) && (r.value.enabled || a.value.enabled) ? !_.filter((te) => !ie(te)).length : ie(_) : true);
  return {
    isDisabled: b,
    validateDate: v,
    validateMonthYearInRange: y,
    isDateRangeAllowed: P,
    checkMinMaxRange: W,
    isValidTime: h2,
    isTimeValid: oe,
    isMonthValid: re
  };
};
var oa = () => {
  const e = computed(() => (n, a) => n == null ? void 0 : n.includes(a)), t = computed(() => (n, a) => n.count ? n.solo ? true : a === 0 : true), r = computed(() => (n, a) => n.count ? n.solo ? true : a === n.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: r };
};
var zl = (e, t, r) => {
  const n = ref(0), a = reactive({
    [Mt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Mt.calendar]: false,
    [Mt.header]: false
  }), f = computed(() => e.monthPicker), v = (T) => {
    var b;
    if ((b = e.flow) != null && b.length) {
      if (!T && f.value)
        return y();
      a[T] = true, Object.keys(a).filter((P) => !a[P]).length || y();
    }
  }, o = () => {
    var T;
    (T = e.flow) != null && T.length && n.value !== -1 && (n.value += 1, t("flow-step", n.value), y());
  }, O = () => {
    n.value = -1;
  }, B = (T, b, ...P) => {
    var V, D;
    e.flow[n.value] === T && r.value && ((D = (V = r.value)[b]) == null || D.call(V, ...P));
  }, y = () => {
    B(at.month, "toggleMonthPicker", true), B(at.year, "toggleYearPicker", true), B(at.calendar, "toggleTimePicker", false, true), B(at.time, "toggleTimePicker", true, true);
    const T = e.flow[n.value];
    (T === at.hours || T === at.minutes || T === at.seconds) && B(T, "toggleTimePicker", true, true, T);
  };
  return { childMount: v, updateFlowStep: o, resetFlow: O, flowStep: n };
};
var sa = {
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
var tt = {
  ...sa,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) }
};
var Ul = {
  key: 1,
  class: "dp__input_wrap"
};
var Kl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var jl = {
  key: 2,
  class: "dp__clear_icon"
};
var Gl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...sa
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      defaultedTextInput: f,
      defaultedAriaLabels: v,
      defaultedInline: o,
      defaultedConfig: O,
      defaultedRange: B,
      defaultedMultiDates: y,
      getDefaultPattern: T,
      getDefaultStartTime: b
    } = Re(a), { checkMinMaxRange: P } = gt(a), V = ref(), D = ref(null), W = ref(false), C = ref(false), L = computed(
      () => ({
        dp__pointer: !a.disabled && !a.readonly && !f.value.enabled,
        dp__disabled: a.disabled,
        dp__input_readonly: !f.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !a.hideInputIcon,
        dp__input_valid: !!a.state,
        dp__input_invalid: a.state === false,
        dp__input_focus: W.value || a.isMenuOpen,
        dp__input_reg: !f.value.enabled,
        [a.inputClassName]: !!a.inputClassName
      })
    ), N = () => {
      n("set-input-date", null), a.clearable && a.autoApply && (n("set-empty-date"), V.value = null);
    }, Y = (p) => {
      const X = b();
      return vl(
        p,
        f.value.format ?? T(),
        X ?? Tn({}, a.enableSeconds),
        a.inputValue,
        C.value,
        a.formatLocale
      );
    }, z = (p) => {
      const { rangeSeparator: X } = f.value, [I, m] = p.split(`${X}`);
      if (I) {
        const U = Y(I.trim()), ne = m ? Y(m.trim()) : null;
        if (isAfter(U, ne))
          return;
        const u = U && ne ? [U, ne] : [U];
        P(ne, u, 0) && (V.value = U ? u : null);
      }
    }, F = () => {
      C.value = true;
    }, Z = (p) => {
      if (B.value.enabled)
        z(p);
      else if (y.value.enabled) {
        const X = p.split(";");
        V.value = X.map((I) => Y(I.trim())).filter((I) => I);
      } else
        V.value = Y(p);
    }, h2 = (p) => {
      var I;
      const X = typeof p == "string" ? p : (I = p.target) == null ? void 0 : I.value;
      X !== "" ? (f.value.openMenu && !a.isMenuOpen && n("open"), Z(X), n("set-input-date", V.value)) : N(), C.value = false, n("update:input-value", X);
    }, ie = (p) => {
      f.value.enabled ? (Z(p.target.value), f.value.enterSubmit && Ba(V.value) && a.inputValue !== "" ? (n("set-input-date", V.value, true), V.value = null) : f.value.enterSubmit && a.inputValue === "" && (V.value = null, n("clear"))) : _(p);
    }, oe = (p) => {
      f.value.enabled && f.value.tabSubmit && Z(p.target.value), f.value.tabSubmit && Ba(V.value) && a.inputValue !== "" ? (n("set-input-date", V.value, true, true), V.value = null) : f.value.tabSubmit && a.inputValue === "" && (V.value = null, n("clear", true));
    }, re = () => {
      W.value = true, n("focus"), nextTick().then(() => {
        var p;
        f.value.enabled && f.value.selectOnFocus && ((p = D.value) == null || p.select());
      });
    }, _ = (p) => {
      p.preventDefault(), ft(p, O.value, true), f.value.enabled && f.value.openMenu && !o.value.input && !a.isMenuOpen ? n("open") : f.value.enabled || n("toggle");
    }, H = () => {
      n("real-blur"), W.value = false, (!a.isMenuOpen || o.value.enabled && o.value.input) && n("blur"), a.autoApply && f.value.enabled && V.value && !a.isMenuOpen && (n("set-input-date", V.value), n("select-date"), V.value = null);
    }, te = (p) => {
      ft(p, O.value, true), n("clear");
    }, E = (p) => {
      if (!f.value.enabled) {
        if (p.code === "Tab")
          return;
        p.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var p;
        (p = D.value) == null || p.focus({ preventScroll: true });
      },
      setParsedDate: (p) => {
        V.value = p;
      }
    }), (p, X) => {
      var I;
      return openBlock(), createElementBlock("div", { onClick: _ }, [
        p.$slots.trigger && !p.$slots["dp-input"] && !unref(o).enabled ? renderSlot(p.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !p.$slots.trigger && (!unref(o).enabled || unref(o).input) ? (openBlock(), createElementBlock("div", Ul, [
          p.$slots["dp-input"] && !p.$slots.trigger && (!unref(o).enabled || unref(o).enabled && unref(o).input) ? renderSlot(p.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: h2,
            onEnter: ie,
            onTab: oe,
            onClear: te,
            onBlur: H,
            onKeypress: E,
            onPaste: F,
            openMenu: () => p.$emit("open"),
            closeMenu: () => p.$emit("close"),
            toggleMenu: () => p.$emit("toggle")
          }) : createCommentVNode("", true),
          p.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: p.uid ? `dp-input-${p.uid}` : void 0,
            ref_key: "inputRef",
            ref: D,
            "data-test": "dp-input",
            name: p.name,
            class: normalizeClass(L.value),
            inputmode: unref(f).enabled ? "text" : "none",
            placeholder: p.placeholder,
            disabled: p.disabled,
            readonly: p.readonly,
            required: p.required,
            value: e.inputValue,
            autocomplete: p.autocomplete,
            "aria-label": (I = unref(v)) == null ? void 0 : I.input,
            "aria-disabled": p.disabled || void 0,
            "aria-invalid": p.state === false ? true : void 0,
            onInput: h2,
            onKeydown: [
              withKeys(ie, ["enter"]),
              withKeys(oe, ["tab"]),
              E
            ],
            onBlur: H,
            onFocus: re,
            onKeypress: E,
            onPaste: F
          }, null, 42, Kl)),
          createBaseVNode("div", {
            onClick: X[2] || (X[2] = (m) => n("toggle"))
          }, [
            p.$slots["input-icon"] && !p.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: X[0] || (X[0] = (m) => n("toggle"))
            }, [
              renderSlot(p.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !p.$slots["input-icon"] && !p.hideInputIcon && !p.$slots["dp-input"] ? (openBlock(), createBlock(unref(Ot), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: X[1] || (X[1] = (m) => n("toggle"))
            })) : createCommentVNode("", true)
          ]),
          p.$slots["clear-icon"] && e.inputValue && p.clearable && !p.disabled && !p.readonly ? (openBlock(), createElementBlock("span", jl, [
            renderSlot(p.$slots, "clear-icon", { clear: te })
          ])) : createCommentVNode("", true),
          p.clearable && !p.$slots["clear-icon"] && e.inputValue && !p.disabled && !p.readonly ? (openBlock(), createBlock(unref(yn), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: X[3] || (X[3] = withModifiers((m) => te(m), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var Ql = ["title"];
var ql = ["disabled"];
var Xl = defineComponent({
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
  setup(e, { emit: t }) {
    const r = t, n = e, {
      defaultedActionRow: a,
      defaultedPreviewFormat: f,
      defaultedMultiCalendars: v,
      defaultedTextInput: o,
      defaultedInline: O,
      defaultedRange: B,
      defaultedMultiDates: y,
      getDefaultPattern: T
    } = Re(n), { isTimeValid: b, isMonthValid: P } = gt(n), { buildMatrix: V } = pt(), D = ref(null), W = ref(null), C = ref(false), L = ref({}), N = ref(null), Y = ref(null);
    onMounted(() => {
      n.arrowNavigation && V([Ie(D), Ie(W)], "actionRow"), z(), window.addEventListener("resize", z);
    }), onUnmounted(() => {
      window.removeEventListener("resize", z);
    });
    const z = () => {
      C.value = false, setTimeout(() => {
        var A, p;
        const E = (A = N.value) == null ? void 0 : A.getBoundingClientRect(), c = (p = Y.value) == null ? void 0 : p.getBoundingClientRect();
        E && c && (L.value.maxWidth = `${c.width - E.width - 20}px`), C.value = true;
      }, 0);
    }, F = computed(() => B.value.enabled && !B.value.partialRange && n.internalModelValue ? n.internalModelValue.length === 2 : true), Z = computed(
      () => !b.value(n.internalModelValue) || !P.value(n.internalModelValue) || !F.value
    ), h2 = () => {
      const E = f.value;
      return n.timePicker || n.monthPicker, E(Be(n.internalModelValue));
    }, ie = () => {
      const E = n.internalModelValue;
      return v.value.count > 0 ? `${oe(E[0])} - ${oe(E[1])}` : [oe(E[0]), oe(E[1])];
    }, oe = (E) => Pn(
      E,
      f.value,
      n.formatLocale,
      o.value.rangeSeparator,
      n.modelAuto,
      T()
    ), re = computed(() => !n.internalModelValue || !n.menuMount ? "" : typeof f.value == "string" ? Array.isArray(n.internalModelValue) ? n.internalModelValue.length === 2 && n.internalModelValue[1] ? ie() : y.value.enabled ? n.internalModelValue.map((E) => `${oe(E)}`) : n.modelAuto ? `${oe(n.internalModelValue[0])}` : `${oe(n.internalModelValue[0])} -` : oe(n.internalModelValue) : h2()), _ = () => y.value.enabled ? "; " : " - ", H = computed(
      () => Array.isArray(re.value) ? re.value.join(_()) : re.value
    ), te = () => {
      b.value(n.internalModelValue) && P.value(n.internalModelValue) && F.value ? r("select-date") : r("invalid-select");
    };
    return (E, c) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: Y,
      class: "dp__action_row"
    }, [
      E.$slots["action-row"] ? renderSlot(E.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: E.internalModelValue,
        disabled: Z.value,
        selectDate: () => E.$emit("select-date"),
        closePicker: () => E.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(a).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: H.value,
          style: normalizeStyle(L.value)
        }, [
          E.$slots["action-preview"] && C.value ? renderSlot(E.$slots, "action-preview", {
            key: 0,
            value: E.internalModelValue
          }) : createCommentVNode("", true),
          !E.$slots["action-preview"] && C.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(H.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, Ql)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: N,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          E.$slots["action-buttons"] ? renderSlot(E.$slots, "action-buttons", {
            key: 0,
            value: E.internalModelValue
          }) : createCommentVNode("", true),
          E.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(O).enabled && unref(a).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: D,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: c[0] || (c[0] = (A) => E.$emit("close-picker")),
              onKeydown: [
                c[1] || (c[1] = withKeys((A) => E.$emit("close-picker"), ["enter"])),
                c[2] || (c[2] = withKeys((A) => E.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(E.cancelText), 545)) : createCommentVNode("", true),
            unref(a).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: c[3] || (c[3] = (A) => E.$emit("select-now")),
              onKeydown: [
                c[4] || (c[4] = withKeys((A) => E.$emit("select-now"), ["enter"])),
                c[5] || (c[5] = withKeys((A) => E.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(E.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(a).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: W,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: Z.value,
              "data-test": "select-button",
              onKeydown: [
                withKeys(te, ["enter"]),
                withKeys(te, ["space"])
              ],
              onClick: te
            }, toDisplayString(E.selectText), 41, ql)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var Jl = ["onKeydown"];
var Zl = { class: "dp__selection_grid_header" };
var xl = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var er = ["aria-label"];
var jt = defineComponent({
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
  setup(e, { expose: t, emit: r }) {
    const { setSelectionGrid: n, buildMultiLevelMatrix: a, setMonthPicker: f } = pt(), v = r, o = e, { defaultedAriaLabels: O, defaultedTextInput: B, defaultedConfig: y } = Re(
      o
    ), { hideNavigationButtons: T } = oa(), b = ref(false), P = ref(null), V = ref(null), D = ref([]), W = ref(), C = ref(null), L = ref(0), N = ref(null);
    onBeforeUpdate(() => {
      P.value = null;
    }), onMounted(() => {
      nextTick().then(() => re()), o.noOverlayFocus || z(), Y(true);
    }), onUnmounted(() => Y(false));
    const Y = (I) => {
      var m;
      o.arrowNavigation && ((m = o.headerRefs) != null && m.length ? f(I) : n(I));
    }, z = () => {
      var m;
      const I = Ie(V);
      I && (B.value.enabled || (P.value ? (m = P.value) == null || m.focus({ preventScroll: true }) : I.focus({ preventScroll: true })), b.value = I.clientHeight < I.scrollHeight);
    }, F = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !o.useRelative,
        "dp--overlay-relative": o.useRelative
      })
    ), Z = computed(
      () => o.useRelative ? { height: `${o.height}px`, width: "260px" } : void 0
    ), h2 = computed(() => ({
      dp__overlay_col: true
    })), ie = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: b.value,
        dp__button_bottom: o.isLast
      })
    ), oe = computed(() => {
      var I, m;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((I = o.items) == null ? void 0 : I.length) <= 6,
        dp__container_block: ((m = o.items) == null ? void 0 : m.length) > 6
      };
    });
    watch(
      () => o.items,
      () => re(false),
      { deep: true }
    );
    const re = (I = true) => {
      nextTick().then(() => {
        const m = Ie(P), U = Ie(V), ne = Ie(C), u = Ie(N), k = ne ? ne.getBoundingClientRect().height : 0;
        U && (U.getBoundingClientRect().height ? L.value = U.getBoundingClientRect().height - k : L.value = y.value.modeHeight - k), m && u && I && (u.scrollTop = m.offsetTop - u.offsetTop - (L.value / 2 - m.getBoundingClientRect().height) - k);
      });
    }, _ = (I) => {
      I.disabled || v("selected", I.value);
    }, H = () => {
      v("toggle"), v("reset-flow");
    }, te = () => {
      o.escClose && H();
    }, E = (I, m, U, ne) => {
      I && ((m.active || m.value === o.focusValue) && (P.value = I), o.arrowNavigation && (Array.isArray(D.value[U]) ? D.value[U][ne] = I : D.value[U] = [I], c()));
    }, c = () => {
      var m, U;
      const I = (m = o.headerRefs) != null && m.length ? [o.headerRefs].concat(D.value) : D.value.concat([o.skipButtonRef ? [] : [C.value]]);
      a(Be(I), (U = o.headerRefs) != null && U.length ? "monthPicker" : "selectionGrid");
    }, A = (I) => {
      o.arrowNavigation || ft(I, y.value, true);
    }, p = (I) => {
      W.value = I, v("hover-value", I);
    }, X = () => {
      if (H(), !o.isLast) {
        const I = cl(o.menuWrapRef ?? null, "action-row");
        if (I) {
          const m = wn(I);
          m == null || m.focus();
        }
      }
    };
    return t({ focusGrid: z }), (I, m) => {
      var U;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: V,
        class: normalizeClass(F.value),
        style: normalizeStyle(Z.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(te, ["prevent"]), ["esc"]),
          m[0] || (m[0] = withKeys(withModifiers((ne) => A(ne), ["prevent"]), ["left"])),
          m[1] || (m[1] = withKeys(withModifiers((ne) => A(ne), ["prevent"]), ["up"])),
          m[2] || (m[2] = withKeys(withModifiers((ne) => A(ne), ["prevent"]), ["down"])),
          m[3] || (m[3] = withKeys(withModifiers((ne) => A(ne), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: N,
          class: normalizeClass(oe.value),
          role: "grid",
          style: normalizeStyle({ "--dp-overlay-height": `${L.value}px` })
        }, [
          createBaseVNode("div", Zl, [
            renderSlot(I.$slots, "header")
          ]),
          I.$slots.overlay ? renderSlot(I.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(I.items, (ne, u) => (openBlock(), createElementBlock("div", {
            key: u,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: I.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(ne, (k, R) => (openBlock(), createElementBlock("div", {
              key: k.value,
              ref_for: true,
              ref: (de) => E(de, k, u, R),
              role: "gridcell",
              class: normalizeClass(h2.value),
              "aria-selected": k.active || void 0,
              "aria-disabled": k.disabled || void 0,
              tabindex: "0",
              "data-test": k.text,
              onClick: (de) => _(k),
              onKeydown: [
                withKeys(withModifiers((de) => _(k), ["prevent"]), ["enter"]),
                withKeys(withModifiers((de) => _(k), ["prevent"]), ["space"])
              ],
              onMouseover: (de) => p(k.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(k.className)
              }, [
                I.$slots.item ? renderSlot(I.$slots, "item", {
                  key: 0,
                  item: k
                }) : createCommentVNode("", true),
                I.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(k.text), 1)
                ], 64))
              ], 2)
            ], 42, xl))), 128))
          ], 2))), 128))
        ], 6),
        I.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: C,
          type: "button",
          "aria-label": (U = unref(O)) == null ? void 0 : U.toggleOverlay,
          class: normalizeClass(ie.value),
          tabindex: "0",
          onClick: H,
          onKeydown: [
            withKeys(H, ["enter"]),
            withKeys(X, ["tab"])
          ]
        }, [
          renderSlot(I.$slots, "button-icon")
        ], 42, er)), [
          [vShow, !unref(T)(I.hideNavigation, I.type)]
        ]) : createCommentVNode("", true)
      ], 46, Jl);
    };
  }
});
var ua = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const t = e, r = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), n = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (a, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !a.stretch,
        "dp--menu--inner-stretched": a.stretch,
        dp__flex_display: a.multiCalendars > 0,
        "dp--flex-display-collapsed": a.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (v, o) => (openBlock(), createElementBlock("div", {
        key: v,
        class: normalizeClass(n.value)
      }, [
        renderSlot(a.$slots, "default", {
          instance: v,
          index: o
        })
      ], 2))), 128))
    ], 2));
  }
});
var tr = ["aria-label", "aria-disabled"];
var Ft = defineComponent({
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
    const r = t, n = ref(null);
    return onMounted(() => r("set-ref", n)), (a, f) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: n,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": a.ariaLabel,
      "aria-disabled": a.disabled || void 0,
      onClick: f[0] || (f[0] = (v) => a.$emit("activate")),
      onKeydown: [
        f[1] || (f[1] = withKeys(withModifiers((v) => a.$emit("activate"), ["prevent"]), ["enter"])),
        f[2] || (f[2] = withKeys(withModifiers((v) => a.$emit("activate"), ["prevent"]), ["space"]))
      ]
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: a.disabled }])
      }, [
        renderSlot(a.$slots, "default")
      ], 2)
    ], 40, tr));
  }
});
var ar = { class: "dp--year-mode-picker" };
var nr = ["aria-label", "data-test"];
var _n = defineComponent({
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
  setup(e, { emit: t }) {
    const r = t, n = e, { showRightIcon: a, showLeftIcon: f } = oa(), { defaultedConfig: v, defaultedMultiCalendars: o, defaultedAriaLabels: O, defaultedTransitions: B } = Re(n), { showTransition: y, transitionName: T } = Ut(B), b = (D = false, W) => {
      r("toggle-year-picker", { flow: D, show: W });
    }, P = (D) => {
      r("year-select", D);
    }, V = (D = false) => {
      r("handle-year", D);
    };
    return (D, W) => {
      var C, L, N;
      return openBlock(), createElementBlock("div", ar, [
        unref(f)(unref(o), e.instance) ? (openBlock(), createBlock(Ft, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (C = unref(O)) == null ? void 0 : C.prevYear,
          disabled: e.isDisabled(false),
          onActivate: W[0] || (W[0] = (Y) => V(false))
        }, {
          default: withCtx(() => [
            D.$slots["arrow-left"] ? renderSlot(D.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            D.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ea), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (L = unref(O)) == null ? void 0 : L.openYearsOverlay,
          "data-test": `year-mode-btn-${e.instance}`,
          onClick: W[1] || (W[1] = () => b(false)),
          onKeydown: W[2] || (W[2] = withKeys(() => b(false), ["enter"]))
        }, [
          D.$slots.year ? renderSlot(D.$slots, "year", {
            key: 0,
            year: e.year
          }) : createCommentVNode("", true),
          D.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, nr),
        unref(a)(unref(o), e.instance) ? (openBlock(), createBlock(Ft, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (N = unref(O)) == null ? void 0 : N.nextYear,
          disabled: e.isDisabled(true),
          onActivate: W[3] || (W[3] = (Y) => V(true))
        }, {
          default: withCtx(() => [
            D.$slots["arrow-right"] ? renderSlot(D.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            D.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Fa), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(T)(e.showYearPicker),
          css: unref(y)
        }, {
          default: withCtx(() => [
            e.showYearPicker ? (openBlock(), createBlock(jt, {
              key: 0,
              items: e.items,
              "text-input": D.textInput,
              "esc-close": D.escClose,
              config: D.config,
              "is-last": D.autoApply && !unref(v).keepActionRow,
              "hide-navigation": D.hideNavigation,
              "aria-labels": D.ariaLabels,
              type: "year",
              onToggle: b,
              onSelected: W[4] || (W[4] = (Y) => P(Y))
            }, createSlots({
              "button-icon": withCtx(() => [
                D.$slots["calendar-icon"] ? renderSlot(D.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                D.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
              ]),
              _: 2
            }, [
              D.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: Y }) => [
                  renderSlot(D.$slots, "year-overlay-value", {
                    text: Y.text,
                    value: Y.value
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
var ja = (e, t, r) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((n) => be(e, n))) {
      const n = t.value.filter((a) => !be(a, e));
      t.value = n.length ? n : null;
    } else
      (r && +r > t.value.length || !r) && t.value.push(e);
  else
    t.value = [e];
};
var Ga = (e, t, r) => {
  let n = e.value ? e.value.slice() : [];
  return n.length === 2 && n[1] !== null && (n = []), n.length ? Ce(t, n[0]) ? (n.unshift(t), r("range-start", n[0]), r("range-start", n[1])) : (n[1] = t, r("range-end", t)) : (n = [t], r("range-start", t)), n;
};
var ia = (e, t, r, n) => {
  e && (e[0] && e[1] && r && t("auto-apply"), e[0] && !e[1] && n && r && t("auto-apply"));
};
var On = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => ot(K(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = ot(K(e.value), e.timezone));
};
var Bn = (e, t, r, n) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && n.value.partialRange) ? n.value.fixedStart && (Oe(e, t.value[0]) || be(e, t.value[0])) ? [t.value[0], e] : n.value.fixedEnd && (Ce(e, t.value[1]) || be(e, t.value[1])) ? [e, t.value[1]] : (r("invalid-fixed-range", e), t.value) : [];
var Yn = ({
  multiCalendars: e,
  highlight: t,
  propDates: r,
  calendars: n,
  modelValue: a,
  props: f,
  filters: v,
  year: o,
  month: O,
  emit: B
}) => {
  const y = computed(() => Ha(f.yearRange, f.locale, f.reverseYears)), T = ref([false]), b = computed(() => (F, Z) => {
    const h2 = set(Ze(/* @__PURE__ */ new Date()), {
      month: O.value(F),
      year: o.value(F)
    });
    return Sn(
      h2,
      r.value.maxDate,
      r.value.minDate,
      f.preventMinMaxNavigation,
      Z
    );
  }), P = () => {
    for (let F = 0; F < e.value.count; F++)
      if (F === 0)
        n.value[F] = n.value[0];
      else {
        const Z = set(K(), n.value[F - 1]);
        n.value[F] = { month: getMonth(Z), year: getYear(addYears(Z, 1)) };
      }
  }, V = (F) => {
    if (!F)
      return P();
    const Z = set(K(), n.value[F]);
    return n.value[0].year = getYear(subYears(Z, e.value.count - 1)), P();
  }, D = (F) => f.focusStartDate ? F[0] : F[1] ? F[1] : F[0], W = () => {
    if (a.value) {
      const F = Array.isArray(a.value) ? D(a.value) : a.value;
      n.value[0] = { month: getMonth(F), year: getYear(F) };
    }
  };
  onMounted(() => {
    W(), e.value.count && P();
  });
  const C = (F, Z) => {
    n.value[Z].year = F, e.value.count && !e.value.solo && V(Z);
  }, L = computed(() => (F) => Rt(y.value, (Z) => {
    var re;
    const h2 = o.value(F) === Z.value, ie = Ht(
      Z.value,
      Ct(r.value.minDate),
      Ct(r.value.maxDate)
    ) || ((re = v.value.years) == null ? void 0 : re.includes(o.value(F))), oe = Ka(t.value, Z.value);
    return { active: h2, disabled: ie, highlighted: oe };
  })), N = (F, Z) => {
    C(F, Z), z(Z);
  }, Y = (F, Z = false) => {
    if (!b.value(F, Z)) {
      const h2 = Z ? o.value(F) + 1 : o.value(F) - 1;
      C(h2, F);
    }
  }, z = (F, Z = false, h2) => {
    Z || B("reset-flow"), h2 !== void 0 ? T.value[F] = h2 : T.value[F] = !T.value[F], T.value || B("overlay-closed");
  };
  return {
    isDisabled: b,
    groupedYears: L,
    showYearPicker: T,
    selectYear: C,
    toggleYearPicker: z,
    handleYearSelect: N,
    handleYear: Y
  };
};
var lr = (e, t) => {
  const {
    defaultedMultiCalendars: r,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: f,
    defaultedRange: v,
    defaultedHighlight: o,
    propDates: O,
    defaultedTz: B,
    defaultedFilters: y,
    defaultedMultiDates: T
  } = Re(e), { modelValue: b, year: P, month: V, calendars: D } = Kt(e, t), W = computed(() => bn(e.formatLocale, e.locale, e.monthNameFormat)), C = ref(null), { checkMinMaxRange: L } = gt(e), {
    selectYear: N,
    groupedYears: Y,
    showYearPicker: z,
    toggleYearPicker: F,
    handleYearSelect: Z,
    handleYear: h2,
    isDisabled: ie
  } = Yn({
    modelValue: b,
    multiCalendars: r,
    highlight: o,
    calendars: D,
    year: P,
    propDates: O,
    month: V,
    filters: y,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (b.value && e.focusStartDate || !b.value) && N(getYear(K(e.startDate)), 0);
  });
  const oe = (k) => k ? { month: getMonth(k), year: getYear(k) } : { month: null, year: null }, re = () => b.value ? Array.isArray(b.value) ? b.value.map((k) => oe(k)) : oe(b.value) : oe(), _ = (k, R) => {
    const de = D.value[k], d = re();
    return Array.isArray(d) ? d.some((le) => le.year === (de == null ? void 0 : de.year) && le.month === R) : (de == null ? void 0 : de.year) === d.year && R === d.month;
  }, H = (k, R, de) => {
    var le, l;
    const d = re();
    return Array.isArray(d) ? P.value(R) === ((le = d[de]) == null ? void 0 : le.year) && k === ((l = d[de]) == null ? void 0 : l.month) : false;
  }, te = (k, R) => {
    if (v.value.enabled) {
      const de = re();
      if (Array.isArray(b.value) && Array.isArray(de)) {
        const d = H(k, R, 0) || H(k, R, 1), le = ut(Ze(K()), k, P.value(R));
        return ra(b.value, C.value, le) && !d;
      }
      return false;
    }
    return false;
  }, E = computed(() => (k) => Rt(W.value, (R) => {
    var S;
    const de = _(k, R.value), d = Ht(
      R.value,
      Dn(P.value(k), O.value.minDate),
      $n(P.value(k), O.value.maxDate)
    ) || bl(O.value.disabledDates, P.value(k)).includes(R.value) || ((S = y.value.months) == null ? void 0 : S.includes(R.value)), le = te(R.value, k), l = Rn(o.value, R.value, P.value(k));
    return { active: de, disabled: d, isBetween: le, highlighted: l };
  })), c = (k, R) => ut(Ze(K()), k, P.value(R)), A = (k, R) => {
    const de = b.value ? b.value : Ze(/* @__PURE__ */ new Date());
    b.value = ut(de, k, P.value(R)), t("auto-apply"), t("update-flow-step");
  }, p = (k, R) => {
    const de = c(k, R);
    v.value.fixedEnd || v.value.fixedStart ? b.value = Bn(de, b, t, v) : b.value ? L(de, b.value) && (b.value = Ga(b, c(k, R), t)) : b.value = [c(k, R)], nextTick().then(() => {
      ia(b.value, t, e.autoApply, e.modelAuto);
    });
  }, X = (k, R) => {
    ja(c(k, R), b, T.value.limit), t("auto-apply", true);
  }, I = (k, R) => (D.value[R].month = k, U(R, D.value[R].year, k), T.value.enabled ? X(k, R) : v.value.enabled ? p(k, R) : A(k, R)), m = (k, R) => {
    N(k, R), U(R, k, null);
  }, U = (k, R, de) => {
    let d = de;
    if (!d && d !== 0) {
      const le = re();
      d = Array.isArray(le) ? le[k].month : le.month;
    }
    t("update-month-year", { instance: k, year: R, month: d });
  };
  return {
    groupedMonths: E,
    groupedYears: Y,
    year: P,
    isDisabled: ie,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: f,
    showYearPicker: z,
    modelValue: b,
    presetDate: (k, R) => {
      On({
        value: k,
        modelValue: b,
        range: v.value.enabled,
        timezone: R ? void 0 : B.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (k, R) => {
      C.value = c(k, R);
    },
    selectMonth: I,
    selectYear: m,
    toggleYearPicker: F,
    handleYearSelect: Z,
    handleYear: h2,
    getModelMonthYear: re
  };
};
var rr = defineComponent({
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
    "update-flow-step",
    "mount",
    "invalid-fixed-range"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = useSlots(), f = Ge(a, "yearMode"), v = e;
    onMounted(() => {
      v.shadow || n("mount", null);
    });
    const {
      groupedMonths: o,
      groupedYears: O,
      year: B,
      isDisabled: y,
      defaultedMultiCalendars: T,
      defaultedConfig: b,
      showYearPicker: P,
      modelValue: V,
      presetDate: D,
      setHoverDate: W,
      selectMonth: C,
      selectYear: L,
      toggleYearPicker: N,
      handleYearSelect: Y,
      handleYear: z,
      getModelMonthYear: F
    } = lr(v, n);
    return t({ getSidebarProps: () => ({
      modelValue: V,
      year: B,
      getModelMonthYear: F,
      selectMonth: C,
      selectYear: L,
      handleYear: z
    }), presetDate: D, toggleYearPicker: (h2) => N(0, h2) }), (h2, ie) => (openBlock(), createBlock(ua, {
      "multi-calendars": unref(T).count,
      collapse: h2.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: oe }) => [
        h2.$slots["top-extra"] ? renderSlot(h2.$slots, "top-extra", {
          key: 0,
          value: h2.internalModelValue
        }) : createCommentVNode("", true),
        h2.$slots["month-year"] ? renderSlot(h2.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(B),
          months: unref(o)(oe),
          years: unref(O)(oe),
          selectMonth: unref(C),
          selectYear: unref(L),
          instance: oe
        }))) : (openBlock(), createBlock(jt, {
          key: 2,
          items: unref(o)(oe),
          "arrow-navigation": h2.arrowNavigation,
          "is-last": h2.autoApply && !unref(b).keepActionRow,
          "esc-close": h2.escClose,
          height: unref(b).modeHeight,
          config: h2.config,
          "no-overlay-focus": !!(h2.noOverlayFocus || h2.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (re) => unref(C)(re, oe),
          onHoverValue: (re) => unref(W)(re, oe)
        }, createSlots({
          header: withCtx(() => [
            createVNode(_n, mergeProps(h2.$props, {
              items: unref(O)(oe),
              instance: oe,
              "show-year-picker": unref(P)[oe],
              year: unref(B)(oe),
              "is-disabled": (re) => unref(y)(oe, re),
              onHandleYear: (re) => unref(z)(oe, re),
              onYearSelect: (re) => unref(Y)(re, oe),
              onToggleYearPicker: (re) => unref(N)(oe, re == null ? void 0 : re.flow, re == null ? void 0 : re.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(f), (re, _) => ({
                name: re,
                fn: withCtx((H) => [
                  renderSlot(h2.$slots, re, normalizeProps(guardReactiveProps(H)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          h2.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: re }) => [
              renderSlot(h2.$slots, "month-overlay-value", {
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
var or = (e, t) => {
  const { modelValue: r } = Kt(e, t), n = ref(null), { defaultedHighlight: a, defaultedMultiDates: f, defaultedFilters: v, defaultedRange: o, propDates: O } = Re(e), B = ref();
  onMounted(() => {
    e.startDate && (r.value && e.focusStartDate || !r.value) && (B.value = getYear(K(e.startDate)));
  });
  const y = (W) => Array.isArray(r.value) ? r.value.some((C) => getYear(C) === W) : r.value ? getYear(r.value) === W : false, T = (W) => o.value.enabled && Array.isArray(r.value) ? ra(r.value, n.value, P(W)) : false, b = computed(() => Rt(Ha(e.yearRange, e.locale, e.reverseYears), (W) => {
    const C = y(W.value), L = Ht(
      W.value,
      Ct(O.value.minDate),
      Ct(O.value.maxDate)
    ) || v.value.years.includes(W.value), N = T(W.value) && !C, Y = Ka(a.value, W.value);
    return { active: C, disabled: L, isBetween: N, highlighted: Y };
  })), P = (W) => setYear(Ze(/* @__PURE__ */ new Date()), W);
  return {
    groupedYears: b,
    modelValue: r,
    focusYear: B,
    setHoverValue: (W) => {
      n.value = setYear(Ze(/* @__PURE__ */ new Date()), W);
    },
    selectYear: (W) => {
      var C;
      if (t("update-month-year", { instance: 0, year: W }), f.value.enabled)
        return r.value ? Array.isArray(r.value) && (((C = r.value) == null ? void 0 : C.map((N) => getYear(N))).includes(W) ? r.value = r.value.filter((N) => getYear(N) !== W) : r.value.push(setYear(Qe(K()), W))) : r.value = [setYear(Qe(K()), W)], t("auto-apply", true);
      o.value.enabled ? (r.value = Ga(r, P(W), t), nextTick().then(() => {
        ia(r.value, t, e.autoApply, e.modelAuto);
      })) : (r.value = P(W), t("auto-apply"));
    }
  };
};
var sr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...tt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { groupedYears: f, modelValue: v, focusYear: o, selectYear: O, setHoverValue: B } = or(a, n), { defaultedConfig: y } = Re(a);
    return t({ getSidebarProps: () => ({
      modelValue: v,
      selectYear: O
    }) }), (b, P) => (openBlock(), createElementBlock("div", null, [
      b.$slots["top-extra"] ? renderSlot(b.$slots, "top-extra", {
        key: 0,
        value: b.internalModelValue
      }) : createCommentVNode("", true),
      b.$slots["month-year"] ? renderSlot(b.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(f),
        selectYear: unref(O)
      }))) : (openBlock(), createBlock(jt, {
        key: 2,
        items: unref(f),
        "is-last": b.autoApply && !unref(y).keepActionRow,
        height: unref(y).modeHeight,
        config: b.config,
        "no-overlay-focus": !!(b.noOverlayFocus || b.textInput),
        "focus-value": unref(o),
        type: "year",
        "use-relative": "",
        onSelected: unref(O),
        onHoverValue: unref(B)
      }, createSlots({ _: 2 }, [
        b.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: V }) => [
            renderSlot(b.$slots, "year-overlay-value", {
              text: V.text,
              value: V.value
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
var ir = ["data-test", "aria-label", "onKeydown", "onClick"];
var dr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var cr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var fr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var vr = ["data-test", "aria-label", "onKeydown", "onClick"];
var mr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var pr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var gr = { key: 0 };
var yr = ["aria-label", "onKeydown"];
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { setTimePickerElements: f, setTimePickerBackRef: v } = pt(), { defaultedAriaLabels: o, defaultedTransitions: O, defaultedFilters: B, defaultedConfig: y, defaultedRange: T } = Re(a), { transitionName: b, showTransition: P } = Ut(O), V = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), D = ref("AM"), W = ref(null), C = ref([]);
    onMounted(() => {
      n("mounted");
    });
    const L = (l) => set(/* @__PURE__ */ new Date(), {
      hours: l.hours,
      minutes: l.minutes,
      seconds: a.enableSeconds ? l.seconds : 0,
      milliseconds: 0
    }), N = computed(
      () => (l) => E(l, a[l]) || z(l, a[l])
    ), Y = computed(() => ({ hours: a.hours, minutes: a.minutes, seconds: a.seconds })), z = (l, S) => T.value.enabled && !T.value.disableTimeRangeValidation ? !a.validateTime(l, S) : false, F = (l, S) => {
      if (T.value.enabled && !T.value.disableTimeRangeValidation) {
        const x = S ? +a[`${l}Increment`] : -+a[`${l}Increment`], J = a[l] + x;
        return !a.validateTime(l, J);
      }
      return false;
    }, Z = computed(() => (l) => !I(+a[l] + +a[`${l}Increment`], l) || F(l, true)), h2 = computed(() => (l) => !I(+a[l] - +a[`${l}Increment`], l) || F(l, false)), ie = (l, S) => add(set(K(), l), S), oe = (l, S) => sub(set(K(), l), S), re = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !a.timePickerInline,
        dp__time_col_reg_block: !a.enableSeconds && a.is24 && !a.timePickerInline,
        dp__time_col_reg_inline: !a.enableSeconds && a.is24 && a.timePickerInline,
        dp__time_col_reg_with_button: !a.enableSeconds && !a.is24,
        dp__time_col_sec: a.enableSeconds && a.is24,
        dp__time_col_sec_with_button: a.enableSeconds && !a.is24
      })
    ), _ = computed(() => {
      const l = [{ type: "hours" }];
      return a.enableMinutes && l.push({ type: "", separator: true }, {
        type: "minutes"
      }), a.enableSeconds && l.push({ type: "", separator: true }, {
        type: "seconds"
      }), l;
    }), H = computed(() => _.value.filter((l) => !l.separator)), te = computed(() => (l) => {
      if (l === "hours") {
        const S = k(+a.hours);
        return { text: S < 10 ? `0${S}` : `${S}`, value: S };
      }
      return { text: a[l] < 10 ? `0${a[l]}` : `${a[l]}`, value: a[l] };
    }), E = (l, S) => {
      var J;
      if (!a.disabledTimesConfig)
        return false;
      const x = a.disabledTimesConfig(a.order, l === "hours" ? S : void 0);
      return x[l] ? !!((J = x[l]) != null && J.includes(S)) : true;
    }, c = (l, S) => S !== "hours" || D.value === "AM" ? l : l + 12, A = (l) => {
      const S = a.is24 ? 24 : 12, x = l === "hours" ? S : 60, J = +a[`${l}GridIncrement`], ae = l === "hours" && !a.is24 ? J : 0, g = [];
      for (let $ = ae; $ < x; $ += J)
        g.push({ value: a.is24 ? $ : c($, l), text: $ < 10 ? `0${$}` : `${$}` });
      return l === "hours" && !a.is24 && g.push({ value: 0, text: "12" }), Rt(g, ($) => ({ active: false, disabled: B.value.times[l].includes($.value) || !I($.value, l) || E(l, $.value) || z(l, $.value) }));
    }, p = (l) => l >= 0 ? l : 59, X = (l) => l >= 0 ? l : 23, I = (l, S) => {
      const x = a.minTime ? L(wa(a.minTime)) : null, J = a.maxTime ? L(wa(a.maxTime)) : null, ae = L(
        wa(
          Y.value,
          S,
          S === "minutes" || S === "seconds" ? p(l) : X(l)
        )
      );
      return x && J ? (isBefore(ae, J) || isEqual(ae, J)) && (isAfter(ae, x) || isEqual(ae, x)) : x ? isAfter(ae, x) || isEqual(ae, x) : J ? isBefore(ae, J) || isEqual(ae, J) : true;
    }, m = (l) => a[`no${l[0].toUpperCase() + l.slice(1)}Overlay`], U = (l) => {
      m(l) || (V[l] = !V[l], V[l] || n("overlay-closed"));
    }, ne = (l) => l === "hours" ? getHours : l === "minutes" ? getMinutes : getSeconds, u = (l, S = true) => {
      const x = S ? ie : oe, J = S ? +a[`${l}Increment`] : -+a[`${l}Increment`];
      I(+a[l] + J, l) && n(
        `update:${l}`,
        ne(l)(x({ [l]: +a[l] }, { [l]: +a[`${l}Increment`] }))
      );
    }, k = (l) => a.is24 ? l : (l >= 12 ? D.value = "PM" : D.value = "AM", ol(l)), R = () => {
      D.value === "PM" ? (D.value = "AM", n("update:hours", a.hours - 12)) : (D.value = "PM", n("update:hours", a.hours + 12)), n("am-pm-change", D.value);
    }, de = (l) => {
      V[l] = true;
    }, d = (l, S, x) => {
      if (l && a.arrowNavigation) {
        Array.isArray(C.value[S]) ? C.value[S][x] = l : C.value[S] = [l];
        const J = C.value.reduce(
          (ae, g) => g.map(($, ge) => [...ae[ge] || [], g[ge]]),
          []
        );
        v(a.closeTimePickerBtn), W.value && (J[1] = J[1].concat(W.value)), f(J, a.order);
      }
    }, le = (l, S) => (U(l), n(`update:${l}`, S));
    return t({ openChildCmp: de }), (l, S) => {
      var x;
      return l.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ur, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_.value, (J, ae) => {
          var g, $, ge;
          return openBlock(), createElementBlock("div", {
            key: ae,
            class: normalizeClass(re.value)
          }, [
            J.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (me) => d(me, ae, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !l.timePickerInline,
                  dp__inc_dec_button_inline: l.timePickerInline,
                  dp__tp_inline_btn_top: l.timePickerInline,
                  dp__inc_dec_button_disabled: Z.value(J.type)
                }),
                "data-test": `${J.type}-time-inc-btn-${a.order}`,
                "aria-label": (g = unref(o)) == null ? void 0 : g.incrementValue(J.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me) => u(J.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => u(J.type), ["prevent"]), ["space"])
                ],
                onClick: (me) => u(J.type)
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  dr,
                  cr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, ir),
              createBaseVNode("button", {
                ref_for: true,
                ref: (me) => d(me, ae, 1),
                type: "button",
                "aria-label": ($ = unref(o)) == null ? void 0 : $.openTpOverlay(J.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !l.timePickerInline,
                  dp__time_display_inline: l.timePickerInline,
                  "dp--time-invalid": N.value(J.type),
                  "dp--time-overlay-btn": !N.value(J.type)
                }),
                disabled: m(J.type),
                tabindex: "0",
                "data-test": `${J.type}-toggle-overlay-btn-${a.order}`,
                onKeydown: [
                  withKeys(withModifiers((me) => U(J.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => U(J.type), ["prevent"]), ["space"])
                ],
                onClick: (me) => U(J.type)
              }, [
                l.$slots[J.type] ? renderSlot(l.$slots, J.type, {
                  key: 0,
                  text: te.value(J.type).text,
                  value: te.value(J.type).value
                }) : createCommentVNode("", true),
                l.$slots[J.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(te.value(J.type).text), 1)
                ], 64))
              ], 42, fr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (me) => d(me, ae, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !l.timePickerInline,
                  dp__inc_dec_button_inline: l.timePickerInline,
                  dp__tp_inline_btn_bottom: l.timePickerInline,
                  dp__inc_dec_button_disabled: h2.value(J.type)
                }),
                "data-test": `${J.type}-time-dec-btn-${a.order}`,
                "aria-label": (ge = unref(o)) == null ? void 0 : ge.decrementValue(J.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me) => u(J.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => u(J.type, false), ["prevent"]), ["space"])
                ],
                onClick: (me) => u(J.type, false)
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  mr,
                  pr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  l.$slots["arrow-down"] ? renderSlot(l.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  l.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, vr)
            ], 64))
          ], 2);
        }), 128)),
        l.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", gr, [
          l.$slots["am-pm-button"] ? renderSlot(l.$slots, "am-pm-button", {
            key: 0,
            toggle: R,
            value: D.value
          }) : createCommentVNode("", true),
          l.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: W,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (x = unref(o)) == null ? void 0 : x.amPmButton,
            tabindex: "0",
            onClick: R,
            onKeydown: [
              withKeys(withModifiers(R, ["prevent"]), ["enter"]),
              withKeys(withModifiers(R, ["prevent"]), ["space"])
            ]
          }, toDisplayString(D.value), 41, yr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(H.value, (J, ae) => (openBlock(), createBlock(Transition, {
          key: ae,
          name: unref(b)(V[J.type]),
          css: unref(P)
        }, {
          default: withCtx(() => [
            V[J.type] ? (openBlock(), createBlock(jt, {
              key: 0,
              items: A(J.type),
              "is-last": l.autoApply && !unref(y).keepActionRow,
              "esc-close": l.escClose,
              type: J.type,
              "text-input": l.textInput,
              config: l.config,
              "arrow-navigation": l.arrowNavigation,
              "aria-labels": l.ariaLabels,
              onSelected: (g) => le(J.type, g),
              onToggle: (g) => U(J.type),
              onResetFlow: S[0] || (S[0] = (g) => l.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                l.$slots["clock-icon"] ? renderSlot(l.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                l.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(l.timePickerInline ? unref(Ot) : unref(La)), { key: 1 }))
              ]),
              _: 2
            }, [
              l.$slots[`${J.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: g }) => [
                  renderSlot(l.$slots, `${J.type}-overlay-value`, {
                    text: g.text,
                    value: g.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var br = { class: "dp--tp-wrap" };
var kr = ["aria-label", "tabindex"];
var wr = ["tabindex"];
var Mr = ["aria-label"];
var In = defineComponent({
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { buildMatrix: f, setTimePicker: v } = pt(), o = useSlots(), { defaultedTransitions: O, defaultedAriaLabels: B, defaultedTextInput: y, defaultedConfig: T, defaultedRange: b } = Re(a), { transitionName: P, showTransition: V } = Ut(O), { hideNavigationButtons: D } = oa(), W = ref(null), C = ref(null), L = ref([]), N = ref(null);
    onMounted(() => {
      n("mount"), !a.timePicker && a.arrowNavigation ? f([Ie(W.value)], "time") : v(true, a.timePicker);
    });
    const Y = computed(() => b.value.enabled && a.modelAuto ? kn(a.internalModelValue) : true), z = ref(false), F = (c) => ({
      hours: Array.isArray(a.hours) ? a.hours[c] : a.hours,
      minutes: Array.isArray(a.minutes) ? a.minutes[c] : a.minutes,
      seconds: Array.isArray(a.seconds) ? a.seconds[c] : a.seconds
    }), Z = computed(() => {
      const c = [];
      if (b.value.enabled)
        for (let A = 0; A < 2; A++)
          c.push(F(A));
      else
        c.push(F(0));
      return c;
    }), h2 = (c, A = false, p = "") => {
      A || n("reset-flow"), z.value = c, n(c ? "overlay-opened" : "overlay-closed"), a.arrowNavigation && v(c), nextTick(() => {
        p !== "" && L.value[0] && L.value[0].openChildCmp(p);
      });
    }, ie = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: a.autoApply && !T.value.keepActionRow
    })), oe = Ge(o, "timePicker"), re = (c, A, p) => b.value.enabled ? A === 0 ? [c, Z.value[1][p]] : [Z.value[0][p], c] : c, _ = (c) => {
      n("update:hours", c);
    }, H = (c) => {
      n("update:minutes", c);
    }, te = (c) => {
      n("update:seconds", c);
    }, E = () => {
      if (N.value && !y.value.enabled && !a.noOverlayFocus) {
        const c = wn(N.value);
        c && c.focus({ preventScroll: true });
      }
    };
    return t({ toggleTimePicker: h2 }), (c, A) => {
      var p;
      return openBlock(), createElementBlock("div", br, [
        !c.timePicker && !c.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: W,
          type: "button",
          class: normalizeClass(ie.value),
          "aria-label": (p = unref(B)) == null ? void 0 : p.openTimePicker,
          tabindex: c.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: [
            A[0] || (A[0] = withKeys((X) => h2(true), ["enter"])),
            A[1] || (A[1] = withKeys((X) => h2(true), ["space"]))
          ],
          onClick: A[2] || (A[2] = (X) => h2(true))
        }, [
          c.$slots["clock-icon"] ? renderSlot(c.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          c.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
        ], 42, kr)), [
          [vShow, !unref(D)(c.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(P)(z.value),
          css: unref(V) && !c.timePickerInline
        }, {
          default: withCtx(() => {
            var X;
            return [
              z.value || c.timePicker || c.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: N,
                class: normalizeClass({
                  dp__overlay: !c.timePickerInline,
                  "dp--overlay-absolute": !a.timePicker && !c.timePickerInline,
                  "dp--overlay-relative": a.timePicker
                }),
                style: normalizeStyle(c.timePicker ? { height: `${unref(T).modeHeight}px` } : void 0),
                tabindex: c.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    c.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  c.$slots["time-picker-overlay"] ? renderSlot(c.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: _,
                    setMinutes: H,
                    setSeconds: te
                  }) : createCommentVNode("", true),
                  c.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(c.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (I, m) => withDirectives((openBlock(), createBlock(hr, mergeProps({ key: m }, {
                      ...c.$props,
                      order: m,
                      hours: I.hours,
                      minutes: I.minutes,
                      seconds: I.seconds,
                      closeTimePickerBtn: C.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: m === 0 ? c.fixedStart : c.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: L,
                      "validate-time": (U, ne) => e.validateTime(U, re(ne, m, U)),
                      "onUpdate:hours": (U) => _(re(U, m, "hours")),
                      "onUpdate:minutes": (U) => H(re(U, m, "minutes")),
                      "onUpdate:seconds": (U) => te(re(U, m, "seconds")),
                      onMounted: E,
                      onOverlayClosed: E,
                      onAmPmChange: A[3] || (A[3] = (U) => c.$emit("am-pm-change", U))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(oe), (U, ne) => ({
                        name: U,
                        fn: withCtx((u) => [
                          renderSlot(c.$slots, U, normalizeProps(guardReactiveProps(u)))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, m === 0 ? true : Y.value]
                    ])), 128))
                  ], 2)),
                  !c.timePicker && !c.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: C,
                    type: "button",
                    class: normalizeClass(ie.value),
                    "aria-label": (X = unref(B)) == null ? void 0 : X.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      A[4] || (A[4] = withKeys((I) => h2(false), ["enter"])),
                      A[5] || (A[5] = withKeys((I) => h2(false), ["space"]))
                    ],
                    onClick: A[6] || (A[6] = (I) => h2(false))
                  }, [
                    c.$slots["calendar-icon"] ? renderSlot(c.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    c.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
                  ], 42, Mr)), [
                    [vShow, !unref(D)(c.hideNavigation, "time")]
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
var Nn = (e, t, r, n) => {
  const { defaultedRange: a } = Re(e), f = (N, Y) => Array.isArray(t[N]) ? t[N][Y] : t[N], v = (N) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[N] : t.seconds : 0, o = (N, Y) => N ? Y !== void 0 ? vt(N, f("hours", Y), f("minutes", Y), v(Y)) : vt(N, t.hours, t.minutes, v()) : setSeconds(K(), v(Y)), O = (N, Y) => {
    t[N] = Y;
  }, B = computed(() => e.modelAuto && a.value.enabled ? Array.isArray(r.value) ? r.value.length > 1 : false : a.value.enabled), y = (N, Y) => {
    const z = Object.fromEntries(
      Object.keys(t).map((F) => F === N ? [F, Y] : [F, t[F]].slice())
    );
    if (B.value && !a.value.disableTimeRangeValidation) {
      const F = (h2) => r.value ? vt(
        r.value[h2],
        z.hours[h2],
        z.minutes[h2],
        z.seconds[h2]
      ) : null, Z = (h2) => setMilliseconds(r.value[h2], 0);
      return !(be(F(0), F(1)) && (isAfter(F(0), Z(1)) || isBefore(F(1), Z(0))));
    }
    return true;
  }, T = (N, Y) => {
    y(N, Y) && (O(N, Y), n && n());
  }, b = (N) => {
    T("hours", N);
  }, P = (N) => {
    T("minutes", N);
  }, V = (N) => {
    T("seconds", N);
  }, D = (N, Y, z, F) => {
    Y && b(N), !Y && !z && P(N), z && V(N), r.value && F(r.value);
  }, W = (N) => {
    if (N) {
      const Y = Array.isArray(N), z = Y ? [+N[0].hours, +N[1].hours] : +N.hours, F = Y ? [+N[0].minutes, +N[1].minutes] : +N.minutes, Z = Y ? [+N[0].seconds, +N[1].seconds] : +N.seconds;
      O("hours", z), O("minutes", F), e.enableSeconds && O("seconds", Z);
    }
  }, C = (N, Y) => {
    const z = {
      hours: Array.isArray(t.hours) ? t.hours[N] : t.hours,
      disabledArr: []
    };
    return (Y || Y === 0) && (z.hours = Y), Array.isArray(e.disabledTimes) && (z.disabledArr = a.value.enabled && Array.isArray(e.disabledTimes[N]) ? e.disabledTimes[N] : e.disabledTimes), z;
  }, L = computed(() => (N, Y) => {
    var z;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: F, hours: Z } = C(N, Y), h2 = F.filter((ie) => +ie.hours === Z);
      return ((z = h2[0]) == null ? void 0 : z.minutes) === "*" ? { hours: [Z], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (h2 == null ? void 0 : h2.map((ie) => +ie.minutes)) ?? [],
        seconds: (h2 == null ? void 0 : h2.map((ie) => ie.seconds ? +ie.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: O,
    updateHours: b,
    updateMinutes: P,
    updateSeconds: V,
    getSetDateTime: o,
    updateTimeValues: D,
    getSecondsValue: v,
    assignStartTime: W,
    validateTime: y,
    disabledTimesConfig: L
  };
};
var Dr = (e, t) => {
  const { modelValue: r, time: n } = Kt(e, t), { defaultedStartTime: a, defaultedRange: f } = Re(e), { updateTimeValues: v, getSetDateTime: o, setTime: O, assignStartTime: B, disabledTimesConfig: y, validateTime: T } = Nn(e, n, r), b = (Y) => {
    const { hours: z, minutes: F, seconds: Z } = Y;
    return { hours: +z, minutes: +F, seconds: Z ? +Z : 0 };
  }, P = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const z = b(e.startTime[0]), F = b(e.startTime[1]);
        return [set(K(), z), set(K(), F)];
      }
      const Y = b(e.startTime);
      return set(K(), Y);
    }
    return f.value.enabled ? [null, null] : null;
  }, V = () => {
    if (f.value.enabled) {
      const [Y, z] = P();
      r.value = [o(Y, 0), o(z, 1)];
    } else
      r.value = o(P());
  }, D = (Y) => Array.isArray(Y) ? [wt(K(Y[0])), wt(K(Y[1]))] : [wt(Y ?? K())], W = (Y, z, F) => {
    O("hours", Y), O("minutes", z), O("seconds", e.enableSeconds ? F : 0);
  }, C = () => {
    const [Y, z] = D(r.value);
    return f.value.enabled ? W(
      [Y.hours, z.hours],
      [Y.minutes, z.minutes],
      [Y.seconds, z.seconds]
    ) : W(Y.hours, Y.minutes, Y.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return B(a.value), r.value ? C() : V();
  });
  const L = () => {
    Array.isArray(r.value) ? r.value = r.value.map((Y, z) => Y && o(Y, z)) : r.value = o(r.value), t("time-update");
  };
  return {
    modelValue: r,
    time: n,
    disabledTimesConfig: y,
    updateTime: (Y, z = true, F = false) => {
      v(Y, z, F, L);
    },
    validateTime: T
  };
};
var $r = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...tt
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), v = Ge(f, "timePicker"), { time: o, modelValue: O, disabledTimesConfig: B, updateTime: y, validateTime: T } = Dr(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: O,
      time: o,
      updateTime: y
    }) }), (P, V) => (openBlock(), createBlock(ua, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(In, mergeProps(P.$props, {
          hours: unref(o).hours,
          minutes: unref(o).minutes,
          seconds: unref(o).seconds,
          "internal-model-value": P.internalModelValue,
          "disabled-times-config": unref(B),
          "validate-time": unref(T),
          "onUpdate:hours": V[0] || (V[0] = (D) => unref(y)(D)),
          "onUpdate:minutes": V[1] || (V[1] = (D) => unref(y)(D, false)),
          "onUpdate:seconds": V[2] || (V[2] = (D) => unref(y)(D, false, true)),
          onAmPmChange: V[3] || (V[3] = (D) => P.$emit("am-pm-change", D))
        }), createSlots({ _: 2 }, [
          renderList(unref(v), (D, W) => ({
            name: D,
            fn: withCtx((C) => [
              renderSlot(P.$slots, D, normalizeProps(guardReactiveProps(C)))
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
var Rr = ["aria-label", "data-test", "onClick", "onKeydown"];
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
    ...tt
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      defaultedTransitions: f,
      defaultedAriaLabels: v,
      defaultedMultiCalendars: o,
      defaultedFilters: O,
      defaultedConfig: B,
      defaultedHighlight: y,
      propDates: T
    } = Re(a), { transitionName: b, showTransition: P } = Ut(f), { buildMatrix: V } = pt(), { handleMonthYearChange: D, isDisabled: W, updateMonthYear: C } = Fl(a, n), { showLeftIcon: L, showRightIcon: N } = oa(), Y = ref(false), z = ref(false), F = ref([null, null, null, null]);
    onMounted(() => {
      n("mount");
    });
    const Z = (m) => ({
      get: () => a[m],
      set: (U) => {
        const ne = m === Je.month ? Je.year : Je.month;
        n("update-month-year", { [m]: U, [ne]: a[ne] }), m === Je.month ? E(true) : c(true);
      }
    }), h2 = computed(Z(Je.month)), ie = computed(Z(Je.year)), oe = computed(() => (m) => ({
      month: a.month,
      year: a.year,
      items: m === Je.month ? a.months : a.years,
      instance: a.instance,
      updateMonthYear: C,
      toggle: m === Je.month ? E : c
    })), re = computed(() => {
      const m = a.months.find((U) => U.value === a.month);
      return m || { text: "", value: 0 };
    }), _ = computed(() => Rt(a.months, (m) => {
      const U = a.month === m.value, ne = Ht(
        m.value,
        Dn(a.year, T.value.minDate),
        $n(a.year, T.value.maxDate)
      ) || O.value.months.includes(m.value), u = Rn(y.value, m.value, a.year);
      return { active: U, disabled: ne, highlighted: u };
    })), H = computed(() => Rt(a.years, (m) => {
      const U = a.year === m.value, ne = Ht(
        m.value,
        Ct(T.value.minDate),
        Ct(T.value.maxDate)
      ) || O.value.years.includes(m.value), u = Ka(y.value, m.value);
      return { active: U, disabled: ne, highlighted: u };
    })), te = (m, U) => {
      U !== void 0 ? m.value = U : m.value = !m.value, m.value || n("overlay-closed");
    }, E = (m = false, U) => {
      A(m), te(Y, U);
    }, c = (m = false, U) => {
      A(m), te(z, U);
    }, A = (m) => {
      m || n("reset-flow");
    }, p = (m, U) => {
      a.arrowNavigation && (F.value[U] = Ie(m), V(F.value, "monthYear"));
    }, X = computed(() => {
      var m, U;
      return [
        {
          type: Je.month,
          index: 1,
          toggle: E,
          modelValue: h2.value,
          updateModelValue: (ne) => h2.value = ne,
          text: re.value.text,
          showSelectionGrid: Y.value,
          items: _.value,
          ariaLabel: (m = v.value) == null ? void 0 : m.openMonthsOverlay
        },
        {
          type: Je.year,
          index: 2,
          toggle: c,
          modelValue: ie.value,
          updateModelValue: (ne) => ie.value = ne,
          text: Mn(a.year, a.locale),
          showSelectionGrid: z.value,
          items: H.value,
          ariaLabel: (U = v.value) == null ? void 0 : U.openYearsOverlay
        }
      ];
    }), I = computed(() => a.disableYearSelect ? [X.value[0]] : a.yearFirst ? [...X.value].reverse() : X.value);
    return t({
      toggleMonthPicker: E,
      toggleYearPicker: c,
      handleMonthYearChange: D
    }), (m, U) => {
      var ne, u, k;
      return openBlock(), createElementBlock("div", Ar, [
        m.$slots["month-year"] ? (openBlock(), createElementBlock("div", Tr, [
          renderSlot(m.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(C), handleMonthYearChange: unref(D), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          m.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Sr, [
            renderSlot(m.$slots, "top-extra", { value: m.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Pr, [
            unref(L)(unref(o), e.instance) && !m.vertical ? (openBlock(), createBlock(Ft, {
              key: 0,
              "aria-label": (ne = unref(v)) == null ? void 0 : ne.prevMonth,
              disabled: unref(W)(false),
              onActivate: U[0] || (U[0] = (R) => unref(D)(false, true)),
              onSetRef: U[1] || (U[1] = (R) => p(R, 0))
            }, {
              default: withCtx(() => [
                m.$slots["arrow-left"] ? renderSlot(m.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                m.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ea), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: m.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(I.value, (R, de) => (openBlock(), createElementBlock(Fragment, {
                key: R.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (d) => p(d, de + 1),
                  type: "button",
                  class: "dp__btn dp__month_year_select",
                  tabindex: "0",
                  "aria-label": R.ariaLabel,
                  "data-test": `${R.type}-toggle-overlay-${e.instance}`,
                  onClick: R.toggle,
                  onKeydown: [
                    withKeys(withModifiers(R.toggle, ["prevent"]), ["enter"]),
                    withKeys(withModifiers(R.toggle, ["prevent"]), ["space"])
                  ]
                }, [
                  m.$slots[R.type] ? renderSlot(m.$slots, R.type, {
                    key: 0,
                    text: R.text,
                    value: a[R.type]
                  }) : createCommentVNode("", true),
                  m.$slots[R.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(R.text), 1)
                  ], 64))
                ], 40, Rr),
                createVNode(Transition, {
                  name: unref(b)(R.showSelectionGrid),
                  css: unref(P)
                }, {
                  default: withCtx(() => [
                    R.showSelectionGrid ? (openBlock(), createBlock(jt, {
                      key: 0,
                      items: R.items,
                      "arrow-navigation": m.arrowNavigation,
                      "hide-navigation": m.hideNavigation,
                      "is-last": m.autoApply && !unref(B).keepActionRow,
                      "skip-button-ref": false,
                      config: m.config,
                      type: R.type,
                      "header-refs": [],
                      "esc-close": m.escClose,
                      "menu-wrap-ref": m.menuWrapRef,
                      "text-input": m.textInput,
                      "aria-labels": m.ariaLabels,
                      onSelected: R.updateModelValue,
                      onToggle: R.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        m.$slots["calendar-icon"] ? renderSlot(m.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        m.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      m.$slots[`${R.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: d }) => [
                          renderSlot(m.$slots, `${R.type}-overlay-value`, {
                            text: d.text,
                            value: d.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      m.$slots[`${R.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(m.$slots, `${R.type}-overlay`, normalizeProps(guardReactiveProps(oe.value(R.type))))
                        ]),
                        key: "1"
                      } : void 0,
                      m.$slots[`${R.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(m.$slots, `${R.type}-overlay-header`, {
                            toggle: R.toggle
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
            unref(L)(unref(o), e.instance) && m.vertical ? (openBlock(), createBlock(Ft, {
              key: 1,
              "aria-label": (u = unref(v)) == null ? void 0 : u.prevMonth,
              disabled: unref(W)(false),
              onActivate: U[2] || (U[2] = (R) => unref(D)(false, true))
            }, {
              default: withCtx(() => [
                m.$slots["arrow-up"] ? renderSlot(m.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                m.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(N)(unref(o), e.instance) ? (openBlock(), createBlock(Ft, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(W)(true),
              "aria-label": (k = unref(v)) == null ? void 0 : k.nextMonth,
              onActivate: U[3] || (U[3] = (R) => unref(D)(true, true)),
              onSetRef: U[4] || (U[4] = (R) => p(R, m.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(m.$slots, m.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(m.vertical ? unref(Wa) : unref(Fa)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var _r = ["aria-label"];
var Or = {
  class: "dp__calendar_header",
  role: "row"
};
var Br = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Yr = ["aria-label"];
var Ir = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Nr = ["aria-label"];
var Er = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Fr = { class: "dp__cell_inner" };
var Lr = ["id", "aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Vr = defineComponent({
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { buildMultiLevelMatrix: f } = pt(), {
      defaultedTransitions: v,
      defaultedConfig: o,
      defaultedAriaLabels: O,
      defaultedMultiCalendars: B,
      defaultedWeekNumbers: y,
      defaultedMultiDates: T
    } = Re(a), b = ref(null), P = ref({
      bottom: "",
      left: "",
      transform: ""
    }), V = ref([]), D = ref(null), W = ref(true), C = ref(""), L = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), N = ref([]), Y = ref({ left: "50%" }), z = ref(false), F = computed(() => a.calendar ? a.calendar(a.mappedDates) : a.mappedDates), Z = computed(() => a.dayNames ? Array.isArray(a.dayNames) ? a.dayNames : a.dayNames(a.locale, +a.weekStart) : rl(a.formatLocale, a.locale, +a.weekStart));
    onMounted(() => {
      n("mount", { cmp: "calendar", refs: V }), o.value.noSwipe || D.value && (D.value.addEventListener("touchstart", X, { passive: false }), D.value.addEventListener("touchend", I, { passive: false }), D.value.addEventListener("touchmove", m, { passive: false })), a.monthChangeOnScroll && D.value && D.value.addEventListener("wheel", u, { passive: false });
    });
    const h2 = (l) => l ? a.vertical ? "vNext" : "next" : a.vertical ? "vPrevious" : "previous", ie = (l, S) => {
      if (a.transitions) {
        const x = Qe(ut(K(), a.month, a.year));
        C.value = Oe(Qe(ut(K(), l, S)), x) ? v.value[h2(true)] : v.value[h2(false)], W.value = false, nextTick(() => {
          W.value = true;
        });
      }
    }, oe = computed(
      () => ({
        [a.calendarClassName]: !!a.calendarClassName
      })
    ), re = computed(() => (l) => {
      const S = sl(l);
      return {
        dp__marker_dot: S.type === "dot",
        dp__marker_line: S.type === "line"
      };
    }), _ = computed(() => (l) => be(l, b.value)), H = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: B.value.count > 0 && a.instance !== 0
    })), te = computed(() => (l) => a.hideOffsetDates ? l.current : true), E = (l) => format(l, "yyyy-MM-dd"), c = async (l, S, x) => {
      const J = Ie(V.value[S][x]);
      if (J) {
        const { width: ae, height: g } = J.getBoundingClientRect();
        b.value = l.value;
        let $ = { left: `${ae / 2}px` }, ge = -50;
        if (await nextTick(), N.value[0]) {
          const { left: me, width: Ee } = N.value[0].getBoundingClientRect();
          me < 0 && ($ = { left: "0" }, ge = 0, Y.value.left = `${ae / 2}px`), window.innerWidth < me + Ee && ($ = { right: "0" }, ge = 0, Y.value.left = `${Ee - ae / 2}px`);
        }
        P.value = {
          bottom: `${g}px`,
          ...$,
          transform: `translateX(${ge}%)`
        }, n("tooltip-open", l.marker);
      }
    }, A = async (l, S, x) => {
      var J, ae;
      if (z.value && T.value.enabled && T.value.dragSelect)
        return n("select-date", l);
      n("set-hover-date", l), (ae = (J = l.marker) == null ? void 0 : J.tooltip) != null && ae.length && await c(l, S, x);
    }, p = (l) => {
      b.value && (b.value = null, P.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), n("tooltip-close", l.marker));
    }, X = (l) => {
      L.value.startX = l.changedTouches[0].screenX, L.value.startY = l.changedTouches[0].screenY;
    }, I = (l) => {
      L.value.endX = l.changedTouches[0].screenX, L.value.endY = l.changedTouches[0].screenY, U();
    }, m = (l) => {
      a.vertical && !a.inline && l.preventDefault();
    }, U = () => {
      const l = a.vertical ? "Y" : "X";
      Math.abs(L.value[`start${l}`] - L.value[`end${l}`]) > 10 && n("handle-swipe", L.value[`start${l}`] > L.value[`end${l}`] ? "right" : "left");
    }, ne = (l, S, x) => {
      l && (Array.isArray(V.value[S]) ? V.value[S][x] = l : V.value[S] = [l]), a.arrowNavigation && f(V.value, "calendar");
    }, u = (l) => {
      a.monthChangeOnScroll && (l.preventDefault(), n("handle-scroll", l));
    }, k = (l) => y.value.type === "local" ? getWeek(l.value, { weekStartsOn: +a.weekStart }) : y.value.type === "iso" ? getISOWeek(l.value) : typeof y.value.type == "function" ? y.value.type(l.value) : "", R = (l) => {
      const S = l[0];
      return y.value.hideOnOffsetDates ? l.some((x) => x.current) ? k(S) : "" : k(S);
    }, de = (l, S) => {
      T.value.enabled || (ft(l, o.value), n("select-date", S));
    }, d = (l) => {
      ft(l, o.value);
    }, le = (l) => {
      T.value.enabled && T.value.dragSelect ? (z.value = true, n("select-date", l)) : T.value.enabled && n("select-date", l);
    };
    return t({ triggerTransition: ie }), (l, S) => {
      var x;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(H.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: D,
          role: "grid",
          class: normalizeClass(oe.value),
          "aria-label": (x = unref(O)) == null ? void 0 : x.calendarWrap
        }, [
          createBaseVNode("div", Or, [
            l.weekNumbers ? (openBlock(), createElementBlock("div", Br, toDisplayString(l.weekNumName), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (J, ae) => {
              var g, $;
              return openBlock(), createElementBlock("div", {
                key: ae,
                class: "dp__calendar_header_item",
                role: "gridcell",
                "data-test": "calendar-header",
                "aria-label": ($ = (g = unref(O)) == null ? void 0 : g.weekDay) == null ? void 0 : $.call(g, ae)
              }, [
                l.$slots["calendar-header"] ? renderSlot(l.$slots, "calendar-header", {
                  key: 0,
                  day: J,
                  index: ae
                }) : createCommentVNode("", true),
                l.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(J), 1)
                ], 64))
              ], 8, Yr);
            }), 128))
          ]),
          Ir,
          createVNode(Transition, {
            name: C.value,
            css: !!l.transitions
          }, {
            default: withCtx(() => {
              var J;
              return [
                W.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "dp__calendar",
                  role: "rowgroup",
                  "aria-label": ((J = unref(O)) == null ? void 0 : J.calendarDays) || void 0,
                  onMouseleave: S[1] || (S[1] = (ae) => z.value = false)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(F.value, (ae, g) => (openBlock(), createElementBlock("div", {
                    key: g,
                    class: "dp__calendar_row",
                    role: "row"
                  }, [
                    l.weekNumbers ? (openBlock(), createElementBlock("div", Er, [
                      createBaseVNode("div", Fr, toDisplayString(R(ae.days)), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(ae.days, ($, ge) => {
                      var me, Ee, ue;
                      return openBlock(), createElementBlock("div", {
                        id: E($.value),
                        ref_for: true,
                        ref: (Te) => ne(Te, g, ge),
                        key: ge + g,
                        role: "gridcell",
                        class: "dp__calendar_item",
                        "aria-selected": ($.classData.dp__active_date || $.classData.dp__range_start || $.classData.dp__range_start) ?? void 0,
                        "aria-disabled": $.classData.dp__cell_disabled || void 0,
                        "aria-label": (Ee = (me = unref(O)) == null ? void 0 : me.day) == null ? void 0 : Ee.call(me, $),
                        tabindex: "0",
                        "data-test": $.value,
                        onClick: withModifiers((Te) => de(Te, $), ["prevent"]),
                        onKeydown: [
                          withKeys((Te) => l.$emit("select-date", $), ["enter"]),
                          withKeys((Te) => l.$emit("handle-space", $), ["space"])
                        ],
                        onMouseenter: (Te) => A($, g, ge),
                        onMouseleave: (Te) => p($),
                        onMousedown: (Te) => le($),
                        onMouseup: S[0] || (S[0] = (Te) => z.value = false)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["dp__cell_inner", $.classData])
                        }, [
                          l.$slots.day && te.value($) ? renderSlot(l.$slots, "day", {
                            key: 0,
                            day: +$.text,
                            date: $.value
                          }) : createCommentVNode("", true),
                          l.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createTextVNode(toDisplayString($.text), 1)
                          ], 64)),
                          $.marker && te.value($) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                            l.$slots.marker ? renderSlot(l.$slots, "marker", {
                              key: 0,
                              marker: $.marker,
                              day: +$.text,
                              date: $.value
                            }) : (openBlock(), createElementBlock("div", {
                              key: 1,
                              class: normalizeClass(re.value($.marker)),
                              style: normalizeStyle($.marker.color ? { backgroundColor: $.marker.color } : {})
                            }, null, 6))
                          ], 64)) : createCommentVNode("", true),
                          _.value($.value) ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_for: true,
                            ref_key: "activeTooltip",
                            ref: N,
                            class: "dp__marker_tooltip",
                            style: normalizeStyle(P.value)
                          }, [
                            (ue = $.marker) != null && ue.tooltip ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: "dp__tooltip_content",
                              onClick: d
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList($.marker.tooltip, (Te, Ue) => (openBlock(), createElementBlock("div", {
                                key: Ue,
                                class: "dp__tooltip_text"
                              }, [
                                l.$slots["marker-tooltip"] ? renderSlot(l.$slots, "marker-tooltip", {
                                  key: 0,
                                  tooltip: Te,
                                  day: $.value
                                }) : createCommentVNode("", true),
                                l.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createBaseVNode("div", {
                                    class: "dp__tooltip_mark",
                                    style: normalizeStyle(Te.color ? { backgroundColor: Te.color } : {})
                                  }, null, 4),
                                  createBaseVNode("div", null, toDisplayString(Te.text), 1)
                                ], 64))
                              ]))), 128)),
                              createBaseVNode("div", {
                                class: "dp__arrow_bottom_tp",
                                style: normalizeStyle(Y.value)
                              }, null, 4)
                            ])) : createCommentVNode("", true)
                          ], 4)) : createCommentVNode("", true)
                        ], 2)
                      ], 40, Lr);
                    }), 128))
                  ]))), 128))
                ], 40, Nr)) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 8, ["name", "css"])
        ], 10, _r)
      ], 2);
    };
  }
});
var sn = (e) => Array.isArray(e);
var Wr = (e, t, r, n) => {
  const a = ref([]), f = ref(/* @__PURE__ */ new Date()), v = ref(), { modelValue: o, calendars: O, time: B, today: y } = Kt(e, t), {
    defaultedMultiCalendars: T,
    defaultedStartTime: b,
    defaultedRange: P,
    defaultedConfig: V,
    defaultedTz: D,
    propDates: W,
    defaultedMultiDates: C
  } = Re(e), { validateMonthYearInRange: L, isDisabled: N, isDateRangeAllowed: Y, checkMinMaxRange: z } = gt(e), { updateTimeValues: F, getSetDateTime: Z, setTime: h2, assignStartTime: ie, validateTime: oe, disabledTimesConfig: re } = Nn(e, B, o, n), _ = computed(
    () => (s) => O.value[s] ? O.value[s].month : 0
  ), H = computed(
    () => (s) => O.value[s] ? O.value[s].year : 0
  ), te = (s) => !V.value.keepViewOnOffsetClick || s ? true : !v.value, E = (s, w, G, ve = false) => {
    var De, je;
    te(ve) && (O.value[s] || (O.value[s] = { month: 0, year: 0 }), O.value[s].month = an(w) ? (De = O.value[s]) == null ? void 0 : De.month : w, O.value[s].year = an(G) ? (je = O.value[s]) == null ? void 0 : je.year : G);
  }, c = () => {
    e.autoApply && t("select-date");
  };
  watch(
    o,
    (s, w) => {
      JSON.stringify(s) !== JSON.stringify(w) && X();
    },
    { deep: true }
  ), onMounted(() => {
    e.shadow || (o.value || (l(), b.value && ie(b.value)), X(true), e.focusStartDate && e.startDate && l());
  });
  const A = computed(() => {
    var s;
    return (s = e.flow) != null && s.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), p = () => {
    e.autoApply && A.value && t("auto-apply");
  }, X = (s = false) => {
    if (o.value)
      return Array.isArray(o.value) ? (a.value = o.value, R(s)) : U(o.value, s);
    if (T.value.count && s && !e.startDate)
      return m(K(), s);
  }, I = () => Array.isArray(o.value) && P.value.enabled ? getMonth(o.value[0]) === getMonth(o.value[1] ?? o.value[0]) : false, m = (s, w = false) => {
    if ((!T.value.count || !T.value.static || w) && E(0, getMonth(s), getYear(s)), T.value.count && (!T.value.solo || !o.value || I()))
      for (let G = 1; G < T.value.count; G++) {
        const ve = set(K(), { month: _.value(G - 1), year: H.value(G - 1) }), De = add(ve, { months: 1 });
        O.value[G] = { month: getMonth(De), year: getYear(De) };
      }
  }, U = (s, w) => {
    m(s), h2("hours", getHours(s)), h2("minutes", getMinutes(s)), h2("seconds", getSeconds(s)), T.value.count && w && le();
  }, ne = (s) => {
    if (T.value.count) {
      if (T.value.solo)
        return 0;
      const w = getMonth(s[0]), G = getMonth(s[1]);
      return Math.abs(G - w) < T.value.count ? 0 : 1;
    }
    return 1;
  }, u = (s, w) => {
    s[1] && P.value.showLastInRange ? m(s[ne(s)], w) : m(s[0], w);
    const G = (ve, De) => [
      ve(s[0]),
      s[1] ? ve(s[1]) : B[De][1]
    ];
    h2("hours", G(getHours, "hours")), h2("minutes", G(getMinutes, "minutes")), h2("seconds", G(getSeconds, "seconds"));
  }, k = (s, w) => {
    if ((P.value.enabled || e.weekPicker) && !C.value.enabled)
      return u(s, w);
    if (C.value.enabled && w) {
      const G = s[s.length - 1];
      return U(G, w);
    }
  }, R = (s) => {
    const w = o.value;
    k(w, s), T.value.count && T.value.solo && le();
  }, de = (s, w) => {
    const G = set(K(), { month: _.value(w), year: H.value(w) }), ve = s < 0 ? addMonths(G, 1) : subMonths(G, 1);
    L(getMonth(ve), getYear(ve), s < 0, e.preventMinMaxNavigation) && (E(w, getMonth(ve), getYear(ve)), t("update-month-year", { instance: w, month: getMonth(ve), year: getYear(ve) }), T.value.count && !T.value.solo && d(w), r());
  }, d = (s) => {
    for (let w = s - 1; w >= 0; w--) {
      const G = subMonths(set(K(), { month: _.value(w + 1), year: H.value(w + 1) }), 1);
      E(w, getMonth(G), getYear(G));
    }
    for (let w = s + 1; w <= T.value.count - 1; w++) {
      const G = addMonths(set(K(), { month: _.value(w - 1), year: H.value(w - 1) }), 1);
      E(w, getMonth(G), getYear(G));
    }
  }, le = () => {
    if (Array.isArray(o.value) && o.value.length === 2) {
      const s = K(
        K(o.value[1] ? o.value[1] : addMonths(o.value[0], 1))
      ), [w, G] = [getMonth(o.value[0]), getYear(o.value[0])], [ve, De] = [getMonth(o.value[1]), getYear(o.value[1])];
      (w !== ve || w === ve && G !== De) && T.value.solo && E(1, getMonth(s), getYear(s));
    } else
      o.value && !Array.isArray(o.value) && (E(0, getMonth(o.value), getYear(o.value)), m(K()));
  }, l = () => {
    e.startDate && (E(0, getMonth(K(e.startDate)), getYear(K(e.startDate))), T.value.count && d(0));
  }, S = (s, w) => {
    if (e.monthChangeOnScroll) {
      const G = (/* @__PURE__ */ new Date()).getTime() - f.value.getTime(), ve = Math.abs(s.deltaY);
      let De = 500;
      ve > 1 && (De = 100), ve > 100 && (De = 0), G > De && (f.value = /* @__PURE__ */ new Date(), de(e.monthChangeOnScroll !== "inverse" ? -s.deltaY : s.deltaY, w));
    }
  }, x = (s, w, G = false) => {
    e.monthChangeOnArrows && e.vertical === G && J(s, w);
  }, J = (s, w) => {
    de(s === "right" ? -1 : 1, w);
  }, ae = (s) => {
    if (W.value.markers)
      return aa(s.value, W.value.markers);
  }, g = (s, w) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [s == 0, true];
      case "fair":
        return [s == 0 || w > s, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, $ = (s, w, G, ve) => {
    if (e.sixWeeks && s.length < 6) {
      const De = 6 - s.length, je = (w.getDay() + 7 - ve) % 7, qt = 6 - (G.getDay() + 7 - ve) % 7, [Nt, ha] = g(je, qt);
      for (let yt = 1; yt <= De; yt++)
        if (ha ? !!(yt % 2) == Nt : Nt) {
          const Xt = s[0].days[0], ba = ge(addDays(Xt.value, -7), getMonth(w));
          s.unshift({ days: ba });
        } else {
          const Xt = s[s.length - 1], ba = Xt.days[Xt.days.length - 1], Fn = ge(addDays(ba.value, 1), getMonth(w));
          s.push({ days: Fn });
        }
    }
    return s;
  }, ge = (s, w) => {
    const G = K(s), ve = [];
    for (let De = 0; De < 7; De++) {
      const je = addDays(G, De), It = getMonth(je) !== w;
      ve.push({
        text: e.hideOffsetDates && It ? "" : je.getDate(),
        value: je,
        current: !It,
        classData: {}
      });
    }
    return ve;
  }, me = (s, w) => {
    const G = [], ve = new Date(w, s), De = new Date(w, s + 1, 0), je = e.weekStart, It = startOfWeek(ve, { weekStartsOn: je }), qt = (Nt) => {
      const ha = ge(Nt, s);
      if (G.push({ days: ha }), !G[G.length - 1].days.some(
        (yt) => be(Qe(yt.value), Qe(De))
      )) {
        const yt = addDays(Nt, 7);
        qt(yt);
      }
    };
    return qt(It), $(G, ve, De, je);
  }, Ee = (s) => {
    const w = vt(K(s.value), B.hours, B.minutes, Ke());
    t("date-update", w), C.value.enabled ? ja(w, o, C.value.limit) : o.value = w, n(), nextTick().then(() => {
      p();
    });
  }, ue = (s) => P.value.noDisabledRange ? An(a.value[0], s).some((G) => N(G)) : false, Te = () => {
    a.value = o.value ? o.value.slice() : [], a.value.length === 2 && !(P.value.fixedStart || P.value.fixedEnd) && (a.value = []);
  }, Ue = (s, w) => {
    const G = [
      K(s.value),
      addDays(K(s.value), +P.value.autoRange)
    ];
    Y(G) ? (w && Gt(s.value), a.value = G) : t("invalid-date", s.value);
  }, Gt = (s) => {
    const w = getMonth(K(s)), G = getYear(K(s));
    if (E(0, w, G), T.value.count > 0)
      for (let ve = 1; ve < T.value.count; ve++) {
        const De = pl(
          set(K(s), { year: _.value(ve - 1), month: H.value(ve - 1) })
        );
        E(ve, De.month, De.year);
      }
  }, da = (s) => {
    if (ue(s.value) || !z(s.value, o.value, P.value.fixedStart ? 0 : 1))
      return t("invalid-date", s.value);
    a.value = Bn(K(s.value), o, t, P);
  }, Bt = (s, w) => {
    if (Te(), P.value.autoRange)
      return Ue(s, w);
    if (P.value.fixedStart || P.value.fixedEnd)
      return da(s);
    a.value[0] ? z(K(s.value), o.value) && !ue(s.value) ? Ce(K(s.value), K(a.value[0])) ? (a.value.unshift(K(s.value)), t("range-end", a.value[0])) : (a.value[1] = K(s.value), t("range-end", a.value[1])) : (e.autoApply && t("auto-apply-invalid", s.value), t("invalid-date", s.value)) : (a.value[0] = K(s.value), t("range-start", a.value[0]));
  }, Ke = (s = true) => e.enableSeconds ? Array.isArray(B.seconds) ? s ? B.seconds[0] : B.seconds[1] : B.seconds : 0, Yt = (s) => {
    a.value[s] = vt(
      a.value[s],
      B.hours[s],
      B.minutes[s],
      Ke(s !== 1)
    );
  }, ca = () => {
    var s, w;
    a.value[0] && a.value[1] && +((s = a.value) == null ? void 0 : s[0]) > +((w = a.value) == null ? void 0 : w[1]) && (a.value.reverse(), t("range-start", a.value[0]), t("range-end", a.value[1]));
  }, Qt = () => {
    a.value.length && (a.value[0] && !a.value[1] ? Yt(0) : (Yt(0), Yt(1), n()), ca(), o.value = a.value.slice(), ia(a.value, t, e.autoApply, e.modelAuto));
  }, fa = (s, w = false) => {
    if (N(s.value) || !s.current && e.hideOffsetDates)
      return t("invalid-date", s.value);
    if (v.value = JSON.parse(JSON.stringify(s)), !P.value.enabled)
      return Ee(s);
    sn(B.hours) && sn(B.minutes) && !C.value.enabled && (Bt(s, w), Qt());
  }, va = (s, w) => {
    var ve;
    E(s, w.month, w.year, true), T.value.count && !T.value.solo && d(s), t("update-month-year", { instance: s, month: w.month, year: w.year }), r(T.value.solo ? s : void 0);
    const G = (ve = e.flow) != null && ve.length ? e.flow[e.flowStep] : void 0;
    !w.fromNav && (G === at.month || G === at.year) && n();
  }, ma = (s, w) => {
    On({
      value: s,
      modelValue: o,
      range: P.value.enabled,
      timezone: w ? void 0 : D.value.timezone
    }), c(), e.multiCalendars && nextTick().then(() => X(true));
  }, pa = () => {
    P.value.enabled ? o.value && Array.isArray(o.value) && o.value[0] ? o.value = Ce(K(), o.value[0]) ? [K(), o.value[0]] : [o.value[0], K()] : o.value = [K()] : o.value = K(), c();
  }, ga = () => {
    if (Array.isArray(o.value))
      if (C.value.enabled) {
        const s = ya();
        o.value[o.value.length - 1] = Z(s);
      } else
        o.value = o.value.map((s, w) => s && Z(s, w));
    else
      o.value = Z(o.value);
    t("time-update");
  }, ya = () => Array.isArray(o.value) && o.value.length ? o.value[o.value.length - 1] : null;
  return {
    calendars: O,
    modelValue: o,
    month: _,
    year: H,
    time: B,
    disabledTimesConfig: re,
    today: y,
    validateTime: oe,
    getCalendarDays: me,
    getMarker: ae,
    handleScroll: S,
    handleSwipe: J,
    handleArrow: x,
    selectDate: fa,
    updateMonthYear: va,
    presetDate: ma,
    selectCurrentDate: pa,
    updateTime: (s, w = true, G = false) => {
      F(s, w, G, ga);
    }
  };
};
var Hr = { key: 0 };
var zr = defineComponent({
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      calendars: f,
      month: v,
      year: o,
      modelValue: O,
      time: B,
      disabledTimesConfig: y,
      today: T,
      validateTime: b,
      getCalendarDays: P,
      getMarker: V,
      handleArrow: D,
      handleScroll: W,
      handleSwipe: C,
      selectDate: L,
      updateMonthYear: N,
      presetDate: Y,
      selectCurrentDate: z,
      updateTime: F
    } = Wr(a, n, I, m), Z = useSlots(), { setHoverDate: h2, getDayClassData: ie, clearHoverDate: oe } = Hl(O, a), { defaultedMultiCalendars: re } = Re(a), _ = ref([]), H = ref([]), te = ref(null), E = Ge(Z, "calendar"), c = Ge(Z, "monthYear"), A = Ge(Z, "timePicker"), p = (l) => {
      a.shadow || n("mount", l);
    };
    watch(
      f,
      () => {
        a.shadow || setTimeout(() => {
          n("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const X = computed(() => (l) => P(v.value(l), o.value(l)).map((S) => ({
      ...S,
      days: S.days.map((x) => (x.marker = V(x), x.classData = ie(x), x))
    })));
    function I(l) {
      var S;
      l || l === 0 ? (S = H.value[l]) == null || S.triggerTransition(v.value(l), o.value(l)) : H.value.forEach((x, J) => x.triggerTransition(v.value(J), o.value(J)));
    }
    function m() {
      n("update-flow-step");
    }
    const U = (l, S = false) => {
      L(l, S), a.spaceConfirm && n("select-date");
    };
    return t({
      clearHoverDate: oe,
      presetDate: Y,
      selectCurrentDate: z,
      toggleMonthPicker: (l, S, x = 0) => {
        var J;
        (J = _.value[x]) == null || J.toggleMonthPicker(l, S);
      },
      toggleYearPicker: (l, S, x = 0) => {
        var J;
        (J = _.value[x]) == null || J.toggleYearPicker(l, S);
      },
      toggleTimePicker: (l, S, x) => {
        var J;
        (J = te.value) == null || J.toggleTimePicker(l, S, x);
      },
      handleArrow: D,
      updateMonthYear: N,
      getSidebarProps: () => ({
        modelValue: O,
        month: v,
        year: o,
        time: B,
        updateTime: F,
        updateMonthYear: N,
        selectDate: L,
        presetDate: Y
      }),
      changeMonth: (l) => {
        var S;
        (S = _.value[0]) == null || S.handleMonthYearChange(l, true);
      },
      changeYear: (l) => {
        N(0, { month: v.value(0), year: o.value(0) + (l ? 1 : -1), fromNav: true });
      },
      selectWeekDate: (l) => {
        if (!a.range) {
          const S = O.value ? O.value : T, x = l ? startOfWeek(S, { weekStartsOn: 1 }) : endOfWeek(S, { weekStartsOn: 1 });
          L({
            value: x,
            current: getMonth(S) === v.value(0),
            text: "",
            classData: {}
          });
        }
      }
    }), (l, S) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(ua, {
        "multi-calendars": unref(re).count,
        collapse: l.collapse
      }, {
        default: withCtx(({ instance: x, index: J }) => [
          l.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Cr, mergeProps({
            key: 0,
            ref: (ae) => {
              ae && (_.value[J] = ae);
            },
            months: unref(bn)(l.formatLocale, l.locale, l.monthNameFormat),
            years: unref(Ha)(l.yearRange, l.locale, l.reverseYears),
            month: unref(v)(x),
            year: unref(o)(x),
            instance: x
          }, l.$props, {
            onMount: S[0] || (S[0] = (ae) => p(unref(Mt).header)),
            onResetFlow: S[1] || (S[1] = (ae) => l.$emit("reset-flow")),
            onUpdateMonthYear: (ae) => unref(N)(x, ae),
            onOverlayClosed: S[2] || (S[2] = (ae) => l.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(c), (ae, g) => ({
              name: ae,
              fn: withCtx(($) => [
                renderSlot(l.$slots, ae, normalizeProps(guardReactiveProps($)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Vr, mergeProps({
            ref: (ae) => {
              ae && (H.value[J] = ae);
            },
            "mapped-dates": X.value(x),
            month: unref(v)(x),
            year: unref(o)(x),
            instance: x
          }, l.$props, {
            onSelectDate: (ae) => unref(L)(ae, x !== 1),
            onHandleSpace: (ae) => U(ae, x !== 1),
            onSetHoverDate: S[3] || (S[3] = (ae) => unref(h2)(ae)),
            onHandleScroll: (ae) => unref(W)(ae, x),
            onHandleSwipe: (ae) => unref(C)(ae, x),
            onMount: S[4] || (S[4] = (ae) => p(unref(Mt).calendar)),
            onResetFlow: S[5] || (S[5] = (ae) => l.$emit("reset-flow")),
            onTooltipOpen: S[6] || (S[6] = (ae) => l.$emit("tooltip-open", ae)),
            onTooltipClose: S[7] || (S[7] = (ae) => l.$emit("tooltip-close", ae))
          }), createSlots({ _: 2 }, [
            renderList(unref(E), (ae, g) => ({
              name: ae,
              fn: withCtx(($) => [
                renderSlot(l.$slots, ae, normalizeProps(guardReactiveProps({ ...$ })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      l.enableTimePicker ? (openBlock(), createElementBlock("div", Hr, [
        l.$slots["time-picker"] ? renderSlot(l.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(B), updateTime: unref(F) }))) : (openBlock(), createBlock(In, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: te
        }, l.$props, {
          hours: unref(B).hours,
          minutes: unref(B).minutes,
          seconds: unref(B).seconds,
          "internal-model-value": l.internalModelValue,
          "disabled-times-config": unref(y),
          "validate-time": unref(b),
          onMount: S[8] || (S[8] = (x) => p(unref(Mt).timePicker)),
          "onUpdate:hours": S[9] || (S[9] = (x) => unref(F)(x)),
          "onUpdate:minutes": S[10] || (S[10] = (x) => unref(F)(x, false)),
          "onUpdate:seconds": S[11] || (S[11] = (x) => unref(F)(x, false, true)),
          onResetFlow: S[12] || (S[12] = (x) => l.$emit("reset-flow")),
          onOverlayClosed: S[13] || (S[13] = (x) => l.$emit("time-picker-close")),
          onOverlayOpened: S[14] || (S[14] = (x) => l.$emit("time-picker-open", x)),
          onAmPmChange: S[15] || (S[15] = (x) => l.$emit("am-pm-change", x))
        }), createSlots({ _: 2 }, [
          renderList(unref(A), (x, J) => ({
            name: x,
            fn: withCtx((ae) => [
              renderSlot(l.$slots, x, normalizeProps(guardReactiveProps(ae)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Ur = (e, t) => {
  const r = ref(), {
    defaultedMultiCalendars: n,
    defaultedConfig: a,
    defaultedHighlight: f,
    defaultedRange: v,
    propDates: o,
    defaultedFilters: O,
    defaultedMultiDates: B
  } = Re(e), { modelValue: y, year: T, month: b, calendars: P } = Kt(e, t), { isDisabled: V } = gt(e), { selectYear: D, groupedYears: W, showYearPicker: C, isDisabled: L, toggleYearPicker: N, handleYearSelect: Y, handleYear: z } = Yn({
    modelValue: y,
    multiCalendars: n,
    highlight: f,
    calendars: P,
    propDates: o,
    month: b,
    year: T,
    filters: O,
    props: e,
    emit: t
  }), F = (A, p) => [A, p].map((X) => format(X, "MMMM", { locale: e.formatLocale })).join("-"), Z = computed(() => (A) => y.value ? Array.isArray(y.value) ? y.value.some((p) => isSameQuarter(A, p)) : isSameQuarter(y.value, A) : false), h2 = (A) => {
    if (v.value.enabled) {
      if (Array.isArray(y.value)) {
        const p = be(A, y.value[0]) || be(A, y.value[1]);
        return ra(y.value, r.value, A) && !p;
      }
      return false;
    }
    return false;
  }, ie = (A, p) => A.quarter === getQuarter(p) && A.year === getYear(p), oe = (A) => typeof f.value == "function" ? f.value({ quarter: getQuarter(A), year: getYear(A) }) : !!f.value.quarters.find((p) => ie(p, A)), re = computed(() => (A) => {
    const p = set(/* @__PURE__ */ new Date(), { year: T.value(A) });
    return eachQuarterOfInterval({
      start: startOfYear(p),
      end: endOfYear(p)
    }).map((X) => {
      const I = startOfQuarter(X), m = endOfQuarter(X), U = V(X), ne = h2(I), u = oe(I);
      return {
        text: F(I, m),
        value: I,
        active: Z.value(I),
        highlighted: u,
        disabled: U,
        isBetween: ne
      };
    });
  }), _ = (A) => {
    ja(A, y, B.value.limit), t("auto-apply", true);
  }, H = (A) => {
    y.value = Ga(y, A, t), ia(y.value, t, e.autoApply, e.modelAuto);
  }, te = (A) => {
    y.value = A, t("auto-apply");
  };
  return {
    defaultedConfig: a,
    defaultedMultiCalendars: n,
    groupedYears: W,
    year: T,
    isDisabled: L,
    quarters: re,
    showYearPicker: C,
    modelValue: y,
    setHoverDate: (A) => {
      r.value = A;
    },
    selectYear: D,
    selectQuarter: (A, p, X) => {
      if (!X)
        return P.value[p].month = getMonth(endOfQuarter(A)), B.value.enabled ? _(A) : v.value.enabled ? H(A) : te(A);
    },
    toggleYearPicker: N,
    handleYearSelect: Y,
    handleYear: z
  };
};
var Kr = { class: "dp--quarter-items" };
var jr = ["data-test", "disabled", "onClick", "onMouseover"];
var Gr = defineComponent({
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), v = Ge(f, "yearMode"), {
      defaultedMultiCalendars: o,
      defaultedConfig: O,
      groupedYears: B,
      year: y,
      isDisabled: T,
      quarters: b,
      modelValue: P,
      showYearPicker: V,
      setHoverDate: D,
      selectQuarter: W,
      toggleYearPicker: C,
      handleYearSelect: L,
      handleYear: N
    } = Ur(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: P,
      year: y,
      selectQuarter: W,
      handleYearSelect: L,
      handleYear: N
    }) }), (z, F) => (openBlock(), createBlock(ua, {
      "multi-calendars": unref(o).count,
      collapse: z.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: Z }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(O).modeHeight}px` })
        }, [
          z.$slots["top-extra"] ? renderSlot(z.$slots, "top-extra", {
            key: 0,
            value: z.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(_n, mergeProps(z.$props, {
              items: unref(B)(Z),
              instance: Z,
              "show-year-picker": unref(V)[Z],
              year: unref(y)(Z),
              "is-disabled": (h2) => unref(T)(Z, h2),
              onHandleYear: (h2) => unref(N)(Z, h2),
              onYearSelect: (h2) => unref(L)(h2, Z),
              onToggleYearPicker: (h2) => unref(C)(Z, h2 == null ? void 0 : h2.flow, h2 == null ? void 0 : h2.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(v), (h2, ie) => ({
                name: h2,
                fn: withCtx((oe) => [
                  renderSlot(z.$slots, h2, normalizeProps(guardReactiveProps(oe)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Kr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(b)(Z), (h2, ie) => (openBlock(), createElementBlock("div", { key: ie }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": h2.active,
                  "dp--qr-btn-between": h2.isBetween,
                  "dp--qr-btn-disabled": h2.disabled,
                  "dp--highlighted": h2.highlighted
                }]),
                "data-test": h2.value,
                disabled: h2.disabled,
                onClick: (oe) => unref(W)(h2.value, Z, h2.disabled),
                onMouseover: (oe) => unref(D)(h2.value)
              }, [
                z.$slots.quarter ? renderSlot(z.$slots, "quarter", {
                  key: 0,
                  value: h2.value,
                  text: h2.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(h2.text), 1)
                ], 64))
              ], 42, jr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Qr = ["id", "aria-label"];
var qr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Xr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var Jr = [
  Xr
];
var Zr = {
  key: 0,
  class: "dp__sidebar_left"
};
var xr = ["data-test", "onClick", "onKeydown"];
var eo = {
  key: 2,
  class: "dp__sidebar_right"
};
var to = {
  key: 3,
  class: "dp__action_extra"
};
var un = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...sa,
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
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = ref(null), v = computed(() => {
      const { openOnTop: g, ...$ } = a;
      return {
        ...$,
        flowStep: h2.value,
        collapse: a.collapse,
        noOverlayFocus: a.noOverlayFocus,
        menuWrapRef: f.value
      };
    }), { setMenuFocused: o, setShiftKey: O, control: B } = Cn(), y = useSlots(), { defaultedTextInput: T, defaultedInline: b, defaultedConfig: P } = Re(a), V = ref(null), D = ref(0), W = ref(null), C = ref(false), L = ref(null);
    onMounted(() => {
      if (!a.shadow) {
        C.value = true, N(), window.addEventListener("resize", N);
        const g = Ie(f);
        if (g && !T.value.enabled && !b.value.enabled && (o(true), te()), g) {
          const $ = (ge) => {
            P.value.allowPreventDefault && ge.preventDefault(), ft(ge, P.value, true);
          };
          g.addEventListener("pointerdown", $), g.addEventListener("mousedown", $);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", N);
    });
    const N = () => {
      const g = Ie(W);
      g && (D.value = g.getBoundingClientRect().width);
    }, { arrowRight: Y, arrowLeft: z, arrowDown: F, arrowUp: Z } = pt(), { flowStep: h2, updateFlowStep: ie, childMount: oe, resetFlow: re } = zl(a, n, L), _ = computed(() => a.monthPicker ? rr : a.yearPicker ? sr : a.timePicker ? $r : a.quarterPicker ? Gr : zr), H = computed(() => {
      var ge;
      if (P.value.arrowLeft)
        return P.value.arrowLeft;
      const g = (ge = f.value) == null ? void 0 : ge.getBoundingClientRect(), $ = a.getInputRect();
      return $.width < D.value && $.left <= ((g == null ? void 0 : g.left) ?? 0) ? `${$.width / 2}px` : "50%";
    }), te = () => {
      const g = Ie(f);
      g && g.focus({ preventScroll: true });
    }, E = computed(() => {
      var g;
      return ((g = L.value) == null ? void 0 : g.getSidebarProps()) || {};
    }), c = () => {
      a.openOnTop && n("recalculate-position");
    }, A = Ge(y, "action"), p = computed(() => a.monthPicker || a.yearPicker ? Ge(y, "monthYear") : a.timePicker ? Ge(y, "timePicker") : Ge(y, "shared")), X = computed(() => a.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), I = computed(() => ({
      dp__menu_disabled: a.disabled,
      dp__menu_readonly: a.readonly,
      "dp-menu-loading": a.loading
    })), m = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !b.value.enabled,
        dp__relative: b.value.enabled,
        [a.menuClassName]: !!a.menuClassName
      })
    ), U = (g) => {
      ft(g, P.value, true);
    }, ne = () => {
      a.escClose && n("close-picker");
    }, u = (g) => {
      if (a.arrowNavigation) {
        if (g === "up")
          return Z();
        if (g === "down")
          return F();
        if (g === "left")
          return z();
        if (g === "right")
          return Y();
      } else
        g === "left" || g === "up" ? le("handleArrow", "left", 0, g === "up") : le("handleArrow", "right", 0, g === "down");
    }, k = (g) => {
      O(g.shiftKey), !a.disableMonthYearSelect && g.code === "Tab" && g.target.classList.contains("dp__menu") && B.value.shiftKeyInMenu && (g.preventDefault(), ft(g, P.value, true), n("close-picker"));
    }, R = () => {
      te(), n("time-picker-close");
    }, de = (g) => {
      var $, ge, me;
      ($ = L.value) == null || $.toggleTimePicker(false, false), (ge = L.value) == null || ge.toggleMonthPicker(false, false, g), (me = L.value) == null || me.toggleYearPicker(false, false, g);
    }, d = (g, $ = 0) => {
      var ge, me, Ee;
      return g === "month" ? (ge = L.value) == null ? void 0 : ge.toggleMonthPicker(false, true, $) : g === "year" ? (me = L.value) == null ? void 0 : me.toggleYearPicker(false, true, $) : g === "time" ? (Ee = L.value) == null ? void 0 : Ee.toggleTimePicker(true, false) : de($);
    }, le = (g, ...$) => {
      var ge, me;
      (ge = L.value) != null && ge[g] && ((me = L.value) == null || me[g](...$));
    }, l = () => {
      le("selectCurrentDate");
    }, S = (g, $) => {
      le("presetDate", g, $);
    }, x = () => {
      le("clearHoverDate");
    }, J = (g, $) => {
      le("updateMonthYear", g, $);
    }, ae = (g) => {
      if (k(g), g.key === "Home" || g.key === "End")
        return le("selectWeekDate", g.key === "Home");
      if (g.key === "PageUp" || g.key === "PageDown")
        return g.shiftKey ? le("changeYear", g.key === "PageUp") : le("changeMonth", g.key === "PageUp");
    };
    return t({
      updateMonthYear: J,
      switchView: d
    }), (g, $) => {
      var ge, me, Ee;
      return openBlock(), createElementBlock("div", {
        id: g.uid ? `dp-menu-${g.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: f,
        tabindex: "0",
        role: "dialog",
        "aria-label": (ge = g.ariaLabels) == null ? void 0 : ge.menu,
        class: normalizeClass(m.value),
        style: normalizeStyle({ "--dp-arrow-left": H.value }),
        onMouseleave: x,
        onClick: U,
        onKeydown: [
          withKeys(ne, ["esc"]),
          $[18] || ($[18] = withKeys(withModifiers((ue) => u("left"), ["prevent"]), ["left"])),
          $[19] || ($[19] = withKeys(withModifiers((ue) => u("up"), ["prevent"]), ["up"])),
          $[20] || ($[20] = withKeys(withModifiers((ue) => u("down"), ["prevent"]), ["down"])),
          $[21] || ($[21] = withKeys(withModifiers((ue) => u("right"), ["prevent"]), ["right"])),
          ae
        ]
      }, [
        (g.disabled || g.readonly) && unref(b).enabled || g.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(I.value)
        }, [
          g.loading ? (openBlock(), createElementBlock("div", qr, Jr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        !unref(b).enabled && !g.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(X.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: W,
          class: normalizeClass({
            dp__menu_content_wrapper: ((me = g.presetDates) == null ? void 0 : me.length) || !!g.$slots["left-sidebar"] || !!g.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((Ee = g.presetDates) == null ? void 0 : Ee.length) || !!g.$slots["left-sidebar"] || !!g.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${D.value}px` })
        }, [
          g.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Zr, [
            renderSlot(g.$slots, "left-sidebar", normalizeProps(guardReactiveProps(E.value)))
          ])) : createCommentVNode("", true),
          g.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(g.presetDates, (ue, Te) => (openBlock(), createElementBlock(Fragment, { key: Te }, [
              ue.slot ? renderSlot(g.$slots, ue.slot, {
                key: 0,
                presetDate: S,
                label: ue.label,
                value: ue.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(ue.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": ue.testId ?? void 0,
                onClick: withModifiers((Ue) => S(ue.value, ue.noTz), ["prevent"]),
                onKeydown: [
                  withKeys(withModifiers((Ue) => S(ue.value, ue.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((Ue) => S(ue.value, ue.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(ue.label), 47, xr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: V,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: L
            }, v.value, {
              "flow-step": unref(h2),
              onMount: unref(oe),
              onUpdateFlowStep: unref(ie),
              onResetFlow: unref(re),
              onFocusMenu: te,
              onSelectDate: $[0] || ($[0] = (ue) => g.$emit("select-date")),
              onDateUpdate: $[1] || ($[1] = (ue) => g.$emit("date-update", ue)),
              onTooltipOpen: $[2] || ($[2] = (ue) => g.$emit("tooltip-open", ue)),
              onTooltipClose: $[3] || ($[3] = (ue) => g.$emit("tooltip-close", ue)),
              onAutoApply: $[4] || ($[4] = (ue) => g.$emit("auto-apply", ue)),
              onRangeStart: $[5] || ($[5] = (ue) => g.$emit("range-start", ue)),
              onRangeEnd: $[6] || ($[6] = (ue) => g.$emit("range-end", ue)),
              onInvalidFixedRange: $[7] || ($[7] = (ue) => g.$emit("invalid-fixed-range", ue)),
              onTimeUpdate: $[8] || ($[8] = (ue) => g.$emit("time-update")),
              onAmPmChange: $[9] || ($[9] = (ue) => g.$emit("am-pm-change", ue)),
              onTimePickerOpen: $[10] || ($[10] = (ue) => g.$emit("time-picker-open", ue)),
              onTimePickerClose: R,
              onRecalculatePosition: c,
              onUpdateMonthYear: $[11] || ($[11] = (ue) => g.$emit("update-month-year", ue)),
              onAutoApplyInvalid: $[12] || ($[12] = (ue) => g.$emit("auto-apply-invalid", ue)),
              onInvalidDate: $[13] || ($[13] = (ue) => g.$emit("invalid-date", ue)),
              "onUpdate:internalModelValue": $[14] || ($[14] = (ue) => g.$emit("update:internal-model-value", ue))
            }), createSlots({ _: 2 }, [
              renderList(p.value, (ue, Te) => ({
                name: ue,
                fn: withCtx((Ue) => [
                  renderSlot(g.$slots, ue, normalizeProps(guardReactiveProps({ ...Ue })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          g.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", eo, [
            renderSlot(g.$slots, "right-sidebar", normalizeProps(guardReactiveProps(E.value)))
          ])) : createCommentVNode("", true),
          g.$slots["action-extra"] ? (openBlock(), createElementBlock("div", to, [
            g.$slots["action-extra"] ? renderSlot(g.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: l
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !g.autoApply || unref(P).keepActionRow ? (openBlock(), createBlock(Xl, mergeProps({
          key: 2,
          "menu-mount": C.value
        }, v.value, {
          "calendar-width": D.value,
          onClosePicker: $[15] || ($[15] = (ue) => g.$emit("close-picker")),
          onSelectDate: $[16] || ($[16] = (ue) => g.$emit("select-date")),
          onInvalidSelect: $[17] || ($[17] = (ue) => g.$emit("invalid-select")),
          onSelectNow: l
        }), createSlots({ _: 2 }, [
          renderList(unref(A), (ue, Te) => ({
            name: ue,
            fn: withCtx((Ue) => [
              renderSlot(g.$slots, ue, normalizeProps(guardReactiveProps({ ...Ue })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Qr);
    };
  }
});
var ao = typeof window < "u" ? window : void 0;
var Ca = () => {
};
var no = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var lo = (e, t, r, n) => {
  if (!e)
    return Ca;
  let a = Ca;
  const f = watch(
    () => unref(e),
    (o) => {
      a(), o && (o.addEventListener(t, r, n), a = () => {
        o.removeEventListener(t, r, n), a = Ca;
      });
    },
    { immediate: true, flush: "post" }
  ), v = () => {
    f(), a();
  };
  return no(v), v;
};
var ro = (e, t, r, n = {}) => {
  const { window: a = ao, event: f = "pointerdown" } = n;
  return a ? lo(a, f, (o) => {
    const O = Ie(e), B = Ie(t);
    !O || !B || O === o.target || o.composedPath().includes(O) || o.composedPath().includes(B) || r(o);
  }, { passive: true }) : void 0;
};
var oo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...sa
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), v = ref(false), o = toRef(a, "modelValue"), O = toRef(a, "timezone"), B = ref(null), y = ref(null), T = ref(null), b = ref(false), P = ref(null), V = ref(false), D = ref(false), W = ref(false), { setMenuFocused: C, setShiftKey: L } = Cn(), { clearArrowNav: N } = pt(), { validateDate: Y, isValidTime: z } = gt(a), {
      defaultedTransitions: F,
      defaultedTextInput: Z,
      defaultedInline: h2,
      defaultedConfig: ie,
      defaultedRange: oe,
      defaultedMultiDates: re
    } = Re(a), { menuTransition: _, showTransition: H } = Ut(F);
    onMounted(() => {
      u(a.modelValue), nextTick().then(() => {
        if (!h2.value.enabled) {
          const s = I(P.value);
          s == null || s.addEventListener("scroll", ae), window == null || window.addEventListener("resize", g);
        }
      }), h2.value.enabled && (v.value = true), window == null || window.addEventListener("keyup", $), window == null || window.addEventListener("keydown", ge);
    }), onUnmounted(() => {
      if (!h2.value.enabled) {
        const s = I(P.value);
        s == null || s.removeEventListener("scroll", ae), window == null || window.removeEventListener("resize", g);
      }
      window == null || window.removeEventListener("keyup", $), window == null || window.removeEventListener("keydown", ge);
    });
    const te = Ge(f, "all", a.presetDates), E = Ge(f, "input");
    watch(
      [o, O],
      () => {
        u(o.value);
      },
      { deep: true }
    );
    const { openOnTop: c, menuStyle: A, xCorrect: p, setMenuPosition: X, getScrollableParent: I, shadowRender: m } = Ll({
      menuRef: B,
      menuRefInner: y,
      inputRef: T,
      pickerWrapperRef: P,
      inline: h2,
      emit: n,
      props: a,
      slots: f
    }), {
      inputValue: U,
      internalModelValue: ne,
      parseExternalModelValue: u,
      emitModelValue: k,
      formatInputValue: R,
      checkBeforeEmit: de
    } = El(n, a, b), d = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: a.dark,
        dp__theme_light: !a.dark,
        dp__flex_display: h2.value.enabled,
        "dp--flex-display-collapsed": W.value,
        dp__flex_display_with_input: h2.value.input
      })
    ), le = computed(() => a.dark ? "dp__theme_dark" : "dp__theme_light"), l = computed(() => a.teleport ? {
      to: typeof a.teleport == "boolean" ? "body" : a.teleport,
      disabled: !a.teleport || h2.value.enabled
    } : {}), S = computed(() => ({ class: "dp__outer_menu_wrap" })), x = computed(() => h2.value.enabled && (a.timePicker || a.monthPicker || a.yearPicker || a.quarterPicker)), J = () => {
      var s, w;
      return (w = (s = T.value) == null ? void 0 : s.$el) == null ? void 0 : w.getBoundingClientRect();
    }, ae = () => {
      v.value && (ie.value.closeOnScroll ? Ke() : X());
    }, g = () => {
      var w;
      v.value && X();
      const s = (w = y.value) == null ? void 0 : w.$el.getBoundingClientRect().width;
      W.value = document.body.offsetWidth <= s;
    }, $ = (s) => {
      s.key === "Tab" && !h2.value.enabled && !a.teleport && ie.value.tabOutClosesMenu && (P.value.contains(document.activeElement) || Ke()), D.value = s.shiftKey;
    }, ge = (s) => {
      D.value = s.shiftKey;
    }, me = () => {
      !a.disabled && !a.readonly && (m(un, a), X(false), v.value = true, v.value && n("open"), v.value || Bt(), u(a.modelValue));
    }, Ee = () => {
      var s;
      U.value = "", Bt(), (s = T.value) == null || s.setParsedDate(null), n("update:model-value", null), n("update:model-timezone-value", null), n("cleared"), ie.value.closeOnClearValue && Ke();
    }, ue = () => {
      const s = ne.value;
      return !s || !Array.isArray(s) && Y(s) ? true : Array.isArray(s) ? re.value.enabled || s.length === 2 && Y(s[0]) && Y(s[1]) ? true : oe.value.partialRange && !a.timePicker ? Y(s[0]) : false : false;
    }, Te = () => {
      de() && ue() ? (k(), Ke()) : n("invalid-select", ne.value);
    }, Ue = (s) => {
      Gt(), k(), ie.value.closeOnAutoApply && !s && Ke();
    }, Gt = () => {
      T.value && Z.value.enabled && T.value.setParsedDate(ne.value);
    }, da = (s = false) => {
      a.autoApply && z(ne.value) && ue() && (oe.value.enabled && Array.isArray(ne.value) ? (oe.value.partialRange || ne.value.length === 2) && Ue(s) : Ue(s));
    }, Bt = () => {
      Z.value.enabled || (ne.value = null);
    }, Ke = () => {
      h2.value.enabled || (v.value && (v.value = false, p.value = false, C(false), L(false), N(), n("closed"), U.value && u(o.value)), Bt(), n("blur"));
    }, Yt = (s, w, G = false) => {
      if (!s) {
        ne.value = null;
        return;
      }
      const ve = Array.isArray(s) ? !s.some((je) => !Y(je)) : Y(s), De = z(s);
      ve && De && (ne.value = s, w && (V.value = G, Te(), n("text-submit")));
    }, ca = () => {
      a.autoApply && z(ne.value) && k(), Gt();
    }, Qt = () => v.value ? Ke() : me(), fa = (s) => {
      ne.value = s;
    }, va = () => {
      Z.value.enabled && (b.value = true, R()), n("focus");
    }, ma = () => {
      if (Z.value.enabled && (b.value = false, u(a.modelValue), V.value)) {
        const s = dl(P.value, D.value);
        s == null || s.focus();
      }
      n("blur");
    }, pa = (s) => {
      y.value && y.value.updateMonthYear(0, {
        month: tn(s.month),
        year: tn(s.year)
      });
    }, ga = (s) => {
      u(s ?? a.modelValue);
    }, ya = (s, w) => {
      var G;
      (G = y.value) == null || G.switchView(s, w);
    }, Qa = (s) => ie.value.onClickOutside ? ie.value.onClickOutside(s) : Ke();
    return ro(B, T, () => Qa(ue)), t({
      closeMenu: Ke,
      selectDate: Te,
      clearValue: Ee,
      openMenu: me,
      onScroll: ae,
      formatInputValue: R,
      // exposed for testing purposes
      updateInternalModelValue: fa,
      // modify internal modelValue
      setMonthYear: pa,
      parseModel: ga,
      switchView: ya,
      toggleMenu: Qt
    }), (s, w) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: P,
      class: normalizeClass(d.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(Gl, mergeProps({
        ref_key: "inputRef",
        ref: T,
        "input-value": unref(U),
        "onUpdate:inputValue": w[0] || (w[0] = (G) => isRef(U) ? U.value = G : null),
        "is-menu-open": v.value
      }, s.$props, {
        onClear: Ee,
        onOpen: me,
        onSetInputDate: Yt,
        onSetEmptyDate: unref(k),
        onSelectDate: Te,
        onToggle: Qt,
        onClose: Ke,
        onFocus: va,
        onBlur: ma,
        onRealBlur: w[1] || (w[1] = (G) => b.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(E), (G, ve) => ({
          name: G,
          fn: withCtx((De) => [
            renderSlot(s.$slots, G, normalizeProps(guardReactiveProps(De)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(s.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(l.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(_)(unref(c)),
            css: unref(H) && !unref(h2).enabled
          }, {
            default: withCtx(() => [
              v.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: B
              }, S.value, {
                class: { "dp--menu-wrapper": !unref(h2).enabled },
                style: unref(h2).enabled ? void 0 : unref(A)
              }), [
                createVNode(un, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: y
                }, s.$props, {
                  "internal-model-value": unref(ne),
                  "onUpdate:internalModelValue": w[2] || (w[2] = (G) => isRef(ne) ? ne.value = G : null),
                  class: { [le.value]: true, "dp--menu-wrapper": s.teleport },
                  "open-on-top": unref(c),
                  "no-overlay-focus": x.value,
                  collapse: W.value,
                  "get-input-rect": J,
                  onClosePicker: Ke,
                  onSelectDate: Te,
                  onAutoApply: da,
                  onTimeUpdate: ca,
                  onFlowStep: w[3] || (w[3] = (G) => s.$emit("flow-step", G)),
                  onUpdateMonthYear: w[4] || (w[4] = (G) => s.$emit("update-month-year", G)),
                  onInvalidSelect: w[5] || (w[5] = (G) => s.$emit("invalid-select", unref(ne))),
                  onAutoApplyInvalid: w[6] || (w[6] = (G) => s.$emit("invalid-select", G)),
                  onInvalidFixedRange: w[7] || (w[7] = (G) => s.$emit("invalid-fixed-range", G)),
                  onRecalculatePosition: unref(X),
                  onTooltipOpen: w[8] || (w[8] = (G) => s.$emit("tooltip-open", G)),
                  onTooltipClose: w[9] || (w[9] = (G) => s.$emit("tooltip-close", G)),
                  onTimePickerOpen: w[10] || (w[10] = (G) => s.$emit("time-picker-open", G)),
                  onTimePickerClose: w[11] || (w[11] = (G) => s.$emit("time-picker-close", G)),
                  onAmPmChange: w[12] || (w[12] = (G) => s.$emit("am-pm-change", G)),
                  onRangeStart: w[13] || (w[13] = (G) => s.$emit("range-start", G)),
                  onRangeEnd: w[14] || (w[14] = (G) => s.$emit("range-end", G)),
                  onDateUpdate: w[15] || (w[15] = (G) => s.$emit("date-update", G)),
                  onInvalidDate: w[16] || (w[16] = (G) => s.$emit("invalid-date", G))
                }), createSlots({ _: 2 }, [
                  renderList(unref(te), (G, ve) => ({
                    name: G,
                    fn: withCtx((De) => [
                      renderSlot(s.$slots, G, normalizeProps(guardReactiveProps({ ...De })))
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
var En = (() => {
  const e = oo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var so = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: En
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(so).forEach(([e, t]) => {
  e !== "default" && (En[e] = t);
});
export {
  En as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
