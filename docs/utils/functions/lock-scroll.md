# 页面滚动锁 lockScroll

<GlobalElement />

_锁定页面滚动并补偿滚动条宽度、防止页面横向抖动的工具函数_

::: details Show Source Code

```ts
// 页面滚动锁的模块级共享计数：lockScroll 每次调用 +1，返回的释放函数与本次调用严格配对 -1。
// 仅首个调用真正设置样式（并缓存被覆盖的内联样式），最后一个释放时才真正还原页面。
// 由此多个入口（Modal / Dialog / Drawer 及多 Provider 并存）各自锁定互不覆盖，
// 任一入口提前释放也不会误还原其它入口仍持有的锁。
let bodyLockCount = 0
// 首个锁设置前 documentElement / body 的原内联样式，归零释放时精确还原，避免误删调用方预设
let prevHtmlOverflowY = ''
let prevBodyOverflowY = ''
let prevBodyPaddingRight = ''
/**
 * 锁定页面滚动，并返回本次锁定的释放函数
 *
 * 隐藏 html/body 的垂直滚动条，并补偿滚动条宽度到 body 的 padding-right，
 * 避免滚动条消失导致内容可用宽度突变、页面横向抖动。
 * 需先测量滚动条宽度再隐藏滚动条（顺序不可颠倒，否则差值恒为 0）。
 *
 * 每个调用需与返回的释放函数严格配对；仅当所有来源均已释放时才会真正还原页面滚动，
 * 可安全用于多弹窗 / 多抽屉并存场景。
 *
 * @returns {() => void} 本次锁定的释放函数（幂等）：从全局计数中移除本次锁定，重复调用无副作用
 */
export function lockScroll(): () => void {
  // SSR / Node 环境无 DOM 可锁：返回空释放函数，保证调用方「加锁即拿到释放句柄」的配对语义不变
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return () => {}
  }
  const html = document.documentElement
  const body = document.body
  if (bodyLockCount === 0) {
    prevHtmlOverflowY = html.style.overflowY
    prevBodyOverflowY = body.style.overflowY
    prevBodyPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - html.clientWidth
    html.style.overflowY = 'hidden'
    body.style.overflowY = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }
  }
  bodyLockCount += 1
  let released = false
  return () => {
    if (released) {
      return
    }
    released = true
    bodyLockCount -= 1
    if (bodyLockCount === 0) {
      html.style.overflowY = prevHtmlOverflowY
      body.style.overflowY = prevBodyOverflowY
      body.style.paddingRight = prevBodyPaddingRight
    }
  }
}
```

:::

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { lockScroll } from 'vue-amazing-ui'
// 单入口：调用 lockScroll 并持有本次的释放函数
const locked = ref(false)
let release: (() => void) | null = null
function toggleLock() {
  if (release) {
    release()
    release = null
    locked.value = false
    return
  }
  release = lockScroll()
  locked.value = true
}
// 多入口：每个入口各持一把锁（模拟同时打开的弹窗 / 抽屉）
const entries = ref<Record<'modal' | 'drawer', (() => void) | null>>({ modal: null, drawer: null })
const entryLockCount = computed(() => Object.values(entries.value).filter(Boolean).length)
function toggleEntry(entry: 'modal' | 'drawer') {
  const entryRelease = entries.value[entry]
  if (entryRelease) {
    // 仅释放本入口：仍有其它入口持锁时页面保持锁定
    entryRelease()
    entries.value[entry] = null
    return
  }
  entries.value[entry] = lockScroll()
}
onUnmounted(() => {
  // 卸载兜底：避免锁定状态下离开页面导致滚动锁残留
  release?.()
  Object.values(entries.value).forEach((entryRelease) => entryRelease?.())
})
</script>

## 基本使用

_单入口与多入口并存两种用法；锁定时当前页面将无法滚动，点击按钮即可解除_

<br/>

