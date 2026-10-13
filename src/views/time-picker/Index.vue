<script setup lang="ts">
import { ref } from 'vue'
import { set } from 'date-fns'
import { SmileOutlined } from '@ant-design/icons-vue'
/** 用例初始值：当日指定时刻的时间戳（毫秒） */
function initialTime(hour: number, minute: number = 0, second: number = 0): number {
  return set(new Date(), { hours: hour, minutes: minute, seconds: second, milliseconds: 0 }).getTime()
}
/** 「不响应变更」一行：固定时刻快照，已选时间不随面板选择而变 */
const fixedSnapshot = new Date()
// 各用例独立持有一组值，避免在一个用例里选时间影响到其它用例；
// 初始值按用例特征给：靠已选文本表达用例的给值（基本 / 禁用 / 选择时分 / 三种大小），只演示形态与浮层行为的留空
const basicValue = ref<number | null>(initialTime(8))
const basicFixedTextValue = ref<string | null>('09:00:00')
const addonValue = ref<number | null>(null)
const addonValue2 = ref<number | null>(null)
const addonOpen = ref(false)
const addonOpen2 = ref(false)
// 12 小时制用例：三只各带同一个已选值（09:05:03），「补零 / 不补零 / 只到分」三种 format 的差异因此直接可见
const h12Value = ref<number | null>(initialTime(9, 5, 3))
const h12FormatValue = ref<number | null>(initialTime(9, 5, 3))
const h12ShortValue = ref<number | null>(initialTime(9, 5, 3))
const disabledValue = ref<number | null>(initialTime(12, 8, 23))
const hourMinuteValue = ref<number | null>(initialTime(12, 8))
const intervalValue = ref<number | null>(null)
const sizeValue = ref<number | null>(initialTime(12, 8, 23))
const suffixValue = ref<number | null>(null)
const controlledValue = ref<number | null>(null)
const fixedValue = ref<number | null>(fixedSnapshot.getTime())
const rangePickerValue = ref<[number | null, number | null] | null>(null)
const borderedValue = ref<number | null>(null)
const borderedRangeValue = ref<[number | null, number | null] | null>(null)
const errorValue = ref<number | null>(null)
const warningValue = ref<number | null>(null)
const errorRangeValue = ref<[number | null, number | null] | null>(null)
const warningRangeValue = ref<[number | null, number | null] | null>(null)
const placementBottomLeftValue = ref<number | null>(null)
const placementBottomRightValue = ref<number | null>(null)
const placementTopLeftValue = ref<number | null>(null)
const placementTopRightValue = ref<number | null>(null)
const placementRangeBottomLeftValue = ref<[number | null, number | null] | null>(null)
const placementRangeTopLeftValue = ref<[number | null, number | null] | null>(null)
/** 步长用例的间隔：分钟 15、秒 10 */
const intervalMinuteStep = 15
const intervalSecondStep = 10
/** 范围用例的两段提示文字 */
const rangePlaceholder: [string, string] = ['开始时间', '结束时间']
/** 附加内容用例：页脚按钮关闭浮层 */
function closeAddonPanel() {
  addonOpen.value = false
  addonOpen2.value = false
}
/** 附加内容用例：第一只额外接收 `openChange`，第二只不接收，两只形成「是否接收回调」的差异 */
function onAddonOpenChange(open: boolean) {
  console.log('openChange', open)
}
/** 受控组件用例：`value` 与 `change` 配合使用时由使用方回写（该用例为单选形态，范围形态的元组不回写） */
function onControlledChange(
  value: number | [number | null, number | null] | null,
  formattedValue: string | [string | null, string | null] | null
): void {
  console.log('onChange', value, formattedValue)
  controlledValue.value = typeof value === 'number' ? value : null
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">点击 <code>TimePicker</code> 后可在浮层中选择或输入某一时间</p>
    <Space vertical>
      <p class="mb10"><code>v-model:value</code>：绑定毫秒时间戳</p>
      <TimePicker v-model:value="basicValue" placeholder="请选择时间" />
      <p class="mb10"><code>v-model:formatted-value</code>：绑定字符串，格式由 <code>value-format</code> 决定</p>
      <TimePicker v-model:formatted-value="basicFixedTextValue" value-format="HH:mm:ss" placeholder="请选择时间" />
    </Space>
    <h2 class="mt30 mb10">附加内容</h2>
    <p class="mb10">在 <code>TimePicker</code> 选择框底部显示自定义的内容</p>
    <Space vertical>
      <p class="mb10">绑定 <code>v-model:open</code> 并接收 <code>openChange</code></p>
      <TimePicker
        v-model:value="addonValue"
        v-model:open="addonOpen"
        placeholder="请选择时间"
        @open-change="onAddonOpenChange"
      >
        <template #renderExtraFooter>
          <Button size="small" type="primary" @click="closeAddonPanel">OK</Button>
        </template>
      </TimePicker>
      <p class="mb10">只绑定 <code>v-model:open</code>（不接收 <code>openChange</code>）</p>
      <TimePicker v-model:value="addonValue2" v-model:open="addonOpen2" placeholder="请选择时间">
        <template #renderExtraFooter>
          <Button size="small" type="primary" @click="closeAddonPanel">OK</Button>
        </template>
      </TimePicker>
    </Space>
    <h2 class="mt30 mb10">12 小时制</h2>
    <p class="mb10"><code>use12Hours</code> 启用 12 小时制，默认的 <code>format</code> 为 <code>hh:mm:ss a</code></p>
    <Space vertical>
      <p class="mb10">默认 <code>format</code>（<code>hh:mm:ss a</code>）：小时补零</p>
      <TimePicker v-model:value="h12Value" use12-hours placeholder="请选择时间" />
      <p class="mb10">显式 <code>format="h:mm:ss a"</code>：小时不补零</p>
      <TimePicker v-model:value="h12FormatValue" use12-hours format="h:mm:ss a" placeholder="请选择时间" />
      <p class="mb10">显式 <code>format="h:mm a"</code>：只到分（面板只有时 / 分两列）</p>
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
    <h2 class="mt30 mb10">后缀图标</h2>
    <p class="mb10">通过 <code>suffixIcon</code> 插槽自定义选择框后缀图标</p>
    <TimePicker v-model:value="suffixValue" placeholder="请选择时间">
      <template #suffixIcon>
        <SmileOutlined />
      </template>
    </TimePicker>
    <h2 class="mt30 mb10">受控组件</h2>
    <p class="mb10"><code>value</code> 和 <code>@change</code> 需要配合使用，也可以直接使用 <code>v-model</code></p>
    <Space vertical>
      <p class="mb10">use value and @change</p>
      <TimePicker :value="controlledValue" placeholder="请选择时间" @change="onControlledChange" />
      <p class="mb10">v-model</p>
      <TimePicker v-model:value="controlledValue" placeholder="请选择时间" />
      <p class="mb10">Do not change</p>
      <TimePicker :value="fixedValue" placeholder="请选择时间" />
    </Space>
    <h2 class="mt30 mb10">范围选择器</h2>
    <p class="mb10"><code>type</code> 为 <code>timerange</code> 时使用时间范围选择器</p>
    <TimePicker v-model:value="rangePickerValue" type="timerange" :placeholder="rangePlaceholder" />
    <h2 class="mt30 mb10">无边框</h2>
    <Space vertical>
      <TimePicker v-model:value="borderedValue" :bordered="false" placeholder="请选择时间" />
      <TimePicker
        v-model:value="borderedRangeValue"
        type="timerange"
        :bordered="false"
        :placeholder="rangePlaceholder"
      />
    </Space>
    <h2 class="mt30 mb10">自定义状态</h2>
    <p class="mb10">使用 <code>status</code> 添加校验状态，可选 <code>error</code> 与 <code>warning</code></p>
    <Space vertical>
      <TimePicker v-model:value="errorValue" status="error" placeholder="请选择时间" />
      <TimePicker v-model:value="warningValue" status="warning" placeholder="请选择时间" />
      <TimePicker v-model:value="errorRangeValue" type="timerange" status="error" :placeholder="rangePlaceholder" />
      <TimePicker v-model:value="warningRangeValue" type="timerange" status="warning" :placeholder="rangePlaceholder" />
    </Space>
    <h2 class="mt30 mb10">弹出位置</h2>
    <p class="mb10">通过 <code>placement</code> 手动指定弹出的位置</p>
    <Space vertical>
      <TimePicker v-model:value="placementBottomLeftValue" placement="bottomLeft" placeholder="左下" />
      <TimePicker v-model:value="placementBottomRightValue" placement="bottomRight" placeholder="右下" />
      <TimePicker v-model:value="placementTopLeftValue" placement="topLeft" placeholder="左上" />
      <TimePicker v-model:value="placementTopRightValue" placement="topRight" placeholder="右上" />
      <TimePicker
        v-model:value="placementRangeBottomLeftValue"
        type="timerange"
        placement="bottomLeft"
        :placeholder="rangePlaceholder"
      />
      <TimePicker
        v-model:value="placementRangeTopLeftValue"
        type="timerange"
        placement="topLeft"
        :placeholder="rangePlaceholder"
      />
    </Space>
  </div>
</template>
