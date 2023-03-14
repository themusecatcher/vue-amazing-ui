<script setup lang="ts">
defineProps({ // 运行时声明
  title: { // 标题描述
    type: String,
    default: 'Do you Want to delete these items ?'
  },
  content: { // 内容描述
    type: String,
    default: 'Some descriptions'
  },
  width: { // 提示窗口宽度
    type: Number,
    default: 420,
  },
  cancelText: { // 取消按钮文字
    type: String,
    default: '取消'
  },
  okText: { // 确认按钮文字
    type: String,
    default: '确定'
  },
  noticeText: { // 通知按钮文字
    type: String,
    default: '知道了'
  },
  mode: { // 确认对话框：confirm  信息提示框：info
    type: String,
    default: 'confirm'
  },
  type: { // confirm mode: 'confirm', 'delete'   info mode: 'info', 'success', 'error', 'warning'
    type: String,
    default: 'confirm'
  },
  center: { // 水平垂直居中：true  固定高度水平居中：false
    type: Boolean,
    default: true
  },
  loading: { // 加载中...
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['cancel', 'ok'])
function onBlur () {
  emits('cancel')
}
function onCancel () {
  emits('cancel')
}
function onConfirm () {
  emits('ok')
}
</script>
<template>
  <div class="m-modal-mask" @click.self="onBlur">
    <div :class="['m-modal', center ? 'relative-hv-center' : 'top-center']" :style="`width: ${width}px;`">
      <div class="m-modal-content">
        <div class="m-spin-dot" v-show="loading">
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
        </div>
        <div :class="['m-modal-body', {'loading':loading}]">
          <div class="m-body">
            <div class="m-title">
              <template v-if="mode==='confirm'">
                <span class="u-icon question">?</span>
              </template>
              <template v-if="mode==='info'">
                <span class="u-icon info" v-if="type==='info'">!</span>
                <span class="u-icon success" v-if="type==='success'">✓</span>
                <span class="u-icon error" v-if="type==='error'">×</span>
                <span class="u-icon warning" v-if="type==='warning'">!</span>
              </template>
              <div class="u-title">{{ title }}</div>
            </div>
            <div class="u-content">{{ content }}</div>
          </div>
          <div class="m-btns">
            <template v-if="mode==='confirm'">
              <button class="u-cancel" @click="onCancel">{{ cancelText }}</button>
              <button class="u-confirm primary" @click="onConfirm" v-if="type==='confirm'">{{ okText }}</button>
              <button class="u-confirm delete" @click="onConfirm" v-if="type==='delete'">{{ okText }}</button>
            </template>
            <template v-if="mode==='info'">
              <button class="u-confirm primary" @click="onConfirm">{{ noticeText }}</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.flex-hv-center { // 水平垂直居中方法①：弹性布局，随内容增大高度，并自适应水平垂直居中
  display: flex;
  justify-content: center;
  align-items: center;
}
.relative-hv-center { // 水平垂直居中方法②：相对定位，随内容增大高度，并自适应水平垂直居中
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.top-center { // 相对定位，固定高度，始终距离视图顶端100px
  position: relative;
  top: 100px;
}
.m-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  background: rgba(0,0,0,0.45);
  .m-modal {
    width: 420px;
    margin: 0 auto;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    line-height: 1.5;
    .m-modal-content {
      position: relative;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,.1);
      .m-spin-dot { // 绝对定位，并设置水平垂直居中
        position: absolute;
        display: inline-block;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg); /* Internet Explorer */
        -moz-transform: rotate(45deg); /* Firefox */
        -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
        -o-transform: rotate(45deg); /* Opera */
        animation: rotate 1.2s linear infinite;
        -webkit-animation: rotate 1.2s linear infinite;
        @keyframes rotate {
          100% {transform: rotate(405deg);}
        }
        .u-dot-item { // 单个圆点样式
          position: absolute;
          width: 8px;
          height: 8px;
          background: #1890ff;
          border-radius: 50%;
          opacity: .3;
          animation: spinMove 1s linear infinite alternate;
          -webkit-animation: spinMove 1s linear infinite alternate;
          @keyframes spinMove {
            100% {opacity: 1;}
          }
        }
        .u-dot-item:first-child {
          top: 0;
          left: 0;
        }
        .u-dot-item:nth-child(2) {
          top: 0;
          right: 0;
          animation-delay: .4s;
          -webkit-animation-delay: .4s;
        }
        .u-dot-item:nth-child(3) {
          bottom: 0;
          right: 0;
          animation-delay: .8s;
          -webkit-animation-delay: .8s;
        }
        .u-dot-item:last-child {
          bottom: 0;
          left: 0;
          animation-delay: 1.2s;
          -webkit-animation-delay: 1.2s;
        }
      }
      .loading { // 加载过程背景虚化
        opacity: 0.4;
        background: #e8e8e8;
        pointer-events: none; // 屏蔽鼠标事件
      }
      .m-modal-body {
        padding: 32px 32px 24px;
        word-wrap: break-word;
        .m-body {
          .m-title {
            width: 100%;
            display: -webKit-box;
            display: -webKit-inline-box;
            .u-icon {
              margin-right: 16px;
              width: 20px;
              height: 20px;
              font-size: 16px;
              font-weight: bold;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .question {
              color: #faad14;
              border: 2px solid #faad14;
            }
            .info {
              color: #1890ff;
              border: 2px solid #1890ff;
            }
            .success {
              color: #52c41a;
              border: 2px solid #52c41a;
            }
            .error {
              color: #f5222d;
              border: 2px solid #f5222d;
            }
            .warning {
              color: #faad14;
              border: 2px solid #faad14;
            }
            .u-title {
              font-size: 16px;
              font-weight: 500;
              color: rgba(0,0,0,.85);
              line-height: 24px;
              width: calc(100% - 40px);
            }
          }
          .u-content {
            margin-left: 40px;
            margin-top: 8px;
            color: rgba(0,0,0,.65);
            font-size: 14px;
          }
        }
        .m-btns {
          margin-top: 24px;
          text-align: right;
          .u-cancel {
            height: 32px;
            line-height: 32px;
            padding: 0 15px;
            font-size: 14px;
            border-radius: 4px;
            color: rgba(0,0,0,.65);
            background: #fff;
            border: 1px solid #d9d9d9;
            cursor: pointer;
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            &:hover {
              color: #40a9ff;
              border-color: #40a9ff;
            }
            &:focus {
              color: #096dd9;
              border-color: #096dd9;
            }
          }
          .u-confirm {
            margin-left: 8px;
            height: 32px;
            line-height: 32px;
            padding: 0 15px;
            font-size: 14px;
            border-radius: 4px;
            color: #fff;
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            cursor: pointer;
          }
          .primary {
            background: #1890ff;
            border: 1px solid #1890ff;
            &:hover {
              background: #40a9ff;
              border-color: #40a9ff;
            }
            &:focus {
              background: #096dd9;
              border-color: #096dd9;
            }
          }
          .delete {
            background: #ff4d4f;
            border: 1px solid #ff4d4f;
            &:hover {
              background-color: #ff7875;
              border-color: #ff7875;
            }
            &:focus {
              background-color: #d9363e;
              border-color: #d9363e;
            }
          }
        }
      }
    }
  }
}
</style>

