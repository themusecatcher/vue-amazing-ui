# 文字提示 Tooltip

<br/>

*悬浮提示，展现需要关注的信息*

## 何时使用

- 当某个页面需要向用户显示警告的信息时

## 基本使用

<Tooltip :maxWidth="240">
  <template #title>特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备</template>
  <Button type="primary">特斯拉</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip :maxWidth="240">
    <template #title>特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备</template>
    <Button type="primary">特斯拉</Button>
  </Tooltip>
</template>
```

:::

## 自定义样式

<Tooltip :maxWidth="300" :fontSize="16" color="rgba(0, 0, 0, 0.85)" backgroundColor="#FFF">
  <template #title>《哥斯拉大战金刚》是由美国传奇影业公司出品，亚当·温佳德执导，亚历山大·斯卡斯加德、米莉·博比·布朗、丽贝卡·豪尔、凯莉·霍特尔、布莱恩·泰里·亨利、小栗旬联合主演的动作科幻片，于2021于3月26日在中国内地上映</template>
  <Button type="primary">哥斯拉大战金刚</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip :maxWidth="300" :fontSize="16" color="rgba(0, 0, 0, 0.85)" backgroundColor="#FFF">
    <template #title>《哥斯拉大战金刚》是由美国传奇影业公司出品，亚当·温佳德执导，亚历山大·斯卡斯加德、米莉·博比·布朗、丽贝卡·豪尔、凯莉·霍特尔、布莱恩·泰里·亨利、小栗旬联合主演的动作科幻片，于2021于3月26日在中国内地上映</template>
    <Button type="primary">哥斯拉大战金刚</Button>
  </Tooltip>
</template>
```

:::

## 暂无数据

<Tooltip>
  <Button type="primary">暂无数据</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip>
    <Button type="primary">暂无数据</Button>
  </Tooltip>
</template>
```

:::

## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
maxWidth | 提示框内容最大宽度，单位px | number | 120 | false
content | 展示的文本 | string | '暂无内容' | false
title | 提示的文本 | string | '暂无提示' | false
fontSize | 提示文本字体大小，单位px | number | 14 | false
color | 提示文本字体颜色 | string | '#FFF' | false
backgroundColor | 提示框背景色 | string | 'rgba(0,0,0,.85)' | false
