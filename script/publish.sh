# /bin/bash
version=`jq -r .version ../package.json` # 读取package.json中的version
pnpm build # 打包构建
cd ../

 # 提交项目代码到github
git add .
git commit -m "update $version"
git push

 # 发布到npm，pnpm(高性能的npm)
pnpm publish

# 升级 vue-amazing-ui 依赖版本
pnpm up vue-amazing-ui@$version
