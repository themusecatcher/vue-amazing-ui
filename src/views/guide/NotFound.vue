<template>
  <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <Button type="primary" href="/">Back Home</Button>
    </template>
  </Result>
</template>
<style lang="less" scoped>
.m-not-found {
  width: 1200px;
  margin: 0 auto;
  .m-img {
    display: inline-block;
    vertical-align: top;
  }
  .m-info {
    display: inline-block;
    margin-top: 325px;
    .u-info {
      margin-bottom: 30px;
      font-size: 18px;
      color: #333;
    }
    .u-btn {
      display: inline-block;
      text-align: center;
      border-radius: 3px;
      color: #fff;
      font-size: 16px;
      padding: 0 40px;
      height: 38px;
      line-height: 38px;
      background-color: @themeColor;
    }
  }
}
</style>
