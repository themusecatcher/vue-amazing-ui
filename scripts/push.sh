#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 提交修改到 github

commitMessage=$1

# set -e 会让脚本在任一命令失败时静默退出，末尾的时间戳因此被跳过；
# 用 ERR trap 补齐失败位置与时间戳（主动 exit 1 不触发 ERR，无需在此处理）
print_time() {
  echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
}
trap 'echo "❌ 脚本在第 $LINENO 行执行失败，未推送到远端"; print_time' ERR

# 强制要求传入语义化的提交描述，避免产生无信息量的 commit
if [ -z "$commitMessage" ]; then
  echo "❌ 缺少提交描述。用法: pnpm push \"<type>: <描述>\"（如 pnpm push \"fix: correct InputNumber empty value\"）"
  exit 1
fi

git add .
git commit -m "$commitMessage"
git push

echo "✅ 已推送到远端"
print_time
