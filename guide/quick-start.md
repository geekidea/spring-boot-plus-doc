# 快速开始 Quick Start

## 1. clone项目到本地

```shell script
git clone git@github.com:geekidea/spring-boot-plus.git
```
Or
```shell script
git clone https://github.com/geekidea/spring-boot-plus.git
```

## 2. maven构建
> 默认使用local环境,对应配置文件：application-local.yml
```shell script
mvn clean package
```

## 3. 新建数据库
> 数据库MySQL

> 默认数据库名称为：spring_boot_plus

> 导入表结构和数据：

    spring-boot-plus\docs\spring_boot_plus.sql
    
```sql
-- ----------------------------
-- Table structure for ip
-- ----------------------------
DROP TABLE IF EXISTS `ip`;
CREATE TABLE `ip`  (
  `ip_start` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ip_end` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `area` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `operator` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip_start_num` bigint(20) NOT NULL,
  `ip_end_num` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 526718 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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

-- ----------------------------
-- Records of sys_log
-- ----------------------------
INSERT INTO `sys_log` VALUES (1060438746056376321, 0, 'A', 100000, '2018-11-08 15:41:58');
INSERT INTO `sys_log` VALUES (1060438788502732802, 0, 'B', 100000, '2018-11-08 15:42:08');
INSERT INTO `sys_log` VALUES (1060438799600861185, 0, 'C', 100000, '2018-11-08 15:42:10');
INSERT INTO `sys_log` VALUES (1060438809495224322, 0, 'D', 100000, '2018-11-08 15:42:13');
INSERT INTO `sys_log` VALUES (1060438823319650306, 0, 'E', 100000, '2018-11-08 15:42:16');
INSERT INTO `sys_log` VALUES (1060438833750884353, 0, 'F', 100000, '2018-11-08 15:42:18');
INSERT INTO `sys_log` VALUES (1060439062743166977, 0, '1111111111', 100000, '2018-11-08 15:43:13');
INSERT INTO `sys_log` VALUES (1060439085228830721, 1, 'test redis lock ffbb79f6-9efe-4608-b204-fde5279b107f', 100000, '2018-11-16 16:46:35');
INSERT INTO `sys_log` VALUES (1068528405778444290, NULL, NULL, NULL, '2018-11-30 23:33:21');
INSERT INTO `sys_log` VALUES (1068528405778444291, NULL, NULL, NULL, '2018-11-30 23:33:21');

```
> ip表只有表结构，第一次使用项目时，可以不用导入ip表数据！

[https://github.com/geekidea/spring-boot-plus-doc/blob/master/db/ip_data.sql.zip](https://github.com/geekidea/spring-boot-plus-doc/blob/master/db/ip_data.sql.zip)

## 4. 启动redis

## 5. 检查是否按照lombok插件
> 如遇到log报错，则需要按照lombok插件
- [idea按照lombok](https://www.baidu.com/s?ie=utf-8&wd=idea%E5%AE%89%E8%A3%85lombok)
- [eclipse按照lombok](https://www.baidu.com/s?ie=utf-8&wd=eclipse%E5%AE%89%E8%A3%85lombok)

## 6. 启动项目
> 项目启动入口类
```text
SpringBootPlusApplication.java
```

## 7. 访问
> [http://localhost:8888/swagger-ui.html](http://localhost:8888/swagger-ui.html)

## 8. swagger界面
![swagger](https://geekidea.oss-cn-chengdu.aliyuncs.com/spring-boot-plus/img/sys-log-swagger.png)
