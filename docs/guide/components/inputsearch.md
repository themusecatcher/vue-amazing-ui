# 搜索框 InputSearch

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*带搜索按钮的输入框*

## 何时使用

- 当需要输入搜索功能时

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { SearchOutlined, CompassOutlined, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
const value = ref('')
const lazyValue = ref('')
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
const size = ref('middle')
const loading = ref(true)
const disabled = ref(true)
watchEffect(() => {
  console.log('value:', value.value)
})
watchEffect(() => {
  console.log('lazyValue:', lazyValue.value)
})
function onChange(e: Event) {
  console.log('change', e)
}
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>

## 基本使用

<Space gap="small" vertical>
  <Alert>
    <template #message>
      .lazy:
      <br />
      默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。
      <br />
      你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
      <br />
      {{ '<InputSearch v-model:value.lazy="msg" />' }}
    </template>
  </Alert>
  <InputSearch
    :width="200"
    v-model:value="value"
    placeholder="Basic search usage"
    @change="onChange"
    @search="onSearch"
  />
  <InputSearch
    :width="200"
    v-model:value.lazy="lazyValue"
    placeholder="Lazy search usage"
    @change="onChange"
    @search="onSearch"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
const lazyValue = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
watchEffect(() => {
  console.log('lazyValue:', lazyValue.value)
})
function onChange(e: Event) {
  console.log('change', e)
}
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space gap="small" vertical :width="200">
    <InputSearch
      v-model:value="value"
      placeholder="Basic search usage"
      @change="onChange"
      @search="onSearch"
    />
    <InputSearch
      v-model:value.lazy="lazyValue"
      placeholder="Lazy search usage"
      @change="onChange"
      @search="onSearch"
    />
  </Space>
</template>
```

:::

## 自定义搜索按钮

<Space vertical>
  <InputSearch
    v-model:value="value"
    :search-props="{ type: 'primary' }"
    placeholder="input search text"
    @search="onSearch"
  />
  <InputSearch
    v-model:value="value"
    placeholder="input search text"
    :icon="false"
    search="Search"
    :search-props="{ type: 'primary' }"
    @search="onSearch"
  />
  <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
    <template #search>
      <Button type="primary">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
    </template>
  </InputSearch>
  <InputSearch
    v-model:value="value"
    placeholder="input search text"
    search="Search"
    :search-props="{ type: 'primary', ghost: true }"
    @search="onSearch"
  >
    <template #icon>
      <CompassOutlined />
    </template>
  </InputSearch>
  <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
    <template #search>
      <Button>
        <template #icon>
          <CompassOutlined />
        </template>
        Custom
      </Button>
    </template>
  </InputSearch>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { SearchOutlined, CompassOutlined } from '@ant-design/icons-vue'
const value = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space vertical>
    <InputSearch
      v-model:value="value"
      :search-props="{ type: 'primary' }"
      placeholder="input search text"
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      placeholder="input search text"
      :icon="false"
      search="Search"
      :search-props="{ type: 'primary' }"
      @search="onSearch"
    />
    <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
      <template #search>
        <Button type="primary">
          <template #icon>
            <SearchOutlined />
          </template>
          Search
        </Button>
      </template>
    </InputSearch>
    <InputSearch
      v-model:value="value"
      placeholder="input search text"
      search="Search"
      :search-props="{ type: 'primary', ghost: true }"
      @search="onSearch"
    >
      <template #icon>
        <CompassOutlined />
      </template>
    </InputSearch>
    <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
      <template #search>
        <Button>
          <template #icon>
            <CompassOutlined />
          </template>
          Custom
        </Button>
      </template>
    </InputSearch>
  </Space>
</template>
```

:::

## 三种大小

<Space vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <InputSearch
    v-model:value="value"
    :size="size"
    :search-props="{ type: 'primary' }"
    placeholder="input search text"
    @search="onSearch"
  />
  <InputSearch
    v-model:value="value"
    :size="size"
    placeholder="input search text"
    :icon="false"
    search="Search"
    :search-props="{ type: 'primary' }"
    @search="onSearch"
  />
  <InputSearch v-model:value="value" :size="size" placeholder="input search text" @search="onSearch">
    <template #search>
      <Button type="primary" :size="size">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
    </template>
  </InputSearch>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
const value = ref('')
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
const size = ref('middle')
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <InputSearch
      v-model:value="value"
      :size="size"
      :search-props="{ type: 'primary' }"
      placeholder="input search text"
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      :size="size"
      placeholder="input search text"
      :icon="false"
      search="Search"
      :search-props="{ type: 'primary' }"
      @search="onSearch"
    />
    <InputSearch v-model:value="value" :size="size" placeholder="input search text" @search="onSearch">
      <template #search>
        <Button type="primary" :size="size">
          <template #icon>
            <SearchOutlined />
          </template>
          Search
        </Button>
      </template>
    </InputSearch>
  </Space>
</template>
```

:::

## 带清除图标

<Space>
  <InputSearch
    v-model:value="value"
    allow-clear
    placeholder="input search text"
    @search="onSearch"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space>
    <InputSearch
      v-model:value="value"
      allow-clear
      placeholder="input search text"
      @search="onSearch"
    />
  </Space>
</template>
```

:::

## 带字数提示

<Space :width="300">
  <InputSearch
    v-model:value="value"
    allow-clear
    show-count
    placeholder="input search text"
    @search="onSearch"
  />
  <InputSearch
    v-model:value="value"
    allow-clear
    show-count
    :maxlength="20"
    placeholder="input search text"
    @search="onSearch"
  />
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space :width="300">
    <InputSearch
      v-model:value="value"
      allow-clear
      show-count
      placeholder="input search text"
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      allow-clear
      show-count
      :maxlength="20"
      placeholder="input search text"
      @search="onSearch"
    />
  </Space>
</template>
```

:::

## 前置标签

<Space :width="300">
  <InputSearch
    v-model:value="value"
    addon-before="Please"
    placeholder="input search text"
    @search="onSearch"
  />
  <InputSearch
    v-model:value="value"
    :search-props="{ type: 'primary' }"
    placeholder="input search text"
    @search="onSearch"
  >
    <template #addonBefore>
      <CompassOutlined />
    </template>
  </InputSearch>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { CompassOutlined } from '@ant-design/icons-vue'
const value = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space :width="300">
    <InputSearch
      v-model:value="value"
      addon-before="Please"
      placeholder="input search text"
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      :search-props="{ type: 'primary' }"
      placeholder="input search text"
      @search="onSearch"
    >
      <template #addonBefore>
        <CompassOutlined />
      </template>
    </InputSearch>
  </Space>
</template>
```

:::

## 前缀和后缀

<Space :width="300">
  <InputSearch v-model:value="value" prefix="¥" suffix="元" placeholder="input search text" @search="onSearch" />
  <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
    <template #prefix>
      <EnvironmentOutlined />
    </template>
    <template #suffix>
      <Tooltip :max-width="150" tooltip="Extra information">
        <InfoCircleOutlined />
      </Tooltip>
    </template>
  </InputSearch>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
const value = ref('')
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space :width="300">
    <InputSearch v-model:value="value" prefix="¥" suffix="元" placeholder="input search text" @search="onSearch" />
    <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
      <template #prefix>
        <EnvironmentOutlined />
      </template>
      <template #suffix>
        <Tooltip :max-width="150" tooltip="Extra information">
          <InfoCircleOutlined />
        </Tooltip>
      </template>
    </InputSearch>
  </Space>
</template>
```

:::

## 搜索中

<Space vertical>
  <Space align="center"> Loading state:<Switch v-model="loading" /> </Space>
  <InputSearch
    v-model:value="value"
    :loading="loading"
    :search-props="{ type: 'primary' }"
    placeholder="input search text"
    @search="onSearch"
  />
  <InputSearch
    v-model:value="value"
    :loading="loading"
    placeholder="input search text"
    :icon="false"
    search="Search"
    :search-props="{ type: 'primary' }"
    @search="onSearch"
  />
  <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
    <template #search>
      <Button type="primary" :loading="loading">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
    </template>
  </InputSearch>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
const value = ref('')
const loading = ref(true)
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space vertical>
    <Space align="center"> Loading state:<Switch v-model="loading" /> </Space>
    <InputSearch
      v-model:value="value"
      :loading="loading"
      :search-props="{ type: 'primary' }"
      placeholder="input search text"
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      :loading="loading"
      placeholder="input search text"
      :icon="false"
      search="Search"
      :search-props="{ type: 'primary' }"
      @search="onSearch"
    />
    <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
      <template #search>
        <Button type="primary" :loading="loading">
          <template #icon>
            <SearchOutlined />
          </template>
          Search
        </Button>
      </template>
    </InputSearch>
  </Space>
</template>
```

:::

## 禁用

<Space vertical>
  <Space align="center"> Disabled state:<Switch v-model="disabled" /> </Space>
  <InputSearch v-model:value="value" :disabled="disabled" placeholder="input search text" @search="onSearch" />
  <InputSearch
    v-model:value="value"
    :disabled="disabled"
    :search-props="{ type: 'primary' }"
    placeholder="input search text"
    @search="onSearch"
  />
  <InputSearch
    v-model:value="value"
    :disabled="disabled"
    placeholder="input search text"
    :icon="false"
    search="Search"
    :search-props="{ type: 'primary' }"
    @search="onSearch"
  />
  <InputSearch v-model:value="value" :disabled="disabled" placeholder="input search text" @search="onSearch">
    <template #search>
      <Button type="primary" :disabled="disabled">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
    </template>
  </InputSearch>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
const value = ref('')
const disabled = ref(true)
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch(searchValue: string) {
  console.log('searchValue', searchValue)
}
</script>
<template>
  <Space vertical>
    <Space align="center"> Disabled state:<Switch v-model="disabled" /> </Space>
    <InputSearch v-model:value="value" :disabled="disabled" placeholder="input search text" @search="onSearch" />
    <InputSearch
      v-model:value="value"
      :disabled="disabled"
      :search-props="{ type: 'primary' }"
      placeholder="input search text"
      @search="onSearch"
    />
    <InputSearch
      v-model:value="value"
      :disabled="disabled"
      placeholder="input search text"
      :icon="false"
      search="Search"
      :search-props="{ type: 'primary' }"
      @search="onSearch"
    />
    <InputSearch v-model:value="value" :disabled="disabled" placeholder="input search text" @search="onSearch">
      <template #search>
        <Button type="primary" :disabled="disabled">
          <template #icon>
            <SearchOutlined />
          </template>
          Search
        </Button>
      </template>
    </InputSearch>
  </Space>
</template>
```

:::

## APIs

### InputSearch

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
width | 搜索框宽度，单位 `px` | string &#124; number | '100%'
icon | 搜索图标 | boolean &#124; slot | true
search | 搜索按钮，默认时为搜索图标 | string &#124; slot | undefined
searchProps | 设置搜索按钮的属性，参考 [Button Props](https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html#button) | object | {}
size | 搜索框大小 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
addonBefore | 设置前置标签 | string &#124; slot | undefined
prefix | 前缀图标 | string | undefined
suffix | 后缀图标 | string | undefined
allowClear | 可以点击清除图标删除搜索框内容 | boolean | false
loading | 是否搜索中 | boolean | false
disabled | 是否禁用 | boolean | false
maxlength | 文本最大长度 | number | undefined
showCount | 是否展示字数 | boolean | false
value <Tag color="cyan">v-model</Tag> | 搜索框内容 | string | undefined

## Events

名称 | 说明 | 类型
-- | -- | --
change | 搜索框内容变化时的回调 | (e: Event) => void
enter | 点击搜索或按下回车键时的回调 | (value: string) => void
