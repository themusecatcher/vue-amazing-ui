<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { DescriptionsProps } from 'vue-amazing-ui'
const size = ref<DescriptionsProps['size']>('default')
const sizeOptions = [
  {
    label: 'default',
    value: 'default'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'small',
    value: 'small'
  }
]
const labelAlign = ref<'left' | 'right' | 'center'>('left')
const labelAlignOptions = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'center',
    value: 'center'
  }
]
const show = ref(true)
const onClick = () => {
  show.value = false
}
const state = reactive({
  title: 'User Info',
  extra: 'extra',
  bordered: false,
  layout: 'horizontal' as 'horizontal' | 'vertical',
  colon: true,
  labelAlign: 'left' as 'left' | 'right' | 'center',
  size: 'default',
  column: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 3,
    xxl: 3
  },
  labelStyle: {
    fontSize: '14px',
    color: '#FF6900',
    fontWeight: 600
  },
  contentStyle: {
    fontSize: '14px',
    color: '#1677FF',
    fontWeight: 400
  }
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本</h2>
    <Flex vertical gap="middle">
      <Descriptions title="User Info">
        <template #extra>
          <a href="#" @click="onClick">more</a>
        </template>
        <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
        <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
        <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
        <DescriptionsItem label="Remark">empty</DescriptionsItem>
        <DescriptionsItem label="Address"
          >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">带边框的</h2>
    <Flex vertical gap="middle">
      <Descriptions title="User Info" bordered>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing Mode">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Automatic Renewal">YES</DescriptionsItem>
        <DescriptionsItem label="Order time">2018-04-24 18:00:00</DescriptionsItem>
        <DescriptionsItem label="Usage Time" :span="2">2030-10-10 18:00:00</DescriptionsItem>
        <DescriptionsItem label="Status" :span="3">
          <Badge status="processing" ripple text="Running" />
        </DescriptionsItem>
        <DescriptionsItem label="Negotiated Amount">$80.00</DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official Receipts">$60.00</DescriptionsItem>
        <DescriptionsItem label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">自定义尺寸</h2>
    <Flex vertical gap="middle">
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Descriptions bordered title="Custom Size" :size="size">
        <template #extra>
          <Button type="primary">Edit</Button>
        </template>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official">$60.00</DescriptionsItem>
        <DescriptionsItem label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </DescriptionsItem>
      </Descriptions>
      <Descriptions title="Custom Size" :size="size">
        <template #extra>
          <Button type="primary">Edit</Button>
        </template>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official">$60.00</DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">响应式</h2>
    <Flex vertical gap="middle">
      <Descriptions title="Responsive Descriptions" bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official">$60.00</DescriptionsItem>
        <DescriptionsItem label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
        </DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">垂直</h2>
    <Flex vertical gap="middle">
      <Descriptions title="User Info" layout="vertical">
        <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
        <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
        <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
        <DescriptionsItem label="Address" :span="2">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </DescriptionsItem>
        <DescriptionsItem label="Remark">empty</DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">垂直带边框的</h2>
    <Flex vertical gap="middle">
      <Descriptions title="User Info" layout="vertical" bordered>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing Mode">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Automatic Renewal">YES</DescriptionsItem>
        <DescriptionsItem label="Order time">2018-04-24 18:00:00</DescriptionsItem>
        <DescriptionsItem label="Usage Time" :span="2">2030-10-10 18:00:00</DescriptionsItem>
        <DescriptionsItem label="Status" :span="3">
          <Badge status="processing" ripple text="Running" />
        </DescriptionsItem>
        <DescriptionsItem label="Negotiated Amount">$80.00</DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official Receipts">$60.00</DescriptionsItem>
        <DescriptionsItem label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">无冒号</h2>
    <p class="mb10">使用 <code>colon</code> 属性关闭标签后的冒号</p>
    <Flex vertical gap="middle">
      <Descriptions title="User Info" :colon="false">
        <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
        <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
        <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">标签对齐</h2>
    <Flex vertical gap="middle">
      <Radio :options="labelAlignOptions" v-model:value="labelAlign" button button-style="solid" />
      <Descriptions title="User Info" bordered :labelAlign="labelAlign">
        <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
        <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
        <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">自定义类名</h2>
    <Flex vertical gap="middle">
      <Descriptions
        bordered
        title="Custom Class"
        labelClass="descriptions-demo-label"
        contentClass="descriptions-demo-content"
      >
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">自定义头部</h2>
    <p class="mb10">使用 <code>header</code> 插槽自定义整个头部区域，替代 <code>title</code> 与 <code>extra</code></p>
    <Flex vertical gap="middle">
      <Descriptions>
        <template #header>
          <Flex gap="middle" align="center" justify="space-between" style="width: 100%">
            <span style="font-weight: 600; font-size: 16px">Custom Header</span>
            <Button type="primary">Edit</Button>
          </Flex>
        </template>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">自定义内容 & 标签样式</h2>
    <Flex vertical gap="middle">
      <Descriptions
        bordered
        title="Custom Style"
        :labelStyle="{ fontWeight: 800, color: '#faad14' }"
        :contentStyle="{ fontWeight: 600, color: '#1677ff' }"
      >
        <template #extra>
          <Button type="primary">Edit</Button>
        </template>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount" :labelStyle="{ color: '#52c41a' }" :contentStyle="{ color: '#ff4d4f' }"
          >$80.00
        </DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official">$60.00</DescriptionsItem>
        <DescriptionsItem label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </DescriptionsItem>
      </Descriptions>
      <Descriptions
        title="Custom Style"
        :labelStyle="{ fontWeight: 800, color: '#faad14' }"
        :contentStyle="{ fontWeight: 600, color: '#1677ff' }"
      >
        <template #extra>
          <Button type="primary">Edit</Button>
        </template>
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount" :labelStyle="{ color: '#52c41a' }" :contentStyle="{ color: '#ff4d4f' }"
          >$80.00
        </DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official">$60.00</DescriptionsItem>
      </Descriptions>
    </Flex>
    <h2 class="mt30 mb10">描述列表配置器</h2>
    <Flex vertical>
      <Row :gutter="[24, 12]">
        <Col :span="6">
          <Flex gap="small" vertical>
            title:
            <Input v-model:value="state.title" placeholder="title" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            extra:
            <Input v-model:value="state.extra" placeholder="extra" />
          </Flex>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical>
            bordered:
            <Switch v-model="state.bordered" />
          </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical>
            layout:
            <Switch v-model="state.layout" checked-value="vertical" un-checked-value="horizontal" />
          </Space>
        </Col>
        <Col :span="6">
          <Space gap="small" vertical>
            colon:
            <Switch v-model="state.colon" />
          </Space>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            size:
            <Select :options="sizeOptions" v-model="state.size" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            labelAlign:
            <Select :options="labelAlignOptions" v-model="state.labelAlign" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            Column xs:
            <InputNumber v-model:value="state.column.xs" :min="1" placeholder="xs" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            Column sm:
            <InputNumber v-model:value="state.column.sm" :min="1" :max="9" placeholder="sm" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            Column md:
            <InputNumber v-model:value="state.column.md" :min="1" :max="9" placeholder="md" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            Column lg:
            <InputNumber v-model:value="state.column.lg" :min="1" :max="9" placeholder="lg" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            Column xl:
            <InputNumber v-model:value="state.column.xl" :min="1" :max="9" placeholder="xl" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            Column xxl:
            <InputNumber v-model:value="state.column.xxl" :min="1" :max="9" placeholder="xxl" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            labelStyle fontSize:
            <Input v-model:value="state.labelStyle.fontSize" placeholder="labelStyle fontSize" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            labelStyle color:
            <ColorPicker v-model:value="state.labelStyle.color" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            labelStyle fontWeight:
            <InputNumber
              v-model:value="state.labelStyle.fontWeight"
              :step="100"
              :min="100"
              :max="1000"
              placeholder="labelStyle fontWeight"
            />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            contentStyle fontSize:
            <Input v-model:value="state.contentStyle.fontSize" placeholder="contentStyle fontSize" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            contentStyle color:
            <ColorPicker v-model:value="state.contentStyle.color" />
          </Flex>
        </Col>
        <Col :span="6">
          <Flex gap="small" vertical>
            contentStyle fontWeight:
            <InputNumber
              v-model:value="state.contentStyle.fontWeight"
              :step="100"
              :min="100"
              :max="1000"
              placeholder="contentStyle fontWeight"
            />
          </Flex>
        </Col>
      </Row>
      <Descriptions
        :title="state.title"
        :extra="state.extra"
        :bordered="state.bordered"
        :layout="state.layout"
        :colon="state.colon"
        :label-align="state.labelAlign"
        :size="state.size as DescriptionsProps['size']"
        :column="{
          xs: state.column.xs,
          sm: state.column.sm,
          md: state.column.md,
          lg: state.column.lg,
          xl: state.column.xl,
          xxl: state.column.xxl
        }"
        :label-style="state.labelStyle"
        :content-style="state.contentStyle"
      >
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official">$60.00</DescriptionsItem>
        <DescriptionsItem label="Status" :span="1">
          <Badge status="processing" ripple text="Running" />
        </DescriptionsItem>
        <DescriptionsItem label="Usage Time" :span="2">2030-04-24 18:00:00</DescriptionsItem>
        <DescriptionsItem label="Address" :span="3"
          >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </DescriptionsItem>
      </Descriptions>
    </Flex>
  </div>
</template>
<style lang="less">
/**
 * 自定义类名用例的演示样式。
 * 类名落在 Descriptions 内部元素上，而 `:deep()` 编译出的选择器与组件自身样式同优先级（均为 0,2,0），
 * 胜负取决于样式注入顺序（HMR 下不稳定，实测会被组件样式覆盖）。
 * 故改用非 scoped + 更高优先级选择器，保证演示效果稳定生效。
 */
.descriptions-wrap .descriptions-item-label.descriptions-demo-label {
  color: #1677ff;
  font-weight: 600;
}

.descriptions-wrap .descriptions-item-content.descriptions-demo-content {
  color: #52c41a;
}
</style>
