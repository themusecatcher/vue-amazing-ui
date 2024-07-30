# 特性

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

## 简要介绍

- 该组件库采用 `Vue@{{ getVersion('vue') }}` + `TypeScript@{{ getVersion('typescript') }}` + `Vite@{{ getVersion('vite') }}` + `Less@{{ getVersion('less') }}` 实现！
- 所有组件，均采用单文件组件 `SFC` 形式，无需任何安装引入，亦可直接使用源码！
- 所有组件样式均使用 `box-sizing: border-box;` 模式！
- 部分组件样式尚未完美适配暗黑模式，可切换至 `light` 模式查看！
- 开箱即用，不墨迹！

## 使用方式

- 全局引入并注册所有组件
- 按需引入并注册部分组件
- **无需任何安装引入注册，使用单文件组件 `SFC`，亦可一步到位**

<script setup lang="ts">
import pkg from '../../package.json'

const dependencies = pkg.dependencies
const devDependencies = pkg.devDependencies
function getVersion (target: string): string {
  for (let name of Object.keys(dependencies)) {
    if (name === target) {
      return dependencies[name].replace('^', '')
    }
  }
  for (let name of Object.keys(devDependencies)) {
    if (name === target) {
      return devDependencies[name].replace('^', '')
    }
  }
  return ''
}
</script>
