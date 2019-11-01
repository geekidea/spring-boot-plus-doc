#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd site

git init
git add .
git commit -m 'springboot.plus'

git remote add origin git@github.com:springboot-plus/springboot-plus.github.io.git

git push origin master -f

rm -rf .git

echo "deploy website success"

cd ..