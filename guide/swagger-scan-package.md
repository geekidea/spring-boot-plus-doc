---
title: Swagger扫描多个包
meta:
  - name: keywords
    content: springboot,springbootplus,swagger,scanner,package,Swagger扫描多个包
  - name: description
    content: spring-boot-plus Swagger扫描多个包
---

# Swagger扫描多个包

### 项目包目录结构示例
```text
├── com
│   └── example
│       └── TestController.java
└── io
    └── geekidea
        └── springbootplus
            ├── SpringBootPlusApplication.java
            ├── config
            │   ├── Swagger2Config.java
            ├── resource
            ├── scheduled
            └── system
               
```

### 启动类中配置扫描包
> SpringBootPlusApplication.java

- scanBasePackages 配置扫描的多个包

```text
// ...
@SpringBootApplication(scanBasePackages = {"io.geekidea.springbootplus","com.example"})
public class SpringBootPlusApplication {
    // ...
}
```

### application.yml配置swagger扫描包路径
> 使用分号隔开，Swagger2Config类中进行拆分
```yaml
swagger:
  base:
    package: io.geekidea.springbootplus;com.example
```

### Swagger2Config类配置
```java
/*
 * Copyright 2019-2029 geekidea(https://github.com/geekidea)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.geekidea.springbootplus.framework.config;

import com.google.common.base.Function;
import com.google.common.base.Optional;
import com.google.common.base.Predicate;
import io.geekidea.springbootplus.framework.shiro.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

/**
 * Swagger2全局配置
 * @author geekidea
 * @date 2018-11-08
 */
@Configuration
@EnableSwagger2
public class Swagger2Config {

    /**
     * 标题
     */
    @Value("${swagger.title}")
    private String title;

    /**
     * 基本包
     */
    @Value("${swagger.base.package}")
    private String basePackage;

    /**
     * 描述
     */
    @Value("${swagger.description}")
    private String description;

    /**
     * URL
     */
    @Value("${swagger.url}")
    private String url;

    /**
     * 作者
     */
    @Value("${swagger.contact.name}")
    private String contactName;

    /**
     * 作者网址
     */
    @Value("${swagger.contact.url}")
    private String contactUrl;

    /**
     * 作者邮箱
     */
    @Value("${swagger.contact.email}")
    private String contactEmail;

    /**
     * 版本
     */
    @Value("${swagger.version}")
    private String version;

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(basePackage(basePackage))
                .paths(PathSelectors.any())
                .build()
                .globalOperationParameters(setHeaderToken())
                ;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(title)
                .description(description)
                .termsOfServiceUrl(url)
                .contact(new Contact(contactName,contactUrl,contactEmail))
                .version(version)
                .build();
    }
    private List<Parameter> setHeaderToken() {
        List<Parameter> pars = new ArrayList<>();

        // token请求头
        String testTokenValue = "";
        ParameterBuilder tokenPar = new ParameterBuilder();
        Parameter tokenParameter = tokenPar
                .name(JwtTokenUtil.getTokenName())
                .description("Token Request Header")
                .modelRef(new ModelRef("string"))
                .parameterType("header")
                .required(false)
                .defaultValue(testTokenValue)
                .build();
        pars.add(tokenParameter);
        return pars;
    }


    public static Predicate<RequestHandler> basePackage(final String basePackage) {
        return input -> declaringClass(input).transform(handlerPackage(basePackage)).or(true);
    }

    private static Function<Class<?>, Boolean> handlerPackage(final String basePackage) {
        return input -> {
            // 循环判断匹配
            for (String strPackage : basePackage.split(";")) {
                boolean isMatch = input.getPackage().getName().startsWith(strPackage);
                if (isMatch) {
                    return true;
                }
            }
            return false;
        };
    }

    private static Optional<? extends Class<?>> declaringClass(RequestHandler input) {
        return Optional.fromNullable(input.declaringClass());
    }

}

```

### Swagger界面

![Swagger界面](https://springboot.plus/img/swagger-scan-package.png)
