# 级联选择 Cascader

<GlobalElement />

_级联选择框，在一个浮层中按列完成多级分类的选择_

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区、公司层级、事物分类等
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择
- 比起 `Select`，可以在同一个浮层中完成选择，有较好的体验

<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderOption, CascaderProps } from 'vue-amazing-ui'
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
// 各分节独立绑定：避免操作一个用例时其余用例同步联动，便于单独核对每个特性
const basicValue = ref<CascaderProps['value']>(['zhejiang', 'hangzhou', 'xihu'])
const customTriggerValue = ref<CascaderProps['value']>(['zhejiang', 'hangzhou', 'xihu'])
const hoverValue = ref<CascaderProps['value']>([])
const disabledOptionValue = ref<CascaderProps['value']>([])
const changeOnSelectValue = ref<CascaderProps['value']>(['zhejiang'])
const sizeValue = ref<CascaderProps['value']>(['zhejiang', 'hangzhou', 'xihu'])
const displayRenderValue = ref<CascaderProps['value']>(['zhejiang', 'hangzhou', 'xihu'])
const searchValue = ref<CascaderProps['value']>([])
const fieldNameValue = ref<CascaderProps['value']>(['1', '11', '111'])
const suffixSlotValue = ref<CascaderProps['value']>([])
const suffixIconValue = ref<CascaderProps['value']>([])
const disabledValue = ref<CascaderProps['value']>(['zhejiang', 'ningbo', 'yinzhou'])
const clearValue = ref<CascaderProps['value']>(['jiangsu', 'nanjing', 'zhonghuamen'])
const emptyOptionsValue = ref<CascaderProps['value']>([])
const emptyFallbackValue = ref<CascaderProps['value']>([])
const emptySearchValue = ref<CascaderProps['value']>([])
const statusErrorValue = ref<CascaderProps['value']>([])
const statusWarningValue = ref<CascaderProps['value']>([])
const statusBorderlessValue = ref<CascaderProps['value']>([])
const open = ref(false)
const controlledValue = ref<CascaderProps['value']>([])
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

## 基本使用

_省市区三级联动，面板按列展示，选中回填完整路径_

<br/>

<Cascader v-model:value="basicValue" placeholder="请选择" :options="options" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderOption } from 'vue-amazing-ui'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu'])
function onChange(values: (string | number)[], selectedOptions: CascaderOption[]) {
  console.log('values', values)
  console.log('selectedOptions', selectedOptions)
}
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" @change="onChange" />
</template>
```

:::

## 可以自定义显示

_默认插槽替换整个触发器，选中结果由外部展示_

<br/>

<span>
  {{ customTriggerValue?.length ? '已选择' : '未选择' }} &nbsp;
  <Cascader v-model:value="customTriggerValue" placeholder="请选择" :options="options" @change="onChange">
    <a href="#" @click.prevent>切换城市</a>
  </Cascader>
</span>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>([])
</script>
<template>
  <span>
    {{ value?.length ? '已选择' : '未选择' }} &nbsp;
    <Cascader v-model:value="value" placeholder="请选择" :options="options">
      <a href="#" @click.prevent>切换城市</a>
    </Cascader>
  </span>
</template>
```

:::

## 移入展开

_通过 `expand-trigger="hover"` 把次级菜单的展开方式改为悬浮_

<br/>

<Cascader v-model:value="hoverValue" placeholder="请选择" :options="options" expand-trigger="hover" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>([])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" expand-trigger="hover" />
</template>
```

:::

## 禁用选项

_在 `options` 中给选项设置 `disabled` 即可禁用整棵子树_

<br/>

<Cascader v-model:value="disabledOptionValue" placeholder="请选择" :options="disabledOptions" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderOption } from 'vue-amazing-ui'
// disabledOptions 数据见「基本使用」示例
const options: CascaderOption[] = [
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
const value = ref<(string | number)[]>([])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" />
</template>
```

:::

## 选择即改变

_`change-on-select` 打开后点选任意层级都会改变 `value`，面板保持展开供继续下钻_

<br/>

