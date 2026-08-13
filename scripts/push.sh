#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 提交修改到 github

commitDesc=$1

# 强制要求传入语义化的提交描述，避免产生无信息量的 commit
if [ -z "$commitDesc" ]; then
  echo "❌ 缺少提交描述。用法: pnpm push \"<type>: <描述>\"（如 pnpm push \"fix: correct InputNumber empty value\"）"
  exit 1
fi

git add .
git commit -m "$commitDesc"
git push

echo ⏰ "$(date '+%Y-%m-%d %H:%M:%S')"
