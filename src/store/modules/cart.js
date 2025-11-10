// 将获取得到的购物车数据存储在这里 共多个页面使用
import { getCartList, delSelect, changeCount } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品列表
    selList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品的总数
    selCategory (state, getters) {
      return getters.selList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selList.reduce((sum, item) => sum + item.goods.goods_price_min * item.goods_num, 0)
    },
    // 看购物车中的商品是否全部都被选中了
    isAllChecked (state, getters) {
      // 这段代码解决了吧商品全部删除之后全选自动勾选的问题
      if (state.cartList.length === 0) {
        return false
      }
      return getters.selList.length === state.cartList.length
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const item = state.cartList.find(item => item.goods_id === goodsId)
      item.isChecked = !item.isChecked
    },
    // 反选的主要逻辑写在这里
    toggleAllCheck (state, isChecked) {
      if (isChecked) {
        state.cartList.forEach(item => {
          item.isChecked = false
        })
      } else {
        state.cartList.forEach(item => {
          item.isChecked = true
        })
      }
    }
  },
  actions: {
    async getCartAction (context) {
      //   这里要获取token
      const { data: { list } } = await getCartList()
      list.forEach(item => {
        // 为每一个商品添加是否选中的属性
        item.isChecked = false
      })
      // console.log(list)
      context.commit('setCartList', list)
      // 这里说明cartList内部的值是没有问题的
      // console.log(context.state.cartList)
    },
    toggleCheckAction (context, goodsId) {
      context.commit('toggleCheck', goodsId)
    },
    toggleAllCheckAction (context) {
      if (context.getters.isAllChecked) {
        context.commit('toggleAllCheck', true)
      } else {
        context.commit('toggleAllCheck', false)
      }
    },
    // 狗屎后端api 你妈个逼给的是错误的api 尼玛的把老子全部东西都删了
    async delSelectAction (context) {
      const selList = context.getters.selList
      // console.log(selList)
      const cartsIds = selList.map(item => item.id)
      // 这里确实只打印的数组只出了一个id 但是删除的时候是删除了所有选中的商品
      // console.log(cartsIds)
      const res = await delSelect(cartsIds)
      Toast(res.message)
      context.dispatch('getCartAction')
    },
    async changeCountAction (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      console.log('参数检查2:', { goodsId, goodsNum, goodsSkuId })
      const res = await changeCount(goodsId, goodsNum, goodsSkuId)
      Toast(res.message)
      // 更新数据
      context.dispatch('getCartAction')
    }
  }
}
