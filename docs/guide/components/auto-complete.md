# 自动完成 AutoComplete

<GlobalElement />

_输入框自动完成功能_

## 何时使用

- 需要一个输入框而不是选择器
- 需要输入建议/辅助提示

和 `Select` 的区别是：

- `AutoComplete` 是一个带提示的输入框，用户可以自由输入，关键词是辅助输入
- `Select` 是在限定的可选项中进行选择，关键词是选择

<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
// 基本使用（远程搜索）
const value1 = ref('')
const options1 = ref<{ value: string }[]>([])
function mockVal(str: string, repeat = 1): { value: string } {
  return { value: str.repeat(repeat) }
}
function onSearch1(searchText: string) {
  options1.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
// 自定义选项
const value2 = ref('')
const options2 = ref<{ value: string }[]>([])
function onSearch2(val: string) {
  options2.value =
    !val || val.includes('@') ? [] : ['gmail.com', '163.com', 'qq.com'].map((domain) => ({ value: `${val}@${domain}` }))
}
// 自定义输入组件
const value3 = ref('')
const options3 = ref<{ value: string }[]>([])
function onSearch3(val: string) {
  options3.value = !val ? [] : [{ value: val }, { value: val + val }, { value: val + val + val }]
}
function onSelect3(value: string) {
  console.log('onSelect', value)
}
// 不区分大小写（filterOption 函数）
const value4 = ref('')
const options4 = ref<{ value: string }[]>([
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
])
function filterOption(input: string, option: unknown): boolean {
  const value = (option as { value?: string }).value ?? ''
  return value.toUpperCase().includes(input.toUpperCase())
}
// 查询模式 - 确定类目（options 嵌套 options 结构）
const value5 = ref('')
const options5 = ref([
  {
    value: 'Libraries',
    options: [
      { value: 'VueAmazingUI', count: 10000 },
      { value: 'VueAmazingUI 组件', count: 10600 }
    ]
  },
  {
    value: 'Solutions',
    options: [
      { value: 'VueAmazingUI 组件 FAQ', count: 60100 },
      { value: 'VueAmazingUI FAQ', count: 30010 }
    ]
  },
  {
    value: 'Articles',
    options: [{ value: 'VueAmazingUI 设计语言', count: 100000 }]
  },
  {
    value: 'all'
  }
])
// 查询模式 - 不确定类目
interface SearchOption {
  query: string
  category: string
  value: string
  count: number
}
const value6 = ref('')
const options6 = ref<SearchOption[]>([])
function onSelect6(value: string) {
  console.log('onSelect', value)
}
function getRandomInt(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function searchResult(query: string): SearchOption[] {
  return new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_item, idx) => ({
      query,
      category: `${query}${idx}`,
      value: `${query}${idx}`,
      count: getRandomInt(200, 100)
    }))
}
function onSearch6(val: string) {
  options6.value = val ? searchResult(val) : []
}
// 自定义状态 / 无边框 / 自定义清除按钮 共用数据源
const value7 = ref('')
const value8 = ref('')
const value9 = ref('')
const value10 = ref('')
const value11 = ref('')
const options7 = ref<{ value: string }[]>([])
function onSearch7(searchText: string) {
  options7.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
function onSelect7(value: string) {
  console.log('onSelect', value)
}
function onClear() {
  console.log('onClear')
}
// 三种尺寸
const size = ref('middle')
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
const valueS = ref('')
// 禁用 / 禁用选项
const valueD = ref('')
const valueDD = ref('')
const optionsD = ref([
  {
    label: '北京市',
    value: '北京市'
  },
  {
    label: '上海市',
    value: '上海市',
    disabled: true
  },
  {
    label: '纽约市',
    value: '纽约市'
  },
  {
    label: '旧金山',
    value: '旧金山'
  },
  {
    label: '布宜诺斯艾利斯',
    value: '布宜诺斯艾利斯'
  },
  {
    label: '伊斯坦布尔',
    value: '伊斯坦布尔'
  },
  {
    label: '拜占庭',
    value: '拜占庭'
  },
  {
    label: '君士坦丁堡',
    value: '君士坦丁堡'
  }
])
// 字符串数组数据源
const valueArr = ref('')
const optionsArr = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape']
// 分组数据源（options 嵌套 options 结构）
const valueGroup = ref('')
const optionsGroup = ref([
  {
    label: '亚洲',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '东京', value: 'tokyo' }
    ]
  },
  {
    label: '欧洲',
    options: [
      { label: '伦敦', value: 'london' },
      { label: '巴黎', value: 'paris' }
    ]
  },
  {
    label: '美洲',
    options: [
      { label: '纽约', value: 'newyork' },
      { label: '旧金山', value: 'sanfrancisco' }
    ]
  }
])
// 键盘/悬浮回填 backfill（键盘 ↑↓ 导航或悬浮选项时回填输入框）
const valueBackfill = ref('')
const optionsBackfill = ['Apple', 'Banana', 'Cherry', 'Durian']
// 受控展开 / 默认展开 / 关闭默认高亮首项 共用数据源
const valueOpen = ref('')
const openControlled = ref(false)
const valueDefaultOpen = ref('')
const valueActiveFirst = ref('')
const optionsOpen = ['Option 1', 'Option 2', 'Option 3']
// 下拉面板宽度 dropdownMatchSelectWidth 的三态：等宽 / 以触发器宽度为最小宽度（由内容撑开）/ 固定 300
// 选项文本刻意长于输入框（200px）—— 否则 false 的面板宽度与 true 完全相同，看不出差异
const valueMatchWidth = ref('')
const valueMatchWidthTrue = ref('')
const valueMatchWidthFalse = ref('')
const optionsMatchWidth = [
  '一个明显长于输入框宽度的选项文本',
  '另一个同样明显更长的选项文本',
  '第三个用于对照的较长选项文本'
]
// 挂载容器：不传 to 时优先挂到最近的承载层内容容器
const toValue = ref('')
// 下拉面板样式的公开入口：popupClassName / dropdownMenuStyle / zIndex
const panelValue = ref('')
const panelZIndexValue = ref('')
</script>

