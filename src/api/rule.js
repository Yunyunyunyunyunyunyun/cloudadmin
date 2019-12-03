import { httpPost } from './request/index'

// 查询规则信息
export function getRule (data) {
  return httpPost('/operate/rule/getRules', data)
}

// 编辑运营规则
export function editRule (data) {
  return httpPost('/operate/rule/edit', data)
}

// 回收价格配置-查询
export function getPriceList (data) {
  return httpPost('/price/rule/list', data)
}

// 查询回收品类
export function getCategoryList (data) {
  return httpPost('/price/rule/listCategory', data)
}

// 查看规则详情
export function getRuleInfo (data) {
  return httpPost('/price/rule/getRulesInfo', data)
}

// 添加规则
export function addRule (data) {
  return httpPost('/price/rule/add', data)
}

// 编辑规则
export function editPriceRule (data) {
  return httpPost('/price/rule/edit', data)
}

// 客服电话配置-查询
export function getPhoneList (data) {
  return httpPost('/cus/area/phone/list', data)
}

// 客服电话配置-编辑
export function editPhone (data) {
  return httpPost('/cus/area/phone/edit', data)
}

// 客服电话配置-添加
export function addPhone (data) {
  return httpPost('/cus/area/phone/add', data)
}

// 客服电话配置-删除
export function delPhone (data) {
  return httpPost('/cus/area/phone/del', data)
}

// 客服电话配置-查看
export function viewPhone (data) {
  return httpPost('/cus/area/phone/getInfo', data)
}
