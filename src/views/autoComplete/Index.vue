<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, CloseOutlined } from '@ant-design/icons-vue'
// 1. 基本使用（远程搜索）
const value1 = ref('')
const options1 = ref<{ value: string }[]>([])
const avalue1 = ref('')
const aoptions1 = ref<{ value: string }[]>([])
function mockVal(str: string, repeat = 1): { value: string } {
  return { value: str.repeat(repeat) }
}
function onSearch1(searchText: string) {
  options1.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
function onASearch1(searchText: string) {
  aoptions1.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
// 2. 自定义选项
const value2 = ref('')
const options2 = ref<{ value: string }[]>([])
const avalue2 = ref('')
const aoptions2 = ref<{ value: string }[]>([])
function onSearch2(val: string) {
  options2.value =
    !val || val.includes('@') ? [] : ['gmail.com', '163.com', 'qq.com'].map((domain) => ({ value: `${val}@${domain}` }))
}
function onASearch2(val: string) {
  aoptions2.value =
    !val || val.includes('@') ? [] : ['gmail.com', '163.com', 'qq.com'].map((domain) => ({ value: `${val}@${domain}` }))
}
// 3. 自定义输入组件
const value3 = ref('')
const options3 = ref<{ value: string }[]>([])
const avalue3 = ref('')
const aoptions3 = ref<{ value: string }[]>([])
function onSearch3(val: string) {
  options3.value = !val ? [] : [{ value: val }, { value: val + val }, { value: val + val + val }]
}
function onASearch3(val: string) {
  aoptions3.value = !val ? [] : [{ value: val }, { value: val + val }, { value: val + val + val }]
}
function onSelect3(value: string) {
  console.log('onSelect', value)
}
// 4. 不区分大小写（filterOption 函数）
const value4 = ref('')
const options4 = ref<{ value: string }[]>([
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
])
const avalue4 = ref('')
const aoptions4 = ref<{ value: string }[]>([
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
])
function filterOption(input: string, option: unknown): boolean {
  const value = (option as { value?: string }).value ?? ''
  return value.toUpperCase().includes(input.toUpperCase())
}
// 5. 查询模式 - 确定类目（options 嵌套 options 结构，与 Ant Design Vue 一致）
const value5 = ref('')
const options5 = ref([
  {
    value: 'Libraries',
    options: [
      { value: 'AntDesignVue', count: 10000 },
      { value: 'AntDesignVue UI', count: 10600 }
    ]
  },
  {
    value: 'Solutions',
    options: [
      { value: 'AntDesignVue UI FAQ', count: 60100 },
      { value: 'AntDesignVue FAQ', count: 30010 }
    ]
  },
  {
    value: 'Articles',
    options: [{ value: 'AntDesignVue design language', count: 100000 }]
  },
  {
    value: 'all'
  }
])
// 5. antd 真身：options 嵌套 options 字段结构（antdv 原生分组写法）
const avalue5 = ref('')
const adataSource5 = [
  {
    value: 'Libraries',
    options: [
      { value: 'AntDesignVue', count: 10000 },
      { value: 'AntDesignVue UI', count: 10600 }
    ]
  },
  {
    value: 'Solutions',
    options: [
      { value: 'AntDesignVue UI FAQ', count: 60100 },
      { value: 'AntDesignVue FAQ', count: 30010 }
    ]
  },
  {
    value: 'Articles',
    options: [{ value: 'AntDesignVue design language', count: 100000 }]
  },
  {
    value: 'all'
  }
]
// 6. 查询模式 - 不确定类目
interface SearchOption {
  query: string
  category: string
  value: string
  count: number
}
const value6 = ref('')
const options6 = ref<SearchOption[]>([])
const avalue6 = ref('')
const aoptions6 = ref<SearchOption[]>([])
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
function onASearch6(val: string) {
  aoptions6.value = val ? searchResult(val) : []
}
// 7. 自定义状态 / 8. 无边框 / 9. 自定义清除按钮 共用数据源
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
// 7/8/9 antd 真身对照数据源
const avalue7 = ref('')
const avalue8 = ref('')
const avalue9 = ref('')
const avalue10 = ref('')
const avalue11 = ref('')
const aoptions7 = ref<{ value: string }[]>([])
function onASearch7(searchText: string) {
  aoptions7.value = !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
// 补充用例：三种尺寸
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
const avalueS = ref('')
// 补充用例：禁用 / 禁用选项
const valueD = ref('')
const valueDD = ref('')
const avalueD = ref('')
const avalueDD = ref('')
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
// 补充用例：字符串数组数据源
const valueArr = ref('')
const avalueArr = ref('')
const optionsArr = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry', 'Fig', 'Grape']
// antd 真身：字符串数组需转为 { value } 结构
const aoptionsArr = optionsArr.map((value) => ({ value }))
// 补充用例：分组数据源（options 嵌套 options 结构，与 Ant Design Vue 一致）
const valueGroup = ref('')
const avalueGroup = ref('')
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
// antd 真身：分组用 options 嵌套 options 结构
const aoptionsGroup = [
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
]
// 补充用例：键盘/悬浮回填 backfill（hover 选项时回填输入框）
const valueBackfill = ref('')
const avalueBackfill = ref('')
const optionsBackfill = ['Apple', 'Banana', 'Cherry', 'Durian']
const aoptionsBackfill = optionsBackfill.map((value) => ({ value }))
// 补充用例：受控展开 open（外部按钮控制下拉面板显隐）
const valueOpen = ref('')
const openControlled = ref(false)
const avalueOpen = ref('')
const aopenControlled = ref(false)
const optionsOpen = ['Option 1', 'Option 2', 'Option 3']
const aoptionsOpen = optionsOpen.map((value) => ({ value }))
// 补充用例：默认展开 defaultOpen
const valueDefaultOpen = ref('')
const avalueDefaultOpen = ref('')
// 补充用例：关闭默认高亮首项 defaultActiveFirstOption
const valueActiveFirst = ref('')
const avalueActiveFirst = ref('')
// 补充用例：下拉面板宽度 dropdownMatchSelectWidth（指定为 300）
const valueMatchWidth = ref('')
const avalueMatchWidth = ref('')
const optionsMatchWidth = ['一个较长的选项文本 A', '一个较长的选项文本 B', '一个较长的选项文本 C']
const aoptionsMatchWidth = optionsMatchWidth.map((value) => ({ value }))
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value1"
          :options="options1"
          style="width: 200px"
          placeholder="input here"
          @search="onSearch1"
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue1"
          :options="aoptions1"
          style="width: 200px"
          placeholder="input here"
          @search="onASearch1"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义选项</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value2"
          :options="options2"
          style="width: 200px"
          placeholder="input here"
          @search="onSearch2"
        >
          <template #option="{ value: val }">
            {{ val.split('@')[0] }} @
            <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
          </template>
        </AutoComplete>
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue2"
          :options="aoptions2"
          style="width: 200px"
          placeholder="input here"
          @search="onASearch2"
        >
          <template #option="{ value: val }">
            {{ val.split('@')[0] }} @
            <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
          </template>
        </a-auto-complete>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义输入组件</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value3"
          :options="options3"
          style="width: 200px"
          @search="onSearch3"
          @select="onSelect3"
        >
          <Textarea placeholder="input here" style="height: 50px" />
        </AutoComplete>
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue3"
          :options="aoptions3"
          style="width: 200px"
          @search="onASearch3"
          @select="onSelect3"
        >
          <a-textarea placeholder="input here" style="height: 50px" />
        </a-auto-complete>
      </Space>
    </Space>
    <h2 class="mt30 mb10">不区分大小写</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value4"
          :options="options4"
          style="width: 200px"
          placeholder="input here"
          :filter-option="filterOption"
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue4"
          :options="aoptions4"
          style="width: 200px"
          placeholder="input here"
          :filter-option="filterOption"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">查询模式 - 确定类目</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue5"
          :options="adataSource5"
          style="width: 250px"
          :dropdown-match-select-width="500"
        >
          <template #option="item">
            <template v-if="item.options">
              <div style="display: flex; justify-content: space-between; align-items: center">
                <span>{{ item.value }}</span>
                <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer"> more </a>
              </div>
            </template>
            <template v-else-if="item.value === 'all'">
              <a href="https://www.google.com/search?q=ant-design-vue" target="_blank" rel="noopener noreferrer">
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
          <a-input-search placeholder="input here" size="large" />
        </a-auto-complete>
      </Space>
      <Space vertical>
        <AutoComplete
          v-model:value="value5"
          :options="options5"
          style="width: 250px"
          :dropdown-match-select-width="500"
        >
          <template #option="item">
            <template v-if="item.options">
              <div style="display: flex; justify-content: space-between; align-items: center">
                <span>{{ item.value }}</span>
                <a href="https://www.google.com/search?q=ant-design-vue" target="_blank" rel="noopener noreferrer">
                  more
                </a>
              </div>
            </template>
            <template v-else-if="item.value === 'all'">
              <a href="https://www.google.com/search?q=ant-design-vue" target="_blank" rel="noopener noreferrer">
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
      </Space>
    </Space>
    <h2 class="mt30 mb10">查询模式 - 不确定类目</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value6"
          :options="options6"
          style="width: 300px"
          @select="onSelect6"
          @search="onSearch6"
        >
          <template #option="item">
            <div style="display: flex; justify-content: space-between">
              <span>
                Found {{ item.query }} on
                <a :href="`https://s.taobao.com/search?q=${item.query}`" target="_blank" rel="noopener noreferrer">
                  {{ item.category }}
                </a>
              </span>
              <span>{{ item.count }} results</span>
            </div>
          </template>
          <InputSearch size="large" placeholder="input here" allow-clear :search-props="{ type: 'primary' }" />
        </AutoComplete>
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue6"
          :options="aoptions6"
          style="width: 300px"
          @select="onSelect6"
          @search="onASearch6"
        >
          <template #option="item">
            <div style="display: flex; justify-content: space-between">
              <span>
                Found {{ item.query }} on
                <a :href="`https://s.taobao.com/search?q=${item.query}`" target="_blank" rel="noopener noreferrer">
                  {{ item.category }}
                </a>
              </span>
              <span>{{ item.count }} results</span>
            </div>
          </template>
          <a-input-search size="large" placeholder="input here" allow-clear enter-button />
        </a-auto-complete>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义状态</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value7"
          :options="options7"
          style="width: 200px"
          placeholder="input here"
          status="error"
          @search="onSearch7"
          @select="onSelect7"
        />
        <AutoComplete
          v-model:value="value8"
          :options="options7"
          style="width: 200px"
          placeholder="input here"
          status="warning"
          allow-clear
          @search="onSearch7"
          @select="onSelect7"
          @clear="onClear"
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue7"
          :options="aoptions7"
          style="width: 200px"
          placeholder="input here"
          status="error"
          @search="onASearch7"
          @select="onSelect7"
        />
        <a-auto-complete
          v-model:value="avalue8"
          :options="aoptions7"
          style="width: 200px"
          placeholder="input here"
          status="warning"
          allow-clear
          @search="onASearch7"
          @select="onSelect7"
          @clear="onClear"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">无边框</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value9"
          :options="options7"
          style="width: 200px"
          placeholder="border less"
          :bordered="false"
          @search="onSearch7"
          @select="onSelect7"
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue9"
          :options="aoptions7"
          style="width: 200px"
          placeholder="border less"
          :bordered="false"
          @search="onASearch7"
          @select="onSelect7"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义清除按钮</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value10"
          :options="options7"
          style="width: 200px"
          placeholder="Clearable"
          allow-clear
          @search="onSearch7"
          @select="onSelect7"
        />
        <AutoComplete
          v-model:value="value11"
          :options="options7"
          style="width: 200px"
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
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalue10"
          :options="aoptions7"
          style="width: 200px"
          placeholder="Clearable"
          allow-clear
          @search="onASearch7"
          @select="onSelect7"
        />
        <a-auto-complete
          v-model:value="avalue11"
          :options="aoptions7"
          style="width: 200px"
          placeholder="Customized clear icon"
          allow-clear
          @search="onASearch7"
          @select="onSelect7"
        >
          <template #clearIcon>
            <CloseOutlined />
          </template>
        </a-auto-complete>
      </Space>
    </Space>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Space align="start" :size="40">
        <Space vertical>
          <AutoComplete
            v-model:value="valueS"
            :options="optionsD"
            style="width: 200px"
            placeholder="input here"
            :size="size"
          />
        </Space>
        <Space vertical>
          <a-auto-complete
            v-model:value="avalueS"
            :options="optionsD"
            style="width: 200px"
            placeholder="input here"
            :size="size"
          />
        </Space>
      </Space>
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueD"
          :options="optionsD"
          style="width: 200px"
          placeholder="input here"
          disabled
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalueD"
          :options="optionsD"
          style="width: 200px"
          placeholder="input here"
          disabled
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">禁用选项</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete v-model:value="valueDD" :options="optionsD" style="width: 200px" placeholder="input here" />
      </Space>
      <Space vertical>
        <a-auto-complete v-model:value="avalueDD" :options="optionsD" style="width: 200px" placeholder="input here" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">字符串数组数据源</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete v-model:value="valueArr" :options="optionsArr" style="width: 200px" placeholder="input here" />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalueArr"
          :options="aoptionsArr"
          style="width: 200px"
          placeholder="input here"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">分组数据源</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueGroup"
          :options="optionsGroup"
          style="width: 200px"
          placeholder="input here"
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalueGroup"
          :options="aoptionsGroup"
          style="width: 200px"
          placeholder="input here"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">键盘/悬浮回填（backfill）</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueBackfill"
          :options="optionsBackfill"
          style="width: 200px"
          placeholder="input here"
          backfill
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalueBackfill"
          :options="aoptionsBackfill"
          style="width: 200px"
          placeholder="input here"
          backfill
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">受控展开（open）</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <Button @click="openControlled = !openControlled">{{ openControlled ? '收起' : '展开' }}下拉</Button>
        <AutoComplete
          v-model:value="valueOpen"
          :options="optionsOpen"
          :open="openControlled"
          style="width: 200px"
          placeholder="input here"
          @dropdown-visible-change="openControlled = $event"
        />
      </Space>
      <Space vertical>
        <a-button @click="aopenControlled = !aopenControlled">{{ aopenControlled ? '收起' : '展开' }}下拉</a-button>
        <a-auto-complete
          v-model:value="avalueOpen"
          :options="aoptionsOpen"
          :open="aopenControlled"
          style="width: 200px"
          placeholder="input here"
          @dropdown-visible-change="aopenControlled = $event"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">默认展开（defaultOpen）</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueDefaultOpen"
          :options="optionsOpen"
          style="width: 200px"
          placeholder="input here"
          default-open
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalueDefaultOpen"
          :options="aoptionsOpen"
          style="width: 200px"
          placeholder="input here"
          default-open
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">关闭默认高亮首项（defaultActiveFirstOption）</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueActiveFirst"
          :options="optionsOpen"
          style="width: 200px"
          placeholder="input here"
          :default-active-first-option="false"
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalueActiveFirst"
          :options="aoptionsOpen"
          style="width: 200px"
          placeholder="input here"
          :default-active-first-option="false"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">下拉面板宽度（dropdownMatchSelectWidth）</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueMatchWidth"
          :options="optionsMatchWidth"
          style="width: 200px"
          placeholder="面板宽 300"
          :dropdown-match-select-width="300"
        />
      </Space>
      <Space vertical>
        <a-auto-complete
          v-model:value="avalueMatchWidth"
          :options="aoptionsMatchWidth"
          style="width: 200px"
          placeholder="面板宽 300"
          :dropdown-match-select-width="300"
        />
      </Space>
    </Space>
  </div>
</template>
