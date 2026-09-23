# 选择器 Select

<GlobalElement />

_下拉选择器_

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时
- 当选项少时（少于 `5` 项），建议直接将选项平铺，使用 `Radio` 是更好的选择

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { CheckOutlined, MehOutlined, PlusOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
// 基本使用
const basicOptions: SelectOption[] = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' }
]
const basicValue = ref<SelectProps['value']>('lucy')
function onBasicChange(value: string | number, option: SelectOption, index: number) {
  console.log('change', value, option, index)
}
function onBasicFocus() {
  console.log('focus')
}
// 三种大小
const sizeRadios = [
  { label: 'large', value: 'large' },
  { label: 'middle', value: 'middle' },
  { label: 'small', value: 'small' }
]
const size = ref<SelectProps['size']>('middle')
const sizeOptions: SelectOption[] = [...Array(25)].map((_, index) => ({
  value: `${index + 10}`,
  label: `选项 ${index + 1}`
}))
const sizeValue = ref<SelectProps['value']>('10')
function onPopupScroll() {
  console.log('popupScroll')
}
// 三种大小的多选 / 标签示例段
const sizeMultipleValue = ref<SelectProps['value']>(['10', '11'])
const sizeTagsValue = ref<SelectProps['value']>(['10', '11'])
// 城市选项数据：无边框 / 禁用 / 禁用选项 / 自定义状态 / 支持清除 / 键盘操作 / 自定义选中标识 / 下拉面板 / 受控展开 共用
const cityOptions: SelectOption[] = [
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
]
// 无边框
const borderlessValue = ref<SelectProps['value']>(1)
// 禁用
const disabledValue = ref<SelectProps['value']>(5)
// 禁用选项
const cityOptionsDisabled: SelectOption[] = cityOptions.map((option, index) =>
  index === 1 ? { ...option, disabled: true } : option
)
const disabledOptionValue = ref<SelectProps['value']>(5)
// 自定义状态
const statusValue = ref<SelectProps['value']>(1)
// 多选
const multipleValue = ref<SelectProps['value']>(['10', '11'])
// 标签（复用 25 项数据：数量足够撑出面板滚动）
const tagsValue = ref<SelectProps['value']>([])
// 最多显示多少个选项及选项最大长度
const responsiveOptions: SelectOption[] = [...Array(26)].map((_, index) => {
  const value = `${(index + 10).toString(36)}${index + 10}`
  return { label: `Long Label: ${value}`, value }
})
const responsiveValue = ref<SelectProps['value']>(['a10', 'c12', 'h17', 'j19', 'k20'])
const maxTagCount = ref<number | 'responsive'>(2)
const maxTagTextLength = ref(10)
const maxTagCountRadios = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '5', value: 5 },
  { label: 'responsive', value: 'responsive' }
]
const maxTagTextLengthRadios = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '20', value: 20 }
]
// 隐藏已选择选项：已选项从下拉列表中移除，标签仍由组件内部的选项缓存保留
const hideSelectedValue = ref<SelectProps['value']>([])
const hideSelectedSource = ['Apples', 'Nails', 'Bananas', 'Helicopters']
const hideSelectedOptions = computed<SelectOption[]>(() => {
  const selected = Array.isArray(hideSelectedValue.value) ? hideSelectedValue.value : []
  return hideSelectedSource.filter((item) => !selected.includes(item)).map((item) => ({ value: item }))
})
// 自动分词
const tokenValue = ref<SelectProps['value']>([])
const tokenOptions: SelectOption[] = [{ value: 'a1', label: 'a1' }]
// 获得选项的文本（labelInValue）
const labelInValueOptions: SelectOption[] = [
  { value: 'jack', label: 'Jack (100)' },
  { value: 'lucy', label: 'Lucy (101)' },
  { value: 'tom', label: 'Tom (102)' },
  { value: 'jerry', label: 'Jerry (103)' },
  { value: 'bob', label: 'Bob (104)' },
  { value: 'alice', label: 'Alice (105)' },
  { value: 'david', label: 'David (106)' },
  { value: 'eva', label: 'Eva (107)' }
]
const labelInValueValue = ref<SelectProps['value']>({ value: 'lucy', label: 'Lucy (101)' })
function onLabelInValueChange(value: SelectProps['value']) {
  console.log('labelInValue', value)
}
// 分组：子组件式（SelectOptGroup + SelectOption）与配置式（options 嵌套）两种写法
const groupValue = ref<SelectProps['value']>('lucy')
const groupOptions: SelectOption[] = [
  {
    label: 'Manager',
    options: [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' }
    ]
  },
  {
    label: 'Engineer',
    options: [{ value: 'yiminghe', label: 'Yiminghe' }]
  }
]
// 自定义 label、value、options 字段
const fieldOptions = [
  { id: 'jack', name: 'Jack' },
  { id: 'lucy', name: 'Lucy' },
  { id: 'disabled', name: 'Disabled', disabled: true },
  { id: 'yiminghe', name: 'Yiminghe' }
]
const fieldValue = ref<SelectProps['value']>('lucy')
const fieldNames = { label: 'name', value: 'id' }
// 分组子选项：分组字段名同样由 fieldNames.options 指定（此处为 items），组条目自身不可选中
const groupFieldOptions = [
  {
    name: 'Manager',
    items: [
      { id: 'jack', name: 'Jack' },
      { id: 'lucy', name: 'Lucy' }
    ]
  },
  {
    name: 'Engineer',
    items: [
      { id: 'yiminghe', name: 'Yiminghe' },
      { id: 'yiminghe1', name: 'Yiminghe1' }
    ]
  }
]
const groupFieldNames = { label: 'name', value: 'id', options: 'items' }
const groupFieldValue = ref<SelectProps['value']>('lucy')
// 搜索框（远程搜索）
const remoteValue = ref<SelectProps['value']>()
const remoteOptions = ref<SelectOption[]>([])
let remoteTimer: ReturnType<typeof setTimeout> | null = null
function onRemoteSearch(keyword: string) {
  if (remoteTimer) clearTimeout(remoteTimer)
  // 用 300ms 延迟模拟接口返回；未输入时返回空数组（配合 not-found-content 为 null，面板不展开）
  remoteTimer = setTimeout(() => {
    remoteOptions.value = keyword
      ? ['北京', '上海', '广州'].map((city, index) => ({ value: `${keyword}-${index}`, label: `${keyword} · ${city}` }))
      : []
  }, 300)
}
onUnmounted(() => {
  if (remoteTimer) clearTimeout(remoteTimer)
})
// 带搜索框
const searchOptions: SelectOption[] = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' }
]
const searchValue = ref<SelectProps['value']>()
function filterByValue(input: string, option: SelectOption) {
  return String(option.value).toLowerCase().includes(input.toLowerCase())
}
function onSearchBlur() {
  console.log('blur')
}
// 搜索用户：远程搜索 + 节流控制 + 请求时序控制 + 加载状态（示例以本地数据模拟接口返回）
const userValue = ref<SelectProps['value']>([])
const userOptions = ref<SelectOption[]>([])
const userFetching = ref(false)
const userPool = [
  { name: '张伟', account: 'zhangwei' },
  { name: '王芳', account: 'wangfang' },
  { name: '李娜', account: 'lina' },
  { name: '刘洋', account: 'liuyang' },
  { name: '陈静', account: 'chenjing' },
  { name: '杨帆', account: 'yangfan' }
]
let userFetchId = 0
let userTimer: ReturnType<typeof setTimeout> | null = null
function fetchUser(keyword: string) {
  // 节流：连续输入只在停顿 300ms 后发起一次请求
  if (userTimer) clearTimeout(userTimer)
  userTimer = setTimeout(() => {
    const fetchId = (userFetchId += 1)
    userOptions.value = []
    userFetching.value = true
    // 模拟接口 300ms 后返回；仅最后一次请求的结果生效，避免乱序返回覆盖（请求时序控制）
    setTimeout(() => {
      if (fetchId !== userFetchId) return
      const lowerKeyword = keyword.toLowerCase()
      userOptions.value = userPool
        .filter((user) => user.name.includes(keyword) || user.account.includes(lowerKeyword))
        .map((user) => ({ value: user.account, label: `${user.name}（${user.account}）` }))
      userFetching.value = false
    }, 300)
  }, 300)
}
// 选中后仅结束加载态、保留最后一次远程结果：
// 若清空 options，标签文本会退化成 value（本项目的缓存会保留 label）
watch(userValue, () => {
  userFetching.value = false
})
onUnmounted(() => {
  if (userTimer) clearTimeout(userTimer)
})
// 联动
// 省市数据取自 Cascader 用例的同一份中文数据（北京市 / 浙江）
const provinceData = ['北京市', '浙江']
const cityData: Record<string, string[]> = {
  北京市: ['东城区', '西城区'],
  浙江: ['杭州市', '湖州市']
}
const province = ref(provinceData[0])
const secondCity = ref(cityData[province.value][0])
const cities = computed(() => cityData[province.value])
watch(province, (value) => {
  secondCity.value = cityData[value][0]
})
// 支持清除
const clearableValue = ref<SelectProps['value']>(5)
// 键盘操作
const keyboardValue = ref<SelectProps['value']>(5)
// 受控展开
const controlledOpen = ref(false)
const controlledOpenValue = ref<SelectProps['value']>(1)
function onControlledVisibleChange(open: boolean) {
  controlledOpen.value = open
}
// 单按钮切换开合：取 mousedown 时刻的状态为准 ——
// 点击按钮即「点击面板外部」，组件会在 mousedown 之后派发一次关闭请求（controlledOpen 被置为 false），
// 若 click 时再按当时的状态取反，就会被反转回来，表现为「按钮关不掉」
let openBeforeToggle = false
function onToggleMousedown() {
  openBeforeToggle = controlledOpen.value
}
function onToggleClick() {
  controlledOpen.value = !openBeforeToggle
}
// 后缀图标
const suffixValue = ref<SelectProps['value']>('lucy')
const suffixOptions: SelectOption[] = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' }
]
// 自定义选中标识
const stateIconValue = ref<SelectProps['value']>(5)
// 定制回填内容
const countryValue = ref<SelectProps['value']>('china')
const countryOptions: SelectOption[] = [
  { value: 'china', label: 'China (中国)', icon: '🇨🇳' },
  { value: 'usa', label: 'USA (美国)', icon: '🇺🇸' },
  { value: 'japan', label: 'Japan (日本)', icon: '🇯🇵' },
  { value: 'korea', label: 'Korea (韩国)', icon: '🇰🇷' }
]
// 定制回填内容的多选示例段
const countryMultipleValue = ref<SelectProps['value']>(['china'])
// 下拉面板弹出位置
const placement = ref<SelectProps['placement']>('bottomLeft')
const placementValue = ref<SelectProps['value']>(5)
// 面板宽度取固定值（200），使面板宽于触发器：否则四个方位宽度一致、看不出差异
const placementRadios = [
  { label: 'topLeft', value: 'topLeft' },
  { label: 'topRight', value: 'topRight' },
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomRight', value: 'bottomRight' }
]
// 下拉面板各用例共用数据（宽度 / 挂载容器 / 面板数 / 滚动条）
const longOptions: SelectOption[] = [...Array(10)].map((_, index) => ({ label: `选项 ${index + 1}`, value: index + 1 }))
// 下拉面板宽度
// 选项文本长短不一，用于验证 dropdownMatchSelectWidth 为 false 时面板按内容自适应
const adaptiveOptions: SelectOption[] = [
  { label: '短', value: 1 },
  { label: '中等长度选项', value: 2 },
  { label: '一段明显更长的选项文本', value: 3 }
]
const matchWidthValue = ref<SelectProps['value']>(1)
// 下拉面板挂载容器
const mountValue = ref<SelectProps['value']>(1)
// 下拉面板数
const listHeightValue = ref<SelectProps['value']>(1)
// 下拉面板滚动条
const scrollbarValue = ref<SelectProps['value']>(1)
// 自定义下拉面板
const panelValue = ref<SelectProps['value']>(1)
const panelZIndexValue = ref<SelectProps['value']>(1)
// 自定义面板外观：经 dropdownMenuStyle 传入
const customPanelStyle = {
  background: 'rgba(255, 105, 0, 0.05)',
  border: '1px solid #ff6900',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(255, 105, 0, 0.25)'
}
// 扩展菜单
const addableItems = ref(['jack', 'lucy'])
const addableValue = ref<SelectProps['value']>()
const addableName = ref('')
let addableIndex = 0
function addItem() {
  addableItems.value = [...addableItems.value, addableName.value || `New item ${(addableIndex += 1)}`]
  addableName.value = ''
}
// 大数据：10 万项验证虚拟滚动（打开面板只渲染可视区选项）
// label 用「城市 + 6 位序号」而非裸字符串，滚动时更易辨识
const bigDataCities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '重庆']
const bigDataOptions: SelectOption[] = Array.from({ length: 100000 }, (_, index) => ({
  value: `item-${index + 1}`,
  label: `${bigDataCities[index % bigDataCities.length]} ${String(index + 1).padStart(6, '0')}`
}))
const bigDataValue = ref<SelectProps['value']>(['item-10', 'item-12'])
const bigDataVirtual = ref(true)
// 空数据
const emptyOptions: SelectOption[] = []
</script>

