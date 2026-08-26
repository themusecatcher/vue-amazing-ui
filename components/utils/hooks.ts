import {
  ref,
  getCurrentInstance,
  onMounted,
  computed,
  onUnmounted,
  reactive,
  inject,
  toRefs,
  useSlots,
  Text,
  Comment
} from 'vue'
import type { Ref, ComputedRef, Reactive, VNode } from 'vue'
import { getColorPalettes, getAlphaColor } from './color'
/**
 * 用于判断组件是否已挂载的自定义钩子
 *
 * 在组件的生命周期中，我们经常需要知道组件是否已经挂载，特别是在异步操作或者动态渲染的场景中
 * 此钩子通过在组件挂载时设置一个 Ref 对象的状态来帮助我们进行判断
 *
 * @returns { Ref<boolean> } 返回一个 Ref 对象，用于指示组件是否已挂载
 */
export function useMounted(): Ref<boolean> {
  const isMounted = ref(false)
  // 获取当前组件的实例
  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      isMounted.value = true
    }, instance)
  }
  return isMounted
}
/**
 * 检查 api 是否支持
 *
 * 用于检查给定的回调函数是否在组件挂载期间被支持
 *
 * @param {() => unknown} callback 回调函数，用于执行某些操作，并返回用于计算的值
 * @returns {ComputedRef<boolean>} 返回一个计算属性，该属性在组件挂载时会触发回调函数，并根据回调函数的返回值计算支持状态
 */
export function useSupported(callback: () => unknown): ComputedRef<boolean> {
  const isMounted = useMounted()
  return computed(() => {
    // to trigger the ref
    isMounted.value
    return Boolean(callback())
  })
}
/**
 * 组合式函数
 * 使用 Vue 的生命周期钩子添加和移除事件监听器
 *
 * 该函数旨在提供一种优雅的方式来管理事件监听器，避免在组件卸载后仍保留事件监听器，
 * 从而可能导致内存泄漏的问题；通过结合 Vue 的 onMounted 和 onUnmounted 钩子，
 * 在组件挂载时添加事件监听器，并在组件卸载时移除它
 *
 * @param {HTMLElement | Window | Document} target 目标元素或对象；可以是 DOM 元素或其他支持 addEventListener 的对象
 * @param {string} event 要监听的事件名称
 * @param {Function} callback 事件被触发时执行的回调函数
 */
export function useEventListener(target: HTMLElement | Window | Document, event: string, callback: Function): void {
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback as EventListenerOrEventListenerObject))
  onUnmounted(() => target.removeEventListener(event, callback as EventListenerOrEventListenerObject))
}
/**
 * 组合式函数
 * 实时监测浏览器刷新率FPS
 *
 * FPS值可以帮助开发者识别性能瓶颈，以优化应用的性能
 *
 * @returns {{ fps: Ref<number> }} 返回一个包含 FPS 值的 ref 对象
 */
export function useFps(): { fps: Ref<number> } {
  const fps = ref<number>(0)
  const frameCount = ref<number>(0)
  let lastTime = performance.now()
  const every = 10
  const calculateFrameRate = (currentTime: number) => {
    frameCount.value++
    if (frameCount.value >= every) {
      // 每 every 帧进行一次 FPS 计算
      const timeDiff = currentTime - lastTime
      fps.value = Math.round(1000 / (timeDiff / every))
      lastTime = currentTime
      frameCount.value = 0
    }
    requestAnimationFrame(calculateFrameRate)
  }
  requestAnimationFrame(calculateFrameRate)
  // 返回帧率状态
  return { fps }
}
/**
 * 组合式函数
 * 使用媒体查询来判断当前环境是否符合指定的媒体查询条件
 *
 * 该函数提供了一个响应式的媒体查询机制，根据查询的不同结果动态更新响应式变量
 *
 * @param {string} mediaQuery 媒体查询字符串，用于定义要查询的媒体条件
 * @returns {{ match: Ref<boolean> }} 返回一个对象，其中包含一个名为 match 的 ref 对象，表示当前是否为移动设备视口
 */
