import {
  add,
  addDays,
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInYears,
  eachDayOfInterval,
  eachQuarterOfInterval,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getWeek,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isSameQuarter,
  isValid,
  parse,
  roundToNearestMinutes,
  set,
  setMilliseconds,
  setMonth,
  setSeconds,
  setYear,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  sub,
  subDays,
  subMonths,
  subYears
} from './chunk-B3E4SFXA.js'
import { onClickOutside, unrefElement, useSwipe } from './chunk-KPE6JYCH.js'
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
  inject,
  mergeDefaults,
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
  provide,
  reactive,
  readonly,
  ref,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  shallowReadonly,
  shallowRef,
  toDisplayString,
  toRef,
  toValue,
  unref,
  useSlots,
  useTemplateRef,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from './chunk-2YTPUVVG.js'
import './chunk-JVWSFFO4.js'

// node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ['top', 'right', 'bottom', 'left']
var alignments = ['start', 'end']
var placements = sides.reduce(
  (acc, side) => acc.concat(side, side + '-' + alignments[0], side + '-' + alignments[1]),
  []
)
var min = Math.min
var max = Math.max
var round = Math.round
var floor = Math.floor
var createCoords = (v) => ({
  x: v,
  y: v
})
var oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
}
var oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
}
function clamp(start, value, end) {
  return max(start, min(value, end))
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value
}
function getSide(placement) {
  return placement.split('-')[0]
}
function getAlignment(placement) {
  return placement.split('-')[1]
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x'
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width'
}
var yAxisSides = /* @__PURE__ */ new Set(['top', 'bottom'])
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x'
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement))
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false
  }
  const alignment = getAlignment(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const length = getAxisLength(alignmentAxis)
  let mainAlignmentSide =
    alignmentAxis === 'x'
      ? alignment === (rtl ? 'end' : 'start')
        ? 'right'
        : 'left'
      : alignment === 'start'
        ? 'bottom'
        : 'top'
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide)
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)]
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement)
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)]
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment])
}
var lrPlacement = ['left', 'right']
var rlPlacement = ['right', 'left']
var tbPlacement = ['top', 'bottom']
var btPlacement = ['bottom', 'top']
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement
      return isStart ? lrPlacement : rlPlacement
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement
    default:
      return []
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement)
  let list = getSideList(getSide(placement), direction === 'start', rtl)
  if (alignment) {
    list = list.map((side) => side + '-' + alignment)
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement))
    }
  }
  return list
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side])
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  }
}
function getPaddingObject(padding) {
  return typeof padding !== 'number'
    ? expandPaddingObject(padding)
    : {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding
      }
}
function rectToClientRect(rect) {
  const { x, y, width, height } = rect
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  }
}

// node_modules/.pnpm/@floating-ui+core@1.7.3/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let { reference, floating } = _ref
  const sideAxis = getSideAxis(placement)
  const alignmentAxis = getAlignmentAxis(placement)
  const alignLength = getAxisLength(alignmentAxis)
  const side = getSide(placement)
  const isVertical = sideAxis === 'y'
  const commonX = reference.x + reference.width / 2 - floating.width / 2
  const commonY = reference.y + reference.height / 2 - floating.height / 2
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2
  let coords
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      }
      break
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      }
      break
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      }
      break
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      }
      break
    default:
      coords = {
        x: reference.x,
        y: reference.y
      }
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1)
      break
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1)
      break
  }
  return coords
}
var computePosition = async (reference, floating, config) => {
  const { placement = 'bottom', strategy = 'absolute', middleware = [], platform: platform2 } = config
  const validMiddleware = middleware.filter(Boolean)
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating))
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  })
  let { x, y } = computeCoordsFromPlacement(rects, placement, rtl)
  let statefulPlacement = placement
  let middlewareData = {}
  let resetCount = 0
  for (let i = 0; i < validMiddleware.length; i++) {
    const { name, fn } = validMiddleware[i]
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    })
    x = nextX != null ? nextX : x
    y = nextY != null ? nextY : y
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    }
    if (reset && resetCount <= 50) {
      resetCount++
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement
        }
        if (reset.rects) {
          rects =
            reset.rects === true
              ? await platform2.getElementRects({
                  reference,
                  floating,
                  strategy
                })
              : reset.rects
        }
        ;({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl))
      }
      i = -1
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  }
}
async function detectOverflow(state, options) {
  var _await$platform$isEle
  if (options === void 0) {
    options = {}
  }
  const { x, y, platform: platform2, rects, elements, strategy } = state
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state)
  const paddingObject = getPaddingObject(padding)
  const altContext = elementContext === 'floating' ? 'reference' : 'floating'
  const element = elements[altBoundary ? altContext : elementContext]
  const clippingClientRect = rectToClientRect(
    await platform2.getClippingRect({
      element: (
        (_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null
          ? _await$platform$isEle
          : true
      )
        ? element
        : element.contextElement ||
          (await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    })
  )
  const rect =
    elementContext === 'floating'
      ? {
          x,
          y,
          width: rects.floating.width,
          height: rects.floating.height
        }
      : rects.reference
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating))
  const offsetScale = (await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)))
    ? (await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent))) || {
        x: 1,
        y: 1
      }
    : {
        x: 1,
        y: 1
      }
  const elementClientRect = rectToClientRect(
    platform2.convertOffsetParentRelativeRectToViewportRelativeRect
      ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
          elements,
          rect,
          offsetParent,
          strategy
        })
      : rect
  )
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  }
}
var arrow = (options) => ({
  name: 'arrow',
  options,
  async fn(state) {
    const { x, y, placement, rects, platform: platform2, elements, middlewareData } = state
    const { element, padding = 0 } = evaluate(options, state) || {}
    if (element == null) {
      return {}
    }
    const paddingObject = getPaddingObject(padding)
    const coords = {
      x,
      y
    }
    const axis = getAlignmentAxis(placement)
    const length = getAxisLength(axis)
    const arrowDimensions = await platform2.getDimensions(element)
    const isYAxis = axis === 'y'
    const minProp = isYAxis ? 'top' : 'left'
    const maxProp = isYAxis ? 'bottom' : 'right'
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth'
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length]
    const startDiff = coords[axis] - rects.reference[axis]
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element))
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0
    if (!clientSize || !(await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length]
    }
    const centerToReference = endDiff / 2 - startDiff / 2
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1
    const minPadding = min(paddingObject[minProp], largestPossiblePadding)
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding)
    const min$1 = minPadding
    const max2 = clientSize - arrowDimensions[length] - maxPadding
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference
    const offset3 = clamp(min$1, center, max2)
    const shouldAddOffset =
      !middlewareData.arrow &&
      getAlignment(placement) != null &&
      center !== offset3 &&
      rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0
    const alignmentOffset = shouldAddOffset ? (center < min$1 ? center - min$1 : center - max2) : 0
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    }
  }
})
var flip = function (options) {
  if (options === void 0) {
    options = {}
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip
      const { placement, middlewareData, rects, initialPlacement, platform: platform2, elements } = state
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state)
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {}
      }
      const side = getSide(placement)
      const initialSideAxis = getSideAxis(initialPlacement)
      const isBasePlacement = getSide(initialPlacement) === initialPlacement
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating))
      const fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement || !flipAlignment
          ? [getOppositePlacement(initialPlacement)]
          : getExpandedPlacements(initialPlacement))
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none'
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(
          ...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl)
        )
      }
      const placements2 = [initialPlacement, ...fallbackPlacements]
      const overflow = await detectOverflow(state, detectOverflowOptions)
      const overflows = []
      let overflowsData =
        ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || []
      if (checkMainAxis) {
        overflows.push(overflow[side])
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl)
        overflows.push(overflow[sides2[0]], overflow[sides2[1]])
      }
      overflowsData = [
        ...overflowsData,
        {
          placement,
          overflows
        }
      ]
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter
        const nextIndex =
          (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1
        const nextPlacement = placements2[nextIndex]
        if (nextPlacement) {
          const ignoreCrossAxisOverflow =
            checkCrossAxis === 'alignment' ? initialSideAxis !== getSideAxis(nextPlacement) : false
          if (
            !ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
            // overflows the main axis.
            overflowsData.every((d) => (getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true))
          ) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            }
          }
        }
        let resetPlacement =
          (_overflowsData$filter = overflowsData
            .filter((d) => d.overflows[0] <= 0)
            .sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null
            ? void 0
            : _overflowsData$filter.placement
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit': {
              var _overflowsData$filter2
              const placement2 =
                (_overflowsData$filter2 = overflowsData
                  .filter((d) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement)
                      return (
                        currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                        // reading directions favoring greater width.
                        currentSideAxis === 'y'
                      )
                    }
                    return true
                  })
                  .map((d) => [
                    d.placement,
                    d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)
                  ])
                  .sort((a, b) => a[1] - b[1])[0]) == null
                  ? void 0
                  : _overflowsData$filter2[0]
              if (placement2) {
                resetPlacement = placement2
              }
              break
            }
            case 'initialPlacement':
              resetPlacement = initialPlacement
              break
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          }
        }
      }
      return {}
    }
  }
}
var originSides = /* @__PURE__ */ new Set(['left', 'top'])
async function convertValueToCoords(state, options) {
  const { placement, platform: platform2, elements } = state
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating))
  const side = getSide(placement)
  const alignment = getAlignment(placement)
  const isVertical = getSideAxis(placement) === 'y'
  const mainAxisMulti = originSides.has(side) ? -1 : 1
  const crossAxisMulti = rtl && isVertical ? -1 : 1
  const rawValue = evaluate(options, state)
  let { mainAxis, crossAxis, alignmentAxis } =
    typeof rawValue === 'number'
      ? {
          mainAxis: rawValue,
          crossAxis: 0,
          alignmentAxis: null
        }
      : {
          mainAxis: rawValue.mainAxis || 0,
          crossAxis: rawValue.crossAxis || 0,
          alignmentAxis: rawValue.alignmentAxis
        }
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis
  }
  return isVertical
    ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti
      }
    : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti
      }
}
var offset = function (options) {
  if (options === void 0) {
    options = 0
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow
      const { x, y, placement, middlewareData } = state
      const diffCoords = await convertValueToCoords(state, options)
      if (
        placement ===
          ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) &&
        (_middlewareData$arrow = middlewareData.arrow) != null &&
        _middlewareData$arrow.alignmentOffset
      ) {
        return {}
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      }
    }
  }
}
var shift = function (options) {
  if (options === void 0) {
    options = {}
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const { x, y, placement } = state
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let { x: x2, y: y2 } = _ref
            return {
              x: x2,
              y: y2
            }
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state)
      const coords = {
        x,
        y
      }
      const overflow = await detectOverflow(state, detectOverflowOptions)
      const crossAxis = getSideAxis(getSide(placement))
      const mainAxis = getOppositeAxis(crossAxis)
      let mainAxisCoord = coords[mainAxis]
      let crossAxisCoord = coords[crossAxis]
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left'
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right'
        const min2 = mainAxisCoord + overflow[minSide]
        const max2 = mainAxisCoord - overflow[maxSide]
        mainAxisCoord = clamp(min2, mainAxisCoord, max2)
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left'
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right'
        const min2 = crossAxisCoord + overflow[minSide]
        const max2 = crossAxisCoord - overflow[maxSide]
        crossAxisCoord = clamp(min2, crossAxisCoord, max2)
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      })
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      }
    }
  }
}

// node_modules/.pnpm/@floating-ui+utils@0.2.10/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== 'undefined'
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase()
  }
  return '#document'
}
function getWindow(node) {
  var _node$ownerDocument
  return (
    (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) ||
    window
  )
}
function getDocumentElement(node) {
  var _ref
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null
    ? void 0
    : _ref.documentElement
}
function isNode(value) {
  if (!hasWindow()) {
    return false
  }
  return value instanceof Node || value instanceof getWindow(value).Node
}
function isElement(value) {
  if (!hasWindow()) {
    return false
  }
  return value instanceof Element || value instanceof getWindow(value).Element
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot
}
var invalidOverflowDisplayValues = /* @__PURE__ */ new Set(['inline', 'contents'])
function isOverflowElement(element) {
  const { overflow, overflowX, overflowY, display } = getComputedStyle2(element)
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !invalidOverflowDisplayValues.has(display)
  )
}
var tableElements = /* @__PURE__ */ new Set(['table', 'td', 'th'])
function isTableElement(element) {
  return tableElements.has(getNodeName(element))
}
var topLayerSelectors = [':popover-open', ':modal']
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector)
    } catch (_e) {
      return false
    }
  })
}
var transformProperties = ['transform', 'translate', 'scale', 'rotate', 'perspective']
var willChangeValues = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter']
var containValues = ['paint', 'layout', 'strict', 'content']
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit()
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss
  return (
    transformProperties.some((value) => (css[value] ? css[value] !== 'none' : false)) ||
    (css.containerType ? css.containerType !== 'normal' : false) ||
    (!webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false)) ||
    (!webkit && (css.filter ? css.filter !== 'none' : false)) ||
    willChangeValues.some((value) => (css.willChange || '').includes(value)) ||
    containValues.some((value) => (css.contain || '').includes(value))
  )
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element)
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode
    } else if (isTopLayer(currentNode)) {
      return null
    }
    currentNode = getParentNode(currentNode)
  }
  return null
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false
  return CSS.supports('-webkit-backdrop-filter', 'none')
}
var lastTraversableNodeNames = /* @__PURE__ */ new Set(['html', 'body', '#document'])
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node))
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element)
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    }
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  }
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node
  }
  const result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    (isShadowRoot(node) && node.host) || // Fallback.
    getDocumentElement(node)
  return isShadowRoot(result) ? result.host : result
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node)
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode
  }
  return getNearestOverflowAncestor(parentNode)
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2
  if (list === void 0) {
    list = []
  }
  if (traverseIframes === void 0) {
    traverseIframes = true
  }
  const scrollableAncestor = getNearestOverflowAncestor(node)
  const isBody =
    scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body)
  const win = getWindow(scrollableAncestor)
  if (isBody) {
    const frameElement = getFrameElement(win)
    return list.concat(
      win,
      win.visualViewport || [],
      isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
      frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []
    )
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes))
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null
}

// node_modules/.pnpm/@floating-ui+dom@1.7.4/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element)
  let width = parseFloat(css.width) || 0
  let height = parseFloat(css.height) || 0
  const hasOffset = isHTMLElement(element)
  const offsetWidth = hasOffset ? element.offsetWidth : width
  const offsetHeight = hasOffset ? element.offsetHeight : height
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight
  if (shouldFallback) {
    width = offsetWidth
    height = offsetHeight
  }
  return {
    width,
    height,
    $: shouldFallback
  }
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element
}
function getScale(element) {
  const domElement = unwrapElement(element)
  if (!isHTMLElement(domElement)) {
    return createCoords(1)
  }
  const rect = domElement.getBoundingClientRect()
  const { width, height, $ } = getCssDimensions(domElement)
  let x = ($ ? round(rect.width) : rect.width) / width
  let y = ($ ? round(rect.height) : rect.height) / height
  if (!x || !Number.isFinite(x)) {
    x = 1
  }
  if (!y || !Number.isFinite(y)) {
    y = 1
  }
  return {
    x,
    y
  }
}
var noOffsets = createCoords(0)
function getVisualOffsets(element) {
  const win = getWindow(element)
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  }
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false
  }
  if (!floatingOffsetParent || (isFixed && floatingOffsetParent !== getWindow(element))) {
    return false
  }
  return isFixed
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false
  }
  const clientRect = element.getBoundingClientRect()
  const domElement = unwrapElement(element)
  let scale = createCoords(1)
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent)
      }
    } else {
      scale = getScale(element)
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent)
    ? getVisualOffsets(domElement)
    : createCoords(0)
  let x = (clientRect.left + visualOffsets.x) / scale.x
  let y = (clientRect.top + visualOffsets.y) / scale.y
  let width = clientRect.width / scale.x
  let height = clientRect.height / scale.y
  if (domElement) {
    const win = getWindow(domElement)
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent
    let currentWin = win
    let currentIFrame = getFrameElement(currentWin)
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame)
      const iframeRect = currentIFrame.getBoundingClientRect()
      const css = getComputedStyle2(currentIFrame)
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y
      x *= iframeScale.x
      y *= iframeScale.y
      width *= iframeScale.x
      height *= iframeScale.y
      x += left
      y += top
      currentWin = getWindow(currentIFrame)
      currentIFrame = getFrameElement(currentWin)
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  })
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll
  }
  return rect.left + leftScroll
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect()
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect)
  const y = htmlRect.top + scroll.scrollTop
  return {
    x,
    y
  }
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let { elements, rect, offsetParent, strategy } = _ref
  const isFixed = strategy === 'fixed'
  const documentElement = getDocumentElement(offsetParent)
  const topLayer = elements ? isTopLayer(elements.floating) : false
  if (offsetParent === documentElement || (topLayer && isFixed)) {
    return rect
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  }
  let scale = createCoords(1)
  const offsets = createCoords(0)
  const isOffsetParentAnElement = isHTMLElement(offsetParent)
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent)
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent)
      scale = getScale(offsetParent)
      offsets.x = offsetRect.x + offsetParent.clientLeft
      offsets.y = offsetRect.y + offsetParent.clientTop
    }
  }
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0)
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  }
}
function getClientRects(element) {
  return Array.from(element.getClientRects())
}
function getDocumentRect(element) {
  const html = getDocumentElement(element)
  const scroll = getNodeScroll(element)
  const body = element.ownerDocument.body
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth)
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight)
  let x = -scroll.scrollLeft + getWindowScrollBarX(element)
  const y = -scroll.scrollTop
  if (getComputedStyle2(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width
  }
  return {
    width,
    height,
    x,
    y
  }
}
var SCROLLBAR_MAX = 25
function getViewportRect(element, strategy) {
  const win = getWindow(element)
  const html = getDocumentElement(element)
  const visualViewport = win.visualViewport
  let width = html.clientWidth
  let height = html.clientHeight
  let x = 0
  let y = 0
  if (visualViewport) {
    width = visualViewport.width
    height = visualViewport.height
    const visualViewportBased = isWebKit()
    if (!visualViewportBased || (visualViewportBased && strategy === 'fixed')) {
      x = visualViewport.offsetLeft
      y = visualViewport.offsetTop
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html)
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument
    const body = doc.body
    const bodyStyles = getComputedStyle(body)
    const bodyMarginInline =
      doc.compatMode === 'CSS1Compat' ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline)
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX
  }
  return {
    width,
    height,
    x,
    y
  }
}
var absoluteOrFixed = /* @__PURE__ */ new Set(['absolute', 'fixed'])
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed')
  const top = clientRect.top + element.clientTop
  const left = clientRect.left + element.clientLeft
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1)
  const width = element.clientWidth * scale.x
  const height = element.clientHeight * scale.y
  const x = left * scale.x
  const y = top * scale.y
  return {
    width,
    height,
    x,
    y
  }
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy)
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element))
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy)
  } else {
    const visualOffsets = getVisualOffsets(element)
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    }
  }
  return rectToClientRect(rect)
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element)
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false
  }
  return getComputedStyle2(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode)
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element)
  if (cachedResult) {
    return cachedResult
  }
  let result = getOverflowAncestors(element, [], false).filter((el2) => isElement(el2) && getNodeName(el2) !== 'body')
  let currentContainingBlockComputedStyle = null
  const elementIsFixed = getComputedStyle2(element).position === 'fixed'
  let currentNode = elementIsFixed ? getParentNode(element) : element
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode)
    const currentNodeIsContaining = isContainingBlock(currentNode)
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null
    }
    const shouldDropCurrentNode = elementIsFixed
      ? !currentNodeIsContaining && !currentContainingBlockComputedStyle
      : (!currentNodeIsContaining &&
          computedStyle.position === 'static' &&
          !!currentContainingBlockComputedStyle &&
          absoluteOrFixed.has(currentContainingBlockComputedStyle.position)) ||
        (isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode))
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode)
    } else {
      currentContainingBlockComputedStyle = computedStyle
    }
    currentNode = getParentNode(currentNode)
  }
  cache.set(element, result)
  return result
}
function getClippingRect(_ref) {
  let { element, boundary, rootBoundary, strategy } = _ref
  const elementClippingAncestors =
    boundary === 'clippingAncestors'
      ? isTopLayer(element)
        ? []
        : getClippingElementAncestors(element, this._c)
      : [].concat(boundary)
  const clippingAncestors = [...elementClippingAncestors, rootBoundary]
  const firstClippingAncestor = clippingAncestors[0]
  const clippingRect = clippingAncestors.reduce(
    (accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy)
      accRect.top = max(rect.top, accRect.top)
      accRect.right = min(rect.right, accRect.right)
      accRect.bottom = min(rect.bottom, accRect.bottom)
      accRect.left = max(rect.left, accRect.left)
      return accRect
    },
    getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy)
  )
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  }
}
function getDimensions(element) {
  const { width, height } = getCssDimensions(element)
  return {
    width,
    height
  }
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent)
  const documentElement = getDocumentElement(offsetParent)
  const isFixed = strategy === 'fixed'
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent)
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  }
  const offsets = createCoords(0)
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement)
  }
  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent)
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent)
      offsets.x = offsetRect.x + offsetParent.clientLeft
      offsets.y = offsetRect.y + offsetParent.clientTop
    } else if (documentElement) {
      setLeftRTLScrollbarOffset()
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset()
  }
  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0)
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  }
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === 'static'
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === 'fixed') {
    return null
  }
  if (polyfill) {
    return polyfill(element)
  }
  let rawOffsetParent = element.offsetParent
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body
  }
  return rawOffsetParent
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element)
  if (isTopLayer(element)) {
    return win
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element)
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent
      }
      svgOffsetParent = getParentNode(svgOffsetParent)
    }
    return win
  }
  let offsetParent = getTrueOffsetParent(element, polyfill)
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill)
  }
  if (
    offsetParent &&
    isLastTraversableNode(offsetParent) &&
    isStaticPositioned(offsetParent) &&
    !isContainingBlock(offsetParent)
  ) {
    return win
  }
  return offsetParent || getContainingBlock(element) || win
}
var getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent
  const getDimensionsFn = this.getDimensions
  const floatingDimensions = await getDimensionsFn(data.floating)
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  }
}
function isRTL(element) {
  return getComputedStyle2(element).direction === 'rtl'
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
}
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
}
function observeMove(element, onMove) {
  let io = null
  let timeoutId
  const root = getDocumentElement(element)
  function cleanup() {
    var _io
    clearTimeout(timeoutId)
    ;(_io = io) == null || _io.disconnect()
    io = null
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false
    }
    if (threshold === void 0) {
      threshold = 1
    }
    cleanup()
    const elementRectForRootMargin = element.getBoundingClientRect()
    const { left, top, width, height } = elementRectForRootMargin
    if (!skip) {
      onMove()
    }
    if (!width || !height) {
      return
    }
    const insetTop = floor(top)
    const insetRight = floor(root.clientWidth - (left + width))
    const insetBottom = floor(root.clientHeight - (top + height))
    const insetLeft = floor(left)
    const rootMargin = -insetTop + 'px ' + -insetRight + 'px ' + -insetBottom + 'px ' + -insetLeft + 'px'
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    }
    let isFirstUpdate = true
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh()
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7)
          }, 1e3)
        } else {
          refresh(false, ratio)
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh()
      }
      isFirstUpdate = false
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      })
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options)
    }
    io.observe(element)
  }
  refresh(true)
  return cleanup
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {}
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options
  const referenceEl = unwrapElement(reference)
  const ancestors =
    ancestorScroll || ancestorResize
      ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)]
      : []
  ancestors.forEach((ancestor) => {
    ancestorScroll &&
      ancestor.addEventListener('scroll', update, {
        passive: true
      })
    ancestorResize && ancestor.addEventListener('resize', update)
  })
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null
  let reobserveFrame = -1
  let resizeObserver = null
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating)
        cancelAnimationFrame(reobserveFrame)
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver
          ;(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating)
        })
      }
      update()
    })
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl)
    }
    resizeObserver.observe(floating)
  }
  let frameId
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null
  if (animationFrame) {
    frameLoop()
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference)
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update()
    }
    prevRefRect = nextRefRect
    frameId = requestAnimationFrame(frameLoop)
  }
  update()
  return () => {
    var _resizeObserver2
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener('scroll', update)
      ancestorResize && ancestor.removeEventListener('resize', update)
    })
    cleanupIo == null || cleanupIo()
    ;(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect()
    resizeObserver = null
    if (animationFrame) {
      cancelAnimationFrame(frameId)
    }
  }
}
var offset2 = offset
var shift2 = shift
var flip2 = flip
var arrow2 = arrow
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map()
  const mergedOptions = {
    platform,
    ...options
  }
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  }
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  })
}

// node_modules/.pnpm/@floating-ui+vue@1.1.9_vue@3.5.24_typescript@5.9.3_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function isComponentPublicInstance(target) {
  return target != null && typeof target === 'object' && '$el' in target
}
function unwrapElement2(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el
    return isNode(element) && getNodeName(element) === '#comment' ? null : element
  }
  return target
}
function toValue2(source) {
  return typeof source === 'function' ? source() : unref(source)
}
function arrow3(options) {
  return {
    name: 'arrow',
    options,
    fn(args) {
      const element = unwrapElement2(toValue2(options.element))
      if (element == null) {
        return {}
      }
      return arrow2({
        element,
        padding: options.padding
      }).fn(args)
    }
  }
}
function getDPR(element) {
  if (typeof window === 'undefined') {
    return 1
  }
  const win = element.ownerDocument.defaultView || window
  return win.devicePixelRatio || 1
}
function roundByDPR(element, value) {
  const dpr = getDPR(element)
  return Math.round(value * dpr) / dpr
}
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {}
  }
  const whileElementsMountedOption = options.whileElementsMounted
  const openOption = computed(() => {
    var _toValue
    return (_toValue = toValue2(options.open)) != null ? _toValue : true
  })
  const middlewareOption = computed(() => toValue2(options.middleware))
  const placementOption = computed(() => {
    var _toValue2
    return (_toValue2 = toValue2(options.placement)) != null ? _toValue2 : 'bottom'
  })
  const strategyOption = computed(() => {
    var _toValue3
    return (_toValue3 = toValue2(options.strategy)) != null ? _toValue3 : 'absolute'
  })
  const transformOption = computed(() => {
    var _toValue4
    return (_toValue4 = toValue2(options.transform)) != null ? _toValue4 : true
  })
  const referenceElement = computed(() => unwrapElement2(reference.value))
  const floatingElement = computed(() => unwrapElement2(floating.value))
  const x = ref(0)
  const y = ref(0)
  const strategy = ref(strategyOption.value)
  const placement = ref(placementOption.value)
  const middlewareData = shallowRef({})
  const isPositioned = ref(false)
  const floatingStyles = computed(() => {
    const initialStyles = {
      position: strategy.value,
      left: '0',
      top: '0'
    }
    if (!floatingElement.value) {
      return initialStyles
    }
    const xVal = roundByDPR(floatingElement.value, x.value)
    const yVal = roundByDPR(floatingElement.value, y.value)
    if (transformOption.value) {
      return {
        ...initialStyles,
        transform: 'translate(' + xVal + 'px, ' + yVal + 'px)',
        ...(getDPR(floatingElement.value) >= 1.5 && {
          willChange: 'transform'
        })
      }
    }
    return {
      position: strategy.value,
      left: xVal + 'px',
      top: yVal + 'px'
    }
  })
  let whileElementsMountedCleanup
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return
    }
    const open = openOption.value
    computePosition2(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value
    }).then((position) => {
      x.value = position.x
      y.value = position.y
      strategy.value = position.strategy
      placement.value = position.placement
      middlewareData.value = position.middlewareData
      isPositioned.value = open !== false
    })
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === 'function') {
      whileElementsMountedCleanup()
      whileElementsMountedCleanup = void 0
    }
  }
  function attach() {
    cleanup()
    if (whileElementsMountedOption === void 0) {
      update()
      return
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update)
      return
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false
    }
  }
  watch([middlewareOption, placementOption, strategyOption, openOption], update, {
    flush: 'sync'
  })
  watch([referenceElement, floatingElement], attach, {
    flush: 'sync'
  })
  watch(openOption, reset, {
    flush: 'sync'
  })
  if (getCurrentScope()) {
    onScopeDispose(cleanup)
  }
  return {
    x: shallowReadonly(x),
    y: shallowReadonly(y),
    strategy: shallowReadonly(strategy),
    placement: shallowReadonly(placement),
    middlewareData: shallowReadonly(middlewareData),
    isPositioned: shallowReadonly(isPositioned),
    floatingStyles,
    update
  }
}

// node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/constants/index.js
var constructFromSymbol = Symbol.for('constructDateFrom')

// node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzName/index.js
function tzName(timeZone, date, format2 = 'long') {
  return new Intl.DateTimeFormat('en-US', {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: 'numeric',
    timeZone,
    timeZoneName: format2
  })
    .format(date)
    .split(/\s/g)
    .slice(2)
    .join(' ')
}

// node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzOffset/index.js
var offsetFormatCache = {}
var offsetCache = {}
function tzOffset(timeZone, date) {
  try {
    const format2 =
      offsetFormatCache[timeZone] ||
      (offsetFormatCache[timeZone] = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'longOffset'
      }).format)
    const offsetStr = format2(date).split('GMT')[1]
    if (offsetStr in offsetCache) return offsetCache[offsetStr]
    return calcOffset(offsetStr, offsetStr.split(':'))
  } catch {
    if (timeZone in offsetCache) return offsetCache[timeZone]
    const captures = timeZone == null ? void 0 : timeZone.match(offsetRe)
    if (captures) return calcOffset(timeZone, captures.slice(1))
    return NaN
  }
}
var offsetRe = /([+-]\d\d):?(\d\d)?/
function calcOffset(cacheStr, values) {
  const hours = +(values[0] || 0)
  const minutes = +(values[1] || 0)
  const seconds = +(values[2] || 0) / 60
  return (offsetCache[cacheStr] =
    hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds)
}

// node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/mini.js
var TZDateMini = class _TZDateMini extends Date {
  //#region static
  constructor(...args) {
    super()
    if (args.length > 1 && typeof args[args.length - 1] === 'string') {
      this.timeZone = args.pop()
    }
    this.internal = /* @__PURE__ */ new Date()
    if (isNaN(tzOffset(this.timeZone, this))) {
      this.setTime(NaN)
    } else {
      if (!args.length) {
        this.setTime(Date.now())
      } else if (
        typeof args[0] === 'number' &&
        (args.length === 1 || (args.length === 2 && typeof args[1] !== 'number'))
      ) {
        this.setTime(args[0])
      } else if (typeof args[0] === 'string') {
        this.setTime(+new Date(args[0]))
      } else if (args[0] instanceof Date) {
        this.setTime(+args[0])
      } else {
        this.setTime(+new Date(...args))
        adjustToSystemTZ(this, NaN)
        syncToInternal(this)
      }
    }
  }
  static tz(tz, ...args) {
    return args.length ? new _TZDateMini(...args, tz) : new _TZDateMini(Date.now(), tz)
  }
  //#endregion
  //#region time zone
  withTimeZone(timeZone) {
    return new _TZDateMini(+this, timeZone)
  }
  getTimezoneOffset() {
    const offset3 = -tzOffset(this.timeZone, this)
    return offset3 > 0 ? Math.floor(offset3) : Math.ceil(offset3)
  }
  //#endregion
  //#region time
  setTime(time) {
    Date.prototype.setTime.apply(this, arguments)
    syncToInternal(this)
    return +this
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for('constructDateFrom')](date) {
    return new _TZDateMini(+new Date(date), this.timeZone)
  }
  //#endregion
}
var re = /^(get|set)(?!UTC)/
Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
  if (!re.test(method)) return
  const utcMethod = method.replace(re, '$1UTC')
  if (!TZDateMini.prototype[utcMethod]) return
  if (method.startsWith('get')) {
    TZDateMini.prototype[method] = function () {
      return this.internal[utcMethod]()
    }
  } else {
    TZDateMini.prototype[method] = function () {
      Date.prototype[utcMethod].apply(this.internal, arguments)
      syncFromInternal(this)
      return +this
    }
    TZDateMini.prototype[utcMethod] = function () {
      Date.prototype[utcMethod].apply(this, arguments)
      syncToInternal(this)
      return +this
    }
  }
})
function syncToInternal(date) {
  date.internal.setTime(+date)
  date.internal.setUTCSeconds(date.internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, date) * 60))
}
function syncFromInternal(date) {
  Date.prototype.setFullYear.call(
    date,
    date.internal.getUTCFullYear(),
    date.internal.getUTCMonth(),
    date.internal.getUTCDate()
  )
  Date.prototype.setHours.call(
    date,
    date.internal.getUTCHours(),
    date.internal.getUTCMinutes(),
    date.internal.getUTCSeconds(),
    date.internal.getUTCMilliseconds()
  )
  adjustToSystemTZ(date)
}
function adjustToSystemTZ(date) {
  const baseOffset = tzOffset(date.timeZone, date)
  const offset3 = baseOffset > 0 ? Math.floor(baseOffset) : Math.ceil(baseOffset)
  const prevHour = /* @__PURE__ */ new Date(+date)
  prevHour.setUTCHours(prevHour.getUTCHours() - 1)
  const systemOffset = -/* @__PURE__ */ new Date(+date).getTimezoneOffset()
  const prevHourSystemOffset = -/* @__PURE__ */ new Date(+prevHour).getTimezoneOffset()
  const systemDSTChange = systemOffset - prevHourSystemOffset
  const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours()
  if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange)
  const offsetDiff = systemOffset - offset3
  if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff)
  const systemDate = /* @__PURE__ */ new Date(+date)
  systemDate.setUTCSeconds(0)
  const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60
  const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60
  if (secondsOffset || systemSecondsOffset) {
    date.internal.setUTCSeconds(date.internal.getUTCSeconds() + secondsOffset)
    Date.prototype.setUTCSeconds.call(
      date,
      Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset
    )
  }
  const postBaseOffset = tzOffset(date.timeZone, date)
  const postOffset = postBaseOffset > 0 ? Math.floor(postBaseOffset) : Math.ceil(postBaseOffset)
  const postSystemOffset = -/* @__PURE__ */ new Date(+date).getTimezoneOffset()
  const postOffsetDiff = postSystemOffset - postOffset
  const offsetChanged = postOffset !== offset3
  const postDiff = postOffsetDiff - offsetDiff
  if (offsetChanged && postDiff) {
    Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff)
    const newBaseOffset = tzOffset(date.timeZone, date)
    const newOffset = newBaseOffset > 0 ? Math.floor(newBaseOffset) : Math.ceil(newBaseOffset)
    const offsetChange = postOffset - newOffset
    if (offsetChange) {
      date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange)
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange)
    }
  }
}

// node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/index.js
var TZDate = class _TZDate extends TZDateMini {
  //#region static
  static tz(tz, ...args) {
    return args.length ? new _TZDate(...args, tz) : new _TZDate(Date.now(), tz)
  }
  //#endregion
  //#region representation
  toISOString() {
    const [sign, hours, minutes] = this.tzComponents()
    const tz = `${sign}${hours}:${minutes}`
    return this.internal.toISOString().slice(0, -1) + tz
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`
  }
  toDateString() {
    const [day, date, month, year] = this.internal.toUTCString().split(' ')
    return `${day == null ? void 0 : day.slice(0, -1)} ${month} ${date} ${year}`
  }
  toTimeString() {
    const time = this.internal.toUTCString().split(' ')[4]
    const [sign, hours, minutes] = this.tzComponents()
    return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`
  }
  toLocaleString(locales, options) {
    return Date.prototype.toLocaleString.call(this, locales, {
      ...options,
      timeZone: (options == null ? void 0 : options.timeZone) || this.timeZone
    })
  }
  toLocaleDateString(locales, options) {
    return Date.prototype.toLocaleDateString.call(this, locales, {
      ...options,
      timeZone: (options == null ? void 0 : options.timeZone) || this.timeZone
    })
  }
  toLocaleTimeString(locales, options) {
    return Date.prototype.toLocaleTimeString.call(this, locales, {
      ...options,
      timeZone: (options == null ? void 0 : options.timeZone) || this.timeZone
    })
  }
  //#endregion
  //#region private
  tzComponents() {
    const offset3 = this.getTimezoneOffset()
    const sign = offset3 > 0 ? '-' : '+'
    const hours = String(Math.floor(Math.abs(offset3) / 60)).padStart(2, '0')
    const minutes = String(Math.abs(offset3) % 60).padStart(2, '0')
    return [sign, hours, minutes]
  }
  //#endregion
  withTimeZone(timeZone) {
    return new _TZDate(+this, timeZone)
  }
  //#region date-fns integration
  [Symbol.for('constructDateFrom')](date) {
    return new _TZDate(+new Date(date), this.timeZone)
  }
  //#endregion
}

