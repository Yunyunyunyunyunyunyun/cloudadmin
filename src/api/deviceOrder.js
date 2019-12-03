import { httpPost } from './request/index'

// 投递订单记录
export function orderList (data) {
  return httpPost('/data/deliveryRecord', data)
}
