import { httpPost } from './request/index'

// 会员列表查询
export function getMemberList (data) {
  return httpPost('/memberUser/getList', data)
}

// 会员详情
export function getMemberInfo (data) {
  return httpPost('/memberUser/getDetail', data)
}

// 锁定用户
export function changeLock (data) {
  return httpPost('/memberUser/updateLock', data)
}

// 余额记录
export function getBalance (data) {
  return httpPost('/memberUser/getBalanceRecord', data)
}

// 环保值记录
export function getEnvironmental (data) {
  return httpPost('/memberUser/getEnvironmentalRecord', data)
}

// 吐币记录
export function getWithdraw (data) {
  return httpPost('/memberUser/getWithdrawRecode', data)
}

// 投递记录
export function getDelivery (data) {
  return httpPost('/memberUser/getDeliveryRecode', data)
}

// 预约记录
export function getFindOrder (data) {
  return httpPost('/memberUser/findOrderListByApplyId', data)
}

// 兑换记录
export function getExchange (data) {
  return httpPost('/memberUser/getExchangeRecord', data)
}
