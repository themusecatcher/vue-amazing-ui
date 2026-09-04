# 页面滚动锁 lockScroll

<GlobalElement />

_锁定页面滚动并补偿滚动条宽度、防止页面横向抖动的工具函数_

内部维护全局引用计数：每次调用 `lockScroll` 与其返回的释放函数严格配对；仅首个调用真正设置样式，最后一个释放时才真正还原页面。
由此多个入口（如 `Modal` / `Dialog` / `Drawer` 及多 `Provider` 并存）各自锁定互不覆盖，任一入口提前释放也不会误还原其它入口仍持有的锁。

## 基本使用

```vue
<script setup lang="ts">
import { onUnmounted } from 'vue'
import { lockScroll } from 'vue-amazing-ui'
// 锁定滚动并持有本次的释放函数
const release = lockScroll()
// 业务中不再需要锁定时解除
function unlock() {
  release()
}
onUnmounted(() => {
  // 组件卸载兜底，防止打开状态下滚动锁残留
  release()
})
</script>
```

为避免滚动条消失导致页面横向抖动，内部会先测量滚动条宽度（`window.innerWidth - document.documentElement.clientWidth`），将其等量补到 `body` 的 `padding-right` 中；macOS 触控板默认的 overlay 滚动条不占布局宽度时，滚动条宽度为 `0`，不会额外添加 `padding`。

## Return

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| release | 本次锁定的释放函数。首次调用从全局计数中移除本次锁定，仅当所有来源均已释放时真正还原页面滚动；重复调用无副作用（幂等） | () => void |
