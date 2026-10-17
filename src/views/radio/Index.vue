<script setup lang="ts">
import { h, reactive, ref, watchEffect } from 'vue'
import type { Radio, RadioOption, RadioProps, RadioGroupOption } from 'vue-amazing-ui'
// 基本使用 / 单选组合
const groupItems = [
  { value: 1, label: 'A' },
  { value: 2, label: 'B' },
  { value: 3, label: 'C' },
  { value: 4, label: 'D' }
]
// 表单字段名
const nameItems = [
  { value: '1', label: 'A' },
  { value: '2', label: 'B' },
  { value: '3', label: 'C' },
  { value: '4', label: 'D' }
]
const nameValue = ref<string>('1')
// 聚焦方法：聚焦状态经根元素的 focusin / focusout（会冒泡）同步
const focusChecked = ref<boolean>(false)
const focusFocused = ref<boolean>(false)
const focusRadioRef = ref<InstanceType<typeof Radio> | null>(null)
// 选项列表：组的全部呈现形态
const plainOptions: string[] = ['Apple', 'Pear', 'Orange']
const optionsWithDisabled: RadioGroupOption[] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true }
]
const optionCases: {
  key: string
  options: (string | RadioGroupOption)[]
  optionType: 'default' | 'button'
  disabled: boolean
}[] = [
  { key: 'plain', options: plainOptions, optionType: 'default', disabled: false },
  { key: 'option-disabled', options: optionsWithDisabled, optionType: 'default', disabled: false },
  { key: 'group-disabled', options: plainOptions, optionType: 'default', disabled: true },
  { key: 'button', options: plainOptions, optionType: 'button', disabled: false },
  { key: 'button-option-disabled', options: optionsWithDisabled, optionType: 'button', disabled: false },
  { key: 'button-group-disabled', options: plainOptions, optionType: 'button', disabled: true }
]
// 按钮样式 / 填底的按钮样式
const buttonItems = [
  { value: 'a', label: 'Hangzhou' },
  { value: 'b', label: 'Shanghai' },
  { value: 'c', label: 'Beijing' },
  { value: 'd', label: 'Chengdu' }
]
const buttonCases = [
  { key: 'outline', value: 'a', groupDisabled: false, disabledValue: '' },
  { key: 'outline-item-disabled', value: 'a', groupDisabled: false, disabledValue: 'b' },
  { key: 'outline-group-disabled', value: 'a', groupDisabled: true, disabledValue: '' }
]
const solidCases = [
  { key: 'solid', value: 'a', groupDisabled: false, disabledValue: '' },
  { key: 'solid-item-disabled', value: 'c', groupDisabled: false, disabledValue: 'b' }
]
// 按钮大小
const sizeCases: { key: string; size: RadioProps['size'] }[] = [
  { key: 'large', size: 'large' },
  { key: 'middle', size: 'middle' },
  { key: 'small', size: 'small' }
]
// 单选组垂直排列：行高 = 输入框高度（32px），控件高于行盒时会从行底部溢出，故定高直接取控件高度；
// 居中对齐可避免输入框出现 / 消失改变所在行的行盒基线、带动整行内容位移
const verticalStyle: Record<string, string> = {
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  lineHeight: '30px'
}
const verticalItems = [
  { value: 1, label: 'Option A' },
  { value: 2, label: 'Option B' },
  { value: 3, label: 'Option C' },
  { value: 4, label: 'More...' }
]
// 各用例的初始选中值，按用例 key 归组
const initialValues: Record<string, string | number> = {
  plain: 'Apple',
  'option-disabled': 'Apple',
  'group-disabled': 'Apple',
  button: 'Apple',
  'button-option-disabled': 'Apple',
  'button-group-disabled': 'Apple',
  outline: 'a',
  'outline-item-disabled': 'a',
  'outline-group-disabled': 'a',
  solid: 'a',
  'solid-item-disabled': 'c',
  large: 'a',
  middle: 'a',
  small: 'a'
}
const groupValues = reactive<Record<string, string | number>>({ ...initialValues })
const checked = ref<boolean>(false)
const disabledChecked = ref<boolean>(true)
const disabledUnchecked = ref<boolean>(false)
const groupValue = ref<RadioProps['value']>(1)
const verticalValue = ref<RadioProps['value']>(1)
const verticalAttrValue = ref<RadioProps['value']>(1)
const disabled = ref<boolean>(true)
const toggleDisabled = () => {
  disabled.value = !disabled.value
}
const onChange = (value: string | number | boolean) => {
  console.log('change', value)
}
// 非字符串选项名：label 直接传入 VNode
const vnodeOptions: RadioOption[] = [
  { label: '北京市', value: 1 },
  { label: h('span', { style: 'color: #ff6900' }, '纽约市'), value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 }
]
const vnodeGroupOptions: RadioGroupOption[] = [
  { label: '北京市', value: 1 },
  { label: h('span', { style: 'color: #1677ff' }, '纽约市'), value: 2 },
  { label: '布宜诺斯艾利斯', value: 3 }
]
const vnodeValue = ref<RadioProps['value']>(1)
const vnodeGroupValue = ref<RadioProps['value']>(1)
// 单组件配置式用法：options 驱动
const options = ref<RadioOption[]>([
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
const optionsDisabled = ref<RadioOption[]>([
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
const groupOptions = ref<RadioGroupOption[]>([
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
    value: 3,
    disabled: true
  }
])
const sizeOptions = [
  {
    label: 'small',
    value: 'small'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'large',
    value: 'large'
  }
]
const value = ref<RadioProps['value']>(2)
const buttonSize = ref<RadioProps['size']>('middle')
const customGroupValue = ref<RadioProps['value']>(1)
const gapGroupValue = ref<RadioProps['value']>(1)
const horizontalGap = ref(16)
const verticalGap = ref(8)
const groupGap = ref(16)
const groupVertical = ref<boolean>(true)
watchEffect(() => {
  console.log('checked', checked.value)
})
watchEffect(() => {
  console.log('value', value.value)
})
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Radio v-model:checked="checked" @change="onChange">Radio</Radio>
    <h2 class="mt30 mb10">单选组合</h2>
    <p class="mb10"
      >选中值由 <code>RadioGroup</code> 统一维护，组内 <code>Radio</code> 以 <code>value</code> 标识自身</p
    >
    <RadioGroup v-model:value="groupValue">
      <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
    </RadioGroup>
    <h2 class="mt30 mb10">表单字段名</h2>
    <p class="mb10">
      为组设置 <code>name</code> 后，组内各项的原生 <code>input</code> 共享同一字段名，浏览器据此把同组选项视为一组
    </p>
    <RadioGroup v-model:value="nameValue" name="radioGroup">
      <Radio v-for="item in nameItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
    </RadioGroup>
    <h2 class="mt30 mb10">聚焦方法</h2>
    <p class="mb10">
      组件暴露 <code>focus</code> / <code>blur</code> 方法，可聚焦或失焦原生 <code>input</code>；调用
      <code>focus</code> 时同样显示焦点环
    </p>
    <Space>
      <Radio
        ref="focusRadioRef"
        v-model:checked="focusChecked"
        @focusin="focusFocused = true"
        @focusout="focusFocused = false"
      >
        Radio
      </Radio>
      <Button @click="focusRadioRef?.focus()">focus</Button>
      <Button @click="focusRadioRef?.blur()">blur</Button>
      <span>{{ focusFocused ? '已聚焦' : '未聚焦' }}</span>
    </Space>
    <h2 class="mt30 mb10">选项列表</h2>
    <div v-for="item in optionCases" :key="item.key" class="mb10">
      <RadioGroup
        v-model:value="groupValues[item.key]"
        :options="item.options"
        :option-type="item.optionType"
        :disabled="item.disabled"
      />
    </div>
    <p class="mb10 mt10">单组件传入 <code>options</code> 亦可渲染整组选项，配合 <code>button</code> 切换按钮形态</p>
    <Space vertical>
      <Radio :options="options" v-model:value="value" @change="onChange" />
      <Radio :options="options" v-model:value="value" button />
    </Space>
    <h2 class="mt30 mb10">单选组垂直排列</h2>
    <p class="mb10">结合更多输入框选项的垂直排列用法</p>
    <RadioGroup v-model:value="verticalValue" style="display: inline-block">
      <Radio v-for="item in verticalItems" :key="item.value" :value="item.value" :style="verticalStyle">
        {{ item.label }}
        <Input v-if="item.value === 4 && verticalValue === 4" style="width: 100px; margin-left: 10px" />
      </Radio>
    </RadioGroup>
    <p class="mb10 mt10">使用 <code>vertical</code> 属性亦可让组内选项垂直排列</p>
    <RadioGroup v-model:value="verticalAttrValue" vertical>
      <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
    </RadioGroup>
    <h2 class="mt30 mb10">按钮样式</h2>
    <p class="mb10"
      >使用 <code>RadioButton</code> 子项，或给组设置 <code>optionType="button"</code>，均可切到按钮形态</p
    >
    <div v-for="item in buttonCases" :key="item.key" class="mb10">
      <RadioGroup v-model:value="groupValues[item.key]" :disabled="item.groupDisabled">
        <RadioButton
          v-for="button in buttonItems"
          :key="button.value"
          :value="button.value"
          :disabled="button.value === item.disabledValue"
        >
          {{ button.label }}
        </RadioButton>
      </RadioGroup>
    </div>
    <p class="mb10 mt10">单组件亦可直接使用按钮形态</p>
    <Space vertical>
      <Radio v-model:checked="checked" button @change="onChange">Radio Button</Radio>
      <Radio :options="options" v-model:value="value" button />
    </Space>
    <h2 class="mt30 mb10">填底的按钮样式</h2>
    <div v-for="item in solidCases" :key="item.key" class="mb10">
      <RadioGroup v-model:value="groupValues[item.key]" button-style="solid" :disabled="item.groupDisabled">
        <RadioButton
          v-for="button in buttonItems"
          :key="button.value"
          :value="button.value"
          :disabled="button.value === item.disabledValue"
        >
          {{ button.label }}
        </RadioButton>
      </RadioGroup>
    </div>
    <p class="mb10 mt10">单组件亦可直接使用填底的按钮形态</p>
    <Space vertical>
      <Radio v-model:checked="checked" button button-style="solid" @change="onChange">Radio Button Solid</Radio>
      <Radio :options="options" v-model:value="value" button button-style="solid" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Flex class="mb20" gap="small">
      <Button type="primary" @click="toggleDisabled">Toggle disabled</Button>
    </Flex>
    <Space vertical>
      <Radio v-model:checked="disabledChecked" :disabled="disabled">Disabled</Radio>
      <Radio v-model:checked="disabledUnchecked" :disabled="disabled">Disabled</Radio>
    </Space>
    <p class="mb10 mt10">配置式写法</p>
    <Space vertical>
      <Radio :options="options" v-model:value="value" disabled />
      <Radio :options="options" v-model:value="value" button disabled />
      <RadioGroup v-model:value="customGroupValue" :options="groupOptions" disabled />
    </Space>
    <h2 class="mt30 mb10">禁用选项</h2>
    <Space vertical>
      <Radio :options="optionsDisabled" v-model:value="value" />
      <Radio :options="optionsDisabled" v-model:value="value" button />
      <Radio :options="optionsDisabled" v-model:value="value" button button-style="solid" />
      <RadioGroup v-model:value="customGroupValue" :options="groupOptions" />
    </Space>
    <h2 class="mt30 mb10">自定义选项名</h2>
    <Space vertical>
      <Radio :options="options" v-model:value="value">
        <template #default="{ option, label, index }">
          <span v-if="index === 1" style="color: #ff6900">{{ label }}</span>
          <span v-if="index === 3" style="color: #1677ff">{{ option?.label }}</span>
        </template>
      </Radio>
      <RadioGroup v-model:value="customGroupValue">
        <Radio :value="1">北京市</Radio>
        <Radio :value="2"><span style="color: #ff6900">纽约市</span></Radio>
        <Radio :value="3">布宜诺斯艾利斯</Radio>
        <Radio :value="4"><span style="color: #1677ff">伊斯坦布尔</span></Radio>
      </RadioGroup>
    </Space>
    <p class="mb10 mt10">选项名直接传入 VNode</p>
    <Space vertical>
      <Radio :options="vnodeOptions" v-model:value="vnodeValue" />
      <RadioGroup v-model:value="vnodeGroupValue" :options="vnodeGroupOptions" />
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
    <Radio :gap="[horizontalGap, verticalGap]" :options="options" v-model:value="value" />
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
    <RadioGroup v-model:value="gapGroupValue" :gap="groupGap" :vertical="groupVertical">
      <Radio v-for="item in groupItems" :key="item.value" :value="item.value">{{ item.label }}</Radio>
    </RadioGroup>
    <h2 class="mt30 mb10">按钮大小</h2>
    <div v-for="item in sizeCases" :key="item.key" class="mb10">
      <RadioGroup v-model:value="groupValues[item.key]" :size="item.size">
        <RadioButton v-for="button in buttonItems" :key="button.value" :value="button.value">
          {{ button.label }}
        </RadioButton>
      </RadioGroup>
    </div>
    <p class="mb10 mt10">单组件的按钮形态同样支持尺寸切换</p>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="buttonSize" />
      <Radio v-model:checked="checked" button :size="buttonSize">Radio Button</Radio>
      <Radio :options="options" v-model:value="value" button :size="buttonSize" />
      <Radio :options="options" v-model:value="value" button button-style="solid" :size="buttonSize" />
    </Space>
  </div>
</template>
