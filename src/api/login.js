import { httpPost } from './request/index'

export function login (data) {
  return httpPost('/login/user/login', data)
}

export function logout (data) {
  return httpPost('/login/user/loginOut', data)
}

// 发送短信验证码
export function getSmsCaptcha (data) {
  return httpPost('/login/user/code', data)
}

// 校验短信验证码
export function checkCode (data) {
  return httpPost('/login/user/checkCode', data)
}

// 重置密码
export function resetPwd (data) {
  return httpPost('/login/user/resetPwd', data)
}

// 修改密码
export function updatePwd (data) {
  return httpPost('/login/user/updatePwd', data)
}

// 获取用户信息
export function getUserInfo () {
  return httpPost('/login/user/getUserInfo')
}
