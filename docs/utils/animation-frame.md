# 动画帧<BackTop />

::: details  Show Source Code

```typescript
// @ts-ignore 兼容性requestAnimationFrame
const requestAnimationFrame = typeof window !== 'undefined' ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {}
// @ts-ignore 兼容性cancelAnimationFrame
const cancelAnimationFrame = typeof window !== 'undefined' ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {}
```

:::

## 何时使用

- 希望执行一个动画时

## 基本使用

*使用方法同官方用法*

- [MDN requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)
- [MDN cancelAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame)

```vue
<script setup lang="ts">
import { requestAnimationFrame, cancelAnimationFrame } from 'vue-amazing-ui'
</script>
```
