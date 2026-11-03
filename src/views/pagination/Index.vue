<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { PaginationProps } from 'vue-amazing-ui'
const page = ref(1)
const pageSize = ref(10)
const total = ref(500)
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
const pageAmountOptions = [
  {
    label: '3',
    value: 3
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '7',
    value: 7
  }
]
const pageAmount = ref(5)
const bordered = ref(false)
const goButton = ref(false)
const totalOptions = [
  {
    label: '0',
    value: 0
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '500',
    value: 500
  }
]
// 配置器：一次覆盖全部展示型属性，初值一律取组件属性默认值；
// total 保留 500（组件默认为 0，但 total 为 0 时整块分页隐藏，配置器将无内容可看）
const config = reactive({
  bordered: true,
  size: 'large' as PaginationProps['size'],
  placement: 'center' as PaginationProps['placement'],
  pageAmount: 5,
  disabled: false,
  hideOnSinglePage: false,
  showTotal: false,
  showQuickJumper: false,
  // 组件默认 undefined，total 大于 50 时生效为 true；开关只能表达布尔值，故取当前实际默认
  showSizeChanger: true,
  total: 500
})
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
    <h2 class="mt30 mb10">非受控模式</h2>
    <Pagination :total="100" :default-page="3" :default-page-size="20" @change="onChange" />
    <h2 class="mt30 mb10">自定义位置</h2>
    <Space align="center" style="margin-bottom: 16px">
      placement:
      <RadioGroup :options="placementOptions" v-model:value="placement" button button-style="solid" />
    </Space>
    <Pagination v-model:page="page" :total="total" :placement="placement" @change="onChange" />
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space align="center" style="margin-bottom: 16px">
      size:
      <RadioGroup :options="sizeOptions" v-model:value="size" button button-style="solid" />
    </Space>
    <Pagination v-model:page="page" :size="size" :total="total" show-quick-jumper @change="onChange" />
    <h2 class="mt30 mb10">自定义页码数量</h2>
    <Space align="center" style="margin-bottom: 16px">
      pageAmount:
      <RadioGroup :options="pageAmountOptions" v-model:value="pageAmount" button button-style="solid" />
    </Space>
    <Pagination v-model:page="page" :total="total" :page-amount="pageAmount" @change="onChange" />
    <h2 class="mt30 mb10">无边框风格</h2>
    <Space align="center" style="margin-bottom: 16px">
      bordered:
      <Switch v-model:value="bordered" />
    </Space>
    <Flex vertical>
      <Pagination v-model:page="page" :total="total" :bordered="bordered" @change="onChange" />
      <Pagination v-model:page="page" :total="total" :bordered="bordered" disabled @change="onChange" />
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
    <h2 class="mt30 mb10">跳转确认按钮</h2>
    <p class="mb10">
      <code>goButton</code> 传 <code>true</code> 取默认文案「确定」，传字符串则作为自定义文案；有按钮时失焦不再自动跳转
    </p>
    <Flex vertical>
      <Pagination v-model:page="page" :total="total" :show-quick-jumper="{ goButton: true }" @change="onChange" />
      <Pagination v-model:page="page" :total="total" :show-quick-jumper="{ goButton: '前往' }" @change="onChange" />
    </Flex>
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
    <h2 class="mt30 mb10">非受控初值</h2>
    <p class="mb10">
      不绑定 <code>v-model</code> 时页码与每页条数由组件自持，可用 <code>defaultPage</code> /
      <code>defaultPageSize</code> 指定初值
    </p>
    <Pagination :total="total" :default-page="3" :default-page-size="20" @change="onChange" />
    <h2 class="mt30 mb10">自定义切换器与跳转框</h2>
    <p class="mb10">
      <code>changerProps</code> 透传给每页条数切换器（参考 Select Props），<code>jumperProps</code>
      透传给跳转输入框（参考 Input Props）
    </p>
    <Pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :total="total"
      show-quick-jumper
      :changer-props="{ width: 120 }"
      :jumper-props="{ placeholder: '页码', width: 56 }"
      @change="onChange"
      @pageSizeChange="pageSizeChange"
    />
    <h2 class="mt30 mb10">分页配置器</h2>
    <Row :gutter="[24, 12]">
      <Col :span="6">
        <Space gap="small" vertical>
          bordered:
          <Switch v-model:value="config.bordered" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          size:
          <RadioGroup :options="sizeOptions" v-model:value="config.size" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          placement:
          <RadioGroup :options="placementOptions" v-model:value="config.placement" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          pageAmount:
          <RadioGroup :options="pageAmountOptions" v-model:value="config.pageAmount" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          disabled:
          <Switch v-model:value="config.disabled" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          hideOnSinglePage:
          <Switch v-model:value="config.hideOnSinglePage" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          showTotal:
          <Switch v-model:value="config.showTotal" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          showQuickJumper:
          <Switch v-model:value="config.showQuickJumper" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          showSizeChanger:
          <Switch v-model:value="config.showSizeChanger" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          total:
          <RadioGroup :options="totalOptions" v-model:value="config.total" button button-style="solid" />
        </Space>
      </Col>
      <Col :span="6">
        <Space gap="small" vertical>
          showQuickJumper.goButton:
          <Switch v-model:value="goButton" />
        </Space>
      </Col>
    </Row>
    <Pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      v-bind="config"
      :show-quick-jumper="goButton ? { goButton: true } : config.showQuickJumper"
      class="mt30"
      @change="onChange"
      @pageSizeChange="pageSizeChange"
    />
  </div>
</template>
