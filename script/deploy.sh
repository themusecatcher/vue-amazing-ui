# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 打包生成静态文件
pnpm docs:build

# 进入待发布的 dist/ 目录
cd ../docs/.vitepress/dist

# git init
git add .
git commit -m 'deploy'

# 部署到 https://<Username>.github.io/<Repo Name>
git push -f git@github.com:themusecatcher/vue-amazing-ui.git master:github-pages
