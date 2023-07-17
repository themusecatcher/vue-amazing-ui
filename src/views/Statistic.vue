<script setup lang="ts">
//
</script>
<template>
  <div>
    <h1>Statistic 统计数值</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Row>
      <Col :span="12">
        <Statistic title="Active Users" :value="112893" style="margin-right: 50px" />
      </Col>
      <Col :span="12">
        <Statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
      </Col>
    </Row>
  </div>
</template>
<style lang="less" scoped>
</style>
