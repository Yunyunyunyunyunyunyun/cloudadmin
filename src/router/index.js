import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

