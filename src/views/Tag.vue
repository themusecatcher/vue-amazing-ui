<script setup lang="ts">
import { ref, watchEffect } from 'vue'

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
          <svg
            focusable="false"
            class="u-svg"
            data-icon="check-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
            ></path>
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
          </svg>
        </template>
        success
      </Tag>
      <Tag color="processing">
        <template #icon>
          <svg
            focusable="false"
            class="u-spin"
            data-icon="sync"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"
            ></path>
          </svg>
        </template>
        processing
      </Tag>
      <Tag color="error">
        <template #icon>
          <svg
            focusable="false"
            class="u-svg"
            data-icon="close-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
            ></path>
            <path
              d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
          </svg>
        </template>
        error
      </Tag>
      <Tag color="warning">
        <template #icon>
          <svg
            focusable="false"
            class="u-svg"
            data-icon="exclamation-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
            <path
              d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"
            ></path>
          </svg>
        </template>
        warning
      </Tag>
      <Tag color="default">
        <template #icon>
          <svg
            focusable="false"
            class="u-svg"
            data-icon="clock-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
            <path
              d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
            ></path>
          </svg>
        </template>
        waiting
      </Tag>
      <Tag color="default">
        <template #icon>
          <svg
            focusable="false"
            class="u-svg"
            data-icon="minus-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            ></path>
          </svg>
        </template>
        stop
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
            <svg
              focusable="false"
              class="u-svg"
              data-icon="check-circle"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
              ></path>
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
              ></path>
            </svg>
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
<style lang="less" scoped>
.u-svg {
  display: inline-block;
  line-height: 1;
}
.u-spin {
  width: 12px;
  height: 12px;
  display: inline-block;
  line-height: 1;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
  @keyframes loadingCircle {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
