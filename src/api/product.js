import request from '@/utils/request'

// 这里要给两个参数
export const getSearchProductList = (paramsObj) => {
  const { goodsName, page } = paramsObj
  return request({
    url: '/goods/list',
    method: 'GET',
    params: {
      goodsName,
      page
    }
  })
}
