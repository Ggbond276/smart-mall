import request from '@/utils/request'

// 加入购物车
export const addCart = (AccessToken, goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/add',
    method: 'POST',
    headers: {
      'Access-Token': AccessToken,
      platform: 'H5'
    },
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  })
}
// 获取购物车列表
export const getCartList = () => {
  return request({
    url: '/cart/list',
    method: 'GET'
  })
}
// 删除购物车商品
export const delSelect = (cartsIds) => {
  return request({
    url: '/cart/clear',
    method: 'POST'
  })
}
// 更新购物车中的商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/update',
    method: 'POST',
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  })
}
