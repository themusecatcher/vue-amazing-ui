<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Divider>Center Text</Divider>
    <h2 class="mt30 mb10">中间无文字</h2>
    <Divider />
    <h2 class="mt30 mb10">垂直分割线</h2>
    <div>
      Text
      <Divider type="vertical" />
      <a href="#">Link</a>
      <Divider type="vertical" />
      <a href="#">Link</a>
    </div>
    <h2 class="mt30 mb10">指定文字位置</h2>
    <Divider orientation="left">Left Text</Divider>
    <Divider orientation="right">Right Text</Divider>
    <h2 class="mt30 mb10">自定义文字文字</h2>
    <h3 class="mb10">文字居左(右)并距左(右)边 120px</h3>
    <Divider orientation="left" :orientation-margin="120">Left Text</Divider>
    <Divider orientation="right" :orientation-margin="120">Right Text</Divider>
    <h2 class="mt30 mb10">使用虚线</h2>
    <Divider dashed>Center Text</Divider>
    <h2 class="mt30 mb10">自定义线宽</h2>
    <h3 class="mb10">线宽 3px</h3>
    <Divider :borderWidth="3">Center Text</Divider>
  </div>
</template>
