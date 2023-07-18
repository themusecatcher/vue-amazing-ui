<script setup lang="ts">
function openChange (visible: boolean) {
  console.log('visible:', visible)
}
</script>
<template>
  <div class="ml120">
    <h1>Tooltip 文字提示</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Space :size="30">
      <Tooltip :maxWidth="240" @open-change="openChange">
        <template #title>特斯拉(Tesla)是美国一家电动汽车及能源公司，总部位于帕洛阿托(Palo Alto)，市值达2100亿美元，产销电动汽车、太阳能板、及储能设备</template>
        <Button type="primary">特斯拉</Button>
      </Tooltip>
      <Tooltip :maxWidth="380" @open-change="openChange">
        <template #title>《哥斯拉》由传奇影业、华纳兄弟影业公司等联合出品。该片讲述了世界各地异常自然灾害的发生频率的上升，被隐瞒了几十年的秘密逐渐浮出水面，人类即将面临一场来自远古的浩劫，三只强大怪兽也将轮番登场掀起层层高潮，这场混战也将在怪兽与人类之间打响的故事</template>
        <Button type="primary">哥斯拉</Button>
      </Tooltip>
    </Space>
    <h2 class="mt30 mb10">自定义样式</h2>
    <Tooltip
      :maxWidth="320"
      :fontSize="18"
      color="rgba(0, 0, 0, 0.85)"
      backgroundColor="#FFF"
      :overlayStyle="{padding: '12px 18px', borderRadius: '12px'}">
      <template #title>《哥斯拉大战金刚》是由美国传奇影业公司出品。该片讲述了人类计划将所有巨兽从地球上抹去，而传说中哥斯拉和金刚两个王者被设计进行了对决，最终两大巨兽联手破坏人类计划的故事。</template>
      <Button type="primary">哥斯拉大战金刚</Button>
    </Tooltip>
    <h2 class="mt30 mb10">暂无数据</h2>
    <Tooltip>
      <Button type="primary">暂无数据</Button>
    </Tooltip>
  </div>
</template>
