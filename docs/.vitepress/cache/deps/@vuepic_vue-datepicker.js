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
import { onClickOutside, unrefElement, useSwipe } from './chunk-FKMBGTFJ.js'
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
} from './chunk-VLS4B2PU.js'
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

// node_modules/.pnpm/@floating-ui+vue@1.1.9_vue@3.5.29_typescript@5.9.3_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
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

// node_modules/.pnpm/@vuepic+vue-datepicker@12.1.0_vue@3.5.29_typescript@5.9.3_/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Et() {
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
function On() {
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
function Ca() {
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
function xa() {
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
function Oa() {
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
function Ya() {
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
function Ba() {
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
var Ia = Symbol('ContextKey')
var Yn = (e, A) => {
  const { setTimeModelValue: f } = Ie(),
    o = Tr(e),
    c = ref(null),
    s = reactive({
      menuFocused: false,
      shiftKeyInMenu: false,
      isInputFocused: false,
      isTextInputDate: false,
      arrowNavigationLevel: 0
    }),
    r = o.getDate(/* @__PURE__ */ new Date()),
    u = ref(''),
    v = ref([{ month: getMonth(r), year: getYear(r) }]),
    Y = reactive({ hours: 0, minutes: 0, seconds: 0 })
  f(Y, null, r, o.range.value.enabled)
  const P = computed({
      get: () => c.value,
      set: (h2) => {
        c.value = h2
      }
    }),
    B = computed(() => (h2) => (v.value[h2] ? v.value[h2].month : 0)),
    O = computed(() => (h2) => (v.value[h2] ? v.value[h2].year : 0)),
    l = (h2, _) => {
      s[h2] = _
    },
    w = () => {
      f(Y, P.value, r, o.range.value.enabled)
    }
  provide(Ia, {
    rootProps: e,
    defaults: o,
    modelValue: P,
    state: readonly(s),
    rootEmit: A,
    calendars: v,
    month: B,
    year: O,
    time: Y,
    today: r,
    inputValue: u,
    setState: l,
    updateTime: w,
    getDate: o.getDate
  })
}
var Me = () => {
  const e = inject(Ia)
  if (!e) throw new Error("Can't use context")
  return e
}
var Ge = ((e) => ((e.month = 'month'), (e.year = 'year'), e))(Ge || {})
var bt = ((e) => ((e.header = 'header'), (e.calendar = 'calendar'), (e.timePicker = 'timePicker'), e))(bt || {})
var He = ((e) => (
  (e.month = 'month'),
  (e.year = 'year'),
  (e.calendar = 'calendar'),
  (e.time = 'time'),
  (e.minutes = 'minutes'),
  (e.hours = 'hours'),
  (e.seconds = 'seconds'),
  e
))(He || {})
var Bn = ['timestamp', 'date', 'iso']
var Xe = ((e) => ((e.up = 'up'), (e.down = 'down'), (e.left = 'left'), (e.right = 'right'), e))(Xe || {})
var $e = ((e) => (
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
))($e || {})
var Mt = ((e) => ((e.MONTH_AND_YEAR = 'MM-yyyy'), (e.YEAR = 'yyyy'), (e.DATE = 'dd-MM-yyyy'), e))(Mt || {})
var Ea = ((e) => (
  (e[(e.Sunday = 0)] = 'Sunday'),
  (e[(e.Monday = 1)] = 'Monday'),
  (e[(e.Tuesday = 2)] = 'Tuesday'),
  (e[(e.Wednesday = 3)] = 'Wednesday'),
  (e[(e.Thursday = 4)] = 'Thursday'),
  (e[(e.Friday = 5)] = 'Friday'),
  (e[(e.Saturday = 6)] = 'Saturday'),
  e
))(Ea || {})
var In = () => {
  const { rootProps: e, state: A } = Me(),
    f = computed(() => A.arrowNavigationLevel),
    o = ref(-1),
    c = ref(-1)
  watch(f, (E, k) => {
    b(E === 0 && k > 0)
  })
  const s = ref([]),
    r = ref(/* @__PURE__ */ new Map()),
    u = () => {
      const E = Array.from(document.querySelectorAll(`[data-dp-action-element="${f.value}"]`)),
        k = /* @__PURE__ */ new Map(),
        g = /* @__PURE__ */ new Map()
      for (const M of E) {
        const R = M.getBoundingClientRect(),
          $ = R.top,
          S = R.left
        ;(k.has($) || k.set($, []), k.get($).push(M), g.set(M, { row: $, col: S }))
      }
      ;((s.value = Array.from(k.entries())
        .sort((M, R) => M[0] - R[0])
        .map(([M, R]) => v(R, g))),
        (r.value = g))
    },
    v = (E, k) =>
      E.sort((g, M) => {
        const R = k.get(g),
          $ = k.get(M)
        return R.col - $.col
      }),
    Y = (E, k) => {
      f.value === 0 && ((o.value = E), (c.value = k))
    },
    P = (E) => {
      if (![$e.arrowUp, $e.arrowDown, $e.arrowLeft, $e.arrowRight].includes(E.key)) return
      ;(u(), E.preventDefault())
      const k = document.activeElement
      if (!(k == null ? void 0 : k.hasAttribute('data-dp-action-element'))) return
      let g = -1,
        M = -1
      for (let R = 0; R < s.value.length; R++) {
        const $ = s.value[R].indexOf(k)
        if ($ !== -1) {
          ;((g = R), (M = $))
          break
        }
      }
      if (g !== -1)
        switch (E.key) {
          case $e.arrowLeft:
            return B(g, M)
          case $e.arrowRight:
            return O(g, M)
          case $e.arrowUp:
            return l(g, M)
          case $e.arrowDown:
            return w(g, M)
          default:
            return
        }
    },
    B = (E, k) => {
      if (k > 0) {
        const g = s.value[E][k - 1]
        ;(Y(E, k - 1), g && g.focus())
      }
    },
    O = (E, k) => {
      if (k < s.value[E].length - 1) {
        const g = s.value[E][k + 1]
        ;(Y(E, k + 1), g && g.focus())
      }
    },
    l = (E, k) => {
      if (E > 0) {
        const g = s.value[E - 1],
          M = Math.min(k, g.length - 1),
          R = g[M]
        ;(Y(E - 1, M), R && R.focus())
      }
    },
    w = (E, k) => {
      if (E < s.value.length - 1) {
        const g = s.value[E + 1],
          M = Math.min(k, g.length - 1),
          R = g[M]
        ;(Y(E + 1, M), R && R.focus())
      }
    },
    h2 = () => {
      nextTick().then(() => {
        var _a2
        u()
        const E = (_a2 = s.value[o.value]) == null ? void 0 : _a2[c.value]
        E && _(E)
      })
    },
    _ = (E) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          E.focus({ preventScroll: true })
        })
      })
    },
    b = (E) => {
      if (E) return h2()
      const k = document.querySelector(`[data-dp-element-active="${f.value}"]`)
      if (k && !E) _(k)
      else {
        const g = document.querySelector(`[data-dp-action-element="${f.value}"]`)
        g && _(g)
      }
    }
  ;(onMounted(() => {
    e.arrowNavigation && (b(false), document.addEventListener('keydown', P))
  }),
    onUnmounted(() => {
      e.arrowNavigation && document.removeEventListener('keydown', P)
    }))
}
var En = () => {
  const { checkPartialRangeValue: e, checkRangeEnabled: A, isValidDate: f } = Ue(),
    { convertType: o, errorMapper: c } = Ie(),
    {
      getDate: s,
      rootEmit: r,
      state: u,
      rootProps: v,
      inputValue: Y,
      defaults: { textInput: P, range: B, multiDates: O, timeConfig: l, formats: w },
      modelValue: h2,
      updateTime: _
    } = Me(),
    { setTime: b, getWeekFromDate: E } = We(),
    { formatSelectedDate: k, formatForTextInput: g } = pt()
  ;(watch(
    h2,
    (y, H) => {
      ;(r('internal-model-change', h2.value), JSON.stringify(H ?? {}) !== JSON.stringify(y ?? {}) && _())
    },
    { deep: true }
  ),
    watch(B, (y, H) => {
      y.enabled !== H.enabled && (h2.value = null)
    }),
    watch(
      () => w.value.input,
      () => {
        Z()
      }
    ))
  const M = (y) =>
      y
        ? v.modelType
          ? G(y)
          : {
              hours: getHours(y),
              minutes: getMinutes(y),
              seconds: l.value.enableSeconds ? getSeconds(y) : 0
            }
        : null,
    R = (y) => (v.modelType ? G(y) : { month: getMonth(y), year: getYear(y) }),
    $ = (y) =>
      Array.isArray(y)
        ? O.value.enabled
          ? y.map((H) => S(H, setYear(s(), H)))
          : A(() => [setYear(s(), y[0]), y[1] ? setYear(s(), y[1]) : e(B.value.partialRange)], B.value.enabled)
        : setYear(s(), +y),
    S = (y, H) => ((typeof y == 'string' || typeof y == 'number') && v.modelType ? de(y) : H),
    p = (y) => (Array.isArray(y) ? [S(y[0], b(y[0])), S(y[1], b(y[1]))] : S(y, b(y))),
    D = (y) => {
      const H = set(s(), { date: 1 })
      return Array.isArray(y)
        ? O.value.enabled
          ? y.map((fe) => S(fe, set(H, { month: +fe.month, year: +fe.year })))
          : A(
              () => [
                S(y[0], set(H, { month: +y[0].month, year: +y[0].year })),
                S(y[1], y[1] ? set(H, { month: +y[1].month, year: +y[1].year }) : e(B.value.partialRange))
              ],
              B.value.enabled
            )
        : S(y, set(H, { month: +y.month, year: +y.year }))
    },
    V = (y) => {
      if (Array.isArray(y)) return y.map((H) => de(H))
      throw new Error(c.dateArr('multi-dates'))
    },
    F = (y) => {
      if (Array.isArray(y) && B.value.enabled) {
        const H = y[0],
          fe = y[1]
        return [s(Array.isArray(H) ? H[0] : null), Array.isArray(fe) && fe.length ? s(fe[0]) : null]
      }
      return s(y[0])
    },
    L = (y) =>
      v.modelAuto
        ? Array.isArray(y)
          ? [de(y[0]), de(y[1])]
          : v.autoApply
            ? [de(y)]
            : [de(y), null]
        : Array.isArray(y)
          ? A(() => (y[1] ? [de(y[0]), y[1] ? de(y[1]) : e(B.value.partialRange)] : [de(y[0])]), B.value.enabled)
          : de(y),
    ne = () => {
      Array.isArray(h2.value) && B.value.enabled && h2.value.length === 1 && h2.value.push(e(B.value.partialRange))
    },
    re2 = () => {
      const y = h2.value
      return [G(y[0]), y[1] ? G(y[1]) : e(B.value.partialRange)]
    },
    X = () => (Array.isArray(h2.value) ? (h2.value[1] ? re2() : G(o(h2.value[0]))) : []),
    x = () => (h2.value || []).map((y) => G(y)),
    te = (y = false) => (
      y || ne(),
      v.modelAuto
        ? X()
        : O.value.enabled
          ? x()
          : Array.isArray(h2.value)
            ? A(() => re2(), B.value.enabled)
            : G(o(h2.value))
    ),
    q = (y) =>
      !y || (Array.isArray(y) && !y.length)
        ? null
        : v.timePicker
          ? p(o(y))
          : v.monthPicker
            ? D(o(y))
            : v.yearPicker
              ? $(o(y))
              : O.value.enabled
                ? V(o(y))
                : v.weekPicker
                  ? F(o(y))
                  : L(o(y)),
    oe = (y) => {
      if (u.isTextInputDate) return
      const H = q(y)
      f(o(H)) ? ((h2.value = o(H)), Z()) : ((h2.value = null), (Y.value = ''))
    },
    K = () =>
      h2.value ? (O.value.enabled ? h2.value.map((y) => k(y)).join('; ') : P.value.enabled ? g() : k(h2.value)) : '',
    Z = () => {
      Y.value = K()
    },
    de = (y) =>
      v.modelType
        ? Bn.includes(v.modelType)
          ? s(y)
          : v.modelType === 'format' && typeof w.value.input == 'string'
            ? parse(y, w.value.input, s(), { locale: v.locale })
            : parse(y, v.modelType, s(), { locale: v.locale })
        : s(y),
    G = (y) =>
      y
        ? v.modelType
          ? v.modelType === 'timestamp'
            ? +y
            : v.modelType === 'iso'
              ? y.toISOString()
              : v.modelType === 'format' && typeof w.value.input == 'string'
                ? k(y)
                : k(y, v.modelType)
          : y
        : null,
    ce = (y) => {
      r('update:model-value', y)
    },
    le = (y) =>
      Array.isArray(h2.value)
        ? O.value.enabled
          ? h2.value.map((H) => y(H))
          : [y(h2.value[0]), h2.value[1] ? y(h2.value[1]) : null]
        : y(o(h2.value)),
    we = () => {
      if (Array.isArray(h2.value)) {
        const y = E(h2.value[0], v.weekStart),
          H = h2.value[1] ? E(h2.value[1], v.weekStart) : []
        return [y.map((fe) => s(fe)), H.map((fe) => s(fe))]
      }
      return E(h2.value, v.weekStart).map((y) => s(y))
    },
    ve = (y) => ce(o(le(y))),
    Ae = () => r('update:model-value', we())
  return {
    checkBeforeEmit: () =>
      h2.value
        ? B.value.enabled
          ? B.value.partialRange
            ? h2.value.length >= 1
            : h2.value.length === 2
          : !!h2.value
        : false,
    parseExternalModelValue: oe,
    formatInputValue: Z,
    emitModelValue: () => (
      Z(),
      v.monthPicker ? ve(R) : v.timePicker ? ve(M) : v.yearPicker ? ve(getYear) : v.weekPicker ? Ae() : ce(te())
    )
  }
}
var Vt = () => {
  const {
      defaults: { transitions: e }
    } = Me(),
    A = computed(() => (o) => (e.value ? (o ? e.value.open : e.value.close) : '')),
    f = computed(() => (o) => (e.value ? (o ? e.value.menuAppearTop : e.value.menuAppearBottom) : ''))
  return { transitionName: A, showTransition: !!e.value, menuTransition: f }
}
var Ft = (e) => {
  const {
      today: A,
      time: f,
      modelValue: o,
      defaults: { range: c }
    } = Me(),
    { setTimeModelValue: s } = Ie()
  ;(watch(
    c,
    (r, u) => {
      r.enabled !== u.enabled && s(f, o.value, A, c.value.enabled)
    },
    { deep: true }
  ),
    watch(
      o,
      (r, u) => {
        e && JSON.stringify(r ?? {}) !== JSON.stringify(u ?? {}) && e()
      },
      { deep: true }
    ))
}
var Ue = () => {
  const {
      defaults: { safeDates: e, range: A, multiDates: f, filters: o, timeConfig: c },
      rootProps: s,
      getDate: r
    } = Me(),
    { getMapKeyType: u, getMapDate: v, errorMapper: Y, convertType: P } = Ie(),
    {
      isDateBefore: B,
      isDateAfter: O,
      isDateEqual: l,
      resetDate: w,
      getDaysInBetween: h2,
      setTimeValue: _,
      getTimeObj: b,
      setTime: E
    } = We(),
    k = (i) =>
      e.value.disabledDates
        ? typeof e.value.disabledDates == 'function'
          ? e.value.disabledDates(r(i))
          : !!v(i, e.value.disabledDates)
        : false,
    g = (i) =>
      e.value.maxDate ? (s.yearPicker ? getYear(i) > getYear(e.value.maxDate) : O(i, e.value.maxDate)) : false,
    M = (i) =>
      e.value.minDate ? (s.yearPicker ? getYear(i) < getYear(e.value.minDate) : B(i, e.value.minDate)) : false,
    R = (i) => {
      var _a2
      if (!i) return false
      const d = g(i),
        a = M(i),
        n = k(i),
        m = o.value.months.map((Qe) => +Qe).includes(getMonth(i)),
        N = ((_a2 = o.value.weekDays) == null ? void 0 : _a2.length)
          ? o.value.weekDays.some((Qe) => +Qe === getDay(i))
          : false,
        U = V(i),
        pe = getYear(i),
        ge = pe < +s.yearRange[0] || pe > +s.yearRange[1]
      return !(d || a || n || m || ge || N || U)
    },
    $ = (i, d) => B(...Ae(e.value.minDate, i, d)) || l(...Ae(e.value.minDate, i, d)),
    S = (i, d) => O(...Ae(e.value.maxDate, i, d)) || l(...Ae(e.value.maxDate, i, d)),
    p = (i, d, a) => {
      let n = false
      return (e.value.maxDate && a && S(i, d) && (n = true), e.value.minDate && !a && $(i, d) && (n = true), n)
    },
    D = (i, d, a, n) => {
      let C = false
      return (
        n && (e.value.minDate || e.value.maxDate)
          ? e.value.minDate && e.value.maxDate
            ? (C = p(i, d, a))
            : ((e.value.minDate && $(i, d)) || (e.value.maxDate && S(i, d))) && (C = true)
          : (C = true),
        C
      )
    },
    V = (i) =>
      Array.isArray(e.value.allowedDates) && !e.value.allowedDates.length
        ? true
        : e.value.allowedDates
          ? !v(i, e.value.allowedDates, u(s.monthPicker, s.yearPicker))
          : false,
    F = (i) => !R(i),
    L = (i) => (A.value.noDisabledRange ? !eachDayOfInterval({ start: i[0], end: i[1] }).some((a) => F(a)) : true),
    ne = (i) => {
      if (i) {
        const d = getYear(i)
        return d >= +s.yearRange[0] && d <= s.yearRange[1]
      }
      return true
    },
    re2 = (i, d) => !!(Array.isArray(i) && i[d] && (A.value.maxRange || A.value.minRange) && ne(i[d])),
    X = (i, d, a = 0) => {
      if (re2(d, a) && ne(i)) {
        const n = differenceInCalendarDays(i, d[a]),
          C = h2(d[a], i),
          m = C.length === 1 ? 0 : C.filter((U) => F(U)).length,
          N = Math.abs(n) - (A.value.minMaxRawRange ? 0 : m)
        if (A.value.minRange && A.value.maxRange) return N >= +A.value.minRange && N <= +A.value.maxRange
        if (A.value.minRange) return N >= +A.value.minRange
        if (A.value.maxRange) return N <= +A.value.maxRange
      }
      return true
    },
    x = () => !c.value.enableTimePicker || s.monthPicker || s.yearPicker || c.value.ignoreTimeValidation,
    te = (i) => (Array.isArray(i) ? [i[0] ? _(i[0]) : null, i[1] ? _(i[1]) : null] : _(i)),
    q = (i, d, a) =>
      d
        ? i.find((n) =>
            +n.hours === getHours(d) && n.minutes === '*'
              ? true
              : +n.minutes === getMinutes(d) && +n.hours === getHours(d)
          ) && a
        : false,
    oe = (i, d, a) => {
      const [n, C] = i,
        [m, N] = d
      return !q(n, m, a) && !q(C, N, a) && a
    },
    K = (i, d) => {
      const a = Array.isArray(d) ? d : [d]
      return Array.isArray(s.disabledTimes)
        ? Array.isArray(s.disabledTimes[0])
          ? oe(s.disabledTimes, a, i)
          : !a.some((n) => q(s.disabledTimes, n, i))
        : i
    },
    Z = (i, d) => {
      const a = Array.isArray(d) ? [b(d[0]), d[1] ? b(d[1]) : void 0] : b(d),
        n = !s.disabledTimes(a)
      return i && n
    },
    de = (i, d) => (s.disabledTimes ? (Array.isArray(s.disabledTimes) ? K(d, i) : Z(d, i)) : d),
    G = (i) => {
      let d = true
      if (!i || x()) return true
      const a = !e.value.minDate && !e.value.maxDate ? te(i) : i
      return (
        (s.maxTime || e.value.maxDate) && (d = I(s.maxTime, e.value.maxDate, 'max', P(a), d)),
        (s.minTime || e.value.minDate) && (d = I(s.minTime, e.value.minDate, 'min', P(a), d)),
        de(i, d)
      )
    },
    ce = (i) => {
      if (!s.monthPicker) return true
      let d = true
      const a = r(w(i))
      if (e.value.minDate && e.value.maxDate) {
        const n = r(w(e.value.minDate)),
          C = r(w(e.value.maxDate))
        return (O(a, n) && B(a, C)) || l(a, n) || l(a, C)
      }
      if (e.value.minDate) {
        const n = r(w(e.value.minDate))
        d = O(a, n) || l(a, n)
      }
      if (e.value.maxDate) {
        const n = r(w(e.value.maxDate))
        d = B(a, n) || l(a, n)
      }
      return d
    },
    le = computed(() => (i) => (!c.value.enableTimePicker || c.value.ignoreTimeValidation ? true : G(i))),
    we = computed(
      () => (i) =>
        s.monthPicker
          ? Array.isArray(i) && (A.value.enabled || f.value.enabled)
            ? !i.filter((a) => !ce(a)).length
            : ce(i)
          : true
    ),
    ve = (i, d, a) => {
      if (!d || (a && !e.value.maxDate) || (!a && !e.value.minDate)) return false
      const n = a ? addMonths(i, 1) : subMonths(i, 1),
        C = [getMonth(n), getYear(n)]
      return a ? !S(...C) : !$(...C)
    },
    Ae = (i, d, a) => [set(r(i), { date: 1 }), set(r(), { month: d, year: a, date: 1 })],
    Q = (i, d, a, n) => {
      if (!i) return true
      if (n) {
        const C = a === 'max' ? isBefore(i, d) : isAfter(i, d),
          m = { seconds: 0, milliseconds: 0 }
        return C || isEqual(set(i, m), set(d, m))
      }
      return a === 'max' ? i.getTime() <= d.getTime() : i.getTime() >= d.getTime()
    },
    I = (i, d, a, n, C) => {
      if (Array.isArray(n)) {
        const N = y(i, n[0], d),
          U = y(i, n[1], d)
        return Q(n[0], N, a, !!d) && Q(n[1], U, a, !!d) && C
      }
      const m = y(i, n, d)
      return Q(n, m, a, !!d) && C
    },
    y = (i, d, a) => (i ? E(i, d) : r(a ?? d))
  return {
    isDisabled: F,
    validateDate: R,
    validateMonthYearInRange: D,
    isDateRangeAllowed: L,
    checkMinMaxRange: X,
    isValidTime: G,
    validateMonthYear: ve,
    validateMinDate: $,
    validateMaxDate: S,
    isValidDate: (i) => (Array.isArray(i) ? isValid(i[0]) && (i[1] ? isValid(i[1]) : true) : i ? isValid(i) : false),
    checkPartialRangeValue: (i) => {
      if (i) return null
      throw new Error(Y.prop('partial-range'))
    },
    checkRangeEnabled: (i, d) => {
      if (d) return i()
      throw new Error(Y.prop('range'))
    },
    checkMinMaxValue: (i, d, a) => {
      const n = a != null,
        C = d != null
      if (!n && !C) return false
      const m = +a,
        N = +d
      return n && C ? +i > m || +i < N : n ? +i > m : C ? +i < N : false
    },
    isTimeValid: le,
    isMonthValid: we
  }
}
var Vn = (e) => {
  const {
      rootEmit: A,
      rootProps: f,
      defaults: { timeConfig: o, flow: c }
    } = Me(),
    s = ref(0),
    r = reactive({
      [bt.timePicker]: !o.value.enableTimePicker || f.timePicker || f.monthPicker,
      [bt.calendar]: false,
      [bt.header]: false
    }),
    u = computed(() => f.monthPicker || f.timePicker),
    v = (l) => {
      var _a2, _b
      if ((_b = (_a2 = c.value) == null ? void 0 : _a2.steps) == null ? void 0 : _b.length) {
        if (!l && u.value) return O()
        ;((r[l] = true), Object.keys(r).filter((w) => !r[w]).length || O())
      }
    },
    Y = () => {
      var _a2, _b, _c, _d
      ;(((_b = (_a2 = c.value) == null ? void 0 : _a2.steps) == null ? void 0 : _b.length) &&
        s.value !== -1 &&
        ((s.value += 1), A('flow-step', s.value), O()),
        ((_d = (_c = c.value) == null ? void 0 : _c.steps) == null ? void 0 : _d.length) === s.value &&
          nextTick().then(() => P()))
    },
    P = () => {
      s.value = -1
    },
    B = (l, w, ...h2) => {
      var _a2, _b, _c
      ;((_a2 = c.value) == null ? void 0 : _a2.steps[s.value]) === l &&
        e.value &&
        ((_c = (_b = e.value)[w]) == null ? void 0 : _c.call(_b, ...h2))
    },
    O = (l = 0) => {
      var _a2
      ;(l && (s.value += l),
        B(He.month, 'toggleMonthPicker', true),
        B(He.year, 'toggleYearPicker', true),
        B(He.calendar, 'toggleTimePicker', false, true),
        B(He.time, 'toggleTimePicker', true, true))
      const w = (_a2 = c.value) == null ? void 0 : _a2.steps[s.value]
      ;(w === He.hours || w === He.minutes || w === He.seconds) && B(w, 'toggleTimePicker', true, true, w)
    }
  return { childMount: v, updateFlowStep: Y, resetFlow: P, handleFlow: O, flowStep: s }
}
function fa(e) {
  return (A = {}) => {
    const f = A.width ? String(A.width) : e.defaultWidth
    return e.formats[f] || e.formats[e.defaultWidth]
  }
}
function xt(e) {
  return (A, f) => {
    const o = (f == null ? void 0 : f.context) ? String(f.context) : 'standalone'
    let c
    if (o === 'formatting' && e.formattingValues) {
      const r = e.defaultFormattingWidth || e.defaultWidth,
        u = (f == null ? void 0 : f.width) ? String(f.width) : r
      c = e.formattingValues[u] || e.formattingValues[r]
    } else {
      const r = e.defaultWidth,
        u = (f == null ? void 0 : f.width) ? String(f.width) : e.defaultWidth
      c = e.values[u] || e.values[r]
    }
    const s = e.argumentCallback ? e.argumentCallback(A) : A
    return c[s]
  }
}
function Ot(e) {
  return (A, f = {}) => {
    const o = f.width,
      c = (o && e.matchPatterns[o]) || e.matchPatterns[e.defaultMatchWidth],
      s = A.match(c)
    if (!s) return null
    const r = s[0],
      u = (o && e.parsePatterns[o]) || e.parsePatterns[e.defaultParseWidth],
      v = Array.isArray(u)
        ? Nn(u, (B) => B.test(r))
        : // [TODO] -- I challenge you to fix the type
          Fn(u, (B) => B.test(r))
    let Y
    ;((Y = e.valueCallback ? e.valueCallback(v) : v),
      (Y = f.valueCallback
        ? // [TODO] -- I challenge you to fix the type
          f.valueCallback(Y)
        : Y))
    const P = A.slice(r.length)
    return { value: Y, rest: P }
  }
}
function Fn(e, A) {
  for (const f in e) if (Object.prototype.hasOwnProperty.call(e, f) && A(e[f])) return f
}
function Nn(e, A) {
  for (let f = 0; f < e.length; f++) if (A(e[f])) return f
}
function Wn(e) {
  return (A, f = {}) => {
    const o = A.match(e.matchPattern)
    if (!o) return null
    const c = o[0],
      s = A.match(e.parsePattern)
    if (!s) return null
    let r = e.valueCallback ? e.valueCallback(s[0]) : s[0]
    r = f.valueCallback ? f.valueCallback(r) : r
    const u = A.slice(c.length)
    return { value: r, rest: u }
  }
}
var Ln = {
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
var Hn = (e, A, f) => {
  let o
  const c = Ln[e]
  return (
    typeof c == 'string' ? (o = c) : A === 1 ? (o = c.one) : (o = c.other.replace('{{count}}', A.toString())),
    (f == null ? void 0 : f.addSuffix) ? (f.comparison && f.comparison > 0 ? 'in ' + o : o + ' ago') : o
  )
}
var jn = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
}
var Kn = (e, A, f, o) => jn[e]
var zn = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
}
var qn = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
}
var Un = {
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
var Qn = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}
var Jn = {
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
var Gn = {
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
var Xn = (e, A) => {
  const f = Number(e),
    o = f % 100
  if (o > 20 || o < 10)
    switch (o % 10) {
      case 1:
        return f + 'st'
      case 2:
        return f + 'nd'
      case 3:
        return f + 'rd'
    }
  return f + 'th'
}
var Zn = {
  ordinalNumber: Xn,
  era: xt({
    values: zn,
    defaultWidth: 'wide'
  }),
  quarter: xt({
    values: qn,
    defaultWidth: 'wide',
    argumentCallback: (e) => e - 1
  }),
  month: xt({
    values: Un,
    defaultWidth: 'wide'
  }),
  day: xt({
    values: Qn,
    defaultWidth: 'wide'
  }),
  dayPeriod: xt({
    values: Jn,
    defaultWidth: 'wide',
    formattingValues: Gn,
    defaultFormattingWidth: 'wide'
  })
}
var er = /^(\d+)(th|st|nd|rd)?/i
var tr = /\d+/i
var ar = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}
var nr = {
  any: [/^b/i, /^(a|c)/i]
}
var rr = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}
var lr = {
  any: [/1/i, /2/i, /3/i, /4/i]
}
var or = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}
var sr = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}
var ur = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}
var ir = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}
var cr = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}
var dr = {
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
var vr = {
  ordinalNumber: Wn({
    matchPattern: er,
    parsePattern: tr,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ot({
    matchPatterns: ar,
    defaultMatchWidth: 'wide',
    parsePatterns: nr,
    defaultParseWidth: 'any'
  }),
  quarter: Ot({
    matchPatterns: rr,
    defaultMatchWidth: 'wide',
    parsePatterns: lr,
    defaultParseWidth: 'any',
    valueCallback: (e) => e + 1
  }),
  month: Ot({
    matchPatterns: or,
    defaultMatchWidth: 'wide',
    parsePatterns: sr,
    defaultParseWidth: 'any'
  }),
  day: Ot({
    matchPatterns: ur,
    defaultMatchWidth: 'wide',
    parsePatterns: ir,
    defaultParseWidth: 'any'
  }),
  dayPeriod: Ot({
    matchPatterns: cr,
    defaultMatchWidth: 'any',
    parsePatterns: dr,
    defaultParseWidth: 'any'
  })
}
var fr = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
}
var mr = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
}
var pr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
}
var hr = {
  date: fa({
    formats: fr,
    defaultWidth: 'full'
  }),
  time: fa({
    formats: mr,
    defaultWidth: 'full'
  }),
  dateTime: fa({
    formats: pr,
    defaultWidth: 'full'
  })
}
var gr = {
  code: 'en-US',
  formatDistance: Hn,
  formatLong: hr,
  formatRelative: Kn,
  localize: Zn,
  match: vr,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}
