<script setup lang="ts">
import { h, ref } from 'vue'
import { FireFilled, QuestionCircleFilled, SoundFilled } from '@ant-design/icons-vue'
import { useMessage } from 'components/message'
import type { PopconfirmProps } from 'components/popconfirm'
const message = useMessage()
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.error('Click on No')
}
const openChange = (open: boolean) => {
  console.log('open', open)
}
// 受控显示：显隐由 v-model:open 接管，内部触发的开合经 update:open 回传
const controlledOpen = ref(false)
// openControl：显隐只由 open 驱动
const openControlOpen = ref(false)
// 弹出位置：6 个方向（含复合方向），默认的箭头与翻转行为可一屏对比
type PopconfirmPlacement = NonNullable<PopconfirmProps['placement']>
const placements: PopconfirmPlacement[] = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight']
const placement = ref<PopconfirmPlacement>('top')
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Popconfirm
      title="Are you sure delete this task ?"
      description="This will have other effects..."
      @ok="confirm"
      @cancel="cancel"
      @openChange="openChange"
    >
      <Button type="danger">Delete Confirm</Button>
    </Popconfirm>
    <h2 class="mt30 mb10">隐藏取消按钮</h2>
    <Popconfirm title="It's friendly reminder ..." :show-cancel="false" icon="info" @ok="confirm">
      <Button type="primary">Hidden Cancel Btn</Button>
    </Popconfirm>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Popconfirm
      :max-width="280"
      :show-cancel="false"
      :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
      :description-style="{ color: '#fff' }"
      bg-color="#000"
      :tooltip-style="{ padding: '16px 18px', borderRadius: '12px' }"
      :icon-style="{ fontSize: '16px', paddingTop: '5px' }"
      ok-text="Awesome"
      :ok-props="{ shape: 'round' }"
      @ok="confirm"
      @cancel="cancel"
    >
      <template #title>
        <a href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank">Vue Amazing UI</a>
      </template>
      <template #description> An Amazing Vue3 UI Components Library </template>
      <template #icon>
        <FireFilled style="color: #d4380d" />
      </template>
      <Button type="primary">Vue Amazing UI</Button>
    </Popconfirm>
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
    <Popconfirm :placement="placement" title="It's friendly reminder ..." @ok="confirm" @cancel="cancel">
      <Button type="primary">Adjust Placement</Button>
    </Popconfirm>
    <h2 class="mt30 mb10">自定义按钮</h2>
    <Space>
      <Popconfirm title="Are you sure ?" ok-text="Yes" cancel-text="No" @ok="confirm" @cancel="cancel">
        <Button type="danger">Delete Confirm</Button>
      </Popconfirm>
      <Popconfirm
        title="Are you sure ?"
        ok-text="Yes"
        :ok-props="{ ghost: true }"
        cancel-text="No"
        :cancel-props="{ type: 'danger', ghost: true }"
        @ok="confirm"
        @cancel="cancel"
      >
        <Button type="danger">Delete Confirm</Button>
      </Popconfirm>
    </Space>
    <h2 class="mt30 mb10">预置四种图标</h2>
    <Space>
      <Popconfirm title="Are you sure delete this task ?" @ok="confirm" @cancel="cancel">
        <Button type="primary">Warning Confirm</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure delete this task ?" icon="info" @ok="confirm" @cancel="cancel">
        <Button type="primary">Info Confirm</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure delete this task ?" icon="success" @ok="confirm" @cancel="cancel">
        <Button type="primary">Success Confirm</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure delete this task ?" icon="danger" @ok="confirm" @cancel="cancel">
        <Button type="primary">Danger Confirm</Button>
      </Popconfirm>
    </Space>
    <h2 class="mt30 mb10">自定义图标</h2>
    <Space>
      <Popconfirm
        title="Are you sure ?"
        :icon="() => h(QuestionCircleFilled, { style: 'color: #ff4d4f' })"
        @ok="confirm"
        @cancel="cancel"
      >
        <Button type="danger">Delete Confirm</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure ?" @ok="confirm" @cancel="cancel">
        <template #icon>
          <SoundFilled style="color: #faad14" />
        </template>
        <Button type="primary">Notification Confirm</Button>
      </Popconfirm>
    </Space>
    <h2 class="mt30 mb10">不同的触发方式</h2>
    <Space>
      <Popconfirm title="It's friendly reminder ..." @ok="confirm" @cancel="cancel">
        <Button type="primary">Click Me Confirm</Button>
      </Popconfirm>
      <Popconfirm title="It's friendly reminder ..." trigger="hover" @ok="confirm" @cancel="cancel">
        <Button type="primary">Hover Me Confirm</Button>
      </Popconfirm>
    </Space>
    <h2 class="mt30 mb10">受控显示</h2>
    <p class="mb10">
      使用 <code>v-model:open</code> 控制显隐；<code>openControl</code> 为真时
      <code>trigger: hover</code> 不再驱动显隐，显隐完全由 <code>open</code> 决定
    </p>
    <Space vertical align="start" :gap="12">
      <Space>
        <Popconfirm v-model:open="controlledOpen" title="It's friendly reminder ..." @ok="confirm" @cancel="cancel">
          <Button>Controlled: {{ controlledOpen }}</Button>
        </Popconfirm>
        <Button type="primary" @click="controlledOpen = !controlledOpen">Toggle Open</Button>
      </Space>
      <Space>
        <Popconfirm
          v-model:open="openControlOpen"
          open-control
          trigger="hover"
          title="Controlled Only"
          @ok="confirm"
          @cancel="cancel"
        >
          <Button>Hover (openControl)</Button>
        </Popconfirm>
        <Button type="primary" @click="openControlOpen = !openControlOpen">Toggle Open (openControl)</Button>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义过渡动画时间</h2>
    <Popconfirm title="Transition Duration 300ms" :transition-duration="300" @ok="confirm" @cancel="cancel">
      <Button type="primary">Transition Duration 300ms</Button>
    </Popconfirm>
    <h2 class="mt30 mb10">延迟显示隐藏</h2>
    <Space>
      <Popconfirm
        :show-delay="300"
        :hide-delay="300"
        title="Are you confirm ?"
        description="delay 300ms"
        @ok="confirm"
        @cancel="cancel"
      >
        <Button type="primary">Delay 300ms Confirm</Button>
      </Popconfirm>
      <Popconfirm
        :show-delay="500"
        :hide-delay="500"
        title="Are you confirm ?"
        description="delay 500ms"
        @ok="confirm"
        @cancel="cancel"
      >
        <Button type="primary">Delay 500ms Confirm</Button>
      </Popconfirm>
    </Space>
    <h2 class="mt30 mb10">隐藏后卸载</h2>
    <p class="mb10">
      设置 <code>destroyOnHide</code> 后，浮层在离开动画结束时卸载 <code>DOM</code>，再次显示时重新创建并定位；默认
      <code>false</code>（元素常驻，仅切换显示）
    </p>
    <Space>
      <Popconfirm title="Are you sure ?" destroy-on-hide @ok="confirm" @cancel="cancel">
        <Button type="primary">Click (destroyOnHide)</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure ?" @ok="confirm" @cancel="cancel">
        <Button>Click (default)</Button>
      </Popconfirm>
    </Space>
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Popconfirm :arrow="false" title="My arrow is hidden" @ok="confirm" @cancel="cancel">
      <Button type="primary">Hide Arrow Confirm</Button>
    </Popconfirm>
  </div>
</template>
