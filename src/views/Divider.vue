<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Divider>Center Text</Divider>
    <Divider border-style="dashed">Center Text</Divider>
    <h2 class="mt30 mb10">中间无文字</h2>
    <Divider />
    <Divider border-style="dashed" />
    <h2 class="mt30 mb10">指定文字位置</h2>
    <Divider>Center Text</Divider>
    <Divider orientation="left">Left Text</Divider>
    <Divider orientation="right">Right Text</Divider>
    <h2 class="mt30 mb10">自定义文字边距</h2>
    <h3 class="mb10">文字居左(右)并距左(右)边 120px</h3>
    <Divider orientation="left" :orientation-margin="120">Left Text</Divider>
    <Divider orientation="right" :orientation-margin="120">Right Text</Divider>
    <h2 class="mt30 mb10">垂直分割线</h2>
    <div>
      Text
      <Divider vertical />
      <a href="#">Link</a>
      <Divider vertical />
      <a href="#">Link</a>
    </div>
    <h2 class="mt30 mb10">自定义垂直线高度</h2>
    <Divider vertical :border-width="3" :height="60" />
    <Divider vertical :border-width="3" :height="60" border-style="dashed" />
    <Divider vertical :border-width="3" :height="60" border-style="dotted" />
    <h2 class="mt30 mb10">自定义样式</h2>
    <Divider :border-width="3" border-color="orange" />
    <Divider :border-width="3" border-style="dashed" border-color="orange" />
    <Divider :border-width="3" border-style="dotted" border-color="orange" />
    <Flex style="height: 120px">
      <Divider vertical :border-width="3" border-color="orange" height="auto" />
      <Divider vertical :border-width="3" border-style="dashed" border-color="orange" :height="120" />
      <Divider vertical :border-width="3" border-style="dotted" border-color="orange" height="100%" />
    </Flex>
  </div>
</template>
