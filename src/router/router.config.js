// 全局路由(无需嵌套上左右整体布局)
const constantRouterMap = [
  {
    path: '/',
    name: 'homePage',
    meta: {
      title: '首页'
    },
    component: () => import('../views/common/homePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/common/login.vue')
  }
]

export { constantRouterMap }
