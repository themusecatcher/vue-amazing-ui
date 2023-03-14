<template>
  <div class="m-waterfall-wrap" :style="`background-color: ${backgroundColor}; width: ${totalWidth}px; height: ${height}px;`">
    <img
      class="u-img"
      v-for="(item, index) in imagesProperty"
      :key="index"
      :style="`width: ${imageWidth}px; top: ${item && item.top}px; left: ${item && item.left}px;`"
      :src="imageData[index].imgUrl"
      :title="imageData[index].title"
      :alt="imageData[index].title" />
  </div>
</template>
<script>
/*
  主要使用js进行计算，新的图片每次都添加在最短那列的末尾
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
  data () {
    return {
      imagesProperty: [],
      preImages: new Array(this.columnCount)
    }
  },
  computed: {
    imageWidth () {
      return (this.totalWidth - 4 * this.columnGap) / this.columnCount
    },
    height () {
      return Math.max(...this.preImages) + this.columnGap
    }
  },
  watch: {
    imageData (to) {
      this.onPreload()
      this.imagesProperty.splice(to.length)
    }
  },
  created () {
    if (this.imageData.length) {
      this.onPreload()
      this.imagesProperty.splice(this.imageData.length)
    }
  },
  methods: {
    getPosition (i, height) { // 获取图片位置信息（top，left）
      if (i < this.columnCount) {
        this.$set(this.preImages, i, this.columnGap + height)
        return {
          top: this.columnGap,
          left: (this.imageWidth + this.columnGap) * i + this.columnGap
        }
      } else {
        const top = Math.min(...this.preImages)
        var index = 0
        for (let n = 0; n < this.preImages.length; n++) {
          if (this.preImages[n] === top) {
            index = n
            break
          }
        }
        this.$set(this.preImages, index, top + this.columnGap + height)
        return {
          top: top + this.columnGap,
          left: (this.imageWidth + this.columnGap) * index + this.columnGap
        }
      }
    },
    onLoad (url, i) {
      return new Promise((resolve) => {
        const image = new Image()
        image.src = url
        const that = this
        image.onload = function () { // 图片加载完成时执行，此时可通过image.width和image.height获取到图片原始宽高
          var height = image.height / (image.width / that.imageWidth)
          that.$set(that.imagesProperty, i, { // 存储图片宽高和位置信息
            width: that.imageWidth,
            height: height,
            ...that.getPosition(i, height)
          })
          // console.log('this:', this === image) // true 函数运行时所在的对象即img
          resolve('load')
        }
      })
    },
    async onPreload () { // 计算图片宽高和位置（top，left）
      const len = this.imageData.length
      for (let i = 0; i < len; i++) {
        await this.onLoad(this.imageData[i].imgUrl, i)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.m-waterfall-wrap {
  position: relative;
  .u-img {
    position: absolute;
    display: inline-block;
    object-fit: contain;
    vertical-align: bottom;
  }
}
</style>