## 基本使用

<Select :options="basicOptions" v-model:value="basicValue" :width="120" @change="onBasicChange" @focus="onBasicFocus" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' }
])
const selectedValue = ref<SelectProps['value']>('lucy')
function onChange(value: string | number, option: SelectOption, index: number) {
  console.log('change', value, option, index)
}
function onFocus() {
  console.log('focus')
}
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" :width="120" @change="onChange" @focus="onFocus" />
</template>
```

:::

## 三种大小

<Space vertical>
  <Radio :options="sizeRadios" v-model:value="size" button button-style="solid" />
  <Space>
    <Select :options="sizeOptions" v-model:value="sizeValue" :size="size" :width="200" @popup-scroll="onPopupScroll" />
    <Select
      :options="sizeOptions"
      v-model:value="sizeMultipleValue"
      mode="multiple"
      :size="size"
      placeholder="Please select"
      :width="200"
      @popup-scroll="onPopupScroll"
    />
    <Select
      :options="sizeOptions"
      v-model:value="sizeTagsValue"
      mode="tags"
      :size="size"
      placeholder="Please select"
      :width="200"
    />
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const sizeOptions: SelectOption[] = [...Array(25)].map((_, index) => ({
  value: `${index + 10}`,
  label: `选项 ${index + 1}`
}))
const size = ref<SelectProps['size']>('middle')
const selectedValue = ref<SelectProps['value']>('10')
const multipleValue = ref<SelectProps['value']>(['10', '11'])
const tagsValue = ref<SelectProps['value']>(['10', '11'])
const sizeRadios = [
  { label: 'large', value: 'large' },
  { label: 'middle', value: 'middle' },
  { label: 'small', value: 'small' }
]
function onPopupScroll() {
  console.log('popupScroll')
}
</script>
<template>
  <Space vertical>
    <Radio :options="sizeRadios" v-model:value="size" button button-style="solid" />
    <Space>
      <Select :options="sizeOptions" v-model:value="selectedValue" :size="size" :width="200" @popup-scroll="onPopupScroll" />
      <Select
        :options="sizeOptions"
        v-model:value="multipleValue"
        mode="multiple"
        :size="size"
        placeholder="Please select"
        :width="200"
        @popup-scroll="onPopupScroll"
      />
      <Select
        :options="sizeOptions"
        v-model:value="tagsValue"
        mode="tags"
        :size="size"
        placeholder="Please select"
        :width="200"
      />
    </Space>
  </Space>
</template>
```

:::

## 无边框

