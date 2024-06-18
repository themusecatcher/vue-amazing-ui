# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 提交修改到 github

commitDescInfo=$1

git add .

if [ -z ${commitDescInfo} ]; then
  git commit -m 'update'
else
  git commit -m ${commitDescInfo}
fi

git push
