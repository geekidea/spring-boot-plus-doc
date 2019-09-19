---
sidebarDepth: 3
title: 
meta:
  - name: keywords
    content: spring,spring boot,springbootplus,spring-boot-plus,springboot.plus,springbootplus官网,spring boot 开源项目,java,后台脚手架
  - name: description
    content: spring-boot-plus是易于使用，快速，高效，功能丰富，开源的spring boot 脚手架。前后端分离,专注于后端服务！ 每个人都可以独立、快速、高效地开发项目！Everyone can develop projects independently, quickly and efficiently！
---


# 详细配置
> 公共配置 application.yml

## Spring Boot配置

### 应用程序配置
```yaml
spring:
  application:
    name: spring-boot-plus
```
- spring.application.name：项目名称

### 项目路径配置
```yaml
server:
  servlet:
    context-path: /api
```
- context-path：项目访问路径

### 项目端口配置
```yaml
server:
  port: 8888
```
- port：本地环境端口

### Tomcat配置
```yaml
server:
  tomcat:
    max-threads: 1000
    min-spare-threads: 30
    uri-encoding: UTF-8
```
- max-threads：tomcat线程池大小设置
- min-spare-threads：tomcat初始化线程数量
- uri-encoding：tomcat编码

### HTTP编码
```yaml
http:
    encoding:
      charset: UTF-8
      enabled: true
      force: true
```

### Jackson日期和时区配置
```yaml
jackson:
    date-format: yyy-MM-dd HH:mm:ss
    time-zone: GMT+8
```

### 当前项目环境配置
```yaml
profiles:
    active: '@profileActive@'
```

### Banner配置
```yaml
spring:
  banner:
    charset: UTF-8
    location: classpath:config/banner.txt
```
- banner.charset：banner字符集
- banner.location：banner文件路径

## 数据库配置
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/spring_boot_plus?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true
    username: root
    password: root
```
- url：数据库连接信息
- username：账号
- password：密码


## DRUID数据源配置
```yaml
datasource:
    driver-class-name: com.mysql.jdbc.Driver
    druid:
      filter:
        slf4j:
          enabled: true
        stat:
          log-slow-sql: true
          merge-sql: true
          slow-sql-millis: 3000
        wall:
          config:
            delete-allow: true
            drop-table-allow: false
          enabled: true
      filters: stat,wall,slf4j
      initial-size: 10
      max-active: 100
      max-pool-prepared-statement-per-connection-size: 20
      max-wait: 60000
      min-evictable-idle-time-millis: 300000
      min-idle: 10
      pool-prepared-statements: true
      stat-view-servlet:
        enabled: true
        login-password: druid123
        login-username: druid
        url-pattern: /druid/*
      test-on-borrow: false
      test-on-return: false
      test-while-idle: true
      time-between-eviction-runs-millis: 60000
      validation-query: SELECT 1 FROM DUAL
    type: com.alibaba.druid.pool.DruidDataSource
```          
- driver-class-name：数据库驱动类名称
- slow-sql-millis：SQL慢查询时间，这里定义为超过3秒及为慢查询，会在打印ERROR日志
- url-pattern：druid登录路径
- login-username：druid登录账号
- login-password：druid登录密码
- druid更多说明和配置： 👉 [https://github.com/alibaba/druid](https://github.com/alibaba/druid)


## Redis公共配置
```yaml
redis:
    jedis:
      pool:
        max-active: 2000
        max-wait: -1ms
        min-idle: 8
        max-idle: 200
    timeout: 10s
    lettuce:
      pool:
        max-active: 200
        max-idle: 8
        max-wait: 10s
        min-idle: 2
      shutdown-timeout: 3s
```
- max-active：最大激活数
- max-wait：最大等待时间，-1ms标识一直等待，可根据实际情况修改
- min-idle：最小存活数
- max-idle: 最小存活数
- timeout：超时时间

### Redis连接配置
```yaml
redis:
    database: 0
    host: localhost
    password:
    port: 6379
```
- database：数据库序号
- host：主机
- password：密码
- port：密码


## Rabbit MQ配置
```yaml
  rabbitmq:
    host: 39.106.37.56
    port: 5672
    username: admin
    password: admin123
    template:
      # 启用重试机制,重试间隔时间为2s,最多重试3次
      retry:
        enabled: true
        initial-interval: 2s
        max-attempts: 3
      queue: spring-boot-plus-queue
      # 定义默认的交换机名称
      exchange: spring-boot-plus-exchange
      # 定义默认的路由key
      routing-key: spring-boot-plus-key
```
- host：rabbitmq server主机
- port：端口
- username：账号
- password：密码
- retry.enabled：启用重试机制
- retry.initial-interval：重试间隔时间
- retry.max-attempts：最多重试次数
- queue：队列名称
- exchange：交换机名称
- routing-key：路由key名称

## Kafka MQ配置
```yaml
kafka:
    bootstrap-servers: 203.104.37.38:9092
    producer:
      retries: 0
      batch-size: 4096
      buffer-memory: 40960
    consumer:
      group-id: spring-boot-plus-group
    template:
      default-topic: spring-boot-plus-topic
```
- bootstrap-servers：server主机和端口
- producer：生产者配置
- consumer：消费者配置
- default-topic：默认主题配置

## Spring-Boot-Plus配置
### JWT配置
```yaml
spring-boot-plus:
  jwt:
    header: token
    secret: 666666
    issuer: spring-boot-plus
    subject: spring-boot-plus-jwt
    audience: web
    expire-minutes: 2
```
- header：请求头中jwt名称
- secret：密码
- issuer：发行人
- subject：主题
- audience：应用场景
- expire-minutes：过期分钟数
- 更多详情：👉 [https://jwt.io/](https://jwt.io/)

### 拦截器路径排除配置
```yaml
interceptor:
    jwt:
      exclude:
        path: /swagger-resources/**,/api-docs/**,/v2/api-docs/**,/login,/verificationCode,/doc/**,/error/**,/docs,/test/**

    permission:
      exclude:
        path: /swagger-resources/**,/api-docs/**,/v2/api-docs/**,/adminLogin,/sysLogin,/login.html,/verificationCode,/doc/**,/error/**,/docs

    token-timeout:
      exclude:
        path: /swagger-resources/**,/api-docs/**,/v2/api-docs/**,/docs
```
- jwt.exclude.path：jwt拦截器排除路径
- permission.exclude.path：权限拦截器排除路径
- token-timeout.exclude.path：token超时拦截器排除路径


### 登录token超时配置
```yaml
springbootplus:
  isEnableAnsi: true
  login:
    token:
      valid:
        time:
          minute: 3600
```
- isEnableAnsi：在控制台日志是否带有颜色，本地开发环境可以设置为true，服务器环境上设置为false
- minute：token超时分钟数


## Mybatis-Plus配置
```yaml
mybatis-plus:
  check-config-location: true
  configuration:
    map-underscore-to-camel-case: true
  global-config:
    db-config:
      field-strategy: not_empty
      id-type: id_worker
      logic-delete-value: 0
      logic-not-delete-value: 1
  mapper-locations: classpath*:mapper/**/*Mapper.xml
