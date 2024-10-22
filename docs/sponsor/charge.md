# 充电 Charge Me

<BackTop />
<Watermark fullscreen content="Vue Amazing UI" />

*赞助 Vue Amazing UI，让开源项目持续发展，非常感谢您的支持 ❤️❤️*

<script setup lang="ts">
import { ref } from 'vue'
const sponsorText = {
  title: '如果您 Vue Amazing UI 有用，您可以请作者喝杯茶表示支持，非常感谢❤️🙏❤️'
}
const QRCodes = [
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.8/wechat.jpg',
    name: 'WeChat'
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.8/alipay.jpg',
    name: 'Alipay'
  }
]
</script>

## Sponsor

<!-- <Alert message="如果您觉得 Vue Amazing UI 有用，可以请作者喝杯茶表示支持，非常感谢❤️🙏❤️" type="info" :bordered="false" /> -->

<TextScroll
  :scrollText="sponsorText"
  single
  :height="54"
  :board-style="{ backgroundColor: '#e6f4ff' }"
  :text-style="{ fontSize: '20px', fontWeight: 600, color: 'rgba(0, 0, 0, 0.88)' }"
/>

<br/>

<Card :body-style="{ position: 'relative' }">
  <Tag class="wechat-tag" color="#07c160" size="large" :bordered="false">WeChat</Tag>
  <Tag class="alipay-tag" color="#1677ff" size="large" :bordered="false">Alipay</Tag>
  <Image
    class="sponsor-image"
    :src="QRCodes"
    loop
    :width="220"
    :height="220"
    :bordered="false"
    :space-props="{
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }"
  />
</Card>

<style scoped lang="less">
.wechat-tag {
  font-size: 16px;
  height: 36px;
  padding-inline: 12px;
  position: absolute;
  left: 134px;
  transform: translateX(-50%);
}
.alipay-tag {
  font-size: 16px;
  height: 36px;
  padding-inline: 12px;
  position: absolute;
  right: 134px;
  transform: translateX(50%);
}
.sponsor-image {
  display: block;
  margin-top: 48px;
}
</style>

## 赞助者

<!-- 虚位以待... -->

<Tooltip tooltip="themusecatcher">
  <a href="https://github.com/themusecatcher" target="_blank">
    <Avatar :size="36" src="https://github.com/themusecatcher.png" />
  </a>
</Tooltip>
