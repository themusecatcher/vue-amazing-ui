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
// 多选
const multipleValue = ref<SelectProps['value']>(['10', '11'])
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
// 选中后仅结束加载态、保留最后一次远程结果：antd 没有「已选项标签缓存」，
// 若清空 options，antd 侧标签文本会退化成 value（本项目的缓存会保留 label），两侧对照便不一致
watch(userValue, () => {
  userFetching.value = false
})
onUnmounted(() => {
  if (userTimer) clearTimeout(userTimer)
})
// 后缀图标
const suffixValue = ref<SelectProps['value']>('lucy')
const suffixOptions: SelectOption[] = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' }
]
// 隐藏已选择选项：已选项从下拉列表中移除，标签仍由组件内部的选项缓存保留
const hideSelectedValue = ref<SelectProps['value']>([])
const hideSelectedSource = ['Apples', 'Nails', 'Bananas', 'Helicopters']
const hideSelectedOptions = computed<SelectOption[]>(() => {
  const selected = Array.isArray(hideSelectedValue.value) ? hideSelectedValue.value : []
  return hideSelectedSource.filter((item) => !selected.includes(item)).map((item) => ({ value: item }))
})
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
// 定制回填内容的多选示例段
const countryMultipleValue = ref<SelectProps['value']>(['china'])
// 大数据：10 万项验证虚拟滚动（打开面板只渲染可视区选项）
// label 用「城市 + 6 位序号」而非裸字符串，滚动时更易辨识
const bigDataCities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '重庆']
const bigDataOptions: SelectOption[] = Array.from({ length: 100000 }, (_, index) => ({
  value: `item-${index + 1}`,
  label: `${bigDataCities[index % bigDataCities.length]} ${String(index + 1).padStart(6, '0')}`
}))
const bigDataValue = ref<SelectProps['value']>(['item-10', 'item-12'])
const bigDataVirtual = ref(true)
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
// 三种大小 / 弹出位置的切换项
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
    <h2 class="mt30 mb10">三种大小</h2>
    <Flex vertical gap="middle" align="start">
      <Radio :options="sizeRadios" v-model:value="size" button button-style="solid" />
      <!-- 单选 / 多选 / 标签三条同行展示 -->
      <Space align="start">
        <Select
          :options="sizeOptions"
          v-model:value="sizeValue"
          :size="size"
          :width="200"
          @popup-scroll="onPopupScroll"
        />
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
    </Flex>
    <h2 class="mt30 mb10">标签</h2>
    <p class="mb10">输入任意内容并回车即可创建为标签，下拉列表可滚动查看全部选项</p>
    <Select v-model:value="tagsValue" mode="tags" placeholder="Tags Mode" :options="sizeOptions" :width="300" />
    <h2 class="mt30 mb10">最多显示多少个选项及选项最大长度</h2>
    <!-- 长中文描述 + 行内 code 标签：交由 prettier 排版会在标签中间断行并引入多余空格，故整体跳过格式化 -->
    <!-- prettier-ignore -->
    <p class="mb10">
      超出 <code>maxTagCount</code> 的标签会折叠为省略提示，<code>maxTagTextLength</code> 截断过长的标签文本；<code>maxTagCount</code>
      设为 <code>responsive</code> 时按容器宽度自动折叠（有性能消耗，不建议在大表单场景使用）
    </p>
    <Flex vertical gap="large" align="start">
      <!-- maxTagCount：折叠数量（数值或 responsive） -->
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
      <!-- maxTagTextLength：标签文本截断长度 -->
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
    <h2 class="mt30 mb10">自动分词</h2>
    <p class="mb10">
      试下复制 <code>特斯拉,哥斯拉</code> 到输入框里。只在 <code>tags</code> 和 <code>multiple</code> 模式下可用
    </p>
    <Select
      v-model:value="tokenValue"
      mode="tags"
      placeholder="Automatic tokenization"
      :token-separators="[',']"
      :options="tokenOptions"
      :width="300"
    />
    <h2 class="mt30 mb10">获得选项的文本</h2>
    <p class="mb10">
      开启 <code>labelInValue</code> 后 <code>value</code> 变为包含文本的对象：<code
        >{ label, value, key, originLabel }</code
      >
    </p>
    <Select
      v-model:value="labelInValueValue"
      label-in-value
      :options="labelInValueOptions"
      :width="120"
      @change="onLabelInValueChange"
    />
    <h2 class="mt30 mb10">多选</h2>
    <p class="mb10">从已有条目中选择多个值，下拉列表可滚动查看全部选项</p>
    <Select
      v-model:value="multipleValue"
      mode="multiple"
      placeholder="Please select"
      :options="sizeOptions"
      :width="300"
    />
    <h2 class="mt30 mb10">联动</h2>
    <Space>
      <Select :options="provinceData.map((pro) => ({ value: pro }))" v-model:value="province" :width="120" />
      <Select :options="cities.map((city) => ({ value: city }))" v-model:value="secondCity" :width="120" />
    </Space>
    <h2 class="mt30 mb10">分组</h2>
    <p class="mb10">
      用 <code>SelectOptGroup</code> / <code>SelectOption</code> 子组件或 <code>options</code> 的嵌套写法进行选项分组
    </p>
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
    <h2 class="mt30 mb10">搜索用户</h2>
    <p class="mb10">
      远程搜索 + 节流控制 + 请求时序控制 + 加载状态的多选示例（示例数据由本地模拟，可输入姓名或账号搜索）
    </p>
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
        <span class="select-loading">
          <Spin size="small" />
        </span>
      </template>
    </Select>
    <h2 class="mt30 mb10">后缀图标</h2>
    <Space>
      <Select :options="suffixOptions" v-model:value="suffixValue" :width="120">
        <template #suffixIcon>
          <SmileOutlined class="select-suffix" />
        </template>
      </Select>
      <Select :options="suffixOptions" v-model:value="suffixValue" :width="120" disabled>
        <template #suffixIcon>
          <MehOutlined class="select-suffix" />
        </template>
      </Select>
    </Space>
    <h2 class="mt30 mb10">隐藏已选择选项</h2>
    <p class="mb10">隐藏下拉列表中已选择的选项，已选项的标签由组件内部的选项缓存保留</p>
    <Select
      v-model:value="hideSelectedValue"
      mode="multiple"
      placeholder="Inserted are removed"
      :options="hideSelectedOptions"
      :width="300"
    />
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
            <template #icon>
              <PlusOutlined />
            </template>
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
    <Space align="start">
      <Select :options="countryOptions" v-model:value="countryValue" option-label-prop="label" :width="220">
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
      </Select>
      <Select :options="countryOptions" v-model:value="countryValue" :width="220">
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
        <template #optionLabel="option">{{ option.icon }} {{ option.label }}</template>
      </Select>
      <!-- 多选示例段：回填 optionLabelProp 指定字段 + tagRender 自定义标签（P2 新增） -->
      <Select
        :options="countryOptions"
        v-model:value="countryMultipleValue"
        mode="multiple"
        placeholder="select one country"
        option-label-prop="label"
        :width="220"
      >
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
      </Select>
      <Select
        :options="countryOptions"
        v-model:value="countryMultipleValue"
        mode="multiple"
        placeholder="select one country"
        :width="220"
      >
        <template #option="{ icon, label }">{{ icon }} {{ label }}</template>
        <template #tagRender="{ label, closable, onClose, option }">
          <Tag :closable="closable" style="margin-right: 3px" @close="onClose">
            {{ label }}&nbsp;&nbsp;{{ option.icon }}
          </Tag>
        </template>
      </Select>
    </Space>
    <h2 class="mt30 mb10">大数据</h2>
    <p class="mb10">
      <code>virtual</code>
      默认开启，只渲染可视区选项；关闭开关后渲染全部 <code>10</code> 万项，可对比两者的滚动表现（页面会明显变慢）
    </p>
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
    <h2 class="mt30 mb10">自定义 label、value、options 字段</h2>
    <p class="mb10">
      通过 <code>fieldNames</code> 指定选项的文本 / 值字段，以及分组子选项的字段（<code>options</code>）
    </p>
    <Space align="start">
      <Select :options="fieldOptions" :field-names="fieldNames" v-model:value="fieldValue" :width="200" />
      <Select
        :options="groupFieldOptions"
        :field-names="groupFieldNames"
        v-model:value="groupFieldValue"
        :width="200"
      />
    </Space>
    <h2 class="mt30 mb10">下拉面板弹出位置</h2>
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
    <h2 class="mt30 mb10">自定义状态</h2>
    <p class="mb10"><code>status</code> 可选 <code>error</code> 或 <code>warning</code></p>
    <Space>
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
      <Select :options="cityOptions" v-model:value="borderlessValue" :bordered="false" :width="120" />
      <Select :options="cityOptions" v-model:value="borderlessValue" :bordered="false" :width="120" disabled />
    </Space>
    <h2 class="mt30 mb10">受控展开</h2>
    <p class="mb10"><code>open</code> 受控时面板显隐由外部驱动，配合 <code>dropdownVisibleChange</code> 同步开合</p>
    <Space>
      <Select
        :options="cityOptions"
        v-model:value="controlledOpenValue"
        :open="controlledOpen"
        @dropdown-visible-change="onControlledVisibleChange"
      />
      <Button type="primary" @mousedown="onToggleMousedown" @click="onToggleClick">
        {{ controlledOpen ? '关闭面板' : '展开面板' }}
      </Button>
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
      <Select :options="emptyOptions" :width="180" placeholder="默认空态" />
      <Select :options="emptyOptions" :width="180" not-found-content="暂时没有数据" />
      <Select :options="emptyOptions" :width="180" :not-found-content="null" placeholder="不展开面板" />
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

/* Spin 的根容器（.spin-wrap）是「绝对定位 + height: 100%」，为覆盖被包裹内容而设计；
   独立用作面板空态时必须由外层显式给高度，否则高度塌陷为 0、指示器不可见 */
.select-loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>
