# FAQ

[[toc]]

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

## 代码生成器问题

## Swagger问题

## 运维部署问题

## Other问题