import { httpPost } from './request/index'
import bossHost from '@/config/bossHost'

// 获取省市区
export function getAreaList (data) {
  return httpPost('/login/user/areaList', data)
}

// 我要体验
export function addCustomer (data) {
  return httpPost(`${bossHost.experienceHost}/customerInfo/save`, data)
}

// 删除图片
export function delPicture (data) {
  return httpPost('/building/adv/delImage', data)
}
