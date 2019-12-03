import Vue from 'vue'
import store from '@/store/'
import {
  ACCESS_TOKEN,
  MENU_LIST,
  USER_BTN
} from '@/store/mutation-types'

export default function Initializer () {
  store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
  store.commit('SET_MENUS', Vue.ls.get(MENU_LIST))
  store.commit('SET_USER_BTN', Vue.ls.get(USER_BTN))
}
