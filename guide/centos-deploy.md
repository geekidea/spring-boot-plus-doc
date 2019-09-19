---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: spring,spring boot,springbootplus,spring-boot-plus,springboot.plus,springbootplus官网,spring boot 开源项目,java,后台脚手架
  - name: description
    content: spring-boot-plus是易于使用，快速，高效，功能丰富，开源的spring boot 脚手架。前后端分离,专注于后端服务！ 每个人都可以独立、快速、高效地开发项目！Everyone can develop projects independently, quickly and efficiently！
---

# CentOS发布
> CentOS快速安装环境/构建/部署/启动spring-boot-plus项目

## 1. 下载安装脚本
> 安装 `jdk`, `git`, `maven`, `redis`, `mysql`

```bash
wget -O download-install-all.sh https://raw.githubusercontent.com/geekidea/spring-boot-plus/master/docs/bin/install/download-install-all.sh
```

## 2. 运行安装脚本
```bash
sh download-install-all.sh
```

## 3. 修改MySQL密码
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Springbootplus666!';
exit
mysql -uroot -pSpringbootplus666!
```

## 4. 导入MySQL脚本
```bash
create database if not exists spring_boot_plus character set utf8mb4;
use spring_boot_plus;
source /root/mysql_spring_boot_plus.sql;
show tables;
exit
```

## 5. 下载部署脚本 `deploy.sh`
```bash
wget -O deploy.sh https://raw.githubusercontent.com/geekidea/spring-boot-plus/master/deploy/deploy.sh
```

## 6. 执行脚本
```bash
sh deploy.sh
```

## 7.访问项目
> SpringBootAdmin管理页面

[http://47.105.159.10:8888](http://47.105.159.10:8888)

> spring-boot-plus Swagger文档页面

[http://47.105.159.10:8888/docs](http://47.105.159.10:8888/docs)

## 8. 查看项目运行日志
```bash
tail -f -n 1000 /root/spring-boot-plus-server/logs/spring-boot-plus.log
```
