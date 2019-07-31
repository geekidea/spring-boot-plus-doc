# FAQ

[[toc]]

## 运行错误问题

### redis错误
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