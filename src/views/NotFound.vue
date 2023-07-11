<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome () {
  router.push({ path: '/' })
}
</script>
<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="goHome">Back Home</a-button>
    </template>
  </a-result>
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
