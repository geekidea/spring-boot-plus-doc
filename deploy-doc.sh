#!/usr/bin/env sh

git init
git add .
git commit -m 'spring-boot-plus-doc V1.x'
git remote add origin git@github.com:geekidea/spring-boot-plus-doc.git
git push origin master -f

echo "deploy doc success"