// node_modules/.pnpm/@vuepic+vue-datepicker@12.0.4_vue@3.5.24_typescript@5.9.3_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Ht() {
  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 32 32',
      fill: 'currentColor',
      'aria-hidden': 'true',
      class: 'dp__icon',
      role: 'img'
    },
    [
      h('path', {
        d: 'M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z'
      }),
      h('path', {
        d: 'M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z'
      }),
      h('path', {
        d: 'M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z'
      }),
      h('path', {
        d: 'M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z'
      })
    ]
  )
}
function En() {
  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 32 32',
      fill: 'currentColor',
      'aria-hidden': 'true',
      class: 'dp__icon',
      role: 'img'
    },
    [
      h('path', {
        d: 'M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z'
      }),
      h('path', {
        d: 'M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z'
      })
    ]
  )
}
function Na() {
  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 32 32',
      fill: 'currentColor',
      'aria-hidden': 'true',
      class: 'dp__icon',
      role: 'img'
    },
    [
      h('path', {
        d: 'M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z'
      })
    ]
  )
}
function Wa() {
  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 32 32',
      fill: 'currentColor',
      'aria-hidden': 'true',
      class: 'dp__icon',
      role: 'img'
    },
    [
      h('path', {
        d: 'M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z'
      })
    ]
  )
}
function La() {
  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 32 32',
      fill: 'currentColor',
      'aria-hidden': 'true',
      class: 'dp__icon',
      role: 'img'
    },
    [
      h('path', {
        d: 'M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z'
      }),
      h('path', {
        d: 'M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z'
      })
    ]
  )
}
function Ha() {
  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 32 32',
      fill: 'currentColor',
      'aria-hidden': 'true',
      class: 'dp__icon',
      role: 'img'
    },
    [
      h('path', {
        d: 'M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z'
      })
    ]
  )
}
function Ka() {
  return h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 32 32',
      fill: 'currentColor',
      'aria-hidden': 'true',
      class: 'dp__icon',
      role: 'img'
    },
    [
      h('path', {
        d: 'M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z'
      })
    ]
  )
}
var Oe = reactive({
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
})
var pa = ref(null)
var Jt = ref(false)
var ha = ref(false)
var ga = ref(false)
var ya = ref(false)
var He = ref(0)
var Ie = ref(0)
var gt = () => {
  const e = computed(() =>
      Jt.value
        ? [...Oe.selectionGrid, Oe.actionRow].filter((v) => v.length)
        : ha.value
          ? [...Oe.timePicker[0], ...Oe.timePicker[1], ya.value ? [] : [pa.value], Oe.actionRow].filter((v) => v.length)
          : ga.value
            ? [...Oe.monthPicker, Oe.actionRow]
            : [Oe.monthYear, ...Oe.calendar, Oe.time, Oe.actionRow].filter((v) => v.length)
    ),
    k = (v) => {
      He.value = v ? He.value + 1 : He.value - 1
      let Y = null
      ;(e.value[Ie.value] && (Y = e.value[Ie.value][He.value]),
        !Y && e.value[Ie.value + (v ? 1 : -1)]
          ? ((Ie.value = Ie.value + (v ? 1 : -1)), (He.value = v ? 0 : e.value[Ie.value].length - 1))
          : Y || (He.value = v ? He.value - 1 : He.value + 1))
    },
    p = (v) => {
      if ((Ie.value === 0 && !v) || (Ie.value === e.value.length && v)) return
      ;((Ie.value = v ? Ie.value + 1 : Ie.value - 1),
        e.value[Ie.value]
          ? e.value[Ie.value] &&
            !e.value[Ie.value][He.value] &&
            He.value !== 0 &&
            (He.value = e.value[Ie.value].length - 1)
          : (Ie.value = v ? Ie.value - 1 : Ie.value + 1))
    },
    r = (v) => {
      let Y = null
      ;(e.value[Ie.value] && (Y = e.value[Ie.value][He.value]),
        Y ? Y.focus({ preventScroll: !Jt.value }) : (He.value = v ? He.value - 1 : He.value + 1))
    },
    o = () => {
      ;(k(true), r(true))
    },
    s = () => {
      ;(k(false), r(false))
    },
    n = () => {
      ;(p(false), r(true))
    },
    l = () => {
      ;(p(true), r(true))
    },
    d = (v, Y) => {
      Oe[Y] = v
    },
    B = (v, Y) => {
      Oe[Y] = v
    },
    A = () => {
      ;((He.value = 0), (Ie.value = 0))
    }
  return {
    buildMatrix: d,
    buildMultiLevelMatrix: B,
    setTimePickerBackRef: (v) => {
      pa.value = v
    },
    setSelectionGrid: (v) => {
      ;((Jt.value = v), A(), v || (Oe.selectionGrid = []))
    },
    setTimePicker: (v, Y = false) => {
      ;((ha.value = v), (ya.value = Y), A(), v || ((Oe.timePicker[0] = []), (Oe.timePicker[1] = [])))
    },
    setTimePickerElements: (v, Y = 0) => {
      Oe.timePicker[Y] = v
    },
    arrowRight: o,
    arrowLeft: s,
    arrowUp: n,
    arrowDown: l,
    clearArrowNav: () => {
      ;((Oe.monthYear = []),
        (Oe.calendar = []),
        (Oe.time = []),
        (Oe.actionRow = []),
        (Oe.selectionGrid = []),
        (Oe.timePicker[0] = []),
        (Oe.timePicker[1] = []),
        (Jt.value = false),
        (ha.value = false),
        (ya.value = false),
        (ga.value = false),
        A(),
        (pa.value = null))
    },
    setMonthPicker: (v) => {
      ;((ga.value = v), A())
    },
    refSets: Oe
    // exposed for testing
  }
}
var rt = ((e) => ((e.month = 'month'), (e.year = 'year'), e))(rt || {})
var Mt = ((e) => ((e.header = 'header'), (e.calendar = 'calendar'), (e.timePicker = 'timePicker'), e))(Mt || {})
var qe = ((e) => (
  (e.month = 'month'),
  (e.year = 'year'),
  (e.calendar = 'calendar'),
  (e.time = 'time'),
  (e.minutes = 'minutes'),
  (e.hours = 'hours'),
  (e.seconds = 'seconds'),
  e
))(qe || {})
var Fn = ['timestamp', 'date', 'iso']
var Ue = ((e) => ((e.up = 'up'), (e.down = 'down'), (e.left = 'left'), (e.right = 'right'), e))(Ue || {})
var xe = ((e) => (
  (e.arrowUp = 'ArrowUp'),
  (e.arrowDown = 'ArrowDown'),
  (e.arrowLeft = 'ArrowLeft'),
  (e.arrowRight = 'ArrowRight'),
  (e.enter = 'Enter'),
  (e.space = ' '),
  (e.esc = 'Escape'),
  (e.tab = 'Tab'),
  (e.home = 'Home'),
  (e.end = 'End'),
  (e.pageUp = 'PageUp'),
  (e.pageDown = 'PageDown'),
  e
))(xe || {})
var Pt = ((e) => ((e.MONTH_AND_YEAR = 'MM-yyyy'), (e.YEAR = 'yyyy'), (e.DATE = 'dd-MM-yyyy'), e))(Pt || {})
var Nn = () => {
  const { checkPartialRangeValue: e, checkRangeEnabled: k, isValidDate: p } = at(),
    { convertType: r, errorMapper: o } = Ee(),
    {
      getDate: s,
      rootEmit: n,
      state: l,
      rootProps: d,
      inputValue: B,
      defaults: { textInput: A, range: I, multiDates: b, timeConfig: i, formats: M },
      modelValue: c,
      updateTime: T
    } = $e(),
    { setTime: v, getWeekFromDate: Y } = je(),
    { formatSelectedDate: V, formatForTextInput: P } = bt()
  ;(watch(
    c,
    (y, $) => {
      ;(n('internal-model-change', c.value), JSON.stringify($ ?? {}) !== JSON.stringify(y ?? {}) && T())
    },
    { deep: true }
  ),
    watch(I, (y, $) => {
      y.enabled !== $.enabled && (c.value = null)
    }),
    watch(
      () => M.value.input,
      () => {
        ee()
      }
    ))
  const F = (y) =>
      y
        ? d.modelType
          ? ge(y)
          : {
              hours: getHours(y),
              minutes: getMinutes(y),
              seconds: i.value.enableSeconds ? getSeconds(y) : 0
            }
        : null,
    q = (y) => (d.modelType ? ge(y) : { month: getMonth(y), year: getYear(y) }),
    R = (y) =>
      Array.isArray(y)
        ? b.value.enabled
          ? y.map(($) => w($, setYear(s(), $)))
          : k(() => [setYear(s(), y[0]), y[1] ? setYear(s(), y[1]) : e(I.value.partialRange)], I.value.enabled)
        : setYear(s(), +y),
    w = (y, $) => ((typeof y == 'string' || typeof y == 'number') && d.modelType ? fe(y) : $),
    u = (y) => (Array.isArray(y) ? [w(y[0], v(y[0])), w(y[1], v(y[1]))] : w(y, v(y))),
    D = (y) => {
      const $ = set(s(), { date: 1 })
      return Array.isArray(y)
        ? b.value.enabled
          ? y.map((ie) => w(ie, set($, { month: +ie.month, year: +ie.year })))
          : k(
              () => [
                w(y[0], set($, { month: +y[0].month, year: +y[0].year })),
                w(y[1], y[1] ? set($, { month: +y[1].month, year: +y[1].year }) : e(I.value.partialRange))
              ],
              I.value.enabled
            )
        : w(y, set($, { month: +y.month, year: +y.year }))
    },
    N = (y) => {
      if (Array.isArray(y)) return y.map(($) => fe($))
      throw new Error(o.dateArr('multi-dates'))
    },
    Q = (y) => {
      if (Array.isArray(y) && I.value.enabled) {
        const $ = y[0],
          ie = y[1]
        return [s(Array.isArray($) ? $[0] : null), Array.isArray(ie) && ie.length ? s(ie[0]) : null]
      }
      return s(y[0])
    },
    ae = (y) =>
      d.modelAuto
        ? Array.isArray(y)
          ? [fe(y[0]), fe(y[1])]
          : d.autoApply
            ? [fe(y)]
            : [fe(y), null]
        : Array.isArray(y)
          ? k(() => (y[1] ? [fe(y[0]), y[1] ? fe(y[1]) : e(I.value.partialRange)] : [fe(y[0])]), I.value.enabled)
          : fe(y),
    Z = () => {
      Array.isArray(c.value) && I.value.enabled && c.value.length === 1 && c.value.push(e(I.value.partialRange))
    },
    ve = () => {
      const y = c.value
      return [ge(y[0]), y[1] ? ge(y[1]) : e(I.value.partialRange)]
    },
    he = () => (Array.isArray(c.value) ? (c.value[1] ? ve() : ge(r(c.value[0]))) : []),
    L = () => (c.value || []).map((y) => ge(y)),
    J = (y = false) => (
      y || Z(),
      d.modelAuto
        ? he()
        : b.value.enabled
          ? L()
          : Array.isArray(c.value)
            ? k(() => ve(), I.value.enabled)
            : ge(r(c.value))
    ),
    W = (y) =>
      !y || (Array.isArray(y) && !y.length)
        ? null
        : d.timePicker
          ? u(r(y))
          : d.monthPicker
            ? D(r(y))
            : d.yearPicker
              ? R(r(y))
              : b.value.enabled
                ? N(r(y))
                : d.weekPicker
                  ? Q(r(y))
                  : ae(r(y)),
    oe = (y) => {
      if (l.isTextInputDate) return
      const $ = W(y)
      p(r($)) ? ((c.value = r($)), ee()) : ((c.value = null), (B.value = ''))
    },
    z = () =>
      c.value ? (b.value.enabled ? c.value.map((y) => V(y)).join('; ') : A.value.enabled ? P() : V(c.value)) : '',
    ee = () => {
      B.value = z()
    },
    fe = (y) =>
      d.modelType
        ? Fn.includes(d.modelType)
          ? s(y)
          : d.modelType === 'format' && typeof M.value.input == 'string'
            ? parse(y, M.value.input, s(), { locale: d.locale })
            : parse(y, d.modelType, s(), { locale: d.locale })
        : s(y),
    ge = (y) =>
      y
        ? d.modelType
          ? d.modelType === 'timestamp'
            ? +y
            : d.modelType === 'iso'
              ? y.toISOString()
              : d.modelType === 'format' && typeof M.value.input == 'string'
                ? V(y)
                : V(y, d.modelType)
          : y
        : null,
    De = (y) => {
      n('update:model-value', y)
    },
    Ae = (y) =>
      Array.isArray(c.value)
        ? b.value.enabled
          ? c.value.map(($) => y($))
          : [y(c.value[0]), c.value[1] ? y(c.value[1]) : null]
        : y(r(c.value)),
    re2 = () => {
      if (Array.isArray(c.value)) {
        const y = Y(c.value[0], d.weekStart),
          $ = c.value[1] ? Y(c.value[1], d.weekStart) : []
        return [y.map((ie) => s(ie)), $.map((ie) => s(ie))]
      }
      return Y(c.value, d.weekStart).map((y) => s(y))
    },
    H = (y) => De(r(Ae(y))),
    E = () => n('update:model-value', re2())
  return {
    checkBeforeEmit: () =>
      c.value
        ? I.value.enabled
          ? I.value.partialRange
            ? c.value.length >= 1
            : c.value.length === 2
          : !!c.value
        : false,
    parseExternalModelValue: oe,
    formatInputValue: ee,
    emitModelValue: () => (
      ee(),
      d.monthPicker ? H(q) : d.timePicker ? H(F) : d.yearPicker ? H(getYear) : d.weekPicker ? E() : De(J())
    )
  }
}
var it = [
  { name: 'clock-icon', use: ['time', 'calendar', 'shared'] },
  { name: 'arrow-left', use: ['month-year', 'calendar', 'shared', 'year-mode'] },
  { name: 'arrow-right', use: ['month-year', 'calendar', 'shared', 'year-mode'] },
  { name: 'arrow-up', use: ['time', 'calendar', 'month-year', 'shared'] },
  { name: 'arrow-down', use: ['time', 'calendar', 'month-year', 'shared'] },
  { name: 'calendar-icon', use: ['month-year', 'time', 'calendar', 'shared', 'year-mode'] },
  { name: 'day', use: ['calendar', 'shared'] },
  { name: 'month-overlay-value', use: ['calendar', 'month-year', 'shared'] },
  { name: 'year-overlay-value', use: ['calendar', 'month-year', 'shared', 'year-mode'] },
  { name: 'year-overlay', use: ['month-year', 'shared'] },
  { name: 'month-overlay', use: ['month-year', 'shared'] },
  { name: 'month-overlay-header', use: ['month-year', 'shared'] },
  { name: 'year-overlay-header', use: ['month-year', 'shared'] },
  { name: 'hours-overlay-value', use: ['calendar', 'time', 'shared'] },
  { name: 'hours-overlay-header', use: ['calendar', 'time', 'shared'] },
  { name: 'minutes-overlay-value', use: ['calendar', 'time', 'shared'] },
  { name: 'minutes-overlay-header', use: ['calendar', 'time', 'shared'] },
  { name: 'seconds-overlay-value', use: ['calendar', 'time', 'shared'] },
  { name: 'seconds-overlay-header', use: ['calendar', 'time', 'shared'] },
  { name: 'hours', use: ['calendar', 'time', 'shared'] },
  { name: 'minutes', use: ['calendar', 'time', 'shared'] },
  { name: 'month', use: ['calendar', 'month-year', 'shared'] },
  { name: 'year', use: ['calendar', 'month-year', 'shared', 'year-mode'] },
  { name: 'action-buttons', use: ['action'] },
  { name: 'action-preview', use: ['action'] },
  { name: 'calendar-header', use: ['calendar', 'shared'] },
  { name: 'marker-tooltip', use: ['calendar', 'shared'] },
  { name: 'action-extra', use: ['menu'] },
  { name: 'time-picker-overlay', use: ['calendar', 'time', 'shared'] },
  { name: 'am-pm-button', use: ['calendar', 'time', 'shared'] },
  { name: 'left-sidebar', use: ['menu'] },
  { name: 'right-sidebar', use: ['menu'] },
  { name: 'month-year', use: ['month-year', 'shared'] },
  { name: 'time-picker', use: ['menu', 'shared'] },
  { name: 'action-row', use: ['action'] },
  { name: 'marker', use: ['calendar', 'shared'] },
  { name: 'quarter', use: ['shared'] },
  { name: 'top-extra', use: ['shared', 'month-year'] },
  { name: 'tp-inline-arrow-up', use: ['shared', 'time'] },
  { name: 'tp-inline-arrow-down', use: ['shared', 'time'] },
  { name: 'menu-header', use: ['menu'] }
]
var $a = [{ name: 'trigger' }, { name: 'input-icon' }, { name: 'clear-icon' }, { name: 'dp-input' }]
var Wn = {
  all: () => it,
  root: () => it.concat($a),
  monthYear: () => it.filter((e) => e.use.includes('month-year')),
  input: () => $a,
  timePicker: () => it.filter((e) => e.use.includes('time')),
  action: () => it.filter((e) => e.use.includes('action')),
  calendar: () => it.filter((e) => e.use.includes('calendar')),
  menu: () => it.filter((e) => e.use.includes('menu')),
  shared: () => it.filter((e) => e.use.includes('shared')),
  yearMode: () => it.filter((e) => e.use.includes('year-mode'))
}
var yt = () => ({
  mapSlots: (k, p, r) => {
    const o = []
    for (const s of Wn[p]()) k[s.name] && o.push(s.name)
    if (r == null ? void 0 : r.length) for (const s of r) s.slot && o.push(s.slot)
    return o
  }
})
var ja = Symbol('ContextKey')
var Ln = (e, k) => {
  const { setTimeModelValue: p } = Ee(),
    r = Yr(e),
    o = ref(null),
    s = reactive({
      menuFocused: false,
      shiftKeyInMenu: false,
      isInputFocused: false,
      isTextInputDate: false
    }),
    n = r.getDate(/* @__PURE__ */ new Date()),
    l = ref(''),
    d = ref([{ month: getMonth(n), year: getYear(n) }]),
    B = reactive({ hours: 0, minutes: 0, seconds: 0 })
  p(B, null, n, r.range.value.enabled)
  const A = computed({
      get: () => o.value,
      set: (c) => {
        o.value = c
      }
    }),
    I = computed(() => (c) => (d.value[c] ? d.value[c].month : 0)),
    b = computed(() => (c) => (d.value[c] ? d.value[c].year : 0)),
    i = (c, T) => {
      s[c] = T
    },
    M = () => {
      p(B, A.value, n, r.range.value.enabled)
    }
  provide(ja, {
    rootProps: e,
    defaults: r,
    modelValue: A,
    state: readonly(s),
    rootEmit: k,
    calendars: d,
    month: I,
    year: b,
    time: B,
    today: n,
    inputValue: l,
    setState: i,
    updateTime: M,
    getDate: r.getDate
  })
}
var $e = () => {
  const e = inject(ja)
  if (!e) throw new Error("Can't use context")
  return e
}
var Kt = () => {
  const {
      defaults: { transitions: e }
    } = $e(),
    k = computed(() => (r) => (e.value ? (r ? e.value.open : e.value.close) : '')),
    p = computed(() => (r) => (e.value ? (r ? e.value.menuAppearTop : e.value.menuAppearBottom) : ''))
  return { transitionName: k, showTransition: !!e.value, menuTransition: p }
}
var jt = (e) => {
  const {
      today: k,
      time: p,
      modelValue: r,
      defaults: { range: o }
    } = $e(),
    { setTimeModelValue: s } = Ee()
  ;(watch(
    o,
    (n, l) => {
      n.enabled !== l.enabled && s(p, r.value, k, o.value.enabled)
    },
    { deep: true }
  ),
    watch(
      r,
      (n, l) => {
        e && JSON.stringify(n ?? {}) !== JSON.stringify(l ?? {}) && e()
      },
      { deep: true }
    ))
}
var at = () => {
  const {
      defaults: { safeDates: e, range: k, multiDates: p, filters: r, timeConfig: o },
      rootProps: s,
      getDate: n
    } = $e(),
    { getMapKeyType: l, getMapDate: d, errorMapper: B, convertType: A } = Ee(),
    {
      isDateBefore: I,
      isDateAfter: b,
      isDateEqual: i,
      resetDate: M,
      getDaysInBetween: c,
      setTimeValue: T,
      getTimeObj: v,
      setTime: Y
    } = je(),
    V = (m) =>
      e.value.disabledDates
        ? typeof e.value.disabledDates == 'function'
          ? e.value.disabledDates(n(m))
          : !!d(m, e.value.disabledDates)
        : false,
    P = (m) =>
      e.value.maxDate ? (s.yearPicker ? getYear(m) > getYear(e.value.maxDate) : b(m, e.value.maxDate)) : false,
    F = (m) =>
      e.value.minDate ? (s.yearPicker ? getYear(m) < getYear(e.value.minDate) : I(m, e.value.minDate)) : false,
    q = (m) => {
      var _a
      if (!m) return false
      const x = P(m),
        g = F(m),
        C = V(m),
        a = r.value.months.map((Ce) => +Ce).includes(getMonth(m)),
        f = ((_a = r.value.weekDays) == null ? void 0 : _a.length)
          ? r.value.weekDays.some((Ce) => +Ce === getDay(m))
          : false,
        S = N(m),
        te = getYear(m),
        ne = te < +s.yearRange[0] || te > +s.yearRange[1]
      return !(x || g || C || a || ne || f || S)
    },
    R = (m, x) => I(...E(e.value.minDate, m, x)) || i(...E(e.value.minDate, m, x)),
    w = (m, x) => b(...E(e.value.maxDate, m, x)) || i(...E(e.value.maxDate, m, x)),
    u = (m, x, g) => {
      let C = false
      return (e.value.maxDate && g && w(m, x) && (C = true), e.value.minDate && !g && R(m, x) && (C = true), C)
    },
    D = (m, x, g, C) => {
      let G = false
      return (
        C && (e.value.minDate || e.value.maxDate)
          ? e.value.minDate && e.value.maxDate
            ? (G = u(m, x, g))
            : ((e.value.minDate && R(m, x)) || (e.value.maxDate && w(m, x))) && (G = true)
          : (G = true),
        G
      )
    },
    N = (m) =>
      Array.isArray(e.value.allowedDates) && !e.value.allowedDates.length
        ? true
        : e.value.allowedDates
          ? !d(m, e.value.allowedDates, l(s.monthPicker, s.yearPicker))
          : false,
    Q = (m) => !q(m),
    ae = (m) => (k.value.noDisabledRange ? !eachDayOfInterval({ start: m[0], end: m[1] }).some((g) => Q(g)) : true),
    Z = (m) => {
      if (m) {
        const x = getYear(m)
        return x >= +s.yearRange[0] && x <= s.yearRange[1]
      }
      return true
    },
    ve = (m, x) => !!(Array.isArray(m) && m[x] && (k.value.maxRange || k.value.minRange) && Z(m[x])),
    he = (m, x, g = 0) => {
      if (ve(x, g) && Z(m)) {
        const C = differenceInCalendarDays(m, x[g]),
          G = c(x[g], m),
          a = G.length === 1 ? 0 : G.filter((S) => Q(S)).length,
          f = Math.abs(C) - (k.value.minMaxRawRange ? 0 : a)
        if (k.value.minRange && k.value.maxRange) return f >= +k.value.minRange && f <= +k.value.maxRange
        if (k.value.minRange) return f >= +k.value.minRange
        if (k.value.maxRange) return f <= +k.value.maxRange
      }
      return true
    },
    L = () => !o.value.enableTimePicker || s.monthPicker || s.yearPicker || o.value.ignoreTimeValidation,
    J = (m) => (Array.isArray(m) ? [m[0] ? T(m[0]) : null, m[1] ? T(m[1]) : null] : T(m)),
    W = (m, x, g) =>
      x
        ? m.find((C) =>
            +C.hours === getHours(x) && C.minutes === '*'
              ? true
              : +C.minutes === getMinutes(x) && +C.hours === getHours(x)
          ) && g
        : false,
    oe = (m, x, g) => {
      const [C, G] = m,
        [a, f] = x
      return !W(C, a, g) && !W(G, f, g) && g
    },
    z = (m, x) => {
      const g = Array.isArray(x) ? x : [x]
      return Array.isArray(s.disabledTimes)
        ? Array.isArray(s.disabledTimes[0])
          ? oe(s.disabledTimes, g, m)
          : !g.some((C) => W(s.disabledTimes, C, m))
        : m
    },
    ee = (m, x) => {
      const g = Array.isArray(x) ? [v(x[0]), x[1] ? v(x[1]) : void 0] : v(x),
        C = !s.disabledTimes(g)
      return m && C
    },
    fe = (m, x) => (s.disabledTimes ? (Array.isArray(s.disabledTimes) ? z(x, m) : ee(x, m)) : x),
    ge = (m) => {
      let x = true
      if (!m || L()) return true
      const g = !e.value.minDate && !e.value.maxDate ? J(m) : m
      return (
        (s.maxTime || e.value.maxDate) && (x = ue(s.maxTime, e.value.maxDate, 'max', A(g), x)),
        (s.minTime || e.value.minDate) && (x = ue(s.minTime, e.value.minDate, 'min', A(g), x)),
        fe(m, x)
      )
    },
    De = (m) => {
      if (!s.monthPicker) return true
      let x = true
      const g = n(M(m))
      if (e.value.minDate && e.value.maxDate) {
        const C = n(M(e.value.minDate)),
          G = n(M(e.value.maxDate))
        return (b(g, C) && I(g, G)) || i(g, C) || i(g, G)
      }
      if (e.value.minDate) {
        const C = n(M(e.value.minDate))
        x = b(g, C) || i(g, C)
      }
      if (e.value.maxDate) {
        const C = n(M(e.value.maxDate))
        x = I(g, C) || i(g, C)
      }
      return x
    },
    Ae = computed(() => (m) => (!o.value.enableTimePicker || o.value.ignoreTimeValidation ? true : ge(m))),
    re2 = computed(
      () => (m) =>
        s.monthPicker
          ? Array.isArray(m) && (k.value.enabled || p.value.enabled)
            ? !m.filter((g) => !De(g)).length
            : De(m)
          : true
    ),
    H = (m, x, g) => {
      if (!x || (g && !e.value.maxDate) || (!g && !e.value.minDate)) return false
      const C = g ? addMonths(m, 1) : subMonths(m, 1),
        G = [getMonth(C), getYear(C)]
      return g ? !w(...G) : !R(...G)
    },
    E = (m, x, g) => [set(n(m), { date: 1 }), set(n(), { month: x, year: g, date: 1 })],
    ce = (m, x, g, C) => {
      if (!m) return true
      if (C) {
        const G = g === 'max' ? isBefore(m, x) : isAfter(m, x),
          a = { seconds: 0, milliseconds: 0 }
        return G || isEqual(set(m, a), set(x, a))
      }
      return g === 'max' ? m.getTime() <= x.getTime() : m.getTime() >= x.getTime()
    },
    ue = (m, x, g, C, G) => {
      if (Array.isArray(C)) {
        const f = y(m, C[0], x),
          S = y(m, C[1], x)
        return ce(C[0], f, g, !!x) && ce(C[1], S, g, !!x) && G
      }
      const a = y(m, C, x)
      return ce(C, a, g, !!x) && G
    },
    y = (m, x, g) => (m ? Y(m, x) : n(g ?? x))
  return {
    isDisabled: Q,
    validateDate: q,
    validateMonthYearInRange: D,
    isDateRangeAllowed: ae,
    checkMinMaxRange: he,
    isValidTime: ge,
    validateMonthYear: H,
    validateMinDate: R,
    validateMaxDate: w,
    isValidDate: (m) => (Array.isArray(m) ? isValid(m[0]) && (m[1] ? isValid(m[1]) : true) : m ? isValid(m) : false),
    checkPartialRangeValue: (m) => {
      if (m) return null
      throw new Error(B.prop('partial-range'))
    },
    checkRangeEnabled: (m, x) => {
      if (x) return m()
      throw new Error(B.prop('range'))
    },
    checkMinMaxValue: (m, x, g) => {
      const C = g != null,
        G = x != null
      if (!C && !G) return false
      const a = +g,
        f = +x
      return C && G ? +m > a || +m < f : C ? +m > a : G ? +m < f : false
    },
    isTimeValid: Ae,
    isMonthValid: re2
  }
}
var Hn = (e) => {
  const {
      rootEmit: k,
      rootProps: p,
      defaults: { timeConfig: r, flow: o }
    } = $e(),
    s = ref(0),
    n = reactive({
      [Mt.timePicker]: !r.value.enableTimePicker || p.timePicker || p.monthPicker,
      [Mt.calendar]: false,
      [Mt.header]: false
    }),
    l = computed(() => p.monthPicker || p.timePicker),
    d = (i) => {
      var _a, _b
      if ((_b = (_a = o.value) == null ? void 0 : _a.steps) == null ? void 0 : _b.length) {
        if (!i && l.value) return b()
        ;((n[i] = true), Object.keys(n).filter((M) => !n[M]).length || b())
      }
    },
    B = () => {
      var _a, _b, _c, _d
      ;(((_b = (_a = o.value) == null ? void 0 : _a.steps) == null ? void 0 : _b.length) &&
        s.value !== -1 &&
        ((s.value += 1), k('flow-step', s.value), b()),
        ((_d = (_c = o.value) == null ? void 0 : _c.steps) == null ? void 0 : _d.length) === s.value &&
          nextTick().then(() => A()))
    },
    A = () => {
      s.value = -1
    },
    I = (i, M, ...c) => {
      var _a, _b, _c
      ;((_a = o.value) == null ? void 0 : _a.steps[s.value]) === i &&
        e.value &&
        ((_c = (_b = e.value)[M]) == null ? void 0 : _c.call(_b, ...c))
    },
    b = (i = 0) => {
      var _a
      ;(i && (s.value += i),
        I(qe.month, 'toggleMonthPicker', true),
        I(qe.year, 'toggleYearPicker', true),
        I(qe.calendar, 'toggleTimePicker', false, true),
        I(qe.time, 'toggleTimePicker', true, true))
      const M = (_a = o.value) == null ? void 0 : _a.steps[s.value]
      ;(M === qe.hours || M === qe.minutes || M === qe.seconds) && I(M, 'toggleTimePicker', true, true, M)
    }
  return { childMount: d, updateFlowStep: B, resetFlow: A, handleFlow: b, flowStep: s }
}
function ba(e) {
  return (k = {}) => {
    const p = k.width ? String(k.width) : e.defaultWidth
    return e.formats[p] || e.formats[e.defaultWidth]
  }
}
function It(e) {
  return (k, p) => {
    const r = (p == null ? void 0 : p.context) ? String(p.context) : 'standalone'
    let o
    if (r === 'formatting' && e.formattingValues) {
      const n = e.defaultFormattingWidth || e.defaultWidth,
        l = (p == null ? void 0 : p.width) ? String(p.width) : n
      o = e.formattingValues[l] || e.formattingValues[n]
    } else {
      const n = e.defaultWidth,
        l = (p == null ? void 0 : p.width) ? String(p.width) : e.defaultWidth
      o = e.values[l] || e.values[n]
    }
    const s = e.argumentCallback ? e.argumentCallback(k) : k
    return o[s]
  }
}
function Vt(e) {
  return (k, p = {}) => {
    const r = p.width,
      o = (r && e.matchPatterns[r]) || e.matchPatterns[e.defaultMatchWidth],
      s = k.match(o)
    if (!s) return null
    const n = s[0],
      l = (r && e.parsePatterns[r]) || e.parsePatterns[e.defaultParseWidth],
      d = Array.isArray(l)
        ? jn(l, (I) => I.test(n))
        : // [TODO] -- I challenge you to fix the type
          Kn(l, (I) => I.test(n))
    let B
    ;((B = e.valueCallback ? e.valueCallback(d) : d),
      (B = p.valueCallback
        ? // [TODO] -- I challenge you to fix the type
          p.valueCallback(B)
        : B))
    const A = k.slice(n.length)
    return { value: B, rest: A }
  }
}
function Kn(e, k) {
  for (const p in e) if (Object.prototype.hasOwnProperty.call(e, p) && k(e[p])) return p
}
function jn(e, k) {
  for (let p = 0; p < e.length; p++) if (k(e[p])) return p
}
function zn(e) {
  return (k, p = {}) => {
    const r = k.match(e.matchPattern)
    if (!r) return null
    const o = r[0],
      s = k.match(e.parsePattern)
    if (!s) return null
    let n = e.valueCallback ? e.valueCallback(s[0]) : s[0]
    n = p.valueCallback ? p.valueCallback(n) : n
    const l = k.slice(o.length)
    return { value: n, rest: l }
  }
}
var Un = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
}
var qn = (e, k, p) => {
  let r
  const o = Un[e]
  return (
    typeof o == 'string' ? (r = o) : k === 1 ? (r = o.one) : (r = o.other.replace('{{count}}', k.toString())),
    (p == null ? void 0 : p.addSuffix) ? (p.comparison && p.comparison > 0 ? 'in ' + r : r + ' ago') : r
  )
}
var Qn = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
}
var Gn = (e, k, p, r) => Qn[e]
var Jn = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
}
var Xn = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
}
var Zn = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
}
var er = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}
var tr = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
}
var ar = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
}
var nr = (e, k) => {
  const p = Number(e),
    r = p % 100
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return p + 'st'
      case 2:
        return p + 'nd'
      case 3:
        return p + 'rd'
    }
  return p + 'th'
}
var rr = {
  ordinalNumber: nr,
  era: It({
    values: Jn,
    defaultWidth: 'wide'
  }),
  quarter: It({
    values: Xn,
    defaultWidth: 'wide',
    argumentCallback: (e) => e - 1
  }),
  month: It({
    values: Zn,
    defaultWidth: 'wide'
  }),
  day: It({
    values: er,
    defaultWidth: 'wide'
  }),
  dayPeriod: It({
    values: tr,
    defaultWidth: 'wide',
    formattingValues: ar,
    defaultFormattingWidth: 'wide'
  })
}
var lr = /^(\d+)(th|st|nd|rd)?/i
var or = /\d+/i
var sr = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}
var ur = {
  any: [/^b/i, /^(a|c)/i]
}
var ir = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}
var cr = {
  any: [/1/i, /2/i, /3/i, /4/i]
}
var dr = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}
var vr = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}
var fr = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}
var mr = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}
var pr = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}
var hr = {
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
}
var gr = {
  ordinalNumber: zn({
    matchPattern: lr,
    parsePattern: or,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Vt({
    matchPatterns: sr,
    defaultMatchWidth: 'wide',
    parsePatterns: ur,
    defaultParseWidth: 'any'
  }),
  quarter: Vt({
    matchPatterns: ir,
    defaultMatchWidth: 'wide',
    parsePatterns: cr,
    defaultParseWidth: 'any',
    valueCallback: (e) => e + 1
  }),
  month: Vt({
    matchPatterns: dr,
    defaultMatchWidth: 'wide',
    parsePatterns: vr,
    defaultParseWidth: 'any'
  }),
  day: Vt({
    matchPatterns: fr,
    defaultMatchWidth: 'wide',
    parsePatterns: mr,
    defaultParseWidth: 'any'
  }),
  dayPeriod: Vt({
    matchPatterns: pr,
    defaultMatchWidth: 'any',
    parsePatterns: hr,
    defaultParseWidth: 'any'
  })
}
var yr = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
}
var br = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
}
var kr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
}
var wr = {
  date: ba({
    formats: yr,
    defaultWidth: 'full'
  }),
  time: ba({
    formats: br,
    defaultWidth: 'full'
  }),
  dateTime: ba({
    formats: kr,
    defaultWidth: 'full'
  })
}
var Dr = {
  code: 'en-US',
  formatDistance: qn,
  formatLong: wr,
  formatRelative: Gn,
  localize: rr,
  match: gr,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}
