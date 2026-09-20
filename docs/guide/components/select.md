# 选择器 Select

<GlobalElement />

_下拉选择器_

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时
- 当选项少时（少于 `5` 项），建议直接将选项平铺，使用 `Radio` 是更好的选择

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { CheckOutlined, MehOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons-vue'
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
// 三种尺寸
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
// 联动
const provinceData = ['Zhejiang', 'Jiangsu']
const cityData: Record<string, string[]> = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
}
const province = ref(provinceData[0])
const secondCity = ref(cityData[province.value][0])
const cities = computed(() => cityData[province.value])
watch(province, (value) => {
  secondCity.value = cityData[value][0]
})
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
// 后缀图标
const suffixValue = ref<SelectProps['value']>('lucy')
const suffixOptions: SelectOption[] = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' }
]
// 扩展菜单
const addableItems = ref(['jack', 'lucy'])
const addableValue = ref<SelectProps['value']>()
const addableName = ref('')
let addableIndex = 0
function addItem() {
  addableItems.value = [...addableItems.value, addableName.value || `New item ${(addableIndex += 1)}`]
  addableName.value = ''
}
// 定制回填内容
const countryValue = ref<SelectProps['value']>('china')
const countryOptions: SelectOption[] = [
  { value: 'china', label: 'China (中国)', icon: '🇨🇳' },
  { value: 'usa', label: 'USA (美国)', icon: '🇺🇸' },
  { value: 'japan', label: 'Japan (日本)', icon: '🇯🇵' },
  { value: 'korea', label: 'Korea (韩国)', icon: '🇰🇷' }
]
// 自定义字段名
const fieldOptions = [
  { id: 'jack', name: 'Jack' },
  { id: 'lucy', name: 'Lucy' },
  { id: 'disabled', name: 'Disabled', disabled: true },
  { id: 'yiminghe', name: 'Yiminghe' }
]
const fieldValue = ref<SelectProps['value']>('lucy')
const fieldNames = { label: 'name', value: 'id' }
// 弹出位置
const placement = ref<SelectProps['placement']>('bottomLeft')
const placementOptions: SelectOption[] = [
  { value: 'HangZhou', label: 'HangZhou #310000' },
  { value: 'NingBo', label: 'NingBo #315000' },
  { value: 'WenZhou', label: 'WenZhou #325000' }
]
const placementValue = ref<SelectProps['value']>('HangZhou')
const placementRadios = [
  { label: 'topLeft', value: 'topLeft' },
  { label: 'topRight', value: 'topRight' },
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomRight', value: 'bottomRight' }
]
// 自定义状态
const statusValue = ref<SelectProps['value']>(1)
// 禁用 / 禁用选项 / 支持清除 / 键盘操作 / 自定义尺寸 / 自定义选中标识
const cityOptions: SelectOption[] = [
  { label: '北京市', value: 1 },
  { label: '上海市', value: 2 },
  { label: '纽约市', value: 3 },
  { label: '旧金山', value: 4 },
  { label: '伊斯坦布尔', value: 5 },
  { label: '君士坦丁堡', value: 6 }
]
const cityOptionsDisabled: SelectOption[] = cityOptions.map((option, index) =>
  index === 1 ? { ...option, disabled: true } : option
)
const disabledValue = ref<SelectProps['value']>(5)
const disabledOptionValue = ref<SelectProps['value']>(5)
const clearableValue = ref<SelectProps['value']>(5)
const keyboardValue = ref<SelectProps['value']>(5)
const customSizeValue = ref<SelectProps['value']>(5)
const stateIconValue = ref<SelectProps['value']>(5)
// 下拉面板宽度 / 挂载容器 / 面板数 / 滚动条 / 自定义面板 / 无边框 / 受控展开 / 空数据
const longOptions: SelectOption[] = [...Array(10)].map((_, index) => ({ label: `选项 ${index + 1}`, value: index + 1 }))
// 选项文本长短不一，用于验证 dropdownMatchSelectWidth 为 false 时面板按内容自适应
const adaptiveOptions: SelectOption[] = [
  { label: '短', value: 1 },
  { label: '中等长度选项', value: 2 },
  { label: '一段明显更长的选项文本', value: 3 }
]
const matchWidthValue = ref<SelectProps['value']>(1)
const mountValue = ref<SelectProps['value']>(1)
const listHeightValue = ref<SelectProps['value']>(1)
const scrollbarValue = ref<SelectProps['value']>(1)
const panelValue = ref<SelectProps['value']>(1)
const panelZIndexValue = ref<SelectProps['value']>(1)
// 自定义面板外观：经 dropdownMenuStyle 传入
const customPanelStyle = {
  background: 'rgba(255, 105, 0, 0.05)',
  border: '1px solid #ff6900',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(255, 105, 0, 0.25)'
}
const borderlessValue = ref<SelectProps['value']>(1)
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
// 空数据
const emptyOptions: SelectOption[] = []
</script>

