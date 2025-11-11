import request from '@/utils/request'
// 用来获取跳转至订单页面之后的数据携带
export const checkOrder = (mode, obj) => {
  return request({
    url: '/checkout/order',
    method: 'POST',
    data: {
      mode,
      delivery: 0,
      couponId: 0,
      ...obj
    }
  })
}
