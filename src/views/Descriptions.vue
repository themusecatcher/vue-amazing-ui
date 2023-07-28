<template>
  <div>
    <h1>Descriptions 描述列表</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Descriptions title="User Info">
      <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
      <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
      <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
      <DescriptionsItem label="Remark">empty</DescriptionsItem>
      <DescriptionsItem label="Address" :span="2">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </DescriptionsItem>
    </Descriptions>
    <h2 class="mt30 mb10">带边框的</h2>
    <Descriptions title="User Info" bordered>
      <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
      <DescriptionsItem label="Billing Mode" :span="2">Prepaid</DescriptionsItem>
      <DescriptionsItem label="Automatic Renewal">YES</DescriptionsItem>
      <DescriptionsItem label="Order time">2018-04-24 18:00:00</DescriptionsItem>
      <DescriptionsItem label="Usage Time" :span="1">2019-04-24 18:00:00</DescriptionsItem>
      <DescriptionsItem label="Status" :span="3">
        <a-badge status="processing" text="Running" />
      </DescriptionsItem>
      <DescriptionsItem label="Negotiated Amount">$80.00</DescriptionsItem>
      <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
      <DescriptionsItem label="Official Receipts">$60.00</DescriptionsItem>
      <DescriptionsItem label="Config Info" :span="3">
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
    <a-descriptions title="User Info" bordered>
      <a-descriptions-item label="Product" :span="6">Cloud Database</a-descriptions-item>
      <a-descriptions-item label="Billing Mode" :span="3">Prepaid</a-descriptions-item>
      <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>
      <a-descriptions-item label="Order time">2018-04-24 18:00:00</a-descriptions-item>
      <a-descriptions-item label="Usage Time" :span="2">2019-04-24 18:00:00</a-descriptions-item>
      <a-descriptions-item label="Status" :span="3">
        <a-badge status="processing" text="Running" />
      </a-descriptions-item>
      <a-descriptions-item label="Negotiated Amount">$80.00</a-descriptions-item>
      <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
      <a-descriptions-item label="Official Receipts">$60.00</a-descriptions-item>
      <a-descriptions-item label="Config Info">
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
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<style lang="less" scoped>
</style>