## 基本使用

<AutoComplete
  v-model:value="value1"
  :options="options1"
  :width="200"
  placeholder="input here"
  @search="onSearch1"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref('')
const options1 = ref<{ value: string }[]>([])
function mockVal(str: string, repeat = 1): { value: string } {
  return { value: str.repeat(repeat) }
}
function onSearch1(searchText: string) {
  options1.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
</script>
<template>
  <AutoComplete
    v-model:value="value1"
    :options="options1"
    :width="200"
    placeholder="input here"
    @search="onSearch1"
  />
</template>
```

:::

## 自定义选项

<AutoComplete
  v-model:value="value2"
  :options="options2"
  :width="200"
  placeholder="input here"
  @search="onSearch2"
>
  <template #option="{ value: val }">
    {{ String(val).split('@')[0] }} @
    <span style="font-weight: bold">{{ String(val).split('@')[1] }}</span>
  </template>
</AutoComplete>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value2 = ref('')
const options2 = ref<{ value: string }[]>([])
function onSearch2(val: string) {
  options2.value =
    !val || val.includes('@') ? [] : ['gmail.com', '163.com', 'qq.com'].map((domain) => ({ value: `${val}@${domain}` }))
}
</script>
<template>
  <AutoComplete
    v-model:value="value2"
    :options="options2"
    :width="200"
    placeholder="input here"
    @search="onSearch2"
  >
    <template #option="{ value: val }">
      {{ String(val).split('@')[0] }} @
      <span style="font-weight: bold">{{ String(val).split('@')[1] }}</span>
    </template>
  </AutoComplete>
</template>
```

:::

## 自定义输入组件

<AutoComplete
  v-model:value="value3"
  :options="options3"
  :width="200"
  @search="onSearch3"
  @select="onSelect3"
>
  <Textarea placeholder="input here" style="height: 50px" />
</AutoComplete>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value3 = ref('')
const options3 = ref<{ value: string }[]>([])
function onSearch3(val: string) {
  options3.value = !val ? [] : [{ value: val }, { value: val + val }, { value: val + val + val }]
}
function onSelect3(value: string) {
  console.log('onSelect', value)
}
</script>
<template>
  <AutoComplete
    v-model:value="value3"
    :options="options3"
    :width="200"
    @search="onSearch3"
    @select="onSelect3"
  >
    <Textarea placeholder="input here" style="height: 50px" />
  </AutoComplete>
</template>
```

:::

## 不区分大小写

<AutoComplete
  v-model:value="value4"
  :options="options4"
  :width="200"
  placeholder="input here"
  :filter-option="filterOption"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value4 = ref('')
const options4 = ref<{ value: string }[]>([
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
])
function filterOption(input: string, option: unknown): boolean {
  const value = (option as { value?: string }).value ?? ''
  return value.toUpperCase().includes(input.toUpperCase())
}
</script>
<template>
  <AutoComplete
    v-model:value="value4"
    :options="options4"
    :width="200"
    placeholder="input here"
    :filter-option="filterOption"
  />
</template>
```

:::

## 查询模式 - 确定类目

<AutoComplete
  v-model:value="value5"
  :options="options5"
  :width="250"
  :dropdown-match-select-width="500"
>
  <template #option="item">
    <template v-if="item.options">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span>{{ item.value }}</span>
        <a href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank" rel="noopener noreferrer">
          more
        </a>
      </div>
    </template>
    <template v-else-if="item.value === 'all'">
      <a href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank" rel="noopener noreferrer">
        View all results
      </a>
    </template>
    <template v-else>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ item.value }}</span>
        <span style="flex-shrink: 0; padding-left: 8px">
          <UserOutlined />
          {{ item.count }}
        </span>
      </div>
    </template>
  </template>
  <InputSearch placeholder="input here" size="large" />
