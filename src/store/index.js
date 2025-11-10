import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import loading from '@/store/modules/loading'
import cart from '@/store/modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    loading,
    cart
  }
})
