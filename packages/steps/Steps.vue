<script setup lang="ts">
import { computed } from 'vue'
interface Step {
  title?: string // 标题
  description?: string // 描述
}
interface Props {
  steps: Step[] // 步骤数组
  current?: number // 当前选中的步骤（v-model），设置 v-model 后，Steps 变为可点击状态。从1开始计数
  width?: number|string // 步骤条总宽度
  descMaxWidth?: number // 描述文本最大宽度
}
const props = withDefaults(defineProps<Props>(), {
  steps: () => [],
  current: 1,
  width: '100%',
  descMaxWidth: 120
})
const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const totalSteps = computed(() => { // 步骤总数
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
function onChange (index: number) { // 点击切换选择步骤
  if (currentStep.value !== index) {
    emits('update:current', index)
    emits('change', index)
  }
}
</script>
<template>
  <div class="m-steps-area" :style="`width: ${totalWidth};`">
    <div class="m-steps">
      <div :class="['m-steps-item',
          {
            'finish': currentStep > index + 1,
            'process': currentStep === index + 1,
            'wait': currentStep < index + 1
          }
        ]"
        v-for="(step, index) in steps" :key="index">
        <div class="m-info-wrap" @click="onChange(index + 1)">
          <div class="m-steps-icon">
            <span class="u-num" v-if="currentStep<=index + 1">{{ index + 1 }}</span>
            <svg class="u-icon" v-else viewBox="64 64 896 896" data-icon="check" aria-hidden="true" focusable="false"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg>
          </div>
          <div class="m-steps-content">
            <div class="u-steps-title">{{ step.title }}</div>
            <div class="u-steps-description" v-show="step.description" :style="`max-width: ${descMaxWidth}px;`">{{ step.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-steps-area {
  margin: 0px auto;
  .m-steps {
    display: flex;
    .m-steps-item {
      display: inline-block;
      overflow: hidden;
      font-size: 16px;
      &:not(:last-child) {
        margin-right: 16px;
        flex: 1; // 弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
        .u-steps-title {
          &::after {
            background: #e8e8e8;
            position: absolute;
            top: 16px;
            left: 100%;
            display: block;
            width: 3000px;
            height: 1px;
            content: "";
            cursor: auto;
            transition: all .3s;
          }
        }
      }
      .m-info-wrap {
        display: inline-block;
        .m-steps-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          text-align: center;
          background: #fff;
          border: 1px solid rgba(0,0,0,.25);
          transition: all .3s;
          .u-num {
            display: inline-block;
            font-size: 16px;
            line-height: 1;
            color: rgba(0, 0, 0, .25);
            transition: all .3s;
          }
          .u-icon {
            display: inline-block;
            fill: @themeColor;
            width: 16px;
            height: 16px;
          }
        }
        .m-steps-content {
          display: inline-block;
          vertical-align: top;
          .u-steps-title {
            position: relative;
            display: inline-block;
            padding-right: 16px;
            color: rgba(0,0,0,.45);
            line-height: 32px;
            transition: all .3s;
          }
          .u-steps-description {
            font-size: 14px;
            color: rgba(0,0,0,.45);
            line-height: 22px;
            word-wrap: break-word;
            transition: all .3s;
          }
        }
      }
    }
    .finish {
      .m-info-wrap {
        cursor: pointer;
        .m-steps-icon {
          background: #fff;
          border: 1px solid rgba(0,0,0,.25);
          border-color: @themeColor;
        }
        .m-steps-content {
          .u-steps-title {
            color: rgba(0, 0, 0, .85);;
            &::after {
              background: @themeColor;
            }
          }
          .u-steps-description {
            color: rgba(0,0,0,.45);
          }
        }
        &:hover {
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
    .process {
      .m-info-wrap {
        .m-steps-icon {
          background: @themeColor;
          border: 1px solid rgba(0,0,0,.25);
          border-color: @themeColor;
          .u-num {
            color: #fff;
          }
        }
        .m-steps-content {
          .u-steps-title {
            font-weight: 500;
            color: rgba(0, 0, 0, .85);;
          }
          .u-steps-description {
            color: rgba(0, 0, 0, .85);;
          }
        }
      }
    }
    .wait {
      .m-info-wrap {
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
      }
    }
  }
}
</style>
