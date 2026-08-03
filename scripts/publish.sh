#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

commitDesc=$1

# 强制要求传入语义化的提交描述，避免产生无信息量的 commit
if [ -z "$commitDesc" ]; then
    echo "❌ 缺少提交描述。用法: pnpm pub \"<type>: <描述>\"（如 pnpm pub \"fix: correct InputNumber empty value\"）"
    exit 1
fi

# 读取 package.json 中的 version
version=$(jq -r .version package.json)

# 发布前门禁：lint + type-check，失败则中止（早于 build 失败，信息更清晰）
pnpm check

# 打包构建
pnpm build

# 检查是否有待提交的更改
if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "$commitDesc"
    git push
else
    echo "No changes to commit. Skipping git commit and push."
fi

# 发布到 npm
npm publish

# 升级 vue-amazing-ui 依赖版本
pnpm up vue-amazing-ui@$version

# 提交版本更新代码到 github
git add .
git commit -m "feat: update $version"
git push

# 重新部署文档
pnpm docs:deploy "$commitDesc"