## 基本使用

<Select :options="basicOptions" v-model:value="basicValue" :width="120" @change="onBasicChange" @focus="onBasicFocus" />

:::: details Show Code

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

::::

## 三种尺寸

<Space vertical>
  <Radio :options="sizeRadios" v-model:value="size" button button-style="solid" />
  <Select :options="sizeOptions" v-model:value="sizeValue" :size="size" :width="200" @popup-scroll="onPopupScroll" />
</Space>

:::: details Show Code

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
    <Select :options="sizeOptions" v-model:value="selectedValue" :size="size" :width="200" @popup-scroll="onPopupScroll" />
  </Space>
</template>
```

::::

## 联动

<Space>
  <Select :options="provinceData.map((pro) => ({ value: pro }))" v-model:value="province" :width="120" />
  <Select :options="cities.map((city) => ({ value: city }))" v-model:value="secondCity" :width="120" />
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
const provinceData = ['Zhejiang', 'Jiangsu']
const cityData: Record<string, string[]> = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
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

::::

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

:::: details Show Code

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

::::

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

:::: details Show Code

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

::::

## 后缀图标

<Space>
  <Select :options="suffixOptions" v-model:value="suffixValue" :width="120">
    <template #suffixIcon><SmileOutlined class="select-suffix" /></template>
  </Select>
  <Select :options="suffixOptions" v-model:value="suffixValue" :width="120" disabled>
    <template #suffixIcon><MehOutlined class="select-suffix" /></template>
  </Select>
</Space>

:::: details Show Code

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

::::

## 扩展菜单

*使用 `dropdownRender` 对下拉菜单自由扩展，`menuNode` 为内置菜单节点*

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

:::: details Show Code

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

::::

## 定制回填内容

*使用 `optionLabelProp` 指定回填到选择框的 `option` 字段；`optionLabel` 插槽可完全自定义回填节点*

<br/>

<Space vertical>
  <Select :options="countryOptions" v-model:value="countryValue" option-label-prop="label" :width="220">
    <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
  </Select>
  <Select :options="countryOptions" v-model:value="countryValue" :width="220">
    <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
    <template #optionLabel="option">{{ option.icon }} {{ option.label }}</template>
  </Select>
</Space>

:::: details Show Code

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
</script>
<template>
  <Space vertical>
    <Select :options="options" v-model:value="selectedValue" option-label-prop="label" :width="220">
      <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
    </Select>
    <Select :options="options" v-model:value="selectedValue" :width="220">
      <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
      <template #optionLabel="option">{{ option.icon }} {{ option.label }}</template>
    </Select>
  </Space>
</template>
```

::::

## 自定义字段名

*通过 `fieldNames` 指定选项的文本字段与值字段*

<br/>

<Select :options="fieldOptions" :field-names="fieldNames" v-model:value="fieldValue" :width="120" />

