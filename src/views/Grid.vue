<template>
  <div>
    <h1>Grid 栅格</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Row class="row">
      <Col :span="24">col</Col>
    </Row>
    <Row class="row">
      <Col :span="12">col-12</Col>
      <Col :span="12">col-12</Col>
    </Row>
    <Row class="row">
      <Col :span="8">col-8</Col>
      <Col :span="8">col-8</Col>
      <Col :span="8">col-8</Col>
    </Row>
    <Row class="row">
      <Col :span="6">col-6</Col>
      <Col :span="6">col-6</Col>
      <Col :span="6">col-6</Col>
      <Col :span="6">col-6</Col>
    </Row>
    <h2 class="mt30 mb10">水平区块间隔</h2>
    <Row :gutter="16">
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
    </Row>
    <h2 class="mt30 mb10">响应式区块间隔</h2>
    <Row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
    </Row>
    <h2 class="mt30 mb10">垂直区块间隔</h2>
    <Row :gutter="[16, 24]">
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
    </Row>
    <h2 class="mt30 mb10">响应式垂直区块间隔</h2>
    <Row :gutter="[16, { xs: 8, sm: 16, md: 24, lg: 32 }]">
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
      <Col class="gutter-row" :span="6">
        <div class="gutter-box">col-6</div>
      </Col>
    </Row>
    <h2 class="mt30 mb10">左右偏移</h2>
    <Row class="row">
      <Col :span="8">col-8</Col>
      <Col :span="8" :offset="8">col-8</Col>
    </Row>
    <Row class="row">
      <Col :span="6" :offset="6">col-6 col-offset-6</Col>
      <Col :span="6" :offset="6">col-6 col-offset-6</Col>
    </Row>
    <Row class="row">
      <Col :span="12" :offset="6">col-12 col-offset-6</Col>
    </Row>
    <h2 class="mt30 mb10">排版方式</h2>
    <Divider orientation="left">sub-element align left</Divider>
    <Row class="row" justify="start">
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align center</Divider>
    <Row class="row" justify="center">
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align right</Divider>
    <Row class="row" justify="end">
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align space-between</Divider>
    <Row class="row" justify="space-between">
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align space-around</Divider>
    <Row class="row" justify="space-around">
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
    </Row>
    <Divider orientation="left">sub-element align space-evenly</Divider>
    <Row class="row" justify="space-evenly">
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
      <Col :span="4">col-4</Col>
    </Row>
    <h2 class="mt30 mb10">对齐方式</h2>
    <Divider orientation="left">Align Top</Divider>
    <Row class="row" style="background: rgba(128,128,128,.08);" justify="center" align="top">
      <Col :span="4">
        <p class="height-100">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-50">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-120">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-80">col-4</p>
      </Col>
    </Row>
    <Divider orientation="left">Align Middle</Divider>
    <Row class="row" style="background: rgba(128,128,128,.08);" justify="space-around" align="middle">
      <Col :span="4">
        <p class="height-100">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-50">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-120">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-80">col-4</p>
      </Col>
    </Row>
    <Divider orientation="left">Align Bottom</Divider>
    <Row class="row" style="background: rgba(128,128,128,.08);" justify="space-between" align="bottom">
      <Col :span="4">
        <p class="height-100">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-50">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-120">col-4</p>
      </Col>
      <Col :span="4">
        <p class="height-80">col-4</p>
      </Col>
    </Row>
    <h2 class="mt30 mb10">flex 填充</h2>
    <Divider orientation="left">Percentage columns</Divider>
    <Row class="row">
      <Col :flex="2">2 / 5</Col>
      <Col :flex="3">3 / 5</Col>
    </Row>
    <Divider orientation="left">Fill rest</Divider>
    <Row class="row">
      <Col flex="0 0 100px">100px</Col>
      <Col flex="auto">auto</Col>
    </Row>
    <Divider orientation="left">Raw flex style</Divider>
    <Row class="row">
      <Col flex="1 1 200px">1 1 200px</Col>
      <Col flex="0 1 300px">0 1 300px</Col>
    </Row>
    <Row class="row">
      <Col flex="none">
        <div style="padding: 0 16px">none</div>
      </Col>
      <Col flex="auto">auto with no-wrap</Col>
    </Row>
    <h2 class="mt30 mb10">响应式布局</h2>
    <Row class="row">
      <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</Col>
      <Col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">Col</Col>
      <Col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">Col</Col>
    </Row>
    <h2 class="mt30 mb10">span 和 offset 属性的响应式</h2>
    <Row class="row">
      <Col :xs="{ span: 5, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
      <Col :xs="{ span: 11, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
      <Col :xs="{ span: 5, offset: 1 }" :sm="{ span: 6, offset: 2 }">Col</Col>
    </Row>
  </div>
</template>
<style lang="less" scoped>
.row {
  .m-col {
    min-height: 30px;
    margin-top: 8px;
    margin-bottom: 8px;
    color: #fff;
    text-align: center;
    border-radius: 0;
    padding: 16px 0;
    background: #1677ff;
  }
  :deep(>:nth-child(2n+1)) {
    background: #1677ffbf;
  }
}
.gutter-row {
  .m-col {
    min-height: 30px;
    margin-top: 8px;
    margin-bottom: 8px;
    color: #fff;
    text-align: center;
    border-radius: 0;
  }
  .gutter-box {
    background: #0092ff;
    padding: 8px 0;
  }
  .m-col {
    margin-top: 0;
    margin-bottom: 0;
  }
}
.height-50 {
  height: 50px;
  line-height: 50px;
}
.height-80 {
  height: 80px;
  line-height: 80px;
}
.height-100 {
  height: 100px;
  line-height: 100px;
}
.height-120 {
  height: 120px;
  line-height: 120px;
}
</style>