</AutoComplete>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
const value5 = ref('')
const options5 = ref([
  {
    value: 'Libraries',
    options: [
      { value: 'VueAmazingUI', count: 10000 },
      { value: 'VueAmazingUI 组件', count: 10600 }
    ]
  },
  {
    value: 'Solutions',
    options: [
      { value: 'VueAmazingUI 组件 FAQ', count: 60100 },
      { value: 'VueAmazingUI FAQ', count: 30010 }
    ]
  },
  {
    value: 'Articles',
    options: [{ value: 'VueAmazingUI 设计语言', count: 100000 }]
  },
  {
    value: 'all'
  }
])
</script>
<template>
  <AutoComplete
    v-model:value="value5"
    :options="options5"
    :width="250"
    :dropdown-match-select-width="500"
  >
    <template #option="item">
      <template v-if="item.options">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>{{ item.value }}</span>
          <a href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank" rel="noopener noreferrer">
            more
          </a>
        </div>
      </template>
      <template v-else-if="item.value === 'all'">
        <a href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank" rel="noopener noreferrer">
          View all results
        </a>
      </template>
      <template v-else>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ item.value }}</span>
          <span style="flex-shrink: 0; padding-left: 8px">
            <UserOutlined />
            {{ item.count }}
          </span>
        </div>
      </template>
    </template>
    <InputSearch placeholder="input here" size="large" />
  </AutoComplete>
</template>
```

:::

## 查询模式 - 不确定类目

<AutoComplete
  v-model:value="value6"
  :options="options6"
  :width="300"
  @select="onSelect6"
  @search="onSearch6"
>
  <template #option="item">
    <div style="display: flex; justify-content: space-between">
      <span>
        Found {{ item.query }} on
        <a :href="`https://themusecatcher.github.io/vue-amazing-ui/?q=${item.query}`" target="_blank" rel="noopener noreferrer">
          {{ item.category }}
        </a>
      </span>
      <span>{{ item.count }} results</span>
    </div>
  </template>
  <InputSearch size="large" placeholder="input here" allow-clear :search-props="{ type: 'primary' }" />
</AutoComplete>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
interface SearchOption {
  query: string
  category: string
  value: string
  count: number
}
const value6 = ref('')
const options6 = ref<SearchOption[]>([])
function onSelect6(value: string) {
  console.log('onSelect', value)
}
function getRandomInt(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function searchResult(query: string): SearchOption[] {
  return new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_item, idx) => ({
      query,
      category: `${query}${idx}`,
      value: `${query}${idx}`,
      count: getRandomInt(200, 100)
    }))
}
function onSearch6(val: string) {
  options6.value = val ? searchResult(val) : []
}
</script>
<template>
  <AutoComplete
    v-model:value="value6"
    :options="options6"
    :width="300"
    @select="onSelect6"
    @search="onSearch6"
  >
    <template #option="item">
      <div style="display: flex; justify-content: space-between">
        <span>
          Found {{ item.query }} on
          <a :href="`https://themusecatcher.github.io/vue-amazing-ui/?q=${item.query}`" target="_blank" rel="noopener noreferrer">
            {{ item.category }}
          </a>
        </span>
        <span>{{ item.count }} results</span>
      </div>
    </template>
    <InputSearch size="large" placeholder="input here" allow-clear :search-props="{ type: 'primary' }" />
  </AutoComplete>
