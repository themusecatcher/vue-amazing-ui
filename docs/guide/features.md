# 特性

## 简要介绍

该组件库采用 Vue3 + TS + Vite3 + Less 实现！

开箱即用！

## 三种组件库使用方式

- 全局引入所有组件
- 按需引入部分组件
- git clone [vue-amazing-ui](https://github.com/themusecatcher/vue-amazing-ui) 到本地后，从 packages 下单独拷贝单文件组件 (SFC) 到项目内使用

## 八个常用工具函数

| Function name | Descriptions | Arguments |
| :--- | :--- | :--- |
| dateFormat | 简单易用的日期格式化函数！ | (timestamp: number&#124;string&#124;Date, format = 'YYYY-MM-DD HH:mm:ss') => string  |
| requestAnimationFrame | 针对不同浏览器进行兼容处理！ | 使用方式不变 |
| cancelAnimationFrame | 针对不同浏览器进行兼容处理！ | 使用方式不变 |
| rafTimeout | 使用 requestAnimationFrame 实现的定时器函数，等效替代 (setTimeout 和 setInterval)！ | (func: Function, delay = 0, interval = false) => object |
| cancelRaf | 用于取消 rafTimeout 函数！ | (raf: { id: number }) => void |
| throttle | 使用 rafTimeout 实现的节流函数！ | (fn: Function, delay = 300) => any |
| debounce | 使用 rafTimeout 实现的防抖函数！ | (fn: Function, delay = 300) => any |
| add | 消除js加减精度问题的加法函数！ | (num1: number, num2: number) => number |

## 工具函数使用方式

```vue
<script setup lang="ts">
import { dateFormat, requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce, add } from 'vue-amazing-ui'

</script>
```
