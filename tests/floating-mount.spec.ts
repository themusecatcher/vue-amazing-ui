import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ConfigProvider from 'components/config-provider'
import Dialog from 'components/dialog'
import Drawer from 'components/drawer'
import Message, { type MessageApi } from 'components/message'
import Modal from 'components/modal'
import Notification, { type NotificationApi } from 'components/notification'
import Popover from 'components/popover'
import Popup from 'components/popup'
import Select from 'components/select'
import Tooltip from 'components/tooltip'
import { FLOATING_MOUNT_ATTR, useZIndex } from 'components/utils'

/**
 * 浮层挂载点契约（同域模型）回归守护
 *
 * 「层叠关系是树」与「出现顺序是兄弟排序」不能编码进同一个 z 值序列（详见 `utils/floating-mount.ts`）：
 * 甲类浮层必须挂进承载层的**内容容器**，本文件锁定四条不变量：
 * - 承载层内：面板挂进承载层内容容器（不再是 body 直挂）；
 * - 隔离性：多个承载层同时打开时各自挂各自的容器，互不越界；
 * - 可退出：显式 `to`（含 `false`）仍按用户意图生效（向后兼容）；
 * - 可见即持有：隐藏的浮层归还槽位，不抬高后续分配点。
 */

/** 等待离场动画结束：v-show + Transition 要等到 leave 完成才落下 display: none */
async function settle(): Promise<void> {
  for (let index = 0; index < 4; index += 1) {
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 10))
  }
}

const OPTIONS = [{ label: '北京', value: 1 }]

let wrapper: ReturnType<typeof mount> | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null
  document
    .querySelectorAll('.select-panel-wrapper, .va-popup-container, #floating-mount-anchor')
    .forEach((el) => el.remove())
})

/** 当前承载层内的下拉面板挂载点（定位参照容器） */
function panelMount(): HTMLElement {
  return document.querySelector<HTMLElement>('.select-panel-wrapper')!
}

/** 当前**可见**下拉面板的挂载点（同一页面同时只会有一个下拉展开） */
function visibleMount(): HTMLElement | undefined {
  return [...document.querySelectorAll<HTMLElement>('.select-panel-wrapper')].find(
    (mount) => mount.querySelector<HTMLElement>('.select-panel-container')?.style.display !== 'none'
  )
}

/** 展开承载层内的下拉面板 */
function openPanel(container: HTMLElement): void {
  container.querySelector<HTMLElement>('.select-content-container')!.click()
}

