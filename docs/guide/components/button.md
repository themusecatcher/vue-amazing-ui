# 按钮 Button

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

<br/>

*按钮用于开始一个即时操作*

## 何时使用

- 响应用户点击行为，触发相应的业务逻辑

<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
const disabled = ref(true)
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
const customLoading = ref(false)
const loading = ref(true)
const loadingOptions = [
  {
    label: 'static',
    value: 'static'
  },
  {
    label: 'dynamic',
    value: 'dynamic'
  }
]
const loadingType = ref('dynamic')
function onClick(e: Event) {
  console.log('click', e)
}
</script>

## 基本使用

*七种类型*

<br/>

<Space>
  <Button @click="onClick">Default Button</Button>
  <Button type="reverse">Reverse Button</Button>
  <Button type="primary">Primary Button</Button>
  <Button type="danger">Danger Button</Button>
  <Button type="dashed">Dashed Button</Button>
  <Button type="text">Text Button</Button>
  <Button type="link">Link Button</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function onClick(e: Event) {
  console.log('click', e)
}
</script>
<template>
  <Space>
    <Button @click="onClick">Default Button</Button>
    <Button type="reverse">Reverse Button</Button>
    <Button type="primary">Primary Button</Button>
    <Button type="danger">Danger Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
</template>
```

:::

## 按钮形状 & 图标

<Space vertical>
  <Space>
    <Tooltip tooltip="search">
      <Button type="primary" shape="circle">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
    </Tooltip>
    <Button type="primary" shape="circle">A</Button>
    <Button type="primary" shape="round">
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
    <Tooltip tooltip="search">
      <Button type="primary" shape="round">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
    </Tooltip>
    <Button type="primary">
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
  </Space>
  <Space>
    <Tooltip tooltip="search">
      <Button href="https://blog.csdn.net/Dandrose" target="_blank">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
    </Tooltip>
    <Tooltip tooltip="search">
      <Button shape="circle">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
    </Tooltip>
    <Button>
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
    <Tooltip tooltip="search">
      <Button shape="round">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
    </Tooltip>
    <Tooltip tooltip="search">
      <Button type="dashed" shape="circle">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
    </Tooltip>
    <Button type="dashed">
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
  </Space>
  <Space>
    <Tooltip tooltip="download">
      <Button type="primary">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
    </Tooltip>
    <Tooltip tooltip="download">
      <Button type="primary" shape="circle">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
    </Tooltip>
    <Button type="primary" shape="round">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
    <Tooltip tooltip="download">
      <Button type="primary" shape="round">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
    </Tooltip>
    <Button type="primary">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Space vertical>
    <Space>
      <Tooltip tooltip="search">
        <Button type="primary" shape="circle">
          <template #icon>
            <SearchOutlined />
          </template>
        </Button>
      </Tooltip>
      <Button type="primary" shape="circle">A</Button>
      <Button type="primary" shape="round">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
      <Tooltip tooltip="search">
        <Button type="primary" shape="round">
          <template #icon>
            <SearchOutlined />
          </template>
        </Button>
      </Tooltip>
      <Button type="primary">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
    </Space>
    <Space>
      <Tooltip tooltip="search">
        <Button href="https://blog.csdn.net/Dandrose" target="_blank">
          <template #icon>
            <SearchOutlined />
          </template>
        </Button>
      </Tooltip>
      <Tooltip tooltip="search">
        <Button shape="circle">
          <template #icon>
            <SearchOutlined />
          </template>
        </Button>
      </Tooltip>
      <Button>
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
      <Tooltip tooltip="search">
        <Button shape="round">
          <template #icon>
            <SearchOutlined />
          </template>
        </Button>
      </Tooltip>
      <Tooltip tooltip="search">
        <Button type="dashed" shape="circle">
          <template #icon>
            <SearchOutlined />
          </template>
        </Button>
      </Tooltip>
      <Button type="dashed">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
    </Space>
    <Space>
      <Tooltip tooltip="download">
        <Button type="primary">
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
      </Tooltip>
      <Tooltip tooltip="download">
        <Button type="primary" shape="circle">
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
      </Tooltip>
      <Button type="primary" shape="round">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </Button>
      <Tooltip tooltip="download">
        <Button type="primary" shape="round">
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
      </Tooltip>
      <Button type="primary">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </Button>
    </Space>
  </Space>
</template>
```

:::

## 幽灵按钮

