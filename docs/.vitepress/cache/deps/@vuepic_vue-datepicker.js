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
} from "./chunk-LPBJEE5X.js";
import {
  __publicField
} from "./chunk-EQCVQC35.js";

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constants.js
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
var constructFromSymbol = Symbol.for("constructDateFrom");

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addDays.js
function addDays(date, amount, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  if (isNaN(amount)) return constructFrom((options == null ? void 0 : options.in) || date, NaN);
  if (!amount) return _date;
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js
function addMonths(date, amount, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  if (isNaN(amount)) return constructFrom((options == null ? void 0 : options.in) || date, NaN);
  if (!amount) {
    return _date;
  }
  const dayOfMonth = _date.getDate();
  const endOfDesiredMonth = constructFrom((options == null ? void 0 : options.in) || date, _date.getTime());
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/add.js
function add(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const _date = toDate(date, options == null ? void 0 : options.in);
  const dateWithMonths = months || years ? addMonths(_date, months + years * 12) : _date;
  const dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1e3;
  return constructFrom((options == null ? void 0 : options.in) || date, +dateWithDays + msToAdd);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMilliseconds.js
function addMilliseconds(date, amount, options) {
  return constructFrom((options == null ? void 0 : options.in) || date, +toDate(date) + amount);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addHours.js
function addHours(date, amount, options) {
  return addMilliseconds(date, amount * millisecondsInHour, options);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
function startOfWeek(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date, options == null ? void 0 : options.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
function getISOWeekYear(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
function startOfDay(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options == null ? void 0 : options.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom((options == null ? void 0 : options.in) || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addQuarters.js
function addQuarters(date, amount, options) {
  return addMonths(date, amount * 3, options);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addYears.js
function addYears(date, amount, options) {
  return addMonths(date, amount * 12, options);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/compareAsc.js
function compareAsc(dateLeft, dateRight) {
  const diff = +toDate(dateLeft) - +toDate(dateRight);
  if (diff < 0) return -1;
  else if (diff > 0) return 1;
  return diff;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
function isValid(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getQuarter.js
function getQuarter(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarYears.js
function differenceInCalendarYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options == null ? void 0 : options.in,
    laterDate,
    earlierDate
  );
  return laterDate_.getFullYear() - earlierDate_.getFullYear();
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInYears.js
function differenceInYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options == null ? void 0 : options.in,
    laterDate,
    earlierDate
  );
  const sign = compareAsc(laterDate_, earlierDate_);
  const diff = Math.abs(differenceInCalendarYears(laterDate_, earlierDate_));
  laterDate_.setFullYear(1584);
  earlierDate_.setFullYear(1584);
  const partial = compareAsc(laterDate_, earlierDate_) === -sign;
  const result = sign * (diff - +partial);
  return result === 0 ? 0 : result;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeInterval.js
function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachDayOfInterval.js
function eachDayOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options == null ? void 0 : options.in, interval);
  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setDate(date.getDate() + step);
    date.setHours(0, 0, 0, 0);
  }
  return reversed ? dates.reverse() : dates;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfQuarter.js
function startOfQuarter(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3;
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachQuarterOfInterval.js
function eachQuarterOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options == null ? void 0 : options.in, interval);
  let reversed = +start > +end;
  const endTime = reversed ? +startOfQuarter(start) : +startOfQuarter(end);
  let date = reversed ? startOfQuarter(end) : startOfQuarter(start);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date = addQuarters(date, step);
  }
  return reversed ? dates.reverse() : dates;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfMonth.js
function startOfMonth(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfYear.js
function endOfYear(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
function startOfYear(date, options) {
  const date_ = toDate(date, options == null ? void 0 : options.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfWeek.js
function endOfWeek(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date, options == null ? void 0 : options.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfQuarter.js
function endOfQuarter(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3 + 3;
  _date.setMonth(month, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatLong.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/localize.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
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
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/match.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDayOfYear.js
function getDayOfYear(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
function getISOWeek(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
function getWeekYear(date, options) {
  var _a2, _b, _c, _d;
  const _date = toDate(date, options == null ? void 0 : options.in);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const firstWeekOfNextYear = constructFrom((options == null ? void 0 : options.in) || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom((options == null ? void 0 : options.in) || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
function startOfWeekYear(date, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom((options == null ? void 0 : options.in) || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
function getWeek(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/formatters.js
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
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/protectedTokens.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
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
  const originalDate = toDate(date, options == null ? void 0 : options.in);
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDay.js
function getDay(date, options) {
  return toDate(date, options == null ? void 0 : options.in).getDay();
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDaysInMonth.js
function getDaysInMonth(date, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth2 = constructFrom(_date, 0);
  lastDayOfMonth2.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth2.setHours(0, 0, 0, 0);
  return lastDayOfMonth2.getDate();
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDefaultOptions.js
function getDefaultOptions2() {
  return Object.assign({}, getDefaultOptions());
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getHours.js
function getHours(date, options) {
  return toDate(date, options == null ? void 0 : options.in).getHours();
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISODay.js
function getISODay(date, options) {
  const day = toDate(date, options == null ? void 0 : options.in).getDay();
  return day === 0 ? 7 : day;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getMinutes.js
function getMinutes(date, options) {
  return toDate(date, options == null ? void 0 : options.in).getMinutes();
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getMonth.js
function getMonth(date, options) {
  return toDate(date, options == null ? void 0 : options.in).getMonth();
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getSeconds.js
function getSeconds(date) {
  return toDate(date).getSeconds();
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getYear.js
function getYear(date, options) {
  return toDate(date, options == null ? void 0 : options.in).getFullYear();
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isAfter.js
function isAfter(date, dateToCompare) {
  return +toDate(date) > +toDate(dateToCompare);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isBefore.js
function isBefore(date, dateToCompare) {
  return +toDate(date) < +toDate(dateToCompare);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isEqual.js
function isEqual(leftDate, rightDate) {
  return +toDate(leftDate) === +toDate(rightDate);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/transpose.js
function transpose(date, constructor) {
  const date_ = isConstructor(constructor) ? new constructor(0) : constructFrom(constructor, 0);
  date_.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  date_.setHours(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
  return date_;
}
function isConstructor(constructor) {
  var _a2;
  return typeof constructor === "function" && ((_a2 = constructor.prototype) == null ? void 0 : _a2.constructor) === constructor;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/Setter.js
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
var DateTimezoneSetter = class extends Setter {
  constructor(context, reference) {
    super();
    __publicField(this, "priority", TIMEZONE_UNIT_PRIORITY);
    __publicField(this, "subPriority", -1);
    this.context = context || ((date) => constructFrom(reference, date));
  }
  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return constructFrom(date, transpose(date, this.context));
  }
};

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/Parser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/EraParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/constants.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/utils.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/YearParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/QuarterParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/MonthParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setWeek.js
function setWeek(date, week, options) {
  const date_ = toDate(date, options == null ? void 0 : options.in);
  const diff = getWeek(date_, options) - week;
  date_.setDate(date_.getDate() - diff * 7);
  return toDate(date_, options == null ? void 0 : options.in);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setISOWeek.js
function setISOWeek(date, week, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const diff = getISOWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/DateParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setDay.js
function setDay(date, day, options) {
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const date_ = toDate(date, options == null ? void 0 : options.in);
  const currentDay = date_.getDay();
  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;
  const delta = 7 - weekStartsOn;
  const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(date_, diff, options);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/DayParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/LocalDayParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setISODay.js
function setISODay(date, day, options) {
  const date_ = toDate(date, options == null ? void 0 : options.in);
  const currentDay = getISODay(date_, options);
  const diff = day - currentDay;
  return addDays(date_, diff, options);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/ISODayParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/AMPMParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/MinuteParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/SecondParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse/_lib/parsers.js
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

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/parse.js
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dateStr, formatStr, referenceDate, options) {
  var _a2, _b, _c, _d, _e2, _f, _g, _h;
  const invalidDate = () => constructFrom((options == null ? void 0 : options.in) || referenceDate, NaN);
  const defaultOptions2 = getDefaultOptions2();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e2 = options == null ? void 0 : options.locale) == null ? void 0 : _e2.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (!formatStr)
    return dateStr ? invalidDate() : toDate(referenceDate, options == null ? void 0 : options.in);
  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  const setters = [new DateTimezoneSetter(options == null ? void 0 : options.in, referenceDate)];
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
        return invalidDate();
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
        return invalidDate();
      }
    }
  }
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return invalidDate();
  }
  const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index, array) => array.indexOf(priority) === index).map(
    (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
  ).map((setterArray) => setterArray[0]);
  let date = toDate(referenceDate, options == null ? void 0 : options.in);
  if (isNaN(+date)) return invalidDate();
  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return invalidDate();
    }
    const result = setter.set(date, flags, subFnOptions);
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
    } else {
      date = result;
    }
  }
  return date;
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameQuarter.js
function isSameQuarter(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options == null ? void 0 : options.in,
    laterDate,
    earlierDate
  );
  return +startOfQuarter(dateLeft_) === +startOfQuarter(dateRight_);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subDays.js
function subDays(date, amount, options) {
  return addDays(date, -amount, options);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setMonth.js
function setMonth(date, month, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  const year = _date.getFullYear();
  const day = _date.getDate();
  const midMonth = constructFrom((options == null ? void 0 : options.in) || date, 0);
  midMonth.setFullYear(year, month, 15);
  midMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(midMonth);
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/set.js
function set(date, values, options) {
  let _date = toDate(date, options == null ? void 0 : options.in);
  if (isNaN(+_date)) return constructFrom((options == null ? void 0 : options.in) || date, NaN);
  if (values.year != null) _date.setFullYear(values.year);
  if (values.month != null) _date = setMonth(_date, values.month);
  if (values.date != null) _date.setDate(values.date);
  if (values.hours != null) _date.setHours(values.hours);
  if (values.minutes != null) _date.setMinutes(values.minutes);
  if (values.seconds != null) _date.setSeconds(values.seconds);
  if (values.milliseconds != null) _date.setMilliseconds(values.milliseconds);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setHours.js
function setHours(date, hours, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  _date.setHours(hours);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setMilliseconds.js
function setMilliseconds(date, milliseconds, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  _date.setMilliseconds(milliseconds);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setMinutes.js
function setMinutes(date, minutes, options) {
  const date_ = toDate(date, options == null ? void 0 : options.in);
  date_.setMinutes(minutes);
  return date_;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setSeconds.js
function setSeconds(date, seconds, options) {
  const _date = toDate(date, options == null ? void 0 : options.in);
  _date.setSeconds(seconds);
  return _date;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setYear.js
function setYear(date, year, options) {
  const date_ = toDate(date, options == null ? void 0 : options.in);
  if (isNaN(+date_)) return constructFrom((options == null ? void 0 : options.in) || date, NaN);
  date_.setFullYear(year);
  return date_;
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subMonths.js
function subMonths(date, amount, options) {
  return addMonths(date, -amount, options);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/sub.js
function sub(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const withoutMonths = subMonths(date, months + years * 12, options);
  const withoutDays = subDays(withoutMonths, days + weeks * 7, options);
  const minutesToSub = minutes + hours * 60;
  const secondsToSub = seconds + minutesToSub * 60;
  const msToSub = secondsToSub * 1e3;
  return constructFrom((options == null ? void 0 : options.in) || date, +withoutDays - msToSub);
}

// node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subYears.js
function subYears(date, amount, options) {
  return addYears(date, -amount, options);
}

// node_modules/.pnpm/@vuepic+vue-datepicker@10.0.0_vue@3.5.12_typescript@5.6.3_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function zt() {
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
zt.compatConfig = {
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
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Wa.compatConfig = {
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
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Va.compatConfig = {
  MODE: 3
};
var xe = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var ja = (e, t, l) => {
  const a = Na(e, t, l);
  return a || W();
};
var vl = (e, t, l) => {
  const a = t.dateInTz ? xe(new Date(e), t.dateInTz) : W(e);
  return l ? Je(a, true) : a;
};
var Na = (e, t, l) => {
  if (!e) return null;
  const a = l ? Je(W(e), true) : W(e);
  return t ? t.exactMatch ? vl(e, t, l) : xe(a, t.timezone) : a;
};
var ml = (e, t) => {
  if (!e) return 0;
  const l = /* @__PURE__ */ new Date(), a = new Date(l.toLocaleString("en-US", { timeZone: "UTC" })), n = new Date(l.toLocaleString("en-US", { timeZone: e })), i = (t ?? n).getTimezoneOffset() / 60;
  return (+a - +n) / (1e3 * 60 * 60) - i;
};
var ot = ((e) => (e.month = "month", e.year = "year", e))(ot || {});
var st = ((e) => (e.top = "top", e.bottom = "bottom", e))(st || {});
var Pt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Pt || {});
var je = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(je || {});
var pl = ["timestamp", "date", "iso"];
var qe = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(qe || {});
var Ce = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Ce || {});
function ln(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function yl(e) {
  return (t) => format(xe(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var gl = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(yl(e));
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
      return a.map((c, h2) => {
        const f = format(xe(c, "UTC"), i, { locale: e });
        return {
          text: f.charAt(0).toUpperCase() + f.substring(1),
          value: h2
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return a.map((i, c) => {
    const h2 = n.format(i);
    return {
      text: h2.charAt(0).toUpperCase() + h2.substring(1),
      value: c
    };
  });
};
var hl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Le = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var bl = (e) => ({ type: "dot", ...e ?? {} });
var An = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ga = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ee = (e) => e;
var rn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var on = (e) => e === null;
var Tn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var kl = (e) => {
  const t = [], l = (a) => a.filter((n) => n);
  for (let a = 0; a < e.length; a += 3) {
    const n = [e[a], e[a + 1], e[a + 2]];
    t.push(l(n));
  }
  return t;
};
var Qt = (e, t, l) => {
  const a = l != null, n = t != null;
  if (!a && !n) return false;
  const i = +l, c = +t;
  return a && n ? +e > i || +e < c : a ? +e > i : n ? +e < c : false;
};
var Et = (e, t) => kl(e).map((l) => l.map((a) => {
  const { active: n, disabled: i, isBetween: c, highlighted: h2 } = t(a);
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
      "dp--highlighted": h2
    }
  };
}));
var kt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var wl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function Dl(e, t) {
  let l = [...document.querySelectorAll(wl())];
  l = l.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = l.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= l.length))
    return l[a + (t ? -1 : 1)];
}
var Ea = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Sn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Qa = (e) => format(e, "dd-MM-yyyy");
var $a = (e) => Array.isArray(e);
var ua = (e, t) => t.get(Qa(e));
var Ml = (e, t) => e ? t ? t instanceof Map ? !!ua(e, t) : t(W(e)) : false : true;
var Xe = (e, t, l = false, a) => {
  if (e.key === Ce.enter || e.key === Ce.space)
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
var $l = (e, t, l, a, n, i) => {
  const c = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return un(e, t, c, a, n, i);
  if (Array.isArray(t)) {
    let h2 = null;
    for (const f of t)
      if (h2 = un(e, f, c, a, n, i), h2)
        break;
    return h2;
  }
  return typeof t == "function" ? t(e) : null;
};
var W = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var Al = (e, t, l) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), i = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), h2 = e.getMinutes().toString().padStart(2, "0"), f = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${i}T${c}:${h2}:${f}.000Z`;
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
var Je = (e, t) => {
  const l = W(JSON.parse(JSON.stringify(e))), a = set(l, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(a) : a;
};
var wt = (e, t, l, a) => {
  let n = e ? W(e) : W();
  return (t || t === 0) && (n = setHours(n, +t)), (l || l === 0) && (n = setMinutes(n, +l)), (a || a === 0) && (n = setSeconds(n, +a)), setMilliseconds(n, 0);
};
var Be = (e, t) => !e || !t ? false : isBefore(Je(e), Je(t));
var Ae = (e, t) => !e || !t ? false : isEqual(Je(e), Je(t));
var Ne = (e, t) => !e || !t ? false : isAfter(Je(e), Je(t));
var da = (e, t, l) => e != null && e[0] && (e != null && e[1]) ? Ne(l, e[0]) && Be(l, e[1]) : e != null && e[0] && t ? Ne(l, e[0]) && Be(l, t) || Be(l, e[0]) && Ne(l, t) : false;
var ut = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Je(t);
};
var Aa = (e, t, l) => t && (l || l === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a) => a === t ? [a, l] : [a, isNaN(+e[a]) ? void 0 : +e[a]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var Rt = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Pn = (e, t) => {
  if (t) {
    const l = getYear(W(t));
    if (l > e) return 12;
    if (l === e) return getMonth(W(t));
  }
};
var Rn = (e, t) => {
  if (t) {
    const l = getYear(W(t));
    return l < e ? -1 : l === e ? getMonth(W(t)) : void 0;
  }
};
var Ft = (e) => {
  if (e) return getYear(W(e));
};
var Cn = (e, t) => {
  const l = Ne(e, t) ? t : e, a = Ne(t, e) ? t : e;
  return eachDayOfInterval({ start: l, end: a });
};
var Tl = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var mt = (e, t) => {
  const l = startOfWeek(e, { weekStartsOn: +t }), a = endOfWeek(e, { weekStartsOn: +t });
  return [l, a];
};
var On = (e, t) => {
  const l = {
    hours: getHours(W()),
    minutes: getMinutes(W()),
    seconds: t ? getSeconds(W()) : 0
  };
  return Object.assign(l, e);
};
var bt = (e, t, l) => [set(W(e), { date: 1 }), set(W(), { month: t, year: l, date: 1 })];
var pt = (e, t, l) => {
  let a = e ? W(e) : W();
  return (t || t === 0) && (a = setMonth(a, t)), l && (a = setYear(a, l)), a;
};
var _n = (e, t, l, a, n) => {
  if (!a || n && !t || !n && !l) return false;
  const i = n ? addMonths(e, 1) : subMonths(e, 1), c = [getMonth(i), getYear(i)];
  return n ? !Pl(...c, t) : !Sl(...c, l);
};
var Sl = (e, t, l) => Be(...bt(l, e, t)) || Ae(...bt(l, e, t));
var Pl = (e, t, l) => Ne(...bt(l, e, t)) || Ae(...bt(l, e, t));
var Bn = (e, t, l, a, n, i, c) => {
  if (typeof t == "function" && !c) return t(e);
  const h2 = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], i, h2)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], i, h2) : ""}` : format(e, i, h2);
};
var _t = (e) => {
  if (e) return null;
  throw new Error(Ga.prop("partial-range"));
};
var aa = (e, t) => {
  if (t) return e();
  throw new Error(Ga.prop("range"));
};
var Fa = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Rl = (e, t) => set(t ?? W(), {
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
var Sa = (e, t, l) => e ? Rl(e, t) : W(l ?? t);
var dn = (e, t, l, a, n) => {
  if (Array.isArray(a)) {
    const c = Sa(e, a[0], t), h2 = Sa(e, a[1], t);
    return Ta(a[0], c, l, !!t) && Ta(a[1], h2, l, !!t) && n;
  }
  const i = Sa(e, a, t);
  return Ta(a, i, l, !!t) && n;
};
var Pa = (e) => set(W(), Rt(e));
var Cl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(W(l)) === t).map((l) => getMonth(l)) : [];
var Ol = (e, t, l) => {
  if (e instanceof Map) {
    const a = Array.from(e.values()).filter((n) => getYear(W(n)) === t).map((n) => getMonth(n));
    return a.length ? a.includes(l) : true;
  }
  return true;
};
var Yn = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((a) => a.month === t && a.year === l);
var qa = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var In = (e) => format(e, "yyyy-MM-dd");
var Ut = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Nn = () => {
  const e = (a) => {
    Ut.menuFocused = a;
  }, t = (a) => {
    Ut.shiftKeyInMenu !== a && (Ut.shiftKeyInMenu = a);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Ut.shiftKeyInMenu, menuFocused: Ut.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Re = reactive({
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
var na = ref(false);
var Ca = ref(false);
var Oa = ref(false);
var _a = ref(false);
var Ve = ref(0);
var Ie = ref(0);
var Mt = () => {
  const e = computed(() => na.value ? [...Re.selectionGrid, Re.actionRow].filter((d) => d.length) : Ca.value ? [
    ...Re.timePicker[0],
    ...Re.timePicker[1],
    _a.value ? [] : [Ra.value],
    Re.actionRow
  ].filter((d) => d.length) : Oa.value ? [...Re.monthPicker, Re.actionRow] : [Re.monthYear, ...Re.calendar, Re.time, Re.actionRow].filter((d) => d.length)), t = (d) => {
    Ve.value = d ? Ve.value + 1 : Ve.value - 1;
    let R = null;
    e.value[Ie.value] && (R = e.value[Ie.value][Ve.value]), !R && e.value[Ie.value + (d ? 1 : -1)] ? (Ie.value = Ie.value + (d ? 1 : -1), Ve.value = d ? 0 : e.value[Ie.value].length - 1) : R || (Ve.value = d ? Ve.value - 1 : Ve.value + 1);
  }, l = (d) => {
    if (Ie.value === 0 && !d || Ie.value === e.value.length && d) return;
    Ie.value = d ? Ie.value + 1 : Ie.value - 1, e.value[Ie.value] ? e.value[Ie.value] && !e.value[Ie.value][Ve.value] && Ve.value !== 0 && (Ve.value = e.value[Ie.value].length - 1) : Ie.value = d ? Ie.value - 1 : Ie.value + 1;
  }, a = (d) => {
    let R = null;
    e.value[Ie.value] && (R = e.value[Ie.value][Ve.value]), R ? R.focus({ preventScroll: !na.value }) : Ve.value = d ? Ve.value - 1 : Ve.value + 1;
  }, n = () => {
    t(true), a(true);
  }, i = () => {
    t(false), a(false);
  }, c = () => {
    l(false), a(true);
  }, h2 = () => {
    l(true), a(true);
  }, f = (d, R) => {
    Re[R] = d;
  }, I = (d, R) => {
    Re[R] = d;
  }, v = () => {
    Ve.value = 0, Ie.value = 0;
  };
  return {
    buildMatrix: f,
    buildMultiLevelMatrix: I,
    setTimePickerBackRef: (d) => {
      Ra.value = d;
    },
    setSelectionGrid: (d) => {
      na.value = d, v(), d || (Re.selectionGrid = []);
    },
    setTimePicker: (d, R = false) => {
      Ca.value = d, _a.value = R, v(), d || (Re.timePicker[0] = [], Re.timePicker[1] = []);
    },
    setTimePickerElements: (d, R = 0) => {
      Re.timePicker[R] = d;
    },
    arrowRight: n,
    arrowLeft: i,
    arrowUp: c,
    arrowDown: h2,
    clearArrowNav: () => {
      Re.monthYear = [], Re.calendar = [], Re.time = [], Re.actionRow = [], Re.selectionGrid = [], Re.timePicker[0] = [], Re.timePicker[1] = [], na.value = false, Ca.value = false, _a.value = false, Oa.value = false, v(), Ra.value = null;
    },
    setMonthPicker: (d) => {
      Oa.value = d, v();
    },
    refSets: Re
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
var _l = (e) => ({
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
var Bl = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e) return { ...l, count: fn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, i = fn(n);
  return Object.assign(l, a, { count: i });
};
var Yl = (e, t, l) => e || (typeof l == "string" ? l : t);
var Il = (e) => typeof e == "boolean" ? e ? cn({}) : false : cn(e);
var Nl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: "open",
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var El = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Fl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Ll = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var zl = (e) => ({ ...{
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
  shadowDom: false,
  mobileBreakpoint: 600,
  setDateOnMenuClose: false
}, ...e ?? {} });
var Hl = (e) => {
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
var Ul = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Wl = (e) => {
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
var Vl = (e) => e ? typeof e == "string" ? {
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
var jl = (e, t) => e.length ? new Map(
  e.map((l) => {
    const a = ja(l.date, t);
    return [Qa(a), l];
  })
) : null;
var Kl = (e) => {
  var t;
  return {
    minDate: Na(e.minDate, e.timezone, e.isSpecific),
    maxDate: Na(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: $a(e.disabledDates) ? Ba(e.disabledDates, e.timezone, e.isSpecific) : e.disabledDates,
    allowedDates: $a(e.allowedDates) ? Ba(e.allowedDates, e.timezone, e.isSpecific) : null,
    highlight: typeof e.highlight == "object" && $a((t = e.highlight) == null ? void 0 : t.dates) ? Ba(e.highlight.dates, e.timezone) : e.highlight,
    markers: jl(e.markers, e.timezone)
  };
};
var Gl = (e) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: null } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Ql = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((l) => {
      const a = l, n = e[a], i = typeof e[a] == "string" ? { [n]: true } : Object.fromEntries(n.map((c) => [c, true]));
      return [l, i];
    })
  )
});
var _e = (e) => {
  const t = () => {
    const ne = e.enableSeconds ? ":ss" : "", x = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${x}${ne}` : `hh${x}${ne} aa`;
  }, l = () => {
    var ne;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((ne = U.value) == null ? void 0 : ne.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (ne) => On(ne, e.enableSeconds), n = () => F.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, i = computed(() => Bl(e.multiCalendars)), c = computed(() => n()), h2 = computed(() => _l(e.ariaLabels)), f = computed(() => El(e.filters)), I = computed(() => Il(e.transitions)), v = computed(() => Fl(e.actionRow)), C = computed(
    () => Yl(e.previewFormat, e.format, l())
  ), m = computed(() => Nl(e.textInput)), P = computed(() => Ll(e.inline)), H = computed(() => zl(e.config)), Y = computed(() => Hl(e.highlight)), U = computed(() => Ul(e.weekNumbers)), d = computed(() => Vl(e.timezone)), R = computed(() => Gl(e.multiDates)), _ = computed(
    () => Kl({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: Y.value,
      markers: e.markers,
      timezone: d.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), F = computed(() => Wl(e.range)), Q = computed(() => Ql(e.ui));
  return {
    defaultedTransitions: I,
    defaultedMultiCalendars: i,
    defaultedStartTime: c,
    defaultedAriaLabels: h2,
    defaultedFilters: f,
    defaultedActionRow: v,
    defaultedPreviewFormat: C,
    defaultedTextInput: m,
    defaultedInline: P,
    defaultedConfig: H,
    defaultedHighlight: Y,
    defaultedWeekNumbers: U,
    defaultedRange: F,
    propDates: _,
    defaultedTz: d,
    defaultedMultiDates: R,
    defaultedUI: Q,
    getDefaultPattern: l,
    getDefaultStartTime: n
  };
};
var ql = (e, t, l) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: i, defaultedTz: c, defaultedMultiDates: h2, getDefaultPattern: f } = _e(t), I = ref(""), v = toRef(t, "format"), C = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, k(true));
    },
    { deep: true }
  ), watch(i, (u, te) => {
    u.enabled !== te.enabled && (a.value = null);
  }), watch(v, () => {
    j();
  });
  const m = (u) => c.value.timezone && c.value.convertModel ? xe(u, c.value.timezone) : u, P = (u) => {
    if (c.value.timezone && c.value.convertModel) {
      const te = ml(c.value.timezone, u);
      return addHours(u, te);
    }
    return u;
  }, H = (u, te, ye = false) => Bn(
    u,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    te ?? f(),
    ye
  ), Y = (u) => u ? t.modelType ? g(u) : {
    hours: getHours(u),
    minutes: getMinutes(u),
    seconds: t.enableSeconds ? getSeconds(u) : 0
  } : null, U = (u) => t.modelType ? g(u) : { month: getMonth(u), year: getYear(u) }, d = (u) => Array.isArray(u) ? h2.value.enabled ? u.map((te) => R(te, setYear(W(), te))) : aa(
    () => [
      setYear(W(), u[0]),
      u[1] ? setYear(W(), u[1]) : _t(i.value.partialRange)
    ],
    i.value.enabled
  ) : setYear(W(), +u), R = (u, te) => (typeof u == "string" || typeof u == "number") && t.modelType ? $(u) : te, _ = (u) => Array.isArray(u) ? [
    R(
      u[0],
      wt(null, +u[0].hours, +u[0].minutes, u[0].seconds)
    ),
    R(
      u[1],
      wt(null, +u[1].hours, +u[1].minutes, u[1].seconds)
    )
  ] : R(u, wt(null, u.hours, u.minutes, u.seconds)), F = (u) => {
    const te = set(W(), { date: 1 });
    return Array.isArray(u) ? h2.value.enabled ? u.map((ye) => R(ye, pt(te, +ye.month, +ye.year))) : aa(
      () => [
        R(u[0], pt(te, +u[0].month, +u[0].year)),
        R(
          u[1],
          u[1] ? pt(te, +u[1].month, +u[1].year) : _t(i.value.partialRange)
        )
      ],
      i.value.enabled
    ) : R(u, pt(te, +u.month, +u.year));
  }, Q = (u) => {
    if (Array.isArray(u))
      return u.map((te) => $(te));
    throw new Error(Ga.dateArr("multi-dates"));
  }, ne = (u) => {
    if (Array.isArray(u) && i.value.enabled) {
      const te = u[0], ye = u[1];
      return [
        W(Array.isArray(te) ? te[0] : null),
        Array.isArray(ye) && ye.length ? W(ye[0]) : null
      ];
    }
    return W(u[0]);
  }, x = (u) => t.modelAuto ? Array.isArray(u) ? [$(u[0]), $(u[1])] : t.autoApply ? [$(u)] : [$(u), null] : Array.isArray(u) ? aa(
    () => u[1] ? [
      $(u[0]),
      u[1] ? $(u[1]) : _t(i.value.partialRange)
    ] : [$(u[0])],
    i.value.enabled
  ) : $(u), A = () => {
    Array.isArray(a.value) && i.value.enabled && a.value.length === 1 && a.value.push(_t(i.value.partialRange));
  }, X = () => {
    const u = a.value;
    return [
      g(u[0]),
      u[1] ? g(u[1]) : _t(i.value.partialRange)
    ];
  }, O = () => a.value[1] ? X() : g(Ee(a.value[0])), K = () => (a.value || []).map((u) => g(u)), fe = (u = false) => (u || A(), t.modelAuto ? O() : h2.value.enabled ? K() : Array.isArray(a.value) ? aa(() => X(), i.value.enabled) : g(Ee(a.value))), ve = (u) => !u || Array.isArray(u) && !u.length ? null : t.timePicker ? _(Ee(u)) : t.monthPicker ? F(Ee(u)) : t.yearPicker ? d(Ee(u)) : h2.value.enabled ? Q(Ee(u)) : t.weekPicker ? ne(Ee(u)) : x(Ee(u)), p = (u) => {
    const te = ve(u);
    Fa(Ee(te)) ? (a.value = Ee(te), j()) : (a.value = null, I.value = "");
  }, N = () => {
    const u = (te) => format(te, n.value.format);
    return `${u(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? u(a.value[1]) : ""}`;
  }, ae = () => l.value && a.value ? Array.isArray(a.value) ? N() : format(a.value, n.value.format) : H(a.value), y = () => a.value ? h2.value.enabled ? a.value.map((u) => H(u)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? ae() : H(a.value) : "", j = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? I.value = y() : I.value = t.format(a.value);
  }, $ = (u) => {
    if (t.utc) {
      const te = new Date(u);
      return t.utc === "preserve" ? new Date(te.getTime() + te.getTimezoneOffset() * 6e4) : te;
    }
    return t.modelType ? pl.includes(t.modelType) ? m(new Date(u)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? m(
      parse(u, f(), /* @__PURE__ */ new Date(), { locale: C.value })
    ) : m(
      parse(u, t.modelType, /* @__PURE__ */ new Date(), { locale: C.value })
    ) : m(new Date(u));
  }, g = (u) => u ? t.utc ? Al(u, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +P(u) : t.modelType === "iso" ? P(u).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? H(P(u)) : H(P(u), t.modelType, true) : P(u) : "", ue = (u, te = false, ye = false) => {
    if (ye) return u;
    if (e("update:model-value", u), c.value.emitTimezone && te) {
      const S = Array.isArray(u) ? u.map((be) => xe(Ee(be), c.value.emitTimezone)) : xe(Ee(u), c.value.emitTimezone);
      e("update:model-timezone-value", S);
    }
  }, B = (u) => Array.isArray(a.value) ? h2.value.enabled ? a.value.map((te) => u(te)) : [
    u(a.value[0]),
    a.value[1] ? u(a.value[1]) : _t(i.value.partialRange)
  ] : u(Ee(a.value)), D = () => {
    if (Array.isArray(a.value)) {
      const u = mt(a.value[0], t.weekStart), te = a.value[1] ? mt(a.value[1], t.weekStart) : [];
      return [u.map((ye) => W(ye)), te.map((ye) => W(ye))];
    }
    return mt(a.value, t.weekStart).map((u) => W(u));
  }, J = (u, te) => ue(Ee(B(u)), false, te), s = (u) => {
    const te = D();
    return u ? te : e("update:model-value", D());
  }, k = (u = false) => (u || j(), t.monthPicker ? J(U, u) : t.timePicker ? J(Y, u) : t.yearPicker ? J(getYear, u) : t.weekPicker ? s(u) : ue(fe(u), true, u));
  return {
    inputValue: I,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? i.value.enabled ? i.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: p,
    formatInputValue: j,
    emitModelValue: k
  };
};
var Xl = (e, t) => {
  const { defaultedFilters: l, propDates: a } = _e(e), { validateMonthYearInRange: n } = $t(e), i = (v, C) => {
    let m = v;
    return l.value.months.includes(getMonth(m)) ? (m = C ? addMonths(v, 1) : subMonths(v, 1), i(m, C)) : m;
  }, c = (v, C) => {
    let m = v;
    return l.value.years.includes(getYear(m)) ? (m = C ? addYears(v, 1) : subYears(v, 1), c(m, C)) : m;
  }, h2 = (v, C = false) => {
    const m = set(W(), { month: e.month, year: e.year });
    let P = v ? addMonths(m, 1) : subMonths(m, 1);
    e.disableYearSelect && (P = setYear(P, e.year));
    let H = getMonth(P), Y = getYear(P);
    l.value.months.includes(H) && (P = i(P, v), H = getMonth(P), Y = getYear(P)), l.value.years.includes(Y) && (P = c(P, v), Y = getYear(P)), n(H, Y, v, e.preventMinMaxNavigation) && f(H, Y, C);
  }, f = (v, C, m) => {
    t("update-month-year", { month: v, year: C, fromNav: m });
  }, I = computed(() => (v) => _n(
    set(W(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    v
  ));
  return { handleMonthYearChange: h2, isDisabled: I, updateMonthYear: f };
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
  autoPosition: { type: [Boolean, String], default: true },
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
var it = {
  ...ca,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) },
  isTextInputDate: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: void 0 }
};
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
    ...it
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const l = t, a = e, {
      defaultedActionRow: n,
      defaultedPreviewFormat: i,
      defaultedMultiCalendars: c,
      defaultedTextInput: h2,
      defaultedInline: f,
      defaultedRange: I,
      defaultedMultiDates: v
    } = _e(a), { isTimeValid: C, isMonthValid: m } = $t(a), { buildMatrix: P } = Mt(), H = ref(null), Y = ref(null), U = ref(false), d = ref({}), R = ref(null), _ = ref(null);
    onMounted(() => {
      a.arrowNavigation && P([Le(H), Le(Y)], "actionRow"), F(), window.addEventListener("resize", F);
    }), onUnmounted(() => {
      window.removeEventListener("resize", F);
    });
    const F = () => {
      U.value = false, setTimeout(() => {
        var ae, y;
        const p = (ae = R.value) == null ? void 0 : ae.getBoundingClientRect(), N = (y = _.value) == null ? void 0 : y.getBoundingClientRect();
        p && N && (d.value.maxWidth = `${N.width - p.width - 20}px`), U.value = true;
      }, 0);
    }, Q = computed(() => I.value.enabled && !I.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), ne = computed(
      () => !C.value(a.internalModelValue) || !m.value(a.internalModelValue) || !Q.value
    ), x = () => {
      const p = i.value;
      return a.timePicker || a.monthPicker, p(Ee(a.internalModelValue));
    }, A = () => {
      const p = a.internalModelValue;
      return c.value.count > 0 ? `${X(p[0])} - ${X(p[1])}` : [X(p[0]), X(p[1])];
    }, X = (p) => Bn(
      p,
      i.value,
      a.formatLocale,
      h2.value.rangeSeparator,
      a.modelAuto,
      i.value
    ), O = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof i.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? A() : v.value.enabled ? a.internalModelValue.map((p) => `${X(p)}`) : a.modelAuto ? `${X(a.internalModelValue[0])}` : `${X(a.internalModelValue[0])} -` : X(a.internalModelValue) : x()), K = () => v.value.enabled ? "; " : " - ", fe = computed(
      () => Array.isArray(O.value) ? O.value.join(K()) : O.value
    ), ve = () => {
      C.value(a.internalModelValue) && m.value(a.internalModelValue) && Q.value ? l("select-date") : l("invalid-select");
    };
    return (p, N) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: _,
      class: "dp__action_row"
    }, [
      p.$slots["action-row"] ? renderSlot(p.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: p.internalModelValue,
        disabled: ne.value,
        selectDate: () => p.$emit("select-date"),
        closePicker: () => p.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: fe.value,
          style: normalizeStyle(d.value)
        }, [
          p.$slots["action-preview"] && U.value ? renderSlot(p.$slots, "action-preview", {
            key: 0,
            value: p.internalModelValue
          }) : createCommentVNode("", true),
          !p.$slots["action-preview"] && U.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(fe.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, Jl)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: R,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          p.$slots["action-buttons"] ? renderSlot(p.$slots, "action-buttons", {
            key: 0,
            value: p.internalModelValue
          }) : createCommentVNode("", true),
          p.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(f).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: H,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: N[0] || (N[0] = (ae) => p.$emit("close-picker")),
              onKeydown: N[1] || (N[1] = (ae) => unref(Xe)(ae, () => p.$emit("close-picker")))
            }, toDisplayString(p.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: N[2] || (N[2] = (ae) => p.$emit("select-now")),
              onKeydown: N[3] || (N[3] = (ae) => unref(Xe)(ae, () => p.$emit("select-now")))
            }, toDisplayString(p.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: Y,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: ne.value,
              "data-test-id": "select-button",
              onKeydown: N[4] || (N[4] = (ae) => unref(Xe)(ae, () => ve())),
              onClick: ve
            }, toDisplayString(p.selectText), 41, Zl)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var er = ["role", "aria-label", "tabindex"];
var tr = { class: "dp__selection_grid_header" };
var ar = ["aria-selected", "aria-disabled", "data-test-id", "onClick", "onKeydown", "onMouseover"];
var nr = ["aria-label"];
var Jt = defineComponent({
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
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: i } = Mt(), c = l, h2 = e, { defaultedAriaLabels: f, defaultedTextInput: I, defaultedConfig: v } = _e(
      h2
    ), { hideNavigationButtons: C } = ma(), m = ref(false), P = ref(null), H = ref(null), Y = ref([]), U = ref(), d = ref(null), R = ref(0), _ = ref(null);
    onBeforeUpdate(() => {
      P.value = null;
    }), onMounted(() => {
      nextTick().then(() => K()), h2.noOverlayFocus || Q(), F(true);
    }), onUnmounted(() => F(false));
    const F = (B) => {
      var D;
      h2.arrowNavigation && ((D = h2.headerRefs) != null && D.length ? i(B) : a(B));
    }, Q = () => {
      var D;
      const B = Le(H);
      B && (I.value.enabled || (P.value ? (D = P.value) == null || D.focus({ preventScroll: true }) : B.focus({ preventScroll: true })), m.value = B.clientHeight < B.scrollHeight);
    }, ne = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !h2.useRelative,
        "dp--overlay-relative": h2.useRelative
      })
    ), x = computed(
      () => h2.useRelative ? { height: `${h2.height}px`, width: "var(--dp-menu-min-width)" } : void 0
    ), A = computed(() => ({
      dp__overlay_col: true
    })), X = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: m.value,
        dp__button_bottom: h2.isLast
      })
    ), O = computed(() => {
      var B, D;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((B = h2.items) == null ? void 0 : B.length) <= 6,
        dp__container_block: ((D = h2.items) == null ? void 0 : D.length) > 6
      };
    });
    watch(
      () => h2.items,
      () => K(false),
      { deep: true }
    );
    const K = (B = true) => {
      nextTick().then(() => {
        const D = Le(P), J = Le(H), s = Le(d), k = Le(_), E = s ? s.getBoundingClientRect().height : 0;
        J && (J.getBoundingClientRect().height ? R.value = J.getBoundingClientRect().height - E : R.value = v.value.modeHeight - E), D && k && B && (k.scrollTop = D.offsetTop - k.offsetTop - (R.value / 2 - D.getBoundingClientRect().height) - E);
      });
    }, fe = (B) => {
      B.disabled || c("selected", B.value);
    }, ve = () => {
      c("toggle"), c("reset-flow");
    }, p = () => {
      h2.escClose && ve();
    }, N = (B, D, J, s) => {
      B && ((D.active || D.value === h2.focusValue) && (P.value = B), h2.arrowNavigation && (Array.isArray(Y.value[J]) ? Y.value[J][s] = B : Y.value[J] = [B], ae()));
    }, ae = () => {
      var D, J;
      const B = (D = h2.headerRefs) != null && D.length ? [h2.headerRefs].concat(Y.value) : Y.value.concat([h2.skipButtonRef ? [] : [d.value]]);
      n(Ee(B), (J = h2.headerRefs) != null && J.length ? "monthPicker" : "selectionGrid");
    }, y = (B) => {
      h2.arrowNavigation || kt(B, v.value, true);
    }, j = (B) => {
      U.value = B, c("hover-value", B);
    }, $ = () => {
      if (ve(), !h2.isLast) {
        const B = Ea(h2.menuWrapRef ?? null, "action-row");
        if (B) {
          const D = Tn(B);
          D == null || D.focus();
        }
      }
    }, g = (B) => {
      switch (B.key) {
        case Ce.esc:
          return p();
        case Ce.arrowLeft:
          return y(B);
        case Ce.arrowRight:
          return y(B);
        case Ce.arrowUp:
          return y(B);
        case Ce.arrowDown:
          return y(B);
        default:
          return;
      }
    }, ue = (B) => {
      if (B.key === Ce.enter) return ve();
      if (B.key === Ce.tab) return $();
    };
    return t({ focusGrid: Q }), (B, D) => {
      var J;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: H,
        class: normalizeClass(ne.value),
        style: normalizeStyle(x.value),
        role: B.useRelative ? void 0 : "dialog",
        "aria-label": B.overlayLabel,
        tabindex: B.useRelative ? void 0 : "0",
        onKeydown: g,
        onClick: D[0] || (D[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: _,
          class: normalizeClass(O.value),
          style: normalizeStyle({ "--dp-overlay-height": `${R.value}px` }),
          role: "grid"
        }, [
          createBaseVNode("div", tr, [
            renderSlot(B.$slots, "header")
          ]),
          B.$slots.overlay ? renderSlot(B.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(B.items, (s, k) => (openBlock(), createElementBlock("div", {
            key: k,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: B.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s, (E, u) => (openBlock(), createElementBlock("div", {
              key: E.value,
              ref_for: true,
              ref: (te) => N(te, E, k, u),
              role: "gridcell",
              class: normalizeClass(A.value),
              "aria-selected": E.active || void 0,
              "aria-disabled": E.disabled || void 0,
              tabindex: "0",
              "data-test-id": E.text,
              onClick: withModifiers((te) => fe(E), ["prevent"]),
              onKeydown: (te) => unref(Xe)(te, () => fe(E), true),
              onMouseover: (te) => j(E.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(E.className)
              }, [
                B.$slots.item ? renderSlot(B.$slots, "item", {
                  key: 0,
                  item: E
                }) : createCommentVNode("", true),
                B.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(E.text), 1)
                ], 64))
              ], 2)
            ], 42, ar))), 128))
          ], 2))), 128))
        ], 6),
        B.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: d,
          type: "button",
          "aria-label": (J = unref(f)) == null ? void 0 : J.toggleOverlay,
          class: normalizeClass(X.value),
          tabindex: "0",
          onClick: ve,
          onKeydown: ue
        }, [
          renderSlot(B.$slots, "button-icon")
        ], 42, nr)), [
          [vShow, !unref(C)(B.hideNavigation, B.type)]
        ]) : createCommentVNode("", true)
      ], 46, er);
    };
  }
});
var lr = ["data-dp-mobile"];
var fa = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean },
    isMobile: { type: Boolean }
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
      }),
      "data-dp-mobile": n.isMobile
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (c, h2) => (openBlock(), createElementBlock("div", {
        key: c,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: c,
          index: h2
        })
      ], 2))), 128))
    ], 10, lr));
  }
});
var rr = ["data-dp-element", "aria-label", "aria-disabled"];
var Wt = defineComponent({
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
      onKeydown: i[1] || (i[1] = (c) => unref(Xe)(c, () => n.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, rr));
  }
});
var or = ["aria-label", "data-test-id"];
var En = defineComponent({
  __name: "YearModePicker",
  props: {
    ...it,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const l = t, a = e, { showRightIcon: n, showLeftIcon: i } = ma(), { defaultedConfig: c, defaultedMultiCalendars: h2, defaultedAriaLabels: f, defaultedTransitions: I, defaultedUI: v } = _e(a), { showTransition: C, transitionName: m } = Zt(I), P = ref(false), H = (d = false, R) => {
      P.value = !P.value, l("toggle-year-picker", { flow: d, show: R });
    }, Y = (d) => {
      P.value = false, l("year-select", d);
    }, U = (d = false) => {
      l("handle-year", d);
    };
    return (d, R) => {
      var _, F, Q, ne, x;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["dp--year-mode-picker", { "dp--hidden-el": P.value }])
        }, [
          unref(i)(unref(h2), e.instance) ? (openBlock(), createBlock(Wt, {
            key: 0,
            ref: "mpPrevIconRef",
            "aria-label": (_ = unref(f)) == null ? void 0 : _.prevYear,
            disabled: e.isDisabled(false),
            class: normalizeClass((F = unref(v)) == null ? void 0 : F.navBtnPrev),
            onActivate: R[0] || (R[0] = (A) => U(false))
          }, {
            default: withCtx(() => [
              d.$slots["arrow-left"] ? renderSlot(d.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              d.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
          createBaseVNode("button", {
            ref: "mpYearButtonRef",
            class: "dp__btn dp--year-select",
            type: "button",
            "aria-label": `${e.year}-${(Q = unref(f)) == null ? void 0 : Q.openYearsOverlay}`,
            "data-test-id": `year-mode-btn-${e.instance}`,
            onClick: R[1] || (R[1] = () => H(false)),
            onKeydown: R[2] || (R[2] = withKeys(() => H(false), ["enter"]))
          }, [
            d.$slots.year ? renderSlot(d.$slots, "year", {
              key: 0,
              year: e.year
            }) : createCommentVNode("", true),
            d.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(e.year), 1)
            ], 64))
          ], 40, or),
          unref(n)(unref(h2), e.instance) ? (openBlock(), createBlock(Wt, {
            key: 1,
            ref: "mpNextIconRef",
            "aria-label": (ne = unref(f)) == null ? void 0 : ne.nextYear,
            disabled: e.isDisabled(true),
            class: normalizeClass((x = unref(v)) == null ? void 0 : x.navBtnNext),
            onActivate: R[3] || (R[3] = (A) => U(true))
          }, {
            default: withCtx(() => [
              d.$slots["arrow-right"] ? renderSlot(d.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
              d.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true)
        ], 2),
        createVNode(Transition, {
          name: unref(m)(e.showYearPicker),
          css: unref(C)
        }, {
          default: withCtx(() => {
            var A, X;
            return [
              e.showYearPicker ? (openBlock(), createBlock(Jt, {
                key: 0,
                items: e.items,
                "text-input": d.textInput,
                "esc-close": d.escClose,
                config: d.config,
                "is-last": d.autoApply && !unref(c).keepActionRow,
                "hide-navigation": d.hideNavigation,
                "aria-labels": d.ariaLabels,
                "overlay-label": (X = (A = unref(f)) == null ? void 0 : A.yearPicker) == null ? void 0 : X.call(A, true),
                type: "year",
                onToggle: H,
                onSelected: R[4] || (R[4] = (O) => Y(O))
              }, createSlots({
                "button-icon": withCtx(() => [
                  d.$slots["calendar-icon"] ? renderSlot(d.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(zt), { key: 1 }))
                ]),
                _: 2
              }, [
                d.$slots["year-overlay-value"] ? {
                  name: "item",
                  fn: withCtx(({ item: O }) => [
                    renderSlot(d.$slots, "year-overlay-value", {
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
    if (t.value.some((a) => Ae(e, a))) {
      const a = t.value.filter((n) => !Ae(n, e));
      t.value = a.length ? a : null;
    } else (l && +l > t.value.length || !l) && t.value.push(e);
  else
    t.value = [e];
};
var Ja = (e, t, l) => {
  let a = e.value ? e.value.slice() : [];
  return a.length === 2 && a[1] !== null && (a = []), a.length ? (Be(t, a[0]) ? a.unshift(t) : a[1] = t, l("range-end", t)) : (a = [t], l("range-start", t)), a;
};
var va = (e, t, l, a) => {
  e && (e[0] && e[1] && l && t("auto-apply"), e[0] && !e[1] && a && l && t("auto-apply"));
};
var Fn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => xe(W(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = xe(W(e.value), e.timezone));
};
var Ln = (e, t, l, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Ne(e, t.value[0]) || Ae(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (Be(e, t.value[1]) || Ae(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var zn = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: a,
  calendars: n,
  modelValue: i,
  props: c,
  filters: h2,
  year: f,
  month: I,
  emit: v
}) => {
  const C = computed(() => Ka(c.yearRange, c.locale, c.reverseYears)), m = ref([false]), P = computed(() => (O, K) => {
    const fe = set(ut(/* @__PURE__ */ new Date()), {
      month: I.value(O),
      year: f.value(O)
    }), ve = K ? endOfYear(fe) : startOfYear(fe);
    return _n(
      ve,
      a.value.maxDate,
      a.value.minDate,
      c.preventMinMaxNavigation,
      K
    );
  }), H = () => Array.isArray(i.value) && e.value.solo && i.value[1], Y = () => {
    for (let O = 0; O < e.value.count; O++)
      if (O === 0)
        n.value[O] = n.value[0];
      else if (O === e.value.count - 1 && H())
        n.value[O] = {
          month: getMonth(i.value[1]),
          year: getYear(i.value[1])
        };
      else {
        const K = set(W(), n.value[O - 1]);
        n.value[O] = { month: getMonth(K), year: getYear(addYears(K, 1)) };
      }
  }, U = (O) => {
    if (!O) return Y();
    const K = set(W(), n.value[O]);
    return n.value[0].year = getYear(subYears(K, e.value.count - 1)), Y();
  }, d = (O, K) => {
    const fe = differenceInYears(K, O);
    return t.value.showLastInRange && fe > 1 ? K : O;
  }, R = (O) => c.focusStartDate || e.value.solo ? O[0] : O[1] ? d(O[0], O[1]) : O[0], _ = () => {
    if (i.value) {
      const O = Array.isArray(i.value) ? R(i.value) : i.value;
      n.value[0] = { month: getMonth(O), year: getYear(O) };
    }
  }, F = () => {
    _(), e.value.count && Y();
  };
  watch(i, (O, K) => {
    c.isTextInputDate && JSON.stringify(O ?? {}) !== JSON.stringify(K ?? {}) && F();
  }), onMounted(() => {
    F();
  });
  const Q = (O, K) => {
    n.value[K].year = O, v("update-month-year", { instance: K, year: O, month: n.value[K].month }), e.value.count && !e.value.solo && U(K);
  }, ne = computed(() => (O) => Et(C.value, (K) => {
    var N;
    const fe = f.value(O) === K.value, ve = Qt(
      K.value,
      Ft(a.value.minDate),
      Ft(a.value.maxDate)
    ) || ((N = h2.value.years) == null ? void 0 : N.includes(f.value(O))), p = qa(l.value, K.value);
    return { active: fe, disabled: ve, highlighted: p };
  })), x = (O, K) => {
    Q(O, K), X(K);
  }, A = (O, K = false) => {
    if (!P.value(O, K)) {
      const fe = K ? f.value(O) + 1 : f.value(O) - 1;
      Q(fe, O);
    }
  }, X = (O, K = false, fe) => {
    K || v("reset-flow"), fe !== void 0 ? m.value[O] = fe : m.value[O] = !m.value[O], m.value[O] ? v("overlay-toggle", { open: true, overlay: je.year }) : (v("overlay-closed"), v("overlay-toggle", { open: false, overlay: je.year }));
  };
  return {
    isDisabled: P,
    groupedYears: ne,
    showYearPicker: m,
    selectYear: Q,
    toggleYearPicker: X,
    handleYearSelect: x,
    handleYear: A
  };
};
var sr = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    defaultedRange: c,
    defaultedHighlight: h2,
    propDates: f,
    defaultedTz: I,
    defaultedFilters: v,
    defaultedMultiDates: C
  } = _e(e), m = () => {
    e.isTextInputDate && F(getYear(W(e.startDate)), 0);
  }, { modelValue: P, year: H, month: Y, calendars: U } = xt(e, t, m), d = computed(() => $n(e.formatLocale, e.locale, e.monthNameFormat)), R = ref(null), { checkMinMaxRange: _ } = $t(e), {
    selectYear: F,
    groupedYears: Q,
    showYearPicker: ne,
    toggleYearPicker: x,
    handleYearSelect: A,
    handleYear: X,
    isDisabled: O
  } = zn({
    modelValue: P,
    multiCalendars: l,
    range: c,
    highlight: h2,
    calendars: U,
    year: H,
    propDates: f,
    month: Y,
    filters: v,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (P.value && e.focusStartDate || !P.value) && F(getYear(W(e.startDate)), 0);
  });
  const K = (k) => k ? { month: getMonth(k), year: getYear(k) } : { month: null, year: null }, fe = () => P.value ? Array.isArray(P.value) ? P.value.map((k) => K(k)) : K(P.value) : K(), ve = (k, E) => {
    const u = U.value[k], te = fe();
    return Array.isArray(te) ? te.some((ye) => ye.year === (u == null ? void 0 : u.year) && ye.month === E) : (u == null ? void 0 : u.year) === te.year && E === te.month;
  }, p = (k, E, u) => {
    var ye, S;
    const te = fe();
    return Array.isArray(te) ? H.value(E) === ((ye = te[u]) == null ? void 0 : ye.year) && k === ((S = te[u]) == null ? void 0 : S.month) : false;
  }, N = (k, E) => {
    if (c.value.enabled) {
      const u = fe();
      if (Array.isArray(P.value) && Array.isArray(u)) {
        const te = p(k, E, 0) || p(k, E, 1), ye = pt(ut(W()), k, H.value(E));
        return da(P.value, R.value, ye) && !te;
      }
      return false;
    }
    return false;
  }, ae = computed(() => (k) => Et(d.value, (E) => {
    var be;
    const u = ve(k, E.value), te = Qt(
      E.value,
      Pn(H.value(k), f.value.minDate),
      Rn(H.value(k), f.value.maxDate)
    ) || Cl(f.value.disabledDates, H.value(k)).includes(E.value) || ((be = v.value.months) == null ? void 0 : be.includes(E.value)) || !Ol(f.value.allowedDates, H.value(k), E.value), ye = N(E.value, k), S = Yn(h2.value, E.value, H.value(k));
    return { active: u, disabled: te, isBetween: ye, highlighted: S };
  })), y = (k, E) => pt(ut(W()), k, H.value(E)), j = (k, E) => {
    const u = P.value ? P.value : ut(/* @__PURE__ */ new Date());
    P.value = pt(u, k, H.value(E)), t("auto-apply"), t("update-flow-step");
  }, $ = (k, E) => {
    const u = y(k, E);
    c.value.fixedEnd || c.value.fixedStart ? P.value = Ln(u, P, t, c) : P.value ? _(u, P.value) && (P.value = Ja(P, y(k, E), t)) : P.value = [y(k, E)], nextTick().then(() => {
      va(P.value, t, e.autoApply, e.modelAuto);
    });
  }, g = (k, E) => {
    Xa(y(k, E), P, C.value.limit), t("auto-apply", true);
  }, ue = (k, E) => (U.value[E].month = k, D(E, U.value[E].year, k), C.value.enabled ? g(k, E) : c.value.enabled ? $(k, E) : j(k, E)), B = (k, E) => {
    F(k, E), D(E, k, null);
  }, D = (k, E, u) => {
    let te = u;
    if (!te && te !== 0) {
      const ye = fe();
      te = Array.isArray(ye) ? ye[k].month : ye.month;
    }
    t("update-month-year", { instance: k, year: E, month: te });
  };
  return {
    groupedMonths: ae,
    groupedYears: Q,
    year: H,
    isDisabled: O,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    showYearPicker: ne,
    modelValue: P,
    presetDate: (k, E) => {
      Fn({
        value: k,
        modelValue: P,
        range: c.value.enabled,
        timezone: E ? void 0 : I.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (k, E) => {
      R.value = y(k, E);
    },
    selectMonth: ue,
    selectYear: B,
    toggleYearPicker: x,
    handleYearSelect: A,
    handleYear: X,
    getModelMonthYear: fe
  };
};
var ur = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...it
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
    const a = l, n = useSlots(), i = et(n, "yearMode"), c = e;
    onMounted(() => {
      c.shadow || a("mount", null);
    });
    const {
      groupedMonths: h2,
      groupedYears: f,
      year: I,
      isDisabled: v,
      defaultedMultiCalendars: C,
      defaultedConfig: m,
      showYearPicker: P,
      modelValue: H,
      presetDate: Y,
      setHoverDate: U,
      selectMonth: d,
      selectYear: R,
      toggleYearPicker: _,
      handleYearSelect: F,
      handleYear: Q,
      getModelMonthYear: ne
    } = sr(c, a);
    return t({ getSidebarProps: () => ({
      modelValue: H,
      year: I,
      getModelMonthYear: ne,
      selectMonth: d,
      selectYear: R,
      handleYear: Q
    }), presetDate: Y, toggleYearPicker: (A) => _(0, A) }), (A, X) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(C).count,
      collapse: A.collapse,
      stretch: "",
      "is-mobile": A.isMobile
    }, {
      default: withCtx(({ instance: O }) => [
        A.$slots["top-extra"] ? renderSlot(A.$slots, "top-extra", {
          key: 0,
          value: A.internalModelValue
        }) : createCommentVNode("", true),
        A.$slots["month-year"] ? renderSlot(A.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(I),
          months: unref(h2)(O),
          years: unref(f)(O),
          selectMonth: unref(d),
          selectYear: unref(R),
          instance: O
        }))) : (openBlock(), createBlock(Jt, {
          key: 2,
          items: unref(h2)(O),
          "arrow-navigation": A.arrowNavigation,
          "is-last": A.autoApply && !unref(m).keepActionRow,
          "esc-close": A.escClose,
          height: unref(m).modeHeight,
          config: A.config,
          "no-overlay-focus": !!(A.noOverlayFocus || A.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (K) => unref(d)(K, O),
          onHoverValue: (K) => unref(U)(K, O)
        }, createSlots({
          header: withCtx(() => [
            createVNode(En, mergeProps(A.$props, {
              items: unref(f)(O),
              instance: O,
              "show-year-picker": unref(P)[O],
              year: unref(I)(O),
              "is-disabled": (K) => unref(v)(O, K),
              onHandleYear: (K) => unref(Q)(O, K),
              onYearSelect: (K) => unref(F)(K, O),
              onToggleYearPicker: (K) => unref(_)(O, K == null ? void 0 : K.flow, K == null ? void 0 : K.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i), (K, fe) => ({
                name: K,
                fn: withCtx((ve) => [
                  renderSlot(A.$slots, K, normalizeProps(guardReactiveProps(ve)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          A.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: K }) => [
              renderSlot(A.$slots, "month-overlay-value", {
                text: K.text,
                value: K.value
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse", "is-mobile"]));
  }
});
var ir = (e, t) => {
  const l = () => {
    e.isTextInputDate && (v.value = getYear(W(e.startDate)));
  }, { modelValue: a } = xt(e, t, l), n = ref(null), { defaultedHighlight: i, defaultedMultiDates: c, defaultedFilters: h2, defaultedRange: f, propDates: I } = _e(e), v = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (v.value = getYear(W(e.startDate)));
  });
  const C = (d) => Array.isArray(a.value) ? a.value.some((R) => getYear(R) === d) : a.value ? getYear(a.value) === d : false, m = (d) => f.value.enabled && Array.isArray(a.value) ? da(a.value, n.value, H(d)) : false, P = computed(() => Et(Ka(e.yearRange, e.locale, e.reverseYears), (d) => {
    const R = C(d.value), _ = Qt(
      d.value,
      Ft(I.value.minDate),
      Ft(I.value.maxDate)
    ) || h2.value.years.includes(d.value), F = m(d.value) && !R, Q = qa(i.value, d.value);
    return { active: R, disabled: _, isBetween: F, highlighted: Q };
  })), H = (d) => setYear(ut(startOfYear(/* @__PURE__ */ new Date())), d);
  return {
    groupedYears: P,
    modelValue: a,
    focusYear: v,
    setHoverValue: (d) => {
      n.value = setYear(ut(/* @__PURE__ */ new Date()), d);
    },
    selectYear: (d) => {
      var R;
      if (t("update-month-year", { instance: 0, year: d }), c.value.enabled)
        return a.value ? Array.isArray(a.value) && (((R = a.value) == null ? void 0 : R.map((F) => getYear(F))).includes(d) ? a.value = a.value.filter((F) => getYear(F) !== d) : a.value.push(setYear(Je(W()), d))) : a.value = [setYear(Je(startOfYear(W())), d)], t("auto-apply", true);
      f.value.enabled ? (a.value = Ja(a, H(d), t), nextTick().then(() => {
        va(a.value, t, e.autoApply, e.modelAuto);
      })) : (a.value = H(d), t("auto-apply"));
    }
  };
};
var dr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...it
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
    const a = l, n = e, { groupedYears: i, modelValue: c, focusYear: h2, selectYear: f, setHoverValue: I } = ir(n, a), { defaultedConfig: v } = _e(n);
    return t({ getSidebarProps: () => ({
      modelValue: c,
      selectYear: f
    }) }), (m, P) => (openBlock(), createElementBlock("div", null, [
      m.$slots["top-extra"] ? renderSlot(m.$slots, "top-extra", {
        key: 0,
        value: m.internalModelValue
      }) : createCommentVNode("", true),
      m.$slots["month-year"] ? renderSlot(m.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(i),
        selectYear: unref(f)
      }))) : (openBlock(), createBlock(Jt, {
        key: 2,
        items: unref(i),
        "is-last": m.autoApply && !unref(v).keepActionRow,
        height: unref(v).modeHeight,
        config: m.config,
        "no-overlay-focus": !!(m.noOverlayFocus || m.textInput),
        "focus-value": unref(h2),
        type: "year",
        "use-relative": "",
        onSelected: unref(f),
        onHoverValue: unref(I)
      }, createSlots({ _: 2 }, [
        m.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: H }) => [
            renderSlot(m.$slots, "year-overlay-value", {
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
var cr = {
  key: 0,
  class: "dp__time_input"
};
var fr = ["data-compact", "data-collapsed"];
var vr = ["data-test-id", "aria-label", "onKeydown", "onClick", "onMousedown"];
var mr = ["aria-label", "disabled", "data-test-id", "onKeydown", "onClick"];
var pr = ["data-test-id", "aria-label", "onKeydown", "onClick", "onMousedown"];
var yr = { key: 0 };
var gr = ["aria-label", "data-compact"];
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
    ...it
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
    const a = l, n = e, { setTimePickerElements: i, setTimePickerBackRef: c } = Mt(), {
      defaultedAriaLabels: h2,
      defaultedTransitions: f,
      defaultedFilters: I,
      defaultedConfig: v,
      defaultedRange: C,
      defaultedMultiCalendars: m
    } = _e(n), { transitionName: P, showTransition: H } = Zt(f), Y = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), U = ref("AM"), d = ref(null), R = ref([]), _ = ref(), F = ref(false);
    onMounted(() => {
      a("mounted");
    });
    const Q = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: n.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), ne = computed(
      () => (r) => $(r, n[r]) || A(r, n[r])
    ), x = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), A = (r, le) => C.value.enabled && !C.value.disableTimeRangeValidation ? !n.validateTime(r, le) : false, X = (r, le) => {
      if (C.value.enabled && !C.value.disableTimeRangeValidation) {
        const ie = le ? +n[`${r}Increment`] : -+n[`${r}Increment`], re = n[r] + ie;
        return !n.validateTime(r, re);
      }
      return false;
    }, O = computed(() => (r) => !J(+n[r] + +n[`${r}Increment`], r) || X(r, true)), K = computed(() => (r) => !J(+n[r] - +n[`${r}Increment`], r) || X(r, false)), fe = (r, le) => add(set(W(), r), le), ve = (r, le) => sub(set(W(), r), le), p = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), N = computed(
      () => n.timePickerInline && C.value.enabled && !m.value.count
    ), ae = computed(() => {
      const r = [{ type: "hours" }];
      return n.enableMinutes && r.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && r.push({ type: "", separator: true }, {
        type: "seconds"
      }), r;
    }), y = computed(() => ae.value.filter((r) => !r.separator)), j = computed(() => (r) => {
      if (r === "hours") {
        const le = ye(+n.hours);
        return { text: le < 10 ? `0${le}` : `${le}`, value: le };
      }
      return { text: n[r] < 10 ? `0${n[r]}` : `${n[r]}`, value: n[r] };
    }), $ = (r, le) => {
      var re;
      if (!n.disabledTimesConfig) return false;
      const ie = n.disabledTimesConfig(n.order, r === "hours" ? le : void 0);
      return ie[r] ? !!((re = ie[r]) != null && re.includes(le)) : true;
    }, g = (r, le) => le !== "hours" || U.value === "AM" ? r : r + 12, ue = (r) => {
      const le = n.is24 ? 24 : 12, ie = r === "hours" ? le : 60, re = +n[`${r}GridIncrement`], Te = r === "hours" && !n.is24 ? re : 0, ke = [];
      for (let w = Te; w < ie; w += re)
        ke.push({ value: n.is24 ? w : g(w, r), text: w < 10 ? `0${w}` : `${w}` });
      return r === "hours" && !n.is24 && ke.unshift({ value: U.value === "PM" ? 12 : 0, text: "12" }), Et(ke, (w) => ({ active: false, disabled: I.value.times[r].includes(w.value) || !J(w.value, r) || $(r, w.value) || A(r, w.value) }));
    }, B = (r) => r >= 0 ? r : 59, D = (r) => r >= 0 ? r : 23, J = (r, le) => {
      const ie = n.minTime ? Q(Aa(n.minTime)) : null, re = n.maxTime ? Q(Aa(n.maxTime)) : null, Te = Q(
        Aa(
          x.value,
          le,
          le === "minutes" || le === "seconds" ? B(r) : D(r)
        )
      );
      return ie && re ? (isBefore(Te, re) || isEqual(Te, re)) && (isAfter(Te, ie) || isEqual(Te, ie)) : ie ? isAfter(Te, ie) || isEqual(Te, ie) : re ? isBefore(Te, re) || isEqual(Te, re) : true;
    }, s = (r) => n[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], k = (r) => {
      s(r) || (Y[r] = !Y[r], Y[r] ? (F.value = true, a("overlay-opened", r)) : (F.value = false, a("overlay-closed", r)));
    }, E = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, u = () => {
      _.value && clearTimeout(_.value);
    }, te = (r, le = true, ie) => {
      const re = le ? fe : ve, Te = le ? +n[`${r}Increment`] : -+n[`${r}Increment`];
      J(+n[r] + Te, r) && a(
        `update:${r}`,
        E(r)(re({ [r]: +n[r] }, { [r]: +n[`${r}Increment`] }))
      ), !(ie != null && ie.keyboard) && v.value.timeArrowHoldThreshold && (_.value = setTimeout(() => {
        te(r, le);
      }, v.value.timeArrowHoldThreshold));
    }, ye = (r) => n.is24 ? r : (r >= 12 ? U.value = "PM" : U.value = "AM", hl(r)), S = () => {
      U.value === "PM" ? (U.value = "AM", a("update:hours", n.hours - 12)) : (U.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", U.value);
    }, be = (r) => {
      Y[r] = true;
    }, L = (r, le, ie) => {
      if (r && n.arrowNavigation) {
        Array.isArray(R.value[le]) ? R.value[le][ie] = r : R.value[le] = [r];
        const re = R.value.reduce(
          (Te, ke) => ke.map((w, z) => [...Te[z] || [], ke[z]]),
          []
        );
        c(n.closeTimePickerBtn), d.value && (re[1] = re[1].concat(d.value)), i(re, n.order);
      }
    }, se = (r, le) => (k(r), a(`update:${r}`, le));
    return t({ openChildCmp: be }), (r, le) => {
      var ie;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", cr, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(ae.value, (re, Te) => {
          var ke, w, z;
          return openBlock(), createElementBlock("div", {
            key: Te,
            class: normalizeClass(p.value),
            "data-compact": N.value && !r.enableSeconds,
            "data-collapsed": N.value && r.enableSeconds
          }, [
            re.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              F.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(":")
              ], 64))
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (ge) => L(ge, Te, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_top: r.timePickerInline,
                  dp__inc_dec_button_disabled: O.value(re.type),
                  "dp--hidden-el": F.value
                }),
                "data-test-id": `${re.type}-time-inc-btn-${n.order}`,
                "aria-label": (ke = unref(h2)) == null ? void 0 : ke.incrementValue(re.type),
                tabindex: "0",
                onKeydown: (ge) => unref(Xe)(ge, () => te(re.type, true, { keyboard: true }), true),
                onClick: (ge) => unref(v).timeArrowHoldThreshold ? void 0 : te(re.type, true),
                onMousedown: (ge) => unref(v).timeArrowHoldThreshold ? te(re.type, true) : void 0,
                onMouseup: u
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-up"] ? renderSlot(r.$slots, "tp-inline-arrow-up", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    le[2] || (le[2] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
                    le[3] || (le[3] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, vr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (ge) => L(ge, Te, 1),
                type: "button",
                "aria-label": `${j.value(re.type).text}-${(w = unref(h2)) == null ? void 0 : w.openTpOverlay(re.type)}`,
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !r.timePickerInline,
                  dp__time_display_inline: r.timePickerInline,
                  "dp--time-invalid": ne.value(re.type),
                  "dp--time-overlay-btn": !ne.value(re.type),
                  "dp--hidden-el": F.value
                }),
                disabled: s(re.type),
                tabindex: "0",
                "data-test-id": `${re.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (ge) => unref(Xe)(ge, () => k(re.type), true),
                onClick: (ge) => k(re.type)
              }, [
                r.$slots[re.type] ? renderSlot(r.$slots, re.type, {
                  key: 0,
                  text: j.value(re.type).text,
                  value: j.value(re.type).value
                }) : createCommentVNode("", true),
                r.$slots[re.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(j.value(re.type).text), 1)
                ], 64))
              ], 42, mr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (ge) => L(ge, Te, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_bottom: r.timePickerInline,
                  dp__inc_dec_button_disabled: K.value(re.type),
                  "dp--hidden-el": F.value
                }),
                "data-test-id": `${re.type}-time-dec-btn-${n.order}`,
                "aria-label": (z = unref(h2)) == null ? void 0 : z.decrementValue(re.type),
                tabindex: "0",
                onKeydown: (ge) => unref(Xe)(ge, () => te(re.type, false, { keyboard: true }), true),
                onClick: (ge) => unref(v).timeArrowHoldThreshold ? void 0 : te(re.type, false),
                onMousedown: (ge) => unref(v).timeArrowHoldThreshold ? te(re.type, false) : void 0,
                onMouseup: u
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-down"] ? renderSlot(r.$slots, "tp-inline-arrow-down", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    le[4] || (le[4] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
                    le[5] || (le[5] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-down"] ? renderSlot(r.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, pr)
            ], 64))
          ], 10, fr);
        }), 128)),
        r.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", yr, [
          r.$slots["am-pm-button"] ? renderSlot(r.$slots, "am-pm-button", {
            key: 0,
            toggle: S,
            value: U.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: d,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (ie = unref(h2)) == null ? void 0 : ie.amPmButton,
            tabindex: "0",
            "data-compact": N.value,
            onClick: S,
            onKeydown: le[0] || (le[0] = (re) => unref(Xe)(re, () => S(), true))
          }, toDisplayString(U.value), 41, gr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(y.value, (re, Te) => (openBlock(), createBlock(Transition, {
          key: Te,
          name: unref(P)(Y[re.type]),
          css: unref(H)
        }, {
          default: withCtx(() => {
            var ke, w;
            return [
              Y[re.type] ? (openBlock(), createBlock(Jt, {
                key: 0,
                items: ue(re.type),
                "is-last": r.autoApply && !unref(v).keepActionRow,
                "esc-close": r.escClose,
                type: re.type,
                "text-input": r.textInput,
                config: r.config,
                "arrow-navigation": r.arrowNavigation,
                "aria-labels": r.ariaLabels,
                "overlay-label": (w = (ke = unref(h2)).timeOverlay) == null ? void 0 : w.call(ke, re.type),
                onSelected: (z) => se(re.type, z),
                onToggle: (z) => k(re.type),
                onResetFlow: le[1] || (le[1] = (z) => r.$emit("reset-flow"))
              }, createSlots({
                "button-icon": withCtx(() => [
                  r.$slots["clock-icon"] ? renderSlot(r.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(r.timePickerInline ? unref(zt) : unref(Ua)), { key: 1 }))
                ]),
                _: 2
              }, [
                r.$slots[`${re.type}-overlay-value`] ? {
                  name: "item",
                  fn: withCtx(({ item: z }) => [
                    renderSlot(r.$slots, `${re.type}-overlay-value`, {
                      text: z.text,
                      value: z.value
                    })
                  ]),
                  key: "0"
                } : void 0,
                r.$slots[`${re.type}-overlay-header`] ? {
                  name: "header",
                  fn: withCtx(() => [
                    renderSlot(r.$slots, `${re.type}-overlay-header`, {
                      toggle: () => k(re.type)
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
var br = ["data-dp-mobile"];
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
    ...it
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
    const a = l, n = e, { buildMatrix: i, setTimePicker: c } = Mt(), h2 = useSlots(), { defaultedTransitions: f, defaultedAriaLabels: I, defaultedTextInput: v, defaultedConfig: C, defaultedRange: m } = _e(n), { transitionName: P, showTransition: H } = Zt(f), { hideNavigationButtons: Y } = ma(), U = ref(null), d = ref(null), R = ref([]), _ = ref(null), F = ref(false);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? i([Le(U.value)], "time") : c(true, n.timePicker);
    });
    const Q = computed(() => m.value.enabled && n.modelAuto ? An(n.internalModelValue) : true), ne = ref(false), x = ($) => ({
      hours: Array.isArray(n.hours) ? n.hours[$] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[$] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[$] : n.seconds
    }), A = computed(() => {
      const $ = [];
      if (m.value.enabled)
        for (let g = 0; g < 2; g++)
          $.push(x(g));
      else
        $.push(x(0));
      return $;
    }), X = ($, g = false, ue = "") => {
      g || a("reset-flow"), ne.value = $, a($ ? "overlay-opened" : "overlay-closed", je.time), n.arrowNavigation && c($), nextTick(() => {
        ue !== "" && R.value[0] && R.value[0].openChildCmp(ue);
      });
    }, O = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !C.value.keepActionRow
    })), K = et(h2, "timePicker"), fe = ($, g, ue) => m.value.enabled ? g === 0 ? [$, A.value[1][ue]] : [A.value[0][ue], $] : $, ve = ($) => {
      a("update:hours", $);
    }, p = ($) => {
      a("update:minutes", $);
    }, N = ($) => {
      a("update:seconds", $);
    }, ae = () => {
      if (_.value && !v.value.enabled && !n.noOverlayFocus) {
        const $ = Tn(_.value);
        $ && $.focus({ preventScroll: true });
      }
    }, y = ($) => {
      F.value = false, a("overlay-closed", $);
    }, j = ($) => {
      F.value = true, a("overlay-opened", $);
    };
    return t({ toggleTimePicker: X }), ($, g) => {
      var ue;
      return openBlock(), createElementBlock("div", {
        class: "dp--tp-wrap",
        "data-dp-mobile": $.isMobile
      }, [
        !$.timePicker && !$.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: U,
          type: "button",
          class: normalizeClass({ ...O.value, "dp--hidden-el": ne.value }),
          "aria-label": (ue = unref(I)) == null ? void 0 : ue.openTimePicker,
          tabindex: $.noOverlayFocus ? void 0 : 0,
          "data-test-id": "open-time-picker-btn",
          onKeydown: g[0] || (g[0] = (B) => unref(Xe)(B, () => X(true))),
          onClick: g[1] || (g[1] = (B) => X(true))
        }, [
          $.$slots["clock-icon"] ? renderSlot($.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          $.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ua), { key: 1 }))
        ], 42, kr)), [
          [vShow, !unref(Y)($.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(P)(ne.value),
          css: unref(H) && !$.timePickerInline
        }, {
          default: withCtx(() => {
            var B, D;
            return [
              ne.value || $.timePicker || $.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: _,
                role: $.timePickerInline ? void 0 : "dialog",
                class: normalizeClass({
                  dp__overlay: !$.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !$.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle($.timePicker ? { height: `${unref(C).modeHeight}px` } : void 0),
                "aria-label": (B = unref(I)) == null ? void 0 : B.timePicker,
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
                    setHours: ve,
                    setMinutes: p,
                    setSeconds: N
                  }) : createCommentVNode("", true),
                  $.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass($.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(A.value, (J, s) => withDirectives((openBlock(), createBlock(hr, mergeProps({
                      key: s,
                      ref_for: true
                    }, {
                      ...$.$props,
                      order: s,
                      hours: J.hours,
                      minutes: J.minutes,
                      seconds: J.seconds,
                      closeTimePickerBtn: d.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: s === 0 ? unref(m).fixedStart : unref(m).fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: R,
                      "validate-time": (k, E) => e.validateTime(k, fe(E, s, k)),
                      "onUpdate:hours": (k) => ve(fe(k, s, "hours")),
                      "onUpdate:minutes": (k) => p(fe(k, s, "minutes")),
                      "onUpdate:seconds": (k) => N(fe(k, s, "seconds")),
                      onMounted: ae,
                      onOverlayClosed: y,
                      onOverlayOpened: j,
                      onAmPmChange: g[2] || (g[2] = (k) => $.$emit("am-pm-change", k))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(K), (k, E) => ({
                        name: k,
                        fn: withCtx((u) => [
                          renderSlot($.$slots, k, mergeProps({ ref_for: true }, u))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, s === 0 ? true : Q.value]
                    ])), 128))
                  ], 2)),
                  !$.timePicker && !$.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: d,
                    type: "button",
                    class: normalizeClass({ ...O.value, "dp--hidden-el": F.value }),
                    "aria-label": (D = unref(I)) == null ? void 0 : D.closeTimePicker,
                    tabindex: "0",
                    onKeydown: g[3] || (g[3] = (J) => unref(Xe)(J, () => X(false))),
                    onClick: g[4] || (g[4] = (J) => X(false))
                  }, [
                    $.$slots["calendar-icon"] ? renderSlot($.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    $.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(zt), { key: 1 }))
                  ], 42, Dr)), [
                    [vShow, !unref(Y)($.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, wr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ], 8, br);
    };
  }
});
var Un = (e, t, l, a) => {
  const { defaultedRange: n } = _e(e), i = (_, F) => Array.isArray(t[_]) ? t[_][F] : t[_], c = (_) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[_] : t.seconds : 0, h2 = (_, F) => _ ? F !== void 0 ? wt(_, i("hours", F), i("minutes", F), c(F)) : wt(_, t.hours, t.minutes, c()) : setSeconds(W(), c(F)), f = (_, F) => {
    t[_] = F;
  }, I = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : n.value.enabled), v = (_, F) => {
    const Q = Object.fromEntries(
      Object.keys(t).map((ne) => ne === _ ? [ne, F] : [ne, t[ne]].slice())
    );
    if (I.value && !n.value.disableTimeRangeValidation) {
      const ne = (A) => l.value ? wt(
        l.value[A],
        Q.hours[A],
        Q.minutes[A],
        Q.seconds[A]
      ) : null, x = (A) => setMilliseconds(l.value[A], 0);
      return !(Ae(ne(0), ne(1)) && (isAfter(ne(0), x(1)) || isBefore(ne(1), x(0))));
    }
    return true;
  }, C = (_, F) => {
    v(_, F) && (f(_, F), a && a());
  }, m = (_) => {
    C("hours", _);
  }, P = (_) => {
    C("minutes", _);
  }, H = (_) => {
    C("seconds", _);
  }, Y = (_, F, Q, ne) => {
    F && m(_), !F && !Q && P(_), Q && H(_), l.value && ne(l.value);
  }, U = (_) => {
    if (_) {
      const F = Array.isArray(_), Q = F ? [+_[0].hours, +_[1].hours] : +_.hours, ne = F ? [+_[0].minutes, +_[1].minutes] : +_.minutes, x = F ? [+_[0].seconds, +_[1].seconds] : +_.seconds;
      f("hours", Q), f("minutes", ne), e.enableSeconds && f("seconds", x);
    }
  }, d = (_, F) => {
    const Q = {
      hours: Array.isArray(t.hours) ? t.hours[_] : t.hours,
      disabledArr: []
    };
    return (F || F === 0) && (Q.hours = F), Array.isArray(e.disabledTimes) && (Q.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[_]) ? e.disabledTimes[_] : e.disabledTimes), Q;
  }, R = computed(() => (_, F) => {
    var Q;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: ne, hours: x } = d(_, F), A = ne.filter((X) => +X.hours === x);
      return ((Q = A[0]) == null ? void 0 : Q.minutes) === "*" ? { hours: [x], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (A == null ? void 0 : A.map((X) => +X.minutes)) ?? [],
        seconds: (A == null ? void 0 : A.map((X) => X.seconds ? +X.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: f,
    updateHours: m,
    updateMinutes: P,
    updateSeconds: H,
    getSetDateTime: h2,
    updateTimeValues: Y,
    getSecondsValue: c,
    assignStartTime: U,
    validateTime: v,
    disabledTimesConfig: R
  };
};
var Mr = (e, t) => {
  const l = () => {
    e.isTextInputDate && F();
  }, { modelValue: a, time: n } = xt(e, t, l), { defaultedStartTime: i, defaultedRange: c, defaultedTz: h2 } = _e(e), { updateTimeValues: f, getSetDateTime: I, setTime: v, assignStartTime: C, disabledTimesConfig: m, validateTime: P } = Un(e, n, a, H);
  function H() {
    t("update-flow-step");
  }
  const Y = (x) => {
    const { hours: A, minutes: X, seconds: O } = x;
    return { hours: +A, minutes: +X, seconds: O ? +O : 0 };
  }, U = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const A = Y(e.startTime[0]), X = Y(e.startTime[1]);
        return [set(W(), A), set(W(), X)];
      }
      const x = Y(e.startTime);
      return set(W(), x);
    }
    return c.value.enabled ? [null, null] : null;
  }, d = () => {
    if (c.value.enabled) {
      const [x, A] = U();
      a.value = [
        xe(I(x, 0), h2.value.timezone),
        xe(I(A, 1), h2.value.timezone)
      ];
    } else
      a.value = xe(I(U()), h2.value.timezone);
  }, R = (x) => Array.isArray(x) ? [Rt(W(x[0])), Rt(W(x[1]))] : [Rt(x ?? W())], _ = (x, A, X) => {
    v("hours", x), v("minutes", A), v("seconds", e.enableSeconds ? X : 0);
  }, F = () => {
    const [x, A] = R(a.value);
    return c.value.enabled ? _(
      [x.hours, A.hours],
      [x.minutes, A.minutes],
      [x.seconds, A.seconds]
    ) : _(x.hours, x.minutes, x.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return C(i.value), a.value ? F() : d();
  });
  const Q = () => {
    Array.isArray(a.value) ? a.value = a.value.map((x, A) => x && I(x, A)) : a.value = I(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: m,
    updateTime: (x, A = true, X = false) => {
      f(x, A, X, Q);
    },
    validateTime: P
  };
};
var $r = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...it
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
    const a = l, n = e, i = useSlots(), c = et(i, "timePicker"), h2 = ref(null), { time: f, modelValue: I, disabledTimesConfig: v, updateTime: C, validateTime: m } = Mr(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: I,
      time: f,
      updateTime: C
    }), toggleTimePicker: (Y, U = false, d = "") => {
      var R;
      (R = h2.value) == null || R.toggleTimePicker(Y, U, d);
    } }), (Y, U) => (openBlock(), createBlock(fa, {
      "multi-calendars": 0,
      stretch: "",
      "is-mobile": Y.isMobile
    }, {
      default: withCtx(() => [
        createVNode(Hn, mergeProps({
          ref_key: "tpRef",
          ref: h2
        }, Y.$props, {
          hours: unref(f).hours,
          minutes: unref(f).minutes,
          seconds: unref(f).seconds,
          "internal-model-value": Y.internalModelValue,
          "disabled-times-config": unref(v),
          "validate-time": unref(m),
          "onUpdate:hours": U[0] || (U[0] = (d) => unref(C)(d)),
          "onUpdate:minutes": U[1] || (U[1] = (d) => unref(C)(d, false)),
          "onUpdate:seconds": U[2] || (U[2] = (d) => unref(C)(d, false, true)),
          onAmPmChange: U[3] || (U[3] = (d) => Y.$emit("am-pm-change", d)),
          onResetFlow: U[4] || (U[4] = (d) => Y.$emit("reset-flow")),
          onOverlayClosed: U[5] || (U[5] = (d) => Y.$emit("overlay-toggle", { open: false, overlay: d })),
          onOverlayOpened: U[6] || (U[6] = (d) => Y.$emit("overlay-toggle", { open: true, overlay: d }))
        }), createSlots({ _: 2 }, [
          renderList(unref(c), (d, R) => ({
            name: d,
            fn: withCtx((_) => [
              renderSlot(Y.$slots, d, normalizeProps(guardReactiveProps(_)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }, 8, ["is-mobile"]));
  }
});
var Ar = { class: "dp--header-wrap" };
var Tr = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Sr = { key: 0 };
var Pr = { class: "dp__month_year_wrap" };
var Rr = ["data-dp-element", "aria-label", "data-test-id", "onClick", "onKeydown"];
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
    ...it
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed", "overlay-opened"],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTransitions: i,
      defaultedAriaLabels: c,
      defaultedMultiCalendars: h2,
      defaultedFilters: f,
      defaultedConfig: I,
      defaultedHighlight: v,
      propDates: C,
      defaultedUI: m
    } = _e(n), { transitionName: P, showTransition: H } = Zt(i), { buildMatrix: Y } = Mt(), { handleMonthYearChange: U, isDisabled: d, updateMonthYear: R } = Xl(n, a), { showLeftIcon: _, showRightIcon: F } = ma(), Q = ref(false), ne = ref(false), x = ref(false), A = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const X = (D) => ({
      get: () => n[D],
      set: (J) => {
        const s = D === ot.month ? ot.year : ot.month;
        a("update-month-year", { [D]: J, [s]: n[s] }), D === ot.month ? y(true) : j(true);
      }
    }), O = computed(X(ot.month)), K = computed(X(ot.year)), fe = computed(() => (D) => ({
      month: n.month,
      year: n.year,
      items: D === ot.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: R,
      toggle: D === ot.month ? y : j
    })), ve = computed(() => {
      const D = n.months.find((J) => J.value === n.month);
      return D || { text: "", value: 0 };
    }), p = computed(() => Et(n.months, (D) => {
      const J = n.month === D.value, s = Qt(
        D.value,
        Pn(n.year, C.value.minDate),
        Rn(n.year, C.value.maxDate)
      ) || f.value.months.includes(D.value), k = Yn(v.value, D.value, n.year);
      return { active: J, disabled: s, highlighted: k };
    })), N = computed(() => Et(n.years, (D) => {
      const J = n.year === D.value, s = Qt(
        D.value,
        Ft(C.value.minDate),
        Ft(C.value.maxDate)
      ) || f.value.years.includes(D.value), k = qa(v.value, D.value);
      return { active: J, disabled: s, highlighted: k };
    })), ae = (D, J, s) => {
      s !== void 0 ? D.value = s : D.value = !D.value, D.value ? (x.value = true, a("overlay-opened", J)) : (x.value = false, a("overlay-closed", J));
    }, y = (D = false, J) => {
      $(D), ae(Q, je.month, J);
    }, j = (D = false, J) => {
      $(D), ae(ne, je.year, J);
    }, $ = (D) => {
      D || a("reset-flow");
    }, g = (D, J) => {
      n.arrowNavigation && (A.value[J] = Le(D), Y(A.value, "monthYear"));
    }, ue = computed(() => {
      var D, J, s, k, E, u;
      return [
        {
          type: ot.month,
          index: 1,
          toggle: y,
          modelValue: O.value,
          updateModelValue: (te) => O.value = te,
          text: ve.value.text,
          showSelectionGrid: Q.value,
          items: p.value,
          ariaLabel: (D = c.value) == null ? void 0 : D.openMonthsOverlay,
          overlayLabel: ((s = (J = c.value).monthPicker) == null ? void 0 : s.call(J, true)) ?? void 0
        },
        {
          type: ot.year,
          index: 2,
          toggle: j,
          modelValue: K.value,
          updateModelValue: (te) => K.value = te,
          text: Sn(n.year, n.locale),
          showSelectionGrid: ne.value,
          items: N.value,
          ariaLabel: (k = c.value) == null ? void 0 : k.openYearsOverlay,
          overlayLabel: ((u = (E = c.value).yearPicker) == null ? void 0 : u.call(E, true)) ?? void 0
        }
      ];
    }), B = computed(() => n.disableYearSelect ? [ue.value[0]] : n.yearFirst ? [...ue.value].reverse() : ue.value);
    return t({
      toggleMonthPicker: y,
      toggleYearPicker: j,
      handleMonthYearChange: U
    }), (D, J) => {
      var s, k, E, u, te, ye;
      return openBlock(), createElementBlock("div", Ar, [
        D.$slots["month-year"] ? (openBlock(), createElementBlock("div", Tr, [
          renderSlot(D.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(R), handleMonthYearChange: unref(U), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          D.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Sr, [
            renderSlot(D.$slots, "top-extra", { value: D.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Pr, [
            unref(_)(unref(h2), e.instance) && !D.vertical ? (openBlock(), createBlock(Wt, {
              key: 0,
              "aria-label": (s = unref(c)) == null ? void 0 : s.prevMonth,
              disabled: unref(d)(false),
              class: normalizeClass((k = unref(m)) == null ? void 0 : k.navBtnPrev),
              "el-name": "action-prev",
              onActivate: J[0] || (J[0] = (S) => unref(U)(false, true)),
              onSetRef: J[1] || (J[1] = (S) => g(S, 0))
            }, {
              default: withCtx(() => [
                D.$slots["arrow-left"] ? renderSlot(D.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                D.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: D.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(B.value, (S, be) => (openBlock(), createElementBlock(Fragment, {
                key: S.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (L) => g(L, be + 1),
                  type: "button",
                  "data-dp-element": `overlay-${S.type}`,
                  class: normalizeClass(["dp__btn dp__month_year_select", { "dp--hidden-el": x.value }]),
                  "aria-label": `${S.text}-${S.ariaLabel}`,
                  "data-test-id": `${S.type}-toggle-overlay-${e.instance}`,
                  onClick: S.toggle,
                  onKeydown: (L) => unref(Xe)(L, () => S.toggle(), true)
                }, [
                  D.$slots[S.type] ? renderSlot(D.$slots, S.type, {
                    key: 0,
                    text: S.text,
                    value: n[S.type]
                  }) : createCommentVNode("", true),
                  D.$slots[S.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(S.text), 1)
                  ], 64))
                ], 42, Rr),
                createVNode(Transition, {
                  name: unref(P)(S.showSelectionGrid),
                  css: unref(H)
                }, {
                  default: withCtx(() => [
                    S.showSelectionGrid ? (openBlock(), createBlock(Jt, {
                      key: 0,
                      items: S.items,
                      "arrow-navigation": D.arrowNavigation,
                      "hide-navigation": D.hideNavigation,
                      "is-last": D.autoApply && !unref(I).keepActionRow,
                      "skip-button-ref": false,
                      config: D.config,
                      type: S.type,
                      "header-refs": [],
                      "esc-close": D.escClose,
                      "menu-wrap-ref": D.menuWrapRef,
                      "text-input": D.textInput,
                      "aria-labels": D.ariaLabels,
                      "overlay-label": S.overlayLabel,
                      onSelected: S.updateModelValue,
                      onToggle: S.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        D.$slots["calendar-icon"] ? renderSlot(D.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        D.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(zt), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      D.$slots[`${S.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: L }) => [
                          renderSlot(D.$slots, `${S.type}-overlay-value`, {
                            text: L.text,
                            value: L.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      D.$slots[`${S.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(D.$slots, `${S.type}-overlay`, mergeProps({ ref_for: true }, fe.value(S.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      D.$slots[`${S.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(D.$slots, `${S.type}-overlay-header`, {
                            toggle: S.toggle
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
            unref(_)(unref(h2), e.instance) && D.vertical ? (openBlock(), createBlock(Wt, {
              key: 1,
              "aria-label": (E = unref(c)) == null ? void 0 : E.prevMonth,
              "el-name": "action-prev",
              disabled: unref(d)(false),
              class: normalizeClass((u = unref(m)) == null ? void 0 : u.navBtnPrev),
              onActivate: J[2] || (J[2] = (S) => unref(U)(false, true))
            }, {
              default: withCtx(() => [
                D.$slots["arrow-up"] ? renderSlot(D.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                D.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(F)(unref(h2), e.instance) ? (openBlock(), createBlock(Wt, {
              key: 2,
              ref: "rightIcon",
              "el-name": "action-next",
              disabled: unref(d)(true),
              "aria-label": (te = unref(c)) == null ? void 0 : te.nextMonth,
              class: normalizeClass((ye = unref(m)) == null ? void 0 : ye.navBtnNext),
              onActivate: J[3] || (J[3] = (S) => unref(U)(true, true)),
              onSetRef: J[4] || (J[4] = (S) => g(S, D.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                D.$slots[D.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(D.$slots, D.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                D.$slots[D.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(D.vertical ? unref(Va) : unref(Ha)), { key: 1 }))
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
var Yr = {
  key: 0,
  class: "dp__calendar_item dp__week_num",
  role: "gridcell"
};
var Ir = { class: "dp__cell_inner" };
var Nr = ["id", "aria-pressed", "aria-disabled", "aria-label", "tabindex", "data-test-id", "onClick", "onTouchend", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Er = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...it
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
    const a = l, n = e, { buildMultiLevelMatrix: i } = Mt(), {
      defaultedTransitions: c,
      defaultedConfig: h2,
      defaultedAriaLabels: f,
      defaultedMultiCalendars: I,
      defaultedWeekNumbers: v,
      defaultedMultiDates: C,
      defaultedUI: m
    } = _e(n), P = ref(null), H = ref({
      bottom: "",
      left: "",
      transform: ""
    }), Y = ref([]), U = ref(null), d = ref(true), R = ref(""), _ = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), F = ref([]), Q = ref({ left: "50%" }), ne = ref(false), x = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), A = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : gl(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: Y }), h2.value.noSwipe || U.value && (U.value.addEventListener("touchstart", g, { passive: false }), U.value.addEventListener("touchend", ue, { passive: false }), U.value.addEventListener("touchmove", B, { passive: false })), n.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", s, { passive: false });
    });
    const X = (S) => S ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", O = (S, be) => {
      if (n.transitions) {
        const L = Je(pt(W(), n.month, n.year));
        R.value = Ne(Je(pt(W(), S, be)), L) ? c.value[X(true)] : c.value[X(false)], d.value = false, nextTick(() => {
          d.value = true;
        });
      }
    }, K = computed(
      () => ({
        ...m.value.calendar ?? {}
      })
    ), fe = computed(() => (S) => {
      const be = bl(S);
      return {
        dp__marker_dot: be.type === "dot",
        dp__marker_line: be.type === "line"
      };
    }), ve = computed(() => (S) => Ae(S, P.value)), p = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: I.value.count > 0 && n.instance !== 0
    })), N = computed(() => (S) => n.hideOffsetDates ? S.current : true), ae = async (S, be) => {
      const { width: L, height: se } = S.getBoundingClientRect();
      P.value = be.value;
      let r = { left: `${L / 2}px` }, le = -50;
      if (await nextTick(), F.value[0]) {
        const { left: ie, width: re } = F.value[0].getBoundingClientRect();
        ie < 0 && (r = { left: "0" }, le = 0, Q.value.left = `${L / 2}px`), window.innerWidth < ie + re && (r = { right: "0" }, le = 0, Q.value.left = `${re - L / 2}px`);
      }
      H.value = {
        bottom: `${se}px`,
        ...r,
        transform: `translateX(${le}%)`
      };
    }, y = async (S, be, L) => {
      var r, le, ie;
      const se = Le(Y.value[be][L]);
      se && ((r = S.marker) != null && r.customPosition && ((ie = (le = S.marker) == null ? void 0 : le.tooltip) != null && ie.length) ? H.value = S.marker.customPosition(se) : await ae(se, S), a("tooltip-open", S.marker));
    }, j = async (S, be, L) => {
      var se, r;
      if (ne.value && C.value.enabled && C.value.dragSelect)
        return a("select-date", S);
      if (a("set-hover-date", S), (r = (se = S.marker) == null ? void 0 : se.tooltip) != null && r.length) {
        if (n.hideOffsetDates && !S.current) return;
        await y(S, be, L);
      }
    }, $ = (S) => {
      P.value && (P.value = null, H.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", S.marker));
    }, g = (S) => {
      _.value.startX = S.changedTouches[0].screenX, _.value.startY = S.changedTouches[0].screenY;
    }, ue = (S) => {
      _.value.endX = S.changedTouches[0].screenX, _.value.endY = S.changedTouches[0].screenY, D();
    }, B = (S) => {
      n.vertical && !n.inline && S.preventDefault();
    }, D = () => {
      const S = n.vertical ? "Y" : "X";
      Math.abs(_.value[`start${S}`] - _.value[`end${S}`]) > 10 && a("handle-swipe", _.value[`start${S}`] > _.value[`end${S}`] ? "right" : "left");
    }, J = (S, be, L) => {
      S && (Array.isArray(Y.value[be]) ? Y.value[be][L] = S : Y.value[be] = [S]), n.arrowNavigation && i(Y.value, "calendar");
    }, s = (S) => {
      n.monthChangeOnScroll && (S.preventDefault(), a("handle-scroll", S));
    }, k = (S) => v.value.type === "local" ? getWeek(S.value, { weekStartsOn: +n.weekStart }) : v.value.type === "iso" ? getISOWeek(S.value) : typeof v.value.type == "function" ? v.value.type(S.value) : "", E = (S) => {
      const be = S[0];
      return v.value.hideOnOffsetDates ? S.some((L) => L.current) ? k(be) : "" : k(be);
    }, u = (S, be, L = true) => {
      L && sn() || !L && !sn() || (!C.value.enabled || h2.value.allowPreventDefault) && (kt(S, h2.value), a("select-date", be));
    }, te = (S) => {
      kt(S, h2.value);
    }, ye = (S) => {
      C.value.enabled && C.value.dragSelect ? (ne.value = true, a("select-date", S)) : C.value.enabled && a("select-date", S);
    };
    return t({ triggerTransition: O }), (S, be) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(p.value)
    }, [
      createBaseVNode("div", {
        ref_key: "calendarWrapRef",
        ref: U,
        class: normalizeClass(K.value),
        role: "grid"
      }, [
        createBaseVNode("div", Or, [
          S.weekNumbers ? (openBlock(), createElementBlock("div", _r, toDisplayString(S.weekNumName), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(A.value, (L, se) => {
            var r, le;
            return openBlock(), createElementBlock("div", {
              key: se,
              class: "dp__calendar_header_item",
              role: "gridcell",
              "data-test-id": "calendar-header",
              "aria-label": (le = (r = unref(f)) == null ? void 0 : r.weekDay) == null ? void 0 : le.call(r, se)
            }, [
              S.$slots["calendar-header"] ? renderSlot(S.$slots, "calendar-header", {
                key: 0,
                day: L,
                index: se
              }) : createCommentVNode("", true),
              S.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(L), 1)
              ], 64))
            ], 8, Br);
          }), 128))
        ]),
        be[2] || (be[2] = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1)),
        createVNode(Transition, {
          name: R.value,
          css: !!S.transitions
        }, {
          default: withCtx(() => [
            d.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: be[1] || (be[1] = (L) => ne.value = false)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(x.value, (L, se) => (openBlock(), createElementBlock("div", {
                key: se,
                class: "dp__calendar_row",
                role: "row"
              }, [
                S.weekNumbers ? (openBlock(), createElementBlock("div", Yr, [
                  createBaseVNode("div", Ir, toDisplayString(E(L.days)), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(L.days, (r, le) => {
                  var ie, re, Te;
                  return openBlock(), createElementBlock("div", {
                    id: unref(In)(r.value),
                    ref_for: true,
                    ref: (ke) => J(ke, se, le),
                    key: le + se,
                    role: "gridcell",
                    class: "dp__calendar_item",
                    "aria-pressed": (r.classData.dp__active_date || r.classData.dp__range_start || r.classData.dp__range_start) ?? void 0,
                    "aria-disabled": r.classData.dp__cell_disabled || void 0,
                    "aria-label": (re = (ie = unref(f)) == null ? void 0 : ie.day) == null ? void 0 : re.call(ie, r),
                    tabindex: !r.current && S.hideOffsetDates ? void 0 : 0,
                    "data-test-id": r.value,
                    onClick: withModifiers((ke) => u(ke, r), ["prevent"]),
                    onTouchend: (ke) => u(ke, r, false),
                    onKeydown: (ke) => unref(Xe)(ke, () => S.$emit("select-date", r)),
                    onMouseenter: (ke) => j(r, se, le),
                    onMouseleave: (ke) => $(r),
                    onMousedown: (ke) => ye(r),
                    onMouseup: be[0] || (be[0] = (ke) => ne.value = false)
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__cell_inner", r.classData])
                    }, [
                      S.$slots.day && N.value(r) ? renderSlot(S.$slots, "day", {
                        key: 0,
                        day: +r.text,
                        date: r.value
                      }) : createCommentVNode("", true),
                      S.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(r.text), 1)
                      ], 64)),
                      r.marker && N.value(r) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        S.$slots.marker ? renderSlot(S.$slots, "marker", {
                          key: 0,
                          marker: r.marker,
                          day: +r.text,
                          date: r.value
                        }) : (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(fe.value(r.marker)),
                          style: normalizeStyle(r.marker.color ? { backgroundColor: r.marker.color } : {})
                        }, null, 6))
                      ], 64)) : createCommentVNode("", true),
                      ve.value(r.value) ? (openBlock(), createElementBlock("div", {
                        key: 3,
                        ref_for: true,
                        ref_key: "activeTooltip",
                        ref: F,
                        class: "dp__marker_tooltip",
                        style: normalizeStyle(H.value)
                      }, [
                        (Te = r.marker) != null && Te.tooltip ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: "dp__tooltip_content",
                          onClick: te
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(r.marker.tooltip, (ke, w) => (openBlock(), createElementBlock("div", {
                            key: w,
                            class: "dp__tooltip_text"
                          }, [
                            S.$slots["marker-tooltip"] ? renderSlot(S.$slots, "marker-tooltip", {
                              key: 0,
                              tooltip: ke,
                              day: r.value
                            }) : createCommentVNode("", true),
                            S.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("div", {
                                class: "dp__tooltip_mark",
                                style: normalizeStyle(ke.color ? { backgroundColor: ke.color } : {})
                              }, null, 4),
                              createBaseVNode("div", null, toDisplayString(ke.text), 1)
                            ], 64))
                          ]))), 128)),
                          createBaseVNode("div", {
                            class: "dp__arrow_bottom_tp",
                            style: normalizeStyle(Q.value)
                          }, null, 4)
                        ])) : createCommentVNode("", true)
                      ], 4)) : createCommentVNode("", true)
                    ], 2)
                  ], 40, Nr);
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
var Fr = (e, t, l, a) => {
  const n = ref([]), i = ref(/* @__PURE__ */ new Date()), c = ref(), h2 = () => g(e.isTextInputDate), { modelValue: f, calendars: I, time: v, today: C } = xt(e, t, h2), {
    defaultedMultiCalendars: m,
    defaultedStartTime: P,
    defaultedRange: H,
    defaultedConfig: Y,
    defaultedTz: U,
    propDates: d,
    defaultedMultiDates: R
  } = _e(e), { validateMonthYearInRange: _, isDisabled: F, isDateRangeAllowed: Q, checkMinMaxRange: ne } = $t(e), { updateTimeValues: x, getSetDateTime: A, setTime: X, assignStartTime: O, validateTime: K, disabledTimesConfig: fe } = Un(e, v, f, a), ve = computed(
    () => (b) => I.value[b] ? I.value[b].month : 0
  ), p = computed(
    () => (b) => I.value[b] ? I.value[b].year : 0
  ), N = (b) => !Y.value.keepViewOnOffsetClick || b ? true : !c.value, ae = (b, oe, M, Z = false) => {
    var de, Qe;
    N(Z) && (I.value[b] || (I.value[b] = { month: 0, year: 0 }), I.value[b].month = on(oe) ? (de = I.value[b]) == null ? void 0 : de.month : oe, I.value[b].year = on(M) ? (Qe = I.value[b]) == null ? void 0 : Qe.year : M);
  }, y = () => {
    e.autoApply && t("select-date");
  };
  onMounted(() => {
    e.shadow || (f.value || (S(), P.value && O(P.value)), g(true), e.focusStartDate && e.startDate && S());
  });
  const j = computed(() => {
    var b;
    return (b = e.flow) != null && b.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), $ = () => {
    e.autoApply && j.value && t("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : false);
  }, g = (b = false) => {
    if (f.value)
      return Array.isArray(f.value) ? (n.value = f.value, E(b)) : D(f.value, b);
    if (m.value.count && b && !e.startDate)
      return B(W(), b);
  }, ue = () => Array.isArray(f.value) && H.value.enabled ? getMonth(f.value[0]) === getMonth(f.value[1] ?? f.value[0]) : false, B = (b = /* @__PURE__ */ new Date(), oe = false) => {
    if ((!m.value.count || !m.value.static || oe) && ae(0, getMonth(b), getYear(b)), m.value.count && (!f.value || ue() || !m.value.solo) && (!m.value.solo || oe))
      for (let M = 1; M < m.value.count; M++) {
        const Z = set(W(), { month: ve.value(M - 1), year: p.value(M - 1) }), de = add(Z, { months: 1 });
        I.value[M] = { month: getMonth(de), year: getYear(de) };
      }
  }, D = (b, oe) => {
    B(b), X("hours", getHours(b)), X("minutes", getMinutes(b)), X("seconds", getSeconds(b)), m.value.count && oe && ye();
  }, J = (b) => {
    if (m.value.count) {
      if (m.value.solo) return 0;
      const oe = getMonth(b[0]), M = getMonth(b[1]);
      return Math.abs(M - oe) < m.value.count ? 0 : 1;
    }
    return 1;
  }, s = (b, oe) => {
    b[1] && H.value.showLastInRange ? B(b[J(b)], oe) : B(b[0], oe);
    const M = (Z, de) => [
      Z(b[0]),
      b[1] ? Z(b[1]) : v[de][1]
    ];
    X("hours", M(getHours, "hours")), X("minutes", M(getMinutes, "minutes")), X("seconds", M(getSeconds, "seconds"));
  }, k = (b, oe) => {
    if ((H.value.enabled || e.weekPicker) && !R.value.enabled)
      return s(b, oe);
    if (R.value.enabled && oe) {
      const M = b[b.length - 1];
      return D(M, oe);
    }
  }, E = (b) => {
    const oe = f.value;
    k(oe, b), m.value.count && m.value.solo && ye();
  }, u = (b, oe) => {
    const M = set(W(), { month: ve.value(oe), year: p.value(oe) }), Z = b < 0 ? addMonths(M, 1) : subMonths(M, 1);
    _(getMonth(Z), getYear(Z), b < 0, e.preventMinMaxNavigation) && (ae(oe, getMonth(Z), getYear(Z)), t("update-month-year", { instance: oe, month: getMonth(Z), year: getYear(Z) }), m.value.count && !m.value.solo && te(oe), l());
  }, te = (b) => {
    for (let oe = b - 1; oe >= 0; oe--) {
      const M = subMonths(set(W(), { month: ve.value(oe + 1), year: p.value(oe + 1) }), 1);
      ae(oe, getMonth(M), getYear(M));
    }
    for (let oe = b + 1; oe <= m.value.count - 1; oe++) {
      const M = addMonths(set(W(), { month: ve.value(oe - 1), year: p.value(oe - 1) }), 1);
      ae(oe, getMonth(M), getYear(M));
    }
  }, ye = () => {
    if (Array.isArray(f.value) && f.value.length === 2) {
      const b = W(
        W(f.value[1] ? f.value[1] : addMonths(f.value[0], 1))
      ), [oe, M] = [getMonth(f.value[0]), getYear(f.value[0])], [Z, de] = [getMonth(f.value[1]), getYear(f.value[1])];
      (oe !== Z || oe === Z && M !== de) && m.value.solo && ae(1, getMonth(b), getYear(b));
    } else f.value && !Array.isArray(f.value) && (ae(0, getMonth(f.value), getYear(f.value)), B(W()));
  }, S = () => {
    e.startDate && (ae(0, getMonth(W(e.startDate)), getYear(W(e.startDate))), m.value.count && te(0));
  }, be = (b, oe) => {
    if (e.monthChangeOnScroll) {
      const M = (/* @__PURE__ */ new Date()).getTime() - i.value.getTime(), Z = Math.abs(b.deltaY);
      let de = 500;
      Z > 1 && (de = 100), Z > 100 && (de = 0), M > de && (i.value = /* @__PURE__ */ new Date(), u(e.monthChangeOnScroll !== "inverse" ? -b.deltaY : b.deltaY, oe));
    }
  }, L = (b, oe, M = false) => {
    e.monthChangeOnArrows && e.vertical === M && se(b, oe);
  }, se = (b, oe) => {
    u(b === "right" ? -1 : 1, oe);
  }, r = (b) => {
    if (d.value.markers)
      return ua(b.value, d.value.markers);
  }, le = (b, oe) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [b == 0, true];
      case "fair":
        return [b == 0 || oe > b, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, ie = (b, oe, M, Z) => {
    if (e.sixWeeks && b.length < 6) {
      const de = 6 - b.length, Qe = (oe.getDay() + 7 - Z) % 7, Ot = 6 - (M.getDay() + 7 - Z) % 7, [Ht, Da] = le(Qe, Ot);
      for (let At = 1; At <= de; At++)
        if (Da ? !!(At % 2) == Ht : Ht) {
          const ta = b[0].days[0], Ma = re(addDays(ta.value, -7), getMonth(oe));
          b.unshift({ days: Ma });
        } else {
          const ta = b[b.length - 1], Ma = ta.days[ta.days.length - 1], jn = re(addDays(Ma.value, 1), getMonth(oe));
          b.push({ days: jn });
        }
    }
    return b;
  }, re = (b, oe) => {
    const M = W(b), Z = [];
    for (let de = 0; de < 7; de++) {
      const Qe = addDays(M, de), rt = getMonth(Qe) !== oe;
      Z.push({
        text: e.hideOffsetDates && rt ? "" : Qe.getDate(),
        value: Qe,
        current: !rt,
        classData: {}
      });
    }
    return Z;
  }, Te = (b, oe) => {
    const M = [], Z = new Date(oe, b), de = new Date(oe, b + 1, 0), Qe = e.weekStart, rt = startOfWeek(Z, { weekStartsOn: Qe }), Ot = (Ht) => {
      const Da = re(Ht, b);
      if (M.push({ days: Da }), !M[M.length - 1].days.some(
        (At) => Ae(Je(At.value), Je(de))
      )) {
        const At = addDays(Ht, 7);
        Ot(At);
      }
    };
    return Ot(rt), ie(M, Z, de, Qe);
  }, ke = (b) => {
    const oe = wt(W(b.value), v.hours, v.minutes, ct());
    t("date-update", oe), R.value.enabled ? Xa(oe, f, R.value.limit) : f.value = oe, a(), nextTick().then(() => {
      $();
    });
  }, w = (b) => H.value.noDisabledRange ? Cn(n.value[0], b).some((M) => F(M)) : false, z = () => {
    n.value = f.value ? f.value.slice() : [], n.value.length === 2 && !(H.value.fixedStart || H.value.fixedEnd) && (n.value = []);
  }, ge = (b, oe) => {
    const M = [
      W(b.value),
      addDays(W(b.value), +H.value.autoRange)
    ];
    Q(M) ? (oe && Fe(b.value), n.value = M) : t("invalid-date", b.value);
  }, Fe = (b) => {
    const oe = getMonth(W(b)), M = getYear(W(b));
    if (ae(0, oe, M), m.value.count > 0)
      for (let Z = 1; Z < m.value.count; Z++) {
        const de = Tl(
          set(W(b), { year: p.value(Z - 1), month: ve.value(Z - 1) })
        );
        ae(Z, de.month, de.year);
      }
  }, dt = (b) => {
    if (w(b.value) || !ne(b.value, f.value, H.value.fixedStart ? 0 : 1))
      return t("invalid-date", b.value);
    n.value = Ln(W(b.value), f, t, H);
  }, me = (b, oe) => {
    if (z(), H.value.autoRange) return ge(b, oe);
    if (H.value.fixedStart || H.value.fixedEnd) return dt(b);
    n.value[0] ? ne(W(b.value), f.value) && !w(b.value) ? Be(W(b.value), W(n.value[0])) ? (n.value.unshift(W(b.value)), t("range-end", n.value[0])) : (n.value[1] = W(b.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", b.value), t("invalid-date", b.value)) : (n.value[0] = W(b.value), t("range-start", n.value[0]));
  }, ct = (b = true) => e.enableSeconds ? Array.isArray(v.seconds) ? b ? v.seconds[0] : v.seconds[1] : v.seconds : 0, Ye = (b) => {
    n.value[b] = wt(
      n.value[b],
      v.hours[b],
      v.minutes[b],
      ct(b !== 1)
    );
  }, pa = () => {
    var b, oe;
    n.value[0] && n.value[1] && +((b = n.value) == null ? void 0 : b[0]) > +((oe = n.value) == null ? void 0 : oe[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, ya = () => {
    n.value.length && (n.value[0] && !n.value[1] ? Ye(0) : (Ye(0), Ye(1), a()), pa(), f.value = n.value.slice(), va(n.value, t, e.autoApply, e.modelAuto));
  }, ea = (b, oe = false) => {
    if (F(b.value) || !b.current && e.hideOffsetDates) return t("invalid-date", b.value);
    if (c.value = JSON.parse(JSON.stringify(b)), !H.value.enabled) return ke(b);
    vn(v.hours) && vn(v.minutes) && !R.value.enabled && (me(b, oe), ya());
  }, ga = (b, oe) => {
    var Z;
    ae(b, oe.month, oe.year, true), m.value.count && !m.value.solo && te(b), t("update-month-year", { instance: b, month: oe.month, year: oe.year }), l(m.value.solo ? b : void 0);
    const M = (Z = e.flow) != null && Z.length ? e.flow[e.flowStep] : void 0;
    !oe.fromNav && (M === je.month || M === je.year) && a();
  }, ha = (b, oe) => {
    Fn({
      value: b,
      modelValue: f,
      range: H.value.enabled,
      timezone: oe ? void 0 : U.value.timezone
    }), y(), e.multiCalendars && nextTick().then(() => g(true));
  }, ba = () => {
    const b = ja(W(), U.value);
    !H.value.enabled && !R.value.enabled ? f.value = b : f.value && Array.isArray(f.value) && f.value[0] ? R.value.enabled ? f.value = [...f.value, b] : f.value = Be(b, f.value[0]) ? [b, f.value[0]] : [f.value[0], b] : f.value = [b], y();
  }, ka = () => {
    if (Array.isArray(f.value))
      if (R.value.enabled) {
        const b = wa();
        f.value[f.value.length - 1] = A(b);
      } else
        f.value = f.value.map((b, oe) => b && A(b, oe));
    else
      f.value = A(f.value);
    t("time-update");
  }, wa = () => Array.isArray(f.value) && f.value.length ? f.value[f.value.length - 1] : null;
  return {
    calendars: I,
    modelValue: f,
    month: ve,
    year: p,
    time: v,
    disabledTimesConfig: fe,
    today: C,
    validateTime: K,
    getCalendarDays: Te,
    getMarker: r,
    handleScroll: be,
    handleSwipe: se,
    handleArrow: L,
    selectDate: ea,
    updateMonthYear: ga,
    presetDate: ha,
    selectCurrentDate: ba,
    updateTime: (b, oe = true, M = false) => {
      x(b, oe, M, ka);
    },
    assignMonthAndYear: B
  };
};
var Lr = { key: 0 };
var zr = defineComponent({
  __name: "DatePicker",
  props: {
    ...it
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
      year: h2,
      modelValue: f,
      time: I,
      disabledTimesConfig: v,
      today: C,
      validateTime: m,
      getCalendarDays: P,
      getMarker: H,
      handleArrow: Y,
      handleScroll: U,
      handleSwipe: d,
      selectDate: R,
      updateMonthYear: _,
      presetDate: F,
      selectCurrentDate: Q,
      updateTime: ne,
      assignMonthAndYear: x
    } = Fr(n, a, ue, B), A = useSlots(), { setHoverDate: X, getDayClassData: O, clearHoverDate: K } = no(f, n), { defaultedMultiCalendars: fe } = _e(n), ve = ref([]), p = ref([]), N = ref(null), ae = et(A, "calendar"), y = et(A, "monthYear"), j = et(A, "timePicker"), $ = (L) => {
      n.shadow || a("mount", L);
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
      fe,
      (L, se) => {
        L.count - se.count > 0 && x();
      },
      { deep: true }
    );
    const g = computed(() => (L) => P(c.value(L), h2.value(L)).map((se) => ({
      ...se,
      days: se.days.map((r) => (r.marker = H(r), r.classData = O(r), r))
    })));
    function ue(L) {
      var se;
      L || L === 0 ? (se = p.value[L]) == null || se.triggerTransition(c.value(L), h2.value(L)) : p.value.forEach((r, le) => r.triggerTransition(c.value(le), h2.value(le)));
    }
    function B() {
      a("update-flow-step");
    }
    const D = (L, se = false) => {
      R(L, se), n.spaceConfirm && a("select-date");
    }, J = (L, se, r = 0) => {
      var le;
      (le = ve.value[r]) == null || le.toggleMonthPicker(L, se);
    }, s = (L, se, r = 0) => {
      var le;
      (le = ve.value[r]) == null || le.toggleYearPicker(L, se);
    }, k = (L, se, r) => {
      var le;
      (le = N.value) == null || le.toggleTimePicker(L, se, r);
    }, E = (L, se) => {
      var r;
      if (!n.range) {
        const le = f.value ? f.value : C, ie = se ? new Date(se) : le, re = L ? startOfWeek(ie, { weekStartsOn: 1 }) : endOfWeek(ie, { weekStartsOn: 1 });
        R({
          value: re,
          current: getMonth(ie) === c.value(0),
          text: "",
          classData: {}
        }), (r = document.getElementById(In(re))) == null || r.focus();
      }
    }, u = (L) => {
      var se;
      (se = ve.value[0]) == null || se.handleMonthYearChange(L, true);
    }, te = (L) => {
      _(0, { month: c.value(0), year: h2.value(0) + (L ? 1 : -1), fromNav: true });
    }, ye = (L, se) => {
      L === je.time && a(`time-picker-${se ? "open" : "close"}`), a("overlay-toggle", { open: se, overlay: L });
    }, S = (L) => {
      a("overlay-toggle", { open: false, overlay: L }), a("focus-menu");
    };
    return t({
      clearHoverDate: K,
      presetDate: F,
      selectCurrentDate: Q,
      toggleMonthPicker: J,
      toggleYearPicker: s,
      toggleTimePicker: k,
      handleArrow: Y,
      updateMonthYear: _,
      getSidebarProps: () => ({
        modelValue: f,
        month: c,
        year: h2,
        time: I,
        updateTime: ne,
        updateMonthYear: _,
        selectDate: R,
        presetDate: F
      }),
      changeMonth: u,
      changeYear: te,
      selectWeekDate: E
    }), (L, se) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(fa, {
        "multi-calendars": unref(fe).count,
        collapse: L.collapse,
        "is-mobile": L.isMobile
      }, {
        default: withCtx(({ instance: r, index: le }) => [
          L.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Cr, mergeProps({
            key: 0,
            ref: (ie) => {
              ie && (ve.value[le] = ie);
            },
            months: unref($n)(L.formatLocale, L.locale, L.monthNameFormat),
            years: unref(Ka)(L.yearRange, L.locale, L.reverseYears),
            month: unref(c)(r),
            year: unref(h2)(r),
            instance: r
          }, L.$props, {
            onMount: se[0] || (se[0] = (ie) => $(unref(Pt).header)),
            onResetFlow: se[1] || (se[1] = (ie) => L.$emit("reset-flow")),
            onUpdateMonthYear: (ie) => unref(_)(r, ie),
            onOverlayClosed: S,
            onOverlayOpened: se[2] || (se[2] = (ie) => L.$emit("overlay-toggle", { open: true, overlay: ie }))
          }), createSlots({ _: 2 }, [
            renderList(unref(y), (ie, re) => ({
              name: ie,
              fn: withCtx((Te) => [
                renderSlot(L.$slots, ie, normalizeProps(guardReactiveProps(Te)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Er, mergeProps({
            ref: (ie) => {
              ie && (p.value[le] = ie);
            },
            "mapped-dates": g.value(r),
            month: unref(c)(r),
            year: unref(h2)(r),
            instance: r
          }, L.$props, {
            onSelectDate: (ie) => unref(R)(ie, r !== 1),
            onHandleSpace: (ie) => D(ie, r !== 1),
            onSetHoverDate: se[3] || (se[3] = (ie) => unref(X)(ie)),
            onHandleScroll: (ie) => unref(U)(ie, r),
            onHandleSwipe: (ie) => unref(d)(ie, r),
            onMount: se[4] || (se[4] = (ie) => $(unref(Pt).calendar)),
            onResetFlow: se[5] || (se[5] = (ie) => L.$emit("reset-flow")),
            onTooltipOpen: se[6] || (se[6] = (ie) => L.$emit("tooltip-open", ie)),
            onTooltipClose: se[7] || (se[7] = (ie) => L.$emit("tooltip-close", ie))
          }), createSlots({ _: 2 }, [
            renderList(unref(ae), (ie, re) => ({
              name: ie,
              fn: withCtx((Te) => [
                renderSlot(L.$slots, ie, normalizeProps(guardReactiveProps({ ...Te })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse", "is-mobile"]),
      L.enableTimePicker ? (openBlock(), createElementBlock("div", Lr, [
        L.$slots["time-picker"] ? renderSlot(L.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(I), updateTime: unref(ne) }))) : (openBlock(), createBlock(Hn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: N
        }, L.$props, {
          hours: unref(I).hours,
          minutes: unref(I).minutes,
          seconds: unref(I).seconds,
          "internal-model-value": L.internalModelValue,
          "disabled-times-config": unref(v),
          "validate-time": unref(m),
          onMount: se[8] || (se[8] = (r) => $(unref(Pt).timePicker)),
          "onUpdate:hours": se[9] || (se[9] = (r) => unref(ne)(r)),
          "onUpdate:minutes": se[10] || (se[10] = (r) => unref(ne)(r, false)),
          "onUpdate:seconds": se[11] || (se[11] = (r) => unref(ne)(r, false, true)),
          onResetFlow: se[12] || (se[12] = (r) => L.$emit("reset-flow")),
          onOverlayClosed: se[13] || (se[13] = (r) => ye(r, false)),
          onOverlayOpened: se[14] || (se[14] = (r) => ye(r, true)),
          onAmPmChange: se[15] || (se[15] = (r) => L.$emit("am-pm-change", r))
        }), createSlots({ _: 2 }, [
          renderList(unref(j), (r, le) => ({
            name: r,
            fn: withCtx((ie) => [
              renderSlot(L.$slots, r, normalizeProps(guardReactiveProps(ie)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Hr = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: a,
    defaultedConfig: n,
    defaultedHighlight: i,
    defaultedRange: c,
    propDates: h2,
    defaultedFilters: f,
    defaultedMultiDates: I
  } = _e(e), { modelValue: v, year: C, month: m, calendars: P } = xt(e, t), { isDisabled: H } = $t(e), { selectYear: Y, groupedYears: U, showYearPicker: d, isDisabled: R, toggleYearPicker: _, handleYearSelect: F, handleYear: Q } = zn({
    modelValue: v,
    multiCalendars: a,
    range: c,
    highlight: i,
    calendars: P,
    propDates: h2,
    month: m,
    year: C,
    filters: f,
    props: e,
    emit: t
  }), ne = (y, j) => [y, j].map(($) => format($, "MMMM", { locale: e.formatLocale })).join("-"), x = computed(() => (y) => v.value ? Array.isArray(v.value) ? v.value.some((j) => isSameQuarter(y, j)) : isSameQuarter(v.value, y) : false), A = (y) => {
    if (c.value.enabled) {
      if (Array.isArray(v.value)) {
        const j = Ae(y, v.value[0]) || Ae(y, v.value[1]);
        return da(v.value, l.value, y) && !j;
      }
      return false;
    }
    return false;
  }, X = (y, j) => y.quarter === getQuarter(j) && y.year === getYear(j), O = (y) => typeof i.value == "function" ? i.value({ quarter: getQuarter(y), year: getYear(y) }) : !!i.value.quarters.find((j) => X(j, y)), K = computed(() => (y) => {
    const j = set(/* @__PURE__ */ new Date(), { year: C.value(y) });
    return eachQuarterOfInterval({
      start: startOfYear(j),
      end: endOfYear(j)
    }).map(($) => {
      const g = startOfQuarter($), ue = endOfQuarter($), B = H($), D = A(g), J = O(g);
      return {
        text: ne(g, ue),
        value: g,
        active: x.value(g),
        highlighted: J,
        disabled: B,
        isBetween: D
      };
    });
  }), fe = (y) => {
    Xa(y, v, I.value.limit), t("auto-apply", true);
  }, ve = (y) => {
    v.value = Ja(v, y, t), va(v.value, t, e.autoApply, e.modelAuto);
  }, p = (y) => {
    v.value = y, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: U,
    year: C,
    isDisabled: R,
    quarters: K,
    showYearPicker: d,
    modelValue: v,
    setHoverDate: (y) => {
      l.value = y;
    },
    selectYear: Y,
    selectQuarter: (y, j, $) => {
      if (!$)
        return P.value[j].month = getMonth(endOfQuarter(y)), I.value.enabled ? fe(y) : c.value.enabled ? ve(y) : p(y);
    },
    toggleYearPicker: _,
    handleYearSelect: F,
    handleYear: Q
  };
};
var Ur = { class: "dp--quarter-items" };
var Wr = ["data-test-id", "disabled", "onClick", "onMouseover"];
var Vr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...it
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
    const a = l, n = e, i = useSlots(), c = et(i, "yearMode"), {
      defaultedMultiCalendars: h2,
      defaultedConfig: f,
      groupedYears: I,
      year: v,
      isDisabled: C,
      quarters: m,
      modelValue: P,
      showYearPicker: H,
      setHoverDate: Y,
      selectQuarter: U,
      toggleYearPicker: d,
      handleYearSelect: R,
      handleYear: _
    } = Hr(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: P,
      year: v,
      selectQuarter: U,
      handleYearSelect: R,
      handleYear: _
    }) }), (Q, ne) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(h2).count,
      collapse: Q.collapse,
      stretch: "",
      "is-mobile": Q.isMobile
    }, {
      default: withCtx(({ instance: x }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(f).modeHeight}px` })
        }, [
          Q.$slots["top-extra"] ? renderSlot(Q.$slots, "top-extra", {
            key: 0,
            value: Q.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(En, mergeProps(Q.$props, {
              items: unref(I)(x),
              instance: x,
              "show-year-picker": unref(H)[x],
              year: unref(v)(x),
              "is-disabled": (A) => unref(C)(x, A),
              onHandleYear: (A) => unref(_)(x, A),
              onYearSelect: (A) => unref(R)(A, x),
              onToggleYearPicker: (A) => unref(d)(x, A == null ? void 0 : A.flow, A == null ? void 0 : A.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(c), (A, X) => ({
                name: A,
                fn: withCtx((O) => [
                  renderSlot(Q.$slots, A, normalizeProps(guardReactiveProps(O)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Ur, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(m)(x), (A, X) => (openBlock(), createElementBlock("div", { key: X }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": A.active,
                  "dp--qr-btn-between": A.isBetween,
                  "dp--qr-btn-disabled": A.disabled,
                  "dp--highlighted": A.highlighted
                }]),
                "data-test-id": A.value,
                disabled: A.disabled,
                onClick: (O) => unref(U)(A.value, x, A.disabled),
                onMouseover: (O) => unref(Y)(A.value)
              }, [
                Q.$slots.quarter ? renderSlot(Q.$slots, "quarter", {
                  key: 0,
                  value: A.value,
                  text: A.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(A.text), 1)
                ], 64))
              ], 42, Wr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse", "is-mobile"]));
  }
});
var Wn = (e, t) => {
  const l = ref(0);
  onMounted(() => {
    a(), window.addEventListener("resize", a, { passive: true });
  }), onUnmounted(() => {
    window.removeEventListener("resize", a);
  });
  const a = () => {
    l.value = window.document.documentElement.clientWidth;
  };
  return {
    isMobile: computed(
      () => l.value <= e.value.mobileBreakpoint && !t ? true : void 0
    )
  };
};
var jr = ["id", "tabindex", "role", "aria-label"];
var Kr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Gr = {
  key: 1,
  class: "dp--menu-header"
};
var Qr = ["data-dp-mobile"];
var qr = {
  key: 0,
  class: "dp__sidebar_left"
};
var Xr = ["data-dp-mobile"];
var Jr = ["data-test-id", "data-dp-mobile", "onClick", "onKeydown"];
var Zr = {
  key: 2,
  class: "dp__sidebar_right"
};
var xr = {
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
    "overlay-toggle",
    "menu-blur"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = ref(null), c = computed(() => {
      const { openOnTop: w, ...z } = n;
      return {
        ...z,
        isMobile: Y.value,
        flowStep: K.value,
        menuWrapRef: i.value
      };
    }), { setMenuFocused: h2, setShiftKey: f, control: I } = Nn(), v = useSlots(), { defaultedTextInput: C, defaultedInline: m, defaultedConfig: P, defaultedUI: H } = _e(n), { isMobile: Y } = Wn(P, n.shadow), U = ref(null), d = ref(0), R = ref(null), _ = ref(false), F = ref(null), Q = ref(false);
    onMounted(() => {
      if (!n.shadow) {
        _.value = true, ne(), window.addEventListener("resize", ne);
        const w = Le(i);
        if (w && !C.value.enabled && !m.value.enabled && (h2(true), j()), w) {
          const z = (ge) => {
            Q.value = true, P.value.allowPreventDefault && ge.preventDefault(), kt(ge, P.value, true);
          };
          w.addEventListener("pointerdown", z), w.addEventListener("mousedown", z);
        }
      }
      document.addEventListener("mousedown", ke);
    }), onUnmounted(() => {
      window.removeEventListener("resize", ne), document.addEventListener("mousedown", ke);
    });
    const ne = () => {
      const w = Le(R);
      w && (d.value = w.getBoundingClientRect().width);
    }, { arrowRight: x, arrowLeft: A, arrowDown: X, arrowUp: O } = Mt(), { flowStep: K, updateFlowStep: fe, childMount: ve, resetFlow: p, handleFlow: N } = lo(n, a, F), ae = computed(() => n.monthPicker ? ur : n.yearPicker ? dr : n.timePicker ? $r : n.quarterPicker ? Vr : zr), y = computed(() => {
      var ge;
      if (P.value.arrowLeft) return P.value.arrowLeft;
      const w = (ge = i.value) == null ? void 0 : ge.getBoundingClientRect(), z = n.getInputRect();
      return (z == null ? void 0 : z.width) < (d == null ? void 0 : d.value) && (z == null ? void 0 : z.left) <= ((w == null ? void 0 : w.left) ?? 0) ? `${(z == null ? void 0 : z.width) / 2}px` : (z == null ? void 0 : z.right) >= ((w == null ? void 0 : w.right) ?? 0) && (z == null ? void 0 : z.width) < (d == null ? void 0 : d.value) ? `${(d == null ? void 0 : d.value) - (z == null ? void 0 : z.width) / 2}px` : "50%";
    }), j = () => {
      const w = Le(i);
      w && w.focus({ preventScroll: true });
    }, $ = computed(() => {
      var w;
      return ((w = F.value) == null ? void 0 : w.getSidebarProps()) || {};
    }), g = () => {
      n.openOnTop && a("recalculate-position");
    }, ue = et(v, "action"), B = computed(() => n.monthPicker || n.yearPicker ? et(v, "monthYear") : n.timePicker ? et(v, "timePicker") : et(v, "shared")), D = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), J = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), s = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !m.value.enabled,
        dp__relative: m.value.enabled,
        ...H.value.menu ?? {}
      })
    ), k = (w) => {
      kt(w, P.value, true);
    }, E = () => {
      n.escClose && a("close-picker");
    }, u = (w) => {
      if (n.arrowNavigation) {
        if (w === qe.up) return O();
        if (w === qe.down) return X();
        if (w === qe.left) return A();
        if (w === qe.right) return x();
      } else w === qe.left || w === qe.up ? L("handleArrow", qe.left, 0, w === qe.up) : L("handleArrow", qe.right, 0, w === qe.down);
    }, te = (w) => {
      f(w.shiftKey), !n.disableMonthYearSelect && w.code === Ce.tab && w.target.classList.contains("dp__menu") && I.value.shiftKeyInMenu && (w.preventDefault(), kt(w, P.value, true), a("close-picker"));
    }, ye = () => {
      j(), a("time-picker-close");
    }, S = (w) => {
      var z, ge, Fe;
      (z = F.value) == null || z.toggleTimePicker(false, false), (ge = F.value) == null || ge.toggleMonthPicker(false, false, w), (Fe = F.value) == null || Fe.toggleYearPicker(false, false, w);
    }, be = (w, z = 0) => {
      var ge, Fe, dt;
      return w === "month" ? (ge = F.value) == null ? void 0 : ge.toggleMonthPicker(false, true, z) : w === "year" ? (Fe = F.value) == null ? void 0 : Fe.toggleYearPicker(false, true, z) : w === "time" ? (dt = F.value) == null ? void 0 : dt.toggleTimePicker(true, false) : S(z);
    }, L = (w, ...z) => {
      var ge, Fe;
      (ge = F.value) != null && ge[w] && ((Fe = F.value) == null || Fe[w](...z));
    }, se = () => {
      L("selectCurrentDate");
    }, r = (w, z) => {
      L("presetDate", w, z);
    }, le = () => {
      L("clearHoverDate");
    }, ie = (w, z) => {
      L("updateMonthYear", w, z);
    }, re = (w, z) => {
      w.preventDefault(), u(z);
    }, Te = (w) => {
      var z, ge, Fe;
      if (te(w), w.key === Ce.home || w.key === Ce.end)
        return L(
          "selectWeekDate",
          w.key === Ce.home,
          w.target.getAttribute("id")
        );
      switch ((w.key === Ce.pageUp || w.key === Ce.pageDown) && (w.shiftKey ? (L("changeYear", w.key === Ce.pageUp), (z = Ea(i.value, "overlay-year")) == null || z.focus()) : (L("changeMonth", w.key === Ce.pageUp), (ge = Ea(i.value, w.key === Ce.pageUp ? "action-prev" : "action-next")) == null || ge.focus()), w.target.getAttribute("id") && ((Fe = i.value) == null || Fe.focus({ preventScroll: true }))), w.key) {
        case Ce.esc:
          return E();
        case Ce.arrowLeft:
          return re(w, qe.left);
        case Ce.arrowRight:
          return re(w, qe.right);
        case Ce.arrowUp:
          return re(w, qe.up);
        case Ce.arrowDown:
          return re(w, qe.down);
        default:
          return;
      }
    }, ke = (w) => {
      var z;
      m.value.enabled && !m.value.input && !((z = i.value) != null && z.contains(w.target)) && Q.value && (Q.value = false, a("menu-blur"));
    };
    return t({
      updateMonthYear: ie,
      switchView: be,
      handleFlow: N
    }), (w, z) => {
      var ge, Fe, dt;
      return openBlock(), createElementBlock("div", {
        id: w.uid ? `dp-menu-${w.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: i,
        tabindex: unref(m).enabled ? void 0 : "0",
        role: unref(m).enabled ? void 0 : "dialog",
        "aria-label": (ge = w.ariaLabels) == null ? void 0 : ge.menu,
        class: normalizeClass(s.value),
        style: normalizeStyle({ "--dp-arrow-left": y.value }),
        onMouseleave: le,
        onClick: k,
        onKeydown: Te
      }, [
        (w.disabled || w.readonly) && unref(m).enabled || w.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(J.value)
        }, [
          w.loading ? (openBlock(), createElementBlock("div", Kr, z[19] || (z[19] = [
            createBaseVNode("span", { class: "dp--menu-loader" }, null, -1)
          ]))) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        w.$slots["menu-header"] ? (openBlock(), createElementBlock("div", Gr, [
          renderSlot(w.$slots, "menu-header")
        ])) : createCommentVNode("", true),
        !unref(m).enabled && !w.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(D.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: R,
          class: normalizeClass({
            dp__menu_content_wrapper: ((Fe = w.presetDates) == null ? void 0 : Fe.length) || !!w.$slots["left-sidebar"] || !!w.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((dt = w.presetDates) == null ? void 0 : dt.length) || !!w.$slots["left-sidebar"] || !!w.$slots["right-sidebar"])
          }),
          "data-dp-mobile": unref(Y),
          style: normalizeStyle({ "--dp-menu-width": `${d.value}px` })
        }, [
          w.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", qr, [
            renderSlot(w.$slots, "left-sidebar", normalizeProps(guardReactiveProps($.value)))
          ])) : createCommentVNode("", true),
          w.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true }),
            "data-dp-mobile": unref(Y)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(w.presetDates, (me, ct) => (openBlock(), createElementBlock(Fragment, { key: ct }, [
              me.slot ? renderSlot(w.$slots, me.slot, {
                key: 0,
                presetDate: r,
                label: me.label,
                value: me.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(me.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test-id": me.testId ?? void 0,
                "data-dp-mobile": unref(Y),
                onClick: withModifiers((Ye) => r(me.value, me.noTz), ["prevent"]),
                onKeydown: (Ye) => unref(Xe)(Ye, () => r(me.value, me.noTz), true)
              }, toDisplayString(me.label), 47, Jr))
            ], 64))), 128))
          ], 10, Xr)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: U,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(ae.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: F
            }, c.value, {
              "flow-step": unref(K),
              onMount: unref(ve),
              onUpdateFlowStep: unref(fe),
              onResetFlow: unref(p),
              onFocusMenu: j,
              onSelectDate: z[0] || (z[0] = (me) => w.$emit("select-date")),
              onDateUpdate: z[1] || (z[1] = (me) => w.$emit("date-update", me)),
              onTooltipOpen: z[2] || (z[2] = (me) => w.$emit("tooltip-open", me)),
              onTooltipClose: z[3] || (z[3] = (me) => w.$emit("tooltip-close", me)),
              onAutoApply: z[4] || (z[4] = (me) => w.$emit("auto-apply", me)),
              onRangeStart: z[5] || (z[5] = (me) => w.$emit("range-start", me)),
              onRangeEnd: z[6] || (z[6] = (me) => w.$emit("range-end", me)),
              onInvalidFixedRange: z[7] || (z[7] = (me) => w.$emit("invalid-fixed-range", me)),
              onTimeUpdate: z[8] || (z[8] = (me) => w.$emit("time-update")),
              onAmPmChange: z[9] || (z[9] = (me) => w.$emit("am-pm-change", me)),
              onTimePickerOpen: z[10] || (z[10] = (me) => w.$emit("time-picker-open", me)),
              onTimePickerClose: ye,
              onRecalculatePosition: g,
              onUpdateMonthYear: z[11] || (z[11] = (me) => w.$emit("update-month-year", me)),
              onAutoApplyInvalid: z[12] || (z[12] = (me) => w.$emit("auto-apply-invalid", me)),
              onInvalidDate: z[13] || (z[13] = (me) => w.$emit("invalid-date", me)),
              onOverlayToggle: z[14] || (z[14] = (me) => w.$emit("overlay-toggle", me)),
              "onUpdate:internalModelValue": z[15] || (z[15] = (me) => w.$emit("update:internal-model-value", me))
            }), createSlots({ _: 2 }, [
              renderList(B.value, (me, ct) => ({
                name: me,
                fn: withCtx((Ye) => [
                  renderSlot(w.$slots, me, normalizeProps(guardReactiveProps({ ...Ye })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          w.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Zr, [
            renderSlot(w.$slots, "right-sidebar", normalizeProps(guardReactiveProps($.value)))
          ])) : createCommentVNode("", true),
          w.$slots["action-extra"] ? (openBlock(), createElementBlock("div", xr, [
            w.$slots["action-extra"] ? renderSlot(w.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: se
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 14, Qr),
        !w.autoApply || unref(P).keepActionRow ? (openBlock(), createBlock(xl, mergeProps({
          key: 3,
          "menu-mount": _.value
        }, c.value, {
          "calendar-width": d.value,
          onClosePicker: z[16] || (z[16] = (me) => w.$emit("close-picker")),
          onSelectDate: z[17] || (z[17] = (me) => w.$emit("select-date")),
          onInvalidSelect: z[18] || (z[18] = (me) => w.$emit("invalid-select")),
          onSelectNow: se
        }), createSlots({ _: 2 }, [
          renderList(unref(ue), (me, ct) => ({
            name: me,
            fn: withCtx((Ye) => [
              renderSlot(w.$slots, me, normalizeProps(guardReactiveProps({ ...Ye })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, jr);
    };
  }
});
var Bt = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Bt || {});
var eo = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: a,
  inline: n,
  emit: i,
  props: c,
  slots: h2
}) => {
  const { defaultedConfig: f } = _e(c), I = ref({}), v = ref(false), C = ref({
    top: "0",
    left: "0"
  }), m = ref(false), P = toRef(c, "teleportCenter");
  watch(P, () => {
    C.value = JSON.parse(JSON.stringify({})), Q();
  });
  const H = (y) => {
    if (c.teleport) {
      const j = y.getBoundingClientRect();
      return {
        left: j.left + window.scrollX,
        top: j.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, Y = (y, j) => {
    C.value.left = `${y + j - I.value.width}px`;
  }, U = (y) => {
    C.value.left = `${y}px`;
  }, d = (y, j) => {
    c.position === Bt.left && U(y), c.position === Bt.right && Y(y, j), c.position === Bt.center && (C.value.left = `${y + j / 2 - I.value.width / 2}px`);
  }, R = (y) => {
    const { width: j, height: $ } = y.getBoundingClientRect(), { top: g, left: ue } = H(y);
    return { top: +g, left: +ue, width: j, height: $ };
  }, _ = () => {
    C.value.left = "50%", C.value.top = "50%", C.value.transform = "translate(-50%, -50%)", C.value.position = "fixed", delete C.value.opacity;
  }, F = () => {
    const y = Le(l);
    C.value = c.altPosition(y);
  }, Q = (y = true) => {
    var j;
    if (!n.value.enabled) {
      if (P.value) return _();
      if (c.altPosition !== null) return F();
      if (y) {
        const $ = c.teleport ? (j = t.value) == null ? void 0 : j.$el : e.value;
        $ && (I.value = $.getBoundingClientRect()), i("recalculate-position");
      }
      return fe();
    }
  }, ne = ({ inputEl: y, left: j, width: $ }) => {
    window.screen.width > 768 && !v.value && d(j, $), X(y);
  }, x = (y) => {
    const { top: j, left: $, height: g, width: ue } = R(y);
    C.value.top = `${g + j + +c.offset}px`, m.value = false, v.value || (C.value.left = `${$ + ue / 2 - I.value.width / 2}px`), ne({ inputEl: y, left: $, width: ue });
  }, A = (y) => {
    const { top: j, left: $, width: g } = R(y);
    C.value.top = `${j - +c.offset - I.value.height}px`, m.value = true, ne({ inputEl: y, left: $, width: g });
  }, X = (y) => {
    if (c.autoPosition) {
      const { left: j, width: $ } = R(y), { left: g, right: ue } = I.value;
      if (!v.value) {
        if (Math.abs(g) !== Math.abs(ue)) {
          if (g <= 0)
            return v.value = true, U(j);
          if (ue >= document.documentElement.clientWidth)
            return v.value = true, Y(j, $);
        }
        return d(j, $);
      }
    }
  }, O = () => {
    const y = Le(l);
    if (y) {
      if (c.autoPosition === st.top) return st.top;
      if (c.autoPosition === st.bottom) return st.bottom;
      const { height: j } = I.value, { top: $, height: g } = y.getBoundingClientRect(), B = window.innerHeight - $ - g, D = $;
      return j <= B ? st.bottom : j > B && j <= D ? st.top : B >= D ? st.bottom : st.top;
    }
    return st.bottom;
  }, K = (y) => O() === st.bottom ? x(y) : A(y), fe = () => {
    const y = Le(l);
    if (y)
      return c.autoPosition ? K(y) : x(y);
  }, ve = function(y) {
    if (y) {
      const j = y.scrollHeight > y.clientHeight, g = window.getComputedStyle(y).overflowY.indexOf("hidden") !== -1;
      return j && !g;
    }
    return true;
  }, p = function(y) {
    return !y || y === document.body || y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : ve(y) ? y : p(
      y.assignedSlot && f.value.shadowDom ? y.assignedSlot.parentNode : y.parentNode
    );
  }, N = (y) => {
    if (y)
      switch (c.position) {
        case Bt.left:
          return { left: 0, transform: "translateX(0)" };
        case Bt.right:
          return { left: `${y.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${y.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: m,
    menuStyle: C,
    xCorrect: v,
    setMenuPosition: Q,
    getScrollableParent: p,
    shadowRender: (y, j) => {
      var s, k, E;
      const $ = document.createElement("div"), g = (s = Le(l)) == null ? void 0 : s.getBoundingClientRect();
      $.setAttribute("id", "dp--temp-container");
      const ue = (k = a.value) != null && k.clientWidth ? a.value : document.body;
      ue.append($);
      const B = N(g), D = f.value.shadowDom ? Object.keys(h2).filter(
        (u) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(u)
      ) : Object.keys(h2), J = h(
        y,
        {
          ...j,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...B }
        },
        Object.fromEntries(D.map((u) => [u, h2[u]]))
      );
      render(J, $), I.value = (E = J.el) == null ? void 0 : E.getBoundingClientRect(), render(null, $), ue.removeChild($);
    }
  };
};
var ht = [
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
var to = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var ao = {
  all: () => ht,
  monthYear: () => ht.filter((e) => e.use.includes("month-year")),
  input: () => to,
  timePicker: () => ht.filter((e) => e.use.includes("time")),
  action: () => ht.filter((e) => e.use.includes("action")),
  calendar: () => ht.filter((e) => e.use.includes("calendar")),
  menu: () => ht.filter((e) => e.use.includes("menu")),
  shared: () => ht.filter((e) => e.use.includes("shared")),
  yearMode: () => ht.filter((e) => e.use.includes("year-mode"))
};
var et = (e, t, l) => {
  const a = [];
  return ao[t]().forEach((n) => {
    e[n.name] && a.push(n.name);
  }), l != null && l.length && l.forEach((n) => {
    n.slot && a.push(n.slot);
  }), a;
};
var Zt = (e) => {
  const t = computed(() => (a) => e.value ? a ? e.value.open : e.value.close : ""), l = computed(() => (a) => e.value ? a ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: l };
};
var xt = (e, t, l) => {
  const { defaultedRange: a, defaultedTz: n } = _e(e), i = W(xe(W(), n.value.timezone)), c = ref([{ month: getMonth(i), year: getYear(i) }]), h2 = (m) => {
    const P = {
      hours: getHours(i),
      minutes: getMinutes(i),
      seconds: 0
    };
    return a.value.enabled ? [P[m], P[m]] : P[m];
  }, f = reactive({
    hours: h2("hours"),
    minutes: h2("minutes"),
    seconds: h2("seconds")
  });
  watch(
    a,
    (m, P) => {
      m.enabled !== P.enabled && (f.hours = h2("hours"), f.minutes = h2("minutes"), f.seconds = h2("seconds"));
    },
    { deep: true }
  );
  const I = computed({
    get: () => e.internalModelValue,
    set: (m) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", m);
    }
  }), v = computed(
    () => (m) => c.value[m] ? c.value[m].month : 0
  ), C = computed(
    () => (m) => c.value[m] ? c.value[m].year : 0
  );
  return watch(
    I,
    (m, P) => {
      l && JSON.stringify(m ?? {}) !== JSON.stringify(P ?? {}) && l();
    },
    { deep: true }
  ), {
    calendars: c,
    time: f,
    modelValue: I,
    month: v,
    year: C,
    today: i
  };
};
var no = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedMultiDates: a,
    defaultedUI: n,
    defaultedHighlight: i,
    defaultedTz: c,
    propDates: h2,
    defaultedRange: f
  } = _e(t), { isDisabled: I } = $t(t), v = ref(null), C = ref(xe(/* @__PURE__ */ new Date(), c.value.timezone)), m = (s) => {
    !s.current && t.hideOffsetDates || (v.value = s.value);
  }, P = () => {
    v.value = null;
  }, H = (s) => Array.isArray(e.value) && f.value.enabled && e.value[0] && v.value ? s ? Ne(v.value, e.value[0]) : Be(v.value, e.value[0]) : true, Y = (s, k) => {
    const E = () => e.value ? k ? e.value[0] || null : e.value[1] : null, u = e.value && Array.isArray(e.value) ? E() : null;
    return Ae(W(s.value), u);
  }, U = (s) => {
    const k = Array.isArray(e.value) ? e.value[0] : null;
    return s ? !Be(v.value ?? null, k) : true;
  }, d = (s, k = true) => (f.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !s.current ? false : Ae(W(s.value), e.value[k ? 0 : 1]) : f.value.enabled ? Y(s, k) && U(k) || Ae(s.value, Array.isArray(e.value) ? e.value[0] : null) && H(k) : false, R = (s, k) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const E = Ae(s.value, v.value);
      return k ? Ne(e.value[0], s.value) && E : Be(e.value[0], s.value) && E;
    }
    return false;
  }, _ = (s) => !e.value || t.hideOffsetDates && !s.current ? false : f.value.enabled ? t.modelAuto && Array.isArray(e.value) ? Ae(s.value, e.value[0] ? e.value[0] : C.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((k) => Ae(k, s.value)) : Ae(s.value, e.value ? e.value : C.value), F = (s) => {
    if (f.value.autoRange || t.weekPicker) {
      if (v.value) {
        if (t.hideOffsetDates && !s.current) return false;
        const k = addDays(v.value, +f.value.autoRange), E = mt(W(v.value), t.weekStart);
        return t.weekPicker ? Ae(E[1], W(s.value)) : Ae(k, W(s.value));
      }
      return false;
    }
    return false;
  }, Q = (s) => {
    if (f.value.autoRange || t.weekPicker) {
      if (v.value) {
        const k = addDays(v.value, +f.value.autoRange);
        if (t.hideOffsetDates && !s.current) return false;
        const E = mt(W(v.value), t.weekStart);
        return t.weekPicker ? Ne(s.value, E[0]) && Be(s.value, E[1]) : Ne(s.value, v.value) && Be(s.value, k);
      }
      return false;
    }
    return false;
  }, ne = (s) => {
    if (f.value.autoRange || t.weekPicker) {
      if (v.value) {
        if (t.hideOffsetDates && !s.current) return false;
        const k = mt(W(v.value), t.weekStart);
        return t.weekPicker ? Ae(k[0], s.value) : Ae(v.value, s.value);
      }
      return false;
    }
    return false;
  }, x = (s) => da(e.value, v.value, s.value), A = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, X = () => t.modelAuto ? An(t.internalModelValue) : true, O = (s) => {
    if (t.weekPicker) return false;
    const k = f.value.enabled ? !d(s) && !d(s, false) : true;
    return !I(s.value) && !_(s) && !(!s.current && t.hideOffsetDates) && k;
  }, K = (s) => f.value.enabled ? t.modelAuto ? A() && _(s) : false : _(s), fe = (s) => i.value ? Ml(s.value, h2.value.highlight) : false, ve = (s) => {
    const k = I(s.value);
    return k && (typeof i.value == "function" ? !i.value(s.value, k) : !i.value.options.highlightDisabled);
  }, p = (s) => {
    var k;
    return typeof i.value == "function" ? i.value(s.value) : (k = i.value.weekdays) == null ? void 0 : k.includes(s.value.getDay());
  }, N = (s) => (f.value.enabled || t.weekPicker) && (!(l.value.count > 0) || s.current) && X() && !(!s.current && t.hideOffsetDates) && !_(s) ? x(s) : false, ae = (s) => {
    const { isRangeStart: k, isRangeEnd: E } = g(s), u = f.value.enabled ? k || E : false;
    return {
      dp__cell_offset: !s.current,
      dp__pointer: !t.disabled && !(!s.current && t.hideOffsetDates) && !I(s.value),
      dp__cell_disabled: I(s.value),
      dp__cell_highlight: !ve(s) && (fe(s) || p(s)) && !K(s) && !u && !ne(s) && !(N(s) && t.weekPicker) && !E,
      dp__cell_highlight_active: !ve(s) && (fe(s) || p(s)) && K(s),
      dp__today: !t.noToday && Ae(s.value, C.value) && s.current,
      "dp--past": Be(s.value, C.value),
      "dp--future": Ne(s.value, C.value)
    };
  }, y = (s) => ({
    dp__active_date: K(s),
    dp__date_hover: O(s)
  }), j = (s) => {
    if (e.value && !Array.isArray(e.value)) {
      const k = mt(e.value, t.weekStart);
      return {
        ...B(s),
        dp__range_start: Ae(k[0], s.value),
        dp__range_end: Ae(k[1], s.value),
        dp__range_between_week: Ne(s.value, k[0]) && Be(s.value, k[1])
      };
    }
    return {
      ...B(s)
    };
  }, $ = (s) => {
    if (e.value && Array.isArray(e.value)) {
      const k = mt(e.value[0], t.weekStart), E = e.value[1] ? mt(e.value[1], t.weekStart) : [];
      return {
        ...B(s),
        dp__range_start: Ae(k[0], s.value) || Ae(E[0], s.value),
        dp__range_end: Ae(k[1], s.value) || Ae(E[1], s.value),
        dp__range_between_week: Ne(s.value, k[0]) && Be(s.value, k[1]) || Ne(s.value, E[0]) && Be(s.value, E[1]),
        dp__range_between: Ne(s.value, k[1]) && Be(s.value, E[0])
      };
    }
    return {
      ...B(s)
    };
  }, g = (s) => {
    const k = l.value.count > 0 ? s.current && d(s) && X() : d(s) && X(), E = l.value.count > 0 ? s.current && d(s, false) && X() : d(s, false) && X();
    return { isRangeStart: k, isRangeEnd: E };
  }, ue = (s) => {
    const { isRangeStart: k, isRangeEnd: E } = g(s);
    return {
      dp__range_start: k,
      dp__range_end: E,
      dp__range_between: N(s),
      dp__date_hover: Ae(s.value, v.value) && !k && !E && !t.weekPicker,
      dp__date_hover_start: R(s, true),
      dp__date_hover_end: R(s, false)
    };
  }, B = (s) => ({
    ...ue(s),
    dp__cell_auto_range: Q(s),
    dp__cell_auto_range_start: ne(s),
    dp__cell_auto_range_end: F(s)
  }), D = (s) => f.value.enabled ? f.value.autoRange ? B(s) : t.modelAuto ? { ...y(s), ...ue(s) } : t.weekPicker ? $(s) : ue(s) : t.weekPicker ? j(s) : y(s);
  return {
    setHoverDate: m,
    clearHoverDate: P,
    getDayClassData: (s) => t.hideOffsetDates && !s.current ? {} : {
      ...ae(s),
      ...D(s),
      [t.dayClass ? t.dayClass(s.value, t.internalModelValue) : ""]: true,
      ...n.value.calendarCell ?? {}
    }
  };
};
var $t = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: a, defaultedMultiDates: n } = _e(e), i = (p) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(W(p)) : !!ua(p, a.value.disabledDates) : false, c = (p) => a.value.maxDate ? e.yearPicker ? getYear(p) > getYear(a.value.maxDate) : Ne(p, a.value.maxDate) : false, h2 = (p) => a.value.minDate ? e.yearPicker ? getYear(p) < getYear(a.value.minDate) : Be(p, a.value.minDate) : false, f = (p) => {
    const N = c(p), ae = h2(p), y = i(p), $ = t.value.months.map((J) => +J).includes(getMonth(p)), g = e.disabledWeekDays.length ? e.disabledWeekDays.some((J) => +J === getDay(p)) : false, ue = P(p), B = getYear(p), D = B < +e.yearRange[0] || B > +e.yearRange[1];
    return !(N || ae || y || $ || D || g || ue);
  }, I = (p, N) => Be(...bt(a.value.minDate, p, N)) || Ae(...bt(a.value.minDate, p, N)), v = (p, N) => Ne(...bt(a.value.maxDate, p, N)) || Ae(...bt(a.value.maxDate, p, N)), C = (p, N, ae) => {
    let y = false;
    return a.value.maxDate && ae && v(p, N) && (y = true), a.value.minDate && !ae && I(p, N) && (y = true), y;
  }, m = (p, N, ae, y) => {
    let j = false;
    return y && (a.value.minDate || a.value.maxDate) ? a.value.minDate && a.value.maxDate ? j = C(p, N, ae) : (a.value.minDate && I(p, N) || a.value.maxDate && v(p, N)) && (j = true) : j = true, j;
  }, P = (p) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !ua(p, a.value.allowedDates) : false, H = (p) => !f(p), Y = (p) => l.value.noDisabledRange ? !eachDayOfInterval({ start: p[0], end: p[1] }).some((ae) => H(ae)) : true, U = (p) => {
    if (p) {
      const N = getYear(p);
      return N >= +e.yearRange[0] && N <= e.yearRange[1];
    }
    return true;
  }, d = (p, N) => !!(Array.isArray(p) && p[N] && (l.value.maxRange || l.value.minRange) && U(p[N])), R = (p, N, ae = 0) => {
    if (d(N, ae) && U(p)) {
      const y = differenceInCalendarDays(p, N[ae]), j = Cn(N[ae], p), $ = j.length === 1 ? 0 : j.filter((ue) => H(ue)).length, g = Math.abs(y) - (l.value.minMaxRawRange ? 0 : $);
      if (l.value.minRange && l.value.maxRange)
        return g >= +l.value.minRange && g <= +l.value.maxRange;
      if (l.value.minRange) return g >= +l.value.minRange;
      if (l.value.maxRange) return g <= +l.value.maxRange;
    }
    return true;
  }, _ = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, F = (p) => Array.isArray(p) ? [p[0] ? Pa(p[0]) : null, p[1] ? Pa(p[1]) : null] : Pa(p), Q = (p, N, ae) => p.find(
    (y) => +y.hours === getHours(N) && y.minutes === "*" ? true : +y.minutes === getMinutes(N) && +y.hours === getHours(N)
  ) && ae, ne = (p, N, ae) => {
    const [y, j] = p, [$, g] = N;
    return !Q(y, $, ae) && !Q(j, g, ae) && ae;
  }, x = (p, N) => {
    const ae = Array.isArray(N) ? N : [N];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? ne(e.disabledTimes, ae, p) : !ae.some((y) => Q(e.disabledTimes, y, p)) : p;
  }, A = (p, N) => {
    const ae = Array.isArray(N) ? [Rt(N[0]), N[1] ? Rt(N[1]) : void 0] : Rt(N), y = !e.disabledTimes(ae);
    return p && y;
  }, X = (p, N) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? x(N, p) : A(N, p) : N, O = (p) => {
    let N = true;
    if (!p || _()) return true;
    const ae = !a.value.minDate && !a.value.maxDate ? F(p) : p;
    return (e.maxTime || a.value.maxDate) && (N = dn(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ee(ae),
      N
    )), (e.minTime || a.value.minDate) && (N = dn(
      e.minTime,
      a.value.minDate,
      "min",
      Ee(ae),
      N
    )), X(p, N);
  }, K = (p) => {
    if (!e.monthPicker) return true;
    let N = true;
    const ae = W(ut(p));
    if (a.value.minDate && a.value.maxDate) {
      const y = W(ut(a.value.minDate)), j = W(ut(a.value.maxDate));
      return Ne(ae, y) && Be(ae, j) || Ae(ae, y) || Ae(ae, j);
    }
    if (a.value.minDate) {
      const y = W(ut(a.value.minDate));
      N = Ne(ae, y) || Ae(ae, y);
    }
    if (a.value.maxDate) {
      const y = W(ut(a.value.maxDate));
      N = Be(ae, y) || Ae(ae, y);
    }
    return N;
  }, fe = computed(() => (p) => !e.enableTimePicker || e.ignoreTimeValidation ? true : O(p)), ve = computed(() => (p) => e.monthPicker ? Array.isArray(p) && (l.value.enabled || n.value.enabled) ? !p.filter((ae) => !K(ae)).length : K(p) : true);
  return {
    isDisabled: H,
    validateDate: f,
    validateMonthYearInRange: m,
    isDateRangeAllowed: Y,
    checkMinMaxRange: R,
    isValidTime: O,
    isTimeValid: fe,
    isMonthValid: ve
  };
};
var ma = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), l = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var lo = (e, t, l) => {
  const a = ref(0), n = reactive({
    [Pt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Pt.calendar]: false,
    [Pt.header]: false
  }), i = computed(() => e.monthPicker || e.timePicker), c = (C) => {
    var m;
    if ((m = e.flow) != null && m.length) {
      if (!C && i.value) return v();
      n[C] = true, Object.keys(n).filter((P) => !n[P]).length || v();
    }
  }, h2 = () => {
    var C, m;
    (C = e.flow) != null && C.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), v()), ((m = e.flow) == null ? void 0 : m.length) === a.value && nextTick().then(() => f());
  }, f = () => {
    a.value = -1;
  }, I = (C, m, ...P) => {
    var H, Y;
    e.flow[a.value] === C && l.value && ((Y = (H = l.value)[m]) == null || Y.call(H, ...P));
  }, v = (C = 0) => {
    C && (a.value += C), I(je.month, "toggleMonthPicker", true), I(je.year, "toggleYearPicker", true), I(je.calendar, "toggleTimePicker", false, true), I(je.time, "toggleTimePicker", true, true);
    const m = e.flow[a.value];
    (m === je.hours || m === je.minutes || m === je.seconds) && I(m, "toggleTimePicker", true, true, m);
  };
  return { childMount: c, updateFlowStep: h2, resetFlow: f, handleFlow: v, flowStep: a };
};
var ro = {
  key: 1,
  class: "dp__input_wrap"
};
var oo = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var so = {
  key: 2,
  class: "dp--clear-btn"
};
var uo = ["aria-label"];
var io = defineComponent({
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
      defaultedInline: h2,
      defaultedConfig: f,
      defaultedRange: I,
      defaultedMultiDates: v,
      defaultedUI: C,
      getDefaultPattern: m,
      getDefaultStartTime: P
    } = _e(n), { checkMinMaxRange: H } = $t(n), Y = ref(), U = ref(null), d = ref(false), R = ref(false), _ = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !i.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !i.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: typeof n.state == "boolean" ? n.state : false,
        dp__input_invalid: typeof n.state == "boolean" ? !n.state : false,
        dp__input_focus: d.value || n.isMenuOpen,
        dp__input_reg: !i.value.enabled,
        ...C.value.input ?? {}
      })
    ), F = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), Y.value = null);
    }, Q = (g) => {
      const ue = P();
      return $l(
        g,
        i.value.format ?? m(),
        ue ?? On({}, n.enableSeconds),
        n.inputValue,
        R.value,
        n.formatLocale
      );
    }, ne = (g) => {
      const { rangeSeparator: ue } = i.value, [B, D] = g.split(`${ue}`);
      if (B) {
        const J = Q(B.trim()), s = D ? Q(D.trim()) : null;
        if (isAfter(J, s)) return;
        const k = J && s ? [J, s] : [J];
        H(s, k, 0) && (Y.value = J ? k : null);
      }
    }, x = () => {
      R.value = true;
    }, A = (g) => {
      if (I.value.enabled)
        ne(g);
      else if (v.value.enabled) {
        const ue = g.split(";");
        Y.value = ue.map((B) => Q(B.trim())).filter((B) => B);
      } else
        Y.value = Q(g);
    }, X = (g) => {
      var B;
      const ue = typeof g == "string" ? g : (B = g.target) == null ? void 0 : B.value;
      ue !== "" ? (i.value.openMenu && !n.isMenuOpen && a("open"), A(ue), a("set-input-date", Y.value)) : F(), R.value = false, a("update:input-value", ue), a("text-input", g, Y.value);
    }, O = (g) => {
      i.value.enabled ? (A(g.target.value), i.value.enterSubmit && Fa(Y.value) && n.inputValue !== "" ? (a("set-input-date", Y.value, true), Y.value = null) : i.value.enterSubmit && n.inputValue === "" && (Y.value = null, a("clear"))) : ve(g);
    }, K = (g, ue) => {
      i.value.enabled && i.value.tabSubmit && !ue && A(g.target.value), i.value.tabSubmit && Fa(Y.value) && n.inputValue !== "" ? (a("set-input-date", Y.value, true, true), Y.value = null) : i.value.tabSubmit && n.inputValue === "" && (Y.value = null, a("clear", true));
    }, fe = () => {
      d.value = true, a("focus"), nextTick().then(() => {
        var g;
        i.value.enabled && i.value.selectOnFocus && ((g = U.value) == null || g.select());
      });
    }, ve = (g) => {
      if (kt(g, f.value, true), i.value.enabled && i.value.openMenu && !h2.value.input) {
        if (i.value.openMenu === "open" && !n.isMenuOpen) return a("open");
        if (i.value.openMenu === "toggle") return a("toggle");
      } else i.value.enabled || a("toggle");
    }, p = () => {
      a("real-blur"), d.value = false, (!n.isMenuOpen || h2.value.enabled && h2.value.input) && a("blur"), n.autoApply && i.value.enabled && Y.value && !n.isMenuOpen && (a("set-input-date", Y.value), a("select-date"), Y.value = null);
    }, N = (g) => {
      kt(g, f.value, true), a("clear");
    }, ae = (g) => {
      if (g.key === "Tab" && K(g), g.key === "Enter" && O(g), !i.value.enabled) {
        if (g.code === "Tab") return;
        g.preventDefault();
      }
    }, y = () => {
      var g;
      (g = U.value) == null || g.focus({ preventScroll: true });
    }, j = (g) => {
      Y.value = g;
    }, $ = (g) => {
      g.key === Ce.tab && K(g, true);
    };
    return t({
      focusInput: y,
      setParsedDate: j
    }), (g, ue) => {
      var B, D, J;
      return openBlock(), createElementBlock("div", { onClick: ve }, [
        g.$slots.trigger && !g.$slots["dp-input"] && !unref(h2).enabled ? renderSlot(g.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !g.$slots.trigger && (!unref(h2).enabled || unref(h2).input) ? (openBlock(), createElementBlock("div", ro, [
          g.$slots["dp-input"] && !g.$slots.trigger && (!unref(h2).enabled || unref(h2).enabled && unref(h2).input) ? renderSlot(g.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: X,
            onEnter: O,
            onTab: K,
            onClear: N,
            onBlur: p,
            onKeypress: ae,
            onPaste: x,
            onFocus: fe,
            openMenu: () => g.$emit("open"),
            closeMenu: () => g.$emit("close"),
            toggleMenu: () => g.$emit("toggle")
          }) : createCommentVNode("", true),
          g.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: g.uid ? `dp-input-${g.uid}` : void 0,
            ref_key: "inputRef",
            ref: U,
            "data-test-id": "dp-input",
            name: g.name,
            class: normalizeClass(_.value),
            inputmode: unref(i).enabled ? "text" : "none",
            placeholder: g.placeholder,
            disabled: g.disabled,
            readonly: g.readonly,
            required: g.required,
            value: e.inputValue,
            autocomplete: g.autocomplete,
            "aria-label": (B = unref(c)) == null ? void 0 : B.input,
            "aria-disabled": g.disabled || void 0,
            "aria-invalid": g.state === false ? true : void 0,
            onInput: X,
            onBlur: p,
            onFocus: fe,
            onKeypress: ae,
            onKeydown: ue[0] || (ue[0] = (s) => ae(s)),
            onPaste: x
          }, null, 42, oo)),
          createBaseVNode("div", {
            onClick: ue[3] || (ue[3] = (s) => a("toggle"))
          }, [
            g.$slots["input-icon"] && !g.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: ue[1] || (ue[1] = (s) => a("toggle"))
            }, [
              renderSlot(g.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !g.$slots["input-icon"] && !g.hideInputIcon && !g.$slots["dp-input"] ? (openBlock(), createBlock(unref(zt), {
              key: 1,
              "aria-label": (D = unref(c)) == null ? void 0 : D.calendarIcon,
              class: "dp__input_icon dp__input_icons",
              onClick: ue[2] || (ue[2] = (s) => a("toggle"))
            }, null, 8, ["aria-label"])) : createCommentVNode("", true)
          ]),
          g.$slots["clear-icon"] && e.inputValue && g.clearable && !g.disabled && !g.readonly ? (openBlock(), createElementBlock("span", so, [
            renderSlot(g.$slots, "clear-icon", { clear: N })
          ])) : createCommentVNode("", true),
          g.clearable && !g.$slots["clear-icon"] && e.inputValue && !g.disabled && !g.readonly ? (openBlock(), createElementBlock("button", {
            key: 3,
            "aria-label": (J = unref(c)) == null ? void 0 : J.clearInput,
            class: "dp--clear-btn",
            type: "button",
            onKeydown: ue[4] || (ue[4] = (s) => unref(Xe)(s, () => N(s), true, $)),
            onClick: ue[5] || (ue[5] = withModifiers((s) => N(s), ["prevent"]))
          }, [
            createVNode(unref(Mn), {
              class: "dp__input_icons",
              "data-test-id": "clear-icon"
            })
          ], 40, uo)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var co = typeof window < "u" ? window : void 0;
var Ya = () => {
};
var fo = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var vo = (e, t, l, a) => {
  if (!e) return Ya;
  let n = Ya;
  const i = watch(
    () => unref(e),
    (h2) => {
      n(), h2 && (h2.addEventListener(t, l, a), n = () => {
        h2.removeEventListener(t, l, a), n = Ya;
      });
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    i(), n();
  };
  return fo(c), c;
};
var mo = (e, t, l, a = {}) => {
  const { window: n = co, event: i = "pointerdown" } = a;
  return n ? vo(n, i, (h2) => {
    const f = Le(e), I = Le(t);
    !f || !I || f === h2.target || h2.composedPath().includes(f) || h2.composedPath().includes(I) || l(h2);
  }, { passive: true }) : void 0;
};
var po = ["data-dp-mobile"];
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
    const a = l, n = e, i = useSlots(), c = ref(false), h2 = toRef(n, "modelValue"), f = toRef(n, "timezone"), I = ref(null), v = ref(null), C = ref(null), m = ref(false), P = ref(null), H = ref(false), Y = ref(false), U = ref(false), d = ref(false), { setMenuFocused: R, setShiftKey: _ } = Nn(), { clearArrowNav: F } = Mt(), { validateDate: Q, isValidTime: ne } = $t(n), {
      defaultedTransitions: x,
      defaultedTextInput: A,
      defaultedInline: X,
      defaultedConfig: O,
      defaultedRange: K,
      defaultedMultiDates: fe
    } = _e(n), { menuTransition: ve, showTransition: p } = Zt(x), { isMobile: N } = Wn(O);
    onMounted(() => {
      k(n.modelValue), nextTick().then(() => {
        if (!X.value.enabled) {
          const M = B(P.value);
          M == null || M.addEventListener("scroll", le), window == null || window.addEventListener("resize", ie);
        }
      }), X.value.enabled && (c.value = true), window == null || window.addEventListener("keyup", re), window == null || window.addEventListener("keydown", Te);
    }), onUnmounted(() => {
      if (!X.value.enabled) {
        const M = B(P.value);
        M == null || M.removeEventListener("scroll", le), window == null || window.removeEventListener("resize", ie);
      }
      window == null || window.removeEventListener("keyup", re), window == null || window.removeEventListener("keydown", Te);
    });
    const ae = et(i, "all", n.presetDates), y = et(i, "input");
    watch(
      [h2, f],
      () => {
        k(h2.value);
      },
      { deep: true }
    );
    const { openOnTop: j, menuStyle: $, xCorrect: g, setMenuPosition: ue, getScrollableParent: B, shadowRender: D } = eo({
      menuRef: I,
      menuRefInner: v,
      inputRef: C,
      pickerWrapperRef: P,
      inline: X,
      emit: a,
      props: n,
      slots: i
    }), {
      inputValue: J,
      internalModelValue: s,
      parseExternalModelValue: k,
      emitModelValue: E,
      formatInputValue: u,
      checkBeforeEmit: te
    } = ql(a, n, m), ye = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: X.value.enabled,
        "dp--flex-display-collapsed": U.value,
        dp__flex_display_with_input: X.value.input
      })
    ), S = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), be = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || X.value.enabled
    } : {}), L = computed(() => ({ class: "dp__outer_menu_wrap" })), se = computed(() => X.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), r = () => {
      var M, Z;
      return ((Z = (M = C.value) == null ? void 0 : M.$el) == null ? void 0 : Z.getBoundingClientRect()) ?? { width: 0, left: 0, right: 0 };
    }, le = () => {
      c.value && (O.value.closeOnScroll ? Ye() : ue());
    }, ie = () => {
      var Z;
      c.value && ue();
      const M = ((Z = v.value) == null ? void 0 : Z.$el.getBoundingClientRect().width) ?? 0;
      U.value = document.body.offsetWidth <= M;
    }, re = (M) => {
      M.key === "Tab" && !X.value.enabled && !n.teleport && O.value.tabOutClosesMenu && (P.value.contains(document.activeElement) || Ye()), Y.value = M.shiftKey;
    }, Te = (M) => {
      Y.value = M.shiftKey;
    }, ke = () => {
      !n.disabled && !n.readonly && (D(mn, n), ue(false), c.value = true, c.value && a("open"), c.value || ct(), k(n.modelValue));
    }, w = () => {
      var M;
      J.value = "", ct(), (M = C.value) == null || M.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), O.value.closeOnClearValue && Ye();
    }, z = () => {
      const M = s.value;
      return !M || !Array.isArray(M) && Q(M) ? true : Array.isArray(M) ? fe.value.enabled || M.length === 2 && Q(M[0]) && Q(M[1]) ? true : K.value.partialRange && !n.timePicker ? Q(M[0]) : false : false;
    }, ge = () => {
      te() && z() ? (E(), Ye()) : a("invalid-select", s.value);
    }, Fe = (M) => {
      dt(), E(), O.value.closeOnAutoApply && !M && Ye();
    }, dt = () => {
      C.value && A.value.enabled && C.value.setParsedDate(s.value);
    }, me = (M = false) => {
      n.autoApply && ne(s.value) && z() && (K.value.enabled && Array.isArray(s.value) ? (K.value.partialRange || s.value.length === 2) && Fe(M) : Fe(M));
    }, ct = () => {
      A.value.enabled || (s.value = null);
    }, Ye = (M = false) => {
      M && s.value && O.value.setDateOnMenuClose && ge(), X.value.enabled || (c.value && (c.value = false, g.value = false, R(false), _(false), F(), a("closed"), J.value && k(h2.value)), ct(), a("blur"));
    }, pa = (M, Z, de = false) => {
      if (!M) {
        s.value = null;
        return;
      }
      const Qe = Array.isArray(M) ? !M.some((Ot) => !Q(Ot)) : Q(M), rt = ne(M);
      Qe && rt ? (d.value = true, s.value = M, Z && (H.value = de, ge(), a("text-submit")), nextTick().then(() => {
        d.value = false;
      })) : a("invalid-date", M);
    }, ya = () => {
      n.autoApply && ne(s.value) && E(), dt();
    }, ea = () => c.value ? Ye() : ke(), ga = (M) => {
      s.value = M;
    }, ha = () => {
      A.value.enabled && (m.value = true, u()), a("focus");
    }, ba = () => {
      if (A.value.enabled && (m.value = false, k(n.modelValue), H.value)) {
        const M = Dl(P.value, Y.value);
        M == null || M.focus();
      }
      a("blur");
    }, ka = (M) => {
      v.value && v.value.updateMonthYear(0, {
        month: rn(M.month),
        year: rn(M.year)
      });
    }, wa = (M) => {
      k(M ?? n.modelValue);
    }, Za = (M, Z) => {
      var de;
      (de = v.value) == null || de.switchView(M, Z);
    }, b = (M) => O.value.onClickOutside ? O.value.onClickOutside(M) : Ye(true), oe = (M = 0) => {
      var Z;
      (Z = v.value) == null || Z.handleFlow(M);
    };
    return mo(I, C, () => b(z)), t({
      closeMenu: Ye,
      selectDate: ge,
      clearValue: w,
      openMenu: ke,
      onScroll: le,
      formatInputValue: u,
      // exposed for testing purposes
      updateInternalModelValue: ga,
      // modify internal modelValue
      setMonthYear: ka,
      parseModel: wa,
      switchView: Za,
      toggleMenu: ea,
      handleFlow: oe,
      dpWrapMenuRef: I
    }), (M, Z) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: P,
      class: normalizeClass(ye.value),
      "data-datepicker-instance": "",
      "data-dp-mobile": unref(N)
    }, [
      createVNode(io, mergeProps({
        ref_key: "inputRef",
        ref: C,
        "input-value": unref(J),
        "onUpdate:inputValue": Z[0] || (Z[0] = (de) => isRef(J) ? J.value = de : null),
        "is-menu-open": c.value
      }, M.$props, {
        onClear: w,
        onOpen: ke,
        onSetInputDate: pa,
        onSetEmptyDate: unref(E),
        onSelectDate: ge,
        onToggle: ea,
        onClose: Ye,
        onFocus: ha,
        onBlur: ba,
        onRealBlur: Z[1] || (Z[1] = (de) => m.value = false),
        onTextInput: Z[2] || (Z[2] = (de) => M.$emit("text-input", de))
      }), createSlots({ _: 2 }, [
        renderList(unref(y), (de, Qe) => ({
          name: de,
          fn: withCtx((rt) => [
            renderSlot(M.$slots, de, normalizeProps(guardReactiveProps(rt)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(M.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(be.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(ve)(unref(j)),
            css: unref(p) && !unref(X).enabled
          }, {
            default: withCtx(() => [
              c.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: I
              }, L.value, {
                class: { "dp--menu-wrapper": !unref(X).enabled },
                style: unref(X).enabled ? void 0 : unref($)
              }), [
                createVNode(mn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: v
                }, M.$props, {
                  "internal-model-value": unref(s),
                  "onUpdate:internalModelValue": Z[3] || (Z[3] = (de) => isRef(s) ? s.value = de : null),
                  class: { [S.value]: true, "dp--menu-wrapper": M.teleport },
                  "open-on-top": unref(j),
                  "no-overlay-focus": se.value,
                  collapse: U.value,
                  "get-input-rect": r,
                  "is-text-input-date": d.value,
                  onClosePicker: Ye,
                  onSelectDate: ge,
                  onAutoApply: me,
                  onTimeUpdate: ya,
                  onFlowStep: Z[4] || (Z[4] = (de) => M.$emit("flow-step", de)),
                  onUpdateMonthYear: Z[5] || (Z[5] = (de) => M.$emit("update-month-year", de)),
                  onInvalidSelect: Z[6] || (Z[6] = (de) => M.$emit("invalid-select", unref(s))),
                  onAutoApplyInvalid: Z[7] || (Z[7] = (de) => M.$emit("invalid-select", de)),
                  onInvalidFixedRange: Z[8] || (Z[8] = (de) => M.$emit("invalid-fixed-range", de)),
                  onRecalculatePosition: unref(ue),
                  onTooltipOpen: Z[9] || (Z[9] = (de) => M.$emit("tooltip-open", de)),
                  onTooltipClose: Z[10] || (Z[10] = (de) => M.$emit("tooltip-close", de)),
                  onTimePickerOpen: Z[11] || (Z[11] = (de) => M.$emit("time-picker-open", de)),
                  onTimePickerClose: Z[12] || (Z[12] = (de) => M.$emit("time-picker-close", de)),
                  onAmPmChange: Z[13] || (Z[13] = (de) => M.$emit("am-pm-change", de)),
                  onRangeStart: Z[14] || (Z[14] = (de) => M.$emit("range-start", de)),
                  onRangeEnd: Z[15] || (Z[15] = (de) => M.$emit("range-end", de)),
                  onDateUpdate: Z[16] || (Z[16] = (de) => M.$emit("date-update", de)),
                  onInvalidDate: Z[17] || (Z[17] = (de) => M.$emit("invalid-date", de)),
                  onOverlayToggle: Z[18] || (Z[18] = (de) => M.$emit("overlay-toggle", de)),
                  onMenuBlur: Z[19] || (Z[19] = (de) => M.$emit("blur"))
                }), createSlots({ _: 2 }, [
                  renderList(unref(ae), (de, Qe) => ({
                    name: de,
                    fn: withCtx((rt) => [
                      renderSlot(M.$slots, de, normalizeProps(guardReactiveProps({ ...rt })))
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
    ], 10, po));
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
