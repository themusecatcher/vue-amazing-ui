<template>
  <div class="m-waterfall-wrap" :style="`background: ${backgroundColor}; width: ${width}px; padding: ${columnGap}px; column-count: ${columnCount}; column-gap: ${columnGap}px;`">
    <div class="m-img" :style="`margin-bottom: ${columnGap}px;`" v-for="(item, index) in imageData" :key="index">
      <img class="u-img" :src="item.imgUrl" :title="item.title" :alt="item.title" />
    </div>
  </div>
</template>
<script>
/*
  纯CSS，实现简单，但图片顺序是每列从上往下排列
*/
export default {
  name: 'Waterfall',
  props: {
    imageData: { // 瀑布流的图片数组
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    columnCount: { // 瀑布流要划分的列数
      type: Number,
      default: 3
    },
    columnGap: { // 瀑布流各列之间的间隙
      type: Number,
      default: 30
    },
    totalWidth: { // 瀑布流区域的总宽度
      type: Number,
      default: 1200
    },
    backgroundColor: { // 瀑布流区域背景填充色
      type: String,
      default: '#F2F4F8'
    }
  },
  computed: {
    width () {
      return this.totalWidth - 2 * this.columnGap
    }
  }
}
</script>
<style lang="less" scoped>
.m-waterfall-wrap {
  .m-img {
    .u-img {
      width: 100%;
      vertical-align: bottom;
    }
  }
}
</style>