</template>
```

:::

## 自定义状态

<AutoComplete
  v-model:value="value7"
  :options="options7"
  :width="200"
  placeholder="input here"
  status="error"
  @search="onSearch7"
  @select="onSelect7"
/>
<br />
<br />
<AutoComplete
  v-model:value="value8"
  :options="options7"
  :width="200"
  placeholder="input here"
  status="warning"
  allow-clear
  @search="onSearch7"
  @select="onSelect7"
  @clear="onClear"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value7 = ref('')
const value8 = ref('')
const options7 = ref<{ value: string }[]>([])
function mockVal(str: string, repeat = 1): { value: string } {
  return { value: str.repeat(repeat) }
}
function onSearch7(searchText: string) {
  options7.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
function onSelect7(value: string) {
  console.log('onSelect', value)
}
function onClear() {
  console.log('onClear')
}
</script>
<template>
  <AutoComplete
    v-model:value="value7"
    :options="options7"
    :width="200"
    placeholder="input here"
    status="error"
    @search="onSearch7"
    @select="onSelect7"
  />
  <br />
  <br />
  <AutoComplete
    v-model:value="value8"
    :options="options7"
    :width="200"
    placeholder="input here"
    status="warning"
    allow-clear
    @search="onSearch7"
    @select="onSelect7"
    @clear="onClear"
  />
</template>
```

:::

## 无边框

<AutoComplete
  v-model:value="value9"
  :options="options7"
  :width="200"
  placeholder="border less"
  :bordered="false"
  @search="onSearch7"
  @select="onSelect7"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value9 = ref('')