:::: details Show Code

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
</script>
<template>
  <Select :options="options" :field-names="fieldNames" v-model:value="selectedValue" :width="120" />
</template>
```

::::

## 弹出位置

<Radio :options="placementRadios" v-model:value="placement" button button-style="solid" />
<Select
  :options="placementOptions"
  v-model:value="placementValue"
  :placement="placement"
  :dropdown-match-select-width="false"
  :width="120"
/>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectProps, SelectOption } from 'vue-amazing-ui'
const options = ref<SelectOption[]>([
  { value: 'HangZhou', label: 'HangZhou #310000' },
  { value: 'NingBo', label: 'NingBo #315000' },
  { value: 'WenZhou', label: 'WenZhou #325000' }
])
const placement = ref<SelectProps['placement']>('bottomLeft')
const placementRadios = [
  { label: 'topLeft', value: 'topLeft' },
  { label: 'topRight', value: 'topRight' },
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomRight', value: 'bottomRight' }
]
const selectedValue = ref<SelectProps['value']>('HangZhou')
</script>
<template>
  <Radio :options="placementRadios" v-model:value="placement" button button-style="solid" />
  <Select
    :options="options"
    v-model:value="selectedValue"
    :placement="placement"
    :dropdown-match-select-width="false"
    :width="120"
  />
</template>
```

::::

## 自定义状态

*`status` 可选 `error` 或 `warning`*

<br/>

<Space vertical>
  <Select :options="cityOptions" v-model:value="statusValue" status="error" />
  <Select :options="cityOptions" v-model:value="statusValue" status="warning" />
</Space>

:::: details Show Code

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
  <Space vertical>
    <Select :options="options" v-model:value="selectedValue" status="error" />
    <Select :options="options" v-model:value="selectedValue" status="warning" />
  </Space>
</template>
```

::::

## 禁用

<Select :options="cityOptions" v-model:value="disabledValue" disabled />

:::: details Show Code

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

::::

## 禁用选项

<Select :options="cityOptionsDisabled" v-model:value="disabledOptionValue" />

:::: details Show Code

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

::::

## 支持清除

<Select :options="cityOptions" v-model:value="clearableValue" allow-clear />

:::: details Show Code

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

::::

## 键盘操作

*聚焦后按 `↑` `↓` 移动高亮（自动跳过禁用项、到达列表端点时环形回绕并滚入可视区），按 `Enter` 选中，按 `Esc` 关闭面板；面板收起时按 `↑` `↓` 可直接展开*

<br/>

| 按键 | 说明 |
| :-- | :-- |
| `↑` / `↓` | 上下移动高亮项（自动跳过禁用项，到达列表端点时环形回绕，并随面板滚动到可视区） |
| `Enter` | 选中当前高亮项 |
| `Esc` | 关闭面板，不改变当前选中值 |
| `Tab` | 焦点移出，面板关闭 |

<Select :options="cityOptionsDisabled" v-model:value="keyboardValue" />

:::: details Show Code

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

::::

## 自定义尺寸

<Space>
  <Select :options="cityOptions" v-model:value="customSizeValue" :width="150" :height="36" show-search allow-clear />
  <Select :options="cityOptions" v-model:value="customSizeValue" :width="220" :height="44" />
</Space>

:::: details Show Code

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
  <Space>
    <Select :options="options" v-model:value="selectedValue" :width="150" :height="36" show-search allow-clear />
    <Select :options="options" v-model:value="selectedValue" :width="220" :height="44" />
  </Space>
</template>
```

::::

## 下拉面板宽度

*`dropdownMatchSelectWidth` 为 `true` 时与触发器等宽，为数字时指定面板宽度，为 `false` 时按内容自适应*

<br/>

<Space align="start" :size="40">
  <Select :options="longOptions" v-model:value="matchWidthValue" :width="160" />
  <Select :options="longOptions" v-model:value="matchWidthValue" :width="160" :dropdown-match-select-width="240" />
  <Select
    :options="adaptiveOptions"
    v-model:value="matchWidthValue"
    :width="160"
    :dropdown-match-select-width="false"
  />