var Da = {
  noDisabledRange: false,
  showLastInRange: true,
  minMaxRawRange: false,
  partialRange: true,
  disableTimeRangeValidation: false,
  maxRange: void 0,
  minRange: void 0,
  autoRange: void 0,
  fixedStart: false,
  fixedEnd: false,
  autoSwitchStartEnd: true
}
var yr = {
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
var Ma = {
  enterSubmit: true,
  tabSubmit: true,
  openMenu: 'open',
  selectOnFocus: false,
  rangeSeparator: ' - ',
  escClose: true,
  format: void 0,
  maskFormat: void 0,
  applyOnBlur: false,
  separators: void 0
}
var br = {
  dates: [],
  years: [],
  months: [],
  quarters: [],
  weeks: [],
  weekdays: [],
  options: { highlightDisabled: false }
}
var kr = {
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  selectBtnLabel: 'Select',
  cancelBtnLabel: 'Cancel',
  nowBtnLabel: 'Now',
  nowBtnRound: void 0
}
var wr = {
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
var _a = {
  menuAppearTop: 'dp-menu-appear-top',
  menuAppearBottom: 'dp-menu-appear-bottom',
  open: 'dp-slide-down',
  close: 'dp-slide-up',
  next: 'calendar-next',
  previous: 'calendar-prev',
  vNext: 'dp-slide-up',
  vPrevious: 'dp-slide-down'
}
var Dr = {
  weekDays: [],
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] }
}
var Mr = {
  month: 'LLL',
  year: 'yyyy',
  weekDay: 'EEEEEE',
  quarter: 'MMMM',
  day: 'd',
  input: void 0,
  preview: void 0
}
var _r = {
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
var Ar = {
  flowStep: 0,
  menuWrapRef: null,
  collapse: false
}
var Pr = {
  weekStart: Ea.Monday,
  yearRange: () => [1900, 2100],
  ui: () => ({}),
  locale: () => gr,
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
var Aa = {
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
var qt = {
  type: 'local',
  hideOnOffsetDates: false,
  label: 'W'
}
var Tr = (e) => {
  const { getMapKey: A, getMapKeyType: f, getTimeObjFromCurrent: o } = Ie()
  function c(x, te) {
    let q
    return (
      e.timezone
        ? (q = new TZDate(x ?? /* @__PURE__ */ new Date(), e.timezone))
        : (q = x ? new Date(x) : /* @__PURE__ */ new Date()),
      te ? set(q, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }) : q
    )
  }
  const s = () => {
      const x = L.value.enableSeconds ? ':ss' : '',
        te = L.value.enableMinutes ? ':mm' : ''
      return L.value.is24 ? `HH${te}${x}` : `hh${te}${x} aa`
    },
    r = () => {
      var _a2
      return e.monthPicker
        ? 'MM/yyyy'
        : e.timePicker
          ? s()
          : e.weekPicker
            ? `${((_a2 = R.value) == null ? void 0 : _a2.type) === 'iso' ? 'II' : 'ww'}-RR`
            : e.yearPicker
              ? 'yyyy'
              : e.quarterPicker
                ? 'QQQ/yyyy'
                : L.value.enableTimePicker
                  ? `MM/dd/yyyy, ${s()}`
                  : 'MM/dd/yyyy'
    },
    u = (x) => o(c(), x, L.value.enableSeconds),
    v = () =>
      p.value.enabled
        ? L.value.startTime && Array.isArray(L.value.startTime)
          ? [u(L.value.startTime[0]), u(L.value.startTime[1])]
          : null
        : L.value.startTime && !Array.isArray(L.value.startTime)
          ? u(L.value.startTime)
          : null,
    Y = (x) => (x ? (typeof x == 'boolean' ? (x ? 2 : 0) : Math.max(+x, 2)) : 0),
    P = (x) => {
      const te = f(e.monthPicker, e.yearPicker)
      return new Map(
        x.map((q) => {
          const oe = c(q, B.value)
          return [A(oe, te), oe]
        })
      )
    },
    B = computed(() => e.monthPicker || e.yearPicker || e.quarterPicker),
    O = computed(() => {
      const x = typeof e.multiCalendars == 'object' && e.multiCalendars,
        te = {
          static: true,
          solo: false
        }
      if (!e.multiCalendars) return { ...te, count: Y(false) }
      const q = x ? e.multiCalendars : {},
        oe = x ? (q.count ?? true) : e.multiCalendars,
        K = Y(oe)
      return Object.assign(te, q, { count: K })
    }),
    l = computed(() => v()),
    w = computed(() => ({ ...wr, ...e.ariaLabels })),
    h2 = computed(() => ({ ...Dr, ...e.filters })),
    _ = computed(() =>
      typeof e.transitions == 'boolean' ? (e.transitions ? _a : false) : { ..._a, ...e.transitions }
    ),
    b = computed(() => ({ ...kr, ...e.actionRow })),
    E = computed(() =>
      typeof e.textInput == 'object'
        ? {
            ...Ma,
            ...e.textInput,
            format: typeof e.textInput.format == 'string' ? e.textInput.format : V.value.input,
            pattern: e.textInput.format ?? V.value.input,
            enabled: true
          }
        : {
            ...Ma,
            format: V.value.input,
            pattern: V.value.input,
            enabled: e.textInput
          }
    ),
    k = computed(() => {
      const x = { input: false }
      return typeof e.inline == 'object'
        ? { ...x, ...e.inline, enabled: true }
        : {
            enabled: e.inline,
            ...x
          }
    }),
    g = computed(() => ({ ...yr, ...e.config })),
    M = computed(() =>
      typeof e.highlight == 'function'
        ? e.highlight
        : {
            ...br,
            ...e.highlight
          }
    ),
    R = computed(() => {
      var _a2, _b
      return typeof e.weekNumbers == 'object'
        ? {
            type: ((_a2 = e.weekNumbers) == null ? void 0 : _a2.type) ?? qt.type,
            hideOnOffsetDates: ((_b = e.weekNumbers) == null ? void 0 : _b.hideOnOffsetDates) ?? qt.hideOnOffsetDates,
            label: e.weekNumbers.label ?? qt.label
          }
        : e.weekNumbers
          ? qt
          : void 0
    }),
    $ = computed(() => {
      var _a2, _b
      return typeof e.multiDates == 'boolean'
        ? { enabled: e.multiDates, dragSelect: true, limit: null }
        : {
            enabled: !!e.multiDates,
            limit: ((_a2 = e.multiDates) == null ? void 0 : _a2.limit) ? +e.multiDates.limit : null,
            dragSelect: ((_b = e.multiDates) == null ? void 0 : _b.dragSelect) ?? true
          }
    }),
    S = computed(() => {
      var _a2
      return {
        minDate: e.minDate ? c(e.minDate) : null,
        maxDate: e.maxDate ? c(e.maxDate) : null,
        disabledDates: Array.isArray(e.disabledDates) ? P(e.disabledDates) : e.disabledDates,
        allowedDates: Array.isArray(e.allowedDates) ? P(e.allowedDates) : null,
        highlight: typeof M.value == 'object' && Array.isArray(M.value.dates) ? P(M.value.dates) : M.value,
        markers: ((_a2 = e.markers) == null ? void 0 : _a2.length)
          ? new Map(
              e.markers.map((x) => {
                const te = c(x.date)
                return [A(te, Mt.DATE), x]
              })
            )
          : null
      }
    }),
    p = computed(() =>
      typeof e.range == 'object'
        ? { enabled: true, ...Da, ...e.range }
        : {
            enabled: e.range,
            ...Da
          }
    ),
    D = computed(() => ({
      ...Object.fromEntries(
        Object.keys(e.ui).map((te) => {
          const q = te,
            oe = e.ui[q]
          if (q === 'dayClass') return [q, e.ui[q]]
          const K = typeof e.ui[q] == 'string' ? { [oe]: true } : Object.fromEntries(oe.map((Z) => [Z, true]))
          return [te, K]
        })
      )
    })),
    V = computed(() => {
      var _a2, _b
      return {
        ...Mr,
        ...e.formats,
        input: ((_a2 = e.formats) == null ? void 0 : _a2.input) ?? r(),
        preview: ((_b = e.formats) == null ? void 0 : _b.preview) ?? r()
      }
    }),
    F = computed(() => {
      if (e.teleport)
        return typeof e.teleport == 'string' ? e.teleport : typeof e.teleport == 'boolean' ? 'body' : e.teleport
    }),
    L = computed(() => ({ ..._r, ...e.timeConfig })),
    ne = computed(() => {
      if (e.flow) return { steps: [], partial: false, ...e.flow }
    }),
    re2 = computed(() => {
      const x = E.value.enabled ? 'text' : 'none'
      return e.inputAttrs ? { ...Aa, inputmode: x, ...e.inputAttrs } : { ...Aa, inputmode: x }
    }),
    X = computed(() => {
      var _a2, _b, _c, _d, _e, _f
      return {
        offset: ((_a2 = e.floating) == null ? void 0 : _a2.offset) ?? 10,
        arrow: ((_b = e.floating) == null ? void 0 : _b.arrow) ?? true,
        strategy: ((_c = e.floating) == null ? void 0 : _c.strategy) ?? void 0,
        placement: ((_d = e.floating) == null ? void 0 : _d.placement) ?? void 0,
        flip: ((_e = e.floating) == null ? void 0 : _e.flip) ?? true,
        shift: ((_f = e.floating) == null ? void 0 : _f.shift) ?? true
      }
    })
  return {
    transitions: _,
    multiCalendars: O,
    startTime: l,
    ariaLabels: w,
    filters: h2,
    actionRow: b,
    textInput: E,
    inline: k,
    config: g,
    highlight: M,
    weekNumbers: R,
    range: p,
    safeDates: S,
    multiDates: $,
    ui: D,
    formats: V,
    teleport: F,
    timeConfig: L,
    flow: ne,
    inputAttrs: re2,
    floatingConfig: X,
    getDate: c
  }
}
var Ie = () => {
  const e = (g, M) => format(g, M ?? Mt.DATE),
    A = (g, M) => (g ? Mt.MONTH_AND_YEAR : M ? Mt.YEAR : Mt.DATE),
    f = (g, M, R) => M.get(e(g, R)),
    o = (g) => g,
    c = (g) => (g === 0 ? g : !g || Number.isNaN(+g) ? null : +g),
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
    r = (g, M) => {
      let R = [...document.querySelectorAll(s())]
      R = R.filter((S) => !g.contains(S) || 'datepicker-instance' in S.dataset)
      const $ = R.indexOf(g)
      if ($ >= 0 && (M ? $ - 1 >= 0 : $ + 1 <= R.length)) return R[$ + (M ? -1 : 1)]
    },
    u = (g) => String(g).padStart(2, '0'),
    v = (g, M) => (g == null ? void 0 : g.querySelector(`[data-dp-element="${M}"]`)),
    Y = (g, M, R = false) => {
      g && M.allowStopPropagation && (R && g.stopImmediatePropagation(), g.stopPropagation())
    },
    P = (g, M, R = false, $) => {
      if (g.key === $e.enter || g.key === $e.space) return (R && g.preventDefault(), M())
      if ($) return $(g)
    },
    B = (g, M) => {
      ;(M.allowStopPropagation && g.stopPropagation(), M.allowPreventDefault && g.preventDefault())
    },
    O = (g) => {
      if (g) return [...g.querySelectorAll('input, button, select, textarea, a[href]')][0]
    },
    l = () => 'ontouchstart' in globalThis || navigator.maxTouchPoints > 0,
    w = (g) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][g],
    h2 = (g) => {
      const M = [],
        R = ($) => $.filter((S) => !!S)
      for (let $ = 0; $ < g.length; $ += 3) {
        const S = [g[$], g[$ + 1], g[$ + 2]]
        M.push(R(S))
      }
      return M
    },
    _ = {
      prop: (g) => `"${g}" prop must be enabled!`,
      dateArr: (g) => `You need to use array as "model-value" binding in order to support "${g}"`
    },
    b = (g, M, R, $, S) => {
      const p = {
        hours: getHours,
        minutes: getMinutes,
        seconds: getSeconds
      }
      if (!M) return $ ? [p[g](R), p[g](R)] : p[g](R)
      if (Array.isArray(M) && $) {
        const D = M[0] ?? R,
          V = M[1]
        return [p[g](D), V ? p[g](V) : (S[g][1] ?? p[g](R))]
      }
      return Array.isArray(M) && !$ ? p[g](M[M.length - 1] ?? R) : p[g](M)
    }
  return {
    getMapKey: e,
    getMapKeyType: A,
    getMapDate: f,
    convertType: o,
    getNumVal: c,
    findNextFocusableElement: r,
    padZero: u,
    getElWithin: v,
    checkStopPropagation: Y,
    checkKeyDown: P,
    handleEventPropagation: B,
    findFocusableEl: O,
    isTouchDevice: l,
    hoursToAmPmHours: w,
    getGroupedList: h2,
    setTimeModelValue: (g, M, R, $) => {
      ;((g.hours = b('hours', M, R, $, g)),
        (g.minutes = b('minutes', M, R, $, g)),
        (g.seconds = b('seconds', M, R, $, g)))
    },
    getTimeObjFromCurrent: (g, M, R) => {
      const $ = {
        hours: getHours(g),
        minutes: getMinutes(g),
        seconds: R ? getSeconds(g) : 0
      }
      return Object.assign($, M)
    },
    errorMapper: _
  }
}
var We = () => {
  const { getDate: e } = Me(),
    { getMapDate: A, getGroupedList: f } = Ie(),
    o = (p, D) => {
      if (!p) return e()
      const V = e(p),
        F = set(V, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
      return D ? startOfMonth(F) : F
    },
    c = (p, D) => {
      const V = e(D)
      return set(V, {
        hours: +(p.hours ?? getHours(V)),
        minutes: +(p.minutes ?? getMinutes(V)),
        seconds: +(p.seconds ?? getSeconds(V)),
        milliseconds: 0
      })
    },
    s = (p, D) => {
      const V = startOfWeek(p, { weekStartsOn: +D }),
        F = endOfWeek(p, { weekStartsOn: +D })
      return [V, F]
    },
    r = (p, D) => (!p || !D ? false : isBefore(o(p), o(D))),
    u = (p, D) => (!p || !D ? false : isEqual(o(p), o(D))),
    v = (p, D) => (!p || !D ? false : isAfter(o(p), o(D))),
    Y = (p, D, V) =>
      (p == null ? void 0 : p[0]) && (p == null ? void 0 : p[1])
        ? v(V, p[0]) && r(V, p[1])
        : (p == null ? void 0 : p[0]) && D
          ? (v(V, p[0]) && r(V, D)) || (r(V, p[0]) && v(V, D))
          : false,
    P = (p, D) => {
      const V = v(p, D) ? D : p,
        F = v(D, p) ? D : p
      return eachDayOfInterval({ start: V, end: F })
    },
    B = (p) => `dp-${format(p, 'yyyy-MM-dd')}`,
    O = (p) => o(set(e(p), { date: 1 })),
    l = (p, D) => {
      if (D) {
        const V = getYear(e(D))
        if (V > p) return 12
        if (V === p) return getMonth(e(D))
      }
    },
    w = (p, D) => {
      if (D) {
        const V = getYear(e(D))
        return V < p ? -1 : V === p ? getMonth(e(D)) : void 0
      }
    },
    h2 = (p) => {
      if (p) return getYear(e(p))
    },
    _ = (p) => ({
      hours: getHours(p),
      minutes: getMinutes(p),
      seconds: getSeconds(p)
    })
  return {
    resetDateTime: o,
    groupListAndMap: (p, D) =>
      f(p).map((V) =>
        V.map((F) => {
          const { active: L, disabled: ne, isBetween: re2, highlighted: X } = D(F)
          return {
            ...F,
            active: L,
            disabled: ne,
            className: {
              dp__overlay_cell_active: L,
              dp__overlay_cell: !L,
              dp__overlay_cell_disabled: ne,
              dp__overlay_cell_pad: true,
              dp__overlay_cell_active_disabled: ne && L,
              dp__cell_in_between: re2,
              'dp--highlighted': X
            }
          }
        })
      ),
    setTime: c,
    getWeekFromDate: s,
    isDateAfter: v,
    isDateBefore: r,
    isDateBetween: Y,
    isDateEqual: u,
    getDaysInBetween: P,
    getCellId: B,
    resetDate: O,
    getMinMonth: l,
    getMaxMonth: w,
    getYearFromDate: h2,
    getTimeObj: _,
    setTimeValue: (p) => set(e(), _(p)),
    sanitizeTime: (p, D, V) =>
      D && (V || V === 0)
        ? Object.fromEntries(
            ['hours', 'minutes', 'seconds'].map((F) => (F === D ? [F, V] : [F, Number.isNaN(+p[F]) ? void 0 : +p[F]]))
          )
        : {
            hours: Number.isNaN(+p.hours) ? void 0 : +p.hours,
            minutes: Number.isNaN(+p.minutes) ? void 0 : +p.minutes,
            seconds: Number.isNaN(+(p.seconds ?? '')) ? void 0 : +p.seconds
          },
    getBeforeAndAfterInRange: (p, D) => {
      const V = subDays(o(D), p),
        F = addDays(o(D), p)
      return { before: V, after: F }
    },
    isModelAuto: (p) => (Array.isArray(p) ? !!p[0] && !!p[1] : false),
    matchDate: (p, D) => (p ? (D ? (D instanceof Map ? !!A(p, D) : D(e(p))) : false) : true),
    checkHighlightMonth: (p, D, V) =>
      typeof p == 'function' ? p({ month: D, year: V }) : p.months.some((F) => F.month === D && F.year === V),
    checkHighlightYear: (p, D) => (typeof p == 'function' ? p(D) : p.years.includes(D))
  }
}
var Zt = () => {
  const {
      defaults: { config: e }
    } = Me(),
    A = ref(0)
  ;(onMounted(() => {
    ;(f(), globalThis.addEventListener('resize', f, { passive: true }))
  }),
    onUnmounted(() => {
      globalThis.removeEventListener('resize', f)
    }))
  const f = () => {
    A.value = globalThis.document.documentElement.clientWidth
  }
  return {
    isMobile: computed(() => (A.value <= e.value.mobileBreakpoint ? true : void 0))
  }
}
var pt = () => {
  const {
      getDate: e,
      state: A,
      modelValue: f,
      rootProps: o,
      defaults: { formats: c, textInput: s }
    } = Me(),
    r = (_) => format(setYear(e(), _), c.value.year, { locale: o.locale }),
    u = (_) => format(setMonth(e(), _), c.value.month, { locale: o.locale }),
    v = (_) => format(_, c.value.weekDay, { locale: o.locale }),
    Y = (_) => format(_, c.value.quarter, { locale: o.locale }),
    P = (_, b) => [_, b].map((E) => Y(E)).join('-'),
    B = (_) => format(_, c.value.day, { locale: o.locale }),
    O = (_, b, E) => {
      const k = E ? c.value.preview : c.value.input
      if (!_) return ''
      if (typeof k == 'function') return k(_)
      const g = b ?? k,
        M = { locale: o.locale }
      return Array.isArray(_)
        ? `${format(_[0], g, M)}${o.modelAuto && !_[1] ? '' : s.value.rangeSeparator}${_[1] ? format(_[1], g, M) : ''}`
        : format(_, g, M)
    },
    l = () => {
      const _ = (b) => format(b, s.value.format)
      return Array.isArray(f.value)
        ? `${_(f.value[0])} ${s.value.rangeSeparator} ${f.value[1] ? _(f.value[1]) : ''}`
        : ''
    }
  return {
    formatYear: r,
    formatMonth: u,
    formatWeekDay: v,
    formatQuarter: Y,
    formatSelectedDate: O,
    formatForTextInput: () =>
      A.isInputFocused && f.value ? (Array.isArray(f.value) ? l() : format(f.value, s.value.format)) : O(f.value),
    formatPreview: (_) => O(_, void 0, true),
    formatQuarterText: P,
    formatDay: B
  }
}
var ea = () => {
  const { rootProps: e } = Me(),
    { formatYear: A, formatMonth: f } = pt()
  return {
    getMonths: () =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((r) => ({
        text: f(r),
        value: r
      })),
    getYears: () => {
      const r = []
      for (let u = +e.yearRange[0]; u <= +e.yearRange[1]; u++) r.push({ value: +u, text: A(u) })
      return e.reverseYears ? r.reverse() : r
    },
    isOutOfYearRange: (r) => r < +e.yearRange[0] || r > +e.yearRange[1]
  }
}
var $r = (e) => ({
  openMenu: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.openMenu()
  },
  closeMenu: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.closeMenu()
  },
  selectDate: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.selectDate()
  },
  clearValue: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.clearValue()
  },
  formatInputValue: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.formatInputValue()
  },
  updateInternalModelValue: (h2) => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.updateInternalModelValue(h2)
  },
  setMonthYear: (h2, _) => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.setMonthYear(h2, _)
  },
  parseModel: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.parseModel()
  },
  switchView: (h2, _) => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.switchView(h2, _)
  },
  handleFlow: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.handleFlow()
  },
  toggleMenu: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.toggleMenu()
  },
  dpMenuRef: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.dpMenuRef()
  },
  dpWrapMenuRef: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.dpWrapMenuRef()
  },
  inputRef: () => {
    var _a2
    return (_a2 = e.value) == null ? void 0 : _a2.inputRef()
  }
})
var Pt = () => ({
  boolHtmlAttribute: (A) => (A ? true : void 0)
})
var Sr = () => {
  const {
      getDate: e,
      rootProps: A,
      defaults: { textInput: f, startTime: o, timeConfig: c }
    } = Me(),
    { getTimeObjFromCurrent: s } = Ie(),
    r = ref(false),
    u = computed(() => (Array.isArray(o.value) ? o.value[0] : (o.value ?? s(e(), {}, c.value.enableSeconds)))),
    v = (l, w) => {
      var _a2, _b
      const h2 = /[^a-zA-Z]+/g,
        _ = /\D+/g,
        b = w.split(_),
        E = l.split(h2),
        k = l.match(h2) || [],
        g = w.match(_) || []
      let M = ''
      for (let R = 0; R < b.length && R < E.length; R++) {
        R > 0 && g[R - 1] && (M += k[R - 1] || g[R - 1])
        const $ = (_a2 = b[R]) == null ? void 0 : _a2.length
        M += (_b = E[R]) == null ? void 0 : _b.slice(0, $)
      }
      return M
    },
    Y = (l, w, h2) => {
      const _ = parse(l, v(w, l), e(), {
        locale: A.locale
      })
      return isValid(_) && isDate(_)
        ? h2 || r.value
          ? _
          : set(_, {
              hours: +u.value.hours,
              minutes: +u.value.minutes,
              seconds: +(u.value.seconds ?? 0),
              milliseconds: 0
            })
        : null
    }
  return {
    textPasted: r,
    parseFreeInput: (l, w) => {
      if (typeof f.value.pattern == 'string') return Y(l, f.value.pattern, w)
      if (Array.isArray(f.value.pattern)) {
        let h2 = null
        for (const _ of f.value.pattern) if (((h2 = Y(l, _, w)), h2)) break
        return h2
      }
      return typeof f.value.pattern == 'function' ? f.value.pattern(l) : null
    },
    applyMaxValues: (l, w) => {
      const h2 = {
        MM: 12,
        DD: 31,
        hh: 23,
        mm: 59,
        ss: 59
      }
      let _ = '',
        b = 0
      for (let E = 0; E < w.length; E++) {
        const k = w[E],
          g = k.length,
          M = l.slice(b, b + g)
        if (!M) break
        if (M.length < g) _ += M
        else {
          let R = Number.parseInt(M, 10)
          ;(h2[k] && R > h2[k] && (R = h2[k]), (_ += R.toString().padStart(g, '0').slice(0, g)))
        }
        b += g
      }
      return _
    },
    createMaskedValue: (l, w) => {
      const h2 = /(YYYY|MM|DD|hh|mm|ss)/g,
        _ = [...w.matchAll(h2)].map((M) => M[0]),
        b = w.replace(h2, '|').split('|').filter(Boolean),
        E = _.map((M) => M.length)
      let k = '',
        g = 0
      for (let M = 0; M < _.length; M++) {
        const R = E[M],
          $ = l.slice(g, g + R)
        if (!$) break
        ;((k += $), $.length === R && b[M] && (k += b[M]), (g += R))
      }
      return k
    }
  }
}
var at = ((e) => (
  (e.Input = 'input'),
  (e.DatePicker = 'date-picker'),
  (e.Calendar = 'calendar'),
  (e.DatePickerHeader = 'date-picker-header'),
  (e.Menu = 'menu'),
  (e.ActionRow = 'action-row'),
  (e.TimePicker = 'time-picker'),
  (e.TimeInput = 'time-input'),
  (e.PassTrough = 'pass-trough'),
  (e.MonthPicker = 'month-picker'),
  (e.YearMode = 'year-mode'),
  (e.QuarterPicker = 'quarter-picker'),
  (e.YearPicker = 'year-picker'),
  e
))(at || {})
var wt = [
  'time-input',
  'time-picker',
  'pass-trough'
  /* PassTrough */
]
var Va = [
  {
    name: 'trigger',
    use: [
      'input'
      /* Input */
    ]
  },
  {
    name: 'input-icon',
    use: [
      'input'
      /* Input */
    ]
  },
  {
    name: 'clear-icon',
    use: [
      'input'
      /* Input */
    ]
  },
  {
    name: 'dp-input',
    use: [
      'input'
      /* Input */
    ]
  },
  {
    name: 'clock-icon',
    use: [
      'time-picker',
      'time-input',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'arrow-left',
    use: [
      'date-picker-header',
      'pass-trough',
      'year-mode'
      /* YearMode */
    ]
  },
  {
    name: 'arrow-right',
    use: [
      'date-picker-header',
      'pass-trough',
      'year-mode'
      /* YearMode */
    ]
  },
  {
    name: 'arrow-up',
    use: [
      'time-picker',
      'time-input',
      'date-picker-header',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'arrow-down',
    use: [
      'time-picker',
      'time-input',
      'date-picker-header',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'calendar-icon',
    use: [
      'date-picker-header',
      'time-picker',
      'pass-trough',
      'year-mode'
      /* YearMode */
    ]
  },
  {
    name: 'day',
    use: [
      'calendar',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'month-overlay-value',
    use: [
      'date-picker-header',
      'pass-trough',
      'month-picker'
      /* MonthPicker */
    ]
  },
  {
    name: 'year-overlay-value',
    use: [
      'date-picker-header',
      'pass-trough',
      'year-mode',
      'year-picker'
      /* YearPicker */
    ]
  },
  {
    name: 'year-overlay',
    use: [
      'date-picker-header',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'month-overlay',
    use: [
      'date-picker-header',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'month-overlay-header',
    use: [
      'date-picker-header',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'year-overlay-header',
    use: [
      'date-picker-header',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'hours-overlay-value',
    use: wt
  },
  {
    name: 'hours-overlay-header',
    use: wt
  },
  {
    name: 'minutes-overlay-value',
    use: wt
  },
  {
    name: 'minutes-overlay-header',
    use: wt
  },
  {
    name: 'seconds-overlay-value',
    use: wt
  },
  {
    name: 'seconds-overlay-header',
    use: wt
  },
  {
    name: 'hours',
    use: [
      'time-input',
      'time-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'minutes',
    use: [
      'time-input',
      'time-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'seconds',
    use: [
      'time-input',
      'time-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'month',
    use: [
      'date-picker-header',
      'time-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'year',
    use: [
      'date-picker-header',
      'time-picker',
      'pass-trough',
      'year-mode'
      /* YearMode */
    ]
  },
  {
    name: 'action-buttons',
    use: [
      'action-row'
      /* ActionRow */
    ]
  },
  {
    name: 'action-preview',
    use: [
      'action-row'
      /* ActionRow */
    ]
  },
  {
    name: 'calendar-header',
    use: [
      'calendar',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'marker-tooltip',
    use: [
      'calendar',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'action-extra',
    use: [
      'menu'
      /* Menu */
    ]
  },
  {
    name: 'time-picker-overlay',
    use: [
      'time-picker',
      'time-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'am-pm-button',
    use: [
      'time-picker',
      'time-input',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'left-sidebar',
    use: [
      'menu'
      /* Menu */
    ]
  },
  {
    name: 'right-sidebar',
    use: [
      'menu'
      /* Menu */
    ]
  },
  {
    name: 'month-year',
    use: [
      'date-picker-header',
      'pass-trough',
      'month-picker',
      'year-picker'
      /* YearPicker */
    ]
  },
  {
    name: 'time-picker',
    use: [
      'date-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'action-row',
    use: [
      'action-row'
      /* ActionRow */
    ]
  },
  {
    name: 'marker',
    use: [
      'calendar',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'quarter',
    use: [
      'quarter-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'top-extra',
    use: [
      'date-picker-header',
      'pass-trough',
      'month-picker',
      'quarter-picker',
      'year-picker'
      /* YearPicker */
    ]
  },
  {
    name: 'tp-inline-arrow-up',
    use: [
      'date-picker',
      'time-input',
      'time-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'tp-inline-arrow-down',
    use: [
      'date-picker',
      'time-input',
      'time-picker',
      'pass-trough'
      /* PassTrough */
    ]
  },
  {
    name: 'arrow',
    use: [
      'menu'
      /* Menu */
    ]
  },
  {
    name: 'menu-header',
    use: [
      'menu'
      /* Menu */
    ]
  }
]
var lt = (e, A) => Va.filter((f) => e[f.name] && f.use.includes(A)).map((f) => f.name)
var Fa = (e, A) =>
  Va.map((f) => f.name)
    .concat((A == null ? void 0 : A.filter((f) => f.slot).map((f) => f.slot)) ?? [])
    .filter((f) => !!e[f])
var Rr = {
  key: 1,
  class: 'dp__input_wrap'
}
var Cr = [
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
var xr = {
  key: 1,
  class: 'dp--clear-btn'
}
var Or = ['aria-label']
var Yr = defineComponent({
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
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      {
        rootEmit: s,
        inputValue: r,
        rootProps: u,
        defaults: { textInput: v, ariaLabels: Y, inline: P, config: B, range: O, multiDates: l, ui: w, inputAttrs: h2 }
      } = Me(),
      { checkMinMaxRange: _, isValidDate: b } = Ue(),
      { parseFreeInput: E, textPasted: k, createMaskedValue: g, applyMaxValues: M } = Sr(),
      { checkKeyDown: R, checkStopPropagation: $ } = Ie(),
      { boolHtmlAttribute: S } = Pt(),
      p = useTemplateRef('dp-input'),
      D = ref(null),
      V = ref(false),
      F = computed(() => ({
        dp__pointer: !u.disabled && !u.readonly && !v.value.enabled,
        dp__disabled: u.disabled,
        dp__input_readonly: !v.value.enabled,
        dp__input: true,
        dp__input_not_clearable: !h2.value.clearable,
        dp__input_icon_pad: !h2.value.hideInputIcon,
        dp__input_valid: typeof h2.value.state == 'boolean' ? h2.value.state : false,
        dp__input_invalid: typeof h2.value.state == 'boolean' ? !h2.value.state : false,
        dp__input_focus: V.value || c.isMenuOpen,
        dp__input_reg: !v.value.enabled,
        ...w.value.input
      })),
      L = () => {
        ;(o('set-input-date', null), h2 && u.autoApply && (o('set-empty-date'), (D.value = null)))
      },
      ne = (Q) => {
        var _a2
        if ((_a2 = v.value.separators) == null ? void 0 : _a2.length) {
          const I = new RegExp(v.value.separators.map((y) => y.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'))
          return Q.split(I)
        }
        return Q.split(v.value.rangeSeparator)
      },
      re2 = (Q) => {
        const [I, y] = ne(Q)
        if (I) {
          const H = E(I.trim(), r.value),
            fe = y ? E(y.trim(), r.value) : void 0
          if (isAfter(H, fe)) return
          const Pe = H && fe ? [H, fe] : [H]
          _(fe, Pe, 0) && (D.value = H ? Pe : null)
        }
      },
      X = () => {
        k.value = true
      },
      x = (Q) => {
        if (O.value.enabled) re2(Q)
        else if (l.value.enabled) {
          const I = Q.split(';')
          D.value = I.map((y) => E(y.trim())).filter((y) => !!y)
        } else D.value = E(Q, r.value)
      },
      te = (Q) => {
        var _a2, _b
        const I = typeof Q == 'string' ? Q : (_a2 = Q.target) == null ? void 0 : _a2.value,
          y = (_b = v == null ? void 0 : v.value) == null ? void 0 : _b.maskFormat
        let H = I
        if (typeof y == 'string') {
          const fe = /(YYYY|MM|DD|hh|mm|ss)/g,
            Ce = [...y.matchAll(fe)].map((a) => a[0]),
            i = I.replace(/\D/g, ''),
            d = M(i, Ce)
          H = g(d, y)
        }
        ;(H === '' ? L() : (v.value.openMenu && !c.isMenuOpen && o('open'), x(H), o('set-input-date', D.value)),
          (k.value = false),
          (r.value = H),
          s('text-input', Q, D.value))
      },
      q = (Q) => {
        v.value.enabled
          ? (x(Q.target.value),
            v.value.enterSubmit && b(D.value) && r.value !== ''
              ? (o('set-input-date', D.value, true), (D.value = null))
              : v.value.enterSubmit && r.value === '' && ((D.value = null), o('clear')))
          : Z(Q)
      },
      oe = (Q, I) => {
        ;(v.value.enabled && v.value.tabSubmit && !I && x(Q.target.value),
          v.value.tabSubmit && b(D.value) && r.value !== ''
            ? (o('set-input-date', D.value, true, true), (D.value = null))
            : v.value.tabSubmit && r.value === '' && ((D.value = null), o('clear')))
      },
      K = () => {
        ;((V.value = true),
          o('focus'),
          nextTick().then(() => {
            var _a2
            v.value.enabled && v.value.selectOnFocus && ((_a2 = p.value) == null ? void 0 : _a2.select())
          }))
      },
      Z = (Q) => {
        if (($(Q, B.value, true), v.value.enabled && v.value.openMenu && !P.value.input)) {
          if (v.value.openMenu === 'open' && !c.isMenuOpen) return o('open')
          if (v.value.openMenu === 'toggle') return o('toggle')
        } else v.value.enabled || o('toggle')
      },
      de = () => {
        ;(o('real-blur'),
          (V.value = false),
          (!c.isMenuOpen || (P.value.enabled && P.value.input)) && o('blur'),
          ((u.autoApply && v.value.enabled && D.value && !c.isMenuOpen) || v.value.applyOnBlur) &&
            (o('set-input-date', D.value), o('select-date'), (D.value = null)))
      },
      G = (Q) => {
        ;($(Q, B.value, true), o('clear'))
      },
      ce = () => {
        o('close')
      },
      le = (Q) => {
        if (
          (Q.key === 'Tab' && oe(Q),
          Q.key === 'Enter' && q(Q),
          Q.key === 'Escape' && v.value.escClose && ce(),
          !v.value.enabled)
        ) {
          if (Q.code === 'Tab') return
          Q.preventDefault()
        }
      },
      we = () => {
        var _a2
        ;(_a2 = p.value) == null ? void 0 : _a2.focus({ preventScroll: true })
      },
      ve = (Q) => {
        D.value = Q
      },
      Ae = (Q) => {
        Q.key === $e.tab && oe(Q, true)
      }
    return (
      A({
        focusInput: we,
        setParsedDate: ve
      }),
      (Q, I) => {
        var _a2, _b
        return (
          openBlock(),
          createElementBlock('div', { onClick: Z }, [
            !Q.$slots['dp-input'] && !unref(P).enabled
              ? renderSlot(Q.$slots, 'trigger', { key: 0 })
              : createCommentVNode('', true),
            !Q.$slots.trigger && (!unref(P).enabled || unref(P).input)
              ? (openBlock(),
                createElementBlock('div', Rr, [
                  !Q.$slots.trigger && (!unref(P).enabled || (unref(P).enabled && unref(P).input))
                    ? renderSlot(
                        Q.$slots,
                        'dp-input',
                        {
                          key: 0,
                          value: unref(r),
                          isMenuOpen: e.isMenuOpen,
                          onInput: te,
                          onEnter: q,
                          onTab: oe,
                          onClear: G,
                          onBlur: de,
                          onKeypress: le,
                          onPaste: X,
                          onFocus: K,
                          openMenu: () => Q.$emit('open'),
                          closeMenu: () => Q.$emit('close'),
                          toggleMenu: () => Q.$emit('toggle')
                        },
                        () => [
                          createBaseVNode(
                            'input',
                            {
                              id: unref(h2).id,
                              ref: 'dp-input',
                              'data-test-id': 'dp-input',
                              name: unref(h2).name,
                              class: normalizeClass(F.value),
                              inputmode: unref(h2).inputmode,
                              placeholder: unref(u).placeholder,
                              disabled: unref(S)(unref(u).disabled),
                              readonly: unref(S)(unref(u).readonly),
                              required: unref(S)(unref(h2).required),
                              value: unref(r),
                              autocomplete: unref(h2).autocomplete,
                              'aria-label': unref(Y).input,
                              'aria-disabled': unref(u).disabled || void 0,
                              'aria-invalid': unref(h2).state === false ? true : void 0,
                              onInput: te,
                              onBlur: de,
                              onFocus: K,
                              onKeypress: le,
                              onKeydown: I[0] || (I[0] = (y) => le(y)),
                              onPaste: X,
                              onInvalid: I[1] || (I[1] = (y) => unref(s)('invalid', y))
                            },
                            null,
                            42,
                            Cr
                          )
                        ]
                      )
                    : createCommentVNode('', true),
                  createBaseVNode(
                    'div',
                    {
                      onClick: I[4] || (I[4] = (y) => o('toggle'))
                    },
                    [
                      Q.$slots['input-icon'] && !unref(h2).hideInputIcon
                        ? (openBlock(),
                          createElementBlock(
                            'span',
                            {
                              key: 0,
                              class: 'dp__input_icon',
                              onClick: I[2] || (I[2] = (y) => o('toggle'))
                            },
                            [renderSlot(Q.$slots, 'input-icon')]
                          ))
                        : createCommentVNode('', true),
                      !Q.$slots['input-icon'] && !unref(h2).hideInputIcon && !Q.$slots['dp-input']
                        ? (openBlock(),
                          createBlock(
                            unref(Et),
                            {
                              key: 1,
                              'aria-label': (_a2 = unref(Y)) == null ? void 0 : _a2.calendarIcon,
                              class: 'dp__input_icon dp__input_icons',
                              onClick: I[3] || (I[3] = (y) => o('toggle'))
                            },
                            null,
                            8,
                            ['aria-label']
                          ))
                        : createCommentVNode('', true)
                    ]
                  ),
                  Q.$slots['clear-icon'] &&
                  (unref(h2).alwaysClearable ||
                    (unref(r) && unref(h2).clearable && !unref(u).disabled && !unref(u).readonly))
                    ? (openBlock(), createElementBlock('span', xr, [renderSlot(Q.$slots, 'clear-icon', { clear: G })]))
                    : createCommentVNode('', true),
                  !Q.$slots['clear-icon'] &&
                  (unref(h2).alwaysClearable ||
                    (unref(h2).clearable && unref(r) && !unref(u).disabled && !unref(u).readonly))
                    ? (openBlock(),
                      createElementBlock(
                        'button',
                        {
                          key: 2,
                          'aria-label': (_b = unref(Y)) == null ? void 0 : _b.clearInput,
                          class: 'dp--clear-btn',
                          type: 'button',
                          'data-test-id': 'clear-input-value-btn',
                          onKeydown: I[5] || (I[5] = (y) => unref(R)(y, () => G(y), true, Ae)),
                          onClick: I[6] || (I[6] = withModifiers((y) => G(y), ['prevent']))
                        },
                        [createVNode(unref(On), { class: 'dp__input_icons' })],
                        40,
                        Or
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
var Br = {
  ref: 'action-row',
  class: 'dp__action_row'
}
var Ir = ['title']
var Er = {
  ref: 'action-buttons-container',
  class: 'dp__action_buttons',
  'data-dp-element': 'action-row'
}
var Vr = ['disabled']
var Fr = defineComponent({
  __name: 'ActionRow',
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { default: 0 }
  },
  emits: ['close-picker', 'select-date', 'select-now'],
  setup(e, { emit: A }) {
    const f = A,
      o = e,
      {
        rootEmit: c,
        rootProps: s,
        modelValue: r,
        defaults: { actionRow: u, multiCalendars: v, inline: Y, range: P, multiDates: B, formats: O }
      } = Me(),
      { isTimeValid: l, isMonthValid: w } = Ue(),
      { formatPreview: h2 } = pt(),
      { checkKeyDown: _, convertType: b } = Ie(),
      { boolHtmlAttribute: E } = Pt(),
      k = useTemplateRef('action-buttons-container'),
      g = useTemplateRef('action-row'),
      M = ref(false),
      R = ref({})
    ;(onMounted(() => {
      ;($(), globalThis.addEventListener('resize', $))
    }),
      onUnmounted(() => {
        globalThis.removeEventListener('resize', $)
      }))
    const $ = () => {
        ;((M.value = false),
          setTimeout(() => {
            var _a2, _b
            const X = (_a2 = k.value) == null ? void 0 : _a2.getBoundingClientRect(),
              x = (_b = g.value) == null ? void 0 : _b.getBoundingClientRect()
            ;(X && x && (R.value.maxWidth = `${x.width - X.width - 20}px`), (M.value = true))
          }, 0))
      },
      S = computed(() => (P.value.enabled && !P.value.partialRange && r.value ? r.value.length === 2 : true)),
      p = computed(() => !l.value(r.value) || !w.value(r.value) || !S.value),
      D = () => {
        const X = O.value.preview
        return (s.timePicker || s.monthPicker, X(b(r.value)))
      },
      V = () => {
        const X = r.value
        return v.value.count > 0 ? `${h2(X[0])} - ${h2(X[1])}` : [h2(X[0]), h2(X[1])]
      },
      F = computed(() =>
        !r.value || !o.menuMount
          ? ''
          : typeof O.value.preview == 'string'
            ? Array.isArray(r.value)
              ? r.value.length === 2 && r.value[1]
                ? V()
                : B.value.enabled
                  ? r.value.map((X) => `${h2(X)}`)
                  : s.modelAuto
                    ? `${h2(r.value[0])}`
                    : `${h2(r.value[0])} -`
              : h2(r.value)
            : D()
      ),
      L = () => (B.value.enabled ? '; ' : ' - '),
      ne = computed(() => (Array.isArray(F.value) ? F.value.join(L()) : F.value)),
      re2 = () => {
        l.value(r.value) && w.value(r.value) && S.value ? f('select-date') : c('invalid-select')
      }
    return (X, x) => (
      openBlock(),
      createElementBlock(
        'div',
        Br,
        [
          X.$slots['action-row']
            ? renderSlot(
                X.$slots,
                'action-row',
                normalizeProps(
                  mergeProps(
                    { key: 0 },
                    {
                      modelValue: unref(r),
                      disabled: p.value,
                      selectDate: () => X.$emit('select-date'),
                      closePicker: () => X.$emit('close-picker')
                    }
                  )
                )
              )
            : (openBlock(),
              createElementBlock(
                Fragment,
                { key: 1 },
                [
                  unref(u).showPreview
                    ? (openBlock(),
                      createElementBlock(
                        'div',
                        {
                          key: 0,
                          class: 'dp__selection_preview',
                          title: ne.value || void 0,
                          style: normalizeStyle(R.value)
                        },
                        [
                          X.$slots['action-preview'] && M.value
                            ? renderSlot(X.$slots, 'action-preview', {
                                key: 0,
                                value: unref(r),
                                formatValue: ne.value
                              })
                            : createCommentVNode('', true),
                          !X.$slots['action-preview'] && M.value
                            ? (openBlock(),
                              createElementBlock(
                                Fragment,
                                { key: 1 },
                                [createTextVNode(toDisplayString(ne.value), 1)],
                                64
                              ))
                            : createCommentVNode('', true)
                        ],
                        12,
                        Ir
                      ))
                    : createCommentVNode('', true),
                  createBaseVNode(
                    'div',
                    Er,
                    [
                      X.$slots['action-buttons']
                        ? renderSlot(X.$slots, 'action-buttons', {
                            key: 0,
                            value: unref(r),
                            selectDate: re2,
                            selectionDisabled: p.value
                          })
                        : createCommentVNode('', true),
                      X.$slots['action-buttons']
                        ? createCommentVNode('', true)
                        : (openBlock(),
                          createElementBlock(
                            Fragment,
                            { key: 1 },
                            [
                              !unref(Y).enabled && unref(u).showCancel
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 0,
                                      ref: 'cancel-btn',
                                      type: 'button',
                                      'data-dp-action-element': '0',
                                      class: 'dp__action_button dp__action_cancel',
                                      onClick: x[0] || (x[0] = (te) => X.$emit('close-picker')),
                                      onKeydown: x[1] || (x[1] = (te) => unref(_)(te, () => X.$emit('close-picker')))
                                    },
                                    toDisplayString(unref(u).cancelBtnLabel),
                                    545
                                  ))
                                : createCommentVNode('', true),
                              unref(u).showNow
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 1,
                                      type: 'button',
                                      'data-dp-action-element': '0',
                                      class: 'dp__action_button dp__action_cancel',
                                      onClick: x[2] || (x[2] = (te) => X.$emit('select-now')),
                                      onKeydown: x[3] || (x[3] = (te) => unref(_)(te, () => X.$emit('select-now')))
                                    },
                                    toDisplayString(unref(u).nowBtnLabel),
                                    33
                                  ))
                                : createCommentVNode('', true),
                              unref(u).showSelect
                                ? (openBlock(),
                                  createElementBlock(
                                    'button',
                                    {
                                      key: 2,
                                      ref: 'select-btn',
                                      type: 'button',
                                      'data-dp-action-element': '0',
                                      class: 'dp__action_button dp__action_select',
                                      disabled: unref(E)(p.value),
                                      'data-test-id': 'select-button',
                                      onKeydown: x[4] || (x[4] = (te) => unref(_)(te, () => re2())),
                                      onClick: re2
                                    },
                                    toDisplayString(unref(u).selectBtnLabel),
                                    41,
                                    Vr
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
var ta = () => {
  const {
      rootProps: e,
      defaults: { multiCalendars: A }
    } = Me(),
    f = computed(() => (s) => {
      var _a2
      return (_a2 = e.hideNavigation) == null ? void 0 : _a2.includes(s)
    }),
    o = computed(() => (s) => (A.value.count ? (A.value.solo ? true : s === 0) : true)),
    c = computed(() => (s) => (A.value.count ? (A.value.solo ? true : s === A.value.count - 1) : true))
  return { hideNavigationButtons: f, showLeftIcon: o, showRightIcon: c }
}
var Nr = ['role', 'aria-label', 'tabindex']
var Wr = { class: 'dp__selection_grid_header' }
var Lr = [
  'aria-selected',
  'aria-disabled',
  'data-dp-action-element',
  'data-dp-element-active',
  'data-test-id',
  'onClick',
  'onKeydown',
  'onMouseover'
]
var Hr = ['aria-label', 'data-dp-action-element']
var Nt = defineComponent({
  __name: 'SelectionOverlay',
  props: {
    items: {},
    type: {},
    useRelative: { type: Boolean },
    height: {},
    overlayLabel: {},
    isLast: { type: Boolean },
    level: {}
  },
  emits: ['selected', 'toggle', 'reset-flow', 'hover-value'],
  setup(e, { emit: A }) {
    const f = A,
      o = e,
      {
        setState: c,
        defaults: { ariaLabels: s, config: r }
      } = Me(),
      { hideNavigationButtons: u } = ta(),
      { handleEventPropagation: v, checkKeyDown: Y } = Ie(),
      P = useTemplateRef('toggle-button'),
      B = useTemplateRef('overlay-container'),
      O = useTemplateRef('grid-wrap'),
      l = ref(false),
      w = ref(null),
      h2 = ref(),
      _ = ref(0)
    ;(onBeforeUpdate(() => {
      w.value = null
    }),
      onMounted(async () => {
        ;(await nextTick(), R(), c('arrowNavigationLevel', o.level ?? 1))
      }),
      onUnmounted(() => {
        c('arrowNavigationLevel', (o.level ?? 1) - 1)
      }))
    const b = computed(() => ({
        dp__overlay: true,
        'dp--overlay-absolute': !o.useRelative,
        'dp--overlay-relative': o.useRelative
      })),
      E = computed(() => (o.useRelative ? { height: `${o.height}px`, width: 'var(--dp-menu-min-width)' } : void 0)),
      k = computed(() => ({
        dp__overlay_col: true
      })),
      g = computed(() => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: l.value,
        dp__button_bottom: o.isLast
      })),
      M = computed(() => {
        var _a2, _b
        return {
          dp__overlay_container: true,
          dp__container_flex: ((_a2 = o.items) == null ? void 0 : _a2.length) <= 6,
          dp__container_block: ((_b = o.items) == null ? void 0 : _b.length) > 6
        }
      })
    watch(
      () => o.items,
      () => R(false),
      { deep: true }
    )
    const R = (L = true) => {
        nextTick().then(() => {
          const ne = document.querySelector(`[data-dp-element-active="${o.level ?? 1}"]`),
            re2 = unrefElement(O),
            X = unrefElement(P),
            x = unrefElement(B),
            te = X ? X.getBoundingClientRect().height : 0
          ;(re2 &&
            (re2.getBoundingClientRect().height
              ? (_.value = re2.getBoundingClientRect().height - te)
              : (_.value = r.value.modeHeight - te)),
            ne &&
              x &&
              L &&
              (x.scrollTop = ne.offsetTop - x.offsetTop - (_.value / 2 - ne.getBoundingClientRect().height) - te))
        })
      },
      $ = (L) => {
        L.disabled || f('selected', L.value)
      },
      S = () => {
        ;(f('toggle'), f('reset-flow'))
      },
      p = (L) => {
        r.value.escClose && (S(), v(L, r.value))
      },
      D = (L) => {
        ;((h2.value = L), f('hover-value', L))
      },
      V = (L) => {
        if (L.key === $e.esc) return p(L)
      },
      F = (L) => {
        if (L.key === $e.enter) return S()
      }
    return (L, ne) => {
      var _a2
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref: 'grid-wrap',
            class: normalizeClass(b.value),
            style: normalizeStyle(E.value),
            role: e.useRelative ? void 0 : 'dialog',
            'aria-label': e.overlayLabel,
            tabindex: e.useRelative ? void 0 : '0',
            onKeydown: V,
            onClick: ne[0] || (ne[0] = withModifiers(() => {}, ['prevent']))
          },
          [
            createBaseVNode(
              'div',
              {
                ref: 'overlay-container',
                class: normalizeClass(M.value),
                style: normalizeStyle({ '--dp-overlay-height': `${_.value}px` }),
                role: 'grid'
              },
              [
                createBaseVNode('div', Wr, [renderSlot(L.$slots, 'header')]),
                renderSlot(L.$slots, 'overlay', {}, () => [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(
                      e.items,
                      (re2, X) => (
                        openBlock(),
                        createElementBlock(
                          'div',
                          {
                            key: X,
                            class: normalizeClass(['dp__overlay_row', { dp__flex_row: e.items.length >= 3 }]),
                            role: 'row'
                          },
                          [
                            (openBlock(true),
                            createElementBlock(
                              Fragment,
                              null,
                              renderList(
                                re2,
                                (x) => (
                                  openBlock(),
                                  createElementBlock(
                                    'div',
                                    {
                                      key: x.value,
                                      role: 'gridcell',
                                      class: normalizeClass(k.value),
                                      'aria-selected': x.active || void 0,
                                      'aria-disabled': x.disabled || void 0,
                                      'data-dp-action-element': e.level ?? 1,
                                      'data-dp-element-active': x.active ? (e.level ?? 1) : void 0,
                                      tabindex: '0',
                                      'data-test-id': x.text,
                                      onClick: withModifiers((te) => $(x), ['prevent']),
                                      onKeydown: (te) => unref(Y)(te, () => $(x), true),
                                      onMouseover: (te) => D(x.value)
                                    },
                                    [
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass(x.className)
                                        },
                                        [
                                          renderSlot(L.$slots, 'item', { item: x }, () => [
                                            createTextVNode(toDisplayString(x.text), 1)
                                          ])
                                        ],
                                        2
                                      )
                                    ],
                                    42,
                                    Lr
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
                ])
              ],
              6
            ),
            L.$slots['button-icon']
              ? withDirectives(
                  (openBlock(),
                  createElementBlock(
                    'button',
                    {
                      key: 0,
                      ref: 'toggle-button',
                      type: 'button',
                      'aria-label': (_a2 = unref(s)) == null ? void 0 : _a2.toggleOverlay,
                      class: normalizeClass(g.value),
                      tabindex: '0',
                      'data-dp-action-element': e.level ?? 1,
                      onClick: S,
                      onKeydown: F
                    },
                    [renderSlot(L.$slots, 'button-icon')],
                    42,
                    Hr
                  )),
                  [[vShow, !unref(u)(e.type)]]
                )
              : createCommentVNode('', true)
          ],
          46,
          Nr
        )
      )
    }
  }
})
var jr = ['data-dp-mobile']
var aa = defineComponent({
  __name: 'InstanceWrap',
  props: {
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const {
        defaults: { multiCalendars: A }
      } = Me(),
      { isMobile: f } = Zt(),
      o = computed(() => (A.value.count > 0 ? [...new Array(A.value.count).keys()] : [0]))
    return (c, s) => (
      openBlock(),
      createElementBlock(
        'div',
        {
          class: normalizeClass({
            dp__menu_inner: !e.stretch,
            'dp--menu--inner-stretched': e.stretch,
            dp__flex_display: unref(A).count > 0,
            'dp--flex-display-collapsed': e.collapse
          }),
          'data-dp-mobile': unref(f)
        },
        [
          renderSlot(c.$slots, 'default', {
            instances: o.value,
            wrapClass: { dp__instance_calendar: unref(A).count > 0 }
          })
        ],
        10,
        jr
      )
    )
  }
})
var Kr = ['data-dp-element', 'aria-label', 'aria-disabled']
var Bt = defineComponent({
  __name: 'ArrowBtn',
  props: {
    ariaLabel: {},
    elName: {},
    disabled: { type: Boolean }
  },
  emits: ['activate', 'set-ref'],
  setup(e, { emit: A }) {
    const { checkKeyDown: f } = Ie(),
      o = A
    return (c, s) => (
      openBlock(),
      createElementBlock(
        'button',
        {
          ref: 'arrow-btn',
          type: 'button',
          'data-dp-element': e.elName,
          'data-dp-action-element': '0',
          class: 'dp__btn dp--arrow-btn-nav',
          tabindex: '0',
          'aria-label': e.ariaLabel,
          'aria-disabled': e.disabled || void 0,
          onClick: s[0] || (s[0] = (r) => o('activate')),
          onKeydown: s[1] || (s[1] = (r) => unref(f)(r, () => o('activate'), true))
        },
        [
          createBaseVNode(
            'span',
            {
              class: normalizeClass(['dp__inner_nav', { dp__inner_nav_disabled: e.disabled }])
            },
            [renderSlot(c.$slots, 'default')],
            2
          )
        ],
        40,
        Kr
      )
    )
  }
})
var zr = ['aria-label', 'data-test-id']
var Na = defineComponent({
  __name: 'YearModePicker',
  props: {
    items: {},
    instance: {},
    year: {},
    showYearPicker: { type: Boolean, default: false },
    isDisabled: {}
  },
  emits: ['handle-year', 'year-select', 'toggle-year-picker'],
  setup(e, { emit: A }) {
    const f = A,
      o = e,
      { showRightIcon: c, showLeftIcon: s } = ta(),
      {
        rootProps: r,
        defaults: { config: u, ariaLabels: v, ui: Y }
      } = Me(),
      { showTransition: P, transitionName: B } = Vt(),
      { formatYear: O } = pt(),
      { boolHtmlAttribute: l } = Pt(),
      w = ref(false),
      h2 = computed(() => O(o.year)),
      _ = (k = false, g) => {
        ;((w.value = !w.value), f('toggle-year-picker', { flow: k, show: g }))
      },
      b = (k) => {
        ;((w.value = false), f('year-select', k))
      },
      E = (k = false) => {
        f('handle-year', k)
      }
    return (k, g) => {
      var _a2, _b, _c, _d, _e
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(['dp--year-mode-picker', { 'dp--hidden-el': w.value }])
              },
              [
                unref(s)(e.instance)
                  ? (openBlock(),
                    createBlock(
                      Bt,
                      {
                        key: 0,
                        ref: 'mpPrevIconRef',
                        'aria-label': (_a2 = unref(v)) == null ? void 0 : _a2.prevYear,
                        disabled: unref(l)(e.isDisabled(false)),
                        class: normalizeClass((_b = unref(Y)) == null ? void 0 : _b.navBtnPrev),
                        onActivate: g[0] || (g[0] = (M) => E(false))
                      },
                      {
                        default: withCtx(() => [
                          k.$slots['arrow-left']
                            ? renderSlot(k.$slots, 'arrow-left', { key: 0 })
                            : createCommentVNode('', true),
                          k.$slots['arrow-left']
                            ? createCommentVNode('', true)
                            : (openBlock(), createBlock(unref(Ca), { key: 1 }))
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
                    'aria-label': `${e.year}-${(_c = unref(v)) == null ? void 0 : _c.openYearsOverlay}`,
                    'data-test-id': `year-mode-btn-${e.instance}`,
                    'data-dp-action-element': '0',
                    onClick: g[1] || (g[1] = () => _(false)),
                    onKeydown:
                      g[2] ||
                      (g[2] = withKeys(
                        withModifiers(() => _(false), ['prevent']),
                        ['enter']
                      ))
                  },
                  [
                    k.$slots.year
                      ? renderSlot(k.$slots, 'year', {
                          key: 0,
                          text: h2.value,
                          value: e.year
                        })
                      : createCommentVNode('', true),
                    k.$slots.year
                      ? createCommentVNode('', true)
                      : (openBlock(),
                        createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(e.year), 1)], 64))
                  ],
                  40,
                  zr
                ),
                unref(c)(e.instance)
                  ? (openBlock(),
                    createBlock(
                      Bt,
                      {
                        key: 1,
                        ref: 'mpNextIconRef',
                        'aria-label': (_d = unref(v)) == null ? void 0 : _d.nextYear,
                        disabled: unref(l)(e.isDisabled(true)),
                        class: normalizeClass((_e = unref(Y)) == null ? void 0 : _e.navBtnNext),
                        onActivate: g[3] || (g[3] = (M) => E(true))
                      },
                      {
                        default: withCtx(() => [
                          k.$slots['arrow-right']
                            ? renderSlot(k.$slots, 'arrow-right', { key: 0 })
                            : createCommentVNode('', true),
                          k.$slots['arrow-right']
                            ? createCommentVNode('', true)
                            : (openBlock(), createBlock(unref(xa), { key: 1 }))
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
                name: unref(B)(e.showYearPicker),
                css: unref(P)
              },
              {
                default: withCtx(() => {
                  var _a3, _b2
                  return [
                    e.showYearPicker
                      ? (openBlock(),
                        createBlock(
                          Nt,
                          {
                            key: 0,
                            items: e.items,
                            config: unref(u),
                            'is-last': unref(r).autoApply && !unref(u).keepActionRow,
                            'overlay-label':
                              (_b2 = (_a3 = unref(v)) == null ? void 0 : _a3.yearPicker) == null
                                ? void 0
                                : _b2.call(_a3, true),
                            type: 'year',
                            onToggle: _,
                            onSelected: g[4] || (g[4] = (M) => b(M))
                          },
                          createSlots(
                            {
                              'button-icon': withCtx(() => [
                                k.$slots['calendar-icon']
                                  ? renderSlot(k.$slots, 'calendar-icon', { key: 0 })
                                  : createCommentVNode('', true),
                                k.$slots['calendar-icon']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Et), { key: 1 }))
                              ]),
                              _: 2
                            },
                            [
                              k.$slots['year-overlay-value']
                                ? {
                                    name: 'item',
                                    fn: withCtx(({ item: M }) => [
                                      renderSlot(k.$slots, 'year-overlay-value', {
                                        text: M.text,
                                        value: M.value
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
var Wa = (e) => {
  const {
      getDate: A,
      rootEmit: f,
      state: o,
      month: c,
      year: s,
      modelValue: r,
      calendars: u,
      rootProps: v,
      defaults: { multiCalendars: Y, range: P, safeDates: B, filters: O, highlight: l }
    } = Me(),
    { resetDate: w, getYearFromDate: h2, checkHighlightYear: _, groupListAndMap: b } = We(),
    { getYears: E } = ea(),
    { validateMonthYear: k, checkMinMaxValue: g } = Ue(),
    M = ref([false]),
    R = computed(() => E()),
    $ = computed(() => (K, Z) => {
      const de = set(w(A()), {
          month: c.value(K),
          year: s.value(K)
        }),
        G = Z ? endOfYear(de) : startOfYear(de)
      return k(G, v.preventMinMaxNavigation, Z)
    }),
    S = () => Array.isArray(r.value) && Y.value.solo && r.value[1],
    p = () => {
      for (let K = 0; K < Y.value.count; K++)
        if (K === 0) u.value[K] = u.value[0]
        else if (K === Y.value.count - 1 && S())
          u.value[K] = {
            month: getMonth(r.value[1]),
            year: getYear(r.value[1])
          }
        else {
          const Z = set(A(), u.value[K - 1])
          u.value[K] = { month: getMonth(Z), year: getYear(addYears(Z, 1)) }
        }
    },
    D = (K) => {
      if (!K) return p()
      const Z = set(A(), u.value[K])
      return ((u.value[0].year = getYear(subYears(Z, Y.value.count - 1))), p())
    },
    V = (K, Z) => {
      const de = differenceInYears(Z, K)
      return P.value.showLastInRange && de > 1 ? Z : K
    },
    F = (K) => (v.focusStartDate || Y.value.solo ? K[0] : K[1] ? V(K[0], K[1]) : K[0]),
    L = () => {
      if (r.value) {
        const K = Array.isArray(r.value) ? F(r.value) : r.value
        u.value[0] = { month: getMonth(K), year: getYear(K) }
      }
    },
    ne = () => {
      ;(L(), Y.value.count && p())
    }
  ;(watch(r, (K, Z) => {
    o.isTextInputDate && JSON.stringify(K ?? {}) !== JSON.stringify(Z ?? {}) && ne()
  }),
    onMounted(() => {
      ne()
    }))
  const re2 = (K, Z) => {
      ;((u.value[Z].year = K),
        f('update-month-year', { instance: Z, year: K, month: u.value[Z].month }),
        Y.value.count && !Y.value.solo && D(Z))
    },
    X = computed(
      () => (K) =>
        b(R.value, (Z) => {
          var _a2
          const de = s.value(K) === Z.value,
            G =
              g(Z.value, h2(B.value.minDate), h2(B.value.maxDate)) ||
              ((_a2 = O.value.years) == null ? void 0 : _a2.includes(s.value(K))),
            ce = _(l.value, Z.value)
          return { active: de, disabled: G, highlighted: ce }
        })
    ),
    x = (K, Z) => {
      ;(re2(K, Z), q(Z))
    },
    te = (K, Z = false) => {
      if (!$.value(K, Z)) {
        const de = Z ? s.value(K) + 1 : s.value(K) - 1
        re2(de, K)
      }
    },
    q = (K, Z = false, de) => {
      ;(Z || e('reset-flow'),
        de === void 0 ? (M.value[K] = !M.value[K]) : (M.value[K] = de),
        M.value[K]
          ? f('overlay-toggle', { open: true, overlay: He.year })
          : f('overlay-toggle', { open: false, overlay: He.year }))
    }
  return {
    isDisabled: $,
    groupedYears: X,
    showYearPicker: M,
    selectYear: re2,
    setStartDate: () => {
      v.startDate && ((r.value && v.focusStartDate) || !r.value) && re2(getYear(A(v.startDate)), 0)
    },
    toggleYearPicker: q,
    handleYearSelect: x,
    handleYear: te
  }
}
var na = () => {
  const { isDateAfter: e, isDateBefore: A, isDateEqual: f } = We(),
    {
      getDate: o,
      rootEmit: c,
      rootProps: s,
      modelValue: r,
      defaults: { range: u }
    } = Me()
  return {
    getRangeWithFixedDate: (l) =>
      Array.isArray(r.value) && (r.value.length === 2 || (r.value.length === 1 && u.value.partialRange))
        ? u.value.fixedStart && (e(l, r.value[0]) || f(l, r.value[0]))
          ? [r.value[0], l]
          : u.value.fixedEnd && (A(l, r.value[1]) || f(l, r.value[1]))
            ? [l, r.value[1]]
            : (c('invalid-fixed-range', l), r.value)
        : [],
    setPresetDate: (l) => {
      Array.isArray(l.value) && l.value.length <= 2 && u.value.enabled
        ? (r.value = l.value.map((w) => o(w)))
        : Array.isArray(l.value) || (r.value = o(l.value))
    },
    checkRangeAutoApply: (l, w, h2) => {
      u &&
        (l[0] && l[1] && s.autoApply && w('auto-apply', h2),
        l[0] && !l[1] && (s.modelAuto || u.value.partialRange) && s.autoApply && w('auto-apply', h2))
    },
    setMonthOrYearRange: (l) => {
      let w = r.value ? r.value.slice() : []
      return (
        w.length === 2 && w[1] !== null && (w = []),
        w.length ? (A(l, w[0]) ? w.unshift(l) : (w[1] = l), c('range-end', l)) : ((w = [l]), c('range-start', l)),
        w
      )
    },
    handleMultiDatesSelect: (l, w) => {
      if (r.value && Array.isArray(r.value))
        if (r.value.some((h2) => f(l, h2))) {
          const h2 = r.value.filter((_) => !f(_, l))
          r.value = h2.length ? h2 : null
        } else ((w && +w > r.value.length) || !w) && r.value.push(l)
      else r.value = [l]
    }
  }
}
var qr = (e, A) => {
  const {
    getDate: f,
    rootEmit: o,
    state: c,
    calendars: s,
    year: r,
    modelValue: u,
    rootProps: v,
    defaults: { range: Y, highlight: P, safeDates: B, filters: O, multiDates: l }
  } = Me()
  Ft(() => {
    c.isTextInputDate && x(getYear(f(v.startDate)), 0)
  })
  const { checkMinMaxRange: w, checkMinMaxValue: h2 } = Ue(),
    {
      isDateBetween: _,
      resetDateTime: b,
      resetDate: E,
      getMinMonth: k,
      getMaxMonth: g,
      checkHighlightMonth: M,
      groupListAndMap: R
    } = We(),
    {
      checkRangeAutoApply: $,
      getRangeWithFixedDate: S,
      handleMultiDatesSelect: p,
      setMonthOrYearRange: D,
      setPresetDate: V
    } = na(),
    { padZero: F } = Ie(),
    { getMonths: L, isOutOfYearRange: ne } = ea(),
    re2 = computed(() => L()),
    X = ref(null),
    {
      selectYear: x,
      groupedYears: te,
      showYearPicker: q,
      toggleYearPicker: oe,
      handleYearSelect: K,
      handleYear: Z,
      isDisabled: de,
      setStartDate: G
    } = Wa(A)
  onMounted(() => {
    G()
  })
  const ce = (m) => (m ? { month: getMonth(m), year: getYear(m) } : { month: null, year: null }),
    le = () => (u.value ? (Array.isArray(u.value) ? u.value.map((m) => ce(m)) : ce(u.value)) : ce()),
    we = (m, N) => {
      const U = s.value[m],
        pe = le()
      return Array.isArray(pe)
        ? pe.some((ge) => ge.year === (U == null ? void 0 : U.year) && ge.month === N)
        : (U == null ? void 0 : U.year) === pe.year && N === pe.month
    },
    ve = (m, N, U) => {
      var _a2, _b
      const pe = le()
      return Array.isArray(pe)
        ? r.value(N) === ((_a2 = pe[U]) == null ? void 0 : _a2.year) && m === ((_b = pe[U]) == null ? void 0 : _b.month)
        : false
    },
    Ae = (m, N) => {
      if (Y.value.enabled) {
        const U = le()
        if (Array.isArray(u.value) && Array.isArray(U)) {
          const pe = ve(m, N, 0) || ve(m, N, 1),
            ge = set(E(f()), { month: m, year: r.value(N) })
          return _(u.value, X.value, ge) && !pe
        }
        return false
      }
      return false
    },
    Q = computed(
      () => (m) =>
        R(re2.value, (N) => {
          var _a2
          const U = we(m, N.value),
            pe =
              h2(N.value, k(r.value(m), B.value.minDate), g(r.value(m), B.value.maxDate)) ||
              n(B.value.disabledDates, r.value(m), N.value) ||
              ((_a2 = O.value.months) == null ? void 0 : _a2.includes(N.value)) ||
              !C(B.value.allowedDates, r.value(m), N.value) ||
              ne(r.value(m)),
            ge = Ae(N.value, m),
            Qe = M(P.value, N.value, r.value(m))
          return { active: U, disabled: pe, isBetween: ge, highlighted: Qe }
        })
    ),
    I = (m, N) => set(E(f()), { month: m, year: r.value(N) }),
    y = (m, N) => {
      const U = u.value ? u.value : E(f())
      ;((u.value = set(U, { month: m, year: r.value(N) })), A('auto-apply'), A('update-flow-step'))
    },
    H = (m, N) => {
      const U = I(m, N)
      ;(Y.value.fixedEnd || Y.value.fixedStart
        ? (u.value = S(U))
        : u.value
          ? w(U, u.value) && (u.value = D(I(m, N)))
          : (u.value = [I(m, N)]),
        nextTick().then(() => {
          $(u.value, A, u.value.length < 2)
        }))
    },
    fe = (m, N) => {
      ;(p(I(m, N), l.value.limit), A('auto-apply', true))
    },
    Pe = (m, N) => (
      (s.value[N].month = m),
      i(N, s.value[N].year, m),
      l.value.enabled ? fe(m, N) : Y.value.enabled ? H(m, N) : y(m, N)
    ),
    Ce = (m, N) => {
      ;(x(m, N), i(N, m, null))
    },
    i = (m, N, U) => {
      let pe = U
      if (!pe && pe !== 0) {
        const ge = le()
        pe = Array.isArray(ge) ? ge[m].month : ge.month
      }
      o('update-month-year', { instance: m, year: N, month: pe })
    },
    d = (m, N) => {
      X.value = I(m, N)
    },
    a = (m) => {
      ;(V({
        value: m
      }),
        A('auto-apply'))
    },
    n = (m, N, U) => {
      if (m instanceof Map) {
        const pe = `${F(U + 1)}-${N}`
        return m.size ? m.has(pe) : false
      }
      return typeof m == 'function' ? m(b(set(f(), { month: U, year: N }), true)) : false
    },
    C = (m, N, U) => {
      if (m instanceof Map) {
        const pe = `${F(U + 1)}-${N}`
        return m.size ? m.has(pe) : true
      }
      return true
    }
  return {
    groupedMonths: Q,
    groupedYears: te,
    year: r,
    isDisabled: de,
    showYearPicker: q,
    modelValue: u,
    toggleYearPicker: oe,
    handleYearSelect: K,
    handleYear: Z,
    presetDate: a,
    setHoverDate: d,
    selectMonth: Pe,
    selectYear: Ce,
    getModelMonthYear: le
  }
}
var Ur = defineComponent({
  __name: 'MonthPicker',
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ['reset-flow', 'auto-apply', 'update-flow-step', 'mount'],
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      s = useSlots(),
      {
        rootProps: r,
        defaults: { config: u }
      } = Me(),
      v = lt(s, at.YearMode)
    onMounted(() => {
      o('mount')
    })
    const {
      groupedMonths: Y,
      groupedYears: P,
      year: B,
      isDisabled: O,
      showYearPicker: l,
      modelValue: w,
      presetDate: h2,
      setHoverDate: _,
      selectMonth: b,
      selectYear: E,
      toggleYearPicker: k,
      handleYearSelect: g,
      handleYear: M,
      getModelMonthYear: R
    } = qr(c, o)
    return (
      A({
        getSidebarProps: () => ({
          modelValue: w,
          year: B,
          getModelMonthYear: R,
          selectMonth: b,
          selectYear: E,
          handleYear: M
        }),
        presetDate: h2,
        toggleYearPicker: (S) => k(0, S)
      }),
      (S, p) => (
        openBlock(),
        createBlock(
          aa,
          {
            collapse: e.collapse,
            stretch: ''
          },
          {
            default: withCtx(({ instances: D, wrapClass: V }) => [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(
                  D,
                  (F) => (
                    openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: F,
                        class: normalizeClass(V)
                      },
                      [
                        S.$slots['top-extra']
                          ? renderSlot(S.$slots, 'top-extra', {
                              key: 0,
                              value: unref(w)
                            })
                          : createCommentVNode('', true),
                        renderSlot(
                          S.$slots,
                          'month-year',
                          mergeProps(
                            { ref_for: true },
                            {
                              year: unref(B),
                              months: unref(Y)(F),
                              years: unref(P)(F),
                              selectMonth: unref(b),
                              selectYear: unref(E),
                              instance: F
                            }
                          ),
                          () => [
                            createVNode(
                              Nt,
                              {
                                items: unref(Y)(F),
                                'is-last': unref(r).autoApply && !unref(u).keepActionRow,
                                height: unref(u).modeHeight,
                                'no-overlay-focus': !!(e.noOverlayFocus || unref(r).textInput),
                                'use-relative': '',
                                level: 0,
                                type: 'month',
                                onSelected: (L) => unref(b)(L, F),
                                onHoverValue: (L) => unref(_)(L, F)
                              },
                              createSlots(
                                {
                                  header: withCtx(() => [
                                    createVNode(
                                      Na,
                                      {
                                        items: unref(P)(F),
                                        instance: F,
                                        'show-year-picker': unref(l)[F],
                                        year: unref(B)(F),
                                        'is-disabled': (L) => unref(O)(F, L),
                                        onHandleYear: (L) => unref(M)(F, L),
                                        onYearSelect: (L) => unref(g)(L, F),
                                        onToggleYearPicker: (L) =>
                                          unref(k)(F, L == null ? void 0 : L.flow, L == null ? void 0 : L.show)
                                      },
                                      createSlots({ _: 2 }, [
                                        renderList(unref(v), (L, ne) => ({
                                          name: L,
                                          fn: withCtx((re2) => [
                                            renderSlot(S.$slots, L, mergeProps({ ref_for: true }, re2))
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
                                  S.$slots['month-overlay-value']
                                    ? {
                                        name: 'item',
                                        fn: withCtx(({ item: L }) => [
                                          renderSlot(S.$slots, 'month-overlay-value', {
                                            text: L.text,
                                            value: L.value
                                          })
                                        ]),
                                        key: '0'
                                      }
                                    : void 0
                                ]
                              ),
                              1032,
                              ['items', 'is-last', 'height', 'no-overlay-focus', 'onSelected', 'onHoverValue']
                            )
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
        )
      )
    )
  }
})
var Qr = (e, A) => {
  const {
      rootEmit: f,
      getDate: o,
      state: c,
      modelValue: s,
      rootProps: r,
      defaults: { highlight: u, multiDates: v, filters: Y, range: P, safeDates: B }
    } = Me(),
    { getYears: O } = ea(),
    {
      isDateBetween: l,
      resetDate: w,
      resetDateTime: h2,
      getYearFromDate: _,
      checkHighlightYear: b,
      groupListAndMap: E
    } = We(),
    { checkRangeAutoApply: k, setMonthOrYearRange: g } = na(),
    { checkMinMaxValue: M, checkMinMaxRange: R } = Ue()
  Ft(() => {
    c.isTextInputDate && (S.value = getYear(o(r.startDate)))
  })
  const $ = ref(null),
    S = ref()
  onMounted(() => {
    r.startDate && ((s.value && r.focusStartDate) || !s.value) && (S.value = getYear(o(r.startDate)))
  })
  const p = (x) =>
      Array.isArray(s.value) ? s.value.some((te) => getYear(te) === x) : s.value ? getYear(s.value) === x : false,
    D = (x) => (P.value.enabled && Array.isArray(s.value) ? l(s.value, $.value, ne(x)) : false),
    V = (x) => {
      var _a2
      return ((_a2 = B.value.allowedDates) == null ? void 0 : _a2.size) ? B.value.allowedDates.has(`${x}`) : true
    },
    F = (x) =>
      B.value.disabledDates instanceof Map
        ? B.value.disabledDates.size
          ? B.value.disabledDates.has(`${x}`)
          : false
        : typeof B.value.disabledDates == 'function'
          ? B.value.disabledDates(setYear(h2(startOfYear(o())), x))
          : true,
    L = computed(() =>
      E(O(), (x) => {
        const te = p(x.value),
          q =
            M(x.value, _(B.value.minDate), _(B.value.maxDate)) ||
            Y.value.years.includes(x.value) ||
            !V(x.value) ||
            F(x.value),
          oe = D(x.value) && !te,
          K = b(u.value, x.value)
        return { active: te, disabled: q, isBetween: oe, highlighted: K }
      })
    ),
    ne = (x) => setYear(w(startOfYear(o())), x)
  return {
    groupedYears: L,
    focusYear: S,
    setHoverValue: (x) => {
      $.value = setYear(w(o()), x)
    },
    selectYear: (x) => {
      var _a2
      if ((f('update-month-year', { instance: 0, year: x, month: Number.NaN }), v.value.enabled))
        return (
          s.value
            ? Array.isArray(s.value) &&
              (((_a2 = s.value) == null ? void 0 : _a2.map((q) => getYear(q))).includes(x)
                ? (s.value = s.value.filter((q) => getYear(q) !== x))
                : s.value.push(setYear(h2(o()), x)))
            : (s.value = [setYear(h2(startOfYear(o())), x)]),
          A('auto-apply', true)
        )
      P.value.enabled
        ? R(ne(x), s.value) &&
          ((s.value = g(ne(x))),
          nextTick().then(() => {
            k(s.value, A, s.value.length < 2)
          }))
        : ((s.value = ne(x)), A('auto-apply'))
    }
  }
}
var Jr = defineComponent({
  __name: 'YearPicker',
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ['reset-flow', 'auto-apply'],
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      {
        modelValue: s,
        defaults: { config: r },
        rootProps: u
      } = Me(),
      { groupedYears: v, focusYear: Y, selectYear: P, setHoverValue: B } = Qr(c, o)
    return (
      A({
        getSidebarProps: () => ({
          modelValue: s,
          selectYear: P
        })
      }),
      (l, w) => (
        openBlock(),
        createElementBlock('div', null, [
          l.$slots['top-extra']
            ? renderSlot(l.$slots, 'top-extra', {
                key: 0,
                value: unref(s)
              })
            : createCommentVNode('', true),
          l.$slots['month-year']
            ? renderSlot(
                l.$slots,
                'month-year',
                normalizeProps(
                  mergeProps(
                    { key: 1 },
                    {
                      years: unref(v),
                      selectYear: unref(P)
                    }
                  )
                )
              )
            : (openBlock(),
              createBlock(
                Nt,
                {
                  key: 2,
                  items: unref(v),
                  'is-last': unref(u).autoApply && !unref(r).keepActionRow,
                  height: unref(r).modeHeight,
                  'no-overlay-focus': !!(e.noOverlayFocus || unref(u).textInput),
                  'focus-value': unref(Y),
                  type: 'year',
                  'use-relative': '',
                  onSelected: unref(P),
                  onHoverValue: unref(B)
                },
                createSlots({ _: 2 }, [
                  l.$slots['year-overlay-value']
                    ? {
                        name: 'item',
                        fn: withCtx(({ item: h2 }) => [
                          renderSlot(l.$slots, 'year-overlay-value', {
                            text: h2.text,
                            value: h2.value
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
var Gr = {
  key: 0,
  class: 'dp__time_input'
}
var Xr = ['data-compact', 'data-collapsed']
var Zr = ['data-test-id', 'aria-label', 'data-dp-action-element', 'onKeydown', 'onClick', 'onMousedown']
var el = ['aria-label', 'disabled', 'data-dp-action-element', 'data-test-id', 'onKeydown', 'onClick']
var tl = ['data-test-id', 'aria-label', 'data-dp-action-element', 'onKeydown', 'onClick', 'onMousedown']
var al = { key: 0 }
var nl = ['aria-label', 'data-dp-action-element', 'data-compact']
var rl = defineComponent({
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
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      {
        getDate: s,
        rootEmit: r,
        rootProps: u,
        defaults: { ariaLabels: v, filters: Y, config: P, range: B, multiCalendars: O, timeConfig: l }
      } = Me(),
      { checkKeyDown: w, hoursToAmPmHours: h2 } = Ie(),
      { boolHtmlAttribute: _ } = Pt(),
      { sanitizeTime: b, groupListAndMap: E } = We(),
      { transitionName: k, showTransition: g } = Vt(),
      M = reactive({
        hours: false,
        minutes: false,
        seconds: false
      }),
      R = ref('AM'),
      $ = ref(null),
      S = ref(),
      p = ref(false)
    onMounted(() => {
      o('mounted')
    })
    const D = (n) =>
        set(s(), {
          hours: n.hours,
          minutes: n.minutes,
          seconds: l.value.enableSeconds ? n.seconds : 0,
          milliseconds: 0
        }),
      V = computed(() => (u.timePicker || l.value.timePickerInline ? 0 : 1)),
      F = computed(() => (n) => ce(n, c[n]) || ne(n, c[n])),
      L = computed(() => ({ hours: c.hours, minutes: c.minutes, seconds: c.seconds })),
      ne = (n, C) => (B.value.enabled && !B.value.disableTimeRangeValidation ? !c.validateTime(n, C) : false),
      re2 = (n, C) => {
        if (B.value.enabled && !B.value.disableTimeRangeValidation) {
          const m = C ? +l.value[`${n}Increment`] : -+l.value[`${n}Increment`],
            N = c[n] + m
          return !c.validateTime(n, N)
        }
        return false
      },
      X = computed(() => (n) => !Q(+c[n] + +l.value[`${n}Increment`], n) || re2(n, true)),
      x = computed(() => (n) => !Q(+c[n] - +l.value[`${n}Increment`], n) || re2(n, false)),
      te = (n, C) => add(set(s(), n), C),
      q = (n, C) => sub(set(s(), n), C),
      oe = computed(() => ({
        dp__time_col: true,
        dp__time_col_block: !l.value.timePickerInline,
        dp__time_col_reg_block: !l.value.enableSeconds && l.value.is24 && !l.value.timePickerInline,
        dp__time_col_reg_inline: !l.value.enableSeconds && l.value.is24 && l.value.timePickerInline,
        dp__time_col_reg_with_button: !l.value.enableSeconds && !l.value.is24,
        dp__time_col_sec: l.value.enableSeconds && l.value.is24,
        dp__time_col_sec_with_button: l.value.enableSeconds && !l.value.is24
      })),
      K = computed(() => l.value.timePickerInline && B.value.enabled && !O.value.count),
      Z = computed(() => {
        const n = [{ type: 'hours' }]
        return (
          l.value.enableMinutes &&
            n.push(
              { type: '', separator: true },
              {
                type: 'minutes'
              }
            ),
          l.value.enableSeconds &&
            n.push(
              { type: '', separator: true },
              {
                type: 'seconds'
              }
            ),
          n
        )
      }),
      de = computed(() => Z.value.filter((n) => !n.separator)),
      G = computed(() => (n) => {
        if (n === 'hours') {
          const C = Ce(+c.hours)
          return { text: C < 10 ? `0${C}` : `${C}`, value: C }
        }
        return { text: c[n] < 10 ? `0${c[n]}` : `${c[n]}`, value: c[n] }
      }),
      ce = (n, C) => {
        var _a2
        if (!c.disabledTimesConfig) return false
        const m = c.disabledTimesConfig(c.order, n === 'hours' ? C : void 0)
        return m[n] ? !!((_a2 = m[n]) == null ? void 0 : _a2.includes(C)) : true
      },
      le = (n, C) => (C !== 'hours' || R.value === 'AM' ? n : n + 12),
      we = (n) => {
        const C = l.value.is24 ? 24 : 12,
          m = n === 'hours' ? C : 60,
          N = +l.value[`${n}GridIncrement`],
          U = n === 'hours' && !l.value.is24 ? N : 0,
          pe = []
        for (let ge = U; ge < m; ge += N)
          pe.push({
            value: l.value.is24 ? ge : le(ge, n),
            text: ge < 10 ? `0${ge}` : `${ge}`
          })
        return (
          n === 'hours' && !l.value.is24 && pe.unshift({ value: R.value === 'PM' ? 12 : 0, text: '12' }),
          E(pe, (ge) => ({
            active: false,
            disabled: Y.value.times[n].includes(ge.value) || !Q(ge.value, n) || ce(n, ge.value) || ne(n, ge.value)
          }))
        )
      },
      ve = (n) => (n >= 0 ? n : 59),
      Ae = (n) => (n >= 0 ? n : 23),
      Q = (n, C) => {
        const m = u.minTime ? D(b(u.minTime)) : null,
          N = u.maxTime ? D(b(u.maxTime)) : null,
          U = D(b(L.value, C, C === 'minutes' || C === 'seconds' ? ve(n) : Ae(n)))
        return m && N
          ? (isBefore(U, N) || isEqual(U, N)) && (isAfter(U, m) || isEqual(U, m))
          : m
            ? isAfter(U, m) || isEqual(U, m)
            : N
              ? isBefore(U, N) || isEqual(U, N)
              : true
      },
      I = (n) => l.value[`no${n[0].toUpperCase() + n.slice(1)}Overlay`],
      y = (n) => {
        I(n) ||
          ((M[n] = !M[n]),
          M[n] ? ((p.value = true), o('overlay-opened', n)) : ((p.value = false), o('overlay-closed', n)))
      },
      H = (n) => (n === 'hours' ? getHours : n === 'minutes' ? getMinutes : getSeconds),
      fe = () => {
        S.value && clearTimeout(S.value)
      },
      Pe = (n, C = true, m) => {
        const N = C ? te : q,
          U = C ? +l.value[`${n}Increment`] : -+l.value[`${n}Increment`]
        ;(Q(+c[n] + U, n) && o(`update:${n}`, H(n)(N({ [n]: +c[n] }, { [n]: +l.value[`${n}Increment`] }))),
          !(m == null ? void 0 : m.keyboard) &&
            P.value.timeArrowHoldThreshold &&
            (S.value = setTimeout(() => {
              Pe(n, C)
            }, P.value.timeArrowHoldThreshold)))
      },
      Ce = (n) => (l.value.is24 ? n : (n >= 12 ? (R.value = 'PM') : (R.value = 'AM'), h2(n))),
      i = () => {
        ;(R.value === 'PM'
          ? ((R.value = 'AM'), o('update:hours', c.hours - 12))
          : ((R.value = 'PM'), o('update:hours', c.hours + 12)),
          r('am-pm-change', R.value))
      },
      d = (n) => {
        M[n] = true
      },
      a = (n, C) => (y(n), o(`update:${n}`, C))
    return (
      A({ openChildCmp: d }),
      (n, C) =>
        unref(u).disabled
          ? createCommentVNode('', true)
          : (openBlock(),
            createElementBlock('div', Gr, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(Z.value, (m, N) => {
                  var _a2, _b, _c
                  return (
                    openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: N,
                        class: normalizeClass(oe.value),
                        'data-compact': K.value && !unref(l).enableSeconds,
                        'data-collapsed': K.value && unref(l).enableSeconds
                      },
                      [
                        m.separator
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 0 },
                              [
                                p.value
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
                                    type: 'button',
                                    class: normalizeClass({
                                      dp__btn: true,
                                      dp__inc_dec_button: !unref(l).timePickerInline,
                                      dp__inc_dec_button_inline: unref(l).timePickerInline,
                                      dp__tp_inline_btn_top: unref(l).timePickerInline,
                                      dp__inc_dec_button_disabled: X.value(m.type),
                                      'dp--hidden-el': p.value
                                    }),
                                    'data-test-id': `${m.type}-time-inc-btn-${c.order}`,
                                    'aria-label': (_a2 = unref(v)) == null ? void 0 : _a2.incrementValue(m.type),
                                    tabindex: '0',
                                    'data-dp-action-element': V.value,
                                    onKeydown: (U) => unref(w)(U, () => Pe(m.type, true, { keyboard: true }), true),
                                    onClick: (U) => (unref(P).timeArrowHoldThreshold ? void 0 : Pe(m.type, true)),
                                    onMousedown: (U) => (unref(P).timeArrowHoldThreshold ? Pe(m.type, true) : void 0),
                                    onMouseup: fe
                                  },
                                  [
                                    unref(l).timePickerInline
                                      ? renderSlot(n.$slots, 'tp-inline-arrow-up', { key: 1 }, () => [
                                          C[2] ||
                                            (C[2] = createBaseVNode(
                                              'span',
                                              { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_l' },
                                              null,
                                              -1
                                            )),
                                          C[3] ||
                                            (C[3] = createBaseVNode(
                                              'span',
                                              { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_r' },
                                              null,
                                              -1
                                            ))
                                        ])
                                      : renderSlot(n.$slots, 'arrow-up', { key: 0 }, () => [createVNode(unref(Ya))])
                                  ],
                                  42,
                                  Zr
                                ),
                                createBaseVNode(
                                  'button',
                                  {
                                    type: 'button',
                                    'aria-label': `${G.value(m.type).text}-${(_b = unref(v)) == null ? void 0 : _b.openTpOverlay(m.type)}`,
                                    class: normalizeClass({
                                      dp__time_display: true,
                                      dp__time_display_block: !unref(l).timePickerInline,
                                      dp__time_display_inline: unref(l).timePickerInline,
                                      'dp--time-invalid': F.value(m.type),
                                      'dp--time-overlay-btn': !F.value(m.type),
                                      'dp--hidden-el': p.value
                                    }),
                                    disabled: unref(_)(I(m.type)),
                                    tabindex: '0',
                                    'data-dp-action-element': V.value,
                                    'data-test-id': `${m.type}-toggle-overlay-btn-${c.order}`,
                                    onKeydown: (U) => unref(w)(U, () => y(m.type), true),
                                    onClick: (U) => y(m.type)
                                  },
                                  [
                                    renderSlot(
                                      n.$slots,
                                      m.type,
                                      {
                                        text: G.value(m.type).text,
                                        value: G.value(m.type).value
                                      },
                                      () => [createTextVNode(toDisplayString(G.value(m.type).text), 1)]
                                    )
                                  ],
                                  42,
                                  el
                                ),
                                createBaseVNode(
                                  'button',
                                  {
                                    type: 'button',
                                    class: normalizeClass({
                                      dp__btn: true,
                                      dp__inc_dec_button: !unref(l).timePickerInline,
                                      dp__inc_dec_button_inline: unref(l).timePickerInline,
                                      dp__tp_inline_btn_bottom: unref(l).timePickerInline,
                                      dp__inc_dec_button_disabled: x.value(m.type),
                                      'dp--hidden-el': p.value
                                    }),
                                    'data-test-id': `${m.type}-time-dec-btn-${c.order}`,
                                    'aria-label': (_c = unref(v)) == null ? void 0 : _c.decrementValue(m.type),
                                    tabindex: '0',
                                    'data-dp-action-element': V.value,
                                    onKeydown: (U) => unref(w)(U, () => Pe(m.type, false, { keyboard: true }), true),
                                    onClick: (U) => (unref(P).timeArrowHoldThreshold ? void 0 : Pe(m.type, false)),
                                    onMousedown: (U) => (unref(P).timeArrowHoldThreshold ? Pe(m.type, false) : void 0),
                                    onMouseup: fe
                                  },
                                  [
                                    unref(l).timePickerInline
                                      ? renderSlot(n.$slots, 'tp-inline-arrow-down', { key: 1 }, () => [
                                          C[4] ||
                                            (C[4] = createBaseVNode(
                                              'span',
                                              { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_l' },
                                              null,
                                              -1
                                            )),
                                          C[5] ||
                                            (C[5] = createBaseVNode(
                                              'span',
                                              { class: 'dp__tp_inline_btn_bar dp__tp_btn_in_r' },
                                              null,
                                              -1
                                            ))
                                        ])
                                      : renderSlot(n.$slots, 'arrow-down', { key: 0 }, () => [createVNode(unref(Ba))])
                                  ],
                                  42,
                                  tl
                                )
                              ],
                              64
                            ))
                      ],
                      10,
                      Xr
                    )
                  )
                }),
                128
              )),
              unref(l).is24
                ? createCommentVNode('', true)
                : (openBlock(),
                  createElementBlock('div', al, [
                    renderSlot(
                      n.$slots,
                      'am-pm-button',
                      {
                        toggle: i,
                        value: R.value
                      },
                      () => {
                        var _a2
                        return [
                          createBaseVNode(
                            'button',
                            {
                              ref_key: 'amPmButton',
                              ref: $,
                              type: 'button',
                              class: 'dp__pm_am_button',
                              role: 'button',
                              'aria-label': (_a2 = unref(v)) == null ? void 0 : _a2.amPmButton,
                              tabindex: '0',
                              'data-dp-action-element': V.value,
                              'data-compact': K.value,
                              onClick: i,
                              onKeydown: C[0] || (C[0] = (m) => unref(w)(m, () => i(), true))
                            },
                            toDisplayString(R.value),
                            41,
                            nl
                          )
                        ]
                      }
                    )
                  ])),
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(
                  de.value,
                  (m, N) => (
                    openBlock(),
                    createBlock(
                      Transition,
                      {
                        key: N,
                        name: unref(k)(M[m.type]),
                        css: unref(g)
                      },
                      {
                        default: withCtx(() => {
                          var _a2, _b
                          return [
                            M[m.type]
                              ? (openBlock(),
                                createBlock(
                                  Nt,
                                  {
                                    key: 0,
                                    items: we(m.type),
                                    'is-last': unref(u).autoApply && !unref(P).keepActionRow,
                                    type: m.type,
                                    'aria-labels': unref(v),
                                    level: unref(l).timePickerInline || unref(u).timePicker ? 1 : 2,
                                    'overlay-label':
                                      (_b = (_a2 = unref(v)).timeOverlay) == null ? void 0 : _b.call(_a2, m.type),
                                    onSelected: (U) => a(m.type, U),
                                    onToggle: (U) => y(m.type),
                                    onResetFlow: C[1] || (C[1] = (U) => n.$emit('reset-flow'))
                                  },
                                  createSlots(
                                    {
                                      'button-icon': withCtx(() => [
                                        renderSlot(n.$slots, 'clock-icon', {}, () => [
                                          n.$slots['clock-icon']
                                            ? createCommentVNode('', true)
                                            : (openBlock(),
                                              createBlock(
                                                resolveDynamicComponent(
                                                  unref(l).timePickerInline ? unref(Et) : unref(Oa)
                                                ),
                                                { key: 0 }
                                              ))
                                        ])
                                      ]),
                                      _: 2
                                    },
                                    [
                                      n.$slots[`${m.type}-overlay-value`]
                                        ? {
                                            name: 'item',
                                            fn: withCtx(({ item: U }) => [
                                              renderSlot(n.$slots, `${m.type}-overlay-value`, {
                                                text: U.text,
                                                value: U.value
                                              })
                                            ]),
                                            key: '0'
                                          }
                                        : void 0,
                                      n.$slots[`${m.type}-overlay-header`]
                                        ? {
                                            name: 'header',
                                            fn: withCtx(() => [
                                              renderSlot(n.$slots, `${m.type}-overlay-header`, {
                                                toggle: () => y(m.type)
                                              })
                                            ]),
                                            key: '1'
                                          }
                                        : void 0
                                    ]
                                  ),
                                  1032,
                                  [
                                    'items',
                                    'is-last',
                                    'type',
                                    'aria-labels',
                                    'level',
                                    'overlay-label',
                                    'onSelected',
                                    'onToggle'
                                  ]
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
    )
  }
})
var ll = ['data-dp-mobile']
var ol = ['aria-label', 'tabindex']
var sl = ['role', 'aria-label', 'tabindex']
var ul = ['aria-label']
var La = defineComponent({
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
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      {
        rootEmit: s,
        setState: r,
        modelValue: u,
        rootProps: v,
        defaults: { ariaLabels: Y, textInput: P, config: B, range: O, timeConfig: l }
      } = Me(),
      { isModelAuto: w } = We(),
      { checkKeyDown: h2, findFocusableEl: _ } = Ie(),
      { transitionName: b, showTransition: E } = Vt(),
      { hideNavigationButtons: k } = ta(),
      { isMobile: g } = Zt(),
      M = useSlots(),
      R = useTemplateRef('overlay'),
      $ = useTemplateRef('close-tp-btn'),
      S = useTemplateRef('tp-input'),
      p = ref(false)
    onMounted(() => {
      o('mount')
    })
    const D = computed(() => (O.value.enabled && v.modelAuto ? w(u.value) : true)),
      V = ref(false),
      F = (G) => ({
        hours: Array.isArray(c.hours) ? c.hours[G] : c.hours,
        minutes: Array.isArray(c.minutes) ? c.minutes[G] : c.minutes,
        seconds: Array.isArray(c.seconds) ? c.seconds[G] : c.seconds
      }),
      L = computed(() => {
        const G = []
        if (O.value.enabled) for (let ce = 0; ce < 2; ce++) G.push(F(ce))
        else G.push(F(0))
        return G
      }),
      ne = (G, ce = false, le = '') => {
        ;(ce || o('reset-flow'),
          (V.value = G),
          r('arrowNavigationLevel', G ? 1 : 0),
          s('overlay-toggle', { open: G, overlay: He.time }),
          nextTick(() => {
            var _a2
            le !== '' && ((_a2 = S.value) == null ? void 0 : _a2[0]) && S.value[0].openChildCmp(le)
          }))
      },
      re2 = computed(() => ({
        dp__btn: true,
        dp__button: true,
        dp__button_bottom: v.autoApply && !B.value.keepActionRow
      })),
      X = lt(M, at.TimeInput),
      x = (G, ce, le) => (O.value.enabled ? (ce === 0 ? [G, L.value[1][le]] : [L.value[0][le], G]) : G),
      te = (G) => {
        o('update:hours', G)
      },
      q = (G) => {
        o('update:minutes', G)
      },
      oe = (G) => {
        o('update:seconds', G)
      },
      K = () => {
        if (R.value && !P.value.enabled && !c.noOverlayFocus) {
          const G = _(R.value)
          G && G.focus({ preventScroll: true })
        }
      },
      Z = (G) => {
        ;((p.value = false), s('overlay-toggle', { open: false, overlay: G }))
      },
      de = (G) => {
        ;((p.value = true), s('overlay-toggle', { open: true, overlay: G }))
      }
    return (
      A({ toggleTimePicker: ne }),
      (G, ce) => {
        var _a2
        return (
          openBlock(),
          createElementBlock(
            'div',
            {
              class: 'dp--tp-wrap',
              'data-dp-mobile': unref(g)
            },
            [
              !unref(v).timePicker && !unref(l).timePickerInline
                ? withDirectives(
                    (openBlock(),
                    createElementBlock(
                      'button',
                      {
                        key: 0,
                        ref: 'open-tp-btn',
                        type: 'button',
                        'data-dp-action-element': '0',
                        class: normalizeClass({ ...re2.value, 'dp--hidden-el': V.value }),
                        'aria-label': (_a2 = unref(Y)) == null ? void 0 : _a2.openTimePicker,
                        tabindex: e.noOverlayFocus ? void 0 : 0,
                        'data-test-id': 'open-time-picker-btn',
                        onKeydown: ce[0] || (ce[0] = (le) => unref(h2)(le, () => ne(true))),
                        onClick: ce[1] || (ce[1] = (le) => ne(true))
                      },
                      [renderSlot(G.$slots, 'clock-icon', {}, () => [createVNode(unref(Oa))])],
                      42,
                      ol
                    )),
                    [[vShow, !unref(k)('time')]]
                  )
                : createCommentVNode('', true),
              createVNode(
                Transition,
                {
                  name: unref(b)(V.value),
                  css: unref(E) && !unref(l).timePickerInline
                },
                {
                  default: withCtx(() => {
                    var _a3, _b
                    return [
                      V.value || unref(v).timePicker || unref(l).timePickerInline
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 0,
                              ref: 'overlay',
                              role: unref(l).timePickerInline ? void 0 : 'dialog',
                              class: normalizeClass({
                                dp__overlay: !unref(l).timePickerInline,
                                'dp--overlay-absolute': !unref(v).timePicker && !unref(l).timePickerInline,
                                'dp--overlay-relative': unref(v).timePicker
                              }),
                              style: normalizeStyle(
                                unref(v).timePicker ? { height: `${unref(B).modeHeight}px` } : void 0
                              ),
                              'aria-label': (_a3 = unref(Y)) == null ? void 0 : _a3.timePicker,
                              tabindex: unref(l).timePickerInline ? void 0 : 0
                            },
                            [
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(
                                    unref(l).timePickerInline
                                      ? 'dp__time_picker_inline_container'
                                      : 'dp__overlay_container dp__container_flex dp__time_picker_overlay_container'
                                  ),
                                  style: { display: 'flex' }
                                },
                                [
                                  renderSlot(
                                    G.$slots,
                                    'time-picker-overlay',
                                    {
                                      hours: e.hours,
                                      minutes: e.minutes,
                                      seconds: e.seconds,
                                      setHours: te,
                                      setMinutes: q,
                                      setSeconds: oe
                                    },
                                    () => [
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass(
                                            unref(l).timePickerInline ? 'dp__flex' : 'dp__overlay_row dp__flex_row'
                                          )
                                        },
                                        [
                                          (openBlock(true),
                                          createElementBlock(
                                            Fragment,
                                            null,
                                            renderList(L.value, (le, we) =>
                                              withDirectives(
                                                (openBlock(),
                                                createBlock(
                                                  rl,
                                                  mergeProps(
                                                    { key: we },
                                                    { ref_for: true },
                                                    {
                                                      order: we,
                                                      hours: le.hours,
                                                      minutes: le.minutes,
                                                      seconds: le.seconds,
                                                      closeTimePickerBtn: $.value,
                                                      disabledTimesConfig: e.disabledTimesConfig,
                                                      disabled: we === 0 ? unref(O).fixedStart : unref(O).fixedEnd
                                                    },
                                                    {
                                                      ref_for: true,
                                                      ref: 'tp-input',
                                                      'validate-time': (ve, Ae) => e.validateTime(ve, x(Ae, we, ve)),
                                                      'onUpdate:hours': (ve) => te(x(ve, we, 'hours')),
                                                      'onUpdate:minutes': (ve) => q(x(ve, we, 'minutes')),
                                                      'onUpdate:seconds': (ve) => oe(x(ve, we, 'seconds')),
                                                      onMounted: K,
                                                      onOverlayClosed: Z,
                                                      onOverlayOpened: de
                                                    }
                                                  ),
                                                  createSlots({ _: 2 }, [
                                                    renderList(unref(X), (ve, Ae) => ({
                                                      name: ve,
                                                      fn: withCtx((Q) => [
                                                        renderSlot(G.$slots, ve, mergeProps({ ref_for: true }, Q))
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
                                                [[vShow, we === 0 ? true : D.value]]
                                              )
                                            ),
                                            128
                                          ))
                                        ],
                                        2
                                      )
                                    ]
                                  ),
                                  !unref(v).timePicker && !unref(l).timePickerInline
                                    ? withDirectives(
                                        (openBlock(),
                                        createElementBlock(
                                          'button',
                                          {
                                            key: 0,
                                            ref: 'close-tp-btn',
                                            'data-dp-action-element': '1',
                                            type: 'button',
                                            class: normalizeClass({ ...re2.value, 'dp--hidden-el': p.value }),
                                            'aria-label': (_b = unref(Y)) == null ? void 0 : _b.closeTimePicker,
                                            tabindex: '0',
                                            onKeydown: ce[2] || (ce[2] = (le) => unref(h2)(le, () => ne(false))),
                                            onClick: ce[3] || (ce[3] = (le) => ne(false))
                                          },
                                          [renderSlot(G.$slots, 'calendar-icon', {}, () => [createVNode(unref(Et))])],
                                          42,
                                          ul
                                        )),
                                        [[vShow, !unref(k)('time')]]
                                      )
                                    : createCommentVNode('', true)
                                ],
                                2
                              )
                            ],
                            14,
                            sl
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
            ll
          )
        )
      }
    )
  }
})
var Ha = (e) => {
  const {
      getDate: A,
      modelValue: f,
      time: o,
      rootProps: c,
      defaults: { range: s, timeConfig: r }
    } = Me(),
    { isDateEqual: u, setTime: v } = We(),
    Y = ($, S) => (Array.isArray(o[$]) ? o[$][S] : o[$]),
    P = ($) => (r.value.enableSeconds ? (Array.isArray(o.seconds) ? o.seconds[$] : o.seconds) : 0),
    B = ($, S) =>
      $
        ? v(
            S !== void 0
              ? { hours: Y('hours', S), minutes: Y('minutes', S), seconds: P(S) }
              : { hours: o.hours, minutes: o.minutes, seconds: P() },
            $
          )
        : setSeconds(A(), P(S)),
    O = ($, S) => {
      o[$] = S
    },
    l = computed(() =>
      c.modelAuto && s.value.enabled ? (Array.isArray(f.value) ? f.value.length > 1 : false) : s.value.enabled
    ),
    w = ($, S) => {
      const p = Object.fromEntries(Object.keys(o).map((D) => (D === $ ? [D, S] : [D, o[D]].slice())))
      if (l.value && !s.value.disableTimeRangeValidation) {
        const D = (F) =>
            f.value
              ? v(
                  {
                    hours: p.hours[F],
                    minutes: p.minutes[F],
                    seconds: p.seconds[F]
                  },
                  f.value[F]
                )
              : null,
          V = (F) => setMilliseconds(f.value[F], 0)
        return !(u(D(0), D(1)) && (isAfter(D(0), V(1)) || isBefore(D(1), V(0))))
      }
      return true
    },
    h2 = ($, S) => {
      w($, S) && (O($, S), e && e())
    },
    _ = ($) => {
      h2('hours', $)
    },
    b = ($) => {
      h2('minutes', $)
    },
    E = ($) => {
      h2('seconds', $)
    },
    k = ($, S) => {
      ;(_($.hours), b($.minutes), E($.seconds), f.value && S(f.value))
    },
    g = ($) => {
      if ($) {
        const S = Array.isArray($),
          p = S ? [+$[0].hours, +$[1].hours] : +$.hours,
          D = S ? [+$[0].minutes, +$[1].minutes] : +$.minutes,
          V = S ? [+($[0].seconds ?? 0), +($[1].seconds ?? 0)] : +($.seconds ?? 0)
        ;(O('hours', p), O('minutes', D), r.value.enableSeconds && O('seconds', V))
      }
    },
    M = ($, S) => {
      const p = {
        hours: Array.isArray(o.hours) ? o.hours[$] : o.hours,
        disabledArr: []
      }
      return (
        (S || S === 0) && (p.hours = S),
        Array.isArray(c.disabledTimes) &&
          (p.disabledArr = s.value.enabled && Array.isArray(c.disabledTimes[$]) ? c.disabledTimes[$] : c.disabledTimes),
        p
      )
    },
    R = computed(() => ($, S) => {
      var _a2
      if (Array.isArray(c.disabledTimes)) {
        const { disabledArr: p, hours: D } = M($, S),
          V = p.filter((F) => +F.hours === D)
        return ((_a2 = V[0]) == null ? void 0 : _a2.minutes) === '*'
          ? { hours: [D], minutes: void 0, seconds: void 0 }
          : {
              hours: [],
              minutes: (V == null ? void 0 : V.map((F) => +F.minutes)) ?? [],
              seconds: (V == null ? void 0 : V.map((F) => (F.seconds ? +F.seconds : void 0))) ?? []
            }
      }
      return { hours: [], minutes: [], seconds: [] }
    })
  return {
    assignTime: O,
    updateHours: _,
    updateMinutes: b,
    updateSeconds: E,
    getSetDateTime: B,
    updateTimeValues: k,
    getSecondsValue: P,
    assignStartTime: g,
    validateTime: w,
    disabledTimesConfig: R
  }
}
var il = (e) => {
  const {
      getDate: A,
      time: f,
      modelValue: o,
      state: c,
      defaults: { startTime: s, range: r, timeConfig: u }
    } = Me(),
    { getTimeObj: v } = We()
  Ft(() => {
    c.isTextInputDate && M()
  })
  const {
    updateTimeValues: Y,
    getSetDateTime: P,
    assignTime: B,
    assignStartTime: O,
    disabledTimesConfig: l,
    validateTime: w
  } = Ha(h2)
  function h2() {
    e('update-flow-step')
  }
  const _ = (S) => {
      const { hours: p, minutes: D, seconds: V } = S
      return { hours: +p, minutes: +D, seconds: V ? +V : 0 }
    },
    b = () => {
      if (u.value.startTime) {
        if (Array.isArray(u.value.startTime)) {
          const p = _(u.value.startTime[0]),
            D = _(u.value.startTime[1])
          return [set(A(), p), set(A(), D)]
        }
        const S = _(u.value.startTime)
        return set(A(), S)
      }
      return r.value.enabled ? [null, null] : null
    },
    E = () => {
      if (r.value.enabled) {
        const [S, p] = b()
        o.value = [P(S, 0), P(p, 1)]
      } else o.value = P(b())
    },
    k = (S) => (Array.isArray(S) ? [v(A(S[0])), v(A(S[1]))] : [v(S ?? A())]),
    g = (S, p, D) => {
      ;(B('hours', S), B('minutes', p), B('seconds', u.value.enableSeconds ? D : 0))
    },
    M = () => {
      const [S, p] = k(o.value)
      return r.value.enabled
        ? g([S.hours, p.hours], [S.minutes, p.minutes], [S.seconds, p.seconds])
        : g(S.hours, S.minutes, S.seconds)
    }
  onMounted(() => (O(s.value), o.value ? M() : E()))
  const R = () => {
    ;(Array.isArray(o.value) ? (o.value = o.value.map((S, p) => S && P(S, p))) : (o.value = P(o.value)),
      e('time-update'))
  }
  return {
    modelValue: o,
    time: f,
    disabledTimesConfig: l,
    validateTime: w,
    updateTime: (S) => {
      Y(S, R)
    }
  }
}
var cl = defineComponent({
  __name: 'TimePickerSolo',
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ['time-update', 'mount', 'reset-flow', 'update-flow-step'],
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = useSlots(),
      s = lt(c, at.TimePicker),
      r = useTemplateRef('time-input'),
      { time: u, modelValue: v, disabledTimesConfig: Y, updateTime: P, validateTime: B } = il(o)
    return (
      onMounted(() => {
        o('mount')
      }),
      A({
        getSidebarProps: () => ({
          modelValue: v,
          time: u,
          updateTime: P
        }),
        toggleTimePicker: (w, h2 = false, _ = '') => {
          var _a2
          ;(_a2 = r.value) == null ? void 0 : _a2.toggleTimePicker(w, h2, _)
        }
      }),
      (w, h2) => (
        openBlock(),
        createBlock(
          aa,
          {
            'multi-calendars': 0,
            stretch: ''
          },
          {
            default: withCtx(({ wrapClass: _ }) => [
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(_)
                },
                [
                  createVNode(
                    La,
                    mergeProps({ ref: 'time-input' }, w.$props, {
                      hours: unref(u).hours,
                      minutes: unref(u).minutes,
                      seconds: unref(u).seconds,
                      'disabled-times-config': unref(Y),
                      'validate-time': unref(B),
                      'onUpdate:hours':
                        h2[0] ||
                        (h2[0] = (b) => unref(P)({ hours: b, minutes: unref(u).minutes, seconds: unref(u).seconds })),
                      'onUpdate:minutes':
                        h2[1] ||
                        (h2[1] = (b) => unref(P)({ hours: unref(u).hours, minutes: b, seconds: unref(u).seconds })),
                      'onUpdate:seconds':
                        h2[2] ||
                        (h2[2] = (b) => unref(P)({ hours: unref(u).hours, minutes: unref(u).minutes, seconds: b })),
                      onResetFlow: h2[3] || (h2[3] = (b) => w.$emit('reset-flow'))
                    }),
                    createSlots({ _: 2 }, [
                      renderList(unref(s), (b, E) => ({
                        name: b,
                        fn: withCtx((k) => [renderSlot(w.$slots, b, normalizeProps(guardReactiveProps(k)))])
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
var dl = (e, A) => {
  const {
      getDate: f,
      rootProps: o,
      defaults: { filters: c }
    } = Me(),
    { validateMonthYearInRange: s, validateMonthYear: r } = Ue(),
    u = (O, l) => {
      let w = O
      return c.value.months.includes(getMonth(w)) ? ((w = l ? addMonths(O, 1) : subMonths(O, 1)), u(w, l)) : w
    },
    v = (O, l) => {
      let w = O
      return c.value.years.includes(getYear(w)) ? ((w = l ? addYears(O, 1) : subYears(O, 1)), v(w, l)) : w
    },
    Y = (O, l = false) => {
      const w = set(f(), { month: e.month, year: e.year })
      let h2 = O ? addMonths(w, 1) : subMonths(w, 1)
      o.disableYearSelect && (h2 = setYear(h2, e.year))
      let _ = getMonth(h2),
        b = getYear(h2)
      ;(c.value.months.includes(_) && ((h2 = u(h2, O)), (_ = getMonth(h2)), (b = getYear(h2))),
        c.value.years.includes(b) && ((h2 = v(h2, O)), (b = getYear(h2))),
        s(_, b, O, o.preventMinMaxNavigation) && P(_, b, l))
    },
    P = (O, l, w = false) => {
      A('update-month-year', { month: O, year: l, fromNav: w })
    },
    B = computed(() => (O) => r(set(f(), { month: e.month, year: e.year }), o.preventMinMaxNavigation, O))
  return { handleMonthYearChange: Y, isDisabled: B, updateMonthYear: P }
}
var vl = { class: 'dp--header-wrap' }
var fl = {
  key: 0,
  class: 'dp__month_year_wrap'
}
var ml = { key: 0 }
var pl = { class: 'dp__month_year_wrap' }
var hl = ['data-dp-element', 'aria-label', 'data-test-id', 'onClick', 'onKeydown']
var gl = defineComponent({
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
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      {
        rootEmit: s,
        rootProps: r,
        modelValue: u,
        defaults: { ariaLabels: v, filters: Y, config: P, highlight: B, safeDates: O, ui: l }
      } = Me(),
      { transitionName: w, showTransition: h2 } = Vt(),
      { showLeftIcon: _, showRightIcon: b } = ta(),
      { handleMonthYearChange: E, isDisabled: k, updateMonthYear: g } = dl(c, o),
      {
        getMaxMonth: M,
        getMinMonth: R,
        getYearFromDate: $,
        groupListAndMap: S,
        checkHighlightYear: p,
        checkHighlightMonth: D
      } = We(),
      { checkKeyDown: V } = Ie(),
      { formatYear: F } = pt(),
      { checkMinMaxValue: L } = Ue(),
      { boolHtmlAttribute: ne } = Pt(),
      re2 = ref(false),
      X = ref(false),
      x = ref(false)
    onMounted(() => {
      o('mount')
    })
    const te = (I) => ({
        get: () => c[I],
        set: (y) => {
          const H = I === Ge.month ? Ge.year : Ge.month
          ;(o('update-month-year', { [I]: y, [H]: c[H] }), I === Ge.month ? le(true) : we(true))
        }
      }),
      q = computed(te(Ge.month)),
      oe = computed(te(Ge.year)),
      K = computed(() => (I) => ({
        month: c.month,
        year: c.year,
        items: I === Ge.month ? c.months : c.years,
        instance: c.instance,
        updateMonthYear: g,
        toggle: I === Ge.month ? le : we
      })),
      Z = computed(() => {
        const I = c.months.find((y) => y.value === c.month)
        return I || { text: '', value: 0 }
      }),
      de = computed(() =>
        S(c.months, (I) => {
          const y = c.month === I.value,
            H = L(I.value, R(c.year, O.value.minDate), M(c.year, O.value.maxDate)) || Y.value.months.includes(I.value),
            fe = D(B.value, I.value, c.year)
          return { active: y, disabled: H, highlighted: fe }
        })
      ),
      G = computed(() =>
        S(c.years, (I) => {
          const y = c.year === I.value,
            H = L(I.value, $(O.value.minDate), $(O.value.maxDate)) || Y.value.years.includes(I.value),
            fe = p(B.value, I.value)
          return { active: y, disabled: H, highlighted: fe }
        })
      ),
      ce = (I, y, H) => {
        ;(H === void 0 ? (I.value = !I.value) : (I.value = H),
          I.value
            ? ((x.value = true), s('overlay-toggle', { open: true, overlay: y }))
            : ((x.value = false), s('overlay-toggle', { open: false, overlay: y })))
      },
      le = (I = false, y) => {
        ;(ve(I), ce(re2, He.month, y))
      },
      we = (I = false, y) => {
        ;(ve(I), ce(X, He.year, y))
      },
      ve = (I) => {
        I || o('reset-flow')
      },
      Ae = computed(() => {
        var _a2, _b, _c, _d, _e, _f
        return [
          {
            type: Ge.month,
            index: 1,
            toggle: le,
            modelValue: q.value,
            updateModelValue: (I) => (q.value = I),
            text: Z.value.text,
            showSelectionGrid: re2.value,
            items: de.value,
            ariaLabel: (_a2 = v.value) == null ? void 0 : _a2.openMonthsOverlay,
            overlayLabel: ((_c = (_b = v.value).monthPicker) == null ? void 0 : _c.call(_b, true)) ?? void 0
          },
          {
            type: Ge.year,
            index: 2,
            toggle: we,
            modelValue: oe.value,
            updateModelValue: (I) => (oe.value = I),
            text: F(c.year),
            showSelectionGrid: X.value,
            items: G.value,
            ariaLabel: (_d = v.value) == null ? void 0 : _d.openYearsOverlay,
            overlayLabel: ((_f = (_e = v.value).yearPicker) == null ? void 0 : _f.call(_e, true)) ?? void 0
          }
        ]
      }),
      Q = computed(() => (r.disableYearSelect ? [Ae.value[0]] : r.yearFirst ? [...Ae.value].reverse() : Ae.value))
    return (
      A({
        toggleMonthPicker: le,
        toggleYearPicker: we,
        handleMonthYearChange: E
      }),
      (I, y) => {
        var _a2, _b, _c, _d, _e, _f
        return (
          openBlock(),
          createElementBlock('div', vl, [
            I.$slots['month-year']
              ? (openBlock(),
                createElementBlock('div', fl, [
                  renderSlot(
                    I.$slots,
                    'month-year',
                    normalizeProps(
                      guardReactiveProps({
                        month: e.month,
                        year: e.year,
                        months: e.months,
                        years: e.years,
                        updateMonthYear: unref(g),
                        handleMonthYearChange: unref(E),
                        instance: e.instance,
                        isDisabled: unref(k)
                      })
                    )
                  )
                ]))
              : (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 1 },
                  [
                    I.$slots['top-extra']
                      ? (openBlock(),
                        createElementBlock('div', ml, [renderSlot(I.$slots, 'top-extra', { value: unref(u) })]))
                      : createCommentVNode('', true),
                    createBaseVNode('div', pl, [
                      unref(_)(e.instance) && !unref(r).vertical
                        ? (openBlock(),
                          createBlock(
                            Bt,
                            {
                              key: 0,
                              'aria-label': (_a2 = unref(v)) == null ? void 0 : _a2.prevMonth,
                              disabled: unref(ne)(unref(k)(false)),
                              class: normalizeClass((_b = unref(l)) == null ? void 0 : _b.navBtnPrev),
                              'el-name': 'action-prev',
                              onActivate: y[0] || (y[0] = (H) => unref(E)(false, true))
                            },
                            {
                              default: withCtx(() => [
                                I.$slots['arrow-left']
                                  ? renderSlot(I.$slots, 'arrow-left', { key: 0 })
                                  : createCommentVNode('', true),
                                I.$slots['arrow-left']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Ca), { key: 1 }))
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
                              dp__year_disable_select: unref(r).disableYearSelect
                            }
                          ])
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(
                              Q.value,
                              (H) => (
                                openBlock(),
                                createElementBlock(
                                  Fragment,
                                  {
                                    key: H.type
                                  },
                                  [
                                    createBaseVNode(
                                      'button',
                                      {
                                        type: 'button',
                                        'data-dp-element': `overlay-${H.type}`,
                                        class: normalizeClass([
                                          'dp__btn dp__month_year_select',
                                          { 'dp--hidden-el': x.value }
                                        ]),
                                        'aria-label': `${H.text}-${H.ariaLabel}`,
                                        'data-test-id': `${H.type}-toggle-overlay-${e.instance}`,
                                        tabindex: '0',
                                        'data-dp-action-element': '0',
                                        onClick: (fe) => H.toggle(false),
                                        onKeydown: (fe) => unref(V)(fe, () => H.toggle(), true)
                                      },
                                      [
                                        I.$slots[H.type]
                                          ? renderSlot(I.$slots, H.type, {
                                              key: 0,
                                              text: H.text,
                                              value: c[H.type]
                                            })
                                          : createCommentVNode('', true),
                                        I.$slots[H.type]
                                          ? createCommentVNode('', true)
                                          : (openBlock(),
                                            createElementBlock(
                                              Fragment,
                                              { key: 1 },
                                              [createTextVNode(toDisplayString(H.text), 1)],
                                              64
                                            ))
                                      ],
                                      42,
                                      hl
                                    ),
                                    createVNode(
                                      Transition,
                                      {
                                        name: unref(w)(H.showSelectionGrid),
                                        css: unref(h2)
                                      },
                                      {
                                        default: withCtx(() => [
                                          H.showSelectionGrid
                                            ? (openBlock(),
                                              createBlock(
                                                Nt,
                                                {
                                                  key: 0,
                                                  items: H.items,
                                                  'is-last': unref(r).autoApply && !unref(P).keepActionRow,
                                                  'skip-button-ref': false,
                                                  type: H.type,
                                                  'header-refs': [],
                                                  'menu-wrap-ref': e.menuWrapRef,
                                                  'overlay-label': H.overlayLabel,
                                                  onSelected: H.updateModelValue,
                                                  onToggle: H.toggle
                                                },
                                                createSlots(
                                                  {
                                                    'button-icon': withCtx(() => [
                                                      I.$slots['calendar-icon']
                                                        ? renderSlot(I.$slots, 'calendar-icon', { key: 0 })
                                                        : createCommentVNode('', true),
                                                      I.$slots['calendar-icon']
                                                        ? createCommentVNode('', true)
                                                        : (openBlock(), createBlock(unref(Et), { key: 1 }))
                                                    ]),
                                                    _: 2
                                                  },
                                                  [
                                                    I.$slots[`${H.type}-overlay-value`]
                                                      ? {
                                                          name: 'item',
                                                          fn: withCtx(({ item: fe }) => [
                                                            renderSlot(I.$slots, `${H.type}-overlay-value`, {
                                                              text: fe.text,
                                                              value: fe.value
                                                            })
                                                          ]),
                                                          key: '0'
                                                        }
                                                      : void 0,
                                                    I.$slots[`${H.type}-overlay`]
                                                      ? {
                                                          name: 'overlay',
                                                          fn: withCtx(() => [
                                                            renderSlot(
                                                              I.$slots,
                                                              `${H.type}-overlay`,
                                                              mergeProps({ ref_for: true }, K.value(H.type))
                                                            )
                                                          ]),
                                                          key: '1'
                                                        }
                                                      : void 0,
                                                    I.$slots[`${H.type}-overlay-header`]
                                                      ? {
                                                          name: 'header',
                                                          fn: withCtx(() => [
                                                            renderSlot(I.$slots, `${H.type}-overlay-header`, {
                                                              toggle: H.toggle
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
                      unref(_)(e.instance) && unref(r).vertical
                        ? (openBlock(),
                          createBlock(
                            Bt,
                            {
                              key: 1,
                              'aria-label': (_c = unref(v)) == null ? void 0 : _c.prevMonth,
                              'el-name': 'action-prev',
                              disabled: unref(ne)(unref(k)(false)),
                              class: normalizeClass((_d = unref(l)) == null ? void 0 : _d.navBtnPrev),
                              onActivate: y[1] || (y[1] = (H) => unref(E)(false, true))
                            },
                            {
                              default: withCtx(() => [
                                I.$slots['arrow-up']
                                  ? renderSlot(I.$slots, 'arrow-up', { key: 0 })
                                  : createCommentVNode('', true),
                                I.$slots['arrow-up']
                                  ? createCommentVNode('', true)
                                  : (openBlock(), createBlock(unref(Ya), { key: 1 }))
                              ]),
                              _: 3
                            },
                            8,
                            ['aria-label', 'disabled', 'class']
                          ))
                        : createCommentVNode('', true),
                      unref(b)(e.instance)
                        ? (openBlock(),
                          createBlock(
                            Bt,
                            {
                              key: 2,
                              ref: 'rightIcon',
                              'el-name': 'action-next',
                              disabled: unref(ne)(unref(k)(true)),
                              'aria-label': (_e = unref(v)) == null ? void 0 : _e.nextMonth,
                              class: normalizeClass((_f = unref(l)) == null ? void 0 : _f.navBtnNext),
                              onActivate: y[2] || (y[2] = (H) => unref(E)(true, true))
                            },
                            {
                              default: withCtx(() => [
                                I.$slots[unref(r).vertical ? 'arrow-down' : 'arrow-right']
                                  ? renderSlot(I.$slots, unref(r).vertical ? 'arrow-down' : 'arrow-right', { key: 0 })
                                  : createCommentVNode('', true),
                                I.$slots[unref(r).vertical ? 'arrow-down' : 'arrow-right']
                                  ? createCommentVNode('', true)
                                  : (openBlock(),
                                    createBlock(resolveDynamicComponent(unref(r).vertical ? unref(Ba) : unref(xa)), {
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
var yl = {
  class: 'dp__calendar_header',
  role: 'row'
}
var bl = {
  key: 0,
  class: 'dp__calendar_header_item',
  role: 'gridcell'
}
var kl = ['aria-label']
var wl = {
  key: 0,
  class: 'dp__calendar_item dp__week_num',
  role: 'gridcell'
}
var Dl = { class: 'dp__cell_inner' }
var Ml = [
  'id',
  'aria-selected',
  'aria-disabled',
  'aria-label',
  'tabindex',
  'data-test-id',
  'data-dp-element-active',
  'onClick',
  'onTouchend',
  'onKeydown',
  'onMouseenter',
  'onMouseleave',
  'onMousedown'
]
var _l = defineComponent({
  __name: 'DpCalendar',
  props: {
    instance: {},
    mappedDates: {},
    month: {},
    year: {}
  },
  emits: ['mount', 'select-date', 'set-hover-date', 'handle-scroll', 'handle-swipe'],
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      {
        getDate: s,
        rootEmit: r,
        rootProps: u,
        defaults: { transitions: v, config: Y, ariaLabels: P, multiCalendars: B, weekNumbers: O, multiDates: l, ui: w }
      } = Me(),
      { isDateAfter: h2, isDateEqual: _, resetDateTime: b, getCellId: E } = We(),
      { checkKeyDown: k, checkStopPropagation: g, isTouchDevice: M } = Ie(),
      { formatWeekDay: R } = pt(),
      $ = useTemplateRef('calendar-wrap'),
      S = useTemplateRef('active-tooltip'),
      p = ref([]),
      D = ref(null),
      V = ref(true),
      F = ref(false),
      L = ref(''),
      ne = ref({
        bottom: '',
        left: '',
        transform: ''
      }),
      re2 = ref({ left: '50%' })
    useSwipe($, {
      onSwipeEnd: (d, a) => {
        Y.value.noSwipe ||
          (u.vertical
            ? (a === 'up' || a === 'down') && o('handle-swipe', a === 'up' ? 'left' : 'right')
            : (a === 'left' || a === 'right') && o('handle-swipe', a === 'right' ? 'left' : 'right'))
      }
    })
    const X = computed(() => (u.calendar ? u.calendar(c.mappedDates) : c.mappedDates)),
      x = computed(() => (u.dayNames ? (Array.isArray(u.dayNames) ? u.dayNames : u.dayNames()) : i()))
    ;(onMounted(() => {
      ;(o('mount', { cmp: 'calendar', dayRefs: p.value }),
        Y.value.monthChangeOnScroll && $.value && $.value.addEventListener('wheel', I, { passive: false }))
    }),
      onUnmounted(() => {
        Y.value.monthChangeOnScroll && $.value && $.value.removeEventListener('wheel', I)
      }))
    const te = (d) => (d ? (u.vertical ? 'vNext' : 'next') : u.vertical ? 'vPrevious' : 'previous'),
      q = (d, a) => {
        if (u.transitions) {
          const n = b(set(s(), { month: c.month, year: c.year }))
          ;((L.value = h2(b(set(s(), { month: d, year: a })), n) ? v.value[te(true)] : v.value[te(false)]),
            (V.value = false),
            nextTick(() => {
              V.value = true
            }))
        }
      },
      oe = computed(() => ({
        ...w.value.calendar
      })),
      K = (d) => ({ type: 'dot', ...d }),
      Z = computed(() => (d) => {
        const a = K(d)
        return {
          dp__marker_dot: a.type === 'dot',
          dp__marker_line: a.type === 'line'
        }
      }),
      de = computed(() => (d) => _(d, D.value)),
      G = computed(() => ({
        dp__calendar: true,
        dp__calendar_next: B.value.count > 0 && c.instance !== 0
      })),
      ce = computed(() => (d) => (u.hideOffsetDates ? d.current : true)),
      le = async (d, a) => {
        var _a2
        const { width: n, height: C } = d.getBoundingClientRect()
        D.value = a.value
        let m = { left: `${n / 2}px` },
          N = -50
        if ((await nextTick(), (_a2 = S.value) == null ? void 0 : _a2[0])) {
          const { left: U, width: pe } = S.value[0].getBoundingClientRect()
          ;(U < 0 && ((m = { left: '0' }), (N = 0), (re2.value.left = `${n / 2}px`)),
            globalThis.innerWidth < U + pe && ((m = { right: '0' }), (N = 0), (re2.value.left = `${pe - n / 2}px`)))
        }
        ne.value = {
          bottom: `${C}px`,
          ...m,
          transform: `translateX(${N}%)`
        }
      },
      we = async (d, a, n) => {
        var _a2, _b, _c, _d, _e
        const C = unrefElement((_b = (_a2 = p.value) == null ? void 0 : _a2[a]) == null ? void 0 : _b[n])
        C &&
          (((_c = d.marker) == null ? void 0 : _c.customPosition) &&
          ((_e = (_d = d.marker) == null ? void 0 : _d.tooltip) == null ? void 0 : _e.length)
            ? (ne.value = d.marker.customPosition(C))
            : await le(C, d),
          r('tooltip-open', d.marker))
      },
      ve = async (d, a, n) => {
        var _a2, _b
        if (F.value && l.value.enabled && l.value.dragSelect) return o('select-date', d)
        if (
          (o('set-hover-date', d), (_b = (_a2 = d.marker) == null ? void 0 : _a2.tooltip) == null ? void 0 : _b.length)
        ) {
          if (u.hideOffsetDates && !d.current) return
          await we(d, a, n)
        }
      },
      Ae = (d) => {
        D.value &&
          ((D.value = null),
          (ne.value = structuredClone({ bottom: '', left: '', transform: '' })),
          r('tooltip-close', d.marker))
      },
      Q = (d, a, n) => {
        d && (Array.isArray(p.value[a]) ? (p.value[a][n] = d) : (p.value[a] = [d]))
      },
      I = (d) => {
        Y.value.monthChangeOnScroll && (d.preventDefault(), o('handle-scroll', d))
      },
      y = (d) =>
        O.value
          ? O.value.type === 'local'
            ? getWeek(d.value, {
                weekStartsOn: +u.weekStart,
                locale: u.locale
              })
            : O.value.type === 'iso'
              ? getISOWeek(d.value)
              : typeof O.value.type == 'function'
                ? O.value.type(d.value)
                : ''
          : '',
      H = (d) => {
        var _a2
        const a = d[0]
        return ((_a2 = O.value) == null ? void 0 : _a2.hideOnOffsetDates)
          ? d.some((n) => n.current)
            ? y(a)
            : ''
          : y(a)
      },
      fe = (d, a, n = true) => {
        ;(!n && M()) || ((!l.value.enabled || Y.value.allowPreventDefault) && (g(d, Y.value), o('select-date', a)))
      },
      Pe = (d) => {
        g(d, Y.value)
      },
      Ce = (d) => {
        l.value.enabled && l.value.dragSelect
          ? ((F.value = true), o('select-date', d))
          : l.value.enabled && o('select-date', d)
      },
      i = () => {
        const d = s(),
          a = startOfWeek(d, { locale: u.locale, weekStartsOn: +u.weekStart }),
          n = endOfWeek(d, { locale: u.locale, weekStartsOn: +u.weekStart })
        return eachDayOfInterval({ start: a, end: n }).map((m) => R(m))
      }
    return (
      A({ triggerTransition: q }),
      (d, a) => (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(G.value)
          },
          [
            createBaseVNode(
              'div',
              {
                ref: 'calendar-wrap',
                class: normalizeClass(oe.value),
                role: 'grid'
              },
              [
                createBaseVNode('div', yl, [
                  unref(O)
                    ? (openBlock(), createElementBlock('div', bl, toDisplayString(unref(O).label), 1))
                    : createCommentVNode('', true),
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(x.value, (n, C) => {
                      var _a2, _b
                      return (
                        openBlock(),
                        createElementBlock(
                          'div',
                          {
                            key: C,
                            class: 'dp__calendar_header_item',
                            role: 'gridcell',
                            'data-test-id': 'calendar-header',
                            'aria-label':
                              (_b = (_a2 = unref(P)) == null ? void 0 : _a2.weekDay) == null ? void 0 : _b.call(_a2, C)
                          },
                          [
                            renderSlot(
                              d.$slots,
                              'calendar-header',
                              {
                                day: n,
                                index: C
                              },
                              () => [createTextVNode(toDisplayString(n), 1)]
                            )
                          ],
                          8,
                          kl
                        )
                      )
                    }),
                    128
                  ))
                ]),
                a[2] || (a[2] = createBaseVNode('div', { class: 'dp__calendar_header_separator' }, null, -1)),
                createVNode(
                  Transition,
                  {
                    name: L.value,
                    css: !!unref(v)
                  },
                  {
                    default: withCtx(() => [
                      V.value
                        ? (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: 'dp__calendar',
                              role: 'rowgroup',
                              onMouseleave: a[1] || (a[1] = (n) => (F.value = false))
                            },
                            [
                              (openBlock(true),
                              createElementBlock(
                                Fragment,
                                null,
                                renderList(
                                  X.value,
                                  (n, C) => (
                                    openBlock(),
                                    createElementBlock(
                                      'div',
                                      {
                                        key: C,
                                        class: 'dp__calendar_row',
                                        role: 'row'
                                      },
                                      [
                                        unref(O)
                                          ? (openBlock(),
                                            createElementBlock('div', wl, [
                                              createBaseVNode('div', Dl, toDisplayString(H(n.days)), 1)
                                            ]))
                                          : createCommentVNode('', true),
                                        (openBlock(true),
                                        createElementBlock(
                                          Fragment,
                                          null,
                                          renderList(n.days, (m, N) => {
                                            var _a2, _b, _c
                                            return (
                                              openBlock(),
                                              createElementBlock(
                                                'div',
                                                {
                                                  id: unref(E)(m.value),
                                                  ref_for: true,
                                                  ref: (U) => Q(U, C, N),
                                                  key: N + C,
                                                  role: 'gridcell',
                                                  class: 'dp__calendar_item',
                                                  'aria-selected':
                                                    (m.classData.dp__active_date ||
                                                      m.classData.dp__range_start ||
                                                      m.classData.dp__range_end) ??
                                                    void 0,
                                                  'aria-disabled': m.classData.dp__cell_disabled || void 0,
                                                  'aria-label':
                                                    (_b = (_a2 = unref(P)) == null ? void 0 : _a2.day) == null
                                                      ? void 0
                                                      : _b.call(_a2, m),
                                                  tabindex: !m.current && unref(u).hideOffsetDates ? void 0 : 0,
                                                  'data-test-id': unref(E)(m.value),
                                                  'data-dp-element-active': m.classData.dp__active_date ? 0 : void 0,
                                                  'data-dp-action-element': '0',
                                                  onClick: withModifiers((U) => fe(U, m), ['prevent']),
                                                  onTouchend: (U) => fe(U, m, false),
                                                  onKeydown: (U) => unref(k)(U, () => d.$emit('select-date', m)),
                                                  onMouseenter: (U) => ve(m, C, N),
                                                  onMouseleave: (U) => Ae(m),
                                                  onMousedown: (U) => Ce(m),
                                                  onMouseup: a[0] || (a[0] = (U) => (F.value = false))
                                                },
                                                [
                                                  createBaseVNode(
                                                    'div',
                                                    {
                                                      class: normalizeClass(['dp__cell_inner', m.classData])
                                                    },
                                                    [
                                                      d.$slots.day && ce.value(m)
                                                        ? renderSlot(d.$slots, 'day', {
                                                            key: 0,
                                                            day: +m.text,
                                                            date: m.value
                                                          })
                                                        : createCommentVNode('', true),
                                                      d.$slots.day
                                                        ? createCommentVNode('', true)
                                                        : (openBlock(),
                                                          createElementBlock(
                                                            Fragment,
                                                            { key: 1 },
                                                            [createTextVNode(toDisplayString(m.text), 1)],
                                                            64
                                                          )),
                                                      m.marker && ce.value(m)
                                                        ? renderSlot(
                                                            d.$slots,
                                                            'marker',
                                                            {
                                                              key: 2,
                                                              marker: m.marker,
                                                              day: +m.text,
                                                              date: m.value
                                                            },
                                                            () => [
                                                              createBaseVNode(
                                                                'div',
                                                                {
                                                                  class: normalizeClass(Z.value(m.marker)),
                                                                  style: normalizeStyle(
                                                                    m.marker.color
                                                                      ? { backgroundColor: m.marker.color }
                                                                      : {}
                                                                  )
                                                                },
                                                                null,
                                                                6
                                                              )
                                                            ]
                                                          )
                                                        : createCommentVNode('', true),
                                                      de.value(m.value)
                                                        ? (openBlock(),
                                                          createElementBlock(
                                                            'div',
                                                            {
                                                              key: 3,
                                                              ref_for: true,
                                                              ref: 'active-tooltip',
                                                              class: 'dp__marker_tooltip',
                                                              style: normalizeStyle(ne.value)
                                                            },
                                                            [
                                                              ((_c = m.marker) == null ? void 0 : _c.tooltip)
                                                                ? (openBlock(),
                                                                  createElementBlock(
                                                                    'div',
                                                                    {
                                                                      key: 0,
                                                                      class: 'dp__tooltip_content',
                                                                      onClick: Pe
                                                                    },
                                                                    [
                                                                      (openBlock(true),
                                                                      createElementBlock(
                                                                        Fragment,
                                                                        null,
                                                                        renderList(
                                                                          m.marker.tooltip,
                                                                          (U, pe) => (
                                                                            openBlock(),
                                                                            createElementBlock(
                                                                              'div',
                                                                              {
                                                                                key: pe,
                                                                                class: 'dp__tooltip_text'
                                                                              },
                                                                              [
                                                                                renderSlot(
                                                                                  d.$slots,
                                                                                  'marker-tooltip',
                                                                                  {
                                                                                    tooltip: U,
                                                                                    day: m.value
                                                                                  },
                                                                                  () => [
                                                                                    createBaseVNode(
                                                                                      'div',
                                                                                      {
                                                                                        class: 'dp__tooltip_mark',
                                                                                        style: normalizeStyle(
                                                                                          U.color
                                                                                            ? {
                                                                                                backgroundColor: U.color
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
                                                                                      toDisplayString(U.text),
                                                                                      1
                                                                                    )
                                                                                  ]
                                                                                )
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
                                                                          style: normalizeStyle(re2.value)
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
                                                Ml
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
var Al = (e, A, f, o) => {
  const c = ref([]),
    s = ref(/* @__PURE__ */ new Date()),
    r = ref(),
    {
      getDate: u,
      rootEmit: v,
      calendars: Y,
      month: P,
      year: B,
      time: O,
      modelValue: l,
      rootProps: w,
      today: h2,
      state: _,
      defaults: {
        multiCalendars: b,
        startTime: E,
        range: k,
        config: g,
        safeDates: M,
        multiDates: R,
        timeConfig: $,
        flow: S
      }
    } = Me(),
    { validateMonthYearInRange: p, isDisabled: D, isDateRangeAllowed: V, checkMinMaxRange: F } = Ue(),
    {
      updateTimeValues: L,
      getSetDateTime: ne,
      assignTime: re2,
      assignStartTime: X,
      validateTime: x,
      disabledTimesConfig: te
    } = Ha(o),
    { formatDay: q } = pt(),
    { resetDateTime: oe, setTime: K, isDateBefore: Z, isDateEqual: de, getDaysInBetween: G } = We(),
    { checkRangeAutoApply: ce, getRangeWithFixedDate: le, handleMultiDatesSelect: we, setPresetDate: ve } = na(),
    { getMapDate: Ae } = Ie()
  Ft(() => Ce(_.isTextInputDate))
  const Q = (T) => (!g.value.keepViewOnOffsetClick || T ? true : !r.value),
    I = (T, z, ue, ke = false) => {
      var _a2, _b, _c
      Q(ke) &&
        ((_a2 = Y.value)[T] ?? (_a2[T] = Y.value[T] = { month: 0, year: 0 }),
        (Y.value[T].month = z ?? ((_b = Y.value[T]) == null ? void 0 : _b.month)),
        (Y.value[T].year = ue ?? ((_c = Y.value[T]) == null ? void 0 : _c.year)))
    },
    y = () => {
      w.autoApply && A('select-date')
    },
    H = () => {
      E.value && X(E.value)
    }
  onMounted(() => {
    ;(l.value || (Tt(), H()), Ce(true), w.focusStartDate && w.startDate && Tt())
  })
  const fe = computed(() => {
      var _a2, _b, _c
      return ((_b = (_a2 = S.value) == null ? void 0 : _a2.steps) == null ? void 0 : _b.length) &&
        !((_c = S.value) == null ? void 0 : _c.partial)
        ? e.flowStep === S.value.steps.length
        : true
    }),
    Pe = () => {
      var _a2, _b, _c
      w.autoApply &&
        fe.value &&
        A(
          'auto-apply',
          ((_a2 = S.value) == null ? void 0 : _a2.partial)
            ? e.flowStep !== ((_c = (_b = S.value) == null ? void 0 : _b.steps) == null ? void 0 : _c.length)
            : false
        )
    },
    Ce = (T = false) => {
      if (l.value) return Array.isArray(l.value) ? ((c.value = l.value), U(T)) : n(l.value, T)
      if (b.value.count && T && !w.startDate) return a(u(), T)
    },
    i = () =>
      Array.isArray(l.value) && k.value.enabled ? getMonth(l.value[0]) === getMonth(l.value[1] ?? l.value[0]) : false,
    d = (T) => {
      const z = addMonths(T, 1)
      return { month: getMonth(z), year: getYear(z) }
    },
    a = (T = u(), z = false) => {
      if (
        ((!b.value.count || !b.value.static || z) && I(0, getMonth(T), getYear(T)),
        b.value.count && (!l.value || i() || !b.value.solo) && (!b.value.solo || z))
      )
        for (let ue = 1; ue < b.value.count; ue++) {
          const ke = set(u(), { month: P.value(ue - 1), year: B.value(ue - 1) }),
            Oe = add(ke, { months: 1 })
          Y.value[ue] = { month: getMonth(Oe), year: getYear(Oe) }
        }
    },
    n = (T, z) => {
      ;(a(T),
        re2('hours', getHours(T)),
        re2('minutes', getMinutes(T)),
        re2('seconds', getSeconds(T)),
        b.value.count && z && Qe())
    },
    C = (T) => {
      if (b.value.count) {
        if (b.value.solo) return 0
        const z = getMonth(T[0]),
          ue = getMonth(T[1])
        return Math.abs(ue - z) < b.value.count ? 0 : 1
      }
      return 1
    },
    m = (T, z) => {
      T[1] && k.value.showLastInRange ? a(T[C(T)], z) : a(T[0], z)
      const ue = (ke, Oe) => [ke(T[0]), (T == null ? void 0 : T[1]) ? ke(T[1]) : O[Oe][1]]
      ;(re2('hours', ue(getHours, 'hours')),
        re2('minutes', ue(getMinutes, 'minutes')),
        re2('seconds', ue(getSeconds, 'seconds')))
    },
    N = (T, z) => {
      if ((k.value.enabled || w.weekPicker) && !R.value.enabled) return m(T, z)
      if (R.value.enabled && z) {
        const ue = T[T.length - 1]
        return n(ue, z)
      }
    },
    U = (T) => {
      const z = l.value
      ;(N(z, T), b.value.count && b.value.solo && Qe())
    },
    pe = (T, z) => {
      const ue = set(u(), { month: P.value(z), year: B.value(z) }),
        ke = T < 0 ? addMonths(ue, 1) : subMonths(ue, 1)
      p(getMonth(ke), getYear(ke), T < 0, w.preventMinMaxNavigation) &&
        (I(z, getMonth(ke), getYear(ke)),
        v('update-month-year', { instance: z, month: getMonth(ke), year: getYear(ke) }),
        b.value.count && !b.value.solo && ge(z),
        f())
    },
    ge = (T) => {
      for (let z = T - 1; z >= 0; z--) {
        const ue = subMonths(set(u(), { month: P.value(z + 1), year: B.value(z + 1) }), 1)
        I(z, getMonth(ue), getYear(ue))
      }
      for (let z = T + 1; z <= b.value.count - 1; z++) {
        const ue = addMonths(set(u(), { month: P.value(z - 1), year: B.value(z - 1) }), 1)
        I(z, getMonth(ue), getYear(ue))
      }
    },
    Qe = () => {
      if (Array.isArray(l.value) && l.value.length === 2) {
        const T = u(u(l.value[1] ?? addMonths(l.value[0], 1))),
          [z, ue] = [getMonth(l.value[0]), getYear(l.value[0])],
          [ke, Oe] = [getMonth(l.value[1]), getYear(l.value[1])]
        ;(z !== ke || (z === ke && ue !== Oe)) && b.value.solo && I(1, getMonth(T), getYear(T))
      } else l.value && !Array.isArray(l.value) && (I(0, getMonth(l.value), getYear(l.value)), a(u()))
    },
    Tt = () => {
      w.startDate && (I(0, getMonth(u(w.startDate)), getYear(u(w.startDate))), b.value.count && ge(0))
    },
    Wt = (T, z) => {
      if (g.value.monthChangeOnScroll) {
        const ue = Date.now() - s.value.getTime(),
          ke = Math.abs(T.deltaY)
        let Oe = 500
        ;(ke > 1 && (Oe = 100),
          ke > 100 && (Oe = 0),
          ue > Oe &&
            ((s.value = /* @__PURE__ */ new Date()),
            pe(g.value.monthChangeOnScroll === 'inverse' ? T.deltaY : -T.deltaY, z)))
      }
    },
    ra = (T, z, ue = false) => {
      g.value.monthChangeOnArrows && w.vertical === ue && Lt(T, z)
    },
    Lt = (T, z) => {
      pe(T === 'right' ? -1 : 1, z)
    },
    la = (T) => {
      if (M.value.markers) return Ae(T.value, M.value.markers)
    },
    oa = (T, z) => {
      switch (w.sixWeeks === true ? 'append' : w.sixWeeks) {
        case 'prepend':
          return [true, false]
        case 'center':
          return [T == 0, true]
        case 'fair':
          return [T == 0 || z > T, true]
        case 'append':
          return [false, false]
        default:
          return [false, false]
      }
    },
    sa = (T, z, ue, ke) => {
      if (w.sixWeeks && T.length < 6) {
        const Oe = 6 - T.length,
          ct = (z.getDay() + 7 - ke) % 7,
          Kt = 6 - ((ue.getDay() + 7 - ke) % 7),
          [Ct, da] = oa(ct, Kt)
        for (let gt = 1; gt <= Oe; gt++)
          if (da ? !!(gt % 2) == Ct : Ct) {
            const zt = T[0].days[0],
              va = $t(addDays(zt.value, -7), getMonth(z))
            T.unshift({ days: va })
          } else {
            const zt = T[T.length - 1],
              va = zt.days[zt.days.length - 1],
              en = $t(addDays(va.value, 1), getMonth(z))
            T.push({ days: en })
          }
      }
      return T
    },
    $t = (T, z) => {
      const ue = u(T),
        ke = []
      for (let Oe = 0; Oe < 7; Oe++) {
        const ct = addDays(ue, Oe),
          Rt = getMonth(ct) !== z
        ke.push({
          text: w.hideOffsetDates && Rt ? '' : q(ct),
          value: ct,
          current: !Rt,
          classData: {}
        })
      }
      return ke
    },
    ua = (T, z) => {
      const ue = [],
        ke = u(new Date(z, T)),
        Oe = u(new Date(z, T + 1, 0)),
        ct = w.weekStart,
        Rt = startOfWeek(ke, { weekStartsOn: ct }),
        Kt = (Ct) => {
          const da = $t(Ct, T)
          if ((ue.push({ days: da }), !ue[ue.length - 1].days.some((gt) => de(u(gt.value), oe(Oe))))) {
            const gt = addDays(Ct, 7)
            Kt(gt)
          }
        }
      return (Kt(Rt), sa(ue, ke, Oe, ct))
    },
    ia = (T) => {
      const z = K({ hours: O.hours, minutes: O.minutes, seconds: jt() }, u(T.value))
      ;(v('date-click', z),
        R.value.enabled ? we(z, R.value.limit) : (l.value = z),
        o(),
        nextTick().then(() => {
          Pe()
        }))
    },
    Ht = (T) => (k.value.noDisabledRange ? G(c.value[0], T).some((ue) => D(ue)) : false),
    se = () => {
      ;((c.value = l.value ? l.value.slice().filter((T) => !!T) : []),
        c.value.length === 2 && !(k.value.fixedStart || k.value.fixedEnd) && (c.value = []))
    },
    Le = (T, z) => {
      const ue = [u(T.value), addDays(u(T.value), +k.value.autoRange)]
      V(ue) ? (z && Je(T.value), (c.value = ue)) : v('invalid-date', T.value)
    },
    Je = (T) => {
      const z = getMonth(u(T)),
        ue = getYear(u(T))
      if ((I(0, z, ue), b.value.count > 0))
        for (let ke = 1; ke < b.value.count; ke++) {
          const Oe = d(set(u(T), { year: B.value(ke - 1), month: P.value(ke - 1) }))
          I(ke, Oe.month, Oe.year)
        }
    },
    St = (T) => {
      if (Ht(T.value) || !F(T.value, l.value, k.value.fixedStart ? 0 : 1)) return v('invalid-date', T.value)
      c.value = le(u(T.value))
    },
    ht = (T, z) => {
      if ((se(), k.value.autoRange)) return Le(T, z)
      if (k.value.fixedStart || k.value.fixedEnd) return St(T)
      c.value[0]
        ? F(u(T.value), l.value) && !Ht(T.value)
          ? Z(u(T.value), u(c.value[0]))
            ? k.value.autoSwitchStartEnd
              ? (c.value.unshift(u(T.value)), v('range-end', c.value[0]))
              : ((c.value[0] = u(T.value)), v('range-start', c.value[0]))
            : ((c.value[1] = u(T.value)), v('range-end', c.value[1]))
          : v('invalid-date', T.value)
        : ((c.value[0] = u(T.value)), v('range-start', c.value[0]))
    },
    jt = (T = true) =>
      $.value.enableSeconds ? (Array.isArray(O.seconds) ? (T ? O.seconds[0] : O.seconds[1]) : O.seconds) : 0,
    ca = (T) => {
      c.value[T] = K(
        {
          hours: O.hours[T],
          minutes: O.minutes[T],
          seconds: jt(T !== 1)
        },
        c.value[T]
      )
    },
    ja = () => {
      var _a2, _b
      c.value[0] &&
        c.value[1] &&
        +((_a2 = c.value) == null ? void 0 : _a2[0]) > +((_b = c.value) == null ? void 0 : _b[1]) &&
        (c.value.reverse(), v('range-start', c.value[0]), v('range-end', c.value[1]))
    },
    Ka = () => {
      var _a2, _b, _c
      c.value.length &&
        (c.value[0] && !c.value[1] ? ca(0) : (ca(0), ca(1), o()),
        ja(),
        (l.value = c.value.slice()),
        ce(
          c.value,
          A,
          c.value.length < 2 || ((_a2 = S.value) == null ? void 0 : _a2.steps.length)
            ? e.flowStep !== ((_c = (_b = S.value) == null ? void 0 : _b.steps) == null ? void 0 : _c.length)
            : false
        ))
    },
    za = (T, z = false) => {
      if (D(T.value) || (!T.current && w.hideOffsetDates)) return v('invalid-date', T.value)
      if (((r.value = structuredClone(T)), !k.value.enabled)) return ia(T)
      Array.isArray(O.hours) && Array.isArray(O.minutes) && !R.value.enabled && (ht(T, z), Ka())
    },
    qa = (T, z) => {
      var _a2, _b
      ;(I(T, z.month, z.year, true),
        b.value.count && !b.value.solo && ge(T),
        v('update-month-year', { instance: T, month: z.month, year: z.year }),
        f(b.value.solo ? T : void 0))
      const ue = ((_b = (_a2 = S.value) == null ? void 0 : _a2.steps) == null ? void 0 : _b.length)
        ? S.value.steps[e.flowStep]
        : void 0
      !z.fromNav && (ue === He.month || ue === He.year) && o()
    },
    Ua = (T) => {
      ;(ve({
        value: T
      }),
        y(),
        w.multiCalendars && nextTick().then(() => Ce(true)))
    },
    Qa = () => {
      var _a2
      let T = u()
      return (
        ((_a2 = w.actionRow) == null ? void 0 : _a2.nowBtnRound) &&
          (T = roundToNearestMinutes(T, {
            roundingMethod: w.actionRow.nowBtnRound.rounding ?? 'ceil',
            nearestTo: w.actionRow.nowBtnRound.roundTo ?? 15
          })),
        T
      )
    },
    Ja = () => {
      const T = Qa()
      ;(!k.value.enabled && !R.value.enabled
        ? (l.value = T)
        : l.value && Array.isArray(l.value) && l.value[0]
          ? R.value.enabled
            ? (l.value = [...l.value, T])
            : (l.value = Z(T, l.value[0]) ? [T, l.value[0]] : [l.value[0], T])
          : (l.value = [T]),
        y())
    },
    Ga = () => {
      if (Array.isArray(l.value))
        if (R.value.enabled) {
          const T = Xa()
          l.value[l.value.length - 1] = ne(T)
        } else l.value = l.value.map((T, z) => T && ne(T, z))
      else l.value = ne(l.value)
      A('time-update')
    },
    Xa = () => (Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null),
    Za = (T) => {
      let z = ''
      if (k.value.enabled && Array.isArray(l.value))
        for (const ue of Object.keys(T)) {
          const ke = T[ue]
          Array.isArray(ke) && (O[ue][0] !== ke[0] && (z = 'range-start'), O[ue][1] !== ke[1] && (z = 'range-start'))
        }
      return z
    }
  return {
    calendars: Y,
    modelValue: l,
    month: P,
    year: B,
    time: O,
    disabledTimesConfig: te,
    today: h2,
    validateTime: x,
    getCalendarDays: ua,
    getMarker: la,
    handleScroll: Wt,
    handleSwipe: Lt,
    handleArrow: ra,
    selectDate: za,
    updateMonthYear: qa,
    presetDate: Ua,
    selectCurrentDate: Ja,
    updateTime: (T) => {
      const z = Za(T)
      ;(L(T, Ga), z && v(z, l.value[z === 'range-start' ? 0 : 1]))
    },
    assignMonthAndYear: a,
    setStartTime: H
  }
}
var Pl = () => {
  const {
      isModelAuto: e,
      matchDate: A,
      isDateAfter: f,
      isDateBefore: o,
      isDateBetween: c,
      isDateEqual: s,
      getWeekFromDate: r,
      getBeforeAndAfterInRange: u
    } = We(),
    {
      getDate: v,
      today: Y,
      rootProps: P,
      defaults: { multiCalendars: B, multiDates: O, ui: l, highlight: w, safeDates: h2, range: _ },
      modelValue: b
    } = Me(),
    { isDisabled: E } = Ue(),
    k = ref(null),
    g = (a) => {
      ;(!a.current && P.hideOffsetDates) || (k.value = a.value)
    },
    M = () => {
      k.value = null
    },
    R = (a) =>
      Array.isArray(b.value) && _.value.enabled && b.value[0] && k.value
        ? a
          ? f(k.value, b.value[0])
          : o(k.value, b.value[0])
        : true,
    $ = (a, n) => {
      const C = () => (b.value ? (n ? b.value[0] || null : b.value[1]) : null),
        m = b.value && Array.isArray(b.value) ? C() : null
      return s(v(a.value), m)
    },
    S = (a) => {
      const n = Array.isArray(b.value) ? b.value[0] : null
      return a ? !o(k.value, n) : true
    },
    p = (a, n = true) =>
      (_.value.enabled || P.weekPicker) && Array.isArray(b.value) && b.value.length === 2
        ? P.hideOffsetDates && !a.current
          ? false
          : s(v(a.value), b.value[n ? 0 : 1])
        : _.value.enabled
          ? ($(a, n) && S(n)) || (s(a.value, Array.isArray(b.value) ? b.value[0] : null) && R(n))
          : false,
    D = (a, n) => {
      if (Array.isArray(b.value) && b.value[0] && b.value.length === 1) {
        const C = s(a.value, k.value)
        return n ? f(b.value[0], a.value) && C : o(b.value[0], a.value) && C
      }
      return false
    },
    V = (a) =>
      !b.value || (P.hideOffsetDates && !a.current)
        ? false
        : _.value.enabled
          ? P.modelAuto && Array.isArray(b.value)
            ? s(a.value, b.value[0] ?? Y)
            : false
          : O.value.enabled && Array.isArray(b.value)
            ? b.value.some((n) => s(n, a.value))
            : s(a.value, b.value ? b.value : Y),
    F = (a) => {
      if (_.value.autoRange || P.weekPicker) {
        if (k.value) {
          if (P.hideOffsetDates && !a.current) return false
          const n = addDays(k.value, +_.value.autoRange),
            C = r(v(k.value), P.weekStart)
          return P.weekPicker ? s(C[1], v(a.value)) : s(n, v(a.value))
        }
        return false
      }
      return false
    },
    L = (a) => {
      if (_.value.autoRange || P.weekPicker) {
        if (k.value) {
          const n = addDays(k.value, +_.value.autoRange)
          if (P.hideOffsetDates && !a.current) return false
          const C = r(v(k.value), P.weekStart)
          return P.weekPicker ? f(a.value, C[0]) && o(a.value, C[1]) : f(a.value, k.value) && o(a.value, n)
        }
        return false
      }
      return false
    },
    ne = (a) => {
      if (_.value.autoRange || P.weekPicker) {
        if (k.value) {
          if (P.hideOffsetDates && !a.current) return false
          const n = r(v(k.value), P.weekStart)
          return P.weekPicker ? s(n[0], a.value) : s(k.value, a.value)
        }
        return false
      }
      return false
    },
    re2 = (a) => c(b.value, k.value, a.value),
    X = () => (P.modelAuto && Array.isArray(b.value) ? !!b.value[0] : false),
    x = () => (P.modelAuto ? e(b.value) : true),
    te = (a) => {
      if (P.weekPicker) return false
      const n = _.value.enabled ? !p(a) && !p(a, false) : true
      return !E(a.value) && !V(a) && !(!a.current && P.hideOffsetDates) && n
    },
    q = (a) => (_.value.enabled ? (P.modelAuto ? X() && V(a) : false) : V(a)),
    oe = (a) => (w.value ? A(a.value, h2.value.highlight) : false),
    K = (a) => {
      const n = E(a.value)
      return n && (typeof w.value == 'function' ? !w.value(a.value, n) : !w.value.options.highlightDisabled)
    },
    Z = (a) => {
      var _a2
      return typeof w.value == 'function'
        ? w.value(a.value)
        : (_a2 = w.value.weekdays) == null
          ? void 0
          : _a2.includes(a.value.getDay())
    },
    de = (a) =>
      (_.value.enabled || P.weekPicker) &&
      (!(B.value.count > 0) || a.current) &&
      x() &&
      !(!a.current && P.hideOffsetDates) &&
      !V(a)
        ? re2(a)
        : false,
    G = (a) => {
      if (Array.isArray(b.value) && b.value.length === 1) {
        const { before: n, after: C } = u(+_.value.maxRange, b.value[0])
        return isBefore(a.value, n) || isAfter(a.value, C)
      }
      return false
    },
    ce = (a) => {
      if (Array.isArray(b.value) && b.value.length === 1) {
        const { before: n, after: C } = u(+_.value.minRange, b.value[0])
        return c([n, C], b.value[0], a.value)
      }
      return false
    },
    le = (a) =>
      _.value.enabled && (_.value.maxRange || _.value.minRange)
        ? _.value.maxRange && _.value.minRange
          ? G(a) || ce(a)
          : _.value.maxRange
            ? G(a)
            : ce(a)
        : false,
    we = (a) => {
      const { isRangeStart: n, isRangeEnd: C } = I(a),
        m = _.value.enabled ? n || C : false
      return {
        dp__cell_offset: !a.current,
        dp__pointer: !P.disabled && !(!a.current && P.hideOffsetDates) && !E(a.value) && !le(a),
        dp__cell_disabled: E(a.value) || le(a),
        dp__cell_highlight: !K(a) && (oe(a) || Z(a)) && !q(a) && !m && !ne(a) && !(de(a) && P.weekPicker) && !C,
        dp__cell_highlight_active: !K(a) && (oe(a) || Z(a)) && q(a),
        dp__today: !P.noToday && s(a.value, Y) && a.current,
        'dp--past': o(a.value, Y),
        'dp--future': f(a.value, Y)
      }
    },
    ve = (a) => ({
      dp__active_date: q(a),
      dp__date_hover: te(a)
    }),
    Ae = (a) => {
      if (b.value && !Array.isArray(b.value)) {
        const n = r(b.value, P.weekStart)
        return {
          ...Ce(a),
          dp__range_start: s(n[0], a.value),
          dp__range_end: s(n[1], a.value),
          dp__range_between_week: f(a.value, n[0]) && o(a.value, n[1])
        }
      }
      return {
        ...Ce(a)
      }
    },
    Q = (a) => {
      if (b.value && Array.isArray(b.value)) {
        const n = r(b.value[0], P.weekStart),
          C = b.value[1] ? r(b.value[1], P.weekStart) : []
        return {
          ...Ce(a),
          dp__range_start: s(n[0], a.value) || s(C[0], a.value),
          dp__range_end: s(n[1], a.value) || s(C[1], a.value),
          dp__range_between_week: (f(a.value, n[0]) && o(a.value, n[1])) || (f(a.value, C[0]) && o(a.value, C[1])),
          dp__range_between: f(a.value, n[1]) && o(a.value, C[0])
        }
      }
      return {
        ...Ce(a)
      }
    },
    I = (a) => {
      const n = B.value.count > 0 ? a.current && p(a) && x() : p(a) && x(),
        C = B.value.count > 0 ? a.current && p(a, false) && x() : p(a, false) && x()
      return { isRangeStart: n, isRangeEnd: C }
    },
    y = (a) =>
      _.value.enabled && (_.value.fixedStart || _.value.fixedEnd) && Array.isArray(b.value) && b.value.length === 2,
    H = (a, n, C, m) =>
      !y(b.value) || !k.value
        ? false
        : n
          ? _.value.fixedEnd && s(a.value, k.value) && isBefore(a.value, b.value[0]) && !C
          : _.value.fixedStart && s(a.value, k.value) && isAfter(a.value, b.value[1]) && !m,
    fe = (a, n) =>
      !y(b.value) || !k.value
        ? false
        : n
          ? _.value.fixedEnd && isAfter(a.value, k.value) && isBefore(a.value, b.value[0])
          : _.value.fixedStart && isBefore(a.value, k.value) && isAfter(a.value, b.value[1]),
    Pe = (a) => {
      const { isRangeStart: n, isRangeEnd: C } = I(a)
      return {
        dp__range_start: n,
        dp__range_end: C,
        dp__range_between: de(a),
        dp__date_hover: s(a.value, k.value) && !n && !C && !P.weekPicker,
        dp__date_hover_start: D(a, true) || H(a, true, n, C),
        dp__date_hover_end: D(a, false) || H(a, false, n, C),
        'dp--extended-fixed-start': fe(a, true),
        'dp--extended-fixed-end': fe(a, false)
      }
    },
    Ce = (a) => ({
      ...Pe(a),
      dp__cell_auto_range: L(a),
      dp__cell_auto_range_start: ne(a),
      dp__cell_auto_range_end: F(a)
    }),
    i = (a) =>
      _.value.enabled
        ? _.value.autoRange
          ? Ce(a)
          : P.modelAuto
            ? { ...ve(a), ...Pe(a) }
            : P.weekPicker
              ? Q(a)
              : Pe(a)
        : P.weekPicker
          ? Ae(a)
          : ve(a)
  return {
    setHoverDate: g,
    clearHoverDate: M,
    getDayClassData: (a) =>
      P.hideOffsetDates && !a.current
        ? {}
        : {
            ...we(a),
            ...i(a),
            [l.value.dayClass ? l.value.dayClass(a.value, b.value) : '']: true,
            ...l.value.calendarCell
          }
  }
}
var Tl = { key: 0 }
var $l = defineComponent({
  __name: 'DatePicker',
  props: mergeDefaults(
    {
      flowStep: {},
      collapse: { type: Boolean },
      menuWrapRef: {},
      noOverlayFocus: { type: Boolean }
    },
    Ar
  ),
  emits: ['mount', 'update-flow-step', 'reset-flow', 'focus-menu', 'select-date', 'time-update', 'auto-apply'],
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      {
        month: s,
        year: r,
        modelValue: u,
        time: v,
        disabledTimesConfig: Y,
        today: P,
        validateTime: B,
        getCalendarDays: O,
        getMarker: l,
        handleArrow: w,
        handleScroll: h2,
        handleSwipe: _,
        selectDate: b,
        updateMonthYear: E,
        presetDate: k,
        selectCurrentDate: g,
        updateTime: M,
        assignMonthAndYear: R,
        setStartTime: $
      } = Al(c, o, ve, Ae),
      S = useSlots(),
      { setHoverDate: p, getDayClassData: D, clearHoverDate: V } = Pl(),
      {
        getDate: F,
        rootEmit: L,
        rootProps: ne,
        defaults: { multiCalendars: re2, timeConfig: X }
      } = Me(),
      { getYears: x, getMonths: te } = ea(),
      { getCellId: q } = We(),
      oe = useTemplateRef('calendar-header'),
      K = useTemplateRef('calendar'),
      Z = useTemplateRef('time-picker'),
      de = lt(S, at.Calendar),
      G = lt(S, at.DatePickerHeader),
      ce = lt(S, at.TimePicker),
      le = (d) => {
        o('mount', d)
      }
    watch(
      re2,
      (d, a) => {
        d.count - a.count > 0 && R()
      },
      { deep: true }
    )
    const we = computed(
      () => (d) =>
        O(s.value(d), r.value(d)).map((a) => ({
          ...a,
          days: a.days.map((n) => ((n.marker = l(n)), (n.classData = D(n)), n))
        }))
    )
    function ve(d) {
      var _a2, _b, _c
      d || d === 0
        ? (_b = (_a2 = K.value) == null ? void 0 : _a2[d]) == null
          ? void 0
          : _b.triggerTransition(s.value(d), r.value(d))
        : (_c = K.value) == null
          ? void 0
          : _c.forEach((a, n) => (a == null ? void 0 : a.triggerTransition(s.value(n), r.value(n))))
    }
    function Ae() {
      o('update-flow-step')
    }
    const Q = (d, a, n = 0) => {
        var _a2, _b
        ;(_b = (_a2 = oe.value) == null ? void 0 : _a2[n]) == null ? void 0 : _b.toggleMonthPicker(d, a)
      },
      I = (d, a, n = 0) => {
        var _a2, _b
        ;(_b = (_a2 = oe.value) == null ? void 0 : _a2[n]) == null ? void 0 : _b.toggleYearPicker(d, a)
      },
      y = (d, a, n) => {
        var _a2
        ;(_a2 = Z.value) == null ? void 0 : _a2.toggleTimePicker(d, a, n)
      },
      H = (d, a) => {
        var _a2
        if (!ne.range) {
          const n = u.value ? u.value : P,
            C = a ? F(a) : n,
            m = d ? startOfWeek(C, { weekStartsOn: 1 }) : endOfWeek(C, { weekStartsOn: 1 })
          ;(b({
            value: m,
            current: getMonth(C) === s.value(0),
            text: '',
            classData: {}
          }),
            (_a2 = document.getElementById(q(m))) == null ? void 0 : _a2.focus())
        }
      },
      fe = (d) => {
        var _a2, _b
        ;(_b = (_a2 = oe.value) == null ? void 0 : _a2[0]) == null ? void 0 : _b.handleMonthYearChange(d, true)
      },
      Pe = (d) => {
        E(0, { month: s.value(0), year: r.value(0) + (d ? 1 : -1), fromNav: true })
      },
      Ce = (d) => {
        ;(L('overlay-toggle', { open: false, overlay: d }), o('focus-menu'))
      }
    return (
      A({
        clearHoverDate: V,
        presetDate: k,
        selectCurrentDate: g,
        handleArrow: w,
        updateMonthYear: E,
        setStartTime: $,
        toggleMonthPicker: Q,
        toggleYearPicker: I,
        toggleTimePicker: y,
        getSidebarProps: () => ({
          modelValue: u,
          month: s,
          year: r,
          time: v,
          updateTime: M,
          updateMonthYear: E,
          selectDate: b,
          presetDate: k
        }),
        changeMonth: fe,
        changeYear: Pe,
        selectWeekDate: H
      }),
      (d, a) => (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              aa,
              { collapse: e.collapse },
              {
                default: withCtx(({ instances: n, wrapClass: C }) => [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(
                      n,
                      (m) => (
                        openBlock(),
                        createElementBlock(
                          'div',
                          {
                            key: m,
                            class: normalizeClass(C)
                          },
                          [
                            unref(ne).hideMonthYearSelect
                              ? createCommentVNode('', true)
                              : (openBlock(),
                                createBlock(
                                  gl,
                                  {
                                    key: 0,
                                    ref_for: true,
                                    ref: 'calendar-header',
                                    months: unref(te)(),
                                    years: unref(x)(),
                                    month: unref(s)(m),
                                    year: unref(r)(m),
                                    instance: m,
                                    'menu-wrap-ref': e.menuWrapRef,
                                    onMount: a[0] || (a[0] = (N) => le(unref(bt).header)),
                                    onResetFlow: a[1] || (a[1] = (N) => d.$emit('reset-flow')),
                                    onUpdateMonthYear: (N) => unref(E)(m, N),
                                    onOverlayClosed: Ce
                                  },
                                  createSlots({ _: 2 }, [
                                    renderList(unref(G), (N, U) => ({
                                      name: N,
                                      fn: withCtx((pe) => [renderSlot(d.$slots, N, mergeProps({ ref_for: true }, pe))])
                                    }))
                                  ]),
                                  1032,
                                  ['months', 'years', 'month', 'year', 'instance', 'menu-wrap-ref', 'onUpdateMonthYear']
                                )),
                            createVNode(
                              _l,
                              {
                                ref_for: true,
                                ref: 'calendar',
                                'mapped-dates': we.value(m),
                                instance: m,
                                month: unref(s)(m),
                                year: unref(r)(m),
                                onSelectDate: (N) => unref(b)(N, m !== 1),
                                onSetHoverDate: a[2] || (a[2] = (N) => unref(p)(N)),
                                onHandleScroll: (N) => unref(h2)(N, m),
                                onHandleSwipe: (N) => unref(_)(N, m),
                                onMount: a[3] || (a[3] = (N) => le(unref(bt).calendar))
                              },
                              createSlots({ _: 2 }, [
                                renderList(unref(de), (N, U) => ({
                                  name: N,
                                  fn: withCtx((pe) => [renderSlot(d.$slots, N, mergeProps({ ref_for: true }, pe))])
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
            unref(X).enableTimePicker
              ? (openBlock(),
                createElementBlock('div', Tl, [
                  renderSlot(
                    d.$slots,
                    'time-picker',
                    normalizeProps(guardReactiveProps({ time: unref(v), updateTime: unref(M) })),
                    () => [
                      createVNode(
                        La,
                        {
                          ref: 'time-picker',
                          hours: unref(v).hours,
                          minutes: unref(v).minutes,
                          seconds: unref(v).seconds,
                          'disabled-times-config': unref(Y),
                          'validate-time': unref(B),
                          'no-overlay-focus': e.noOverlayFocus,
                          onMount: a[4] || (a[4] = (n) => le(unref(bt).timePicker)),
                          'onUpdate:hours':
                            a[5] ||
                            (a[5] = (n) =>
                              unref(M)({ hours: n, minutes: unref(v).minutes, seconds: unref(v).seconds })),
                          'onUpdate:minutes':
                            a[6] ||
                            (a[6] = (n) => unref(M)({ hours: unref(v).hours, minutes: n, seconds: unref(v).seconds })),
                          'onUpdate:seconds':
                            a[7] ||
                            (a[7] = (n) => unref(M)({ hours: unref(v).hours, minutes: unref(v).minutes, seconds: n })),
                          onResetFlow: a[8] || (a[8] = (n) => d.$emit('reset-flow'))
                        },
                        createSlots({ _: 2 }, [
                          renderList(unref(ce), (n, C) => ({
                            name: n,
                            fn: withCtx((m) => [renderSlot(d.$slots, n, normalizeProps(guardReactiveProps(m)))])
                          }))
                        ]),
                        1032,
                        ['hours', 'minutes', 'seconds', 'disabled-times-config', 'validate-time', 'no-overlay-focus']
                      )
                    ]
                  )
                ]))
              : createCommentVNode('', true)
          ],
          64
        )
      )
    )
  }
})
var Sl = (e, A) => {
  const {
      getDate: f,
      modelValue: o,
      year: c,
      calendars: s,
      defaults: { highlight: r, range: u, multiDates: v }
    } = Me(),
    { isDateBetween: Y, isDateEqual: P } = We(),
    { checkRangeAutoApply: B, handleMultiDatesSelect: O, setMonthOrYearRange: l } = na()
  Ft()
  const { isDisabled: w } = Ue(),
    { formatQuarterText: h2 } = pt(),
    {
      selectYear: _,
      groupedYears: b,
      showYearPicker: E,
      isDisabled: k,
      toggleYearPicker: g,
      handleYearSelect: M,
      handleYear: R,
      setStartDate: $
    } = Wa(A),
    S = ref()
  onMounted(() => {
    $()
  })
  const p = computed(
      () => (q) =>
        o.value
          ? Array.isArray(o.value)
            ? o.value.some((oe) => isSameQuarter(q, oe))
            : isSameQuarter(o.value, q)
          : false
    ),
    D = (q) => {
      if (u.value.enabled) {
        if (Array.isArray(o.value)) {
          const oe = P(q, o.value[0]) || P(q, o.value[1])
          return Y(o.value, S.value, q) && !oe
        }
        return false
      }
      return false
    },
    V = (q, oe) => q.quarter === getQuarter(oe) && q.year === getYear(oe),
    F = (q) =>
      typeof r.value == 'function'
        ? r.value({ quarter: getQuarter(q), year: getYear(q) })
        : r.value.quarters.some((oe) => V(oe, q)),
    L = computed(() => (q) => {
      const oe = set(f(), { year: c.value(q) })
      return eachQuarterOfInterval({
        start: startOfYear(oe),
        end: endOfYear(oe)
      }).map((K) => {
        const Z = startOfQuarter(K),
          de = endOfQuarter(K),
          G = w(K),
          ce = D(Z),
          le = F(Z)
        return {
          text: h2(Z, de),
          value: Z,
          active: p.value(Z),
          highlighted: le,
          disabled: G,
          isBetween: ce
        }
      })
    }),
    ne = (q) => {
      ;(O(q, v.value.limit), A('auto-apply', true))
    },
    re2 = (q) => {
      ;((o.value = l(q)), B(o.value, A, o.value.length < 2))
    },
    X = (q) => {
      ;((o.value = q), A('auto-apply'))
    }
  return {
    groupedYears: b,
    year: c,
    isDisabled: k,
    quarters: L,
    showYearPicker: E,
    modelValue: o,
    selectYear: _,
    toggleYearPicker: g,
    handleYearSelect: M,
    handleYear: R,
    setHoverDate: (q) => {
      S.value = q
    },
    selectQuarter: (q, oe, K) => {
      if (!K)
        return (
          (s.value[oe].month = getMonth(endOfQuarter(q))),
          v.value.enabled ? ne(q) : u.value.enabled ? re2(q) : X(q)
        )
    }
  }
}
var Rl = { class: 'dp--quarter-items' }
var Cl = ['data-test-id', 'disabled', 'onClick', 'onMouseover']
var xl = defineComponent({
  __name: 'QuarterPicker',
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ['reset-flow', 'auto-apply'],
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e,
      {
        defaults: { config: s }
      } = Me(),
      r = useSlots(),
      { boolHtmlAttribute: u } = Pt(),
      v = lt(r, at.YearMode),
      {
        groupedYears: Y,
        year: P,
        isDisabled: B,
        quarters: O,
        modelValue: l,
        showYearPicker: w,
        setHoverDate: h2,
        selectQuarter: _,
        toggleYearPicker: b,
        handleYearSelect: E,
        handleYear: k
      } = Sl(c, o)
    return (
      A({
        getSidebarProps: () => ({
          modelValue: l,
          year: P,
          selectQuarter: _,
          handleYearSelect: E,
          handleYear: k
        })
      }),
      (M, R) => (
        openBlock(),
        createBlock(
          aa,
          {
            collapse: e.collapse,
            stretch: ''
          },
          {
            default: withCtx(({ instances: $, wrapClass: S }) => [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(
                  $,
                  (p) => (
                    openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: p,
                        class: normalizeClass(S)
                      },
                      [
                        createBaseVNode(
                          'div',
                          {
                            class: 'dp-quarter-picker-wrap',
                            style: normalizeStyle({ minHeight: `${unref(s).modeHeight}px` })
                          },
                          [
                            M.$slots['top-extra']
                              ? renderSlot(M.$slots, 'top-extra', {
                                  key: 0,
                                  value: unref(l)
                                })
                              : createCommentVNode('', true),
                            createBaseVNode('div', null, [
                              createVNode(
                                Na,
                                {
                                  items: unref(Y)(p),
                                  instance: p,
                                  'show-year-picker': unref(w)[p],
                                  year: unref(P)(p),
                                  'is-disabled': (D) => unref(B)(p, D),
                                  onHandleYear: (D) => unref(k)(p, D),
                                  onYearSelect: (D) => unref(E)(D, p),
                                  onToggleYearPicker: (D) =>
                                    unref(b)(p, D == null ? void 0 : D.flow, D == null ? void 0 : D.show)
                                },
                                createSlots({ _: 2 }, [
                                  renderList(unref(v), (D, V) => ({
                                    name: D,
                                    fn: withCtx((F) => [renderSlot(M.$slots, D, mergeProps({ ref_for: true }, F))])
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
                            createBaseVNode('div', Rl, [
                              (openBlock(true),
                              createElementBlock(
                                Fragment,
                                null,
                                renderList(
                                  unref(O)(p),
                                  (D, V) => (
                                    openBlock(),
                                    createElementBlock('div', { key: V }, [
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
                                          'data-dp-action-element': '0',
                                          'data-test-id': D.value,
                                          disabled: unref(u)(D.disabled),
                                          onClick: (F) => unref(_)(D.value, p, D.disabled),
                                          onMouseover: (F) => unref(h2)(D.value)
                                        },
                                        [
                                          renderSlot(
                                            M.$slots,
                                            'quarter',
                                            {
                                              value: D.value,
                                              text: D.text
                                            },
                                            () => [createTextVNode(toDisplayString(D.text), 1)]
                                          )
                                        ],
                                        42,
                                        Cl
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
var Ol = ['id', 'tabindex', 'role', 'aria-label']
var Yl = {
  key: 0,
  class: 'dp--menu-load-container'
}
var Bl = {
  key: 1,
  class: 'dp--menu-header'
}
var Il = ['data-dp-mobile']
var El = {
  key: 0,
  class: 'dp__sidebar_left'
}
var Vl = ['data-dp-mobile']
var Fl = ['data-test-id', 'data-dp-mobile', 'onClick', 'onKeydown']
var Nl = { class: 'dp__instance_calendar' }
var Wl = {
  key: 2,
  class: 'dp__sidebar_right'
}
var Ll = {
  key: 2,
  class: 'dp__action_extra'
}
var Hl = defineComponent({
  __name: 'DatepickerMenu',
  props: {
    collapse: { type: Boolean },
    noOverlayFocus: { type: Boolean },
    getInputRect: { type: Function }
  },
  emits: ['close-picker', 'select-date', 'auto-apply', 'time-update', 'menu-blur'],
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = useSlots(),
      {
        state: s,
        rootProps: r,
        defaults: { textInput: u, inline: v, config: Y, ui: P, ariaLabels: B },
        setState: O
      } = Me(),
      { isMobile: l } = Zt(),
      { handleEventPropagation: w, getElWithin: h2, checkStopPropagation: _, checkKeyDown: b } = Ie()
    In()
    const E = useTemplateRef('inner-menu'),
      k = useTemplateRef('dp-menu'),
      g = useTemplateRef('dyn-cmp'),
      M = ref(0),
      R = ref(false),
      $ = ref(false),
      { flowStep: S, updateFlowStep: p, childMount: D, resetFlow: V, handleFlow: F } = Vn(g),
      L = (i) => {
        ;(($.value = true), Y.value.allowPreventDefault && i.preventDefault(), _(i, Y.value, true))
      }
    ;(onMounted(() => {
      ;((R.value = true), ne(), globalThis.addEventListener('resize', ne))
      const i = unrefElement(k)
      ;(i && !u.value.enabled && !v.value.enabled && O('menuFocused', true),
        i && (i.addEventListener('pointerdown', L), i.addEventListener('mousedown', L)),
        document.addEventListener('mousedown', Pe))
    }),
      onUnmounted(() => {
        ;(globalThis.removeEventListener('resize', ne), document.removeEventListener('mousedown', Pe))
        const i = unrefElement(k)
        i && (i.removeEventListener('pointerdown', L), i.removeEventListener('mousedown', L))
      }))
    const ne = () => {
        const i = unrefElement(E)
        i && (M.value = i.getBoundingClientRect().width)
      },
      re2 = computed(() => (r.monthPicker ? Ur : r.yearPicker ? Jr : r.timePicker ? cl : r.quarterPicker ? xl : $l)),
      X = () => {
        const i = unrefElement(k)
        i && i.focus({ preventScroll: true })
      },
      x = computed(() => {
        var _a2
        return ((_a2 = g.value) == null ? void 0 : _a2.getSidebarProps()) || {}
      }),
      te = lt(c, at.ActionRow),
      q = lt(c, at.PassTrough),
      oe = computed(() => ({
        dp__menu_disabled: r.disabled,
        dp__menu_readonly: r.readonly,
        'dp-menu-loading': r.loading
      })),
      K = computed(() => ({
        dp__menu: true,
        dp__menu_index: !v.value.enabled,
        dp__relative: v.value.enabled,
        ...P.value.menu
      })),
      Z = (i) => {
        _(i, Y.value, true)
      },
      de = (i) => {
        Y.value.escClose && (o('close-picker'), w(i, Y.value))
      },
      G = (i) => {
        r.arrowNavigation ||
          (i === Xe.left || i === Xe.up
            ? ve('handleArrow', Xe.left, 0, i === Xe.up)
            : ve('handleArrow', Xe.right, 0, i === Xe.down))
      },
      ce = (i) => {
        ;(O('shiftKeyInMenu', i.shiftKey),
          !r.hideMonthYearSelect &&
            i.code === $e.tab &&
            i.target.classList.contains('dp__menu') &&
            s.shiftKeyInMenu &&
            (i.preventDefault(), _(i, Y.value, true), o('close-picker')))
      },
      le = (i) => {
        var _a2, _b, _c
        ;((_a2 = g.value) == null ? void 0 : _a2.toggleTimePicker(false, false),
          (_b = g.value) == null ? void 0 : _b.toggleMonthPicker(false, false, i),
          (_c = g.value) == null ? void 0 : _c.toggleYearPicker(false, false, i))
      },
      we = (i, d = 0) => {
        var _a2, _b, _c
        return i === 'month'
          ? (_a2 = g.value) == null
            ? void 0
            : _a2.toggleMonthPicker(false, true, d)
          : i === 'year'
            ? (_b = g.value) == null
              ? void 0
              : _b.toggleYearPicker(false, true, d)
            : i === 'time'
              ? (_c = g.value) == null
                ? void 0
                : _c.toggleTimePicker(true, false)
              : le(d)
      },
      ve = (i, ...d) => {
        var _a2, _b
        ;((_a2 = g.value) == null ? void 0 : _a2[i]) && ((_b = g.value) == null ? void 0 : _b[i](...d))
      },
      Ae = () => {
        ve('selectCurrentDate')
      },
      Q = (i) => {
        ve('presetDate', toValue(i))
      },
      I = () => {
        ve('clearHoverDate')
      },
      y = (i, d) => {
        ve('updateMonthYear', i, d)
      },
      H = (i, d) => {
        ;(i.preventDefault(), G(d))
      },
      fe = (i) => {
        var _a2, _b, _c
        if ((ce(i), i.key === $e.home || i.key === $e.end))
          return ve('selectWeekDate', i.key === $e.home, i.target.getAttribute('id'))
        switch (
          ((i.key === $e.pageUp || i.key === $e.pageDown) &&
            (i.shiftKey
              ? (ve('changeYear', i.key === $e.pageUp),
                (_a2 = h2(k.value, 'overlay-year')) == null ? void 0 : _a2.focus())
              : (ve('changeMonth', i.key === $e.pageUp),
                (_b = h2(k.value, i.key === $e.pageUp ? 'action-prev' : 'action-next')) == null ? void 0 : _b.focus()),
            i.target.getAttribute('id') && ((_c = k.value) == null ? void 0 : _c.focus({ preventScroll: true }))),
          i.key)
        ) {
          case $e.esc:
            return de(i)
          case $e.arrowLeft:
            return H(i, Xe.left)
          case $e.arrowRight:
            return H(i, Xe.right)
          case $e.arrowUp:
            return H(i, Xe.up)
          case $e.arrowDown:
            return H(i, Xe.down)
          default:
            return
        }
      },
      Pe = (i) => {
        var _a2
        v.value.enabled &&
          !v.value.input &&
          !((_a2 = k.value) == null ? void 0 : _a2.contains(i.target)) &&
          $.value &&
          (($.value = false), o('menu-blur'))
      }
    return (
      A({
        updateMonthYear: y,
        switchView: we,
        onValueCleared: () => {
          var _a2, _b
          ;(_b = (_a2 = g.value) == null ? void 0 : _a2.setStartTime) == null ? void 0 : _b.call(_a2)
        },
        handleFlow: F
      }),
      (i, d) => {
        var _a2, _b, _c
        return (
          openBlock(),
          createElementBlock(
            'div',
            {
              id: unref(r).menuId,
              ref: 'dp-menu',
              tabindex: unref(v).enabled ? void 0 : '0',
              role: unref(v).enabled ? void 0 : 'dialog',
              'aria-label': (_a2 = unref(B)) == null ? void 0 : _a2.menu,
              class: normalizeClass(K.value),
              onMouseleave: I,
              onClick: Z,
              onKeydown: fe
            },
            [
              ((unref(r).disabled || unref(r).readonly) && unref(v).enabled) || unref(r).loading
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: normalizeClass(oe.value)
                    },
                    [
                      unref(r).loading
                        ? (openBlock(),
                          createElementBlock('div', Yl, [
                            ...(d[5] || (d[5] = [createBaseVNode('span', { class: 'dp--menu-loader' }, null, -1)]))
                          ]))
                        : createCommentVNode('', true)
                    ],
                    2
                  ))
                : createCommentVNode('', true),
              i.$slots['menu-header']
                ? (openBlock(), createElementBlock('div', Bl, [renderSlot(i.$slots, 'menu-header')]))
                : createCommentVNode('', true),
              renderSlot(i.$slots, 'arrow'),
              createBaseVNode(
                'div',
                {
                  ref: 'inner-menu',
                  class: normalizeClass({
                    dp__menu_content_wrapper:
                      ((_b = unref(r).presetDates) == null ? void 0 : _b.length) ||
                      !!i.$slots['left-sidebar'] ||
                      !!i.$slots['right-sidebar'],
                    'dp--menu-content-wrapper-collapsed':
                      e.collapse &&
                      (((_c = unref(r).presetDates) == null ? void 0 : _c.length) ||
                        !!i.$slots['left-sidebar'] ||
                        !!i.$slots['right-sidebar'])
                  }),
                  'data-dp-mobile': unref(l),
                  style: normalizeStyle({ '--dp-menu-width': `${M.value}px` })
                },
                [
                  i.$slots['left-sidebar']
                    ? (openBlock(),
                      createElementBlock('div', El, [
                        renderSlot(i.$slots, 'left-sidebar', normalizeProps(guardReactiveProps(x.value)))
                      ]))
                    : createCommentVNode('', true),
                  unref(r).presetDates.length
                    ? (openBlock(),
                      createElementBlock(
                        'div',
                        {
                          key: 1,
                          class: normalizeClass({ 'dp--preset-dates-collapsed': e.collapse, 'dp--preset-dates': true }),
                          'data-dp-mobile': unref(l)
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(
                              unref(r).presetDates,
                              (a, n) => (
                                openBlock(),
                                createElementBlock(
                                  Fragment,
                                  { key: n },
                                  [
                                    a.slot
                                      ? renderSlot(i.$slots, a.slot, {
                                          key: 0,
                                          presetDate: Q,
                                          label: a.label,
                                          value: a.value
                                        })
                                      : (openBlock(),
                                        createElementBlock(
                                          'button',
                                          {
                                            key: 1,
                                            type: 'button',
                                            style: normalizeStyle(a.style || {}),
                                            class: normalizeClass([
                                              'dp__btn dp--preset-range',
                                              { 'dp--preset-range-collapsed': e.collapse }
                                            ]),
                                            'data-test-id': a.testId ?? void 0,
                                            'data-dp-mobile': unref(l),
                                            onClick: withModifiers((C) => Q(a.value), ['prevent']),
                                            onKeydown: (C) => unref(b)(C, () => Q(a.value), true)
                                          },
                                          toDisplayString(a.label),
                                          47,
                                          Fl
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
                        Vl
                      ))
                    : createCommentVNode('', true),
                  createBaseVNode('div', Nl, [
                    (openBlock(),
                    createBlock(
                      resolveDynamicComponent(re2.value),
                      {
                        ref: 'dyn-cmp',
                        'flow-step': unref(S),
                        collapse: e.collapse,
                        'no-overlay-focus': e.noOverlayFocus,
                        'menu-wrap-ref': k.value,
                        onMount: unref(D),
                        onUpdateFlowStep: unref(p),
                        onResetFlow: unref(V),
                        onFocusMenu: X,
                        onSelectDate: d[0] || (d[0] = (a) => i.$emit('select-date')),
                        onAutoApply: d[1] || (d[1] = (a) => i.$emit('auto-apply', a)),
                        onTimeUpdate: d[2] || (d[2] = (a) => i.$emit('time-update'))
                      },
                      createSlots({ _: 2 }, [
                        renderList(unref(q), (a, n) => ({
                          name: a,
                          fn: withCtx((C) => [renderSlot(i.$slots, a, normalizeProps(guardReactiveProps({ ...C })))])
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
                  i.$slots['right-sidebar']
                    ? (openBlock(),
                      createElementBlock('div', Wl, [
                        renderSlot(i.$slots, 'right-sidebar', normalizeProps(guardReactiveProps(x.value)))
                      ]))
                    : createCommentVNode('', true)
                ],
                14,
                Il
              ),
              i.$slots['action-extra']
                ? (openBlock(),
                  createElementBlock('div', Ll, [
                    i.$slots['action-extra']
                      ? renderSlot(i.$slots, 'action-extra', {
                          key: 0,
                          selectCurrentDate: Ae
                        })
                      : createCommentVNode('', true)
                  ]))
                : createCommentVNode('', true),
              !unref(r).autoApply || unref(Y).keepActionRow
                ? (openBlock(),
                  createBlock(
                    Fr,
                    {
                      key: 3,
                      'menu-mount': R.value,
                      'calendar-width': M.value,
                      onClosePicker: d[3] || (d[3] = (a) => i.$emit('close-picker')),
                      onSelectDate: d[4] || (d[4] = (a) => i.$emit('select-date')),
                      onSelectNow: Ae
                    },
                    createSlots({ _: 2 }, [
                      renderList(unref(te), (a, n) => ({
                        name: a,
                        fn: withCtx((C) => [renderSlot(i.$slots, a, normalizeProps(guardReactiveProps(C)))])
                      }))
                    ]),
                    1032,
                    ['menu-mount', 'calendar-width']
                  ))
                : createCommentVNode('', true)
            ],
            42,
            Ol
          )
        )
      }
    )
  }
})
var jl = ['data-dp-mobile']
var Kl = defineComponent({
  __name: 'VueDatePicker',
  setup(e, { expose: A }) {
    const {
        rootEmit: f,
        setState: o,
        inputValue: c,
        modelValue: s,
        rootProps: r,
        defaults: { inline: u, config: v, textInput: Y, range: P, multiDates: B, teleport: O, floatingConfig: l }
      } = Me(),
      { validateDate: w, isValidTime: h2 } = Ue(),
      { menuTransition: _, showTransition: b } = Vt(),
      { isMobile: E } = Zt(),
      { findNextFocusableElement: k, getNumVal: g } = Ie(),
      M = useSlots(),
      R = ref(false),
      $ = ref(u.value.enabled || r.centered),
      S = toRef(r, 'modelValue'),
      p = toRef(r, 'timezone'),
      D = useTemplateRef('dp-menu-wrap'),
      V = useTemplateRef('dp-menu'),
      F = useTemplateRef('input-cmp'),
      L = useTemplateRef('picker-wrapper'),
      ne = useTemplateRef('menu-arrow'),
      re2 = ref(false),
      X = ref(false),
      x = ref(false),
      te = ref(true),
      q = (se) => (
        l.value.arrow && se.push(arrow3({ element: l.value.arrow === true ? ne : l.value.arrow })),
        l.value.flip && se.push(flip2(typeof l.value.flip == 'object' ? l.value.flip : {})),
        l.value.shift && se.push(shift2(typeof l.value.shift == 'object' ? l.value.shift : {})),
        se
      ),
      {
        floatingStyles: oe,
        middlewareData: K,
        placement: Z,
        y: de
      } = useFloating(F, D, {
        strategy: l.value.strategy,
        placement: l.value.placement,
        middleware: q([offset2(l.value.offset)]),
        whileElementsMounted: autoUpdate
      })
    ;(onMounted(() => {
      ;(le(r.modelValue),
        nextTick().then(() => {
          u.value.enabled || globalThis.addEventListener('resize', Pe)
        }),
        u.value.enabled && (R.value = true),
        globalThis.addEventListener('keyup', Ce),
        globalThis.addEventListener('keydown', i))
    }),
      onUnmounted(() => {
        ;(u.value.enabled || globalThis.removeEventListener('resize', Pe),
          globalThis.removeEventListener('keyup', Ce),
          globalThis.removeEventListener('keydown', i))
      }))
    const G = Fa(M, r.presetDates),
      ce = lt(M, at.Input)
    ;(watch(
      [S, p],
      () => {
        le(S.value)
      },
      { deep: true }
    ),
      watch([Z, de], () => {
        !u.value.enabled &&
          !r.centered &&
          te.value &&
          (($.value = false),
          nextTick().then(() => {
            ;((te.value = false), ($.value = true))
          }))
      }))
    const { parseExternalModelValue: le, emitModelValue: we, formatInputValue: ve, checkBeforeEmit: Ae } = En(),
      Q = computed(() => ({
        dp__main: true,
        dp__theme_dark: r.dark,
        dp__theme_light: !r.dark,
        dp__flex_display: u.value.enabled,
        'dp--flex-display-collapsed': x.value,
        dp__flex_display_with_input: u.value.input
      })),
      I = computed(() => (r.dark ? 'dp__theme_dark' : 'dp__theme_light')),
      y = computed(() => u.value.enabled && (r.timePicker || r.monthPicker || r.yearPicker || r.quarterPicker)),
      H = () => {
        var _a2, _b
        return (
          ((_b = (_a2 = F.value) == null ? void 0 : _a2.$el) == null ? void 0 : _b.getBoundingClientRect()) ?? {
            width: 0,
            left: 0,
            right: 0
          }
        )
      },
      fe = () => {
        R.value && v.value.closeOnScroll && ge()
      },
      Pe = () => {
        var _a2
        const se = ((_a2 = V.value) == null ? void 0 : _a2.$el.getBoundingClientRect().width) ?? 0
        x.value = document.body.offsetWidth <= se
      },
      Ce = (se) => {
        ;(se.key === 'Tab' &&
          !u.value.enabled &&
          !r.teleport &&
          v.value.tabOutClosesMenu &&
          (L.value.contains(document.activeElement) || ge()),
          (X.value = se.shiftKey))
      },
      i = (se) => {
        X.value = se.shiftKey
      },
      d = () => {
        !r.disabled &&
          !r.readonly &&
          ((te.value = true), (R.value = true), R.value && f('open'), R.value || pe(), le(r.modelValue))
      },
      a = () => {
        var _a2, _b
        ;((c.value = ''),
          pe(),
          (_a2 = V.value) == null ? void 0 : _a2.onValueCleared(),
          (_b = F.value) == null ? void 0 : _b.setParsedDate(null),
          f('update:model-value', null),
          f('cleared'),
          v.value.closeOnClearValue && ge())
      },
      n = () => {
        const se = s.value
        return !se || (!Array.isArray(se) && w(se))
          ? true
          : Array.isArray(se)
            ? B.value.enabled || (se.length === 2 && w(se[0]) && w(se[1]))
              ? true
              : P.value.partialRange && !r.timePicker
                ? w(se[0])
                : false
            : false
      },
      C = () => {
        Ae() && n() ? (we(), ge()) : f('invalid-select')
      },
      m = (se) => {
        ;(N(), we(), v.value.closeOnAutoApply && !se && ge())
      },
      N = () => {
        F.value && Y.value.enabled && F.value.setParsedDate(s.value)
      },
      U = (se = false) => {
        r.autoApply &&
          h2(s.value) &&
          n() &&
          (P.value.enabled && Array.isArray(s.value) ? (P.value.partialRange || s.value.length === 2) && m(se) : m(se))
      },
      pe = () => {
        Y.value.enabled || (s.value = null)
      },
      ge = (se = false) => {
        ;((te.value = true),
          se && s.value && v.value.setDateOnMenuClose && C(),
          u.value.enabled ||
            (R.value &&
              ((R.value = false),
              o('menuFocused', false),
              o('shiftKeyInMenu', false),
              f('closed'),
              c.value && le(S.value)),
            pe(),
            f('blur')))
      },
      Qe = (se, Le, Je = false) => {
        if (!se) {
          s.value = null
          return
        }
        const St = Array.isArray(se) ? se.every((jt) => w(jt)) : w(se),
          ht = h2(se)
        St && ht
          ? (o('isTextInputDate', true),
            (s.value = se),
            Le ? ((re2.value = Je), C(), f('text-submit')) : r.autoApply && U(true),
            nextTick().then(() => {
              o('isTextInputDate', false)
            }))
          : f('invalid-date', se)
      },
      Tt = () => {
        ;(r.autoApply && h2(s.value) && we(), N())
      },
      Wt = () => (R.value ? ge() : d()),
      ra = (se) => {
        s.value = se
      },
      Lt = () => {
        ;(Y.value.enabled && (o('isInputFocused', true), ve()), f('focus'))
      },
      la = () => {
        var _a2
        ;(Y.value.enabled &&
          (o('isInputFocused', false),
          le(r.modelValue),
          re2.value && ((_a2 = k(L.value, X.value)) == null ? void 0 : _a2.focus())),
          f('blur'))
      },
      oa = (se, Le) => {
        V.value &&
          V.value.updateMonthYear(Le ?? 0, {
            month: g(se.month),
            year: g(se.year)
          })
      },
      sa = (se) => {
        le(se ?? r.modelValue)
      },
      $t = (se, Le) => {
        var _a2
        ;(_a2 = V.value) == null ? void 0 : _a2.switchView(se, Le)
      },
      ua = (se, Le) => {
        if (R.value) return v.value.onClickOutside ? v.value.onClickOutside(se, Le) : ge(true)
      },
      ia = (se = 0) => {
        var _a2
        ;(_a2 = V.value) == null ? void 0 : _a2.handleFlow(se)
      },
      Ht = () => D
    return (
      onClickOutside(D, (se) => ua(n, se), {
        ignore: [F]
      }),
      A({
        closeMenu: ge,
        selectDate: C,
        clearValue: a,
        openMenu: d,
        onScroll: fe,
        formatInputValue: ve,
        // exposed for testing purposes
        updateInternalModelValue: ra,
        // modify internal modelValue
        setMonthYear: oa,
        parseModel: sa,
        switchView: $t,
        toggleMenu: Wt,
        handleFlow: ia,
        getDpWrapMenuRef: Ht,
        dpMenuRef: () => V,
        dpWrapMenuRef: () => D,
        inputRef: () => F
      }),
      (se, Le) => (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref: 'picker-wrapper',
            class: normalizeClass(Q.value),
            'data-datepicker-instance': '',
            'data-dp-mobile': unref(E)
          },
          [
            createVNode(
              Yr,
              {
                ref: 'input-cmp',
                'is-menu-open': R.value,
                onClear: a,
                onOpen: d,
                onSetInputDate: Qe,
                onSetEmptyDate: unref(we),
                onSelectDate: C,
                onToggle: Wt,
                onClose: ge,
                onFocus: Lt,
                onBlur: la,
                onRealBlur: Le[0] || (Le[0] = (Je) => unref(o)('isInputFocused', false))
              },
              createSlots({ _: 2 }, [
                renderList(unref(ce), (Je, St) => ({
                  name: Je,
                  fn: withCtx((ht) => [renderSlot(se.$slots, Je, normalizeProps(guardReactiveProps(ht)))])
                }))
              ]),
              1032,
              ['is-menu-open', 'onSetEmptyDate']
            ),
            createVNode(
              Teleport,
              {
                to: unref(O),
                disabled: !unref(O)
              },
              {
                default: withCtx(() => [
                  createBaseVNode(
                    'div',
                    {
                      ref: 'dp-menu-wrap',
                      class: normalizeClass({
                        'dp--menu-wrapper': !unref(u).enabled,
                        dp__outer_menu_wrap: true,
                        'dp--centered': unref(r).centered
                      }),
                      style: normalizeStyle(!unref(u).enabled && !unref(r).centered ? unref(oe) : void 0)
                    },
                    [
                      createVNode(
                        Transition,
                        {
                          name: unref(_)(unref(Z).startsWith('top')),
                          css: unref(b) && !unref(u).enabled && !unref(r).centered && $.value
                        },
                        {
                          default: withCtx(() => [
                            R.value && $.value
                              ? (openBlock(),
                                createBlock(
                                  Hl,
                                  {
                                    key: 0,
                                    ref: 'dp-menu',
                                    class: normalizeClass({ [I.value]: true }),
                                    'no-overlay-focus': y.value,
                                    collapse: x.value,
                                    'get-input-rect': H,
                                    onClosePicker: ge,
                                    onSelectDate: C,
                                    onAutoApply: U,
                                    onTimeUpdate: Tt,
                                    onMenuBlur: Le[1] || (Le[1] = (Je) => unref(f)('blur'))
                                  },
                                  createSlots({ _: 2 }, [
                                    renderList(unref(G), (Je, St) => ({
                                      name: Je,
                                      fn: withCtx((ht) => [
                                        renderSlot(se.$slots, Je, normalizeProps(guardReactiveProps({ ...ht })))
                                      ])
                                    })),
                                    !unref(u).enabled && !unref(r).centered && unref(l).arrow === true
                                      ? {
                                          name: 'arrow',
                                          fn: withCtx(() => {
                                            var _a2, _b
                                            return [
                                              createBaseVNode(
                                                'div',
                                                {
                                                  ref: 'menu-arrow',
                                                  class: normalizeClass({
                                                    dp__arrow_top: unref(Z) === 'bottom',
                                                    dp__arrow_bottom: unref(Z) === 'top'
                                                  }),
                                                  style: normalizeStyle({
                                                    left:
                                                      ((_a2 = unref(K).arrow) == null ? void 0 : _a2.x) != null
                                                        ? `${unref(K).arrow.x}px`
                                                        : '',
                                                    top:
                                                      ((_b = unref(K).arrow) == null ? void 0 : _b.y) != null
                                                        ? `${unref(K).arrow.y}px`
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
                ]),
                _: 3
              },
              8,
              ['to', 'disabled']
            )
          ],
          10,
          jl
        )
      )
    )
  }
})
var Zl = defineComponent({
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
    Pr
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
  setup(e, { expose: A, emit: f }) {
    const o = f,
      c = e
    Yn(c, o)
    const s = useSlots(),
      r = Fa(s, c.presetDates),
      u = useTemplateRef('date-picker')
    return (
      A($r(u)),
      (v, Y) => (
        openBlock(),
        createBlock(
          Kl,
          { ref: 'date-picker' },
          createSlots({ _: 2 }, [
            renderList(unref(r), (P, B) => ({
              name: P,
              fn: withCtx((O) => [renderSlot(v.$slots, P, normalizeProps(guardReactiveProps(O)))])
            }))
          ]),
          1536
        )
      )
    )
  }
})
export { TZDate, Zl as VueDatePicker, Ea as WeekStart }
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
