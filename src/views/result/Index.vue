
<script setup lang="ts">
import { CloseCircleOutlined, SmileTwoTone } from '@ant-design/icons-vue'
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">成功的结果</h2>
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <Button key="console" type="primary">Go Console</Button>
        <Button key="buy">Buy Again</Button>
      </template>
    </Result>
    <h2 class="mt30 mb10">展示处理结果</h2>
    <Result title="Your operation has been executed">
      <template #extra>
        <Button key="console" type="primary">Go Console</Button>
      </template>
    </Result>
    <h2 class="mt30 mb10">警告类型的结果</h2>
    <Result status="warning" title="There are some problems with your operation.">
      <template #extra>
        <Button key="console" type="primary">Go Console</Button>
      </template>
    </Result>
    <h2 class="mt30 mb10">复杂的错误反馈</h2>
    <Result
      status="error"
      title="Submission Failed"
      sub-title="Please check and modify the following information before resubmitting."
    >
      <template #extra>
        <Button key="console" type="primary">Go Console</Button>
        <Button key="buy">Buy Again</Button>
      </template>
      <div class="desc">
        <p style="font-size: 16px">
          <strong>The content you submitted has the following error:</strong>
        </p>
        <p>
          <CloseCircleOutlined style="font-size: 14px; color: #ff4d4f" />
          Your account has been frozen
          <a>Thaw immediately &gt;</a>
        </p>
        <p>
          <CloseCircleOutlined :style="{ fontSize: '14px', color: '#ff4d4f' }" />
          Your account is not yet eligible to apply
          <a>Apply Unlock &gt;</a>
        </p>
      </div>
    </Result>
    <h2 class="mt30 mb10">403 你没有此页面的访问权限</h2>
    <Result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
      <template #extra>
        <Button type="primary">Back Home</Button>
      </template>
    </Result>
    <h2 class="mt30 mb10">404 此页面未找到</h2>
    <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <Button type="primary">Back Home</Button>
      </template>
    </Result>
    <h2 class="mt30 mb10">500 服务器发生了错误</h2>
    <Result status="500" title="500" sub-title="Sorry, the server is wrong.">
      <template #extra>
        <Button type="primary">Back Home</Button>
      </template>
    </Result>
    <h2 class="mt30 mb10">自定义 Icon</h2>
    <Result title="Great, we have done all the operations!">
      <template #icon>
        <SmileTwoTone />
      </template>
      <template #extra>
        <Button type="primary">Next</Button>
      </template>
    </Result>
  </div>
</template>
<style lang="less" scoped>
.desc p {
  margin-bottom: 1em;
  line-height: 1;
}
</style>
