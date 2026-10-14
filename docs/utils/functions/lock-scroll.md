# 页面滚动锁 lockScroll

<GlobalElement />

_锁定页面滚动并保留滚动条占位宽度、防止页面横向抖动的工具函数_

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
let prevHtmlScrollbarGutter = ''
let prevBodyOverflowX = ''
let prevBodyOverflowY = ''
let prevBodyPaddingRight = ''
let prevScrollbarWidthVar = ''
let prevScrollbarSlotWidthVar = ''
// 补偿量变量名：锁定期间写入 html，值等于本次被腾出的滚动条宽度（槽位保住时为 0px）。
// 本库浮层内容层据此从右侧内缩；宿主自有固定定位元素（固定头尾、右侧栏等）也可据此自行补偿
const SCROLLBAR_WIDTH_VAR = '--va-scrollbar-width'
// 槽位带宽度变量名：锁定期间写入 html，值等于窗口右侧布局视口之外的宽度（回退路径下为 0px）。
// 由本库遮罩向右扩展消费，用于盖住滚动条隐藏后露出的空槽位，属库内部变量
const SCROLLBAR_SLOT_WIDTH_VAR = '--va-scrollbar-slot-width'
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
 * 隐藏 html/body 的滚动条，同时保住滚动条原本占用的布局宽度，避免布局视口宽度突变
 * 导致背景页面与浮层横向抖动（Windows 经典滚动条场景尤其明显）。
 * 优先用 `scrollbar-gutter: stable` 让槽位在滚动条隐藏后依然占位：布局视口宽度不变，
 * `position: fixed` 元素（Modal / Dialog / Drawer 的遮罩、弹窗、抽屉）与普通流内容都不位移。
 * 槽位未被保留时（浏览器不支持 `scrollbar-gutter`，或 overlay 滚动条模式下宿主用
 * `::-webkit-scrollbar` 自定义了占位滚动条）回退为 `body` 的 `padding-right` 补偿：
 * 普通流内容宽度保持不变，同时把补偿量写入 `--va-scrollbar-width`，由本库浮层内容层
 * （`.modal-layer` / `.dialog-layer` / `.drawer-container`）从右侧内缩，浮层几何与锁定前一致。
 *
 * 判据统一取「隐藏滚动条前后布局视口宽度的差值」：差值归零即槽位已保住，无需补偿；
 * 差值仍在时即槽位未保住，用同一差值做等量补偿，不依赖浏览器对 `scrollbar-gutter` 的支持情况。
 *
 * 锁定期间在 html 上恒有两个宽度变量（无对应宽度时为 0px，避免使用方读到空值）：
 * - `--va-scrollbar-width`：本次被腾出的滚动条宽度，即需要从右侧补回的补偿量；
 * - `--va-scrollbar-slot-width`：窗口右侧布局视口之外的槽位带宽度，供遮罩向右扩展，
 *   盖住滚动条隐藏后露出的空槽位（该区域只由画布绘制，元素的盒模型覆盖不到）。
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
    prevHtmlScrollbarGutter = html.style.scrollbarGutter
    prevBodyOverflowX = body.style.overflowX
    prevBodyOverflowY = body.style.overflowY
    prevBodyPaddingRight = body.style.paddingRight
    prevScrollbarWidthVar = html.style.getPropertyValue(SCROLLBAR_WIDTH_VAR)
    prevScrollbarSlotWidthVar = html.style.getPropertyValue(SCROLLBAR_SLOT_WIDTH_VAR)
    // 横向滚动条是否占用布局高度：scrollbar-gutter 只保留 inline 轴槽位，不影响该读数
    const horizontalScrollbarHeight = window.innerHeight - html.clientHeight
    // 隐藏滚动条后可用宽度变宽多少，就是本次要补偿（或靠保留槽位省掉）的量
    const layoutWidth = getLayoutViewportWidth()
    html.style.overflowY = 'hidden'
    body.style.overflowY = 'hidden'
    // 本次需要从右侧补回的宽度：槽位保住时为 0，回退为等量补偿时等于被腾出的宽度
    let compensation = 0
    let growth = getLayoutViewportWidth() - layoutWidth
    if (growth > LAYOUT_SIZE_TOLERANCE) {
      // 先尝试保留滚动条槽位：宿主已声明 both-edges 时保持其对称语义
      const currentGutter = html.style.scrollbarGutter || getComputedStyle(html).scrollbarGutter || ''
      html.style.scrollbarGutter = currentGutter.includes('both-edges') ? 'stable both-edges' : 'stable'
      growth = getLayoutViewportWidth() - layoutWidth
      if (growth > LAYOUT_SIZE_TOLERANCE) {
        // 槽位未被保留（浏览器不支持，或自定义占位滚动条）：清掉本次临时样式，回退为等量补偿
        html.style.scrollbarGutter = prevHtmlScrollbarGutter
        const basePaddingRight = Number.parseFloat(getComputedStyle(body).paddingRight) || 0
        body.style.paddingRight = `${basePaddingRight + growth}px`
        compensation = growth
      }
    }
    if (horizontalScrollbarHeight <= LAYOUT_SIZE_TOLERANCE) {
      html.style.overflowX = 'hidden'
      body.style.overflowX = 'hidden'
    }
    // 槽位带宽度：非零说明锁定后窗口右侧留有一条空槽位（含宿主自行声明 scrollbar-gutter 的情况）
    const slotWidth = Math.max(window.innerWidth - getLayoutViewportWidth(), 0)
    html.style.setProperty(SCROLLBAR_WIDTH_VAR, `${compensation}px`)
    html.style.setProperty(SCROLLBAR_SLOT_WIDTH_VAR, `${slotWidth}px`)
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
      html.style.scrollbarGutter = prevHtmlScrollbarGutter
      body.style.overflowX = prevBodyOverflowX
      body.style.overflowY = prevBodyOverflowY
      body.style.paddingRight = prevBodyPaddingRight
      restoreCssVar(SCROLLBAR_WIDTH_VAR, prevScrollbarWidthVar)
      restoreCssVar(SCROLLBAR_SLOT_WIDTH_VAR, prevScrollbarSlotWidthVar)
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

