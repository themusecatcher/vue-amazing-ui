# 加载条 LoadingBar

<GlobalElement />

*加载进度条*

## 何时使用

- 加载数据时，显示加载条，提示用户正在加载
- 显示整个页面加载的进度
- 显示上传图片或文件的上传进度

::: warning 提示
`LoadingBar` 推荐在组件 `setup` 内通过 `useLoadingBar()` 调用，使用前需在应用根节点放置一次 `<LoadingBarProvider>`。<br/>
如果你想在 `setup` 外使用（例如 `axios` 拦截器、路由守卫、`Pinia action` 等），请参考文档末尾的 [在 setup 外使用](#在-setup-外使用)。
:::

## 使用方式

| 调用方式 | API | 适用位置 |
| :-- | :-- | :-- |
| 组件树内调用 <Tag color="success" size="small">推荐</Tag> | `useLoadingBar()` | 组件 `setup` 内，需外层存在 `<LoadingBarProvider>` |
| 脱离组件树调用 <Tag color="processing" size="small">无需 LoadingBarProvider</Tag> | `createDiscreteApi()` | 任意位置（`axios` 拦截器、路由守卫、`Pinia action` 等） |

### 组件树内使用：`useLoadingBar()` <Tag color="success" size="small">推荐</Tag>

<br/>

*适用于组件内部调用：先在应用根节点放置一次 `<LoadingBarProvider>`，之后任意层级组件均可通过 `useLoadingBar()` 取得同一实例*

::: info 关于 `LoadingBarProvider` 与 `LoadingBar`

- `LoadingBarProvider` 内部渲染一个 `LoadingBar` 组件，并通过 `provide/inject` 向下提供 `useLoadingBar()` 所需的 `API`，自身不渲染任何可见内容
- 加载条的配置属性（`loadingBarSize` / `colorLoading` / `colorFinish` / `colorError` / `loadingBarStyle` / `to` 等）会透传给内部的 `LoadingBar`，因此直接参考下方 [LoadingBarProvider Props](#loadingbarprovider) 设置即可
- 使用 `useLoadingBar()` 时，组件级配置设置在 `<LoadingBarProvider>` 上（无法直接接触内部 `LoadingBar`）；逐次调用的参数差异通过 `start(from, to, status)` 传入

:::

**1. 在应用根节点放置 `LoadingBarProvider`**

::: tip App.vue

```vue
<script setup lang="ts">
import { LoadingBarProvider } from 'vue-amazing-ui'
</script>
<template>
  <LoadingBarProvider>
    <RouterView />
  </LoadingBarProvider>
</template>
```

:::

**2. 在任意层级组件中调用 `useLoadingBar()`**

::: tip XXX.vue

```vue
<script setup lang="ts">
import { useLoadingBar } from 'vue-amazing-ui'
const loadingBar = useLoadingBar()
function onClick() {
  loadingBar.start()
}
</script>
<template>
  <Button @click="onClick">开始加载</Button>
</template>
```

:::

<script setup lang="ts">
import { computed, ref } from 'vue'
import { LoadingBarProvider, createDiscreteApi, useLoadingBar } from 'vue-amazing-ui'
import type { ConfigProviderTheme, DiscreteApiInstance, LoadingBarApi } from 'vue-amazing-ui'
// 组件树内获取 api：docs 站点已在主题层全局包裹 <LoadingBarProvider>（本项目 App.vue 同样在入口全局包裹）
const loadingBar = useLoadingBar()
// 基本使用
const finishDisabled = ref<boolean>(true)
function onStart() {
  loadingBar.start()
  finishDisabled.value = false
}
function onFinish() {
  loadingBar.finish()
  finishDisabled.value = true
}
function onError() {
  finishDisabled.value = true
  loadingBar.error()
}
// 局部加载条
const localCardRef = ref<HTMLDivElement>()
const localLoadingBar = ref<LoadingBarApi>()
const localFinishDisabled = ref<boolean>(true)
function onLocalStart() {
  localLoadingBar.value?.start()
  localFinishDisabled.value = false
}
function onLocalFinish() {
  localLoadingBar.value?.finish()
  localFinishDisabled.value = true
}
function onLocalError() {
  localFinishDisabled.value = true
  localLoadingBar.value?.error()
}
// 自定义加载条样式
const customCardRef = ref<HTMLDivElement>()
const customLoadingBar = ref<LoadingBarApi>()
const customFinishDisabled = ref<boolean>(true)
function onCustomStart() {
  customLoadingBar.value?.start()
  customFinishDisabled.value = false
}
function onCustomFinish() {
  customLoadingBar.value?.finish()
  customFinishDisabled.value = true
}
function onCustomError() {
  customFinishDisabled.value = true
  customLoadingBar.value?.error()
}
// 按状态自定义加载条样式：loading / finish / error 三态各注入一段样式
const stateCardRef = ref<HTMLDivElement>()
const stateLoadingBar = ref<LoadingBarApi>()
const stateFinishDisabled = ref<boolean>(true)
const stateLoadingBarStyle = {
  loading: {
    background: 'linear-gradient(90deg, #2db7f5, #52c41a)',
    boxShadow: '0 0 8px #2db7f5'
  },
  finish: {
    background: 'linear-gradient(90deg, #52c41a, #2db7f5)',
    boxShadow: '0 0 8px #52c41a'
  },
  error: {
    background: 'linear-gradient(90deg, #ff4d4f, #faad14)'
  }
}
function onStateStart() {
  stateLoadingBar.value?.start()
  stateFinishDisabled.value = false
}
function onStateFinish() {
  stateLoadingBar.value?.finish()
  stateFinishDisabled.value = true
}
function onStateError() {
  stateFinishDisabled.value = true
  stateLoadingBar.value?.error()
}
// 主题跟随
const themeCardRef = ref<HTMLDivElement>()
const themeLoadingBar = ref<LoadingBarApi>()
const themeFinishDisabled = ref<boolean>(true)
const themeColor = ref<string>('#18a058')
const loadingBarTheme = computed<ConfigProviderTheme>(() => ({
  LoadingBar: {
    primaryColor: themeColor.value
  }
}))
function onThemeStart() {
  themeLoadingBar.value?.start()
  themeFinishDisabled.value = false
}
function onThemeFinish() {
  themeLoadingBar.value?.finish()
  themeFinishDisabled.value = true
}
function onThemeError() {
  themeFinishDisabled.value = true
  themeLoadingBar.value?.error()
}
// 在 setup 外使用：惰性单例，仅首次调用时创建，避免重复创建独立实例与挂载 DOM
let discreteLoadingBar: DiscreteApiInstance<'loadingBar'> | null = null
const discreteFinishDisabled = ref<boolean>(true)
function getDiscreteLoadingBar(): LoadingBarApi {
  if (!discreteLoadingBar) {
    discreteLoadingBar = createDiscreteApi(['loadingBar'])
  }
  return discreteLoadingBar.loadingBar
}
function onDiscreteStart() {
  getDiscreteLoadingBar().start()
  discreteFinishDisabled.value = false
}
function onDiscreteFinish() {
  getDiscreteLoadingBar().finish()
  discreteFinishDisabled.value = true
}
function onDiscreteError() {
  discreteFinishDisabled.value = true
  getDiscreteLoadingBar().error()
}
</script>

---

> 本文档网站已在主题层全局包裹 `<LoadingBarProvider>`，以下演示均通过 `useLoadingBar()` 获取实例（与真实项目用法一致）；需要不同配置的演示，均通过页面内局部嵌套 `<LoadingBarProvider>` 实现。

## 基本使用

*点击「开始」后加载条出现在页面顶部*

<br/>

<Space>
  <Button type="primary" @click="onStart">开始</Button>
  <Button :disabled="finishDisabled" @click="onFinish">结束</Button>
  <Button type="danger" @click="onError">报个错</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useLoadingBar } from 'vue-amazing-ui'
const loadingBar = useLoadingBar()
const finishDisabled = ref(true)
function onStart() {
  loadingBar.start()
  finishDisabled.value = false
}
function onFinish() {
  loadingBar.finish()
  finishDisabled.value = true
}
function onError() {
  finishDisabled.value = true
  loadingBar.error()
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onStart">开始</Button>
    <Button :disabled="finishDisabled" @click="onFinish">结束</Button>
    <Button type="danger" @click="onError">报个错</Button>
  </Space>
</template>
```

:::

## 局部加载条

*通过 `to` 指定加载条的挂载位置，配合 `container-style` 让它落在局部容器内；容器内的按钮通过 `<LoadingBarProvider>` 的 `@ready` 事件取到该作用域内的 api*

<br/>

<div class="card-container">
  <div ref="localCardRef" class="card-target"></div>
  <LoadingBarProvider
    :to="localCardRef"
    :container-style="{ position: 'absolute' }"
    @ready="localLoadingBar = $event"
  >
    <Space>
      <Button type="primary" @click="onLocalStart">开始</Button>
      <Button :disabled="localFinishDisabled" @click="onLocalFinish">结束</Button>
      <Button type="danger" @click="onLocalError">报个错</Button>
    </Space>
  </LoadingBarProvider>
</div>

<style lang="less" scoped>
.card-container {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 720px;
  height: 120px;
  padding: 16px 24px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
}
.card-target {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LoadingBarProvider } from 'vue-amazing-ui'
import type { LoadingBarApi } from 'vue-amazing-ui'
const localCardRef = ref<HTMLDivElement>()
const localLoadingBar = ref<LoadingBarApi>()
const localFinishDisabled = ref(true)
function onLocalStart() {
  localLoadingBar.value?.start()
  localFinishDisabled.value = false
}
function onLocalFinish() {
  localLoadingBar.value?.finish()
  localFinishDisabled.value = true
}
function onLocalError() {
  localFinishDisabled.value = true
  localLoadingBar.value?.error()
}
</script>
<template>
  <div class="card-container">
    <div ref="localCardRef" class="card-target"></div>
    <LoadingBarProvider
      :to="localCardRef"
      :container-style="{ position: 'absolute' }"
      @ready="localLoadingBar = $event"
    >
      <Space>
        <Button type="primary" @click="onLocalStart">开始</Button>
        <Button :disabled="localFinishDisabled" @click="onLocalFinish">结束</Button>
        <Button type="danger" @click="onLocalError">报个错</Button>
      </Space>
    </LoadingBarProvider>
  </div>
</template>
<style lang="less" scoped>
.card-container {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 720px;
  height: 120px;
  padding: 16px 24px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
}
.card-target {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>
```

:::

## 自定义加载条样式

*通过 `loading-bar-size` / `color-loading` / `color-finish` / `color-error` 自定义加载条的高度与各状态颜色*

<br/>

<div class="card-container">
  <div ref="customCardRef" class="card-target"></div>
  <LoadingBarProvider
    :to="customCardRef"
    :container-style="{ position: 'absolute' }"
    :loading-bar-size="5"
    color-loading="#2db7f5"
    color-finish="#52c41a"
    color-error="magenta"
    @ready="customLoadingBar = $event"
  >
    <Space>
      <Button type="primary" @click="onCustomStart">开始</Button>
      <Button :disabled="customFinishDisabled" @click="onCustomFinish">结束</Button>
      <Button type="danger" @click="onCustomError">报个错</Button>
    </Space>
  </LoadingBarProvider>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LoadingBarProvider } from 'vue-amazing-ui'
import type { LoadingBarApi } from 'vue-amazing-ui'
const customCardRef = ref<HTMLDivElement>()
const customLoadingBar = ref<LoadingBarApi>()
const customFinishDisabled = ref(true)
function onCustomStart() {
  customLoadingBar.value?.start()
  customFinishDisabled.value = false
}
function onCustomFinish() {
  customLoadingBar.value?.finish()
  customFinishDisabled.value = true
}
function onCustomError() {
  customFinishDisabled.value = true
  customLoadingBar.value?.error()
}
</script>
<template>
  <div class="card-container">
    <div ref="customCardRef" class="card-target"></div>
    <LoadingBarProvider
      :to="customCardRef"
      :container-style="{ position: 'absolute' }"
      :loading-bar-size="5"
      color-loading="#2db7f5"
      color-finish="#52c41a"
      color-error="magenta"
      @ready="customLoadingBar = $event"
    >
      <Space>
        <Button type="primary" @click="onCustomStart">开始</Button>
        <Button :disabled="customFinishDisabled" @click="onCustomFinish">结束</Button>
        <Button type="danger" @click="onCustomError">报个错</Button>
      </Space>
    </LoadingBarProvider>
  </div>
</template>
```

:::

## 按状态自定义样式

*`loading-bar-style` 按状态（`loading` / `finish` / `error`）给进度条注入任意样式，可实现渐变、阴影等 `color-loading` / `color-finish` / `color-error` 无法表达的定制；与颜色属性设置同名样式时，以内联样式为准*

<br/>

<div class="card-container">
  <div ref="stateCardRef" class="card-target"></div>
  <LoadingBarProvider
    :to="stateCardRef"
    :container-style="{ position: 'absolute' }"
    :loading-bar-style="stateLoadingBarStyle"
    @ready="stateLoadingBar = $event"
  >
    <Space>
      <Button type="primary" @click="onStateStart">开始</Button>
      <Button :disabled="stateFinishDisabled" @click="onStateFinish">结束</Button>
      <Button type="danger" @click="onStateError">报个错</Button>
    </Space>
  </LoadingBarProvider>
</div>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LoadingBarProvider } from 'vue-amazing-ui'
import type { LoadingBarApi } from 'vue-amazing-ui'
const stateCardRef = ref<HTMLDivElement>()
const stateLoadingBar = ref<LoadingBarApi>()
const stateFinishDisabled = ref(true)
const stateLoadingBarStyle = {
  loading: {
    background: 'linear-gradient(90deg, #2db7f5, #52c41a)',
    boxShadow: '0 0 8px #2db7f5'
  },
  finish: {
    background: 'linear-gradient(90deg, #52c41a, #2db7f5)',
    boxShadow: '0 0 8px #52c41a'
  },
  error: {
    background: 'linear-gradient(90deg, #ff4d4f, #faad14)'
  }
}
function onStateStart() {
  stateLoadingBar.value?.start()
  stateFinishDisabled.value = false
}
function onStateFinish() {
  stateLoadingBar.value?.finish()
  stateFinishDisabled.value = true
}
function onStateError() {
  stateFinishDisabled.value = true
  stateLoadingBar.value?.error()
}
</script>
<template>
  <div class="card-container">
    <div ref="stateCardRef" class="card-target"></div>
    <LoadingBarProvider
      :to="stateCardRef"
      :container-style="{ position: 'absolute' }"
      :loading-bar-style="stateLoadingBarStyle"
      @ready="stateLoadingBar = $event"
    >
      <Space>
        <Button type="primary" @click="onStateStart">开始</Button>
        <Button :disabled="stateFinishDisabled" @click="onStateFinish">结束</Button>
        <Button type="danger" @click="onStateError">报个错</Button>
      </Space>
    </LoadingBarProvider>
  </div>
</template>
```

:::

## 主题跟随

*加载条默认取 `ConfigProvider` 中 `LoadingBar.primaryColor` 生成的调色板，改变主色即可让加载中 / 加载完成颜色同步跟随*

<br/>

<Flex vertical>
  <Space align="center" class="mb10">
    primaryColor:
    <ColorPicker :width="200" v-model:value="themeColor" />
  </Space>
  <ConfigProvider :theme="loadingBarTheme">
    <div class="card-container">
      <div ref="themeCardRef" class="card-target"></div>
      <LoadingBarProvider
        :to="themeCardRef"
        :container-style="{ position: 'absolute' }"
        @ready="themeLoadingBar = $event"
      >
        <Space>
          <Button type="primary" @click="onThemeStart">开始</Button>
          <Button :disabled="themeFinishDisabled" @click="onThemeFinish">结束</Button>
          <Button type="danger" @click="onThemeError">报个错</Button>
        </Space>
      </LoadingBarProvider>
    </div>
  </ConfigProvider>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { LoadingBarProvider } from 'vue-amazing-ui'
import type { ConfigProviderTheme, LoadingBarApi } from 'vue-amazing-ui'
const themeCardRef = ref<HTMLDivElement>()
const themeLoadingBar = ref<LoadingBarApi>()
const themeFinishDisabled = ref(true)
const themeColor = ref('#18a058')
const loadingBarTheme = computed<ConfigProviderTheme>(() => ({
  LoadingBar: {
    primaryColor: themeColor.value
  }
}))
function onThemeStart() {
  themeLoadingBar.value?.start()
  themeFinishDisabled.value = false
}
function onThemeFinish() {
  themeLoadingBar.value?.finish()
  themeFinishDisabled.value = true
}
function onThemeError() {
  themeFinishDisabled.value = true
  themeLoadingBar.value?.error()
}
</script>
<template>
  <Flex vertical>
    <Space align="center" class="mb10">
      primaryColor:
      <ColorPicker :width="200" v-model:value="themeColor" />
    </Space>
    <ConfigProvider :theme="loadingBarTheme">
      <div class="card-container">
        <div ref="themeCardRef" class="card-target"></div>
        <LoadingBarProvider
          :to="themeCardRef"
          :container-style="{ position: 'absolute' }"
          @ready="themeLoadingBar = $event"
        >
          <Space>
            <Button type="primary" @click="onThemeStart">开始</Button>
            <Button :disabled="themeFinishDisabled" @click="onThemeFinish">结束</Button>
            <Button type="danger" @click="onThemeError">报个错</Button>
          </Space>
        </LoadingBarProvider>
      </div>
    </ConfigProvider>
  </Flex>
</template>
```

:::

## APIs

### LoadingBarProvider

<br/>

*组件级配置属性（`class` / `style` 亦会透传到加载条容器）：会透传给内部的 `LoadingBar`*

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| containerClass | 加载条容器的类名 | string | undefined |
| containerStyle | 加载条容器的样式 | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | {} |
| loadingBarSize | 加载条大小，单位 `px` | number | 2 |
| colorLoading | 加载中颜色 | string | undefined |
| colorFinish | 加载完成颜色 | string | undefined |
| colorError | 加载错误颜色 | string | '#ff4d4f' |
| loadingBarStyle | 按状态自定义加载条样式，可选 `loading` / `finish` / `error`，取值为样式字符串或 [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | { loading?: string &#124; CSSProperties, finish?: string &#124; CSSProperties, error?: string &#124; CSSProperties } | undefined |
| to | 加载条的挂载位置，可选：元素标签名（例如 `'body'`）或者元素本身，`false` 会待在原地 | string &#124; HTMLElement &#124; false | 'body' |

> 组件上的 `class` / `style` 透传到加载条容器 `.loading-bar-wrap`（等价于 `containerClass` / `containerStyle`）。
>
> `colorLoading` / `colorFinish` 默认取 `LoadingBar.primaryColor` 生成的调色板（跟随主题），`colorError` 默认 `#ff4d4f`。
>
> `loadingBarStyle` 以内联样式作用于内层进度条：与 `loadingBarSize` / `colorLoading` / `colorFinish` / `colorError` 设置同一属性冲突时，以其为准；未提供 `finish` 时，完成态回落到 `loading` 的样式。

## Methods

*`useLoadingBar()` 返回的 `LoadingBarApi`，或通过 `<LoadingBarProvider>` 的 `@ready` 事件获取：*

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| start | 开始加载，`from` / `to` 为进度百分比（默认 `0` → `80`），`status` 决定起始状态的类名 | (from?: number, to?: number, status?: 'starting' &#124; 'error') => Promise&lt;void&gt; |
| finish | 结束加载，进度补满到 `100%` 后隐藏 | () => Promise&lt;void&gt; |
| error | 出现错误，进度条切为错误色并隐藏 | () => void |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| ready | 实例挂载完成时触发，参数为该实例的 api | (api: [LoadingBarApi](#methods)) => void |

## 在 setup 外使用

### `createDiscreteApi()`（脱离组件树）

<br/>

*适用于 `axios` 拦截器、路由守卫、`Pinia action` 等任意位置：内部会创建一个独立的应用实例，因此可在任意位置调用，无需外层 `LoadingBarProvider`*

::: tip 注意

- 主题使用内置默认值；如需自定义，通过第二个参数 `configProviderProps`（支持 `Ref` / `computed` 响应式）显式传入，详见 [全局化配置 ConfigProvider「主题同步到离散 API」](/guide/components/config-provider.html#主题同步到离散-api)
- 每次调用都会创建一套独立实例（独立的容器与加载条），建议缓存返回值复用，避免重复创建；不再使用时可通过返回的 `dispose()` 销毁该实例
- 内部会访问 `document`，`SSR` 场景请在客户端（点击回调、`onMounted` 等）中调用
- 不建议与 `useLoadingBar()` 在同一 App 中混用：两者各自持有独立实例，加载条互不影响

:::

::: tip XXX.ts（任意 .ts 文件）

```ts
import { createDiscreteApi } from 'vue-amazing-ui'

// 任意位置调用，无需外层 LoadingBarProvider
const { loadingBar } = createDiscreteApi(['loadingBar'])

// 例：路由守卫
router.beforeEach(() => {
  loadingBar.start()
})
router.afterEach(() => {
  loadingBar.finish()
})
```

:::

<Space>
  <Button type="primary" @click="onDiscreteStart">开始</Button>
  <Button :disabled="discreteFinishDisabled" @click="onDiscreteFinish">结束</Button>
  <Button type="danger" @click="onDiscreteError">报个错</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { createDiscreteApi } from 'vue-amazing-ui'
import type { DiscreteApiInstance, LoadingBarApi } from 'vue-amazing-ui'
// 惰性单例：仅首次调用时创建，避免重复创建独立实例与挂载 DOM
let discreteLoadingBar: DiscreteApiInstance<'loadingBar'> | null = null
const discreteFinishDisabled = ref(true)
function getDiscreteLoadingBar(): LoadingBarApi {
  if (!discreteLoadingBar) {
    discreteLoadingBar = createDiscreteApi(['loadingBar'])
  }
  return discreteLoadingBar.loadingBar
}
function onDiscreteStart() {
  getDiscreteLoadingBar().start()
  discreteFinishDisabled.value = false
}
function onDiscreteFinish() {
  getDiscreteLoadingBar().finish()
  discreteFinishDisabled.value = true
}
function onDiscreteError() {
  discreteFinishDisabled.value = true
  getDiscreteLoadingBar().error()
}
</script>
<template>
  <Space>
    <Button type="primary" @click="onDiscreteStart">开始</Button>
    <Button :disabled="discreteFinishDisabled" @click="onDiscreteFinish">结束</Button>
    <Button type="danger" @click="onDiscreteError">报个错</Button>
  </Space>
</template>
```

:::