describe('浮层挂载点（同域模型）', () => {
  it('Modal 内 Select 的下拉挂进弹窗卡片，且卡片带挂载点标记', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () =>
                h(
                  Modal,
                  { open: true, title: '层级' },
                  { default: () => h(Select, { options: OPTIONS, modelValue: 1 }) }
                )
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    const card = document.querySelector<HTMLElement>('.modal-container')!
    expect(card.hasAttribute(FLOATING_MOUNT_ATTR)).toBe(true)

    openPanel(card)
    await settle()
    // 挂进卡片 → 处于承载层层叠上下文内（「子 > 父」由 CSS 保证，不依赖 z 值序列）
    expect(panelMount().parentElement).toBe(card)
  })

  it('Drawer 内 Select 的下拉挂进抽屉容器', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () =>
                h(Drawer, { open: true, to: false }, { default: () => h(Select, { options: OPTIONS, modelValue: 1 }) })
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    const container = document.querySelector<HTMLElement>('.drawer-container')!
    expect(container.hasAttribute(FLOATING_MOUNT_ATTR)).toBe(true)

    openPanel(container)
    await settle()
    expect(panelMount().parentElement).toBe(container)
  })

  it('Dialog 内 Select 的下拉挂进对话框卡片', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () =>
                h(
                  Dialog,
                  { open: true, title: '层级' },
                  { default: () => h(Select, { options: OPTIONS, modelValue: 1 }) }
                )
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    const container = document.querySelector<HTMLElement>('.dialog-container')!
    expect(container.hasAttribute(FLOATING_MOUNT_ATTR)).toBe(true)

    openPanel(container)
    await settle()
    expect(panelMount().parentElement).toBe(container)
  })

  it('嵌套承载层就近取最内层（Drawer ⊃ Modal ⊃ Select）', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 1000 },
            {
              default: () =>
                h(
                  Drawer,
                  { open: true, to: false },
                  {
                    default: () =>
                      h(
                        Modal,
                        { open: true, title: '内层' },
                        { default: () => h(Select, { options: OPTIONS, modelValue: 1 }) }
                      )
                  }
                )
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    const modalCard = document.querySelector<HTMLElement>('.modal-container')!
    const drawerContainer = document.querySelector<HTMLElement>('.drawer-container')!
    expect(modalCard.hasAttribute(FLOATING_MOUNT_ATTR)).toBe(true)
    expect(drawerContainer.hasAttribute(FLOATING_MOUNT_ATTR)).toBe(true)

    openPanel(modalCard)
    await settle()
    // 就近：挂进最内层（Modal 卡片），而不是外层抽屉
    expect(panelMount().parentElement).toBe(modalCard)
    expect(panelMount().closest('.drawer-container')).toBeNull()
  })

  it('Popover 内容里的 Select 挂进 Popover 面板（递归）', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () =>
                h(
                  Popover,
                  { trigger: 'click', title: '容器' },
                  {
                    content: () => h(Select, { options: OPTIONS, modelValue: 1 }),
                    default: () => h('button', 'trigger')
                  }
                )
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    // 打开 Popover（面板即内层 Select 的承载层）
    ;(wrapper.find('button').element as HTMLElement).click()
    await settle()
    const popupPanel = document.querySelector<HTMLElement>(`[${FLOATING_MOUNT_ATTR}].va-popup-panel`)
    expect(popupPanel).not.toBeNull()

    openPanel(popupPanel!)
    await settle()
    expect(panelMount().parentElement).toBe(popupPanel)
  })

  it('两个 Modal 同时打开时，下拉各挂各自的卡片（不互相越界）', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 1000 },
            {
              default: () => [
                h(Modal, { open: true, title: 'A' }, { default: () => h(Select, { options: OPTIONS, modelValue: 1 }) }),
                h(Modal, { open: true, title: 'B' }, { default: () => h(Select, { options: OPTIONS, modelValue: 1 }) })
              ]
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    const cards = [...document.querySelectorAll<HTMLElement>('.modal-container')]
    expect(cards).toHaveLength(2)
    const [cardA, cardB] = cards

    openPanel(cardA)
    await settle()
    expect(visibleMount()?.parentElement).toBe(cardA)

    // 展开第二个：其面板必须落在 B 卡片内（不能复用 / 落进 A 卡片）
    openPanel(cardB)
    await settle()
    expect(visibleMount()?.parentElement).toBe(cardB)
  })

  it('Popup 宿主的 Teleport 目标同样跟随承载层（Modal 内 Tooltip）', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () =>
                h(
                  Modal,
                  { open: true, title: '层级' },
                  {
                    default: () => h(Tooltip, { tooltip: 'hi', show: true }, { default: () => h('button', 'hover') })
                  }
                )
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    const card = document.querySelector<HTMLElement>('.modal-container')!
    expect(document.querySelector<HTMLElement>('.va-popup-container')!.parentElement).toBe(card)
  })

  it('显式 to 仍优先：to="body" 直挂 body、to: false 就地渲染', async () => {
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () =>
                h(
                  Modal,
                  { open: true, title: '层级' },
                  {
                    default: () => [
                      h(Select, { options: OPTIONS, modelValue: 1, to: 'body' }),
                      h(Select, { options: OPTIONS, modelValue: 1, to: false })
                    ]
                  }
                )
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    const card = document.querySelector<HTMLElement>('.modal-container')!
    const triggers = card.querySelectorAll<HTMLElement>('.select-content-container')
    expect(triggers).toHaveLength(2)

    // to="body"：直挂 body（用户可强制逃出承载层）
    triggers[0].click()
    await settle()
    expect(visibleMount()?.parentElement).toBe(document.body)

    // to: false：就地渲染在组件自身 DOM 内（不 Teleport）
    triggers[1].click()
    await settle()
    expect(visibleMount()?.closest('.select-wrap')).not.toBeNull()
  })

  it('承载层关闭后归还槽位（挂载但未打开不占位）', async () => {
    const open = ref(false)
    let probe!: ReturnType<typeof useZIndex>
    const Probe = defineComponent({
      setup() {
        probe = useZIndex(5000)
        return () => h('div')
      }
    })
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () => [
                h(
                  Modal,
                  { open: open.value, title: '层级' },
                  { default: () => h(Select, { options: OPTIONS, modelValue: 1 }) }
                ),
                h(Probe)
              ]
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    // 挂载但未打开：不持有槽位，探针拿到起始层
    expect(probe.zIndex.value).toBe(5000)

    open.value = true
    await settle()
    open.value = false
    await settle()
    // 关闭（离场结束）后归还：再次领取应回落（若未归还则会被已关闭的弹窗抬高）
    probe.allocate()
    expect(probe.zIndex.value).toBe(5000)
  })

  it('隐藏的浮层归还槽位（可见即持有，不抬高后续分配点）', async () => {
    const show = ref(false)
    let probe!: ReturnType<typeof useZIndex>
    const anchor = document.createElement('div')
    anchor.id = 'floating-mount-anchor'
    document.body.appendChild(anchor)

    const Probe = defineComponent({
      setup() {
        probe = useZIndex(5000)
        return () => h('div')
      }
    })
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () => [h(Popup, { anchor, show: show.value }), h(Probe)]
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    // 隐藏态不占槽位：探针拿到起始层
    expect(probe.zIndex.value).toBe(5000)

    show.value = true
    await settle()
    expect(probe.zIndex.value).toBe(5000)

    show.value = false
    await settle()
    // 离开动画结束后归还：再次领取应回落到起始层（若未归还则会继续累加）
    probe.allocate()
    expect(probe.zIndex.value).toBe(5000)
  })

  it('Message / Notification 容器无内容时不占位（有内容才持有、全部关闭即归还）', async () => {
    let messageApi!: MessageApi
    let notificationApi!: NotificationApi
    /** 常驻参照层：挂载即持有起始段，用于观察后续分配点被抬高 / 回落 */
    let anchor!: ReturnType<typeof useZIndex>
    /** 探针层：按需领取，读取「当前最低可用段」 */
    let probe!: ReturnType<typeof useZIndex>
    const Anchor = defineComponent({
      setup() {
        anchor = useZIndex(5000)
        return () => h('div')
      }
    })
    const Probe = defineComponent({
      setup() {
        probe = useZIndex(5000, undefined, { allocateOnMount: false })
        return () => h('div')
      }
    })
    wrapper = mount(
      defineComponent({
        render: () =>
          h(
            ConfigProvider,
            { baseZIndex: 5000 },
            {
              default: () => [
                h(Message, { onReady: (api: MessageApi) => (messageApi = api) }),
                h(Notification, { onReady: (api: NotificationApi) => (notificationApi = api) }),
                h(Anchor),
                h(Probe)
              ]
            }
          )
      }),
      { attachTo: document.body, global: { stubs: { transition: false } } }
    )
    await settle()
    // 容器常驻但没有任何内容：不占槽位 → 探针拿到起始层之后的第一段（若挂载即占位则会被抬高到 5030）
    expect(anchor.zIndex.value).toBe(5000)
    probe.allocate()
    expect(probe.zIndex.value).toBe(5010)

    // 出现一条消息 + 一条通知：各占一段，分配点抬到 5020 / 5030
    messageApi.info({ content: 'hello', duration: null })
    notificationApi.info({ title: 'hi', content: 'hello', duration: null })
    await settle()
    probe.allocate()
    // 分配语义为「落在当前所有已占层之上」：归还 5010 后仍取最大已占段之后的 5040
    expect(probe.zIndex.value).toBe(5040)

    // 全部关闭 → 归还：占用回落到只剩参照层，再分配即回到 5010
    messageApi.destroyAll()
    notificationApi.destroyAll()
    await settle()
    probe.allocate()
    expect(probe.zIndex.value).toBe(5010)
  })
})
