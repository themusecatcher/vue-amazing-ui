import { describe, it, expect, vi, afterEach } from 'vitest'
import { log, isDevEnv, resetLogDedup } from 'components/utils'

/**
 * 告警 / 日志统一出口（`components/utils/log.ts`）契约回归
 *
 * 该模块承载四条对外承诺（见 development/component-design.md 的「告警与日志 log」）：
 * 1. 文案结构固定为 `[vue-amazing-ui] {组件名或工具名}: {说明}`，便于使用方在控制台过滤；
 * 2. 环境策略绑定级别 —— `error` 全环境输出（线上可观测），`warn` / `debug` 仅开发期输出；
 * 3. 提醒类（`warn` / `debug`）按「前缀 + 说明」去重，`error` 不去重；
 * 4. 环境判定读 `process.env.NODE_ENV`（由使用方打包工具替换），生产环境必须静默提醒类告警。
 */
describe('log 统一告警出口', () => {
  const originalNodeEnv = process.env.NODE_ENV

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv
    // 去重集合是模块级状态，必须逐例清空，否则后续用例拿不到输出
    resetLogDedup()
    vi.restoreAllMocks()
  })

  it('warn：文案结构固定为 [vue-amazing-ui] {名称}: {说明}', () => {
    process.env.NODE_ENV = 'development'
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    log('warn', 'ColorPicker', '色板中的颜色 #12345 无效，已忽略该色板')

    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith('[vue-amazing-ui] ColorPicker: 色板中的颜色 #12345 无效，已忽略该色板')
  })

  it('warn / debug：生产环境静默', () => {
    process.env.NODE_ENV = 'production'
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})

    log('warn', 'ColorPicker', '不该出现')
    log('debug', 'position', '不该出现')

    expect(warnSpy).not.toHaveBeenCalled()
    expect(debugSpy).not.toHaveBeenCalled()
  })

  it('error：生产环境仍输出（运行时失败线上可观测）', () => {
    process.env.NODE_ENV = 'production'
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const cause = new Error('boom')

    log('error', 'Dialog', 'onOk 执行出错', cause)

    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(errorSpy).toHaveBeenCalledWith('[vue-amazing-ui] Dialog: onOk 执行出错', cause)
  })

  it('debug：开发环境输出并透传错误对象', () => {
    process.env.NODE_ENV = 'development'
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    const cause = new TypeError('measure failed')

    log('debug', 'position', '浮层精确尺寸测量失败，跳过位移取整', cause)

    expect(debugSpy).toHaveBeenCalledWith('[vue-amazing-ui] position: 浮层精确尺寸测量失败，跳过位移取整', cause)
  })

  it('未传错误对象时只输出一个参数（不打印 undefined 尾巴）', () => {
    process.env.NODE_ENV = 'development'
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    log('error', 'Upload', '文件读取失败')

    expect(errorSpy.mock.calls[0]).toHaveLength(1)
  })

  it('warn / debug：同一条提醒只输出一次（渲染路径重复触发不刷屏）', () => {
    process.env.NODE_ENV = 'development'
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    log('warn', 'Descriptions', '同一行 span 之和超过 column，已自动收缩为剩余列数')
    log('warn', 'Descriptions', '同一行 span 之和超过 column，已自动收缩为剩余列数')
    log('warn', 'Descriptions', '同一行 span 之和超过 column，已自动收缩为剩余列数')

    expect(warnSpy).toHaveBeenCalledTimes(1)
    // 不同组件 / 不同说明各自独立计数
    log('warn', 'Slider', '显示刻度前请先设置 marks 属性')
    log('warn', 'Descriptions', '仅支持 DescriptionsItem 作为子节点，其余节点已被忽略')
    expect(warnSpy).toHaveBeenCalledTimes(3)
  })

  it('error：不去重（故障每次都要可见）', () => {
    process.env.NODE_ENV = 'production'
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    log('error', 'QRCode', '二维码编码失败', new Error('too long'))
    log('error', 'QRCode', '二维码编码失败', new Error('too long'))

    expect(errorSpy).toHaveBeenCalledTimes(2)
  })

  it('resetLogDedup：清空后同一条提醒可再次输出', () => {
    process.env.NODE_ENV = 'development'
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    log('warn', 'BackTop', '未找到容器元素，滚动监听未启用')
    expect(warnSpy).toHaveBeenCalledTimes(1)

    resetLogDedup()
    log('warn', 'BackTop', '未找到容器元素，滚动监听未启用')
    expect(warnSpy).toHaveBeenCalledTimes(2)
  })

  it('非生产环境（含 test）视为开发环境', () => {
    process.env.NODE_ENV = 'test'
    expect(isDevEnv()).toBe(true)
    process.env.NODE_ENV = 'production'
    expect(isDevEnv()).toBe(false)
  })
})
