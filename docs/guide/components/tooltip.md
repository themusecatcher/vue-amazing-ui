# 文字提示 Tooltip

<br/>

*悬浮提示，展现需要关注的信息*

## 何时使用

- 当某个页面需要向用户显示警告的信息时

## 基本使用

<script setup lang="ts">
function openChange (visible: boolean) {
  console.log('visible:', visible)
}
</script>

## 基本使用

<Space :size="30">
  <Tooltip :max-width="240" @open-change="openChange">
    <template #tooltip>特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备</template>
    <Button type="primary">特斯拉</Button>
  </Tooltip>
  <Tooltip :max-width="380" @open-change="openChange">
    <template #tooltip>《哥斯拉》由传奇影业、华纳兄弟影业公司等联合出品。该片讲述了世界各地异常自然灾害的发生频率的上升，被隐瞒了几十年的秘密逐渐浮出水面，人类即将面临一场来自远古的浩劫，三只强大怪兽也将轮番登场掀起层层高潮，这场混战也将在怪兽与人类之间打响的故事</template>
    <Button type="primary">哥斯拉</Button>
  </Tooltip>
</Space>

::: details Show Code

```vue
<script setup lang="ts">
function openChange (visible: boolean) {
  console.log('visible:', visible)
}
</script>
<template>
  <Space :size="30">
    <Tooltip :max-width="240" @open-change="openChange">
      <template #tooltip>特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备</template>
      <Button type="primary">特斯拉</Button>
    </Tooltip>
    <Tooltip :max-width="380" @open-change="openChange">
      <template #tooltip>《哥斯拉》由传奇影业、华纳兄弟影业公司等联合出品。该片讲述了世界各地异常自然灾害的发生频率的上升，被隐瞒了几十年的秘密逐渐浮出水面，人类即将面临一场来自远古的浩劫，三只强大怪兽也将轮番登场掀起层层高潮，这场混战也将在怪兽与人类之间打响的故事</template>
      <Button type="primary">哥斯拉</Button>
    </Tooltip>
  </Space>
</template>
```

:::

## 自定义样式

<Tooltip
  :max-width="320"
  :font-size="18"
  color="rgba(0, 0, 0, 0.85)"
  background-color="#FFF"
  :overlay-style="{padding: '12px 18px', borderRadius: '12px'}">
  <template #tooltip>《哥斯拉大战金刚》是由美国传奇影业公司出品。该片讲述了人类计划将所有巨兽从地球上抹去，而传说中哥斯拉和金刚两个王者被设计进行了对决，最终两大巨兽联手破坏人类计划的故事。</template>
  <Button type="primary">哥斯拉大战金刚</Button>
</Tooltip>

::: details Show Code

```vue
<template>
  <Tooltip
    :max-width="320"
    :font-size="18"
    color="rgba(0, 0, 0, 0.85)"
    background-color="#FFF"
    :overlay-style="{padding: '12px 18px', borderRadius: '12px'}">
    <template #tooltip>《哥斯拉大战金刚》是由美国传奇影业公司出品。该片讲述了人类计划将所有巨兽从地球上抹去，而传说中哥斯拉和金刚两个王者被设计进行了对决，最终两大巨兽联手破坏人类计划的故事。</template>
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
content | 展示的文本 | string &#124; slot | '暂无内容' | false
tooltip | 提示的文本 | string &#124; slot | '暂无提示' | false
fontSize | 提示文本字体大小，单位px，优先级高于 `overlayStyle` | number | 14 | false
color | 提示文本字体颜色，优先级高于 `overlayStyle` | string | '#FFF' | false
backgroundColor | 提示框背景色，优先级高于 `overlayStyle` | string | 'rgba(0,0,0,.85)' | false
overlayStyle | 提示框内容区域样式 | CSSProperties | {} | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
openChange | 显示隐藏的回调 | (visible: boolean) => void