const options7 = ref<{ value: string }[]>([])
function mockVal(str: string, repeat = 1): { value: string } {
  return { value: str.repeat(repeat) }
}
function onSearch7(searchText: string) {
  options7.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
</script>
<template>
  <AutoComplete
    v-model:value="value9"
    :options="options7"
    :width="200"
    placeholder="border less"
    :bordered="false"
    @search="onSearch7"
    @select="onSelect7"
  />
</template>
```

:::

## 自定义清除按钮

<AutoComplete
  v-model:value="value10"
  :options="options7"
  :width="200"
  placeholder="Clearable"
  allow-clear
  @search="onSearch7"
  @select="onSelect7"
/>
<br />
<br />
<AutoComplete
  v-model:value="value11"
  :options="options7"
  :width="200"
  placeholder="Customized clear icon"
  allow-clear
  @search="onSearch7"
  @select="onSelect7"
>
  <template #clearIcon>
    <svg
      focusable="false"
      data-icon="close"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      viewBox="64 64 896 896"
    >
      <path
        d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
      ></path>
    </svg>
  </template>
</AutoComplete>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value10 = ref('')
const value11 = ref('')
const options7 = ref<{ value: string }[]>([])
function mockVal(str: string, repeat = 1): { value: string } {
  return { value: str.repeat(repeat) }
}
function onSearch7(searchText: string) {
  options7.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
</script>
<template>
  <AutoComplete
    v-model:value="value10"
    :options="options7"
    :width="200"
    placeholder="Clearable"
    allow-clear
    @search="onSearch7"
    @select="onSelect7"
  />
  <br />
  <br />
  <AutoComplete
    v-model:value="value11"
    :options="options7"
    :width="200"
    placeholder="Customized clear icon"
    allow-clear
    @search="onSearch7"
    @select="onSelect7"
  >
    <template #clearIcon>
      <svg
        focusable="false"
        data-icon="close"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        viewBox="64 64 896 896"
      >
        <path
          d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
        ></path>
      </svg>
    </template>
  </AutoComplete>
</template>
```

:::

## 下拉面板宽度

*通过 `dropdownMatchSelectWidth` 指定面板宽度：`true` 与输入框等宽；`false` 时以输入框宽度为最小宽度、内容更宽则随之撑开；数字则为固定宽度*

<br/>

<Space :size="40">
  <AutoComplete
    v-model:value="valueMatchWidthTrue"
    :options="optionsMatchWidth"
    :width="200"
    placeholder="面板与输入框等宽"
  />
  <AutoComplete
    v-model:value="valueMatchWidthFalse"
    :options="optionsMatchWidth"
    :width="200"
    placeholder="面板由内容撑开"
    :dropdown-match-select-width="false"
  />
  <AutoComplete
    v-model:value="valueMatchWidth"
    :options="optionsMatchWidth"
    :width="200"
    placeholder="面板宽 300"
    :dropdown-match-select-width="300"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueMatchWidth = ref('')
const valueMatchWidthTrue = ref('')
const valueMatchWidthFalse = ref('')
const optionsMatchWidth = [
  '一个明显长于输入框宽度的选项文本',
  '另一个同样明显更长的选项文本',
  '第三个用于对照的较长选项文本'
]
</script>
<template>
  <Space :size="40">
    <AutoComplete
      v-model:value="valueMatchWidthTrue"
      :options="optionsMatchWidth"
      :width="200"
      placeholder="面板与输入框等宽"
    />
    <AutoComplete
      v-model:value="valueMatchWidthFalse"
      :options="optionsMatchWidth"
      :width="200"
      placeholder="面板由内容撑开"
      :dropdown-match-select-width="false"
    />
    <AutoComplete
      v-model:value="valueMatchWidth"
      :options="optionsMatchWidth"
      :width="200"
      placeholder="面板宽 300"
      :dropdown-match-select-width="300"
    />
  </Space>
</template>
```

:::

## 下拉面板挂载容器

*不传 `to` 时面板优先挂到最近的承载层内容容器（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body`；设为 `false` 时面板留在原地*

<br/>

<Space>
  <AutoComplete v-model:value="toValue" :options="optionsArr" :width="200" placeholder="默认挂载" />
  <AutoComplete v-model:value="toValue" :options="optionsArr" :width="200" placeholder="留在原地" :to="false" />
</Space>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const toValue = ref('')
const optionsArr = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape']
</script>
<template>
  <Space>
    <AutoComplete v-model:value="toValue" :options="optionsArr" :width="200" placeholder="默认挂载" />
    <AutoComplete v-model:value="toValue" :options="optionsArr" :width="200" placeholder="留在原地" :to="false" />
  </Space>
</template>
```

::::

## 自定义下拉面板

*通过 `popupClassName` 自定义面板类名、`dropdownMenuStyle` 设置面板样式，两者均落在 `Teleport` 后的面板上，需写在全局样式中；`zIndex` 用于覆盖面板层级（默认 1050）*

<br/>

<Flex gap="large" wrap="wrap">
  <Flex vertical gap="small" align="start">
    <span class="demo-label">默认面板</span>
    <AutoComplete v-model:value="panelValue" :options="options4" :width="180" placeholder="input here" />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">自定义类名与样式</span>
    <AutoComplete
      v-model:value="panelValue"
      :options="options4"
      :width="180"
      placeholder="input here"
      popup-class-name="custom-ac-panel"
      :dropdown-menu-style="{
        background: 'rgba(255, 105, 0, 0.05)',
        border: '1px solid #ff6900',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(255, 105, 0, 0.25)'
      }"
    />
  </Flex>
  <Flex vertical gap="small" align="start">
    <span class="demo-label">自定义层级</span>
    <AutoComplete
      v-model:value="panelZIndexValue"
      :options="options4"
      :width="180"
      placeholder="input here"
      :z-index="1200"
    />
  </Flex>
</Flex>

:::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const panelValue = ref('')
const panelZIndexValue = ref('')
const options4 = ref<{ value: string }[]>([
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
])
</script>
<template>
  <Flex gap="large" wrap="wrap">
    <Flex vertical gap="small" align="start">
      <span class="demo-label">默认面板</span>
      <AutoComplete v-model:value="panelValue" :options="options4" :width="180" placeholder="input here" />
    </Flex>
    <Flex vertical gap="small" align="start">
      <span class="demo-label">自定义类名与样式</span>
      <AutoComplete
        v-model:value="panelValue"
        :options="options4"
        :width="180"
        placeholder="input here"
        popup-class-name="custom-ac-panel"
        :dropdown-menu-style="{
          background: 'rgba(255, 105, 0, 0.05)',
          border: '1px solid #ff6900',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(255, 105, 0, 0.25)'
        }"
      />
    </Flex>
    <Flex vertical gap="small" align="start">
      <span class="demo-label">自定义层级</span>
      <AutoComplete
        v-model:value="panelZIndexValue"
        :options="options4"
        :width="180"
        placeholder="input here"
        :z-index="1200"
      />
    </Flex>
  </Flex>
</template>

<style lang="less">
/* 面板经 Teleport 挂载，scoped 样式无法命中，故用 popupClassName 下发类名 + 全局样式；
   选项规则把类名重复一次以提升特异性，覆盖带 scope 属性的组件内规则 */
@demo-primary: #ff6900;

.custom-ac-panel {
  &.custom-ac-panel .auto-complete-options .auto-complete-option {
    color: darken(@demo-primary, 12%);
    font-weight: 500;
  }
  .auto-complete-options .auto-complete-option.option-hover {
    background: fade(@demo-primary, 10%);
  }
}
.demo-label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}
</style>
```

::::

## 三种尺寸

<Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
<br />
<br />
<AutoComplete
  v-model:value="valueS"
  :options="optionsD"
  :width="200"
  placeholder="input here"
  :size="size"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const size = ref('middle')
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
const valueS = ref('')
const optionsD = ref([
  {
    label: '北京市',
    value: '北京市'
  },
  {
    label: '上海市',
    value: '上海市',
    disabled: true
  },
  {
    label: '纽约市',
    value: '纽约市'
  },
  {
    label: '旧金山',
    value: '旧金山'
  },
  {
    label: '布宜诺斯艾利斯',
    value: '布宜诺斯艾利斯'
  },
  {
    label: '伊斯坦布尔',
    value: '伊斯坦布尔'
  },
  {
    label: '拜占庭',
    value: '拜占庭'
  },
  {
    label: '君士坦丁堡',
    value: '君士坦丁堡'
  }
])
</script>
<template>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <br />
  <br />
  <AutoComplete
    v-model:value="valueS"
    :options="optionsD"
    :width="200"
    placeholder="input here"
    :size="size"
  />
</template>
```

:::

## 禁用

<AutoComplete v-model:value="valueD" :options="optionsD" :width="200" placeholder="input here" disabled />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueD = ref('')
const optionsD = ref([
  {
    label: '北京市',
    value: '北京市'
  },
  {
    label: '上海市',
    value: '上海市',
    disabled: true
  },
  {
    label: '纽约市',
    value: '纽约市'
  },
  {
    label: '旧金山',
    value: '旧金山'
  },
  {
    label: '布宜诺斯艾利斯',
    value: '布宜诺斯艾利斯'
  },
  {
    label: '伊斯坦布尔',
    value: '伊斯坦布尔'
  },
  {
    label: '拜占庭',
    value: '拜占庭'
  },
  {
    label: '君士坦丁堡',
    value: '君士坦丁堡'
  }
])
</script>
<template>
  <AutoComplete v-model:value="valueD" :options="optionsD" :width="200" placeholder="input here" disabled />
</template>
```

:::

## 禁用选项

<AutoComplete v-model:value="valueDD" :options="optionsD" :width="200" placeholder="input here" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueDD = ref('')
const optionsD = ref([
  {
    label: '北京市',
    value: '北京市'
  },
  {
    label: '上海市',
    value: '上海市',
    disabled: true
  },
  {
    label: '纽约市',
    value: '纽约市'
  },
  {
    label: '旧金山',
    value: '旧金山'
  },
  {
    label: '布宜诺斯艾利斯',
    value: '布宜诺斯艾利斯'
  },
  {
    label: '伊斯坦布尔',
    value: '伊斯坦布尔'
  },
  {
    label: '拜占庭',
    value: '拜占庭'
  },
  {
    label: '君士坦丁堡',
    value: '君士坦丁堡'
  }
])
</script>
<template>
  <AutoComplete v-model:value="valueDD" :options="optionsD" :width="200" placeholder="input here" />
</template>
```

:::

## 字符串数组数据源

<AutoComplete v-model:value="valueArr" :options="optionsArr" :width="200" placeholder="input here" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueArr = ref('')
const optionsArr = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape']
</script>
<template>
  <AutoComplete v-model:value="valueArr" :options="optionsArr" :width="200" placeholder="input here" />
</template>
```

:::

## 分组数据源

<AutoComplete v-model:value="valueGroup" :options="optionsGroup" :width="200" placeholder="input here" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueGroup = ref('')
const optionsGroup = ref([
  {
    label: '亚洲',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '东京', value: 'tokyo' }
    ]
  },
  {
    label: '欧洲',
    options: [
      { label: '伦敦', value: 'london' },
      { label: '巴黎', value: 'paris' }
    ]
  },
  {
    label: '美洲',
    options: [
      { label: '纽约', value: 'newyork' },
      { label: '旧金山', value: 'sanfrancisco' }
    ]
  }
])
</script>
<template>
  <AutoComplete v-model:value="valueGroup" :options="optionsGroup" :width="200" placeholder="input here" />
