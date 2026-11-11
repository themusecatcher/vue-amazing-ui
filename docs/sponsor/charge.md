---
description: 赞助 Vue Amazing UI 组件库，支持项目持续迭代
---

# ✨ 成为赞助者

<GlobalElement hide-sponsor />

<div class="sponsor-intro">

`Vue Amazing UI` 是采用 `MIT` 许可的开源项目，个人与商业使用均**免费**。

目前包含 **73** 个基础组件与 **16** 个工具函数，从设计、开发到文档站与演示页面，全部由作者一人维护。

如果这个组件库对你的工作或项目有帮助，欢迎请作者喝杯咖啡（金额随意），项目的持续迭代离不开每一位使用者的支持。

</div>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CSSProperties } from 'vue'
import { HeartFilled, WechatOutlined, AlipayOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useMediaQuery } from 'vue-amazing-ui'
import WeChat from '/wechat.png'
import Alipay from '/alipay.png'
import Avatar1 from '/avatar_1.jpeg'
import Avatar2 from '/avatar_2.jpg'
import Avatar3 from '/avatar_3.png'
import Avatar4 from '/avatar_4.png'
import Avatar5 from '/avatar_5.png'
import Avatar6 from '/avatar_6.jpg'
// 赞助者名单
interface Sponsor {
  platform: string // 赞助渠道
  name: string // 赞助者昵称
  avatar?: string // 头像地址，未提供时由 Avatar 的 #icon 插槽兜底（跟随主题的默认头像）
  href?: string // 主页跳转地址
  needBorder?: boolean // 头像为透明底图片时，需要白底 + 描边衬托
}
const { match: isMobile } = useMediaQuery('(max-width: 768px)')
// 赞助标语：移动端静态展示与桌面端 TextScroll 滚动共用同一份文案
const sloganItem = {
  title: '如果觉得 Vue Amazing UI 有用、有趣，或者对您有帮助，欢迎对作者表示下支持，非常感谢 ❤️'
}
const sloganItemStyle: CSSProperties = {
  fontSize: '18px',
  fontWeight: 500,
  color: 'var(--vp-c-text-1)'
}
// 移动端标语卡片：内边距与文本样式一律通过 Card 的 bodyStyle 属性注入，
// 不再为文字单独挂类名；Card 默认正文内边距 24px，此处收紧到 16px 与页面其它块留白一致
const sloganBodyStyle: CSSProperties = {
  padding: '16px',
  fontSize: '17px',
  fontWeight: 500,
  lineHeight: 1.7,
  color: 'var(--vp-c-text-1)',
  textAlign: 'center'
}
// 赞助渠道：标签颜色、图标、收款码集中一处，供移动端切换器与两端二维码渲染复用；
// codeName 同时用作收款码的 alt 与预览标题（Image 的 name 属性），故用中文而非渠道英文名
const sponsorPlatforms = [
  { name: 'WeChat', codeName: '微信收款码', color: '#07c160', icon: WechatOutlined, src: WeChat },
  { name: 'Alipay', codeName: '支付宝收款码', color: '#1677ff', icon: AlipayOutlined, src: Alipay }
]
const sponsorOptions = sponsorPlatforms.map(item => ({
  label: item.name,
  value: item.name,
  payload: item
}))
const sponsorType = ref('WeChat')
const qrcodeSize = computed(() => (isMobile.value ? 200 : 240))
// 卡片两端均拉通全宽（Card 默认 width: auto），二维码由 .qrcode-list 的 space-evenly 居中/均分
const cardSize = computed(() => (isMobile.value ? 'middle' : 'large'))
// 移动端只展示当前选中的收款码，桌面端并排展示全部
const visiblePlatforms = computed(() => {
  if (!isMobile.value) {
    return sponsorPlatforms
  }
  return sponsorPlatforms.filter(item => item.name === sponsorType.value)
})
// 结语标题的渐变色
const tipsGradient = {
  deg: '90deg',
  from: '#09c8ce',
  to: '#eb2f96'
}
const sponsors: Sponsor[] = [
  { platform: 'WeChat', name: '@Ant', avatar: Avatar1 },
  { platform: 'GitHub', name: '@nizhensh-i', avatar: Avatar2, href: 'https://github.com/nizhensh-i' },
  { platform: 'GitHub', name: '@beijin1949', avatar: Avatar3, href: 'https://github.com/beijin1949', needBorder: true },
  { platform: 'GitHub', name: '@JinZemin', avatar: Avatar4, href: 'https://github.com/JinZemin' },
  { platform: 'GitHub', name: '@ye5840', avatar: Avatar5, href: 'https://github.com/ye5840' },
  { platform: 'WeChat', name: '@**洋', avatar: Avatar6 },
  { platform: 'WeChat', name: '@*梦' },
  { platform: 'Alipay', name: '@**山' }
]
</script>

## 赞助

