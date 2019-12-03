import Vue from 'vue'
import { login, logout, getUserInfo } from '@/api/login'
import { ACCESS_TOKEN, MENU_LIST, USER_BTN } from '@/store/mutation-types'

function handlerArray (arr) {
  const newArr = []
  function filter (list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].children && list[i].children.length) {
        filter(list[i].children)
      } else {
        newArr.push(list[i])
      }
    }
  }
  filter(arr)
  return newArr
}

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    userBtn: [],
    menus: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USER_BTN: (state, list) => {
      state.userBtn = list
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const result = res.result
          const newMenus = handlerArray(result.menus)
          const userBtn = newMenus.filter(item => item.mType === 2)
          Vue.ls.set(ACCESS_TOKEN, result.user.token, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(MENU_LIST, result.menus)
          Vue.ls.set(USER_BTN, userBtn)
          commit('SET_TOKEN', result.user.token)
          commit('SET_MENUS', result.menus)
          commit('SET_USER_BTN', userBtn)
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit }) {
      return new Promise(resolve => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_MENUS', [])
          commit('SET_USER_BTN', [])
          Vue.ls.remove(ACCESS_TOKEN)
          Vue.ls.remove(MENU_LIST)
          Vue.ls.remove(USER_BTN)
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const result = res.result
          commit('SET_INFO', result.info)
          commit('SET_NAME', result.info.nickName)
          commit('SET_AVATAR', result.info.headPath)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
