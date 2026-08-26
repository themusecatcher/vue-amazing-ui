#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

commitMessage=$1

# 强制要求传入语义化的提交描述，避免产生无信息量的 commit
if [ -z "$commitMessage" ]; then
    echo "❌ 缺少提交描述。用法: pnpm pub \"<type>: <描述>\"（如 pnpm pub \"fix: correct InputNumber empty value\"）"
    exit 1
fi

# 读取 package.json 中的 version
version=$(jq -r .version package.json)

# ============ 发布前置校验（避免构建完成后才发现发布条件不满足） ============
# 1. 校验 registry 源是否为官方 npm 源（发布必须走官方源）
registry=$(npm config get registry)
if [ "$registry" != "https://registry.npmjs.org/" ] && [ "$registry" != "https://registry.npmjs.org" ]; then
    echo "❌ 当前 npm registry 源为: $registry，非官方源 https://registry.npmjs.org"
    echo "   请先切换: npm config set registry https://registry.npmjs.org/"
    exit 1
fi
echo "✅ registry 源校验通过: $registry"

# 2. 校验 npm 登录态
npm_username=$(npm whoami 2>/dev/null) || {
    echo "❌ npm 未登录，请先执行: npm login"
    exit 1
}
echo "✅ npm 登录校验通过: $npm_username"

# 3. 校验版本号未在 npm 上重复发布
if npm view "vue-amazing-ui@$version" version >/dev/null 2>&1; then
    echo "❌ 版本 $version 已存在于 npm，请先升级 package.json 的 version 字段"
    exit 1
fi
echo "✅ 版本 $version 未发布，校验通过"
# ============ 校验结束 ============

# 发布前门禁：lint + type-check，失败则中止（早于 build 失败，信息更清晰）
pnpm check

# 打包构建
pnpm build

# 检查是否有待提交的更改
if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "$commitMessage"
    git push
else
    echo "No changes to commit. Skipping git commit and push."
fi

# 发布到 npm
# 发布后若后续步骤失败，提示当前可能处于「npm 已发布但 git 未同步」的状态
trap "echo \"⚠️ 发布流程中断：npm 可能已发布 $version，但后续 git 提交/文档部署未完成，请检查状态并手动补全\"" ERR
npm publish

# 升级 vue-amazing-ui 依赖版本（npm publish 后 registry 存在同步延迟，失败则等待重试）
retry=0
until pnpm up vue-amazing-ui@$version; do
  retry=$((retry + 1))
  if [ $retry -ge 3 ]; then
    echo "❌ pnpm up 重试 3 次仍失败，请稍后手动执行: pnpm up vue-amazing-ui@$version"
    exit 1
  fi
  printf "⏳ registry 可能尚未同步 vue-amazing-ui 版本 %s，10 秒后重试 (%s/3)...\n" "$version" "$retry"
  sleep 10
done

# 提交版本更新代码到 github
git add .
if [ -n "$(git status --porcelain)" ]; then
  git commit -m "chore: update vue-amazing-ui@$version"
else
  echo "No changes to commit. Skipping git commit."
fi
git push

# 重新部署文档（组件库已构建过，跳过重复构建；skipBuild=1 时 commitMessage 用不上，传空占位）
pnpm docs:deploy "" 1