var Sa = {
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
}
var Mr = {
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
  setDateOnMenuClose: false,
  escClose: true,
  spaceConfirm: true,
  monthChangeOnArrows: true,
  monthChangeOnScroll: true
}
var Ra = {
  enterSubmit: true,
  tabSubmit: true,
  openMenu: 'open',
  selectOnFocus: false,
  rangeSeparator: ' - ',
  escClose: true,
  format: void 0,
  maskFormat: void 0
}
var _r = {
  dates: [],
  years: [],
  months: [],
  quarters: [],
  weeks: [],
  weekdays: [],
  options: { highlightDisabled: false }
}
var Ar = {
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  selectBtnLabel: 'Select',
  cancelBtnLabel: 'Cancel',
  nowBtnLabel: 'Now',
  nowBtnRound: void 0
}
var Pr = {
  toggleOverlay: 'Toggle overlay',
  menu: 'Datepicker menu',
  input: 'Datepicker input',
  openTimePicker: 'Open time picker',
  closeTimePicker: 'Close time Picker',
  incrementValue: (e) => `Increment ${e}`,
  decrementValue: (e) => `Decrement ${e}`,
  openTpOverlay: (e) => `Open ${e} overlay`,
  amPmButton: 'Switch AM/PM mode',
  openYearsOverlay: 'Open years overlay',
  openMonthsOverlay: 'Open months overlay',
  nextMonth: 'Next month',
  prevMonth: 'Previous month',
  nextYear: 'Next year',
  prevYear: 'Previous year',
  day: void 0,
  weekDay: void 0,
  clearInput: 'Clear value',
  calendarIcon: 'Calendar icon',
  timePicker: 'Time picker',
  monthPicker: (e) => `Month picker${e ? ' overlay' : ''}`,
  yearPicker: (e) => `Year picker${e ? ' overlay' : ''}`,
  timeOverlay: (e) => `${e} overlay`
}
var Ca = {
  menuAppearTop: 'dp-menu-appear-top',
  menuAppearBottom: 'dp-menu-appear-bottom',
  open: 'dp-slide-down',
  close: 'dp-slide-up',
  next: 'calendar-next',
  previous: 'calendar-prev',
  vNext: 'dp-slide-up',
  vPrevious: 'dp-slide-down'
}
var Tr = {
  weekDays: [],
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] }
}
var $r = {
  month: 'LLL',
  year: 'yyyy',
  weekDay: 'EEEEEE',
  quarter: 'MMMM',
  day: 'd',
  input: void 0,
  preview: void 0
}
var Sr = {
  enableTimePicker: true,
  ignoreTimeValidation: false,
  enableSeconds: false,
  enableMinutes: true,
  is24: true,
  noHoursOverlay: false,
  noMinutesOverlay: false,
  noSecondsOverlay: false,
  hoursGridIncrement: 1,
  minutesGridIncrement: 5,
  secondsGridIncrement: 5,
  hoursIncrement: 1,
  minutesIncrement: 1,
  secondsIncrement: 1,
  timePickerInline: false,
  startTime: void 0
}
var Rr = {
  flowStep: 0,
  menuWrapRef: null,
  collapse: false
}
var Cr = {
  weekStart: 1,
  yearRange: () => [1900, 2100],
  ui: () => ({}),
  locale: () => Dr,
  dark: false,
  transitions: true,
  hideNavigation: () => [],
  vertical: false,
  hideMonthYearSelect: false,
  disableYearSelect: false,
  autoApply: false,
  disabledDates: () => [],
  hideOffsetDates: false,
  noToday: false,
  markers: () => [],
  presetDates: () => [],
  preventMinMaxNavigation: false,
  reverseYears: false,
  weekPicker: false,
  arrowNavigation: false,
  monthPicker: false,
  yearPicker: false,
  quarterPicker: false,
  timePicker: false,
  modelAuto: false,
  multiDates: false,
  range: false,
  inline: false,
  sixWeeks: false,
  focusStartDate: false,
  yearFirst: false,
  loading: false,
  centered: false
}
var Ya = {
  name: void 0,
  required: false,
  autocomplete: 'off',
  state: void 0,
  clearable: true,
  alwaysClearable: false,
  hideInputIcon: false,
  id: void 0,
  inputmode: 'none'
}
var Xt = {
  type: 'local',
  hideOnOffsetDates: false,
  label: 'W'
}
var Yr = (e) => {
  const { getMapKey: k, getMapKeyType: p, getTimeObjFromCurrent: r } = Ee()
  function o(L, J) {
    let W
    return (
      e.timezone
        ? (W = new TZDate(L ?? /* @__PURE__ */ new Date(), e.timezone))
        : (W = L ? new Date(L) : /* @__PURE__ */ new Date()),
      J ? set(W, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }) : W
    )
  }
  const s = () => {
      const L = ae.value.enableSeconds ? ':ss' : '',
        J = ae.value.enableMinutes ? ':mm' : ''
      return ae.value.is24 ? `HH${J}${L}` : `hh${J}${L} aa`
    },
    n = () => {
      var _a
      return e.monthPicker
        ? 'MM/yyyy'
        : e.timePicker
          ? s()
          : e.weekPicker
            ? `${((_a = q.value) == null ? void 0 : _a.type) === 'iso' ? 'II' : 'ww'}-RR`
            : e.yearPicker
              ? 'yyyy'
              : e.quarterPicker
                ? 'QQQ/yyyy'
                : ae.value.enableTimePicker
                  ? `MM/dd/yyyy, ${s()}`
                  : 'MM/dd/yyyy'
    },
    l = (L) => r(o(), L, ae.value.enableSeconds),
    d = () =>
      u.value.enabled
        ? ae.value.startTime && Array.isArray(ae.value.startTime)
          ? [l(ae.value.startTime[0]), l(ae.value.startTime[1])]
          : null
        : ae.value.startTime && !Array.isArray(ae.value.startTime)
          ? l(ae.value.startTime)
          : null,
    B = (L) => (L ? (typeof L == 'boolean' ? (L ? 2 : 0) : Math.max(+L, 2)) : 0),
    A = (L) => {
      const J = p(e.monthPicker, e.yearPicker)
      return new Map(
        L.map((W) => {
          const oe = o(W, I.value)
          return [k(oe, J), oe]
        })
      )
    },
    I = computed(() => e.monthPicker || e.yearPicker || e.quarterPicker),
    b = computed(() => {
      const L = typeof e.multiCalendars == 'object' && e.multiCalendars,
        J = {
          static: true,
          solo: false
        }
      if (!e.multiCalendars) return { ...J, count: B(false) }
      const W = L ? e.multiCalendars : {},
        oe = L ? (W.count ?? true) : e.multiCalendars,
        z = B(oe)
      return Object.assign(J, W, { count: z })
    }),
    i = computed(() => d()),
    M = computed(() => ({ ...Pr, ...e.ariaLabels })),
    c = computed(() => ({ ...Tr, ...e.filters })),
    T = computed(() =>
      typeof e.transitions == 'boolean' ? (e.transitions ? Ca : false) : { ...Ca, ...e.transitions }
    ),
    v = computed(() => ({ ...Ar, ...e.actionRow })),
    Y = computed(() =>
      typeof e.textInput == 'object'
        ? {
            ...Ra,
            ...e.textInput,
            format: typeof e.textInput.format == 'string' ? e.textInput.format : N.value.input,
            pattern: e.textInput.format ?? N.value.input,
            enabled: true
          }
        : {
            ...Ra,
            format: N.value.input,
            pattern: N.value.input,
            enabled: e.textInput
          }
    ),
    V = computed(() => {
      const L = { input: false }
      return typeof e.inline == 'object'
        ? { ...L, ...e.inline, enabled: true }
        : {
            enabled: e.inline,
            ...L
          }
    }),
    P = computed(() => ({ ...Mr, ...e.config })),
    F = computed(() =>
      typeof e.highlight == 'function'
        ? e.highlight
        : {
            ..._r,
            ...e.highlight
          }
    ),
    q = computed(() => {
      var _a, _b
      return typeof e.weekNumbers == 'object'
        ? {
            type: ((_a = e.weekNumbers) == null ? void 0 : _a.type) ?? Xt.type,
            hideOnOffsetDates: ((_b = e.weekNumbers) == null ? void 0 : _b.hideOnOffsetDates) ?? Xt.hideOnOffsetDates,
            label: e.weekNumbers.label ?? Xt.label
          }
        : e.weekNumbers
          ? Xt
          : void 0
    }),
    R = computed(() => {
      var _a, _b
      return typeof e.multiDates == 'boolean'
        ? { enabled: e.multiDates, dragSelect: true, limit: null }
        : {
            enabled: !!e.multiDates,
            limit: ((_a = e.multiDates) == null ? void 0 : _a.limit) ? +e.multiDates.limit : null,
            dragSelect: ((_b = e.multiDates) == null ? void 0 : _b.dragSelect) ?? true
          }
    }),
    w = computed(() => {
      var _a
      return {
        minDate: e.minDate ? o(e.minDate) : null,
        maxDate: e.maxDate ? o(e.maxDate) : null,
        disabledDates: Array.isArray(e.disabledDates) ? A(e.disabledDates) : e.disabledDates,
        allowedDates: Array.isArray(e.allowedDates) ? A(e.allowedDates) : null,
        highlight: typeof F.value == 'object' && Array.isArray(F.value.dates) ? A(F.value.dates) : F.value,
        markers: ((_a = e.markers) == null ? void 0 : _a.length)
          ? new Map(
              e.markers.map((L) => {
                const J = o(L.date)
                return [k(J, Pt.DATE), L]
              })
            )
          : null
      }
    }),
    u = computed(() =>
      typeof e.range == 'object'
        ? { enabled: true, ...Sa, ...e.range }
        : {
            enabled: e.range,
            ...Sa
          }
    ),
    D = computed(() => ({
      ...Object.fromEntries(
        Object.keys(e.ui).map((J) => {
          const W = J,
            oe = e.ui[W]
          if (W === 'dayClass') return [W, e.ui[W]]
          const z = typeof e.ui[W] == 'string' ? { [oe]: true } : Object.fromEntries(oe.map((ee) => [ee, true]))
          return [J, z]
        })
      )
    })),
    N = computed(() => {
      var _a, _b
      return {
        ...$r,
        ...e.formats,
        input: ((_a = e.formats) == null ? void 0 : _a.input) ?? n(),
        preview: ((_b = e.formats) == null ? void 0 : _b.preview) ?? n()
      }
    }),
    Q = computed(() => {
      if (e.teleport)
        return typeof e.teleport == 'string' ? e.teleport : typeof e.teleport == 'boolean' ? 'body' : e.teleport
    }),
    ae = computed(() => ({ ...Sr, ...e.timeConfig })),
    Z = computed(() => {
      if (e.flow) return { steps: [], partial: false, ...e.flow }
    }),
    ve = computed(() => {
      const L = Y.value.enabled ? 'text' : 'none'
      return e.inputAttrs ? { ...Ya, inputmode: L, ...e.inputAttrs } : { ...Ya, inputmode: L }
    }),
    he = computed(() => {
      var _a, _b, _c, _d
      return {
        offset: ((_a = e.floating) == null ? void 0 : _a.offset) ?? 10,
        arrow: ((_b = e.floating) == null ? void 0 : _b.arrow) ?? true,
        strategy: ((_c = e.floating) == null ? void 0 : _c.strategy) ?? void 0,
        placement: ((_d = e.floating) == null ? void 0 : _d.placement) ?? void 0
      }
    })
  return {
    transitions: T,
    multiCalendars: b,
    startTime: i,
    ariaLabels: M,
    filters: c,
    actionRow: v,
    textInput: Y,
    inline: V,
    config: P,
    highlight: F,
    weekNumbers: q,
    range: u,
    safeDates: w,
    multiDates: R,
    ui: D,
    formats: N,
    teleport: Q,
    timeConfig: ae,
    flow: Z,
    inputAttrs: ve,
    floatingConfig: he,
    getDate: o
  }
}
var Ee = () => {
  const e = (P, F) => format(P, F ?? Pt.DATE),
    k = (P, F) => (P ? Pt.MONTH_AND_YEAR : F ? Pt.YEAR : Pt.DATE),
    p = (P, F, q) => F.get(e(P, q)),
    r = (P) => P,
    o = (P) => (P === 0 ? P : !P || Number.isNaN(+P) ? null : +P),
    s = () =>
      [
        'a[href]',
        'area[href]',
        "input:not([disabled]):not([type='hidden'])",
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        "[tabindex]:not([tabindex='-1'])",
        '[data-datepicker-instance]'
      ].join(', '),
    n = (P, F) => {
      let q = [...document.querySelectorAll(s())]
      q = q.filter((w) => !P.contains(w) || 'datepicker-instance' in w.dataset)
      const R = q.indexOf(P)
      if (R >= 0 && (F ? R - 1 >= 0 : R + 1 <= q.length)) return q[R + (F ? -1 : 1)]
    },
    l = (P) => String(P).padStart(2, '0'),
    d = (P, F) => (P == null ? void 0 : P.querySelector(`[data-dp-element="${F}"]`)),
    B = (P, F, q = false) => {
      P && F.allowStopPropagation && (q && P.stopImmediatePropagation(), P.stopPropagation())
    },
    A = (P, F, q = false, R) => {
      if (P.key === xe.enter || P.key === xe.space) return (q && P.preventDefault(), F())
      if (R) return R(P)
    },
    I = (P, F) => {
      ;(F.allowStopPropagation && P.stopPropagation(), F.allowPreventDefault && P.preventDefault())
    },
    b = (P) => {
      if (P) return [...P.querySelectorAll('input, button, select, textarea, a[href]')][0]
    },
    i = () => 'ontouchstart' in globalThis || navigator.maxTouchPoints > 0,
    M = (P) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][P],
    c = (P) => {
      const F = [],
        q = (R) => R.filter((w) => !!w)
      for (let R = 0; R < P.length; R += 3) {
        const w = [P[R], P[R + 1], P[R + 2]]
        F.push(q(w))
      }
      return F
    },
    T = {
      prop: (P) => `"${P}" prop must be enabled!`,
      dateArr: (P) => `You need to use array as "model-value" binding in order to support "${P}"`
    },
    v = (P, F, q, R, w) => {
      const u = {
        hours: getHours,
        minutes: getMinutes,
        seconds: getSeconds
      }
      if (!F) return R ? [u[P](q), u[P](q)] : u[P](q)
      if (Array.isArray(F) && R) {
        const D = F[0] ?? q,
          N = F[1]
        return [u[P](D), N ? u[P](N) : (w[P][1] ?? u[P](q))]
      }
      return u[P](F)
    }
  return {
    getMapKey: e,
    getMapKeyType: k,
    getMapDate: p,
    convertType: r,
    getNumVal: o,
    findNextFocusableElement: n,
    padZero: l,
    getElWithin: d,
    checkStopPropagation: B,
    checkKeyDown: A,
    handleEventPropagation: I,
    findFocusableEl: b,
    isTouchDevice: i,
    hoursToAmPmHours: M,
    getGroupedList: c,
    setTimeModelValue: (P, F, q, R) => {
      ;((P.hours = v('hours', F, q, R, P)),
        (P.minutes = v('minutes', F, q, R, P)),
        (P.seconds = v('seconds', F, q, R, P)))
    },
    getTimeObjFromCurrent: (P, F, q) => {
      const R = {
        hours: getHours(P),
        minutes: getMinutes(P),
        seconds: q ? getSeconds(P) : 0
      }
      return Object.assign(R, F)
    },
    errorMapper: T
  }
}
var je = () => {
  const { getDate: e } = $e(),
    { getMapDate: k, getGroupedList: p } = Ee(),
    r = (u, D) => {
      if (!u) return e()
      const N = e(u),
        Q = set(N, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
      return D ? startOfMonth(Q) : Q
    },
    o = (u, D) => {
      const N = e(D)
      return set(N, {
        hours: +(u.hours ?? getHours(N)),
        minutes: +(u.minutes ?? getMinutes(N)),
        seconds: +(u.seconds ?? getSeconds(N)),
        milliseconds: 0
      })
    },
    s = (u, D) => {
      const N = startOfWeek(u, { weekStartsOn: +D }),
        Q = endOfWeek(u, { weekStartsOn: +D })
      return [N, Q]
    },
    n = (u, D) => (!u || !D ? false : isBefore(r(u), r(D))),
    l = (u, D) => (!u || !D ? false : isEqual(r(u), r(D))),
    d = (u, D) => (!u || !D ? false : isAfter(r(u), r(D))),
    B = (u, D, N) =>
      (u == null ? void 0 : u[0]) && (u == null ? void 0 : u[1])
        ? d(N, u[0]) && n(N, u[1])
        : (u == null ? void 0 : u[0]) && D
          ? (d(N, u[0]) && n(N, D)) || (n(N, u[0]) && d(N, D))
          : false,
    A = (u, D) => {
      const N = d(u, D) ? D : u,
        Q = d(D, u) ? D : u
      return eachDayOfInterval({ start: N, end: Q })
    },
    I = (u) => `dp-${format(u, 'yyyy-MM-dd')}`,
    b = (u) => r(set(e(u), { date: 1 })),
    i = (u, D) => {
      if (D) {
        const N = getYear(e(D))
        if (N > u) return 12
        if (N === u) return getMonth(e(D))
      }
    },
    M = (u, D) => {
      if (D) {
        const N = getYear(e(D))
        return N < u ? -1 : N === u ? getMonth(e(D)) : void 0
      }
    },
    c = (u) => {
      if (u) return getYear(e(u))
    },
    T = (u) => ({
      hours: getHours(u),
      minutes: getMinutes(u),
      seconds: getSeconds(u)
    })
  return {
    resetDateTime: r,
    groupListAndMap: (u, D) =>
      p(u).map((N) =>
        N.map((Q) => {
          const { active: ae, disabled: Z, isBetween: ve, highlighted: he } = D(Q)
          return {
            ...Q,
            active: ae,
            disabled: Z,
            className: {
              dp__overlay_cell_active: ae,
              dp__overlay_cell: !ae,
              dp__overlay_cell_disabled: Z,
              dp__overlay_cell_pad: true,
              dp__overlay_cell_active_disabled: Z && ae,
              dp__cell_in_between: ve,
              'dp--highlighted': he
            }
          }
        })
      ),
    setTime: o,
    getWeekFromDate: s,
    isDateAfter: d,
    isDateBefore: n,
    isDateBetween: B,
    isDateEqual: l,
    getDaysInBetween: A,
    getCellId: I,
    resetDate: b,
    getMinMonth: i,
    getMaxMonth: M,
    getYearFromDate: c,
    getTimeObj: T,
    setTimeValue: (u) => set(e(), T(u)),
    sanitizeTime: (u, D, N) =>
      D && (N || N === 0)
        ? Object.fromEntries(
            ['hours', 'minutes', 'seconds'].map((Q) => (Q === D ? [Q, N] : [Q, Number.isNaN(+u[Q]) ? void 0 : +u[Q]]))
          )
        : {
            hours: Number.isNaN(+u.hours) ? void 0 : +u.hours,
            minutes: Number.isNaN(+u.minutes) ? void 0 : +u.minutes,
            seconds: Number.isNaN(+(u.seconds ?? '')) ? void 0 : +u.seconds
          },
    getBeforeAndAfterInRange: (u, D) => {
      const N = subDays(r(D), u),
        Q = addDays(r(D), u)
      return { before: N, after: Q }
    },
    isModelAuto: (u) => (Array.isArray(u) ? !!u[0] && !!u[1] : false),
    matchDate: (u, D) => (u ? (D ? (D instanceof Map ? !!k(u, D) : D(e(u))) : false) : true),
    checkHighlightMonth: (u, D, N) =>
      typeof u == 'function' ? u({ month: D, year: N }) : u.months.some((Q) => Q.month === D && Q.year === N),
    checkHighlightYear: (u, D) => (typeof u == 'function' ? u(D) : u.years.includes(D))
  }
}
var aa = () => {
  const {
      defaults: { config: e }
    } = $e(),
    k = ref(0)
  ;(onMounted(() => {
    ;(p(), globalThis.addEventListener('resize', p, { passive: true }))
  }),
    onUnmounted(() => {
      globalThis.removeEventListener('resize', p)
    }))
  const p = () => {
    k.value = globalThis.document.documentElement.clientWidth
  }
  return {
    isMobile: computed(() => (k.value <= e.value.mobileBreakpoint ? true : void 0))
  }
}
var bt = () => {
  const {
      getDate: e,
      state: k,
      modelValue: p,
      rootProps: r,
      defaults: { formats: o, textInput: s }
    } = $e(),
    n = (T) => format(setYear(e(), T), o.value.year, { locale: r.locale }),
    l = (T) => format(setMonth(e(), T), o.value.month, { locale: r.locale }),
    d = (T) => format(e(`2017-01-0${T}T00:00:00+00:00`), o.value.weekDay, { locale: r.locale }),
    B = (T) => format(T, o.value.quarter, { locale: r.locale }),
    A = (T, v) => [T, v].map((Y) => B(Y)).join('-'),
    I = (T) => format(T, o.value.day, { locale: r.locale }),
    b = (T, v, Y) => {
      const V = Y ? o.value.preview : o.value.input
      if (!T) return ''
      if (typeof V == 'function') return V(T)
      const P = v ?? V,
        F = { locale: r.locale }
      return Array.isArray(T)
        ? `${format(T[0], P, F)}${r.modelAuto && !T[1] ? '' : s.value.rangeSeparator}${T[1] ? format(T[1], P, F) : ''}`
        : format(T, P, F)
    },
    i = () => {
      const T = (v) => format(v, s.value.format)
      return Array.isArray(p.value)
        ? `${T(p.value[0])} ${s.value.rangeSeparator} ${p.value[1] ? T(p.value[1]) : ''}`
        : ''
    }
  return {
    formatYear: n,
    formatMonth: l,
    formatWeekDay: d,
    formatQuarter: B,
    formatSelectedDate: b,
    formatForTextInput: () =>
      k.isInputFocused && p.value ? (Array.isArray(p.value) ? i() : format(p.value, s.value.format)) : b(p.value),
    formatPreview: (T) => b(T, void 0, true),
    formatQuarterText: A,
    formatDay: I
  }
}
var na = () => {
  const { rootProps: e } = $e(),
    { formatYear: k, formatMonth: p } = bt()
  return {
    getMonths: () =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({
        text: p(n),
        value: n
      })),
    getYears: () => {
      const n = []
      for (let l = +e.yearRange[0]; l <= +e.yearRange[1]; l++) n.push({ value: +l, text: k(l) })
      return e.reverseYears ? n.reverse() : n
    },
    isOutOfYearRange: (n) => n < +e.yearRange[0] || n > +e.yearRange[1]
  }
}
var Or = (e) => ({
  openMenu: () => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.openMenu()
  },
  closeMenu: () => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.closeMenu()
  },
  selectDate: () => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.selectDate()
  },
  clearValue: () => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.clearValue()
  },
  formatInputValue: () => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.formatInputValue()
  },
  updateInternalModelValue: (b) => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.updateInternalModelValue(b)
  },
  setMonthYear: (b, i) => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.setMonthYear(b, i)
  },
  parseModel: () => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.parseModel()
  },
  switchView: (b, i) => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.switchView(b, i)
  },
  handleFlow: () => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.handleFlow()
  },
  toggleMenu: () => {
    var _a
    return (_a = e.value) == null ? void 0 : _a.toggleMenu()
  }
})
var xr = () => {
  const {
      getDate: e,
      rootProps: k,
      defaults: { textInput: p, startTime: r, timeConfig: o }
    } = $e(),
    { getTimeObjFromCurrent: s } = Ee(),
    n = ref(false),
    l = computed(() => (Array.isArray(r.value) ? r.value[0] : (r.value ?? s(e(), {}, o.value.enableSeconds)))),
    d = (b, i, M) => {
      const c = parse(b, i.slice(0, b.length), e(), { locale: k.locale })
      return isValid(c) && isDate(c)
        ? M || n.value
          ? c
          : set(c, {
              hours: +l.value.hours,
              minutes: +l.value.minutes,
              seconds: +(l.value.seconds ?? 0),
              milliseconds: 0
            })
        : null
    }
  return {
    textPasted: n,
    parseFreeInput: (b, i) => {
      if (typeof p.value.pattern == 'string') return d(b, p.value.pattern, i)
      if (Array.isArray(p.value.pattern)) {
        let M = null
        for (const c of p.value.pattern) if (((M = d(b, c, i)), M)) break
        return M
      }
      return typeof p.value.pattern == 'function' ? p.value.pattern(b) : null
    },
    applyMaxValues: (b, i) => {
      const M = {
        MM: 12,
        DD: 31,
        hh: 23,
        mm: 59,
        ss: 59
      }
      let c = '',
        T = 0
      for (let v = 0; v < i.length; v++) {
        const Y = i[v],
          V = Y.length,
          P = b.slice(T, T + V)
        if (!P) break
        if (P.length < V) c += P
        else {
          let F = Number.parseInt(P, 10)
          ;(M[Y] && F > M[Y] && (F = M[Y]), (c += F.toString().padStart(V, '0').slice(0, V)))
        }
        T += V
      }
      return c
    },
    createMaskedValue: (b, i) => {
      const M = /(YYYY|MM|DD|hh|mm|ss)/g,
        c = [...i.matchAll(M)].map((P) => P[0]),
        T = i.replace(M, '|').split('|').filter(Boolean),
        v = c.map((P) => P.length)
      let Y = '',
        V = 0
      for (let P = 0; P < c.length; P++) {
        const F = v[P],
          q = b.slice(V, V + F)
        if (!q) break
        ;((Y += q), q.length === F && T[P] && (Y += T[P]), (V += F))
      }
      return Y
    }
  }
}
var Br = {
  key: 1,
  class: 'dp__input_wrap'
}
var Ir = [
  'id',
  'name',
  'inputmode',
  'placeholder',
  'disabled',
  'readonly',
  'required',
  'value',
  'autocomplete',
  'aria-label',
  'aria-disabled',
  'aria-invalid'
]
var Vr = {
  key: 2,
  class: 'dp--clear-btn'
}
var Er = ['aria-label']
var Fr = defineComponent({
  __name: 'DatepickerInput',
  props: {
    isMenuOpen: { type: Boolean, default: false }
  },
  emits: [
    'clear',
    'open',
    'set-input-date',
    'close',
    'select-date',
    'set-empty-date',
    'toggle',
    'focus',
    'blur',
    'real-blur'
  ],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      {
        rootEmit: s,
        inputValue: n,
        rootProps: l,
        defaults: { textInput: d, ariaLabels: B, inline: A, config: I, range: b, multiDates: i, ui: M, inputAttrs: c }
      } = $e(),
      { checkMinMaxRange: T, isValidDate: v } = at(),
      { parseFreeInput: Y, textPasted: V, createMaskedValue: P, applyMaxValues: F } = xr(),
      { checkKeyDown: q, checkStopPropagation: R } = Ee(),
      w = useTemplateRef('dp-input'),
      u = ref(null),
      D = ref(false),
      N = computed(() => ({
        dp__pointer: !l.disabled && !l.readonly && !d.value.enabled,
        dp__disabled: l.disabled,
        dp__input_readonly: !d.value.enabled,
        dp__input: true,
        dp__input_not_clearable: !c.value.clearable,
        dp__input_icon_pad: !c.value.hideInputIcon,
        dp__input_valid: typeof c.value.state == 'boolean' ? c.value.state : false,
        dp__input_invalid: typeof c.value.state == 'boolean' ? !c.value.state : false,
        dp__input_focus: D.value || o.isMenuOpen,
        dp__input_reg: !d.value.enabled,
        ...M.value.input
      })),
      Q = () => {
        ;(r('set-input-date', null), c && l.autoApply && (r('set-empty-date'), (u.value = null)))
      },
      ae = (H) => {
        const { rangeSeparator: E } = d.value,
          [ce, ue] = H.split(`${E}`)
        if (ce) {
          const y = Y(ce.trim(), n.value),
            $ = ue ? Y(ue.trim(), n.value) : void 0
          if (isAfter(y, $)) return
          const ie = y && $ ? [y, $] : [y]
          T($, ie, 0) && (u.value = y ? ie : null)
        }
      },
      Z = () => {
        V.value = true
      },
      ve = (H) => {
        if (b.value.enabled) ae(H)
        else if (i.value.enabled) {
          const E = H.split(';')
          u.value = E.map((ce) => Y(ce.trim())).filter((ce) => !!ce)
        } else u.value = Y(H, n.value)
      },
      he = (H) => {
        var _a, _b
        const E = typeof H == 'string' ? H : (_a = H.target) == null ? void 0 : _a.value,
          ce = (_b = d == null ? void 0 : d.value) == null ? void 0 : _b.maskFormat
        let ue = E
        if (typeof ce == 'string') {
          const y = /(YYYY|MM|DD|hh|mm|ss)/g,
            ie = [...ce.matchAll(y)].map((m) => m[0]),
            le = E.replace(/\D/g, ''),
            h2 = F(le, ie)
          ue = P(h2, ce)
        }
        ;(ue === '' ? Q() : (d.value.openMenu && !o.isMenuOpen && r('open'), ve(ue), r('set-input-date', u.value)),
          (V.value = false),
          (n.value = ue),
          s('text-input', H, u.value))
      },
      L = (H) => {
        d.value.enabled
          ? (ve(H.target.value),
            d.value.enterSubmit && v(u.value) && n.value !== ''
              ? (r('set-input-date', u.value, true), (u.value = null))
              : d.value.enterSubmit && n.value === '' && ((u.value = null), r('clear')))
          : oe(H)
      },
      J = (H, E) => {
        ;(d.value.enabled && d.value.tabSubmit && !E && ve(H.target.value),
          d.value.tabSubmit && v(u.value) && n.value !== ''
            ? (r('set-input-date', u.value, true, true), (u.value = null))
            : d.value.tabSubmit && n.value === '' && ((u.value = null), r('clear')))
      },
      W = () => {
        ;((D.value = true),
          r('focus'),
          nextTick().then(() => {
            var _a
            d.value.enabled && d.value.selectOnFocus && ((_a = w.value) == null ? void 0 : _a.select())
          }))
      },
      oe = (H) => {
        if ((R(H, I.value, true), d.value.enabled && d.value.openMenu && !A.value.input)) {
          if (d.value.openMenu === 'open' && !o.isMenuOpen) return r('open')
          if (d.value.openMenu === 'toggle') return r('toggle')
        } else d.value.enabled || r('toggle')
      },
      z = () => {
        ;(r('real-blur'),
          (D.value = false),
          (!o.isMenuOpen || (A.value.enabled && A.value.input)) && r('blur'),
          l.autoApply &&
            d.value.enabled &&
            u.value &&
            !o.isMenuOpen &&
            (r('set-input-date', u.value), r('select-date'), (u.value = null)))
      },
      ee = (H) => {
        ;(R(H, I.value, true), r('clear'))
      },
      fe = () => {
        r('close')
      },
      ge = (H) => {
        if (
          (H.key === 'Tab' && J(H),
          H.key === 'Enter' && L(H),
          H.key === 'Escape' && d.value.escClose && fe(),
          !d.value.enabled)
        ) {
          if (H.code === 'Tab') return
          H.preventDefault()
        }
      },
      De = () => {
        var _a
        ;(_a = w.value) == null ? void 0 : _a.focus({ preventScroll: true })
      },
      Ae = (H) => {
        u.value = H
      },
      re2 = (H) => {
        H.key === xe.tab && J(H, true)
      }
    return (
      k({
        focusInput: De,
        setParsedDate: Ae
      }),
      (H, E) => {
        var _a, _b
        return (
          openBlock(),
          createElementBlock('div', { onClick: oe }, [
            H.$slots.trigger && !H.$slots['dp-input'] && !unref(A).enabled
              ? renderSlot(H.$slots, 'trigger', { key: 0 })
              : createCommentVNode('', true),
            !H.$slots.trigger && (!unref(A).enabled || unref(A).input)
              ? (openBlock(),
                createElementBlock('div', Br, [
                  H.$slots['dp-input'] &&
                  !H.$slots.trigger &&
                  (!unref(A).enabled || (unref(A).enabled && unref(A).input))
                    ? renderSlot(H.$slots, 'dp-input', {
                        key: 0,
                        value: unref(n),
                        isMenuOpen: e.isMenuOpen,
                        onInput: he,
                        onEnter: L,
                        onTab: J,
                        onClear: ee,
                        onBlur: z,
                        onKeypress: ge,
                        onPaste: Z,
                        onFocus: W,
                        openMenu: () => H.$emit('open'),
                        closeMenu: () => H.$emit('close'),
                        toggleMenu: () => H.$emit('toggle')
                      })
                    : createCommentVNode('', true),
                  H.$slots['dp-input']
                    ? createCommentVNode('', true)
                    : (openBlock(),
                      createElementBlock(
                        'input',
                        {
                          key: 1,
                          id: unref(c).id,
                          ref: 'dp-input',
                          'data-test-id': 'dp-input',
                          name: unref(c).name,
                          class: normalizeClass(N.value),
                          inputmode: unref(c).inputmode,
                          placeholder: unref(l).placeholder,
                          disabled: unref(l).disabled,
                          readonly: unref(l).readonly,
                          required: unref(c).required,
                          value: unref(n),
                          autocomplete: unref(c).autocomplete,
                          'aria-label': unref(B).input,
                          'aria-disabled': unref(l).disabled || void 0,
                          'aria-invalid': unref(c).state === false ? true : void 0,
                          onInput: he,
                          onBlur: z,
                          onFocus: W,
                          onKeypress: ge,
                          onKeydown: E[0] || (E[0] = (ce) => ge(ce)),
                          onPaste: Z,
                          onInvalid: E[1] || (E[1] = (ce) => unref(s)('invalid', ce))
                        },
                        null,
                        42,
                        Ir
                      )),
                  createBaseVNode(
                    'div',
                    {
                      onClick: E[4] || (E[4] = (ce) => r('toggle'))
                    },
                    [
                      H.$slots['input-icon'] && !unref(c).hideInputIcon
                        ? (openBlock(),
                          createElementBlock(
                            'span',
                            {
                              key: 0,
                              class: 'dp__input_icon',
                              onClick: E[2] || (E[2] = (ce) => r('toggle'))
                            },
                            [renderSlot(H.$slots, 'input-icon')]
                          ))
                        : createCommentVNode('', true),
                      !H.$slots['input-icon'] && !unref(c).hideInputIcon && !H.$slots['dp-input']
                        ? (openBlock(),
                          createBlock(
                            unref(Ht),
                            {
                              key: 1,
                              'aria-label': (_a = unref(B)) == null ? void 0 : _a.calendarIcon,
                              class: 'dp__input_icon dp__input_icons',
                              onClick: E[3] || (E[3] = (ce) => r('toggle'))
                            },
                            null,
                            8,
                            ['aria-label']
                          ))
                        : createCommentVNode('', true)
                    ]
                  ),
                  H.$slots['clear-icon'] &&
                  (unref(c).alwaysClearable ||
                    (unref(n) && unref(c).clearable && !unref(l).disabled && !unref(l).readonly))
                    ? (openBlock(), createElementBlock('span', Vr, [renderSlot(H.$slots, 'clear-icon', { clear: ee })]))
                    : createCommentVNode('', true),
                  !H.$slots['clear-icon'] &&
                  (unref(c).alwaysClearable ||
                    (unref(c).clearable && unref(n) && !unref(l).disabled && !unref(l).readonly))
                    ? (openBlock(),
                      createElementBlock(
                        'button',
                        {
                          key: 3,
                          'aria-label': (_b = unref(B)) == null ? void 0 : _b.clearInput,
                          class: 'dp--clear-btn',
                          type: 'button',
                          'data-test-id': 'clear-input-value-btn',
                          onKeydown: E[5] || (E[5] = (ce) => unref(q)(ce, () => ee(ce), true, re2)),
                          onClick: E[6] || (E[6] = withModifiers((ce) => ee(ce), ['prevent']))
                        },
                        [createVNode(unref(En), { class: 'dp__input_icons' })],
                        40,
                        Er
                      ))
                    : createCommentVNode('', true)
                ]))
              : createCommentVNode('', true)
          ])
        )
      }
    )
  }
})
var Nr = {
  ref: 'action-row',
  class: 'dp__action_row'
}
var Wr = ['title']
var Lr = {
  ref: 'action-buttons-container',
  class: 'dp__action_buttons',
  'data-dp-element': 'action-row'
}
var Hr = ['disabled']
var Kr = defineComponent({
  __name: 'ActionRow',
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { default: 0 }
  },
  emits: ['close-picker', 'select-date', 'select-now'],
  setup(e, { emit: k }) {
    const p = k,
      r = e,
      {
        rootEmit: o,
        rootProps: s,
        modelValue: n,
        defaults: { actionRow: l, multiCalendars: d, inline: B, range: A, multiDates: I, formats: b }
      } = $e(),
      { isTimeValid: i, isMonthValid: M } = at(),
      { buildMatrix: c } = gt(),
      { formatPreview: T } = bt(),
      { checkKeyDown: v, convertType: Y } = Ee(),
      V = useTemplateRef('cancel-btn'),
      P = useTemplateRef('select-btn'),
      F = useTemplateRef('action-buttons-container'),
      q = useTemplateRef('action-row'),
      R = ref(false),
      w = ref({})
    ;(onMounted(() => {
      ;(s.arrowNavigation && c([unrefElement(V), unrefElement(P)], 'actionRow'),
        u(),
        globalThis.addEventListener('resize', u))
    }),
      onUnmounted(() => {
        globalThis.removeEventListener('resize', u)
      }))
    const u = () => {
        ;((R.value = false),
          setTimeout(() => {
            var _a, _b
            const J = (_a = F.value) == null ? void 0 : _a.getBoundingClientRect(),
              W = (_b = q.value) == null ? void 0 : _b.getBoundingClientRect()
            ;(J && W && (w.value.maxWidth = `${W.width - J.width - 20}px`), (R.value = true))
          }, 0))
      },
      D = computed(() => (A.value.enabled && !A.value.partialRange && n.value ? n.value.length === 2 : true)),
      N = computed(() => !i.value(n.value) || !M.value(n.value) || !D.value),
      Q = () => {
        const J = b.value.preview
        return (s.timePicker || s.monthPicker, J(Y(n.value)))
      },
      ae = () => {
        const J = n.value
        return d.value.count > 0 ? `${T(J[0])} - ${T(J[1])}` : [T(J[0]), T(J[1])]
      },
      Z = computed(() =>
        !n.value || !r.menuMount
          ? ''
          : typeof b.value.preview == 'string'
            ? Array.isArray(n.value)
              ? n.value.length === 2 && n.value[1]
                ? ae()
                : I.value.enabled
                  ? n.value.map((J) => `${T(J)}`)
                  : s.modelAuto
                    ? `${T(n.value[0])}`
                    : `${T(n.value[0])} -`
              : T(n.value)
            : Q()
      ),
      ve = () => (I.value.enabled ? '; ' : ' - '),
      he = computed(() => (Array.isArray(Z.value) ? Z.value.join(ve()) : Z.value)),
      L = () => {
        i.value(n.value) && M.value(n.value) && D.value ? p('select-date') : o('invalid-select')
      }
    return (J, W) => (
      openBlock(),
      createElementBlock(
        'div',
        Nr,
        [
          J.$slots['action-row']
            ? renderSlot(
                J.$slots,
                'action-row',
                normalizeProps(
                  mergeProps(
                    { key: 0 },
                    {
                      modelValue: unref(n),
                      disabled: N.value,
                      selectDate: () => J.$emit('select-date'),
                      closePicker: () => J.$emit('close-picker')
                    }
                  )
                )
              )
            : (openBlock(),
              createElementBlock(
                Fragment,
                { key: 1 },
                [
                  unref(l).showPreview
                    ? (openBlock(),
                      createElementBlock(
                        'div',
                        {
                          key: 0,
                          class: 'dp__selection_preview',
                          title: he.value,
                          style: normalizeStyle(w.value)
                        },
                        [
                          J.$slots['action-preview'] && R.value
                            ? renderSlot(J.$slots, 'action-preview', {
                                key: 0,
                                value: unref(n)
                              })
                            : createCommentVNode('', true),
                          !J.$slots['action-preview'] && R.value
                            ? (openBlock(),
                              createElementBlock(
                                Fragment,
                                { key: 1 },
                                [createTextVNode(toDisplayString(he.value), 1)],
                                64
                              ))
                            : createCommentVNode('', true)
                        ],
                        12,
                        Wr
                      ))
                    : createCommentVNode('', true),
                  createBaseVNode(
                    'div',
                    Lr,
                    [
                      J.$slots['action-buttons']
                        ? renderSlot(J.$slots, 'action-buttons', {
                            key: 0,
                            value: unref(n)
                          })
                        : createCommentVNode('', true),
                      J.$slots['action-buttons']
                        ? createCommentVNode('', true)
                        : (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 1 },
                            [
                              !unref(B).enabled && unref(l).showCancel
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 0,
                                      ref: 'cancel-btn',
                                      type: 'button',
                                      class: 'dp__action_button dp__action_cancel',
                                      onClick: W[0] || (W[0] = (oe) => J.$emit('close-picker')),
                                      onKeydown: W[1] || (W[1] = (oe) => unref(v)(oe, () => J.$emit('close-picker')))
                                    },
                                    toDisplayString(unref(l).cancelBtnLabel),
                                    545
                                  ))
                                : createCommentVNode('', true),
                              unref(l).showNow
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 1,
                                      type: 'button',
                                      class: 'dp__action_button dp__action_cancel',
                                      onClick: W[2] || (W[2] = (oe) => J.$emit('select-now')),
                                      onKeydown: W[3] || (W[3] = (oe) => unref(v)(oe, () => J.$emit('select-now')))
                                    },
                                    toDisplayString(unref(l).nowBtnLabel),
                                    33
                                  ))
                                : createCommentVNode('', true),
                              unref(l).showSelect
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 2,
                                      ref: 'select-btn',
                                      type: 'button',
                                      class: 'dp__action_button dp__action_select',
                                      disabled: N.value,
                                      'data-test-id': 'select-button',
                                      onKeydown: W[4] || (W[4] = (oe) => unref(v)(oe, () => L())),
                                      onClick: L
                                    },
                                    toDisplayString(unref(l).selectBtnLabel),
                                    41,
                                    Hr
                                  ))
                                : createCommentVNode('', true)
                            ],
                            64
                          ))
                    ],
                    512
                  )
                ],
                64
              ))
        ],
        512
      )
    )
  }
})
var ra = () => {
  const {
      rootProps: e,
      defaults: { multiCalendars: k }
    } = $e(),
    p = computed(() => (s) => {
      var _a
      return (_a = e.hideNavigation) == null ? void 0 : _a.includes(s)
    }),
    r = computed(() => (s) => (k.value.count ? (k.value.solo ? true : s === 0) : true)),
    o = computed(() => (s) => (k.value.count ? (k.value.solo ? true : s === k.value.count - 1) : true))
  return { hideNavigationButtons: p, showLeftIcon: r, showRightIcon: o }
}
var jr = ['role', 'aria-label', 'tabindex']
var zr = { class: 'dp__selection_grid_header' }
var Ur = ['aria-selected', 'aria-disabled', 'data-test-id', 'onClick', 'onKeydown', 'onMouseover']
var qr = ['aria-label']
var zt = defineComponent({
  __name: 'SelectionOverlay',
  props: {
    items: {},
    type: {},
    isLast: { type: Boolean },
    skipButtonRef: { type: Boolean },
    headerRefs: {},
    useRelative: { type: Boolean },
    height: {},
    noOverlayFocus: { type: Boolean },
    focusValue: {},
    menuWrapRef: {},
    overlayLabel: {}
  },
  emits: ['selected', 'toggle', 'reset-flow', 'hover-value'],
  setup(e, { expose: k, emit: p }) {
    const { setSelectionGrid: r, buildMultiLevelMatrix: o, setMonthPicker: s } = gt(),
      n = p,
      l = e,
      {
        rootProps: d,
        defaults: { ariaLabels: B, textInput: A, config: I }
      } = $e(),
      { hideNavigationButtons: b } = ra(),
      {
        handleEventPropagation: i,
        convertType: M,
        checkKeyDown: c,
        checkStopPropagation: T,
        getElWithin: v,
        findFocusableEl: Y
      } = Ee(),
      V = useTemplateRef('toggle-button'),
      P = useTemplateRef('overlay-container'),
      F = useTemplateRef('grid-wrap'),
      q = ref(false),
      R = ref(null),
      w = ref([]),
      u = ref(),
      D = ref(0)
    ;(onBeforeUpdate(() => {
      R.value = null
    }),
      onMounted(() => {
        ;(nextTick().then(() => J()), l.noOverlayFocus || Q(), N(true))
      }),
      onUnmounted(() => N(false)))
    const N = (E) => {
        var _a
        d.arrowNavigation && (((_a = l.headerRefs) == null ? void 0 : _a.length) ? s(E) : r(E))
      },
      Q = () => {
        var _a
        const E = unrefElement(F)
        E &&
          (A.value.enabled ||
            (R.value
              ? (_a = R.value) == null
                ? void 0
                : _a.focus({ preventScroll: true })
              : E.focus({ preventScroll: true })),
          (q.value = E.clientHeight < E.scrollHeight))
      },
      ae = computed(() => ({
        dp__overlay: true,
        'dp--overlay-absolute': !l.useRelative,
        'dp--overlay-relative': l.useRelative
      })),
      Z = computed(() => (l.useRelative ? { height: `${l.height}px`, width: 'var(--dp-menu-min-width)' } : void 0)),
      ve = computed(() => ({
        dp__overlay_col: true
      })),
      he = computed(() => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: q.value,
        dp__button_bottom: l.isLast
      })),
      L = computed(() => {
        var _a, _b
        return {
          dp__overlay_container: true,
          dp__container_flex: ((_a = l.items) == null ? void 0 : _a.length) <= 6,
          dp__container_block: ((_b = l.items) == null ? void 0 : _b.length) > 6
        }
      })
    watch(
      () => l.items,
      () => J(false),
      { deep: true }
    )
    const J = (E = true) => {
        nextTick().then(() => {
          const ce = unrefElement(R),
            ue = unrefElement(F),
            y = unrefElement(V),
            $ = unrefElement(P),
            ie = y ? y.getBoundingClientRect().height : 0
          ;(ue &&
            (ue.getBoundingClientRect().height
              ? (D.value = ue.getBoundingClientRect().height - ie)
              : (D.value = I.value.modeHeight - ie)),
            ce &&
              $ &&
              E &&
              ($.scrollTop = ce.offsetTop - $.offsetTop - (D.value / 2 - ce.getBoundingClientRect().height) - ie))
        })
      },
      W = (E) => {
        E.disabled || n('selected', E.value)
      },
      oe = () => {
        ;(n('toggle'), n('reset-flow'))
      },
      z = (E) => {
        I.value.escClose && (oe(), i(E, I.value))
      },
      ee = (E, ce, ue, y) => {
        E &&
          ((ce.active || ce.value === l.focusValue) && (R.value = E),
          d.arrowNavigation && (Array.isArray(w.value[ue]) ? (w.value[ue][y] = E) : (w.value[ue] = [E]), fe()))
      },
      fe = () => {
        var _a, _b
        const E = ((_a = l.headerRefs) == null ? void 0 : _a.length)
          ? [l.headerRefs].concat(w.value)
          : w.value.concat([l.skipButtonRef ? [] : [V.value]])
        o(M(E), ((_b = l.headerRefs) == null ? void 0 : _b.length) ? 'monthPicker' : 'selectionGrid')
      },
      ge = (E) => {
        d.arrowNavigation || T(E, I.value, true)
      },
      De = (E) => {
        ;((u.value = E), n('hover-value', E))
      },
      Ae = () => {
        var _a
        if ((oe(), !l.isLast)) {
          const E = v(l.menuWrapRef ?? null, 'action-row')
          E && ((_a = Y(E)) == null ? void 0 : _a.focus())
        }
      },
      re2 = (E) => {
        switch (E.key) {
          case xe.esc:
            return z(E)
          case xe.arrowLeft:
            return ge(E)
          case xe.arrowRight:
            return ge(E)
          case xe.arrowUp:
            return ge(E)
          case xe.arrowDown:
            return ge(E)
          default:
            return
        }
      },
      H = (E) => {
        if (E.key === xe.enter) return oe()
        if (E.key === xe.tab) return Ae()
      }
    return (
      k({ focusGrid: Q }),
      (E, ce) => {
        var _a
        return (
          openBlock(),
          createElementBlock(
            'div',
            {
              ref: 'grid-wrap',
              class: normalizeClass(ae.value),
              style: normalizeStyle(Z.value),
              role: e.useRelative ? void 0 : 'dialog',
              'aria-label': e.overlayLabel,
              tabindex: e.useRelative ? void 0 : '0',
              onKeydown: re2,
              onClick: ce[0] || (ce[0] = withModifiers(() => {}, ['prevent']))
            },
            [
              createBaseVNode(
                'div',
                {
                  ref: 'overlay-container',
                  class: normalizeClass(L.value),
                  style: normalizeStyle({ '--dp-overlay-height': `${D.value}px` }),
                  role: 'grid'
                },
                [
                  createBaseVNode('div', zr, [renderSlot(E.$slots, 'header')]),
                  E.$slots.overlay
                    ? renderSlot(E.$slots, 'overlay', { key: 0 })
                    : (openBlock(true),
                      createElementBlock(
                        Fragment,
                        { key: 1 },
                        renderList(
                          e.items,
                          (ue, y) => (
                            openBlock(),
                            createElementBlock(
                              'div',
                              {
                                key: y,
                                class: normalizeClass(['dp__overlay_row', { dp__flex_row: e.items.length >= 3 }]),
                                role: 'row'
                              },
                              [
                                (openBlock(true),
                                createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(
                                    ue,
                                    ($, ie) => (
                                      openBlock(),
                                      createElementBlock(
                                        'div',
                                        {
                                          key: $.value,
                                          ref_for: true,
                                          ref: (le) => ee(le, $, y, ie),
                                          role: 'gridcell',
                                          class: normalizeClass(ve.value),
                                          'aria-selected': $.active || void 0,
                                          'aria-disabled': $.disabled || void 0,
                                          tabindex: '0',
                                          'data-test-id': $.text,
                                          onClick: withModifiers((le) => W($), ['prevent']),
                                          onKeydown: (le) => unref(c)(le, () => W($), true),
                                          onMouseover: (le) => De($.value)
                                        },
                                        [
                                          createBaseVNode(
                                            'div',
                                            {
                                              class: normalizeClass($.className)
                                            },
                                            [
                                              E.$slots.item
                                                ? renderSlot(E.$slots, 'item', {
                                                    key: 0,
                                                    item: $
                                                  })
                                                : createCommentVNode('', true),
                                              E.$slots.item
                                                ? createCommentVNode('', true)
                                                : (openBlock(),
                                                  createElementBlock(
                                                    Fragment,
                                                    { key: 1 },
                                                    [createTextVNode(toDisplayString($.text), 1)],
                                                    64
                                                  ))
                                            ],
                                            2
                                          )
                                        ],
                                        42,
                                        Ur
                                      )
                                    )
                                  ),
                                  128
                                ))
                              ],
                              2
                            )
                          )
                        ),
                        128
                      ))
                ],
                6
              ),
              E.$slots['button-icon']
                ? withDirectives(
                    (openBlock(),
                    createElementBlock(
                      'button',
                      {
                        key: 0,
                        ref: 'toggle-button',
                        type: 'button',
                        'aria-label': (_a = unref(B)) == null ? void 0 : _a.toggleOverlay,
                        class: normalizeClass(he.value),
                        tabindex: '0',
                        onClick: oe,
                        onKeydown: H
                      },
                      [renderSlot(E.$slots, 'button-icon')],
                      42,
                      qr
                    )),
                    [[vShow, !unref(b)(e.type)]]
                  )
                : createCommentVNode('', true)
            ],
            46,
            jr
          )
        )
      }
    )
  }
})
var Qr = ['data-dp-mobile']
var la = defineComponent({
  __name: 'InstanceWrap',
  props: {
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const {
        defaults: { multiCalendars: k }
      } = $e(),
      { isMobile: p } = aa(),
      r = computed(() => (k.value.count > 0 ? [...new Array(k.value.count).keys()] : [0]))
    return (o, s) => (
      openBlock(),
      createElementBlock(
        'div',
        {
          class: normalizeClass({
            dp__menu_inner: !e.stretch,
            'dp--menu--inner-stretched': e.stretch,
            dp__flex_display: unref(k).count > 0,
            'dp--flex-display-collapsed': e.collapse
          }),
          'data-dp-mobile': unref(p)
        },
        [
          renderSlot(o.$slots, 'default', {
            instances: r.value,
            wrapClass: { dp__instance_calendar: unref(k).count > 0 }
          })
        ],
        10,
        Qr
      )
    )
  }
})
var Gr = ['data-dp-element', 'aria-label', 'aria-disabled']
var Ft = defineComponent({
  __name: 'ArrowBtn',
  props: {
    ariaLabel: {},
    elName: {},
    disabled: { type: Boolean }
  },
  emits: ['activate', 'set-ref'],
  setup(e, { emit: k }) {
    const { checkKeyDown: p } = Ee(),
      r = k,
      o = useTemplateRef('arrow-btn')
    return (
      onMounted(() => r('set-ref', o)),
      (s, n) => (
        openBlock(),
        createElementBlock(
          'button',
          {
            ref: 'arrow-btn',
            type: 'button',
            'data-dp-element': e.elName,
            class: 'dp__btn dp--arrow-btn-nav',
            tabindex: '0',
            'aria-label': e.ariaLabel,
            'aria-disabled': e.disabled || void 0,
            onClick: n[0] || (n[0] = (l) => r('activate')),
            onKeydown: n[1] || (n[1] = (l) => unref(p)(l, () => r('activate'), true))
          },
          [
            createBaseVNode(
              'span',
              {
                class: normalizeClass(['dp__inner_nav', { dp__inner_nav_disabled: e.disabled }])
              },
              [renderSlot(s.$slots, 'default')],
              2
            )
          ],
          40,
          Gr
        )
      )
    )
  }
})
var Jr = ['aria-label', 'data-test-id']
var za = defineComponent({
  __name: 'YearModePicker',
  props: {
    items: {},
    instance: {},
    year: {},
    showYearPicker: { type: Boolean, default: false },
    isDisabled: {}
  },
  emits: ['handle-year', 'year-select', 'toggle-year-picker'],
  setup(e, { emit: k }) {
    const p = k,
      r = e,
      { showRightIcon: o, showLeftIcon: s } = ra(),
      {
        rootProps: n,
        defaults: { config: l, ariaLabels: d, ui: B }
      } = $e(),
      { showTransition: A, transitionName: I } = Kt(),
      { formatYear: b } = bt(),
      i = ref(false),
      M = computed(() => b(r.year)),
      c = (Y = false, V) => {
        ;((i.value = !i.value), p('toggle-year-picker', { flow: Y, show: V }))
      },
      T = (Y) => {
        ;((i.value = false), p('year-select', Y))
      },
      v = (Y = false) => {
        p('handle-year', Y)
      }
    return (Y, V) => {
      var _a, _b, _c, _d, _e
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(['dp--year-mode-picker', { 'dp--hidden-el': i.value }])
              },
              [
                unref(s)(e.instance)
                  ? (openBlock(),
                    createBlock(
                      Ft,
                      {
                        key: 0,
                        ref: 'mpPrevIconRef',
                        'aria-label': (_a = unref(d)) == null ? void 0 : _a.prevYear,
                        disabled: e.isDisabled(false),
                        class: normalizeClass((_b = unref(B)) == null ? void 0 : _b.navBtnPrev),
                        onActivate: V[0] || (V[0] = (P) => v(false))
                      },
                      {
                        default: withCtx(() => [
                          Y.$slots['arrow-left']
                            ? renderSlot(Y.$slots, 'arrow-left', { key: 0 })
                            : createCommentVNode('', true),
                          Y.$slots['arrow-left']
                            ? createCommentVNode('', true)
                            : (openBlock(), createBlock(unref(Na), { key: 1 }))
                        ]),
                        _: 3
                      },
                      8,
                      ['aria-label', 'disabled', 'class']
                    ))
                  : createCommentVNode('', true),
                createBaseVNode(
                  'button',
                  {
                    ref: 'mpYearButtonRef',
                    class: 'dp__btn dp--year-select',
                    type: 'button',
                    'aria-label': `${e.year}-${(_c = unref(d)) == null ? void 0 : _c.openYearsOverlay}`,
                    'data-test-id': `year-mode-btn-${e.instance}`,
                    onClick: V[1] || (V[1] = () => c(false)),
                    onKeydown: V[2] || (V[2] = withKeys(() => c(false), ['enter']))
                  },
                  [
                    Y.$slots.year
                      ? renderSlot(Y.$slots, 'year', {
                          key: 0,
                          text: M.value,
                          value: e.year
                        })
                      : createCommentVNode('', true),
                    Y.$slots.year
                      ? createCommentVNode('', true)
                      : (openBlock(),
                        createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(e.year), 1)], 64))
                  ],
                  40,
                  Jr
                ),
                unref(o)(e.instance)
                  ? (openBlock(),
                    createBlock(
                      Ft,
                      {
                        key: 1,
                        ref: 'mpNextIconRef',
                        'aria-label': (_d = unref(d)) == null ? void 0 : _d.nextYear,
                        disabled: e.isDisabled(true),
                        class: normalizeClass((_e = unref(B)) == null ? void 0 : _e.navBtnNext),
                        onActivate: V[3] || (V[3] = (P) => v(true))
                      },
                      {
                        default: withCtx(() => [
                          Y.$slots['arrow-right']
                            ? renderSlot(Y.$slots, 'arrow-right', { key: 0 })
                            : createCommentVNode('', true),
                          Y.$slots['arrow-right']
                            ? createCommentVNode('', true)
                            : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                        ]),
                        _: 3
                      },
                      8,
                      ['aria-label', 'disabled', 'class']
                    ))
                  : createCommentVNode('', true)
              ],
              2
            ),
            createVNode(
              Transition,
              {
                name: unref(I)(e.showYearPicker),
                css: unref(A)
              },
              {
                default: withCtx(() => {
                  var _a2, _b2
                  return [
                    e.showYearPicker
                      ? (openBlock(),
                        createBlock(
                          zt,
                          {
                            key: 0,
                            items: e.items,
                            config: unref(l),
                            'is-last': unref(n).autoApply && !unref(l).keepActionRow,
                            'overlay-label':
                              (_b2 = (_a2 = unref(d)) == null ? void 0 : _a2.yearPicker) == null
                                ? void 0
                                : _b2.call(_a2, true),
                            type: 'year',
                            onToggle: c,
                            onSelected: V[4] || (V[4] = (P) => T(P))
                          },
                          createSlots(
                            {
                              'button-icon': withCtx(() => [
                                Y.$slots['calendar-icon']
                                  ? renderSlot(Y.$slots, 'calendar-icon', { key: 0 })
                                  : createCommentVNode('', true),
                                Y.$slots['calendar-icon']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Ht), { key: 1 }))
                              ]),
                              _: 2
                            },
                            [
                              Y.$slots['year-overlay-value']
                                ? {
                                    name: 'item',
                                    fn: withCtx(({ item: P }) => [
                                      renderSlot(Y.$slots, 'year-overlay-value', {
                                        text: P.text,
                                        value: P.value
                                      })
                                    ]),
                                    key: '0'
                                  }
                                : void 0
                            ]
                          ),
                          1032,
                          ['items', 'config', 'is-last', 'overlay-label']
                        ))
                      : createCommentVNode('', true)
                  ]
                }),
                _: 3
              },
              8,
              ['name', 'css']
            )
          ],
          64
        )
      )
    }
  }
})
var Ua = (e) => {
  const {
      getDate: k,
      rootEmit: p,
      state: r,
      month: o,
      year: s,
      modelValue: n,
      calendars: l,
      rootProps: d,
      defaults: { multiCalendars: B, range: A, safeDates: I, filters: b, highlight: i }
    } = $e(),
    { resetDate: M, getYearFromDate: c, checkHighlightYear: T, groupListAndMap: v } = je(),
    { getYears: Y } = na(),
    { validateMonthYear: V, checkMinMaxValue: P } = at(),
    F = ref([false]),
    q = computed(() => Y()),
    R = computed(() => (z, ee) => {
      const fe = set(M(k()), {
          month: o.value(z),
          year: s.value(z)
        }),
        ge = ee ? endOfYear(fe) : startOfYear(fe)
      return V(ge, d.preventMinMaxNavigation, ee)
    }),
    w = () => Array.isArray(n.value) && B.value.solo && n.value[1],
    u = () => {
      for (let z = 0; z < B.value.count; z++)
        if (z === 0) l.value[z] = l.value[0]
        else if (z === B.value.count - 1 && w())
          l.value[z] = {
            month: getMonth(n.value[1]),
            year: getYear(n.value[1])
          }
        else {
          const ee = set(k(), l.value[z - 1])
          l.value[z] = { month: getMonth(ee), year: getYear(addYears(ee, 1)) }
        }
    },
    D = (z) => {
      if (!z) return u()
      const ee = set(k(), l.value[z])
      return ((l.value[0].year = getYear(subYears(ee, B.value.count - 1))), u())
    },
    N = (z, ee) => {
      const fe = differenceInYears(ee, z)
      return A.value.showLastInRange && fe > 1 ? ee : z
    },
    Q = (z) => (d.focusStartDate || B.value.solo ? z[0] : z[1] ? N(z[0], z[1]) : z[0]),
    ae = () => {
      if (n.value) {
        const z = Array.isArray(n.value) ? Q(n.value) : n.value
        l.value[0] = { month: getMonth(z), year: getYear(z) }
      }
    },
    Z = () => {
      ;(ae(), B.value.count && u())
    }
  ;(watch(n, (z, ee) => {
    r.isTextInputDate && JSON.stringify(z ?? {}) !== JSON.stringify(ee ?? {}) && Z()
  }),
    onMounted(() => {
      Z()
    }))
  const ve = (z, ee) => {
      ;((l.value[ee].year = z),
        p('update-month-year', { instance: ee, year: z, month: l.value[ee].month }),
        B.value.count && !B.value.solo && D(ee))
    },
    he = computed(
      () => (z) =>
        v(q.value, (ee) => {
          var _a
          const fe = s.value(z) === ee.value,
            ge =
              P(ee.value, c(I.value.minDate), c(I.value.maxDate)) ||
              ((_a = b.value.years) == null ? void 0 : _a.includes(s.value(z))),
            De = T(i.value, ee.value)
          return { active: fe, disabled: ge, highlighted: De }
        })
    ),
    L = (z, ee) => {
      ;(ve(z, ee), W(ee))
    },
    J = (z, ee = false) => {
      if (!R.value(z, ee)) {
        const fe = ee ? s.value(z) + 1 : s.value(z) - 1
        ve(fe, z)
      }
    },
    W = (z, ee = false, fe) => {
      ;(ee || e('reset-flow'),
        fe === void 0 ? (F.value[z] = !F.value[z]) : (F.value[z] = fe),
        F.value[z]
          ? p('overlay-toggle', { open: true, overlay: qe.year })
          : p('overlay-toggle', { open: false, overlay: qe.year }))
    }
  return {
    isDisabled: R,
    groupedYears: he,
    showYearPicker: F,
    selectYear: ve,
    setStartDate: () => {
      d.startDate && ((n.value && d.focusStartDate) || !n.value) && ve(getYear(k(d.startDate)), 0)
    },
    toggleYearPicker: W,
    handleYearSelect: L,
    handleYear: J
  }
}
var oa = () => {
  const { isDateAfter: e, isDateBefore: k, isDateEqual: p } = je(),
    {
      getDate: r,
      rootEmit: o,
      rootProps: s,
      modelValue: n,
      defaults: { range: l }
    } = $e()
  return {
    getRangeWithFixedDate: (i) =>
      Array.isArray(n.value) && (n.value.length === 2 || (n.value.length === 1 && l.value.partialRange))
        ? l.value.fixedStart && (e(i, n.value[0]) || p(i, n.value[0]))
          ? [n.value[0], i]
          : l.value.fixedEnd && (k(i, n.value[1]) || p(i, n.value[1]))
            ? [i, n.value[1]]
            : (o('invalid-fixed-range', i), n.value)
        : [],
    setPresetDate: (i) => {
      Array.isArray(i.value) && i.value.length <= 2 && l.value.enabled
        ? (n.value = i.value.map((M) => r(M)))
        : Array.isArray(i.value) || (n.value = r(i.value))
    },
    checkRangeAutoApply: (i, M, c) => {
      l &&
        (i[0] && i[1] && s.autoApply && M('auto-apply', c),
        i[0] && !i[1] && (s.modelAuto || l.value.partialRange) && s.autoApply && M('auto-apply', c))
    },
    setMonthOrYearRange: (i) => {
      let M = n.value ? n.value.slice() : []
      return (
        M.length === 2 && M[1] !== null && (M = []),
        M.length ? (k(i, M[0]) ? M.unshift(i) : (M[1] = i), o('range-end', i)) : ((M = [i]), o('range-start', i)),
        M
      )
    },
    handleMultiDatesSelect: (i, M) => {
      if (n.value && Array.isArray(n.value))
        if (n.value.some((c) => p(i, c))) {
          const c = n.value.filter((T) => !p(T, i))
          n.value = c.length ? c : null
        } else ((M && +M > n.value.length) || !M) && n.value.push(i)
      else n.value = [i]
    }
  }
}
var Xr = (e, k) => {
  const {
    getDate: p,
    rootEmit: r,
    state: o,
    calendars: s,
    year: n,
    modelValue: l,
    rootProps: d,
    defaults: { range: B, highlight: A, safeDates: I, filters: b, multiDates: i }
  } = $e()
  jt(() => {
    o.isTextInputDate && L(getYear(p(d.startDate)), 0)
  })
  const { checkMinMaxRange: M, checkMinMaxValue: c } = at(),
    {
      isDateBetween: T,
      resetDateTime: v,
      resetDate: Y,
      getMinMonth: V,
      getMaxMonth: P,
      checkHighlightMonth: F,
      groupListAndMap: q
    } = je(),
    {
      checkRangeAutoApply: R,
      getRangeWithFixedDate: w,
      handleMultiDatesSelect: u,
      setMonthOrYearRange: D,
      setPresetDate: N
    } = oa(),
    { padZero: Q } = Ee(),
    { getMonths: ae, isOutOfYearRange: Z } = na(),
    ve = computed(() => ae()),
    he = ref(null),
    {
      selectYear: L,
      groupedYears: J,
      showYearPicker: W,
      toggleYearPicker: oe,
      handleYearSelect: z,
      handleYear: ee,
      isDisabled: fe,
      setStartDate: ge
    } = Ua(k)
  onMounted(() => {
    ge()
  })
  const De = (a) => (a ? { month: getMonth(a), year: getYear(a) } : { month: null, year: null }),
    Ae = () => (l.value ? (Array.isArray(l.value) ? l.value.map((a) => De(a)) : De(l.value)) : De()),
    re2 = (a, f) => {
      const S = s.value[a],
        te = Ae()
      return Array.isArray(te)
        ? te.some((ne) => ne.year === (S == null ? void 0 : S.year) && ne.month === f)
        : (S == null ? void 0 : S.year) === te.year && f === te.month
    },
    H = (a, f, S) => {
      var _a, _b
      const te = Ae()
      return Array.isArray(te)
        ? n.value(f) === ((_a = te[S]) == null ? void 0 : _a.year) && a === ((_b = te[S]) == null ? void 0 : _b.month)
        : false
    },
    E = (a, f) => {
      if (B.value.enabled) {
        const S = Ae()
        if (Array.isArray(l.value) && Array.isArray(S)) {
          const te = H(a, f, 0) || H(a, f, 1),
            ne = set(Y(p()), { month: a, year: n.value(f) })
          return T(l.value, he.value, ne) && !te
        }
        return false
      }
      return false
    },
    ce = computed(
      () => (a) =>
        q(ve.value, (f) => {
          var _a
          const S = re2(a, f.value),
            te =
              c(f.value, V(n.value(a), I.value.minDate), P(n.value(a), I.value.maxDate)) ||
              C(I.value.disabledDates, n.value(a), f.value) ||
              ((_a = b.value.months) == null ? void 0 : _a.includes(f.value)) ||
              !G(I.value.allowedDates, n.value(a), f.value) ||
              Z(n.value(a)),
            ne = E(f.value, a),
            Ce = F(A.value, f.value, n.value(a))
          return { active: S, disabled: te, isBetween: ne, highlighted: Ce }
        })
    ),
    ue = (a, f) => set(Y(p()), { month: a, year: n.value(f) }),
    y = (a, f) => {
      const S = l.value ? l.value : Y(p())
      ;((l.value = set(S, { month: a, year: n.value(f) })), k('auto-apply'), k('update-flow-step'))
    },
    $ = (a, f) => {
      const S = ue(a, f)
      ;(B.value.fixedEnd || B.value.fixedStart
        ? (l.value = w(S))
        : l.value
          ? M(S, l.value) && (l.value = D(ue(a, f)))
          : (l.value = [ue(a, f)]),
        nextTick().then(() => {
          R(l.value, k, l.value.length < 2)
        }))
    },
    ie = (a, f) => {
      ;(u(ue(a, f), i.value.limit), k('auto-apply', true))
    },
    le = (a, f) => (
      (s.value[f].month = a),
      m(f, s.value[f].year, a),
      i.value.enabled ? ie(a, f) : B.value.enabled ? $(a, f) : y(a, f)
    ),
    h2 = (a, f) => {
      ;(L(a, f), m(f, a, null))
    },
    m = (a, f, S) => {
      let te = S
      if (!te && te !== 0) {
        const ne = Ae()
        te = Array.isArray(ne) ? ne[a].month : ne.month
      }
      r('update-month-year', { instance: a, year: f, month: te })
    },
    x = (a, f) => {
      he.value = ue(a, f)
    },
    g = (a) => {
      ;(N({
        value: a
      }),
        k('auto-apply'))
    },
    C = (a, f, S) => {
      if (a instanceof Map) {
        const te = `${Q(S + 1)}-${f}`
        return a.size ? a.has(te) : false
      }
      return typeof a == 'function' ? a(v(set(p(), { month: S, year: f }), true)) : false
    },
    G = (a, f, S) => {
      if (a instanceof Map) {
        const te = `${Q(S + 1)}-${f}`
        return a.size ? a.has(te) : true
      }
      return true
    }
  return {
    groupedMonths: ce,
    groupedYears: J,
    year: n,
    isDisabled: fe,
    showYearPicker: W,
    modelValue: l,
    toggleYearPicker: oe,
    handleYearSelect: z,
    handleYear: ee,
    presetDate: g,
    setHoverDate: x,
    selectMonth: le,
    selectYear: h2,
    getModelMonthYear: Ae
  }
}
var Zr = defineComponent({
  __name: 'MonthPicker',
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ['reset-flow', 'auto-apply', 'update-flow-step', 'mount'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      s = useSlots(),
      { mapSlots: n } = yt(),
      {
        rootProps: l,
        defaults: { config: d }
      } = $e(),
      B = n(s, 'yearMode')
    onMounted(() => {
      r('mount')
    })
    const {
      groupedMonths: A,
      groupedYears: I,
      year: b,
      isDisabled: i,
      showYearPicker: M,
      modelValue: c,
      presetDate: T,
      setHoverDate: v,
      selectMonth: Y,
      selectYear: V,
      toggleYearPicker: P,
      handleYearSelect: F,
      handleYear: q,
      getModelMonthYear: R
    } = Xr(o, r)
    return (
      k({
        getSidebarProps: () => ({
          modelValue: c,
          year: b,
          getModelMonthYear: R,
          selectMonth: Y,
          selectYear: V,
          handleYear: q
        }),
        presetDate: T,
        toggleYearPicker: (u) => P(0, u)
      }),
      (u, D) => (
        openBlock(),
        createBlock(
          la,
          {
            collapse: e.collapse,
            stretch: ''
          },
          {
            default: withCtx(({ instances: N, wrapClass: Q }) => [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(
                  N,
                  (ae) => (
                    openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: ae,
                        class: normalizeClass(Q)
                      },
                      [
                        u.$slots['top-extra']
                          ? renderSlot(u.$slots, 'top-extra', {
                              key: 0,
                              value: unref(c)
                            })
                          : createCommentVNode('', true),
                        u.$slots['month-year']
                          ? renderSlot(
                              u.$slots,
                              'month-year',
                              mergeProps(
                                {
                                  key: 1,
                                  ref_for: true
                                },
                                {
                                  year: unref(b),
                                  months: unref(A)(ae),
                                  years: unref(I)(ae),
                                  selectMonth: unref(Y),
                                  selectYear: unref(V),
                                  instance: ae
                                }
                              )
                            )
                          : (openBlock(),
                            createBlock(
                              zt,
                              {
                                key: 2,
                                items: unref(A)(ae),
                                'is-last': unref(l).autoApply && !unref(d).keepActionRow,
                                height: unref(d).modeHeight,
                                'no-overlay-focus': !!(e.noOverlayFocus || unref(l).textInput),
                                'use-relative': '',
                                type: 'month',
                                onSelected: (Z) => unref(Y)(Z, ae),
                                onHoverValue: (Z) => unref(v)(Z, ae)
                              },
                              createSlots(
                                {
                                  header: withCtx(() => [
                                    createVNode(
                                      za,
                                      {
                                        items: unref(I)(ae),
                                        instance: ae,
                                        'show-year-picker': unref(M)[ae],
                                        year: unref(b)(ae),
                                        'is-disabled': (Z) => unref(i)(ae, Z),
                                        onHandleYear: (Z) => unref(q)(ae, Z),
                                        onYearSelect: (Z) => unref(F)(Z, ae),
                                        onToggleYearPicker: (Z) =>
                                          unref(P)(ae, Z == null ? void 0 : Z.flow, Z == null ? void 0 : Z.show)
                                      },
                                      createSlots({ _: 2 }, [
                                        renderList(unref(B), (Z, ve) => ({
                                          name: Z,
                                          fn: withCtx((he) => [
                                            renderSlot(u.$slots, Z, mergeProps({ ref_for: true }, he))
                                          ])
                                        }))
                                      ]),
                                      1032,
                                      [
                                        'items',
                                        'instance',
                                        'show-year-picker',
                                        'year',
                                        'is-disabled',
                                        'onHandleYear',
                                        'onYearSelect',
                                        'onToggleYearPicker'
                                      ]
                                    )
                                  ]),
                                  _: 2
                                },
                                [
                                  u.$slots['month-overlay-value']
                                    ? {
                                        name: 'item',
                                        fn: withCtx(({ item: Z }) => [
                                          renderSlot(u.$slots, 'month-overlay-value', {
                                            text: Z.text,
                                            value: Z.value
                                          })
                                        ]),
                                        key: '0'
                                      }
                                    : void 0
                                ]
                              ),
                              1032,
                              ['items', 'is-last', 'height', 'no-overlay-focus', 'onSelected', 'onHoverValue']
                            ))
                      ],
                      2
                    )
                  )
                ),
                128
              ))
            ]),
            _: 3
          },
          8,
          ['collapse']
        )
      )
    )
  }
})
var el = (e, k) => {
  const {
      rootEmit: p,
      getDate: r,
      state: o,
      modelValue: s,
      rootProps: n,
      defaults: { highlight: l, multiDates: d, filters: B, range: A, safeDates: I }
    } = $e(),
    { getYears: b } = na(),
    {
      isDateBetween: i,
      resetDate: M,
      resetDateTime: c,
      getYearFromDate: T,
      checkHighlightYear: v,
      groupListAndMap: Y
    } = je(),
    { checkRangeAutoApply: V, setMonthOrYearRange: P } = oa(),
    { checkMinMaxValue: F, checkMinMaxRange: q } = at()
  jt(() => {
    o.isTextInputDate && (w.value = getYear(r(n.startDate)))
  })
  const R = ref(null),
    w = ref()
  onMounted(() => {
    n.startDate && ((s.value && n.focusStartDate) || !s.value) && (w.value = getYear(r(n.startDate)))
  })
  const u = (L) =>
      Array.isArray(s.value) ? s.value.some((J) => getYear(J) === L) : s.value ? getYear(s.value) === L : false,
    D = (L) => (A.value.enabled && Array.isArray(s.value) ? i(s.value, R.value, Z(L)) : false),
    N = (L) => {
      var _a
      return ((_a = I.value.allowedDates) == null ? void 0 : _a.size) ? I.value.allowedDates.has(`${L}`) : true
    },
    Q = (L) =>
      I.value.disabledDates instanceof Map
        ? I.value.disabledDates.size
          ? I.value.disabledDates.has(`${L}`)
          : false
        : typeof I.value.disabledDates == 'function'
          ? I.value.disabledDates(setYear(c(startOfYear(r())), L))
          : true,
    ae = computed(() =>
      Y(b(), (L) => {
        const J = u(L.value),
          W =
            F(L.value, T(I.value.minDate), T(I.value.maxDate)) ||
            B.value.years.includes(L.value) ||
            !N(L.value) ||
            Q(L.value),
          oe = D(L.value) && !J,
          z = v(l.value, L.value)
        return { active: J, disabled: W, isBetween: oe, highlighted: z }
      })
    ),
    Z = (L) => setYear(M(startOfYear(r())), L)
  return {
    groupedYears: ae,
    focusYear: w,
    setHoverValue: (L) => {
      R.value = setYear(M(r()), L)
    },
    selectYear: (L) => {
      var _a
      if ((p('update-month-year', { instance: 0, year: L, month: Number.NaN }), d.value.enabled))
        return (
          s.value
            ? Array.isArray(s.value) &&
              (((_a = s.value) == null ? void 0 : _a.map((W) => getYear(W))).includes(L)
                ? (s.value = s.value.filter((W) => getYear(W) !== L))
                : s.value.push(setYear(c(r()), L)))
            : (s.value = [setYear(c(startOfYear(r())), L)]),
          k('auto-apply', true)
        )
      A.value.enabled
        ? q(Z(L), s.value) &&
          ((s.value = P(Z(L))),
          nextTick().then(() => {
            V(s.value, k, s.value.length < 2)
          }))
        : ((s.value = Z(L)), k('auto-apply'))
    }
  }
}
var tl = defineComponent({
  __name: 'YearPicker',
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ['reset-flow', 'auto-apply'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      {
        modelValue: s,
        defaults: { config: n },
        rootProps: l
      } = $e(),
      { groupedYears: d, focusYear: B, selectYear: A, setHoverValue: I } = el(o, r)
    return (
      k({
        getSidebarProps: () => ({
          modelValue: s,
          selectYear: A
        })
      }),
      (i, M) => (
        openBlock(),
        createElementBlock('div', null, [
          i.$slots['top-extra']
            ? renderSlot(i.$slots, 'top-extra', {
                key: 0,
                value: unref(s)
              })
            : createCommentVNode('', true),
          i.$slots['month-year']
            ? renderSlot(
                i.$slots,
                'month-year',
                normalizeProps(
                  mergeProps(
                    { key: 1 },
                    {
                      years: unref(d),
                      selectYear: unref(A)
                    }
                  )
                )
              )
            : (openBlock(),
              createBlock(
                zt,
                {
                  key: 2,
                  items: unref(d),
                  'is-last': unref(l).autoApply && !unref(n).keepActionRow,
                  height: unref(n).modeHeight,
                  'no-overlay-focus': !!(e.noOverlayFocus || unref(l).textInput),
                  'focus-value': unref(B),
                  type: 'year',
                  'use-relative': '',
                  onSelected: unref(A),
                  onHoverValue: unref(I)
                },
                createSlots({ _: 2 }, [
                  i.$slots['year-overlay-value']
                    ? {
                        name: 'item',
                        fn: withCtx(({ item: c }) => [
                          renderSlot(i.$slots, 'year-overlay-value', {
                            text: c.text,
                            value: c.value
                          })
                        ]),
                        key: '0'
                      }
                    : void 0
                ]),
                1032,
                ['items', 'is-last', 'height', 'no-overlay-focus', 'focus-value', 'onSelected', 'onHoverValue']
              ))
        ])
      )
    )
  }
})
var al = {
  key: 0,
  class: 'dp__time_input'
}
var nl = ['data-compact', 'data-collapsed']
var rl = ['data-test-id', 'aria-label', 'onKeydown', 'onClick', 'onMousedown']
var ll = ['aria-label', 'disabled', 'data-test-id', 'onKeydown', 'onClick']
var ol = ['data-test-id', 'aria-label', 'onKeydown', 'onClick', 'onMousedown']
var sl = { key: 0 }
var ul = ['aria-label', 'data-compact']
var il = defineComponent({
  __name: 'TimeInput',
  props: {
    hours: {},
    minutes: {},
    seconds: {},
    order: {},
    closeTimePickerBtn: {},
    disabledTimesConfig: {},
    validateTime: {}
  },
  emits: [
    'update:hours',
    'update:minutes',
    'update:seconds',
    'overlay-opened',
    'overlay-closed',
    'set-hours',
    'set-minutes',
    'reset-flow',
    'mounted'
  ],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      { setTimePickerElements: s, setTimePickerBackRef: n } = gt(),
      {
        getDate: l,
        rootEmit: d,
        rootProps: B,
        defaults: { ariaLabels: A, filters: I, config: b, range: i, multiCalendars: M, timeConfig: c }
      } = $e(),
      { checkKeyDown: T, hoursToAmPmHours: v } = Ee(),
      { sanitizeTime: Y, groupListAndMap: V } = je(),
      { transitionName: P, showTransition: F } = Kt(),
      q = reactive({
        hours: false,
        minutes: false,
        seconds: false
      }),
      R = ref('AM'),
      w = ref(null),
      u = ref([]),
      D = ref(),
      N = ref(false)
    onMounted(() => {
      r('mounted')
    })
    const Q = (a) =>
        set(l(), {
          hours: a.hours,
          minutes: a.minutes,
          seconds: c.value.enableSeconds ? a.seconds : 0,
          milliseconds: 0
        }),
      ae = computed(() => (a) => Ae(a, o[a]) || ve(a, o[a])),
      Z = computed(() => ({ hours: o.hours, minutes: o.minutes, seconds: o.seconds })),
      ve = (a, f) => (i.value.enabled && !i.value.disableTimeRangeValidation ? !o.validateTime(a, f) : false),
      he = (a, f) => {
        if (i.value.enabled && !i.value.disableTimeRangeValidation) {
          const S = f ? +c.value[`${a}Increment`] : -+c.value[`${a}Increment`],
            te = o[a] + S
          return !o.validateTime(a, te)
        }
        return false
      },
      L = computed(() => (a) => !ue(+o[a] + +c.value[`${a}Increment`], a) || he(a, true)),
      J = computed(() => (a) => !ue(+o[a] - +c.value[`${a}Increment`], a) || he(a, false)),
      W = (a, f) => add(set(l(), a), f),
      oe = (a, f) => sub(set(l(), a), f),
      z = computed(() => ({
        dp__time_col: true,
        dp__time_col_block: !c.value.timePickerInline,
        dp__time_col_reg_block: !c.value.enableSeconds && c.value.is24 && !c.value.timePickerInline,
        dp__time_col_reg_inline: !c.value.enableSeconds && c.value.is24 && c.value.timePickerInline,
        dp__time_col_reg_with_button: !c.value.enableSeconds && !c.value.is24,
        dp__time_col_sec: c.value.enableSeconds && c.value.is24,
        dp__time_col_sec_with_button: c.value.enableSeconds && !c.value.is24
      })),
      ee = computed(() => c.value.timePickerInline && i.value.enabled && !M.value.count),
      fe = computed(() => {
        const a = [{ type: 'hours' }]
        return (
          c.value.enableMinutes &&
            a.push(
              { type: '', separator: true },
              {
                type: 'minutes'
              }
            ),
          c.value.enableSeconds &&
            a.push(
              { type: '', separator: true },
              {
                type: 'seconds'
              }
            ),
          a
        )
      }),
      ge = computed(() => fe.value.filter((a) => !a.separator)),
      De = computed(() => (a) => {
        if (a === 'hours') {
          const f = m(+o.hours)
          return { text: f < 10 ? `0${f}` : `${f}`, value: f }
        }
        return { text: o[a] < 10 ? `0${o[a]}` : `${o[a]}`, value: o[a] }
      }),
      Ae = (a, f) => {
        var _a
        if (!o.disabledTimesConfig) return false
        const S = o.disabledTimesConfig(o.order, a === 'hours' ? f : void 0)
        return S[a] ? !!((_a = S[a]) == null ? void 0 : _a.includes(f)) : true
      },
      re2 = (a, f) => (f !== 'hours' || R.value === 'AM' ? a : a + 12),
      H = (a) => {
        const f = c.value.is24 ? 24 : 12,
          S = a === 'hours' ? f : 60,
          te = +c.value[`${a}GridIncrement`],
          ne = a === 'hours' && !c.value.is24 ? te : 0,
          Ce = []
        for (let Fe = ne; Fe < S; Fe += te)
          Ce.push({
            value: c.value.is24 ? Fe : re2(Fe, a),
            text: Fe < 10 ? `0${Fe}` : `${Fe}`
          })
        return (
          a === 'hours' && !c.value.is24 && Ce.unshift({ value: R.value === 'PM' ? 12 : 0, text: '12' }),
          V(Ce, (Fe) => ({
            active: false,
            disabled: I.value.times[a].includes(Fe.value) || !ue(Fe.value, a) || Ae(a, Fe.value) || ve(a, Fe.value)
          }))
        )
      },
      E = (a) => (a >= 0 ? a : 59),
      ce = (a) => (a >= 0 ? a : 23),
      ue = (a, f) => {
        const S = B.minTime ? Q(Y(B.minTime)) : null,
          te = B.maxTime ? Q(Y(B.maxTime)) : null,
          ne = Q(Y(Z.value, f, f === 'minutes' || f === 'seconds' ? E(a) : ce(a)))
        return S && te
          ? (isBefore(ne, te) || isEqual(ne, te)) && (isAfter(ne, S) || isEqual(ne, S))
          : S
            ? isAfter(ne, S) || isEqual(ne, S)
            : te
              ? isBefore(ne, te) || isEqual(ne, te)
              : true
      },
      y = (a) => c.value[`no${a[0].toUpperCase() + a.slice(1)}Overlay`],
      $ = (a) => {
        y(a) ||
          ((q[a] = !q[a]),
          q[a] ? ((N.value = true), r('overlay-opened', a)) : ((N.value = false), r('overlay-closed', a)))
      },
      ie = (a) => (a === 'hours' ? getHours : a === 'minutes' ? getMinutes : getSeconds),
      le = () => {
        D.value && clearTimeout(D.value)
      },
      h2 = (a, f = true, S) => {
        const te = f ? W : oe,
          ne = f ? +c.value[`${a}Increment`] : -+c.value[`${a}Increment`]
        ;(ue(+o[a] + ne, a) && r(`update:${a}`, ie(a)(te({ [a]: +o[a] }, { [a]: +c.value[`${a}Increment`] }))),
          !(S == null ? void 0 : S.keyboard) &&
            b.value.timeArrowHoldThreshold &&
            (D.value = setTimeout(() => {
              h2(a, f)
            }, b.value.timeArrowHoldThreshold)))
      },
      m = (a) => (c.value.is24 ? a : (a >= 12 ? (R.value = 'PM') : (R.value = 'AM'), v(a))),
      x = () => {
        ;(R.value === 'PM'
          ? ((R.value = 'AM'), r('update:hours', o.hours - 12))
          : ((R.value = 'PM'), r('update:hours', o.hours + 12)),
          d('am-pm-change', R.value))
      },
      g = (a) => {
        q[a] = true
      },
      C = (a, f, S) => {
        if (a && B.arrowNavigation) {
          Array.isArray(u.value[f]) ? (u.value[f][S] = a) : (u.value[f] = [a])
          const te = u.value.reduce((ne, Ce) => Ce.map((Fe, kt) => [...(ne[kt] || []), Ce[kt]]), [])
          ;(n(o.closeTimePickerBtn), w.value && (te[1] = te[1].concat(w.value)), s(te, o.order))
        }
      },
      G = (a, f) => ($(a), r(`update:${a}`, f))
    return (
      k({ openChildCmp: g }),
      (a, f) => {
        var _a
        return unref(B).disabled
          ? createCommentVNode('', true)
          : (openBlock(),
            createElementBlock('div', al, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(fe.value, (S, te) => {
                  var _a2, _b, _c
                  return (
                    openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: te,
                        class: normalizeClass(z.value),
                        'data-compact': ee.value && !unref(c).enableSeconds,
                        'data-collapsed': ee.value && unref(c).enableSeconds
                      },
                      [
                        S.separator
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 0 },
                              [
                                N.value
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(':')], 64))
                              ],
                              64
                            ))
                          : (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 1 },
                              [
                                createBaseVNode(
                                  'button',
                                  {
                                    ref_for: true,
                                    ref: (ne) => C(ne, te, 0),
                                    type: 'button',
                                    class: normalizeClass({
                                      dp__btn: true,
                                      dp__inc_dec_button: !unref(c).timePickerInline,
                                      dp__inc_dec_button_inline: unref(c).timePickerInline,
                                      dp__tp_inline_btn_top: unref(c).timePickerInline,
                                      dp__inc_dec_button_disabled: L.value(S.type),
                                      'dp--hidden-el': N.value
                                    }),
                                    'data-test-id': `${S.type}-time-inc-btn-${o.order}`,
                                    'aria-label': (_a2 = unref(A)) == null ? void 0 : _a2.incrementValue(S.type),
                                    tabindex: '0',
                                    onKeydown: (ne) => unref(T)(ne, () => h2(S.type, true, { keyboard: true }), true),
                                    onClick: (ne) => (unref(b).timeArrowHoldThreshold ? void 0 : h2(S.type, true)),
                                    onMousedown: (ne) => (unref(b).timeArrowHoldThreshold ? h2(S.type, true) : void 0),
                                    onMouseup: le
                                  },
                                  [
                                    unref(c).timePickerInline
                                      ? (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 1 },
                                          [
                                            a.$slots['tp-inline-arrow-up']
                                              ? renderSlot(a.$slots, 'tp-inline-arrow-up', { key: 0 })
                                              : (openBlock(),
                                                createElementBlock(
                                                  Fragment,
                                                  { key: 1 },
                                                  [
                                                    f[2] ||
                                                      (f[2] = createBaseVNode(
                                                        'span',
                                                        { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_l' },
                                                        null,
                                                        -1
                                                      )),
                                                    f[3] ||
                                                      (f[3] = createBaseVNode(
                                                        'span',
                                                        { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_r' },
                                                        null,
                                                        -1
                                                      ))
                                                  ],
                                                  64
                                                ))
                                          ],
                                          64
                                        ))
                                      : (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 0 },
                                          [
                                            a.$slots['arrow-up']
                                              ? renderSlot(a.$slots, 'arrow-up', { key: 0 })
                                              : createCommentVNode('', true),
                                            a.$slots['arrow-up']
                                              ? createCommentVNode('', true)
                                              : (openBlock(), createBlock(unref(Ha), { key: 1 }))
                                          ],
                                          64
                                        ))
                                  ],
                                  42,
                                  rl
                                ),
                                createBaseVNode(
                                  'button',
                                  {
                                    ref_for: true,
                                    ref: (ne) => C(ne, te, 1),
                                    type: 'button',
                                    'aria-label': `${De.value(S.type).text}-${(_b = unref(A)) == null ? void 0 : _b.openTpOverlay(S.type)}`,
                                    class: normalizeClass({
                                      dp__time_display: true,
                                      dp__time_display_block: !unref(c).timePickerInline,
                                      dp__time_display_inline: unref(c).timePickerInline,
                                      'dp--time-invalid': ae.value(S.type),
                                      'dp--time-overlay-btn': !ae.value(S.type),
                                      'dp--hidden-el': N.value
                                    }),
                                    disabled: y(S.type),
                                    tabindex: '0',
                                    'data-test-id': `${S.type}-toggle-overlay-btn-${o.order}`,
                                    onKeydown: (ne) => unref(T)(ne, () => $(S.type), true),
                                    onClick: (ne) => $(S.type)
                                  },
                                  [
                                    a.$slots[S.type]
                                      ? renderSlot(a.$slots, S.type, {
                                          key: 0,
                                          text: De.value(S.type).text,
                                          value: De.value(S.type).value
                                        })
                                      : createCommentVNode('', true),
                                    a.$slots[S.type]
                                      ? createCommentVNode('', true)
                                      : (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 1 },
                                          [createTextVNode(toDisplayString(De.value(S.type).text), 1)],
                                          64
                                        ))
                                  ],
                                  42,
                                  ll
                                ),
                                createBaseVNode(
                                  'button',
                                  {
                                    ref_for: true,
                                    ref: (ne) => C(ne, te, 2),
                                    type: 'button',
                                    class: normalizeClass({
                                      dp__btn: true,
                                      dp__inc_dec_button: !unref(c).timePickerInline,
                                      dp__inc_dec_button_inline: unref(c).timePickerInline,
                                      dp__tp_inline_btn_bottom: unref(c).timePickerInline,
                                      dp__inc_dec_button_disabled: J.value(S.type),
                                      'dp--hidden-el': N.value
                                    }),
                                    'data-test-id': `${S.type}-time-dec-btn-${o.order}`,
                                    'aria-label': (_c = unref(A)) == null ? void 0 : _c.decrementValue(S.type),
                                    tabindex: '0',
                                    onKeydown: (ne) => unref(T)(ne, () => h2(S.type, false, { keyboard: true }), true),
                                    onClick: (ne) => (unref(b).timeArrowHoldThreshold ? void 0 : h2(S.type, false)),
                                    onMousedown: (ne) => (unref(b).timeArrowHoldThreshold ? h2(S.type, false) : void 0),
                                    onMouseup: le
                                  },
                                  [
                                    unref(c).timePickerInline
                                      ? (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 1 },
                                          [
                                            a.$slots['tp-inline-arrow-down']
                                              ? renderSlot(a.$slots, 'tp-inline-arrow-down', { key: 0 })
                                              : (openBlock(),
                                                createElementBlock(
                                                  Fragment,
                                                  { key: 1 },
                                                  [
                                                    f[4] ||
                                                      (f[4] = createBaseVNode(
                                                        'span',
                                                        { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_l' },
                                                        null,
                                                        -1
                                                      )),
                                                    f[5] ||
                                                      (f[5] = createBaseVNode(
                                                        'span',
                                                        { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_r' },
                                                        null,
                                                        -1
                                                      ))
                                                  ],
                                                  64
                                                ))
                                          ],
                                          64
                                        ))
                                      : (openBlock(),
                                        createElementBlock(
                                          Fragment,
                                          { key: 0 },
                                          [
                                            a.$slots['arrow-down']
                                              ? renderSlot(a.$slots, 'arrow-down', { key: 0 })
                                              : createCommentVNode('', true),
                                            a.$slots['arrow-down']
                                              ? createCommentVNode('', true)
                                              : (openBlock(), createBlock(unref(Ka), { key: 1 }))
                                          ],
                                          64
                                        ))
                                  ],
                                  42,
                                  ol
                                )
                              ],
                              64
                            ))
                      ],
                      10,
                      nl
                    )
                  )
                }),
                128
              )),
              unref(c).is24
                ? createCommentVNode('', true)
                : (openBlock(),
                  createElementBlock('div', sl, [
                    a.$slots['am-pm-button']
                      ? renderSlot(a.$slots, 'am-pm-button', {
                          key: 0,
                          toggle: x,
                          value: R.value
                        })
                      : createCommentVNode('', true),
                    a.$slots['am-pm-button']
                      ? createCommentVNode('', true)
                      : (openBlock(),
                        createElementBlock(
                          'button',
                          {
                            key: 1,
                            ref_key: 'amPmButton',
                            ref: w,
                            type: 'button',
                            class: 'dp__pm_am_button',
                            role: 'button',
                            'aria-label': (_a = unref(A)) == null ? void 0 : _a.amPmButton,
                            tabindex: '0',
                            'data-compact': ee.value,
                            onClick: x,
                            onKeydown: f[0] || (f[0] = (S) => unref(T)(S, () => x(), true))
                          },
                          toDisplayString(R.value),
                          41,
                          ul
                        ))
                  ])),
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(
                  ge.value,
                  (S, te) => (
                    openBlock(),
                    createBlock(
                      Transition,
                      {
                        key: te,
                        name: unref(P)(q[S.type]),
                        css: unref(F)
                      },
                      {
                        default: withCtx(() => {
                          var _a2, _b
                          return [
                            q[S.type]
                              ? (openBlock(),
                                createBlock(
                                  zt,
                                  {
                                    key: 0,
                                    items: H(S.type),
                                    'is-last': unref(B).autoApply && !unref(b).keepActionRow,
                                    type: S.type,
                                    'aria-labels': unref(A),
                                    'overlay-label':
                                      (_b = (_a2 = unref(A)).timeOverlay) == null ? void 0 : _b.call(_a2, S.type),
                                    onSelected: (ne) => G(S.type, ne),
                                    onToggle: (ne) => $(S.type),
                                    onResetFlow: f[1] || (f[1] = (ne) => a.$emit('reset-flow'))
                                  },
                                  createSlots(
                                    {
                                      'button-icon': withCtx(() => [
                                        a.$slots['clock-icon']
                                          ? renderSlot(a.$slots, 'clock-icon', { key: 0 })
                                          : createCommentVNode('', true),
                                        a.$slots['clock-icon']
                                          ? createCommentVNode('', true)
                                          : (openBlock(),
                                            createBlock(
                                              resolveDynamicComponent(
                                                unref(c).timePickerInline ? unref(Ht) : unref(La)
                                              ),
                                              { key: 1 }
                                            ))
                                      ]),
                                      _: 2
                                    },
                                    [
                                      a.$slots[`${S.type}-overlay-value`]
                                        ? {
                                            name: 'item',
                                            fn: withCtx(({ item: ne }) => [
                                              renderSlot(a.$slots, `${S.type}-overlay-value`, {
                                                text: ne.text,
                                                value: ne.value
                                              })
                                            ]),
                                            key: '0'
                                          }
                                        : void 0,
                                      a.$slots[`${S.type}-overlay-header`]
                                        ? {
                                            name: 'header',
                                            fn: withCtx(() => [
                                              renderSlot(a.$slots, `${S.type}-overlay-header`, {
                                                toggle: () => $(S.type)
                                              })
                                            ]),
                                            key: '1'
                                          }
                                        : void 0
                                    ]
                                  ),
                                  1032,
                                  ['items', 'is-last', 'type', 'aria-labels', 'overlay-label', 'onSelected', 'onToggle']
                                ))
                              : createCommentVNode('', true)
                          ]
                        }),
                        _: 2
                      },
                      1032,
                      ['name', 'css']
                    )
                  )
                ),
                128
              ))
            ]))
      }
    )
  }
})
var cl = ['data-dp-mobile']
var dl = ['aria-label', 'tabindex']
var vl = ['role', 'aria-label', 'tabindex']
var fl = ['aria-label']
var qa = defineComponent({
  __name: 'TimePicker',
  props: {
    hours: {},
    minutes: {},
    seconds: {},
    disabledTimesConfig: { type: [Function, null] },
    noOverlayFocus: { type: Boolean },
    validateTime: { type: Function }
  },
  emits: ['update:hours', 'update:minutes', 'update:seconds', 'mount', 'reset-flow'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      {
        rootEmit: s,
        modelValue: n,
        rootProps: l,
        defaults: { ariaLabels: d, textInput: B, config: A, range: I, timeConfig: b }
      } = $e(),
      { isModelAuto: i } = je(),
      { checkKeyDown: M, findFocusableEl: c } = Ee(),
      { buildMatrix: T, setTimePicker: v } = gt(),
      { transitionName: Y, showTransition: V } = Kt(),
      { hideNavigationButtons: P } = ra(),
      { mapSlots: F } = yt(),
      { isMobile: q } = aa(),
      R = useSlots(),
      w = useTemplateRef('overlay'),
      u = useTemplateRef('open-tp-btn'),
      D = useTemplateRef('close-tp-btn'),
      N = useTemplateRef('tp-input'),
      Q = ref(false)
    onMounted(() => {
      ;(r('mount'), !l.timePicker && l.arrowNavigation ? T([unrefElement(u.value)], 'time') : v(true, l.timePicker))
    })
    const ae = computed(() => (I.value.enabled && l.modelAuto ? i(n.value) : true)),
      Z = ref(false),
      ve = (re2) => ({
        hours: Array.isArray(o.hours) ? o.hours[re2] : o.hours,
        minutes: Array.isArray(o.minutes) ? o.minutes[re2] : o.minutes,
        seconds: Array.isArray(o.seconds) ? o.seconds[re2] : o.seconds
      }),
      he = computed(() => {
        const re2 = []
        if (I.value.enabled) for (let H = 0; H < 2; H++) re2.push(ve(H))
        else re2.push(ve(0))
        return re2
      }),
      L = (re2, H = false, E = '') => {
        ;(H || r('reset-flow'),
          (Z.value = re2),
          s('overlay-toggle', { open: re2, overlay: qe.time }),
          l.arrowNavigation && v(re2),
          nextTick(() => {
            var _a
            E !== '' && ((_a = N.value) == null ? void 0 : _a[0]) && N.value[0].openChildCmp(E)
          }))
      },
      J = computed(() => ({
        dp__btn: true,
        dp__button: true,
        dp__button_bottom: l.autoApply && !A.value.keepActionRow
      })),
      W = F(R, 'timePicker'),
      oe = (re2, H, E) => (I.value.enabled ? (H === 0 ? [re2, he.value[1][E]] : [he.value[0][E], re2]) : re2),
      z = (re2) => {
        r('update:hours', re2)
      },
      ee = (re2) => {
        r('update:minutes', re2)
      },
      fe = (re2) => {
        r('update:seconds', re2)
      },
      ge = () => {
        if (w.value && !B.value.enabled && !o.noOverlayFocus) {
          const re2 = c(w.value)
          re2 && re2.focus({ preventScroll: true })
        }
      },
      De = (re2) => {
        ;((Q.value = false), s('overlay-toggle', { open: false, overlay: re2 }))
      },
      Ae = (re2) => {
        ;((Q.value = true), s('overlay-toggle', { open: true, overlay: re2 }))
      }
    return (
      k({ toggleTimePicker: L }),
      (re2, H) => {
        var _a
        return (
          openBlock(),
          createElementBlock(
            'div',
            {
              class: 'dp--tp-wrap',
              'data-dp-mobile': unref(q)
            },
            [
              !unref(l).timePicker && !unref(b).timePickerInline
                ? withDirectives(
                    (openBlock(),
                    createElementBlock(
                      'button',
                      {
                        key: 0,
                        ref: 'open-tp-btn',
                        type: 'button',
                        class: normalizeClass({ ...J.value, 'dp--hidden-el': Z.value }),
                        'aria-label': (_a = unref(d)) == null ? void 0 : _a.openTimePicker,
                        tabindex: e.noOverlayFocus ? void 0 : 0,
                        'data-test-id': 'open-time-picker-btn',
                        onKeydown: H[0] || (H[0] = (E) => unref(M)(E, () => L(true))),
                        onClick: H[1] || (H[1] = (E) => L(true))
                      },
                      [
                        re2.$slots['clock-icon']
                          ? renderSlot(re2.$slots, 'clock-icon', { key: 0 })
                          : createCommentVNode('', true),
                        re2.$slots['clock-icon']
                          ? createCommentVNode('', true)
                          : (openBlock(), createBlock(unref(La), { key: 1 }))
                      ],
                      42,
                      dl
                    )),
                    [[vShow, !unref(P)('time')]]
                  )
                : createCommentVNode('', true),
              createVNode(
                Transition,
                {
                  name: unref(Y)(Z.value),
                  css: unref(V) && !unref(b).timePickerInline
                },
                {
                  default: withCtx(() => {
                    var _a2, _b
                    return [
                      Z.value || unref(l).timePicker || unref(b).timePickerInline
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 0,
                              ref: 'overlay',
                              role: unref(b).timePickerInline ? void 0 : 'dialog',
                              class: normalizeClass({
                                dp__overlay: !unref(b).timePickerInline,
                                'dp--overlay-absolute': !unref(l).timePicker && !unref(b).timePickerInline,
                                'dp--overlay-relative': unref(l).timePicker
                              }),
                              style: normalizeStyle(
                                unref(l).timePicker ? { height: `${unref(A).modeHeight}px` } : void 0
                              ),
                              'aria-label': (_a2 = unref(d)) == null ? void 0 : _a2.timePicker,
                              tabindex: unref(b).timePickerInline ? void 0 : 0
                            },
                            [
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(
                                    unref(b).timePickerInline
                                      ? 'dp__time_picker_inline_container'
                                      : 'dp__overlay_container dp__container_flex dp__time_picker_overlay_container'
                                  ),
                                  style: { display: 'flex' }
                                },
                                [
                                  re2.$slots['time-picker-overlay']
                                    ? renderSlot(re2.$slots, 'time-picker-overlay', {
                                        key: 0,
                                        hours: e.hours,
                                        minutes: e.minutes,
                                        seconds: e.seconds,
                                        setHours: z,
                                        setMinutes: ee,
                                        setSeconds: fe
                                      })
                                    : createCommentVNode('', true),
                                  re2.$slots['time-picker-overlay']
                                    ? createCommentVNode('', true)
                                    : (openBlock(),
                                      createElementBlock(
                                        'div',
                                        {
                                          key: 1,
                                          class: normalizeClass(
                                            unref(b).timePickerInline ? 'dp__flex' : 'dp__overlay_row dp__flex_row'
                                          )
                                        },
                                        [
                                          (openBlock(true),
                                          createElementBlock(
                                            Fragment,
                                            null,
                                            renderList(he.value, (E, ce) =>
                                              withDirectives(
                                                (openBlock(),
                                                createBlock(
                                                  il,
                                                  mergeProps(
                                                    { key: ce },
                                                    { ref_for: true },
                                                    {
                                                      order: ce,
                                                      hours: E.hours,
                                                      minutes: E.minutes,
                                                      seconds: E.seconds,
                                                      closeTimePickerBtn: D.value,
                                                      disabledTimesConfig: e.disabledTimesConfig,
                                                      disabled: ce === 0 ? unref(I).fixedStart : unref(I).fixedEnd
                                                    },
                                                    {
                                                      ref_for: true,
                                                      ref: 'tp-input',
                                                      'validate-time': (ue, y) => e.validateTime(ue, oe(y, ce, ue)),
                                                      'onUpdate:hours': (ue) => z(oe(ue, ce, 'hours')),
                                                      'onUpdate:minutes': (ue) => ee(oe(ue, ce, 'minutes')),
                                                      'onUpdate:seconds': (ue) => fe(oe(ue, ce, 'seconds')),
                                                      onMounted: ge,
                                                      onOverlayClosed: De,
                                                      onOverlayOpened: Ae
                                                    }
                                                  ),
                                                  createSlots({ _: 2 }, [
                                                    renderList(unref(W), (ue, y) => ({
                                                      name: ue,
                                                      fn: withCtx(($) => [
                                                        renderSlot(re2.$slots, ue, mergeProps({ ref_for: true }, $))
                                                      ])
                                                    }))
                                                  ]),
                                                  1040,
                                                  [
                                                    'validate-time',
                                                    'onUpdate:hours',
                                                    'onUpdate:minutes',
                                                    'onUpdate:seconds'
                                                  ]
                                                )),
                                                [[vShow, ce === 0 ? true : ae.value]]
                                              )
                                            ),
                                            128
                                          ))
                                        ],
                                        2
                                      )),
                                  !unref(l).timePicker && !unref(b).timePickerInline
                                    ? withDirectives(
                                        (openBlock(),
                                        createElementBlock(
                                          'button',
                                          {
                                            key: 2,
                                            ref: 'close-tp-btn',
                                            type: 'button',
                                            class: normalizeClass({ ...J.value, 'dp--hidden-el': Q.value }),
                                            'aria-label': (_b = unref(d)) == null ? void 0 : _b.closeTimePicker,
                                            tabindex: '0',
                                            onKeydown: H[2] || (H[2] = (E) => unref(M)(E, () => L(false))),
                                            onClick: H[3] || (H[3] = (E) => L(false))
                                          },
                                          [
                                            re2.$slots['calendar-icon']
                                              ? renderSlot(re2.$slots, 'calendar-icon', { key: 0 })
                                              : createCommentVNode('', true),
                                            re2.$slots['calendar-icon']
                                              ? createCommentVNode('', true)
                                              : (openBlock(), createBlock(unref(Ht), { key: 1 }))
                                          ],
                                          42,
                                          fl
                                        )),
                                        [[vShow, !unref(P)('time')]]
                                      )
                                    : createCommentVNode('', true)
                                ],
                                2
                              )
                            ],
                            14,
                            vl
                          ))
                        : createCommentVNode('', true)
                    ]
                  }),
                  _: 3
                },
                8,
                ['name', 'css']
              )
            ],
            8,
            cl
          )
        )
      }
    )
  }
})
var Qa = (e) => {
  const {
      getDate: k,
      modelValue: p,
      time: r,
      rootProps: o,
      defaults: { range: s, timeConfig: n }
    } = $e(),
    { isDateEqual: l, setTime: d } = je(),
    B = (R, w) => (Array.isArray(r[R]) ? r[R][w] : r[R]),
    A = (R) => (n.value.enableSeconds ? (Array.isArray(r.seconds) ? r.seconds[R] : r.seconds) : 0),
    I = (R, w) =>
      R
        ? d(
            w !== void 0
              ? { hours: B('hours', w), minutes: B('minutes', w), seconds: A(w) }
              : { hours: r.hours, minutes: r.minutes, seconds: A() },
            R
          )
        : setSeconds(k(), A(w)),
    b = (R, w) => {
      r[R] = w
    },
    i = computed(() =>
      o.modelAuto && s.value.enabled ? (Array.isArray(p.value) ? p.value.length > 1 : false) : s.value.enabled
    ),
    M = (R, w) => {
      const u = Object.fromEntries(Object.keys(r).map((D) => (D === R ? [D, w] : [D, r[D]].slice())))
      if (i.value && !s.value.disableTimeRangeValidation) {
        const D = (Q) =>
            p.value
              ? d(
                  {
                    hours: u.hours[Q],
                    minutes: u.minutes[Q],
                    seconds: u.seconds[Q]
                  },
                  p.value[Q]
                )
              : null,
          N = (Q) => setMilliseconds(p.value[Q], 0)
        return !(l(D(0), D(1)) && (isAfter(D(0), N(1)) || isBefore(D(1), N(0))))
      }
      return true
    },
    c = (R, w) => {
      M(R, w) && (b(R, w), e && e())
    },
    T = (R) => {
      c('hours', R)
    },
    v = (R) => {
      c('minutes', R)
    },
    Y = (R) => {
      c('seconds', R)
    },
    V = (R, w) => {
      ;(T(R.hours), v(R.minutes), Y(R.seconds), p.value && w(p.value))
    },
    P = (R) => {
      if (R) {
        const w = Array.isArray(R),
          u = w ? [+R[0].hours, +R[1].hours] : +R.hours,
          D = w ? [+R[0].minutes, +R[1].minutes] : +R.minutes,
          N = w ? [+(R[0].seconds ?? 0), +(R[1].seconds ?? 0)] : +(R.seconds ?? 0)
        ;(b('hours', u), b('minutes', D), n.value.enableSeconds && b('seconds', N))
      }
    },
    F = (R, w) => {
      const u = {
        hours: Array.isArray(r.hours) ? r.hours[R] : r.hours,
        disabledArr: []
      }
      return (
        (w || w === 0) && (u.hours = w),
        Array.isArray(o.disabledTimes) &&
          (u.disabledArr = s.value.enabled && Array.isArray(o.disabledTimes[R]) ? o.disabledTimes[R] : o.disabledTimes),
        u
      )
    },
    q = computed(() => (R, w) => {
      var _a
      if (Array.isArray(o.disabledTimes)) {
        const { disabledArr: u, hours: D } = F(R, w),
          N = u.filter((Q) => +Q.hours === D)
        return ((_a = N[0]) == null ? void 0 : _a.minutes) === '*'
          ? { hours: [D], minutes: void 0, seconds: void 0 }
          : {
              hours: [],
              minutes: (N == null ? void 0 : N.map((Q) => +Q.minutes)) ?? [],
              seconds: (N == null ? void 0 : N.map((Q) => (Q.seconds ? +Q.seconds : void 0))) ?? []
            }
      }
      return { hours: [], minutes: [], seconds: [] }
    })
  return {
    assignTime: b,
    updateHours: T,
    updateMinutes: v,
    updateSeconds: Y,
    getSetDateTime: I,
    updateTimeValues: V,
    getSecondsValue: A,
    assignStartTime: P,
    validateTime: M,
    disabledTimesConfig: q
  }
}
var ml = (e) => {
  const {
      getDate: k,
      time: p,
      modelValue: r,
      state: o,
      defaults: { startTime: s, range: n, timeConfig: l }
    } = $e(),
    { getTimeObj: d } = je()
  jt(() => {
    o.isTextInputDate && F()
  })
  const {
    updateTimeValues: B,
    getSetDateTime: A,
    assignTime: I,
    assignStartTime: b,
    disabledTimesConfig: i,
    validateTime: M
  } = Qa(c)
  function c() {
    e('update-flow-step')
  }
  const T = (w) => {
      const { hours: u, minutes: D, seconds: N } = w
      return { hours: +u, minutes: +D, seconds: N ? +N : 0 }
    },
    v = () => {
      if (l.value.startTime) {
        if (Array.isArray(l.value.startTime)) {
          const u = T(l.value.startTime[0]),
            D = T(l.value.startTime[1])
          return [set(k(), u), set(k(), D)]
        }
        const w = T(l.value.startTime)
        return set(k(), w)
      }
      return n.value.enabled ? [null, null] : null
    },
    Y = () => {
      if (n.value.enabled) {
        const [w, u] = v()
        r.value = [A(w, 0), A(u, 1)]
      } else r.value = A(v())
    },
    V = (w) => (Array.isArray(w) ? [d(k(w[0])), d(k(w[1]))] : [d(w ?? k())]),
    P = (w, u, D) => {
      ;(I('hours', w), I('minutes', u), I('seconds', l.value.enableSeconds ? D : 0))
    },
    F = () => {
      const [w, u] = V(r.value)
      return n.value.enabled
        ? P([w.hours, u.hours], [w.minutes, u.minutes], [w.seconds, u.seconds])
        : P(w.hours, w.minutes, w.seconds)
    }
  onMounted(() => (b(s.value), r.value ? F() : Y()))
  const q = () => {
    ;(Array.isArray(r.value) ? (r.value = r.value.map((w, u) => w && A(w, u))) : (r.value = A(r.value)),
      e('time-update'))
  }
  return {
    modelValue: r,
    time: p,
    disabledTimesConfig: i,
    validateTime: M,
    updateTime: (w) => {
      B(w, q)
    }
  }
}
var pl = defineComponent({
  __name: 'TimePickerSolo',
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ['time-update', 'mount', 'reset-flow', 'update-flow-step'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = useSlots(),
      { mapSlots: s } = yt(),
      n = s(o, 'timePicker'),
      l = useTemplateRef('time-input'),
      { time: d, modelValue: B, disabledTimesConfig: A, updateTime: I, validateTime: b } = ml(r)
    return (
      onMounted(() => {
        r('mount')
      }),
      k({
        getSidebarProps: () => ({
          modelValue: B,
          time: d,
          updateTime: I
        }),
        toggleTimePicker: (c, T = false, v = '') => {
          var _a
          ;(_a = l.value) == null ? void 0 : _a.toggleTimePicker(c, T, v)
        }
      }),
      (c, T) => (
        openBlock(),
        createBlock(
          la,
          {
            'multi-calendars': 0,
            stretch: ''
          },
          {
            default: withCtx(({ wrapClass: v }) => [
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(v)
                },
                [
                  createVNode(
                    qa,
                    mergeProps({ ref: 'time-input' }, c.$props, {
                      hours: unref(d).hours,
                      minutes: unref(d).minutes,
                      seconds: unref(d).seconds,
                      'disabled-times-config': unref(A),
                      'validate-time': unref(b),
                      'onUpdate:hours':
                        T[0] ||
                        (T[0] = (Y) => unref(I)({ hours: Y, minutes: unref(d).minutes, seconds: unref(d).seconds })),
                      'onUpdate:minutes':
                        T[1] ||
                        (T[1] = (Y) => unref(I)({ hours: unref(d).hours, minutes: Y, seconds: unref(d).seconds })),
                      'onUpdate:seconds':
                        T[2] ||
                        (T[2] = (Y) => unref(I)({ hours: unref(d).hours, minutes: unref(d).minutes, seconds: Y })),
                      onResetFlow: T[3] || (T[3] = (Y) => c.$emit('reset-flow'))
                    }),
                    createSlots({ _: 2 }, [
                      renderList(unref(n), (Y, V) => ({
                        name: Y,
                        fn: withCtx((P) => [renderSlot(c.$slots, Y, normalizeProps(guardReactiveProps(P)))])
                      }))
                    ]),
                    1040,
                    ['hours', 'minutes', 'seconds', 'disabled-times-config', 'validate-time']
                  )
                ],
                2
              )
            ]),
            _: 3
          }
        )
      )
    )
  }
})
var hl = (e, k) => {
  const {
      getDate: p,
      rootProps: r,
      defaults: { filters: o }
    } = $e(),
    { validateMonthYearInRange: s, validateMonthYear: n } = at(),
    l = (b, i) => {
      let M = b
      return o.value.months.includes(getMonth(M)) ? ((M = i ? addMonths(b, 1) : subMonths(b, 1)), l(M, i)) : M
    },
    d = (b, i) => {
      let M = b
      return o.value.years.includes(getYear(M)) ? ((M = i ? addYears(b, 1) : subYears(b, 1)), d(M, i)) : M
    },
    B = (b, i = false) => {
      const M = set(p(), { month: e.month, year: e.year })
      let c = b ? addMonths(M, 1) : subMonths(M, 1)
      r.disableYearSelect && (c = setYear(c, e.year))
      let T = getMonth(c),
        v = getYear(c)
      ;(o.value.months.includes(T) && ((c = l(c, b)), (T = getMonth(c)), (v = getYear(c))),
        o.value.years.includes(v) && ((c = d(c, b)), (v = getYear(c))),
        s(T, v, b, r.preventMinMaxNavigation) && A(T, v, i))
    },
    A = (b, i, M) => {
      k('update-month-year', { month: b, year: i, fromNav: M })
    },
    I = computed(() => (b) => n(set(p(), { month: e.month, year: e.year }), r.preventMinMaxNavigation, b))
  return { handleMonthYearChange: B, isDisabled: I, updateMonthYear: A }
}
var gl = { class: 'dp--header-wrap' }
var yl = {
  key: 0,
  class: 'dp__month_year_wrap'
}
var bl = { key: 0 }
var kl = { class: 'dp__month_year_wrap' }
var wl = ['data-dp-element', 'aria-label', 'data-test-id', 'onClick', 'onKeydown']
var Dl = defineComponent({
  __name: 'DpHeader',
  props: {
    month: {},
    year: {},
    instance: {},
    years: {},
    months: {},
    menuWrapRef: {}
  },
  emits: ['mount', 'reset-flow', 'update-month-year'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      {
        rootEmit: s,
        rootProps: n,
        modelValue: l,
        defaults: { ariaLabels: d, filters: B, config: A, highlight: I, safeDates: b, ui: i }
      } = $e(),
      { transitionName: M, showTransition: c } = Kt(),
      { showLeftIcon: T, showRightIcon: v } = ra(),
      { buildMatrix: Y } = gt(),
      { handleMonthYearChange: V, isDisabled: P, updateMonthYear: F } = hl(o, r),
      {
        getMaxMonth: q,
        getMinMonth: R,
        getYearFromDate: w,
        groupListAndMap: u,
        checkHighlightYear: D,
        checkHighlightMonth: N
      } = je(),
      { checkKeyDown: Q } = Ee(),
      { formatYear: ae } = bt(),
      { checkMinMaxValue: Z } = at(),
      ve = ref(false),
      he = ref(false),
      L = ref(false),
      J = ref([null, null, null, null])
    onMounted(() => {
      r('mount')
    })
    const W = ($) => ({
        get: () => o[$],
        set: (ie) => {
          const le = $ === rt.month ? rt.year : rt.month
          ;(r('update-month-year', { [$]: ie, [le]: o[le] }), $ === rt.month ? re2(true) : H(true))
        }
      }),
      oe = computed(W(rt.month)),
      z = computed(W(rt.year)),
      ee = computed(() => ($) => ({
        month: o.month,
        year: o.year,
        items: $ === rt.month ? o.months : o.years,
        instance: o.instance,
        updateMonthYear: F,
        toggle: $ === rt.month ? re2 : H
      })),
      fe = computed(() => {
        const $ = o.months.find((ie) => ie.value === o.month)
        return $ || { text: '', value: 0 }
      }),
      ge = computed(() =>
        u(o.months, ($) => {
          const ie = o.month === $.value,
            le = Z($.value, R(o.year, b.value.minDate), q(o.year, b.value.maxDate)) || B.value.months.includes($.value),
            h2 = N(I.value, $.value, o.year)
          return { active: ie, disabled: le, highlighted: h2 }
        })
      ),
      De = computed(() =>
        u(o.years, ($) => {
          const ie = o.year === $.value,
            le = Z($.value, w(b.value.minDate), w(b.value.maxDate)) || B.value.years.includes($.value),
            h2 = D(I.value, $.value)
          return { active: ie, disabled: le, highlighted: h2 }
        })
      ),
      Ae = ($, ie, le) => {
        ;(le === void 0 ? ($.value = !$.value) : ($.value = le),
          $.value
            ? ((L.value = true), s('overlay-toggle', { open: true, overlay: ie }))
            : ((L.value = false), s('overlay-toggle', { open: false, overlay: ie })))
      },
      re2 = ($ = false, ie) => {
        ;(E($), Ae(ve, qe.month, ie))
      },
      H = ($ = false, ie) => {
        ;(E($), Ae(he, qe.year, ie))
      },
      E = ($) => {
        $ || r('reset-flow')
      },
      ce = ($, ie) => {
        n.arrowNavigation && ((J.value[ie] = unrefElement($)), Y(J.value, 'monthYear'))
      },
      ue = computed(() => {
        var _a, _b, _c, _d, _e, _f
        return [
          {
            type: rt.month,
            index: 1,
            toggle: re2,
            modelValue: oe.value,
            updateModelValue: ($) => (oe.value = $),
            text: fe.value.text,
            showSelectionGrid: ve.value,
            items: ge.value,
            ariaLabel: (_a = d.value) == null ? void 0 : _a.openMonthsOverlay,
            overlayLabel: ((_c = (_b = d.value).monthPicker) == null ? void 0 : _c.call(_b, true)) ?? void 0
          },
          {
            type: rt.year,
            index: 2,
            toggle: H,
            modelValue: z.value,
            updateModelValue: ($) => (z.value = $),
            text: ae(o.year),
            showSelectionGrid: he.value,
            items: De.value,
            ariaLabel: (_d = d.value) == null ? void 0 : _d.openYearsOverlay,
            overlayLabel: ((_f = (_e = d.value).yearPicker) == null ? void 0 : _f.call(_e, true)) ?? void 0
          }
        ]
      }),
      y = computed(() => (n.disableYearSelect ? [ue.value[0]] : n.yearFirst ? [...ue.value].reverse() : ue.value))
    return (
      k({
        toggleMonthPicker: re2,
        toggleYearPicker: H,
        handleMonthYearChange: V
      }),
      ($, ie) => {
        var _a, _b, _c, _d, _e, _f
        return (
          openBlock(),
          createElementBlock('div', gl, [
            $.$slots['month-year']
              ? (openBlock(),
                createElementBlock('div', yl, [
                  renderSlot(
                    $.$slots,
                    'month-year',
                    normalizeProps(
                      guardReactiveProps({
                        month: e.month,
                        year: e.year,
                        months: e.months,
                        years: e.years,
                        updateMonthYear: unref(F),
                        handleMonthYearChange: unref(V),
                        instance: e.instance,
                        isDisabled: unref(P)
                      })
                    )
                  )
                ]))
              : (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    $.$slots['top-extra']
                      ? (openBlock(),
                        createElementBlock('div', bl, [renderSlot($.$slots, 'top-extra', { value: unref(l) })]))
                      : createCommentVNode('', true),
                    createBaseVNode('div', kl, [
                      unref(T)(e.instance) && !unref(n).vertical
                        ? (openBlock(),
                          createBlock(
                            Ft,
                            {
                              key: 0,
                              'aria-label': (_a = unref(d)) == null ? void 0 : _a.prevMonth,
                              disabled: unref(P)(false),
                              class: normalizeClass((_b = unref(i)) == null ? void 0 : _b.navBtnPrev),
                              'el-name': 'action-prev',
                              onActivate: ie[0] || (ie[0] = (le) => unref(V)(false, true)),
                              onSetRef: ie[1] || (ie[1] = (le) => ce(le, 0))
                            },
                            {
                              default: withCtx(() => [
                                $.$slots['arrow-left']
                                  ? renderSlot($.$slots, 'arrow-left', { key: 0 })
                                  : createCommentVNode('', true),
                                $.$slots['arrow-left']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Na), { key: 1 }))
                              ]),
                              _: 3
                            },
                            8,
                            ['aria-label', 'disabled', 'class']
                          ))
                        : createCommentVNode('', true),
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass([
                            'dp__month_year_wrap',
                            {
                              dp__year_disable_select: unref(n).disableYearSelect
                            }
                          ])
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(
                              y.value,
                              (le, h2) => (
                                openBlock(),
                                createElementBlock(
                                  Fragment,
                                  {
                                    key: le.type
                                  },
                                  [
                                    createBaseVNode(
                                      'button',
                                      {
                                        ref_for: true,
                                        ref: (m) => ce(m, h2 + 1),
                                        type: 'button',
                                        'data-dp-element': `overlay-${le.type}`,
                                        class: normalizeClass([
                                          'dp__btn dp__month_year_select',
                                          { 'dp--hidden-el': L.value }
                                        ]),
                                        'aria-label': `${le.text}-${le.ariaLabel}`,
                                        'data-test-id': `${le.type}-toggle-overlay-${e.instance}`,
                                        onClick: (m) => le.toggle(false),
                                        onKeydown: (m) => unref(Q)(m, () => le.toggle(), true)
                                      },
                                      [
                                        $.$slots[le.type]
                                          ? renderSlot($.$slots, le.type, {
                                              key: 0,
                                              text: le.text,
                                              value: o[le.type]
                                            })
                                          : createCommentVNode('', true),
                                        $.$slots[le.type]
                                          ? createCommentVNode('', true)
                                          : (openBlock(),
                                            createElementBlock(
                                              Fragment,
                                              { key: 1 },
                                              [createTextVNode(toDisplayString(le.text), 1)],
                                              64
                                            ))
                                      ],
                                      42,
                                      wl
                                    ),
                                    createVNode(
                                      Transition,
                                      {
                                        name: unref(M)(le.showSelectionGrid),
                                        css: unref(c)
                                      },
                                      {
                                        default: withCtx(() => [
                                          le.showSelectionGrid
                                            ? (openBlock(),
                                              createBlock(
                                                zt,
                                                {
                                                  key: 0,
                                                  items: le.items,
                                                  'is-last': unref(n).autoApply && !unref(A).keepActionRow,
                                                  'skip-button-ref': false,
                                                  type: le.type,
                                                  'header-refs': [],
                                                  'menu-wrap-ref': e.menuWrapRef,
                                                  'overlay-label': le.overlayLabel,
                                                  onSelected: le.updateModelValue,
                                                  onToggle: le.toggle
                                                },
                                                createSlots(
                                                  {
                                                    'button-icon': withCtx(() => [
                                                      $.$slots['calendar-icon']
                                                        ? renderSlot($.$slots, 'calendar-icon', { key: 0 })
                                                        : createCommentVNode('', true),
                                                      $.$slots['calendar-icon']
                                                        ? createCommentVNode('', true)
                                                        : (openBlock(), createBlock(unref(Ht), { key: 1 }))
                                                    ]),
                                                    _: 2
                                                  },
                                                  [
                                                    $.$slots[`${le.type}-overlay-value`]
                                                      ? {
                                                          name: 'item',
                                                          fn: withCtx(({ item: m }) => [
                                                            renderSlot($.$slots, `${le.type}-overlay-value`, {
                                                              text: m.text,
                                                              value: m.value
                                                            })
                                                          ]),
                                                          key: '0'
                                                        }
                                                      : void 0,
                                                    $.$slots[`${le.type}-overlay`]
                                                      ? {
                                                          name: 'overlay',
                                                          fn: withCtx(() => [
                                                            renderSlot(
                                                              $.$slots,
                                                              `${le.type}-overlay`,
                                                              mergeProps({ ref_for: true }, ee.value(le.type))
                                                            )
                                                          ]),
                                                          key: '1'
                                                        }
                                                      : void 0,
                                                    $.$slots[`${le.type}-overlay-header`]
                                                      ? {
                                                          name: 'header',
                                                          fn: withCtx(() => [
                                                            renderSlot($.$slots, `${le.type}-overlay-header`, {
                                                              toggle: le.toggle
                                                            })
                                                          ]),
                                                          key: '2'
                                                        }
                                                      : void 0
                                                  ]
                                                ),
                                                1032,
                                                [
                                                  'items',
                                                  'is-last',
                                                  'type',
                                                  'menu-wrap-ref',
                                                  'overlay-label',
                                                  'onSelected',
                                                  'onToggle'
                                                ]
                                              ))
                                            : createCommentVNode('', true)
                                        ]),
                                        _: 2
                                      },
                                      1032,
                                      ['name', 'css']
                                    )
                                  ],
                                  64
                                )
                              )
                            ),
                            128
                          ))
                        ],
                        2
                      ),
                      unref(T)(e.instance) && unref(n).vertical
                        ? (openBlock(),
                          createBlock(
                            Ft,
                            {
                              key: 1,
                              'aria-label': (_c = unref(d)) == null ? void 0 : _c.prevMonth,
                              'el-name': 'action-prev',
                              disabled: unref(P)(false),
                              class: normalizeClass((_d = unref(i)) == null ? void 0 : _d.navBtnPrev),
                              onActivate: ie[2] || (ie[2] = (le) => unref(V)(false, true))
                            },
                            {
                              default: withCtx(() => [
                                $.$slots['arrow-up']
                                  ? renderSlot($.$slots, 'arrow-up', { key: 0 })
                                  : createCommentVNode('', true),
                                $.$slots['arrow-up']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Ha), { key: 1 }))
                              ]),
                              _: 3
                            },
                            8,
                            ['aria-label', 'disabled', 'class']
                          ))
                        : createCommentVNode('', true),
                      unref(v)(e.instance)
                        ? (openBlock(),
                          createBlock(
                            Ft,
                            {
                              key: 2,
                              ref: 'rightIcon',
                              'el-name': 'action-next',
                              disabled: unref(P)(true),
                              'aria-label': (_e = unref(d)) == null ? void 0 : _e.nextMonth,
                              class: normalizeClass((_f = unref(i)) == null ? void 0 : _f.navBtnNext),
                              onActivate: ie[3] || (ie[3] = (le) => unref(V)(true, true)),
                              onSetRef: ie[4] || (ie[4] = (le) => ce(le, unref(n).disableYearSelect ? 2 : 3))
                            },
                            {
                              default: withCtx(() => [
                                $.$slots[unref(n).vertical ? 'arrow-down' : 'arrow-right']
                                  ? renderSlot($.$slots, unref(n).vertical ? 'arrow-down' : 'arrow-right', { key: 0 })
                                  : createCommentVNode('', true),
                                $.$slots[unref(n).vertical ? 'arrow-down' : 'arrow-right']
                                  ? createCommentVNode('', true)
                                  : (openBlock(),
                                    createBlock(resolveDynamicComponent(unref(n).vertical ? unref(Ka) : unref(Wa)), {
                                      key: 1
                                    }))
                              ]),
                              _: 3
                            },
                            8,
                            ['disabled', 'aria-label', 'class']
                          ))
                        : createCommentVNode('', true)
                    ])
                  ],
                  64
                ))
          ])
        )
      }
    )
  }
})
var Ml = {
  class: 'dp__calendar_header',
  role: 'row'
}
var _l = {
  key: 0,
  class: 'dp__calendar_header_item',
  role: 'gridcell'
}
var Al = ['aria-label']
var Pl = {
  key: 0,
  class: 'dp__calendar_item dp__week_num',
  role: 'gridcell'
}
var Tl = { class: 'dp__cell_inner' }
var $l = [
  'id',
  'aria-selected',
  'aria-disabled',
  'aria-label',
  'tabindex',
  'data-test-id',
  'onClick',
  'onTouchend',
  'onKeydown',
  'onMouseenter',
  'onMouseleave',
  'onMousedown'
]
var Sl = defineComponent({
  __name: 'DpCalendar',
  props: {
    instance: {},
    mappedDates: {},
    month: {},
    year: {}
  },
  emits: ['mount', 'select-date', 'set-hover-date', 'handle-scroll', 'handle-swipe'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      {
        getDate: s,
        rootEmit: n,
        rootProps: l,
        defaults: { transitions: d, config: B, ariaLabels: A, multiCalendars: I, weekNumbers: b, multiDates: i, ui: M }
      } = $e(),
      { buildMultiLevelMatrix: c } = gt(),
      { isDateAfter: T, isDateEqual: v, resetDateTime: Y, getCellId: V } = je(),
      { checkKeyDown: P, checkStopPropagation: F, isTouchDevice: q } = Ee(),
      { formatWeekDay: R } = bt(),
      w = useTemplateRef('calendar-wrap'),
      u = useTemplateRef('active-tooltip'),
      D = ref([]),
      N = ref(null),
      Q = ref(true),
      ae = ref(false),
      Z = ref(''),
      ve = ref({
        bottom: '',
        left: '',
        transform: ''
      }),
      he = ref({ left: '50%' })
    useSwipe(w, {
      onSwipeEnd: (g, C) => {
        B.value.noSwipe ||
          (l.vertical
            ? (C === 'up' || C === 'down') && r('handle-swipe', C === 'up' ? 'left' : 'right')
            : (C === 'left' || C === 'right') && r('handle-swipe', C === 'right' ? 'left' : 'right'))
      }
    })
    const L = computed(() => (l.calendar ? l.calendar(o.mappedDates) : o.mappedDates)),
      J = computed(() => (l.dayNames ? (Array.isArray(l.dayNames) ? l.dayNames : l.dayNames()) : x()))
    ;(onMounted(() => {
      ;(r('mount', { cmp: 'calendar', dayRefs: D.value }),
        B.value.monthChangeOnScroll && w.value && w.value.addEventListener('wheel', y, { passive: false }))
    }),
      onUnmounted(() => {
        B.value.monthChangeOnScroll && w.value && w.value.removeEventListener('wheel', y)
      }))
    const W = (g) => (g ? (l.vertical ? 'vNext' : 'next') : l.vertical ? 'vPrevious' : 'previous'),
      oe = (g, C) => {
        if (l.transitions) {
          const G = Y(set(s(), { month: o.month, year: o.year }))
          ;((Z.value = T(Y(set(s(), { month: g, year: C })), G) ? d.value[W(true)] : d.value[W(false)]),
            (Q.value = false),
            nextTick(() => {
              Q.value = true
            }))
        }
      },
      z = computed(() => ({
        ...M.value.calendar
      })),
      ee = (g) => ({ type: 'dot', ...g }),
      fe = computed(() => (g) => {
        const C = ee(g)
        return {
          dp__marker_dot: C.type === 'dot',
          dp__marker_line: C.type === 'line'
        }
      }),
      ge = computed(() => (g) => v(g, N.value)),
      De = computed(() => ({
        dp__calendar: true,
        dp__calendar_next: I.value.count > 0 && o.instance !== 0
      })),
      Ae = computed(() => (g) => (l.hideOffsetDates ? g.current : true)),
      re2 = async (g, C) => {
        var _a
        const { width: G, height: a } = g.getBoundingClientRect()
        N.value = C.value
        let f = { left: `${G / 2}px` },
          S = -50
        if ((await nextTick(), (_a = u.value) == null ? void 0 : _a[0])) {
          const { left: te, width: ne } = u.value[0].getBoundingClientRect()
          ;(te < 0 && ((f = { left: '0' }), (S = 0), (he.value.left = `${G / 2}px`)),
            globalThis.innerWidth < te + ne && ((f = { right: '0' }), (S = 0), (he.value.left = `${ne - G / 2}px`)))
        }
        ve.value = {
          bottom: `${a}px`,
          ...f,
          transform: `translateX(${S}%)`
        }
      },
      H = async (g, C, G) => {
        var _a, _b, _c, _d, _e
        const a = unrefElement((_b = (_a = D.value) == null ? void 0 : _a[C]) == null ? void 0 : _b[G])
        a &&
          (((_c = g.marker) == null ? void 0 : _c.customPosition) &&
          ((_e = (_d = g.marker) == null ? void 0 : _d.tooltip) == null ? void 0 : _e.length)
            ? (ve.value = g.marker.customPosition(a))
            : await re2(a, g),
          n('tooltip-open', g.marker))
      },
      E = async (g, C, G) => {
        var _a, _b
        if (ae.value && i.value.enabled && i.value.dragSelect) return r('select-date', g)
        if (
          (r('set-hover-date', g), (_b = (_a = g.marker) == null ? void 0 : _a.tooltip) == null ? void 0 : _b.length)
        ) {
          if (l.hideOffsetDates && !g.current) return
          await H(g, C, G)
        }
      },
      ce = (g) => {
        N.value &&
          ((N.value = null),
          (ve.value = structuredClone({ bottom: '', left: '', transform: '' })),
          n('tooltip-close', g.marker))
      },
      ue = (g, C, G) => {
        ;(g && (Array.isArray(D.value[C]) ? (D.value[C][G] = g) : (D.value[C] = [g])),
          l.arrowNavigation && c(D.value, 'calendar'))
      },
      y = (g) => {
        B.value.monthChangeOnScroll && (g.preventDefault(), r('handle-scroll', g))
      },
      $ = (g) =>
        b.value
          ? b.value.type === 'local'
            ? getWeek(g.value, {
                weekStartsOn: +l.weekStart,
                locale: l.locale
              })
            : b.value.type === 'iso'
              ? getISOWeek(g.value)
              : typeof b.value.type == 'function'
                ? b.value.type(g.value)
                : ''
          : '',
      ie = (g) => {
        var _a
        const C = g[0]
        return ((_a = b.value) == null ? void 0 : _a.hideOnOffsetDates) ? (g.some((G) => G.current) ? $(C) : '') : $(C)
      },
      le = (g, C, G = true) => {
        ;(!G && q()) || ((!i.value.enabled || B.value.allowPreventDefault) && (F(g, B.value), r('select-date', C)))
      },
      h2 = (g) => {
        F(g, B.value)
      },
      m = (g) => {
        i.value.enabled && i.value.dragSelect
          ? ((ae.value = true), r('select-date', g))
          : i.value.enabled && r('select-date', g)
      },
      x = () => {
        const C = [1, 2, 3, 4, 5, 6, 7].map((f) => R(f)),
          G = C.slice(0, +l.weekStart),
          a = C.slice(+l.weekStart + 1, C.length)
        return [C[+l.weekStart]].concat(...a).concat(...G)
      }
    return (
      k({ triggerTransition: oe }),
      (g, C) => (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(De.value)
          },
          [
            createBaseVNode(
              'div',
              {
                ref: 'calendar-wrap',
                class: normalizeClass(z.value),
                role: 'grid'
              },
              [
                createBaseVNode('div', Ml, [
                  unref(b)
                    ? (openBlock(), createElementBlock('div', _l, toDisplayString(unref(b).label), 1))
                    : createCommentVNode('', true),
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(J.value, (G, a) => {
                      var _a, _b
                      return (
                        openBlock(),
                        createElementBlock(
                          'div',
                          {
                            key: a,
                            class: 'dp__calendar_header_item',
                            role: 'gridcell',
                            'data-test-id': 'calendar-header',
                            'aria-label':
                              (_b = (_a = unref(A)) == null ? void 0 : _a.weekDay) == null ? void 0 : _b.call(_a, a)
                          },
                          [
                            g.$slots['calendar-header']
                              ? renderSlot(g.$slots, 'calendar-header', {
                                  key: 0,
                                  day: G,
                                  index: a
                                })
                              : createCommentVNode('', true),
                            g.$slots['calendar-header']
                              ? createCommentVNode('', true)
                              : (openBlock(),
                                createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(G), 1)], 64))
                          ],
                          8,
                          Al
                        )
                      )
                    }),
                    128
                  ))
                ]),
                C[2] || (C[2] = createBaseVNode('div', { class: 'dp__calendar_header_separator' }, null, -1)),
                createVNode(
                  Transition,
                  {
                    name: Z.value,
                    css: !!unref(d)
                  },
                  {
                    default: withCtx(() => [
                      Q.value
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: 'dp__calendar',
                              role: 'rowgroup',
                              onMouseleave: C[1] || (C[1] = (G) => (ae.value = false))
                            },
                            [
                              (openBlock(true),
                              createElementBlock(
                                Fragment,
                                null,
                                renderList(
                                  L.value,
                                  (G, a) => (
                                    openBlock(),
                                    createElementBlock(
                                      'div',
                                      {
                                        key: a,
                                        class: 'dp__calendar_row',
                                        role: 'row'
                                      },
                                      [
                                        unref(b)
                                          ? (openBlock(),
                                            createElementBlock('div', Pl, [
                                              createBaseVNode('div', Tl, toDisplayString(ie(G.days)), 1)
                                            ]))
                                          : createCommentVNode('', true),
                                        (openBlock(true),
                                        createElementBlock(
                                          Fragment,
                                          null,
                                          renderList(G.days, (f, S) => {
                                            var _a, _b, _c
                                            return (
                                              openBlock(),
                                              createElementBlock(
                                                'div',
                                                {
                                                  id: unref(V)(f.value),
                                                  ref_for: true,
                                                  ref: (te) => ue(te, a, S),
                                                  key: S + a,
                                                  role: 'gridcell',
                                                  class: 'dp__calendar_item',
                                                  'aria-selected':
                                                    (f.classData.dp__active_date ||
                                                      f.classData.dp__range_start ||
                                                      f.classData.dp__range_end) ??
                                                    void 0,
                                                  'aria-disabled': f.classData.dp__cell_disabled || void 0,
                                                  'aria-label':
                                                    (_b = (_a = unref(A)) == null ? void 0 : _a.day) == null
                                                      ? void 0
                                                      : _b.call(_a, f),
                                                  tabindex: !f.current && unref(l).hideOffsetDates ? void 0 : 0,
                                                  'data-test-id': unref(V)(f.value),
                                                  onClick: withModifiers((te) => le(te, f), ['prevent']),
                                                  onTouchend: (te) => le(te, f, false),
                                                  onKeydown: (te) => unref(P)(te, () => g.$emit('select-date', f)),
                                                  onMouseenter: (te) => E(f, a, S),
                                                  onMouseleave: (te) => ce(f),
                                                  onMousedown: (te) => m(f),
                                                  onMouseup: C[0] || (C[0] = (te) => (ae.value = false))
                                                },
                                                [
                                                  createBaseVNode(
                                                    'div',
                                                    {
                                                      class: normalizeClass(['dp__cell_inner', f.classData])
                                                    },
                                                    [
                                                      g.$slots.day && Ae.value(f)
                                                        ? renderSlot(g.$slots, 'day', {
                                                            key: 0,
                                                            day: +f.text,
                                                            date: f.value
                                                          })
                                                        : createCommentVNode('', true),
                                                      g.$slots.day
                                                        ? createCommentVNode('', true)
                                                        : (openBlock(),
                                                          createElementBlock(
                                                            Fragment,
                                                            { key: 1 },
                                                            [createTextVNode(toDisplayString(f.text), 1)],
                                                            64
                                                          )),
                                                      f.marker && Ae.value(f)
                                                        ? (openBlock(),
                                                          createElementBlock(
                                                            Fragment,
                                                            { key: 2 },
                                                            [
                                                              g.$slots.marker
                                                                ? renderSlot(g.$slots, 'marker', {
                                                                    key: 0,
                                                                    marker: f.marker,
                                                                    day: +f.text,
                                                                    date: f.value
                                                                  })
                                                                : (openBlock(),
                                                                  createElementBlock(
                                                                    'div',
                                                                    {
                                                                      key: 1,
                                                                      class: normalizeClass(fe.value(f.marker)),
                                                                      style: normalizeStyle(
                                                                        f.marker.color
                                                                          ? { backgroundColor: f.marker.color }
                                                                          : {}
                                                                      )
                                                                    },
                                                                    null,
                                                                    6
                                                                  ))
                                                            ],
                                                            64
                                                          ))
                                                        : createCommentVNode('', true),
                                                      ge.value(f.value)
                                                        ? (openBlock(),
                                                          createElementBlock(
                                                            'div',
                                                            {
                                                              key: 3,
                                                              ref_for: true,
                                                              ref: 'active-tooltip',
                                                              class: 'dp__marker_tooltip',
                                                              style: normalizeStyle(ve.value)
                                                            },
                                                            [
                                                              ((_c = f.marker) == null ? void 0 : _c.tooltip)
                                                                ? (openBlock(),
                                                                  createElementBlock(
                                                                    'div',
                                                                    {
                                                                      key: 0,
                                                                      class: 'dp__tooltip_content',
                                                                      onClick: h2
                                                                    },
                                                                    [
                                                                      (openBlock(true),
                                                                      createElementBlock(
                                                                        Fragment,
                                                                        null,
                                                                        renderList(
                                                                          f.marker.tooltip,
                                                                          (te, ne) => (
                                                                            openBlock(),
                                                                            createElementBlock(
                                                                              'div',
                                                                              {
                                                                                key: ne,
                                                                                class: 'dp__tooltip_text'
                                                                              },
                                                                              [
                                                                                g.$slots['marker-tooltip']
                                                                                  ? renderSlot(
                                                                                      g.$slots,
                                                                                      'marker-tooltip',
                                                                                      {
                                                                                        key: 0,
                                                                                        tooltip: te,
                                                                                        day: f.value
                                                                                      }
                                                                                    )
                                                                                  : createCommentVNode('', true),
                                                                                g.$slots['marker-tooltip']
                                                                                  ? createCommentVNode('', true)
                                                                                  : (openBlock(),
                                                                                    createElementBlock(
                                                                                      Fragment,
                                                                                      { key: 1 },
                                                                                      [
                                                                                        createBaseVNode(
                                                                                          'div',
                                                                                          {
                                                                                            class: 'dp__tooltip_mark',
                                                                                            style: normalizeStyle(
                                                                                              te.color
                                                                                                ? {
                                                                                                    backgroundColor:
                                                                                                      te.color
                                                                                                  }
                                                                                                : {}
                                                                                            )
                                                                                          },
                                                                                          null,
                                                                                          4
                                                                                        ),
                                                                                        createBaseVNode(
                                                                                          'div',
                                                                                          null,
                                                                                          toDisplayString(te.text),
                                                                                          1
                                                                                        )
                                                                                      ],
                                                                                      64
                                                                                    ))
                                                                              ]
                                                                            )
                                                                          )
                                                                        ),
                                                                        128
                                                                      )),
                                                                      createBaseVNode(
                                                                        'div',
                                                                        {
                                                                          class: 'dp__arrow_bottom_tp',
                                                                          style: normalizeStyle(he.value)
                                                                        },
                                                                        null,
                                                                        4
                                                                      )
                                                                    ]
                                                                  ))
                                                                : createCommentVNode('', true)
                                                            ],
                                                            4
                                                          ))
                                                        : createCommentVNode('', true)
                                                    ],
                                                    2
                                                  )
                                                ],
                                                40,
                                                $l
                                              )
                                            )
                                          }),
                                          128
                                        ))
                                      ]
                                    )
                                  )
                                ),
                                128
                              ))
                            ],
                            32
                          ))
                        : createCommentVNode('', true)
                    ]),
                    _: 3
                  },
                  8,
                  ['name', 'css']
                )
              ],
              2
            )
          ],
          2
        )
      )
    )
  }
})
var Rl = (e, k, p, r) => {
  const o = ref([]),
    s = ref(/* @__PURE__ */ new Date()),
    n = ref(),
    {
      getDate: l,
      rootEmit: d,
      calendars: B,
      month: A,
      year: I,
      time: b,
      modelValue: i,
      rootProps: M,
      today: c,
      state: T,
      defaults: {
        multiCalendars: v,
        startTime: Y,
        range: V,
        config: P,
        safeDates: F,
        multiDates: q,
        timeConfig: R,
        flow: w
      }
    } = $e(),
    { validateMonthYearInRange: u, isDisabled: D, isDateRangeAllowed: N, checkMinMaxRange: Q } = at(),
    {
      updateTimeValues: ae,
      getSetDateTime: Z,
      assignTime: ve,
      assignStartTime: he,
      validateTime: L,
      disabledTimesConfig: J
    } = Qa(r),
    { formatDay: W } = bt(),
    { resetDateTime: oe, setTime: z, isDateBefore: ee, isDateEqual: fe, getDaysInBetween: ge } = je(),
    { checkRangeAutoApply: De, getRangeWithFixedDate: Ae, handleMultiDatesSelect: re2, setPresetDate: H } = oa(),
    { getMapDate: E } = Ee()
  jt(() => h2(T.isTextInputDate))
  const ce = (_) => (!P.value.keepViewOnOffsetClick || _ ? true : !n.value),
    ue = (_, X, pe, Me = false) => {
      var _a, _b, _c
      ce(Me) &&
        ((_a = B.value)[_] ?? (_a[_] = B.value[_] = { month: 0, year: 0 }),
        (B.value[_].month = X ?? ((_b = B.value[_]) == null ? void 0 : _b.month)),
        (B.value[_].year = pe ?? ((_c = B.value[_]) == null ? void 0 : _c.year)))
    },
    y = () => {
      M.autoApply && k('select-date')
    },
    $ = () => {
      Y.value && he(Y.value)
    }
  onMounted(() => {
    ;(i.value || (Fe(), $()), h2(true), M.focusStartDate && M.startDate && Fe())
  })
  const ie = computed(() => {
      var _a, _b, _c
      return ((_b = (_a = w.value) == null ? void 0 : _a.steps) == null ? void 0 : _b.length) &&
        !((_c = w.value) == null ? void 0 : _c.partial)
        ? e.flowStep === w.value.steps.length
        : true
    }),
    le = () => {
      var _a, _b, _c
      M.autoApply &&
        ie.value &&
        k(
          'auto-apply',
          ((_a = w.value) == null ? void 0 : _a.partial)
            ? e.flowStep !== ((_c = (_b = w.value) == null ? void 0 : _b.steps) == null ? void 0 : _c.length)
            : false
        )
    },
    h2 = (_ = false) => {
      if (i.value) return Array.isArray(i.value) ? ((o.value = i.value), S(_)) : C(i.value, _)
      if (v.value.count && _ && !M.startDate) return g(l(), _)
    },
    m = () =>
      Array.isArray(i.value) && V.value.enabled ? getMonth(i.value[0]) === getMonth(i.value[1] ?? i.value[0]) : false,
    x = (_) => {
      const X = addMonths(_, 1)
      return { month: getMonth(X), year: getYear(X) }
    },
    g = (_ = l(), X = false) => {
      if (
        ((!v.value.count || !v.value.static || X) && ue(0, getMonth(_), getYear(_)),
        v.value.count && (!i.value || m() || !v.value.solo) && (!v.value.solo || X))
      )
        for (let pe = 1; pe < v.value.count; pe++) {
          const Me = set(l(), { month: A.value(pe - 1), year: I.value(pe - 1) }),
            Be = add(Me, { months: 1 })
          B.value[pe] = { month: getMonth(Be), year: getYear(Be) }
        }
    },
    C = (_, X) => {
      ;(g(_),
        ve('hours', getHours(_)),
        ve('minutes', getMinutes(_)),
        ve('seconds', getSeconds(_)),
        v.value.count && X && Ce())
    },
    G = (_) => {
      if (v.value.count) {
        if (v.value.solo) return 0
        const X = getMonth(_[0]),
          pe = getMonth(_[1])
        return Math.abs(pe - X) < v.value.count ? 0 : 1
      }
      return 1
    },
    a = (_, X) => {
      _[1] && V.value.showLastInRange ? g(_[G(_)], X) : g(_[0], X)
      const pe = (Me, Be) => [Me(_[0]), (_ == null ? void 0 : _[1]) ? Me(_[1]) : b[Be][1]]
      ;(ve('hours', pe(getHours, 'hours')),
        ve('minutes', pe(getMinutes, 'minutes')),
        ve('seconds', pe(getSeconds, 'seconds')))
    },
    f = (_, X) => {
      if ((V.value.enabled || M.weekPicker) && !q.value.enabled) return a(_, X)
      if (q.value.enabled && X) {
        const pe = _[_.length - 1]
        return C(pe, X)
      }
    },
    S = (_) => {
      const X = i.value
      ;(f(X, _), v.value.count && v.value.solo && Ce())
    },
    te = (_, X) => {
      const pe = set(l(), { month: A.value(X), year: I.value(X) }),
        Me = _ < 0 ? addMonths(pe, 1) : subMonths(pe, 1)
      u(getMonth(Me), getYear(Me), _ < 0, M.preventMinMaxNavigation) &&
        (ue(X, getMonth(Me), getYear(Me)),
        d('update-month-year', { instance: X, month: getMonth(Me), year: getYear(Me) }),
        v.value.count && !v.value.solo && ne(X),
        p())
    },
    ne = (_) => {
      for (let X = _ - 1; X >= 0; X--) {
        const pe = subMonths(set(l(), { month: A.value(X + 1), year: I.value(X + 1) }), 1)
        ue(X, getMonth(pe), getYear(pe))
      }
      for (let X = _ + 1; X <= v.value.count - 1; X++) {
        const pe = addMonths(set(l(), { month: A.value(X - 1), year: I.value(X - 1) }), 1)
        ue(X, getMonth(pe), getYear(pe))
      }
    },
    Ce = () => {
      if (Array.isArray(i.value) && i.value.length === 2) {
        const _ = l(l(i.value[1] ?? addMonths(i.value[0], 1))),
          [X, pe] = [getMonth(i.value[0]), getYear(i.value[0])],
          [Me, Be] = [getMonth(i.value[1]), getYear(i.value[1])]
        ;(X !== Me || (X === Me && pe !== Be)) && v.value.solo && ue(1, getMonth(_), getYear(_))
      } else i.value && !Array.isArray(i.value) && (ue(0, getMonth(i.value), getYear(i.value)), g(l()))
    },
    Fe = () => {
      M.startDate && (ue(0, getMonth(l(M.startDate)), getYear(l(M.startDate))), v.value.count && ne(0))
    },
    kt = (_, X) => {
      if (P.value.monthChangeOnScroll) {
        const pe = Date.now() - s.value.getTime(),
          Me = Math.abs(_.deltaY)
        let Be = 500
        ;(Me > 1 && (Be = 100),
          Me > 100 && (Be = 0),
          pe > Be &&
            ((s.value = /* @__PURE__ */ new Date()),
            te(P.value.monthChangeOnScroll === 'inverse' ? _.deltaY : -_.deltaY, X)))
      }
    },
    Rt = (_, X, pe = false) => {
      P.value.monthChangeOnArrows && M.vertical === pe && Ut(_, X)
    },
    Ut = (_, X) => {
      te(_ === 'right' ? -1 : 1, X)
    },
    sa = (_) => {
      if (F.value.markers) return E(_.value, F.value.markers)
    },
    ua = (_, X) => {
      switch (M.sixWeeks === true ? 'append' : M.sixWeeks) {
        case 'prepend':
          return [true, false]
        case 'center':
          return [_ == 0, true]
        case 'fair':
          return [_ == 0 || X > _, true]
        case 'append':
          return [false, false]
        default:
          return [false, false]
      }
    },
    ia = (_, X, pe, Me) => {
      if (M.sixWeeks && _.length < 6) {
        const Be = 6 - _.length,
          ft = (X.getDay() + 7 - Me) % 7,
          Qt = 6 - ((pe.getDay() + 7 - Me) % 7),
          [Bt, fa] = ua(ft, Qt)
        for (let wt = 1; wt <= Be; wt++)
          if (fa ? !!(wt % 2) == Bt : Bt) {
            const Gt = _[0].days[0],
              ma = Ct(addDays(Gt.value, -7), getMonth(X))
            _.unshift({ days: ma })
          } else {
            const Gt = _[_.length - 1],
              ma = Gt.days[Gt.days.length - 1],
              on = Ct(addDays(ma.value, 1), getMonth(X))
            _.push({ days: on })
          }
      }
      return _
    },
    Ct = (_, X) => {
      const pe = l(_),
        Me = []
      for (let Be = 0; Be < 7; Be++) {
        const ft = addDays(pe, Be),
          xt = getMonth(ft) !== X
        Me.push({
          text: M.hideOffsetDates && xt ? '' : W(ft),
          value: ft,
          current: !xt,
          classData: {}
        })
      }
      return Me
    },
    ca = (_, X) => {
      const pe = [],
        Me = l(new Date(X, _)),
        Be = l(new Date(X, _ + 1, 0)),
        ft = M.weekStart,
        xt = startOfWeek(Me, { weekStartsOn: ft }),
        Qt = (Bt) => {
          const fa = Ct(Bt, _)
          if ((pe.push({ days: fa }), !pe[pe.length - 1].days.some((wt) => fe(l(wt.value), oe(Be))))) {
            const wt = addDays(Bt, 7)
            Qt(wt)
          }
        }
      return (Qt(xt), ia(pe, Me, Be, ft))
    },
    da = (_) => {
      const X = z({ hours: b.hours, minutes: b.minutes, seconds: vt() }, l(_.value))
      ;(d('date-click', X),
        q.value.enabled ? re2(X, q.value.limit) : (i.value = X),
        r(),
        nextTick().then(() => {
          le()
        }))
    },
    qt = (_) => (V.value.noDisabledRange ? ge(o.value[0], _).some((pe) => D(pe)) : false),
    va = () => {
      ;((o.value = i.value ? i.value.slice().filter((_) => !!_) : []),
        o.value.length === 2 && !(V.value.fixedStart || V.value.fixedEnd) && (o.value = []))
    },
    me = (_, X) => {
      const pe = [l(_.value), addDays(l(_.value), +V.value.autoRange)]
      N(pe) ? (X && ze(_.value), (o.value = pe)) : d('invalid-date', _.value)
    },
    ze = (_) => {
      const X = getMonth(l(_)),
        pe = getYear(l(_))
      if ((ue(0, X, pe), v.value.count > 0))
        for (let Me = 1; Me < v.value.count; Me++) {
          const Be = x(set(l(_), { year: I.value(Me - 1), month: A.value(Me - 1) }))
          ue(Me, Be.month, Be.year)
        }
    },
    nt = (_) => {
      if (qt(_.value) || !Q(_.value, i.value, V.value.fixedStart ? 0 : 1)) return d('invalid-date', _.value)
      o.value = Ae(l(_.value))
    },
    Yt = (_, X) => {
      if ((va(), V.value.autoRange)) return me(_, X)
      if (V.value.fixedStart || V.value.fixedEnd) return nt(_)
      o.value[0]
        ? Q(l(_.value), i.value) && !qt(_.value)
          ? ee(l(_.value), l(o.value[0]))
            ? (o.value.unshift(l(_.value)), d('range-end', o.value[0]))
            : ((o.value[1] = l(_.value)), d('range-end', o.value[1]))
          : d('invalid-date', _.value)
        : ((o.value[0] = l(_.value)), d('range-start', o.value[0]))
    },
    vt = (_ = true) =>
      R.value.enableSeconds ? (Array.isArray(b.seconds) ? (_ ? b.seconds[0] : b.seconds[1]) : b.seconds) : 0,
    Ot = (_) => {
      o.value[_] = z(
        {
          hours: b.hours[_],
          minutes: b.minutes[_],
          seconds: vt(_ !== 1)
        },
        o.value[_]
      )
    },
    Ga = () => {
      var _a, _b
      o.value[0] &&
        o.value[1] &&
        +((_a = o.value) == null ? void 0 : _a[0]) > +((_b = o.value) == null ? void 0 : _b[1]) &&
        (o.value.reverse(), d('range-start', o.value[0]), d('range-end', o.value[1]))
    },
    Ja = () => {
      var _a, _b, _c
      o.value.length &&
        (o.value[0] && !o.value[1] ? Ot(0) : (Ot(0), Ot(1), r()),
        Ga(),
        (i.value = o.value.slice()),
        De(
          o.value,
          k,
          o.value.length < 2 || ((_a = w.value) == null ? void 0 : _a.steps.length)
            ? e.flowStep !== ((_c = (_b = w.value) == null ? void 0 : _b.steps) == null ? void 0 : _c.length)
            : false
        ))
    },
    Xa = (_, X = false) => {
      if (D(_.value) || (!_.current && M.hideOffsetDates)) return d('invalid-date', _.value)
      if (((n.value = structuredClone(_)), !V.value.enabled)) return da(_)
      Array.isArray(b.hours) && Array.isArray(b.minutes) && !q.value.enabled && (Yt(_, X), Ja())
    },
    Za = (_, X) => {
      var _a, _b
      ;(ue(_, X.month, X.year, true),
        v.value.count && !v.value.solo && ne(_),
        d('update-month-year', { instance: _, month: X.month, year: X.year }),
        p(v.value.solo ? _ : void 0))
      const pe = ((_b = (_a = w.value) == null ? void 0 : _a.steps) == null ? void 0 : _b.length)
        ? w.value.steps[e.flowStep]
        : void 0
      !X.fromNav && (pe === qe.month || pe === qe.year) && r()
    },
    en = (_) => {
      ;(H({
        value: _
      }),
        y(),
        M.multiCalendars && nextTick().then(() => h2(true)))
    },
    tn = () => {
      var _a
      let _ = l()
      return (
        ((_a = M.actionRow) == null ? void 0 : _a.nowBtnRound) &&
          (_ = roundToNearestMinutes(_, {
            roundingMethod: M.actionRow.nowBtnRound.rounding ?? 'ceil',
            nearestTo: M.actionRow.nowBtnRound.roundTo ?? 15
          })),
        _
      )
    },
    an = () => {
      const _ = tn()
      ;(!V.value.enabled && !q.value.enabled
        ? (i.value = _)
        : i.value && Array.isArray(i.value) && i.value[0]
          ? q.value.enabled
            ? (i.value = [...i.value, _])
            : (i.value = ee(_, i.value[0]) ? [_, i.value[0]] : [i.value[0], _])
          : (i.value = [_]),
        y())
    },
    nn = () => {
      if (Array.isArray(i.value))
        if (q.value.enabled) {
          const _ = rn()
          i.value[i.value.length - 1] = Z(_)
        } else i.value = i.value.map((_, X) => _ && Z(_, X))
      else i.value = Z(i.value)
      k('time-update')
    },
    rn = () => (Array.isArray(i.value) && i.value.length ? i.value[i.value.length - 1] : null),
    ln = (_) => {
      let X = ''
      if (V.value.enabled && Array.isArray(i.value))
        for (const pe of Object.keys(_)) {
          const Me = _[pe]
          Array.isArray(Me) && (b[pe][0] !== Me[0] && (X = 'range-start'), b[pe][1] !== Me[1] && (X = 'range-start'))
        }
      return X
    }
  return {
    calendars: B,
    modelValue: i,
    month: A,
    year: I,
    time: b,
    disabledTimesConfig: J,
    today: c,
    validateTime: L,
    getCalendarDays: ca,
    getMarker: sa,
    handleScroll: kt,
    handleSwipe: Ut,
    handleArrow: Rt,
    selectDate: Xa,
    updateMonthYear: Za,
    presetDate: en,
    selectCurrentDate: an,
    updateTime: (_) => {
      const X = ln(_)
      ;(ae(_, nn), X && d(X, i.value[X === 'range-start' ? 0 : 1]))
    },
    assignMonthAndYear: g,
    setStartTime: $
  }
}
var Cl = () => {
  const {
      isModelAuto: e,
      matchDate: k,
      isDateAfter: p,
      isDateBefore: r,
      isDateBetween: o,
      isDateEqual: s,
      getWeekFromDate: n,
      getBeforeAndAfterInRange: l
    } = je(),
    {
      getDate: d,
      today: B,
      rootProps: A,
      defaults: { multiCalendars: I, multiDates: b, ui: i, highlight: M, safeDates: c, range: T },
      modelValue: v
    } = $e(),
    { isDisabled: Y } = at(),
    V = ref(null),
    P = (h2) => {
      ;(!h2.current && A.hideOffsetDates) || (V.value = h2.value)
    },
    F = () => {
      V.value = null
    },
    q = (h2) =>
      Array.isArray(v.value) && T.value.enabled && v.value[0] && V.value
        ? h2
          ? p(V.value, v.value[0])
          : r(V.value, v.value[0])
        : true,
    R = (h2, m) => {
      const x = () => (v.value ? (m ? v.value[0] || null : v.value[1]) : null),
        g = v.value && Array.isArray(v.value) ? x() : null
      return s(d(h2.value), g)
    },
    w = (h2) => {
      const m = Array.isArray(v.value) ? v.value[0] : null
      return h2 ? !r(V.value, m) : true
    },
    u = (h2, m = true) =>
      (T.value.enabled || A.weekPicker) && Array.isArray(v.value) && v.value.length === 2
        ? A.hideOffsetDates && !h2.current
          ? false
          : s(d(h2.value), v.value[m ? 0 : 1])
        : T.value.enabled
          ? (R(h2, m) && w(m)) || (s(h2.value, Array.isArray(v.value) ? v.value[0] : null) && q(m))
          : false,
    D = (h2, m) => {
      if (Array.isArray(v.value) && v.value[0] && v.value.length === 1) {
        const x = s(h2.value, V.value)
        return m ? p(v.value[0], h2.value) && x : r(v.value[0], h2.value) && x
      }
      return false
    },
    N = (h2) =>
      !v.value || (A.hideOffsetDates && !h2.current)
        ? false
        : T.value.enabled
          ? A.modelAuto && Array.isArray(v.value)
            ? s(h2.value, v.value[0] ?? B)
            : false
          : b.value.enabled && Array.isArray(v.value)
            ? v.value.some((m) => s(m, h2.value))
            : s(h2.value, v.value ? v.value : B),
    Q = (h2) => {
      if (T.value.autoRange || A.weekPicker) {
        if (V.value) {
          if (A.hideOffsetDates && !h2.current) return false
          const m = addDays(V.value, +T.value.autoRange),
            x = n(d(V.value), A.weekStart)
          return A.weekPicker ? s(x[1], d(h2.value)) : s(m, d(h2.value))
        }
        return false
      }
      return false
    },
    ae = (h2) => {
      if (T.value.autoRange || A.weekPicker) {
        if (V.value) {
          const m = addDays(V.value, +T.value.autoRange)
          if (A.hideOffsetDates && !h2.current) return false
          const x = n(d(V.value), A.weekStart)
          return A.weekPicker ? p(h2.value, x[0]) && r(h2.value, x[1]) : p(h2.value, V.value) && r(h2.value, m)
        }
        return false
      }
      return false
    },
    Z = (h2) => {
      if (T.value.autoRange || A.weekPicker) {
        if (V.value) {
          if (A.hideOffsetDates && !h2.current) return false
          const m = n(d(V.value), A.weekStart)
          return A.weekPicker ? s(m[0], h2.value) : s(V.value, h2.value)
        }
        return false
      }
      return false
    },
    ve = (h2) => o(v.value, V.value, h2.value),
    he = () => (A.modelAuto && Array.isArray(v.value) ? !!v.value[0] : false),
    L = () => (A.modelAuto ? e(v.value) : true),
    J = (h2) => {
      if (A.weekPicker) return false
      const m = T.value.enabled ? !u(h2) && !u(h2, false) : true
      return !Y(h2.value) && !N(h2) && !(!h2.current && A.hideOffsetDates) && m
    },
    W = (h2) => (T.value.enabled ? (A.modelAuto ? he() && N(h2) : false) : N(h2)),
    oe = (h2) => (M.value ? k(h2.value, c.value.highlight) : false),
    z = (h2) => {
      const m = Y(h2.value)
      return m && (typeof M.value == 'function' ? !M.value(h2.value, m) : !M.value.options.highlightDisabled)
    },
    ee = (h2) => {
      var _a
      return typeof M.value == 'function'
        ? M.value(h2.value)
        : (_a = M.value.weekdays) == null
          ? void 0
          : _a.includes(h2.value.getDay())
    },
    fe = (h2) =>
      (T.value.enabled || A.weekPicker) &&
      (!(I.value.count > 0) || h2.current) &&
      L() &&
      !(!h2.current && A.hideOffsetDates) &&
      !N(h2)
        ? ve(h2)
        : false,
    ge = (h2) => {
      if (Array.isArray(v.value) && v.value.length === 1) {
        const { before: m, after: x } = l(+T.value.maxRange, v.value[0])
        return isBefore(h2.value, m) || isAfter(h2.value, x)
      }
      return false
    },
    De = (h2) => {
      if (Array.isArray(v.value) && v.value.length === 1) {
        const { before: m, after: x } = l(+T.value.minRange, v.value[0])
        return o([m, x], v.value[0], h2.value)
      }
      return false
    },
    Ae = (h2) =>
      T.value.enabled && (T.value.maxRange || T.value.minRange)
        ? T.value.maxRange && T.value.minRange
          ? ge(h2) || De(h2)
          : T.value.maxRange
            ? ge(h2)
            : De(h2)
        : false,
    re2 = (h2) => {
      const { isRangeStart: m, isRangeEnd: x } = ue(h2),
        g = T.value.enabled ? m || x : false
      return {
        dp__cell_offset: !h2.current,
        dp__pointer: !A.disabled && !(!h2.current && A.hideOffsetDates) && !Y(h2.value) && !Ae(h2),
        dp__cell_disabled: Y(h2.value) || Ae(h2),
        dp__cell_highlight: !z(h2) && (oe(h2) || ee(h2)) && !W(h2) && !g && !Z(h2) && !(fe(h2) && A.weekPicker) && !x,
        dp__cell_highlight_active: !z(h2) && (oe(h2) || ee(h2)) && W(h2),
        dp__today: !A.noToday && s(h2.value, B) && h2.current,
        'dp--past': r(h2.value, B),
        'dp--future': p(h2.value, B)
      }
    },
    H = (h2) => ({
      dp__active_date: W(h2),
      dp__date_hover: J(h2)
    }),
    E = (h2) => {
      if (v.value && !Array.isArray(v.value)) {
        const m = n(v.value, A.weekStart)
        return {
          ...$(h2),
          dp__range_start: s(m[0], h2.value),
          dp__range_end: s(m[1], h2.value),
          dp__range_between_week: p(h2.value, m[0]) && r(h2.value, m[1])
        }
      }
      return {
        ...$(h2)
      }
    },
    ce = (h2) => {
      if (v.value && Array.isArray(v.value)) {
        const m = n(v.value[0], A.weekStart),
          x = v.value[1] ? n(v.value[1], A.weekStart) : []
        return {
          ...$(h2),
          dp__range_start: s(m[0], h2.value) || s(x[0], h2.value),
          dp__range_end: s(m[1], h2.value) || s(x[1], h2.value),
          dp__range_between_week: (p(h2.value, m[0]) && r(h2.value, m[1])) || (p(h2.value, x[0]) && r(h2.value, x[1])),
          dp__range_between: p(h2.value, m[1]) && r(h2.value, x[0])
        }
      }
      return {
        ...$(h2)
      }
    },
    ue = (h2) => {
      const m = I.value.count > 0 ? h2.current && u(h2) && L() : u(h2) && L(),
        x = I.value.count > 0 ? h2.current && u(h2, false) && L() : u(h2, false) && L()
      return { isRangeStart: m, isRangeEnd: x }
    },
    y = (h2) => {
      const { isRangeStart: m, isRangeEnd: x } = ue(h2)
      return {
        dp__range_start: m,
        dp__range_end: x,
        dp__range_between: fe(h2),
        dp__date_hover: s(h2.value, V.value) && !m && !x && !A.weekPicker,
        dp__date_hover_start: D(h2, true),
        dp__date_hover_end: D(h2, false)
      }
    },
    $ = (h2) => ({
      ...y(h2),
      dp__cell_auto_range: ae(h2),
      dp__cell_auto_range_start: Z(h2),
      dp__cell_auto_range_end: Q(h2)
    }),
    ie = (h2) =>
      T.value.enabled
        ? T.value.autoRange
          ? $(h2)
          : A.modelAuto
            ? { ...H(h2), ...y(h2) }
            : A.weekPicker
              ? ce(h2)
              : y(h2)
        : A.weekPicker
          ? E(h2)
          : H(h2)
  return {
    setHoverDate: P,
    clearHoverDate: F,
    getDayClassData: (h2) =>
      A.hideOffsetDates && !h2.current
        ? {}
        : {
            ...re2(h2),
            ...ie(h2),
            [i.value.dayClass ? i.value.dayClass(h2.value, v.value) : '']: true,
            ...i.value.calendarCell
          }
  }
}
var Yl = { key: 0 }
var Ol = defineComponent({
  __name: 'DatePicker',
  props: mergeDefaults(
    {
      flowStep: {},
      collapse: { type: Boolean },
      menuWrapRef: {},
      noOverlayFocus: { type: Boolean }
    },
    Rr
  ),
  emits: ['mount', 'update-flow-step', 'reset-flow', 'focus-menu', 'select-date', 'time-update', 'auto-apply'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      {
        month: s,
        year: n,
        modelValue: l,
        time: d,
        disabledTimesConfig: B,
        today: A,
        validateTime: I,
        getCalendarDays: b,
        getMarker: i,
        handleArrow: M,
        handleScroll: c,
        handleSwipe: T,
        selectDate: v,
        updateMonthYear: Y,
        presetDate: V,
        selectCurrentDate: P,
        updateTime: F,
        assignMonthAndYear: q,
        setStartTime: R
      } = Rl(o, r, E, ce),
      w = useSlots(),
      { setHoverDate: u, getDayClassData: D, clearHoverDate: N } = Cl(),
      {
        getDate: Q,
        rootEmit: ae,
        rootProps: Z,
        defaults: { multiCalendars: ve, timeConfig: he }
      } = $e(),
      { getYears: L, getMonths: J } = na(),
      { getCellId: W } = je(),
      { mapSlots: oe } = yt(),
      z = useTemplateRef('calendar-header'),
      ee = useTemplateRef('calendar'),
      fe = useTemplateRef('time-picker'),
      ge = oe(w, 'calendar'),
      De = oe(w, 'monthYear'),
      Ae = oe(w, 'timePicker'),
      re2 = (g) => {
        r('mount', g)
      }
    watch(
      ve,
      (g, C) => {
        g.count - C.count > 0 && q()
      },
      { deep: true }
    )
    const H = computed(
      () => (g) =>
        b(s.value(g), n.value(g)).map((C) => ({
          ...C,
          days: C.days.map((G) => ((G.marker = i(G)), (G.classData = D(G)), G))
        }))
    )
    function E(g) {
      var _a, _b, _c
      g || g === 0
        ? (_b = (_a = ee.value) == null ? void 0 : _a[g]) == null
          ? void 0
          : _b.triggerTransition(s.value(g), n.value(g))
        : (_c = ee.value) == null
          ? void 0
          : _c.forEach((C, G) => (C == null ? void 0 : C.triggerTransition(s.value(G), n.value(G))))
    }
    function ce() {
      r('update-flow-step')
    }
    const ue = (g, C, G = 0) => {
        var _a, _b
        ;(_b = (_a = z.value) == null ? void 0 : _a[G]) == null ? void 0 : _b.toggleMonthPicker(g, C)
      },
      y = (g, C, G = 0) => {
        var _a, _b
        ;(_b = (_a = z.value) == null ? void 0 : _a[G]) == null ? void 0 : _b.toggleYearPicker(g, C)
      },
      $ = (g, C, G) => {
        var _a
        ;(_a = fe.value) == null ? void 0 : _a.toggleTimePicker(g, C, G)
      },
      ie = (g, C) => {
        var _a
        if (!Z.range) {
          const G = l.value ? l.value : A,
            a = C ? Q(C) : G,
            f = g ? startOfWeek(a, { weekStartsOn: 1 }) : endOfWeek(a, { weekStartsOn: 1 })
          ;(v({
            value: f,
            current: getMonth(a) === s.value(0),
            text: '',
            classData: {}
          }),
            (_a = document.getElementById(W(f))) == null ? void 0 : _a.focus())
        }
      },
      le = (g) => {
        var _a, _b
        ;(_b = (_a = z.value) == null ? void 0 : _a[0]) == null ? void 0 : _b.handleMonthYearChange(g, true)
      },
      h2 = (g) => {
        Y(0, { month: s.value(0), year: n.value(0) + (g ? 1 : -1), fromNav: true })
      },
      m = (g) => {
        ;(ae('overlay-toggle', { open: false, overlay: g }), r('focus-menu'))
      }
    return (
      k({
        clearHoverDate: N,
        presetDate: V,
        selectCurrentDate: P,
        handleArrow: M,
        updateMonthYear: Y,
        setStartTime: R,
        toggleMonthPicker: ue,
        toggleYearPicker: y,
        toggleTimePicker: $,
        getSidebarProps: () => ({
          modelValue: l,
          month: s,
          year: n,
          time: d,
          updateTime: F,
          updateMonthYear: Y,
          selectDate: v,
          presetDate: V
        }),
        changeMonth: le,
        changeYear: h2,
        selectWeekDate: ie
      }),
      (g, C) => (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              la,
              { collapse: e.collapse },
              {
                default: withCtx(({ instances: G, wrapClass: a }) => [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(
                      G,
                      (f) => (
                        openBlock(),
                        createElementBlock(
                          'div',
                          {
                            key: f,
                            class: normalizeClass(a)
                          },
                          [
                            unref(Z).hideMonthYearSelect
                              ? createCommentVNode('', true)
                              : (openBlock(),
                                createBlock(
                                  Dl,
                                  {
                                    key: 0,
                                    ref_for: true,
                                    ref: 'calendar-header',
                                    months: unref(J)(),
                                    years: unref(L)(),
                                    month: unref(s)(f),
                                    year: unref(n)(f),
                                    instance: f,
                                    'menu-wrap-ref': e.menuWrapRef,
                                    onMount: C[0] || (C[0] = (S) => re2(unref(Mt).header)),
                                    onResetFlow: C[1] || (C[1] = (S) => g.$emit('reset-flow')),
                                    onUpdateMonthYear: (S) => unref(Y)(f, S),
                                    onOverlayClosed: m
                                  },
                                  createSlots({ _: 2 }, [
                                    renderList(unref(De), (S, te) => ({
                                      name: S,
                                      fn: withCtx((ne) => [renderSlot(g.$slots, S, mergeProps({ ref_for: true }, ne))])
                                    }))
                                  ]),
                                  1032,
                                  ['months', 'years', 'month', 'year', 'instance', 'menu-wrap-ref', 'onUpdateMonthYear']
                                )),
                            createVNode(
                              Sl,
                              {
                                ref_for: true,
                                ref: 'calendar',
                                'mapped-dates': H.value(f),
                                instance: f,
                                month: unref(s)(f),
                                year: unref(n)(f),
                                onSelectDate: (S) => unref(v)(S, f !== 1),
                                onSetHoverDate: C[2] || (C[2] = (S) => unref(u)(S)),
                                onHandleScroll: (S) => unref(c)(S, f),
                                onHandleSwipe: (S) => unref(T)(S, f),
                                onMount: C[3] || (C[3] = (S) => re2(unref(Mt).calendar))
                              },
                              createSlots({ _: 2 }, [
                                renderList(unref(ge), (S, te) => ({
                                  name: S,
                                  fn: withCtx((ne) => [
                                    renderSlot(g.$slots, S, mergeProps({ ref_for: true }, { ...ne }))
                                  ])
                                }))
                              ]),
                              1032,
                              [
                                'mapped-dates',
                                'instance',
                                'month',
                                'year',
                                'onSelectDate',
                                'onHandleScroll',
                                'onHandleSwipe'
                              ]
                            )
                          ],
                          2
                        )
                      )
                    ),
                    128
                  ))
                ]),
                _: 3
              },
              8,
              ['collapse']
            ),
            unref(he).enableTimePicker
              ? (openBlock(),
                createElementBlock('div', Yl, [
                  g.$slots['time-picker']
                    ? renderSlot(
                        g.$slots,
                        'time-picker',
                        normalizeProps(mergeProps({ key: 0 }, { time: unref(d), updateTime: unref(F) }))
                      )
                    : (openBlock(),
                      createBlock(
                        qa,
                        {
                          key: 1,
                          ref: 'time-picker',
                          hours: unref(d).hours,
                          minutes: unref(d).minutes,
                          seconds: unref(d).seconds,
                          'disabled-times-config': unref(B),
                          'validate-time': unref(I),
                          'no-overlay-focus': e.noOverlayFocus,
                          onMount: C[4] || (C[4] = (G) => re2(unref(Mt).timePicker)),
                          'onUpdate:hours':
                            C[5] ||
                            (C[5] = (G) =>
                              unref(F)({ hours: G, minutes: unref(d).minutes, seconds: unref(d).seconds })),
                          'onUpdate:minutes':
                            C[6] ||
                            (C[6] = (G) => unref(F)({ hours: unref(d).hours, minutes: G, seconds: unref(d).seconds })),
                          'onUpdate:seconds':
                            C[7] ||
                            (C[7] = (G) => unref(F)({ hours: unref(d).hours, minutes: unref(d).minutes, seconds: G })),
                          onResetFlow: C[8] || (C[8] = (G) => g.$emit('reset-flow'))
                        },
                        createSlots({ _: 2 }, [
                          renderList(unref(Ae), (G, a) => ({
                            name: G,
                            fn: withCtx((f) => [renderSlot(g.$slots, G, normalizeProps(guardReactiveProps(f)))])
                          }))
                        ]),
                        1032,
                        ['hours', 'minutes', 'seconds', 'disabled-times-config', 'validate-time', 'no-overlay-focus']
                      ))
                ]))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    )
  }
})
var xl = (e, k) => {
  const {
      getDate: p,
      modelValue: r,
      year: o,
      calendars: s,
      defaults: { highlight: n, range: l, multiDates: d }
    } = $e(),
    { isDateBetween: B, isDateEqual: A } = je(),
    { checkRangeAutoApply: I, handleMultiDatesSelect: b, setMonthOrYearRange: i } = oa()
  jt()
  const { isDisabled: M } = at(),
    { formatQuarterText: c } = bt(),
    {
      selectYear: T,
      groupedYears: v,
      showYearPicker: Y,
      isDisabled: V,
      toggleYearPicker: P,
      handleYearSelect: F,
      handleYear: q,
      setStartDate: R
    } = Ua(k),
    w = ref()
  onMounted(() => {
    R()
  })
  const u = computed(
      () => (W) =>
        r.value
          ? Array.isArray(r.value)
            ? r.value.some((oe) => isSameQuarter(W, oe))
            : isSameQuarter(r.value, W)
          : false
    ),
    D = (W) => {
      if (l.value.enabled) {
        if (Array.isArray(r.value)) {
          const oe = A(W, r.value[0]) || A(W, r.value[1])
          return B(r.value, w.value, W) && !oe
        }
        return false
      }
      return false
    },
    N = (W, oe) => W.quarter === getQuarter(oe) && W.year === getYear(oe),
    Q = (W) =>
      typeof n.value == 'function'
        ? n.value({ quarter: getQuarter(W), year: getYear(W) })
        : n.value.quarters.some((oe) => N(oe, W)),
    ae = computed(() => (W) => {
      const oe = set(p(), { year: o.value(W) })
      return eachQuarterOfInterval({
        start: startOfYear(oe),
        end: endOfYear(oe)
      }).map((z) => {
        const ee = startOfQuarter(z),
          fe = endOfQuarter(z),
          ge = M(z),
          De = D(ee),
          Ae = Q(ee)
        return {
          text: c(ee, fe),
          value: ee,
          active: u.value(ee),
          highlighted: Ae,
          disabled: ge,
          isBetween: De
        }
      })
    }),
    Z = (W) => {
      ;(b(W, d.value.limit), k('auto-apply', true))
    },
    ve = (W) => {
      ;((r.value = i(W)), I(r.value, k, r.value.length < 2))
    },
    he = (W) => {
      ;((r.value = W), k('auto-apply'))
    }
  return {
    groupedYears: v,
    year: o,
    isDisabled: V,
    quarters: ae,
    showYearPicker: Y,
    modelValue: r,
    selectYear: T,
    toggleYearPicker: P,
    handleYearSelect: F,
    handleYear: q,
    setHoverDate: (W) => {
      w.value = W
    },
    selectQuarter: (W, oe, z) => {
      if (!z)
        return (
          (s.value[oe].month = getMonth(endOfQuarter(W))),
          d.value.enabled ? Z(W) : l.value.enabled ? ve(W) : he(W)
        )
    }
  }
}
var Bl = { class: 'dp--quarter-items' }
var Il = ['data-test-id', 'disabled', 'onClick', 'onMouseover']
var Vl = defineComponent({
  __name: 'QuarterPicker',
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ['reset-flow', 'auto-apply'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e,
      {
        defaults: { config: s }
      } = $e(),
      n = useSlots(),
      { mapSlots: l } = yt(),
      d = l(n, 'yearMode'),
      {
        groupedYears: B,
        year: A,
        isDisabled: I,
        quarters: b,
        modelValue: i,
        showYearPicker: M,
        setHoverDate: c,
        selectQuarter: T,
        toggleYearPicker: v,
        handleYearSelect: Y,
        handleYear: V
      } = xl(o, r)
    return (
      k({
        getSidebarProps: () => ({
          modelValue: i,
          year: A,
          selectQuarter: T,
          handleYearSelect: Y,
          handleYear: V
        })
      }),
      (F, q) => (
        openBlock(),
        createBlock(
          la,
          {
            collapse: e.collapse,
            stretch: ''
          },
          {
            default: withCtx(({ instances: R, wrapClass: w }) => [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(
                  R,
                  (u) => (
                    openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: u,
                        class: normalizeClass(w)
                      },
                      [
                        createBaseVNode(
                          'div',
                          {
                            class: 'dp-quarter-picker-wrap',
                            style: normalizeStyle({ minHeight: `${unref(s).modeHeight}px` })
                          },
                          [
                            F.$slots['top-extra']
                              ? renderSlot(F.$slots, 'top-extra', {
                                  key: 0,
                                  value: unref(i)
                                })
                              : createCommentVNode('', true),
                            createBaseVNode('div', null, [
                              createVNode(
                                za,
                                {
                                  items: unref(B)(u),
                                  instance: u,
                                  'show-year-picker': unref(M)[u],
                                  year: unref(A)(u),
                                  'is-disabled': (D) => unref(I)(u, D),
                                  onHandleYear: (D) => unref(V)(u, D),
                                  onYearSelect: (D) => unref(Y)(D, u),
                                  onToggleYearPicker: (D) =>
                                    unref(v)(u, D == null ? void 0 : D.flow, D == null ? void 0 : D.show)
                                },
                                createSlots({ _: 2 }, [
                                  renderList(unref(d), (D, N) => ({
                                    name: D,
                                    fn: withCtx((Q) => [renderSlot(F.$slots, D, mergeProps({ ref_for: true }, Q))])
                                  }))
                                ]),
                                1032,
                                [
                                  'items',
                                  'instance',
                                  'show-year-picker',
                                  'year',
                                  'is-disabled',
                                  'onHandleYear',
                                  'onYearSelect',
                                  'onToggleYearPicker'
                                ]
                              )
                            ]),
                            createBaseVNode('div', Bl, [
                              (openBlock(true),
                              createElementBlock(
                                Fragment,
                                null,
                                renderList(
                                  unref(b)(u),
                                  (D, N) => (
                                    openBlock(),
                                    createElementBlock('div', { key: N }, [
                                      createBaseVNode(
                                        'button',
                                        {
                                          type: 'button',
                                          class: normalizeClass([
                                            'dp--qr-btn',
                                            {
                                              'dp--qr-btn-active': D.active,
                                              'dp--qr-btn-between': D.isBetween,
                                              'dp--qr-btn-disabled': D.disabled,
                                              'dp--highlighted': D.highlighted
                                            }
                                          ]),
                                          'data-test-id': D.value,
                                          disabled: D.disabled,
                                          onClick: (Q) => unref(T)(D.value, u, D.disabled),
                                          onMouseover: (Q) => unref(c)(D.value)
                                        },
                                        [
                                          F.$slots.quarter
                                            ? renderSlot(F.$slots, 'quarter', {
                                                key: 0,
                                                value: D.value,
                                                text: D.text
                                              })
                                            : (openBlock(),
                                              createElementBlock(
                                                Fragment,
                                                { key: 1 },
                                                [createTextVNode(toDisplayString(D.text), 1)],
                                                64
                                              ))
                                        ],
                                        42,
                                        Il
                                      )
                                    ])
                                  )
                                ),
                                128
                              ))
                            ])
                          ],
                          4
                        )
                      ],
                      2
                    )
                  )
                ),
                128
              ))
            ]),
            _: 3
          },
          8,
          ['collapse']
        )
      )
    )
  }
})
var El = ['id', 'tabindex', 'role', 'aria-label']
var Fl = {
  key: 0,
  class: 'dp--menu-load-container'
}
var Nl = {
  key: 1,
  class: 'dp--menu-header'
}
var Wl = ['data-dp-mobile']
var Ll = {
  key: 0,
  class: 'dp__sidebar_left'
}
var Hl = ['data-dp-mobile']
var Kl = ['data-test-id', 'data-dp-mobile', 'onClick', 'onKeydown']
var jl = { class: 'dp__instance_calendar' }
var zl = {
  key: 2,
  class: 'dp__sidebar_right'
}
var Ul = {
  key: 3,
  class: 'dp__action_extra'
}
var ql = defineComponent({
  __name: 'DatepickerMenu',
  props: {
    collapse: { type: Boolean },
    noOverlayFocus: { type: Boolean },
    getInputRect: { type: Function }
  },
  emits: ['close-picker', 'select-date', 'auto-apply', 'time-update', 'menu-blur'],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = useSlots(),
      {
        state: s,
        rootProps: n,
        defaults: { textInput: l, inline: d, config: B, ui: A, ariaLabels: I },
        setState: b
      } = $e(),
      { isMobile: i } = aa(),
      { mapSlots: M } = yt(),
      { handleEventPropagation: c, getElWithin: T, checkStopPropagation: v, checkKeyDown: Y } = Ee(),
      { arrowRight: V, arrowLeft: P, arrowDown: F, arrowUp: q } = gt(),
      R = useTemplateRef('inner-menu'),
      w = useTemplateRef('dp-menu'),
      u = useTemplateRef('dyn-cmp'),
      D = ref(0),
      N = ref(false),
      Q = ref(false),
      { flowStep: ae, updateFlowStep: Z, childMount: ve, resetFlow: he, handleFlow: L } = Hn(u),
      J = (a) => {
        ;((Q.value = true), B.value.allowPreventDefault && a.preventDefault(), v(a, B.value, true))
      }
    ;(onMounted(() => {
      ;((N.value = true), W(), globalThis.addEventListener('resize', W))
      const a = unrefElement(w)
      ;(a && !l.value.enabled && !d.value.enabled && (b('menuFocused', true), z()),
        a && (a.addEventListener('pointerdown', J), a.addEventListener('mousedown', J)),
        document.addEventListener('mousedown', C))
    }),
      onUnmounted(() => {
        ;(globalThis.removeEventListener('resize', W), document.removeEventListener('mousedown', C))
        const a = unrefElement(w)
        a && (a.removeEventListener('pointerdown', J), a.removeEventListener('mousedown', J))
      }))
    const W = () => {
        const a = unrefElement(R)
        a && (D.value = a.getBoundingClientRect().width)
      },
      oe = computed(() => (n.monthPicker ? Zr : n.yearPicker ? tl : n.timePicker ? pl : n.quarterPicker ? Vl : Ol)),
      z = () => {
        const a = unrefElement(w)
        a && a.focus({ preventScroll: true })
      },
      ee = computed(() => {
        var _a
        return ((_a = u.value) == null ? void 0 : _a.getSidebarProps()) || {}
      }),
      fe = M(o, 'action'),
      ge = computed(() =>
        n.monthPicker || n.yearPicker ? M(o, 'monthYear') : n.timePicker ? M(o, 'timePicker') : M(o, 'shared')
      ),
      De = computed(() => ({
        dp__menu_disabled: n.disabled,
        dp__menu_readonly: n.readonly,
        'dp-menu-loading': n.loading
      })),
      Ae = computed(() => ({
        dp__menu: true,
        dp__menu_index: !d.value.enabled,
        dp__relative: d.value.enabled,
        ...A.value.menu
      })),
      re2 = (a) => {
        v(a, B.value, true)
      },
      H = (a) => {
        B.value.escClose && (r('close-picker'), c(a, B.value))
      },
      E = (a) => {
        if (n.arrowNavigation) {
          if (a === Ue.up) return q()
          if (a === Ue.down) return F()
          if (a === Ue.left) return P()
          if (a === Ue.right) return V()
        } else
          a === Ue.left || a === Ue.up
            ? $('handleArrow', Ue.left, 0, a === Ue.up)
            : $('handleArrow', Ue.right, 0, a === Ue.down)
      },
      ce = (a) => {
        ;(b('shiftKeyInMenu', a.shiftKey),
          !n.hideMonthYearSelect &&
            a.code === xe.tab &&
            a.target.classList.contains('dp__menu') &&
            s.shiftKeyInMenu &&
            (a.preventDefault(), v(a, B.value, true), r('close-picker')))
      },
      ue = (a) => {
        var _a, _b, _c
        ;((_a = u.value) == null ? void 0 : _a.toggleTimePicker(false, false),
          (_b = u.value) == null ? void 0 : _b.toggleMonthPicker(false, false, a),
          (_c = u.value) == null ? void 0 : _c.toggleYearPicker(false, false, a))
      },
      y = (a, f = 0) => {
        var _a, _b, _c
        return a === 'month'
          ? (_a = u.value) == null
            ? void 0
            : _a.toggleMonthPicker(false, true, f)
          : a === 'year'
            ? (_b = u.value) == null
              ? void 0
              : _b.toggleYearPicker(false, true, f)
            : a === 'time'
              ? (_c = u.value) == null
                ? void 0
                : _c.toggleTimePicker(true, false)
              : ue(f)
      },
      $ = (a, ...f) => {
        var _a, _b
        ;((_a = u.value) == null ? void 0 : _a[a]) && ((_b = u.value) == null ? void 0 : _b[a](...f))
      },
      ie = () => {
        $('selectCurrentDate')
      },
      le = (a) => {
        $('presetDate', toValue(a))
      },
      h2 = () => {
        $('clearHoverDate')
      },
      m = (a, f) => {
        $('updateMonthYear', a, f)
      },
      x = (a, f) => {
        ;(a.preventDefault(), E(f))
      },
      g = (a) => {
        var _a, _b, _c
        if ((ce(a), a.key === xe.home || a.key === xe.end))
          return $('selectWeekDate', a.key === xe.home, a.target.getAttribute('id'))
        switch (
          ((a.key === xe.pageUp || a.key === xe.pageDown) &&
            (a.shiftKey
              ? ($('changeYear', a.key === xe.pageUp), (_a = T(w.value, 'overlay-year')) == null ? void 0 : _a.focus())
              : ($('changeMonth', a.key === xe.pageUp),
                (_b = T(w.value, a.key === xe.pageUp ? 'action-prev' : 'action-next')) == null ? void 0 : _b.focus()),
            a.target.getAttribute('id') && ((_c = w.value) == null ? void 0 : _c.focus({ preventScroll: true }))),
          a.key)
        ) {
          case xe.esc:
            return H(a)
          case xe.arrowLeft:
            return x(a, Ue.left)
          case xe.arrowRight:
            return x(a, Ue.right)
          case xe.arrowUp:
            return x(a, Ue.up)
          case xe.arrowDown:
            return x(a, Ue.down)
          default:
            return
        }
      },
      C = (a) => {
        var _a
        d.value.enabled &&
          !d.value.input &&
          !((_a = w.value) == null ? void 0 : _a.contains(a.target)) &&
          Q.value &&
          ((Q.value = false), r('menu-blur'))
      }
    return (
      k({
        updateMonthYear: m,
        switchView: y,
        onValueCleared: () => {
          var _a, _b
          ;(_b = (_a = u.value) == null ? void 0 : _a.setStartTime) == null ? void 0 : _b.call(_a)
        },
        handleFlow: L
      }),
      (a, f) => {
        var _a, _b, _c
        return (
          openBlock(),
          createElementBlock(
            'div',
            {
              id: unref(n).menuId,
              ref: 'dp-menu',
              tabindex: unref(d).enabled ? void 0 : '0',
              role: unref(d).enabled ? void 0 : 'dialog',
              'aria-label': (_a = unref(I)) == null ? void 0 : _a.menu,
              class: normalizeClass(Ae.value),
              onMouseleave: h2,
              onClick: re2,
              onKeydown: g
            },
            [
              ((unref(n).disabled || unref(n).readonly) && unref(d).enabled) || unref(n).loading
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: normalizeClass(De.value)
                    },
                    [
                      unref(n).loading
                        ? (openBlock(),
                          createElementBlock('div', Fl, [
                            ...(f[5] || (f[5] = [createBaseVNode('span', { class: 'dp--menu-loader' }, null, -1)]))
                          ]))
                        : createCommentVNode('', true)
                    ],
                    2
                  ))
                : createCommentVNode('', true),
              a.$slots['menu-header']
                ? (openBlock(), createElementBlock('div', Nl, [renderSlot(a.$slots, 'menu-header')]))
                : createCommentVNode('', true),
              renderSlot(a.$slots, 'arrow'),
              createBaseVNode(
                'div',
                {
                  ref: 'inner-menu',
                  class: normalizeClass({
                    dp__menu_content_wrapper:
                      ((_b = unref(n).presetDates) == null ? void 0 : _b.length) ||
                      !!a.$slots['left-sidebar'] ||
                      !!a.$slots['right-sidebar'],
                    'dp--menu-content-wrapper-collapsed':
                      e.collapse &&
                      (((_c = unref(n).presetDates) == null ? void 0 : _c.length) ||
                        !!a.$slots['left-sidebar'] ||
                        !!a.$slots['right-sidebar'])
                  }),
                  'data-dp-mobile': unref(i),
                  style: normalizeStyle({ '--dp-menu-width': `${D.value}px` })
                },
                [
                  a.$slots['left-sidebar']
                    ? (openBlock(),
                      createElementBlock('div', Ll, [
                        renderSlot(a.$slots, 'left-sidebar', normalizeProps(guardReactiveProps(ee.value)))
                      ]))
                    : createCommentVNode('', true),
                  unref(n).presetDates.length
                    ? (openBlock(),
                      createElementBlock(
                        'div',
                        {
                          key: 1,
                          class: normalizeClass({ 'dp--preset-dates-collapsed': e.collapse, 'dp--preset-dates': true }),
                          'data-dp-mobile': unref(i)
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(
                              unref(n).presetDates,
                              (S, te) => (
                                openBlock(),
                                createElementBlock(
                                  Fragment,
                                  { key: te },
                                  [
                                    S.slot
                                      ? renderSlot(a.$slots, S.slot, {
                                          key: 0,
                                          presetDate: le,
                                          label: S.label,
                                          value: S.value
                                        })
                                      : (openBlock(),
                                        createElementBlock(
                                          'button',
                                          {
                                            key: 1,
                                            type: 'button',
                                            style: normalizeStyle(S.style || {}),
                                            class: normalizeClass([
                                              'dp__btn dp--preset-range',
                                              { 'dp--preset-range-collapsed': e.collapse }
                                            ]),
                                            'data-test-id': S.testId ?? void 0,
                                            'data-dp-mobile': unref(i),
                                            onClick: withModifiers((ne) => le(S.value), ['prevent']),
                                            onKeydown: (ne) => unref(Y)(ne, () => le(S.value), true)
                                          },
                                          toDisplayString(S.label),
                                          47,
                                          Kl
                                        ))
                                  ],
                                  64
                                )
                              )
                            ),
                            128
                          ))
                        ],
                        10,
                        Hl
                      ))
                    : createCommentVNode('', true),
                  createBaseVNode('div', jl, [
                    (openBlock(),
                    createBlock(
                      resolveDynamicComponent(oe.value),
                      {
                        ref: 'dyn-cmp',
                        'flow-step': unref(ae),
                        collapse: e.collapse,
                        'no-overlay-focus': e.noOverlayFocus,
                        'menu-wrap-ref': w.value,
                        onMount: unref(ve),
                        onUpdateFlowStep: unref(Z),
                        onResetFlow: unref(he),
                        onFocusMenu: z,
                        onSelectDate: f[0] || (f[0] = (S) => a.$emit('select-date')),
                        onAutoApply: f[1] || (f[1] = (S) => a.$emit('auto-apply', S)),
                        onTimeUpdate: f[2] || (f[2] = (S) => a.$emit('time-update'))
                      },
                      createSlots({ _: 2 }, [
                        renderList(ge.value, (S, te) => ({
                          name: S,
                          fn: withCtx((ne) => [renderSlot(a.$slots, S, normalizeProps(guardReactiveProps({ ...ne })))])
                        }))
                      ]),
                      1064,
                      [
                        'flow-step',
                        'collapse',
                        'no-overlay-focus',
                        'menu-wrap-ref',
                        'onMount',
                        'onUpdateFlowStep',
                        'onResetFlow'
                      ]
                    ))
                  ]),
                  a.$slots['right-sidebar']
                    ? (openBlock(),
                      createElementBlock('div', zl, [
                        renderSlot(a.$slots, 'right-sidebar', normalizeProps(guardReactiveProps(ee.value)))
                      ]))
                    : createCommentVNode('', true),
                  a.$slots['action-extra']
                    ? (openBlock(),
                      createElementBlock('div', Ul, [
                        a.$slots['action-extra']
                          ? renderSlot(a.$slots, 'action-extra', {
                              key: 0,
                              selectCurrentDate: ie
                            })
                          : createCommentVNode('', true)
                      ]))
                    : createCommentVNode('', true)
                ],
                14,
                Wl
              ),
              !unref(n).autoApply || unref(B).keepActionRow
                ? (openBlock(),
                  createBlock(
                    Kr,
                    {
                      key: 2,
                      'menu-mount': N.value,
                      'calendar-width': D.value,
                      onClosePicker: f[3] || (f[3] = (S) => a.$emit('close-picker')),
                      onSelectDate: f[4] || (f[4] = (S) => a.$emit('select-date')),
                      onSelectNow: ie
                    },
                    createSlots({ _: 2 }, [
                      renderList(unref(fe), (S, te) => ({
                        name: S,
                        fn: withCtx((ne) => [renderSlot(a.$slots, S, normalizeProps(guardReactiveProps({ ...ne })))])
                      }))
                    ]),
                    1032,
                    ['menu-mount', 'calendar-width']
                  ))
                : createCommentVNode('', true)
            ],
            42,
            El
          )
        )
      }
    )
  }
})
var Ql = ['data-dp-mobile']
var Gl = defineComponent({
  __name: 'VueDatePicker',
  setup(e, { expose: k }) {
    const {
        rootEmit: p,
        setState: r,
        inputValue: o,
        modelValue: s,
        rootProps: n,
        defaults: { inline: l, config: d, textInput: B, range: A, multiDates: I, teleport: b, floatingConfig: i }
      } = $e(),
      { clearArrowNav: M } = gt(),
      { validateDate: c, isValidTime: T } = at(),
      { menuTransition: v, showTransition: Y } = Kt(),
      { isMobile: V } = aa(),
      { mapSlots: P } = yt(),
      { findNextFocusableElement: F, getNumVal: q } = Ee(),
      R = useSlots(),
      w = ref(false),
      u = ref(l.value.enabled),
      D = toRef(n, 'modelValue'),
      N = toRef(n, 'timezone'),
      Q = useTemplateRef('dp-menu-wrap'),
      ae = useTemplateRef('dp-menu'),
      Z = useTemplateRef('input-cmp'),
      ve = useTemplateRef('picker-wrapper'),
      he = useTemplateRef('menu-arrow'),
      L = ref(false),
      J = ref(false),
      W = ref(false),
      oe = (me) => (
        i.value.arrow &&
          (i.value.arrow === true ? me.push(arrow3({ element: he })) : me.push(arrow3({ element: i.value.arrow }))),
        me
      ),
      {
        floatingStyles: z,
        middlewareData: ee,
        placement: fe,
        y: ge
      } = useFloating(Z, Q, {
        strategy: i.value.strategy,
        placement: i.value.placement,
        middleware: oe([offset2(i.value.offset), flip2(), shift2()]),
        whileElementsMounted: autoUpdate
      })
    ;(onMounted(() => {
      ;(re2(n.modelValue),
        nextTick().then(() => {
          l.value.enabled || globalThis.addEventListener('resize', h2)
        }),
        l.value.enabled && (w.value = true),
        globalThis.addEventListener('keyup', m),
        globalThis.addEventListener('keydown', x))
    }),
      onUnmounted(() => {
        ;(l.value.enabled || globalThis.removeEventListener('resize', h2),
          globalThis.removeEventListener('keyup', m),
          globalThis.removeEventListener('keydown', x))
      }))
    const De = P(R, 'all', n.presetDates),
      Ae = P(R, 'input')
    ;(watch(
      [D, N],
      () => {
        re2(D.value)
      },
      { deep: true }
    ),
      watch([fe, ge], () => {
        !l.value.enabled &&
          !n.centered &&
          ((u.value = false),
          nextTick().then(() => {
            u.value = true
          }))
      }))
    const { parseExternalModelValue: re2, emitModelValue: H, formatInputValue: E, checkBeforeEmit: ce } = Nn(),
      ue = computed(() => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: l.value.enabled,
        'dp--flex-display-collapsed': W.value,
        dp__flex_display_with_input: l.value.input
      })),
      y = computed(() => (n.dark ? 'dp__theme_dark' : 'dp__theme_light')),
      $ = computed(() => l.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)),
      ie = () => {
        var _a, _b
        return (
          ((_b = (_a = Z.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.getBoundingClientRect()) ?? {
            width: 0,
            left: 0,
            right: 0
          }
        )
      },
      le = () => {
        w.value && d.value.closeOnScroll && Ce()
      },
      h2 = () => {
        var _a
        const me = ((_a = ae.value) == null ? void 0 : _a.$el.getBoundingClientRect().width) ?? 0
        W.value = document.body.offsetWidth <= me
      },
      m = (me) => {
        ;(me.key === 'Tab' &&
          !l.value.enabled &&
          !n.teleport &&
          d.value.tabOutClosesMenu &&
          (ve.value.contains(document.activeElement) || Ce()),
          (J.value = me.shiftKey))
      },
      x = (me) => {
        J.value = me.shiftKey
      },
      g = () => {
        !n.disabled && !n.readonly && ((w.value = true), w.value && p('open'), w.value || ne(), re2(n.modelValue))
      },
      C = () => {
        var _a, _b
        ;((o.value = ''),
          ne(),
          (_a = ae.value) == null ? void 0 : _a.onValueCleared(),
          (_b = Z.value) == null ? void 0 : _b.setParsedDate(null),
          p('update:model-value', null),
          p('cleared'),
          d.value.closeOnClearValue && Ce())
      },
      G = () => {
        const me = s.value
        return !me || (!Array.isArray(me) && c(me))
          ? true
          : Array.isArray(me)
            ? I.value.enabled || (me.length === 2 && c(me[0]) && c(me[1]))
              ? true
              : A.value.partialRange && !n.timePicker
                ? c(me[0])
                : false
            : false
      },
      a = () => {
        ce() && G() ? (H(), Ce()) : p('invalid-select')
      },
      f = (me) => {
        ;(S(), H(), d.value.closeOnAutoApply && !me && Ce())
      },
      S = () => {
        Z.value && B.value.enabled && Z.value.setParsedDate(s.value)
      },
      te = (me = false) => {
        n.autoApply &&
          T(s.value) &&
          G() &&
          (A.value.enabled && Array.isArray(s.value) ? (A.value.partialRange || s.value.length === 2) && f(me) : f(me))
      },
      ne = () => {
        B.value.enabled || (s.value = null)
      },
      Ce = (me = false) => {
        ;(me && s.value && d.value.setDateOnMenuClose && a(),
          l.value.enabled ||
            (w.value &&
              ((w.value = false),
              r('menuFocused', false),
              r('shiftKeyInMenu', false),
              M(),
              p('closed'),
              o.value && re2(D.value)),
            ne(),
            p('blur')))
      },
      Fe = (me, ze, nt = false) => {
        if (!me) {
          s.value = null
          return
        }
        const Yt = Array.isArray(me) ? !me.some((Ot) => !c(Ot)) : c(me),
          vt = T(me)
        Yt && vt
          ? (r('isTextInputDate', true),
            (s.value = me),
            ze ? ((L.value = nt), a(), p('text-submit')) : n.autoApply && te(true),
            nextTick().then(() => {
              r('isTextInputDate', false)
            }))
          : p('invalid-date', me)
      },
      kt = () => {
        ;(n.autoApply && T(s.value) && H(), S())
      },
      Rt = () => (w.value ? Ce() : g()),
      Ut = (me) => {
        s.value = me
      },
      sa = () => {
        ;(B.value.enabled && (r('isInputFocused', true), E()), p('focus'))
      },
      ua = () => {
        var _a
        ;(B.value.enabled &&
          (r('isInputFocused', false),
          re2(n.modelValue),
          L.value && ((_a = F(ve.value, J.value)) == null ? void 0 : _a.focus())),
          p('blur'))
      },
      ia = (me, ze) => {
        ae.value &&
          ae.value.updateMonthYear(ze ?? 0, {
            month: q(me.month),
            year: q(me.year)
          })
      },
      Ct = (me) => {
        re2(me ?? n.modelValue)
      },
      ca = (me, ze) => {
        var _a
        ;(_a = ae.value) == null ? void 0 : _a.switchView(me, ze)
      },
      da = (me, ze) => {
        if (w.value) return d.value.onClickOutside ? d.value.onClickOutside(me, ze) : Ce(true)
      },
      qt = (me = 0) => {
        var _a
        ;(_a = ae.value) == null ? void 0 : _a.handleFlow(me)
      },
      va = () => Q
    return (
      onClickOutside(Q, (me) => da(G, me), {
        ignore: [Z]
      }),
      k({
        closeMenu: Ce,
        selectDate: a,
        clearValue: C,
        openMenu: g,
        onScroll: le,
        formatInputValue: E,
        // exposed for testing purposes
        updateInternalModelValue: Ut,
        // modify internal modelValue
        setMonthYear: ia,
        parseModel: Ct,
        switchView: ca,
        toggleMenu: Rt,
        handleFlow: qt,
        getDpWrapMenuRef: va
      }),
      (me, ze) => (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref: 'picker-wrapper',
            class: normalizeClass(ue.value),
            'data-datepicker-instance': '',
            'data-dp-mobile': unref(V)
          },
          [
            createVNode(
              Fr,
              {
                ref: 'input-cmp',
                'is-menu-open': w.value,
                onClear: C,
                onOpen: g,
                onSetInputDate: Fe,
                onSetEmptyDate: unref(H),
                onSelectDate: a,
                onToggle: Rt,
                onClose: Ce,
                onFocus: sa,
                onBlur: ua,
                onRealBlur: ze[0] || (ze[0] = (nt) => unref(r)('isInputFocused', false))
              },
              createSlots({ _: 2 }, [
                renderList(unref(Ae), (nt, Yt) => ({
                  name: nt,
                  fn: withCtx((vt) => [renderSlot(me.$slots, nt, normalizeProps(guardReactiveProps(vt)))])
                }))
              ]),
              1032,
              ['is-menu-open', 'onSetEmptyDate']
            ),
            (openBlock(),
            createBlock(
              Teleport,
              {
                to: unref(b),
                disabled: !unref(b)
              },
              [
                createBaseVNode(
                  'div',
                  {
                    ref: 'dp-menu-wrap',
                    class: normalizeClass({
                      'dp--menu-wrapper': !unref(l).enabled,
                      dp__outer_menu_wrap: true,
                      'dp--centered': unref(n).centered
                    }),
                    style: normalizeStyle(!unref(l).enabled && !unref(n).centered ? unref(z) : void 0)
                  },
                  [
                    createVNode(
                      Transition,
                      {
                        name: unref(v)(unref(fe).startsWith('top')),
                        css: unref(Y) && !unref(l).enabled && !unref(n).centered && u.value
                      },
                      {
                        default: withCtx(() => [
                          w.value && u.value
                            ? (openBlock(),
                              createBlock(
                                ql,
                                {
                                  key: 0,
                                  ref: 'dp-menu',
                                  class: normalizeClass({ [y.value]: true }),
                                  'no-overlay-focus': $.value,
                                  collapse: W.value,
                                  'get-input-rect': ie,
                                  onClosePicker: Ce,
                                  onSelectDate: a,
                                  onAutoApply: te,
                                  onTimeUpdate: kt,
                                  onMenuBlur: ze[1] || (ze[1] = (nt) => unref(p)('blur'))
                                },
                                createSlots({ _: 2 }, [
                                  renderList(unref(De), (nt, Yt) => ({
                                    name: nt,
                                    fn: withCtx((vt) => [
                                      renderSlot(me.$slots, nt, normalizeProps(guardReactiveProps({ ...vt })))
                                    ])
                                  })),
                                  !unref(l).enabled && !unref(n).centered && unref(i).arrow === true
                                    ? {
                                        name: 'arrow',
                                        fn: withCtx(() => {
                                          var _a, _b
                                          return [
                                            createBaseVNode(
                                              'div',
                                              {
                                                ref: 'menu-arrow',
                                                class: normalizeClass({
                                                  dp__arrow_top: unref(fe) === 'bottom',
                                                  dp__arrow_bottom: unref(fe) === 'top'
                                                }),
                                                style: normalizeStyle({
                                                  left:
                                                    ((_a = unref(ee).arrow) == null ? void 0 : _a.x) != null
                                                      ? `${unref(ee).arrow.x}px`
                                                      : '',
                                                  top:
                                                    ((_b = unref(ee).arrow) == null ? void 0 : _b.y) != null
                                                      ? `${unref(ee).arrow.y}px`
                                                      : ''
                                                })
                                              },
                                              null,
                                              6
                                            )
                                          ]
                                        }),
                                        key: '0'
                                      }
                                    : void 0
                                ]),
                                1032,
                                ['class', 'no-overlay-focus', 'collapse']
                              ))
                            : createCommentVNode('', true)
                        ]),
                        _: 3
                      },
                      8,
                      ['name', 'css']
                    )
                  ],
                  6
                )
              ],
              8,
              ['to', 'disabled']
            ))
          ],
          10,
          Ql
        )
      )
    )
  }
})
var ro = defineComponent({
  __name: 'VueDatePickerRoot',
  props: mergeDefaults(
    {
      multiCalendars: { type: [Boolean, Number, String, Object] },
      modelValue: {},
      modelType: {},
      dark: { type: Boolean },
      transitions: { type: [Boolean, Object] },
      ariaLabels: {},
      hideNavigation: {},
      timezone: {},
      vertical: { type: Boolean },
      hideMonthYearSelect: { type: Boolean },
      disableYearSelect: { type: Boolean },
      yearRange: {},
      autoApply: { type: Boolean },
      disabledDates: { type: [Array, Function] },
      startDate: {},
      hideOffsetDates: { type: Boolean },
      noToday: { type: Boolean },
      allowedDates: {},
      markers: {},
      presetDates: {},
      flow: {},
      preventMinMaxNavigation: { type: Boolean },
      reverseYears: { type: Boolean },
      weekPicker: { type: Boolean },
      filters: {},
      arrowNavigation: { type: Boolean },
      highlight: { type: [Function, Object] },
      teleport: { type: [String, Boolean] },
      centered: { type: Boolean },
      locale: {},
      weekStart: {},
      weekNumbers: { type: [Boolean, Object] },
      dayNames: { type: [Function, Array] },
      monthPicker: { type: Boolean },
      yearPicker: { type: Boolean },
      modelAuto: { type: Boolean },
      formats: {},
      multiDates: { type: [Boolean, Object] },
      minDate: {},
      maxDate: {},
      minTime: {},
      maxTime: {},
      inputAttrs: {},
      timeConfig: {},
      placeholder: {},
      timePicker: { type: Boolean },
      range: { type: [Boolean, Object] },
      menuId: {},
      disabled: { type: Boolean },
      readonly: { type: Boolean },
      inline: { type: [Boolean, Object] },
      textInput: { type: [Boolean, Object] },
      sixWeeks: { type: [Boolean, String] },
      actionRow: {},
      focusStartDate: { type: Boolean },
      disabledTimes: { type: [Function, Array] },
      calendar: { type: Function },
      config: {},
      quarterPicker: { type: Boolean },
      yearFirst: { type: Boolean },
      loading: { type: Boolean },
      ui: {},
      floating: {}
    },
    Cr
  ),
  emits: [
    'update:model-value',
    'internal-model-change',
    'text-submit',
    'text-input',
    'open',
    'closed',
    'focus',
    'blur',
    'cleared',
    'flow-step',
    'update-month-year',
    'invalid-select',
    'invalid-fixed-range',
    'invalid-date',
    'tooltip-open',
    'tooltip-close',
    'am-pm-change',
    'range-start',
    'range-end',
    'date-click',
    'overlay-toggle',
    'invalid'
  ],
  setup(e, { expose: k, emit: p }) {
    const r = p,
      o = e
    Ln(o, r)
    const s = useSlots(),
      { mapSlots: n } = yt(),
      l = n(s, 'root', o.presetDates),
      d = useTemplateRef('date-picker')
    return (
      k(Or(d)),
      (B, A) => (
        openBlock(),
        createBlock(
          Gl,
          { ref: 'date-picker' },
          createSlots({ _: 2 }, [
            renderList(unref(l), (I, b) => ({
              name: I,
              fn: withCtx((i) => [renderSlot(B.$slots, I, normalizeProps(guardReactiveProps(i)))])
            }))
          ]),
          1536
        )
      )
    )
  }
})
export { TZDate, ro as VueDatePicker }
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
