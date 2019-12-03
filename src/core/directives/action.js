import Vue from 'vue'
import store from '@/store'

const action = Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    const actionName = binding.arg
    const userBtn = store.getters.userBtn
    const menuId = vnode.context.$route.meta.menuId
    const btnList = userBtn.filter(item => item.pId === menuId && item.mType === 2)
    function _has (value) {
      let isExist = true
      for (let i = 0; i < btnList.length; i++) {
        if (btnList[i].identifier && btnList[i].identifier === value) {
          isExist = false
        }
      }
      return isExist
    }

    if (_has(actionName)) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})

export default action
