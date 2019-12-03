import { httpPost } from './request/index'

// 审核看板数据
export function getBoardData (data) {
  return httpPost('/recycle/getData', data)
}

// 审核申请列表
export function getRecycle (data) {
  return httpPost('/recycle/getRecycleList', data)
}

// 单个回收人员查看
export function getUserDetails (data) {
  return httpPost('/recycle/getUserInfo', data)
}

// 审核
export function auditDetails (data) {
  return httpPost('/recycle/auditInfo', data)
}

// 回收人员列表
export function getRecycleUser (data) {
  return httpPost('/recycle/recycleUserList', data)
}

// 额度提升降低
export function upDownMoney (data) {
  return httpPost('/recycle/upMoney', data)
}

// 回收人员查看详情(基础信息、账户数据、车辆信息)
export function getRecycleUserDetails (data) {
  return httpPost('/recycle/getRecycleUserInfo', data)
}

// 回收人员查看详情(行为记录列表)
export function getRecycleRecord (data) {
  return httpPost('/recycle/recycleRecord', data)
}

// 编辑/禁用/启用
export function editRecycle (data) {
  return httpPost('/recycle/editRecycleUserInfo', data)
}

