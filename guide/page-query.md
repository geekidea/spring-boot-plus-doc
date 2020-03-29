---
sidebarDepth: 1
title: 
meta:
  - name: keywords
    content: page,query,pagequery,sort,springbootplus,spring-boot-plus,java
  - name: description
    content: spring-boot-plus自定义分页查询及排序
---

# 自定义分页查询及排序

## keyword字段使用
> POST http://127.0.0.1:8888/sysUser/getPageList

- 请求参数
```json
{
    "keyword": "adm"
}
```

- SysUserQueryParam.java
> 只使用keyword时，查询参数对象可为空，QueryParam.java父类中有`keyword`字段

```java
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "SysUserQueryParam对象", description = "系统用户查询参数")
public class SysUserQueryParam extends OrderQueryParam {

}
```

- SysUserMapper.xml
> xml中使用`param`获取`keyword`，需要模糊查询的字段需要自定义

```xml
<select id="getSysUserPageList" resultType="io.geekidea.springbootplus.system.vo.SysUserQueryVo">
    select
    <include refid="Base_Column_List"/>
    from sys_user
    where deleted = 0
    <if test="param.keyword != null and param.keyword != ''">
        and (
            username like concat('%', #{param.keyword} ,'%') or
            nickname like concat('%', #{param.keyword} ,'%')
            )
    </if>
</select>
```

- 响应结果
```json
{
  "code": 200,
  "msg": "操作成功",
  "success": true,
  "data": {
    "total": "1",
    "records": [
      {
        "id": "1",
        "username": "admin",
        "nickname": "管理员",
        "phone": "15888889900",
        "gender": 1,
        "head": "http://localhost:8888/api/resource/201908201013068.png",
        "remark": "Administrator Account",
        "state": 1,
        "departmentId": "1",
        "roleId": "1",
        "deleted": 0,
        "version": 1,
        "createTime": "2020-02-26 00:00:00",
        "updateTime": "2019-10-27 23:32:29"
      }
    ]
  },
  "time": "2020-03-01 21:39:09"
}
```

- SQL查询语句
```sql
==>  Preparing: SELECT COUNT(1) FROM sys_user WHERE deleted = 0 AND (username LIKE concat('%', ?, '%') OR nickname LIKE concat('%', ?, '%')) 
==> Parameters: adm(String), adm(String)
<==    Columns: COUNT(1)
<==        Row: 1
==>  Preparing: SELECT id, username, nickname, phone, gender, head, remark, state, department_id, role_id, deleted, version, create_time, update_time FROM sys_user WHERE deleted = 0 AND (username LIKE concat('%', ?, '%') OR nickname LIKE concat('%', ?, '%')) ORDER BY create_time DESC LIMIT ?,? 
==> Parameters: adm(String), adm(String), 0(Long), 10(Long)
<==    Columns: id, username, nickname, phone, gender, head, remark, state, department_id, role_id, deleted, version, create_time, update_time
<==        Row: 1, admin, 管理员, 15888889900, 1, http://localhost:8888/api/resource/201908201013068.png, Administrator Account, 1, 1, 1, 0, 1, 2020-02-26 00:00:00.0, 2019-10-27 23:32:29.0
<==      Total: 1
```

- 重点查询条件语句
```sql
where deleted = 0
    and (
        username like concat('%', ? ,'%') or
        nickname like concat('%', ? ,'%')
        )
```


## 如何使用自定义查询条件

- SysUserQueryParam.java
```java
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@ApiModel(value = "SysUserQueryParam对象", description = "系统用户查询参数")
public class SysUserQueryParam extends OrderQueryParam {

    private static final long serialVersionUID = -1115907077988380787L;

    @ApiModelProperty("用户名")
    private String username;

    @ApiModelProperty("昵称")
    private String nickname;

    @ApiModelProperty("状态，0：禁用，1：启用，2：锁定")
    private Integer state;

    @ApiModelProperty("创建时间开始")
    private Date createTimeStart;

    @ApiModelProperty("创建时间结束")
    private Date createTimeEnd;

}
```

- 请求参数
```json
{
   "username":  "adm",
   "state":  1,
  "createTimeStart": "2020-02-26",
  "createTimeEnd": "2020-02-27"
}
```

