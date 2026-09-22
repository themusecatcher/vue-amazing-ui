<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import { createDiscreteApi, useLoadingBar } from 'vue-amazing-ui'
import type { ConfigProviderTheme, DiscreteApiInstance, LoadingBarApi, LoadingBarProps } from 'vue-amazing-ui'
// 组件树内获取 api：外层 <LoadingBarProvider> 由 App.vue 入口全局包裹
const loadingBar = useLoadingBar()
// 各按钮组共享状态：结束按钮仅在「开始」后可用
// getApi 返回当前作用域的加载条 api：组件树内由 Provider 的 @ready 回传，setup 外由惰性单例提供
function createGroup(getApi: () => LoadingBarApi | undefined) {
  const finishDisabled = ref<boolean>(true)
  function start(): void {
    getApi()?.start()
    finishDisabled.value = false
  }
  function finish(): void {
    getApi()?.finish()
    finishDisabled.value = true
  }
  function error(): void {
    finishDisabled.value = true
    getApi()?.error()
  }
  return reactive({ finishDisabled, start, finish, error })
}
// 基本使用
const basicGroup = createGroup(() => loadingBar)
// 局部加载条
const localCardRef = ref<HTMLDivElement>()
const localLoadingBar = ref<LoadingBarApi>()
const localGroup = createGroup(() => localLoadingBar.value)
// 自定义加载条样式
const customCardRef = ref<HTMLDivElement>()
const customLoadingBar = ref<LoadingBarApi>()
const customGroup = createGroup(() => customLoadingBar.value)
// 按状态自定义加载条样式：loading / finish / error 三态各注入一段样式
const stateCardRef = ref<HTMLDivElement>()
const stateLoadingBar = ref<LoadingBarApi>()
const stateGroup = createGroup(() => stateLoadingBar.value)
const stateLoadingBarStyle: LoadingBarProps['loadingBarStyle'] = {
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
// 主题跟随
const themeCardRef = ref<HTMLDivElement>()
const themeLoadingBar = ref<LoadingBarApi>()
const themeGroup = createGroup(() => themeLoadingBar.value)
const themeColor = ref<string>('#18a058')
const loadingBarTheme = computed<ConfigProviderTheme>(() => ({
  LoadingBar: {
    primaryColor: themeColor.value
  }
}))
// 在 setup 外使用：惰性单例，仅首次调用时创建，避免重复创建独立实例与挂载 DOM
let discreteLoadingBar: DiscreteApiInstance<'loadingBar'> | null = null
function getDiscreteLoadingBar(): LoadingBarApi {
  if (!discreteLoadingBar) {
    discreteLoadingBar = createDiscreteApi(['loadingBar'])
  }
  return discreteLoadingBar.loadingBar
}
const discreteGroup = createGroup(getDiscreteLoadingBar)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">使用方式</h2>
    <Alert type="warning" message="提示" show-icon style="max-width: 800px">
      <template #icon>
        <ExclamationCircleFilled />
      </template>
      <template #description>
        <Space vertical>
          <p>
            本页示例在 <code>setup</code> 内通过 <code>useLoadingBar()</code> 获取 api，需在应用入口
            <code>App.vue</code> 用 <code>&lt;LoadingBarProvider&gt;</code> 包裹（本项目已在入口全局包裹）。
          </p>
          <p>
            在 <code>setup</code> 之外（<code>axios</code> 拦截器、路由守卫、<code>Pinia action</code> 等）调用时，改用
            <code>createDiscreteApi(['loadingBar'])</code> 创建脱离组件树的独立实例，无需外层
            <code>&lt;LoadingBarProvider&gt;</code>：
          </p>
          <Space>
            <Button type="primary" @click="discreteGroup.start">开始</Button>
            <Button :disabled="discreteGroup.finishDisabled" @click="discreteGroup.finish">结束</Button>
            <Button type="danger" @click="discreteGroup.error">报个错</Button>
          </Space>
        </Space>
      </template>
    </Alert>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">点击「开始」后加载条出现在页面顶部</p>
    <Space>
      <Button type="primary" @click="basicGroup.start">开始</Button>
      <Button :disabled="basicGroup.finishDisabled" @click="basicGroup.finish">结束</Button>
      <Button type="danger" @click="basicGroup.error">报个错</Button>
    </Space>
    <h2 class="mt30 mb10">局部加载条</h2>
    <p class="mb10">
      通过 <code>to</code> 指定加载条的挂载位置，配合 <code>container-style</code> 让它落在局部容器内；容器内的按钮通过
      <code>&lt;LoadingBarProvider&gt;</code> 的 <code>@ready</code> 事件取到该作用域内的 api
    </p>
    <div class="card-container">
      <div ref="localCardRef" class="card-target"></div>
      <LoadingBarProvider
        :to="localCardRef"
        :container-style="{ position: 'absolute' }"
        @ready="localLoadingBar = $event"
      >
        <Space>
          <Button type="primary" @click="localGroup.start">开始</Button>
          <Button :disabled="localGroup.finishDisabled" @click="localGroup.finish">结束</Button>
          <Button type="danger" @click="localGroup.error">报个错</Button>
        </Space>
      </LoadingBarProvider>
    </div>
    <h2 class="mt30 mb10">自定义加载条样式</h2>
    <p class="mb10">
      通过 <code>loading-bar-size</code> / <code>color-loading</code> / <code>color-finish</code> /
      <code>color-error</code> 自定义加载条的高度与各状态颜色
    </p>
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
          <Button type="primary" @click="customGroup.start">开始</Button>
          <Button :disabled="customGroup.finishDisabled" @click="customGroup.finish">结束</Button>
          <Button type="danger" @click="customGroup.error">报个错</Button>
        </Space>
      </LoadingBarProvider>
    </div>
    <h2 class="mt30 mb10">按状态自定义样式</h2>
    <p class="mb10">
      <code>loading-bar-style</code> 按状态（<code>loading</code> / <code>finish</code> /
      <code>error</code>）给进度条注入任意样式，可实现渐变、阴影等 <code>color-loading</code> /
      <code>color-finish</code> / <code>color-error</code> 无法表达的定制；与颜色属性设置同名样式时，以内联样式为准
    </p>
    <div class="card-container">
      <div ref="stateCardRef" class="card-target"></div>
      <LoadingBarProvider
        :to="stateCardRef"
        :container-style="{ position: 'absolute' }"
        :loading-bar-style="stateLoadingBarStyle"
        @ready="stateLoadingBar = $event"
      >
        <Space>
          <Button type="primary" @click="stateGroup.start">开始</Button>
          <Button :disabled="stateGroup.finishDisabled" @click="stateGroup.finish">结束</Button>
          <Button type="danger" @click="stateGroup.error">报个错</Button>
        </Space>
      </LoadingBarProvider>
    </div>
    <h2 class="mt30 mb10">主题跟随</h2>
    <p class="mb10">
      加载条默认取 <code>ConfigProvider</code> 中 <code>LoadingBar.primaryColor</code> 生成的调色板，
      改变主色即可让加载中 / 加载完成颜色同步跟随
    </p>
    <Flex vertical>
      <Space align="center" class="mb10">
        primaryColor:
        <!-- ColorPicker 的 width 默认 '100%'，在 Space 中会被解析成整行宽度把标签挤到上一行，故显式给定宽度 -->
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
              <Button type="primary" @click="themeGroup.start">开始</Button>
              <Button :disabled="themeGroup.finishDisabled" @click="themeGroup.finish">结束</Button>
              <Button type="danger" @click="themeGroup.error">报个错</Button>
            </Space>
          </LoadingBarProvider>
        </div>
      </ConfigProvider>
    </Flex>
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