<Space>
  <Button type="primary" ghost>Primary Ghost Button</Button>
  <Button type="danger" ghost>Danger Ghost Button</Button>
  <Button type="primary" ghost shape="circle">
    <template #icon>
      <SearchOutlined />
    </template>
  </Button>
  <Button type="primary" ghost shape="round">
    <template #icon>
      <SearchOutlined />
    </template>
    Search
  </Button>
  <Button type="primary" ghost shape="round">
    <template #icon>
      <SearchOutlined />
    </template>
  </Button>
  <Button type="danger" ghost shape="circle">
    <template #icon>
      <DownloadOutlined />
    </template>
  </Button>
  <Button type="danger" ghost shape="round">
    <template #icon>
      <DownloadOutlined />
    </template>
    Download
  </Button>
  <Button type="danger" ghost shape="round">
    <template #icon>
      <DownloadOutlined />
    </template>
  </Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <Space>
    <Button type="primary" ghost>Primary Ghost Button</Button>
    <Button type="danger" ghost>Danger Ghost Button</Button>
    <Button type="primary" ghost shape="circle">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button type="primary" ghost shape="round">
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
    <Button type="primary" ghost shape="round">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button type="danger" ghost shape="circle">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button type="danger" ghost shape="round">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
    <Button type="danger" ghost shape="round">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
  </Space>
</template>
```

:::

## 禁用

<Space vertical>
  <Space align="center"> Disabled state:<Switch v-model="disabled" /> </Space>
  <Space>
    <Button :disabled="disabled">Default Button</Button>
    <Button :disabled="disabled" type="reverse">Reverse Button</Button>
    <Button :disabled="disabled" type="primary">Primary Button</Button>
    <Button :disabled="disabled" type="danger">Danger Button</Button>
    <Button :disabled="disabled" type="dashed">Dashed Button</Button>
    <Button :disabled="disabled" type="text">Text Button</Button>
    <Button :disabled="disabled" type="link">Link Button</Button>
  </Space>
  <Space>
    <Button :disabled="disabled" type="primary" ghost>Primary Ghost Button</Button>
    <Button :disabled="disabled" type="danger" ghost>Danger Ghost Button</Button>
    <Button :disabled="disabled" type="primary" shape="circle">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button :disabled="disabled" type="primary" shape="round">
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
    <Button :disabled="disabled" type="primary" shape="round">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button :disabled="disabled" type="danger" shape="circle">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button :disabled="disabled" type="danger" shape="round">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
    <Button :disabled="disabled" type="danger" shape="round">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
const disabled = ref(true)
</script>
<template>
  <Space vertical>
    <Space align="center"> Disabled state:<Switch v-model="disabled" /> </Space>
    <Space>
      <Button :disabled="disabled">Default Button</Button>
      <Button :disabled="disabled" type="reverse">Reverse Button</Button>
      <Button :disabled="disabled" type="primary">Primary Button</Button>
      <Button :disabled="disabled" type="danger">Danger Button</Button>
      <Button :disabled="disabled" type="dashed">Dashed Button</Button>
      <Button :disabled="disabled" type="text">Text Button</Button>
      <Button :disabled="disabled" type="link">Link Button</Button>
    </Space>
    <Space>
      <Button :disabled="disabled" type="primary" ghost>Primary Ghost Button</Button>
      <Button :disabled="disabled" type="danger" ghost>Danger Ghost Button</Button>
      <Button :disabled="disabled" type="primary" shape="circle">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button :disabled="disabled" type="primary" shape="round">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
      <Button :disabled="disabled" type="primary" shape="round">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button :disabled="disabled" type="danger" shape="circle">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
      <Button :disabled="disabled" type="danger" shape="round">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </Button>
      <Button :disabled="disabled" type="danger" shape="round">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
    </Space>
  </Space>
</template>
```

:::

## 按钮尺寸

