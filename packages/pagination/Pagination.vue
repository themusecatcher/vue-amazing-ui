<template>
  <div :class="[`m-pagination ${placement}`, { hidden: hideOnSinglePage && total<=pageSize }]">
    <div class="m-pagination-wrap">
      <span class="mr8" v-if="showTotal">共 {{ totalPage }} 页 / {{ total }} 条</span>
      <span class="u-item" :class="{ disabled: currentPage === 1 }" @click="changePage(currentPage - 1)">
        <svg class="u-arrow" viewBox="64 64 896 896" data-icon="left" aria-hidden="true" focusable="false">
          <path
          d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
          ></path>
        </svg>
      </span>
      <span :class="['u-item', { active: currentPage === 1 }]" @click="changePage(1)">1</span>
      <span
        class="m-arrow"
        ref="forward"
        v-show="forwardMore && pageList[0] - 1 > 1"
        @click="onForward"
        @mouseenter="forwardArrow = true"
        @mouseleave="forwardArrow = false">
        <span v-show="!forwardArrow" class="u-ellipsis">•••</span>
        <svg v-show="forwardArrow" class="u-icon" viewBox="64 64 896 896" data-icon="double-left" aria-hidden="true" focusable="false"><path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path></svg>
      </span>
      <span :class="['u-item', { active: currentPage === page }]" v-for="(page, index) in pageList" :key="index" @click="changePage(page)">{{ page }}</span>
      <span
        class="m-arrow"
        ref="backward"
        v-show="backwardMore && pageList[pageList.length - 1]+1 < totalPage"
        @click="onBackward"
        @mouseenter="backwardArrow = true"
        @mouseleave="backwardArrow = false">
        <span v-show="!backwardArrow" class="u-ellipsis">•••</span>
        <svg v-show="backwardArrow" class="u-icon" viewBox="64 64 896 896" data-icon="double-right" aria-hidden="true" focusable="false"><path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path></svg>
      </span>
      <span v-show="totalPage!==1" :class="['u-item', { active: currentPage === totalPage }]" @click="changePage(totalPage)">{{ totalPage }}</span>
      <span class="u-item" :class="{ disabled: currentPage === totalPage }" @click="changePage(currentPage + 1)">
        <svg class="u-arrow" viewBox="64 64 896 896" data-icon="right" aria-hidden="true" focusable="false">
          <path
          d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"
          ></path>
        </svg>
      </span>
      <span class="u-jump-page" v-if="showQuickJumper">跳至<input type="text" v-model="jumpNumber" />页</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    current: { // 当前页数
      type: Number,
      default: 1
    },
    pageSize: { // 每页条数
      type: Number,
      default: 10
    },
    total: { // 数据总数
      type: Number,
      default: 0
    },
    pageListNum: { // 显示的页码数组长度
      type: Number,
      default: 5
    },
    hideOnSinglePage: { // 只有一页时是否隐藏分页器
      type: Boolean,
      default: false
    },
    showQuickJumper: { // 是否可以快速跳转至某页
      type: Boolean,
      default: false
    },
    showTotal: { // 是否显示当前页数和数据总量
      type: Boolean,
      default: false
    },
    placement: { // 分页器展示位置，靠左，居中，靠右
      type: String,
      default: 'right'
    }
  },
  data () {
    return {
      currentPage: this.current, // 当前页数
      jumpNumber: '', // 跳转的页码
      forwardMore: false, // 左省略号展示
      backwardMore: false, // 右省略号展示
      forwardArrow: false, // 左箭头展示
      backwardArrow: false // 右箭头展示
    }
  },
  computed: {
    totalPage () { // 总页数
      return Math.ceil(this.total / this.pageSize) // 向上取整
    },
    pageList () { // 获取显示的页码数组
      return this.dealPageList(this.currentPage).filter(n => n !== 1 && n !== this.totalPage)
    }
  },
  watch: {
    current (to) { // 当前选中页码
      this.currentPage = to
    },
    currentPage (to) { // 通过更改当前页码，修改分页数据
      this.loading = true
      console.log('change:', to)
      this.$emit('change', {
        page: to,
        pageSize: this.pageSize
      })
    }
  },
  created () {
    // 监听键盘Enter按键
    document.onkeydown = (e) => {
      const ev = e || window.event
      if (ev && ev.keyCode === 13 && this.jumpNumber) {
        this.jumpPage(this.jumpNumber)
      }
    }
  },
  methods: {
    dealPageList (curPage) {
      var resList = []
      var offset = Math.floor(this.pageListNum / 2) // 向下取整
      var pager = {
        start: curPage - offset,
        end: curPage + offset
      }
      if (pager.start < 1) {
        pager.end = pager.end + (1 - pager.start)
        pager.start = 1
      }
      if (pager.end > this.totalPage) {
        pager.start = pager.start - (pager.end - this.totalPage)
        pager.end = this.totalPage
      }
      if (pager.start < 1) {
        pager.start = 1
      }
      if (pager.start > 1) {
        this.forwardMore = true
      } else {
        this.forwardMore = false
      }
      if (pager.end < this.totalPage) {
        this.backwardMore = true
      } else {
        this.backwardMore = false
      }
      // 生成要显示的页码数组
      for (let i = pager.start; i <= pager.end; i++) {
        resList.push(i)
      }
      return resList
    },
    onForward () {
      this.currentPage = this.currentPage - this.pageListNum > 0 ? this.currentPage - this.pageListNum : 1
    },
    onBackward () {
      this.currentPage = this.currentPage + this.pageListNum < this.totalPage ? this.currentPage + this.pageListNum : this.totalPage
    },
    jumpPage (jumpNum) {
      if (Number(jumpNum)) {
        if (Number(jumpNum) < 1) {
          jumpNum = 1
        }
        if (Number(jumpNum) > this.totalPage) {
          jumpNum = this.totalPage
        }
        this.changePage(Number(jumpNum))
      }
      this.jumpNumber = '' // 清空跳转输入框
    },
    changePage (pageNum) {
      if (pageNum === 0 || pageNum === this.totalPage + 1) {
        return false
      }
      if (this.currentPage !== pageNum) {
        // 点击的页码不是当前页码
        this.currentPage = pageNum
      }
    }
  }
}
</script>
<style lang="less" scoped>
.m-pagination {
  margin: 16px 0;
}
.hidden {
  display: none;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.m-pagination-wrap {
  display: inline-block;
  height: 32px;
  line-height: 30px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
  .mr8 {
    margin-right: 8px;
  }
  .u-item {
    min-width: 30px;
    height: 30px;
    display: inline-block;
    user-select: none; // 禁止选取文本
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      .active();
    }
    .u-arrow {
      fill: rgba(0, 0, 0, 0.65);
      width: 12px;
      height: 12px;
      transition: all .3s;
    }
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  .active { // 悬浮/选中样式
    font-weight: 500;
    color: @themeColor;
    border-color: @themeColor;
    .u-arrow {
      fill: @themeColor;
    }
  }
  .disabled {
    // pointer-events: none; // 禁用鼠标事件
    color: rgba(0, 0, 0, 0.25);
    background: #fff;
    border-color: #d9d9d9;
    cursor: not-allowed;
    &:hover {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      border-color: #d9d9d9;
      .u-arrow {
        fill: rgba(0, 0, 0, 0.25);
      }
    }
    .u-arrow {
      fill: rgba(0, 0, 0, 0.25);
    }
  }
  .m-arrow {
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    min-width: 32px;
    height: 32px;
    letter-spacing: 2px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.25);
    transition: all .3s;
    cursor: pointer;
    .u-ellipsis {
      transition: all .3s;
    }
    .u-icon {
      fill: @themeColor;
      width: 12px;
      height: 12px;
    }
  }
  .u-jump-page {
    margin-left: 8px;
    line-height: 32px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    input {
      vertical-align: top;
      width: 26px;
      height: 20px;
      padding: 5px 11px;
      margin: 0 8px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      background: transparent;
      text-align: left;
      outline: none;
      transition: all 0.3s;
      &:hover {
        border-color: @themeColor
      }
      &:focus {
        border-color: @themeColor;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
    }
  }
}
</style>