</template>
```

:::

## 键盘/悬浮回填

键盘 `↑` `↓` 导航选项时会回填选中项到输入框中，按 `Enter` 确认选中，按 `Esc` 还原输入，悬浮选项同样会回填。

<br/>

<AutoComplete
  v-model:value="valueBackfill"
  :options="optionsBackfill"
  :width="200"
  placeholder="input here"
  backfill
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueBackfill = ref('')
const optionsBackfill = ['Apple', 'Banana', 'Cherry', 'Durian']
</script>
<template>
  <AutoComplete
    v-model:value="valueBackfill"
    :options="optionsBackfill"
    :width="200"
    placeholder="input here"
    backfill
  />
</template>
```

:::

## 受控展开

通过 `open` 控制面板显隐，配合 `dropdownVisibleChange` 事件使用。

<br/>

<Space>
  <AutoComplete
    v-model:value="valueOpen"
    :options="optionsOpen"
    :open="openControlled"
    :width="200"
    placeholder="input here"
    @dropdown-visible-change="openControlled = $event"
  />
  <Button type="primary" @click="openControlled = !openControlled">{{ openControlled ? '收起' : '展开' }}下拉</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueOpen = ref('')
const openControlled = ref(false)
const optionsOpen = ['Option 1', 'Option 2', 'Option 3']
</script>
<template>
  <Space>
    <AutoComplete
      v-model:value="valueOpen"
      :options="optionsOpen"
      :open="openControlled"
      :width="200"
      placeholder="input here"
      @dropdown-visible-change="openControlled = $event"
    />
    <Button type="primary" @click="openControlled = !openControlled">{{ openControlled ? '收起' : '展开' }}下拉</Button>
  </Space>
