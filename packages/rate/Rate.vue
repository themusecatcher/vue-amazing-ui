<script setup lang="ts">
import { ref, watch } from 'vue'
interface Props {
  allowClear?: boolean // 是否允许再次点击后清除
  allowHalf?: boolean // 是否允许半选
  count?: number // star 总数
  character?: string // 自定义字符，string | slot，预置 'star-outlined' 'star-filled' 'heart-outlined' 'heart-filled' 四种svg图标
  size?: number // 字符时是字体高度，图标时是图片大小
  color?: string // 字符选中颜色
  gap?: number // 字符间距，单位px
  disabled?: boolean // 只读，无法进行交互
  value?: number // v-model 当前数，受控值 1,2,3...
}
const props = withDefaults(defineProps<Props>(), {
  allowClear: true,
  allowHalf: false,
  count: 5,
  character: 'star-filled',
  size: 20,
  color: '#fadb14',
  gap: 8,
  disabled: false,
  value: 0
})
const activeValue = ref(props.value)
const tempValue = ref() // 清除时保存点击value
watch(
  () => props.value,
  (to) => {
    activeValue.value = to
  }
)
const emits = defineEmits(['update:value', 'change', 'hoverChange'])
function onClick (value: number) {
  tempValue.value = null
  if (value !== props.value) {
    emits('change', value) // 选择时的回调
    emits('update:value', value)
  } else {
    if (props.allowClear) {
      tempValue.value = value
      emits('change', 0)
      emits('update:value', 0)
    } else { // 不允许清除
      emits('change', value) // 选择时的回调
    }
  }
}
function onFirstEnter (value: number) {
  activeValue.value = value
  emits('hoverChange', value) // 鼠标经过时数值变化的回调
}
function onSecondEnter (value: number) {
  activeValue.value = value
  emits('hoverChange', value)
}
function resetTempValue () { // 重置点击value
  tempValue.value = null
}
function onLeave () {
  activeValue.value = props.value
}
function preventDefault (e: Event) {
  e.preventDefault()
}
</script>
<template>
  <div class="m-rate" :class="{'disabled': disabled}" :style="`--color: ${color};`" @mouseleave="onLeave">
    <div
      class="m-star"
      :style="`margin-right: ${n !== count ? gap:0}px;`"
      :class="{'u-star-half': allowHalf && activeValue >= n - 0.5 && activeValue < n, 'u-star-full': activeValue >= n, 'temp-gray': !allowHalf && tempValue === n}"
      @click="!allowHalf ? onClick(n):preventDefault($event)"
      v-for="n in count" :key="n">
      <div
        v-if="allowHalf"
        class="u-star-first"
        :class="{'temp-gray-first': tempValue === n - 0.5}"
        @click.stop="onClick(n - 0.5)"
        @mouseenter="onFirstEnter(n - 0.5)"
        @mouseleave="resetTempValue">
        <svg v-if="character === 'star-filled'" class="u-star" :style="`width: ${size}px;`" focusable="false" data-icon="star" aria-hidden="true" viewBox="64 64 896 896"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
        <svg v-else-if="character === 'star-outlined'" class="u-star" :style="`width: ${size}px;`" focusable="false" data-icon="star" aria-hidden="true" viewBox="64 64 896 896"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path></svg>
        <svg v-else-if="character === 'heart-filled'" class="u-star" :style="`width: ${size}px;`" focusable="false" data-icon="heart" aria-hidden="true" viewBox="64 64 896 896"><path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path></svg>
        <svg v-else-if="character === 'heart-outlined'" class="u-star" :style="`width: ${size}px;`" focusable="false" data-icon="heart" aria-hidden="true" viewBox="64 64 896 896"><path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path></svg>
        <span v-else class="u-star" :style="`font-size: ${0.66*size}px; height: ${size}px;`">
          <slot name="character">{{ character }}</slot>
        </span>
      </div>
      <div
        class="u-star-second"
        :class="{'temp-gray-second': tempValue === n}"
        @click.stop="onClick(n)"
        @mouseenter="onSecondEnter(n)"
        @mouseleave="resetTempValue">
        <svg v-if="character === 'star-filled'" class="u-star" :style="`width: ${size}px;`" focusable="false" data-icon="star" aria-hidden="true" viewBox="64 64 896 896"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
        <svg v-else-if="character === 'star-outlined'" class="u-star" :style="`width: ${size}px;`" focusable="false" data-icon="star" aria-hidden="true" viewBox="64 64 896 896"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path></svg>
        <svg v-else-if="character === 'heart-filled'" class="u-star" :style="`width: ${size}px;`" focusable="false" data-icon="heart" aria-hidden="true" viewBox="64 64 896 896"><path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path></svg>
        <svg v-else-if="character === 'heart-outlined'" class="u-star" :style="`width: ${size}px;`" focusable="false" data-icon="heart" aria-hidden="true" viewBox="64 64 896 896"><path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path></svg>
        <span v-else class="u-star" :style="`font-size: ${0.66*size}px; height: ${size}px;`">
          <slot name="character">{{ character }}</slot>
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-rate {
  display: inline-block;
  .m-star {
    position: relative;
    display: inline-block;
    cursor: pointer;
    transition: transform .3s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
    .u-star {
      display: inline-flex;
      align-items: center;
      text-align: center;
      vertical-align: middle;
      fill: rgba(0, 0, 0, .06);
      color: rgba(0, 0, 0, .06);
      transition: all .3s;
    }
    .u-star-first {
      position: absolute;
      top: 0;
      width: 50%;
      height: 100%;
      opacity: 0;
      overflow: hidden;
      transition: all .3s;
      &:hover {
        opacity: 1;
        .u-star {
          fill: var(--color);
          color: var(--color);
        }
      }
    }
    .u-star-second {
      display: inline-block;
      &:hover {
        .u-star {
          fill: var(--color);
          color: var(--color);
        }
      }
    }
    .temp-gray-first {
      &:hover {
        opacity: 0;
        .u-star {
          fill: rgba(0, 0, 0, .06);
          color: rgba(0, 0, 0, .06);
        }
      }
    }
    .temp-gray-second {
      &:hover {
        .u-star {
          fill: rgba(0, 0, 0, .06);
          color: rgba(0, 0, 0, .06);
        }
      }
    }
  }
  .u-star-half {
    .u-star-first {
      opacity: 1;
      .u-star {
        fill: var(--color);
        color: var(--color);
      }
    }
  }
  .u-star-full {
    .u-star-second {
      .u-star {
        fill: var(--color);
        color: var(--color);
      }
    }
  }
}
.disabled {
  pointer-events: none;
}
</style>