- SysUserMapper.xml
```xml
<select id="getSysUserPageList" resultType="io.geekidea.springbootplus.system.vo.SysUserQueryVo">
    select
    <include refid="Base_Column_List"/>
    from sys_user
    where deleted = 0
    <if test="param.keyword != null and param.keyword != ''">
        and (
            username like concat('%', #{param.keyword} ,'%') or
            nickname like concat('%', #{param.keyword} ,'%')
            )
    </if>
    <if test="param.username != null and param.username != ''">
        and username like concat('%', #{param.username} ,'%')
    </if>
    <if test="param.nickname != null and param.nickname != ''">
        and nickname like concat('%', #{param.nickname} ,'%')
    </if>
    <if test="param.state != null">
        and state = #{param.state}
    </if>
    <if test="param.createTimeStart != null">
        and date_format(create_time,'%Y-%m-%d') >= date_format(#{param.createTimeStart},'%Y-%m-%d')
    </if>
    <if test="param.createTimeEnd != null">
        and date_format(create_time,'%Y-%m-%d') &lt;= date_format(#{param.createTimeEnd},'%Y-%m-%d')
    </if>
</select>
```

- 响应结果
```json
{
  "code": 200,
  "msg": "操作成功",
  "success": true,
  "data": {
    "total": "1",
    "records": [
      {
        "id": "1",
        "username": "admin",
        "nickname": "管理员",
        "phone": "15888889900",
        "gender": 1,
        "head": "http://localhost:8888/api/resource/201908201013068.png",
        "remark": "Administrator Account",
        "state": 1,
        "departmentId": "1",
        "roleId": "1",
        "deleted": 0,
        "version": 1,
        "createTime": "2020-02-26 00:00:00",
        "updateTime": "2019-10-27 23:32:29"
      }
    ]
  },
  "time": "2020-03-01 21:43:49"
}
```

- SQL语句
```sql
==>  Preparing: SELECT COUNT(1) FROM sys_user WHERE deleted = 0 AND username LIKE concat('%', ?, '%') AND state = ? AND date_format(create_time, '%Y-%m-%d') >= date_format(?, '%Y-%m-%d') AND date_format(create_time, '%Y-%m-%d') <= date_format(?, '%Y-%m-%d') 
==> Parameters: adm(String), 1(Integer), 2020-02-26 00:00:00.0(Timestamp), 2020-02-27 00:00:00.0(Timestamp)
<==    Columns: COUNT(1)
<==        Row: 1
==>  Preparing: SELECT id, username, nickname, phone, gender, head, remark, state, department_id, role_id, deleted, version, create_time, update_time FROM sys_user WHERE deleted = 0 AND username LIKE concat('%', ?, '%') AND state = ? AND date_format(create_time, '%Y-%m-%d') >= date_format(?, '%Y-%m-%d') AND date_format(create_time, '%Y-%m-%d') <= date_format(?, '%Y-%m-%d') ORDER BY create_time DESC LIMIT ?,? 
==> Parameters: adm(String), 1(Integer), 2020-02-26 00:00:00.0(Timestamp), 2020-02-27 00:00:00.0(Timestamp), 0(Long), 10(Long)
<==    Columns: id, username, nickname, phone, gender, head, remark, state, department_id, role_id, deleted, version, create_time, update_time
<==        Row: 1, admin, 管理员, 15888889900, 1, http://localhost:8888/api/resource/201908201013068.png, Administrator Account, 1, 1, 1, 0, 1, 2020-02-26 00:00:00.0, 2019-10-27 23:32:29.0
<==      Total: 1
```

- 重点查询条件语句
```sql
where deleted = 0
    and username like concat('%', ? ,'%')
    and state = ?
    and date_format(create_time,'%Y-%m-%d') >= date_format(?,'%Y-%m-%d')
    and date_format(create_time,'%Y-%m-%d') <= date_format(?,'%Y-%m-%d')
```

## 如何使用排序
> - asc:true 升序，asc:false 降序
> - column：列名，目前时对应数据库列名称！！！
> 如需要前端传属性名称，后端获取对应的列名称，请看下面的方法！！！

```json
{
  "orders": [
    {
      "asc": true,
      "column": "update_time"
    }
  ]
}
```

## 根据实体类中的属性名称，获取表对应的列名称
> 分页排序可使用这种方法，前端传属性名称，后端获取列名称

