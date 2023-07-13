<template>
  <div>
    <h1>QRCode 二维码</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <QRCode value="https://blog.csdn.net/Dandrose"/>
    <h2 class="mt30 mb10">无边框，纠错等级M (bordered: false & errorLevel: M)</h2>
    <QRCode
      value="https://blog.csdn.net/Dandrose"
      :bordered="false"
      errorLevel="M"/>
    <h2 class="mt30 mb10">自定义二维码颜色和背景色 (color: '#1677FF', backgroundColor: 'rgba(0,0,0,0.25)')</h2>
    <QRCode
      value="https://blog.csdn.net/Dandrose"
      color="#1677FF"
      backgroundColor="f5f5f5"/>
  </div>
</template>
