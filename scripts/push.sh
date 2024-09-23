# /bin/bash

# 确保脚本抛出遇到的错误
set -e

# 提交修改到 github

commitDesc=$1

git add .

if [ -z ${commitDesc} ]; then
  git commit -m 'update'
else
  git commit -m ${commitDesc}
fi

git push

echo ⏰ "$(date '+%Y-%m-%d %H:%M:%S')"
