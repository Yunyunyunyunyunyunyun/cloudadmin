const env = process.env.NODE_ENV || 'development'
const api = process.env.VUE_APP_FLAG || 'test'
let baseURL = 'http://10.168.1.158/bossApi'

if (env === 'production') {
  // 正式环境配置
  if (api === 'pro') {
    // 生产环境地址
    baseURL = 'http://cloud.mymrmao.com/cloudApi'
  }
  if (api === 'test158') {
    // 158测试环境
    baseURL = 'http://10.168.1.158/cloudApi'
  }
  if (api === 'test') {
    // 测试专属的测试环境
    baseURL = 'http://10.168.2.204:9095/cloudApi'
  }
} else {
  // 开发环境地址
  baseURL = 'http://10.168.1.158/cloudApi'
}

export default {
  // 上传图片地址
  uploadImgHost: baseURL,
  // 上传excel
  uploadExcelHost: baseURL
}