<Cascader v-model:value="changeOnSelectValue" placeholder="请选择" :options="options" change-on-select @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>(['zhejiang'])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" change-on-select />
</template>
```

:::

## 多选

_打开 `multiple` 后面板每列出现复选按钮，勾选父级会连带全部子项；已选项以 tag 回填，可逐个移除_

<br/>

<Cascader v-model:value="multipleValue" placeholder="请选择" :options="options" multiple @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[][]>([['zhejiang', 'hangzhou', 'xihu']])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" multiple />
</template>
```

:::

## 三种大小

_通过 `size` 切换选择器尺寸_

<br/>

<Space vertical>
  <RadioGroup :options="sizeRadios" v-model:value="size" button button-style="solid" />
  <Cascader v-model:value="sizeValue" placeholder="请选择" :options="options" :size="size" @change="onChange" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const size = ref('middle')
const sizeRadios = [
  { label: 'large', value: 'large' },
  { label: 'middle', value: 'middle' },
  { label: 'small', value: 'small' }
]
const value = ref<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu'])
</script>
<template>
  <Space vertical>
    <RadioGroup :options="sizeRadios" v-model:value="size" button button-style="solid" />
    <Cascader v-model:value="value" placeholder="请选择" :options="options" :size="size" />
  </Space>
</template>
```

:::

## 自定义已选项

_通过 `#displayRender` 插槽接管回填内容，末级可附自定义信息_

<br/>

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

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例（叶子节点带 code 字段）
const value = ref<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu'])
function onAreaClick(e: MouseEvent, code?: number) {
  e.preventDefault()
  console.log('postcode', code)
}
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options">
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
</template>
```

:::

## 搜索

_打开 `show-search` 后可直接输入关键词，结果按完整路径展示并高亮命中片段；传对象可自定义 `filter` / `sort` / `limit` / `render`_

<br/>

<Cascader v-model:value="searchValue" placeholder="请选择" :options="options" :show-search="{ filter: searchFilter }" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderOption } from 'vue-amazing-ui'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>([])
// 只匹配末级文本；不传 filter 时按「路径上任一层文本包含关键词」判定
function filter(inputValue: string, path: CascaderOption[]) {
  const target = path[path.length - 1]
  return String(target?.label ?? '')
    .toLowerCase()
    .includes(inputValue.toLowerCase())
}
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" :show-search="{ filter }" />
</template>
```

:::

## 动态加载选项

_通过 `loadData` 按需加载子级：父级先以 `isLeaf: false` 占位，展开时写入子项并解除 `loading`_

<br/>

<Cascader v-model:value="lazyValue" placeholder="请选择" :options="lazyOptions" :load-data="loadLazyData" @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderOption } from 'vue-amazing-ui'
const CHILDREN: Record<string, CascaderOption[]> = {
  zhejiang: [{ value: 'hangzhou', label: '杭州', isLeaf: false }],
  hangzhou: [{ value: 'xihu', label: '西湖' }]
}
const options = ref<CascaderOption[]>([{ value: 'zhejiang', label: '浙江', isLeaf: false }])
const value = ref<(string | number)[]>([])
// 子项写入 options 后把 loading 置回 false，加载图标随之消失
function loadData(selectedOptions: CascaderOption[]) {
  const target = selectedOptions[selectedOptions.length - 1]
  if (!target) return
  target.loading = true
  setTimeout(() => {
    target.children = CHILDREN[String(target.value ?? '')] ?? []
    target.loading = false
  }, 600)
}
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" :load-data="loadData" />
</template>
```

:::

## 自定义字段名

_通过 `fieldNames` 指定 `label` / `value` / `children` 对应的字段_

<br/>

<Cascader
  v-model:value="fieldNameValue"
  placeholder="请选择" :options="customFieldOptions"
  :field-names="{ label: 'name', value: 'code', children: 'items' }"
  @change="onChange"
/>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const options = [
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
  }
]
const value = ref<(string | number)[]>(['1', '11', '111'])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" :field-names="{ label: 'name', value: 'code', children: 'items' }" />
</template>
```

:::

## 自定义 tag 内容

_通过 `#tagRender` 插槽接管多选 tag 的渲染，作用域参数含路径、文本与移除方法_

<br/>

<Cascader v-model:value="tagRenderValue" placeholder="请选择" :options="options" multiple @change="onChange">
  <template #tagRender="{ label, onClose }">
    <span class="custom-tag">
      {{ label }}
      <a @click="onClose">移除</a>
    </span>
  </template>
