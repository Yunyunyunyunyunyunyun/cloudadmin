import notification from 'ant-design-vue/es/notification'
/**
* post方法，对应post请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
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

export function httpExport (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: params,
      responseType: 'blob'
    })
      .then(res => {
        resolve(res)
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
