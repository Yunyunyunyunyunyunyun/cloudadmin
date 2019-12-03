import notification from 'ant-design-vue/es/notification'

/**
 *
 * GET 方法
 * @export function (param) {  }
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function httpGet (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.warn(err, 'WARN')
        reject(err)
      })
  })
}

/**
 *
 * POST 方法
 * @export function (param) {  }
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function httpPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        if (err.__CANCEL__) {
          return
        }
        notification.error({
          title: '错误',
          message: err
        })
        reject(err)
      })
  })
}
