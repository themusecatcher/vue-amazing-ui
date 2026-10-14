# 页面滚动锁 lockScroll

<GlobalElement />

_锁定页面滚动并等量补偿被回收的滚动条宽度、防止页面横向抖动的工具函数_

::: details Show Source Code

```ts
// 页面滚动锁的模块级共享计数：lockScroll 每次调用 +1，返回的释放函数与本次调用严格配对 -1。
// 仅首个调用真正设置样式（并缓存被覆盖的内联样式），最后一个释放时才真正还原页面。
// 由此多个入口（Modal / Dialog / Drawer 及多 Provider 并存）各自锁定互不覆盖，
// 任一入口提前释放也不会误还原其它入口仍持有的锁。
let bodyLockCount = 0
// 首个锁设置前 documentElement / body 的原内联样式，归零释放时精确还原，避免误删调用方预设
let prevHtmlOverflowX = ''
let prevHtmlOverflowY = ''
let prevBodyOverflowX = ''
let prevBodyOverflowY = ''
let prevBodyPaddingRight = ''
let prevScrollbarWidthVar = ''
// 补偿量变量名：锁定期间写入 html，值等于本次被回收的滚动条宽度（未回收时为 0px）。
// 由「跨锁定状态存续的视口锚定浮层」（右对齐 Notification、LoadingBar）据此从右侧内缩，
// 保证开关锁前后视觉位置一致；宿主自有固定定位元素（固定头尾、右侧栏等）也可据此自行补偿
const SCROLLBAR_WIDTH_VAR = '--va-scrollbar-width'
// 布局尺寸比较容差：几何读数返回亚像素值，取整最多带来 1px 抖动，低于该值视为未变宽 / 无占位
const LAYOUT_SIZE_TOLERANCE = 1
/**
 * 测量布局视口宽度（`documentElement` 的 border box 宽度，即 `position: fixed` 元素的包含块宽度）
 *
 * 不可用 `window.innerWidth - documentElement.clientWidth` 代替：槽位保留生效时 `clientWidth`
 * 会把预留的槽位算进 padding edge（实测占位 15px 时读数即 `innerWidth`，与槽位未保留时完全相同），
 * 据此判断会把「槽位已保留」误判为「槽位未保留」。同时 overlay 滚动条模式下自定义的占位滚动条
 * 也不计入 `clientWidth`（实测锁定前读数同样为 `innerWidth`），无法用于判断是否存在滚动条占位。
 */
function getLayoutViewportWidth(): number {
  return Math.round(document.documentElement.getBoundingClientRect().width)
}
/**
 * 还原 html 上的宽度类 CSS 变量：原本不存在则移除，避免给宿主留下无用声明
 *
 * @param name - CSS 变量名
 * @param prevValue - 锁定前该变量的内联值，为空表示原本不存在
 */
function restoreCssVar(name: string, prevValue: string): void {
  if (prevValue) {
    document.documentElement.style.setProperty(name, prevValue)
    return
  }
  document.documentElement.style.removeProperty(name)
}
/**
 * 锁定页面滚动，并返回本次锁定的释放函数
 *
 * 隐藏 html/body 的滚动条，并把被回收的滚动条宽度等量补偿回页面，避免布局视口宽度突变
 * 导致背景页面与浮层横向抖动（Windows 经典滚动条场景尤其明显）。
 *
 * 为什么不保留滚动条槽位（如 `scrollbar-gutter: stable`）：实测（Windows / macOS Chrome）
 * 槽位保住后，窗口右侧会留下一条与滚动条等宽的带子，该带子由系统滚动条层绘制、位于所有页面
 * 内容之上——加宽遮罩、挂 z-index 拉满的固定元素、改根元素背景色都盖不住它，唯一结果就是多出
 * 一条亮带；因此库不再主动保留槽位，改为等量补偿。宿主若自行声明 `scrollbar-gutter`（写在
 * 样式表里）则尊重其声明：此时回收宽度为 0，本函数不会重复补偿。
 *
 * 判据统一取「隐藏滚动条前后布局视口宽度的差值」：差值归零（系统为 overlay 滚动条，或宿主
 * 自行保留了槽位）即无需补偿；差值仍在时用同一差值做等量补偿（写入 `body` 的 `padding-right`，
 * 叠加在宿主已有 padding 之上），不依赖浏览器对 `scrollbar-gutter` 的支持情况。
 *
 * 锁定期间在 html 上写入 `--va-scrollbar-width`（恒有值，未回收时为 0px）：本次被回收的
 * 滚动条宽度。本库视口锚定的浮层都据此补偿、使锁定前后位置一致，按锚定方式分三类：
 * - 整屏 / 整宽层（弹窗 / 抽屉 / 对话框 / 图片预览，含各自遮罩）**不**消费该变量：它们与遮罩
 *   同时出现、本就铺满窗口，若按补偿量收窄会比遮罩窄一个滚动条宽度，表现为弹窗居中偏移、
 *   预览右侧留缝；
 * - 右对齐层（右对齐 `Notification`、`LoadingBar`、`BackTop`、`FloatButton`）在偏移上叠加补偿量；
 * - 居中层（`Message`、居中 `Notification`）按补偿量的一半左移。
 *
 * 宿主自有的视口锚定固定定位元素（固定头尾、右侧栏等，非 `sticky`）不在本库补偿范围内，
 * 会随布局视口变宽而位移，可读同一变量自行补偿。
 *
 * 只隐藏垂直滚动条会让 `overflow-x: visible` 计算为 `auto`，锁定期间页面仍可横向推移，
 * 故一并锁定横向轴；但页面本来就有横向滚动条时不能隐藏它（移除占位会抬高布局视口，
 * 反而引起纵向位移），此时跳过横向锁定。
 *
 * 每个调用需与返回的释放函数严格配对；仅当所有来源均已释放时才会真正还原页面滚动，
 * 可安全用于多弹窗 / 多抽屉并存场景。
 *
 * @returns 本次锁定的释放函数（幂等）：从全局计数中移除本次锁定，重复调用无副作用
 */
export function lockScroll(): () => void {
  // SSR / Node 环境无 DOM 可锁：返回空释放函数，保证调用方「加锁即拿到释放句柄」的配对语义不变
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return () => {}
  }
  const html = document.documentElement
  const body = document.body
  if (bodyLockCount === 0) {
    prevHtmlOverflowX = html.style.overflowX
    prevHtmlOverflowY = html.style.overflowY
    prevBodyOverflowX = body.style.overflowX
    prevBodyOverflowY = body.style.overflowY
    prevBodyPaddingRight = body.style.paddingRight
    prevScrollbarWidthVar = html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)
    // 横向滚动条是否占用布局高度：仅用于决定是否一并锁定横向轴，与垂直方向互不影响
    const horizontalScrollbarHeight = window.innerHeight - html.clientHeight
    // 隐藏滚动条后可用宽度变宽多少，就是本次要补偿的量（宿主自行保留槽位或 overlay 滚动条时为 0）
    const layoutWidth = getLayoutViewportWidth()
    html.style.overflowY = 'hidden'
    body.style.overflowY = 'hidden'
    const growth = getLayoutViewportWidth() - layoutWidth
    const compensation = growth > LAYOUT_SIZE_TOLERANCE ? growth : 0
    if (compensation > 0) {
      const basePaddingRight = Number.parseFloat(getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${basePaddingRight + compensation}px`
    }
    if (horizontalScrollbarHeight <= LAYOUT_SIZE_TOLERANCE) {
      html.style.overflowX = 'hidden'
      body.style.overflowX = 'hidden'
    }
    // 变量恒有值，避免使用方读到空值导致 var() 失效
    html.style.setProperty(SCROLLBAR_WIDTH_VAR, `${compensation}px`)
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
      html.style.overflowX = prevHtmlOverflowX
      html.style.overflowY = prevHtmlOverflowY
      body.style.overflowX = prevBodyOverflowX
      body.style.overflowY = prevBodyOverflowY
      body.style.paddingRight = prevBodyPaddingRight
      restoreCssVar(SCROLLBAR_WIDTH_VAR, prevScrollbarWidthVar)
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

