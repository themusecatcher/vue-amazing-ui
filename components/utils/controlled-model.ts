import { camelize, computed, getCurrentInstance, nextTick, ref } from 'vue'
import type { ComputedRef, Ref, WritableComputedRef } from 'vue'

/**
 * 字段是否处于受控模式（判据与 `useControlledModel` 完全一致：父传了非 `undefined` 的值）
 *
 * 只给「必须区分受控 / 非受控」的旁路逻辑使用：典型是面板开合 —— 受控时由父侧回写驱动，
 * 组件不再额外派发 `panelChange`；非受控时才由组件自己通知。字段本体仍必须交给
 * `useControlledModel` 管理，两处判据一旦分叉，就会出现「事件扣了但界面不动」这类难查问题。
 *
 * @param name - 字段名（camel / kebab 均可）
 * @returns computed：父传非 `undefined` 即 `true`
 */
export function useIsControlled(name: string): ComputedRef<boolean> {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error(`useIsControlled('${name}') 必须在 setup 内调用`)
  }
  const propName = camelize(name)
  return computed(() => instance.props[propName] !== undefined)
}

/**
 * v-model 双模字段的统一实现（受控判据：传值即受控）
 *
 * 全库只有这一处实现「受控 / 非受控」判定，取代过去每组件各写一份的
 * `innerX` + `watch(() => props.x)` + `mergedX` 三件套。
 *
 * 判据：`props[name] !== undefined` 即为受控 —— 读走父的值、写只上报；未传时组件自持，写入同时生效并上报。
 * 刻意不用 `defineModel`：它的判据要求「prop + onUpdate 监听器」同时存在，会让「父只传值不监听」
 * 的用法退化为本地可写（静默分叉），详见 development/component-design.md 的「v-model 声明约定」。
 *
 * @param name - 字段名，须已在 `defineProps` 中声明；该字段的 `withDefaults` 默认值必须省略（否则判据恒真）
 * @param defaultValue - 非受控时的初值；受控字段的初值语义由此承担（对外可暴露为 `defaultXxx`）
 * @returns 可写 ref：读为「受控取父值 / 非受控取本地值」，写为「写本地 + `emit('update:name')`」
 */
export function useControlledModel<T>(name: string, defaultValue: T): WritableComputedRef<T> {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error(`useControlledModel('${name}') 必须在 setup 内调用`)
  }
  const propName = camelize(name)
  const readProp = (): T | undefined => instance.props[propName] as T | undefined
  // 初值取「当前父值」（有则接管，无则用 defaultValue）；受控期间本地值只作后备，
  // 父不再传值时直接呈现它，避免状态跳回组件挂载时的初值
  const initial = readProp()
  const localValue = ref(initial === undefined ? defaultValue : initial) as Ref<T>
  // 上一次上报的值：同一组件内两处写同一个值（如输入框 v-model 与 input 事件的处理器各写一次）不重复上报。
  // 去重窗口只覆盖同一轮更新（本轮 nextTick 结束即失效）：窗口长期有效会让「父拒绝 / 钳制回写后，
  // 组件再次请求同一个目标值」永远上报不出去，表现为「点一次没反应，必须换个值再点回来」
  let lastEmitted: T | undefined
  let resetScheduled = false
  return computed<T>({
    get: () => {
      const propValue = readProp()
      return propValue === undefined ? localValue.value : propValue
    },
    set: (value: T) => {
      // 受控时本地值不被读取（不影响显示），但仍写入以保证「父忽然不再传值」时状态连续
      localValue.value = value
      if (Object.is(value, lastEmitted)) return
      lastEmitted = value
      if (!resetScheduled) {
        resetScheduled = true
        nextTick(() => {
          lastEmitted = undefined
          resetScheduled = false
        })
      }
      instance.emit(`update:${name}`, value)
    }
  })
}
