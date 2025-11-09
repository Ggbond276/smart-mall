import request from '@/utils/request'

export const getProductDetail = (goodsId) => {
  return request({
    url: '/goods/detail',
    method: 'GET',
    params: {
      goodsId
    }
  })
}

// 获取全部商品的全部评价
export const getProductComments = (goodsId, limit) => {
  return request({
    url: '/comment/listRows',
    method: 'GET',
    params: {
      goodsId,
      limit
    }
  })
}
