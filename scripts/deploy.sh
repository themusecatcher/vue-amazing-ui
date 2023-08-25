# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 重新打包组件库
pnpm build

# 打包生成静态文件
pnpm docs:build

# 进入待发布的 dist/ 目录
cd docs/.vitepress/dist

# 提交打包静态网站到 github-pages 分支
git init
git add .
git commit -m 'deploy'

# 部署到 https://<username>.github.io/<repo>
git push -f git@github.com:themusecatcher/vue-amazing-ui.git master:github-pages

# 提交所有代码到github
cd ../../../
git add .
git cm -m 'update'
git push