<Space>
  <Select :options="cityOptions" v-model:value="borderlessValue" :bordered="false" :width="120" />
  <Select :options="cityOptions" v-model:value="borderlessValue" :bordered="false" :width="120" disabled />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedValue = ref<SelectProps['value']>(1)
</script>
<template>
  <Space>
    <Select :options="options" v-model:value="selectedValue" :bordered="false" :width="120" />
    <Select :options="options" v-model:value="selectedValue" :bordered="false" :width="120" disabled />
  </Space>
</template>
```

:::

## 禁用

<Select :options="cityOptions" v-model:value="disabledValue" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" disabled />
</template>
```

:::

## 禁用选项

<Select :options="cityOptionsDisabled" v-model:value="disabledOptionValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2, disabled: true },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" />
</template>
```

:::

## 自定义状态

_`status` 可选 `error` 或 `warning`_

<br/>

<Space>
  <Select :options="cityOptions" v-model:value="statusValue" status="error" />
  <Select :options="cityOptions" v-model:value="statusValue" status="warning" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedValue = ref<SelectProps['value']>(1)
</script>
<template>
  <Space>
    <Select :options="options" v-model:value="selectedValue" status="error" />
    <Select :options="options" v-model:value="selectedValue" status="warning" />
  </Space>
</template>
```

:::

## 多选

_从已有条目中选择多个值，下拉列表可滚动查看全部选项_

<br/>

<Select v-model:value="multipleValue" mode="multiple" placeholder="Please select" :options="sizeOptions" :width="300" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options: SelectOption[] = [...Array(25)].map((_, index) => ({
  value: `${index + 10}`,
  label: `选项 ${index + 1}`
}))
const selectedValue = ref<SelectProps['value']>(['10', '11'])
</script>
<template>
  <Select v-model:value="selectedValue" mode="multiple" placeholder="Please select" :options="options" :width="300" />
</template>
```

:::

## 标签

_输入任意内容并回车即可创建为标签，下拉列表可滚动查看全部选项_

<br/>

<Select v-model:value="tagsValue" mode="tags" placeholder="Tags Mode" :options="sizeOptions" :width="300" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options: SelectOption[] = [...Array(25)].map((_, index) => ({
  value: `${index + 10}`,
  label: `选项 ${index + 1}`
}))
const selectedValue = ref<SelectProps['value']>([])
</script>
<template>
  <Select v-model:value="selectedValue" mode="tags" placeholder="Tags Mode" :options="options" :width="300" />
</template>
```

:::

## 最多显示多少个选项及选项最大长度

_超出 `maxTagCount` 的标签会折叠为省略提示，`maxTagTextLength` 截断过长的标签文本；`maxTagCount` 设为 `responsive` 时按容器宽度自动折叠（有性能消耗，不建议在大表单场景使用）_

<br/>

<Flex vertical gap="large" align="start">
  <Flex vertical gap="middle" align="start">
    <Flex gap="small" align="center" wrap="wrap">
      <code>maxTagCount</code>
      <Radio :options="maxTagCountRadios" v-model:value="maxTagCount" button button-style="solid" />
    </Flex>
    <Select
      v-model:value="responsiveValue"
      mode="multiple"
      placeholder="Select Item..."
      :max-tag-count="maxTagCount"
      :options="responsiveOptions"
      :width="360"
    >
      <template #maxTagPlaceholder="{ omittedValues }">
        <span style="color: red">+ {{ omittedValues.length }} ...</span>
      </template>
    </Select>
  </Flex>
  <Flex vertical gap="middle" align="start">
    <Flex gap="small" align="center" wrap="wrap">
      <code>maxTagTextLength</code>
      <Radio :options="maxTagTextLengthRadios" v-model:value="maxTagTextLength" button button-style="solid" />
    </Flex>
    <Select
      v-model:value="responsiveValue"
      mode="multiple"
      placeholder="Select Item..."
      :max-tag-text-length="maxTagTextLength"
      :options="responsiveOptions"
      :width="360"
    />
  </Flex>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options: SelectOption[] = [...Array(26)].map((_, index) => {
  const value = `${(index + 10).toString(36)}${index + 10}`
  return { label: `Long Label: ${value}`, value }
})
const selectedValue = ref<SelectProps['value']>(['a10', 'c12', 'h17', 'j19', 'k20'])
const maxTagCount = ref<number | 'responsive'>(2)
const maxTagTextLength = ref(10)
const maxTagCountRadios = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '5', value: 5 },
  { label: 'responsive', value: 'responsive' }
]
const maxTagTextLengthRadios = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '20', value: 20 }
]
</script>
<template>
  <Flex vertical gap="large" align="start">
    <Flex vertical gap="middle" align="start">
      <Flex gap="small" align="center" wrap="wrap">
        <code>maxTagCount</code>
        <Radio :options="maxTagCountRadios" v-model:value="maxTagCount" button button-style="solid" />
      </Flex>
      <Select
        v-model:value="selectedValue"
        mode="multiple"
        placeholder="Select Item..."
        :max-tag-count="maxTagCount"
        :options="options"
        :width="360"
      >
        <template #maxTagPlaceholder="{ omittedValues }">
          <span style="color: red">+ {{ omittedValues.length }} ...</span>
        </template>
      </Select>
    </Flex>
    <Flex vertical gap="middle" align="start">
      <Flex gap="small" align="center" wrap="wrap">
        <code>maxTagTextLength</code>
        <Radio :options="maxTagTextLengthRadios" v-model:value="maxTagTextLength" button button-style="solid" />
      </Flex>
      <Select
        v-model:value="selectedValue"
        mode="multiple"
        placeholder="Select Item..."
        :max-tag-text-length="maxTagTextLength"
        :options="options"
        :width="360"
      />
    </Flex>
  </Flex>
</template>
```

:::

## 隐藏已选择选项

_隐藏下拉列表中已选择的选项，已选项的标签由组件内部的选项缓存保留_

<br/>

<Select
  v-model:value="hideSelectedValue"
  mode="multiple"
  placeholder="Inserted are removed"
  :options="hideSelectedOptions"
  :width="300"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const source = ['Apples', 'Nails', 'Bananas', 'Helicopters']
const selectedValue = ref<SelectProps['value']>([])
const options = computed<SelectOption[]>(() => {
  const selected = Array.isArray(selectedValue.value) ? selectedValue.value : []
  return source.filter((item) => !selected.includes(item)).map((item) => ({ value: item }))
})
</script>
<template>
  <Select
    v-model:value="selectedValue"
    mode="multiple"
    placeholder="Inserted are removed"
    :options="options"
    :width="300"
  />
</template>
```

:::

## 自动分词

_试下复制 `特斯拉,哥斯拉` 到输入框里。只在 `tags` 和 `multiple` 模式下可用_

<br/>

<Select
  v-model:value="tokenValue"
  mode="tags"
  placeholder="Automatic tokenization"
  :token-separators="[',']"
  :options="tokenOptions"
  :width="300"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options: SelectOption[] = [{ value: 'a1', label: 'a1' }]
const selectedValue = ref<SelectProps['value']>([])
</script>
<template>
  <Select
    v-model:value="selectedValue"
    mode="tags"
    placeholder="Automatic tokenization"
    :token-separators="[',']"
    :options="options"
    :width="300"
  />
</template>
```

:::

## 获得选项的文本

_开启 `labelInValue` 后 `value` 变为包含文本的对象：`{ label, value, key, originLabel }`_

<br/>

<Select
  v-model:value="labelInValueValue"
  label-in-value
  :options="labelInValueOptions"
  :width="120"
  @change="onLabelInValueChange"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options: SelectOption[] = [
  { value: 'jack', label: 'Jack (100)' },
  { value: 'lucy', label: 'Lucy (101)' },
  { value: 'tom', label: 'Tom (102)' },
  { value: 'jerry', label: 'Jerry (103)' },
  { value: 'bob', label: 'Bob (104)' },
  { value: 'alice', label: 'Alice (105)' },
  { value: 'david', label: 'David (106)' },
  { value: 'eva', label: 'Eva (107)' }
]
const value = ref<SelectProps['value']>({ value: 'lucy', label: 'Lucy (101)' })
function handleChange(value: SelectProps['value']) {
  console.log(value) // { label: 'Lucy (101)', value: 'lucy', key: 'lucy', originLabel: 'Lucy (101)' }
}
</script>
<template>
  <Select v-model:value="value" label-in-value :options="options" :width="120" @change="handleChange" />
</template>
```

