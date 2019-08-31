# 配置文件

#### 配置文件说明
::: tip 配置说明
项目中配置文件主要使用yml格式

配置文件位置：spring-boot-plus\src\main\resources\config

spring boot 配置分为公共配置：application.yml文件
:::

> 项目中各个环境配置文件
```text
application-dev.yml     开发环境
application-local.yml   本地环境
application-prod.yml    生产环境
application-test.yml    测试环境
application-uat.yml     用户验收测试
```

根据项目实际情况进行配置

> 配置文件与maven环境一一对应，对应的pom.xml文件

```xml
<!--MAVEN打包选择运行环境-->
<!-- 1:local(默认) 本地 2:dev:开发环境 3:test 4:uat 用户验收测试 5.prod:生产环境 -->
<profiles>
    <profile>
        <id>local</id>
        <properties>
            <profileActive>local</profileActive>
        </properties>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>
    <profile>
        <id>dev</id>
        <properties>
            <profileActive>dev</profileActive>
        </properties>
        <activation>
            <activeByDefault>false</activeByDefault>
        </activation>
    </profile>
    <profile>
        <id>test</id>
        <properties>
            <profileActive>test</profileActive>
        </properties>
        <activation>
            <activeByDefault>false</activeByDefault>
        </activation>
    </profile>
    <profile>
        <id>uat</id>
        <properties>
            <profileActive>uat</profileActive>
        </properties>
        <activation>
            <activeByDefault>false</activeByDefault>
        </activation>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <profileActive>prod</profileActive>
        </properties>
        <activation>
            <activeByDefault>false</activeByDefault>
        </activation>
    </profile>
</profiles>
```

> IDEA MAVEN面板展示

![idea-maven](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/idea-maven.png)
