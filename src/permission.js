import Vue from 'vue'
import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN, MENU_LIST } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false })

const whiteList = ['login', 'homePage']

router.beforeEach((to, from, next) => {
  window.__axiosPromiseArr.length > 0 && window.__axiosPromiseArr.forEach(item => {
    item.cancel()
  })
  window.__axiosPromiseArr = []
  NProgress.start() // start progress bar
  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      const has = store.getters.has
      if (!has) {
        const menus = Vue.ls.get(MENU_LIST)
        store
          .dispatch('GenerateRoutes', menus)
          .then(res => {
            router.addRoutes(store.getters.addRouters)
            const redirect = decodeURIComponent(to.path)
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重新登录'
            })
            next('/login')
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