```
- check-config-location：检查路径配置
- map-underscore-to-camel-case：下换线自动转驼峰
- id-type：主键生成策略,id_worker使用雪花算法，生成全局唯一有序ID
- mapper-locations：mapper xml 路径
- 更多mybatis-plus配置，请查看 👉 [https://mybatis.plus/config/](https://mybatis.plus/config/)

## Swagger2配置
```yaml
swagger:
  base:
    package: io.geekidea.springbootplus
  contact:
    email: geekidea@qq.com
    name: geekidea
    url: ''
  description: ''
  title: spring-boot-plus
  url: ''
  version: 1.0
```
- package：swagger扫描的包
- email：开发者邮箱
- name：开发者名称
- title：标题
- description：描述
- 更多详情： 👉 [https://swagger.io/](https://swagger.io/)

## Spring Boot Admin 后台监控配置
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
- 更多详情： 👉 [http://codecentric.github.io/spring-boot-admin/2.1.6/](http://codecentric.github.io/spring-boot-admin/2.1.6/)

## 项目自定义属性配置 结合spring boot admin使用
```yaml
info:
  project-groupId: '@project.groupId@'
  project-artifactId: '@project.artifactId@'
  project-name: '@project.name@'
  project-finalName: '@project.build.finalName@'
  project-author: ${swagger.contact.name}
  project-description: '@project.description@'
  project-sourceEncoding: '@project.build.sourceEncoding@'
  project-spring-boot-version: '@spring-boot.version@'
  project-mybatis-plus-version: '@mybatis-plus-boot-starter.version@'
  project-version: '@project.version@'
```
- project-groupId：项目maven组ID
- project-artifactId：项目骨架ID
- project-name：项目名称
- project-finalName：项目打包后的名称
- project-author：项目作者
- project-description：项目描述
- project-sourceEncoding：项目源代码编码
- project-spring-boot-version：spring boot版本
- project-mybatis-plus-version：mybatis-plus版本
- project-version：项目版本


## 不同环境配置文件
> application.yml 公共配置
- 其它环境配置会覆盖公共配置
```text
application-dev.yml     开发环境
application-local.yml   本地环境
application-prod.yml    生成环境
application-test.yml    测试环境
application-uat.yml     用户验收测试
```

## [SpringBoot官方完整配置](https://docs.spring.io/spring-boot/docs/2.1.6.RELEASE/reference/html/common-application-properties.html)
