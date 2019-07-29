# 项目打包

::: tip 项目打包
- spring-boot-plus项目使用maven assembly插件进行打包
- 根据不同环境进行打包部署
- 包含启动、重启命令，配置文件提取到外部config目录
:::

> 打包命令
```shell script
mvn clean package
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

    