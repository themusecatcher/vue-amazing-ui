<template>
  <div>
    <h1>Result 结果</h1>
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
    <Result status="warn" title="There are some problems with your operation.">
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
          <svg focusable="false" class="u-icon" data-icon="close-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
          Your account has been frozen
          <a>Thaw immediately &gt;</a>
        </p>
        <p>
          <svg focusable="false" class="u-icon" data-icon="close-circle" aria-hidden="true" viewBox="64 64 896 896"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
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
    <h2 class="mt30 mb10">自定义 image</h2>
    <Result title="Great, we have done all the operations!">
      <template #image>
        <svg focusable="false" class="u-svg" data-icon="smile" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#1890ff"></path><path d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zM288 421a48.01 48.01 0 0196 0 48.01 48.01 0 01-96 0zm224 272c-85.5 0-155.6-67.3-160-151.6a8 8 0 018-8.4h48.1c4.2 0 7.8 3.2 8.1 7.4C420 589.9 461.5 629 512 629s92.1-39.1 95.8-88.6c.3-4.2 3.9-7.4 8.1-7.4H664a8 8 0 018 8.4C667.6 625.7 597.5 693 512 693zm176-224a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" fill="#e6f7ff"></path><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm376 112h-48.1c-4.2 0-7.8 3.2-8.1 7.4-3.7 49.5-45.3 88.6-95.8 88.6s-92-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4zm-24-112a48 48 0 1096 0 48 48 0 10-96 0z" fill="#1890ff"></path></svg>
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
.u-icon {
  display: inline-block;
  vertical-align: top;
  width: 14px;
  height: 14px;
  fill: #ff4d4f;
}
</style>
