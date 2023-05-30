# /bin/bash
version=`jq -r .version ../package.json` # 读取package.json中的version
pnpm build # 打包构建
cd ../
git add .
git commit -m "update ${version}"
git push # 提交项目代码到github
pnpm publish # 发布到npm，pnpm(高性能的npm)
