<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
function onSearch (searchValue: string) {
  console.log('use value', searchValue)
  console.log('or use this.value', value.value)
}
</script>
<template>
  <div>
    <!-- <h1>{{ $route.name }} {{ $route.meta.title }}</h1> -->
    <h2 class="mt30 mb10">基本使用</h2>
    <Space direction="vertical">
      <InputSearch
        :width="200"
        v-model:value="value"
        placeholder="input search text"
        @search="onSearch"
      />
      <InputSearch
        v-model:value="value"
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
      <InputSearch
        v-model:value="value"
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="onSearch"
      />
      <InputSearch
        v-model:value="value"
        placeholder="input search text"
        size="large"
        @search="onSearch"
      >
        <template #enterButton>
          <a-button>Custom</a-button>
        </template>
      </InputSearch>
    </Space>
    <br/>
    <br/>
    <a-space direction="vertical">
      <a-input-search
        v-model:value="value"
        suffix="suffix"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="onSearch"
      />
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        size="large"
        @search="onSearch"
      >
        <template #enterButton>
          <a-button>Custom</a-button>
        </template>
      </a-input-search>
    </a-space>
  </div>
</template>
