# 切换暗黑 toggleDark

<GlobalElement />

::: details Show Source Code

```ts
/*
  一键切换暗黑模式函数
  在 <html> 根元素上动态切换 dark 模式，在根元素添加 dark 类值，同时样式添加 color-scheme: dark，具体样式需自行添加
  // dark 主题样式参考如下：
  html {
    transition: filter .3s ease-in-out;
  }
  · invert(): 反转输入图像，1表示完全反转
  · hue-rotate(): 在输入图像上应用色相旋转
  html.dark { // 暗黑模式
    filter: invert(1) hue-rotate(180deg);
    img, video { // 将图片和视频再次反转以恢复原本的颜色
      filter: invert(1) hue-rotate(180deg);
    }
  }
*/
export function toggleDark() {
  const html = document.documentElement
  // 如果 <html> 上 dark 类值已存在，则移除它，否则添加它
  html.classList.toggle('dark')
  if (html.classList.contains('dark')) {
    html.style.colorScheme = 'dark'
  } else {
    html.style.colorScheme = 'light'
  }
}
```

:::

**一键切换暗黑模式：在 `<html>` 根元素上动态切换 `dark` 模式，只在根元素添加 `dark` 类值，同时样式添加 color-scheme: dark，具体样式需自行添加**

```less
// dark 主题样式参考如下：
html {
  transition: filter 0.3s ease-in-out;
}
· invert(): 反转输入图像，1表示完全反转
· hue-rotate(): 在输入图像上应用色相旋转
html.dark { // 暗黑模式
  filter: invert(1) hue-rotate(180deg);
  img, video { // 将图片和视频再次反转以恢复原本的颜色
    filter: invert(1) hue-rotate(180deg);
  }
}
```

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toggleDark, useMutationObserver } from 'vue-amazing-ui'
const themeDark = ref()
onMounted(() => {
  themeDark.value = document.documentElement.classList.contains('dark')
  const config = { attributes: true, childList: false, subtree: false }
  useMutationObserver(document.documentElement, () => {
    themeDark.value = document.documentElement.classList.contains('dark')
  }, config)
})
function onThemeChange () {
  toggleDark()
}
</script>

## 基本使用

<Switch class="u-theme-switch" v-model="themeDark" @change="onThemeChange" :node-style="{background: themeDark ? '#001529':'#fff'}">
  <template #node>
    <svg v-if="themeDark" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="u-dark-svg"><path d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"></path></svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="u-light-svg"><path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path><path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path><path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path><path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path><path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path><path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path><path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path><path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path><path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path></svg>
  </template>
</Switch>

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toggleDark, useMutationObserver } from 'vue-amazing-ui'
const themeDark = ref()
onMounted(() => {
  themeDark.value = document.documentElement.classList.contains('dark')
  const config = { attributes: true, childList: false, subtree: false }
  useMutationObserver(document.documentElement, () => {
    themeDark.value = document.documentElement.classList.contains('dark')
  }, config)
})
function onThemeChange () {
  toggleDark()
}
</script>
<template>
  <Switch class="u-theme-switch" v-model="themeDark" @change="onThemeChange" :node-style="{background: themeDark ? '#001529':'#fff'}">
    <template #node>
      <svg v-if="themeDark" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="u-dark-svg"><path d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"></path></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="u-light-svg"><path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path><path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path><path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path><path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path><path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path><path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path><path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path><path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path><path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path></svg>
    </template>
  </Switch>
</template>
<style lang="less" scoped>
.u-theme-switch {
  :deep(.switch-checked) {
    background: #faad14;
    &:hover:not(.disabled) {
      background: #e8b339;
    }
  }
  .u-dark-svg {
    width: 12px;
    height: 12px;
    fill: #fff;
  }
  .u-light-svg {
    width: 12px;
    height: 12px;
    fill: rgba(60, 60, 67, .75);
  }
}
</style>
```

<style lang="less" scoped>
.u-theme-switch {
  :deep(.switch-checked) {
    background: #faad14;
    &:hover:not(.disabled) {
      background: #e8b339;
    }
  }
  .u-dark-svg {
    width: 12px;
    height: 12px;
    fill: #fff;
  }
  .u-light-svg {
    width: 12px;
    height: 12px;
    fill: rgba(60, 60, 67, .75);
  }
}
</style>
