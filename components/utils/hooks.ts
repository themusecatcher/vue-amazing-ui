import {
  ref,
  nextTick,
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
import type { InjectionKey, Ref, ComputedRef, Reactive, VNode } from 'vue'
import { getColorPalettes, getAlphaColor } from './color'

/**
 * 通用组合式函数集合（与具体组件解耦，可独立复用）
 *
 * 覆盖挂载态查询、浏览器能力探测、事件监听托管、FPS / 媒体查询 / 视口宽度、插槽存在性判定、
 * 注入链解析、主题注入与波纹动画状态；带副作用者均在挂载时注册、卸载时清理。
 */

/**
 * 组合式函数：判断组件是否已挂载
 *
 * 用于需要区分「挂载前 / 挂载后」的场景（如依赖真实 DOM 的测量、异步分支）。
 *
 * @returns 挂载完成标志（初始 false，`onMounted` 后为 true）
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
 * 组合式函数：探测某项能力是否可用（挂载后才求值）
 *
 * 在挂载后才执行 `callback`，避免 SSR（Node）期访问浏览器 API 抛错；依赖 `useMounted` 触发重算，
 * 故 callback 内引用浏览器对象时仍需自行判断存在性。
 *
 * @param callback - 探测函数，返回是否可用
 * @returns 探测结果的计算属性
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
 * 组合式函数：随组件生命周期自动挂载 / 卸载事件监听
 *
 * 挂载时 `addEventListener`、卸载时 `removeEventListener`，避免监听残留导致内存泄漏。
 * 注意：入参须为监听目标对象本身，不支持 CSS 选择器字符串。
 *
 * @param target - 事件目标（DOM 元素 / Window / Document 等）
 * @param event - 事件名
 * @param callback - 事件回调
 */
export function useEventListener(target: HTMLElement | Window | Document, event: string, callback: Function): void {
  onMounted(() => target.addEventListener(event, callback as EventListenerOrEventListenerObject))
  onUnmounted(() => target.removeEventListener(event, callback as EventListenerOrEventListenerObject))
}
/**
 * 组合式函数：实时统计浏览器 FPS
 *
 * 每累计 10 帧计算一次平均帧率；帧循环在挂载后启动（SSR 无 requestAnimationFrame）、
 * 卸载时取消，避免循环永久自我续期。
 *
 * @returns 当前 FPS（初始 0）
 */
export function useFps(): { fps: Ref<number> } {
  const fps = ref<number>(0)
  const frameCount = ref<number>(0)
  let lastTime = performance.now()
  let rafId: number | null = null // 当前帧请求 ID，用于卸载时取消帧回调
  const every = 10 // 每 10 帧统计一次，避免逐帧计算带来的抖动
  const calculateFrameRate = (currentTime: number) => {
    frameCount.value++
    if (frameCount.value >= every) {
      // 每 every 帧进行一次 FPS 计算
      const timeDiff = currentTime - lastTime
      fps.value = Math.round(1000 / (timeDiff / every))
      lastTime = currentTime
      frameCount.value = 0
    }
    rafId = requestAnimationFrame(calculateFrameRate)
  }
  // SSR（Node）环境无 requestAnimationFrame，帧循环放到挂载后启动，浏览器端行为不变
  onMounted(() => {
    rafId = requestAnimationFrame(calculateFrameRate)
  })
  // 卸载时取消帧回调，否则该循环会永久自我续期，并持续持有 fps / frameCount 等状态
  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  })
  // 返回帧率状态
  return { fps }
}
/**
 * 组合式函数：响应式媒体查询
 *
 * @param mediaQuery - 媒体查询字符串（如 `'(max-width: 768px)'`），为空或非法时抛错
 * @returns `match` 表示当前是否命中该查询条件
 */
