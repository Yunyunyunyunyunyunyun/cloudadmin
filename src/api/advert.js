import { httpGet, httpPost } from './request/index'

// 获取操作人列表
export function getUser (data) {
  return httpGet('/building/adv/getUserList', data)
}

// 查看楼层广告列表
export function getAdvList (data) {
  return httpPost('/building/adv/getBuildingAdvList', data)
}

// 添加广告
export function addAdv (data) {
  return httpPost('/building/adv/createAdv', data)
}

// 发布或重新发布广告
export function publishAdv (data) {
  return httpPost('/building/adv/publish', data)
}

// 下线广告
export function offLineAdv (data) {
  return httpPost('/building/adv/offLine', data)
}

// 更新广告信息
export function editAdv (data) {
  return httpPost('/building/adv/updateAdv', data)
}

// 删除广告
export function deleteAdv (data) {
  return httpPost('/building/adv/delAdv', data)
}

// 获取广告详情
export function getAdvDetails (data) {
  return httpGet('/building/adv/getAdvInfo', data)
}
