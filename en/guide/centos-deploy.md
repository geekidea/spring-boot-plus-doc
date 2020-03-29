---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: spring,spring boot,springbootplus,spring-boot-plus,springboot.plus,open source project,java,scaffolding,github
  - name: description
    content: spring-boot-plus is a easy-to-use, high-speed, high-efficient, feature-rich, open source spring boot scaffolding！ Front-end and back-end separation, focusing on back-end services！Everyone can develop projects independently, quickly and efficiently！
---

# CentOS Deploy
> CentOS Quick Installation Environment / Build / Deploy / Launch Spring-boot-plus Project

## 1. Download the installation script
> Install `jdk`, `git`, `maven`, `redis`, `mysql`

```bash
wget -O download-install-all.sh https://raw.githubusercontent.com/geekidea/spring-boot-plus/master/docs/bin/install/download-install-all.sh
```

## 2. Run the installation script
```bash
sh download-install-all.sh
```

## 3. Modify MySQL password
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Springbootplus666!';
exit
mysql -uroot -pSpringbootplus666!
```

## 4. Import MySQL scripts
```bash
create database if not exists spring_boot_plus character set utf8mb4;
use spring_boot_plus;
source /root/mysql_spring_boot_plus.sql;
show tables;
exit
```

## 5. Download deployment script `deploy.sh`
```bash
wget -O deploy.sh https://raw.githubusercontent.com/geekidea/spring-boot-plus/master/deploy/deploy.sh
```

## 6. Execution script
```bash
sh deploy.sh
```

## 7.Access project
> SpringBootAdmin Management page

[http://47.105.159.10/api/](http://47.105.159.10/api/)

> spring-boot-plus Swagger Document page

[http://47.105.159.10/api/docs](http://47.105.159.10/api/docs)

## 8. View project run log
```bash
tail -f -n 1000 /root/spring-boot-plus-server/logs/spring-boot-plus.log
```