<Space vertical>
  <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
  <Space>
    <Button :size="size">Default Button</Button>
    <Button :size="size" type="reverse">Reverse Button</Button>
    <Button :size="size" type="primary">Primary Button</Button>
    <Button :size="size" type="danger">Danger Button</Button>
  </Space>
  <Space>
    <Button :size="size" type="dashed">Dashed Button</Button>
    <Button :size="size" type="text">Text Button</Button>
    <Button :size="size" type="link">Link Button</Button>
  </Space>
  <Space>
    <Button :size="size" type="primary" ghost>Primary Button</Button>
    <Button :size="size" type="danger" ghost>Danger Button</Button>
    <Button :size="size" type="primary" ghost loading>Primary Ghost Button</Button>
    <Button :size="size" type="danger" ghost loading>Danger Ghost Button</Button>
  </Space>
  <Space>
    <Button :size="size" type="primary" ghost>
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button :size="size" type="primary" ghost shape="circle">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button :size="size" type="primary" ghost shape="round">
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
    <Button :size="size" type="primary" ghost shape="round">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button :size="size" type="primary" ghost>
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
  </Space>
  <Space>
    <Button :size="size" type="danger">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button :size="size" type="danger" shape="circle">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button :size="size" type="danger" shape="round">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
    <Button :size="size" type="danger" shape="round">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button :size="size" type="danger">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
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
</script>
<template>
  <Space vertical>
    <Radio :options="sizeOptions" v-model:value="size" button button-style="solid" />
    <Space>
      <Button :size="size">Default Button</Button>
      <Button :size="size" type="reverse">Reverse Button</Button>
      <Button :size="size" type="primary">Primary Button</Button>
      <Button :size="size" type="danger">Danger Button</Button>
    </Space>
    <Space>
      <Button :size="size" type="dashed">Dashed Button</Button>
      <Button :size="size" type="text">Text Button</Button>
      <Button :size="size" type="link">Link Button</Button>
    </Space>
    <Space>
      <Button :size="size" type="primary" ghost>Primary Button</Button>
      <Button :size="size" type="danger" ghost>Danger Button</Button>
      <Button :size="size" type="primary" ghost loading>Primary Ghost Button</Button>
      <Button :size="size" type="danger" ghost loading>Danger Ghost Button</Button>
    </Space>
    <Space>
      <Button :size="size" type="primary" ghost>
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button :size="size" type="primary" ghost shape="circle">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button :size="size" type="primary" ghost shape="round">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
      <Button :size="size" type="primary" ghost shape="round">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button :size="size" type="primary" ghost>
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
    </Space>
    <Space>
      <Button :size="size" type="danger">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
      <Button :size="size" type="danger" shape="circle">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
      <Button :size="size" type="danger" shape="round">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </Button>
      <Button :size="size" type="danger" shape="round">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
      <Button :size="size" type="danger">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </Button>
    </Space>
  </Space>
</template>
```

:::

## 自定义样式

<Space vertical>
  <Space align="center"> Loading state:<Switch v-model="customLoading" /> </Space>
  <Space>
    <Button
      button-class="custom-btn-class1"
      ripple-color="#faad14"
      size="large"
      :loading="customLoading"
    >
      自定义样式
    </Button>
    <Button
      button-class="custom-btn-class2"
      ripple-color="#faad14"
      type="primary"
      size="large"
      :loading="customLoading"
    >
      自定义样式
    </Button>
    <Button
      button-class="custom-btn-class1"
      ripple-color="#faad14"
      shape="circle"
      size="large"
      :loading="customLoading"
    >
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button
      button-class="custom-btn-class2"
      ripple-color="#faad14"
      type="primary"
      shape="round"
      size="large"
      :loading="customLoading"
    >
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
    <Button
      button-class="custom-btn-class1"
      ripple-color="#faad14"
      shape="round"
      size="large"
      :loading="customLoading"
    >
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
const customLoading = ref(false)
</script>
<template>
  <Space vertical>
    <Space align="center"> Loading state:<Switch v-model="customLoading" /> </Space>
    <Space>
      <Button
        button-class="custom-btn-class1"
        ripple-color="#faad14"
        size="large"
        :loading="customLoading"
      >
        自定义样式
      </Button>
      <Button
        button-class="custom-btn-class2"
        ripple-color="#faad14"
        type="primary"
        size="large"
        :loading="customLoading"
      >
        自定义样式
      </Button>
      <Button
        button-class="custom-btn-class1"
        ripple-color="#faad14"
        shape="circle"
        size="large"
        :loading="customLoading"
      >
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button
        button-class="custom-btn-class2"
        ripple-color="#faad14"
        type="primary"
        shape="round"
        size="large"
        :loading="customLoading"
      >
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
      <Button
        button-class="custom-btn-class1"
        ripple-color="#faad14"
        shape="round"
        size="large"
        :loading="customLoading"
      >
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
    </Space>
  </Space>
</template>
<style lang="less" scoped>
.custom-btn-class1 {
  height: 40px;
  font-size: 18px;
  border-color: #faad14;
  color: #faad14;
  &:hover {
    color: #ffc53d !important;
    border-color: #ffc53d;
  }
  &:active {
    color: #d48806 !important;
    border-color: #d48806;
  }
}
.custom-btn-class2 {
  height: 40px;
  font-size: 18px;
  background: #faad14;
  border-color: #faad14;
  &:hover {
    background: #ffc53d;
    border-color: #ffc53d;
  }
  &:active {
    background: #d48806;
    border-color: #d48806;
  }
}
</style>
```

