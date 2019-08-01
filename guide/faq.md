---
sidebarDepth: 3
---

# FAQ

[[toc]]

## 编译错误问题

### log日志编译错误
::: danger log报错
- 编译提示log.info等日志错误
:::

::: tip 解决
- 检查是否安装lombok插件
- [idea安装lombok](https://www.baidu.com/s?ie=utf-8&wd=idea%E5%AE%89%E8%A3%85lombok)
- [eclipse安装lombok](https://www.baidu.com/s?ie=utf-8&wd=eclipse%E5%AE%89%E8%A3%85lombok)
:::


## 运行错误问题

### MySQL错误

```text
2019-07-31 14:16:52.412 ERROR 14724 --- [           main] com.alibaba.druid.pool.DruidDataSource   : init datasource error, url: jdbc:mysql://localhost:3306/spring_boot_plus?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true

com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: Communications link failure

The last packet sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.
```

::: danger 不能连接mysql
com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: Communications link failure
:::

::: tip 解决
- 检查MySQL服务是否启动
- 检查ip地址和端口号
:::

::: danger 未知数据库
com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: Unknown database 'spring_boot_plus'
:::

::: tip 解决
- 检查是否新建spring_boot_plus数据库
- 默认的数据库为spring_boot_plus，可在不同环境的配置文件中更改
- 例如：application-local.yml中的spring.datasource.url中更改数据库名称
:::

### Redis错误
```text
org.springframework.data.redis.connection.PoolException: Could not get a resource from the pool; nested exception is io.lettuce.core.RedisConnectionException: Unable to connect to localhost:6379
```
::: danger 不能连接redis
Unable to connect to localhost:6379
:::

::: tip 解决
- 启动redis服务
- redis默认端口号：6379
- 默认没有设置密码
- 请根据环境情况，进行配置
:::

### Spring Boot Admin不能访问问题
::: danger 你的主机中的软件中止了一个已建立的连接
```text
2019-07-31 16:33:37.205 ERROR 6696 --- [ctor-http-nio-2] o.s.w.s.adapter.HttpWebHandlerAdapter    : [f4aeb71d] Error [java.io.IOException: 你的主机中的软件中止了一个已建立的连接。] for HTTP GET "/applications", but ServerHttpResponse already committed (200 OK)
```
:::

::: tip 解决
> 8888端口：与当前项目端口一致
- yaml配置
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

- properties配置
```properties
spring.boot.admin.client.url=http://localhost:8888
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=ALWAYS
```
:::

## 代码生成器问题

## Swagger问题

### 不能访问swagger页面
::: danger
```json
{"code":404,"data":null,"msg":"你请求的路径不存在","time":"2019-08-01 12:56:27"}
```
:::

::: tip 解决
- 检查WebMvcConfig.java类中是否排除了swagger静态资源
```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("swagger-ui.html")
            .addResourceLocations("classpath:/META-INF/resources/");
    registry.addResourceHandler("/webjars/**")
            .addResourceLocations("classpath:/META-INF/resources/webjars/");
}
```
:::

## 运维部署问题

## Other问题