export function useMediaQuery(mediaQuery: string): { match: Ref<boolean> } {
  // 检查传入的mediaQuery参数是否为空或非法
  if (!mediaQuery || typeof mediaQuery !== 'string' || mediaQuery.trim() === '') {
    throw new Error('Invalid mediaQuery parameter. It must be a non-empty string.')
  }
  const match = ref(window && window.matchMedia(mediaQuery).matches)
  const mediaQueryList = window.matchMedia(mediaQuery)
  // 处理媒体查询状态改变的事件
  const updateChange = (e: MediaQueryListEvent) => {
    match.value = e.matches // 一个布尔值，如果当前 document 与媒体查询列表相匹配，则返回 true，否则返回 false
  }
  onMounted(() => {
    mediaQueryList.addEventListener('change', updateChange)
  })
  onUnmounted(() => {
    mediaQueryList.removeEventListener('change', updateChange)
  })
  return { match }
}
/**
 * 检查浏览器是否支持给定的事件监听器选项
 *
 * @param {'capture' | 'once' | 'passive' | 'signal'} prop 一个表示要检查的事件监听器属性的字符串，可选 'capture'、'once'、'passive' 或 'signal'
 * @returns {{ isSupported: Ref<boolean> }} 返回一个对象，包含一个 Ref 对象，其值指示浏览器是否支持给定的选项
 */
export function useOptionsSupported(prop: 'capture' | 'once' | 'passive' | 'signal'): { isSupported: Ref<boolean> } {
  // 兼容旧版本的浏览器（以及一些相对不算古老的）仍然假定 addEventListener 第三个参数是布尔值的情况
  const isSupported = ref<boolean>(false) // 浏览器是否支持 options 参数
  try {
    const options = {
      get [prop]() {
        // 该函数会在浏览器尝试访问 [prop] 值时被调用
        isSupported.value = true
        return false
      }
    }
    window.addEventListener('test', () => null, options)
    window.removeEventListener('test', () => null, options)
  } catch (err) {
    isSupported.value = false
  }
  return { isSupported }
}
/**
 * 组合式函数
 * 监听给定名称或名称数组的插槽是否存在，支持监听单个插槽或一组插槽的存在
 *
 * @param slotsName - 插槽的名称或名称数组，默认为 'default'
 * @returns 如果是单个插槽名称，则返回一个计算属性，表示该插槽是否存在
 *          如果是插槽名称数组，则返回一个 reactive 对象，其中的每个属性对应该插槽是否存在
 */
type SlotsExistResult<T extends string | string[]> = T extends string
  ? ComputedRef<boolean>
  : Reactive<Record<string, ComputedRef<boolean>>>
export function useSlotsExist<T extends string | string[] = 'default'>(slotsName: T): SlotsExistResult<T> {
  const slots = useSlots() // 获取当前组件的所有插槽
  // 检查特定名称的插槽是否存在且不为空
  const checkSlotsExist = (slotName: string): boolean => {
    const slotsContent = slots[slotName]?.()
    const checkExist = (slotContent: VNode) => {
      if (slotContent.type === Comment) {
        return false
      }
      if (Array.isArray(slotContent.children) && !slotContent.children.length) {
        return false
      }
      if (slotContent.type !== Text) {
        return true
      }
      if (typeof slotContent.children === 'string') {
        return slotContent.children.trim() !== ''
      }
    }
    if (slotsContent && slotsContent?.length) {
      const result = slotsContent.some((slotContent: VNode) => {
        return checkExist(slotContent)
      })
      return result
    }
    return false
  }
  if (Array.isArray(slotsName)) {
    const slotsExist = reactive<Record<string, ComputedRef<boolean>>>({})
    slotsName.forEach((slotName: string) => {
      const exist = computed(() => checkSlotsExist(slotName))
      slotsExist[slotName] = exist // 将一个 ref 赋值给一个 reactive 属性时，该 ref 会自动解包
    })
    return slotsExist as SlotsExistResult<T>
  } else {
    return computed(() => checkSlotsExist(slotsName)) as SlotsExistResult<T>
  }
}
/**
 * 使用依赖注入的函数
 * 用于获取颜色调色板和阴影颜色
 * 如果在组件中使用，则会尝试从组件的依赖注入中获取颜色配置
 * 如果未找到，则回退到全局的默认颜色配置
 *
 * @param {string} key 组件名，用于在组件的依赖注入中查找颜色配置
 * @returns {{ colorPalettes: Ref<string[]>, shadowColor: Ref<string> }} 返回包含颜色调色板和阴影颜色的主题对象
 */
export function useInject(key: string): { colorPalettes: Ref<string[]>; shadowColor: Ref<string> } {
  // 获取默认的颜色调色板
  const colorPalettes = getColorPalettes('#1677ff')
  // 获取 common 的依赖注入
  const commonInjectValue = inject('common', reactive({ colorPalettes, shadowColor: getAlphaColor(colorPalettes[0]) }))
  // 获取组件的依赖注入
  const componentsInjectValue = inject('components', null) as Record<
    string,
    { colorPalettes: string[]; shadowColor: string }
  > | null
  if (
    componentsInjectValue !== null &&
    key in componentsInjectValue &&
    componentsInjectValue[key].colorPalettes.length
  ) {
    return toRefs(componentsInjectValue[key])
  }
  return toRefs(commonInjectValue)
}
