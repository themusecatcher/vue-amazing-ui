# 瀑布流 Waterfall

<br/>

*瀑布流展示图片列表*

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.1/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>

## 基本使用

*默认使用JS计算方式进行布局展示*

<br/>

<Waterfall :images="images" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.1/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <Waterfall :images="images" />
</template>
```

</details>

## 使用CSS布局方式

<Waterfall :images="images" mode="CSS" />

<details>
<summary>查看代码</summary>

```vue
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const images = ref<any[]>([])

function loadImages () {
  for (let i = 1; i <= 10; i++) {
    images.value.push({
      title: `image-${i}`,
      link: '',
      src: `https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.1/${i}.jpg`
    })
  }
}
onBeforeMount(() => { // 组件已完成响应式状态设置，但未创建DOM节点
  loadImages()
})
</script>
<template>
  <Waterfall :images="images" mode="CSS" />
</template>
```

</details>

## APIs

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
name |  |  |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change |  |
