import { httpPost } from './request/index'

// 日志
export function userInfo (data = {}) {
  return httpPost('/indexPage/getUserInfo', data)
}

// 常用功能列表
export function featuresList (data = {}) {
  return httpPost('/indexPage/indexPageMenu', data)
}

// 设置后的功能列表
export function settingFeaturesList (data = {}) {
  return httpPost('/indexPage/indexCommon', data)
}

// 新增功能
export function addFeatures (data) {
  return httpPost('/indexPage/addIndexCom', data)
}

// 代办事项
export function waitList (data = {}) {
  return httpPost('/indexPage/toDoItem', data)
}

// 获取消息列表
export function messageList (data) {
  return httpPost('/indexPage/getMessage', data)
}

// 消息详情
export function msgDetail (id) {
  const data = {
    id
  }
  return httpPost('/indexPage/msgDetail', data)
}

// 新增/编辑备忘录
export function addMemo (data) {
  return httpPost('/indexPage/editWorkMemo', data)
}

// 备忘录列表
export function memoList (data = {}) {
  return httpPost('/indexPage/getWorkMemo', data)
}

// 检查用户token是否过期
export function checkToken (data = {}) {
  return httpPost('/login/user/checkToken', data)
}
