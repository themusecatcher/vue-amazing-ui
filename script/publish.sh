# /bin/bash
version=`jq -r .version ../package.json`
yarn build
npm publish ../
git add ../
git commit -m "update ${version}"
git push
