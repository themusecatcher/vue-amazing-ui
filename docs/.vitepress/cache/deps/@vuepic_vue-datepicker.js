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
  toValue,
  unref,
  useAttrs,
  useSlots,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-3MB4FZ2E.js";
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

// node_modules/.pnpm/@vuepic+vue-datepicker@11.0.1_vue@3.5.13_typescript@5.7.3_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Wt() {
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
Wt.compatConfig = {
  MODE: 3
};
function Tn() {
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
Tn.compatConfig = {
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
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
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
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
Va.compatConfig = {
  MODE: 3
};
function ja() {
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
ja.compatConfig = {
  MODE: 3
};
function Ka() {
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
Ka.compatConfig = {
  MODE: 3
};
function Ga() {
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
Ga.compatConfig = {
  MODE: 3
};
var et = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var Qa = (e, t, r) => {
  const a = Fa(e, t, r);
  return a || j();
};
var hl = (e, t, r) => {
  const a = t.dateInTz ? et(new Date(e), t.dateInTz) : j(e);
  return r ? We(a, true) : a;
};
var Fa = (e, t, r) => {
  if (!e) return null;
  const a = r ? We(j(e), true) : j(e);
  return t ? t.exactMatch ? hl(e, t, r) : et(a, t.timezone) : a;
};
var bl = (e) => {
  const r = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
  return e.getTimezoneOffset() < r;
};
var kl = (e, t) => {
  if (!e) return 0;
  const r = /* @__PURE__ */ new Date(), a = new Date(r.toLocaleString("en-US", { timeZone: "UTC" })), n = new Date(r.toLocaleString("en-US", { timeZone: e })), d = (bl(t ?? n) ? n : t ?? n).getTimezoneOffset() / 60;
  return (+a - +n) / (1e3 * 60 * 60) - d;
};
var ut = ((e) => (e.month = "month", e.year = "year", e))(ut || {});
var it = ((e) => (e.top = "top", e.bottom = "bottom", e))(it || {});
var Rt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Rt || {});
var Ge = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(Ge || {});
var wl = ["timestamp", "date", "iso"];
var Je = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(Je || {});
var Oe = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Oe || {});
var Nt = ((e) => (e.MONTH_AND_YEAR = "MM-yyyy", e.YEAR = "yyyy", e.DATE = "dd-MM-yyyy", e))(Nt || {});
function sn(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function Dl(e) {
  return (t) => format(et(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var Ml = (e, t, r) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(Dl(e));
    } catch {
      n = a.map(sn(t));
    }
  else
    n = a.map(sn(t));
  const u = n.slice(0, r), d = n.slice(r + 1, n.length);
  return [n[r]].concat(...d).concat(...u);
};
var qa = (e, t, r) => {
  const a = [];
  for (let n = +e[0]; n <= +e[1]; n++)
    a.push({ value: +n, text: Cn(n, t) });
  return r ? a.reverse() : a;
};
var Sn = (e, t, r) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((u) => {
    const d = u < 10 ? `0${u}` : u;
    return /* @__PURE__ */ new Date(`2017-${d}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const u = r === "long" ? "LLLL" : "LLL";
      return a.map((d, y) => {
        const i = format(et(d, "UTC"), u, { locale: e });
        return {
          text: i.charAt(0).toUpperCase() + i.substring(1),
          value: y
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: r, timeZone: "UTC" });
  return a.map((u, d) => {
    const y = n.format(u);
    return {
      text: y.charAt(0).toUpperCase() + y.substring(1),
      value: d
    };
  });
};
var $l = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Le = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var Al = (e) => ({ type: "dot", ...e ?? {} });
var Pn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Xa = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ne = (e) => e;
var un = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var dn = (e) => e === null;
var Rn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var Tl = (e) => {
  const t = [], r = (a) => a.filter((n) => n);
  for (let a = 0; a < e.length; a += 3) {
    const n = [e[a], e[a + 1], e[a + 2]];
    t.push(r(n));
  }
  return t;
};
var Xt = (e, t, r) => {
  const a = r != null, n = t != null;
  if (!a && !n) return false;
  const u = +r, d = +t;
  return a && n ? +e > u || +e < d : a ? +e > u : n ? +e < d : false;
};
var zt = (e, t) => Tl(e).map((r) => r.map((a) => {
  const { active: n, disabled: u, isBetween: d, highlighted: y } = t(a);
  return {
    ...a,
    active: n,
    disabled: u,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: u,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: u && n,
      dp__cell_in_between: d,
      "dp--highlighted": y
    }
  };
}));
var Dt = (e, t, r = false) => {
  e && t.allowStopPropagation && (r && e.stopImmediatePropagation(), e.stopPropagation());
};
var Sl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function Pl(e, t) {
  let r = [...document.querySelectorAll(Sl())];
  r = r.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = r.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= r.length))
    return r[a + (t ? -1 : 1)];
}
var La = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Cn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Ja = (e, t) => format(e, t ?? Nt.DATE);
var Ta = (e) => Array.isArray(e);
var ca = (e, t, r) => t.get(Ja(e, r));
var Rl = (e, t) => e ? t ? t instanceof Map ? !!ca(e, t) : t(j(e)) : false : true;
var Ze = (e, t, r = false, a) => {
  if (e.key === Oe.enter || e.key === Oe.space)
    return r && e.preventDefault(), t();
  if (a) return a(e);
};
var Cl = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
var Ol = (e, t) => e ? Nt.MONTH_AND_YEAR : t ? Nt.YEAR : Nt.DATE;
var On = (e) => e < 10 ? `0${e}` : e;
var cn = (e, t, r, a, n, u) => {
  const d = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: u });
  return isValid(d) && isDate(d) ? a || n ? d : set(d, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
};
var Bl = (e, t, r, a, n, u) => {
  const d = Array.isArray(r) ? r[0] : r;
  if (typeof t == "string")
    return cn(e, t, d, a, n, u);
  if (Array.isArray(t)) {
    let y = null;
    for (const i of t)
      if (y = cn(e, i, d, a, n, u), y)
        break;
    return y;
  }
  return typeof t == "function" ? t(e) : null;
};
var j = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var _l = (e, t, r) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), u = e.getDate().toString().padStart(2, "0"), d = e.getHours().toString().padStart(2, "0"), y = e.getMinutes().toString().padStart(2, "0"), i = r ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${u}T${d}:${y}:${i}.000Z`;
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
var We = (e, t) => {
  const r = j(JSON.parse(JSON.stringify(e))), a = set(r, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(a) : a;
};
var Mt = (e, t, r, a) => {
  let n = e ? j(e) : j();
  return (t || t === 0) && (n = setHours(n, +t)), (r || r === 0) && (n = setMinutes(n, +r)), (a || a === 0) && (n = setSeconds(n, +a)), setMilliseconds(n, 0);
};
var Ye = (e, t) => !e || !t ? false : isBefore(We(e), We(t));
var Ae = (e, t) => !e || !t ? false : isEqual(We(e), We(t));
var Ee = (e, t) => !e || !t ? false : isAfter(We(e), We(t));
var Jt = (e, t, r) => e != null && e[0] && (e != null && e[1]) ? Ee(r, e[0]) && Ye(r, e[1]) : e != null && e[0] && t ? Ee(r, e[0]) && Ye(r, t) || Ye(r, e[0]) && Ee(r, t) : false;
var dt = (e) => {
  const t = set(new Date(e), { date: 1 });
  return We(t);
};
var Sa = (e, t, r) => t && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a) => a === t ? [a, r] : [a, isNaN(+e[a]) ? void 0 : +e[a]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var Ct = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Bn = (e, t) => {
  if (t) {
    const r = getYear(j(t));
    if (r > e) return 12;
    if (r === e) return getMonth(j(t));
  }
};
var _n = (e, t) => {
  if (t) {
    const r = getYear(j(t));
    return r < e ? -1 : r === e ? getMonth(j(t)) : void 0;
  }
};
var Ht = (e) => {
  if (e) return getYear(j(e));
};
var Yn = (e, t) => {
  const r = Ee(e, t) ? t : e, a = Ee(t, e) ? t : e;
  return eachDayOfInterval({ start: r, end: a });
};
var Yl = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var pt = (e, t) => {
  const r = startOfWeek(e, { weekStartsOn: +t }), a = endOfWeek(e, { weekStartsOn: +t });
  return [r, a];
};
var In = (e, t) => {
  const r = {
    hours: getHours(j()),
    minutes: getMinutes(j()),
    seconds: t ? getSeconds(j()) : 0
  };
  return Object.assign(r, e);
};
var wt = (e, t, r) => [set(j(e), { date: 1 }), set(j(), { month: t, year: r, date: 1 })];
var yt = (e, t, r) => {
  let a = e ? j(e) : j();
  return (t || t === 0) && (a = setMonth(a, t)), r && (a = setYear(a, r)), a;
};
var En = (e, t, r, a, n) => {
  if (!a || n && !t || !n && !r) return false;
  const u = n ? addMonths(e, 1) : subMonths(e, 1), d = [getMonth(u), getYear(u)];
  return n ? !El(...d, t) : !Il(...d, r);
};
var Il = (e, t, r) => Ye(...wt(r, e, t)) || Ae(...wt(r, e, t));
var El = (e, t, r) => Ee(...wt(r, e, t)) || Ae(...wt(r, e, t));
var Nn = (e, t, r, a, n, u, d) => {
  if (typeof t == "function" && !d) return t(e);
  const y = r ? { locale: r } : void 0;
  return Array.isArray(e) ? `${format(e[0], u, y)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], u, y) : ""}` : format(e, u, y);
};
var Yt = (e) => {
  if (e) return null;
  throw new Error(Xa.prop("partial-range"));
};
var ra = (e, t) => {
  if (t) return e();
  throw new Error(Xa.prop("range"));
};
var za = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Nl = (e, t) => set(t ?? j(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Pa = (e, t, r, a) => {
  if (!e) return true;
  if (a) {
    const n = r === "max" ? isBefore(e, t) : isAfter(e, t), u = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e, u), set(t, u));
  }
  return r === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Ra = (e, t, r) => e ? Nl(e, t) : j(r ?? t);
var fn = (e, t, r, a, n) => {
  if (Array.isArray(a)) {
    const d = Ra(e, a[0], t), y = Ra(e, a[1], t);
    return Pa(a[0], d, r, !!t) && Pa(a[1], y, r, !!t) && n;
  }
  const u = Ra(e, a, t);
  return Pa(a, u, r, !!t) && n;
};
var Ca = (e) => set(j(), Ct(e));
var Fl = (e, t, r) => {
  if (e instanceof Map) {
    const a = `${On(r + 1)}-${t}`;
    return e.size ? e.has(a) : false;
  }
  return false;
};
var Ll = (e, t, r) => {
  if (e instanceof Map) {
    const a = `${On(r + 1)}-${t}`;
    return e.size ? e.has(a) : true;
  }
  return true;
};
var Fn = (e, t, r) => typeof e == "function" ? e({ month: t, year: r }) : !!e.months.find((a) => a.month === t && a.year === r);
var Za = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Ha = (e) => `dp-${format(e, "yyyy-MM-dd")}`;
var vn = (e, t) => {
  const r = subDays(We(t), e), a = addDays(We(t), e);
  return { before: r, after: a };
};
var jt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Ln = () => {
  const e = (a) => {
    jt.menuFocused = a;
  }, t = (a) => {
    jt.shiftKeyInMenu !== a && (jt.shiftKeyInMenu = a);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: jt.shiftKeyInMenu, menuFocused: jt.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Ce = reactive({
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
var Oa = ref(null);
var oa = ref(false);
var Ba = ref(false);
var _a = ref(false);
var Ya = ref(false);
var Ke = ref(0);
var Ie = ref(0);
var At = () => {
  const e = computed(() => oa.value ? [...Ce.selectionGrid, Ce.actionRow].filter((f) => f.length) : Ba.value ? [
    ...Ce.timePicker[0],
    ...Ce.timePicker[1],
    Ya.value ? [] : [Oa.value],
    Ce.actionRow
  ].filter((f) => f.length) : _a.value ? [...Ce.monthPicker, Ce.actionRow] : [Ce.monthYear, ...Ce.calendar, Ce.time, Ce.actionRow].filter((f) => f.length)), t = (f) => {
    Ke.value = f ? Ke.value + 1 : Ke.value - 1;
    let I = null;
    e.value[Ie.value] && (I = e.value[Ie.value][Ke.value]), !I && e.value[Ie.value + (f ? 1 : -1)] ? (Ie.value = Ie.value + (f ? 1 : -1), Ke.value = f ? 0 : e.value[Ie.value].length - 1) : I || (Ke.value = f ? Ke.value - 1 : Ke.value + 1);
  }, r = (f) => {
    if (Ie.value === 0 && !f || Ie.value === e.value.length && f) return;
    Ie.value = f ? Ie.value + 1 : Ie.value - 1, e.value[Ie.value] ? e.value[Ie.value] && !e.value[Ie.value][Ke.value] && Ke.value !== 0 && (Ke.value = e.value[Ie.value].length - 1) : Ie.value = f ? Ie.value - 1 : Ie.value + 1;
  }, a = (f) => {
    let I = null;
    e.value[Ie.value] && (I = e.value[Ie.value][Ke.value]), I ? I.focus({ preventScroll: !oa.value }) : Ke.value = f ? Ke.value - 1 : Ke.value + 1;
  }, n = () => {
    t(true), a(true);
  }, u = () => {
    t(false), a(false);
  }, d = () => {
    r(false), a(true);
  }, y = () => {
    r(true), a(true);
  }, i = (f, I) => {
    Ce[I] = f;
  }, _ = (f, I) => {
    Ce[I] = f;
  }, c = () => {
    Ke.value = 0, Ie.value = 0;
  };
  return {
    buildMatrix: i,
    buildMultiLevelMatrix: _,
    setTimePickerBackRef: (f) => {
      Oa.value = f;
    },
    setSelectionGrid: (f) => {
      oa.value = f, c(), f || (Ce.selectionGrid = []);
    },
    setTimePicker: (f, I = false) => {
      Ba.value = f, Ya.value = I, c(), f || (Ce.timePicker[0] = [], Ce.timePicker[1] = []);
    },
    setTimePickerElements: (f, I = 0) => {
      Ce.timePicker[I] = f;
    },
    arrowRight: n,
    arrowLeft: u,
    arrowUp: d,
    arrowDown: y,
    clearArrowNav: () => {
      Ce.monthYear = [], Ce.calendar = [], Ce.time = [], Ce.actionRow = [], Ce.selectionGrid = [], Ce.timePicker[0] = [], Ce.timePicker[1] = [], oa.value = false, Ba.value = false, Ya.value = false, _a.value = false, c(), Oa.value = null;
    },
    setMonthPicker: (f) => {
      _a.value = f, c();
    },
    refSets: Ce
    // exposed for testing
  };
};
var mn = (e) => ({
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
var zl = (e) => ({
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
var pn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Hl = (e) => {
  const t = typeof e == "object" && e, r = {
    static: true,
    solo: false
  };
  if (!e) return { ...r, count: pn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, u = pn(n);
  return Object.assign(r, a, { count: u });
};
var Ul = (e, t, r) => e || (typeof r == "string" ? r : t);
var Wl = (e) => typeof e == "boolean" ? e ? mn({}) : false : mn(e);
var Vl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: "open",
    selectOnFocus: false,
    rangeSeparator: " - ",
    escClose: true
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var jl = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Kl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Gl = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Ql = (e) => ({ ...{
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
var ql = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((r) => j(r)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var Xl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Jl = (e) => {
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
var Zl = (e) => e ? typeof e == "string" ? {
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
var Ia = (e, t, r, a) => new Map(
  e.map((n) => {
    const u = Qa(n, t, a);
    return [Ja(u, r), u];
  })
);
var xl = (e, t) => e.length ? new Map(
  e.map((r) => {
    const a = Qa(r.date, t);
    return [Ja(a, Nt.DATE), r];
  })
) : null;
var er = (e) => {
  var r;
  const t = Ol(e.isMonthPicker, e.isYearPicker);
  return {
    minDate: Fa(e.minDate, e.timezone, e.isSpecific),
    maxDate: Fa(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: Ta(e.disabledDates) ? Ia(e.disabledDates, e.timezone, t, e.isSpecific) : e.disabledDates,
    allowedDates: Ta(e.allowedDates) ? Ia(e.allowedDates, e.timezone, t, e.isSpecific) : null,
    highlight: typeof e.highlight == "object" && Ta((r = e.highlight) == null ? void 0 : r.dates) ? Ia(e.highlight.dates, e.timezone, t) : e.highlight,
    markers: xl(e.markers, e.timezone)
  };
};
var tr = (e) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: null } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var ar = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((r) => {
      const a = r, n = e[a], u = typeof e[a] == "string" ? { [n]: true } : Object.fromEntries(n.map((d) => [d, true]));
      return [r, u];
    })
  )
});
var _e = (e) => {
  const t = () => {
    const ee = e.enableSeconds ? ":ss" : "", x = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${x}${ee}` : `hh${x}${ee} aa`;
  }, r = () => {
    var ee;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((ee = H.value) == null ? void 0 : ee.type) === "iso" ? "II" : "ww"}-RR` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (ee) => In(ee, e.enableSeconds), n = () => z.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, u = computed(() => Hl(e.multiCalendars)), d = computed(() => n()), y = computed(() => zl(e.ariaLabels)), i = computed(() => jl(e.filters)), _ = computed(() => Wl(e.transitions)), c = computed(() => Kl(e.actionRow)), C = computed(
    () => Ul(e.previewFormat, e.format, r())
  ), m = computed(() => Vl(e.textInput)), P = computed(() => Gl(e.inline)), U = computed(() => Ql(e.config)), N = computed(() => ql(e.highlight)), H = computed(() => Xl(e.weekNumbers)), f = computed(() => Zl(e.timezone)), I = computed(() => tr(e.multiDates)), k = computed(
    () => er({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: N.value,
      markers: e.markers,
      timezone: f.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker,
      isMonthPicker: e.monthPicker,
      isYearPicker: e.yearPicker
    })
  ), z = computed(() => Jl(e.range)), q = computed(() => ar(e.ui));
  return {
    defaultedTransitions: _,
    defaultedMultiCalendars: u,
    defaultedStartTime: d,
    defaultedAriaLabels: y,
    defaultedFilters: i,
    defaultedActionRow: c,
    defaultedPreviewFormat: C,
    defaultedTextInput: m,
    defaultedInline: P,
    defaultedConfig: U,
    defaultedHighlight: N,
    defaultedWeekNumbers: H,
    defaultedRange: z,
    propDates: k,
    defaultedTz: f,
    defaultedMultiDates: I,
    defaultedUI: q,
    getDefaultPattern: r,
    getDefaultStartTime: n
  };
};
var nr = (e, t, r) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: u, defaultedTz: d, defaultedMultiDates: y, getDefaultPattern: i } = _e(t), _ = ref(""), c = toRef(t, "format"), C = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, R(true));
    },
    { deep: true }
  ), watch(u, (l, D) => {
    l.enabled !== D.enabled && (a.value = null);
  }), watch(c, () => {
    W();
  });
  const m = (l) => d.value.timezone && d.value.convertModel ? et(l, d.value.timezone) : l, P = (l) => {
    if (d.value.timezone && d.value.convertModel) {
      const D = kl(d.value.timezone, l);
      return addHours(l, D);
    }
    return l;
  }, U = (l, D, ue = false) => Nn(
    l,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    D ?? i(),
    ue
  ), N = (l) => l ? t.modelType ? oe(l) : {
    hours: getHours(l),
    minutes: getMinutes(l),
    seconds: t.enableSeconds ? getSeconds(l) : 0
  } : null, H = (l) => t.modelType ? oe(l) : { month: getMonth(l), year: getYear(l) }, f = (l) => Array.isArray(l) ? y.value.enabled ? l.map((D) => I(D, setYear(j(), D))) : ra(
    () => [
      setYear(j(), l[0]),
      l[1] ? setYear(j(), l[1]) : Yt(u.value.partialRange)
    ],
    u.value.enabled
  ) : setYear(j(), +l), I = (l, D) => (typeof l == "string" || typeof l == "number") && t.modelType ? T(l) : D, k = (l) => Array.isArray(l) ? [
    I(
      l[0],
      Mt(null, +l[0].hours, +l[0].minutes, l[0].seconds)
    ),
    I(
      l[1],
      Mt(null, +l[1].hours, +l[1].minutes, l[1].seconds)
    )
  ] : I(l, Mt(null, l.hours, l.minutes, l.seconds)), z = (l) => {
    const D = set(j(), { date: 1 });
    return Array.isArray(l) ? y.value.enabled ? l.map((ue) => I(ue, yt(D, +ue.month, +ue.year))) : ra(
      () => [
        I(l[0], yt(D, +l[0].month, +l[0].year)),
        I(
          l[1],
          l[1] ? yt(D, +l[1].month, +l[1].year) : Yt(u.value.partialRange)
        )
      ],
      u.value.enabled
    ) : I(l, yt(D, +l.month, +l.year));
  }, q = (l) => {
    if (Array.isArray(l))
      return l.map((D) => T(D));
    throw new Error(Xa.dateArr("multi-dates"));
  }, ee = (l) => {
    if (Array.isArray(l) && u.value.enabled) {
      const D = l[0], ue = l[1];
      return [
        j(Array.isArray(D) ? D[0] : null),
        Array.isArray(ue) && ue.length ? j(ue[0]) : null
      ];
    }
    return j(l[0]);
  }, x = (l) => t.modelAuto ? Array.isArray(l) ? [T(l[0]), T(l[1])] : t.autoApply ? [T(l)] : [T(l), null] : Array.isArray(l) ? ra(
    () => l[1] ? [
      T(l[0]),
      l[1] ? T(l[1]) : Yt(u.value.partialRange)
    ] : [T(l[0])],
    u.value.enabled
  ) : T(l), S = () => {
    Array.isArray(a.value) && u.value.enabled && a.value.length === 1 && a.value.push(Yt(u.value.partialRange));
  }, X = () => {
    const l = a.value;
    return [
      oe(l[0]),
      l[1] ? oe(l[1]) : Yt(u.value.partialRange)
    ];
  }, O = () => a.value[1] ? X() : oe(Ne(a.value[0])), K = () => (a.value || []).map((l) => oe(l)), fe = (l = false) => (l || S(), t.modelAuto ? O() : y.value.enabled ? K() : Array.isArray(a.value) ? ra(() => X(), u.value.enabled) : oe(Ne(a.value))), me = (l) => !l || Array.isArray(l) && !l.length ? null : t.timePicker ? k(Ne(l)) : t.monthPicker ? z(Ne(l)) : t.yearPicker ? f(Ne(l)) : y.value.enabled ? q(Ne(l)) : t.weekPicker ? ee(Ne(l)) : x(Ne(l)), v = (l) => {
    const D = me(l);
    za(Ne(D)) ? (a.value = Ne(D), W()) : (a.value = null, _.value = "");
  }, L = () => {
    const l = (D) => format(D, n.value.format);
    return `${l(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? l(a.value[1]) : ""}`;
  }, ne = () => r.value && a.value ? Array.isArray(a.value) ? L() : format(a.value, n.value.format) : U(a.value), p = () => a.value ? y.value.enabled ? a.value.map((l) => U(l)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? ne() : U(a.value) : "", W = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? _.value = p() : _.value = t.format(a.value);
  }, T = (l) => {
    if (t.utc) {
      const D = new Date(l);
      return t.utc === "preserve" ? new Date(D.getTime() + D.getTimezoneOffset() * 6e4) : D;
    }
    return t.modelType ? wl.includes(t.modelType) ? m(new Date(l)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? m(
      parse(l, i(), /* @__PURE__ */ new Date(), { locale: C.value })
    ) : m(
      parse(l, t.modelType, /* @__PURE__ */ new Date(), { locale: C.value })
    ) : m(new Date(l));
  }, oe = (l) => l ? t.utc ? _l(l, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +P(l) : t.modelType === "iso" ? P(l).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? U(P(l)) : U(P(l), t.modelType, true) : P(l) : "", $ = (l, D = false, ue = false) => {
    if (ue) return l;
    if (e("update:model-value", l), d.value.emitTimezone && D) {
      const M = Array.isArray(l) ? l.map((he) => et(Ne(he), d.value.emitTimezone)) : et(Ne(l), d.value.emitTimezone);
      e("update:model-timezone-value", M);
    }
  }, Y = (l) => Array.isArray(a.value) ? y.value.enabled ? a.value.map((D) => l(D)) : [
    l(a.value[0]),
    a.value[1] ? l(a.value[1]) : Yt(u.value.partialRange)
  ] : l(Ne(a.value)), g = () => {
    if (Array.isArray(a.value)) {
      const l = pt(a.value[0], t.weekStart), D = a.value[1] ? pt(a.value[1], t.weekStart) : [];
      return [l.map((ue) => j(ue)), D.map((ue) => j(ue))];
    }
    return pt(a.value, t.weekStart).map((l) => j(l));
  }, Z = (l, D) => $(Ne(Y(l)), false, D), se = (l) => {
    const D = g();
    return l ? D : e("update:model-value", g());
  }, R = (l = false) => (l || W(), t.monthPicker ? Z(H, l) : t.timePicker ? Z(N, l) : t.yearPicker ? Z(getYear, l) : t.weekPicker ? se(l) : $(fe(l), true, l));
  return {
    inputValue: _,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? u.value.enabled ? u.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: v,
    formatInputValue: W,
    emitModelValue: R
  };
};
var lr = (e, t) => {
  const { defaultedFilters: r, propDates: a } = _e(e), { validateMonthYearInRange: n } = Tt(e), u = (c, C) => {
    let m = c;
    return r.value.months.includes(getMonth(m)) ? (m = C ? addMonths(c, 1) : subMonths(c, 1), u(m, C)) : m;
  }, d = (c, C) => {
    let m = c;
    return r.value.years.includes(getYear(m)) ? (m = C ? addYears(c, 1) : subYears(c, 1), d(m, C)) : m;
  }, y = (c, C = false) => {
    const m = set(j(), { month: e.month, year: e.year });
    let P = c ? addMonths(m, 1) : subMonths(m, 1);
    e.disableYearSelect && (P = setYear(P, e.year));
    let U = getMonth(P), N = getYear(P);
    r.value.months.includes(U) && (P = u(P, c), U = getMonth(P), N = getYear(P)), r.value.years.includes(N) && (P = d(P, c), N = getYear(P)), n(U, N, c, e.preventMinMaxNavigation) && i(U, N, C);
  }, i = (c, C, m) => {
    t("update-month-year", { month: c, year: C, fromNav: m });
  }, _ = computed(() => (c) => En(
    set(j(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    c
  ));
  return { handleMonthYearChange: y, isDisabled: _, updateMonthYear: i };
};
var va = {
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
  alwaysClearable: { type: Boolean, default: false },
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
var ct = {
  ...va,
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
var rr = ["title"];
var or = ["disabled"];
var sr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...ct
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const r = t, a = e, {
      defaultedActionRow: n,
      defaultedPreviewFormat: u,
      defaultedMultiCalendars: d,
      defaultedTextInput: y,
      defaultedInline: i,
      defaultedRange: _,
      defaultedMultiDates: c
    } = _e(a), { isTimeValid: C, isMonthValid: m } = Tt(a), { buildMatrix: P } = At(), U = ref(null), N = ref(null), H = ref(false), f = ref({}), I = ref(null), k = ref(null);
    onMounted(() => {
      a.arrowNavigation && P([Le(U), Le(N)], "actionRow"), z(), window.addEventListener("resize", z);
    }), onUnmounted(() => {
      window.removeEventListener("resize", z);
    });
    const z = () => {
      H.value = false, setTimeout(() => {
        var ne, p;
        const v = (ne = I.value) == null ? void 0 : ne.getBoundingClientRect(), L = (p = k.value) == null ? void 0 : p.getBoundingClientRect();
        v && L && (f.value.maxWidth = `${L.width - v.width - 20}px`), H.value = true;
      }, 0);
    }, q = computed(() => _.value.enabled && !_.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), ee = computed(
      () => !C.value(a.internalModelValue) || !m.value(a.internalModelValue) || !q.value
    ), x = () => {
      const v = u.value;
      return a.timePicker || a.monthPicker, v(Ne(a.internalModelValue));
    }, S = () => {
      const v = a.internalModelValue;
      return d.value.count > 0 ? `${X(v[0])} - ${X(v[1])}` : [X(v[0]), X(v[1])];
    }, X = (v) => Nn(
      v,
      u.value,
      a.formatLocale,
      y.value.rangeSeparator,
      a.modelAuto,
      u.value
    ), O = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof u.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? S() : c.value.enabled ? a.internalModelValue.map((v) => `${X(v)}`) : a.modelAuto ? `${X(a.internalModelValue[0])}` : `${X(a.internalModelValue[0])} -` : X(a.internalModelValue) : x()), K = () => c.value.enabled ? "; " : " - ", fe = computed(
      () => Array.isArray(O.value) ? O.value.join(K()) : O.value
    ), me = () => {
      C.value(a.internalModelValue) && m.value(a.internalModelValue) && q.value ? r("select-date") : r("invalid-select");
    };
    return (v, L) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: k,
      class: "dp__action_row"
    }, [
      v.$slots["action-row"] ? renderSlot(v.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: v.internalModelValue,
        disabled: ee.value,
        selectDate: () => v.$emit("select-date"),
        closePicker: () => v.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: fe.value,
          style: normalizeStyle(f.value)
        }, [
          v.$slots["action-preview"] && H.value ? renderSlot(v.$slots, "action-preview", {
            key: 0,
            value: v.internalModelValue
          }) : createCommentVNode("", true),
          !v.$slots["action-preview"] && H.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(fe.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, rr)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: I,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          v.$slots["action-buttons"] ? renderSlot(v.$slots, "action-buttons", {
            key: 0,
            value: v.internalModelValue
          }) : createCommentVNode("", true),
          v.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(i).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: U,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: L[0] || (L[0] = (ne) => v.$emit("close-picker")),
              onKeydown: L[1] || (L[1] = (ne) => unref(Ze)(ne, () => v.$emit("close-picker")))
            }, toDisplayString(v.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: L[2] || (L[2] = (ne) => v.$emit("select-now")),
              onKeydown: L[3] || (L[3] = (ne) => unref(Ze)(ne, () => v.$emit("select-now")))
            }, toDisplayString(v.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: N,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: ee.value,
              "data-test-id": "select-button",
              onKeydown: L[4] || (L[4] = (ne) => unref(Ze)(ne, () => me())),
              onClick: me
            }, toDisplayString(v.selectText), 41, or)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var ur = ["role", "aria-label", "tabindex"];
var ir = { class: "dp__selection_grid_header" };
var dr = ["aria-selected", "aria-disabled", "data-test-id", "onClick", "onKeydown", "onMouseover"];
var cr = ["aria-label"];
var ea = defineComponent({
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
  setup(e, { expose: t, emit: r }) {
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: u } = At(), d = r, y = e, { defaultedAriaLabels: i, defaultedTextInput: _, defaultedConfig: c } = _e(
      y
    ), { hideNavigationButtons: C } = ya(), m = ref(false), P = ref(null), U = ref(null), N = ref([]), H = ref(), f = ref(null), I = ref(0), k = ref(null);
    onBeforeUpdate(() => {
      P.value = null;
    }), onMounted(() => {
      nextTick().then(() => K()), y.noOverlayFocus || q(), z(true);
    }), onUnmounted(() => z(false));
    const z = (Y) => {
      var g;
      y.arrowNavigation && ((g = y.headerRefs) != null && g.length ? u(Y) : a(Y));
    }, q = () => {
      var g;
      const Y = Le(U);
      Y && (_.value.enabled || (P.value ? (g = P.value) == null || g.focus({ preventScroll: true }) : Y.focus({ preventScroll: true })), m.value = Y.clientHeight < Y.scrollHeight);
    }, ee = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !y.useRelative,
        "dp--overlay-relative": y.useRelative
      })
    ), x = computed(
      () => y.useRelative ? { height: `${y.height}px`, width: "var(--dp-menu-min-width)" } : void 0
    ), S = computed(() => ({
      dp__overlay_col: true
    })), X = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: m.value,
        dp__button_bottom: y.isLast
      })
    ), O = computed(() => {
      var Y, g;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((Y = y.items) == null ? void 0 : Y.length) <= 6,
        dp__container_block: ((g = y.items) == null ? void 0 : g.length) > 6
      };
    });
    watch(
      () => y.items,
      () => K(false),
      { deep: true }
    );
    const K = (Y = true) => {
      nextTick().then(() => {
        const g = Le(P), Z = Le(U), se = Le(f), R = Le(k), ae = se ? se.getBoundingClientRect().height : 0;
        Z && (Z.getBoundingClientRect().height ? I.value = Z.getBoundingClientRect().height - ae : I.value = c.value.modeHeight - ae), g && R && Y && (R.scrollTop = g.offsetTop - R.offsetTop - (I.value / 2 - g.getBoundingClientRect().height) - ae);
      });
    }, fe = (Y) => {
      Y.disabled || d("selected", Y.value);
    }, me = () => {
      d("toggle"), d("reset-flow");
    }, v = () => {
      y.escClose && me();
    }, L = (Y, g, Z, se) => {
      Y && ((g.active || g.value === y.focusValue) && (P.value = Y), y.arrowNavigation && (Array.isArray(N.value[Z]) ? N.value[Z][se] = Y : N.value[Z] = [Y], ne()));
    }, ne = () => {
      var g, Z;
      const Y = (g = y.headerRefs) != null && g.length ? [y.headerRefs].concat(N.value) : N.value.concat([y.skipButtonRef ? [] : [f.value]]);
      n(Ne(Y), (Z = y.headerRefs) != null && Z.length ? "monthPicker" : "selectionGrid");
    }, p = (Y) => {
      y.arrowNavigation || Dt(Y, c.value, true);
    }, W = (Y) => {
      H.value = Y, d("hover-value", Y);
    }, T = () => {
      if (me(), !y.isLast) {
        const Y = La(y.menuWrapRef ?? null, "action-row");
        if (Y) {
          const g = Rn(Y);
          g == null || g.focus();
        }
      }
    }, oe = (Y) => {
      switch (Y.key) {
        case Oe.esc:
          return v();
        case Oe.arrowLeft:
          return p(Y);
        case Oe.arrowRight:
          return p(Y);
        case Oe.arrowUp:
          return p(Y);
        case Oe.arrowDown:
          return p(Y);
        default:
          return;
      }
    }, $ = (Y) => {
      if (Y.key === Oe.enter) return me();
      if (Y.key === Oe.tab) return T();
    };
    return t({ focusGrid: q }), (Y, g) => {
      var Z;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: U,
        class: normalizeClass(ee.value),
        style: normalizeStyle(x.value),
        role: Y.useRelative ? void 0 : "dialog",
        "aria-label": Y.overlayLabel,
        tabindex: Y.useRelative ? void 0 : "0",
        onKeydown: oe,
        onClick: g[0] || (g[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: k,
          class: normalizeClass(O.value),
          style: normalizeStyle({ "--dp-overlay-height": `${I.value}px` }),
          role: "grid"
        }, [
          createBaseVNode("div", ir, [
            renderSlot(Y.$slots, "header")
          ]),
          Y.$slots.overlay ? renderSlot(Y.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(Y.items, (se, R) => (openBlock(), createElementBlock("div", {
            key: R,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: Y.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(se, (ae, l) => (openBlock(), createElementBlock("div", {
              key: ae.value,
              ref_for: true,
              ref: (D) => L(D, ae, R, l),
              role: "gridcell",
              class: normalizeClass(S.value),
              "aria-selected": ae.active || void 0,
              "aria-disabled": ae.disabled || void 0,
              tabindex: "0",
              "data-test-id": ae.text,
              onClick: withModifiers((D) => fe(ae), ["prevent"]),
              onKeydown: (D) => unref(Ze)(D, () => fe(ae), true),
              onMouseover: (D) => W(ae.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(ae.className)
              }, [
                Y.$slots.item ? renderSlot(Y.$slots, "item", {
                  key: 0,
                  item: ae
                }) : createCommentVNode("", true),
                Y.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(ae.text), 1)
                ], 64))
              ], 2)
            ], 42, dr))), 128))
          ], 2))), 128))
        ], 6),
        Y.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: f,
          type: "button",
          "aria-label": (Z = unref(i)) == null ? void 0 : Z.toggleOverlay,
          class: normalizeClass(X.value),
          tabindex: "0",
          onClick: me,
          onKeydown: $
        }, [
          renderSlot(Y.$slots, "button-icon")
        ], 42, cr)), [
          [vShow, !unref(C)(Y.hideNavigation, Y.type)]
        ]) : createCommentVNode("", true)
      ], 46, ur);
    };
  }
});
var fr = ["data-dp-mobile"];
var ma = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean },
    isMobile: { type: Boolean }
  },
  setup(e) {
    const t = e, r = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), a = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (n, u) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0,
        "dp--flex-display-collapsed": n.collapse
      }),
      "data-dp-mobile": n.isMobile
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (d, y) => (openBlock(), createElementBlock("div", {
        key: d,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: d,
          index: y
        })
      ], 2))), 128))
    ], 10, fr));
  }
});
var vr = ["data-dp-element", "aria-label", "aria-disabled"];
var Kt = defineComponent({
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
    const r = t, a = ref(null);
    return onMounted(() => r("set-ref", a)), (n, u) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a,
      type: "button",
      "data-dp-element": n.elName,
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: u[0] || (u[0] = (d) => n.$emit("activate")),
      onKeydown: u[1] || (u[1] = (d) => unref(Ze)(d, () => n.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, vr));
  }
});
var mr = ["aria-label", "data-test-id"];
var zn = defineComponent({
  __name: "YearModePicker",
  props: {
    ...ct,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const r = t, a = e, { showRightIcon: n, showLeftIcon: u } = ya(), { defaultedConfig: d, defaultedMultiCalendars: y, defaultedAriaLabels: i, defaultedTransitions: _, defaultedUI: c } = _e(a), { showTransition: C, transitionName: m } = ta(_), P = ref(false), U = (f = false, I) => {
      P.value = !P.value, r("toggle-year-picker", { flow: f, show: I });
    }, N = (f) => {
      P.value = false, r("year-select", f);
    }, H = (f = false) => {
      r("handle-year", f);
    };
    return (f, I) => {
      var k, z, q, ee, x;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["dp--year-mode-picker", { "dp--hidden-el": P.value }])
        }, [
          unref(u)(unref(y), e.instance) ? (openBlock(), createBlock(Kt, {
            key: 0,
            ref: "mpPrevIconRef",
            "aria-label": (k = unref(i)) == null ? void 0 : k.prevYear,
            disabled: e.isDisabled(false),
            class: normalizeClass((z = unref(c)) == null ? void 0 : z.navBtnPrev),
            onActivate: I[0] || (I[0] = (S) => H(false))
          }, {
            default: withCtx(() => [
              f.$slots["arrow-left"] ? renderSlot(f.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              f.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
          createBaseVNode("button", {
            ref: "mpYearButtonRef",
            class: "dp__btn dp--year-select",
            type: "button",
            "aria-label": `${e.year}-${(q = unref(i)) == null ? void 0 : q.openYearsOverlay}`,
            "data-test-id": `year-mode-btn-${e.instance}`,
            onClick: I[1] || (I[1] = () => U(false)),
            onKeydown: I[2] || (I[2] = withKeys(() => U(false), ["enter"]))
          }, [
            f.$slots.year ? renderSlot(f.$slots, "year", {
              key: 0,
              year: e.year
            }) : createCommentVNode("", true),
            f.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(e.year), 1)
            ], 64))
          ], 40, mr),
          unref(n)(unref(y), e.instance) ? (openBlock(), createBlock(Kt, {
            key: 1,
            ref: "mpNextIconRef",
            "aria-label": (ee = unref(i)) == null ? void 0 : ee.nextYear,
            disabled: e.isDisabled(true),
            class: normalizeClass((x = unref(c)) == null ? void 0 : x.navBtnNext),
            onActivate: I[3] || (I[3] = (S) => H(true))
          }, {
            default: withCtx(() => [
              f.$slots["arrow-right"] ? renderSlot(f.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
              f.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true)
        ], 2),
        createVNode(Transition, {
          name: unref(m)(e.showYearPicker),
          css: unref(C)
        }, {
          default: withCtx(() => {
            var S, X;
            return [
              e.showYearPicker ? (openBlock(), createBlock(ea, {
                key: 0,
                items: e.items,
                "text-input": f.textInput,
                "esc-close": f.escClose,
                config: f.config,
                "is-last": f.autoApply && !unref(d).keepActionRow,
                "hide-navigation": f.hideNavigation,
                "aria-labels": f.ariaLabels,
                "overlay-label": (X = (S = unref(i)) == null ? void 0 : S.yearPicker) == null ? void 0 : X.call(S, true),
                type: "year",
                onToggle: U,
                onSelected: I[4] || (I[4] = (O) => N(O))
              }, createSlots({
                "button-icon": withCtx(() => [
                  f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                  f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wt), { key: 1 }))
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
var xa = (e, t, r) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((a) => Ae(e, a))) {
      const a = t.value.filter((n) => !Ae(n, e));
      t.value = a.length ? a : null;
    } else (r && +r > t.value.length || !r) && t.value.push(e);
  else
    t.value = [e];
};
var en = (e, t, r) => {
  let a = e.value ? e.value.slice() : [];
  return a.length === 2 && a[1] !== null && (a = []), a.length ? (Ye(t, a[0]) ? a.unshift(t) : a[1] = t, r("range-end", t)) : (a = [t], r("range-start", t)), a;
};
var pa = (e, t, r, a) => {
  e && (e[0] && e[1] && r && t("auto-apply"), e[0] && !e[1] && a && r && t("auto-apply"));
};
var Hn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => et(j(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = et(j(e.value), e.timezone));
};
var Un = (e, t, r, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Ee(e, t.value[0]) || Ae(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (Ye(e, t.value[1]) || Ae(e, t.value[1])) ? [e, t.value[1]] : (r("invalid-fixed-range", e), t.value) : [];
var Wn = ({
  multiCalendars: e,
  range: t,
  highlight: r,
  propDates: a,
  calendars: n,
  modelValue: u,
  props: d,
  filters: y,
  year: i,
  month: _,
  emit: c
}) => {
  const C = computed(() => qa(d.yearRange, d.locale, d.reverseYears)), m = ref([false]), P = computed(() => (O, K) => {
    const fe = set(dt(/* @__PURE__ */ new Date()), {
      month: _.value(O),
      year: i.value(O)
    }), me = K ? endOfYear(fe) : startOfYear(fe);
    return En(
      me,
      a.value.maxDate,
      a.value.minDate,
      d.preventMinMaxNavigation,
      K
    );
  }), U = () => Array.isArray(u.value) && e.value.solo && u.value[1], N = () => {
    for (let O = 0; O < e.value.count; O++)
      if (O === 0)
        n.value[O] = n.value[0];
      else if (O === e.value.count - 1 && U())
        n.value[O] = {
          month: getMonth(u.value[1]),
          year: getYear(u.value[1])
        };
      else {
        const K = set(j(), n.value[O - 1]);
        n.value[O] = { month: getMonth(K), year: getYear(addYears(K, 1)) };
      }
  }, H = (O) => {
    if (!O) return N();
    const K = set(j(), n.value[O]);
    return n.value[0].year = getYear(subYears(K, e.value.count - 1)), N();
  }, f = (O, K) => {
    const fe = differenceInYears(K, O);
    return t.value.showLastInRange && fe > 1 ? K : O;
  }, I = (O) => d.focusStartDate || e.value.solo ? O[0] : O[1] ? f(O[0], O[1]) : O[0], k = () => {
    if (u.value) {
      const O = Array.isArray(u.value) ? I(u.value) : u.value;
      n.value[0] = { month: getMonth(O), year: getYear(O) };
    }
  }, z = () => {
    k(), e.value.count && N();
  };
  watch(u, (O, K) => {
    d.isTextInputDate && JSON.stringify(O ?? {}) !== JSON.stringify(K ?? {}) && z();
  }), onMounted(() => {
    z();
  });
  const q = (O, K) => {
    n.value[K].year = O, c("update-month-year", { instance: K, year: O, month: n.value[K].month }), e.value.count && !e.value.solo && H(K);
  }, ee = computed(() => (O) => zt(C.value, (K) => {
    var L;
    const fe = i.value(O) === K.value, me = Xt(
      K.value,
      Ht(a.value.minDate),
      Ht(a.value.maxDate)
    ) || ((L = y.value.years) == null ? void 0 : L.includes(i.value(O))), v = Za(r.value, K.value);
    return { active: fe, disabled: me, highlighted: v };
  })), x = (O, K) => {
    q(O, K), X(K);
  }, S = (O, K = false) => {
    if (!P.value(O, K)) {
      const fe = K ? i.value(O) + 1 : i.value(O) - 1;
      q(fe, O);
    }
  }, X = (O, K = false, fe) => {
    K || c("reset-flow"), fe !== void 0 ? m.value[O] = fe : m.value[O] = !m.value[O], m.value[O] ? c("overlay-toggle", { open: true, overlay: Ge.year }) : (c("overlay-closed"), c("overlay-toggle", { open: false, overlay: Ge.year }));
  };
  return {
    isDisabled: P,
    groupedYears: ee,
    showYearPicker: m,
    selectYear: q,
    toggleYearPicker: X,
    handleYearSelect: x,
    handleYear: S
  };
};
var pr = (e, t) => {
  const {
    defaultedMultiCalendars: r,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: u,
    defaultedRange: d,
    defaultedHighlight: y,
    propDates: i,
    defaultedTz: _,
    defaultedFilters: c,
    defaultedMultiDates: C
  } = _e(e), m = () => {
    e.isTextInputDate && z(getYear(j(e.startDate)), 0);
  }, { modelValue: P, year: U, month: N, calendars: H } = aa(e, t, m), f = computed(() => Sn(e.formatLocale, e.locale, e.monthNameFormat)), I = ref(null), { checkMinMaxRange: k } = Tt(e), {
    selectYear: z,
    groupedYears: q,
    showYearPicker: ee,
    toggleYearPicker: x,
    handleYearSelect: S,
    handleYear: X,
    isDisabled: O
  } = Wn({
    modelValue: P,
    multiCalendars: r,
    range: d,
    highlight: y,
    calendars: H,
    year: U,
    propDates: i,
    month: N,
    filters: c,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (P.value && e.focusStartDate || !P.value) && z(getYear(j(e.startDate)), 0);
  });
  const K = (R) => R ? { month: getMonth(R), year: getYear(R) } : { month: null, year: null }, fe = () => P.value ? Array.isArray(P.value) ? P.value.map((R) => K(R)) : K(P.value) : K(), me = (R, ae) => {
    const l = H.value[R], D = fe();
    return Array.isArray(D) ? D.some((ue) => ue.year === (l == null ? void 0 : l.year) && ue.month === ae) : (l == null ? void 0 : l.year) === D.year && ae === D.month;
  }, v = (R, ae, l) => {
    var ue, M;
    const D = fe();
    return Array.isArray(D) ? U.value(ae) === ((ue = D[l]) == null ? void 0 : ue.year) && R === ((M = D[l]) == null ? void 0 : M.month) : false;
  }, L = (R, ae) => {
    if (d.value.enabled) {
      const l = fe();
      if (Array.isArray(P.value) && Array.isArray(l)) {
        const D = v(R, ae, 0) || v(R, ae, 1), ue = yt(dt(j()), R, U.value(ae));
        return Jt(P.value, I.value, ue) && !D;
      }
      return false;
    }
    return false;
  }, ne = computed(() => (R) => zt(f.value, (ae) => {
    var he;
    const l = me(R, ae.value), D = Xt(
      ae.value,
      Bn(U.value(R), i.value.minDate),
      _n(U.value(R), i.value.maxDate)
    ) || Fl(i.value.disabledDates, U.value(R), ae.value) || ((he = c.value.months) == null ? void 0 : he.includes(ae.value)) || !Ll(i.value.allowedDates, U.value(R), ae.value), ue = L(ae.value, R), M = Fn(y.value, ae.value, U.value(R));
    return { active: l, disabled: D, isBetween: ue, highlighted: M };
  })), p = (R, ae) => yt(dt(j()), R, U.value(ae)), W = (R, ae) => {
    const l = P.value ? P.value : dt(/* @__PURE__ */ new Date());
    P.value = yt(l, R, U.value(ae)), t("auto-apply"), t("update-flow-step");
  }, T = (R, ae) => {
    const l = p(R, ae);
    d.value.fixedEnd || d.value.fixedStart ? P.value = Un(l, P, t, d) : P.value ? k(l, P.value) && (P.value = en(P, p(R, ae), t)) : P.value = [p(R, ae)], nextTick().then(() => {
      pa(P.value, t, e.autoApply, e.modelAuto);
    });
  }, oe = (R, ae) => {
    xa(p(R, ae), P, C.value.limit), t("auto-apply", true);
  }, $ = (R, ae) => (H.value[ae].month = R, g(ae, H.value[ae].year, R), C.value.enabled ? oe(R, ae) : d.value.enabled ? T(R, ae) : W(R, ae)), Y = (R, ae) => {
    z(R, ae), g(ae, R, null);
  }, g = (R, ae, l) => {
    let D = l;
    if (!D && D !== 0) {
      const ue = fe();
      D = Array.isArray(ue) ? ue[R].month : ue.month;
    }
    t("update-month-year", { instance: R, year: ae, month: D });
  };
  return {
    groupedMonths: ne,
    groupedYears: q,
    year: U,
    isDisabled: O,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: u,
    showYearPicker: ee,
    modelValue: P,
    presetDate: (R, ae) => {
      Hn({
        value: R,
        modelValue: P,
        range: d.value.enabled,
        timezone: ae ? void 0 : _.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (R, ae) => {
      I.value = p(R, ae);
    },
    selectMonth: $,
    selectYear: Y,
    toggleYearPicker: x,
    handleYearSelect: S,
    handleYear: X,
    getModelMonthYear: fe
  };
};
var yr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...ct
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = useSlots(), u = tt(n, "yearMode"), d = e;
    onMounted(() => {
      d.shadow || a("mount", null);
    });
    const {
      groupedMonths: y,
      groupedYears: i,
      year: _,
      isDisabled: c,
      defaultedMultiCalendars: C,
      defaultedConfig: m,
      showYearPicker: P,
      modelValue: U,
      presetDate: N,
      setHoverDate: H,
      selectMonth: f,
      selectYear: I,
      toggleYearPicker: k,
      handleYearSelect: z,
      handleYear: q,
      getModelMonthYear: ee
    } = pr(d, a);
    return t({ getSidebarProps: () => ({
      modelValue: U,
      year: _,
      getModelMonthYear: ee,
      selectMonth: f,
      selectYear: I,
      handleYear: q
    }), presetDate: N, toggleYearPicker: (S) => k(0, S) }), (S, X) => (openBlock(), createBlock(ma, {
      "multi-calendars": unref(C).count,
      collapse: S.collapse,
      stretch: "",
      "is-mobile": S.isMobile
    }, {
      default: withCtx(({ instance: O }) => [
        S.$slots["top-extra"] ? renderSlot(S.$slots, "top-extra", {
          key: 0,
          value: S.internalModelValue
        }) : createCommentVNode("", true),
        S.$slots["month-year"] ? renderSlot(S.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(_),
          months: unref(y)(O),
          years: unref(i)(O),
          selectMonth: unref(f),
          selectYear: unref(I),
          instance: O
        }))) : (openBlock(), createBlock(ea, {
          key: 2,
          items: unref(y)(O),
          "arrow-navigation": S.arrowNavigation,
          "is-last": S.autoApply && !unref(m).keepActionRow,
          "esc-close": S.escClose,
          height: unref(m).modeHeight,
          config: S.config,
          "no-overlay-focus": !!(S.noOverlayFocus || S.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (K) => unref(f)(K, O),
          onHoverValue: (K) => unref(H)(K, O)
        }, createSlots({
          header: withCtx(() => [
            createVNode(zn, mergeProps(S.$props, {
              items: unref(i)(O),
              instance: O,
              "show-year-picker": unref(P)[O],
              year: unref(_)(O),
              "is-disabled": (K) => unref(c)(O, K),
              onHandleYear: (K) => unref(q)(O, K),
              onYearSelect: (K) => unref(z)(K, O),
              onToggleYearPicker: (K) => unref(k)(O, K == null ? void 0 : K.flow, K == null ? void 0 : K.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(u), (K, fe) => ({
                name: K,
                fn: withCtx((me) => [
                  renderSlot(S.$slots, K, normalizeProps(guardReactiveProps(me)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          S.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: K }) => [
              renderSlot(S.$slots, "month-overlay-value", {
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
var gr = (e, t) => {
  const r = () => {
    e.isTextInputDate && (c.value = getYear(j(e.startDate)));
  }, { modelValue: a } = aa(e, t, r), n = ref(null), { defaultedHighlight: u, defaultedMultiDates: d, defaultedFilters: y, defaultedRange: i, propDates: _ } = _e(e), c = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (c.value = getYear(j(e.startDate)));
  });
  const C = (k) => Array.isArray(a.value) ? a.value.some((z) => getYear(z) === k) : a.value ? getYear(a.value) === k : false, m = (k) => i.value.enabled && Array.isArray(a.value) ? Jt(a.value, n.value, H(k)) : false, P = (k) => _.value.allowedDates instanceof Map ? _.value.allowedDates.size ? _.value.allowedDates.has(`${k}`) : false : true, U = (k) => _.value.disabledDates instanceof Map ? _.value.disabledDates.size ? _.value.disabledDates.has(`${k}`) : false : true, N = computed(() => zt(qa(e.yearRange, e.locale, e.reverseYears), (k) => {
    const z = C(k.value), q = Xt(
      k.value,
      Ht(_.value.minDate),
      Ht(_.value.maxDate)
    ) || y.value.years.includes(k.value) || !P(k.value) || U(k.value), ee = m(k.value) && !z, x = Za(u.value, k.value);
    return { active: z, disabled: q, isBetween: ee, highlighted: x };
  })), H = (k) => setYear(dt(startOfYear(/* @__PURE__ */ new Date())), k);
  return {
    groupedYears: N,
    modelValue: a,
    focusYear: c,
    setHoverValue: (k) => {
      n.value = setYear(dt(/* @__PURE__ */ new Date()), k);
    },
    selectYear: (k) => {
      var z;
      if (t("update-month-year", { instance: 0, year: k }), d.value.enabled)
        return a.value ? Array.isArray(a.value) && (((z = a.value) == null ? void 0 : z.map((ee) => getYear(ee))).includes(k) ? a.value = a.value.filter((ee) => getYear(ee) !== k) : a.value.push(setYear(We(j()), k))) : a.value = [setYear(We(startOfYear(j())), k)], t("auto-apply", true);
      i.value.enabled ? (a.value = en(a, H(k), t), nextTick().then(() => {
        pa(a.value, t, e.autoApply, e.modelAuto);
      })) : (a.value = H(k), t("auto-apply"));
    }
  };
};
var hr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...ct
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
    const a = r, n = e, { groupedYears: u, modelValue: d, focusYear: y, selectYear: i, setHoverValue: _ } = gr(n, a), { defaultedConfig: c } = _e(n);
    return t({ getSidebarProps: () => ({
      modelValue: d,
      selectYear: i
    }) }), (m, P) => (openBlock(), createElementBlock("div", null, [
      m.$slots["top-extra"] ? renderSlot(m.$slots, "top-extra", {
        key: 0,
        value: m.internalModelValue
      }) : createCommentVNode("", true),
      m.$slots["month-year"] ? renderSlot(m.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(u),
        selectYear: unref(i)
      }))) : (openBlock(), createBlock(ea, {
        key: 2,
        items: unref(u),
        "is-last": m.autoApply && !unref(c).keepActionRow,
        height: unref(c).modeHeight,
        config: m.config,
        "no-overlay-focus": !!(m.noOverlayFocus || m.textInput),
        "focus-value": unref(y),
        type: "year",
        "use-relative": "",
        onSelected: unref(i),
        onHoverValue: unref(_)
      }, createSlots({ _: 2 }, [
        m.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: U }) => [
            renderSlot(m.$slots, "year-overlay-value", {
              text: U.text,
              value: U.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var br = {
  key: 0,
  class: "dp__time_input"
};
var kr = ["data-compact", "data-collapsed"];
var wr = ["data-test-id", "aria-label", "onKeydown", "onClick", "onMousedown"];
var Dr = ["aria-label", "disabled", "data-test-id", "onKeydown", "onClick"];
var Mr = ["data-test-id", "aria-label", "onKeydown", "onClick", "onMousedown"];
var $r = { key: 0 };
var Ar = ["aria-label", "data-compact"];
var Tr = defineComponent({
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
    ...ct
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, { setTimePickerElements: u, setTimePickerBackRef: d } = At(), {
      defaultedAriaLabels: y,
      defaultedTransitions: i,
      defaultedFilters: _,
      defaultedConfig: c,
      defaultedRange: C,
      defaultedMultiCalendars: m
    } = _e(n), { transitionName: P, showTransition: U } = ta(i), N = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), H = ref("AM"), f = ref(null), I = ref([]), k = ref(), z = ref(false);
    onMounted(() => {
      a("mounted");
    });
    const q = (o) => set(/* @__PURE__ */ new Date(), {
      hours: o.hours,
      minutes: o.minutes,
      seconds: n.enableSeconds ? o.seconds : 0,
      milliseconds: 0
    }), ee = computed(
      () => (o) => T(o, n[o]) || S(o, n[o])
    ), x = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), S = (o, E) => C.value.enabled && !C.value.disableTimeRangeValidation ? !n.validateTime(o, E) : false, X = (o, E) => {
      if (C.value.enabled && !C.value.disableTimeRangeValidation) {
        const ce = E ? +n[`${o}Increment`] : -+n[`${o}Increment`], B = n[o] + ce;
        return !n.validateTime(o, B);
      }
      return false;
    }, O = computed(() => (o) => !Z(+n[o] + +n[`${o}Increment`], o) || X(o, true)), K = computed(() => (o) => !Z(+n[o] - +n[`${o}Increment`], o) || X(o, false)), fe = (o, E) => add(set(j(), o), E), me = (o, E) => sub(set(j(), o), E), v = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), L = computed(
      () => n.timePickerInline && C.value.enabled && !m.value.count
    ), ne = computed(() => {
      const o = [{ type: "hours" }];
      return n.enableMinutes && o.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && o.push({ type: "", separator: true }, {
        type: "seconds"
      }), o;
    }), p = computed(() => ne.value.filter((o) => !o.separator)), W = computed(() => (o) => {
      if (o === "hours") {
        const E = ue(+n.hours);
        return { text: E < 10 ? `0${E}` : `${E}`, value: E };
      }
      return { text: n[o] < 10 ? `0${n[o]}` : `${n[o]}`, value: n[o] };
    }), T = (o, E) => {
      var B;
      if (!n.disabledTimesConfig) return false;
      const ce = n.disabledTimesConfig(n.order, o === "hours" ? E : void 0);
      return ce[o] ? !!((B = ce[o]) != null && B.includes(E)) : true;
    }, oe = (o, E) => E !== "hours" || H.value === "AM" ? o : o + 12, $ = (o) => {
      const E = n.is24 ? 24 : 12, ce = o === "hours" ? E : 60, B = +n[`${o}GridIncrement`], Me = o === "hours" && !n.is24 ? B : 0, be = [];
      for (let Se = Me; Se < ce; Se += B)
        be.push({ value: n.is24 ? Se : oe(Se, o), text: Se < 10 ? `0${Se}` : `${Se}` });
      return o === "hours" && !n.is24 && be.unshift({ value: H.value === "PM" ? 12 : 0, text: "12" }), zt(be, (Se) => ({ active: false, disabled: _.value.times[o].includes(Se.value) || !Z(Se.value, o) || T(o, Se.value) || S(o, Se.value) }));
    }, Y = (o) => o >= 0 ? o : 59, g = (o) => o >= 0 ? o : 23, Z = (o, E) => {
      const ce = n.minTime ? q(Sa(n.minTime)) : null, B = n.maxTime ? q(Sa(n.maxTime)) : null, Me = q(
        Sa(
          x.value,
          E,
          E === "minutes" || E === "seconds" ? Y(o) : g(o)
        )
      );
      return ce && B ? (isBefore(Me, B) || isEqual(Me, B)) && (isAfter(Me, ce) || isEqual(Me, ce)) : ce ? isAfter(Me, ce) || isEqual(Me, ce) : B ? isBefore(Me, B) || isEqual(Me, B) : true;
    }, se = (o) => n[`no${o[0].toUpperCase() + o.slice(1)}Overlay`], R = (o) => {
      se(o) || (N[o] = !N[o], N[o] ? (z.value = true, a("overlay-opened", o)) : (z.value = false, a("overlay-closed", o)));
    }, ae = (o) => o === "hours" ? getHours : o === "minutes" ? getMinutes : getSeconds, l = () => {
      k.value && clearTimeout(k.value);
    }, D = (o, E = true, ce) => {
      const B = E ? fe : me, Me = E ? +n[`${o}Increment`] : -+n[`${o}Increment`];
      Z(+n[o] + Me, o) && a(
        `update:${o}`,
        ae(o)(B({ [o]: +n[o] }, { [o]: +n[`${o}Increment`] }))
      ), !(ce != null && ce.keyboard) && c.value.timeArrowHoldThreshold && (k.value = setTimeout(() => {
        D(o, E);
      }, c.value.timeArrowHoldThreshold));
    }, ue = (o) => n.is24 ? o : (o >= 12 ? H.value = "PM" : H.value = "AM", $l(o)), M = () => {
      H.value === "PM" ? (H.value = "AM", a("update:hours", n.hours - 12)) : (H.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", H.value);
    }, he = (o) => {
      N[o] = true;
    }, pe = (o, E, ce) => {
      if (o && n.arrowNavigation) {
        Array.isArray(I.value[E]) ? I.value[E][ce] = o : I.value[E] = [o];
        const B = I.value.reduce(
          (Me, be) => be.map((Se, b) => [...Me[b] || [], be[b]]),
          []
        );
        d(n.closeTimePickerBtn), f.value && (B[1] = B[1].concat(f.value)), u(B, n.order);
      }
    }, re = (o, E) => (R(o), a(`update:${o}`, E));
    return t({ openChildCmp: he }), (o, E) => {
      var ce;
      return o.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", br, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(ne.value, (B, Me) => {
          var be, Se, b;
          return openBlock(), createElementBlock("div", {
            key: Me,
            class: normalizeClass(v.value),
            "data-compact": L.value && !o.enableSeconds,
            "data-collapsed": L.value && o.enableSeconds
          }, [
            B.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              z.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(":")
              ], 64))
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (F) => pe(F, Me, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !o.timePickerInline,
                  dp__inc_dec_button_inline: o.timePickerInline,
                  dp__tp_inline_btn_top: o.timePickerInline,
                  dp__inc_dec_button_disabled: O.value(B.type),
                  "dp--hidden-el": z.value
                }),
                "data-test-id": `${B.type}-time-inc-btn-${n.order}`,
                "aria-label": (be = unref(y)) == null ? void 0 : be.incrementValue(B.type),
                tabindex: "0",
                onKeydown: (F) => unref(Ze)(F, () => D(B.type, true, { keyboard: true }), true),
                onClick: (F) => unref(c).timeArrowHoldThreshold ? void 0 : D(B.type, true),
                onMousedown: (F) => unref(c).timeArrowHoldThreshold ? D(B.type, true) : void 0,
                onMouseup: l
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  o.$slots["tp-inline-arrow-up"] ? renderSlot(o.$slots, "tp-inline-arrow-up", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    E[2] || (E[2] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
                    E[3] || (E[3] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  o.$slots["arrow-up"] ? renderSlot(o.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  o.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ka), { key: 1 }))
                ], 64))
              ], 42, wr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (F) => pe(F, Me, 1),
                type: "button",
                "aria-label": `${W.value(B.type).text}-${(Se = unref(y)) == null ? void 0 : Se.openTpOverlay(B.type)}`,
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !o.timePickerInline,
                  dp__time_display_inline: o.timePickerInline,
                  "dp--time-invalid": ee.value(B.type),
                  "dp--time-overlay-btn": !ee.value(B.type),
                  "dp--hidden-el": z.value
                }),
                disabled: se(B.type),
                tabindex: "0",
                "data-test-id": `${B.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (F) => unref(Ze)(F, () => R(B.type), true),
                onClick: (F) => R(B.type)
              }, [
                o.$slots[B.type] ? renderSlot(o.$slots, B.type, {
                  key: 0,
                  text: W.value(B.type).text,
                  value: W.value(B.type).value
                }) : createCommentVNode("", true),
                o.$slots[B.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(W.value(B.type).text), 1)
                ], 64))
              ], 42, Dr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (F) => pe(F, Me, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !o.timePickerInline,
                  dp__inc_dec_button_inline: o.timePickerInline,
                  dp__tp_inline_btn_bottom: o.timePickerInline,
                  dp__inc_dec_button_disabled: K.value(B.type),
                  "dp--hidden-el": z.value
                }),
                "data-test-id": `${B.type}-time-dec-btn-${n.order}`,
                "aria-label": (b = unref(y)) == null ? void 0 : b.decrementValue(B.type),
                tabindex: "0",
                onKeydown: (F) => unref(Ze)(F, () => D(B.type, false, { keyboard: true }), true),
                onClick: (F) => unref(c).timeArrowHoldThreshold ? void 0 : D(B.type, false),
                onMousedown: (F) => unref(c).timeArrowHoldThreshold ? D(B.type, false) : void 0,
                onMouseup: l
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  o.$slots["tp-inline-arrow-down"] ? renderSlot(o.$slots, "tp-inline-arrow-down", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    E[4] || (E[4] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
                    E[5] || (E[5] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  o.$slots["arrow-down"] ? renderSlot(o.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  o.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ga), { key: 1 }))
                ], 64))
              ], 42, Mr)
            ], 64))
          ], 10, kr);
        }), 128)),
        o.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", $r, [
          o.$slots["am-pm-button"] ? renderSlot(o.$slots, "am-pm-button", {
            key: 0,
            toggle: M,
            value: H.value
          }) : createCommentVNode("", true),
          o.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: f,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (ce = unref(y)) == null ? void 0 : ce.amPmButton,
            tabindex: "0",
            "data-compact": L.value,
            onClick: M,
            onKeydown: E[0] || (E[0] = (B) => unref(Ze)(B, () => M(), true))
          }, toDisplayString(H.value), 41, Ar))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (B, Me) => (openBlock(), createBlock(Transition, {
          key: Me,
          name: unref(P)(N[B.type]),
          css: unref(U)
        }, {
          default: withCtx(() => {
            var be, Se;
            return [
              N[B.type] ? (openBlock(), createBlock(ea, {
                key: 0,
                items: $(B.type),
                "is-last": o.autoApply && !unref(c).keepActionRow,
                "esc-close": o.escClose,
                type: B.type,
                "text-input": o.textInput,
                config: o.config,
                "arrow-navigation": o.arrowNavigation,
                "aria-labels": o.ariaLabels,
                "overlay-label": (Se = (be = unref(y)).timeOverlay) == null ? void 0 : Se.call(be, B.type),
                onSelected: (b) => re(B.type, b),
                onToggle: (b) => R(B.type),
                onResetFlow: E[1] || (E[1] = (b) => o.$emit("reset-flow"))
              }, createSlots({
                "button-icon": withCtx(() => [
                  o.$slots["clock-icon"] ? renderSlot(o.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                  o.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(o.timePickerInline ? unref(Wt) : unref(ja)), { key: 1 }))
                ]),
                _: 2
              }, [
                o.$slots[`${B.type}-overlay-value`] ? {
                  name: "item",
                  fn: withCtx(({ item: b }) => [
                    renderSlot(o.$slots, `${B.type}-overlay-value`, {
                      text: b.text,
                      value: b.value
                    })
                  ]),
                  key: "0"
                } : void 0,
                o.$slots[`${B.type}-overlay-header`] ? {
                  name: "header",
                  fn: withCtx(() => [
                    renderSlot(o.$slots, `${B.type}-overlay-header`, {
                      toggle: () => R(B.type)
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
var Sr = ["data-dp-mobile"];
var Pr = ["aria-label", "tabindex"];
var Rr = ["role", "aria-label", "tabindex"];
var Cr = ["aria-label"];
var Vn = defineComponent({
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
    ...ct
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
    const a = r, n = e, { buildMatrix: u, setTimePicker: d } = At(), y = useSlots(), { defaultedTransitions: i, defaultedAriaLabels: _, defaultedTextInput: c, defaultedConfig: C, defaultedRange: m } = _e(n), { transitionName: P, showTransition: U } = ta(i), { hideNavigationButtons: N } = ya(), H = ref(null), f = ref(null), I = ref([]), k = ref(null), z = ref(false);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? u([Le(H.value)], "time") : d(true, n.timePicker);
    });
    const q = computed(() => m.value.enabled && n.modelAuto ? Pn(n.internalModelValue) : true), ee = ref(false), x = (T) => ({
      hours: Array.isArray(n.hours) ? n.hours[T] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[T] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[T] : n.seconds
    }), S = computed(() => {
      const T = [];
      if (m.value.enabled)
        for (let oe = 0; oe < 2; oe++)
          T.push(x(oe));
      else
        T.push(x(0));
      return T;
    }), X = (T, oe = false, $ = "") => {
      oe || a("reset-flow"), ee.value = T, a(T ? "overlay-opened" : "overlay-closed", Ge.time), n.arrowNavigation && d(T), nextTick(() => {
        $ !== "" && I.value[0] && I.value[0].openChildCmp($);
      });
    }, O = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !C.value.keepActionRow
    })), K = tt(y, "timePicker"), fe = (T, oe, $) => m.value.enabled ? oe === 0 ? [T, S.value[1][$]] : [S.value[0][$], T] : T, me = (T) => {
      a("update:hours", T);
    }, v = (T) => {
      a("update:minutes", T);
    }, L = (T) => {
      a("update:seconds", T);
    }, ne = () => {
      if (k.value && !c.value.enabled && !n.noOverlayFocus) {
        const T = Rn(k.value);
        T && T.focus({ preventScroll: true });
      }
    }, p = (T) => {
      z.value = false, a("overlay-closed", T);
    }, W = (T) => {
      z.value = true, a("overlay-opened", T);
    };
    return t({ toggleTimePicker: X }), (T, oe) => {
      var $;
      return openBlock(), createElementBlock("div", {
        class: "dp--tp-wrap",
        "data-dp-mobile": T.isMobile
      }, [
        !T.timePicker && !T.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: H,
          type: "button",
          class: normalizeClass({ ...O.value, "dp--hidden-el": ee.value }),
          "aria-label": ($ = unref(_)) == null ? void 0 : $.openTimePicker,
          tabindex: T.noOverlayFocus ? void 0 : 0,
          "data-test-id": "open-time-picker-btn",
          onKeydown: oe[0] || (oe[0] = (Y) => unref(Ze)(Y, () => X(true))),
          onClick: oe[1] || (oe[1] = (Y) => X(true))
        }, [
          T.$slots["clock-icon"] ? renderSlot(T.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          T.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(ja), { key: 1 }))
        ], 42, Pr)), [
          [vShow, !unref(N)(T.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(P)(ee.value),
          css: unref(U) && !T.timePickerInline
        }, {
          default: withCtx(() => {
            var Y, g;
            return [
              ee.value || T.timePicker || T.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: k,
                role: T.timePickerInline ? void 0 : "dialog",
                class: normalizeClass({
                  dp__overlay: !T.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !T.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(T.timePicker ? { height: `${unref(C).modeHeight}px` } : void 0),
                "aria-label": (Y = unref(_)) == null ? void 0 : Y.timePicker,
                tabindex: T.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    T.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  T.$slots["time-picker-overlay"] ? renderSlot(T.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: me,
                    setMinutes: v,
                    setSeconds: L
                  }) : createCommentVNode("", true),
                  T.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(T.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (Z, se) => withDirectives((openBlock(), createBlock(Tr, mergeProps({
                      key: se,
                      ref_for: true
                    }, {
                      ...T.$props,
                      order: se,
                      hours: Z.hours,
                      minutes: Z.minutes,
                      seconds: Z.seconds,
                      closeTimePickerBtn: f.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: se === 0 ? unref(m).fixedStart : unref(m).fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: I,
                      "validate-time": (R, ae) => e.validateTime(R, fe(ae, se, R)),
                      "onUpdate:hours": (R) => me(fe(R, se, "hours")),
                      "onUpdate:minutes": (R) => v(fe(R, se, "minutes")),
                      "onUpdate:seconds": (R) => L(fe(R, se, "seconds")),
                      onMounted: ne,
                      onOverlayClosed: p,
                      onOverlayOpened: W,
                      onAmPmChange: oe[2] || (oe[2] = (R) => T.$emit("am-pm-change", R))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(K), (R, ae) => ({
                        name: R,
                        fn: withCtx((l) => [
                          renderSlot(T.$slots, R, mergeProps({ ref_for: true }, l))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, se === 0 ? true : q.value]
                    ])), 128))
                  ], 2)),
                  !T.timePicker && !T.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: f,
                    type: "button",
                    class: normalizeClass({ ...O.value, "dp--hidden-el": z.value }),
                    "aria-label": (g = unref(_)) == null ? void 0 : g.closeTimePicker,
                    tabindex: "0",
                    onKeydown: oe[3] || (oe[3] = (Z) => unref(Ze)(Z, () => X(false))),
                    onClick: oe[4] || (oe[4] = (Z) => X(false))
                  }, [
                    T.$slots["calendar-icon"] ? renderSlot(T.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    T.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wt), { key: 1 }))
                  ], 42, Cr)), [
                    [vShow, !unref(N)(T.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Rr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ], 8, Sr);
    };
  }
});
var jn = (e, t, r, a) => {
  const { defaultedRange: n } = _e(e), u = (k, z) => Array.isArray(t[k]) ? t[k][z] : t[k], d = (k) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[k] : t.seconds : 0, y = (k, z) => k ? z !== void 0 ? Mt(k, u("hours", z), u("minutes", z), d(z)) : Mt(k, t.hours, t.minutes, d()) : setSeconds(j(), d(z)), i = (k, z) => {
    t[k] = z;
  }, _ = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(r.value) ? r.value.length > 1 : false : n.value.enabled), c = (k, z) => {
    const q = Object.fromEntries(
      Object.keys(t).map((ee) => ee === k ? [ee, z] : [ee, t[ee]].slice())
    );
    if (_.value && !n.value.disableTimeRangeValidation) {
      const ee = (S) => r.value ? Mt(
        r.value[S],
        q.hours[S],
        q.minutes[S],
        q.seconds[S]
      ) : null, x = (S) => setMilliseconds(r.value[S], 0);
      return !(Ae(ee(0), ee(1)) && (isAfter(ee(0), x(1)) || isBefore(ee(1), x(0))));
    }
    return true;
  }, C = (k, z) => {
    c(k, z) && (i(k, z), a && a());
  }, m = (k) => {
    C("hours", k);
  }, P = (k) => {
    C("minutes", k);
  }, U = (k) => {
    C("seconds", k);
  }, N = (k, z, q, ee) => {
    z && m(k), !z && !q && P(k), q && U(k), r.value && ee(r.value);
  }, H = (k) => {
    if (k) {
      const z = Array.isArray(k), q = z ? [+k[0].hours, +k[1].hours] : +k.hours, ee = z ? [+k[0].minutes, +k[1].minutes] : +k.minutes, x = z ? [+k[0].seconds, +k[1].seconds] : +k.seconds;
      i("hours", q), i("minutes", ee), e.enableSeconds && i("seconds", x);
    }
  }, f = (k, z) => {
    const q = {
      hours: Array.isArray(t.hours) ? t.hours[k] : t.hours,
      disabledArr: []
    };
    return (z || z === 0) && (q.hours = z), Array.isArray(e.disabledTimes) && (q.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[k]) ? e.disabledTimes[k] : e.disabledTimes), q;
  }, I = computed(() => (k, z) => {
    var q;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: ee, hours: x } = f(k, z), S = ee.filter((X) => +X.hours === x);
      return ((q = S[0]) == null ? void 0 : q.minutes) === "*" ? { hours: [x], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (S == null ? void 0 : S.map((X) => +X.minutes)) ?? [],
        seconds: (S == null ? void 0 : S.map((X) => X.seconds ? +X.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: i,
    updateHours: m,
    updateMinutes: P,
    updateSeconds: U,
    getSetDateTime: y,
    updateTimeValues: N,
    getSecondsValue: d,
    assignStartTime: H,
    validateTime: c,
    disabledTimesConfig: I
  };
};
var Or = (e, t) => {
  const r = () => {
    e.isTextInputDate && z();
  }, { modelValue: a, time: n } = aa(e, t, r), { defaultedStartTime: u, defaultedRange: d, defaultedTz: y } = _e(e), { updateTimeValues: i, getSetDateTime: _, setTime: c, assignStartTime: C, disabledTimesConfig: m, validateTime: P } = jn(e, n, a, U);
  function U() {
    t("update-flow-step");
  }
  const N = (x) => {
    const { hours: S, minutes: X, seconds: O } = x;
    return { hours: +S, minutes: +X, seconds: O ? +O : 0 };
  }, H = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const S = N(e.startTime[0]), X = N(e.startTime[1]);
        return [set(j(), S), set(j(), X)];
      }
      const x = N(e.startTime);
      return set(j(), x);
    }
    return d.value.enabled ? [null, null] : null;
  }, f = () => {
    if (d.value.enabled) {
      const [x, S] = H();
      a.value = [
        et(_(x, 0), y.value.timezone),
        et(_(S, 1), y.value.timezone)
      ];
    } else
      a.value = et(_(H()), y.value.timezone);
  }, I = (x) => Array.isArray(x) ? [Ct(j(x[0])), Ct(j(x[1]))] : [Ct(x ?? j())], k = (x, S, X) => {
    c("hours", x), c("minutes", S), c("seconds", e.enableSeconds ? X : 0);
  }, z = () => {
    const [x, S] = I(a.value);
    return d.value.enabled ? k(
      [x.hours, S.hours],
      [x.minutes, S.minutes],
      [x.seconds, S.seconds]
    ) : k(x.hours, x.minutes, x.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return C(u.value), a.value ? z() : f();
  });
  const q = () => {
    Array.isArray(a.value) ? a.value = a.value.map((x, S) => x && _(x, S)) : a.value = _(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: m,
    updateTime: (x, S = true, X = false) => {
      i(x, S, X, q);
    },
    validateTime: P
  };
};
var Br = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...ct
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, u = useSlots(), d = tt(u, "timePicker"), y = ref(null), { time: i, modelValue: _, disabledTimesConfig: c, updateTime: C, validateTime: m } = Or(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: _,
      time: i,
      updateTime: C
    }), toggleTimePicker: (N, H = false, f = "") => {
      var I;
      (I = y.value) == null || I.toggleTimePicker(N, H, f);
    } }), (N, H) => (openBlock(), createBlock(ma, {
      "multi-calendars": 0,
      stretch: "",
      "is-mobile": N.isMobile
    }, {
      default: withCtx(() => [
        createVNode(Vn, mergeProps({
          ref_key: "tpRef",
          ref: y
        }, N.$props, {
          hours: unref(i).hours,
          minutes: unref(i).minutes,
          seconds: unref(i).seconds,
          "internal-model-value": N.internalModelValue,
          "disabled-times-config": unref(c),
          "validate-time": unref(m),
          "onUpdate:hours": H[0] || (H[0] = (f) => unref(C)(f)),
          "onUpdate:minutes": H[1] || (H[1] = (f) => unref(C)(f, false)),
          "onUpdate:seconds": H[2] || (H[2] = (f) => unref(C)(f, false, true)),
          onAmPmChange: H[3] || (H[3] = (f) => N.$emit("am-pm-change", f)),
          onResetFlow: H[4] || (H[4] = (f) => N.$emit("reset-flow")),
          onOverlayClosed: H[5] || (H[5] = (f) => N.$emit("overlay-toggle", { open: false, overlay: f })),
          onOverlayOpened: H[6] || (H[6] = (f) => N.$emit("overlay-toggle", { open: true, overlay: f }))
        }), createSlots({ _: 2 }, [
          renderList(unref(d), (f, I) => ({
            name: f,
            fn: withCtx((k) => [
              renderSlot(N.$slots, f, normalizeProps(guardReactiveProps(k)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }, 8, ["is-mobile"]));
  }
});
var _r = { class: "dp--header-wrap" };
var Yr = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Ir = { key: 0 };
var Er = { class: "dp__month_year_wrap" };
var Nr = ["data-dp-element", "aria-label", "data-test-id", "onClick", "onKeydown"];
var Fr = defineComponent({
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
    ...ct
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed", "overlay-opened"],
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, {
      defaultedTransitions: u,
      defaultedAriaLabels: d,
      defaultedMultiCalendars: y,
      defaultedFilters: i,
      defaultedConfig: _,
      defaultedHighlight: c,
      propDates: C,
      defaultedUI: m
    } = _e(n), { transitionName: P, showTransition: U } = ta(u), { buildMatrix: N } = At(), { handleMonthYearChange: H, isDisabled: f, updateMonthYear: I } = lr(n, a), { showLeftIcon: k, showRightIcon: z } = ya(), q = ref(false), ee = ref(false), x = ref(false), S = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const X = (g) => ({
      get: () => n[g],
      set: (Z) => {
        const se = g === ut.month ? ut.year : ut.month;
        a("update-month-year", { [g]: Z, [se]: n[se] }), g === ut.month ? p(true) : W(true);
      }
    }), O = computed(X(ut.month)), K = computed(X(ut.year)), fe = computed(() => (g) => ({
      month: n.month,
      year: n.year,
      items: g === ut.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: I,
      toggle: g === ut.month ? p : W
    })), me = computed(() => {
      const g = n.months.find((Z) => Z.value === n.month);
      return g || { text: "", value: 0 };
    }), v = computed(() => zt(n.months, (g) => {
      const Z = n.month === g.value, se = Xt(
        g.value,
        Bn(n.year, C.value.minDate),
        _n(n.year, C.value.maxDate)
      ) || i.value.months.includes(g.value), R = Fn(c.value, g.value, n.year);
      return { active: Z, disabled: se, highlighted: R };
    })), L = computed(() => zt(n.years, (g) => {
      const Z = n.year === g.value, se = Xt(
        g.value,
        Ht(C.value.minDate),
        Ht(C.value.maxDate)
      ) || i.value.years.includes(g.value), R = Za(c.value, g.value);
      return { active: Z, disabled: se, highlighted: R };
    })), ne = (g, Z, se) => {
      se !== void 0 ? g.value = se : g.value = !g.value, g.value ? (x.value = true, a("overlay-opened", Z)) : (x.value = false, a("overlay-closed", Z));
    }, p = (g = false, Z) => {
      T(g), ne(q, Ge.month, Z);
    }, W = (g = false, Z) => {
      T(g), ne(ee, Ge.year, Z);
    }, T = (g) => {
      g || a("reset-flow");
    }, oe = (g, Z) => {
      n.arrowNavigation && (S.value[Z] = Le(g), N(S.value, "monthYear"));
    }, $ = computed(() => {
      var g, Z, se, R, ae, l;
      return [
        {
          type: ut.month,
          index: 1,
          toggle: p,
          modelValue: O.value,
          updateModelValue: (D) => O.value = D,
          text: me.value.text,
          showSelectionGrid: q.value,
          items: v.value,
          ariaLabel: (g = d.value) == null ? void 0 : g.openMonthsOverlay,
          overlayLabel: ((se = (Z = d.value).monthPicker) == null ? void 0 : se.call(Z, true)) ?? void 0
        },
        {
          type: ut.year,
          index: 2,
          toggle: W,
          modelValue: K.value,
          updateModelValue: (D) => K.value = D,
          text: Cn(n.year, n.locale),
          showSelectionGrid: ee.value,
          items: L.value,
          ariaLabel: (R = d.value) == null ? void 0 : R.openYearsOverlay,
          overlayLabel: ((l = (ae = d.value).yearPicker) == null ? void 0 : l.call(ae, true)) ?? void 0
        }
      ];
    }), Y = computed(() => n.disableYearSelect ? [$.value[0]] : n.yearFirst ? [...$.value].reverse() : $.value);
    return t({
      toggleMonthPicker: p,
      toggleYearPicker: W,
      handleMonthYearChange: H
    }), (g, Z) => {
      var se, R, ae, l, D, ue;
      return openBlock(), createElementBlock("div", _r, [
        g.$slots["month-year"] ? (openBlock(), createElementBlock("div", Yr, [
          renderSlot(g.$slots, "month-year", normalizeProps(guardReactiveProps({
            month: e.month,
            year: e.year,
            months: e.months,
            years: e.years,
            updateMonthYear: unref(I),
            handleMonthYearChange: unref(H),
            instance: e.instance,
            isDisabled: unref(f)
          })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          g.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Ir, [
            renderSlot(g.$slots, "top-extra", { value: g.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Er, [
            unref(k)(unref(y), e.instance) && !g.vertical ? (openBlock(), createBlock(Kt, {
              key: 0,
              "aria-label": (se = unref(d)) == null ? void 0 : se.prevMonth,
              disabled: unref(f)(false),
              class: normalizeClass((R = unref(m)) == null ? void 0 : R.navBtnPrev),
              "el-name": "action-prev",
              onActivate: Z[0] || (Z[0] = (M) => unref(H)(false, true)),
              onSetRef: Z[1] || (Z[1] = (M) => oe(M, 0))
            }, {
              default: withCtx(() => [
                g.$slots["arrow-left"] ? renderSlot(g.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                g.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: g.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(Y.value, (M, he) => (openBlock(), createElementBlock(Fragment, {
                key: M.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (pe) => oe(pe, he + 1),
                  type: "button",
                  "data-dp-element": `overlay-${M.type}`,
                  class: normalizeClass(["dp__btn dp__month_year_select", { "dp--hidden-el": x.value }]),
                  "aria-label": `${M.text}-${M.ariaLabel}`,
                  "data-test-id": `${M.type}-toggle-overlay-${e.instance}`,
                  onClick: M.toggle,
                  onKeydown: (pe) => unref(Ze)(pe, () => M.toggle(), true)
                }, [
                  g.$slots[M.type] ? renderSlot(g.$slots, M.type, {
                    key: 0,
                    text: M.text,
                    value: n[M.type]
                  }) : createCommentVNode("", true),
                  g.$slots[M.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(M.text), 1)
                  ], 64))
                ], 42, Nr),
                createVNode(Transition, {
                  name: unref(P)(M.showSelectionGrid),
                  css: unref(U)
                }, {
                  default: withCtx(() => [
                    M.showSelectionGrid ? (openBlock(), createBlock(ea, {
                      key: 0,
                      items: M.items,
                      "arrow-navigation": g.arrowNavigation,
                      "hide-navigation": g.hideNavigation,
                      "is-last": g.autoApply && !unref(_).keepActionRow,
                      "skip-button-ref": false,
                      config: g.config,
                      type: M.type,
                      "header-refs": [],
                      "esc-close": g.escClose,
                      "menu-wrap-ref": g.menuWrapRef,
                      "text-input": g.textInput,
                      "aria-labels": g.ariaLabels,
                      "overlay-label": M.overlayLabel,
                      onSelected: M.updateModelValue,
                      onToggle: M.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        g.$slots["calendar-icon"] ? renderSlot(g.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        g.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wt), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      g.$slots[`${M.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: pe }) => [
                          renderSlot(g.$slots, `${M.type}-overlay-value`, {
                            text: pe.text,
                            value: pe.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      g.$slots[`${M.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(g.$slots, `${M.type}-overlay`, mergeProps({ ref_for: true }, fe.value(M.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      g.$slots[`${M.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(g.$slots, `${M.type}-overlay-header`, {
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
            unref(k)(unref(y), e.instance) && g.vertical ? (openBlock(), createBlock(Kt, {
              key: 1,
              "aria-label": (ae = unref(d)) == null ? void 0 : ae.prevMonth,
              "el-name": "action-prev",
              disabled: unref(f)(false),
              class: normalizeClass((l = unref(m)) == null ? void 0 : l.navBtnPrev),
              onActivate: Z[2] || (Z[2] = (M) => unref(H)(false, true))
            }, {
              default: withCtx(() => [
                g.$slots["arrow-up"] ? renderSlot(g.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                g.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ka), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(z)(unref(y), e.instance) ? (openBlock(), createBlock(Kt, {
              key: 2,
              ref: "rightIcon",
              "el-name": "action-next",
              disabled: unref(f)(true),
              "aria-label": (D = unref(d)) == null ? void 0 : D.nextMonth,
              class: normalizeClass((ue = unref(m)) == null ? void 0 : ue.navBtnNext),
              onActivate: Z[3] || (Z[3] = (M) => unref(H)(true, true)),
              onSetRef: Z[4] || (Z[4] = (M) => oe(M, g.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                g.$slots[g.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(g.$slots, g.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                g.$slots[g.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(g.vertical ? unref(Ga) : unref(Va)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label", "class"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Lr = {
  class: "dp__calendar_header",
  role: "row"
};
var zr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Hr = ["aria-label"];
var Ur = {
  key: 0,
  class: "dp__calendar_item dp__week_num",
  role: "gridcell"
};
var Wr = { class: "dp__cell_inner" };
var Vr = ["id", "aria-pressed", "aria-disabled", "aria-label", "tabindex", "data-test-id", "onClick", "onTouchend", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var jr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...ct
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
    const a = r, n = e, { buildMultiLevelMatrix: u } = At(), {
      defaultedTransitions: d,
      defaultedConfig: y,
      defaultedAriaLabels: i,
      defaultedMultiCalendars: _,
      defaultedWeekNumbers: c,
      defaultedMultiDates: C,
      defaultedUI: m
    } = _e(n), P = ref(null), U = ref({
      bottom: "",
      left: "",
      transform: ""
    }), N = ref([]), H = ref(null), f = ref(true), I = ref(""), k = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), z = ref([]), q = ref({ left: "50%" }), ee = ref(false), x = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), S = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : Ml(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: N }), y.value.noSwipe || H.value && (H.value.addEventListener("touchstart", oe, { passive: false }), H.value.addEventListener("touchend", $, { passive: false }), H.value.addEventListener("touchmove", Y, { passive: false })), n.monthChangeOnScroll && H.value && H.value.addEventListener("wheel", se, { passive: false });
    });
    const X = (M) => M ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", O = (M, he) => {
      if (n.transitions) {
        const pe = We(yt(j(), n.month, n.year));
        I.value = Ee(We(yt(j(), M, he)), pe) ? d.value[X(true)] : d.value[X(false)], f.value = false, nextTick(() => {
          f.value = true;
        });
      }
    }, K = computed(
      () => ({
        ...m.value.calendar ?? {}
      })
    ), fe = computed(() => (M) => {
      const he = Al(M);
      return {
        dp__marker_dot: he.type === "dot",
        dp__marker_line: he.type === "line"
      };
    }), me = computed(() => (M) => Ae(M, P.value)), v = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: _.value.count > 0 && n.instance !== 0
    })), L = computed(() => (M) => n.hideOffsetDates ? M.current : true), ne = async (M, he) => {
      const { width: pe, height: re } = M.getBoundingClientRect();
      P.value = he.value;
      let o = { left: `${pe / 2}px` }, E = -50;
      if (await nextTick(), z.value[0]) {
        const { left: ce, width: B } = z.value[0].getBoundingClientRect();
        ce < 0 && (o = { left: "0" }, E = 0, q.value.left = `${pe / 2}px`), window.innerWidth < ce + B && (o = { right: "0" }, E = 0, q.value.left = `${B - pe / 2}px`);
      }
      U.value = {
        bottom: `${re}px`,
        ...o,
        transform: `translateX(${E}%)`
      };
    }, p = async (M, he, pe) => {
      var o, E, ce;
      const re = Le(N.value[he][pe]);
      re && ((o = M.marker) != null && o.customPosition && ((ce = (E = M.marker) == null ? void 0 : E.tooltip) != null && ce.length) ? U.value = M.marker.customPosition(re) : await ne(re, M), a("tooltip-open", M.marker));
    }, W = async (M, he, pe) => {
      var re, o;
      if (ee.value && C.value.enabled && C.value.dragSelect)
        return a("select-date", M);
      if (a("set-hover-date", M), (o = (re = M.marker) == null ? void 0 : re.tooltip) != null && o.length) {
        if (n.hideOffsetDates && !M.current) return;
        await p(M, he, pe);
      }
    }, T = (M) => {
      P.value && (P.value = null, U.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", M.marker));
    }, oe = (M) => {
      k.value.startX = M.changedTouches[0].screenX, k.value.startY = M.changedTouches[0].screenY;
    }, $ = (M) => {
      k.value.endX = M.changedTouches[0].screenX, k.value.endY = M.changedTouches[0].screenY, g();
    }, Y = (M) => {
      n.vertical && !n.inline && M.preventDefault();
    }, g = () => {
      const M = n.vertical ? "Y" : "X";
      Math.abs(k.value[`start${M}`] - k.value[`end${M}`]) > 10 && a("handle-swipe", k.value[`start${M}`] > k.value[`end${M}`] ? "right" : "left");
    }, Z = (M, he, pe) => {
      M && (Array.isArray(N.value[he]) ? N.value[he][pe] = M : N.value[he] = [M]), n.arrowNavigation && u(N.value, "calendar");
    }, se = (M) => {
      n.monthChangeOnScroll && (M.preventDefault(), a("handle-scroll", M));
    }, R = (M) => c.value.type === "local" ? getWeek(M.value, { weekStartsOn: +n.weekStart }) : c.value.type === "iso" ? getISOWeek(M.value) : typeof c.value.type == "function" ? c.value.type(M.value) : "", ae = (M) => {
      const he = M[0];
      return c.value.hideOnOffsetDates ? M.some((pe) => pe.current) ? R(he) : "" : R(he);
    }, l = (M, he, pe = true) => {
      !pe && Cl() || (!C.value.enabled || y.value.allowPreventDefault) && (Dt(M, y.value), a("select-date", he));
    }, D = (M) => {
      Dt(M, y.value);
    }, ue = (M) => {
      C.value.enabled && C.value.dragSelect ? (ee.value = true, a("select-date", M)) : C.value.enabled && a("select-date", M);
    };
    return t({ triggerTransition: O }), (M, he) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(v.value)
    }, [
      createBaseVNode("div", {
        ref_key: "calendarWrapRef",
        ref: H,
        class: normalizeClass(K.value),
        role: "grid"
      }, [
        createBaseVNode("div", Lr, [
          M.weekNumbers ? (openBlock(), createElementBlock("div", zr, toDisplayString(M.weekNumName), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (pe, re) => {
            var o, E;
            return openBlock(), createElementBlock("div", {
              key: re,
              class: "dp__calendar_header_item",
              role: "gridcell",
              "data-test-id": "calendar-header",
              "aria-label": (E = (o = unref(i)) == null ? void 0 : o.weekDay) == null ? void 0 : E.call(o, re)
            }, [
              M.$slots["calendar-header"] ? renderSlot(M.$slots, "calendar-header", {
                key: 0,
                day: pe,
                index: re
              }) : createCommentVNode("", true),
              M.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(pe), 1)
              ], 64))
            ], 8, Hr);
          }), 128))
        ]),
        he[2] || (he[2] = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1)),
        createVNode(Transition, {
          name: I.value,
          css: !!M.transitions
        }, {
          default: withCtx(() => [
            f.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: he[1] || (he[1] = (pe) => ee.value = false)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(x.value, (pe, re) => (openBlock(), createElementBlock("div", {
                key: re,
                class: "dp__calendar_row",
                role: "row"
              }, [
                M.weekNumbers ? (openBlock(), createElementBlock("div", Ur, [
                  createBaseVNode("div", Wr, toDisplayString(ae(pe.days)), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(pe.days, (o, E) => {
                  var ce, B, Me;
                  return openBlock(), createElementBlock("div", {
                    id: unref(Ha)(o.value),
                    ref_for: true,
                    ref: (be) => Z(be, re, E),
                    key: E + re,
                    role: "gridcell",
                    class: "dp__calendar_item",
                    "aria-pressed": (o.classData.dp__active_date || o.classData.dp__range_start || o.classData.dp__range_start) ?? void 0,
                    "aria-disabled": o.classData.dp__cell_disabled || void 0,
                    "aria-label": (B = (ce = unref(i)) == null ? void 0 : ce.day) == null ? void 0 : B.call(ce, o),
                    tabindex: !o.current && M.hideOffsetDates ? void 0 : 0,
                    "data-test-id": unref(Ha)(o.value),
                    onClick: withModifiers((be) => l(be, o), ["prevent"]),
                    onTouchend: (be) => l(be, o, false),
                    onKeydown: (be) => unref(Ze)(be, () => M.$emit("select-date", o)),
                    onMouseenter: (be) => W(o, re, E),
                    onMouseleave: (be) => T(o),
                    onMousedown: (be) => ue(o),
                    onMouseup: he[0] || (he[0] = (be) => ee.value = false)
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__cell_inner", o.classData])
                    }, [
                      M.$slots.day && L.value(o) ? renderSlot(M.$slots, "day", {
                        key: 0,
                        day: +o.text,
                        date: o.value
                      }) : createCommentVNode("", true),
                      M.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(o.text), 1)
                      ], 64)),
                      o.marker && L.value(o) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        M.$slots.marker ? renderSlot(M.$slots, "marker", {
                          key: 0,
                          marker: o.marker,
                          day: +o.text,
                          date: o.value
                        }) : (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(fe.value(o.marker)),
                          style: normalizeStyle(o.marker.color ? { backgroundColor: o.marker.color } : {})
                        }, null, 6))
                      ], 64)) : createCommentVNode("", true),
                      me.value(o.value) ? (openBlock(), createElementBlock("div", {
                        key: 3,
                        ref_for: true,
                        ref_key: "activeTooltip",
                        ref: z,
                        class: "dp__marker_tooltip",
                        style: normalizeStyle(U.value)
                      }, [
                        (Me = o.marker) != null && Me.tooltip ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: "dp__tooltip_content",
                          onClick: D
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(o.marker.tooltip, (be, Se) => (openBlock(), createElementBlock("div", {
                            key: Se,
                            class: "dp__tooltip_text"
                          }, [
                            M.$slots["marker-tooltip"] ? renderSlot(M.$slots, "marker-tooltip", {
                              key: 0,
                              tooltip: be,
                              day: o.value
                            }) : createCommentVNode("", true),
                            M.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("div", {
                                class: "dp__tooltip_mark",
                                style: normalizeStyle(be.color ? { backgroundColor: be.color } : {})
                              }, null, 4),
                              createBaseVNode("div", null, toDisplayString(be.text), 1)
                            ], 64))
                          ]))), 128)),
                          createBaseVNode("div", {
                            class: "dp__arrow_bottom_tp",
                            style: normalizeStyle(q.value)
                          }, null, 4)
                        ])) : createCommentVNode("", true)
                      ], 4)) : createCommentVNode("", true)
                    ], 2)
                  ], 40, Vr);
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
var yn = (e) => Array.isArray(e);
var Kr = (e, t, r, a) => {
  const n = ref([]), u = ref(/* @__PURE__ */ new Date()), d = ref(), y = () => $(e.isTextInputDate), { modelValue: i, calendars: _, time: c, today: C } = aa(e, t, y), {
    defaultedMultiCalendars: m,
    defaultedStartTime: P,
    defaultedRange: U,
    defaultedConfig: N,
    defaultedTz: H,
    propDates: f,
    defaultedMultiDates: I
  } = _e(e), { validateMonthYearInRange: k, isDisabled: z, isDateRangeAllowed: q, checkMinMaxRange: ee } = Tt(e), { updateTimeValues: x, getSetDateTime: S, setTime: X, assignStartTime: O, validateTime: K, disabledTimesConfig: fe } = jn(e, c, i, a), me = computed(
    () => (h2) => _.value[h2] ? _.value[h2].month : 0
  ), v = computed(
    () => (h2) => _.value[h2] ? _.value[h2].year : 0
  ), L = (h2) => !N.value.keepViewOnOffsetClick || h2 ? true : !d.value, ne = (h2, le, w, G = false) => {
    var ie, Xe;
    L(G) && (_.value[h2] || (_.value[h2] = { month: 0, year: 0 }), _.value[h2].month = dn(le) ? (ie = _.value[h2]) == null ? void 0 : ie.month : le, _.value[h2].year = dn(w) ? (Xe = _.value[h2]) == null ? void 0 : Xe.year : w);
  }, p = () => {
    e.autoApply && t("select-date");
  }, W = () => {
    P.value && O(P.value);
  };
  onMounted(() => {
    e.shadow || (i.value || (he(), W()), $(true), e.focusStartDate && e.startDate && he());
  });
  const T = computed(() => {
    var h2;
    return (h2 = e.flow) != null && h2.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), oe = () => {
    e.autoApply && T.value && t("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : false);
  }, $ = (h2 = false) => {
    if (i.value)
      return Array.isArray(i.value) ? (n.value = i.value, l(h2)) : Z(i.value, h2);
    if (m.value.count && h2 && !e.startDate)
      return g(j(), h2);
  }, Y = () => Array.isArray(i.value) && U.value.enabled ? getMonth(i.value[0]) === getMonth(i.value[1] ?? i.value[0]) : false, g = (h2 = /* @__PURE__ */ new Date(), le = false) => {
    if ((!m.value.count || !m.value.static || le) && ne(0, getMonth(h2), getYear(h2)), m.value.count && (!i.value || Y() || !m.value.solo) && (!m.value.solo || le))
      for (let w = 1; w < m.value.count; w++) {
        const G = set(j(), { month: me.value(w - 1), year: v.value(w - 1) }), ie = add(G, { months: 1 });
        _.value[w] = { month: getMonth(ie), year: getYear(ie) };
      }
  }, Z = (h2, le) => {
    g(h2), X("hours", getHours(h2)), X("minutes", getMinutes(h2)), X("seconds", getSeconds(h2)), m.value.count && le && M();
  }, se = (h2) => {
    if (m.value.count) {
      if (m.value.solo) return 0;
      const le = getMonth(h2[0]), w = getMonth(h2[1]);
      return Math.abs(w - le) < m.value.count ? 0 : 1;
    }
    return 1;
  }, R = (h2, le) => {
    h2[1] && U.value.showLastInRange ? g(h2[se(h2)], le) : g(h2[0], le);
    const w = (G, ie) => [
      G(h2[0]),
      h2[1] ? G(h2[1]) : c[ie][1]
    ];
    X("hours", w(getHours, "hours")), X("minutes", w(getMinutes, "minutes")), X("seconds", w(getSeconds, "seconds"));
  }, ae = (h2, le) => {
    if ((U.value.enabled || e.weekPicker) && !I.value.enabled)
      return R(h2, le);
    if (I.value.enabled && le) {
      const w = h2[h2.length - 1];
      return Z(w, le);
    }
  }, l = (h2) => {
    const le = i.value;
    ae(le, h2), m.value.count && m.value.solo && M();
  }, D = (h2, le) => {
    const w = set(j(), { month: me.value(le), year: v.value(le) }), G = h2 < 0 ? addMonths(w, 1) : subMonths(w, 1);
    k(getMonth(G), getYear(G), h2 < 0, e.preventMinMaxNavigation) && (ne(le, getMonth(G), getYear(G)), t("update-month-year", { instance: le, month: getMonth(G), year: getYear(G) }), m.value.count && !m.value.solo && ue(le), r());
  }, ue = (h2) => {
    for (let le = h2 - 1; le >= 0; le--) {
      const w = subMonths(set(j(), { month: me.value(le + 1), year: v.value(le + 1) }), 1);
      ne(le, getMonth(w), getYear(w));
    }
    for (let le = h2 + 1; le <= m.value.count - 1; le++) {
      const w = addMonths(set(j(), { month: me.value(le - 1), year: v.value(le - 1) }), 1);
      ne(le, getMonth(w), getYear(w));
    }
  }, M = () => {
    if (Array.isArray(i.value) && i.value.length === 2) {
      const h2 = j(
        j(i.value[1] ? i.value[1] : addMonths(i.value[0], 1))
      ), [le, w] = [getMonth(i.value[0]), getYear(i.value[0])], [G, ie] = [getMonth(i.value[1]), getYear(i.value[1])];
      (le !== G || le === G && w !== ie) && m.value.solo && ne(1, getMonth(h2), getYear(h2));
    } else i.value && !Array.isArray(i.value) && (ne(0, getMonth(i.value), getYear(i.value)), g(j()));
  }, he = () => {
    e.startDate && (ne(0, getMonth(j(e.startDate)), getYear(j(e.startDate))), m.value.count && ue(0));
  }, pe = (h2, le) => {
    if (e.monthChangeOnScroll) {
      const w = (/* @__PURE__ */ new Date()).getTime() - u.value.getTime(), G = Math.abs(h2.deltaY);
      let ie = 500;
      G > 1 && (ie = 100), G > 100 && (ie = 0), w > ie && (u.value = /* @__PURE__ */ new Date(), D(e.monthChangeOnScroll !== "inverse" ? -h2.deltaY : h2.deltaY, le));
    }
  }, re = (h2, le, w = false) => {
    e.monthChangeOnArrows && e.vertical === w && o(h2, le);
  }, o = (h2, le) => {
    D(h2 === "right" ? -1 : 1, le);
  }, E = (h2) => {
    if (f.value.markers)
      return ca(h2.value, f.value.markers);
  }, ce = (h2, le) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [h2 == 0, true];
      case "fair":
        return [h2 == 0 || le > h2, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, B = (h2, le, w, G) => {
    if (e.sixWeeks && h2.length < 6) {
      const ie = 6 - h2.length, Xe = (le.getDay() + 7 - G) % 7, _t = 6 - (w.getDay() + 7 - G) % 7, [Vt, $a] = ce(Xe, _t);
      for (let St = 1; St <= ie; St++)
        if ($a ? !!(St % 2) == Vt : Vt) {
          const la = h2[0].days[0], Aa = Me(addDays(la.value, -7), getMonth(le));
          h2.unshift({ days: Aa });
        } else {
          const la = h2[h2.length - 1], Aa = la.days[la.days.length - 1], Qn = Me(addDays(Aa.value, 1), getMonth(le));
          h2.push({ days: Qn });
        }
    }
    return h2;
  }, Me = (h2, le) => {
    const w = j(h2), G = [];
    for (let ie = 0; ie < 7; ie++) {
      const Xe = addDays(w, ie), st = getMonth(Xe) !== le;
      G.push({
        text: e.hideOffsetDates && st ? "" : Xe.getDate(),
        value: Xe,
        current: !st,
        classData: {}
      });
    }
    return G;
  }, be = (h2, le) => {
    const w = [], G = new Date(le, h2), ie = new Date(le, h2 + 1, 0), Xe = e.weekStart, st = startOfWeek(G, { weekStartsOn: Xe }), _t = (Vt) => {
      const $a = Me(Vt, h2);
      if (w.push({ days: $a }), !w[w.length - 1].days.some(
        (St) => Ae(We(St.value), We(ie))
      )) {
        const St = addDays(Vt, 7);
        _t(St);
      }
    };
    return _t(st), B(w, G, ie, Xe);
  }, Se = (h2) => {
    const le = Mt(j(h2.value), c.hours, c.minutes, Ue());
    t("date-update", le), I.value.enabled ? xa(le, i, I.value.limit) : i.value = le, a(), nextTick().then(() => {
      oe();
    });
  }, b = (h2) => U.value.noDisabledRange ? Yn(n.value[0], h2).some((w) => z(w)) : false, F = () => {
    n.value = i.value ? i.value.slice() : [], n.value.length === 2 && !(U.value.fixedStart || U.value.fixedEnd) && (n.value = []);
  }, Re = (h2, le) => {
    const w = [
      j(h2.value),
      addDays(j(h2.value), +U.value.autoRange)
    ];
    q(w) ? (le && Fe(h2.value), n.value = w) : t("invalid-date", h2.value);
  }, Fe = (h2) => {
    const le = getMonth(j(h2)), w = getYear(j(h2));
    if (ne(0, le, w), m.value.count > 0)
      for (let G = 1; G < m.value.count; G++) {
        const ie = Yl(
          set(j(h2), { year: v.value(G - 1), month: me.value(G - 1) })
        );
        ne(G, ie.month, ie.year);
      }
  }, mt = (h2) => {
    if (b(h2.value) || !ee(h2.value, i.value, U.value.fixedStart ? 0 : 1))
      return t("invalid-date", h2.value);
    n.value = Un(j(h2.value), i, t, U);
  }, ve = (h2, le) => {
    if (F(), U.value.autoRange) return Re(h2, le);
    if (U.value.fixedStart || U.value.fixedEnd) return mt(h2);
    n.value[0] ? ee(j(h2.value), i.value) && !b(h2.value) ? Ye(j(h2.value), j(n.value[0])) ? (n.value.unshift(j(h2.value)), t("range-end", n.value[0])) : (n.value[1] = j(h2.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", h2.value), t("invalid-date", h2.value)) : (n.value[0] = j(h2.value), t("range-start", n.value[0]));
  }, Ue = (h2 = true) => e.enableSeconds ? Array.isArray(c.seconds) ? h2 ? c.seconds[0] : c.seconds[1] : c.seconds : 0, lt = (h2) => {
    n.value[h2] = Mt(
      n.value[h2],
      c.hours[h2],
      c.minutes[h2],
      Ue(h2 !== 1)
    );
  }, ga = () => {
    var h2, le;
    n.value[0] && n.value[1] && +((h2 = n.value) == null ? void 0 : h2[0]) > +((le = n.value) == null ? void 0 : le[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, na = () => {
    n.value.length && (n.value[0] && !n.value[1] ? lt(0) : (lt(0), lt(1), a()), ga(), i.value = n.value.slice(), pa(n.value, t, e.autoApply, e.modelAuto));
  }, ha = (h2, le = false) => {
    if (z(h2.value) || !h2.current && e.hideOffsetDates) return t("invalid-date", h2.value);
    if (d.value = JSON.parse(JSON.stringify(h2)), !U.value.enabled) return Se(h2);
    yn(c.hours) && yn(c.minutes) && !I.value.enabled && (ve(h2, le), na());
  }, ba = (h2, le) => {
    var G;
    ne(h2, le.month, le.year, true), m.value.count && !m.value.solo && ue(h2), t("update-month-year", { instance: h2, month: le.month, year: le.year }), r(m.value.solo ? h2 : void 0);
    const w = (G = e.flow) != null && G.length ? e.flow[e.flowStep] : void 0;
    !le.fromNav && (w === Ge.month || w === Ge.year) && a();
  }, ka = (h2, le) => {
    Hn({
      value: h2,
      modelValue: i,
      range: U.value.enabled,
      timezone: le ? void 0 : H.value.timezone
    }), p(), e.multiCalendars && nextTick().then(() => $(true));
  }, wa = () => {
    const h2 = Qa(j(), H.value);
    !U.value.enabled && !I.value.enabled ? i.value = h2 : i.value && Array.isArray(i.value) && i.value[0] ? I.value.enabled ? i.value = [...i.value, h2] : i.value = Ye(h2, i.value[0]) ? [h2, i.value[0]] : [i.value[0], h2] : i.value = [h2], p();
  }, Da = () => {
    if (Array.isArray(i.value))
      if (I.value.enabled) {
        const h2 = Ma();
        i.value[i.value.length - 1] = S(h2);
      } else
        i.value = i.value.map((h2, le) => h2 && S(h2, le));
    else
      i.value = S(i.value);
    t("time-update");
  }, Ma = () => Array.isArray(i.value) && i.value.length ? i.value[i.value.length - 1] : null;
  return {
    calendars: _,
    modelValue: i,
    month: me,
    year: v,
    time: c,
    disabledTimesConfig: fe,
    today: C,
    validateTime: K,
    getCalendarDays: be,
    getMarker: E,
    handleScroll: pe,
    handleSwipe: o,
    handleArrow: re,
    selectDate: ha,
    updateMonthYear: ba,
    presetDate: ka,
    selectCurrentDate: wa,
    updateTime: (h2, le = true, w = false) => {
      x(h2, le, w, Da);
    },
    assignMonthAndYear: g,
    setStartTime: W
  };
};
var Gr = { key: 0 };
var Qr = defineComponent({
  __name: "DatePicker",
  props: {
    ...ct
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, {
      calendars: u,
      month: d,
      year: y,
      modelValue: i,
      time: _,
      disabledTimesConfig: c,
      today: C,
      validateTime: m,
      getCalendarDays: P,
      getMarker: U,
      handleArrow: N,
      handleScroll: H,
      handleSwipe: f,
      selectDate: I,
      updateMonthYear: k,
      presetDate: z,
      selectCurrentDate: q,
      updateTime: ee,
      assignMonthAndYear: x,
      setStartTime: S
    } = Kr(n, a, Y, g), X = useSlots(), { setHoverDate: O, getDayClassData: K, clearHoverDate: fe } = fo(i, n), { defaultedMultiCalendars: me } = _e(n), v = ref([]), L = ref([]), ne = ref(null), p = tt(X, "calendar"), W = tt(X, "monthYear"), T = tt(X, "timePicker"), oe = (re) => {
      n.shadow || a("mount", re);
    };
    watch(
      u,
      () => {
        n.shadow || setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    ), watch(
      me,
      (re, o) => {
        re.count - o.count > 0 && x();
      },
      { deep: true }
    );
    const $ = computed(() => (re) => P(d.value(re), y.value(re)).map((o) => ({
      ...o,
      days: o.days.map((E) => (E.marker = U(E), E.classData = K(E), E))
    })));
    function Y(re) {
      var o;
      re || re === 0 ? (o = L.value[re]) == null || o.triggerTransition(d.value(re), y.value(re)) : L.value.forEach((E, ce) => E.triggerTransition(d.value(ce), y.value(ce)));
    }
    function g() {
      a("update-flow-step");
    }
    const Z = (re, o = false) => {
      I(re, o), n.spaceConfirm && a("select-date");
    }, se = (re, o, E = 0) => {
      var ce;
      (ce = v.value[E]) == null || ce.toggleMonthPicker(re, o);
    }, R = (re, o, E = 0) => {
      var ce;
      (ce = v.value[E]) == null || ce.toggleYearPicker(re, o);
    }, ae = (re, o, E) => {
      var ce;
      (ce = ne.value) == null || ce.toggleTimePicker(re, o, E);
    }, l = (re, o) => {
      var E;
      if (!n.range) {
        const ce = i.value ? i.value : C, B = o ? new Date(o) : ce, Me = re ? startOfWeek(B, { weekStartsOn: 1 }) : endOfWeek(B, { weekStartsOn: 1 });
        I({
          value: Me,
          current: getMonth(B) === d.value(0),
          text: "",
          classData: {}
        }), (E = document.getElementById(Ha(Me))) == null || E.focus();
      }
    }, D = (re) => {
      var o;
      (o = v.value[0]) == null || o.handleMonthYearChange(re, true);
    }, ue = (re) => {
      k(0, { month: d.value(0), year: y.value(0) + (re ? 1 : -1), fromNav: true });
    }, M = (re, o) => {
      re === Ge.time && a(`time-picker-${o ? "open" : "close"}`), a("overlay-toggle", { open: o, overlay: re });
    }, he = (re) => {
      a("overlay-toggle", { open: false, overlay: re }), a("focus-menu");
    };
    return t({
      clearHoverDate: fe,
      presetDate: z,
      selectCurrentDate: q,
      toggleMonthPicker: se,
      toggleYearPicker: R,
      toggleTimePicker: ae,
      handleArrow: N,
      updateMonthYear: k,
      getSidebarProps: () => ({
        modelValue: i,
        month: d,
        year: y,
        time: _,
        updateTime: ee,
        updateMonthYear: k,
        selectDate: I,
        presetDate: z
      }),
      changeMonth: D,
      changeYear: ue,
      selectWeekDate: l,
      setStartTime: S
    }), (re, o) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(ma, {
        "multi-calendars": unref(me).count,
        collapse: re.collapse,
        "is-mobile": re.isMobile
      }, {
        default: withCtx(({ instance: E, index: ce }) => [
          re.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Fr, mergeProps({
            key: 0,
            ref: (B) => {
              B && (v.value[ce] = B);
            },
            months: unref(Sn)(re.formatLocale, re.locale, re.monthNameFormat),
            years: unref(qa)(re.yearRange, re.locale, re.reverseYears),
            month: unref(d)(E),
            year: unref(y)(E),
            instance: E
          }, re.$props, {
            onMount: o[0] || (o[0] = (B) => oe(unref(Rt).header)),
            onResetFlow: o[1] || (o[1] = (B) => re.$emit("reset-flow")),
            onUpdateMonthYear: (B) => unref(k)(E, B),
            onOverlayClosed: he,
            onOverlayOpened: o[2] || (o[2] = (B) => re.$emit("overlay-toggle", { open: true, overlay: B }))
          }), createSlots({ _: 2 }, [
            renderList(unref(W), (B, Me) => ({
              name: B,
              fn: withCtx((be) => [
                renderSlot(re.$slots, B, normalizeProps(guardReactiveProps(be)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(jr, mergeProps({
            ref: (B) => {
              B && (L.value[ce] = B);
            },
            "mapped-dates": $.value(E),
            month: unref(d)(E),
            year: unref(y)(E),
            instance: E
          }, re.$props, {
            onSelectDate: (B) => unref(I)(B, E !== 1),
            onHandleSpace: (B) => Z(B, E !== 1),
            onSetHoverDate: o[3] || (o[3] = (B) => unref(O)(B)),
            onHandleScroll: (B) => unref(H)(B, E),
            onHandleSwipe: (B) => unref(f)(B, E),
            onMount: o[4] || (o[4] = (B) => oe(unref(Rt).calendar)),
            onResetFlow: o[5] || (o[5] = (B) => re.$emit("reset-flow")),
            onTooltipOpen: o[6] || (o[6] = (B) => re.$emit("tooltip-open", B)),
            onTooltipClose: o[7] || (o[7] = (B) => re.$emit("tooltip-close", B))
          }), createSlots({ _: 2 }, [
            renderList(unref(p), (B, Me) => ({
              name: B,
              fn: withCtx((be) => [
                renderSlot(re.$slots, B, normalizeProps(guardReactiveProps({ ...be })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse", "is-mobile"]),
      re.enableTimePicker ? (openBlock(), createElementBlock("div", Gr, [
        re.$slots["time-picker"] ? renderSlot(re.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(_), updateTime: unref(ee) }))) : (openBlock(), createBlock(Vn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: ne
        }, re.$props, {
          hours: unref(_).hours,
          minutes: unref(_).minutes,
          seconds: unref(_).seconds,
          "internal-model-value": re.internalModelValue,
          "disabled-times-config": unref(c),
          "validate-time": unref(m),
          onMount: o[8] || (o[8] = (E) => oe(unref(Rt).timePicker)),
          "onUpdate:hours": o[9] || (o[9] = (E) => unref(ee)(E)),
          "onUpdate:minutes": o[10] || (o[10] = (E) => unref(ee)(E, false)),
          "onUpdate:seconds": o[11] || (o[11] = (E) => unref(ee)(E, false, true)),
          onResetFlow: o[12] || (o[12] = (E) => re.$emit("reset-flow")),
          onOverlayClosed: o[13] || (o[13] = (E) => M(E, false)),
          onOverlayOpened: o[14] || (o[14] = (E) => M(E, true)),
          onAmPmChange: o[15] || (o[15] = (E) => re.$emit("am-pm-change", E))
        }), createSlots({ _: 2 }, [
          renderList(unref(T), (E, ce) => ({
            name: E,
            fn: withCtx((B) => [
              renderSlot(re.$slots, E, normalizeProps(guardReactiveProps(B)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var qr = (e, t) => {
  const r = ref(), {
    defaultedMultiCalendars: a,
    defaultedConfig: n,
    defaultedHighlight: u,
    defaultedRange: d,
    propDates: y,
    defaultedFilters: i,
    defaultedMultiDates: _
  } = _e(e), { modelValue: c, year: C, month: m, calendars: P } = aa(e, t), { isDisabled: U } = Tt(e), { selectYear: N, groupedYears: H, showYearPicker: f, isDisabled: I, toggleYearPicker: k, handleYearSelect: z, handleYear: q } = Wn({
    modelValue: c,
    multiCalendars: a,
    range: d,
    highlight: u,
    calendars: P,
    propDates: y,
    month: m,
    year: C,
    filters: i,
    props: e,
    emit: t
  }), ee = (p, W) => [p, W].map((T) => format(T, "MMMM", { locale: e.formatLocale })).join("-"), x = computed(() => (p) => c.value ? Array.isArray(c.value) ? c.value.some((W) => isSameQuarter(p, W)) : isSameQuarter(c.value, p) : false), S = (p) => {
    if (d.value.enabled) {
      if (Array.isArray(c.value)) {
        const W = Ae(p, c.value[0]) || Ae(p, c.value[1]);
        return Jt(c.value, r.value, p) && !W;
      }
      return false;
    }
    return false;
  }, X = (p, W) => p.quarter === getQuarter(W) && p.year === getYear(W), O = (p) => typeof u.value == "function" ? u.value({ quarter: getQuarter(p), year: getYear(p) }) : !!u.value.quarters.find((W) => X(W, p)), K = computed(() => (p) => {
    const W = set(/* @__PURE__ */ new Date(), { year: C.value(p) });
    return eachQuarterOfInterval({
      start: startOfYear(W),
      end: endOfYear(W)
    }).map((T) => {
      const oe = startOfQuarter(T), $ = endOfQuarter(T), Y = U(T), g = S(oe), Z = O(oe);
      return {
        text: ee(oe, $),
        value: oe,
        active: x.value(oe),
        highlighted: Z,
        disabled: Y,
        isBetween: g
      };
    });
  }), fe = (p) => {
    xa(p, c, _.value.limit), t("auto-apply", true);
  }, me = (p) => {
    c.value = en(c, p, t), pa(c.value, t, e.autoApply, e.modelAuto);
  }, v = (p) => {
    c.value = p, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: H,
    year: C,
    isDisabled: I,
    quarters: K,
    showYearPicker: f,
    modelValue: c,
    setHoverDate: (p) => {
      r.value = p;
    },
    selectYear: N,
    selectQuarter: (p, W, T) => {
      if (!T)
        return P.value[W].month = getMonth(endOfQuarter(p)), _.value.enabled ? fe(p) : d.value.enabled ? me(p) : v(p);
    },
    toggleYearPicker: k,
    handleYearSelect: z,
    handleYear: q
  };
};
var Xr = { class: "dp--quarter-items" };
var Jr = ["data-test-id", "disabled", "onClick", "onMouseover"];
var Zr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...ct
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, u = useSlots(), d = tt(u, "yearMode"), {
      defaultedMultiCalendars: y,
      defaultedConfig: i,
      groupedYears: _,
      year: c,
      isDisabled: C,
      quarters: m,
      modelValue: P,
      showYearPicker: U,
      setHoverDate: N,
      selectQuarter: H,
      toggleYearPicker: f,
      handleYearSelect: I,
      handleYear: k
    } = qr(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: P,
      year: c,
      selectQuarter: H,
      handleYearSelect: I,
      handleYear: k
    }) }), (q, ee) => (openBlock(), createBlock(ma, {
      "multi-calendars": unref(y).count,
      collapse: q.collapse,
      stretch: "",
      "is-mobile": q.isMobile
    }, {
      default: withCtx(({ instance: x }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(i).modeHeight}px` })
        }, [
          q.$slots["top-extra"] ? renderSlot(q.$slots, "top-extra", {
            key: 0,
            value: q.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(zn, mergeProps(q.$props, {
              items: unref(_)(x),
              instance: x,
              "show-year-picker": unref(U)[x],
              year: unref(c)(x),
              "is-disabled": (S) => unref(C)(x, S),
              onHandleYear: (S) => unref(k)(x, S),
              onYearSelect: (S) => unref(I)(S, x),
              onToggleYearPicker: (S) => unref(f)(x, S == null ? void 0 : S.flow, S == null ? void 0 : S.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(d), (S, X) => ({
                name: S,
                fn: withCtx((O) => [
                  renderSlot(q.$slots, S, normalizeProps(guardReactiveProps(O)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Xr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(m)(x), (S, X) => (openBlock(), createElementBlock("div", { key: X }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": S.active,
                  "dp--qr-btn-between": S.isBetween,
                  "dp--qr-btn-disabled": S.disabled,
                  "dp--highlighted": S.highlighted
                }]),
                "data-test-id": S.value,
                disabled: S.disabled,
                onClick: (O) => unref(H)(S.value, x, S.disabled),
                onMouseover: (O) => unref(N)(S.value)
              }, [
                q.$slots.quarter ? renderSlot(q.$slots, "quarter", {
                  key: 0,
                  value: S.value,
                  text: S.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(S.text), 1)
                ], 64))
              ], 42, Jr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse", "is-mobile"]));
  }
});
var Kn = (e, t) => {
  const r = ref(0);
  onMounted(() => {
    a(), window.addEventListener("resize", a, { passive: true });
  }), onUnmounted(() => {
    window.removeEventListener("resize", a);
  });
  const a = () => {
    r.value = window.document.documentElement.clientWidth;
  };
  return {
    isMobile: computed(
      () => r.value <= e.value.mobileBreakpoint && !t ? true : void 0
    )
  };
};
var xr = ["id", "tabindex", "role", "aria-label"];
var eo = {
  key: 0,
  class: "dp--menu-load-container"
};
var to = {
  key: 1,
  class: "dp--menu-header"
};
var ao = ["data-dp-mobile"];
var no = {
  key: 0,
  class: "dp__sidebar_left"
};
var lo = ["data-dp-mobile"];
var ro = ["data-test-id", "data-dp-mobile", "onClick", "onKeydown"];
var oo = {
  key: 2,
  class: "dp__sidebar_right"
};
var so = {
  key: 3,
  class: "dp__action_extra"
};
var gn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...va,
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, u = ref(null), d = computed(() => {
      const { openOnTop: b, ...F } = n;
      return {
        ...F,
        isMobile: N.value,
        flowStep: K.value,
        menuWrapRef: u.value
      };
    }), { setMenuFocused: y, setShiftKey: i, control: _ } = Ln(), c = useSlots(), { defaultedTextInput: C, defaultedInline: m, defaultedConfig: P, defaultedUI: U } = _e(n), { isMobile: N } = Kn(P, n.shadow), H = ref(null), f = ref(0), I = ref(null), k = ref(false), z = ref(null), q = ref(false);
    onMounted(() => {
      if (!n.shadow) {
        k.value = true, ee(), window.addEventListener("resize", ee);
        const b = Le(u);
        if (b && !C.value.enabled && !m.value.enabled && (y(true), W()), b) {
          const F = (Re) => {
            q.value = true, P.value.allowPreventDefault && Re.preventDefault(), Dt(Re, P.value, true);
          };
          b.addEventListener("pointerdown", F), b.addEventListener("mousedown", F);
        }
      }
      document.addEventListener("mousedown", be);
    }), onUnmounted(() => {
      window.removeEventListener("resize", ee), document.addEventListener("mousedown", be);
    });
    const ee = () => {
      const b = Le(I);
      b && (f.value = b.getBoundingClientRect().width);
    }, { arrowRight: x, arrowLeft: S, arrowDown: X, arrowUp: O } = At(), { flowStep: K, updateFlowStep: fe, childMount: me, resetFlow: v, handleFlow: L } = vo(n, a, z), ne = computed(() => n.monthPicker ? yr : n.yearPicker ? hr : n.timePicker ? Br : n.quarterPicker ? Zr : Qr), p = computed(() => {
      var Re;
      if (P.value.arrowLeft) return P.value.arrowLeft;
      const b = (Re = u.value) == null ? void 0 : Re.getBoundingClientRect(), F = n.getInputRect();
      return (F == null ? void 0 : F.width) < (f == null ? void 0 : f.value) && (F == null ? void 0 : F.left) <= ((b == null ? void 0 : b.left) ?? 0) ? `${(F == null ? void 0 : F.width) / 2}px` : (F == null ? void 0 : F.right) >= ((b == null ? void 0 : b.right) ?? 0) && (F == null ? void 0 : F.width) < (f == null ? void 0 : f.value) ? `${(f == null ? void 0 : f.value) - (F == null ? void 0 : F.width) / 2}px` : "50%";
    }), W = () => {
      const b = Le(u);
      b && b.focus({ preventScroll: true });
    }, T = computed(() => {
      var b;
      return ((b = z.value) == null ? void 0 : b.getSidebarProps()) || {};
    }), oe = () => {
      n.openOnTop && a("recalculate-position");
    }, $ = tt(c, "action"), Y = computed(() => n.monthPicker || n.yearPicker ? tt(c, "monthYear") : n.timePicker ? tt(c, "timePicker") : tt(c, "shared")), g = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), Z = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), se = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !m.value.enabled,
        dp__relative: m.value.enabled,
        ...U.value.menu ?? {}
      })
    ), R = (b) => {
      Dt(b, P.value, true);
    }, ae = () => {
      n.escClose && a("close-picker");
    }, l = (b) => {
      if (n.arrowNavigation) {
        if (b === Je.up) return O();
        if (b === Je.down) return X();
        if (b === Je.left) return S();
        if (b === Je.right) return x();
      } else b === Je.left || b === Je.up ? pe("handleArrow", Je.left, 0, b === Je.up) : pe("handleArrow", Je.right, 0, b === Je.down);
    }, D = (b) => {
      i(b.shiftKey), !n.disableMonthYearSelect && b.code === Oe.tab && b.target.classList.contains("dp__menu") && _.value.shiftKeyInMenu && (b.preventDefault(), Dt(b, P.value, true), a("close-picker"));
    }, ue = () => {
      W(), a("time-picker-close");
    }, M = (b) => {
      var F, Re, Fe;
      (F = z.value) == null || F.toggleTimePicker(false, false), (Re = z.value) == null || Re.toggleMonthPicker(false, false, b), (Fe = z.value) == null || Fe.toggleYearPicker(false, false, b);
    }, he = (b, F = 0) => {
      var Re, Fe, mt;
      return b === "month" ? (Re = z.value) == null ? void 0 : Re.toggleMonthPicker(false, true, F) : b === "year" ? (Fe = z.value) == null ? void 0 : Fe.toggleYearPicker(false, true, F) : b === "time" ? (mt = z.value) == null ? void 0 : mt.toggleTimePicker(true, false) : M(F);
    }, pe = (b, ...F) => {
      var Re, Fe;
      (Re = z.value) != null && Re[b] && ((Fe = z.value) == null || Fe[b](...F));
    }, re = () => {
      pe("selectCurrentDate");
    }, o = (b, F) => {
      pe("presetDate", toValue(b), F);
    }, E = () => {
      pe("clearHoverDate");
    }, ce = (b, F) => {
      pe("updateMonthYear", b, F);
    }, B = (b, F) => {
      b.preventDefault(), l(F);
    }, Me = (b) => {
      var F, Re, Fe;
      if (D(b), b.key === Oe.home || b.key === Oe.end)
        return pe(
          "selectWeekDate",
          b.key === Oe.home,
          b.target.getAttribute("id")
        );
      switch ((b.key === Oe.pageUp || b.key === Oe.pageDown) && (b.shiftKey ? (pe("changeYear", b.key === Oe.pageUp), (F = La(u.value, "overlay-year")) == null || F.focus()) : (pe("changeMonth", b.key === Oe.pageUp), (Re = La(u.value, b.key === Oe.pageUp ? "action-prev" : "action-next")) == null || Re.focus()), b.target.getAttribute("id") && ((Fe = u.value) == null || Fe.focus({ preventScroll: true }))), b.key) {
        case Oe.esc:
          return ae();
        case Oe.arrowLeft:
          return B(b, Je.left);
        case Oe.arrowRight:
          return B(b, Je.right);
        case Oe.arrowUp:
          return B(b, Je.up);
        case Oe.arrowDown:
          return B(b, Je.down);
        default:
          return;
      }
    }, be = (b) => {
      var F;
      m.value.enabled && !m.value.input && !((F = u.value) != null && F.contains(b.target)) && q.value && (q.value = false, a("menu-blur"));
    };
    return t({
      updateMonthYear: ce,
      switchView: he,
      handleFlow: L,
      onValueCleared: () => {
        var b, F;
        (F = (b = z.value) == null ? void 0 : b.setStartTime) == null || F.call(b);
      }
    }), (b, F) => {
      var Re, Fe, mt;
      return openBlock(), createElementBlock("div", {
        id: b.uid ? `dp-menu-${b.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: u,
        tabindex: unref(m).enabled ? void 0 : "0",
        role: unref(m).enabled ? void 0 : "dialog",
        "aria-label": (Re = b.ariaLabels) == null ? void 0 : Re.menu,
        class: normalizeClass(se.value),
        style: normalizeStyle({ "--dp-arrow-left": p.value }),
        onMouseleave: E,
        onClick: R,
        onKeydown: Me
      }, [
        (b.disabled || b.readonly) && unref(m).enabled || b.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(Z.value)
        }, [
          b.loading ? (openBlock(), createElementBlock("div", eo, F[19] || (F[19] = [
            createBaseVNode("span", { class: "dp--menu-loader" }, null, -1)
          ]))) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        b.$slots["menu-header"] ? (openBlock(), createElementBlock("div", to, [
          renderSlot(b.$slots, "menu-header")
        ])) : createCommentVNode("", true),
        !unref(m).enabled && !b.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(g.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: I,
          class: normalizeClass({
            dp__menu_content_wrapper: ((Fe = b.presetDates) == null ? void 0 : Fe.length) || !!b.$slots["left-sidebar"] || !!b.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((mt = b.presetDates) == null ? void 0 : mt.length) || !!b.$slots["left-sidebar"] || !!b.$slots["right-sidebar"])
          }),
          "data-dp-mobile": unref(N),
          style: normalizeStyle({ "--dp-menu-width": `${f.value}px` })
        }, [
          b.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", no, [
            renderSlot(b.$slots, "left-sidebar", normalizeProps(guardReactiveProps(T.value)))
          ])) : createCommentVNode("", true),
          b.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true }),
            "data-dp-mobile": unref(N)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(b.presetDates, (ve, Ue) => (openBlock(), createElementBlock(Fragment, { key: Ue }, [
              ve.slot ? renderSlot(b.$slots, ve.slot, {
                key: 0,
                presetDate: o,
                label: ve.label,
                value: ve.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(ve.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test-id": ve.testId ?? void 0,
                "data-dp-mobile": unref(N),
                onClick: withModifiers((lt) => o(ve.value, ve.noTz), ["prevent"]),
                onKeydown: (lt) => unref(Ze)(lt, () => o(ve.value, ve.noTz), true)
              }, toDisplayString(ve.label), 47, ro))
            ], 64))), 128))
          ], 10, lo)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: H,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(ne.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: z
            }, d.value, {
              "flow-step": unref(K),
              onMount: unref(me),
              onUpdateFlowStep: unref(fe),
              onResetFlow: unref(v),
              onFocusMenu: W,
              onSelectDate: F[0] || (F[0] = (ve) => b.$emit("select-date")),
              onDateUpdate: F[1] || (F[1] = (ve) => b.$emit("date-update", ve)),
              onTooltipOpen: F[2] || (F[2] = (ve) => b.$emit("tooltip-open", ve)),
              onTooltipClose: F[3] || (F[3] = (ve) => b.$emit("tooltip-close", ve)),
              onAutoApply: F[4] || (F[4] = (ve) => b.$emit("auto-apply", ve)),
              onRangeStart: F[5] || (F[5] = (ve) => b.$emit("range-start", ve)),
              onRangeEnd: F[6] || (F[6] = (ve) => b.$emit("range-end", ve)),
              onInvalidFixedRange: F[7] || (F[7] = (ve) => b.$emit("invalid-fixed-range", ve)),
              onTimeUpdate: F[8] || (F[8] = (ve) => b.$emit("time-update")),
              onAmPmChange: F[9] || (F[9] = (ve) => b.$emit("am-pm-change", ve)),
              onTimePickerOpen: F[10] || (F[10] = (ve) => b.$emit("time-picker-open", ve)),
              onTimePickerClose: ue,
              onRecalculatePosition: oe,
              onUpdateMonthYear: F[11] || (F[11] = (ve) => b.$emit("update-month-year", ve)),
              onAutoApplyInvalid: F[12] || (F[12] = (ve) => b.$emit("auto-apply-invalid", ve)),
              onInvalidDate: F[13] || (F[13] = (ve) => b.$emit("invalid-date", ve)),
              onOverlayToggle: F[14] || (F[14] = (ve) => b.$emit("overlay-toggle", ve)),
              "onUpdate:internalModelValue": F[15] || (F[15] = (ve) => b.$emit("update:internal-model-value", ve))
            }), createSlots({ _: 2 }, [
              renderList(Y.value, (ve, Ue) => ({
                name: ve,
                fn: withCtx((lt) => [
                  renderSlot(b.$slots, ve, normalizeProps(guardReactiveProps({ ...lt })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          b.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", oo, [
            renderSlot(b.$slots, "right-sidebar", normalizeProps(guardReactiveProps(T.value)))
          ])) : createCommentVNode("", true),
          b.$slots["action-extra"] ? (openBlock(), createElementBlock("div", so, [
            b.$slots["action-extra"] ? renderSlot(b.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: re
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 14, ao),
        !b.autoApply || unref(P).keepActionRow ? (openBlock(), createBlock(sr, mergeProps({
          key: 3,
          "menu-mount": k.value
        }, d.value, {
          "calendar-width": f.value,
          onClosePicker: F[16] || (F[16] = (ve) => b.$emit("close-picker")),
          onSelectDate: F[17] || (F[17] = (ve) => b.$emit("select-date")),
          onInvalidSelect: F[18] || (F[18] = (ve) => b.$emit("invalid-select")),
          onSelectNow: re
        }), createSlots({ _: 2 }, [
          renderList(unref($), (ve, Ue) => ({
            name: ve,
            fn: withCtx((lt) => [
              renderSlot(b.$slots, ve, normalizeProps(guardReactiveProps({ ...lt })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, xr);
    };
  }
});
var It = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(It || {});
var uo = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: r,
  pickerWrapperRef: a,
  inline: n,
  emit: u,
  props: d,
  slots: y
}) => {
  const { defaultedConfig: i } = _e(d), _ = ref({}), c = ref(false), C = ref({
    top: "0",
    left: "0"
  }), m = ref(false), P = toRef(d, "teleportCenter");
  watch(P, () => {
    C.value = JSON.parse(JSON.stringify({})), q();
  });
  const U = (p) => {
    if (d.teleport) {
      const W = p.getBoundingClientRect();
      return {
        left: W.left + window.scrollX,
        top: W.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, N = (p, W) => {
    C.value.left = `${p + W - _.value.width}px`;
  }, H = (p) => {
    C.value.left = `${p}px`;
  }, f = (p, W) => {
    d.position === It.left && H(p), d.position === It.right && N(p, W), d.position === It.center && (C.value.left = `${p + W / 2 - _.value.width / 2}px`);
  }, I = (p) => {
    const { width: W, height: T } = p.getBoundingClientRect(), { top: oe, left: $ } = U(p);
    return { top: +oe, left: +$, width: W, height: T };
  }, k = () => {
    C.value.left = "50%", C.value.top = "50%", C.value.transform = "translate(-50%, -50%)", C.value.position = "fixed", delete C.value.opacity;
  }, z = () => {
    const p = Le(r);
    C.value = d.altPosition(p);
  }, q = (p = true) => {
    var W;
    if (!n.value.enabled) {
      if (P.value) return k();
      if (d.altPosition !== null) return z();
      if (p) {
        const T = d.teleport ? (W = t.value) == null ? void 0 : W.$el : e.value;
        T && (_.value = T.getBoundingClientRect()), u("recalculate-position");
      }
      return fe();
    }
  }, ee = ({ inputEl: p, left: W, width: T }) => {
    window.screen.width > 768 && !c.value && f(W, T), X(p);
  }, x = (p) => {
    const { top: W, left: T, height: oe, width: $ } = I(p);
    C.value.top = `${oe + W + +d.offset}px`, m.value = false, c.value || (C.value.left = `${T + $ / 2 - _.value.width / 2}px`), ee({ inputEl: p, left: T, width: $ });
  }, S = (p) => {
    const { top: W, left: T, width: oe } = I(p);
    C.value.top = `${W - +d.offset - _.value.height}px`, m.value = true, ee({ inputEl: p, left: T, width: oe });
  }, X = (p) => {
    if (d.autoPosition) {
      const { left: W, width: T } = I(p), { left: oe, right: $ } = _.value;
      if (!c.value) {
        if (Math.abs(oe) !== Math.abs($)) {
          if (oe <= 0)
            return c.value = true, H(W);
          if ($ >= document.documentElement.clientWidth)
            return c.value = true, N(W, T);
        }
        return f(W, T);
      }
    }
  }, O = () => {
    const p = Le(r);
    if (p) {
      if (d.autoPosition === it.top) return it.top;
      if (d.autoPosition === it.bottom) return it.bottom;
      const { height: W } = _.value, { top: T, height: oe } = p.getBoundingClientRect(), Y = window.innerHeight - T - oe, g = T;
      return W <= Y ? it.bottom : W > Y && W <= g ? it.top : Y >= g ? it.bottom : it.top;
    }
    return it.bottom;
  }, K = (p) => O() === it.bottom ? x(p) : S(p), fe = () => {
    const p = Le(r);
    if (p)
      return d.autoPosition ? K(p) : x(p);
  }, me = function(p) {
    if (p) {
      const W = p.scrollHeight > p.clientHeight, oe = window.getComputedStyle(p).overflowY.indexOf("hidden") !== -1;
      return W && !oe;
    }
    return true;
  }, v = function(p) {
    return !p || p === document.body || p.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : me(p) ? p : v(
      p.assignedSlot && i.value.shadowDom ? p.assignedSlot.parentNode : p.parentNode
    );
  }, L = (p) => {
    if (p)
      switch (d.position) {
        case It.left:
          return { left: 0, transform: "translateX(0)" };
        case It.right:
          return { left: `${p.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${p.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: m,
    menuStyle: C,
    xCorrect: c,
    setMenuPosition: q,
    getScrollableParent: v,
    shadowRender: (p, W) => {
      var se, R, ae;
      const T = document.createElement("div"), oe = (se = Le(r)) == null ? void 0 : se.getBoundingClientRect();
      T.setAttribute("id", "dp--temp-container");
      const $ = (R = a.value) != null && R.clientWidth ? a.value : document.body;
      $.append(T);
      const Y = L(oe), g = i.value.shadowDom ? Object.keys(y).filter(
        (l) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(l)
      ) : Object.keys(y), Z = h(
        p,
        {
          ...W,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...Y }
        },
        Object.fromEntries(g.map((l) => [l, y[l]]))
      );
      render(Z, T), _.value = (ae = Z.el) == null ? void 0 : ae.getBoundingClientRect(), render(null, T), $.removeChild(T);
    }
  };
};
var bt = [
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
var io = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var co = {
  all: () => bt,
  monthYear: () => bt.filter((e) => e.use.includes("month-year")),
  input: () => io,
  timePicker: () => bt.filter((e) => e.use.includes("time")),
  action: () => bt.filter((e) => e.use.includes("action")),
  calendar: () => bt.filter((e) => e.use.includes("calendar")),
  menu: () => bt.filter((e) => e.use.includes("menu")),
  shared: () => bt.filter((e) => e.use.includes("shared")),
  yearMode: () => bt.filter((e) => e.use.includes("year-mode"))
};
var tt = (e, t, r) => {
  const a = [];
  return co[t]().forEach((n) => {
    e[n.name] && a.push(n.name);
  }), r != null && r.length && r.forEach((n) => {
    n.slot && a.push(n.slot);
  }), a;
};
var ta = (e) => {
  const t = computed(() => (a) => e.value ? a ? e.value.open : e.value.close : ""), r = computed(() => (a) => e.value ? a ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: r };
};
var aa = (e, t, r) => {
  const { defaultedRange: a, defaultedTz: n } = _e(e), u = j(et(j(), n.value.timezone)), d = ref([{ month: getMonth(u), year: getYear(u) }]), y = (m) => {
    const P = {
      hours: getHours(u),
      minutes: getMinutes(u),
      seconds: 0
    };
    return a.value.enabled ? [P[m], P[m]] : P[m];
  }, i = reactive({
    hours: y("hours"),
    minutes: y("minutes"),
    seconds: y("seconds")
  });
  watch(
    a,
    (m, P) => {
      m.enabled !== P.enabled && (i.hours = y("hours"), i.minutes = y("minutes"), i.seconds = y("seconds"));
    },
    { deep: true }
  );
  const _ = computed({
    get: () => e.internalModelValue,
    set: (m) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", m);
    }
  }), c = computed(
    () => (m) => d.value[m] ? d.value[m].month : 0
  ), C = computed(
    () => (m) => d.value[m] ? d.value[m].year : 0
  );
  return watch(
    _,
    (m, P) => {
      r && JSON.stringify(m ?? {}) !== JSON.stringify(P ?? {}) && r();
    },
    { deep: true }
  ), {
    calendars: d,
    time: i,
    modelValue: _,
    month: c,
    year: C,
    today: u
  };
};
var fo = (e, t) => {
  const {
    defaultedMultiCalendars: r,
    defaultedMultiDates: a,
    defaultedUI: n,
    defaultedHighlight: u,
    defaultedTz: d,
    propDates: y,
    defaultedRange: i
  } = _e(t), { isDisabled: _ } = Tt(t), c = ref(null), C = ref(et(/* @__PURE__ */ new Date(), d.value.timezone)), m = (l) => {
    !l.current && t.hideOffsetDates || (c.value = l.value);
  }, P = () => {
    c.value = null;
  }, U = (l) => Array.isArray(e.value) && i.value.enabled && e.value[0] && c.value ? l ? Ee(c.value, e.value[0]) : Ye(c.value, e.value[0]) : true, N = (l, D) => {
    const ue = () => e.value ? D ? e.value[0] || null : e.value[1] : null, M = e.value && Array.isArray(e.value) ? ue() : null;
    return Ae(j(l.value), M);
  }, H = (l) => {
    const D = Array.isArray(e.value) ? e.value[0] : null;
    return l ? !Ye(c.value ?? null, D) : true;
  }, f = (l, D = true) => (i.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !l.current ? false : Ae(j(l.value), e.value[D ? 0 : 1]) : i.value.enabled ? N(l, D) && H(D) || Ae(l.value, Array.isArray(e.value) ? e.value[0] : null) && U(D) : false, I = (l, D) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const ue = Ae(l.value, c.value);
      return D ? Ee(e.value[0], l.value) && ue : Ye(e.value[0], l.value) && ue;
    }
    return false;
  }, k = (l) => !e.value || t.hideOffsetDates && !l.current ? false : i.value.enabled ? t.modelAuto && Array.isArray(e.value) ? Ae(l.value, e.value[0] ? e.value[0] : C.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((D) => Ae(D, l.value)) : Ae(l.value, e.value ? e.value : C.value), z = (l) => {
    if (i.value.autoRange || t.weekPicker) {
      if (c.value) {
        if (t.hideOffsetDates && !l.current) return false;
        const D = addDays(c.value, +i.value.autoRange), ue = pt(j(c.value), t.weekStart);
        return t.weekPicker ? Ae(ue[1], j(l.value)) : Ae(D, j(l.value));
      }
      return false;
    }
    return false;
  }, q = (l) => {
    if (i.value.autoRange || t.weekPicker) {
      if (c.value) {
        const D = addDays(c.value, +i.value.autoRange);
        if (t.hideOffsetDates && !l.current) return false;
        const ue = pt(j(c.value), t.weekStart);
        return t.weekPicker ? Ee(l.value, ue[0]) && Ye(l.value, ue[1]) : Ee(l.value, c.value) && Ye(l.value, D);
      }
      return false;
    }
    return false;
  }, ee = (l) => {
    if (i.value.autoRange || t.weekPicker) {
      if (c.value) {
        if (t.hideOffsetDates && !l.current) return false;
        const D = pt(j(c.value), t.weekStart);
        return t.weekPicker ? Ae(D[0], l.value) : Ae(c.value, l.value);
      }
      return false;
    }
    return false;
  }, x = (l) => Jt(e.value, c.value, l.value), S = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, X = () => t.modelAuto ? Pn(t.internalModelValue) : true, O = (l) => {
    if (t.weekPicker) return false;
    const D = i.value.enabled ? !f(l) && !f(l, false) : true;
    return !_(l.value) && !k(l) && !(!l.current && t.hideOffsetDates) && D;
  }, K = (l) => i.value.enabled ? t.modelAuto ? S() && k(l) : false : k(l), fe = (l) => u.value ? Rl(l.value, y.value.highlight) : false, me = (l) => {
    const D = _(l.value);
    return D && (typeof u.value == "function" ? !u.value(l.value, D) : !u.value.options.highlightDisabled);
  }, v = (l) => {
    var D;
    return typeof u.value == "function" ? u.value(l.value) : (D = u.value.weekdays) == null ? void 0 : D.includes(l.value.getDay());
  }, L = (l) => (i.value.enabled || t.weekPicker) && (!(r.value.count > 0) || l.current) && X() && !(!l.current && t.hideOffsetDates) && !k(l) ? x(l) : false, ne = (l) => {
    if (Array.isArray(e.value) && e.value.length === 1) {
      const { before: D, after: ue } = vn(+i.value.maxRange, e.value[0]);
      return isBefore(l.value, D) || isAfter(l.value, ue);
    }
    return false;
  }, p = (l) => {
    if (Array.isArray(e.value) && e.value.length === 1) {
      const { before: D, after: ue } = vn(+i.value.minRange, e.value[0]);
      return Jt([D, ue], e.value[0], l.value);
    }
    return false;
  }, W = (l) => i.value.enabled && (i.value.maxRange || i.value.minRange) ? i.value.maxRange && i.value.minRange ? ne(l) || p(l) : i.value.maxRange ? ne(l) : p(l) : false, T = (l) => {
    const { isRangeStart: D, isRangeEnd: ue } = g(l), M = i.value.enabled ? D || ue : false;
    return {
      dp__cell_offset: !l.current,
      dp__pointer: !t.disabled && !(!l.current && t.hideOffsetDates) && !_(l.value) && !W(l),
      dp__cell_disabled: _(l.value) || W(l),
      dp__cell_highlight: !me(l) && (fe(l) || v(l)) && !K(l) && !M && !ee(l) && !(L(l) && t.weekPicker) && !ue,
      dp__cell_highlight_active: !me(l) && (fe(l) || v(l)) && K(l),
      dp__today: !t.noToday && Ae(l.value, C.value) && l.current,
      "dp--past": Ye(l.value, C.value),
      "dp--future": Ee(l.value, C.value)
    };
  }, oe = (l) => ({
    dp__active_date: K(l),
    dp__date_hover: O(l)
  }), $ = (l) => {
    if (e.value && !Array.isArray(e.value)) {
      const D = pt(e.value, t.weekStart);
      return {
        ...se(l),
        dp__range_start: Ae(D[0], l.value),
        dp__range_end: Ae(D[1], l.value),
        dp__range_between_week: Ee(l.value, D[0]) && Ye(l.value, D[1])
      };
    }
    return {
      ...se(l)
    };
  }, Y = (l) => {
    if (e.value && Array.isArray(e.value)) {
      const D = pt(e.value[0], t.weekStart), ue = e.value[1] ? pt(e.value[1], t.weekStart) : [];
      return {
        ...se(l),
        dp__range_start: Ae(D[0], l.value) || Ae(ue[0], l.value),
        dp__range_end: Ae(D[1], l.value) || Ae(ue[1], l.value),
        dp__range_between_week: Ee(l.value, D[0]) && Ye(l.value, D[1]) || Ee(l.value, ue[0]) && Ye(l.value, ue[1]),
        dp__range_between: Ee(l.value, D[1]) && Ye(l.value, ue[0])
      };
    }
    return {
      ...se(l)
    };
  }, g = (l) => {
    const D = r.value.count > 0 ? l.current && f(l) && X() : f(l) && X(), ue = r.value.count > 0 ? l.current && f(l, false) && X() : f(l, false) && X();
    return { isRangeStart: D, isRangeEnd: ue };
  }, Z = (l) => {
    const { isRangeStart: D, isRangeEnd: ue } = g(l);
    return {
      dp__range_start: D,
      dp__range_end: ue,
      dp__range_between: L(l),
      dp__date_hover: Ae(l.value, c.value) && !D && !ue && !t.weekPicker,
      dp__date_hover_start: I(l, true),
      dp__date_hover_end: I(l, false)
    };
  }, se = (l) => ({
    ...Z(l),
    dp__cell_auto_range: q(l),
    dp__cell_auto_range_start: ee(l),
    dp__cell_auto_range_end: z(l)
  }), R = (l) => i.value.enabled ? i.value.autoRange ? se(l) : t.modelAuto ? { ...oe(l), ...Z(l) } : t.weekPicker ? Y(l) : Z(l) : t.weekPicker ? $(l) : oe(l);
  return {
    setHoverDate: m,
    clearHoverDate: P,
    getDayClassData: (l) => t.hideOffsetDates && !l.current ? {} : {
      ...T(l),
      ...R(l),
      [t.dayClass ? t.dayClass(l.value, t.internalModelValue) : ""]: true,
      ...n.value.calendarCell ?? {}
    }
  };
};
var Tt = (e) => {
  const { defaultedFilters: t, defaultedRange: r, propDates: a, defaultedMultiDates: n } = _e(e), u = (v) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(j(v)) : !!ca(v, a.value.disabledDates) : false, d = (v) => a.value.maxDate ? e.yearPicker ? getYear(v) > getYear(a.value.maxDate) : Ee(v, a.value.maxDate) : false, y = (v) => a.value.minDate ? e.yearPicker ? getYear(v) < getYear(a.value.minDate) : Ye(v, a.value.minDate) : false, i = (v) => {
    const L = d(v), ne = y(v), p = u(v), T = t.value.months.map((Z) => +Z).includes(getMonth(v)), oe = e.disabledWeekDays.length ? e.disabledWeekDays.some((Z) => +Z === getDay(v)) : false, $ = P(v), Y = getYear(v), g = Y < +e.yearRange[0] || Y > +e.yearRange[1];
    return !(L || ne || p || T || g || oe || $);
  }, _ = (v, L) => Ye(...wt(a.value.minDate, v, L)) || Ae(...wt(a.value.minDate, v, L)), c = (v, L) => Ee(...wt(a.value.maxDate, v, L)) || Ae(...wt(a.value.maxDate, v, L)), C = (v, L, ne) => {
    let p = false;
    return a.value.maxDate && ne && c(v, L) && (p = true), a.value.minDate && !ne && _(v, L) && (p = true), p;
  }, m = (v, L, ne, p) => {
    let W = false;
    return p && (a.value.minDate || a.value.maxDate) ? a.value.minDate && a.value.maxDate ? W = C(v, L, ne) : (a.value.minDate && _(v, L) || a.value.maxDate && c(v, L)) && (W = true) : W = true, W;
  }, P = (v) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !ca(v, a.value.allowedDates) : false, U = (v) => !i(v), N = (v) => r.value.noDisabledRange ? !eachDayOfInterval({ start: v[0], end: v[1] }).some((ne) => U(ne)) : true, H = (v) => {
    if (v) {
      const L = getYear(v);
      return L >= +e.yearRange[0] && L <= e.yearRange[1];
    }
    return true;
  }, f = (v, L) => !!(Array.isArray(v) && v[L] && (r.value.maxRange || r.value.minRange) && H(v[L])), I = (v, L, ne = 0) => {
    if (f(L, ne) && H(v)) {
      const p = differenceInCalendarDays(v, L[ne]), W = Yn(L[ne], v), T = W.length === 1 ? 0 : W.filter(($) => U($)).length, oe = Math.abs(p) - (r.value.minMaxRawRange ? 0 : T);
      if (r.value.minRange && r.value.maxRange)
        return oe >= +r.value.minRange && oe <= +r.value.maxRange;
      if (r.value.minRange) return oe >= +r.value.minRange;
      if (r.value.maxRange) return oe <= +r.value.maxRange;
    }
    return true;
  }, k = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, z = (v) => Array.isArray(v) ? [v[0] ? Ca(v[0]) : null, v[1] ? Ca(v[1]) : null] : Ca(v), q = (v, L, ne) => v.find(
    (p) => +p.hours === getHours(L) && p.minutes === "*" ? true : +p.minutes === getMinutes(L) && +p.hours === getHours(L)
  ) && ne, ee = (v, L, ne) => {
    const [p, W] = v, [T, oe] = L;
    return !q(p, T, ne) && !q(W, oe, ne) && ne;
  }, x = (v, L) => {
    const ne = Array.isArray(L) ? L : [L];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? ee(e.disabledTimes, ne, v) : !ne.some((p) => q(e.disabledTimes, p, v)) : v;
  }, S = (v, L) => {
    const ne = Array.isArray(L) ? [Ct(L[0]), L[1] ? Ct(L[1]) : void 0] : Ct(L), p = !e.disabledTimes(ne);
    return v && p;
  }, X = (v, L) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? x(L, v) : S(L, v) : L, O = (v) => {
    let L = true;
    if (!v || k()) return true;
    const ne = !a.value.minDate && !a.value.maxDate ? z(v) : v;
    return (e.maxTime || a.value.maxDate) && (L = fn(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ne(ne),
      L
    )), (e.minTime || a.value.minDate) && (L = fn(
      e.minTime,
      a.value.minDate,
      "min",
      Ne(ne),
      L
    )), X(v, L);
  }, K = (v) => {
    if (!e.monthPicker) return true;
    let L = true;
    const ne = j(dt(v));
    if (a.value.minDate && a.value.maxDate) {
      const p = j(dt(a.value.minDate)), W = j(dt(a.value.maxDate));
      return Ee(ne, p) && Ye(ne, W) || Ae(ne, p) || Ae(ne, W);
    }
    if (a.value.minDate) {
      const p = j(dt(a.value.minDate));
      L = Ee(ne, p) || Ae(ne, p);
    }
    if (a.value.maxDate) {
      const p = j(dt(a.value.maxDate));
      L = Ye(ne, p) || Ae(ne, p);
    }
    return L;
  }, fe = computed(() => (v) => !e.enableTimePicker || e.ignoreTimeValidation ? true : O(v)), me = computed(() => (v) => e.monthPicker ? Array.isArray(v) && (r.value.enabled || n.value.enabled) ? !v.filter((ne) => !K(ne)).length : K(v) : true);
  return {
    isDisabled: U,
    validateDate: i,
    validateMonthYearInRange: m,
    isDateRangeAllowed: N,
    checkMinMaxRange: I,
    isValidTime: O,
    isTimeValid: fe,
    isMonthValid: me
  };
};
var ya = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), r = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: r };
};
var vo = (e, t, r) => {
  const a = ref(0), n = reactive({
    [Rt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Rt.calendar]: false,
    [Rt.header]: false
  }), u = computed(() => e.monthPicker || e.timePicker), d = (C) => {
    var m;
    if ((m = e.flow) != null && m.length) {
      if (!C && u.value) return c();
      n[C] = true, Object.keys(n).filter((P) => !n[P]).length || c();
    }
  }, y = () => {
    var C, m;
    (C = e.flow) != null && C.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), c()), ((m = e.flow) == null ? void 0 : m.length) === a.value && nextTick().then(() => i());
  }, i = () => {
    a.value = -1;
  }, _ = (C, m, ...P) => {
    var U, N;
    e.flow[a.value] === C && r.value && ((N = (U = r.value)[m]) == null || N.call(U, ...P));
  }, c = (C = 0) => {
    C && (a.value += C), _(Ge.month, "toggleMonthPicker", true), _(Ge.year, "toggleYearPicker", true), _(Ge.calendar, "toggleTimePicker", false, true), _(Ge.time, "toggleTimePicker", true, true);
    const m = e.flow[a.value];
    (m === Ge.hours || m === Ge.minutes || m === Ge.seconds) && _(m, "toggleTimePicker", true, true, m);
  };
  return { childMount: d, updateFlowStep: y, resetFlow: i, handleFlow: c, flowStep: a };
};
var mo = {
  key: 1,
  class: "dp__input_wrap"
};
var po = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var yo = {
  key: 2,
  class: "dp--clear-btn"
};
var go = ["aria-label"];
var ho = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...va
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, {
      defaultedTextInput: u,
      defaultedAriaLabels: d,
      defaultedInline: y,
      defaultedConfig: i,
      defaultedRange: _,
      defaultedMultiDates: c,
      defaultedUI: C,
      getDefaultPattern: m,
      getDefaultStartTime: P
    } = _e(n), { checkMinMaxRange: U } = Tt(n), N = ref(), H = ref(null), f = ref(false), I = ref(false), k = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !u.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !u.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: typeof n.state == "boolean" ? n.state : false,
        dp__input_invalid: typeof n.state == "boolean" ? !n.state : false,
        dp__input_focus: f.value || n.isMenuOpen,
        dp__input_reg: !u.value.enabled,
        ...C.value.input ?? {}
      })
    ), z = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), N.value = null);
    }, q = ($) => {
      const Y = P();
      return Bl(
        $,
        u.value.format ?? m(),
        Y ?? In({}, n.enableSeconds),
        n.inputValue,
        I.value,
        n.formatLocale
      );
    }, ee = ($) => {
      const { rangeSeparator: Y } = u.value, [g, Z] = $.split(`${Y}`);
      if (g) {
        const se = q(g.trim()), R = Z ? q(Z.trim()) : null;
        if (isAfter(se, R)) return;
        const ae = se && R ? [se, R] : [se];
        U(R, ae, 0) && (N.value = se ? ae : null);
      }
    }, x = () => {
      I.value = true;
    }, S = ($) => {
      if (_.value.enabled)
        ee($);
      else if (c.value.enabled) {
        const Y = $.split(";");
        N.value = Y.map((g) => q(g.trim())).filter((g) => g);
      } else
        N.value = q($);
    }, X = ($) => {
      var g;
      const Y = typeof $ == "string" ? $ : (g = $.target) == null ? void 0 : g.value;
      Y !== "" ? (u.value.openMenu && !n.isMenuOpen && a("open"), S(Y), a("set-input-date", N.value)) : z(), I.value = false, a("update:input-value", Y), a("text-input", $, N.value);
    }, O = ($) => {
      u.value.enabled ? (S($.target.value), u.value.enterSubmit && za(N.value) && n.inputValue !== "" ? (a("set-input-date", N.value, true), N.value = null) : u.value.enterSubmit && n.inputValue === "" && (N.value = null, a("clear"))) : me($);
    }, K = ($, Y) => {
      u.value.enabled && u.value.tabSubmit && !Y && S($.target.value), u.value.tabSubmit && za(N.value) && n.inputValue !== "" ? (a("set-input-date", N.value, true, true), N.value = null) : u.value.tabSubmit && n.inputValue === "" && (N.value = null, a("clear", true));
    }, fe = () => {
      f.value = true, a("focus"), nextTick().then(() => {
        var $;
        u.value.enabled && u.value.selectOnFocus && (($ = H.value) == null || $.select());
      });
    }, me = ($) => {
      if (Dt($, i.value, true), u.value.enabled && u.value.openMenu && !y.value.input) {
        if (u.value.openMenu === "open" && !n.isMenuOpen) return a("open");
        if (u.value.openMenu === "toggle") return a("toggle");
      } else u.value.enabled || a("toggle");
    }, v = () => {
      a("real-blur"), f.value = false, (!n.isMenuOpen || y.value.enabled && y.value.input) && a("blur"), n.autoApply && u.value.enabled && N.value && !n.isMenuOpen && (a("set-input-date", N.value), a("select-date"), N.value = null);
    }, L = ($) => {
      Dt($, i.value, true), a("clear");
    }, ne = () => {
      a("close");
    }, p = ($) => {
      if ($.key === "Tab" && K($), $.key === "Enter" && O($), $.key === "Escape" && u.value.escClose && ne(), !u.value.enabled) {
        if ($.code === "Tab") return;
        $.preventDefault();
      }
    }, W = () => {
      var $;
      ($ = H.value) == null || $.focus({ preventScroll: true });
    }, T = ($) => {
      N.value = $;
    }, oe = ($) => {
      $.key === Oe.tab && K($, true);
    };
    return t({
      focusInput: W,
      setParsedDate: T
    }), ($, Y) => {
      var g, Z, se;
      return openBlock(), createElementBlock("div", { onClick: me }, [
        $.$slots.trigger && !$.$slots["dp-input"] && !unref(y).enabled ? renderSlot($.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !$.$slots.trigger && (!unref(y).enabled || unref(y).input) ? (openBlock(), createElementBlock("div", mo, [
          $.$slots["dp-input"] && !$.$slots.trigger && (!unref(y).enabled || unref(y).enabled && unref(y).input) ? renderSlot($.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: X,
            onEnter: O,
            onTab: K,
            onClear: L,
            onBlur: v,
            onKeypress: p,
            onPaste: x,
            onFocus: fe,
            openMenu: () => $.$emit("open"),
            closeMenu: () => $.$emit("close"),
            toggleMenu: () => $.$emit("toggle")
          }) : createCommentVNode("", true),
          $.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: $.uid ? `dp-input-${$.uid}` : void 0,
            ref_key: "inputRef",
            ref: H,
            "data-test-id": "dp-input",
            name: $.name,
            class: normalizeClass(k.value),
            inputmode: unref(u).enabled ? "text" : "none",
            placeholder: $.placeholder,
            disabled: $.disabled,
            readonly: $.readonly,
            required: $.required,
            value: e.inputValue,
            autocomplete: $.autocomplete,
            "aria-label": (g = unref(d)) == null ? void 0 : g.input,
            "aria-disabled": $.disabled || void 0,
            "aria-invalid": $.state === false ? true : void 0,
            onInput: X,
            onBlur: v,
            onFocus: fe,
            onKeypress: p,
            onKeydown: Y[0] || (Y[0] = (R) => p(R)),
            onPaste: x
          }, null, 42, po)),
          createBaseVNode("div", {
            onClick: Y[3] || (Y[3] = (R) => a("toggle"))
          }, [
            $.$slots["input-icon"] && !$.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: Y[1] || (Y[1] = (R) => a("toggle"))
            }, [
              renderSlot($.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !$.$slots["input-icon"] && !$.hideInputIcon && !$.$slots["dp-input"] ? (openBlock(), createBlock(unref(Wt), {
              key: 1,
              "aria-label": (Z = unref(d)) == null ? void 0 : Z.calendarIcon,
              class: "dp__input_icon dp__input_icons",
              onClick: Y[2] || (Y[2] = (R) => a("toggle"))
            }, null, 8, ["aria-label"])) : createCommentVNode("", true)
          ]),
          $.$slots["clear-icon"] && ($.alwaysClearable || e.inputValue && $.clearable && !$.disabled && !$.readonly) ? (openBlock(), createElementBlock("span", yo, [
            renderSlot($.$slots, "clear-icon", { clear: L })
          ])) : createCommentVNode("", true),
          !$.$slots["clear-icon"] && ($.alwaysClearable || $.clearable && e.inputValue && !$.disabled && !$.readonly) ? (openBlock(), createElementBlock("button", {
            key: 3,
            "aria-label": (se = unref(d)) == null ? void 0 : se.clearInput,
            class: "dp--clear-btn",
            type: "button",
            onKeydown: Y[4] || (Y[4] = (R) => unref(Ze)(R, () => L(R), true, oe)),
            onClick: Y[5] || (Y[5] = withModifiers((R) => L(R), ["prevent"]))
          }, [
            createVNode(unref(Tn), {
              class: "dp__input_icons",
              "data-test-id": "clear-icon"
            })
          ], 40, go)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var bo = typeof window < "u" ? window : void 0;
var Ea = () => {
};
var ko = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var wo = (e, t, r, a) => {
  if (!e) return Ea;
  let n = Ea;
  const u = watch(
    () => unref(e),
    (y) => {
      n(), y && (y.addEventListener(t, r, a), n = () => {
        y.removeEventListener(t, r, a), n = Ea;
      });
    },
    { immediate: true, flush: "post" }
  ), d = () => {
    u(), n();
  };
  return ko(d), d;
};
var Do = (e, t, r, a = {}) => {
  const { window: n = bo, event: u = "pointerdown" } = a;
  return n ? wo(n, u, (y) => {
    const i = Le(e), _ = Le(t);
    !i || !_ || i === y.target || y.composedPath().includes(i) || y.composedPath().includes(_) || r(y);
  }, { passive: true }) : void 0;
};
var Mo = ["data-dp-mobile"];
var $o = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...va
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
  setup(e, { expose: t, emit: r }) {
    const a = r, n = e, u = useSlots(), d = ref(false), y = toRef(n, "modelValue"), i = toRef(n, "timezone"), _ = ref(null), c = ref(null), C = ref(null), m = ref(false), P = ref(null), U = ref(false), N = ref(false), H = ref(false), f = ref(false), { setMenuFocused: I, setShiftKey: k } = Ln(), { clearArrowNav: z } = At(), { validateDate: q, isValidTime: ee } = Tt(n), {
      defaultedTransitions: x,
      defaultedTextInput: S,
      defaultedInline: X,
      defaultedConfig: O,
      defaultedRange: K,
      defaultedMultiDates: fe
    } = _e(n), { menuTransition: me, showTransition: v } = ta(x), { isMobile: L } = Kn(O);
    onMounted(() => {
      R(n.modelValue), nextTick().then(() => {
        if (!X.value.enabled) {
          const w = Y(P.value);
          w == null || w.addEventListener("scroll", E), window == null || window.addEventListener("resize", ce);
        }
      }), X.value.enabled && (d.value = true), window == null || window.addEventListener("keyup", B), window == null || window.addEventListener("keydown", Me);
    }), onUnmounted(() => {
      if (!X.value.enabled) {
        const w = Y(P.value);
        w == null || w.removeEventListener("scroll", E), window == null || window.removeEventListener("resize", ce);
      }
      window == null || window.removeEventListener("keyup", B), window == null || window.removeEventListener("keydown", Me);
    });
    const ne = tt(u, "all", n.presetDates), p = tt(u, "input");
    watch(
      [y, i],
      () => {
        R(y.value);
      },
      { deep: true }
    );
    const { openOnTop: W, menuStyle: T, xCorrect: oe, setMenuPosition: $, getScrollableParent: Y, shadowRender: g } = uo({
      menuRef: _,
      menuRefInner: c,
      inputRef: C,
      pickerWrapperRef: P,
      inline: X,
      emit: a,
      props: n,
      slots: u
    }), {
      inputValue: Z,
      internalModelValue: se,
      parseExternalModelValue: R,
      emitModelValue: ae,
      formatInputValue: l,
      checkBeforeEmit: D
    } = nr(a, n, m), ue = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: X.value.enabled,
        "dp--flex-display-collapsed": H.value,
        dp__flex_display_with_input: X.value.input
      })
    ), M = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), he = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || X.value.enabled
    } : {}), pe = computed(() => ({ class: "dp__outer_menu_wrap" })), re = computed(() => X.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), o = () => {
      var w, G;
      return ((G = (w = C.value) == null ? void 0 : w.$el) == null ? void 0 : G.getBoundingClientRect()) ?? { width: 0, left: 0, right: 0 };
    }, E = () => {
      d.value && (O.value.closeOnScroll ? Ue() : $());
    }, ce = () => {
      var G;
      d.value && $();
      const w = ((G = c.value) == null ? void 0 : G.$el.getBoundingClientRect().width) ?? 0;
      H.value = document.body.offsetWidth <= w;
    }, B = (w) => {
      w.key === "Tab" && !X.value.enabled && !n.teleport && O.value.tabOutClosesMenu && (P.value.contains(document.activeElement) || Ue()), N.value = w.shiftKey;
    }, Me = (w) => {
      N.value = w.shiftKey;
    }, be = () => {
      !n.disabled && !n.readonly && (g(gn, n), $(false), d.value = true, d.value && a("open"), d.value || ve(), R(n.modelValue));
    }, Se = () => {
      var w, G;
      Z.value = "", ve(), (w = c.value) == null || w.onValueCleared(), (G = C.value) == null || G.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), O.value.closeOnClearValue && Ue();
    }, b = () => {
      const w = se.value;
      return !w || !Array.isArray(w) && q(w) ? true : Array.isArray(w) ? fe.value.enabled || w.length === 2 && q(w[0]) && q(w[1]) ? true : K.value.partialRange && !n.timePicker ? q(w[0]) : false : false;
    }, F = () => {
      D() && b() ? (ae(), Ue()) : a("invalid-select", se.value);
    }, Re = (w) => {
      Fe(), ae(), O.value.closeOnAutoApply && !w && Ue();
    }, Fe = () => {
      C.value && S.value.enabled && C.value.setParsedDate(se.value);
    }, mt = (w = false) => {
      n.autoApply && ee(se.value) && b() && (K.value.enabled && Array.isArray(se.value) ? (K.value.partialRange || se.value.length === 2) && Re(w) : Re(w));
    }, ve = () => {
      S.value.enabled || (se.value = null);
    }, Ue = (w = false) => {
      w && se.value && O.value.setDateOnMenuClose && F(), X.value.enabled || (d.value && (d.value = false, oe.value = false, I(false), k(false), z(), a("closed"), Z.value && R(y.value)), ve(), a("blur"));
    }, lt = (w, G, ie = false) => {
      if (!w) {
        se.value = null;
        return;
      }
      const Xe = Array.isArray(w) ? !w.some((_t) => !q(_t)) : q(w), st = ee(w);
      Xe && st ? (f.value = true, se.value = w, G && (U.value = ie, F(), a("text-submit")), nextTick().then(() => {
        f.value = false;
      })) : a("invalid-date", w);
    }, ga = () => {
      n.autoApply && ee(se.value) && ae(), Fe();
    }, na = () => d.value ? Ue() : be(), ha = (w) => {
      se.value = w;
    }, ba = () => {
      S.value.enabled && (m.value = true, l()), a("focus");
    }, ka = () => {
      if (S.value.enabled && (m.value = false, R(n.modelValue), U.value)) {
        const w = Pl(P.value, N.value);
        w == null || w.focus();
      }
      a("blur");
    }, wa = (w) => {
      c.value && c.value.updateMonthYear(0, {
        month: un(w.month),
        year: un(w.year)
      });
    }, Da = (w) => {
      R(w ?? n.modelValue);
    }, Ma = (w, G) => {
      var ie;
      (ie = c.value) == null || ie.switchView(w, G);
    }, tn = (w, G) => O.value.onClickOutside ? O.value.onClickOutside(w, G) : Ue(true), h2 = (w = 0) => {
      var G;
      (G = c.value) == null || G.handleFlow(w);
    }, le = () => _;
    return Do(
      _,
      C,
      (w) => tn(b, w)
    ), t({
      closeMenu: Ue,
      selectDate: F,
      clearValue: Se,
      openMenu: be,
      onScroll: E,
      formatInputValue: l,
      // exposed for testing purposes
      updateInternalModelValue: ha,
      // modify internal modelValue
      setMonthYear: wa,
      parseModel: Da,
      switchView: Ma,
      toggleMenu: na,
      handleFlow: h2,
      getDpWrapMenuRef: le
    }), (w, G) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: P,
      class: normalizeClass(ue.value),
      "data-datepicker-instance": "",
      "data-dp-mobile": unref(L)
    }, [
      createVNode(ho, mergeProps({
        ref_key: "inputRef",
        ref: C,
        "input-value": unref(Z),
        "onUpdate:inputValue": G[0] || (G[0] = (ie) => isRef(Z) ? Z.value = ie : null),
        "is-menu-open": d.value
      }, w.$props, {
        onClear: Se,
        onOpen: be,
        onSetInputDate: lt,
        onSetEmptyDate: unref(ae),
        onSelectDate: F,
        onToggle: na,
        onClose: Ue,
        onFocus: ba,
        onBlur: ka,
        onRealBlur: G[1] || (G[1] = (ie) => m.value = false),
        onTextInput: G[2] || (G[2] = (ie) => w.$emit("text-input", ie))
      }), createSlots({ _: 2 }, [
        renderList(unref(p), (ie, Xe) => ({
          name: ie,
          fn: withCtx((st) => [
            renderSlot(w.$slots, ie, normalizeProps(guardReactiveProps(st)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(w.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(he.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(me)(unref(W)),
            css: unref(v) && !unref(X).enabled
          }, {
            default: withCtx(() => [
              d.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: _
              }, pe.value, {
                class: { "dp--menu-wrapper": !unref(X).enabled },
                style: unref(X).enabled ? void 0 : unref(T)
              }), [
                createVNode(gn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: c
                }, w.$props, {
                  "internal-model-value": unref(se),
                  "onUpdate:internalModelValue": G[3] || (G[3] = (ie) => isRef(se) ? se.value = ie : null),
                  class: { [M.value]: true, "dp--menu-wrapper": w.teleport },
                  "open-on-top": unref(W),
                  "no-overlay-focus": re.value,
                  collapse: H.value,
                  "get-input-rect": o,
                  "is-text-input-date": f.value,
                  onClosePicker: Ue,
                  onSelectDate: F,
                  onAutoApply: mt,
                  onTimeUpdate: ga,
                  onFlowStep: G[4] || (G[4] = (ie) => w.$emit("flow-step", ie)),
                  onUpdateMonthYear: G[5] || (G[5] = (ie) => w.$emit("update-month-year", ie)),
                  onInvalidSelect: G[6] || (G[6] = (ie) => w.$emit("invalid-select", unref(se))),
                  onAutoApplyInvalid: G[7] || (G[7] = (ie) => w.$emit("invalid-select", ie)),
                  onInvalidFixedRange: G[8] || (G[8] = (ie) => w.$emit("invalid-fixed-range", ie)),
                  onRecalculatePosition: unref($),
                  onTooltipOpen: G[9] || (G[9] = (ie) => w.$emit("tooltip-open", ie)),
                  onTooltipClose: G[10] || (G[10] = (ie) => w.$emit("tooltip-close", ie)),
                  onTimePickerOpen: G[11] || (G[11] = (ie) => w.$emit("time-picker-open", ie)),
                  onTimePickerClose: G[12] || (G[12] = (ie) => w.$emit("time-picker-close", ie)),
                  onAmPmChange: G[13] || (G[13] = (ie) => w.$emit("am-pm-change", ie)),
                  onRangeStart: G[14] || (G[14] = (ie) => w.$emit("range-start", ie)),
                  onRangeEnd: G[15] || (G[15] = (ie) => w.$emit("range-end", ie)),
                  onDateUpdate: G[16] || (G[16] = (ie) => w.$emit("date-update", ie)),
                  onInvalidDate: G[17] || (G[17] = (ie) => w.$emit("invalid-date", ie)),
                  onOverlayToggle: G[18] || (G[18] = (ie) => w.$emit("overlay-toggle", ie)),
                  onMenuBlur: G[19] || (G[19] = (ie) => w.$emit("blur"))
                }), createSlots({ _: 2 }, [
                  renderList(unref(ne), (ie, Xe) => ({
                    name: ie,
                    fn: withCtx((st) => [
                      renderSlot(w.$slots, ie, normalizeProps(guardReactiveProps({ ...st })))
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
    ], 10, Mo));
  }
});
var Gn = (() => {
  const e = $o;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var Ao = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Gn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(Ao).forEach(([e, t]) => {
  e !== "default" && (Gn[e] = t);
});
export {
  Gn as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
