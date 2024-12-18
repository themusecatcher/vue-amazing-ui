<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  AppleOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined
} from '@ant-design/icons-vue'
const strTags = ref(['天空', '大海', '湖泊'])
watchEffect(() => {
  console.log('strTags', strTags.value)
})
const objTags = ref([
  {
    label: '天空',
    color: 'processing'
  },
  {
    label: '大海',
    closable: false,
    color: 'error'
  },
  {
    label: '湖泊',
    color: 'pink'
  }
])
watchEffect(() => {
  console.log('objTags', objTags.value)
})
const onClose = (e: MouseEvent) => {
  console.log('e', e)
}
const onDynamicClose = (tag: any, index: number) => {
  console.log('tag', tag)
  console.log('index', index)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space gap="small">
      <Tag color="magenta">pink</Tag>
      <Tag>Tag 1</Tag>
      <Tag><a href="https://blog.csdn.net/Dandrose">Link</a></Tag>
      <Tag closable @close="onClose">Tag 2</Tag>
    </Space>
    <h2 class="mt30 mb10">多彩标签</h2>
    <Space gap="small">
      <Tag color="pink">pink</Tag>
      <Tag color="red">red</Tag>
      <Tag color="yellow">yellow</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="green">green</Tag>
      <Tag color="blue" closable>blue</Tag>
      <Tag color="purple">purple</Tag>
      <Tag color="geekblue">geekblue</Tag>
      <Tag color="magenta">magenta</Tag>
      <Tag color="volcano">volcano</Tag>
      <Tag color="gold">gold</Tag>
      <Tag color="lime">lime</Tag>
    </Space>
    <br />
    <br />
    <Space gap="small">
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </Space>
    <h2 class="mt30 mb10">预设状态的标签</h2>
    <Divider orientation="left">Without icon</Divider>
    <Space gap="small">
      <Tag color="success">success</Tag>
      <Tag color="processing">processing</Tag>
      <Tag color="error">error</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="default">default</Tag>
    </Space>
    <Divider orientation="left">With icon</Divider>
    <Space gap="small">
      <Tag color="success">
        <template #icon>
          <CheckCircleOutlined />
        </template>
        success
      </Tag>
      <Tag color="processing">
        <template #icon>
          <SyncOutlined spin />
        </template>
        processing
      </Tag>
      <Tag color="error">
        <template #icon>
          <CloseCircleOutlined />
        </template>
        error
      </Tag>
      <Tag color="warning">
        <template #icon>
          <ExclamationCircleOutlined />
        </template>
        warning
      </Tag>
      <Tag color="default">
        <template #icon>
          <ClockCircleOutlined />
        </template>
        waiting
      </Tag>
      <Tag color="default">
        <template #icon>
          <MinusCircleOutlined />
        </template>
        stop
      </Tag>
    </Space>
    <h2 class="mt30 mb10">图标按钮标签</h2>
    <Space gap="small">
      <Tag color="#cd853f">
        <template #icon>
          <AppleOutlined />
        </template>
        Apple
      </Tag>
      <Tag color="#55acee">
        <template #icon>
          <TwitterOutlined />
        </template>
        Twitter
      </Tag>
      <Tag color="#cd201f">
        <template #icon>
          <YoutubeOutlined />
        </template>
        Youtube
      </Tag>
      <Tag color="#3b5999">
        <template #icon>
          <InstagramOutlined />
        </template>
        Instagram
      </Tag>
    </Space>
    <h2 class="mt30 mb10">动态添加和删除</h2>
    <h3 class="mb10">使用字符串格式数组</h3>
    <Tag dynamic v-model:value="strTags" @dynamic-close="onDynamicClose" />
    <br />
    <br />
    <h3 class="mb10">使用对象格式数组</h3>
    <Space>
      <Tag dynamic v-model:value="objTags">
        <template #default="{ label, index }">
          <template v-if="index === 1">{{ label }} {{ index }}</template>
        </template>
        <template #icon="{ index }">
          <template v-if="index === 0">
            <CheckCircleOutlined />
          </template>
        </template>
      </Tag>
    </Space>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space gap="small">
      <Tag closable size="small" @close="onClose">爱在西元前</Tag>
      <Tag color="warning" closable @close="onClose">超人不会飞</Tag>
      <Tag color="blue" size="large" dynamic v-model:value="strTags" closable @close="onDynamicClose" />
    </Space>
    <h2 class="mt30 mb10">自定义动态标签排列</h2>
    <Tag
      closable
      dynamic
      color="blue"
      size="large"
      :space-props="{ vertical: true, gap: 12 }"
      v-model:value="strTags"
      @close="onDynamicClose"
    />
    <h2 class="mt30 mb10">无边框</h2>
    <Space gap="small">
      <Tag :bordered="false">Tag 1</Tag>
      <Tag :bordered="false">Tag 2</Tag>
      <Tag :bordered="false" closable>Tag 3</Tag>
      <Tag :bordered="false" closable>Tag 4</Tag>
    </Space>
    <Divider />
    <Space gap="small">
      <Tag :bordered="false" color="processing">processing</Tag>
      <Tag :bordered="false" color="success">success</Tag>
      <Tag :bordered="false" color="error">error</Tag>
      <Tag :bordered="false" color="warning">warning</Tag>
      <Tag :bordered="false" color="magenta">magenta</Tag>
      <Tag :bordered="false" color="red">red</Tag>
      <Tag :bordered="false" color="volcano">volcano</Tag>
      <Tag :bordered="false" color="orange">orange</Tag>
      <Tag :bordered="false" color="gold">gold</Tag>
      <Tag :bordered="false" color="lime">lime</Tag>
      <Tag :bordered="false" color="green">green</Tag>
      <Tag :bordered="false" color="cyan">cyan</Tag>
      <Tag :bordered="false" color="blue">blue</Tag>
      <Tag :bordered="false" color="geekblue">geekblue</Tag>
      <Tag :bordered="false" color="purple">purple</Tag>
    </Space>
  </div>
</template>
