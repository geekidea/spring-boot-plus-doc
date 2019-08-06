# 运维部署

## 线上部署

> 打包环境为prod
```bash
mvn clean package -Pprod
```

> 打包后的目录
```bash
cd target/spring-boot-plus-1.2.0.RELEASE-prod
```

### 设置线上数据库、Redis等敏感信息
```bash
vim spring-boot-plus/config/application-prod.yml
```

### 启动服务
```bash
sh spring-boot-plus/bin/startup.sh
```

### 启动日志
```text
[root@springbootplus spring-boot-plus-1.2.0.RELEASE-prod]# sh spring-boot-plus/bin/startup.sh 
================================================ 2019-08-06 00:14:02 ================================================
application name: spring-boot-plus
application jar name: spring-boot-plus.jar
application bin path: /root/spring-boot-plus/target/spring-boot-plus-1.2.0.RELEASE-prod/spring-boot-plus/bin
application root path: /root/spring-boot-plus/target/spring-boot-plus-1.2.0.RELEASE-prod/spring-boot-plus
application log path: /root/spring-boot-plus/target/spring-boot-plus-1.2.0.RELEASE-prod/spring-boot-plus/logs/spring-boot-plus.log
application JAVA_OPT : -server -Xms1g -Xmx1g -Xmn512m -XX:MetaspaceSize=64m -XX:MaxMetaspaceSize=256m -XX:-OmitStackTraceInFastThrow
application background startup command: nohup java -server -Xms1g -Xmx1g -Xmn512m -XX:MetaspaceSize=64m -XX:MaxMetaspaceSize=256m -XX:-OmitStackTraceInFastThrow -jar /root/spring-boot-plus/target/spring-boot-plus-1.2.0.RELEASE-prod/spring-boot-plus/lib/spring-boot-plus.jar --spring.config.location=/root/spring-boot-plus/target/spring-boot-plus-1.2.0.RELEASE-prod/spring-boot-plus/config/ > /root/spring-boot-plus/target/spring-boot-plus-1.2.0.RELEASE-prod/spring-boot-plus/logs/spring-boot-plus.log 2>&1 &
application pid: 25435


                 _                    _                 _                _
                (_)                  | |               | |              | |
  ___ _ __  _ __ _ _ __   __ _ ______| |__   ___   ___ | |_ ______ _ __ | |_   _ ___
 / __| '_ \| '__| | '_ \ / _` |______| '_ \ / _ \ / _ \| __|______| '_ \| | | | / __|
 \__ \ |_) | |  | | | | | (_| |      | |_) | (_) | (_) | |_       | |_) | | |_| \__ \
 |___/ .__/|_|  |_|_| |_|\__, |      |_.__/ \___/ \___/ \__|      | .__/|_|\__,_|___/
     | |                  __/ |                                   | |
     |_|                 |___/                                    |_|

      :: Spring Boot ::             (v2.1.6.RELEASE)
      :: Spring Boot Plus ::        (v1.2.0.RELEASE)
      :: spring-boot-plus ::        https://springboot.plus


2019-08-06 00:14:03.953  INFO 25435 --- [           main] i.g.s.SpringBootPlusApplication          : Starting SpringBootPlusApplication on izm5e9gwtfsmjdxcsrpxbgz with PID 25435 (/root/spring-boot-plus/target/spring-boot-plus-1.2.0.RELEASE-prod/spring-boot-plus/lib/spring-boot-plus.jar started by root in /root/spring-boot-plus/target/spring-boot-plus-1.2.0.RELEASE-prod/spring-boot-plus)
2019-08-06 00:14:03.962  INFO 25435 --- [           main] i.g.s.SpringBootPlusApplication          : The following profiles are active: prod
```
- application name: 应用程序名称
- application jar name: 应用jar包名称
- application bin path: 项目bin命令路径
- application root path: 项目根路径
- application log path: 项目运行日志路径
- application JAVA_OPT : JAVA OPT参数设置
- application background startup command: 执行命令后，实际的启动命令
- application pid: 进程ID
- The following profiles are active: prod：`prod`当前项目运行的环境

### 启动成功
```text
2019-08-06 00:29:03.730  INFO 26795 --- [           main] i.g.s.SpringBootPlusApplication          : Started SpringBootPlusApplication in 10.746 seconds (JVM running for 11.28)
2019-08-06 00:29:03.758  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : projectFinalName : spring-boot-plus
2019-08-06 00:29:03.759  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : projectVersion : 1.2.0.RELEASE
2019-08-06 00:29:03.759  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : profileActive : prod
2019-08-06 00:29:03.759  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : contextPath : /
2019-08-06 00:29:03.759  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : port : 8888
2019-08-06 00:29:03.789  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : home:http://172.31.105.37:8888/
2019-08-06 00:29:03.789  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : docs:http://172.31.105.37:8888/docs
2019-08-06 00:29:03.789  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : spring-boot-plus project start success...........
2019-08-06 00:29:03.794  INFO 26795 --- [           main] i.g.s.util.PrintApplicationInfo          : 
 ____    __                    __        ____                                                   
/\  _`\ /\ \__                /\ \__    /\  _`\                                                 
\ \,\L\_\ \ ,_\    __     _ __\ \ ,_\   \ \,\L\_\  __  __    ___    ___     __    ____    ____  
 \/_\__ \\ \ \/  /'__`\  /\`'__\ \ \/    \/_\__ \ /\ \/\ \  /'___\ /'___\ /'__`\ /',__\  /',__\ 
   /\ \L\ \ \ \_/\ \L\.\_\ \ \/ \ \ \_     /\ \L\ \ \ \_\ \/\ \__//\ \__//\  __//\__, `\/\__, `\
   \ `\____\ \__\ \__/.\_\\ \_\  \ \__\    \ `\____\ \____/\ \____\ \____\ \____\/\____/\/\____/
    \/_____/\/__/\/__/\/_/ \/_/   \/__/     \/_____/\/___/  \/____/\/____/\/____/\/___/  \/___/ 
                                                                                                
                                                                                                
2019-08-06 00:29:03.909  INFO 26795 --- [nio-8888-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2019-08-06 00:29:03.909  INFO 26795 --- [nio-8888-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2019-08-06 00:29:03.924  INFO 26795 --- [nio-8888-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 15 ms
2019-08-06 00:29:04.317  INFO 26795 --- [gistrationTask1] d.c.b.a.c.r.ApplicationRegistrator       : Application registered itself as e211ba082db8
2019-08-06 00:29:04.678  INFO 26795 --- [     parallel-2] io.lettuce.core.EpollProvider            : Starting with epoll library
2019-08-06 00:29:04.681  INFO 26795 --- [     parallel-2] io.lettuce.core.KqueueProvider           : Starting without optional kqueue library
```
- projectFinalName：spring-boot-plus
- projectVersion：项目发布版本
- profileActive：项目使用的环境
- contextPath：项目访问路径
- port：项目端口号
- home：项目主页 Spring Boot Admin监控页面
- docs：Swagger接口页面

::: danger
- !! 注意，这里的路径是内网地址，如果部署到服务器，请使用公网IP访问!!
:::

### 项目启动成功
::: tip
> spring-boot-plus project start success...........
- 访问IP地址即可
:::