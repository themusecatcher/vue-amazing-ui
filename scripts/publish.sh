# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 读取 package.json 中的 version
version=`jq -r .version package.json`

# 打包构建
pnpm build

git add .
git commit -m "update"
git push

# 设置官方源并查看
# pnpm config set registry https://registry.npmjs.org
# pnpm config list

# 发布到 npm，pnpm(高性能的npm)
pnpm publish

# 升级 vue-amazing-ui 依赖版本
pnpm up vue-amazing-ui@$version

# 提交版本更新代码到 github
git add .
git commit -m "update $version"
git push

# 重新部署文档
pnpm docs:deploy
