<script setup lang="ts">
import { h, ref } from 'vue'
import {
  AppleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined
} from '@ant-design/icons-vue'
import type { TagItem } from 'vue-amazing-ui'
const onClose = (e: Event) => {
  console.log('close', e)
}
const onDynamicClose = (item: TagItem, index: number) => {
  console.log('dynamicClose', item, index)
}
// 可选择标签：每个标签各自独立受控，操作任一标签不联动其余标签
const checkableOptions = ['Movies', 'Books', 'Music', 'Sports']
const checkableTags = ref([false, true, false, false])
const onCheckableChange = (tag: string, checked: boolean) => {
  console.log('checkable', tag, checked)
}
// 动态添加和删除：字符串数组与对象数组分别独立绑定
const dynamicTags = ref<string[]>(['天空', '大海', '湖泊'])
const objectTags = ref<TagItem[]>([
  { label: '天空', color: 'processing' },
  { label: '大海', closable: false, color: 'error' },
  { label: '湖泊', color: 'pink' }
])
// 热门标签：选中项汇总为父侧集合，标签只上报变更，结果实时回显
const hotTags = ['Movies', 'Books', 'Music', 'Sports']
const selectedTags = ref<string[]>([])
function toggleTag(list: string[], tag: string, checked: boolean) {
  return checked ? [...list, tag] : list.filter((value) => value !== tag)
}
const onHotTagChange = (tag: string, checked: boolean) => {
  selectedTags.value = toggleTag(selectedTags.value, tag, checked)
}
const sizeTags = ref<string[]>(['天空', '大海', '湖泊'])
const layoutTags = ref<string[]>(['天空', '大海', '湖泊'])
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本用法</h2>
    <Space gap="small">
      <Tag>Tag 1</Tag>
      <Tag><a href="https://themusecatcher.blog.csdn.net">Link</a></Tag>
      <Tag closable @close="onClose">Tag 2</Tag>
      <Tag closable @close.prevent>Prevent Default</Tag>
    </Space>
    <h2 class="mt30 mb10">可选择标签</h2>
    <p class="mb10">通过 <code>CheckableTag</code> 实现 Checkbox 效果，点击或按 Enter / Space 切换。</p>
    <Space gap="small" align="center">
      <span>Categories:</span>
      <CheckableTag
        v-for="(tag, index) in checkableOptions"
        :key="tag"
        v-model:checked="checkableTags[index]"
        @change="(checked: boolean) => onCheckableChange(tag, checked)"
      >
        {{ tag }}
      </CheckableTag>
    </Space>
    <h2 class="mt30 mb10">多彩标签</h2>
    <p class="mb10">预设色板覆盖常用场景；预设值不满足需求时可直接传具体色值。</p>
    <Space gap="small">
      <Tag color="pink">pink</Tag>
      <Tag color="red">red</Tag>
      <Tag color="yellow">yellow</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="green">green</Tag>
      <Tag color="blue">blue</Tag>
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
      <Tag color="pink-inverse">pink-inverse</Tag>
      <Tag color="blue-inverse">blue-inverse</Tag>
      <Tag color="green-inverse">green-inverse</Tag>
    </Space>
    <br />
    <br />
    <Space gap="small">
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </Space>
    <h2 class="mt30 mb10">动态添加和删除</h2>
    <p class="mb10">使用字符串格式数组</p>
    <Tag dynamic v-model:value="dynamicTags" @dynamic-close="onDynamicClose" />
    <p class="mt30 mb10"> 使用对象格式数组，配合 <code>label</code> / <code>icon</code> 插槽自定义单项内容 </p>
    <Tag dynamic v-model:value="objectTags">
      <template #label="{ label, index }">
        <template v-if="index === 1">{{ label }} {{ index }}</template>
        <template v-else>{{ label }}</template>
      </template>
      <template #icon="{ index }">
        <template v-if="index === 0">
          <CheckCircleOutlined />
        </template>
      </template>
    </Tag>
    <h2 class="mt30 mb10">热门标签</h2>
    <p class="mb10">选择你感兴趣的话题，选中项汇总成集合实时回显（与「可选择标签」的独立受控不同）。</p>
    <Space gap="small" align="center">
      <span>Categories:</span>
      <CheckableTag
        v-for="tag in hotTags"
        :key="tag"
        :checked="selectedTags.includes(tag)"
        @change="(checked: boolean) => onHotTagChange(tag, checked)"
      >
        {{ tag }}
      </CheckableTag>
    </Space>
    <p class="mt10 demo-label">已选话题：{{ selectedTags.length ? selectedTags.join('、') : '暂无' }}</p>
    <h2 class="mt30 mb10">图标按钮</h2>
    <p class="mb10">设置 <code>icon</code> 属性或在 <code>icon</code> 插槽内放置图标。</p>
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
      <Tag color="processing" icon="😉">emoji</Tag>
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
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space gap="small" align="center">
      <Tag size="small" closable @close="onClose">爱在西元前</Tag>
      <Tag color="warning" closable @close="onClose">超人不会飞</Tag>
      <Tag color="blue" size="large" dynamic v-model:value="sizeTags" @dynamic-close="onDynamicClose" />
    </Space>
    <h2 class="mt30 mb10">自定义动态标签排列</h2>
    <p class="mb10">通过 <code>spaceProps</code> 配置标签组的排列方式，<code>Space</code> 支持的全部配置均可透传</p>
    <Tag
      dynamic
      color="blue"
      size="large"
      :space-props="{ vertical: true, gap: 12 }"
      v-model:value="layoutTags"
      @dynamic-close="onDynamicClose"
    />
    <h2 class="mt30 mb10">自定义配色</h2>
    <p class="mb10">对象形式可分别指定背景、文字与边框色，适合浅色底等需要自定义文字色的场景</p>
    <Space gap="small">
      <Tag :color="{ color: '#f0f0f0', textColor: '#333333', borderColor: '#d9d9d9' }">浅色底</Tag>
      <Tag :color="{ color: '#ffe7ba', textColor: '#ad4e00' }">文字色独立</Tag>
      <Tag :color="{ textColor: '#1677ff', borderColor: '#1677ff' }">仅文字与边框</Tag>
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">禁用后不再响应点击与关闭，可选择标签也不再切换选中态</p>
    <Space gap="small">
      <Tag disabled>不可点击</Tag>
      <Tag disabled closable>不可关闭</Tag>
      <Tag disabled color="success">success</Tag>
      <CheckableTag disabled>不可选择</CheckableTag>
      <CheckableTag disabled checked>已选中且禁用</CheckableTag>
    </Space>
    <h2 class="mt30 mb10">圆角</h2>
    <Space gap="small">
      <Tag round>圆角标签</Tag>
      <Tag round color="processing">processing</Tag>
      <Tag round closable>可关闭</Tag>
      <CheckableTag round checked>可选</CheckableTag>
    </Space>
    <h2 class="mt30 mb10">自定义关闭图标</h2>
    <p class="mb10"><code>closeIcon</code> 属性或同名插槽均可替换默认关闭图标。</p>
    <Space gap="small">
      <Tag closable :close-icon="h(CloseOutlined)">属性形态</Tag>
      <Tag closable>
        <template #closeIcon>
          <CloseOutlined />
        </template>
        插槽形态
      </Tag>
    </Space>
  </div>
</template>
