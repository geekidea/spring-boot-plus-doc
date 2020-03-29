---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: sqlserver,sqlserver使用,spring,spring boot,springbootplus,spring-boot-plus,springboot.plus
  - name: description
    content: spring-boot-plus使用SQLServer数据库配置
---

# spring-boot-plus使用SQLServer配置

## SQLServer初始化脚本
[sqlserver_spring_boot_plus.sql](https://gitee.com/geekidea/spring-boot-plus/blob/dev/docs/db/sqlserver_spring_boot_plus.sql)

## 配置文件修改
### pom.xml添加SQLServer驱动包
```xml
<!-- SQLServer2008 -->
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <version>6.4.0.jre8</version>
</dependency>
```

### 配置文件修改
> application.yml
- 设置SQLServer驱动名称
```yaml
spring:
  datasource:
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
```

- 设置mybatis-plus的主键类型为`auto`
```yaml
mybatis-plus:
  global-config:
    db-config:
      # 全局默认主键类型
      id-type: auto
```

> application-local.yml
- 设置SQLServer数据库连接信息

```yaml
spring:
  datasource:
    url: jdbc:sqlserver://172.20.10.6:1433;database=spring_boot_plus
    username: sa
    password: sqlserver2008
```

## 代码生成器配置

### SpringBootPlusGenerator
> 设置SQLServer数据库连接信息

```java
codeGenerator
        .setUserName("sa")
        .setPassword("sqlserver2008")
        .setDriverName("com.microsoft.sqlserver.jdbc.SQLServerDriver")
        .setDriverUrl("jdbc:sqlserver://172.20.10.6:1433;database=spring_boot_plus");
```

### CodeGenerator
> 设置DbType
- 在generator()方法中配置DataSourceConfig
- 注释 `dsc.setDbQuery(new SpringBootPlusMySqlQuery());`
- 设置DbType为SQLServer
```java
// MySQL
// dsc.setDbQuery(new SpringBootPlusMySqlQuery());

// SQLServer2005/2008
dsc.setDbType(DbType.SQL_SERVER2005);
dsc.setDbQuery(new SpringBootPlusSqlServerQuery());

mpg.setDataSource(dsc);
```

### 生成代码注意事项
```java
// 需要生成的表数组
// xxx,yyy,zzz为需要生成代码的表名称
String[] tables = {
        "foo_bar"
};
```

## 修改MybatisPlusConfig
- 配置DbType为SQLServer

```yaml
@Configuration
public class MybatisPlusConfig {

    /**
     * mybatis-plus分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        // SQLServer2005/2008配置
        paginationInterceptor.setDbType(DbType.SQL_SERVER2005);
        return paginationInterceptor;
    }

    /**
     * mybatios-plus乐观锁插件
     *
     * @return
     */
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }

}
```

## 生成的部分代码
> entity

- `@TableId`对应主键列
- `IdType.AUTO`为主键自增

```java
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "FooBar对象", description = "FooBar")
public class FooBar extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("主键")
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @ApiModelProperty("名称")
    private String name;

    @ApiModelProperty("Foo")
    private String foo;

    @ApiModelProperty("Bar")
    private String bar;

    @ApiModelProperty("备注")
    private String remark;

    @ApiModelProperty("状态，0：禁用，1：启用")
    private Integer state;

    @ApiModelProperty("版本")
    private Integer version;

    @ApiModelProperty("创建时间")
    private Date createTime;

    @ApiModelProperty("修改时间")
    private Date updateTime;

}
```

> xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="io.geekidea.springbootplus.foorbar.mapper.FooBarMapper">

    <!-- 通用查询结果列 -->
    <sql id="Base_Column_List">
        id, name, foo, bar, remark, state, version, create_time, update_time
    </sql>

    <select id="getFooBarById" resultType="io.geekidea.springbootplus.foorbar.vo.FooBarQueryVo">
        select
        <include refid="Base_Column_List"/>
        from foo_bar where id = #{id}
    </select>

    <select id="getFooBarPageList" resultType="io.geekidea.springbootplus.foorbar.vo.FooBarQueryVo">
        select
        <include refid="Base_Column_List"/>
        from foo_bar
    </select>

</mapper>

```

## Swagger CRUD

### 添加数据
- 请求路径：http://127.0.0.1:8888/api/fooBar/add

#### 请求参数

```json
{
  "bar": "添加数据",
  "foo": "test",
  "name": "hello",
  "state": 0
}
```

#### 响应结果

```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": null,
  "time": "2020-03-12 01:05:44"
}
```

#### INSERT SQL语句
```text
==>  Preparing: INSERT INTO foo_bar ( name, foo, bar, state ) VALUES ( ?, ?, ?, ? ) 
==> Parameters: hello(String), test(String), 添加数据(String), 0(Integer)
<==    Updates: 1
```


### 修改数据
- 请求路径：http://127.0.0.1:8888/api/fooBar/update

#### 请求参数

```json
{
  "id": 5,
  "bar": "修改数据",
  "foo": "updaet",
  "name": "hello",
  "state": 1
}
```

#### 响应结果

```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": null,
  "time": "2020-03-12 01:10:01"
}
```

#### UPDATE SQL语句
```text
==>  Preparing: UPDATE foo_bar SET name=?, foo=?, bar=?, state=? WHERE id=? 
==> Parameters: hello(String), updaet(String), 修改数据(String), 1(Integer), 5(Long)
<==    Updates: 1
```


### 根据ID查询
- 请求路径：http://127.0.0.1:8888/api/fooBar/info/5

#### 响应结果

```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": {
    "id": 5,
    "name": "hello",
    "foo": "updaet",
    "bar": "修改数据",
    "remark": null,
    "state": 1,
    "version": 0,
    "createTime": "2020-03-10 16:08:14",
    "updateTime": null
  },
  "time": "2020-03-12 01:14:10"
}
```

#### SELECT SQL语句
```text
==>  Preparing: select id, name, foo, bar, remark, state, version, create_time, update_time from foo_bar where id = ? 
==> Parameters: 5(Long)
<==    Columns: id, name, foo, bar, remark, state, version, create_time, update_time
<==        Row: 5, hello, updaet, 修改数据, null, 1, 0, 2020-03-10 16:08:14.93, null
<==      Total: 1
```

### 分页查询
- 请求路径：http://127.0.0.1:8888/api/fooBar/getPageList

#### 请求参数
```json
{}
```

#### 响应结果

```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": {
    "lastRowLimitValue": null,
    "total": 3,
    "records": [
      {
        "id": 5,
        "name": "hello",
        "foo": "updaet",
        "bar": "修改数据",
        "remark": null,
        "state": 1,
        "version": 0,
        "createTime": "2020-03-10 16:08:14",
        "updateTime": null
      },
      {
        "id": 1,
        "name": "FooBar",
        "foo": "foo",
        "bar": "bar",
        "remark": "remark...",
        "state": 1,
        "version": 0,
        "createTime": "2019-11-01 14:05:14",
        "updateTime": null
      },
      {
        "id": 2,
        "name": "HelloWorld",
        "foo": "hello",
        "bar": "world",
        "remark": null,
        "state": 1,
        "version": 0,
        "createTime": "2019-11-01 14:05:14",
        "updateTime": null
      }
    ]
  },
  "time": "2020-03-12 01:16:00"
}
```

#### 分页查询SQL语句
```text
==>  Preparing: SELECT COUNT(1) FROM foo_bar 
==> Parameters: 
<==    Columns: 
<==        Row: 3
==>  Preparing: WITH selectTemp AS (SELECT TOP 100 PERCENT ROW_NUMBER() OVER (ORDER BY create_time DESC) as __row_number__, id, name, foo, bar, remark, state, version, create_time, update_time FROM foo_bar ORDER BY create_time DESC) SELECT * FROM selectTemp WHERE __row_number__ BETWEEN 1 AND 10 ORDER BY __row_number__ 
==> Parameters: 
<==    Columns: __row_number__, id, name, foo, bar, remark, state, version, create_time, update_time
<==        Row: 1, 5, hello, updaet, 修改数据, null, 1, 0, 2020-03-10 16:08:14.93, null
<==        Row: 2, 1, FooBar, foo, bar, remark..., 1, 0, 2019-11-01 14:05:14.0, null
<==        Row: 3, 2, HelloWorld, hello, world, null, 1, 0, 2019-11-01 14:05:14.0, null
<==      Total: 3
```


### 根据ID删除
- 请求路径：http://127.0.0.1:8888/api/fooBar/delete/5

#### 响应结果
```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": null,
  "time": "2020-03-12 01:20:42"
}
```

#### DELETE SQL语句
```text
==>  Preparing: DELETE FROM foo_bar WHERE id=? 
==> Parameters: 5(Long)
<==    Updates: 1
```