export function useMediaQuery(mediaQuery: string): { match: Ref<boolean> } {
  // 检查传入的mediaQuery参数是否为空或非法
  if (!mediaQuery || typeof mediaQuery !== 'string' || mediaQuery.trim() === '') {
    throw new Error('Invalid mediaQuery parameter. It must be a non-empty string.')
  }
  // SSR（Node）环境无 window，matchMediaList 为 null，match 取 false；浏览器端初始值与原来一致
  const mediaQueryList = typeof window !== 'undefined' ? window.matchMedia(mediaQuery) : null
  const match = ref(mediaQueryList?.matches ?? false)
  // 处理媒体查询状态改变的事件
  const updateChange = (e: MediaQueryListEvent) => {
    match.value = e.matches // 一个布尔值，如果当前 document 与媒体查询列表相匹配，则返回 true，否则返回 false
  }
  onMounted(() => {
    mediaQueryList?.addEventListener('change', updateChange)
  })
  onUnmounted(() => {
    mediaQueryList?.removeEventListener('change', updateChange)
  })
  return { match }
}
/**
 * 组合式函数：响应式获取视口宽度（`window.innerWidth`）
 *
 * 供按断点切换配置的组件（如 Avatar / Row / Col）使用；SSR（Node）下初始值为 0，
 * resize 监听在挂载后注册、卸载时移除。
 *
 * @returns 视口宽度
 */
export function useWindowWidth(): Ref<number> {
  // SSR（Node）环境无 window，取 0；浏览器端初始值与原来一致
  const width = ref<number>(typeof window !== 'undefined' ? window.innerWidth : 0)
  const updateWidth = (): void => {
    width.value = window.innerWidth
  }
  // 实参 window 在 setup 期求值，SSR（Node）下必须先判断存在性再调用
  if (typeof window !== 'undefined') {
    useEventListener(window, 'resize', updateWidth)
  }
  return width
}
/**
 * 组合式函数：探测浏览器是否支持指定的 addEventListener 选项
 *
 * 原理：在 options 上以 getter 定义目标选项，浏览器读取该项时即置为「支持」
 * （老浏览器把第三个参数当作布尔值，不会读取选项，故保持 false）。
 *
 * @param option - 待探测的选项名：`'capture'` / `'once'` / `'passive'` / `'signal'`
 * @returns `isSupported` 表示是否支持该选项
 */