:::

## 分组

_用 `SelectOptGroup` / `SelectOption` 子组件或 `options` 的嵌套写法进行选项分组_

<br/>

<Space>
  <Select v-model:value="groupValue" :width="200">
    <SelectOptGroup>
      <template #label>
        <span><UserOutlined /> Manager</span>
      </template>
      <SelectOption value="jack">Jack</SelectOption>
      <SelectOption value="lucy">Lucy</SelectOption>
    </SelectOptGroup>
    <SelectOptGroup label="Engineer">
      <SelectOption value="Yiminghe">yiminghe</SelectOption>
      <SelectOption value="Yiminghe1">yiminghe1</SelectOption>
    </SelectOptGroup>
  </Select>
  <Select v-model:value="groupValue" :options="groupOptions" :width="200" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import type { SelectProps } from 'vue-amazing-ui'
const value = ref<SelectProps['value']>('lucy')
const options = [
  {
    label: 'Manager',
    options: [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' }
    ]
  },
  {
    label: 'Engineer',
    options: [{ value: 'yiminghe', label: 'Yiminghe' }]
  }
]
</script>
<template>
  <Space>
    <Select v-model:value="value" :width="200">
      <SelectOptGroup>
        <template #label>
          <span><UserOutlined /> Manager</span>
        </template>
        <SelectOption value="jack">Jack</SelectOption>
        <SelectOption value="lucy">Lucy</SelectOption>
      </SelectOptGroup>
      <SelectOptGroup label="Engineer">
        <SelectOption value="Yiminghe">yiminghe</SelectOption>
        <SelectOption value="Yiminghe1">yiminghe1</SelectOption>
      </SelectOptGroup>
    </Select>
    <Select v-model:value="value" :options="options" :width="200" />
  </Space>
</template>
```

:::

## 自定义 label、value、options 字段

_通过 `fieldNames` 指定选项的文本 / 值字段，以及分组子选项的字段（`options`）_

<br/>

<Space>
  <Select :options="fieldOptions" :field-names="fieldNames" v-model:value="fieldValue" :width="200" />
  <Select :options="groupFieldOptions" :field-names="groupFieldNames" v-model:value="groupFieldValue" :width="200" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps } from 'vue-amazing-ui'
const options = [
  { id: 'jack', name: 'Jack' },
  { id: 'lucy', name: 'Lucy' },
  { id: 'disabled', name: 'Disabled', disabled: true },
  { id: 'yiminghe', name: 'Yiminghe' }
]
const fieldNames = { label: 'name', value: 'id' }
const selectedValue = ref<SelectProps['value']>('lucy')
// 分组子选项：由 fieldNames.options 指定分组字段（此处为 items），组条目自身不可选中
const groupOptions = [
  {
    name: 'Manager',
    items: [
      { id: 'jack', name: 'Jack' },
      { id: 'lucy', name: 'Lucy' }
    ]
  },
  {
    name: 'Engineer',
    items: [
      { id: 'yiminghe', name: 'Yiminghe' },
      { id: 'yiminghe1', name: 'Yiminghe1' }
    ]
  }
]
const groupFieldNames = { label: 'name', value: 'id', options: 'items' }
const groupValue = ref<SelectProps['value']>('lucy')
</script>
<template>
  <Space>
    <Select :options="options" :field-names="fieldNames" v-model:value="selectedValue" :width="200" />
    <Select :options="groupOptions" :field-names="groupFieldNames" v-model:value="groupValue" :width="200" />
  </Space>
</template>
```

:::

## 搜索框

<Select
  v-model:value="remoteValue"
  show-search
  placeholder="请输入搜索内容"
  :width="200"
  :default-active-first-option="false"
  :show-arrow="false"
  :filter-option="false"
  :not-found-content="null"
  :options="remoteOptions"
  @search="onRemoteSearch"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const selectedValue = ref<SelectProps['value']>()
const options = ref<SelectOption[]>([])
function onSearch(keyword: string) {
  // 用 300ms 延迟模拟接口返回；未输入时返回空数组（配合 not-found-content 为 null，面板不展开）
  setTimeout(() => {
    options.value = keyword
      ? ['北京', '上海', '广州'].map((city, index) => ({ value: `${keyword}-${index}`, label: `${keyword} · ${city}` }))
      : []
  }, 300)
}
</script>
<template>
  <Select
    v-model:value="selectedValue"
    show-search
    placeholder="请输入搜索内容"
    :width="200"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="options"
    @search="onSearch"
  />
</template>
```

:::

## 带搜索框

<Select
  v-model:value="searchValue"
  show-search
  placeholder="请选择"
  :width="200"
  :options="searchOptions"
  :filter-option="filterByValue"
  @blur="onSearchBlur"
  @focus="onBasicFocus"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' }
])
const selectedValue = ref<SelectProps['value']>()
// 默认按 value 字段过滤，可传入函数自定义过滤逻辑
function filterOption(input: string, option: SelectOption) {
  return String(option.value).toLowerCase().includes(input.toLowerCase())
}
function onBlur() {
  console.log('blur')
}
function onFocus() {
  console.log('focus')
}
</script>
<template>
  <Select
    v-model:value="selectedValue"
    show-search
    placeholder="请选择"
    :width="200"
    :options="options"
    :filter-option="filterOption"
    @blur="onBlur"
    @focus="onFocus"
  />
</template>
```

:::

## 搜索用户

_远程搜索 + 节流控制 + 请求时序控制 + 加载状态的多选示例（示例数据由本地模拟，可输入姓名或账号搜索）_

<br/>

<Select
  v-model:value="userValue"
  mode="multiple"
  placeholder="请选择用户"
  :filter-option="false"
  :not-found-content="userFetching ? undefined : null"
  :options="userOptions"
  :width="300"
  @search="fetchUser"
>
  <template #notFoundContent>
    <Spin size="small" />
  </template>
</Select>

::: details Show Code

```vue
<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([])
const selectedValue = ref<SelectProps['value']>([])
const fetching = ref(false)
// 示例用本地数据模拟用户库，实际场景替换为接口请求
const pool = [
  { name: '张伟', account: 'zhangwei' },
  { name: '王芳', account: 'wangfang' },
  { name: '李娜', account: 'lina' },
  { name: '刘洋', account: 'liuyang' },
  { name: '陈静', account: 'chenjing' },
  { name: '杨帆', account: 'yangfan' }
]
let fetchId = 0
let timer: ReturnType<typeof setTimeout> | null = null
function onSearch(keyword: string) {
  // 节流：连续输入只在停顿 300ms 后发起一次请求
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    const currentId = (fetchId += 1)
    options.value = []
    fetching.value = true
    // 模拟接口 300ms 后返回；仅最后一次请求的结果生效，避免乱序返回覆盖（请求时序控制）
    setTimeout(() => {
      if (currentId !== fetchId) return
      const lowerKeyword = keyword.toLowerCase()
      options.value = pool
        .filter((user) => user.name.includes(keyword) || user.account.includes(lowerKeyword))
        .map((user) => ({ value: user.account, label: `${user.name}（${user.account}）` }))
      fetching.value = false
    }, 300)
  }, 300)
}
onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
<template>
  <Select
    v-model:value="selectedValue"
    mode="multiple"
    placeholder="请选择用户"
    :filter-option="false"
    :not-found-content="fetching ? undefined : null"
    :options="options"
    :width="300"
    @search="onSearch"
  >
    <template #notFoundContent>
      <Spin size="small" />
    </template>
  </Select>
</template>
```

:::

## 联动

