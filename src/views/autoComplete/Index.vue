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
// 键盘/悬浮回填 backfill（hover 选项时回填输入框）
const valueBackfill = ref('')
const optionsBackfill = ['Apple', 'Banana', 'Cherry', 'Durian']
// 受控展开 open（外部按钮控制下拉面板显隐）
const valueOpen = ref('')
const openControlled = ref(false)
const optionsOpen = ['Option 1', 'Option 2', 'Option 3']
// 默认展开 defaultOpen
const valueDefaultOpen = ref('')
// 关闭默认高亮首项 defaultActiveFirstOption
const valueActiveFirst = ref('')
// 下拉面板宽度 dropdownMatchSelectWidth（指定为 300）
const valueMatchWidth = ref('')
const optionsMatchWidth = ['一个较长的选项文本 A', '一个较长的选项文本 B', '一个较长的选项文本 C']
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
          :width="200"
          placeholder="input here"
          @search="onSearch1"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义选项</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value2"
          :options="options2"
          :width="200"
          placeholder="input here"
          @search="onSearch2"
        >
          <template #option="{ value: val }">
            {{ val.split('@')[0] }} @
            <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
          </template>
        </AutoComplete>
      </Space>
    </Space>
    <h2 class="mt30 mb10">自定义输入组件</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete v-model:value="value3" :options="options3" :width="200" @search="onSearch3" @select="onSelect3">
          <Textarea placeholder="input here" style="height: 50px" />
        </AutoComplete>
      </Space>
    </Space>
    <h2 class="mt30 mb10">不区分大小写</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value4"
          :options="options4"
          :width="200"
          placeholder="input here"
          :filter-option="filterOption"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">查询模式 - 确定类目</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete v-model:value="value5" :options="options5" :width="250" :dropdown-match-select-width="500">
          <template #option="item">
            <template v-if="item.options">
              <div style="display: flex; justify-content: space-between; align-items: center">
                <span>{{ item.value }}</span>
                <a href="https://www.google.com/search?q=vue-amazing-ui" target="_blank" rel="noopener noreferrer">
                  more
                </a>
              </div>
            </template>
            <template v-else-if="item.value === 'all'">
              <a href="https://www.google.com/search?q=vue-amazing-ui" target="_blank" rel="noopener noreferrer">
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
        <AutoComplete v-model:value="value6" :options="options6" :width="300" @select="onSelect6" @search="onSearch6">
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
    </Space>
    <h2 class="mt30 mb10">自定义状态</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value7"
          :options="options7"
          :width="200"
          placeholder="input here"
          status="error"
          @search="onSearch7"
          @select="onSelect7"
        />
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
      </Space>
    </Space>
    <h2 class="mt30 mb10">无边框</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="value9"
          :options="options7"
          :width="200"
          placeholder="border less"
          :bordered="false"
          @search="onSearch7"
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
          :width="200"
          placeholder="Clearable"
          allow-clear
          @search="onSearch7"
          @select="onSelect7"
        />
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
      </Space>
    </Space>
    <h2 class="mt30 mb10">三种尺寸</h2>
    <Space vertical>
      <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
      <Space align="start" :size="40">
        <Space vertical>
          <AutoComplete v-model:value="valueS" :options="optionsD" :width="200" placeholder="input here" :size="size" />
        </Space>
      </Space>
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete v-model:value="valueD" :options="optionsD" :width="200" placeholder="input here" disabled />
      </Space>
    </Space>
    <h2 class="mt30 mb10">禁用选项</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete v-model:value="valueDD" :options="optionsD" :width="200" placeholder="input here" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">字符串数组数据源</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete v-model:value="valueArr" :options="optionsArr" :width="200" placeholder="input here" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">分组数据源</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete v-model:value="valueGroup" :options="optionsGroup" :width="200" placeholder="input here" />
      </Space>
    </Space>
    <h2 class="mt30 mb10">键盘/悬浮回填</h2>
    <p class="mb10"
      >键盘 <code>↑</code> <code>↓</code> 导航选项时会回填选中项到输入框中，按 <code>Enter</code> 确认选中，按
      <code>Esc</code> 还原输入，悬浮选项同样会回填。</p
    >
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueBackfill"
          :options="optionsBackfill"
          :width="200"
          placeholder="input here"
          backfill
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">受控展开</h2>
    <p class="mb10">通过 <code>open</code> 控制面板显隐，配合 <code>dropdownVisibleChange</code> 事件使用。</p>
    <Space>
      <AutoComplete
        v-model:value="valueOpen"
        :options="optionsOpen"
        :open="openControlled"
        :width="200"
        placeholder="input here"
        @dropdown-visible-change="openControlled = $event"
      />
      <Button type="primary" @click="openControlled = !openControlled"
        >{{ openControlled ? '收起' : '展开' }}下拉</Button
      >
    </Space>
    <h2 class="mt30 mb10">默认展开</h2>
    <p class="mb10">初始即展开面板，区别于受控的 <code>open</code>，初始值生效后不受外部状态控制。</p>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueDefaultOpen"
          :options="optionsOpen"
          :width="200"
          placeholder="input here"
          default-open
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">关闭默认高亮首项</h2>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueActiveFirst"
          :options="optionsOpen"
          :width="200"
          placeholder="input here"
          :default-active-first-option="false"
        />
      </Space>
    </Space>
    <h2 class="mt30 mb10">下拉面板宽度</h2>
    <p class="mb10">通过 <code>dropdownMatchSelectWidth</code> 指定面板宽度，空间不足时自动调整对齐。</p>
    <Space align="start" :size="40">
      <Space vertical>
        <AutoComplete
          v-model:value="valueMatchWidth"
          :options="optionsMatchWidth"
          :width="200"
          placeholder="面板宽 300"
          :dropdown-match-select-width="300"
        />
      </Space>
    </Space>
  </div>
</template>
