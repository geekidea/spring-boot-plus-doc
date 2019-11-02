---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: spring boot,springboot.plus,RBAC,用户角色权限管理，springboot验证码
  - name: description
    content: spring-boot-plus是易于使用，快速，高效，功能丰富，开源的spring boot 脚手架。前后端分离,专注于后端服务！ 每个人都可以独立、快速、高效地开发项目！Everyone can develop projects independently, quickly and efficiently！
---

# RBAC用户角色权限
> 用户角色权限部门管理核心接口介绍 

## Shiro权限配置
- 👉 [Shiro权限配置](https://springboot.plus/guide/shiro-jwt.html)

## 数据库模型图
![spring-boot-plus数据库模型图](https://spring-boot-plus.gitee.io/img/spring-boot-plus-db-diagram.png)

- 👉 [spring-boot-plus初始化SQL下载](https://raw.githubusercontent.com/geekidea/spring-boot-plus/master/docs/db/mysql_spring_boot_plus.sql)

## 获取验证码
> - 可配置是否启用验证码
> - 默认未启用
> - 如已启用验证码校验，登陆时，需传入verifyToken和code

#### [验证码演示](http://localhost:8888/static/verifyCode.html)

```yaml
spring-boot-plus:
  # 是否启用ansi控制台输出有颜色的字体
  enable-ansi: true
  # 是否启用验证码
  enable-verify-code: true
```
`enable-verify-code` 设置为 `true` 启用验证码验证

#### 两种方式获取验证码
> 验证码后台保存在Redis中，过期时间默认为5分钟

##### 方式一：
> 输出图片流到浏览器，验证码token输出到响应头

```text
http://localhost:8888/verificationCode/getImage
```
![验证码图片](https://spring-boot-plus.gitee.io/img/verifyCode.png)

```text
Response Headers
HTTP/1.1 200
verifyToken: 6515b4b798ce49e68b1e40f98ff8eb19
```

##### 方式二：
> 获取Base64编码图片和验证码token

```text
http://localhost:8888/verificationCode/getBase64Image
```

```json
{
  "code": 200,
  "msg": "操作成功",
  "success": true,
  "data": {
    "image": "data:image/png;base64,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",
    "verifyToken": "42ba8abde7bc47b2b1397b4d6676956a"
  },
  "time": "2019-11-01 22:40:37"
}
```

## 系统用户登陆

- POST请求，Content-Type: `application/json`
```text
http://127.0.0.1:8888/login
```

- 请求参数
```json
{
  "code": "验证码",
  "password": "123456",
  "username": "admin",
  "verifyToken": "验证码token"
}
```
#### 注意
- 如果没有启用验证码登陆，则只需传入`username`和`password`
- 前端应将密码加密后进行传输

### 登陆成功
> - 返回登陆用户信息：部门/角色/权限
> - 返回用户token

```json
{
  "code": 200,
  "msg": "登陆成功",
  "success": true,
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJzcHJpbmctYm9vdC1wbHVzIiwiZXhwIjoxNTcyNjIzMDE5LCJpYXQiOjE1NzI2MTk0MTksImp0aSI6IjdlZmVlM2UwMjc2MTRiYTc5M2I2YmYwZmE4NTgzYmUwIiwidXNlcm5hbWUiOiJhZG1pbiJ9.O3w7CNRqw_Miwp8MDzPND6w490c9Q7yFlKpFJK9ubSU",
    "loginSysUserVo": {
      "id": "1",
      "username": "admin",
      "nickname": "管理员",
      "gender": 1,
      "state": 1,
      "departmentId": "1",
      "departmentName": "管理部",
      "roleId": "1",
      "roleName": "管理员",
      "roleCode": "admin",
      "permissionCodes": [
        "sys:permission:codes",
        "system:management",
        "sys:department:update",
        "sys:department:page",
        "sys:role:management",
        "sys:permission:add",
        "sys:user:add",
        "sys:role:page",
        "sys:permission:page",
        "sys:department:delete",
        "sys:permission:management",
        "sys:user:delete",
        "sys:department:management",
        "sys:user:page",
        "sys:user:update",
        "sys:user:update:password",
        "sys:user:update:head",
        "sys:role:add",
        "sys:permission:menu:tree",
        "sys:department:info",
        "sys:permission:all:menu:list",
        "sys:permission:info",
        "sys:role:info",
        "sys:permission:all:menu:tree",
        "sys:permission:update",
        "sys:permission:menu:list",
        "sys:role:update",
        "sys:user:info",
        "sys:user:management",
        "sys:role:delete",
        "sys:permission:delete"
      ]
    }
  },
  "time": "2019-11-01 22:43:39"
}
```

- token默认失效时间为1个小时
- 设置JWT Token失效时间
```yaml
  ############################ JWT start #############################
  jwt:
    # 默认过期时间1小时，单位：秒
    expire-second: 3600
```
- 后台使用Redis缓存登陆用户信息
- redis key
```text
login:user:admin
```
##### 其它需要授权访问的接口，请求头需携带token

## 部门树形列表
- 部门可以设置为N级，后台使用递归将部门列表转换为树形列表

- SysDepartmentServiceImpl
```java
    @Override
    public List<SysDepartmentTreeVo> getAllDepartmentTree() {
        List<SysDepartment> sysDepartmentList = getAllDepartmentList();
        if (CollectionUtils.isEmpty(sysDepartmentList)) {
            throw new IllegalArgumentException("SysDepartment列表不能为空");
        }
        List<SysDepartmentTreeVo> list = SysDepartmentConvert.INSTANCE.listToTreeVoList(sysDepartmentList);
        List<SysDepartmentTreeVo> treeVos = new ArrayList<>();
        for (SysDepartmentTreeVo treeVo : list) {
            if (treeVo.getParentId() == null) {
                treeVos.add(findChildren(treeVo, list));
            }
        }
        return treeVos;
    }

    /**
     * 递归获取树形结果列表
     *
     * @param tree
     * @param list
     * @return
     */
    public SysDepartmentTreeVo findChildren(SysDepartmentTreeVo tree, List<SysDepartmentTreeVo> list) {
        for (SysDepartmentTreeVo vo : list) {
            if (tree.getId().equals(vo.getParentId())) {
                if (tree.getChildren() == null) {
                    tree.setChildren(new ArrayList<>());
                }
                tree.getChildren().add(findChildren(vo, list));
            }
        }
        return tree;
    }
```

- 前端JSON结构
```json
{
  "code": 200,
  "msg": "操作成功",
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "管理部",
      "parentId": null,
      "state": 1,
      "sort": 0,
      "remark": null,
      "version": 0,
      "createTime": "2019-10-25 09:46:49",
      "updateTime": null,
      "children": null
    },
    {
      "id": "2",
      "name": "技术部",
      "parentId": null,
      "state": 1,
      "sort": 0,
      "remark": null,
      "version": 0,
      "createTime": "2019-11-01 20:45:43",
      "updateTime": null,
      "children": [
        {
          "id": "20",
          "name": "前端开发部",
          "parentId": "2",
          "state": 1,
          "sort": 0,
          "remark": null,
          "version": 0,
          "createTime": "2019-11-01 20:48:38",
          "updateTime": null,
          "children": [
            {
              "id": "201",
              "name": "前端一组",
              "parentId": "20",
              "state": 1,
              "sort": 0,
              "remark": null,
              "version": 0,
              "createTime": "2019-11-01 20:48:38",
              "updateTime": null,
              "children": null
            },
            {
              "id": "202",
              "name": "前端二组",
              "parentId": "20",
              "state": 1,
              "sort": 0,
              "remark": null,
              "version": 0,
              "createTime": "2019-11-01 20:48:38",
              "updateTime": null,
              "children": null
            }
          ]
        },
        {
          "id": "21",
          "name": "后台开发部",
          "parentId": "2",
          "state": 1,
          "sort": 0,
          "remark": null,
          "version": 0,
          "createTime": "2019-11-01 20:48:38",
          "updateTime": null,
          "children": [
            {
              "id": "203",
              "name": "后台一组",
              "parentId": "21",
              "state": 1,
              "sort": 0,
              "remark": null,
              "version": 0,
              "createTime": "2019-11-01 20:48:38",
              "updateTime": null,
              "children": null
            },
            {
              "id": "204",
              "name": "后台二组",
              "parentId": "21",
              "state": 1,
              "sort": 0,
              "remark": null,
              "version": 0,
              "createTime": "2019-11-01 20:48:38",
              "updateTime": null,
              "children": null
            }
          ]
        },
        {
          "id": "22",
          "name": "测试部",
          "parentId": "2",
          "state": 1,
          "sort": 0,
          "remark": null,
          "version": 0,
          "createTime": "2019-11-01 20:48:38",
          "updateTime": null,
          "children": [
            {
              "id": "205",
              "name": "测试一组",
              "parentId": "22",
              "state": 1,
              "sort": 0,
              "remark": null,
              "version": 0,
              "createTime": "2019-11-01 20:48:38",
              "updateTime": null,
              "children": null
            }
          ]
        }
      ]
    }
  ],
  "time": "2019-11-01 22:54:16"
}
```

## 角色管理

### 设置角色权限
- 核心代码，删除角色权限，新增角色权限
- 求集合的差集
- SysRolePermissionServiceImpl
```java
    @Transactional(rollbackFor = Exception.class)
    @Override
    public boolean updateSysRole(UpdateSysRoleParam updateSysRoleParam) throws Exception {
        Long roleId = updateSysRoleParam.getId();
        List<Long> permissionIds = updateSysRoleParam.getPermissionIds();
        // 校验角色是否存在
        SysRole sysRole = getById(roleId);
        if (sysRole == null) {
            throw new BusinessException("该角色不存在");
        }
        // 校验权限列表是否存在
        if (!sysPermissionService.isExistsByPermissionIds(permissionIds)) {
            throw new BusinessException("权限列表id匹配失败");
        }

        // 修改角色
        sysRole.setName(updateSysRoleParam.getName())
                .setType(updateSysRoleParam.getType())
                .setRemark(updateSysRoleParam.getRemark())
                .setState(updateSysRoleParam.getState())
                .setUpdateTime(new Date());
        boolean updateResult = updateById(sysRole);
        if (!updateResult) {
            throw new DaoException("修改系统角色失败");
        }

        // 获取之前的权限id集合
        List<Long> beforeList = sysRolePermissionService.getPermissionIdsByRoleId(roleId);
        // 差集计算
        // before：1,2,3,4,5,6
        // after： 1,2,3,4,7,8
        // 删除5,6 新增7,8
        // 此处真实删除，去掉deleted字段的@TableLogic注解
        Set<Long> beforeSet = new HashSet<>(beforeList);
        Set<Long> afterSet = new HashSet<>(permissionIds);
        SetUtils.SetView deleteSet = SetUtils.difference(beforeSet, afterSet);
        SetUtils.SetView addSet = SetUtils.difference(afterSet, beforeSet);
        log.debug("deleteSet = " + deleteSet);
        log.debug("addSet = " + addSet);

        // 删除权限关联
        UpdateWrapper updateWrapper = new UpdateWrapper();
        updateWrapper.eq("role_id",roleId);
        updateWrapper.in("permission_id",deleteSet);
        boolean deleteResult = sysRolePermissionService.remove(updateWrapper);
        if (!deleteResult) {
            throw new DaoException("删除角色权限关系失败");
        }
        // 新增权限关联
        boolean addResult = sysRolePermissionService.saveSysRolePermissionBatch(roleId, addSet);
        if (!addResult) {
            throw new DaoException("新增角色权限关系失败");
        }
        return true;
    }
```


## 权限管理

### 权限树形列表
- 用户设置角色权限时，选择权限菜单
- 权限分为菜单和功能权限
- 后台获取三层权限树
```java
    @Override
    public List<SysPermissionTreeVo> getAllMenuTree() throws Exception {
        List<SysPermission> list = getAllMenuList();
        // 转换成树形菜单
        List<SysPermissionTreeVo> treeVos = convertSysPermissionTreeVoList(list);
        return treeVos;
    }

    @Override
    public List<SysPermissionTreeVo> convertSysPermissionTreeVoList(List<SysPermission> list) {
        if (CollectionUtils.isEmpty(list)) {
            throw new IllegalArgumentException("SysPermission列表不能为空");
        }
        // 按level分组获取map
        Map<Integer, List<SysPermission>> map = list.stream().collect(Collectors.groupingBy(SysPermission::getLevel));
        List<SysPermissionTreeVo> treeVos = new ArrayList<>();
        // 循环获取三级菜单树形集合
        for (SysPermission one : map.get(LevelEnum.ONE.getKey())) {
            SysPermissionTreeVo oneVo = SysPermissionConvert.INSTANCE.permissionToTreeVo(one);
            Long oneParentId = oneVo.getParentId();
            if (oneParentId == null || oneParentId == 0) {
                treeVos.add(oneVo);
            }
            List<SysPermission> twoList = map.get(LevelEnum.TWO.getKey());
            if (CollectionUtils.isNotEmpty(twoList)) {
                for (SysPermission two : twoList) {
                    SysPermissionTreeVo twoVo = SysPermissionConvert.INSTANCE.permissionToTreeVo(two);
                    if (two.getParentId().equals(one.getId())) {
                        oneVo.getChildren().add(twoVo);
                    }
                    List<SysPermission> threeList = map.get(LevelEnum.THREE.getKey());
                    if (CollectionUtils.isNotEmpty(threeList)) {
                        for (SysPermission three : threeList) {
                            if (three.getParentId().equals(two.getId())) {
                                SysPermissionTreeVo threeVo = SysPermissionConvert.INSTANCE.permissionToTreeVo(three);
                                twoVo.getChildren().add(threeVo);
                            }
                        }
                    }
                }
            }

        }
        return treeVos;
    }
```

- 前端JSON格式
```text
http://127.0.0.1:8888/sysPermission/getAllMenuTree
```

### 权限编码列表
> 返回当前用户所有的权限编码，方便前端展示导航菜单和功能按钮

```text
http://127.0.0.1:8888/sysPermission/getPermissionCodesByUserId/1
```

```json
{
  "code": 200,
  "msg": "操作成功",
  "success": true,
  "data": [
    "system:management",
    "system:management",
    "sys:user:management",
    "sys:user:management",
    "sys:role:management",
    "sys:permission:management",
    "sys:department:management",
    "sys:user:add",
    "sys:user:add",
    "sys:user:update",
    "sys:user:update",
    "sys:user:delete",
    "sys:user:delete",
    "sys:user:info",
    "sys:user:info",
    "sys:user:page",
    "sys:user:page",
    "sys:user:update:password",
    "sys:user:update:head",
    "sys:role:add",
    "sys:role:update",
    "sys:role:delete",
    "sys:role:info",
    "sys:role:page",
    "sys:permission:add",
    "sys:permission:update",
    "sys:permission:delete",
    "sys:permission:info",
    "sys:permission:page",
    "sys:permission:all:menu:list",
    "sys:permission:all:menu:tree",
    "sys:permission:menu:list",
    "sys:permission:menu:tree",
    "sys:permission:codes",
    "sys:department:update",
    "sys:department:delete",
    "sys:department:info",
    "sys:department:page"
  ],
  "time": "2019-11-02 00:32:17"
}
```

### 注意
- 使用Shiro注解@RequiresPermissions进行controller方法权限过滤
```java
@RequiresPermissions("sys:department:add")
```

- 生成代码时，可配置生成RequiresPermissions注解
```java
        // 是否生成Shiro RequiresPermissions注解
        codeGenerator.setRequiresPermissions(true);
```

- 生成或新增的controller方法，需要进行权限管理，需要到sys_permission表新增权限编码记录，并给相应角色赋予权限

