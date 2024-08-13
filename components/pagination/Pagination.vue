<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import Input from '../input'
import Select from '../select'
interface Props {
  page?: number // (v-model) 当前页数
  pageSize?: number // (v-model) 每页条数
  total?: number // 数据总数
  disabled?: boolean // 是否禁用
  pageAmount?: number // 显示的页码数
  hideOnSinglePage?: boolean // 只有一页时是否隐藏分页
  showQuickJumper?: boolean // 是否可以快速跳转至某页
  showSizeChanger?: boolean // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
  pageSizeOptions?: string[] | number[] // 设置每页可以显示多少条
  showTotal?: boolean | ((total: number, range: number[]) => string) // 用于显示数据总量和当前数据顺序
  placement?: 'left' | 'center' | 'right' // 分页展示位置，靠左 left，居中 center，靠右 right
}
const props = withDefaults(defineProps<Props>(), {
  // 基于类型的声明
  page: 1,
  pageSize: 10,
  total: 0,
  disabled: false,
  pageAmount: 5,
  hideOnSinglePage: false,
  showQuickJumper: false,
  showSizeChanger: undefined,
  pageSizeOptions: () => [10, 20, 50, 100],
  showTotal: false,
  placement: 'center'
})
const currentPage = ref(props.page) // 当前 page
const currentPageSize = ref(props.pageSize) // 当前 pageSize
const jumpNumber = ref() // 跳转的页码
const forwardMore = ref(false) // 左省略号展示
const backwardMore = ref(false) // 右省略号展示
const totalPage = computed(() => {
  // 总页数
  return Math.ceil(props.total / currentPageSize.value) // 向上取整
})
const totalText = computed(() => {
  if (typeof props.showTotal === 'boolean') {
    if (props.showTotal) {
      return `共 ${props.total} 条`
    }
  } else {
    const first = (currentPage.value - 1) * currentPageSize.value + 1
    const last =
      currentPage.value * currentPageSize.value > props.total ? props.total : currentPage.value * currentPageSize.value
    return props.showTotal(props.total, [first, last])
  }
  return null
})
const pageList = computed(() => {
  // 获取显示的页码数组
  return dealPageList(currentPage.value).filter((n) => n !== 1 && n !== totalPage.value)
})
const pageSizeChanger = computed(() => {
  if (typeof props.showSizeChanger === 'boolean') {
    return props.showSizeChanger
  } else {
    // undefined
    return props.total > 50
  }
})
const selectOptions = computed(() => {
  const pageSizeOptipns = [currentPageSize.value, ...props.pageSizeOptions].map((pageSize: number | string) =>
    Number(pageSize)
  )
  return [...new Set(pageSizeOptipns)]
    .sort((a: number, b: number) => a - b)
    .map((pageSize: number) => {
      return {
        label: `${pageSize} 条/页`,
        value: pageSize
      }
    })
})
watch(
  () => props.page,
  (to: number) => {
    currentPage.value = to
  }
)
watch(
  () => props.pageSize,
  (to: number) => {
    currentPageSize.value = to
  }
)
const emits = defineEmits(['update:page', 'update:pageSize', 'change', 'pageSizeChange'])
function dealPageList(curPage: number): number[] {
  var resList = []
  var offset = Math.floor(props.pageAmount / 2) // 向下取整
  var pager = {
    start: curPage - offset,
    end: curPage + offset
  }
  if (pager.start < 1) {
    pager.end = pager.end + (1 - pager.start)
    pager.start = 1
  }
  if (pager.end > totalPage.value) {
    pager.start = pager.start - (pager.end - totalPage.value)
    pager.end = totalPage.value
  }
  if (pager.start < 1) {
    pager.start = 1
  }
  if (pager.start > 1) {
    forwardMore.value = true
  } else {
    forwardMore.value = false
  }
  if (pager.end < totalPage.value) {
    backwardMore.value = true
  } else {
    backwardMore.value = false
  }
  // 生成要显示的页码数组
  for (let i = pager.start; i <= pager.end; i++) {
    resList.push(i)
  }
  return resList
}
function onPageForward(): void {
  currentPage.value = currentPage.value - props.pageAmount > 0 ? currentPage.value - props.pageAmount : 1
  emits('update:page', currentPage.value)
  emits('change', currentPage.value, currentPageSize.value)
}
function onPageBackward(): void {
  currentPage.value =
    currentPage.value + props.pageAmount < totalPage.value ? currentPage.value + props.pageAmount : totalPage.value
  emits('update:page', currentPage.value)
  emits('change', currentPage.value, currentPageSize.value)
}
function onPageJump(): void {
  let num = Number(jumpNumber.value) // 转换为数字
  if (jumpNumber.value && Number.isInteger(num)) {
    // 是否为整数
    if (num < 1) {
      num = 1
    }
    if (num > totalPage.value) {
      num = totalPage.value
    }
    onPageChange(num)
  }
  nextTick(() => {
    jumpNumber.value = undefined // 清空跳转输入框
  })
}
function onPageChange(page: number): boolean | void {
  if (page === 0 || page === totalPage.value + 1) {
    return false
  }
  if (currentPage.value !== page) {
    // 点击的页码不是当前页码
    currentPage.value = page
    emits('update:page', currentPage.value)
    emits('change', currentPage.value, currentPageSize.value)
  }
}
function onPageSizeChange(pageSize: number) {
  currentPageSize.value = pageSize
  const maxPage = Math.ceil(props.total / pageSize)
  if (currentPage.value > maxPage) {
    currentPage.value = maxPage
  }
  emits('update:page', currentPage.value)
  emits('update:pageSize', currentPageSize.value)
  emits('pageSizeChange', currentPage.value, currentPageSize.value)
  emits('change', currentPage.value, currentPageSize.value)
}
</script>
<template>
  <div
    class="m-pagination"
    :class="[
      `pagination-${placement}`,
      {
        'pagination-disabled': disabled,
        'pagination-hidden': !total || (hideOnSinglePage && total <= currentPageSize)
      }
    ]"
  >
    <span class="pagination-total-text" v-if="totalText">{{ totalText }}</span>
    <span
      tabindex="0"
      class="pagination-prev"
      :class="{ 'item-disabled': currentPage === 1 }"
      @keydown.enter.prevent="disabled ? () => false : onPageChange(currentPage - 1)"
      @click="disabled || currentPage === 1 ? () => false : onPageChange(currentPage - 1)"
    >
      <svg class="u-arrow" viewBox="64 64 896 896" data-icon="left" aria-hidden="true" focusable="false">
        <path
          d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
        ></path>
      </svg>
    </span>
    <span
      tabindex="0"
      :class="['pagination-item', { 'item-active': currentPage === 1 }]"
      @click="disabled ? () => false : onPageChange(1)"
    >
      1
    </span>
    <span
      v-show="forwardMore && pageList[0] - 1 > 1"
      tabindex="0"
      ref="forward"
      class="pagintion-item-link"
      @click="disabled ? () => false : onPageForward()"
    >
      <span class="u-ellipsis">•••</span>
      <svg class="u-icon" viewBox="64 64 896 896" data-icon="double-left" aria-hidden="true" focusable="false">
        <path
          d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"
        ></path>
      </svg>
    </span>
    <span
      tabindex="0"
      :class="['pagination-item', { 'item-active': currentPage === page }]"
      v-for="(page, index) in pageList"
      :key="index"
      @click="disabled ? () => false : onPageChange(page)"
    >
      {{ page }}
    </span>
    <span
      v-show="backwardMore && pageList[pageList.length - 1] + 1 < totalPage"
      tabindex="0"
      ref="backward"
      class="pagintion-item-link"
      @click="disabled ? () => false : onPageBackward()"
    >
      <span class="u-ellipsis">•••</span>
      <svg class="u-icon" viewBox="64 64 896 896" data-icon="double-right" aria-hidden="true" focusable="false">
        <path
          d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
        ></path>
      </svg>
    </span>
    <span
      v-show="totalPage !== 1"
      tabindex="0"
      :class="['pagination-item', { 'item-active': currentPage === totalPage }]"
      @click="disabled ? () => false : onPageChange(totalPage)"
    >
      {{ totalPage }}
    </span>
    <span
      tabindex="0"
      class="pagination-next"
      :class="{ 'item-disabled': currentPage === totalPage }"
      @keydown.enter.prevent="disabled ? () => false : onPageChange(currentPage + 1)"
      @click="disabled || currentPage === totalPage ? () => false : onPageChange(currentPage + 1)"
    >
      <svg class="u-arrow" viewBox="64 64 896 896" data-icon="right" aria-hidden="true" focusable="false">
        <path
          d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"
        ></path>
      </svg>
    </span>
    <span class="m-pagination-options">
      <Select
        v-if="pageSizeChanger"
        :class="{ mr8: showQuickJumper }"
        :disabled="disabled"
        :options="selectOptions"
        @change="onPageSizeChange"
        v-model="currentPageSize"
      />
      <span class="pagination-jump-page" v-if="showQuickJumper">
        跳至<Input
          :width="50"
          :disabled="disabled"
          v-model:value.lazy="jumpNumber"
          @change="onPageJump"
          @enter="onPageJump"
        />页
      </span>
    </span>
  </div>