<Space>
  <Select :options="provinceData.map((pro) => ({ value: pro }))" v-model:value="province" :width="120" />
  <Select :options="cities.map((city) => ({ value: city }))" v-model:value="secondCity" :width="120" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
const provinceData = ['北京市', '浙江']
const cityData: Record<string, string[]> = {
  北京市: ['东城区', '西城区'],
  浙江: ['杭州市', '湖州市']
}
const province = ref(provinceData[0])
const secondCity = ref(cityData[province.value][0])
const cities = computed(() => cityData[province.value])
watch(province, (value) => {
  secondCity.value = cityData[value][0]
})
</script>
<template>
  <Space>
    <Select :options="provinceData.map((pro) => ({ value: pro }))" v-model:value="province" :width="120" />
    <Select :options="cities.map((city) => ({ value: city }))" v-model:value="secondCity" :width="120" />
  </Space>
</template>
```

:::

## 支持清除

<Select :options="cityOptions" v-model:value="clearableValue" allow-clear />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" allow-clear />
</template>
```

:::

## 键盘操作

_聚焦后按 `↑` `↓` 移动高亮（自动跳过禁用项、到达列表端点时环形回绕并滚入可视区），按 `Enter` 选中，按 `Esc` 关闭面板；面板收起时按 `↑` `↓` 可直接展开_

<br/>

| 按键 | 说明 |
| :-- | :-- |
| `↑` / `↓` | 上下移动高亮项（自动跳过禁用项，到达列表端点时环形回绕，并随面板滚动到可视区） |
| `Enter` | 选中当前高亮项 |
| `Esc` | 关闭面板，不改变当前选中值 |
| `Tab` | 焦点移出，面板关闭 |

<Select :options="cityOptionsDisabled" v-model:value="keyboardValue" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2, disabled: true },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" />
</template>
```

:::

## 受控展开

_`open` 受控时面板显隐由外部驱动，配合 `dropdownVisibleChange` 同步开合_

<br/>

<Space>
  <Button type="primary" @mousedown="onToggleMousedown" @click="onToggleClick">
    {{ controlledOpen ? '关闭面板' : '展开面板' }}
  </Button>
  <Select
    :options="cityOptions"
    v-model:value="controlledOpenValue"
    :open="controlledOpen"
    @dropdown-visible-change="onControlledVisibleChange"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedValue = ref<SelectProps['value']>(1)
const open = ref(false)
// 单按钮切换开合：取 mousedown 时刻的状态为准 ——
// 点击按钮即「点击面板外部」，组件会在 mousedown 之后派发一次关闭请求（open 被置为 false），
// 若 click 时再按当时的状态取反，就会被反转回来，表现为「按钮关不掉」
let openBeforeToggle = false
function onToggleMousedown() {
  openBeforeToggle = open.value
}
function onToggleClick() {
  open.value = !openBeforeToggle
}
</script>
<template>
  <Space>
    <Button type="primary" @mousedown="onToggleMousedown" @click="onToggleClick">
      {{ open ? '关闭面板' : '展开面板' }}
    </Button>
    <Select
      :options="options"
      v-model:value="selectedValue"
      :open="open"
      @dropdown-visible-change="open = $event"
    />
  </Space>
</template>
```

:::

## 后缀图标

<Space>
  <Select :options="suffixOptions" v-model:value="suffixValue" :width="120">
    <template #suffixIcon><SmileOutlined class="select-suffix" /></template>
  </Select>
  <Select :options="suffixOptions" v-model:value="suffixValue" :width="120" disabled>
    <template #suffixIcon><MehOutlined class="select-suffix" /></template>
  </Select>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MehOutlined, SmileOutlined } from '@ant-design/icons-vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' }
])
const selectedValue = ref<SelectProps['value']>('lucy')
</script>
<template>
  <Space>
    <Select :options="options" v-model:value="selectedValue" :width="120">
      <template #suffixIcon><SmileOutlined class="select-suffix" /></template>
    </Select>
    <Select :options="options" v-model:value="selectedValue" :width="120" disabled>
      <template #suffixIcon><MehOutlined class="select-suffix" /></template>
    </Select>
  </Space>
</template>
```

:::

## 自定义选中标识

_通过 `menuItemSelectedIcon` 插槽自定义选中项的标识图标，单选模式默认不展示_

<br/>

<Select :options="cityOptions" v-model:value="stateIconValue" :width="180">
  <template #menuItemSelectedIcon="{ isSelected }">
    <CheckOutlined v-if="isSelected" style="color: #ff6900" />
  </template>
</Select>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const selectedValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" :width="180">
    <template #menuItemSelectedIcon="{ isSelected }">
      <CheckOutlined v-if="isSelected" style="color: #ff6900" />
    </template>
  </Select>
</template>
```

:::

## 定制回填内容

_使用 `optionLabelProp` 指定回填到选择框的 `option` 字段；`optionLabel` 插槽可完全自定义回填节点_

<br/>

<Flex vertical gap="middle" align="start">
  <!-- 单选：optionLabelProp 指定回填字段 vs optionLabel 插槽完全自定义回填节点 -->
  <Space>
    <Select :options="countryOptions" v-model:value="countryValue" option-label-prop="label" :width="220">
      <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
    </Select>
    <Select :options="countryOptions" v-model:value="countryValue" :width="220">
      <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
      <template #optionLabel="option">{{ option.icon }} {{ option.label }}</template>
    </Select>
  </Space>
  <!-- 多选：optionLabelProp 指定字段 + tagRender 自定义标签 -->
  <Space>
    <Select
      :options="countryOptions"
      v-model:value="countryMultipleValue"
      mode="multiple"
      placeholder="select one country"
      option-label-prop="label"
      :width="320"
    >
      <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
    </Select>
    <Select
      :options="countryOptions"
      v-model:value="countryMultipleValue"
      mode="multiple"
      placeholder="select one country"
      :width="320"
    >
      <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
      <template #tagRender="{ label, closable, onClose, option }">
        <Tag :closable="closable" color="volcano" style="margin: 2px 3px 2px 0" @close="onClose">
          {{ label }}&nbsp;&nbsp;{{ option.icon }}
        </Tag>
      </template>
    </Select>
  </Space>
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { value: 'china', label: 'China (中国)', icon: '🇨🇳' },
  { value: 'usa', label: 'USA (美国)', icon: '🇺🇸' },
  { value: 'japan', label: 'Japan (日本)', icon: '🇯🇵' },
  { value: 'korea', label: 'Korea (韩国)', icon: '🇰🇷' }
])
const selectedValue = ref<SelectProps['value']>('china')
const multipleValue = ref<SelectProps['value']>(['china'])
</script>
<template>
  <Flex vertical gap="middle" align="start">
    <!-- 单选：optionLabelProp 指定回填字段 vs optionLabel 插槽完全自定义回填节点 -->
    <Space>
      <Select :options="options" v-model:value="selectedValue" option-label-prop="label" :width="220">
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
      </Select>
      <Select :options="options" v-model:value="selectedValue" :width="220">
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
        <template #optionLabel="option">{{ option.icon }} {{ option.label }}</template>
      </Select>
    </Space>
    <!-- 多选：optionLabelProp 指定字段 + tagRender 自定义标签 -->
    <Space>
      <Select
        :options="options"
        v-model:value="multipleValue"
        mode="multiple"
        placeholder="select one country"
        option-label-prop="label"
        :width="320"
      >
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
      </Select>
      <Select
        :options="options"
        v-model:value="multipleValue"
        mode="multiple"
        placeholder="select one country"
        :width="320"
      >
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
        <template #tagRender="{ label, closable, onClose, option }">
          <Tag :closable="closable" color="volcano" style="margin: 2px 3px 2px 0" @close="onClose">
            {{ label }}&nbsp;&nbsp;{{ option.icon }}
          </Tag>
        </template>
      </Select>
    </Space>
  </Flex>
