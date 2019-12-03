import { asyncRouterMap } from '@/router/async-router/index'
import { constantRouterMap } from '@/router/router.config'
import main from '@/components/layout/index.vue'

const mainRoutes = {
  path: '/main',
  component: main,
  redirect: { path: '/home' },
  meta: { title: '主入口整体布局' },
  children: []
}

/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch (permission, asyncRouter) {
  const routers = []
  // 创建路由
  function createRouter (permission) {
    // 根据路径匹配到的router对象添加到routers中即可
    permission.forEach(item => {
      if (item.children && item.children.length) {
        createRouter(item.children)
      }
      const path = item.routeUrl || ''
      // 循环异步路由，将符合权限列表的路由加入到routers中
      asyncRouter.find(s => {
        if (s.path === path) {
          s.meta.title = item.name
          s.meta.pId = item.pId
          s.meta.menuId = item.id
          routers.push(s)
        }
      })
    })
  }

  createRouter(permission)
  return routers
}

const permission = {
  state: {
    has: false,
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
    },
    SET_HAS: (state, flag) => {
      state.has = flag
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const accessedRouters = routerMatch(data, asyncRouterMap)
        accessedRouters.push({
          path: '/error',
          name: 'error',
          component: () => import('@/views/common/error.vue')
        })
        mainRoutes.children = accessedRouters
        const routers = [
          mainRoutes,
          { path: '*', redirect: { name: 'error' }}
        ]
        commit('SET_ROUTERS', routers)
        commit('SET_HAS', true)
        resolve()
      })
    },
    resetHas ({ commit }, flag = false) {
      commit('SET_HAS', false)
    }
  }
}

export default permission
