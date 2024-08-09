<script setup lang="ts">
import { computed } from 'vue'
interface Step {
  title?: string // 标题
  description?: string // 描述
}
interface Props {
  steps?: Step[] // 步骤数组
  width?: number | string // 步骤条总宽度，单位 px
  size?: 'default' | 'small' // 步骤条大小
  vertical?: boolean // 是否使用垂直步骤条，当 vertical: true 时，labelPlacement 自动设为 right
  labelPlacement?: 'right' | 'bottom' // 标签放置位置，默认放图标右侧，可选 bottom 放图标下方
  dotted?: boolean // 是否使用点状步骤条，当 dotted: true 且 vertical: false 时，labelPlacement 将自动设为 bottom
  current?: number // (v-model) 当前选中的步骤，设置 v-model 后，Steps 变为可点击状态。从 1 开始计数
}
const props = withDefaults(defineProps<Props>(), {
  steps: () => [],
  width: 'auto',
  size: 'default',
  vertical: false,
  labelPlacement: 'right',
  dotted: false,
  current: 1
})
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const totalSteps = computed(() => {
  // 步骤总数
  return props.steps.length
})
const currentStep = computed(() => {
  if (props.current < 1) {
    return 1
  } else if (props.current > totalSteps.value + 1) {
    return totalSteps.value + 1
  } else {
    return props.current
  }
})
// 若当前选中步骤超过总步骤数，则默认选择步骤1
const emits = defineEmits(['update:current', 'change'])
function onChange(index: number) {
  // 点击切换选择步骤
  if (currentStep.value !== index) {
    emits('update:current', index)
    emits('change', index)
  }
}
</script>
<template>
  <div
    class="m-steps"
    :class="{
      'steps-small': size === 'small',
      'steps-vertical': vertical,
      'steps-label-bottom': !vertical && (labelPlacement === 'bottom' || dotted),
      'steps-dotted': dotted
    }"
    :style="`width: ${totalWidth};`"
  >
    <div
      :class="[
        'm-steps-item',
        {
          'steps-finish': currentStep > index + 1,
          'steps-process': currentStep === index + 1,
          'steps-wait': currentStep < index + 1
        }
      ]"
      v-for="(step, index) in steps"
      :key="index"
    >
      <div tabindex="0" class="m-steps-info-wrap" @click="onChange(index + 1)">
        <div class="m-steps-tail"></div>
        <div class="m-steps-icon">
          <template v-if="!dotted">
            <span class="u-num" v-if="currentStep <= index + 1">{{ index + 1 }}</span>
            <svg class="u-icon" v-else viewBox="64 64 896 896" data-icon="check" aria-hidden="true" focusable="false">
              <path
                d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
              ></path>
            </svg>
          </template>
          <template v-else>
            <span class="u-dot"></span>
          </template>
        </div>
        <div class="m-steps-content">
          <div class="u-steps-title">{{ step.title }}</div>
          <div class="u-steps-description" v-show="step.description">{{ step.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-steps {
  display: flex;
  gap: 16px;
  transition: all 0.3s;
  &:not(.steps-label-bottom) {
    .m-steps-item .m-steps-info-wrap {
      .m-steps-tail {
        display: none;
      }
    }
  }
  .m-steps-item {
    position: relative;
    overflow: hidden;
    flex: 1; // 弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
    vertical-align: top;
    &:last-child {
      flex: none;
      .m-steps-info-wrap {
        .m-steps-content .u-steps-title {
          padding-right: 0;
          &::after {
            display: none;
          }
        }
        .m-steps-tail {
          display: none;
        }
      }
    }
    .m-steps-info-wrap {
      display: inline-block;
      vertical-align: top;
      outline: none;
      .m-steps-tail {
        height: 9px;
        position: absolute;
        top: 12px;
        inset-inline-start: 0;
        width: 100%;
        transition: all 0.3s;
        &::after {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 1px;
          background-color: rgba(5, 5, 5, 0.06);
          border-radius: 1px;
          transition: background-color 0.3s;
          content: '';
        }
      }
      .m-steps-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.06);
        border: 1px solid transparent;
        transition: all 0.3s;
        .u-num {
          display: inline-block;
          font-size: 16px;
          line-height: 1;
          color: rgba(0, 0, 0, 0.65);
          transition: all 0.3s;
        }
        .u-icon {
          display: inline-block;
          fill: @themeColor;
          width: 16px;
          height: 16px;
          transition: all 0.3s;
        }
        .u-dot {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transition: all 0.3s;
        }
      }
      .m-steps-content {
        display: inline-block;
        vertical-align: top;
        transition: all 0.3s;
        .u-steps-title {
          position: relative;
          display: inline-block;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          line-height: 32px;
          transition: all 0.3s;
          padding-right: 16px;
          &::after {
            background: #e8e8e8;
            position: absolute;
            top: 16px;
            left: 100%;
            display: block;
            width: 3000px;
            height: 1px;
            content: '';
            cursor: auto;
            transition: all 0.3s;
          }
        }
        .u-steps-description {
          max-width: 140px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
          word-break: break-all;
          transition: all 0.3s;
        }
      }
    }
  }
  .steps-finish {
    .m-steps-info-wrap {
      cursor: pointer;
      .m-steps-tail {
        &::after {
          background-color: @themeColor;
        }
      }
      .m-steps-icon {
        background-color: #e6f4ff;
        border-color: #e6f4ff;
        .u-dot {
          background: @themeColor;
        }
      }
      .m-steps-content {
        .u-steps-title {
          color: rgba(0, 0, 0, 0.88);
          &::after {
            background-color: @themeColor;
          }
        }
        .u-steps-description {
          color: rgba(0, 0, 0, 0.45);
        }
      }
      &:hover {
        .m-steps-icon {
          border-color: @themeColor;
        }
        .m-steps-content {
          .u-steps-title {
            color: @themeColor;
          }
          .u-steps-description {
            color: @themeColor;
          }
        }
      }
    }
  }
  .steps-process {
    .m-steps-info-wrap {
      .m-steps-icon {
        background-color: @themeColor;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-color: @themeColor;
        .u-num {
          color: #fff;
        }
        .u-dot {
          background: @themeColor;
        }
      }
      .m-steps-content {
        .u-steps-title {
          color: rgba(0, 0, 0, 0.88);
        }
        .u-steps-description {
          color: rgba(0, 0, 0, 0.88);
        }
      }
    }
  }
  .steps-wait {
    .m-steps-info-wrap {
      cursor: pointer;
      &:hover {
        .m-steps-icon {
          border-color: @themeColor;
          .u-num {
            color: @themeColor;
          }
        }
        .m-steps-content {
          .u-steps-title {
            color: @themeColor;
          }
          .u-steps-description {
            color: @themeColor;
          }
        }
      }
      .m-steps-icon {
        .u-dot {
          background: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
.steps-small {
  gap: 12px;
  .m-steps-item {
    .m-steps-info-wrap {
      .m-steps-icon {
        width: 24px;
        height: 24px;
        .u-num {
          font-size: 12px;
        }
        .u-icon {
          width: 12px;
          height: 12px;
        }
      }
      .m-steps-content {
        .u-steps-title {
          font-size: 14px;
          line-height: 24px;
          padding-right: 12px;
          &::after {
            top: 12px;
          }
        }
      }
    }
  }
}
.steps-label-bottom {
  gap: 0;
  .m-steps-item {
    overflow: visible;
    .m-steps-info-wrap {
      .m-steps-tail {
        margin-inline-start: 56px;
        padding: 4px 24px;
      }
      .m-steps-icon {
        margin-inline-start: 40px;
      }
      .m-steps-content {
        display: block;
        width: 112px;
        margin-top: 12px;
        text-align: center;
        .u-steps-title {
          padding-right: 0;
          &::after {
            display: none;
          }
        }
      }
    }
  }
}
.steps-dotted {
  .m-steps-item {
    overflow: visible;
    .m-steps-info-wrap {
      .m-steps-tail {
        height: 3px;
        top: 2.5px;
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
        margin-inline: 70px 0;
        padding: 0;
        &::after {
          width: calc(100% - 24px);
          height: 3px;
          margin-inline-start: 12px;
        }
      }
      .m-steps-icon {
        position: absolute;
        width: 8px;
        height: 8px;
        margin-inline-start: 66px;
        padding-inline-end: 0;
        line-height: 8px;
        background: transparent;
        border: 0;
        vertical-align: top;
      }
      .m-steps-content {
        width: 140px;
        margin-top: 20px;
        .u-steps-title {
          line-height: 1.5714285714285714;
        }
      }
    }
  }
  .steps-process {
    .m-steps-info-wrap .m-steps-icon {
      top: -1px;
      width: 10px;
      height: 10px;
      line-height: 10px;
      margin-inline-start: 65px;
    }
  }
}
.steps-vertical {
  display: inline-flex;
  flex-direction: column;
  gap: 0;
  .m-steps-item {
    flex: 1 0 auto;
    overflow: visible;
    &:last-child {
      flex: 1 0 auto;
    }
    &:not(:last-child) {
      .m-steps-info-wrap {
        .m-steps-tail {
          display: block;
        }
        .m-steps-content {
          .u-steps-title {
            &::after {
              display: none;
            }
          }
        }
      }
    }
    .m-steps-info-wrap {
      .m-steps-tail {
        top: 0;
        inset-inline-start: 15px;
        width: 1px;
        height: 100%;
        padding: 38px 0 6px;
        &::after {
          width: 1px;
          height: 100%;
        }
      }
      .m-steps-icon {
        float: left;
        margin-right: 16px;
      }
      .m-steps-content {
        display: block;
        min-height: 48px;
        overflow: hidden;
        .u-steps-title {
          line-height: 32px;
        }
        .u-steps-description {
          padding-bottom: 12px;
        }
      }
    }
  }
}
.steps-small.steps-vertical {
  .m-steps-item {
    .m-steps-info-wrap {
      .m-steps-tail {
        inset-inline-start: 11px;
        padding: 30px 0 6px;
      }
      .m-steps-content {
        .u-steps-title {
          line-height: 24px;
        }
      }
    }
  }
}
.steps-vertical.steps-dotted {
  .m-steps-item {
    .m-steps-info-wrap {
      .m-steps-tail {
        top: 12px;
        inset-inline-start: 0;
        margin: 0;
        padding: 16px 0 8px;
        &::after {
          margin-inline-start: 3.5px;
        }
      }
      .m-steps-icon {
        position: static;
        margin-top: 12px;
        margin-inline-start: 0;
        background: none;
      }
      .m-steps-content {
        width: inherit;
        margin: 0;
      }
    }
  }
  .steps-process {
    .m-steps-info-wrap {
      .m-steps-icon {
        position: relative;
        margin-top: 11px;
        top: 0;
        inset-inline-start: -1px;
      }
    }
  }
}
.steps-small.steps-vertical.steps-dotted {
  .m-steps-item {
    .m-steps-info-wrap {
      .m-steps-tail {
        top: 8px;
      }
      .m-steps-icon {
        margin-top: 8px;
      }
    }
  }
  .steps-process {
    .m-steps-info-wrap {
      .m-steps-icon {
        margin-top: 7px;
      }
    }
  }
}
</style>
