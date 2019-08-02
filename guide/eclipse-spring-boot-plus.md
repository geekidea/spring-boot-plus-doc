---
sidebarDepth: 3
---

# Eclipse导入spring-boot-plus

## 安装lombok插件
::: danger 
！！！请先确保Eclipse已安装lombok插件！！！
:::
### 👉 [下载lombok](https://www.projectlombok.org/downloads/lombok.jar)
### 运行lombok进行安装
- 例如lombok下载到：C:\Users\Admin\Downloads
- Win + R 打开命令行

> 进入到Downloads目录
```bash
cd C:\Users\Admin\Downloads
```

> 执行lombok.jar或者双击
```bash
java -jar lombok.jar
```

### 选择eclipse目录，进行安装
![选择eclipse目录，进行安装](https://spring-boot-plus.gitee.io/docs/eclipse/lombok-install.png)

> 安装成功提示

![安装成功提示](https://spring-boot-plus.gitee.io/docs/eclipse/lombok-install-success.png)

> 查看eclipse目录是否有lombok.jar

![查看eclipse目录是否有lombok.jar](https://spring-boot-plus.gitee.io/docs/eclipse/lombok-eclipse-dir.png)

> 查看eclipse.ini或者SpringToolSuite4.ini中最后一行是有有以下配置
```text
-javaagent:C:\Users\Admin\Downloads\sts-4.3.1.RELEASE\lombok.jar
```

### 重启eclipse，刷新项目，完成
::: tip
- 如果以上步骤都已成功，说明lombok安装成功！
- 重启eclipse！
- 此时项目中的log.info能正常使用
- 如果还是报错，F5刷新以下项目
:::


## Eclipse导入maven项目

> 导入已存在的maven项目

![导入已存在的maven项目](https://spring-boot-plus.gitee.io/docs/eclipse/import-maven.png)

> 选择项目目录

![选择项目目录](https://spring-boot-plus.gitee.io/docs/eclipse/import-maven-1.png)

> eclipse项目目录结构

![eclipse项目目录结构](https://spring-boot-plus.gitee.io/docs/eclipse/project-dir.png)

::: danger
- 导入项目后，先更新maven
- 右键项目--> Maven --> Update Project
- 或者Alt+F5
- 此时会下载依赖，稍等一会...
:::

### 启动项目
::: tip
- 项目没有报错，启动项目
:::

![项目启动入口类](https://spring-boot-plus.gitee.io/docs/eclipse/eclipse-main-class.png)

- 右键Run As --> Spring Boot APP

### Eclipse启动日志

![eclipse启动日志](https://spring-boot-plus.gitee.io/docs/eclipse/eclipse-project-success.png)

::: tip 图中红框出，是项目信息
- projectFinalName：项目名称
- projectVersion：项目版本
- profileActive：当前maven profile激活环境
- 例如`local`，对应配置文件`application-local.yml`配置
- contextPath：项目访问根路径
- port：项目端口
- home：项目主界面，Spring Boot Admin监控界面
- docs：swagger接口界面
:::

### 访问Spring Boot Admin
> 👉 [http://localhost:8888](http://localhost:8888/docs)

- spring-boot-plus主界面，Spring Boot Admin

![Spring Boot Admin](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/springbootadmin/springbootadmin-home.png)

### 访问Swagger
> 👉 [http://localhost:8888/swagger-ui.html](http://localhost:8888/swagger-ui.html)

- Swagger界面

![swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-swagger.png)
 

