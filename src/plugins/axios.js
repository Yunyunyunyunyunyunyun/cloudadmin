'use strict'

import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let baseURL = 'http://10.168.1.158/cloudApi'
const env = process.env.NODE_ENV || 'development'
const api = process.env.VUE_APP_FLAG || 'test'

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
  // baseURL = 'http://10.168.1.151:9095/cloudApi'
}

const config = {
  baseURL: baseURL,
  timeout: 1000 * 60 * 3 // Timeout
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = Vue.ls.get(ACCESS_TOKEN)
    config.headers['token'] = token

    config.cancelToken = new axios.CancelToken(cancel => {
      window.__axiosPromiseArr.push({ cancel })
    })
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (
      response.headers['content-type'] ===
      'application/vnd.ms-excel;charset=UTF-8'
    ) {
      // 是否为导出
      return Promise.resolve(response)
    }
    const { code } = response.data
    if (code === 0) {
      return Promise.resolve(response)
    } else if (code === 20000 || code === 20001 || code === 20002) {
      // 20000：用户token为空 20001：用户信息为空 20002：登录失效，请重新登录
      router.replace({
        path: '/login'
      })
      return Promise.reject(response.data.msg)
    } else {
      if (response.data.msg) {
        return Promise.reject(response.data.msg)
      } else if (
        response.headers['content-type'] ===
        'application/vnd.ms-excel;charset=UTF-8'
      ) {
        return Promise.reject('导出失败') // 仅限导出用
      }
    }
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
