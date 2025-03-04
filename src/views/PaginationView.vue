<script setup lang="ts">
import { ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
import { generate } from '@ant-design/colors'
const page = ref(1)
const pageSize = ref(10)
const total = ref(98)
const primaryColor = ref('#ff6900')
const primaryShadowColor = ref('rgba(255, 116, 32, 0.1)')
const placementOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'center',
    value: 'center'
  },
  {
    label: 'right',
    value: 'right'
  }
]
const placement = ref<PaginationProps['placement']>('left')
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const size = ref<PaginationProps['size']>('middle')
function onChange(page: number, pageSize: number) {
  // 页码 page 或每页条数 pageSize 改变的回调
  console.log('change page', page)
  console.log('change pageSize', pageSize)
}
function pageSizeChange(page: number, pageSize: number) {
  // 每页条数 pageSize 变化的回调
  console.log('pageSizeChange page', page)
  console.log('pageSizeChange pageSize', pageSize)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Pagination v-model:page="page" :total="50" @change="onChange" />
    <h2 class="mt30 mb10">自定义位置</h2>
    <Flex vertical>
      <Radio :options="placementOptions" v-model:value="placement" button button-style="solid" />
      <Pagination v-model:page="page" :total="total" :placement="placement" @change="onChange" />
    </Flex>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Flex vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Pagination v-model:page="page" :size="size" :total="total" show-quick-jumper @change="onChange" />
    </Flex>
    <h2 class="mt30 mb10">自定义 pageSize 切换选项</h2>
    <Pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :total="total"
      :page-size-options="[10, 20, 30, 40, 50]"
      @change="onChange"
      @pageSizeChange="pageSizeChange"
    />
    <h2 class="mt30 mb10">隐藏 pageSize 切换器</h2>
    <Pagination v-model:page="page" :total="total" :show-size-changer="false" @change="onChange" />
    <h2 class="mt30 mb10">快速跳转</h2>
    <Pagination v-model:page="page" :total="total" show-quick-jumper @change="onChange" />
    <h2 class="mt30 mb10">数据总数</h2>
    <Flex vertical>
      <Pagination v-model:page="page" :total="total" show-total @change="onChange" />
      <Pagination
        v-model:page="page"
        :total="total"
        :show-total="(total: number) => `Total ${total} items`"
        @change="onChange"
      />
      <Pagination
        v-model:page="page"
        :total="total"
        :show-total="(total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`"
        @change="onChange"
      />
    </Flex>
    <h2 class="mt30 mb10">禁用</h2>
    <Pagination disabled v-model:page="page" :total="total" show-quick-jumper @change="onChange" />
    <h2 class="mt30 mb10">自定义主题色</h2>
    <Flex vertical>
      <Space align="center">
        primaryColor:<ColorPicker style="width: 200px" v-model:value="primaryColor" /> primaryShadowColor:<ColorPicker
          style="width: 200px"
          v-model:value="primaryShadowColor"
        />
      </Space>
      <Pagination
        :style="`--pagination-primary-color: ${primaryColor}`"
        v-model:page="page"
        :total="total"
        show-quick-jumper
        :changer-props="{
          style: {
            '--select-primary-color-hover': generate(primaryColor)[4],
            '--select-primary-color-focus': generate(primaryColor)[4],
            '--select-primary-shadow-color': primaryShadowColor,
            '--select-item-bg-color-active': generate(primaryColor)[0]
          }
        }"
        :jumper-props="{
          style: {
            '--input-primary-color-hover': generate(primaryColor)[4],
            '--input-primary-color-focus': generate(primaryColor)[4],
            '--input-primary-shadow-color': primaryShadowColor
          }
        }"
        @change="onChange"
      />
    </Flex>
  </div>
</template>
