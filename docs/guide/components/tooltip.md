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

<details>
<summary>查看代码</summary>

```vue
<template>
  <Tooltip :maxWidth="240">
    <template #title>特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备</template>
    <Button type="primary">特斯拉</Button>
  </Tooltip>
</template>
```

</details>

## 自定义样式

<Tooltip :maxWidth="280" :fontSize="14" color="rgba(0, 0, 0, 0.85)" backgroundColor="#FFF">
  <template #title>《哥斯拉大战金刚》是由美国传奇影业公司出品，亚当·温佳德执导，亚历山大·斯卡斯加德、米莉·博比·布朗、丽贝卡·豪尔、凯莉·霍特尔、布莱恩·泰里·亨利、小栗旬联合主演的动作科幻片，于2021于3月26日在中国内地上映</template>
  <Button type="primary">哥斯拉大战金刚</Button>
</Tooltip>

<details>
<summary>查看代码</summary>

```vue
<template>
  <Tooltip :maxWidth="280" :fontSize="14" color="rgba(0, 0, 0, 0.85)" backgroundColor="#FFF">
    <template #title>《哥斯拉大战金刚》是由美国传奇影业公司出品，亚当·温佳德执导，亚历山大·斯卡斯加德、米莉·博比·布朗、丽贝卡·豪尔、凯莉·霍特尔、布莱恩·泰里·亨利、小栗旬联合主演的动作科幻片，于2021于3月26日在中国内地上映</template>
    <Button type="primary">哥斯拉大战金刚</Button>
  </Tooltip>
</template>
```

</details>

## 暂无数据

<Tooltip>
  <Button type="primary">暂无数据</Button>
</Tooltip>

<details>
<summary>查看代码</summary>

```vue
<template>
  <Tooltip>
    <Button type="primary">暂无数据</Button>
  </Tooltip>
</template>
```

</details>