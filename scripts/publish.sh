#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

commitMessage=$1

# 读取 package.json 中的 version（用 node 读取，避免引入 jq 依赖）
version=$(node -p "require('./package.json').version")

# 未传入提交描述时使用默认语义化描述（版本号动态拼接），传入则以传入为准
if [ -z "$commitMessage" ]; then
    commitMessage="feat: 发布 $version 版本"
fi
# 版本 tag（提前定义，供前置校验与后续打 tag / 建 release 复用）
tag="v$version"

# ============ 发布前置校验（避免构建完成后才发现发布条件不满足） ============
# 1. 校验 node 已安装（读取版本号、执行构建均依赖）
if ! command -v node >/dev/null 2>&1; then
    echo "❌ 未检测到 node，无法执行发布流程"
    echo "   请先安装 Node.js >= 20.19.0"
    exit 1
fi
echo "✅ node 已安装: $(node -v)"

# 2. 校验 registry 源是否为官方 npm 源（发布必须走官方源）
registry=$(npm config get registry)
if [ "$registry" != "https://registry.npmjs.org/" ] && [ "$registry" != "https://registry.npmjs.org" ]; then
    echo "❌ 当前 npm registry 源为: $registry，非官方源 https://registry.npmjs.org"
    echo "   请先切换: npm config set registry https://registry.npmjs.org/"
    exit 1
fi
echo "✅ registry 源校验通过: $registry"

# 3. 校验 npm 登录态
npm_username=$(npm whoami 2>/dev/null) || {
    echo "❌ npm 未登录，请先执行: npm login"
    exit 1
}
echo "✅ npm 登录校验通过: $npm_username"

# 4. 校验版本号未在 npm 上重复发布
if npm view "vue-amazing-ui@$version" version >/dev/null 2>&1; then
    echo "❌ 版本 $version 已存在于 npm，请先升级 package.json 的 version 字段"
    exit 1
fi
echo "✅ 版本 $version 未发布，校验通过"

# 5. 校验 gh CLI 已安装（后续创建 GitHub Release 依赖）
if ! command -v gh >/dev/null 2>&1; then
    echo "❌ 未检测到 gh CLI，无法自动创建 GitHub Release"
    echo "   请安装: brew install gh"
    exit 1
fi
echo "✅ gh CLI 已安装"

# 6. 校验 gh CLI 已登录（未登录则后续 release 创建会失败）
if ! gh auth status >/dev/null 2>&1; then
    echo "❌ gh CLI 未登录，无法自动创建 GitHub Release"
    echo "   请先执行: gh auth login"
    exit 1
fi
echo "✅ gh CLI 登录态校验通过"
# ============ 校验结束 ============

# 发布前门禁：lint + type-check，失败则中止（早于 build 失败，信息更清晰）
if ! pnpm check; then
    echo "❌ 发布前检查（lint + type-check）未通过，请修复后重试"
    exit 1
fi

# 打包构建
if ! pnpm build; then
    echo "❌ 构建失败，请根据上方报错修复后重试"
    exit 1
fi

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
trap "echo \"⚠️ 发布流程中断：npm 可能已发布 $version，但后续 git 提交/tag/release/文档部署可能未完成，请检查状态并手动补全\"" ERR
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

# 打版本 tag（确保指向最终发布状态的 commit），并推送
# 覆盖边界：本地/远程均无 → 新建；本地有但远程缺 → 补推；本地 tag 指向旧 commit → 中止并提示人工决策
local_tag_commit=""
if git rev-parse -q --verify "refs/tags/$tag" >/dev/null 2>&1; then
    local_tag_commit=$(git rev-parse "refs/tags/$tag")
fi
remote_has_tag=false
if git ls-remote --tags origin "refs/tags/$tag" | grep -q "refs/tags/$tag"; then
    remote_has_tag=true
fi

if [ -z "$local_tag_commit" ]; then
    # 本地无 tag：直接新建并推送
    git tag -a "$tag" -m "release: $version"
    git push origin "$tag"
    echo "✅ 已生成并推送 git tag: $tag"
elif [ "$local_tag_commit" != "$(git rev-parse HEAD)" ]; then
    # 本地 tag 存在但指向旧 commit（版本号复用但代码已变）：异常状态，中止并提示人工决策，避免误覆盖远程 tag
    echo "❌ 本地 git tag $tag 指向 commit $local_tag_commit，与当前 HEAD 不一致"
    echo "   该场景通常意味着版本号复用但代码已更新，请人工确认："
    echo "   1. 确认是否应升级 package.json 的 version 字段后重新发布"
    echo "   2. 或手动处理 tag: git tag -d $tag && git push origin :refs/tags/$tag"
    exit 1
elif [ "$remote_has_tag" = false ]; then
    # 本地 tag 正确但远程缺失：补推
    echo "⚠️ git tag $tag 本地已存在但远程缺失，将推送本地 tag 到远程"
    git push origin "$tag"
    echo "✅ 已推送 git tag: $tag 到远程"
else
    echo "⚠️ git tag $tag 已存在（本地与远程一致），跳过打 tag"
fi

# 自动创建 GitHub Release（与 tag 同名，正文统一引用 CHANGELOG）
# 依赖 gh CLI；gh 安装与登录态已在前置校验区检查，此处仅处理创建逻辑
releaseBody="Please refer to [CHANGELOG.md](https://github.com/themusecatcher/vue-amazing-ui/blob/main/docs/guide/changelog.md) for details."
if gh release view "$tag" >/dev/null 2>&1; then
    echo "⚠️ GitHub Release $tag 已存在，跳过创建"
else
    gh release create "$tag" --title "$tag" --notes "$releaseBody"
    echo "✅ 已创建 GitHub Release: $tag"
fi

# release 已就绪，清除 npm 发布后的中断提示（后续文档部署失败不再提示「npm 已发布」）
trap - ERR

# 重新部署文档（组件库已构建过，跳过重复构建；skipBuild=1 时 commitMessage 用不上，传空占位）
pnpm docs:deploy "" 1
