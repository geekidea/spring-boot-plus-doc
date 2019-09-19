---
sidebarDepth: 0
title: 
meta:
  - name: keywords
    content: spring,spring boot,springbootplus,spring-boot-plus,springboot.plus,springbootplus官网,spring boot 开源项目,java,后台脚手架
  - name: description
    content: spring-boot-plus是易于使用，快速，高效，功能丰富，开源的spring boot 脚手架。前后端分离,专注于后端服务！ 每个人都可以独立、快速、高效地开发项目！Everyone can develop projects independently, quickly and efficiently！
---

# 项目打包

::: tip 项目打包
- spring-boot-plus项目使用maven assembly插件进行打包
- 根据不同环境进行打包部署
- 包含启动、重启命令，配置文件提取到外部config目录
:::

> 打包命令
```shell script
mvn clean package -Plocal
```

```bash
cd target
```

- 打包后的项目压缩包
```text
spring-boot-plus-1.0.0.RELEASE-local.tar.gz
spring-boot-plus-1.0.0.RELEASE-local.zip
```

- 配置文件位置
```text
spring-boot-plus-1.0.0.RELEASE-local\spring-boot-plus\config
```
- 项目打包后的目录
```text
├─spring-boot-plus-1.0.0.RELEASE-local
│  └─spring-boot-plus
│      ├─bin
│      ├─config
│      ├─lib
│      └─logs
│          └─back
```

- 项目打包后的详细目录和文件
```text
spring-boot-plus-1.0.0.RELEASE-local
    └─spring-boot-plus
        │  CHANGELOG.md
        │  LICENSE
        │  README.md
        │
        ├─bin
        │      restart.sh
        │      shutdown.sh
        │      startup.bat
        │      startup.sh
        │
        ├─config
        │      application-local.yml
        │      application.yml
        │      banner.txt
        │      logback.xml
        │
        ├─lib
        │      spring-boot-plus.jar
        │
        └─logs
            │  spring-boot-plus-startup.log
            │  spring-boot-plus.log
            │
            └─back
                    spring-boot-plus-back.log
```

    