</Space>

:::: details Show Code

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
  <Space align="start" :size="40">
    <Select :options="longOptions" v-model:value="selectedValue" :width="160" />
    <Select :options="longOptions" v-model:value="selectedValue" :width="160" :dropdown-match-select-width="240" />
    <Select :options="options" v-model:value="selectedValue" :width="160" :dropdown-match-select-width="false" />
  </Space>
</template>
```

::::

## 下拉面板挂载容器

*不传 `to` 时面板优先挂到最近的承载层内容容器（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body`；设为 `false` 时面板留在原地*

<br/>

<Space>
  <Select :options="longOptions" v-model:value="mountValue" :width="200" />
  <Select :options="longOptions" v-model:value="mountValue" :to="false" :width="200" />
</Space>

:::: details Show Code

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

::::

## 下拉面板数

*`maxDisplay` 按项数限制面板高度（默认展示 `8` 项），`listHeight` 直接指定像素高度*

<br/>

<Space align="start" :size="40">
  <Select :options="longOptions" v-model:value="listHeightValue" />
  <Select :options="longOptions" v-model:value="listHeightValue" :max-display="4" />
  <Select :options="longOptions" v-model:value="listHeightValue" :list-height="160" />
</Space>

:::: details Show Code

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
  <Space align="start" :size="40">
    <Select :options="options" v-model:value="selectedValue" />
    <Select :options="options" v-model:value="selectedValue" :max-display="4" />
    <Select :options="options" v-model:value="selectedValue" :list-height="160" />
  </Space>
</template>
```

::::

## 下拉面板滚动条

*通过 `scrollbarProps` 定制面板内滚动条*

<br/>

<Select :options="longOptions" v-model:value="scrollbarValue" :scrollbar-props="{ size: 8, delay: 2000 }" />

:::: details Show Code

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

::::

## 自定义下拉面板

*通过 `popupClassName` 自定义面板类名、`dropdownMenuStyle` 设置面板样式，两者均落在 `Teleport` 后的面板上，需写在全局样式中；`zIndex` 用于覆盖面板层级（默认 1050）*

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

:::: details Show Code

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

::::

## 无边框

<Space>
  <Select :options="cityOptions" v-model:value="borderlessValue" :bordered="false" />
  <Select :options="cityOptions" v-model:value="borderlessValue" :bordered="false" disabled />
</Space>

:::: details Show Code

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
    <Select :options="options" v-model:value="selectedValue" :bordered="false" />
    <Select :options="options" v-model:value="selectedValue" :bordered="false" disabled />
  </Space>
</template>
```

::::

## 受控展开

*`open` 受控时面板显隐由外部驱动，配合 `dropdownVisibleChange` 同步开合*

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

:::: details Show Code

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

::::

## 自定义选中标识

*通过 `menuItemSelectedIcon` 插槽自定义选中项的标识图标，单选模式默认不展示*

<br/>

<Select :options="cityOptions" v-model:value="stateIconValue" :width="180">
  <template #menuItemSelectedIcon="{ isSelected }">
    <CheckOutlined v-if="isSelected" style="color: #ff6900" />
  </template>
</Select>

:::: details Show Code

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

::::

## 空数据

*选项为空时展示 `notFoundContent`，传 `null` 时不展开面板*

<br/>

<Space>
  <Select :options="emptyOptions" placeholder="默认空态" />
  <Select :options="emptyOptions" not-found-content="暂时没有数据" />
  <Select :options="emptyOptions" :not-found-content="null" placeholder="不展开面板" />
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import type { SelectOption } from 'vue-amazing-ui'
const options: SelectOption[] = []
</script>
<template>
  <Space>
    <Select :options="options" placeholder="默认空态" />
    <Select :options="options" not-found-content="暂时没有数据" />
    <Select :options="options" :not-found-content="null" placeholder="不展开面板" />
  </Space>
