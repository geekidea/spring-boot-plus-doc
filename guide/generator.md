# 代码生成 Generator

::: tip 代码生成内容
spring-boot-plus在mybatis-plus基础上，新增param/vo等模板

拓展controller/service/mapper/xml，生成通用CRUD/分页方法

代码生成模板：spring-boot-plus/src/test/resources/templates
:::

## Purpose
> 数据库新建表，即可生成后台CRUD/分页基础代码，还有swagger！

##### 官网地址：[springboot.plus](http://springboot.plus "springboot.plus")
##### GITHUB：[https://github.com/geekidea/spring-boot-plus](https://github.com/geekidea/spring-boot-plus "spring-boot-plus github")
##### GITEE：[https://gitee.com/geekidea/spring-boot-plus](https://gitee.com/geekidea/spring-boot-plus "spring-boot-plus gitee")

```text
                 _                    _                 _                _
                (_)                  | |               | |              | |
  ___ _ __  _ __ _ _ __   __ _ ______| |__   ___   ___ | |_ ______ _ __ | |_   _ ___
 / __| '_ \| '__| | '_ \ / _` |______| '_ \ / _ \ / _ \| __|______| '_ \| | | | / __|
 \__ \ |_) | |  | | | | | (_| |      | |_) | (_) | (_) | |_       | |_) | | |_| \__ \
 |___/ .__/|_|  |_|_| |_|\__, |      |_.__/ \___/ \___/ \__|      | .__/|_|\__,_|___/
     | |                  __/ |                                   | |
     |_|                 |___/                                    |_|

      :: Spring Boot ::             (v2.1.6.RELEASE)
      :: Spring Boot Plus ::        (v1.0.0.RELEASE)
```

### 代码生成步骤

1. 创建数据库表，例如：sys_log
> 注意：记得加上表注释，字段列注释，方便生成类注释、swagger注释
```sql
-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log`  (
  `log_id` bigint(18) NOT NULL COMMENT '主键',
  `type` tinyint(1) NULL DEFAULT NULL COMMENT '类型',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '内容',
  `create_id` bigint(18) NULL DEFAULT NULL COMMENT '创建人ID',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统日志' ROW_FORMAT = Dynamic;
```

2. 代码生成配置
```text
spring-boot-plus/src/test/java/io/geekidea/springbootplus/test/CodeGenerator.java
```
![代码生成器位置](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/generator-config-location.png)


> 2.1 修改数据库连接配置
```java
private static final String USER_NAME = "root";
private static final String PASSWORD = "rootroot";
private static final String DRIVER_NAME = "com.mysql.jdbc.Driver";
private static final String DRIVER_URL = "jdbc:mysql://localhost:3306/spring_boot_plus?useUnicode=true&characterEncoding=UTF-8&useSSL=false";
```
> 2.2 修改模块、表、作者等配置
```java
// ############################ 配置部分 start ############################
// 模块名称
private static final String MODULE_NAME = "system";
// 作者
private static final String AUTHOR = "geekidea";
// 生成的表名称
private static final String TABLE_NAME = "sys_log";
// 主键数据库列名称
private static final String PK_ID_COLUMN_NAME = "id";
// ############################ 配置部分 end ############################
```
- MODULE_NAME 模块名称，在目前项目上以单独的文件夹形式体现
- AUTHOR 作者名称，在类的注释上体现
- TABLE_NAME 表名称，当前需要生成的表名称，关联实体类等
- PK_ID_COLUMN_NAME 主键列名称，默认是id，如果是其它名称，可在这里配置

3. 运行CodeGenerator.java
> 3.1 控制台输出生成日志
```text
11:33:43.442 [main] DEBUG com.baomidou.mybatisplus.generator.AutoGenerator - ==========================准备生成文件...==========================
11:33:44.167 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录： [E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\entity]
11:33:44.169 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录： [E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\web\controller]
11:33:44.170 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录： [E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\service]
11:33:44.170 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录： [E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\mapper]
11:33:44.171 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 创建目录： [E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\service\impl]
...
11:33:44.294 [main] DEBUG org.apache.velocity - ResourceManager : found /templates/mapper.xml.vm with loader org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
11:33:44.308 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/mapper.xml.vm;  文件:E:\github\spring-boot-plus/src/main/resources/mapper/system/SysLogMapper.xml
11:33:44.313 [main] DEBUG org.apache.velocity - ResourceManager : found /templates/queryParam.java.vm with loader org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
11:33:44.314 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/queryParam.java.vm;  文件:E:\github\spring-boot-plus/src/main/java/io/geekidea/springbootplus/system/web/param/SysLogQueryParam.java
11:33:44.332 [main] DEBUG org.apache.velocity - ResourceManager : found /templates/queryVo.java.vm with loader org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
11:33:44.337 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/queryVo.java.vm;  文件:E:\github\spring-boot-plus/src/main/java/io/geekidea/springbootplus/system/web/vo/SysLogQueryVo.java
11:33:44.347 [main] DEBUG org.apache.velocity - ResourceManager : found /templates/entity.java.vm with loader org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
11:33:44.357 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/entity.java.vm;  文件:E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\entity\SysLog.java
11:33:44.359 [main] DEBUG org.apache.velocity - ResourceManager : found /templates/mapper.java.vm with loader org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
11:33:44.360 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/mapper.java.vm;  文件:E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\mapper\SysLogMapper.java
11:33:44.362 [main] DEBUG org.apache.velocity - ResourceManager : found /templates/service.java.vm with loader org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
11:33:44.364 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/service.java.vm;  文件:E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\service\SysLogService.java
11:33:44.367 [main] DEBUG org.apache.velocity - ResourceManager : found /templates/serviceImpl.java.vm with loader org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
11:33:44.369 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/serviceImpl.java.vm;  文件:E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\service\impl\SysLogServiceImpl.java
11:33:44.373 [main] DEBUG org.apache.velocity - ResourceManager : found /templates/controller.java.vm with loader org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
11:33:44.376 [main] DEBUG com.baomidou.mybatisplus.generator.engine.AbstractTemplateEngine - 模板:/templates/controller.java.vm;  文件:E:\github\spring-boot-plus/src/main/java\io\geekidea\springbootplus\system\web\controller\SysLogController.java
11:33:44.376 [main] DEBUG com.baomidou.mybatisplus.generator.AutoGenerator - ==========================文件生成完成！！！==========================

Process finished with exit code 0
```

