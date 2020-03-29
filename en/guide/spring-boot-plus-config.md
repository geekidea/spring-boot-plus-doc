---
sidebarDepth: 0
title: 
meta:
  - name: keywords
    content: spring,spring boot,springbootplus,spring-boot-plus,springboot.plus,open source project,java,scaffolding,github
  - name: description
    content: spring-boot-plus is a easy-to-use, high-speed, high-efficient, feature-rich, open source spring boot scaffolding！ Front-end and back-end separation, focusing on back-end services！Everyone can develop projects independently, quickly and efficiently！
---

# spring-boot-plus Config

```yaml

############################## spring-boot-plus start #############################
spring-boot-plus:
  # jwt config
  jwt:
    header: token
    secret: 666666
    issuer: spring-boot-plus
    subject: spring-boot-plus-jwt
    audience: web
    expire-minutes: 2
  # Interceptor Config
  interceptor-config:
    jwt-config:
      enabled: false
      include-path: /**
      exclude-path: /swagger-resources/**,/api-docs/**,/v2/api-docs/**,/login,/verificationCode,/doc/**,/error/**,/docs,/test/**,/resource/**
    permission-config:
      enabled: false
      include-path: /**
      exclude-path: /swagger-resources/**,/api-docs/**,/v2/api-docs/**,/adminLogin,/sysLogin,/login.html,/verificationCode,/doc/**,/error/**,/docs,/resource/**
    token-timeout-config:
      enabled: false
      include-path: /**
      exclude-path: /swagger-resources/**,/api-docs/**,/v2/api-docs/**,/docs,/resource/**
    resource-config:
      enabled: true
      include-path: ${spring-boot-plus.resource-access-patterns}
    upload-config:
      enabled: true
      include-path: /upload/**
    download-config:
      enabled: true
      include-path: /download/**
  # File Upload Download Config
  upload-path: /opt/upload/
  resource-access-path: /resource/
  # /resource/**
  resource-access-patterns: ${spring-boot-plus.resource-access-path}**
  # http://localhost:8888/resource/
  resource-access-url: http://localhost:${server.port}${server.servlet.context-path}${spring-boot-plus.resource-access-path}
  allow-upload-file-extensions: jpg,png,docx,xlsx,pptx,pdf
  allow-download-file-extensions: jpg,png,docx,xlsx,pptx,pdf
############################### spring-boot-plus end ###############################
```