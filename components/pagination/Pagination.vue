<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import Input, { type InputProps } from 'components/input'
import { useControlledModel } from 'components/utils'
import Select, { type SelectProps } from 'components/select'
export interface QuickJumperConfig {
  goButton?: boolean | string // 是否展示跳转确认按钮，传字符串时作为按钮文案
}
export interface Props {
  page?: number // (v-model) 当前页数
  defaultPage?: number // 非受控时的初始页数（未绑 v-model:page 时生效）
  pageSize?: number // (v-model) 每页条数
  defaultPageSize?: number // 非受控时的初始每页条数（未绑 v-model:page-size 时生效）
  total?: number // 数据总数
  disabled?: boolean // 是否禁用
  pageAmount?: number // 显示的页码数
  hideOnSinglePage?: boolean // 只有一页时是否隐藏分页
  showQuickJumper?: boolean | QuickJumperConfig // 是否可以快速跳转至某页，对象形态可加跳转确认按钮
  jumperProps?: InputProps // 快速跳转组件 props，参考 Input 组件 Props
  showSizeChanger?: boolean // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
  changerProps?: SelectProps // pageSize 切换器组件 props，参考 Select 组件 Props
  pageSizeOptions?: string[] | number[] // 设置每页可以显示多少条
  showTotal?: boolean | ((total: number, range: number[]) => string) // 用于显示数据总量和当前数据顺序
  bordered?: boolean // 页码是否显示边框，false 时为无边框风格
  placement?: 'left' | 'center' | 'right' // 分页展示位置，靠左 left，居中 center，靠右 right
  size?: 'large' | 'middle' | 'small' // 分页按钮大小
}
const props = withDefaults(defineProps<Props>(), {
  total: 0,
  disabled: false,
  pageAmount: 5,
  hideOnSinglePage: false,
  showQuickJumper: false,
  jumperProps: () => ({}),
  showSizeChanger: undefined,
  changerProps: () => ({}),
  pageSizeOptions: () => [10, 20, 50, 100],
  showTotal: false,
  bordered: true,
  placement: 'center',
  size: 'large'
})
// (v-model) 当前页数 / 每页条数：传值即受控，未传时组件自持（初值 1 / 10）
const pageModel = useControlledModel<number>('page', props.defaultPage ?? 1)
const pageSizeModel = useControlledModel<number>('pageSize', props.defaultPageSize ?? 10)
const pageListRef = ref<HTMLElement[] | null>(null) // 页码元素引用，用于键盘操作后的焦点回落
const jumpNumber = ref<string>() // 跳转的页码
const emits = defineEmits(['update:page', 'update:pageSize', 'change', 'pageSizeChange'])
const totalPage = computed(() => {
  // 总页数：pageSize 兜底 1，避免除零得到 Infinity
  return Math.ceil(props.total / Math.max(pageSizeModel.value, 1))
})
// 生效页码：受控时父值可能越界（如 total 缩小后父侧未同步），统一钳制到 [1, 总页数]
const currentPage = computed(() => {
  const max = Math.max(totalPage.value, 1)
  return Math.min(Math.max(pageModel.value, 1), max)
})
const totalText = computed(() => {
  if (typeof props.showTotal === 'boolean') {
    if (props.showTotal) {
      return `共 ${props.total} 条`
    }
  } else {
    const first = props.total === 0 ? 0 : (currentPage.value - 1) * pageSizeModel.value + 1
    const last =
      currentPage.value * pageSizeModel.value > props.total ? props.total : currentPage.value * pageSizeModel.value
    return props.showTotal(props.total, [first, last])
  }
  return null
})
// 页码窗口：首尾页码由模板固定渲染，此处只产出中间的页码与两侧省略号显隐（纯派生，无副作用）
const pageWindow = computed(() => {
  const total = totalPage.value
  const offset = Math.floor(props.pageAmount / 2)
  let start = currentPage.value - offset
  let end = currentPage.value + offset
  if (start < 1) {
    end += 1 - start
    start = 1
  }
  if (end > total) {
    start -= end - total
    end = total
  }
  if (start < 1) {
    start = 1
  }
  const pages: number[] = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return {
    pages: pages.filter((page) => page !== 1 && page !== total),
    // 省略号与相邻页码重复时不展示（如窗口首项为 2，点击 1 即可到达）
    showPrevMore: start > 2,
    showNextMore: end < total - 1
  }
})
const showPageSizeChanger = computed(() => {
  if (typeof props.showSizeChanger === 'boolean') {
    return props.showSizeChanger
  } else {
    // undefined
    return props.total > 50
  }
})
const showJumper = computed(() => {
  // 仅一页时没有跳转的必要
  return Boolean(props.showQuickJumper) && props.total > pageSizeModel.value
})
const goButtonConfig = computed(() =>
  typeof props.showQuickJumper === 'object' ? props.showQuickJumper.goButton : undefined
)
const hasGoButton = computed(() => goButtonConfig.value !== undefined && goButtonConfig.value !== false)
// 有确认按钮时失焦不再提交，只能点按钮或回车
const goButtonText = computed(() => {
  const text = goButtonConfig.value
  return typeof text === 'string' && text ? text : '确定'
})
const showPagination = computed(() => {
  // total 为 0 时无分页可言；只有一页且要求隐藏时同样隐藏
  return Boolean(props.total) && !(props.hideOnSinglePage && props.total <= pageSizeModel.value)
})
const canPrev = computed(() => !props.disabled && currentPage.value > 1)
const canNext = computed(() => !props.disabled && currentPage.value < totalPage.value)
const selectOptions = computed(() => {
  // 当前生效值一并进选项，避免受控传入的 pageSize 不在 pageSizeOptions 里时切换器无选项可显示
  const pageSizeList = [pageSizeModel.value, ...props.pageSizeOptions].map((pageSize: number | string) =>
    Number(pageSize)
  )
  return Array.from(new Set(pageSizeList))
    .sort((a: number, b: number) => a - b)
    .map((pageSize: number) => {
      return {
        label: `${pageSize} 条/页`,
        value: pageSize
      }
    })
})
const selectHeight = computed(() => {
  const heightMap = {
    small: 24,
    middle: 28,
    large: 32
  }
  return heightMap[props.size] || heightMap['large']
})
const optionsSize = computed(() => {
  if (props.size === 'small') {
    return 'small'
  }
  return 'middle'
})
// 非受控时把钳制结果回写本地值：total 回升后不会跳回越界页码；受控时只影响渲染，不擅自改写父值
watch([() => props.total, pageSizeModel], () => {
  if (props.page === undefined && pageModel.value !== currentPage.value) {
    pageModel.value = currentPage.value
  }
})
function onJumpPrev(): void {
  onPageChange(currentPage.value - props.pageAmount)
}
function onJumpNext(): void {
  onPageChange(currentPage.value + props.pageAmount)
}
async function onPageJump(): Promise<void> {
  const num = Number(jumpNumber.value)
  if (jumpNumber.value && Number.isInteger(num)) {
    onPageChange(num)
  }
  await nextTick()
  jumpNumber.value = '' // 清空跳转输入框（传 undefined 属「父不再传值」，不会清空非受控的输入框）
}
// 跳转框只接受数字：非数字字符在 keydown 阶段就拦下，否则非法内容会被静默丢弃、用户无从判断
function onJumperKeydown(e: KeyboardEvent): void {
  // 组合键（复制 / 粘贴 / 撤销）与功能键（退格 / 方向 / 回车 / Tab）放行，单字符键才校验
  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) {
    return
  }
  if (!/\d/.test(e.key)) {
    e.preventDefault()
  }
}
// 粘贴 / 输入法绕过 keydown，取值时再过滤一次
function onJumperValue(value: string): void {
  const digits = value.replace(/\D/g, '')
  if (digits === value) {
    return
  }
  const prev = jumpNumber.value
  jumpNumber.value = digits
  if (prev === digits) {
    // 过滤后与旧值相同（如粘贴纯字母）时 props 不变、Input 不会回写，置空再恢复以强制复位
    jumpNumber.value = ''
    nextTick(() => {
      jumpNumber.value = digits
    })
  }
}
// 跳转框失焦：落在分页项上时由点击本身负责跳转，这里只清空输入，避免「先跳到输入页、再被点击页覆盖」的重复上报
async function onJumperBlur(e: FocusEvent): Promise<void> {
  const related = e.relatedTarget as HTMLElement | null
  const isPagerNode = related?.closest?.(
    '.pagination-item, .pagination-prev, .pagination-next, .pagination-jump-prev, .pagination-jump-next'
  )
  if (isPagerNode) {
    jumpNumber.value = ''
    return
  }
  // 有确认按钮时失焦不算提交，保留已输入内容，等按钮或回车
  if (hasGoButton.value) {
    return
  }
  await onPageJump()
}
// 键盘操作后把焦点交给当前页码，避免焦点停留在已失效的元素上
async function activePageFocus(activePage: number): Promise<void> {
  await nextTick()
  const targetIndex = pageWindow.value.pages.findIndex((page: number) => page === activePage)
  pageListRef.value?.[targetIndex]?.focus()
}
function onPageChange(page: number, inPageList: boolean = false): void {
  if (props.disabled) {
    return
  }
  // 越界页码一律钳制，跳转输入、省略号翻页、上/下一页共用同一入口
  const target = Math.min(Math.max(page, 1), Math.max(totalPage.value, 1))
  // 点击的页码不是当前页码才上报
  if (currentPage.value !== target) {
    pageModel.value = target
    if (inPageList) {
      activePageFocus(target)
    }
    emits('change', target, pageSizeModel.value)
  }
}
// pageSize 切换器变化时的回调
function onPageSizeChange(pageSize: number): void {
  pageSizeModel.value = pageSize
  // 换每页条数后总页数变化，当前页可能越界，统一按新总页数钳制
  // 总页数与目标页码都用本地入参算：受控时写完立刻回读模型，拿到的仍是父侧旧值
  const maxPage = Math.max(Math.ceil(props.total / Math.max(pageSize, 1)), 1)
  const nextPage = Math.min(Math.max(pageModel.value, 1), maxPage)
  if (pageModel.value !== nextPage) {
    // 受控时此处只派发 update:page，由父侧回写；非受控时直接改写本地值
    pageModel.value = nextPage
  }
  emits('pageSizeChange', nextPage, pageSize)
  emits('change', nextPage, pageSize)
}
</script>
<template>
  <div
    v-show="showPagination"
    class="pagination-wrap"
    role="navigation"
    aria-label="分页"
    :class="[
      `pagination-${placement}`,
      {
        'pagination-small': size === 'small',
        'pagination-middle': size === 'middle',
        'pagination-disabled': disabled,
        'pagination-borderless': !bordered
      }
    ]"
  >
    <span class="pagination-total-text" v-if="totalText">{{ totalText }}</span>
    <span
      :tabindex="canPrev ? 0 : -1"
      class="pagination-prev"
      title="上一页"
      :aria-disabled="!canPrev"
      :class="{ 'pagination-item-disabled': !canPrev }"
      @keydown.enter.prevent="onPageChange(currentPage - 1)"
      @click="onPageChange(currentPage - 1)"
    >
      <svg
        class="arrow-svg"
        viewBox="64 64 896 896"
        data-icon="left"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
        ></path>
      </svg>
    </span>
    <span
      :tabindex="disabled ? -1 : 0"
      :class="['pagination-item', { 'pagination-item-active': currentPage === 1 }]"
      title="第 1 页"
      :aria-current="currentPage === 1 ? 'page' : undefined"
      @keydown.enter.prevent="onPageChange(1)"
      @click="onPageChange(1)"
    >
      1
    </span>
    <span
      v-show="pageWindow.showPrevMore"
      :tabindex="disabled ? -1 : 0"
      class="pagination-jump-prev"
      :title="`向前 ${pageAmount} 页`"
      @keydown.enter.prevent="onJumpPrev()"
      @click="onJumpPrev()"
    >
      <span class="ellipsis-character">•••</span>
      <svg
        class="icon-svg"
        focusable="false"
        data-icon="double-left"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"
        ></path>
      </svg>
    </span>
    <span
      v-for="page in pageWindow.pages"
      ref="pageListRef"
      :key="page"
      :tabindex="disabled ? -1 : 0"
      :class="['pagination-item', { 'pagination-item-active': currentPage === page }]"
      :title="`第 ${page} 页`"
      :aria-current="currentPage === page ? 'page' : undefined"
      @keydown.enter.prevent="onPageChange(page, true)"
      @click="onPageChange(page, true)"
    >
      {{ page }}
    </span>
    <span
      v-show="pageWindow.showNextMore"
      :tabindex="disabled ? -1 : 0"
      class="pagination-jump-next"
      :title="`向后 ${pageAmount} 页`"
      @keydown.enter.prevent="onJumpNext()"
      @click="onJumpNext()"
    >
      <span class="ellipsis-character">•••</span>
      <svg
        class="icon-svg"
        focusable="false"
        data-icon="double-right"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"
        ></path>
      </svg>
    </span>
    <span
      v-show="totalPage !== 1"
      :tabindex="disabled ? -1 : 0"
      :class="['pagination-item', { 'pagination-item-active': currentPage === totalPage }]"
      :title="`第 ${totalPage} 页`"
      :aria-current="currentPage === totalPage ? 'page' : undefined"
      @keydown.enter.prevent="onPageChange(totalPage)"
      @click="onPageChange(totalPage)"
    >
      {{ totalPage }}
    </span>
    <span
      :tabindex="canNext ? 0 : -1"
      class="pagination-next"
      title="下一页"
      :aria-disabled="!canNext"
      :class="{ 'pagination-item-disabled': !canNext }"
      @keydown.enter.prevent="onPageChange(currentPage + 1)"
      @click="onPageChange(currentPage + 1)"
    >
      <svg
        class="arrow-svg"
        viewBox="64 64 896 896"
        data-icon="right"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"
        ></path>
      </svg>
    </span>
    <span class="pagination-options" v-if="showPageSizeChanger || showJumper">
      <Select
        v-if="showPageSizeChanger"
        :size="optionsSize"
        :height="selectHeight"
        :disabled="disabled"
        :options="selectOptions"
        v-model:value="pageSizeModel"
        @change="onPageSizeChange"
        v-bind="changerProps"
      />
      <span class="pagination-jump-page" v-if="showJumper">
        跳至<Input
          :width="50"
          :size="optionsSize"
          :disabled="disabled"
          v-model:value="jumpNumber"
          @keydown="onJumperKeydown"
          @update:value="onJumperValue"
          @blur="onJumperBlur"
          @enter="onPageJump"
          v-bind="jumperProps"
        />页<button
          v-if="hasGoButton"
          class="pagination-jump-button"
          type="button"
          :disabled="disabled"
          @click="onPageJump"
        >
          {{ goButtonText }}
        </button>
      </span>
    </span>
  </div>
