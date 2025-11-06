export default {
  namespaced: true,
  state: {
    loading: false
  },
  getters: {
    isLoading: state => state.loading
  },
  mutations: {
    SET_LOADING (state, status) {
      state.loading = status
    }
  },
  actions: {
    showLoading (state) {
      state.commit('SET_LOADING', true)
    },
    hideLoading (state) {
      state.commit('SET_LOADING', false)
    }
  }
}