#### BaseServiceImpl.java 增加处理代码
```java
/**
 * @author geekidea
 * @date 2018-11-08
 */
public abstract class BaseServiceImpl<M extends BaseMapper<T>, T> extends ServiceImpl<M, T> implements BaseService<T> {

    private Class<?> entityClass;

    {
        Class<?> clazz = this.getClass();
        Type type = clazz.getGenericSuperclass();
        if (type instanceof ParameterizedType){
            Type[] p = ((ParameterizedType) type).getActualTypeArguments();  //取得所有泛型
            this.entityClass= (Class<T>) p[1];
        }
    }


    protected Page setPageParam(QueryParam queryParam) {
        return setPageParam(queryParam,null);
    }

    protected Page setPageParam(QueryParam queryParam, OrderItem defaultOrder) {
        Page page = new Page();
        // 设置当前页码
        page.setCurrent(queryParam.getCurrent());
        // 设置页大小
        page.setSize(queryParam.getSize());
        /**
         * 如果是queryParam是OrderQueryParam，并且不为空，则使用前端排序
         * 否则使用默认排序
         */
        if (queryParam instanceof OrderQueryParam){
            OrderQueryParam orderQueryParam = (OrderQueryParam) queryParam;
            List<OrderItem> orderItems = orderQueryParam.getOrders();
            if (CollectionUtils.isEmpty(orderItems)){
                page.setOrders(Arrays.asList(defaultOrder));
            }else{
                convertOrderItem(orderItems);
                page.setOrders(orderItems);
            }
        }else{
            page.setOrders(Arrays.asList(defaultOrder));
        }

        return page;
    }

    protected void convertOrderItem(List<OrderItem> orderItems){
        if (CollectionUtils.isEmpty(orderItems)){
            return;
        }
        orderItems.forEach(orderItem -> {
            String column = orderItem.getColumn();
            orderItem.setColumn(PropertyColumnUtil.getColumn(entityClass,column));
        });
    }

}

```

- 重点代码
> 获取实体类泛型类型
```java

    private Class<?> entityClass;

    {
        Class<?> clazz = this.getClass();
        Type type = clazz.getGenericSuperclass();
        if (type instanceof ParameterizedType){
            Type[] p = ((ParameterizedType) type).getActualTypeArguments();  //取得所有泛型
            this.entityClass= (Class<T>) p[1];
        }
    }
```

- 将属性名称转换成列名称
```java
    protected void convertOrderItem(List<OrderItem> orderItems){
        if (CollectionUtils.isEmpty(orderItems)){
            return;
        }
        orderItems.forEach(orderItem -> {
            String column = orderItem.getColumn();
            orderItem.setColumn(PropertyColumnUtil.getColumn(entityClass,column));
        });
    }
```

#### 新增属性列名获取工具类
```java

package io.geekidea.springbootplus.util;

import com.baomidou.mybatisplus.core.metadata.TableFieldInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfoHelper;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * @author geekidea
 * @date 2020/3/2
 **/
public class PropertyColumnUtil {

    private static Map<Class<?>, Map<String, String>> cacheMap = new ConcurrentHashMap<>();

    public static Map<Class<?>, Map<String, String>> getMap() {
        return cacheMap;
    }

    /**
     * 根据实体class，从mybatisplus中获取对应Table的属性列名Map
     *
     * @param clazz
     * @return
     */
    private static Map<String, String> getTableFieldMap(Class<?> clazz) {
        TableInfo tableInfo = TableInfoHelper.getTableInfo(clazz);
        if (tableInfo == null) {
            return null;
        }
        List<TableFieldInfo> tableFieldInfos = tableInfo.getFieldList();
        if (CollectionUtils.isEmpty(tableFieldInfos)) {
            return null;
        }
        Map<String, String> cacheMap = tableFieldInfos.stream().collect(Collectors.toMap(TableFieldInfo::getProperty, TableFieldInfo::getColumn));
        return cacheMap;
    }

    /**
     * 从本地缓存中获取属性列名map
     *
     * @param clazz
     * @return
     */
    public static Map<String, String> getPropertyColumnMap(Class<?> clazz) {
        Map<String, String> propertyColumnMap = cacheMap.get(clazz);
        if (MapUtils.isEmpty(propertyColumnMap)) {
            // 从TableInfo中获取，并缓存到内存map中
            Map<String, String> fieldMap = getTableFieldMap(clazz);
            if (MapUtils.isEmpty(fieldMap)) {
                return null;
            } else {
                cacheMap.put(clazz, fieldMap);
                return fieldMap;
            }
        } else {
            return propertyColumnMap;
        }
    }

    /**
     * 通过实体class类型和属性名称，从缓存中获取对应的列名
     *
     * @param clazz
     * @param property
     * @return
     */
    public static String getColumn(Class<?> clazz, String property) {
        Map<String, String> propertyColumnMap = getPropertyColumnMap(clazz);
        if (MapUtils.isEmpty(propertyColumnMap)) {
            throw new IllegalArgumentException("没有找到对应的实体映射对象");
        }
        String column = propertyColumnMap.get(property);
        if (StringUtils.isEmpty(column)) {
            throw new IllegalArgumentException("没有找到对应的列");
        }
        return column;
    }

}

```

#### 前端排序参数
```json
{
  "orders": [
    {
      "asc": true,
      "column": "updateTime"
    }
  ]
}
```

#### 后台转换后
```text
OrderItem(column=update_time, asc=true)
```

```text
ORDER BY update_time LIMIT ?,? 
```
