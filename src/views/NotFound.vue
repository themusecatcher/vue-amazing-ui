<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome () {
  router.push({ path: '/' })
}
</script>
<template>
  <div class="m-not-found">
    <div class="m-img">
      <img src="~images/404.png" alt="404" />
    </div>
    <div class="m-info">
      <p class="u-info">对不起，您访问的页面不存在</p>
      <a class="u-btn" @click="goHome">返回首页</a>
    </div>
  </div>
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
