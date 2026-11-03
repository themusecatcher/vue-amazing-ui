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

# set -e 会让脚本在任一命令失败时静默退出，末尾的时间戳因此被跳过；
# 用 ERR trap 补齐失败位置与时间戳（主动 exit 1 不触发 ERR，无需在此处理）
print_time() {
  echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
}
trap 'echo "❌ 脚本在第 $LINENO 行执行失败，未部署到 GitHub Pages"; print_time' ERR

commitMessage=$1

# 是否跳过组件库构建（publish.sh 已构建过时传 1，避免重复构建）
skipBuild=${2:-0}

# 强制要求传入语义化的提交描述，避免产生无信息量的 commit
# 被 publish.sh 调用时 (skipBuild=1) 第 3 次 commit 使用固定描述，无需 commitMessage，跳过校验
if [ "$skipBuild" != "1" ] && [ -z "$commitMessage" ]; then
  echo "❌ 缺少提交描述。用法: pnpm docs:deploy \"<type>: <描述>\"（如 pnpm docs:deploy \"docs: update guide\"）"
  exit 1
fi

# 部署目标读主仓库 origin：不硬编码 remote（fork / 改名 / HTTPS 与 SSH 切换后都不必改脚本）。
# 放在构建之前：remote 缺失 / 改名的失败应当秒级暴露，而不是等构建跑完才报错
originUrl=$(git remote get-url origin)

# 重新打包组件库（被 publish.sh 调用时已构建过，可跳过）
if [ "$skipBuild" != "1" ]; then
  pnpm build
fi

# 打包生成静态文件
pnpm docs:build

# 在仓库外的临时目录发布 gh-pages：不在仓库内 `git init`，避免嵌套 .git 在中断时干扰主仓库。
# EXIT trap 同时覆盖成功与失败两条路径，临时目录不会残留
pagesDir=$(mktemp -d)
trap 'rm -rf "$pagesDir"' EXIT
cp -R docs/.vitepress/dist/. "$pagesDir"/
# GitHub Pages 默认走 Jekyll，加 .nojekyll 跳过（保留下划线开头的资源目录）
touch "$pagesDir/.nojekyll"

(
  cd "$pagesDir"
  git init -q
  git branch -M main
  git add .
  git commit -qm 'docs: deploy site'
  # 强制推送覆盖 gh-pages 历史：该分支只承载构建产物，保留历史会无限膨胀
  git push -f "$originUrl" main:gh-pages
)
echo "✅ 静态站点已推送到 gh-pages"

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
print_time
