<script setup lang="ts">
import { ref } from 'vue'
import type { PopoverProps } from 'components/popover'
function openChange(open: boolean) {
  console.log('open', open)
}
// 弹出位置：6 个方向（含复合方向），默认的箭头与翻转行为可一屏对比
type PopoverPlacement = NonNullable<PopoverProps['placement']>
const placements: PopoverPlacement[] = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']
const placement = ref<PopoverPlacement>('top')
// 受控显示：显隐由 v-model:open 接管，内部触发的开合经 update:open 回传
const controlledOpen = ref(false)
// openControl：显隐只由 open 驱动
const openControlOpen = ref(false)
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Popover title="Title" @open-change="openChange">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Hover me</Button>
    </Popover>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Popover
      :max-width="180"
      bg-color="#000"
      :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
      :content-style="{ color: '#fff' }"
      :tooltip-style="{ padding: '12px 18px', borderRadius: '12px' }"
    >
      <template #title> Custom Title </template>
      <template #content>
        <p>Custom Content</p>
        <p>Custom Content</p>
      </template>
      <Button type="primary">Hover me</Button>
    </Popover>
    <h2 class="mt30 mb10">弹出位置</h2>
    <p class="mb10">
      通过 <code>placement</code> 指定方向；复合方向（如 <code>topLeft</code>）配合
      <code>arrowPointAtCenter</code> 可让箭头指向触发元素中心，空间不足时 <code>flip</code> 会自动翻转
    </p>
    <div style="margin-bottom: 16px">
      <Space align="center">
        placement:
        <Segmented v-model:value="placement" :options="placements" />
      </Space>
    </div>
    <Popover :placement="placement" title="Title">
      <template #content>
        <p>Content</p>
      </template>
      <Button type="primary">Adjust Placement</Button>
    </Popover>
    <h2 class="mt30 mb10">不同的触发方式</h2>
    <Space>
      <Popover title="Hover Title">
        <template #content>
          <p>Content</p>
          <p>Content</p>
        </template>
        <Button type="primary">Hover Me</Button>
      </Popover>
      <Popover title="Click Title" trigger="click">
        <template #content>
          <p>Content</p>
          <p>Content</p>
        </template>
        <Button type="primary">Click Me</Button>
      </Popover>
    </Space>
    <h2 class="mt30 mb10">受控显示</h2>
    <p class="mb10">
      使用 <code>v-model:open</code> 控制显隐；<code>openControl</code> 为真时
      <code>trigger: hover</code> 不再驱动显隐，显隐完全由 <code>open</code> 决定
    </p>
    <Space vertical align="start" :gap="12">
      <Space>
        <Popover v-model:open="controlledOpen" title="Click Title" trigger="click">
          <template #content>
            <a @click="controlledOpen = false">Close</a>
          </template>
          <Button>Controlled: {{ controlledOpen }}</Button>
        </Popover>
        <Button type="primary" @click="controlledOpen = !controlledOpen">Toggle Open</Button>
      </Space>
      <Space>
        <Popover v-model:open="openControlOpen" open-control trigger="hover" title="Controlled Only">
          <template #content>
            <p>悬停不会展开，只有 open 为真才显示</p>
          </template>
          <Button>Hover (openControl)</Button>
        </Popover>
        <Button type="primary" @click="openControlOpen = !openControlOpen">Toggle Open (openControl)</Button>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义过渡动画时间</h2>
    <Popover title="Transition Duration 300ms" :transition-duration="300">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Transition Duration 300ms</Button>
    </Popover>
    <h2 class="mt30 mb10">延迟显示隐藏</h2>
    <Space>
      <Popover :show-delay="300" :hide-delay="300" title="delay 300ms" content="Vue Amazing UI">
        <Button type="primary">Delay 300ms Popover</Button>
      </Popover>
      <Popover :show-delay="500" :hide-delay="500" title="delay 500ms" content="Vue Amazing UI">
        <Button type="primary">Delay 500ms Popover</Button>
      </Popover>
    </Space>
    <h2 class="mt30 mb10">隐藏后卸载</h2>
    <p class="mb10">
      设置 <code>destroyOnHide</code> 后，浮层在离开动画结束时卸载 <code>DOM</code>，再次显示时重新创建并定位；默认
      <code>false</code>（元素常驻，仅切换显示）
    </p>
    <Space>
      <Popover title="Title" content="Vue Amazing UI" destroy-on-hide>
        <Button type="primary">Hover (destroyOnHide)</Button>
      </Popover>
      <Popover title="Title" content="Vue Amazing UI">
        <Button>Hover (default)</Button>
      </Popover>
    </Space>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Popover :arrow="false" title="Title">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <Button type="primary">Hide Arrow</Button>
    </Popover>
  </div>
</template>