<Flex vertical gap="large">
  <ClientOnly>
    <TextScroll
      v-if="!isMobile"
      class="sponsor-slogan-scroll"
      :items="sloganItem"
      single
      :gap="12"
      :item-style="sloganItemStyle"
      pause-on-mouse-enter
    />
    <Card v-else class="sponsor-card" :body-style="sloganBodyStyle">
      {{ sloganItem.title }}
    </Card>
    <Segmented
      v-if="isMobile"
      v-model:value="sponsorType"
      size="large"
      block
      :options="sponsorOptions"
    >
      <template #label="{ label, payload }">
        <span class="segmented-label" :style="{ color: payload.color }">
          <component :is="payload.icon" />
          {{ label }}
        </span>
      </template>
    </Segmented>
    <Card class="sponsor-card" :size="cardSize">
      <div class="qrcode-list">
        <div class="qrcode-item" v-for="platform in visiblePlatforms" :key="platform.name">
          <Tag v-if="!isMobile" class="qrcode-tag" :color="platform.color" size="large" :bordered="false">
            <template #icon>
              <component :is="platform.icon" />
            </template>
            {{ platform.name }}
          </Tag>
          <Image
            :src="platform.src"
            :width="qrcodeSize"
            :height="qrcodeSize"
            :name="platform.codeName"
            :bordered="false"
          />
        </div>
      </div>
    </Card>
  </ClientOnly>
  <Alert type="info" :bordered="false" show-icon>
    <template #icon>
      <HeartFilled class="tips-icon" />
    </template>
    <GradientText :size="24" :weight="700" :gradient="tipsGradient">
      Vue Amazing UI to YOU：
    </GradientText>
    <template #description>
      <ul class="tips-list">
        <li>感谢每一位使用者、Issue 提交者与赞助者。</li>
        <li>你们的支持是这个项目继续迭代的理由。</li>
        <li>生命不息，迭代不止！</li>
      </ul>
    </template>
  </Alert>
</Flex>

## 赞助者 🫡

所有赞助者都将展示在这里，非常感谢你们的支持与赞助 ❤️❤️

*名单排名不分先后，想出现在这里或希望匿名，把信息发到右下角邮箱即可*

<Space class="sponsor-wall">
  <Tooltip v-for="sponsor in sponsors" :key="sponsor.name">
    <template #tooltip>
      <div class="sponsor-tooltip">
        {{ sponsor.platform }}
        <br/>
        {{ sponsor.name }}
      </div>
    </template>
    <Avatar
      class="sponsor-avatar"
      :class="{ 'sponsor-avatar-bordered': sponsor.needBorder }"
      :size="36"
      :src="sponsor.avatar"
      :alt="sponsor.name"
      :href="sponsor.href"
      :color="sponsor.needBorder ? '#fff' : undefined"
      target="_blank"
    >
      <template #icon>
        <UserOutlined />
      </template>
    </Avatar>
  </Tooltip>
</Space>

<style scoped lang="less">
// 导语三段的段落间距：文档站全局把 .vp-doc p 的 margin 置 0（global.less），
// 不补回来三段会粘成一整块；:deep 是因为 markdown 生成的 p 不一定带页面 scope 属性
.sponsor-intro {
  :deep(p + p) {
    margin-top: 12px;
  }
}
// 标语与二维码卡片都复用 Card：Card 自身已按主题变量上色（--va-card-bg-color / --va-card-border-color），
// 此处只是刻意去掉底色、让它与页面同色，仅保留描边；页面样式加载在组件库样式之后，单类名即可覆盖
.sponsor-card {
  background: transparent;
  border-color: var(--vp-c-divider);
}
// 桌面端标语滚动组件：背景色与阴影由组件内联样式写死，无对应 API，只能以 !important 跟随主题
.sponsor-slogan-scroll {
  background-color: var(--vp-c-bg) !important;
  box-shadow: 0 0 5px var(--vp-c-divider) !important;
}
.segmented-label {
  font-weight: 500;
}
.qrcode-list {
  display: flex;
  // 桌面端两列必须并排，禁止换行导致上下堆叠
  flex-wrap: nowrap;
  // 两列随卡片宽度均分排布，间距随宽度自适应放大；gap 为间距下限
  justify-content: space-evenly;
  gap: 40px;
}
.qrcode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  gap: 28px;
}
.qrcode-tag {
  height: 36px;
  padding-inline: 12px;
  font-size: 16px;
  font-weight: 500;
}
// 结语：底色与暗色文字颜色交由 Alert 自身的主题变量处理，页面不再覆盖
.tips-icon {
  font-size: 36px;
  color: var(--va-error-color);
}
.tips-list {
  margin: 0;
  padding-left: 20px;
  // 16px：整行放下单条文案，避免 18px 时每行只溢出 1~2 个字
  font-size: 16px;
  font-weight: 500;
  li + li {
    margin-top: 4px;
  }
}
// 赞助者
.sponsor-wall {
  margin-top: 24px;
}
// 悬停只做轻微放大：阴影光晕与相邻头像的间距抢空间（36px 放大 1.1 + 6px 光晕 ≈ 52px，会吃掉 16px 间隙），
// 且一半赞助者没有主页链接，光晕会暗示可点击；过渡只作用于 transform，避免默认的 all 连带过渡描边与背景
.sponsor-avatar {
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.08);
  }
}
.sponsor-avatar-bordered {
  border-color: var(--vp-c-divider);
}
.sponsor-tooltip {
  text-align: center;
}
</style>