</Cascader>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[][]>([['zhejiang', 'hangzhou', 'xihu']])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" multiple>
    <template #tagRender="{ label, onClose }">
      <span class="custom-tag">
        {{ label }}
        <a @click="onClose">移除</a>
      </span>
    </template>
  </Cascader>
</template>
```

:::

## 后缀图标

_通过 `#suffixIcon` 插槽或 `suffixIcon` 属性替换默认箭头_

<br/>

<Space>
  <Cascader v-model:value="suffixSlotValue" placeholder="请选择" :options="options" @change="onChange">
    <template #suffixIcon>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M8 12h8" stroke="currentColor" stroke-width="2" />
      </svg>
    </template>
  </Cascader>
  <Cascader v-model:value="suffixIconValue" placeholder="请选择" :options="options" suffix-icon="ab" @change="onChange" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>([])
</script>
<template>
  <Space>
    <Cascader v-model:value="value" placeholder="请选择" :options="options">
      <template #suffixIcon>
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M8 12h8" stroke="currentColor" stroke-width="2" />
        </svg>
      </template>
    </Cascader>
    <Cascader v-model:value="value" placeholder="请选择" :options="options" suffix-icon="ab" />
  </Space>
</template>
```

:::

## 禁用

_整体禁用时不响应点击，清除图标与面板均不可用_

<br/>

<Cascader v-model:value="disabledValue" placeholder="请选择" :options="options" disabled @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>(['zhejiang', 'ningbo', 'yinzhou'])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" disabled />
</template>
```

:::

## 支持清除

_悬浮时出现清除图标，点击回写空路径；`change` 收到空数组_

<br/>

<Cascader v-model:value="clearValue" placeholder="请选择" :options="options" allow-clear @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>(['jiangsu', 'nanjing', 'zhonghuamen'])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" allow-clear />
</template>
```

:::

## 空数据

_无选项或搜索无结果时展示 `Empty`，传 `notFoundContent: null` 时回落默认空态_

<br/>

<Space>
  <Cascader v-model:value="emptyOptionsValue" placeholder="请选择" :options="[]" />
  <Cascader v-model:value="emptyFallbackValue" placeholder="请选择" :options="[]" :not-found-content="null" />
  <Cascader v-model:value="emptySearchValue" placeholder="请选择" :options="[{ value: '1', label: '浙江', children: [] }]" show-search />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref<(string | number)[]>([])
</script>
<template>
  <Space>
    <Cascader v-model:value="value" placeholder="请选择" :options="[]" />
    <Cascader v-model:value="value" placeholder="请选择" :options="[]" :not-found-content="null" />
    <Cascader v-model:value="value" placeholder="请选择" :options="[{ value: '1', label: '浙江', children: [] }]" show-search />
  </Space>
</template>
```

:::

## 自定义状态

_通过 `status` 设置校验状态，与 `Input` / `Select` 同一口径_

<br/>

<Space>
  <Cascader v-model:value="statusErrorValue" placeholder="请选择" :options="options" status="error" />
  <Cascader v-model:value="statusWarningValue" placeholder="请选择" :options="options" status="warning" />
  <Cascader v-model:value="statusBorderlessValue" placeholder="请选择" :options="options" :bordered="false" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[]>([])
</script>
<template>
  <Space>
    <Cascader v-model:value="value" placeholder="请选择" :options="options" status="error" />
    <Cascader v-model:value="value" placeholder="请选择" :options="options" status="warning" />
    <Cascader v-model:value="value" placeholder="请选择" :options="options" :bordered="false" />
  </Space>
</template>
```

:::

## 受控展开

_通过 `v-model:open` 控制面板显隐，配套 `open-change` 事件；`search-value` 可受控搜索文本_

<br/>

<Space>
  <Cascader v-model:value="controlledValue" v-model:open="open" placeholder="请选择" :options="options" @change="onChange" />
  <Button type="primary" @click="open = !open">{{ open ? '收起面板' : '展开面板' }}</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const open = ref(false)
const value = ref<(string | number)[]>([])
</script>
<template>
  <Space>
    <Cascader v-model:value="value" v-model:open="open" placeholder="请选择" :options="options" />
    <Button type="primary" @click="open = !open">{{ open ? '收起面板' : '展开面板' }}</Button>
  </Space>
</template>
```

