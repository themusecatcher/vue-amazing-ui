// commitlint.config.js
import { resolve } from 'path'
import { readFileSync } from 'fs'

// 动态获取 package.json 的 type 字段
const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8'))

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert', 'perf']],
    'header-max-length': [0, 'always', 120]
  },
  // ESM 兼容配置
  parserPreset: {
    parserOpts: {
      // 解决 ESM 下的路径问题
      ...(pkg.type === 'module' ? { sourceType: 'module' } : {})
    }
  }
}
