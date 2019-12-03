import { httpPost } from './request/index'

// 活动查询列表
export function getActivityList (data) {
  return httpPost('/activity/list', data)
}

// 查看
export function getActivityDetails (data) {
  return httpPost('/activity/getActivityInfo', data)
}

