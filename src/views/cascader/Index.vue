<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderOption, CascaderPlacement, CascaderProps } from 'vue-amazing-ui'
// 省市区数据：基本使用 / 移入展开 / 选择即改变 / 三种大小 / 自定义已选项 / 搜索 / 后缀图标 / 禁用 / 清除 / 受控展开共用
const options: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖', code: 330100 },
          { value: 'xiasha', label: '下沙', code: 310018, disabled: true }
        ]
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [{ value: 'yinzhou', label: '鄞州', code: 315100 }]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [{ value: 'zhonghuamen', label: '中华门', code: 210000 }]
      },
      {
        value: 'wuxi',
        label: '无锡',
        children: [{ value: 'jiangyin', label: '江阴', code: 214400 }]
      }
    ]
  },
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'beijingshi',
        label: '北京市',
        children: [
          { value: 'dongcheng', label: '东城区', code: 100010 },
          { value: 'xicheng', label: '西城区', code: 100032 }
        ]
      }
    ]
  }
]
// 长列表数据：列内项数超过面板高度以触发滚动，可选项足够多才能看出 tag 折叠效果
const longOptions: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'yuhang', label: '余杭' }
        ]
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'yinzhou', label: '鄞州' },
          { value: 'haishu', label: '海曙' }
        ]
      },
      { value: 'wenzhou', label: '温州', children: [{ value: 'lucheng', label: '鹿城' }] },
      { value: 'shaoxing', label: '绍兴', children: [{ value: 'yuecheng', label: '越城' }] }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'zhonghuamen', label: '中华门' },
          { value: 'xuanwu', label: '玄武' }
        ]
      },
      { value: 'wuxi', label: '无锡', children: [{ value: 'jiangyin', label: '江阴' }] },
      { value: 'suzhou', label: '苏州', children: [{ value: 'gusu', label: '姑苏' }] }
    ]
  },
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'beijingshi',
        label: '北京市',
        children: [
          { value: 'dongcheng', label: '东城区' },
          { value: 'xicheng', label: '西城区' }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'shanghaishi',
        label: '上海市',
        children: [
          { value: 'huangpu', label: '黄浦区' },
          { value: 'xuhui', label: '徐汇区' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    label: '广东',
    children: [
      {
        value: 'guangzhou',
        label: '广州',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'yuexiu', label: '越秀区' }
        ]
      },
      { value: 'shenzhen', label: '深圳', children: [{ value: 'futian', label: '福田区' }] }
    ]
  },
  {
    value: 'sichuan',
    label: '四川',
    children: [
      {
        value: 'chengdu',
        label: '成都',
        children: [
          { value: 'wuhou', label: '武侯区' },
          { value: 'jinjiang', label: '锦江区' }
        ]
      }
    ]
  },
  {
    value: 'hubei',
    label: '湖北',
    children: [
      { value: 'wuhan', label: '武汉', children: [{ value: 'wuchang', label: '武昌区' }] },
      { value: 'yichang', label: '宜昌', children: [{ value: 'xiling', label: '西陵区' }] }
    ]
  },
  {
    value: 'shaanxi',
    label: '陕西',
    children: [
      { value: 'xian', label: '西安', children: [{ value: 'yanta', label: '雁塔区' }] },
      { value: 'xianyang', label: '咸阳', children: [{ value: 'qindu', label: '秦都区' }] }
    ]
  }
]
// 禁用选项：父级禁用后整棵子树不可达
const disabledOptions: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    disabled: true,
    children: [{ value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖' }] }]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [{ value: 'nanjing', label: '南京', children: [{ value: 'zhonghuamen', label: '中华门' }] }]
  }
]
// 自定义字段名：code / name / items
const customFieldOptions = [
  {
    code: '1',
    name: '浙江',
    items: [
      {
        code: '11',
        name: '杭州',
        items: [
          { code: '111', name: '西湖' },
          { code: '112', name: '余杭' }
        ]
      }
    ]
  },
  {
    code: '2',
    name: '江苏',
    items: [
      {
        code: '21',
        name: '南京',
        items: [
          { code: '211', name: '玄武' },
          { code: '212', name: '秦淮' }
        ]
      }
    ]
  }
]
const sizeRadios = [
  { label: 'large', value: 'large' },
  { label: 'middle', value: 'middle' },
  { label: 'small', value: 'small' }
]
const size = ref<CascaderProps['size']>('middle')
// 各分区独立绑定：避免操作一个用例时其余用例同步联动，便于单独核对每个特性
const basicValue = ref<CascaderProps['value']>(['zhejiang', 'hangzhou', 'xihu'])
const customTriggerValue = ref<CascaderProps['value']>(['zhejiang', 'hangzhou', 'xihu'])
const hoverValue = ref<CascaderProps['value']>([])
const disabledOptionValue = ref<CascaderProps['value']>([])
const changeOnSelectValue = ref<CascaderProps['value']>(['zhejiang'])
const sizeValue = ref<CascaderProps['value']>(['zhejiang', 'hangzhou', 'xihu'])
const displayRenderValue = ref<CascaderProps['value']>(['zhejiang', 'hangzhou', 'xihu'])
const optionSlotValue = ref<CascaderProps['value']>([])
const searchValue = ref<CascaderProps['value']>([])
const searchRenderValue = ref<CascaderProps['value']>([])
const fieldNameValue = ref<CascaderProps['value']>(['1', '11', '111'])
const suffixSlotValue = ref<CascaderProps['value']>([])
const suffixIconValue = ref<CascaderProps['value']>([])
const disabledValue = ref<CascaderProps['value']>(['zhejiang', 'ningbo', 'yinzhou'])
const clearValue = ref<CascaderProps['value']>(['jiangsu', 'nanjing', 'zhonghuamen'])
const emptyOptionsValue = ref<CascaderProps['value']>([])
const emptyFallbackValue = ref<CascaderProps['value']>([])
const emptySearchValue = ref<CascaderProps['value']>([])
const emptySlotValue = ref<CascaderProps['value']>([])
const statusErrorValue = ref<CascaderProps['value']>([])
const statusWarningValue = ref<CascaderProps['value']>([])
const statusBorderlessValue = ref<CascaderProps['value']>([])
const open = ref(false)
const controlledValue = ref<CascaderProps['value']>([])
const controlledSearchValue = ref<CascaderProps['value']>([])
const controlledKeyword = ref('')
const placement = ref<CascaderPlacement>('bottomLeft')
const placementOptions: { label: string; value: CascaderPlacement }[] = [
  { label: '左下', value: 'bottomLeft' },
  { label: '右下', value: 'bottomRight' },
  { label: '左上', value: 'topLeft' },
  { label: '右上', value: 'topRight' }
]
const placementValue = ref<CascaderProps['value']>([])
const panelHeightSmallValue = ref<CascaderProps['value']>([])
const panelHeightLargeValue = ref<CascaderProps['value']>([])
function onChange(values: (string | number)[], selectedOptions: CascaderOption[]) {
  console.log('values', values)
  console.log('selectedOptions', selectedOptions)
}
// 搜索过滤函数：只匹配第三级（区）文本
function searchFilter(inputValue: string, path: CascaderOption[]) {
  const target = path[path.length - 1]
  return String(target?.label ?? '')
    .toLowerCase()
    .includes(inputValue.toLowerCase())
}

