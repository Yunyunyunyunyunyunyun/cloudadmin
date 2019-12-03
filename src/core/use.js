import Vue from 'vue'
import VueStorage from 'vue-ls'

import './directives/action'

const storageOptions = {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
}

Vue.use(VueStorage, storageOptions)
