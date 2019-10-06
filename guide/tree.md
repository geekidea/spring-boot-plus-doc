---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: spring,spring boot,springbootplus,spring-boot-plus,springboot.plus,springbootplus官网,spring boot 开源项目,java,后台脚手架
  - name: description
    content: spring-boot-plus是易于使用，快速，高效，功能丰富，开源的spring boot 脚手架。前后端分离,专注于后端服务！ 每个人都可以独立、快速、高效地开发项目！Everyone can develop projects independently, quickly and efficiently！
---

# 目录结构
        
::: tip 目录结构
- bin：启动/重启命令脚本目录
- logs：部署后记录日志目录
- assembly：maven打包配置文件目录
- java：源代码目录
- resources：资源文件目录
- config：项目配置文件目录
- mapper：mybatis xml映射文件目录
- test：测试目录
- test/resources：代码生成模板目录
:::

```text
├── deploy
├── docs
│   ├── bin
│   │   └── install
│   ├── config
│   ├── db
│   └── img
├── logs
└── src
    ├── bin
    ├── logs
    │   └── back
    ├── main
    │   ├── assembly
    │   ├── java
    │   │   └── io
    │   │       └── geekidea
    │   │           └── springbootplus
    │   │               ├── common
    │   │               │   ├── aop
    │   │               │   ├── api
    │   │               │   ├── constant
    │   │               │   ├── constraints
    │   │               │   ├── entity
    │   │               │   ├── enums
    │   │               │   ├── exception
    │   │               │   ├── service
    │   │               │   │   └── impl
    │   │               │   └── web
    │   │               │       ├── controller
    │   │               │       ├── filter
    │   │               │       ├── interceptor
    │   │               │       ├── param
    │   │               │       └── vo
    │   │               ├── config
    │   │               │   ├── converter
    │   │               │   └── json
    │   │               │       ├── fastjson
    │   │               │       └── jackson
    │   │               │           ├── deserializer
    │   │               │           └── serializer
    │   │               ├── core
    │   │               ├── resource
    │   │               │   └── web
    │   │               │       ├── controller
    │   │               │       └── interceptor
    │   │               ├── shiro
    │   │               │   ├── cache
    │   │               │   │   └── impl
    │   │               │   ├── config
    │   │               │   ├── controller
    │   │               │   ├── convert
    │   │               │   ├── exception
    │   │               │   ├── jwt
    │   │               │   ├── param
    │   │               │   ├── service
    │   │               │   │   └── impl
    │   │               │   ├── util
    │   │               │   └── vo
    │   │               ├── system
    │   │               │   ├── convert
    │   │               │   ├── entity
    │   │               │   ├── mapper
    │   │               │   ├── service
    │   │               │   │   └── impl
    │   │               │   └── web
    │   │               │       ├── controller
    │   │               │       ├── param
    │   │               │       └── vo
    │   │               └── util
    │   └── resources
    │       ├── config
    │       ├── mapper
    │       │   └── system
    │       ├── static
    │       └── templates
    └── test
        ├── java
        │   └── io
        │       └── geekidea
        │           └── springbootplus
        │               └── test
        └── resources
            └── templates
```

### 项目包和类文档：[http://geekidea.io/spring-boot-plus-apidocs/](http://geekidea.io/spring-boot-plus-apidocs/)