:::

## 自定义跳转

<Space>
  <Button type="primary" ghost href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank">
    <template #icon>
      <img
        style="width: 1em; height: 1em"
        src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
      />
    </template>
    Vue Amazing UI
  </Button>
  <Button
    type="primary"
    href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html"
    target="_blank"
  >
    Button Component
  </Button>
  <Button type="primary" ghost shape="round" href="https://blog.csdn.net/Dandrose" target="_blank">
    My CSDN Blogs
  </Button>
</Space>

::: details Show Code

```vue
<template>
  <Space>
    <Button type="primary" ghost href="https://themusecatcher.github.io/vue-amazing-ui/" target="_blank">
      <template #icon>
        <img
          style="width: 1em; height: 1em"
          src="https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg"
        />
      </template>
      Vue Amazing UI
    </Button>
    <Button
      type="primary"
      href="https://themusecatcher.github.io/vue-amazing-ui/guide/components/button.html"
      target="_blank"
    >
      Button Component
    </Button>
    <Button type="primary" ghost shape="round" href="https://blog.csdn.net/Dandrose" target="_blank">
      My CSDN Blogs
    </Button>
  </Space>
</template>
```

:::

## 加载中状态

<Space vertical>
  <Space align="center"> Loading state:<Switch v-model="loading" /> </Space>
  <Space align="center"> Loading type:<Radio :options="loadingOptions" v-model:value="loadingType" /> </Space>
  <Space>
    <Button :loading="loading" :loading-type="loadingType">Default Button</Button>
    <Button type="reverse" :loading="loading" :loading-type="loadingType">Reverse Button</Button>
    <Button type="primary" :loading="loading" :loading-type="loadingType">Primary Button</Button>
    <Button type="danger" :loading="loading" :loading-type="loadingType">Danger Button</Button>
  </Space>
  <Space>
    <Button type="dashed" :loading="loading" :loading-type="loadingType">Dashed Button</Button>
    <Button type="text" :loading="loading" :loading-type="loadingType">Text Button</Button>
    <Button type="link" :loading="loading" :loading-type="loadingType">Link Button</Button>
  </Space>
  <Space>
    <Button type="primary" ghost :loading="loading" :loading-type="loadingType">Primary Ghost Button</Button>
    <Button type="danger" ghost :loading="loading" :loading-type="loadingType">Danger Ghost Button</Button>
  </Space>
  <Space>
    <Button type="primary" :loading="loading" :loading-type="loadingType">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button type="primary" shape="circle" :loading="loading" :loading-type="loadingType">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button type="primary" shape="round" :loading="loading" :loading-type="loadingType">
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </Button>
    <Button type="primary" shape="round" :loading="loading" :loading-type="loadingType">
      <template #icon>
        <SearchOutlined />
      </template>
    </Button>
    <Button type="danger" ghost :loading="loading" :loading-type="loadingType">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button type="danger" ghost shape="circle" :loading="loading" :loading-type="loadingType">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
    <Button type="danger" ghost shape="round" :loading="loading" :loading-type="loadingType">
      <template #icon>
        <DownloadOutlined />
      </template>
      Download
    </Button>
    <Button type="danger" ghost shape="round" :loading="loading" :loading-type="loadingType">
      <template #icon>
        <DownloadOutlined />
      </template>
    </Button>
  </Space>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
