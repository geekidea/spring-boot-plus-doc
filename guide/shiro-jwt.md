---
title: SpringBoot+Shiro+JWT权限管理
meta:
  - name: keywords
    content: springboot,springbootplus,shiro,jwt,shiro+jwt
  - name: description
    content: spring-boot-plus集成Shiro+JWT，执行身份验证、授权、密码和会话管理
---

# Shiro+JWT权限管理

## Shiro
::: tip Shiro
- Apache Shiro是一个强大且易用的Java安全框架,执行身份验证、授权、密码和会话管理。
- 使用Shiro的易于理解的API,您可以快速、轻松地获得任何应用程序,从最小的移动应用程序到最大的网络和企业应用程序。
:::

> 三个核心组件：`Subject`, `SecurityManager` 和 `Realms`.

- Subject代表了当前用户的安全操作,即“当前操作用户”。
- SecurityManager：它是Shiro框架的核心，典型的Facade模式，Shiro通过SecurityManager来管理内部组件实例，并通过它来提供安全管理的各种服务。
- Realm： Realm充当了Shiro与应用安全数据间的“桥梁”或者“连接器”。也就是说，当对用户执行认证（登录）和授权（访问控制）验证时，Shiro会从应用配置的Realm中查找用户及其权限信息。

- ShiroBasicArchitecture
![ShiroBasicArchitecture](http://shiro.apache.org/assets/images/ShiroBasicArchitecture.png)

- ShiroArchitecture
![ShiroArchitecture](http://shiro.apache.org/assets/images/ShiroArchitecture.png)

## JWT
::: tip JWT
- JSON Web Token（JWT）是目前最流行的跨域身份验证解决方案
- JSON Web令牌是一种开放的行业标准  RFC 7519方法，用于在双方之间安全地表示声明。
:::

### JWT 数据结构
```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJodHRwczovL3NwcmluZ2Jvb3QucGx1cyIsIm5hbWUiOiJzcHJpbmctYm9vdC1wbHVzIiwiaWF0IjoxNTE2MjM5MDIyfQ.1Cm7Ej8oIy1P5pkpu8-Q0B7bTU254I1og-ZukEe84II
```
![jwt](https://raw.githubusercontent.com/geekidea/spring-boot-plus-doc/master/.vuepress/public/img/jwt.png)

> JWT有三部分组成：`Header`:头部，`Payload`:负载，`Signature`:签名

## SpringBoot+Shiro+JWT
### pom.xml Shiro依赖
```xml
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring-boot-starter</artifactId>
    <version>1.4.1</version>
</dependency>
```

### pom.xml JWT依赖
```xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>3.8.3</version>
</dependency>
```

### ShiroConfig.java配置
```java
@Slf4j
@Configuration
@EnableConfigurationProperties({
        ShiroProperties.class
})
public class ShiroConfig {

    /**
     * JWT过滤器名称
     */
    private static final String JWT_FILTER_NAME = "jwtFilter";
    /**
     * 请求路径过滤器名称
     */
    private static final String REQUEST_PATH_FILTER_NAME = "path";
    /**
     * Shiro过滤器名称
     */
    private static final String SHIRO_FILTER_NAME = "shiroFilter";


    @Bean
    public CredentialsMatcher credentialsMatcher() {
        return new JwtCredentialsMatcher();
    }

    /**
     * JWT数据源验证
     *
     * @return
     */
    @Bean
    public JwtRealm jwtRealm(LoginRedisService loginRedisService) {
        JwtRealm jwtRealm = new JwtRealm(loginRedisService);
        jwtRealm.setCachingEnabled(false);
        jwtRealm.setCredentialsMatcher(credentialsMatcher());
        return jwtRealm;
    }


    @Bean
    public SessionStorageEvaluator sessionStorageEvaluator() {
        DefaultSessionStorageEvaluator sessionStorageEvaluator = new DefaultWebSessionStorageEvaluator();
        sessionStorageEvaluator.setSessionStorageEnabled(false);
        return sessionStorageEvaluator;
    }

    @Bean
    public DefaultSubjectDAO subjectDAO() {
        DefaultSubjectDAO defaultSubjectDAO = new DefaultSubjectDAO();
        defaultSubjectDAO.setSessionStorageEvaluator(sessionStorageEvaluator());
        return defaultSubjectDAO;
    }

    /**
     * 安全管理器配置
     *
     * @return
     */
    @Bean
    public SecurityManager securityManager(LoginRedisService loginRedisService) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(jwtRealm(loginRedisService));
        securityManager.setSubjectDAO(subjectDAO());
        SecurityUtils.setSecurityManager(securityManager);
        return securityManager;
    }

    /**
     * ShiroFilterFactoryBean配置
     *
     * @param securityManager
     * @param loginRedisService
     * @param shiroProperties
     * @param jwtProperties
     * @return
     */
    @Bean(SHIRO_FILTER_NAME)
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager,
                                                         LoginService loginService,
                                                         LoginRedisService loginRedisService,
                                                         SpringBootPlusFilterProperties filterProperties,
                                                         ShiroProperties shiroProperties,
                                                         JwtProperties jwtProperties) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        Map<String, Filter> filterMap = getFilterMap(loginService, loginRedisService, filterProperties, jwtProperties);
        shiroFilterFactoryBean.setFilters(filterMap);
        Map<String, String> filterChainMap = getFilterChainDefinitionMap(shiroProperties);
        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainMap);
        return shiroFilterFactoryBean;
    }


    /**
     * 获取filter map
     *
     * @return
     */
    private Map<String, Filter> getFilterMap(LoginService loginService,
                                             LoginRedisService loginRedisService,
                                             SpringBootPlusFilterProperties filterProperties,
                                             JwtProperties jwtProperties) {
        Map<String, Filter> filterMap = new LinkedHashMap();
        filterMap.put(REQUEST_PATH_FILTER_NAME, new RequestPathFilter(filterProperties.getRequestPath()));
        filterMap.put(JWT_FILTER_NAME, new JwtFilter(loginService, loginRedisService, jwtProperties));
        return filterMap;
    }


    /**
     * Shiro路径权限配置
     *
     * @return
     */
    private Map<String, String> getFilterChainDefinitionMap(ShiroProperties shiroProperties) {
        Map<String, String> filterChainDefinitionMap = new LinkedHashMap();
        // 获取ini格式配置
        String definitions = shiroProperties.getFilterChainDefinitions();
        if (StringUtils.isNotBlank(definitions)) {
            Map<String, String> section = IniUtil.parseIni(definitions);
            log.debug("definitions:{}", JSON.toJSONString(section));
            for (Map.Entry<String, String> entry : section.entrySet()) {
                filterChainDefinitionMap.put(entry.getKey(), entry.getValue());
            }
        }

        // 获取自定义权限路径配置集合
        List<ShiroPermissionProperties> permissionConfigs = shiroProperties.getPermission();
        log.debug("permissionConfigs:{}", JSON.toJSONString(permissionConfigs));
        if (CollectionUtils.isNotEmpty(permissionConfigs)) {
            for (ShiroPermissionProperties permissionConfig : permissionConfigs) {
                String url = permissionConfig.getUrl();
                String[] urls = permissionConfig.getUrls();
                String permission = permissionConfig.getPermission();
                if (StringUtils.isBlank(url) && ArrayUtils.isEmpty(urls)) {
                    throw new ShiroConfigException("shiro permission config 路径配置不能为空");
                }
                if (StringUtils.isBlank(permission)) {
                    throw new ShiroConfigException("shiro permission config permission不能为空");
                }

                if (StringUtils.isNotBlank(url)) {
                    filterChainDefinitionMap.put(url, permission);
                }
                if (ArrayUtils.isNotEmpty(urls)) {
                    for (String string : urls) {
                        filterChainDefinitionMap.put(string, permission);
                    }
                }
            }
        }

        // 如果启用shiro，则设置最后一个设置为JWTFilter，否则全部路径放行
        if (shiroProperties.isEnable()) {
            filterChainDefinitionMap.put("/**", JWT_FILTER_NAME);
        } else {
            filterChainDefinitionMap.put("/**", "anon");
        }

        log.debug("filterChainMap:{}", JSON.toJSONString(filterChainDefinitionMap));

        // 添加默认的filter
        Map<String, String> newFilterChainDefinitionMap = addDefaultFilterDefinition(filterChainDefinitionMap);
        return newFilterChainDefinitionMap;
    }

    /**
     * 添加默认的filter权限过滤
     *
     * @param filterChainDefinitionMap
     * @return
     */
    private Map<String, String> addDefaultFilterDefinition(Map<String, String> filterChainDefinitionMap) {
        if (MapUtils.isEmpty(filterChainDefinitionMap)) {
            return filterChainDefinitionMap;
        }
        final Map<String, String> map = new LinkedHashMap();
        for (Map.Entry<String, String> entry : filterChainDefinitionMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            String definition;
            if (value.contains(REQUEST_PATH_FILTER_NAME)) {
                definition = value;
            } else {
                String[] strings = value.split(",");
                List<String> list = new ArrayList<>();
                // 添加默认filter过滤
                list.add(REQUEST_PATH_FILTER_NAME);
                list.addAll(Arrays.asList(strings));
                definition = String.join(",", list);
            }
            map.put(key, definition);
        }
        return map;
    }

    /**
     * ShiroFilter配置
     *
     * @return
     */
    @Bean
    public FilterRegistrationBean delegatingFilterProxy() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        DelegatingFilterProxy proxy = new DelegatingFilterProxy();
        proxy.setTargetFilterLifecycle(true);
        proxy.setTargetBeanName(SHIRO_FILTER_NAME);
        filterRegistrationBean.setFilter(proxy);
        filterRegistrationBean.setAsyncSupported(true);
        filterRegistrationBean.setEnabled(true);
        filterRegistrationBean.setDispatcherTypes(DispatcherType.REQUEST, DispatcherType.ASYNC);
        return filterRegistrationBean;
    }

    @Bean
    public Authenticator authenticator(LoginRedisService loginRedisService) {
        ModularRealmAuthenticator authenticator = new ModularRealmAuthenticator();
        authenticator.setRealms(Arrays.asList(jwtRealm(loginRedisService)));
        authenticator.setAuthenticationStrategy(new FirstSuccessfulStrategy());
        return authenticator;
    }


    /**
     * Enabling Shiro Annotations
     *
     * @return
     */
    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }

}

```

### JWT过滤器配置
```java
@Slf4j
public class JwtFilter extends AuthenticatingFilter {

    private LoginService loginService;

    private LoginRedisService loginRedisService;

    private JwtProperties jwtProperties;

    public JwtFilter(LoginService loginService, LoginRedisService loginRedisService, JwtProperties jwtProperties) {
        this.loginService = loginService;
        this.loginRedisService = loginRedisService;
        this.jwtProperties = jwtProperties;
    }

    /**
     * 将JWT Token包装成AuthenticationToken
     *
     * @param servletRequest
     * @param servletResponse
     * @return
     * @throws Exception
     */
    @Override
    protected AuthenticationToken createToken(ServletRequest servletRequest, ServletResponse servletResponse) throws Exception {
        String token = JwtTokenUtil.getToken();
        if (StringUtils.isBlank(token)) {
            throw new AuthenticationException("token不能为空");
        }
        if (JwtUtil.isExpired(token)) {
            throw new AuthenticationException("JWT Token已过期,token:" + token);
        }

        // 如果开启redis二次校验，或者设置为单个用户token登陆，则先在redis中判断token是否存在
        if (jwtProperties.isRedisCheck() || jwtProperties.isSingleLogin()) {
            boolean redisExpired = loginRedisService.exists(token);
            if (!redisExpired) {
                throw new AuthenticationException("Redis Token不存在,token:" + token);
            }
        }

        String username = JwtUtil.getUsername(token);
        String salt;
        if (jwtProperties.isSaltCheck()){
            salt = loginRedisService.getSalt(username);
        }else{
            salt = jwtProperties.getSecret();
        }
        return JwtToken.build(token, username, salt, jwtProperties.getExpireSecond());
    }

    /**
     * 访问失败处理
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = WebUtils.toHttp(request);
        HttpServletResponse httpServletResponse = WebUtils.toHttp(response);
        // 返回401
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        // 设置响应码为401或者直接输出消息
        String url = httpServletRequest.getRequestURI();
        log.error("onAccessDenied url：{}", url);
        ApiResult apiResult = ApiResult.fail(ApiCode.UNAUTHORIZED);
        HttpServletResponseUtil.printJSON(httpServletResponse, apiResult);
        return false;
    }

    /**
     * 判断是否允许访问
     *
     * @param request
     * @param response
     * @param mappedValue
     * @return
     */
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        String url = WebUtils.toHttp(request).getRequestURI();
        log.debug("isAccessAllowed url:{}", url);
        if (this.isLoginRequest(request, response)) {
            return true;
        }
        boolean allowed = false;
        try {
            allowed = executeLogin(request, response);
        } catch (IllegalStateException e) { //not found any token
            log.error("Token不能为空", e);
        } catch (Exception e) {
            log.error("访问错误", e);
        }
        return allowed || super.isPermissive(mappedValue);
    }

    /**
     * 登陆成功处理
     *
     * @param token
     * @param subject
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
        String url = WebUtils.toHttp(request).getRequestURI();
        log.debug("鉴权成功,token:{},url:{}", token, url);
        // 刷新token
        JwtToken jwtToken = (JwtToken) token;
        HttpServletResponse httpServletResponse = WebUtils.toHttp(response);
        loginService.refreshToken(jwtToken, httpServletResponse);
        return true;
    }

    /**
     * 登陆失败处理
     *
     * @param token
     * @param e
     * @param request
     * @param response
     * @return
     */
    @Override
    protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request, ServletResponse response) {
        log.error("登陆失败，token:" + token + ",error:" + e.getMessage(), e);
        return false;
    }
}

```

### JWT Realm配置
```java
@Slf4j
public class JwtRealm extends AuthorizingRealm {

    private LoginRedisService loginRedisService;

    public JwtRealm(LoginRedisService loginRedisService) {
        this.loginRedisService = loginRedisService;
    }

    @Override
    public boolean supports(AuthenticationToken token) {
        return token != null && token instanceof JwtToken;
    }

    /**
     * 授权认证,设置角色/权限信息
     *
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        log.debug("doGetAuthorizationInfo principalCollection...");
        // 设置角色/权限信息
        JwtToken jwtToken = (JwtToken) principalCollection.getPrimaryPrincipal();
        // 获取username
        String username = jwtToken.getUsername();
        // 获取登陆用户角色权限信息
        LoginSysUserRedisVo loginSysUserRedisVo = loginRedisService.getLoginSysUserRedisVo(username);
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        // 设置角色
        authorizationInfo.setRoles(SetUtils.hashSet(loginSysUserRedisVo.getRoleCode()));
        // 设置权限
        authorizationInfo.setStringPermissions(loginSysUserRedisVo.getPermissionCodes());
        return authorizationInfo;
    }

    /**
     * 登陆认证
     *
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        log.debug("doGetAuthenticationInfo authenticationToken...");
        // 校验token
        JwtToken jwtToken = (JwtToken) authenticationToken;
        if (jwtToken == null) {
            throw new AuthenticationException("jwtToken不能为空");
        }
        String salt = jwtToken.getSalt();
        if (StringUtils.isBlank(salt)) {
            throw new AuthenticationException("salt不能为空");
        }
        return new SimpleAuthenticationInfo(
                jwtToken,
                salt,
                getName()
        );

    }

}

```

### 更多配置:[https://github.com/geekidea/spring-boot-plus](https://github.com/geekidea/spring-boot-plus/tree/master/src/main/java/io/geekidea/springbootplus/shiro)


### application.yml配置
```yaml

  ######################## Spring Shiro start ########################
  shiro:
    # 是否启用
    enable: true
    # shiro ini 多行字符串配置
    filter-chain-definitions: |
      /=anon
      /static/**=anon
      /templates/**=anon
      /druid/**=anon
      /hello/world=anon
      /sysLog/**=anon
      /verificationCode/**=anon
      /resource/**=anon
      /fooBar/**=anon
    # 权限配置
    permission:
        # 排除登陆登出相关
      - urls: /login,/logout
        permission: anon
        # 排除静态资源
      - urls: /static/**,/templates/**
        permission: anon
        # 排除Swagger
      - urls: /docs,/swagger-ui.html,/webjars/springfox-swagger-ui/**,/swagger-resources/**,/v2/api-docs
        permission: anon
        # 排除SpringBootAdmin
      - urls: /,/favicon.ico,/actuator/**,/instances/**,/assets/**,/sba-settings.js,/applications/**
        permission: anon
        # 测试
      - url: /sysUser/getPageList
        permission: anon
  ######################## Spring Shiro end ##########################

  ############################ JWT start #############################
  jwt:
    # token请求头名称
    token-name: token
    # jwt密钥
    secret: 666666
    # 发行人
    issuer: spring-boot-plus
    # 观众
    audience: web
    # 默认过期时间1小时，单位：秒
    expire-second: 3600
    # 是否刷新token
    refresh-token: true
    # 刷新token的时间间隔，默认10分钟，单位：秒
    refresh-token-countdown: 600
    # redis校验jwt token是否存在,可选
    redis-check: true
    # true: 同一个账号只能是最后一次登陆token有效，false：同一个账号可多次登陆
    single-login: false
    # 盐值校验，如果不加自定义盐值，则使用secret校验
    salt-check: true
  ############################ JWT end ###############################

############################### spring-boot-plus end ###############################

```

### Redis存储信息
> 使用Redis缓存JWTToken和盐值：方便鉴权,token后台过期控制等
- Redis二次校验和盐值校验是可选的
```text
127.0.0.1:6379> keys *
1) "login:user:token:admin:0f2c5d670f9f5b00201c78293304b5b5"
2) "login:salt:admin"
3) "login:user:admin"
4) "login:token:0f2c5d670f9f5b00201c78293304b5b5"
```

- Redis存储的JwtToken信息
```text
127.0.0.1:6379> get login:token:0f2c5d670f9f5b00201c78293304b5b5
```
```json
{
  "@class": "io.geekidea.springbootplus.shiro.vo.JwtTokenRedisVo",
  "host": "127.0.0.1",
  "username": "admin",
  "salt": "f80b2eed0110a7ea5a94c35cbea1fe003d9bb450803473428b74862cceb697f8",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJzcHJpbmctYm9vdC1wbHVzIiwiZXhwIjoxNTcwMzU3ODY1LCJpYXQiOjE1NzAzNTQyNjUsImp0aSI6IjE2MWQ1MDQxZmUwZjRmYTBhOThjYmQ0ZjRlNDI1ZGQ3IiwidXNlcm5hbWUiOiJhZG1pbiJ9.0ExWSiniq7ThMXfqCOi9pCdonY8D1azeu78_vLNa2v0",
  "createDate": [
    "java.util.Date",
    1570354265000
  ],
  "expireSecond": 3600,
  "expireDate": [
    "java.util.Date",
    1570357865000
  ]
}
```

### Reference
> Shiro
- [https://shiro.apache.org/spring.html](https://shiro.apache.org/spring.html)
- [https://shiro.apache.org/spring-boot.html](https://shiro.apache.org/spring-boot.html)

> JWT
- [https://jwt.io/](https://jwt.io/)
- [https://github.com/auth0/java-jwt](https://github.com/auth0/java-jwt)

> spring-boot-plus
- [https://github.com/geekidea/spring-boot-plus](https://github.com/geekidea/spring-boot-plus/tree/master/src/main/java/io/geekidea/springbootplus/shiro)
- [https://springboot.plus/guide/shiro-jwt.html](https://springboot.plus/guide/shiro-jwt.html)