</template>
<style lang="less" scoped>
.pagination-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--va-text-color-1);
  line-height: 1.5714285714285714;
  .pagination-total-text {
    display: inline-flex;
    align-items: center;
    height: 32px;
    transition: height 0.2s;
  }
  .pagination-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 6px;
    min-width: 32px;
    height: 32px;
    border: 1px solid var(--va-border-color);
    border-radius: 6px;
    background: var(--va-bg-container-color);
    cursor: pointer;
    outline: 0;
    user-select: none; // 禁止选取文本
    transition:
      color 0.2s,
      background-color 0.2s,
      border-color 0.2s,
      min-width 0.2s,
      height 0.2s;
    &:hover {
      color: var(--va-cp-pagination-primary-color, var(--va-primary-color));
      border-color: var(--va-cp-pagination-primary-color, var(--va-primary-color));
    }
    &:focus-visible {
      outline: 2px solid var(--va-cp-pagination-primary-border-color, var(--va-primary-border-color));
      outline-offset: 1px;
    }
  }
  .pagination-prev,
  .pagination-next {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    border: 1px solid var(--va-border-color);
    border-radius: 6px;
    background: var(--va-bg-container-color);
    cursor: pointer;
    outline: 0;
    user-select: none; // 禁止选取文本
    transition:
      background-color 0.2s,
      border-color 0.2s,
      min-width 0.2s,
      height 0.2s;
    .arrow-svg {
      display: inline-block;
      font-size: 12px;
      color: var(--va-text-color-2);
      transition: color 0.2s;
    }
    &:hover {
      border-color: var(--va-cp-pagination-primary-color, var(--va-primary-color));
      .arrow-svg {
        color: var(--va-cp-pagination-primary-color, var(--va-primary-color));
      }
    }
    &:focus-visible:not(.pagination-item-disabled) {
      outline: 2px solid var(--va-cp-pagination-primary-border-color, var(--va-primary-border-color));
      outline-offset: 1px;
    }
  }
  .pagination-item-active {
    color: var(--va-cp-pagination-primary-text-color, var(--va-primary-text-color));
    border-color: var(--va-cp-pagination-primary-color, var(--va-primary-color));
    font-weight: 600; // 选中页码加粗
    &:hover {
      color: var(--va-cp-pagination-primary-color-hover, var(--va-primary-color-hover));
      border-color: var(--va-cp-pagination-primary-color-hover, var(--va-primary-color-hover));
    }
  }
  .pagination-item-disabled {
    color: var(--va-text-color-disabled);
    background: var(--va-bg-container-color);
    border-color: var(--va-border-color);
    cursor: not-allowed;
    &:hover {
      color: var(--va-text-color-disabled);
      border-color: var(--va-border-color);
      .arrow-svg {
        color: var(--va-text-color-disabled);
      }
    }
    .arrow-svg {
      color: var(--va-text-color-disabled);
    }
  }
  .pagination-jump-prev,
  .pagination-jump-next {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-width: 32px;
    height: 32px;
    border-radius: 6px;
    cursor: pointer;
    outline: 0;
    transition:
      min-width 0.2s,
      height 0.2s;
    .ellipsis-character {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      color: var(--va-text-color-disabled);
      font-family: Arial, Helvetica, sans-serif; // 省略号圆点字形所需（库内唯一的字体族例外）
      line-height: 32px;
      letter-spacing: 2px;
      text-align: center;
      text-indent: 0.13em;
      opacity: 1;
      transition:
        opacity 0.2s,
        line-height 0.2s;
    }
    .icon-svg {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      display: inline-block;
      font-size: 12px;
      color: var(--va-cp-pagination-primary-color, var(--va-primary-color));
      fill: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
    &:hover {
      .ellipsis-character {
        opacity: 0;
        pointer-events: none;
      }
      .icon-svg {
        opacity: 1;
        pointer-events: auto;
      }
    }
    &:focus-visible {
      outline: 2px solid var(--va-cp-pagination-primary-border-color, var(--va-primary-border-color));
      outline-offset: 1px;
      .ellipsis-character {
        opacity: 0;
        pointer-events: none;
      }
      .icon-svg {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
  .pagination-options {
    display: inline-flex;
    gap: 8px;
    margin-left: 8px;
    .pagination-jump-page {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      vertical-align: bottom;
      height: 32px;
      transition: height 0.2s;
      .pagination-jump-button {
        height: 100%;
        padding: 0 11px;
        border: 1px solid var(--va-border-color);
        border-radius: 6px;
        background: var(--va-bg-container-color);
        color: var(--va-text-color-1);
        font-size: 14px;
        line-height: 1;
        cursor: pointer;
        outline: 0;
        transition:
          color 0.2s,
          background-color 0.2s,
          border-color 0.2s;
        &:hover:not(:disabled) {
          color: var(--va-cp-pagination-primary-color, var(--va-primary-color));
          border-color: var(--va-cp-pagination-primary-color, var(--va-primary-color));
        }
        &:active:not(:disabled) {
          color: var(--va-cp-pagination-primary-color-active, var(--va-primary-color-active));
          border-color: var(--va-cp-pagination-primary-color-active, var(--va-primary-color-active));
        }
        &:focus-visible {
          outline: 2px solid var(--va-cp-pagination-primary-border-color, var(--va-primary-border-color));
          outline-offset: 1px;
        }
        &:disabled {
          color: var(--va-text-color-disabled);
          background: var(--va-fill-color-1);
          border-color: var(--va-border-color);
          cursor: not-allowed;
        }
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
.pagination-small {
  gap: 4px;
  .pagination-total-text {
    height: 24px;
  }
  .pagination-item {
    min-width: 24px;
    height: 24px;
  }
  .pagination-prev,
  .pagination-next {
    min-width: 24px;
    height: 24px;
  }
  .pagination-jump-prev,
  .pagination-jump-next {
    min-width: 24px;
    height: 24px;
    .ellipsis-character {
      line-height: 24px;
    }
  }
  .pagination-options {
    gap: 4px;
    margin-left: 4px;
    .pagination-jump-page {
      gap: 4px;
      height: 24px;
      .pagination-jump-button {
        padding: 0 7px;
      }
    }
  }
}
.pagination-middle {
  gap: 6px;
  .pagination-total-text {
    height: 28px;
  }
  .pagination-item {
    min-width: 28px;
    height: 28px;
  }
  .pagination-prev,
  .pagination-next {
    min-width: 28px;
    height: 28px;
  }
  .pagination-jump-prev,
  .pagination-jump-next {
    min-width: 28px;
    height: 28px;
    .ellipsis-character {
      line-height: 28px;
    }
  }
  .pagination-options {
    gap: 6px;
    margin-left: 6px;
    .pagination-jump-page {
      gap: 6px;
      height: 28px;
      .pagination-jump-button {
        padding: 0 9px;
      }
      :deep(.input-wrap) {
        .input-container {
          padding: 3px 11px;
        }
      }
    }
  }
}
.pagination-disabled {
  .pagination-prev,
  .pagination-next {
    color: var(--va-text-color-disabled);
    background: var(--va-fill-color-1);
    border-color: var(--va-border-color);
    cursor: not-allowed;
    .arrow-svg {
      color: var(--va-text-color-disabled);
    }
    &:hover {
      background: var(--va-fill-color-1);
      border-color: var(--va-border-color);
      .arrow-svg {
        color: var(--va-text-color-disabled);
      }
    }
  }
  .pagination-item {
    color: var(--va-text-color-disabled);
    background: var(--va-fill-color-1);
    border-color: var(--va-border-color);
    cursor: not-allowed;
    &:hover {
      color: var(--va-text-color-disabled);
      background: var(--va-fill-color-1);
      border-color: var(--va-border-color);
    }
    &:focus-visible {
      outline: 0;
    }
  }
  .pagination-item-active {
    color: var(--va-text-color-disabled);
    border-color: var(--va-border-color);
    background-color: var(--va-fill-color-3);
    &:hover {
      color: var(--va-text-color-disabled);
      border-color: var(--va-border-color);
      background-color: var(--va-fill-color-3);
    }
  }
  .pagination-jump-prev,
  .pagination-jump-next {
    color: var(--va-text-color-disabled);
    cursor: not-allowed;
    &:hover {
      .ellipsis-character {
        opacity: 1;
        pointer-events: none;
      }
      .icon-svg {
        opacity: 0;
        pointer-events: none;
      }
    }
    &:focus-visible {
      outline: 0;
      .ellipsis-character {
        opacity: 1;
        pointer-events: none;
      }
      .icon-svg {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
  .pagination-options {
    color: var(--va-text-color-disabled);
    cursor: not-allowed;
  }
}
// 无边框风格：常态无边框无底色，悬浮出浅底且文字 / 箭头保持默认色，按压再深一档
.pagination-borderless {
  .pagination-item:not(.pagination-item-active),
  .pagination-prev,
  .pagination-next {
    border-color: transparent;
    background: transparent;
    &:hover:not(.pagination-item-disabled) {
      border-color: transparent;
      background: var(--va-fill-color-2);
      color: var(--va-text-color-1);
      .arrow-svg {
        color: var(--va-text-color-1);
      }
    }
    &:active:not(.pagination-item-disabled) {
      background: var(--va-fill-color-3);
    }
  }
  .pagination-prev,
  .pagination-next {
    &:not(.pagination-item-disabled) .arrow-svg {
      color: var(--va-text-color-1);
    }
  }
  .pagination-item-disabled {
    border-color: transparent;
    background: transparent;
    &:hover {
      border-color: transparent;
      background: transparent;
    }
  }
}
// 无边框风格禁用态：未选中项保持无边框无底色（仅文字转禁用色），仅选中页保留边框与更深的禁用底色
.pagination-borderless.pagination-disabled {
  .pagination-item:not(.pagination-item-active),
  .pagination-prev,
  .pagination-next {
    background: transparent;
    border-color: transparent;
    &:hover {
      background: transparent;
      border-color: transparent;
    }
  }
  .pagination-item-active,
  .pagination-item-active:hover {
    background: var(--va-fill-color-3);
    border-color: var(--va-border-color);
  }
}
</style>
