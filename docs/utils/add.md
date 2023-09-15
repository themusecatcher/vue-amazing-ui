# 加法<BackTop />

::: details Show Source Code

```ts
function add (num1: number, num2: number): number {
  const num1DeciStr = String(num1).split('.')[1]
  const num2DeciStr = String(num2).split('.')[1]
  let maxLen = Math.max(num1DeciStr?.length || 0, num2DeciStr?.length || 0) // 两数中最长的小数位长度
  let num1Str = num1.toFixed(maxLen) // 补零，返回字符串
  let num2Str = num2.toFixed(maxLen)
  const result = +(num1Str.replace('.', '')) + +(num2Str.replace('.', '')) // 转换为整数相加
  return result / Math.pow(10, maxLen)
}
```

:::

## 何时使用

- 消除js加减精度问题时

## 基本使用

```vue
<script setup lang="ts">
import { add } from 'vue-amazing-ui'

console.log(0.1 + 0.2) // js直接计算结果: 0.30000000000000004
add(0.1, 0.2) // 0.3
</script>
```

## Params

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
num1 | 加数1 | number | - | true
num2 | 加数2 | number | - | true