</template>
<style lang="less" scoped>
.m-pagination {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
  .pagination-total-text {
    display: inline-block;
    height: 32px;
    margin-right: 8px;
    line-height: 32px;
  }
  .pagination-item {
    display: inline-block;
    text-align: center;
    min-width: 32px;
    height: 32px;
    line-height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background: #fff;
    margin-right: 8px;
    cursor: pointer;
    outline: none;
    user-select: none; // 禁止选取文本
    transition: all 0.2s;
    &:hover {
      .item-active();
    }
  }
  .pagination-prev,
  .pagination-next {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    line-height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    outline: none;
    user-select: none; // 禁止选取文本
    transition: all 0.2s;
    .u-arrow {
      display: inline-block;
      width: 12px;
      height: 12px;
      fill: rgba(0, 0, 0, 0.65);
      transition: all 0.2s;
    }
    &:hover {
      border-color: @themeColor;
      .u-arrow {
        fill: @themeColor;
      }
    }
  }
  .pagination-prev {
    margin-right: 8px;
  }
  .item-active {
    // 悬浮/选中样式
    font-weight: 600;
    color: @themeColor;
    border-color: @themeColor;
  }
  .item-disabled {
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
  .pagintion-item-link {
    position: relative;
    display: inline-block;
    margin-right: 8px;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    outline: none;
    .u-ellipsis {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      color: rgba(0, 0, 0, 0.25);
      font-family: Arial, Helvetica, sans-serif;
      line-height: 32px;
      letter-spacing: 2px;
      text-align: center;
      text-indent: 0.13em;
      opacity: 1;
      transition: all 0.2s;
    }
    .u-icon {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      display: inline-block;
      fill: @themeColor;
      width: 12px;
      height: 12px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s;
    }
    &:hover {
      .u-ellipsis {
        opacity: 0;
        pointer-events: none;
      }
      .u-icon {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
  .m-pagination-options {
    display: inline-block;
    margin-left: 16px;
    .mr8 {
      margin-right: 8px;
    }
    .pagination-jump-page {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      .m-input-wrap {
        margin: 0 8px;
        height: 32px;
        line-height: 30px;
      }
    }
  }
}
.pagination-left {
  justify-content: flex-start;
}
.pagination-center {
  justify-content: center;
}
.pagination-right {
  justify-content: flex-end;
}
.pagination-disabled {
  .pagination-prev,
  .pagination-next {
    color: rgba(0, 0, 0, 0.25);
    border-color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    .u-arrow {
      fill: rgba(0, 0, 0, 0.25);
    }
    &:hover {
      border-color: rgba(0, 0, 0, 0.25);
      .u-arrow {
        fill: rgba(0, 0, 0, 0.25);
      }
    }
  }
  .pagination-item {
    color: rgba(0, 0, 0, 0.25);
    border-color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    &:hover {
      font-weight: normal;
      color: rgba(0, 0, 0, 0.25);
      border-color: rgba(0, 0, 0, 0.25);
    }
  }
  .item-active {
    border-color: #d9d9d9;
    background-color: rgba(0, 0, 0, 0.15);
    &:hover {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.25);
      border-color: #d9d9d9;
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
  .pagintion-item-link {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
    &:hover {
      .u-ellipsis {
        opacity: 1;
        pointer-events: none;
      }
      .u-icon {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
  .m-pagination-options {
    cursor: not-allowed;
  }
}
.pagination-hidden {
  display: none;
}
</style>
