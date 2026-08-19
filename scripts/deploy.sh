#!/bin/bash

# ============================================================
# Vue Amazing UI 文档站部署脚本（GitHub Pages）
# 用法：pnpm docs:deploy "<type>: <描述>"
#   例：pnpm docs:deploy "docs: update guide"
# 效果：构建组件库 → 构建 VitePress 静态站点 → 强推到 gh-pages 分支 → 提交并推送主仓库源码
# 发布地址：https://themusecatcher.github.io/vue-amazing-ui/
# ============================================================

# 确保脚本遇到错误立即退出
set -e

# 将 URL 渲染为终端可点击的超链接（OSC 8 转义序列）
# 支持：iTerm2 / WezTerm / Kitty / Windows Terminal / VS Code 集成的终端
# 不支持的终端自动降级为纯文本
link() {
  printf '\033]8;;%s\033\\%s\033]8;;\033\\' "$1" "$1"
}

commitDesc=$1

# 强制要求传入语义化的提交描述，避免产生无信息量的 commit
if [ -z "$commitDesc" ]; then
  echo "❌ 缺少提交描述。用法: pnpm docs:deploy \"<type>: <描述>\"（如 pnpm docs:deploy \"docs: update guide\"）"
  exit 1
fi

# 重新打包组件库
pnpm build

# 打包生成静态文件
pnpm docs:build

# 进入待发布的 dist/ 目录
cd docs/.vitepress/dist

# GitHub Pages 默认走 Jekyll，加 .nojekyll 跳过（保留下划线开头的资源目录）
touch .nojekyll

# 提交打包静态网站到 gh-pages 分支
git init
git branch -M main
git add .
git commit -m 'docs: deploy site'

# 部署到 https://themusecatcher.github.io/vue-amazing-ui/
git push -f git@github.com:themusecatcher/vue-amazing-ui.git main:gh-pages

# 回到仓库根，清理临时 git 仓库，避免嵌套 .git 干扰主仓库
rm -rf .git
cd ../../../

# 提交所有源码到 github
git add .
git commit -m "$commitDesc"
git push

printf '✅ 部署完成：%s\n' "$(link 'https://themusecatcher.github.io/vue-amazing-ui/')"
echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
