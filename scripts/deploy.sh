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

# 将 URL 渲染为带颜色的可点击终端超链接
# OSC 8 携带可点击行为，ANSI 颜色提供视觉样式
# 支持：iTerm2 / WezTerm / Kitty / Windows Terminal / VS Code 集成的终端
# 不支持的终端：OSC 8 降级为纯文本，ANSI 颜色仍生效
link() {
  printf '\033[1;34m\033]8;;%s\033\\%s\033]8;;\033\\\033[0m' "$1" "$1"
}

commitMessage=$1

# 是否跳过组件库构建（publish.sh 已构建过时传 1，避免重复构建）
skipBuild=${2:-0}

# 强制要求传入语义化的提交描述，避免产生无信息量的 commit
# 被 publish.sh 调用时 (skipBuild=1) 第 3 次 commit 使用固定描述，无需 commitMessage，跳过校验
if [ "$skipBuild" != "1" ] && [ -z "$commitMessage" ]; then
  echo "❌ 缺少提交描述。用法: pnpm docs:deploy \"<type>: <描述>\"（如 pnpm docs:deploy \"docs: update guide\"）"
  exit 1
fi

# 重新打包组件库（被 publish.sh 调用时已构建过，可跳过）
if [ "$skipBuild" != "1" ]; then
  pnpm build
fi

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
if [ -n "$(git status --porcelain)" ]; then
  # 被 publish.sh 调用时 (skipBuild=1) 源码已在 publish 中提交过，此处仅提交构建产物变更，用固定描述；
  # 独立使用时提交本次文档源码改动，用传入的 commitMessage
  if [ "$skipBuild" = "1" ]; then
    git commit -m 'docs: deploy site'
  else
    git commit -m "$commitMessage"
  fi
else
  echo "No changes to commit. Skipping git commit."
fi
git push

printf '✅ 部署完成：%s\n' "$(link 'https://themusecatcher.github.io/vue-amazing-ui/')"
echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
