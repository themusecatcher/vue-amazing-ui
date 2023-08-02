<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
const options = ref([
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
])
const onChange = (value: any) => {
  console.log('size checked', value)
  size.value = value
}
</script>
<template>
  <div>
    <h1>Descriptions 描述列表</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Descriptions title="User Info">
      <template #extra>
        <a href="#">more</a>
      </template>
      <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
      <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
      <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
      <DescriptionsItem label="Remark">empty</DescriptionsItem>
      <DescriptionsItem label="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </DescriptionsItem>
    </Descriptions>
    <h2 class="mt30 mb10">带边框的</h2>
    <Descriptions title="User Info" bordered>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing Mode">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Automatic Renewal">YES</DescriptionsItem>
      <DescriptionsItem label="Order time">2018-04-24 18:00:00</DescriptionsItem>
      <DescriptionsItem label="Usage Time" :span="2">2019-04-24 18:00:00</DescriptionsItem>
      <DescriptionsItem label="Status" :span="3">
        <Badge status="processing" text="Running" />
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
    <h2 class="mt30 mb10">响应式描述列表</h2>
    <Descriptions
      title="Responsive Descriptions"
      bordered
      :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
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
    <h2 class="mt30 mb10">自定义尺寸</h2>
    <Radio :options="options" v-model:value="size" @change="onChange" />
    <br />
    <br />
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
    <br />
    <br />
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
    <h2 class="mt30 mb10">自定义内容 & 标签样式</h2>
    <Descriptions
      bordered
      title="Custom Style"
      :labelStyle="{fontWeight: 800, color: '#faad14'}"
      :contentStyle="{fontWeight: 600, color: '#1677ff'}">
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount" :labelStyle="{color: '#52c41a'}" :contentStyle="{color: '#ff4d4f'}">$80.00</DescriptionsItem>
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
    <br />
    <br />
    <Descriptions
      title="Custom Style"
      :labelStyle="{fontWeight: 800, color: '#faad14'}"
      :contentStyle="{fontWeight: 600, color: '#1677ff'}">
      <template #extra>
        <Button type="primary">Edit</Button>
      </template>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Time">18:00:00</DescriptionsItem>
      <DescriptionsItem label="Amount" :labelStyle="{color: '#52c41a'}" :contentStyle="{color: '#ff4d4f'}">$80.00</DescriptionsItem>
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official">$60.00</DescriptionsItem>
    </Descriptions>
  </div>
</template>
