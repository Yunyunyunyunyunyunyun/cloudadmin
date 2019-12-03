const env = process.env.NODE_ENV || 'development'
const api = process.env.VUE_APP_FLAG || 'test'

const MQTT_USERNAME = 'admin'

let MQTT_SERVICE = 'ws://10.168.1.105:8083/mqtt'
let MQTT_PASSWORD = 'maosir@qwer_201903071716'

if (env === 'production') {
  if (api === 'pro') {
    // 生产环境地址
    MQTT_SERVICE = 'ws://47.98.243.24:8083/mqtt'
    MQTT_PASSWORD = 'maosir@qwer_201903071716'
  }
  if (api === 'test158') {
    // 158测试环境
    MQTT_SERVICE = 'ws://10.168.1.105:8083/mqtt'
    MQTT_PASSWORD = 'maosir@qwer_201903071716'
  }
  if (api === 'test') {
    // 测试专属的测试环境
    MQTT_SERVICE = 'ws://47.98.243.24:8083/mqtt'
    MQTT_PASSWORD = 'maosir@qwer_201903071716'
  }
} else {
  // 测试
  MQTT_SERVICE = 'ws://10.168.1.105:8083/mqtt'
  MQTT_PASSWORD = 'maosir@qwer_201903071716'
}

export { MQTT_SERVICE, MQTT_PASSWORD, MQTT_USERNAME }