</template>
```

:::

## 下拉面板弹出位置

<Space vertical>
  <Radio :options="placementRadios" v-model:value="placement" button button-style="solid" />
  <Space align="center" :size="24">
    <Select
      :options="cityOptions"
      v-model:value="placementValue"
      :placement="placement"
      :dropdown-match-select-width="200"
    />
    <Select
      :options="cityOptions"
      v-model:value="placementValue"
      :placement="placement"
      :dropdown-match-select-width="200"
      option-filter-prop="label"
      show-search
      allow-clear
    />
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const placement = ref<SelectProps['placement']>('bottomLeft')
const placementRadios = [
  { label: 'topLeft', value: 'topLeft' },
  { label: 'topRight', value: 'topRight' },
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomRight', value: 'bottomRight' }
]
const placementValue = ref<SelectProps['value']>(5)
</script>
<template>
  <Space vertical>
    <Radio :options="placementRadios" v-model:value="placement" button button-style="solid" />
    <Space align="center" :size="24">
      <Select
        :options="options"
        v-model:value="placementValue"
        :placement="placement"
        :dropdown-match-select-width="200"
      />
      <Select
        :options="options"
        v-model:value="placementValue"
        :placement="placement"
        :dropdown-match-select-width="200"
        option-filter-prop="label"
        show-search
        allow-clear
      />
    </Space>
  </Space>
</template>
```

:::

## 下拉面板宽度

_`dropdownMatchSelectWidth` 为 `true` 时与触发器等宽，为数字时指定面板宽度，为 `false` 时按内容自适应_

<br/>

<Space :size="40">
  <Select :options="longOptions" v-model:value="matchWidthValue" :width="160" />
  <Select :options="longOptions" v-model:value="matchWidthValue" :width="160" :dropdown-match-select-width="240" />
  <Select
    :options="adaptiveOptions"
    v-model:value="matchWidthValue"
    :width="160"
    :dropdown-match-select-width="false"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '短', value: 1 },
  { label: '中等长度选项', value: 2 },
  { label: '一段明显更长的选项文本', value: 3 }
])
const longOptions = ref<SelectOption[]>(
  [...Array(10)].map((_, index) => ({ label: `选项 ${index + 1}`, value: index + 1 }))
)
const selectedValue = ref<SelectProps['value']>(1)
</script>
<template>
  <Space :size="40">
    <Select :options="longOptions" v-model:value="selectedValue" :width="160" />
    <Select :options="longOptions" v-model:value="selectedValue" :width="160" :dropdown-match-select-width="240" />
    <Select :options="options" v-model:value="selectedValue" :width="160" :dropdown-match-select-width="false" />
  </Space>
</template>
```

:::

## 下拉面板挂载容器

_不传 `to` 时面板优先挂到最近的承载层内容容器（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body`；设为 `false` 时面板留在原地_

<br/>

<Space>
  <Select :options="longOptions" v-model:value="mountValue" :width="200" />
  <Select :options="longOptions" v-model:value="mountValue" :to="false" :width="200" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>(
  [...Array(10)].map((_, index) => ({ label: `选项 ${index + 1}`, value: index + 1 }))
)
const selectedValue = ref<SelectProps['value']>(1)
</script>
<template>
  <Space>
    <Select :options="options" v-model:value="selectedValue" :width="200" />
    <Select :options="options" v-model:value="selectedValue" :to="false" :width="200" />
  </Space>
</template>
```

:::

## 下拉面板数

_`maxDisplay` 按项数限制面板高度（默认展示 `8` 项），`listHeight` 直接指定像素高度_

<br/>

<Space :size="40">
  <Select :options="longOptions" v-model:value="listHeightValue" />
  <Select :options="longOptions" v-model:value="listHeightValue" :max-display="4" />
  <Select :options="longOptions" v-model:value="listHeightValue" :list-height="160" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>(
  [...Array(10)].map((_, index) => ({ label: `选项 ${index + 1}`, value: index + 1 }))
)
const selectedValue = ref<SelectProps['value']>(1)
</script>
<template>
  <Space :size="40">
    <Select :options="options" v-model:value="selectedValue" />
    <Select :options="options" v-model:value="selectedValue" :max-display="4" />
    <Select :options="options" v-model:value="selectedValue" :list-height="160" />
  </Space>
</template>
```

:::

## 下拉面板滚动条

_通过 `scrollbarProps` 定制面板内滚动条_

<br/>

<Select :options="longOptions" v-model:value="scrollbarValue" :scrollbar-props="{ size: 8, delay: 2000 }" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>(
  [...Array(10)].map((_, index) => ({ label: `选项 ${index + 1}`, value: index + 1 }))
)
const selectedValue = ref<SelectProps['value']>(1)
</script>
<template>
  <Select :options="options" v-model:value="selectedValue" :scrollbar-props="{ size: 8, delay: 2000 }" />
</template>
```

:::

## 自定义下拉面板

_通过 `popupClassName` 自定义面板类名、`dropdownMenuStyle` 设置面板样式，两者均落在 `Teleport` 后的面板上，需写在全局样式中；`zIndex` 用于覆盖面板层级（默认 `1050`）_

<br/>

<Space>
  <Select :options="cityOptions" v-model:value="panelValue" :width="180" />
  <Select
    :options="cityOptions"
    v-model:value="panelValue"
    :width="180"
    popup-class-name="custom-select-panel"
    :dropdown-menu-style="customPanelStyle"
  />
  <Select :options="cityOptions" v-model:value="panelZIndexValue" :width="180" :z-index="1100" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
])
const customPanelStyle = {
  background: 'rgba(255, 105, 0, 0.05)',
  border: '1px solid #ff6900',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(255, 105, 0, 0.25)'
}
const selectedValue = ref<SelectProps['value']>(1)
const zIndexValue = ref<SelectProps['value']>(1)
</script>
<template>
  <Space>
    <Select :options="options" v-model:value="selectedValue" :width="180" />
    <Select
      :options="options"
      v-model:value="selectedValue"
      :width="180"
      popup-class-name="custom-select-panel"
      :dropdown-menu-style="customPanelStyle"
    />
    <Select :options="options" v-model:value="zIndexValue" :width="180" :z-index="1100" />
  </Space>
</template>

<style lang="less">
/* 面板经 Teleport 挂载，scoped 样式无法命中，故用 popupClassName 下发类名 + 全局样式；
   选项规则把类名重复一次以提升特异性，覆盖带 scope 属性的组件内规则 */
@demo-primary: #ff6900;

.custom-select-panel {
  &.custom-select-panel .select-options-panel .select-option {
    color: darken(@demo-primary, 12%);
    font-weight: 500;
  }
  .select-options-panel .select-option.option-hover {
    background: fade(@demo-primary, 10%);
  }
  .select-options-panel .select-option.option-selected {
    color: darken(@demo-primary, 12%);
    background: fade(@demo-primary, 16%);
  }
}
</style>
```

:::

## 扩展菜单

_使用 `dropdownRender` 对下拉菜单自由扩展，`menuNode` 为内置菜单节点_

<br/>

<Select
  v-model:value="addableValue"
  placeholder="custom dropdown render"
  :width="300"
  :options="addableItems.map((item) => ({ value: item }))"
>
  <template #dropdownRender="{ menuNode }">
    <component :is="menuNode" />
    <Divider style="margin: 4px 0" />
    <Space style="padding: 4px 8px">
      <Input v-model:value="addableName" placeholder="Please enter item" />
      <Button type="text" @click="addItem">
        <template #icon><PlusOutlined /></template>
        Add item
      </Button>
    </Space>
  </template>
</Select>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { SelectProps } from 'vue-amazing-ui'
const items = ref(['jack', 'lucy'])
const selectedValue = ref<SelectProps['value']>()
const name = ref('')
let index = 0
function addItem() {
  items.value = [...items.value, name.value || `New item ${(index += 1)}`]
  name.value = ''
}
</script>
<template>
  <Select
    v-model:value="selectedValue"
    placeholder="custom dropdown render"
    :width="300"
    :options="items.map((item) => ({ value: item }))"
  >
    <template #dropdownRender="{ menuNode }">
      <component :is="menuNode" />
      <Divider style="margin: 4px 0" />
      <Space style="padding: 4px 8px">
        <Input v-model:value="name" placeholder="Please enter item" />
        <Button type="text" @click="addItem">
          <template #icon><PlusOutlined /></template>
          Add item
        </Button>
      </Space>
    </template>
  </Select>
