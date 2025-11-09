import request from '@/utils/request'

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