_内部基于引用计数实现，可多入口并存；锁定时等量补偿被回收的滚动条宽度，背景页面内容不位移_

- **调用与释放严格配对**：每次调用 `lockScroll` 使全局计数加一，仅首个调用真正设置样式、最后一个释放时才真正还原页面。因此返回的释放函数必须与本次调用配对使用（重复调用无副作用）。
- **多入口并存安全**：多个入口（如 `Modal` / `Dialog` / `Drawer` 及多 `Provider` 并存）各自锁定互不覆盖，任一入口提前释放也不会误还原其它入口仍持有的锁。
- **不保留滚动条槽位，改为等量补偿**：内部先量出布局视口宽度（`documentElement.getBoundingClientRect().width`），隐藏滚动条后再量一次，用两者的差值同时作为判据与补偿量——差值原样补回 `body` 的 `padding-right`（叠加在宿主已有 padding 之上），**锁定期间背景页面内容的几何与锁定前一致**。
- **为什么不保留槽位（如 `scrollbar-gutter: stable`）**：实测（Windows / macOS Chrome）槽位保住后，窗口右侧会留下一条与滚动条等宽的带子；它由系统滚动条层绘制、位于所有页面内容之上——加宽遮罩、挂 `z-index` 拉满的固定元素、改根元素背景色都盖不住，唯一结果就是多出一条亮带，因此本库不再主动保留槽位。宿主若**自行声明** `scrollbar-gutter`（写在样式表里）则被尊重：此时回收宽度为 `0`，不会重复补偿，那条带子也由宿主自行承担。`macOS` 触控板默认的 `overlay` 滚动条不占布局宽度，差值为 `0`，天然不会抖动。
- **`--va-scrollbar-width`（写在 `html` 上，锁定期间恒有值，未回收时为 `0px`）**：本次被回收的滚动条宽度，即需要补回的补偿量。本库视口锚定的浮层都据此补偿、锁定前后位置一致：右对齐的 `Notification` / `LoadingBar` / `BackTop` / `FloatButton` 在偏移上叠加该值，居中的 `Message` / `Notification` 按该值的一半左移。**宿主自有**的视口锚定固定定位元素（固定头尾、右侧栏等，非 `sticky`）不在本库补偿范围内，会随之位移，可读该变量自行补偿：与视口右边缘对齐的用 `right: var(--va-scrollbar-width)`，铺满整屏的用 `right` / `padding-right`，水平居中的用 `left: calc(50% - var(--va-scrollbar-width) / 2)`。
- **随锁定出现的整屏浮层不参与内缩**：弹窗 / 对话框 / 抽屉 / 图片预览（`.modal-layer` / `.dialog-layer` / `.drawer-container` / `.preview-container` 与预览操作层）一律铺满窗口、与遮罩同宽——它们与遮罩同时出现，不需要保持锁定前的位置；若按补偿量内缩，内容层会比遮罩窄一个滚动条宽度，表现为弹窗居中偏移、预览右侧留缝。
- **横向轴一并锁定**：只隐藏垂直滚动条会让 `overflow-x: visible` 计算为 `auto`，锁定期间页面仍可横向推移，故同时把 `html` / `body` 的 `overflow-x` 设为 `hidden`；页面本来就有横向滚动条时跳过该步（移除其占位会抬高布局视口，反而引起纵向位移）。
- **仅作用于页面级滚动**：隐藏的是 `html` / `body` 的滚动条，宿主自有的滚动容器（如 `#app { overflow: auto }`）内部滚动不受影响，也不会产生补偿。
- **如何判断是否做了补偿**：锁定期间读 `html` 上的 `--va-scrollbar-width`，`0px` 表示没有回收宽度（系统 `overlay` 滚动条，或宿主自行保留了槽位）、未做补偿；非 `0` 表示已回收并补偿。建议在真机上覆盖：Windows Chrome / Edge / Firefox（经典滚动条）、macOS Chrome（默认 overlay / 系统「总是显示滚动条」/ 页面自定义 `::-webkit-scrollbar` 三种）、Safari、以及 `125%` 系统缩放。

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| release | 本次锁定的释放函数（幂等）；仅当所有来源均已释放时才真正还原页面滚动 | () => void |
