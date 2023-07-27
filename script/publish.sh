# /bin/bash

# 确保脚本抛出遇到的错误
set -e

pnpm push
# 读取package.json中的version
version=`jq -r .version package.json`

# 打包构建
pnpm build

# 发布到npm，pnpm(高性能的npm)
pnpm publish

# 升级 vue-amazing-ui 依赖版本
pnpm up vue-amazing-ui@$version

# 提交版本更新代码到github
git add .
git cm -m "update $version"
git push
