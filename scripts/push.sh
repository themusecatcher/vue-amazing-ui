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

# 新建分支在远端还没有同名分支，此时裸 `git push` 会以 128 退出（no upstream branch），
# 脚本被 set -e 中断，改动已提交却推不上去。故先探测 upstream：
# 无 upstream 时用 -u origin HEAD 推送并建立跟踪关系，有 upstream 时维持原有行为
if upstream=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null); then
  echo "🔗 分支 $(git rev-parse --abbrev-ref HEAD) 已跟踪 ${upstream}，直接推送"
  git push
else
  echo "🆕 分支 $(git rev-parse --abbrev-ref HEAD) 尚未关联远端，推送并建立跟踪关系"
  git push --set-upstream origin HEAD
fi

echo "✅ 已推送到远端"
print_time