</template>
```

:::

## 默认展开

初始即展开面板，区别于受控的 `open`，初始值生效后不受外部状态控制。

<br/>

<AutoComplete
  v-model:value="valueDefaultOpen"
  :options="optionsOpen"
  :width="200"
  placeholder="input here"
  default-open
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueDefaultOpen = ref('')
const optionsOpen = ['Option 1', 'Option 2', 'Option 3']
</script>
<template>
  <AutoComplete
    v-model:value="valueDefaultOpen"
    :options="optionsOpen"
    :width="200"
    placeholder="input here"
    default-open
  />
</template>
```

:::

## 关闭默认高亮首项

<AutoComplete
  v-model:value="valueActiveFirst"
  :options="optionsOpen"
  :width="200"
  placeholder="input here"
  :default-active-first-option="false"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const valueActiveFirst = ref('')
const optionsOpen = ['Option 1', 'Option 2', 'Option 3']
</script>
<template>
  <AutoComplete
    v-model:value="valueActiveFirst"
    :options="optionsOpen"
    :width="200"
    placeholder="input here"
    :default-active-first-option="false"
  />
</template>
```

:::

## APIs

### AutoComplete

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| allowClear | 是否支持清除，有值时即显示清除图标 | boolean | false |
| autofocus | 是否自动获取焦点 | boolean | false |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | boolean | false |
| bordered | 是否有边框 | boolean | true |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | boolean | true |
| defaultOpen | 是否默认展开下拉菜单 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| open | 是否展开下拉菜单（受控） | boolean | undefined |
| placeholder | 默认占位文本 | string | undefined |
| popupClassName | 下拉菜单的 className 属性 | string | undefined |
| zIndex | 下拉面板层级，优先级最高（覆盖默认层级与 `ConfigProvider` 的 `baseZIndex` 自动分配） | number | undefined |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽，为数字时指定下拉菜单宽度（单位 `px`），当左右空间都不足以容纳时面板自动调整对齐 | boolean &#124; number | true |
| dropdownMenuStyle | 下拉菜单自定义样式 | CSSProperties | undefined |
| to | 下拉面板挂载的容器节点：显式传入时按此挂载（元素标签名 (例如 `'body'`) 或元素本身，`false` 会待在原地）；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false | undefined |
| options | 自动完成的数据源 | (string &#124; number &#124; [AutoCompleteOption](#option-type) &#124; [AutoCompleteGroupOption](#groupoption-type))[] | [] |
| value <Tag color="cyan">v-model</Tag> | 当前输入的值 | string | undefined |
| width | 自动完成宽度，单位 `px` | string &#124; number | '100%' |
| size | 自动完成大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| status | 设置校验状态 | 'error' &#124; 'warning' | undefined |
| filterOption | 根据输入项进行筛选：<li>默认为 `false` 时不筛选，显示全部数据源，由用户在 `search` 事件中远程更新 `options`</li><li>当其为 `true` 时，筛选每个选项的文本字段 `label` 是否包含输入项，包含返回 `true`，反之返回 `false`</li><li>当其为函数 `Function` 时，接受 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`</li> | boolean &#124; ((inputValue: string, option: AutoCompleteOption) => boolean) | false |