<Space vertical align="stretch" :gap="12">
  <Alert :type="locked ? 'warning' : 'info'">
    页面滚动：{{ locked ? '已锁定，当前页面无法滚动' : '未锁定，可正常滚动' }}
    <template #actions>
      <Button size="small" :type="locked ? 'primary' : 'default'" @click="toggleLock">
        {{ locked ? '解除锁定' : '锁定页面滚动' }}
      </Button>
    </template>
  </Alert>
  <Alert :type="entryLockCount ? 'warning' : 'info'">
    多入口并存：已打开 {{ entryLockCount }} 个入口，全部关闭后才恢复滚动
    <template #actions>
      <Space align="center" :gap="8">
        <Button size="small" :type="entries.modal ? 'primary' : 'default'" @click="toggleEntry('modal')">
          {{ entries.modal ? '关闭弹窗' : '打开弹窗' }}
        </Button>
        <Button size="small" :type="entries.drawer ? 'primary' : 'default'" @click="toggleEntry('drawer')">
          {{ entries.drawer ? '关闭抽屉' : '打开抽屉' }}
        </Button>
      </Space>
    </template>
  </Alert>
</Space>

```vue
<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { lockScroll } from 'vue-amazing-ui'
// 单入口：调用 lockScroll 并持有本次的释放函数
const locked = ref(false)
let release: (() => void) | null = null
function toggleLock() {
  if (release) {
    release()
    release = null
    locked.value = false
    return
  }
  release = lockScroll()
  locked.value = true
}
// 多入口：每个入口各持一把锁（模拟同时打开的弹窗 / 抽屉）
const entries = ref<Record<'modal' | 'drawer', (() => void) | null>>({ modal: null, drawer: null })
const entryLockCount = computed(() => Object.values(entries.value).filter(Boolean).length)
function toggleEntry(entry: 'modal' | 'drawer') {
  const entryRelease = entries.value[entry]
  if (entryRelease) {
    // 仅释放本入口：仍有其它入口持锁时页面保持锁定
    entryRelease()
    entries.value[entry] = null
    return
  }
  entries.value[entry] = lockScroll()
}
onUnmounted(() => {
  // 卸载兜底：避免锁定状态下离开页面导致滚动锁残留
  release?.()
  Object.values(entries.value).forEach((entryRelease) => entryRelease?.())
})
</script>
<template>
  <Space vertical align="stretch" :gap="12">
    <Alert :type="locked ? 'warning' : 'info'">
      页面滚动：{{ locked ? '已锁定，当前页面无法滚动' : '未锁定，可正常滚动' }}
      <template #actions>
        <Button size="small" :type="locked ? 'primary' : 'default'" @click="toggleLock">
          {{ locked ? '解除锁定' : '锁定页面滚动' }}
        </Button>
      </template>
    </Alert>
    <Alert :type="entryLockCount ? 'warning' : 'info'">
      多入口并存：已打开 {{ entryLockCount }} 个入口，全部关闭后才恢复滚动
      <template #actions>
        <Space align="center" :gap="8">
          <Button size="small" :type="entries.modal ? 'primary' : 'default'" @click="toggleEntry('modal')">
            {{ entries.modal ? '关闭弹窗' : '打开弹窗' }}
          </Button>
          <Button size="small" :type="entries.drawer ? 'primary' : 'default'" @click="toggleEntry('drawer')">
            {{ entries.drawer ? '关闭抽屉' : '打开抽屉' }}
          </Button>
        </Space>
      </template>
    </Alert>
  </Space>
</template>
```

## 注意事项

_内部基于引用计数实现，可多入口并存；锁定时会补偿滚动条宽度_

- **调用与释放严格配对**：每次调用 `lockScroll` 使全局计数加一，仅首个调用真正设置样式、最后一个释放时才真正还原页面。因此返回的释放函数必须与本次调用配对使用（重复调用无副作用）。
- **多入口并存安全**：多个入口（如 `Modal` / `Dialog` / `Drawer` 及多 `Provider` 并存）各自锁定互不覆盖，任一入口提前释放也不会误还原其它入口仍持有的锁。
- **滚动条宽度补偿**：为避免滚动条消失导致页面横向抖动，内部会先测量滚动条宽度（`window.innerWidth - document.documentElement.clientWidth`），再隐藏滚动条并等量补偿到 `body` 的 `padding-right`（顺序不可颠倒，否则差值恒为 `0`）；`macOS` 触控板默认的 `overlay` 滚动条不占布局宽度，此时宽度为 `0`，不会额外添加 `padding`。

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| release | 本次锁定的释放函数（幂等）；仅当所有来源均已释放时才真正还原页面滚动 | () => void |
