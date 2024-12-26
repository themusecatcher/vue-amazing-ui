<script setup lang="ts">
import { ref, watch } from 'vue'
import Tooltip from 'components/tooltip'
export interface Props {
  allowClear?: boolean // 是否允许再次点击后清除
  allowHalf?: boolean // 是否允许半选
  count?: number // star 总数
  character?: 'star-outlined' | 'star-filled' | 'heart-outlined' | 'heart-filled' | string // 字符或图标，预置四种图标 string | slot
  size?: number // 字符大小，单位 px
  color?: string // 字符选中颜色
  gap?: number // 字符间距，单位 px
  disabled?: boolean // 只读，无法进行交互
  tooltips?: string[] // 自定义每项的提示信息
  tooltipProps?: object // Tooltip 组件属性配置，参考 Tooltip Props
  value?: number // (v-model) 当前数，受控值 0,1,2,3...
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
  tooltips: () => [],
  tooltipProps: () => ({}),
  value: 0
})
const activeValue = ref()
const hoverValue = ref()
const tempValue = ref() // 清除时保存点击value
const emits = defineEmits(['update:value', 'change', 'hoverChange'])
watch(
  () => props.value,
  (to) => {
    activeValue.value = to
  },
  {
    immediate: true
  }
)
watch(
  activeValue,
  (to) => {
    hoverValue.value = to
  },
  {
    immediate: true
  }
)
function onClick(value: number) {
  tempValue.value = null
  if (value !== activeValue.value) {
    activeValue.value = value
    emits('change', value) // 选择时的回调
    emits('update:value', value)
  } else {
    if (props.allowClear) {
      tempValue.value = value
      activeValue.value = 0
      emits('change', 0)
      emits('update:value', 0)
    } else {
      // 不允许清除
      emits('change', value) // 选择时的回调
    }
  }
}
function onFirstEnter(value: number) {
  hoverValue.value = value
  emits('hoverChange', value) // 鼠标经过时数值变化的回调
}
function onSecondEnter(value: number) {
  hoverValue.value = value
  emits('hoverChange', value)
}
function resetTempValue() {
  // 重置点击 value
  tempValue.value = null
}
function onLeave() {
  hoverValue.value = activeValue.value
}
function onUp() {
  tempValue.value = null
  if (activeValue.value < props.count) {
    activeValue.value += props.allowHalf ? 0.5 : 1
    emits('change', activeValue.value)
    emits('update:value', activeValue.value)
  }
}
function onDown() {
  tempValue.value = null
  if (activeValue.value > 0) {
    activeValue.value -= props.allowHalf ? 0.5 : 1
    emits('change', activeValue.value)
    emits('update:value', activeValue.value)
  }
}
</script>
<template>
  <div
    class="m-rate"
    :class="{ 'rate-disabled': disabled }"
    :style="`--star-color: ${color}; --star-gap: ${gap}px; --star-size: ${size}px;`"
    @mouseleave="onLeave"
  >
    <template v-for="n in count" :key="n">
      <Tooltip v-bind="tooltipProps">
        <template v-if="tooltips[n - 1]" #tooltip>
          <slot name="tooltip" :tooltip="tooltips[n - 1]" :value="n">{{ tooltips[n - 1] }}</slot>
        </template>
        <div
          tabindex="0"
          class="rate-star"
          :class="{
            'star-half': allowHalf && hoverValue >= n - 0.5 && hoverValue < n,
            'star-full': hoverValue >= n,
            'temp-gray': !allowHalf && tempValue === n
          }"
          @click="allowHalf ? () => false : onClick(n)"
          @keydown.prevent.right="onUp"
          @keydown.prevent.left="onDown"
        >
          <div
            v-if="allowHalf"
            class="star-first"
            :class="{ 'temp-gray-first': tempValue === n - 0.5 }"
            @click.stop="onClick(n - 0.5)"
            @mouseenter="onFirstEnter(n - 0.5)"
            @mouseleave="resetTempValue"
          >
            <slot name="character" :value="n">
              <svg
                v-if="character === 'star-filled'"
                class="icon-character"
                focusable="false"
                data-icon="star"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
                ></path>
              </svg>
              <svg
                v-else-if="character === 'star-outlined'"
                class="icon-character"
                focusable="false"
                data-icon="star"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
                ></path>
              </svg>
              <svg
                v-else-if="character === 'heart-filled'"
                class="icon-character"
                focusable="false"
                data-icon="heart"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"
                ></path>
              </svg>
              <svg
                v-else-if="character === 'heart-outlined'"
                class="icon-character"
                focusable="false"
                data-icon="heart"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"
                ></path>
              </svg>
              <span v-else-if="character" class="icon-character">
                {{ character }}
              </span>
            </slot>
          </div>
          <div
            class="star-second"
            :class="{ 'temp-gray-second': tempValue === n }"
            @click.stop="onClick(n)"
            @mouseenter="onSecondEnter(n)"
            @mouseleave="resetTempValue"
          >
            <slot name="character" :value="n">
              <svg
                v-if="character === 'star-filled'"
                class="icon-character"
                focusable="false"
                data-icon="star"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
                ></path>
              </svg>
              <svg
                v-else-if="character === 'star-outlined'"
                class="icon-character"
                focusable="false"
                data-icon="star"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"
                ></path>
              </svg>
              <svg
                v-else-if="character === 'heart-filled'"
                class="icon-character"
                focusable="false"
                data-icon="heart"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"
                ></path>
              </svg>
              <svg
                v-else-if="character === 'heart-outlined'"
                class="icon-character"
                focusable="false"
                data-icon="heart"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="64 64 896 896"
              >
                <path
                  d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"
                ></path>
              </svg>
              <span v-else class="icon-character">
                {{ character }}
              </span>
            </slot>
          </div>
        </div>
      </Tooltip>
    </template>
  </div>
</template>
<style lang="less" scoped>
.m-rate {
  display: inline-flex;
  gap: var(--star-gap);
  line-height: normal;
  outline: none;
  .rate-star {
    position: relative;
    display: inline-block;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    &:focus-visible {
      outline: 1px dashed var(--star-color);
      transform: scale(1.1);
    }
    :deep(svg) {
      font-size: var(--star-size);
      color: rgba(0, 0, 0, 0.06);
      fill: currentColor;
      transition: color 0.2s;
    }
    &:hover {
      transform: scale(1.1);
    }
    .icon-character {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      height: 1em;
      font-size: var(--star-size);
      color: rgba(0, 0, 0, 0.06);
      transition: color 0.2s;
    }
    .star-first {
      position: absolute;
      top: 0;
      width: 50%;
      height: 100%;
      opacity: 0;
      overflow: hidden;
      transition: all 0.2s;
      user-select: none;
    }
    .star-second {
      display: inline-block;
      user-select: none;
    }
    .temp-gray-first {
      &:hover {
        opacity: 0;
        .icon-character {
          color: rgba(0, 0, 0, 0.06);
        }
      }
    }
    .temp-gray-second {
      &:hover {
        .icon-character {
          color: rgba(0, 0, 0, 0.06);
        }
      }
    }
  }
  .star-half {
    .star-first {
      opacity: 1;
      :deep(svg) {
        color: var(--star-color);
      }
      .icon-character {
        color: var(--star-color);
      }
    }
  }
  .star-full {
    .star-second {
      :deep(svg) {
        color: var(--star-color);
      }
      .icon-character {
        color: var(--star-color);
      }
    }
  }
}
.rate-disabled {
  pointer-events: none;
}
</style>