### Option Type

| 名称              | 说明                          | 类型                | 默认值    |
| :----------------- | :----------------------------- | :------------------- | :-------- |
| value             | 唯一的 value 值               | string &#124; number | undefined |
| label?            | 显示的 `label` 值，缺失时兜底展示 `value`；支持任意自定义字段（`#option` 插槽透传） | string | undefined |
| disabled?         | 是否禁用选项                  | boolean             | false     |

### GroupOption Type

| 名称   | 说明                        | 类型                                  | 默认值    |
| :------ | :--------------------------- | :------------------------------------- | :-------- |
| options | 子选项，存在该字段即视为分组 | (string &#124; number &#124; AutoCompleteOption)[] | undefined |
| label? | 分组名（显示为分组标题）    | string                                | undefined |
| value? | 分组值                      | string &#124; number                  | undefined |

## Events

| 名称                  | 说明                  | 类型                                                                           |
| :--------------------- | :--------------------- | :----------------------------------------------------------------------------- |
| search                | 输入内容变化时回调    | (value: string) => void                                                        |
| select                | 选中选项时回调        | (value: string &#124; number, option: AutoCompleteOption) => void                          |
| change                | 选项值改变后的回调    | (value: string) => void                                                        |
| focus                 | 获得焦点时的回调      | () => void                                                                     |
| blur                  | 失去焦点时的回调      | () => void                                                                     |
| clear                 | 清除时的回调          | () => void                                                                     |
| openChange            | 下拉菜单展开收起的回调 | (open: boolean) => void                                                        |
| dropdownVisibleChange | 下拉菜单展开收起的回调 | (open: boolean) => void                                                        |

## Slots

| 名称     | 说明                                                                   | 类型                                      |
| :-------- | :---------------------------------------------------------------------- | :---------------------------------------- |
| default  | 自定义输入组件（替代原生 `input` 元素）                                 | v-slot:default                            |
| clearIcon | 自定义清除图标，作用域参数 `clearIcon` 为清除方法                       | v-slot:clearIcon="{ clearIcon }"          |
| option   | 自定义选项内容，作用域为当前选项数据，[AutoCompleteOption](#option-type) 的自定义字段会一并透传 | v-slot:option="{ value, label, ...rest }" |

## Methods

| 名称 | 说明              | 类型       |
| :---- | :----------------- | :--------- |
| focus | 获取输入框焦点    | () => void |
| blur | 使输入框失去焦点  | () => void |
