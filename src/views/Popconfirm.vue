<script setup lang="ts">
import { ref } from 'vue'
import { FireFilled, QuestionCircleFilled, SoundFilled } from '@ant-design/icons-vue'
const message = ref()
const openChange = (visible: boolean) => {
  console.log('visible', visible)
}
const confirm = (e: MouseEvent) => {
  console.log('confirm', e)
  message.value.success('Click on Yes')
}
const cancel = (e: MouseEvent) => {
  console.log('cancel', e)
  message.value.error('Click on No')
}
</script>
<template>
  <div class="ml60">
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
    <Popconfirm title="It's friendly reminder ..." :show-cancel="false" icon-type="info" @ok="confirm">
      <Button type="primary">Hidden Cancel Btn</Button>
    </Popconfirm>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Popconfirm
      :max-width="280"
      :show-cancel="false"
      :title-style="{ fontSize: '16px', fontWeight: 'bold', color: '#1677ff' }"
      :description-style="{ color: '#fff' }"
      bg-color="rgba(0, 0, 0.8)"
      :popconfirm-style="{ padding: '12px 18px', borderRadius: '12px' }"
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
        <FireFilled />
      </template>
      <Button type="primary">Vue Amazing UI</Button>
    </Popconfirm>
    <h2 class="mt30 mb10">自定义按钮</h2>
    <Space>
      <Popconfirm title="Are you sure ?" ok-text="Yes" cancel-text="No" @ok="confirm" @cancel="cancel">
        <Button type="danger">Delete</Button>
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
    <h2 class="mt30 mb10">预置四种 Icon 图标</h2>
    <Space>
      <Popconfirm title="Are you sure delete this task ?" @ok="confirm" @cancel="cancel">
        <Button type="primary">Warning Confirm</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure delete this task ?" icon-type="info" @ok="confirm" @cancel="cancel">
        <Button type="primary">Info Confirm</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure delete this task ?" icon-type="success" @ok="confirm" @cancel="cancel">
        <Button type="primary">Success Confirm</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure delete this task ?" icon-type="danger" @ok="confirm" @cancel="cancel">
        <Button type="primary">Danger Confirm</Button>
      </Popconfirm>
    </Space>
    <h2 class="mt30 mb10">自定义 Icon 图标</h2>
    <Space>
      <Popconfirm title="Are you sure ?" icon-type="danger" @ok="confirm" @cancel="cancel">
        <template #icon>
          <QuestionCircleFilled />
        </template>
        <Button type="danger">Delete Confirm</Button>
      </Popconfirm>
      <Popconfirm title="Are you sure ?" @ok="confirm" @cancel="cancel">
        <template #icon>
          <SoundFilled />
        </template>
        <Button type="danger">Delete Confirm</Button>
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
    <h2 class="mt30 mb10">隐藏箭头</h2>
    <Popconfirm :arrow="false" title="My arrow is hidden" @ok="confirm" @cancel="cancel">
      <Button type="primary">Hide Arrow Confirm</Button>
    </Popconfirm>
    <Message ref="message" />
  </div>
</template>
