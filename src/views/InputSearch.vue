<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { SearchOutlined, CompassOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'
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
<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
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
    <h2 class="mt30 mb10">自定义搜索按钮</h2>
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
    <h2 class="mt30 mb10">三种大小</h2>
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
    <h2 class="mt30 mb10">带清除图标</h2>
    <Space>
      <InputSearch
        v-model:value="value"
        allow-clear
        placeholder="input search text input search text"
        @search="onSearch"
      />
    </Space>
    <h2 class="mt30 mb10">带字数提示</h2>
    <Space :width="300">
      <InputSearch v-model:value="value" show-count placeholder="input search text" @search="onSearch" />
      <InputSearch
        v-model:value="value"
        allow-clear
        show-count
        :maxlength="20"
        placeholder="input search text"
        @search="onSearch"
      />
    </Space>
    <h2 class="mt30 mb10">前置标签</h2>
    <Space :width="300">
      <InputSearch v-model:value="value" addon-before="Please" placeholder="input search text" @search="onSearch" />
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
    <h2 class="mt30 mb10">前缀和后缀</h2>
    <Space :width="300">
      <InputSearch v-model:value="value" prefix="¥" suffix="元" placeholder="input search text" @search="onSearch" />
      <InputSearch v-model:value="value" placeholder="input search text" @search="onSearch">
        <template #prefix>
          <EnvironmentOutlined />
        </template>
      </InputSearch>
    </Space>
    <h2 class="mt30 mb10">搜索中</h2>
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
    <h2 class="mt30 mb10">禁用</h2>
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
  </div>
</template>
