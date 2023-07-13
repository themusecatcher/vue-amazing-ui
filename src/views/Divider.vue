<template>
  <div>
    <h1>Divider 分割线</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Divider>Center Text</Divider>
    <h2 class="mt30 mb10">中间无文字</h2>
    <Divider />
    <h2 class="mt30 mb10">使用 orientation 指定文字位置 (left | center | right)</h2>
    <Divider orientation="left">Left Text</Divider>
    <Divider orientation="right">Right Text</Divider>
    <h2 class="mt30 mb10">文字居左(右)并距左(右)边120px (orientation: left(right) & orientation-margin: 120)</h2>
    <Divider orientation="left" :orientation-margin="120">Left Text</Divider>
    <Divider orientation="right" :orientation-margin="120">Right Text</Divider>
    <h2 class="mt30 mb10">使用虚线 (dashed: true)</h2>
    <Divider dashed>Center Text</Divider>
    <h2 class="mt30 mb10">分割线线宽3px (borderWidth: 3)</h2>
    <Divider :borderWidth="3">Center Text</Divider>
  </div>
</template>
