#/bin/bash
version=`jq -r .version ../package.json` # 或者：cat ../package.json | jq -r .version
yarn type-check
yarn build only
npm publish
git add .
git commit -m "update ${version}"
git push