// 多选：值为路径数组
const multipleValue = ref<CascaderProps['value']>([['zhejiang', 'hangzhou', 'xihu']])
const tagRenderValue = ref<CascaderProps['value']>([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'nanjing', 'zhonghuamen']
])
// 最大 tag 数：取 6 条不同省份的末级（互不折叠），max-tag-count 才能折叠出剩余项
const maxTagCountValue = ref<CascaderProps['value']>([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'nanjing', 'zhonghuamen'],
  ['beijing', 'beijingshi', 'dongcheng'],
  ['shanghai', 'shanghaishi', 'huangpu'],
  ['guangdong', 'guangzhou', 'tianhe'],
  ['sichuan', 'chengdu', 'wuhou']
])
const maxTagResponsiveValue = ref<CascaderProps['value']>([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'nanjing', 'zhonghuamen'],
  ['beijing', 'beijingshi', 'dongcheng'],
  ['shanghai', 'shanghaishi', 'huangpu'],
  ['guangdong', 'guangzhou', 'tianhe'],
  ['sichuan', 'chengdu', 'wuhou']
])
const maxTagSlotValue = ref<CascaderProps['value']>([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'nanjing', 'zhonghuamen'],
  ['beijing', 'beijingshi', 'dongcheng'],
  ['shanghai', 'shanghaishi', 'huangpu'],
  ['guangdong', 'guangzhou', 'tianhe'],
  ['sichuan', 'chengdu', 'wuhou']
])
const keyboardValue = ref<CascaderProps['value']>([])
// 回填顺序观察用例：北京只剩零散末级，浙江 / 江苏 的分支可整体折叠为父级
const orderValue = ref<CascaderProps['value']>([
  ['beijing', 'beijingshi', 'dongcheng'],
  ['zhejiang', 'hangzhou', 'xihu'],
  ['zhejiang', 'ningbo', 'yinzhou'],
  ['jiangsu', 'nanjing', 'zhonghuamen'],
  ['jiangsu', 'wuxi', 'jiangyin']
])
const strategyValue = ref<CascaderProps['value']>([])
const childStrategyValue = ref<CascaderProps['value']>([])
// 异步加载：父级先占位 isLeaf: false，展开时写入子项
const LAZY_CHILDREN: Record<string, CascaderOption[]> = {
  zhejiang: [
    { value: 'hangzhou', label: '杭州', isLeaf: false },
    { value: 'ningbo', label: '宁波', isLeaf: false }
  ],
  jiangsu: [
    { value: 'nanjing', label: '南京', isLeaf: false },
    { value: 'wuxi', label: '无锡', isLeaf: false }
  ],
  hangzhou: [{ value: 'xihu', label: '西湖' }],
  ningbo: [{ value: 'yinzhou', label: '鄞州' }],
  nanjing: [{ value: 'zhonghuamen', label: '中华门' }],
  wuxi: [{ value: 'jiangyin', label: '江阴' }]
}
const lazyOptions = ref<CascaderOption[]>([
  { value: 'zhejiang', label: '浙江', isLeaf: false },
  { value: 'jiangsu', label: '江苏', isLeaf: false }
])
const lazyValue = ref<CascaderProps['value']>([])
function loadLazyData(selectedOptions: CascaderOption[]) {
  const target = selectedOptions[selectedOptions.length - 1]
  if (!target) return
  const key = String(target.value ?? '')
  target.loading = true
  setTimeout(() => {
    target.children = LAZY_CHILDREN[key] ?? []
    target.loading = false
  }, 600)
}
// 自定义已选项：末级展示邮编
function onAreaClick(e: MouseEvent, code?: number) {
  e.preventDefault()
  console.log('postcode', code)
}
// 长列表：省级 200、每省 200 个市级（市级文本带省级序号，便于看出父级切换）；区级共享一份数组
const MANY_OPTIONS_LENGTH = 200
const manyAreas: CascaderOption[] = Array.from({ length: MANY_OPTIONS_LENGTH }, (_, index) => ({
  value: `area-${index}`,
  label: `区级 ${index + 1}`
}))
const manyOptions: CascaderOption[] = Array.from({ length: MANY_OPTIONS_LENGTH }, (_, provinceIndex) => ({
  value: `province-${provinceIndex}`,
  label: `省级 ${provinceIndex + 1}`,
  children: Array.from({ length: MANY_OPTIONS_LENGTH }, (_, cityIndex) => ({
    value: `city-${provinceIndex}-${cityIndex}`,
    label: `市级 ${provinceIndex + 1}-${cityIndex + 1}`,
    children: manyAreas
  }))
}))
const virtualValue = ref<CascaderProps['value']>([])
// 底部操作区：确定后收起面板
const actionRef = ref<{ blur: () => void } | null>(null)
const actionValue = ref<CascaderProps['value']>([['zhejiang', 'hangzhou', 'xihu']])
function onActionConfirm() {
  actionRef.value?.blur()
}
// 已勾选数据：通过实例方法读取，不依赖 change 事件的触发时机
const checkedRef = ref<{ getCheckedData: () => CascaderOption[][] } | null>(null)
const checkedValue = ref<CascaderProps['value']>([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'wuxi', 'jiangyin']
])
const checkedData = ref<CascaderOption[][]>([])
function onReadCheckedData() {
  const data = checkedRef.value?.getCheckedData() ?? []
  checkedData.value = data
  console.log('getCheckedData', data)
}
</script>
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <p class="mb10">省市区三级联动，面板按列展示，选中回填完整路径</p>
    <Cascader v-model:value="basicValue" placeholder="请选择" :options="options" @change="onChange" />
    <h2 class="mt30 mb10">可以自定义显示</h2>
    <p class="mb10">默认插槽替换整个触发器，选中结果由外部展示</p>
    <span>
      {{ customTriggerValue?.length ? '已选择' : '未选择' }} &nbsp;
      <Cascader v-model:value="customTriggerValue" placeholder="请选择" :options="options" @change="onChange">
        <a href="#" @click.prevent>切换城市</a>
      </Cascader>
    </span>
    <h2 class="mt30 mb10">移入展开</h2>
    <p class="mb10">通过 <code>expand-trigger="hover"</code> 把次级菜单的展开方式改为悬浮</p>
    <Cascader
      v-model:value="hoverValue"
      placeholder="请选择"
      :options="options"
      expand-trigger="hover"
      @change="onChange"
    />
    <h2 class="mt30 mb10">禁用选项</h2>
    <p class="mb10">在 <code>options</code> 中给选项设置 <code>disabled</code> 即可禁用整棵子树</p>
    <Cascader v-model:value="disabledOptionValue" placeholder="请选择" :options="disabledOptions" @change="onChange" />
    <h2 class="mt30 mb10">选择即改变</h2>
    <p class="mb10">
      <code>change-on-select</code> 打开后点选任意层级都会改变 <code>value</code>，面板保持展开供继续下钻
    </p>
    <Cascader
      v-model:value="changeOnSelectValue"
      placeholder="请选择"
      :options="options"
      change-on-select
      @change="onChange"
    />
    <h2 class="mt30 mb10">多选</h2>
    <p class="mb10">
      打开 <code>multiple</code> 后面板每列出现复选按钮，勾选父级会连带全部子项；已选项以 tag 回填，可逐个移除
    </p>
    <Cascader v-model:value="multipleValue" placeholder="请选择" :options="options" multiple @change="onChange" />
    <h2 class="mt30 mb10">三种大小</h2>
    <p class="mb10">通过 <code>size</code> 切换选择器尺寸</p>
    <Space vertical>
      <RadioGroup :options="sizeRadios" v-model:value="size" button button-style="solid" />
      <Cascader v-model:value="sizeValue" placeholder="请选择" :options="options" :size="size" @change="onChange" />
    </Space>
    <h2 class="mt30 mb10">自定义已选项</h2>
    <p class="mb10">通过 <code>#displayRender</code> 插槽接管回填内容，末级可附自定义信息</p>
    <Cascader v-model:value="displayRenderValue" placeholder="请选择" :options="options" @change="onChange">
      <template #displayRender="{ labels, selectedOptions }">
        <span v-for="(label, index) in labels" :key="selectedOptions[index]?.value">
          <span v-if="index === labels.length - 1">
            {{ label }}（
            <a @click="onAreaClick($event, selectedOptions[index]?.code)">{{ selectedOptions[index]?.code }}</a>
            ）
          </span>
          <span v-else>{{ label }} /</span>
        </span>
      </template>
    </Cascader>
    <h2 class="mt30 mb10">自定义选项内容</h2>
    <p class="mb10">通过 <code>#option</code> 插槽接管选项渲染，作用域参数为当前选项数据，自定义字段一并透传</p>
    <Cascader v-model:value="optionSlotValue" placeholder="请选择" :options="options" @change="onChange">
      <template #option="{ label, code }">
        <span>{{ label }}</span>
        <span v-if="code" class="option-code">{{ code }}</span>
      </template>
    </Cascader>
    <h2 class="mt30 mb10">搜索</h2>
    <p class="mb10">
      打开 <code>show-search</code> 后可直接输入关键词，结果按完整路径展示并高亮命中片段；传对象可自定义
      <code>filter</code> / <code>sort</code> / <code>limit</code> /
      <code>render</code>。多选下点选结果即切换该路径的勾选，搜索文本随之清空并回到该路径所在列
    </p>
    <Cascader
      v-model:value="searchValue"
      placeholder="请选择"
      :options="options"
      :show-search="{ filter: searchFilter }"
      @change="onChange"
    />
    <h2 class="mt30 mb10">搜索结果自定义</h2>
    <p class="mb10">
      <code>#showSearchRender</code>
      插槽接管搜索结果项的内容，作用域参数含输入文本、命中路径、已切分的高亮片段与 <code>disabled</code>；下方用例用
      <code>segments</code> 还原内置样式（<code> / </code> 分隔 + 命中的关键词标红 + 路径含禁用项时置灰）
    </p>
    <Cascader v-model:value="searchRenderValue" placeholder="请选择" :options="options" show-search @change="onChange">
      <template #showSearchRender="{ segments, disabled }">
        <template v-for="(level, levelIndex) in segments" :key="levelIndex">
          <span v-if="levelIndex > 0" :class="{ 'search-disabled': disabled }"> / </span>
          <span
            v-for="(segment, segmentIndex) in level"
            :key="segmentIndex"
            :class="{ 'search-keyword': segment.hit, 'search-disabled': disabled }"
            >{{ segment.text }}</span
          >
        </template>
      </template>
    </Cascader>
    <h2 class="mt30 mb10">动态加载选项</h2>
    <p class="mb10">
      通过 <code>loadData</code> 按需加载子级：父级先以 <code>isLeaf: false</code> 占位，展开时写入子项并解除
      <code>loading</code>；加载结果为空时把该选项的 <code>isLeaf</code> 置为 <code>true</code>，加载图标随之结束
    </p>
    <Cascader
      v-model:value="lazyValue"
      placeholder="请选择"
      :options="lazyOptions"
      :load-data="loadLazyData"
      @change="onChange"
    />
    <h2 class="mt30 mb10">自定义字段名</h2>
    <p class="mb10"
      >通过 <code>fieldNames</code> 指定 <code>label</code> / <code>value</code> / <code>children</code> 对应的字段</p
    >
    <Cascader
      v-model:value="fieldNameValue"
      placeholder="请选择"
      :options="customFieldOptions"
      :field-names="{ label: 'name', value: 'code', children: 'items' }"
      @change="onChange"
    />
    <h2 class="mt30 mb10">自定义 tag 内容</h2>
    <p class="mb10">通过 <code>#tagRender</code> 插槽接管多选 tag 的渲染，作用域参数含路径、文本与移除方法</p>
    <Cascader v-model:value="tagRenderValue" placeholder="请选择" :options="options" multiple @change="onChange">
      <template #tagRender="{ label, onClose }">
        <span class="custom-tag">
          {{ label }}
          <a @click="onClose">移除</a>
        </span>
      </template>
    </Cascader>
    <h2 class="mt30 mb10">后缀图标</h2>
    <p class="mb10">通过 <code>#suffixIcon</code> 插槽或 <code>suffixIcon</code> 属性替换默认箭头</p>
    <Space>
      <Cascader v-model:value="suffixSlotValue" placeholder="请选择" :options="options" @change="onChange">
        <template #suffixIcon>
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
            <path d="M8 12h8" stroke="currentColor" stroke-width="2" />
          </svg>
        </template>
      </Cascader>
      <Cascader
        v-model:value="suffixIconValue"
        placeholder="请选择"
        :options="options"
        suffix-icon="ab"
        @change="onChange"
      />
    </Space>
    <h2 class="mt30 mb10">禁用</h2>
    <p class="mb10">整体禁用时不响应点击，清除图标与面板均不可用</p>
    <Cascader v-model:value="disabledValue" placeholder="请选择" :options="options" disabled @change="onChange" />
    <h2 class="mt30 mb10">支持清除</h2>
    <p class="mb10">悬浮时出现清除图标，点击回写空路径；<code>change</code> 收到空数组</p>
    <Cascader v-model:value="clearValue" placeholder="请选择" :options="options" allow-clear @change="onChange" />
    <h2 class="mt30 mb10">空数据</h2>
    <p class="mb10"
      >无选项或搜索无结果时展示 <code>Empty</code>，传 <code>notFoundContent: null</code> 时回落默认空态；<code
        >#notFoundContent</code
      >
      插槽可自定义空数据内容</p
    >
    <Space>
      <Cascader v-model:value="emptyOptionsValue" placeholder="请选择" :options="[]" />
      <Cascader v-model:value="emptyFallbackValue" placeholder="请选择" :options="[]" :not-found-content="null" />
      <Cascader
        v-model:value="emptySearchValue"
        placeholder="请选择"
        :options="[{ value: '1', label: '浙江', children: [] }]"
        show-search
      />
      <Cascader v-model:value="emptySlotValue" placeholder="请选择" :options="[]">
        <template #notFoundContent>
          <span class="empty-slot-text">暂无数据</span>
        </template>
      </Cascader>
    </Space>
    <h2 class="mt30 mb10">自定义状态</h2>
    <p class="mb10">通过 <code>status</code> 设置校验状态，与 <code>Input</code> / <code>Select</code> 同一口径</p>
    <Space>
      <Cascader v-model:value="statusErrorValue" placeholder="请选择" :options="options" status="error" />
      <Cascader v-model:value="statusWarningValue" placeholder="请选择" :options="options" status="warning" />
      <Cascader v-model:value="statusBorderlessValue" placeholder="请选择" :options="options" :bordered="false" />
    </Space>
    <h2 class="mt30 mb10">受控展开</h2>
    <p class="mb10">
      通过 <code>v-model:open</code> 控制面板显隐，配套 <code>open-change</code> 事件；<code>search-value</code>
      可受控搜索文本
    </p>
    <Space vertical>
      <Space>
        <Cascader
          v-model:value="controlledValue"
          v-model:open="open"
          placeholder="请选择"
          :options="options"
          @change="onChange"
        />
        <Button type="primary" @click="open = !open">{{ open ? '收起面板' : '展开面板' }}</Button>
      </Space>
      <Space>
        <Cascader
          v-model:value="controlledSearchValue"
          v-model:search-value="controlledKeyword"
          placeholder="请选择"
          :options="options"
          show-search
          @change="onChange"
        />
        <Button @click="controlledKeyword = 'hang'">设为 hang</Button>
        <Button @click="controlledKeyword = ''">清空关键词</Button>
      </Space>
    </Space>
    <h2 class="mt30 mb10">默认值</h2>
    <p class="mb10">通过 <code>default-value</code> 提供非受控初值，形态与 <code>value</code> 一致</p>
    <Space>
      <Cascader placeholder="请选择" :options="options" :default-value="['jiangsu', 'nanjing', 'zhonghuamen']" />
      <Cascader placeholder="请选择" :options="options" multiple :default-value="[['zhejiang', 'hangzhou', 'xihu']]" />
    </Space>
    <h2 class="mt30 mb10">多选回填策略</h2>
    <p class="mb10">
      <code>show-checked-strategy</code> 决定父级全选时的回填形态：<code>SHOW_PARENT</code>（默认）只回填父级路径，
      <code>SHOW_CHILD</code> 只回填叶子路径
    </p>
    <Space>
      <Cascader
        v-model:value="strategyValue"
        placeholder="请选择"
        :options="options"
        multiple
        show-checked-strategy="SHOW_PARENT"
        @change="onChange"
      />
      <Cascader
        v-model:value="childStrategyValue"
        placeholder="请选择"
        :options="options"
        multiple
        show-checked-strategy="SHOW_CHILD"
        @change="onChange"
      />
    </Space>
    <h2 class="mt30 mb10">多选回填顺序</h2>
    <p class="mb10">
      已选内容的顺序跟随值中路径的先后：可折叠为父级的分支在首次出现的位置收敛成一条，其后的同级项并入该条
    </p>
    <Cascader v-model:value="orderValue" placeholder="请选择" :options="options" multiple @change="onChange" />
    <h2 class="mt30 mb10">最大 tag 数</h2>
    <p class="mb10">
      通过 <code>max-tag-count</code> 折叠超出数量的 tag（传 <code>'responsive'</code> 时按容器宽度自动折叠），
      <code>max-tag-placeholder</code> 属性或 <code>#maxTagPlaceholder</code> 插槽自定义折叠提示
    </p>
    <Space>
      <Cascader
        v-model:value="maxTagCountValue"
        placeholder="请选择"
        :options="longOptions"
        multiple
        :max-tag-count="3"
        @change="onChange"
      />
      <Cascader
        v-model:value="maxTagResponsiveValue"
        placeholder="请选择"
        :options="longOptions"
        multiple
        max-tag-count="responsive"
        :width="240"
        @change="onChange"
      />
      <Cascader
        v-model:value="maxTagSlotValue"
        placeholder="请选择"
        :options="longOptions"
        multiple
        :max-tag-count="3"
        @change="onChange"
      >
        <template #maxTagPlaceholder="{ omittedValues }">+ {{ omittedValues.length }} 项</template>
      </Cascader>
    </Space>
    <h2 class="mt30 mb10">已勾选的数据</h2>
    <p class="mb10">通过实例方法 <code>getCheckedData()</code> 读取已勾选项的选项数据</p>
    <Space>
      <Cascader ref="checkedRef" v-model:value="checkedValue" placeholder="请选择" :options="options" multiple />
      <Button type="primary" @click="onReadCheckedData">读取已勾选项</Button>
    </Space>
    <div class="demo-checked-result">
      <template v-if="checkedData.length">
        <Tag v-for="(path, index) in checkedData" :key="index" color="blue">
          {{ path.map((option) => option.label).join(' / ') }}
        </Tag>
      </template>
      <span v-else class="demo-checked-result-empty">点击「读取已勾选项」查看返回值，同时输出到控制台</span>
    </div>
    <h2 class="mt30 mb10">键盘操作</h2>
    <p class="mb10">
      聚焦后 <code>↑</code> <code>↓</code> 在当前列内移动（搜索态下在结果间移动）、<code>←</code>
      <code>→</code> 跨列、<code>Enter</code> 确认、<code>Esc</code> 收起；多选下 <code>Space</code> 勾选、<code
        >Backspace</code
      >
      移除最后一个 tag
    </p>
    <Cascader v-model:value="keyboardValue" placeholder="请选择" :options="options" multiple @change="onChange" />
    <h2 class="mt30 mb10">面板位置</h2>
    <p class="mb10">通过 <code>placement</code> 指定面板展开方向，空间不足时 <code>flip</code> 会自动翻转</p>
    <Space vertical>
      <Space align="center"> placement: <Segmented v-model:value="placement" :options="placementOptions" /> </Space>
      <Cascader
        v-model:value="placementValue"
        placeholder="请选择"
        :options="options"
        :placement="placement"
        @change="onChange"
      />
    </Space>
    <h2 class="mt30 mb10">面板高度</h2>
    <p class="mb10">通过 <code>panelHeight</code> 调整每列高度，超出后列内滚动</p>
    <Space>
      <Cascader v-model:value="panelHeightSmallValue" placeholder="请选择" :options="longOptions" :panel-height="120" />
      <Cascader v-model:value="panelHeightLargeValue" placeholder="请选择" :options="longOptions" :panel-height="240" />
    </Space>
    <h2 class="mt30 mb10">长列表虚拟滚动</h2>
    <p class="mb10">
      省级 200、每省 200 个市级的长列表，显式开启 <code>virtual</code> 后每列只渲染可视区；<code>option-height</code>
      需与选项实际行高一致，列宽按整列内容锁定，滚动时不变
    </p>
    <Cascader v-model:value="virtualValue" placeholder="请选择" :options="manyOptions" virtual />
    <h2 class="mt30 mb10">面板底部操作区</h2>
    <p class="mb10">通过 <code>#action</code> 插槽在面板底部加入自定义操作</p>
    <Cascader ref="actionRef" v-model:value="actionValue" placeholder="请选择" :options="options" multiple>
      <template #action>
        <Button size="small" @click="actionValue = []">重置</Button>
        <Button size="small" type="primary" @click="onActionConfirm">确定</Button>
      </template>
    </Cascader>
  </div>
</template>
<style lang="less" scoped>
.custom-tag {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  padding: 0 8px;
  border-radius: 4px;
  background: var(--va-primary-bg-color);
  color: var(--va-primary-color);
  font-size: 12px;
}
.demo-checked-result {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  min-height: 40px;
  margin-top: 12px;
  padding: 8px 12px;
  border: 1px solid var(--va-border-color);
  border-radius: 6px;
  background-color: var(--va-bg-container-color);
  .demo-checked-result-empty {
    color: var(--va-text-color-3);
    font-size: 13px;
  }
}
/* #option 插槽里的自定义字段 */
.option-code {
  margin-left: 6px;
  color: var(--va-text-color-3);
  font-size: 12px;
}
/* #showSearchRender 插槽里命中关键词的高亮 */
.search-keyword {
  color: var(--va-error-color);
}
/* #showSearchRender 插槽里路径含禁用项的置灰（写在 .search-keyword 之后以覆盖高亮色） */
.search-disabled {
  color: var(--va-text-color-disabled);
}
/* #notFoundContent 插槽内容 */
.empty-slot-text {
  color: var(--va-text-color-3);
}
</style>
