# Spring Boot Admin

::: tip spring boot admin 
- Spring Boot Admin用来管理和监控Spring Boot应用程序
- 应用程序向我们的Spring Boot Admin Client注册（通过HTTP）或使用SpringCloud®（例如Eureka，Consul）发现
- UI是Spring Boot Actuator端点上的Vue.js应用程序
- 此项目中，Server和Client在一个项目中
:::

👉 [Spring Boot Admin官方文档](http://codecentric.github.io/spring-boot-admin/current/)


## pom.xml依赖
> spring boot admin版本声明，与spring boot版本保持一致
```xml
<spring-boot-admin.version>2.1.6</spring-boot-admin.version>
```

> 引入spring boot admin server
```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
    <version>${spring-boot-admin.version}</version>
</dependency>
```

> 引入spring boot admin client
```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>${spring-boot-admin.version}</version>
</dependency>
```
## 项目入口类注解配置
> 在入口类上标注@EnableAdminServer注解
```java
@EnableAdminServer
@SpringBootApplication
public class SpringBootPlusApplication {
    ...
}
```
## 配置文件
```yaml
spring:
  boot:
    admin:
      client:
        url: 'http://localhost:8888'

management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: ALWAYS
```
- url：spring boot admin访问路径，与当前项目访问路径一致
- endpoints：spring boot健康检查、监控等，可配合spring boot admin使用

## 访问控制台
[http://localhost:8888](http://localhost:8888)

> Spring Boot Admin主界面

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-home.png)

> Spring Boot Admin Client展示面板

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-wallboard.png)

> Spring Boot Admin 实例面板

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-instance.png)

> Spring Boot Admin Monitor

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-monitor.png)

> Spring Boot Admin 环境面板

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-environment.png)

> Spring Boot Admin Beans面板

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-beans.png)

> Spring Boot Admin 项目属性配置面板

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-config-properties.png)

> Spring Boot Admin Loggers

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-loggers.png)

> Spring Boot Admin 线程面板

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-threads.png)

> Spring Boot Admin Controller映射面板

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-web-mappings.png)

> Spring Boot Admin Http调用链面板

![](https://spring-boot-plus.gitee.io/docs/springbootadmin/springbootadmin-http-traces.png)