</template>
```

::::

## APIs

### Select

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| allowClear | 是否支持清除 | boolean | false |
| autofocus | 是否自动获取焦点 | boolean | false |
| bordered | 是否有边框 | boolean | true |
| clearIcon | 自定义清除图标 | VNode &#124; (() => VNode) | undefined |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | boolean | true |
| defaultOpen | 是否默认展开下拉菜单 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽，为数字时指定下拉菜单宽度（单位 `px`），为 `false` 时按内容自适应 | boolean &#124; number | true |
| dropdownMenuStyle | 下拉面板自定义样式，可覆盖定位（与 `AutoComplete` 的同名属性语义一致） | [CSSProperties](https://cn.vuejs.org/api/utility-types.html#cssproperties) | undefined |
| dropdownRender | 自定义下拉框内容，作用域参数 `menuNode` 为内置菜单节点 | (params: { menuNode: () => VNode[] }) => VNode | undefined |
| fieldNames | 选项的文本 / 值字段名配置 | `{ label?: string, value?: string, options?: string }` | `{ label: 'label', value: 'value' }` |
| filterOption | 根据输入项进行筛选：<li>默认为 `true` 时，筛选每个选项 `optionFilterProp` 字段（未传时为 `value`）是否包含输入项，包含返回 `true`，反之返回 `false`</li><li>当其为 `false` 时不筛选，显示全部选项（常用于远程搜索）</li><li>当其为函数 `Function` 时，接受 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`</li> | boolean &#124; ((inputValue: string, option: [SelectOption](#option-type)) => boolean) | true |
| filterSort | 搜索时对筛选结果项的排序函数 | (optionA: [SelectOption](#option-type), optionB: [SelectOption](#option-type)) => number | undefined |
| firstActiveValue | 默认高亮的选项 | string &#124; number &#124; (string &#124; number)[] | undefined |
| flip | 下拉面板被浏览器窗口或最近可滚动父元素遮挡时自动调整弹出位置 | boolean | true |
| height | 选择器高度，单位 `px` | number | undefined |
| listHeight | 下拉面板滚动高度，单位 `px`（未传时回落 `maxDisplay × 32`） | number | undefined |
| loading | 是否处于加载状态，展开面板时后缀图标变为加载中 | boolean | false |
| maxDisplay | 下拉面板最多能展示的项数，超过后滚动显示 | number | 8 |
| menuItemSelectedIcon | 自定义当前选中的条目图标 | VNode &#124; (() => VNode) | undefined |
| notFoundContent | 当下拉列表为空时显示的内容，传 `null` 时不展开空面板 | string &#124; VNode &#124; null | undefined |
| open | 是否展开下拉菜单（受控） | boolean | undefined |
| optionFilterProp | 搜索时过滤对应的 `option` 属性，不支持 `children` | string | undefined |
| optionLabelProp | 回填到选择框的 `option` 属性值，未指定时取 `label` 字段 | string | undefined |
| options | 选项数据 | [SelectOption](#option-type)[] | [] |
| placeholder | 默认占位文本 | string | '请选择' |
| placement | 下拉面板弹出位置 | 'bottomLeft' &#124; 'bottomRight' &#124; 'topLeft' &#124; 'topRight' | 'bottomLeft' |
| popupClassName | 下拉面板的类名，用于自定义面板样式 | string | undefined |
| scrollbarProps | 下拉面板滚动条 `scrollbar` 组件属性配置，参考 [Scrollbar Props](./scrollbar.md#scrollbar) | [ScrollbarProps](./scrollbar.md#scrollbar) | {} |
| searchValue | 控制搜索文本（受控） | string | undefined |
| showArrow | 是否显示下拉小箭头 | boolean | undefined |
| showSearch | 是否支持搜索 | boolean | false |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| status | 设置校验状态 | 'error' &#124; 'warning' | undefined |
| suffixIcon | 自定义的选择框后缀图标 | VNode &#124; (() => VNode) | undefined |
| to | 下拉面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 `'body'`) 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | undefined |
| value <Tag color="cyan">v-model</Tag> | 当前选中的 `option` 条目值 | number &#124; string | undefined |
| width | 选择器宽度，单位 `px` | string &#124; number | 'auto' |
| zIndex | 下拉面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |

### Option Type

| 名称              | 说明                          | 类型                | 默认值    |
| :----------------- | :----------------------------- | :------------------- | :-------- |
| label?            | 选项名                        | string              | undefined |
| value?            | 选项值                        | string &#124; number | undefined |
| disabled?         | 是否禁用选项                  | boolean             | false     |
| [propName: string] | 用于包含带有任意数量的其他属性，`#option` 插槽会透传原始数据对象 | any                 | undefined |

## Events

| 名称                  | 说明                             | 类型                                                                             |
| :--------------------- | :-------------------------------- | :------------------------------------------------------------------------------- |
| change                | 选项值改变后的回调               | (value: string &#124; number, option: [SelectOption](#option-type), index: number) => void |
| select                | 选中选项时回调                   | (value: string &#124; number, option: [SelectOption](#option-type)) => void                |
| clear                 | 清除时的回调                     | () => void                                                                       |
| search                | 搜索文本变化时回调               | (value: string) => void                                                          |
| focus                 | 获得焦点时的回调                 | () => void                                                                       |
| blur                  | 失去焦点时的回调                 | () => void                                                                       |
| openChange            | 下拉菜单展开收起的回调           | (open: boolean) => void                                                          |
| dropdownVisibleChange | 下拉菜单展开收起的回调           | (open: boolean) => void                                                          |
| popupScroll           | 下拉列表滚动时的回调             | () => void                                                                       |
| mouseenter            | 鼠标移入时的回调                 | () => void                                                                       |
| mouseleave            | 鼠标移出时的回调                 | () => void                                                                       |
| inputKeyDown          | 输入框按下键时的回调             | (e: KeyboardEvent) => void                                                       |
| update:searchValue    | 搜索文本变化时同步（配合 `searchValue` 受控） | (value: string) => void                                              |

## Slots

| 名称                 | 说明                                                                     | 类型                                                |
| :-------------------- | :------------------------------------------------------------------------ | :-------------------------------------------------- |
| option               | 自定义选项内容，作用域为当前选项数据，[SelectOption](#option-type) 的自定义字段会一并透传 | v-slot:option="{ label, value, ...rest }"           |
| optionLabel          | 自定义回填到选择框的内容，作用域为当前选中项数据                          | v-slot:optionLabel="{ label, value, ...rest }"      |
| placeholder          | 自定义占位内容                                                           | v-slot:placeholder                                  |
| suffixIcon           | 自定义的选择框后缀图标                                                   | v-slot:suffixIcon                                   |
| clearIcon            | 自定义清除图标，作用域参数 `clear` 为清除方法                             | v-slot:clearIcon="{ clear }"                        |
| menuItemSelectedIcon | 自定义当前选中的条目图标，作用域参数 `isSelected` 标识该项是否被选中       | v-slot:menuItemSelectedIcon="{ isSelected }"        |
| notFoundContent      | 自定义空数据内容                                                         | v-slot:notFoundContent                              |
| dropdownRender       | 自定义下拉框内容，作用域参数 `menuNode` 为内置菜单节点                     | v-slot:dropdownRender="{ menuNode }"                |

## Methods

| 名称     | 说明                                           | 类型                                                                  |
| :-------- | :---------------------------------------------- | :-------------------------------------------------------------------- |
| focus    | 获取输入框焦点                                 | () => void                                                            |
| blur     | 使输入框失去焦点                               | () => void                                                            |
| scrollTo | 滚动面板选项：传数字按下标定位，传对象按顶部偏移定位 | (arg: number &#124; { index?: number; top?: number }) => void          |
