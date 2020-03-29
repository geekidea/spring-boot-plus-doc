---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: spring,spring boot,springbootplus,spring-boot-plus,springboot.plus,springbootplus官网,spring boot 开源项目,java,后台脚手架
  - name: description
    content: spring-boot-plus是易于使用，快速，高效，功能丰富，开源的spring boot 脚手架。前后端分离,专注于后端服务！ 每个人都可以独立、快速、高效地开发项目！Everyone can develop projects independently, quickly and efficiently！
---

# 快速开始

## 1. clone项目到本地

```shell script
git clone https://github.com/geekidea/spring-boot-plus.git
```

## 2. maven构建
> 默认使用local环境,对应配置文件：application-local.yml
```shell script
mvn clean package -Plocal
```

## 3. 新建数据库
> 默认使用MySQL数据库
- 默认数据库名称为：spring_boot_plus
- 导入表结构和数据：

```text
spring-boot-plus/docs/db/mysql_spring_boot_plus.sql
```
👉[Download mysql_spring_boot_plus.sql](https://raw.githubusercontent.com/geekidea/spring-boot-plus/master/docs/db/mysql_spring_boot_plus.sql)

## 4. 启动redis
```bash
redis-server
```

## 5. 检查是否安装lombok插件
> 如遇到log报错，则需要安装lombok插件

#### 👉 [IDEA导入spring-boot-plus](https://springboot.plus/guide/idea-spring-boot-plus.html)
#### 👉 [Eclipse中使用spring-boot-plus](https://springboot.plus/guide/eclipse-spring-boot-plus.html)

## 6. 启动项目
> 项目启动入口类
```text
SpringBootPlusApplication.java
```

## 7. 访问Spring Boot Admin
> 👉 [http://localhost:8888](http://localhost:8888/docs)

- spring-boot-plus主界面，Spring Boot Admin

![Spring Boot Admin](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/springbootadmin/springbootadmin-home.png)

## 8. 访问Swagger
> 👉 [http://localhost:8888/swagger-ui.html](http://localhost:8888/swagger-ui.html)

- Swagger界面

![swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-swagger.png)
 