> 3.2 生成的模块和包结构
```text
├─system                模块包
│  ├─entity             实体类包
│  ├─mapper             mybatis mapper接口包
│  ├─service            服务接口包
│  │  └─impl            服务实现包
│  └─web                提供前端结果相关包
│      ├─controller     控制器包
│      ├─param          参数包
│      └─vo             值对象,响应结果包
```
> 3.3 生成的包及相关的类
```text
├─system                                
│  ├─entity                             
│  │      SysLog.java                   实体类，已生成swagger注释
│  ├─mapper                             
│  │      SysLogMapper.java             mapper接口
│  ├─service                            
│  │  │  SysLogService.java             服务接口，已继承公共service
│  │  └─impl                            
│  │          SysLogServiceImpl.java    服务实现类，已继承公共service impl
│  └─web                                
│      ├─controller                     
│      │      SysLogController.java     控制器类，已生成CRUD，分页controller方法，已生成swagger文档
│      ├─param                                                
│      │      SysLogQueryParam.java     请求参数类，用于条件分页查询等
│      └─vo                             
│              SysLogQueryVo.java       响应结果类，用于自定义查询响应结果等
```

> 3.4 启动项目
```java
SpringBootPlusApplication.java
```
```text
2019-07-27 12:11:45.298  INFO 21856 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8888 (http) with context path ''
2019-07-27 12:11:45.301  INFO 21856 --- [           main] i.g.s.SpringBootPlusApplication          : Started SpringBootPlusApplication in 9.66 seconds (JVM running for 10.988)
2019-07-27 12:11:45.304  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : projectFinalName : spring-boot-plus
2019-07-27 12:11:45.305  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : projectVersion : 1.0.0.RELEASE
2019-07-27 12:11:45.305  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : profileActive : local
2019-07-27 12:11:45.305  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : contextPath : /
2019-07-27 12:11:45.305  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : port : 8888
2019-07-27 12:11:45.308  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : home:http://192.168.1.168:8888/
2019-07-27 12:11:45.308  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : docs:http://192.168.1.168:8888/docs
2019-07-27 12:11:45.308  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : spring-boot-plus project start success...........
2019-07-27 12:11:45.309  INFO 21856 --- [           main] i.g.s.util.PrintApplicationInfo          : 
 ____    __                    __        ____                                                   
/\  _`\ /\ \__                /\ \__    /\  _`\                                                 
\ \,\L\_\ \ ,_\    __     _ __\ \ ,_\   \ \,\L\_\  __  __    ___    ___     __    ____    ____  
 \/_\__ \\ \ \/  /'__`\  /\`'__\ \ \/    \/_\__ \ /\ \/\ \  /'___\ /'___\ /'__`\ /',__\  /',__\ 
   /\ \L\ \ \ \_/\ \L\.\_\ \ \/ \ \ \_     /\ \L\ \ \ \_\ \/\ \__//\ \__//\  __//\__, `\/\__, `\
   \ `\____\ \__\ \__/.\_\\ \_\  \ \__\    \ `\____\ \____/\ \____\ \____\ \____\/\____/\/\____/
    \/_____/\/__/\/__/\/_/ \/_/   \/__/     \/_____/\/___/  \/____/\/____/\/____/\/___/  \/___/ 
```

> 3.5 访问项目

> [http://localhost:8888/swagger-ui.html](http://localhost:8888/swagger-ui.html)

> 或者访问本地ip

> [http://192.168.xxx.xxx:8888/swagger-ui.html](http://192.168.xxx.xxx:8888/swagger-ui.html)


- 自动生成swagger CRUD、分页接口文档
![swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-swagger.png)

1. add 添加接口swagger
![add 添加接口swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-add-swagger.png)

2. delete 删除接口swagger
![delete 删除接口swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-delete-swagger.png)

3. getPageList 分页接口swagger
![getPageList 分页接口swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-getPageList-swagger.png)

4. info 详情接口swagger
![info 详情接口swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-info-swagger.png)

5. update 修改接口swagger
![update 修改接口swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-update-swagger.png)
 

#### 官网地址：[springboot.plus](http://springboot.plus "springboot.plus")

