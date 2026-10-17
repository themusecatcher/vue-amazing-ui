<script setup lang="ts">
import { computed, h, ref, watch, watchEffect } from 'vue'
import type { CheckboxOption } from 'vue-amazing-ui'
// 基本使用
const checked = ref<boolean>(false)
// 受控：选中与禁用均由外部状态驱动
const controlled = ref<boolean>(false)
const controlledDisabled = ref<boolean>(false)
const controlledLabel = computed(
  () => `${controlled.value ? 'Checked' : 'Unchecked'}-${controlledDisabled.value ? 'Disabled' : 'Enabled'}`
)
const toggleControlled = () => {
  controlled.value = !controlled.value
}
const toggleControlledDisabled = () => {
  controlledDisabled.value = !controlledDisabled.value
}
// 全选：全选框的三态由子项已选数量推导
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const checkedList = ref<string[]>(['Apple', 'Orange'])
const checkAll = ref<boolean>(false)
const indeterminate = ref<boolean>(false)
watch(
  checkedList,
  (value) => {
    indeterminate.value = value.length > 0 && value.length < plainOptions.length
    checkAll.value = value.length === plainOptions.length
  },
  { immediate: true }
)
const onCheckAllChange = (value: boolean) => {
  checkedList.value = value ? [...plainOptions] : []
}
// 复选框组
const groupOptions: CheckboxOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const groupOptionsWithDisabled: CheckboxOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
]
// 选项名直接传入 VNode
const groupOptionsRedLabel: CheckboxOption[] = groupOptionsWithDisabled.map((option) => ({
  ...option,
  label: h('span', { style: 'color: red' }, option.label)
}))
const groupPlainValue = ref<string[]>([])
const groupSelectedValue = ref<string[]>(['Apple'])
const groupObjectValue = ref<string[]>(['Pear'])
const groupDisabledValue = ref<string[]>(['Apple'])
// 与栅格配合
const gridItems = ['A', 'B', 'C', 'D', 'E']
const gridValue = ref<string[]>([])
// 禁用
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
// 选项列表 / 禁用选项 / 垂直排列 / 自定义选项名
const options = ref<CheckboxOption[]>([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const optionsDisabled = ref<CheckboxOption[]>([
  {
    label: '北京市',
    value: 1
  },
  {
    label: '纽约市',
    value: 2,
    disabled: true
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3
  },
  {
    label: '伊斯坦布尔',
    value: 4
  },
  {
    label: '拜占庭',
    value: 5
  },
  {
    label: '君士坦丁堡',
    value: 6
  }
])
const vnodeOptions: CheckboxOption[] = [
  { label: '北京市', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '纽约市'), value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 }
]
const selectedOptions = ref<(string | number)[]>([2])
const vnodeValue = ref<(string | number)[]>([2])
const groupValue = ref<(string | number)[]>([1])
const groupVerticalValue = ref<(string | number)[]>([1, 2])
const horizontalGap = ref(16)
const verticalGap = ref(8)
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
// 聚焦方法：聚焦状态经根元素的 focusin / focusout（会冒泡）同步
const focusChecked = ref<boolean>(false)
const focusFocused = ref<boolean>(false)
const focusCheckboxRef = ref<{ focus: () => void; blur: () => void } | null>(null)
watchEffect(() => {
  console.log('checked', checked.value)
})
watchEffect(() => {
  console.log('selectedOptions', selectedOptions.value)
})
const onChange = (value: boolean | (string | number)[]) => {
  console.log('change', value)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Checkbox v-model:checked="checked" @change="onChange">Checkbox</Checkbox>
    <p class="mb10 mt10">受控：选中与禁用均由外部状态驱动</p>
    <Flex class="mb20" gap="small">
      <Button type="primary" size="small" @click="toggleControlled">{{ controlled ? 'Uncheck' : 'Check' }}</Button>
      <Button type="primary" size="small" @click="toggleControlledDisabled">
        {{ controlledDisabled ? 'Enable' : 'Disable' }}
      </Button>
    </Flex>
    <Checkbox v-model:checked="controlled" :disabled="controlledDisabled">{{ controlledLabel }}</Checkbox>
    <h2 class="mt30 mb10">全选</h2>
    <p class="mb10">在实现全选效果时，你可能会用到 <code>indeterminate</code> 属性</p>
    <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll" @change="onCheckAllChange">Check all</Checkbox>
    <CheckboxGroup v-model:value="checkedList" :options="plainOptions" />
    <h2 class="mt30 mb10">复选框组</h2>
    <p class="mb10">
      选中值由 <code>CheckboxGroup</code> 统一维护，组内 <code>Checkbox</code> 以 <code>value</code> 标识自身
    </p>
    <Space vertical>
      <CheckboxGroup v-model:value="groupPlainValue" :options="plainOptions" name="checkboxgroup" />
      <CheckboxGroup v-model:value="groupSelectedValue" :options="plainOptions" />
      <CheckboxGroup v-model:value="groupObjectValue" :options="groupOptions" />
      <CheckboxGroup v-model:value="groupDisabledValue" :options="groupOptionsRedLabel" disabled />
    </Space>
    <h2 class="mt30 mb10">与栅格配合</h2>
    <p class="mb10"> <code>CheckboxGroup</code> 内嵌 <code>Checkbox</code> 并与栅格组件一起使用，可以实现灵活的布局 </p>
    <CheckboxGroup v-model:value="gridValue" style="width: 100%">
      <Row>
        <Col v-for="item in gridItems" :key="item" :span="8">
          <Checkbox :value="item">{{ item }}</Checkbox>
        </Col>
      </Row>
    </CheckboxGroup>
    <h2 class="mt30 mb10">禁用</h2>
    <Flex class="mb20" gap="small">
      <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
    </Flex>
    <Space vertical>
      <Checkbox v-model:checked="disabledChecked" :disabled="disabled">Disabled</Checkbox>
      <Checkbox v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Checkbox>
    </Space>
    <p class="mb10 mt10">配置式写法</p>
    <Space vertical>
      <Checkbox :options="options" v-model:value="selectedOptions" disabled />
      <CheckboxGroup v-model:value="groupValue" :options="groupOptions" disabled />
    </Space>
    <h2 class="mt30 mb10">禁用选项</h2>
    <Space vertical>
      <Checkbox :options="optionsDisabled" v-model:value="selectedOptions" />
      <CheckboxGroup v-model:value="groupValue" :options="groupOptionsWithDisabled" />
    </Space>
    <h2 class="mt30 mb10">选项列表</h2>
    <p class="mb10">单组件传入 <code>options</code>，选中值为数组，配合 <code>v-model:value</code> 使用</p>
    <Checkbox :options="options" v-model:value="selectedOptions" @change="onChange" />
    <h2 class="mt30 mb10">垂直排列</h2>
    <Space vertical>
      <Checkbox :options="options" vertical v-model:value="selectedOptions" />
      <CheckboxGroup v-model:value="groupVerticalValue" vertical>
        <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
      </CheckboxGroup>
    </Space>
    <h2 class="mt30 mb10">自定义选项名</h2>
    <Space vertical>
      <Checkbox :options="options" v-model:value="selectedOptions">
        <template #default="{ option, label, index }">
          <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
          <span v-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
        </template>
      </Checkbox>
      <CheckboxGroup v-model:value="groupValue">
        <Checkbox :value="1">北京市</Checkbox>
        <Checkbox :value="2"><span style="color: #ff6900">纽约市</span></Checkbox>
        <Checkbox :value="3">布宜诺斯艾利斯</Checkbox>
        <Checkbox :value="4"><span style="color: #1677ff">伊斯坦布尔</span></Checkbox>
      </CheckboxGroup>
    </Space>
    <p class="mb10 mt10">选项名直接传入 VNode</p>
    <Space vertical>
      <Checkbox :options="vnodeOptions" v-model:value="vnodeValue" />
      <CheckboxGroup v-model:value="vnodeValue" :options="vnodeOptions" />
    </Space>
    <h2 class="mt30 mb10">自定义间距</h2>
    <p class="mb10">
      单组件 <code>gap</code> 传数组时为「水平间距, 垂直间距」；垂直间距仅在水平方向放不下、选项换行时才生效
    </p>
    <Flex :gap="24" class="mb20">
      <Flex gap="small" vertical style="flex: 1">
        <span>horizontal gap: {{ horizontalGap }}px</span>
        <Slider v-model:value="horizontalGap" />
      </Flex>
      <Flex gap="small" vertical style="flex: 1">
        <span>vertical gap: {{ verticalGap }}px</span>
        <Slider v-model:value="verticalGap" />
      </Flex>
    </Flex>
    <Checkbox :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="selectedOptions" />
    <h2 class="mt30 mb10">单选组间距</h2>
    <p class="mb10">
      单选组 <code>gap</code> 传数字为统一间距；开关切换水平 / 垂直布局，垂直布局时 <code>gap</code> 即行间距
    </p>
    <Flex :gap="24" class="mb20">
      <Flex gap="small" vertical style="flex: 1">
        <span>group gap: {{ groupGap }}px</span>
        <Slider v-model:value="groupGap" />
      </Flex>
      <Flex gap="small" vertical align="flex-start" style="flex: 1">
        <span>vertical layout</span>
        <Switch v-model:value="groupVertical" />
      </Flex>
    </Flex>
    <CheckboxGroup v-model:value="groupVerticalValue" :gap="groupGap" :vertical="groupVertical">
      <Checkbox v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Checkbox>
    </CheckboxGroup>
    <h2 class="mt30 mb10">聚焦方法</h2>
    <p class="mb10">
      组件暴露 <code>focus</code> / <code>blur</code> 方法，可聚焦或失焦原生 <code>input</code>；调用
      <code>focus</code> 时同样显示焦点环
    </p>
    <Space>
      <Checkbox
        ref="focusCheckboxRef"
        v-model:checked="focusChecked"
        @focusin="focusFocused = true"
        @focusout="focusFocused = false"
      >
        Checkbox
      </Checkbox>
      <Button @click="focusCheckboxRef?.focus()">focus</Button>
      <Button @click="focusCheckboxRef?.blur()">blur</Button>
      <span>{{ focusFocused ? '已聚焦' : '未聚焦' }}</span>
    </Space>
  </div>
</template>
