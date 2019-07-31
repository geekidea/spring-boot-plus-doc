## 目录结构
        
::: tip 目录结构
- bin：启动/重启命令脚本目录
- logs：部署后记录日志目录
- assembly：maven打包配置文件目录
- java：源代码目录
- resources：资源文件目录
- config：项目配置文件目录
- mapper：mybatis xml映射文件目录
- test：测试目录
- test/resources：代码生成模板目录
:::

```text
├─bin
├─logs
│  └─back
├─main
│  ├─assembly
│  ├─java
│  │  └─io
│  │      └─geekidea
│  │          └─springbootplus
│  │              ├─common
│  │              │  ├─aop
│  │              │  ├─api
│  │              │  ├─constant
│  │              │  ├─constraints
│  │              │  ├─entity
│  │              │  ├─enums
│  │              │  ├─exception
│  │              │  ├─service
│  │              │  │  └─impl
│  │              │  └─web
│  │              │      ├─controller
│  │              │      ├─filter
│  │              │      ├─interceptor
│  │              │      ├─param
│  │              │      └─vo
│  │              ├─config
│  │              │  ├─converter
│  │              │  ├─json
│  │              │  │  ├─fastjson
│  │              │  │  └─jackson
│  │              │  │      ├─deserializer
│  │              │  │      └─serializer
│  │              │  └─mq
│  │              │      ├─kafka
│  │              │      └─rabbit
│  │              ├─example
│  │              │  ├─mq
│  │              │  │  ├─kafka
│  │              │  │  └─rabbit
│  │              │  └─redislock
│  │              ├─security
│  │              │  ├─config
│  │              │  ├─controller
│  │              │  ├─interceptor
│  │              │  ├─param
│  │              │  ├─service
│  │              │  │  └─impl
│  │              │  ├─util
│  │              │  └─vo
│  │              ├─system
│  │              │  ├─entity
│  │              │  ├─mapper
│  │              │  ├─service
│  │              │  │  └─impl
│  │              │  └─web
│  │              │      ├─controller
│  │              │      ├─param
│  │              │      └─vo
│  │              └─util
│  └─resources
│      ├─config
│      └─mapper
│          └─system
└─test
    ├─java
    │  └─io
    │      └─geekidea
    │          └─springbootplus
    │              └─test
    └─resources
        └─templates
```