:::

## 默认值

_通过 `default-value` 提供非受控初值，形态与 `value` 一致_

<br/>

<Space>
  <Cascader placeholder="请选择" :options="options" :default-value="['jiangsu', 'nanjing', 'zhonghuamen']" />
  <Cascader placeholder="请选择" :options="options" multiple :default-value="[['zhejiang', 'hangzhou', 'xihu']]" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
// options 数据见「基本使用」示例
</script>
<template>
  <Space>
    <Cascader placeholder="请选择" :options="options" :default-value="['jiangsu', 'nanjing', 'zhonghuamen']" />
    <Cascader placeholder="请选择" :options="options" multiple :default-value="[['zhejiang', 'hangzhou', 'xihu']]" />
  </Space>
</template>
```

:::

## 多选回填策略

_`show-checked-strategy` 决定父级全选时的回填形态：`SHOW_PARENT`（默认）只回填父级路径，`SHOW_CHILD` 只回填叶子路径_

<br/>

<Space>
  <Cascader v-model:value="strategyValue" placeholder="请选择" :options="options" multiple show-checked-strategy="SHOW_PARENT" @change="onChange" />
  <Cascader
    v-model:value="childStrategyValue"
    placeholder="请选择" :options="options"
    multiple
    show-checked-strategy="SHOW_CHILD"
    @change="onChange"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const parentValue = ref<(string | number)[][]>([])
const childValue = ref<(string | number)[][]>([])
</script>
<template>
  <Space>
    <Cascader v-model:value="parentValue" placeholder="请选择" :options="options" multiple show-checked-strategy="SHOW_PARENT" />
    <Cascader v-model:value="childValue" placeholder="请选择" :options="options" multiple show-checked-strategy="SHOW_CHILD" />
  </Space>
</template>
```

:::

## 多选回填顺序

_已选内容的顺序跟随值中路径的先后：可折叠为父级的分支在首次出现的位置收敛成一条，其后的同级项并入该条_

<Cascader v-model:value="orderValue" placeholder="请选择" :options="options" multiple @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[][]>([
  ['beijing', 'beijingshi', 'dongcheng'],
  ['zhejiang', 'hangzhou', 'xihu'],
  ['zhejiang', 'ningbo', 'yinzhou'],
  ['jiangsu', 'nanjing', 'zhonghuamen'],
  ['jiangsu', 'wuxi', 'jiangyin']
])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" multiple />
</template>
```

:::

## 最大 tag 数

_通过 `max-tag-count` 折叠超出数量的 tag（传 `'responsive'` 时按容器宽度自动折叠），`max-tag-placeholder` 自定义折叠提示_

<br/>

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
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// longOptions 为长列表数据（选项足够多才能折叠出剩余项）
const value = ref<(string | number)[][]>([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'nanjing', 'zhonghuamen'],
  ['beijing', 'beijingshi', 'dongcheng'],
  ['shanghai', 'shanghaishi', 'huangpu'],
  ['guangdong', 'guangzhou', 'tianhe'],
  ['sichuan', 'chengdu', 'wuhou']
])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="longOptions" multiple :max-tag-count="3" />
</template>
```

:::

## 已勾选的数据

_通过实例方法 `getCheckedData()` 读取已勾选项的选项数据_

<br/>

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

<style lang="less" scoped>
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
</style>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderOption } from 'vue-amazing-ui'
const value = ref<(string | number)[][]>([
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'wuxi', 'jiangyin']
])
const cascaderRef = ref()
const data = ref<CascaderOption[][]>([])
// 取回已勾选项的选项数据（按 showCheckedStrategy 折叠），并打印真实结构
function onRead() {
  data.value = cascaderRef.value?.getCheckedData() ?? []
  console.log('getCheckedData', data.value)
}
</script>
<template>
  <Space>
    <Cascader ref="cascaderRef" v-model:value="value" placeholder="请选择" :options="options" multiple />
    <Button type="primary" @click="onRead">读取已勾选项</Button>
  </Space>
  <div class="demo-checked-result">
    <template v-if="data.length">
      <Tag v-for="(path, index) in data" :key="index" color="blue">
        {{ path.map((option) => option.label).join(' / ') }}
      </Tag>
    </template>
    <span v-else class="demo-checked-result-empty">点击「读取已勾选项」查看返回值，同时输出到控制台</span>
  </div>
