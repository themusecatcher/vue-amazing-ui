<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const pageSize = ref(10)
const total = ref(98)
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
const placement = ref('left')
function onChange(page: number, pageSize: number) {
  // 页码 page 或 每页条数 pageSize 改变的回调
  console.log('change page:', page)
  console.log('change pageSize:', pageSize)
}
function pageSizeChange(page: number, pageSize: number) {
  // 每页条数 pageSize 变化的回调
  console.log('pageSizeChange page:', page)
  console.log('pageSizeChange pageSize:', pageSize)
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
    <Pagination v-model:page="page" :total="total" :show-size-changer="false" show-quick-jumper @change="onChange" />
    <h2 class="mt30 mb10">数据总数</h2>
    <Space vertical>
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
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Pagination disabled v-model:page="page" :total="total" show-quick-jumper @change="onChange" />
  </div>
</template>
