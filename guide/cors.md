---
title: CORS跨域处理
meta:
  - name: keywords
    content: springboot,springbootplus,cors,CorsFilter,CORS跨域处理,springboot跨域
  - name: description
    content: spring-boot-plus CORS(Cross-Origin Resource Sharing)跨域处理
---

# CORS跨域处理
> CORS：Cross-Origin Resource Sharing

- CORS是一种允许当前域（domain）的资源（比如html/js/web service）被其他域（domain）的脚本请求访问的机制，通常由于同域安全策略（the same-origin security policy）浏览器会禁止这种跨域请求。

## 处理方法
- 后台设置允许的请求源/请求头等信息

## 后台配置

### CorsFilter Bean配置
> 使用 `Spring` 提供的 `CorsFilter` 过滤器实现跨域配置

- `io.geekidea.springbootplus.core.config.SpringBootPlusConfig`
```java
/**
 * CORS跨域设置
 *
 * @return
 */
@Bean
public FilterRegistrationBean corsFilter(SpringBootPlusCorsProperties corsProperties) {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    // 跨域配置
    corsConfiguration.setAllowedOrigins(corsProperties.getAllowedOrigins());
    corsConfiguration.setAllowedHeaders(corsProperties.getAllowedHeaders());
    corsConfiguration.setAllowedMethods(corsProperties.getAllowedMethods());
    corsConfiguration.setAllowCredentials(corsProperties.isAllowCredentials());
    corsConfiguration.setExposedHeaders(corsProperties.getExposedHeaders());
    source.registerCorsConfiguration(corsProperties.getPath(), corsConfiguration);

    FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
    bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    bean.setEnabled(corsProperties.isEnable());
    return bean;
}
``` 

### 配置文件
> 配置文件类：`io.geekidea.springbootplus.core.properties.SpringBootPlusCorsProperties`

- application.yml

```yaml
spring-boot-plus:
  ############################ CORS start ############################
  # CORS跨域配置，默认允许跨域
  cors:
    # 是否启用跨域，默认启用
    enable: true
    # CORS过滤的路径，默认：/**
    path: /**
    # 允许访问的源
    allowed-origins: '*'
    # 允许访问的请求头
    allowed-headers: content-type,token
    # 是否允许发送cookie
    allow-credentials: true
    # 允许访问的请求方式
    allowed-methods: OPTION,GET,POST
    # 允许响应的头
    exposed-headers: content-type,token
  ############################ CORS end ##############################
```