</template>
```

:::

## 大数据

_`virtual` 默认开启，只渲染可视区选项；关闭开关后渲染全部 `10` 万项，可对比两者的滚动表现（页面会明显变慢）_

<br/>

<Flex vertical gap="middle" align="start">
  <Flex gap="small" align="center">
    <code>virtual</code>
    <Switch v-model:value="bigDataVirtual" />
  </Flex>
  <Select
    v-model:value="bigDataValue"
    mode="multiple"
    placeholder="Please select"
    :options="bigDataOptions"
    :virtual="bigDataVirtual"
    :width="300"
  />
</Flex>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps } from 'vue-amazing-ui'
// 10 万项数据：label 用「城市 + 6 位序号」而非裸字符串，滚动时更易辨识
const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '重庆']
const options = Array.from({ length: 100000 }, (_, index) => ({
  value: `item-${index + 1}`,
  label: `${cities[index % cities.length]} ${String(index + 1).padStart(6, '0')}`
}))
const value = ref<SelectProps['value']>(['item-10', 'item-12'])
const virtual = ref(true)
</script>
<template>
  <Flex vertical gap="middle" align="start">
    <Flex gap="small" align="center">
      <Switch v-model:value="virtual" />
      <code>virtual</code>
    </Flex>
    <Select
      v-model:value="value"
      mode="multiple"
      placeholder="Please select"
      :options="options"
      :virtual="virtual"
      :width="300"
    />
  </Flex>
</template>
```

:::

## 空数据

_选项为空时展示 `notFoundContent`，传 `null` 时不展开面板_

<br/>

<Space>
  <Select :options="emptyOptions" :width="180" placeholder="默认空态" />
  <Select :options="emptyOptions" :width="180" not-found-content="暂时没有数据" />
  <Select :options="emptyOptions" :width="180" :not-found-content="null" placeholder="不展开面板" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import type { SelectOption } from 'vue-amazing-ui'
const options: SelectOption[] = []
</script>
<template>
  <Space>
    <Select :options="options" :width="180" placeholder="默认空态" />
    <Select :options="options" :width="180" not-found-content="暂时没有数据" />
    <Select :options="options" :width="180" :not-found-content="null" placeholder="不展开面板" />
  </Space>
