import { camelize, computed, getCurrentInstance, ref } from 'vue'
import type { Ref, WritableComputedRef } from 'vue'

/**
 * v-model 双模字段的统一实现（受控判据：传值即受控）
 *
 * 全库只有这一处实现「受控 / 非受控」判定，取代过去每组件各写一份的
 * `innerX` + `watch(() => props.x)` + `mergedX` 三件套。
 *
 * 判据：`props[name] !== undefined` 即为受控 —— 读走父的值、写只上报；未传时组件自持，写入同时生效并上报。
 * 与 `ant-design-vue` 的 `useMergedState`、`naive-ui`（`vooks`）的 `useMergedState` 同口径；
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
  // 本地值的初值取「当前父值」：受控期间被父改过、之后父不再传值时，接管的最后一个父值最符合直觉
  const initial = readProp()
  const localValue = ref(initial === undefined ? defaultValue : initial) as Ref<T>
  // 上一次上报的值：同一组件内两处写同一个值（如输入框 v-model 与 input 事件的处理器各写一次）不重复上报
  let lastEmitted: T | undefined
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
      instance.emit(`update:${name}`, value)
    }
  })
}
