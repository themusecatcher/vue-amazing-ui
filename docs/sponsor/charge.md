# ✨ 成为赞助者

<GlobalElement hide-sponsor />

`Vue Amazing UI` 是采用 `MIT` 许可的开源项目，使用完全免费。组件库与文档的全部工作均由作者一人独立完成，开发迭代实属不易。为了项目的健康可持续发展，非常期望能获得您的支持与赞助。

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import type { CSSProperties } from 'vue'
import { HeartFilled, WechatOutlined, AlipayOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useMediaQuery } from 'vue-amazing-ui'
import WeChat from '/wechat.jpg'
import Alipay from '/alipay.jpg'
import Avatar0 from '/avatar.png'
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
  avatar?: string // 头像地址，缺省时展示默认图标
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
// 赞助渠道：标签颜色、图标、收款码集中一处，供移动端切换器与两端二维码渲染复用
const sponsorPlatforms = [
  { name: 'WeChat', color: '#07c160', icon: WechatOutlined, src: WeChat },
  { name: 'Alipay', color: '#1677ff', icon: AlipayOutlined, src: Alipay }
]
const sponsorOptions = sponsorPlatforms.map(item => ({
  label: item.name,
  value: item.name,
  payload: item
}))
const sponsorType = ref('WeChat')
// 无头像的赞助者，统一以默认用户图标占位
const userIcon = () => h(UserOutlined)
const qrcodeSize = computed(() => (isMobile.value ? 200 : 240))
// 移动端单列固定宽度居中 = 二维码 200 + 内边距 24 * 2 + 边框 1 * 2；桌面端拉通全宽
// （box-sizing: border-box 下内边距与边框都从 width 中扣除，需一并计入）
const cardWidth = computed(() => (isMobile.value ? 250 : 'auto'))
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
  { platform: 'GitHub', name: '@themusecatcher', avatar: Avatar0, href: 'https://github.com/themusecatcher' },
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

<TextScroll
  v-if="!isMobile"
  class="sponsor-slogan-scroll"
  :items="sloganItem"
  single
  :gap="12"
  :item-style="sloganItemStyle"
  pause-on-mouse-enter
/>
<div v-else class="sponsor-slogan">
  {{ sloganItem.title }}
</div>

<Segmented
  v-if="isMobile"
  class="sponsor-segmented"
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

<Card class="sponsor-card" :size="cardSize" :width="cardWidth" style="background: transparent;">
  <div class="qrcode-list">
    <div class="qrcode-item" v-for="platform in visiblePlatforms" :key="platform.name">
      <Tag v-if="!isMobile" class="qrcode-tag" :color="platform.color" size="large" :bordered="false">
        <template #icon>
          <component :is="platform.icon" />
        </template>
        {{ platform.name }}
      </Tag>
      <Image :src="platform.src" :width="qrcodeSize" :height="qrcodeSize" :name="platform.name" :bordered="false" />
    </div>
  </div>
</Card>

<Alert class="sponsor-tips" type="info" :bordered="false" show-icon>
  <template #icon>
    <HeartFilled class="tips-icon" />
  </template>
  <GradientText :size="24" :weight="700" :gradient="tipsGradient">
    Vue Amazing UI to YOU：
  </GradientText>
  <template #description>
    <ul class="tips-list">
      <li>您的支持和赞助对我来说至关重要！</li>
      <li>真诚感谢每一位现有的和未来的支持者和赞助者！</li>
      <li>生命不息，迭代不止！未来，我将继续努力！</li>
    </ul>
  </template>
</Alert>

## 赞助者 🫡

所有赞助者都将展示在这里，非常感谢你们的支持与赞助 ❤️❤️

_可自定义展示个人头像、名称以及主页的跳转地址（只需将这些信息发送至右下角邮箱，稍待片刻 😉）_

<Space class="sponsor-wall" gap="middle">
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
      :icon="sponsor.avatar ? undefined : userIcon"
      :href="sponsor.href"
      :color="sponsor.needBorder ? '#fff' : undefined"
      target="_blank"
    />
  </Tooltip>
</Space>

<style scoped lang="less">
// 标语：移动端静态展示；桌面端 TextScroll 的背景色与阴影由组件内联样式写死，无对应 API，只能以 !important 跟随主题
.sponsor-slogan {
  // 与下方 Segmented 拉开距离：Segmented 自带 #f5f5f5 背景，若与本块相邻且同为浅灰会粘成一块
  margin-bottom: 24px;
  padding: 16px;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  text-align: center;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.sponsor-slogan-scroll {
  background-color: var(--vp-c-bg) !important;
  box-shadow: 0 0 5px var(--vp-c-divider) !important;
}
// 二维码
.sponsor-card {
  // 拉通全宽布局，两列二维码由 .qrcode-list 的 space-evenly 均分排布
  margin: 24px auto 40px;
  border-color: var(--vp-c-divider);
}
.sponsor-segmented {
  padding: 4px;
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
// 结语
.sponsor-tips {
  background-color: var(--vp-c-brand-dimm) !important;
}
.tips-icon {
  font-size: 36px;
  color: #cf1322;
}
.tips-list {
  margin: 0;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 500;
  li + li {
    margin-top: 4px;
  }
}
// 赞助者
.sponsor-wall {
  margin-top: 24px;
}
.sponsor-avatar {
  transition: all 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 3px 3px rgba(100, 108, 255, 0.12);
  }
}
.sponsor-avatar-bordered {
  border-color: var(--vp-c-divider);
}
.sponsor-tooltip {
  text-align: center;
}
// 暗色下 Alert 组件自身为浅色底 + 深色文字，此处跟随主题
.dark .sponsor-tips {
  background-color: var(--vp-c-default-soft) !important;
  :deep(.alert-message),
  :deep(.alert-description) {
    color: var(--vp-c-text-1);
  }
}
</style>
