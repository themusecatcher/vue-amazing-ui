<script setup lang="ts">
import { ref } from 'vue'
import { set } from 'date-fns'
/** 用例初始值：当日指定时刻的时间戳（毫秒） */
function initialTime(hour: number, minute: number = 0, second: number = 0): number {
  return set(new Date(), { hours: hour, minutes: minute, seconds: second, milliseconds: 0 }).getTime()
}
// 各用例独立持有一组值，避免在一个用例里选时间影响到其它用例；
// 初始值按用例特征给：靠已选文本表达用例的给值（基本 / 禁用 / 选择时分 / 三种大小），只演示形态与浮层行为的留空
const basicValue = ref<number | null>(initialTime(8))
const basicFixedTextValue = ref<string | null>('09:00:00')
const h12Value = ref<number | null>(null)
const h12FormatValue = ref<number | null>(null)
const h12ShortValue = ref<number | null>(null)
const disabledValue = ref<number | null>(initialTime(12, 8, 23))
const hourMinuteValue = ref<number | null>(initialTime(12, 8))
const intervalValue = ref<number | null>(null)
const sizeValue = ref<number | null>(initialTime(12, 8, 23))
const borderedValue = ref<number | null>(null)
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
const placementBottomLeftValue = ref<number | null>(null)
const placementBottomRightValue = ref<number | null>(null)
const placementTopLeftValue = ref<number | null>(null)
const placementTopRightValue = ref<number | null>(null)
/** 步长用例的间隔：分钟 15、秒 10 */
const intervalMinuteStep = 15
const intervalSecondStep = 10
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">点击 <code>TimePicker</code> 后可在浮层中选择或输入某一时间</p>
    <Space vertical>
      <TimePicker v-model:value="basicValue" placeholder="请选择时间" />
      <TimePicker v-model:formatted-value="basicFixedTextValue" value-format="HH:mm:ss" placeholder="请选择时间" />
    </Space>
    <h2 class="mt30 mb10">12 小时制</h2>
    <p class="mb10"> <code>use12Hours</code> 启用 12 小时制，默认的 <code>format</code> 为 <code>hh:mm:ss a</code> </p>
    <Space vertical>
      <TimePicker v-model:value="h12Value" use12-hours placeholder="请选择时间" />
      <TimePicker v-model:value="h12FormatValue" use12-hours format="h:mm:ss a" placeholder="请选择时间" />
      <TimePicker v-model:value="h12ShortValue" use12-hours format="h:mm a" placeholder="请选择时间" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <TimePicker v-model:value="disabledValue" disabled placeholder="请选择时间" />
    <h2 class="mt30 mb10">选择时分</h2>
    <p class="mb10">浮层中的列随 <code>format</code> 变化，略去其中某一部分时对应的列随之消失</p>
    <TimePicker v-model:value="hourMinuteValue" format="HH:mm" placeholder="请选择时间" />
    <h2 class="mt30 mb10">步长选项</h2>
    <p class="mb10">
      使用 <code>hourStep</code> <code>minuteStep</code> <code>secondStep</code> 按步长展示可选的时分秒
    </p>
    <TimePicker
      v-model:value="intervalValue"
      :minute-step="intervalMinuteStep"
      :second-step="intervalSecondStep"
      placeholder="请选择时间"
    />
    <h2 class="mt30 mb10">三种大小</h2>
    <p class="mb10">三种大小的输入框，大的用在表单中，中的为默认</p>
    <Space vertical>
      <TimePicker v-model:value="sizeValue" size="large" placeholder="请选择时间" />
      <TimePicker v-model:value="sizeValue" placeholder="请选择时间" />
      <TimePicker v-model:value="sizeValue" size="small" placeholder="请选择时间" />
    </Space>
    <h2 class="mt30 mb10">无边框</h2>
    <TimePicker v-model:value="borderedValue" :bordered="false" placeholder="请选择时间" />
    <h2 class="mt30 mb10">自定义状态</h2>
    <p class="mb10">使用 <code>status</code> 添加校验状态，可选 <code>error</code> 与 <code>warning</code></p>
    <Space vertical>
      <TimePicker v-model:value="errorValue" status="error" placeholder="请选择时间" />
      <TimePicker v-model:value="warningValue" status="warning" placeholder="请选择时间" />
    </Space>
    <h2 class="mt30 mb10">弹出位置</h2>
    <p class="mb10">通过 <code>placement</code> 手动指定弹出的位置</p>
    <Space vertical>
      <TimePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
      <TimePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
      <TimePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
      <TimePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
    </Space>
  </div>
</template>
