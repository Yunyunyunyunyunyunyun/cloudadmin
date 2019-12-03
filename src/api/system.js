import { httpPost } from './request/index'

//  角色配置列表查询
export function roleList (data) {
  return httpPost('/cloud/cus/user/getRoleList', data)
}

// 角色配置中关联用户查看
export function userList (data) {
  return httpPost('/cloud/cus/user/getUsers', data)
}

// 角色配置删除
export function delRole (data) {
  return httpPost('/cloud/cus/user/delRole', data)
}

// 角色配置菜单权限查询
export function menuList (data) {
  return httpPost('/cloud/cus/user/getRoleMenuList', data)
}

// 角色配置中的查看
export function roleInfo (data) {
  return httpPost('/cloud/cus/user/getRoleInfo', data)
}

// 角色配置添加 编辑
export function addRole (data) {
  return httpPost('/cloud/cus/user/addRoleAndMenu', data)
}

// 账户配置查询列表
export function accountList (data) {
  return httpPost('/cloud/cus/user/list', data)
}

// 账号配置新增/编辑提交
export function addUser (data) {
  return httpPost('/cloud/cus/user/addEditUser', data)
}

//  账号配置新增中账号获取省市信息
export function cityInfo (data) {
  return httpPost('/cloud/cus/user/getProvinceCityInfo')
}

// 账号配置新增中的商户名称
export function merchantList (data) {
  return httpPost('/cloud/cus/user/getMerChantInfo', data)
}

export function userRoleList (data) {
  return httpPost('/cloud/cus/user/getRelationRole', data)
}

// 账号配置新增中的设备管理查询
export function areaInfo (data) {
  return httpPost('/cloud/cus/user/getAreaInfoList', data)
}

// 日志
export function logList (data) {
  return httpPost('/sys/log/list', data)
}

// 账号配置列表中的管理设备查询
export function productList (id) {
  const data = {
    cuUserId: id
  }
  return httpPost('/cloud/cus/user/getProductListInfo', data)
}

// 删除用户
export function delUser (id) {
  const data = {
    id
  }
  return httpPost('/cloud/cus/user/delUser', data)
}

export function userDetail (data) {
  return httpPost('/cloud/cus/user/getUserInfo', data)
}