_内部基于引用计数实现，可多入口并存；锁定时保留滚动条占位宽度，页面内容与本库浮层都不位移_

- **调用与释放严格配对**：每次调用 `lockScroll` 使全局计数加一，仅首个调用真正设置样式、最后一个释放时才真正还原页面。因此返回的释放函数必须与本次调用配对使用（重复调用无副作用）。
- **多入口并存安全**：多个入口（如 `Modal` / `Dialog` / `Drawer` 及多 `Provider` 并存）各自锁定互不覆盖，任一入口提前释放也不会误还原其它入口仍持有的锁。
- **滚动条占位保留与补偿（两条路径下本库浮层都不位移）**：为避免滚动条消失导致背景与浮层横向抖动，内部先量出布局视口宽度（`documentElement.getBoundingClientRect().width`），隐藏滚动条后再量一次，用两者的差值同时作为判据与补偿量：差值归零说明 `scrollbar-gutter: stable` 的槽位已保住——布局视口宽度不变，`position: fixed` 的遮罩 / 弹窗 / 抽屉、宿主自有固定元素与普通流内容都不位移；差值仍在（浏览器不支持 `scrollbar-gutter` —— 该属性为 `Baseline 2024`，即 Chrome / Edge `94+`、Firefox `97+`、Safari `18.2+`；或 `overlay` 滚动条模式下宿主用 `::-webkit-scrollbar` 自定义了占位滚动条）则回退为 `body` 的 `padding-right` 等量补偿（叠加在宿主已有 padding 之上），同时由本库浮层内容层（`.modal-layer` / `.dialog-layer` / `.drawer-container`）按补偿量从右侧内缩，**本库浮层的几何在两条路径下都与锁定前一致**；只有**宿主自有的**固定定位元素在回退路径下仍会横移，可按下面的变量自行补偿（本库其它不参与滚动锁的固定定位层，如图片预览遮罩、通知 / 消息 / 回到顶部等，同样会随之位移）。`macOS` 触控板默认的 `overlay` 滚动条不占布局宽度，此时差值为 `0`，不会做任何补偿；宿主已声明 `scrollbar-gutter: stable both-edges` 时不会被覆盖。
- **锁定期间的宽度变量（写在 `html` 上，锁定期间恒有值）**：`--va-scrollbar-width` 为本次被腾出的滚动条宽度，即需要从右侧补回的补偿量（槽位保住时为 `0px`）；`--va-scrollbar-slot-width` 为窗口右侧布局视口之外的槽位带宽度（回退路径下为 `0px`），由本库遮罩向右扩展消费，用于盖住滚动条隐藏后露出的空槽位——该区域只由画布（根元素背景）绘制，元素的盒模型覆盖不到，只能靠遮罩自身扩展，因此不再提供「改根元素背景色」的做法。补偿宿主自有固定元素时：与视口右边缘对齐的 `position: fixed` 元素用 `right: var(--va-scrollbar-width)`，铺满整屏的用 `right` 或 `padding-right`。
- **横向轴一并锁定**：只隐藏垂直滚动条会让 `overflow-x: visible` 计算为 `auto`，锁定期间页面仍可横向推移，故同时把 `html` / `body` 的 `overflow-x` 设为 `hidden`；页面本来就有横向滚动条时跳过该步（移除其占位会抬高布局视口，反而引起纵向位移）。
- **仅作用于页面级滚动**：隐藏的是 `html` / `body` 的滚动条，宿主自有的滚动容器（如 `#app { overflow: auto }`）内部滚动不受影响，也不会产生补偿。
- **如何判断走了哪条路径**：锁定期间读 `html` 上的 `--va-scrollbar-width`，`0px` 即槽位已保住、非 `0` 即走了回退补偿。建议在真机上覆盖：Windows Chrome / Edge / Firefox（经典滚动条）、macOS Chrome（系统「总是显示滚动条」/ 页面自定义 `::-webkit-scrollbar` / 默认 overlay 三种）、Safari `17` 与 `18.2+`、以及 `125%` 系统缩放。

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| release | 本次锁定的释放函数（幂等）；仅当所有来源均已释放时才真正还原页面滚动 | () => void |
