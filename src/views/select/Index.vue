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
// 三种尺寸 / 弹出位置的切换项
const sizeRadios = [
  { label: 'large', value: 'large' },
  { label: 'middle', value: 'middle' },
  { label: 'small', value: 'small' }
]
// 空数据
const emptyOptions: SelectOption[] = []
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space vertical>
      <Select
        :options="basicOptions"
        v-model:value="basicValue"
        :width="120"
        @change="onBasicChange"
        @focus="onBasicFocus"
      />
      <Select :options="basicOptions" v-model:value="basicValue" :width="120" disabled />
      <Select :options="basicOptions" v-model:value="basicValue" :width="120" loading />
    </Space>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Flex vertical gap="middle" align="start">
      <Radio :options="sizeRadios" v-model:value="size" button button-style="solid" />
      <Select
        :options="sizeOptions"
        v-model:value="sizeValue"
        :size="size"
        :width="200"
        @popup-scroll="onPopupScroll"
      />
    </Flex>
    <h2 class="mt30 mb10">联动</h2>
    <Space>
      <Select :options="provinceData.map((pro) => ({ value: pro }))" v-model:value="province" :width="120" />
      <Select :options="cities.map((city) => ({ value: city }))" v-model:value="secondCity" :width="120" />
    </Space>
    <h2 class="mt30 mb10">搜索框</h2>
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
    <h2 class="mt30 mb10">带搜索框</h2>
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
    <h2 class="mt30 mb10">后缀图标</h2>
    <Space>
      <Select :options="suffixOptions" v-model:value="suffixValue" :width="120">
        <template #suffixIcon><SmileOutlined class="select-suffix" /></template>
      </Select>
      <Select :options="suffixOptions" v-model:value="suffixValue" :width="120" disabled>
        <template #suffixIcon><MehOutlined class="select-suffix" /></template>
      </Select>
    </Space>
    <h2 class="mt30 mb10">扩展菜单</h2>
    <p class="mb10">使用 <code>dropdownRender</code> 对下拉菜单自由扩展，<code>menuNode</code> 为内置菜单节点</p>
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
    <h2 class="mt30 mb10">定制回填内容</h2>
    <p class="mb10">
      使用 <code>optionLabelProp</code> 指定回填到选择框的 <code>option</code> 字段；<code>optionLabel</code>
      插槽可完全自定义回填节点
    </p>
    <Space vertical>
      <Select :options="countryOptions" v-model:value="countryValue" option-label-prop="label" :width="220">
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
      </Select>
      <Select :options="countryOptions" v-model:value="countryValue" :width="220">
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
        <template #optionLabel="option">{{ option.icon }} {{ option.label }}</template>
      </Select>
    </Space>
    <h2 class="mt30 mb10">自定义字段名</h2>
    <p class="mb10">通过 <code>fieldNames</code> 指定选项的文本字段与值字段</p>
    <Select :options="fieldOptions" :field-names="fieldNames" v-model:value="fieldValue" :width="120" />
    <h2 class="mt30 mb10">弹出位置</h2>
    <Flex vertical gap="middle" align="start">
      <Radio :options="placementRadios" v-model:value="placement" button button-style="solid" />
      <Select
        :options="placementOptions"
        v-model:value="placementValue"
        :placement="placement"
        :dropdown-match-select-width="false"
        :width="120"
      />
    </Flex>
    <h2 class="mt30 mb10">自定义状态</h2>
    <p class="mb10"><code>status</code> 可选 <code>error</code> 或 <code>warning</code></p>
    <Space vertical>
      <Select :options="cityOptions" v-model:value="statusValue" status="error" />
      <Select :options="cityOptions" v-model:value="statusValue" status="warning" />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Select :options="cityOptions" v-model:value="disabledValue" disabled />
    <h2 class="mt30 mb10">禁用选项</h2>
    <Select :options="cityOptionsDisabled" v-model:value="disabledOptionValue" />
    <h2 class="mt30 mb10">支持清除</h2>
    <Select :options="cityOptions" v-model:value="clearableValue" allow-clear />
    <h2 class="mt30 mb10">键盘操作</h2>
    <p class="mb10">
      聚焦后按 <code>↑</code> <code>↓</code> 移动高亮（自动跳过禁用项、到达列表端点时环形回绕并滚入可视区），按
      <code>Enter</code> 选中，按 <code>Esc</code> 关闭面板；面板收起时按 <code>↑</code> <code>↓</code> 可直接展开
    </p>
    <Select :options="cityOptionsDisabled" v-model:value="keyboardValue" />
    <h2 class="mt30 mb10">自定义尺寸</h2>
    <Space>
      <Select
        :options="cityOptions"
        v-model:value="customSizeValue"
        :width="150"
        :height="36"
        show-search
        allow-clear
      />
      <Select :options="cityOptions" v-model:value="customSizeValue" :width="220" :height="44" />
    </Space>
    <h2 class="mt30 mb10">下拉面板宽度</h2>
    <p class="mb10">
      <code>dropdownMatchSelectWidth</code> 为 <code>true</code> 时与触发器等宽，为数字时指定面板宽度，为
      <code>false</code> 时按内容自适应
    </p>
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
    <h2 class="mt30 mb10">下拉面板挂载容器</h2>
    <p class="mb10">
      不传 <code>to</code> 时面板优先挂到最近的承载层内容容器（<code>Modal</code> / <code>Drawer</code> /
      <code>Dialog</code> 卡片或上层浮层面板），无承载层时为 <code>body</code>；设为 <code>false</code> 时面板留在原地
    </p>
    <Space>
      <Select :options="longOptions" v-model:value="mountValue" :width="200" />
      <Select :options="longOptions" v-model:value="mountValue" :to="false" :width="200" />
    </Space>
    <h2 class="mt30 mb10">下拉面板数</h2>
    <p class="mb10">
      <code>maxDisplay</code> 按项数限制面板高度（默认展示 <code>8</code> 项），<code>listHeight</code> 直接指定像素高度
    </p>
    <Space align="start" :size="40">
      <Select :options="longOptions" v-model:value="listHeightValue" />
      <Select :options="longOptions" v-model:value="listHeightValue" :max-display="4" />
      <Select :options="longOptions" v-model:value="listHeightValue" :list-height="160" />
    </Space>
    <h2 class="mt30 mb10">下拉面板滚动条</h2>
    <p class="mb10">通过 <code>scrollbarProps</code> 定制面板内滚动条</p>
    <Select :options="longOptions" v-model:value="scrollbarValue" :scrollbar-props="{ size: 8, delay: 2000 }" />
    <h2 class="mt30 mb10">自定义下拉面板</h2>
    <p class="mb10">
      通过 <code>popupClassName</code> 自定义面板类名、<code>dropdownMenuStyle</code> 设置面板样式，两者均落在
      <code>Teleport</code> 后的面板上，需写在全局样式中；<code>zIndex</code> 用于覆盖面板层级（默认 1050）
    </p>
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
    <h2 class="mt30 mb10">无边框</h2>
    <Space>
      <Select :options="cityOptions" v-model:value="borderlessValue" :bordered="false" />
      <Select :options="cityOptions" v-model:value="borderlessValue" :bordered="false" disabled />
    </Space>
    <h2 class="mt30 mb10">受控展开</h2>
    <p class="mb10"><code>open</code> 受控时面板显隐由外部驱动，配合 <code>dropdownVisibleChange</code> 同步开合</p>
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
    <h2 class="mt30 mb10">自定义选中标识</h2>
    <p class="mb10">通过 <code>menuItemSelectedIcon</code> 插槽自定义选中项的标识图标，单选模式默认不展示</p>
    <Select :options="cityOptions" v-model:value="stateIconValue" :width="180">
      <template #menuItemSelectedIcon="{ isSelected }">
        <CheckOutlined v-if="isSelected" style="color: #ff6900" />
      </template>
    </Select>
    <h2 class="mt30 mb10">空数据</h2>
    <p class="mb10">选项为空时展示 <code>notFoundContent</code>，传 <code>null</code> 时不展开面板</p>
    <Space>
      <Select :options="emptyOptions" placeholder="默认空态" />
      <Select :options="emptyOptions" not-found-content="暂时没有数据" />
      <Select :options="emptyOptions" :not-found-content="null" placeholder="不展开面板" />
    </Space>
  </div>
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
