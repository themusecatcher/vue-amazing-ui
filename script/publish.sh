# /bin/bash
version=`jq -r .version ../package.json` # 读取package.json中的version
yarn build # 打包构建
pnpm publish ../ # 发布到npm
git add ../
git commit -m "update ${version}"
git push # 提交项目代码到github
