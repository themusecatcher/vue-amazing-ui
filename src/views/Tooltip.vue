<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { rafTimeout } from '../../packages'

const title = ref('')
const content = ref('')

onMounted(() => {
  rafTimeout(() => { // 模拟接口调用
    title.value = '《哥斯拉大战金刚》是由美国传奇影业公司出品，亚当·温佳德执导，亚历山大·斯卡斯加德、米莉·博比·布朗、丽贝卡·豪尔、凯莉·霍特尔、布莱恩·泰里·亨利、小栗旬联合主演的动作科幻片，于2021于3月26日在中国内地上映'
    content.value = '哥斯拉'
  }, 1000)
})
</script>
<template>
  <div>
    <h2 class="mb10">Tooltip 文字提示基本使用</h2>
    <p class="u-info mt150 mb10">普通用法：</p>
    <Tooltip :maxWidth="240">
      <template #title>特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备</template>
      <div class="u-tag yellow">特斯拉</div>
    </Tooltip>
    <p class="u-info ml120 mb10">模拟接口调用：</p>
    <Tooltip :maxWidth="240">
      <!-- <template #title>《哥斯拉大战金刚》是由美国传奇影业公司出品，亚当·温佳德执导，亚历山大·斯卡斯加德、米莉·博比·布朗、丽贝卡·豪尔、凯莉·霍特尔、布莱恩·泰里·亨利、小栗旬联合主演的动作科幻片，于2021于3月26日在中国内地上映</template> -->
      <template #title>{{ title || '--' }}</template>
      <!-- <div class="u-tag blue">哥斯拉</div> -->
      <div class="u-tag blue">{{ content || '--' }}</div>
    </Tooltip>
    <!-- <a-tooltip>
      <template #title>prompt text</template>
      <div class="u-tag blue">哥斯拉</div>
    </a-tooltip> -->
  </div>
</template>
<style lang="less" scoped>
.u-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
}
.u-info {
  display: inline-block;
  font-size: 16px;
}
.yellow {
  color: #FF9000;
  background: #FFF9F0;
}
.blue {
  color: #0079DD;
  background: #F0F7FD;
}
</style>
