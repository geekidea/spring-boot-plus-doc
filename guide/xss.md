---
title: XSS跨站脚本攻击处理
meta:
  - name: keywords
    content: springboot,springbootplus,xss,跨站脚本攻击处理,Cross Site Scripting
  - name: description
    content: spring-boot-plus XSS(Cross Site Scripting)跨站脚本攻击处理
---

# XSS跨站脚本攻击处理
> XSS：Cross Site Scripting

- 跨站脚本攻击（XSS），是目前最普遍的Web应用安全漏洞。这类漏洞能够使得攻击者嵌入恶意脚本代码到正常用户会访问到的页面中，当正常用户访问该页面时，则可导致嵌入的恶意脚本代码的执行，从而达到恶意攻击用户的目的。

## 处理方法
> 将参数中的特殊字符进行转换
- 例如 input参数值，用户输入为：
```text
<script>alert(1);</script>
```
- 处理后为：
```text
&lt;script&gt;alert(1);&lt;/script&gt;
```
## 后台处理

### pom.xml依赖
> 使用 `commons-text`包中的`StringEscapeUtils.escapeHtml4();`方法
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-text</artifactId>
    <version>1.8</version>
</dependency>
```

### XssHttpServletRequestWrapper
> 对`HttpServletRequest` 对象的请求参数进行处理

```java
public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {

    public XssHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    @Override
    public String getQueryString() {
        String value = super.getQueryString();
        return StringEscapeUtils.escapeHtml4(value);
    }

    @Override
    public String getParameter(String name) {
        String value = super.getParameter(name);
        return StringEscapeUtils.escapeHtml4(value);
    }

    @Override
    public String[] getParameterValues(String name) {
        String[] values = super.getParameterValues(name);
        if (ArrayUtils.isEmpty(values)) {
            return values;
        }
        int length = values.length;
        String[] escapeValues = new String[length];
        for (int i = 0; i < length; i++) {
            String value = values[i];
            escapeValues[i] = StringEscapeUtils.escapeHtml4(value);
        }
        return escapeValues;
    }

}

```

### XssFilter
> 使用`WebFilter`注解，拦截所有请求，过滤请求参数

```java
@Slf4j
@WebFilter(filterName = "xssFilter", urlPatterns = "/*", asyncSupported = true)
public class XssFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        XssHttpServletRequestWrapper xssHttpServletRequestWrapper = new XssHttpServletRequestWrapper(request);
        filterChain.doFilter(xssHttpServletRequestWrapper, servletResponse);
    }
}
```

### 启动类添加@ServletComponentScan注解
> 扫描使用servlet注解的类，启用 XssFilter

```java
@ServletComponentScan
```

### JSON字符串请求参数处理
> 实现Jackson反序列化方法，将参数值转义处理

```java
public class XssJacksonDeserializer extends JsonDeserializer<String> {

    @Override
    public String deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        return StringEscapeUtils.escapeHtml4(jsonParser.getText());
    }

}
```

### JSON字符串响应结果处理
> 实现Jackson序列化方法，将参数值转义处理

```java
@Slf4j
public class XssJacksonSerializer extends JsonSerializer<String> {

    @Override
    public void serialize(String s, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeString(StringEscapeUtils.escapeHtml4(s));
    }

}
```

### 重点，Jackson配置Xss
```java
@Configuration
public class JacksonConfig implements WebMvcConfigurer {
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        // code...
        // XSS序列化
        simpleModule.addSerializer(String.class, new XssJacksonSerializer());
        simpleModule.addDeserializer(String.class, new XssJacksonDeserializer());
        // code...
    }
}
```

## 总结
> 实现字符串转义的核心方法：
- `org.apache.commons.text.StringEscapeUtils`
```java
StringEscapeUtils.escapeHtml4();
```