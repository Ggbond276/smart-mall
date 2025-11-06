import { getUserInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setUserInfo (state) {
      console.log('数据已经入user仓库')
      state.userInfo = getUserInfo()
    }
  },
  actions: {
  }
}