</template>
<style lang="less" scoped>
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
</style>
```

::::

## 键盘操作

_聚焦后 `↑` `↓` 在当前列内移动（搜索态下在结果间移动）、`←` `→` 跨列、`Enter` 确认、`Esc` 收起；多选下 `Space` 勾选、`Backspace` 移除最后一个 tag_

<br/>

| 按键 | 说明 |
| :-- | :-- |
| Esc | 收起面板 |
| Enter | 确认当前激活项（多选为切换勾选） |
| ↑ / ↓ | 在当前列内移动激活项；搜索态下在结果间移动 |
| → | 进入当前激活项的子列，无子项时触发 `loadData` |
| ← | 退回上一列 |
| Space | 多选时切换当前激活项的勾选 |
| Backspace | 多选且搜索文本为空时移除最后一个 tag |

<br/>

<Cascader v-model:value="keyboardValue" placeholder="请选择" :options="options" multiple @change="onChange" />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// options 数据见「基本使用」示例
const value = ref<(string | number)[][]>([])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="options" multiple />
</template>
```

:::

## 面板高度

_通过 `panelHeight` 调整每列高度，超出后列内滚动_

<br/>

<Space>
  <Cascader v-model:value="panelHeightSmallValue" placeholder="请选择" :options="longOptions" :panel-height="120" />
  <Cascader v-model:value="panelHeightLargeValue" placeholder="请选择" :options="longOptions" :panel-height="240" />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// longOptions 为长列表数据（列内项数超过面板高度才会滚动）
const value = ref<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu'])
</script>
<template>
  <Space>
    <Cascader v-model:value="value" placeholder="请选择" :options="longOptions" :panel-height="120" />
    <Cascader v-model:value="value" placeholder="请选择" :options="longOptions" :panel-height="240" />
  </Space>
</template>
```

:::

## 长列表虚拟滚动

_省级 200、每省 200 个市级的长列表，显式开启 `virtual` 后每列只渲染可视区；`option-height` 需与选项实际行高一致，列宽按整列内容锁定，滚动时不变_

<br/>

<Cascader v-model:value="virtualValue" placeholder="请选择" :options="manyOptions" virtual />

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
// manyOptions 为省级 200、每省 200 个市级的长列表数据
const value = ref<(string | number)[]>([])
</script>
<template>
  <Cascader v-model:value="value" placeholder="请选择" :options="manyOptions" virtual />
</template>
```

::::

## 面板底部操作区

_通过 `#action` 插槽在面板底部加入自定义操作_

<br/>

<Cascader ref="actionRef" v-model:value="actionValue" placeholder="请选择" :options="options" multiple>
  <template #action>
    <Button size="small" @click="actionValue = []">重置</Button>
    <Button size="small" type="primary" @click="onActionConfirm">确定</Button>
  </template>
</Cascader>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref<(string | number)[][]>([['zhejiang', 'hangzhou', 'xihu']])
const cascaderRef = ref()
// 确定后收起面板
function onConfirm() {
  cascaderRef.value?.blur()
}
</script>
<template>
  <Cascader ref="cascaderRef" v-model:value="value" placeholder="请选择" :options="options" multiple>
    <template #action>
      <Button size="small" @click="value = []">重置</Button>
      <Button size="small" type="primary" @click="onConfirm">确定</Button>
    </template>
  </Cascader>
