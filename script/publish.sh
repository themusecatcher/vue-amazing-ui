# /bin/bash

 # 读取package.json中的version
version=`jq -r .version ../package.json`

 # 打包构建
pnpm build

cd ../

 # 提交带包代码到github
git add .
git commit -m "update $version"
git push

 # 发布到npm，pnpm(高性能的npm)
pnpm publish

# 升级 vue-amazing-ui 依赖版本
pnpm up vue-amazing-ui@$version

# 提交版本更新代码到github
git add .
git cm -m "update $version"
git push