export function useOptionsSupported(option: 'capture' | 'once' | 'passive' | 'signal'): { isSupported: Ref<boolean> } {
  const isSupported = ref<boolean>(false) // 浏览器是否支持 options 参数
  try {
    const options = {
      get [option]() {
        // 浏览器仅在真正读取该选项时才触发 getter（老浏览器只把它当布尔值），故此处置为支持
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
 * 组合式函数：判断插槽是否「真的渲染了内容」
 *
 * 判定以「实际调用插槽并检查返回的 vnode」为准，可识别「已提供但渲染为空」的插槽；
 * 探测时以空对象作为作用域参数，插槽内抛错按「已提供」处理。
 *
 * @param slotsName - 插槽名或插槽名数组，默认 `'default'`
 * @returns 单个名称 → 该插槽是否存在的计算属性；名称数组 → 以插槽名为键的 reactive 映射
 */
type SlotsExistResult<T extends string | string[]> = T extends string
  ? ComputedRef<boolean>
  : Reactive<Record<string, ComputedRef<boolean>>>
export function useSlotsExist<T extends string | string[] = 'default'>(slotsName: T): SlotsExistResult<T> {
  const slots = useSlots() // 获取当前组件的所有插槽
  // 检查特定名称的插槽是否存在且不为空
  const checkSlotsExist = (slotName: string): boolean => {
    const slot = slots[slotName]
    if (slot === undefined) {
      return false
    }
    // 必须实际调用一次插槽才能拿到 vnode，进而判断「是否真的渲染了内容」
    let slotsContent: VNode[] | undefined
    try {
      // 作用域参数在模板插槽的形参位置解构，空对象探测也可能因访问嵌套属性而抛错；
      // 能抛错即说明插槽已被提供，按「存在」处理（探测失败不等同于未提供）
      slotsContent = slot({})
    } catch {
      return true
    }
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
 * 获取组件主题（颜色调色板 + 阴影色）
 *
 * 优先命中 `ConfigProvider` 注入的 `components[key]` 覆盖，未命中（或未注入）时回退 `common`，
 * 再回退到内置默认调色板。
 *
 * 组件库内部使用：`key` 为本库组件名（如 `'Button'`）；因依赖内部注入协议（注入键名 + 以组件名为
 * 分键的表结构），不对外导出、不承诺 API 稳定性。
 *
 * @param key - 组件名，用于在注入表中查找该组件的主题覆盖
 * @returns 颜色调色板与阴影色的 ref
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
/**
 * 沿组件实例链查找注入值所需的最小字段
 *
 * `provides` 属 Vue 内部实现（未出现在公开的 `ComponentInternalInstance` 类型上），
 * 但自 Vue 3.0 起结构稳定，且 `inject()` 内部正是读取该字段，故此处显式断言。
 */
interface ProvidesChainInstance {
  provides?: Record<PropertyKey, unknown> | null
  parent: ProvidesChainInstance | null
}
/**
 * 沿组件实例链解析注入值（不经过 `inject()`）
 *
 * **为什么不能直接用 `inject()`**
 *
 * `inject()` 内部是「二选一且不回退」：
 *
 * ```js
 * // @vue/runtime-core: inject()（简化示意）
 * const provides = currentApp
 *   ? currentApp._context.provides // currentApp 非空：只翻宿主 app 的 app 级 provides
 *   : instance.parent.provides     // 否则：沿组件链往上找
 * if (provides && key in provides) return provides[key]
 * return defaultValue            // 这条岔路翻不到，就到此为止，不再回头
 * ```
 *
 * 而 `currentApp` 只在 `app.runWithContext(fn)` 执行 `fn` 期间被临时指向该 app；
 * vue-router 4.6 正是用它执行导航守卫（`beforeEach` / `beforeRouteEnter` / `afterEach`）。
 * 于是官方推荐在守卫里调用的 `createDiscreteApi()` 踩中此坑：其内部提取器虽位于
 * `<XxxProvider>` 之内，`inject()` 却因 `currentApp` 非空而改道去翻**宿主 app** 的
 * **app 级** `provides`；而组件库的注入 key 由各 Provider 在**组件级** `provide`，
 * 那里没有 → 返回默认值 `null` → `useXxx()` 抛错。
 *
 * **为什么「翻错地方」等于「必定找不到」**
 *
 * ```text
 * app._context.provides      ← 全 app 唯一，Object.create(null)，只装 app.provide() 的
 *         ▲ 原型
 * 根组件实例.provides
 *         ▲ 原型
 * …中间各层组件的 provides…
 *         ▲ 原型
 * <XxxProvider>.provides     ← 组件库的注入 key 在这一层
 *         ▲ 原型
 * 提取器组件.provides         ← 查找起点
 * ```
 *
 * 组件实例的 `provides` 以 app 级 `provides` 为**最顶层原型**，可见性是单行道：
 * 组件看得见 app 级，app 级看不见任何组件级。故 `inject()` 一旦被改道到 app 级，
 * 便无法回头命中组件级 —— 与 `<XxxProvider>` 是否写在 `App.vue` 中无关。
 *
 * **本函数的做法**
 *
 * 只读 `instance.provides`（原型链已含祖先组件级与 app 级 `provides`，是 `inject()`
 * 正常路径可见范围的超集），必要时沿 `instance.parent` 兜底上溯，且**完全不看
 * `currentApp`**，从而始终命中提取器自己那条链上的 `<XxxProvider>`。
 *
 * 组件库内部使用：注入协议属内部实现，不对外导出、不承诺 API 稳定性。
 *
 * @param {InjectionKey<T>} key 注入键
 * @returns {T | undefined} 命中返回注入值，未命中返回 undefined
 */
export function injectFromChain<T>(key: InjectionKey<T>): T | undefined {
  let instance = getCurrentInstance() as unknown as ProvidesChainInstance | null
  while (instance) {
    const provides = instance.provides
    if (provides && key in provides) {
      return provides[key] as T
    }
    instance = instance.parent
  }
  return undefined
}
/**
 * 组合式函数：水波纹动画状态（Material 风格的点击 / 选中涟漪）
 *
 * `wave` 用于驱动 `.wave-active` 类；`startWave` 在连点时先复位、下一帧再置位以强制重放动画；
 * `endWave` 供模板 `@animationend` 调用以复位。
 *
 * @returns 波纹标志与启停方法
 */
export function useWave(): { wave: Ref<boolean>; startWave: () => void; endWave: () => void } {
  const wave = ref<boolean>(false)
  function startWave(): void {
    if (wave.value) {
      // 正在播放时先复位、下一帧再置位，强制重新触发 CSS 动画
      wave.value = false
      nextTick(() => {
        wave.value = true
      })
    } else {
      wave.value = true
    }
  }
  function endWave(): void {
    wave.value = false
  }
  return { wave, startWave, endWave }
}
