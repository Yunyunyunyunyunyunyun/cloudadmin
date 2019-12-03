import { httpPost } from './request/index'

// 商户列表查询
export function getMerchantList (data) {
  return httpPost('/merchant/info/list', data)
}

// 查询商户的客户经理
export function getManagerList (data) {
  return httpPost('/merchant/info/listManager', data)
}

// 查询商户信息
export function getMerchantInfo (data) {
  return httpPost('/merchant/info/get', data)
}

// 添加商户
export function addMerchant (data) {
  return httpPost('/merchant/info/add', data)
}

// 编辑商户
export function editMerchant (data) {
  return httpPost('/merchant/info/edit', data)
}

// 环保值记录
export function getEnviList (data) {
  return httpPost('/merchant/info/listEnvi', data)
}

// 余额记录
export function getInteList (data) {
  return httpPost('/merchant/info/listInte', data)
}

// 删除
export function delMerchant (data) {
  return httpPost('/merchant/info/del', data)
}