</template>
```

::::

## APIs

### Cascader Props

| 名称 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| value <Tag color="cyan">v-model</Tag> | 选中路径：单选为单条路径，多选为路径数组 | [CascaderModelValue](#cascadermodelvalue-type) | undefined |
| defaultValue | 非受控初始值，形态同 `value` | [CascaderModelValue](#cascadermodelvalue-type) | undefined |
| open <Tag color="cyan">v-model</Tag> | 面板是否展开，不传时由组件内部维护 | boolean | undefined |
| searchValue <Tag color="cyan">v-model</Tag> | 搜索文本，不传时由组件内部维护 | string | undefined |
| options | 可选项数据源 | [CascaderOption](#cascaderoption-type)[] | [] |
| fieldNames | 选项的文本 / 值 / 子选项字段名配置 | [CascaderFieldNames](#cascaderfieldnames-type) | undefined |
| width | 选择器宽度，单位 `px` | string &#124; number | 184 |
| size | 选择器大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle' |
| placeholder | 未选中时的占位文本 | string | '请选择' |
| bordered | 是否有边框 | boolean | true |
| maxTagCount | 多选时最多显示多少个 tag，超出部分折叠为「+ N ...」；传 `'responsive'` 时按容器宽度自动折叠 | number &#124; 'responsive' | undefined |
| maxTagPlaceholder | 折叠 tag 的提示内容 | string &#124; VNode &#124; ((params: [CascaderMaxTagPlaceholderParams](#cascadermaxtagplaceholderparams-type)) => VNode) | undefined |
| disabled | 是否禁用 | boolean | false |
| status | 校验状态 | 'error' &#124; 'warning' | undefined |
| allowClear | 是否支持清除 | boolean | true |
| clearIcon | 自定义清除图标 | string &#124; VNode &#124; (() => VNode) | undefined |
| suffixIcon | 自定义选择框后缀图标，多选下不渲染 | string &#124; VNode &#124; (() => VNode) | undefined |
| expandIcon | 自定义次级菜单展开图标 | string &#124; VNode &#124; (() => VNode) | undefined |
| loadingIcon | 自定义子项加载中的图标 | string &#124; VNode &#124; (() => VNode) | undefined |
| removeIcon | 自定义多选 tag 的移除图标 | string &#124; VNode &#124; (() => VNode) | undefined |
| changeOnSelect | 点选任意层级即改变 `value`，面板保持展开供继续下钻 | boolean | false |
| multiple | 是否支持多选 | boolean | false |
| showCheckedStrategy | 多选回填策略：父级全选时只回填父级路径，或只回填叶子路径 | [ShowCheckedStrategy](#showcheckedstrategy-type) | 'SHOW_PARENT' |
| loadData | 异步加载子项，入参为当前路径上的选项数据 | (selectedOptions: [CascaderOption](#cascaderoption-type)[]) => void | undefined |
| expandTrigger | 次级菜单的展开方式 | 'click' &#124; 'hover' | 'click' |
| showSearch | 是否支持搜索，为对象时可配置过滤 / 排序 / 渲染 / 条数上限 | boolean &#124; [CascaderSearchConfig](#cascadersearchconfig-type) | false |
| displayRender | 自定义已选内容的渲染（单选生效） | (params: [CascaderDisplayRenderParams](#cascaderdisplayrenderparams-type)) => VNode &#124; string | undefined |
| tagRender | 自定义多选 tag 的渲染 | (params: [CascaderTagRenderParams](#cascadertagrenderparams-type)) => VNode | undefined |
| notFoundContent | 面板空数据时的内容，传 `null` 时回落默认空态 | string &#124; VNode &#124; null | undefined |
| panelHeight | 面板每列的高度，单位 `px`，超出后列内滚动 | number | 180 |
| virtual | 是否开启列虚拟滚动，长列表仅渲染可视区选项；关闭时全量渲染。两种模式下列宽都由整列内容决定，滚动时不变 | boolean | false |
| optionHeight | 选项行高，虚拟滚动的换算基准，需与实际行高一致 | number | 32 |
| scrollbarProps | 面板滚动条 `scrollbar` 组件属性配置，参考 [Scrollbar Props](./scrollbar.md#scrollbar-props) | [ScrollbarProps](./scrollbar.md#scrollbar-props) | {} |
| placement | 面板弹出位置 | [CascaderPlacement](#cascaderplacement-type) | 'bottomLeft' |
| flip | 面板被视口或最近可滚动父元素遮挡时自动翻转 | boolean | true |
| to | 面板挂载的容器节点：元素标签名 / 元素本身 / 按触发器求值的函数，`false` 会待在原地；**不传时优先挂到最近的承载层内容容器**（`Modal` / `Drawer` / `Dialog` 卡片或上层浮层面板），无承载层时为 `body` | string &#124; HTMLElement &#124; false &#124; ((triggerNode: HTMLElement &#124; null) => string &#124; HTMLElement) | undefined |
| popupClassName | 面板的类名，用于自定义面板样式 | string | undefined |
| dropdownMenuStyle | 面板自定义样式，可覆盖定位 | CSSProperties | undefined |
| dropdownMenuColumnStyle | 面板每一列的样式，可按列定制宽度等 | CSSProperties | undefined |
| zIndex | 面板层级，优先级最高（未传时使用默认层级或 `ConfigProvider` 的 `baseZIndex` 分配） | number | undefined |
| autofocus | 是否自动获取焦点 | boolean | false |
| id | 组件 id，用于 `aria-controls` / `aria-valuetext` 关联，未传时内部生成 | string | undefined |

> 多选下点击父级只展开子列，勾选走复选按钮；勾选父级会连带其全部叶子，`showCheckedStrategy` 决定回填与 tag 展示时是否折叠为父级路径。`loadData` 与 `showSearch` 建议不要同时使用（搜索结果依赖已加载的完整数据）。

### CascaderValue Type

<br/>

路径中的单个值。

| 名称 | 值 |
| :-- | :-- |
| CascaderValue | string &#124; number |

### CascaderPath Type

<br/>

一条从根到叶的选中路径。

| 名称 | 值 |
| :-- | :-- |
| CascaderPath | [CascaderValue](#cascadervalue-type)[] |

### CascaderModelValue Type

<br/>

绑定值形态：单选为单条路径，多选为路径数组。

| 名称 | 值 |
| :-- | :-- |
| CascaderModelValue | [CascaderPath](#cascaderpath-type) &#124; [CascaderPath](#cascaderpath-type)[] |

### CascaderPlacement Type

<br/>

面板弹出位置。

| 名称 | 值 |
| :-- | :-- |
| CascaderPlacement | 'bottomLeft' &#124; 'bottomRight' &#124; 'topLeft' &#124; 'topRight' |

### ShowCheckedStrategy Type

<br/>

多选回填策略。

| 名称 | 值 |
| :-- | :-- |
| ShowCheckedStrategy | 'SHOW_PARENT' &#124; 'SHOW_CHILD' |

> 也可通过组件静态属性使用：`Cascader.SHOW_PARENT` / `Cascader.SHOW_CHILD`。

### CascaderOption Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| label? | 选项名 | string |
| value? | 选项值 | string &#124; number |
| disabled? | 是否禁用选项，禁用后整棵子树不可达 | boolean |
| children? | 子选项数组，缺省或为空即叶子节点 | [CascaderOption](#cascaderoption-type)[] |
| isLeaf? | 是否叶子节点，异步加载场景下置 `false` 可强制显示展开图标 | boolean |
| loading? | 是否正在加载子项，置 `true` 会显示加载图标 | boolean |
| [propName: string]? | 允许携带任意自定义字段，会随 `#option` 插槽与 `change` 的第二参透传 | any |

