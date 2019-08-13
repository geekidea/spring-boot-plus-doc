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
- [idea安装lombok](https://springboot.plus/guide/idea-spring-boot-plus.html)
- [eclipse安装lombok](https://springboot.plus/guide/eclipse-spring-boot-plus.html)
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

### 端口已被占用

::: danger Caused by: java.net.BindException: Address already in use: bind
```text
Caused by: java.net.BindException: Address already in use: bind
	at sun.nio.ch.Net.bind0(Native Method) ~[na:1.8.0_191]
	at sun.nio.ch.Net.bind(Net.java:433) ~[na:1.8.0_191]
	at sun.nio.ch.Net.bind(Net.java:425) ~[na:1.8.0_191]
	at sun.nio.ch.ServerSocketChannelImpl.bind(ServerSocketChannelImpl.java:223) ~[na:1.8.0_191]
	at sun.nio.ch.ServerSocketAdaptor.bind(ServerSocketAdaptor.java:74) ~[na:1.8.0_191]
```
:::

> 详细错误日志
```text
2019-08-02 23:23:41.350 ERROR 23380 --- [           main] org.apache.catalina.util.LifecycleBase   : Failed to start component [Connector[HTTP/1.1-8888]]

org.apache.catalina.LifecycleException: Protocol handler start failed
	at org.apache.catalina.connector.Connector.startInternal(Connector.java:1008) ~[tomcat-embed-core-9.0.21.jar:9.0.21]
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183) ~[tomcat-embed-core-9.0.21.jar:9.0.21]
	at org.apache.catalina.core.StandardService.addConnector(StandardService.java:227) [tomcat-embed-core-9.0.21.jar:9.0.21]
	at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.addPreviouslyRemovedConnectors(TomcatWebServer.java:263) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.start(TomcatWebServer.java:195) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.startWebServer(ServletWebServerApplicationContext.java:296) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.finishRefresh(ServletWebServerApplicationContext.java:162) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:552) [spring-context-5.1.8.RELEASE.jar:5.1.8.RELEASE]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:140) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:742) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:389) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:311) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1213) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1202) [spring-boot-2.1.6.RELEASE.jar:2.1.6.RELEASE]
	at io.geekidea.springbootplus.SpringBootPlusApplication.main(SpringBootPlusApplication.java:51) [classes/:na]
Caused by: java.net.BindException: Address already in use: bind
	at sun.nio.ch.Net.bind0(Native Method) ~[na:1.8.0_191]
	at sun.nio.ch.Net.bind(Net.java:433) ~[na:1.8.0_191]
	at sun.nio.ch.Net.bind(Net.java:425) ~[na:1.8.0_191]
	at sun.nio.ch.ServerSocketChannelImpl.bind(ServerSocketChannelImpl.java:223) ~[na:1.8.0_191]
	at sun.nio.ch.ServerSocketAdaptor.bind(ServerSocketAdaptor.java:74) ~[na:1.8.0_191]
	at org.apache.tomcat.util.net.NioEndpoint.initServerSocket(NioEndpoint.java:230) ~[tomcat-embed-core-9.0.21.jar:9.0.21]
	at org.apache.tomcat.util.net.NioEndpoint.bind(NioEndpoint.java:213) ~[tomcat-embed-core-9.0.21.jar:9.0.21]
	at org.apache.tomcat.util.net.AbstractEndpoint.bindWithCleanup(AbstractEndpoint.java:1124) ~[tomcat-embed-core-9.0.21.jar:9.0.21]
	at org.apache.tomcat.util.net.AbstractEndpoint.start(AbstractEndpoint.java:1210) ~[tomcat-embed-core-9.0.21.jar:9.0.21]
	at org.apache.coyote.AbstractProtocol.start(AbstractProtocol.java:585) ~[tomcat-embed-core-9.0.21.jar:9.0.21]
	at org.apache.catalina.connector.Connector.startInternal(Connector.java:1005) ~[tomcat-embed-core-9.0.21.jar:9.0.21]
	... 14 common frames omitted

2019-08-02 23:23:41.356  INFO 23380 --- [           main] o.apache.catalina.core.StandardService   : Stopping service [Tomcat]
2019-08-02 23:23:41.362  WARN 23380 --- [           main] o.a.c.loader.WebappClassLoaderBase       : The web application [ROOT] appears to have started a thread named [lettuce-eventExecutorLoop-1-1] but has failed to stop it. This is very likely to create a memory leak. Stack trace of thread:
 sun.misc.Unsafe.park(Native Method)
 java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:215)
 java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2078)
 java.util.concurrent.LinkedBlockingQueue.poll(LinkedBlockingQueue.java:467)
 io.netty.util.concurrent.SingleThreadEventExecutor.takeTask(SingleThreadEventExecutor.java:252)
 io.netty.util.concurrent.DefaultEventExecutor.run(DefaultEventExecutor.java:64)
 io.netty.util.concurrent.SingleThreadEventExecutor$5.run(SingleThreadEventExecutor.java:906)
 io.netty.util.internal.ThreadExecutorMap$2.run(ThreadExecutorMap.java:74)
 io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
 java.lang.Thread.run(Thread.java:748)
2019-08-02 23:23:41.363  WARN 23380 --- [           main] o.a.c.loader.WebappClassLoaderBase       : The web application [ROOT] appears to have started a thread named [Druid-ConnectionPool-Create-1916224178] but has failed to stop it. This is very likely to create a memory leak. Stack trace of thread:
 sun.misc.Unsafe.park(Native Method)
 java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
 java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2039)
 com.alibaba.druid.pool.DruidDataSource$CreateConnectionThread.run(DruidDataSource.java:2672)
2019-08-02 23:23:41.364  WARN 23380 --- [           main] o.a.c.loader.WebappClassLoaderBase       : The web application [ROOT] appears to have started a thread named [Druid-ConnectionPool-Destroy-1916224178] but has failed to stop it. This is very likely to create a memory leak. Stack trace of thread:
 java.lang.Thread.sleep(Native Method)
 com.alibaba.druid.pool.DruidDataSource$DestroyConnectionThread.run(DruidDataSource.java:2768)
2019-08-02 23:23:41.377  INFO 23380 --- [           main] ConditionEvaluationReportLoggingListener : 

Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2019-08-02 23:23:41.383 ERROR 23380 --- [           main] o.s.b.d.LoggingFailureAnalysisReporter   : 

***************************
APPLICATION FAILED TO START
***************************

Description:

The Tomcat connector configured to listen on port 8888 failed to start. The port may already be in use or the connector may be misconfigured.

Action:

Verify the connector's configuration, identify and stop any process that's listening on port 8888, or configure this application to listen on another port.

2019-08-02 23:23:41.410  INFO 23380 --- [           main] o.s.s.c.ThreadPoolTaskScheduler          : Shutting down ExecutorService 'taskScheduler'
2019-08-02 23:23:41.413  INFO 23380 --- [           main] o.s.s.c.ThreadPoolTaskScheduler          : Shutting down ExecutorService
2019-08-02 23:23:41.414  INFO 23380 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Shutting down ExecutorService 'applicationTaskExecutor'
2019-08-02 23:23:41.417  INFO 23380 --- [           main] com.alibaba.druid.pool.DruidDataSource   : {dataSource-1} closing ...
2019-08-02 23:23:41.421  INFO 23380 --- [           main] com.alibaba.druid.pool.DruidDataSource   : {dataSource-1} closed

Process finished with exit code 1

```

::: tip 解决
> 修改端口： `application.local.yml`中的`port`，默认端口`8888`
- 或者kill掉对应端口的进程
- Mac/linux：kill端口
- Windows：找到对应的java程序，结束任务
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

### LocalDateTime日期类使用问题
::: danger 
Caused by: java.sql.SQLFeatureNotSupportedException
:::
```text
Caused by: java.sql.SQLFeatureNotSupportedException
	at com.alibaba.druid.pool.DruidPooledResultSet.getObject(DruidPooledResultSet.java:1771)
	at org.apache.ibatis.type.LocalDateTimeTypeHandler.getNullableResult(LocalDateTimeTypeHandler.java:38)
	at org.apache.ibatis.type.LocalDateTimeTypeHandler.getNullableResult(LocalDateTimeTypeHandler.java:28)
	at org.apache.ibatis.type.BaseTypeHandler.getResult(BaseTypeHandler.java:81)
```

```text
org.springframework.dao.InvalidDataAccessApiUsageException: Error attempting to get column 'create_time' from result set.  Cause: java.sql.SQLFeatureNotSupportedException
; null; nested exception is java.sql.SQLFeatureNotSupportedException

	at org.springframework.jdbc.support.SQLExceptionSubclassTranslator.doTranslate(SQLExceptionSubclassTranslator.java:96)
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:72)
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:81)
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:73)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:446)
	at com.sun.proxy.$Proxy134.selectOne(Unknown Source)
	at org.mybatis.spring.SqlSessionTemplate.selectOne(SqlSessionTemplate.java:166)
	at com.baomidou.mybatisplus.core.override.MybatisMapperMethod.execute(MybatisMapperMethod.java:89)
	at com.baomidou.mybatisplus.core.override.MybatisMapperProxy.invoke(MybatisMapperProxy.java:62)
	at com.sun.proxy.$Proxy139.getSysLogById(Unknown Source)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
```

::: tip
- 问题原因是JDK8的LocalDate、LocalTime、LocalDateTime日期类型，druid数据源尚不支持
- [druid issues](https://github.com/alibaba/druid/issues/3230)
> 目前解决办法

- 1. 更换数据源
- 2. 在mybatis-plus生成代码中配置，将日期类型生成为`DateType.ONLY_DATE`，数据库中的日期类型生成为Date
```java
// 全局配置
GlobalConfig gc = new GlobalConfig();
gc.setDateType(DateType.ONLY_DATE); // 设置日期类型为Date
```
[mybatis-plus dateType配置](https://mybatis.plus/config/generator-config.html#datetype)
:::


## 运维部署问题

### 项目打包后，依赖包丢失

::: danger
- spring-boot-plus.jar只有100多kb
- 此时依赖包未打包到主jar中，检查pom.xml配置
::: 

> spring-boot-plus项目中，pom.xml没有直接继承spring-boot-starter-parent

>而是导入spring-boot-dependencies依赖

> 这样做的好处是，项目可以继承自己的父pom 

::: tip 使用这种方式，进行打包，默认情况下，会导致依赖包丢失，需进行以下配置
```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <mainClass>io.geekidea.springbootplus.SpringBootPlusApplication</mainClass>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
- mainClass：项目启动类
- repackage：重新打包
:::


## Other问题