const loading = ref(true)
const loadingOptions = [
  {
    label: 'static',
    value: 'static'
  },
  {
    label: 'dynamic',
    value: 'dynamic'
  }
]
const loadingType = ref('dynamic')
</script>
<template>
  <Space vertical>
    <Space align="center"> Loading state:<Switch v-model="loading" /> </Space>
    <Space align="center"> Loading type:<Radio :options="loadingOptions" v-model:value="loadingType" /> </Space>
    <Space>
      <Button :loading="loading" :loading-type="loadingType">Default Button</Button>
      <Button type="reverse" :loading="loading" :loading-type="loadingType">Reverse Button</Button>
      <Button type="primary" :loading="loading" :loading-type="loadingType">Primary Button</Button>
      <Button type="danger" :loading="loading" :loading-type="loadingType">Danger Button</Button>
    </Space>
    <Space>
      <Button type="dashed" :loading="loading" :loading-type="loadingType">Dashed Button</Button>
      <Button type="text" :loading="loading" :loading-type="loadingType">Text Button</Button>
      <Button type="link" :loading="loading" :loading-type="loadingType">Link Button</Button>
    </Space>
    <Space>
      <Button type="primary" ghost :loading="loading" :loading-type="loadingType">Primary Ghost Button</Button>
      <Button type="danger" ghost :loading="loading" :loading-type="loadingType">Danger Ghost Button</Button>
    </Space>
    <Space>
      <Button type="primary" :loading="loading" :loading-type="loadingType">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button type="primary" shape="circle" :loading="loading" :loading-type="loadingType">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button type="primary" shape="round" :loading="loading" :loading-type="loadingType">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </Button>
      <Button type="primary" shape="round" :loading="loading" :loading-type="loadingType">
        <template #icon>
          <SearchOutlined />
        </template>
      </Button>
      <Button type="danger" ghost :loading="loading" :loading-type="loadingType">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
      <Button type="danger" ghost shape="circle" :loading="loading" :loading-type="loadingType">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
      <Button type="danger" ghost shape="round" :loading="loading" :loading-type="loadingType">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </Button>
      <Button type="danger" ghost shape="round" :loading="loading" :loading-type="loadingType">
        <template #icon>
          <DownloadOutlined />
        </template>
      </Button>
    </Space>
  </Space>
</template>
```

:::

## block 按钮

<Space>
  <Button block>Default Button</Button>
  <Button block type="primary" shape="round">Primary Button</Button>
  <Button block type="danger" shape="round">Danger Button</Button>
  <Button block type="primary" ghost>Primary Button</Button>
  <Button block type="danger" ghost>Danger Button</Button>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function onClick(e: Event) {
  console.log('click', e)
}
</script>
<template>
  <Space>
    <Button block>Default Button</Button>
    <Button block type="primary" shape="round">Primary Button</Button>
    <Button block type="danger" shape="round">Danger Button</Button>
    <Button block type="primary" ghost>Primary Button</Button>
    <Button block type="danger" ghost>Danger Button</Button>
  </Space>
</template>
```

:::

<style lang="less" scoped>
.custom-btn-class1 {
  height: 40px;
  font-size: 18px;
  border-color: #faad14;
  color: #faad14;
  &:hover {
    color: #ffc53d !important;
    border-color: #ffc53d;
  }
  &:active {
    color: #d48806 !important;
    border-color: #d48806;
  }
}
.custom-btn-class2 {
  height: 40px;
  font-size: 18px;
  background: #faad14;
  border-color: #faad14;
  &:hover {
    background: #ffc53d;
    border-color: #ffc53d;
  }
  &:active {
    background: #d48806;
    border-color: #d48806;
  }
}
</style>

## APIs

### Button

参数 | 说明 | 类型 | 默认值
-- | -- | -- | --
type | 设置按钮类型 | 'default' &#124; 'reverse' &#124; 'primary' &#124; 'danger' &#124; 'dashed' &#124; 'text' &#124; 'link' | 'default'
shape | 设置按钮形状 | 'default' &#124; 'circle' &#124; 'round' | 'default'
icon | 设置按钮图标 | slot | undefined
size | 设置按钮尺寸 | 'small' &#124; 'middle' &#124; 'large' | 'middle'
ghost | 按钮背景是否透明，仅当 `type: 'primary' \| 'danger'` 时生效 | boolean | false
buttonClass | 设置按钮类名 | string | undefined
rippleColor | 点击时的波纹颜色，一般不需要设置，默认会根据 `type` 自动匹配，主要用于自定义样式时且 `type: 'default'` | string | undefined
href | 点击跳转的地址，与 `a` 链接的 `href` 属性一致 | string | undefined
target | 如何打开目标链接，相当于 `a` 链接的 `target` 属性，`href` 存在时生效 | '_self' &#124; '_blank' | '_self'
disabled | 是否禁用 | boolean | false
loading | 是否加载中 | boolean | false
loadingType | 加载指示符类型 | 'static' &#124; 'dynamic' | 'dynamic'
block | 是否将按钮宽度调整为其父宽度 | boolean | false

## Events

名称 | 说明 | 类型
-- | -- | --
click | 点击按钮时的回调 | (e: Event) => void