</template>
```

:::

## APIs

### Select

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value <Tag color="cyan">v-model</Tag> | 当前选中的 `option` 条目值，`mode` 为 `multiple` / `tags` 时为数组；`labelInValue` 开启时为 `{ label, value, key, originLabel }` 对象 | number &#124; string &#124; [SelectLabeledValue](#labeledvalue-type) &#124; (number &#124; string &#124; [SelectLabeledValue](#labeledvalue-type))[] | undefined |
| open | 是否展开下拉菜单（受控，不传时由组件内部维护） | boolean | undefined |
| searchValue | 搜索文本（受控，配对 `update:searchValue`） | string | undefined |
| options | 选项数据 | [SelectOption](#option-type)[] | [] |
| fieldNames | 选项的文本 / 值字段名配置，`options` 为分组子选项的字段名 | `{ label?: string, value?: string, options?: string }` | `{ label: 'label', value: 'value', options: 'options' }` |
| mode | 设置多选模式，`'multiple'` 为多选，`'tags'` 为标签（可输入并创建新条目），不传为单选 | 'multiple' &#124; 'tags' | undefined |
| labelInValue | 是否把每个选项的 label 包装到 value 中，`value` 由原始值变为 `{ label, value, key, originLabel }` 对象 | boolean | false |
| optionLabelProp | 回填到选择框的 `option` 属性值，未指定时取 `label` 字段 | string | undefined |
| width | 选择器宽度，单位 `px` | string &#124; number | 'auto' |
| height | 选择器高度，单位 `px` | number | undefined |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| placeholder | 默认占位文本 | string | '请选择' |
| bordered | 是否有边框 | boolean | true |
| status | 设置校验状态 | 'error' &#124; 'warning' | undefined |
| disabled | 是否禁用 | boolean | false |
| loading | 是否处于加载状态，展开面板时后缀图标变为加载中 | boolean | false |
| allowClear | 是否支持清除 | boolean | false |
| clearIcon | 自定义清除图标 | VNode &#124; (() => VNode) | undefined |
| suffixIcon | 自定义的选择框后缀图标 | VNode &#124; (() => VNode) | undefined |
| showArrow | 是否显示下拉小箭头 | boolean | undefined |
| menuItemSelectedIcon | 自定义当前选中的条目图标 | VNode &#124; (() => VNode) | undefined |
| showSearch | 是否支持搜索；未指定时多选（`multiple` / `tags`）默认开启，单选默认关闭 | boolean | undefined |
| optionFilterProp | 搜索时过滤对应的 `option` 属性，不支持 `children` | string | undefined |
| filterOption | 根据输入项进行筛选：<li>默认为 `true` 时，筛选每个选项 `optionFilterProp` 字段（未传时为 `value`）是否包含输入项，包含返回 `true`，反之返回 `false`</li><li>当其为 `false` 时不筛选，显示全部选项（常用于远程搜索）</li><li>当其为函数 `Function` 时，接受 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`</li> | boolean &#124; ((inputValue: string, option: [SelectOption](#option-type)) => boolean) | true |
| filterSort | 搜索时对筛选结果项的排序函数 | (optionA: [SelectOption](#option-type), optionB: [SelectOption](#option-type)) => number | undefined |
| maxTagCount | 最多显示多少个 `tag`，超出后折叠为省略提示；设为 `'responsive'` 时按容器宽度自动折叠（有性能消耗，不建议在大表单场景下使用） | number &#124; 'responsive' | undefined |
| maxTagPlaceholder | 隐藏 `tag` 时显示的内容，为函数时接收被折叠的选项数组 | string &#124; VNode &#124; ((omittedValues: [SelectOption](#option-type)[]) => VNode) | undefined |
| maxTagTextLength | `tag` 上显示文本的最大长度，超出部分以 `...` 截断 | number | undefined |
| tagRender | 自定义 `tag` 的渲染内容，作用域参数含 `label`（已按 `maxTagTextLength` 截断）/ `value` / `disabled` / `closable` / `onClose` / `option` | (params: { label: unknown, value?: string &#124; number, disabled: boolean, closable: boolean, onClose: (e?: MouseEvent) => void, option: [SelectOption](#option-type) }) => VNode | undefined |
| removeIcon | 自定义 `tag` 的移除图标 | VNode &#124; (() => VNode) | undefined |
| tokenSeparators | 自动分词的分隔符，输入命中后按分隔符拆分并直接选中 | string[] | [] |
| autoClearSearchValue | 多选模式下选中项后是否清空搜索框 | boolean | true |
| autofocus | 是否自动获取焦点 | boolean | false |
| defaultOpen | 是否默认展开下拉菜单（非受控） | boolean | false |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | boolean | true |
| firstActiveValue | 默认高亮的选项 | string &#124; number &#124; (string &#124; number)[] | undefined |
| dropdownRender | 自定义下拉框内容，作用域参数 `menuNode` 为内置菜单节点 | (params: { menuNode: () => VNode[] }) => VNode | undefined |
| notFoundContent | 当下拉列表为空时显示的内容，传 `null` 时不展开空面板 | string &#124; VNode &#124; null | undefined |
| maxDisplay | 下拉面板最多能展示的项数，超过后滚动显示 | number | 8 |
| listHeight | 下拉面板滚动高度，单位 `px`（未传时回落 `maxDisplay × 32`） | number | undefined |
| virtual | 是否开启虚拟滚动，大数据量时仅渲染可视区选项（`dropdownMatchSelectWidth` 为 `false` 时自动关闭） | boolean | true |
| listItemHeight | 虚拟滚动的列表项高度，单位 `px`，需与选项实际行高一致（自定义选项高矮时调整） | number | 32 |
| scrollbarProps | 下拉面板滚动条 `scrollbar` 组件属性配置，参考 [Scrollbar Props](./scrollbar.md#scrollbar) | [ScrollbarProps](./scrollbar.md#scrollbar) | {} |
| placement | 下拉面板弹出位置 | 'bottomLeft' &#124; 'bottomRight' &#124; 'topLeft' &#124; 'topRight' | 'bottomLeft' |
| flip | 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true |
| to | 下拉面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 `'body'`) 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | undefined |
| popupClassName | 下拉面板的类名，用于自定义面板样式 | string | undefined |
| dropdownMenuStyle | 下拉面板自定义样式，可覆盖定位（与 `AutoComplete` 的同名属性语义一致） | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽，为数字时指定下拉菜单宽度（单位 `px`），为 `false` 时按内容自适应 | boolean &#124; number | true |
| zIndex | 下拉面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |
| id | 组件 id，用于 `aria-controls` / `aria-activedescendant` 关联，未传时内部生成 | string | undefined |

### Option Type

| 名称              | 说明                          | 类型                | 默认值    |
| :----------------- | :----------------------------- | :------------------- | :-------- |
| label?            | 选项名                        | string              | undefined |
| value?            | 选项值                        | string &#124; number | undefined |
| disabled?         | 是否禁用选项                  | boolean             | false     |
| [propName: string] | 用于包含带有任意数量的其他属性，`#option` 插槽会透传原始数据对象 | any                 | undefined |

### LabeledValue Type

<br/>

`labelInValue` 开启时 `value` 的元素类型（入口导出名 `SelectLabeledValue`）：

| 名称          | 说明                                                                     | 类型                  | 默认值    |
| :------------ | :----------------------------------------------------------------------- | :-------------------- | :-------- |
| label         | 选项文本（子组件式写法下由默认插槽求值而来，可能为 `string` 或 `VNode[]`） | unknown               | undefined |
| value         | 选项值                                                                   | string &#124; number  | undefined |
| key?          | 选项唯一键，缺省时与 `value` 一致                                        | string &#124; number  | undefined |
| originLabel?  | 原始选项文本（子组件式写法下为默认插槽函数）                             | unknown               | undefined |

### SelectOption

<br/>

`<Select>` 默认插槽中的选项子组件（配置式写法请用 [SelectOption](#option-type) 数据）：

| 参数               | 说明                                                                                                | 类型                 | 默认值    |
| :----------------- | :-------------------------------------------------------------------------------------------------- | :------------------- | :-------- |
| value              | 选项值，未传时回落 `<SelectOption>` 的 `key`                                                        | string &#124; number | undefined |
| label              | 选项文本，优先于默认插槽文本                                                                        | string               | undefined |
| disabled           | 是否禁用该选项（`<SelectOption disabled />` 亦可）                                                  | boolean              | false     |
| [propName: string] | 用于包含带有任意数量的其他属性，`#option` 插槽会透传原始数据对象                                    | any                  | undefined |

### SelectOptGroup

<br/>

`<Select>` 默认插槽中的分组子组件，组内书写 `SelectOption`：

| 参数  | 说明                    | 类型   | 默认值    |
| :---- | :---------------------- | :----- | :-------- |
| label | 分组标题，优先于 `#label` 插槽 | string | undefined |

> ℹ️ `options` 与默认插槽（子组件）同时提供时，本库**以子组件为准**，沿用本库「插槽优先于 `prop`」的统一约定。

## Events

| 名称                  | 说明                             | 类型                                                                             |
| :--------------------- | :-------------------------------- | :------------------------------------------------------------------------------- |
| change                | 选项值改变后的回调，多选（`multiple` / `tags`）下 `value` / `option` 为数组且第 3 参为 `undefined` | (value: string &#124; number &#124; (string &#124; number)[], option: [SelectOption](#option-type) &#124; [SelectOption](#option-type)[], index: number &#124; undefined) => void |
| deselect              | 移除已选项（`tag`）时回调        | (value: string &#124; number, option: [SelectOption](#option-type)) => void      |
| select                | 选中选项时回调                   | (value: string &#124; number, option: [SelectOption](#option-type)) => void                |
| clear                 | 清除时的回调                     | () => void                                                                       |
| search                | 搜索文本变化时回调（`tokenSeparators` 分词命中后清空输入不触发） | (value: string) => void                                                          |
| focus                 | 获得焦点时的回调                 | () => void                                                                       |
| blur                  | 失去焦点时的回调                 | () => void                                                                       |
| openChange            | 下拉菜单展开收起的回调（与 `dropdownVisibleChange` 为同一事件的两个名称，同参同时派发） | (open: boolean) => void                                                          |
| dropdownVisibleChange | 下拉菜单展开收起的回调，`openChange` 的别名 | (open: boolean) => void                                                          |
| popupScroll           | 下拉列表滚动时的回调             | (e: Event) => void                                                               |
| mouseenter            | 鼠标移入时的回调                 | (e: MouseEvent) => void                                                          |
| mouseleave            | 鼠标移出时的回调                 | (e: MouseEvent) => void                                                          |
| inputKeyDown          | 输入框按下键时的回调             | (e: KeyboardEvent) => void                                                       |
| update:searchValue    | 搜索文本变化时同步（配合 `searchValue` 受控） | (value: string) => void                                              |

## Slots

| 名称                 | 说明                                                                     | 用法                                                |
| :-------------------- | :------------------------------------------------------------------------ | :-------------------------------------------------- |
| default              | 子组件式选项，直接书写 `SelectOption` / `SelectOptGroup`；与 `options` 同时提供时以此为准 | v-slot:default                                      |
| option               | 自定义选项内容，作用域为当前选项数据，[SelectOption](#option-type) 的自定义字段会一并透传 | v-slot:option="{ label, value, ...rest }"           |
| optionLabel          | 自定义回填到选择框的内容，作用域为当前选中项数据                          | v-slot:optionLabel="{ label, value, ...rest }"      |
| placeholder          | 自定义占位内容                                                           | v-slot:placeholder                                  |
| suffixIcon           | 自定义的选择框后缀图标                                                   | v-slot:suffixIcon                                   |
| clearIcon            | 自定义清除图标，作用域参数 `clear` 为清除方法                             | v-slot:clearIcon="{ clear }"                        |
| menuItemSelectedIcon | 自定义当前选中的条目图标，作用域参数 `isSelected` 标识该项是否被选中       | v-slot:menuItemSelectedIcon="{ isSelected }"        |
| notFoundContent      | 自定义空数据内容                                                         | v-slot:notFoundContent                              |
| dropdownRender       | 自定义下拉框内容，作用域参数 `menuNode` 为内置菜单节点                     | v-slot:dropdownRender="{ menuNode }"                |
| tagRender            | 自定义 `tag` 的渲染内容，作用域参数同 `tagRender` 属性                     | v-slot:tagRender="{ label, value, disabled, closable, onClose, option }" |
| maxTagPlaceholder    | 隐藏 `tag` 时显示的内容，作用域参数 `omittedValues` 为被折叠的选项数组（本库统一以具名参数对象传参） | v-slot:maxTagPlaceholder="{ omittedValues }"        |
| removeIcon           | 自定义 `tag` 的移除图标                                                   | v-slot:removeIcon                                   |

## Methods

| 名称     | 说明                                           | 类型                                                                  |
| :-------- | :---------------------------------------------- | :-------------------------------------------------------------------- |
| focus    | 获取输入框焦点                                 | () => void                                                            |
| blur     | 使输入框失去焦点                               | () => void                                                            |
| scrollTo | 滚动面板选项：传数字按下标定位，传对象按顶部偏移定位 | (arg: number &#124; { index?: number; top?: number }) => void          |
