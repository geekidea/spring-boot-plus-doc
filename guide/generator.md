---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: spring,spring boot,springbootplus,spring-boot-plus,springboot.plus,springbootplus官网,spring boot 开源项目,java,后台脚手架
  - name: description
    content: spring-boot-plus是易于使用，快速，高效，功能丰富，开源的spring boot 脚手架。前后端分离,专注于后端服务！ 每个人都可以独立、快速、高效地开发项目！Everyone can develop projects independently, quickly and efficiently！
---

# 生成CRUD代码

::: tip 代码生成内容
spring-boot-plus在mybatis-plus基础上，新增param/vo等模板

拓展controller/service/mapper/xml，生成通用CRUD/分页方法

代码生成模板：spring-boot-plus/src/test/resources/templates
:::


## 代码生成步骤

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
spring-boot-plus/src/test/java/io/geekidea/springbootplus/test/SpringBootPlusGenerator.java
```
![代码生成器位置](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/generator-config-location.png)


> 修改数据库连接配置,修改模块、表、作者等配置
```java
public class SpringBootPlusGenerator {

    public static void main(String[] args) {
        CodeGenerator codeGenerator = new CodeGenerator();
        // 公共配置
        // 数据库配置
        codeGenerator
                .setUserName("root")
                .setPassword("root")
                .setDriverName("com.mysql.jdbc.Driver")
                .setDriverUrl("jdbc:mysql://localhost:3306/spring_boot_plus?useUnicode=true&characterEncoding=UTF-8&useSSL=false");

        // 包信息
        codeGenerator
                .setProjectPackagePath("io/geekidea/springbootplus")
                .setParentPackage("io.geekidea.springbootplus");

        // 组件作者等配置
        codeGenerator
                .setModuleName("system")
                .setAuthor("geekidea")
                .setPkIdColumnName("id");

        // 生成策略
        codeGenerator
                .setGeneratorStrategy(CodeGenerator.GeneratorStrategy.ALL)
                .setPageListOrder(true)
                .setParamValidation(true);

        // 生成实体映射相关代码,可用于数据库字段更新
        // 当数据库字段更新时，可自定义自动生成哪些那文件
        codeGenerator
                .setGeneratorEntity(true)
                .setGeneratorQueryParam(true)
                .setGeneratorQueryVo(true);

        // 生成业务相关代码
        codeGenerator
                .setGeneratorController(true)
                .setGeneratorService(true)
                .setGeneratorServiceImpl(true)
                .setGeneratorMapper(true)
                .setGeneratorMapperXml(true);

        // 是否生成Shiro RequiresPermissions注解
        codeGenerator.setRequiresPermissions(false);

        // 是否覆盖已有文件
        codeGenerator.setFileOverride(true);

        // 初始化公共变量
        codeGenerator.init();

        // 需要生成的表数组
        // xxx,yyy,zzz为需要生成代码的表名称
        String[] tables = {
                "sys_log"
        };

        // 循环生成
        for (String table : tables) {
            // 设置需要生成的表名称
            codeGenerator.setTableName(table);
            // 生成代码
            codeGenerator.generator();
        }

    }

}
```
- MODULE_NAME：模块名称，在目前项目上以单独的文件夹形式体现
- AUTHOR：作者名称，在类的注释上体现
- TABLE_NAME：表名称，当前需要生成的表名称，关联实体类等
- PK_ID_COLUMN_NAME：主键列名称，默认是id，如果是其它名称，可在这里配置
- GENERATOR_STRATEGY：代码生成策略 true：All/false:SIMPLE
- PAGE_LIST_ORDER：分页列表查询是否排序 true：有排序参数/false：无

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

## 启动项目
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

## 访问项目

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
 
