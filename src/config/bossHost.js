const env = process.env.NODE_ENV || 'development'
const api = process.env.VUE_APP_FLAG || 'test'
let baseURL = 'http://10.168.1.158/bossApi'

if (env === 'production') {
  // 正式环境配置
  if (api === 'pro') {
    // 生产环境地址
    baseURL = 'http://boss.mymrmao.com/bossApi'
  }
  if (api === 'test158') {
    // 158测试环境
    baseURL = 'http://10.168.1.158/bossApi'
  }
  if (api === 'test') {
    // 203测试环境
    baseURL = 'http://10.168.2.203:9093/bossApi'
  }
} else {
  // 开发环境地址
  baseURL = 'http://10.168.1.158/bossApi'
}

export default {
  // 我要体验地址
  experienceHost: baseURL
}