### CascaderFieldNames Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| label? | 选项的文本字段名，默认 `label` | string |
| value? | 选项的值字段名，默认 `value` | string |
| children? | 子选项的字段名，默认 `children` | string |

### CascaderSearchConfig Type

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| filter? | 命中判定，入参为输入项与命中项的完整路径；缺省时按「路径上任一层文本包含关键词」判定（大小写不敏感） | (inputValue: string, path: [CascaderOption](#cascaderoption-type)[]) => boolean |
| sort? | 结果排序，入参为两条命中路径与输入项 | (pathA: [CascaderOption](#cascaderoption-type)[], pathB: [CascaderOption](#cascaderoption-type)[], inputValue: string) => number |
| render? | 结果项内容渲染，缺省时展示完整路径并高亮命中片段 | (params: [CascaderSearchRenderParams](#cascadersearchrenderparams-type)) => VNode &#124; string |
| limit? | 结果条数上限，`false` 为不限 | number &#124; false |
| matchInputWidth? | 搜索结果面板是否与选择器同宽，默认 `true`；为 `false` 时宽度由结果内容决定 | boolean |

### CascaderDisplayRenderParams Type

<br/>

`displayRender` 与 `#displayRender` 插槽的作用域参数。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| labels | 各级选项文本，按层级从根到叶排列 | string[] |
| selectedOptions | 各级选项数据，按层级从根到叶排列 | [CascaderOption](#cascaderoption-type)[] |

### CascaderSearchRenderParams Type

<br/>

`showSearch.render` 与 `#showSearchRender` 插槽的作用域参数。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| inputValue | 当前搜索文本 | string |
| path | 命中项从根到自身的选项路径 | [CascaderOption](#cascaderoption-type)[] |

### CascaderTagRenderParams Type

<br/>

`tagRender` 与 `#tagRender` 插槽的作用域参数。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| label | tag 显示文本，默认取选中路径末级（按回填策略折叠后的父级）文本 | string |
| value | tag 对应的选中路径 | [CascaderPath](#cascaderpath-type) |
| path | tag 对应的选项数据 | [CascaderOption](#cascaderoption-type)[] |
| closable | 是否可移除 | boolean |
| disabled | 是否禁用（禁用项的 tag 不可移除） | boolean |
| onClose | 移除该 tag | (e?: MouseEvent) => void |

### CascaderMaxTagPlaceholderParams Type

<br/>

`maxTagPlaceholder` 与 `#maxTagPlaceholder` 插槽的作用域参数。

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| omittedValues | 被折叠的选中路径 | [CascaderPath](#cascaderpath-type)[] |
| omittedLabels | 被折叠路径的文本 | string[] |

## Events

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| change | 选中路径变化后的回调：单选第一参为路径、第二参为路径上的选项数据；多选第一参为路径数组、第二参为对应的选项数据数组；清除时为 `[]`（空路径，与 `value` 的空值形态一致） | (values: [CascaderModelValue](#cascadermodelvalue-type), selectedOptions: [CascaderOption](#cascaderoption-type)[] &#124; [CascaderOption](#cascaderoption-type)[][]) => void |
| openChange | 面板展开 / 收起时触发 | (open: boolean) => void |
| dropdownVisibleChange | 面板展开 / 收起时触发，与 `openChange` 同源 | (open: boolean) => void |
| search | 搜索文本变化时触发 | (value: string) => void |
| clear | 点击清除按钮时触发 | () => void |
| focus | 获得焦点时触发 | () => void |
| blur | 失去焦点时触发 | () => void |

## Slots

| 名称 | 说明 | 用法 |
| :-- | :-- | :-- |
| default | 自定义触发器内容，提供后整体替换选择框 | v-slot:default |
| displayRender | 自定义已选内容的渲染（单选生效） | v-slot:displayRender="{ labels, selectedOptions }" |
| tagRender | 自定义多选 tag 的渲染 | v-slot:tagRender="{ label, value, path, closable, disabled, onClose }" |
| maxTagPlaceholder | 折叠 tag 的提示内容 | v-slot:maxTagPlaceholder="{ omittedValues, omittedLabels }" |
| showSearchRender | 自定义搜索结果项内容 | v-slot:showSearchRender="{ inputValue, path }" |
| option | 自定义选项内容，作用域为当前选项数据 | v-slot:option="option" |
| expandIcon | 自定义次级菜单展开图标 | v-slot:expandIcon |
| loadingIcon | 自定义子项加载中的图标 | v-slot:loadingIcon |
| suffixIcon | 自定义选择框后缀图标，多选下不渲染 | v-slot:suffixIcon |
| clearIcon | 自定义清除图标 | v-slot:clearIcon="{ clear }" |
| removeIcon | 自定义多选 tag 的移除图标 | v-slot:removeIcon |
| notFoundContent | 自定义空数据内容 | v-slot:notFoundContent |
| action | 面板底部的自定义操作区 | v-slot:action |

> 插槽按「是否提供」生效，不做内容探测：带作用域参数的插槽在参数为空时渲染结果为空，内容探测会误判为未提供。

## Methods

| 名称 | 说明 | 类型 |
| :-- | :-- | :-- |
| focus | 使选择器获得焦点 | () => void |
| blur | 使选择器失去焦点 | () => void |
| getCheckedData | 取多选已勾选项的选项数据，按 `showCheckedStrategy` 折叠，与 `change` 第二参同源；非多选返回空数组 | () => [CascaderOption](#cascaderoption-type)[][] |

