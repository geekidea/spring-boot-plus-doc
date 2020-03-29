---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: oracle,oracle使用,spring,spring boot,springbootplus,spring-boot-plus,springboot.plus
  - name: description
    content: spring-boot-plus使用Oracle数据库配置
---

# spring-boot-plus使用Oracle配置

## Oracle初始化脚本
[oracle_spring_boot_plus.sql](https://gitee.com/geekidea/spring-boot-plus/blob/dev/docs/db/oracle_spring_boot_plus.sql)

## 配置文件修改
### pom.xml添加Oracle驱动包
```xml
<!-- Oracle11G -->
<dependency>
    <groupId>com.oracle</groupId>
    <artifactId>ojdbc6</artifactId>
    <version>11.2.0.3</version>
</dependency>
```

### 配置文件修改
> application.yml
- 设置Oracle驱动名称
```yaml
spring:
  datasource:
    driver-class-name: oracle.jdbc.driver.OracleDriver
```

- 设置mybatis-plus的主键类型为`input`
```yaml
mybatis-plus:
  global-config:
    db-config:
      # 全局默认主键类型
      id-type: input
```

> application-local.yml
- 设置Oracle数据库连接信息

```yaml
spring:
  datasource:
    url: jdbc:oracle:thin:@localhost:1521:orcl
    username: spring_boot_plus
    password: Oracle11g
```

## 代码生成器配置

### SpringBootPlusGenerator
> 设置Oracle数据库连接信息

```java
codeGenerator
        .setUserName("spring_boot_plus")
        .setPassword("Oracle11g")
        .setDriverName("oracle.jdbc.driver.OracleDriver")
        .setDriverUrl("jdbc:oracle:thin:@localhost:1521:orcl");
```

### CodeGenerator
> 设置DbType
- 在generator()方法中配置DataSourceConfig
- 注释 `dsc.setDbQuery(new SpringBootPlusMySqlQuery());`
- 设置DbType为Oracle
- 设置SchemaName名称
```java
// MySQL
// dsc.setDbQuery(new SpringBootPlusMySqlQuery());

// Oracle11G
dsc.setDbType(DbType.ORACLE);
dsc.setSchemaName("SPRING_BOOT_PLUS");

mpg.setDataSource(dsc);
```

### 生成代码注意事项
> 表名大写，对应数据库名称

```java
// 需要生成的表数组
// xxx,yyy,zzz为需要生成代码的表名称
String[] tables = {
        "FOO_BAR"
};
```

> SchemaName大写，对应数据库名称

```java
dsc.setSchemaName("SPRING_BOOT_PLUS");
```

## 修改MybatisPlusConfig
- 配置Oracle主键生成器
- 配置DbType为Oracle

```yaml
@Configuration
public class MybatisPlusConfig {
    /**
     * Oracle自增主键配置
     *
     * @return
     */
    @Bean
    public OracleKeyGenerator oracleKeyGenerator() {
        return new OracleKeyGenerator();
    }

    /**
     * mybatis-plus分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        // Oracle11G
        paginationInterceptor.setDbType(DbType.ORACLE);
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

- TableName对应数据库表名称
- TableField对应数据库表的字段名称
- 添加 `@KeySequence` 注解，设置序列名称
- 设置注解类型为 `IdType.INPUT`

```java
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@TableName("FOO_BAR")
@KeySequence(value = "FOO_BAR_SEQUENCE")
@ApiModel(value = "FooBar对象", description = "FooBar")
public class FooBar extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("主键")
    @TableId(value = "ID", type = IdType.INPUT)
    private Long id;

    @ApiModelProperty("名称")
    @TableField("NAME")
    private String name;

    @ApiModelProperty("Foo")
    @TableField("FOO")
    private String foo;

    @ApiModelProperty("Bar")
    @TableField("BAR")
    private String bar;

    @ApiModelProperty("备注")
    @TableField("REMARK")
    private String remark;

    @ApiModelProperty("状态，0：禁用，1：启用")
    @TableField("STATE")
    private Long state;

    @ApiModelProperty("版本")
    @TableField("VERSION")
    private Long version;

    @ApiModelProperty("创建时间")
    @TableField("CREATE_TIME")
    private Date createTime;

    @ApiModelProperty("修改时间")
    @TableField("UPDATE_TIME")
    private Date updateTime;

}
```

> xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="io.geekidea.springbootplus.mapper.FooBarMapper">

    <!-- 通用查询结果列 -->
    <sql id="Base_Column_List">
        ID, NAME, FOO, BAR, REMARK, STATE, VERSION, CREATE_TIME, UPDATE_TIME
    </sql>

    <select id="getFooBarById" resultType="io.geekidea.springbootplus.vo.FooBarQueryVo">
        select
        <include refid="Base_Column_List"/>
        from FOO_BAR where id = #{id}
    </select>

    <select id="getFooBarPageList" resultType="io.geekidea.springbootplus.vo.FooBarQueryVo">
        select
        <include refid="Base_Column_List"/>
        from FOO_BAR
    </select>

</mapper>

```

## 分页查询SQL
> 列表查询

```sql
==>  Preparing: SELECT * FROM ( SELECT TMP.*, ROWNUM ROW_ID FROM ( SELECT ID, NAME, FOO, BAR, REMARK, STATE, VERSION, CREATE_TIME, UPDATE_TIME FROM FOO_BAR ORDER BY create_time DESC ) TMP WHERE ROWNUM <=?) WHERE ROW_ID > ? 
==> Parameters: 10(Long), 0(Long)
<==    Columns: ID, NAME, FOO, BAR, REMARK, STATE, VERSION, CREATE_TIME, UPDATE_TIME, ROW_ID
<==        Row: 1, 2, 3, 4, 5, 1, 0, 2020-03-10 02:02:57, null, 1
<==      Total: 1
```

> count查询

```sql
==>  Preparing: SELECT COUNT(1) FROM FOO_BAR 
==> Parameters: 
<==    Columns: COUNT(1)
<==        Row: 1
```

## Swagger请求响应
### 分页列表
- 请求路径：http://127.0.0.1:8888/api/fooBar/getPageList
> 请求参数

```json
{}
```

> 响应结果

```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": {
    "lastRowLimitValue": null,
    "total": 1,
    "records": [
      {
        "id": 1,
        "name": "2",
        "foo": "3",
        "bar": "4",
        "remark": "5",
        "state": 1,
        "version": 0,
        "createTime": "2020-03-10 02:02:57",
        "updateTime": null
      }
    ]
  },
  "time": "2020-03-10 10:34:24"
}
```

### 保存
- 请求路径：http://127.0.0.1:8888/api/fooBar/add
> 请求参数

```json
{
  "bar": "hello",
  "foo": "world",
  "name": "测试数据",
  "remark": "备注...",
  "state": 1
}
```

> 获取序列的值作为主键，需要为每张表建立对应的序列

```sql
==>  Preparing: SELECT FOO_BAR_SEQUENCE.NEXTVAL FROM DUAL 
==> Parameters: 
<==    Columns: NEXTVAL
<==        Row: 3
<==      Total: 1
==>  Preparing: INSERT INTO FOO_BAR ( ID, NAME, FOO, BAR, REMARK, STATE ) VALUES ( ?, ?, ?, ?, ?, ? ) 
==> Parameters: 3(Long), 测试数据(String), world(String), hello(String), 备注...(String), 1(Long)
<==    Updates: 1

```

> 响应结果

```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": null,
  "time": "2020-03-10 10:49:09"
}
```
