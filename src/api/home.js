import request from '@/utils/request'

// 获取主页面数据
export const getHomeData = () => {
  return request({
    url: '/page/detail',
    method: 'GET',
    headers: {
      platform: 'H5'
    },
    params: {
      pageId: 0
    }
  })
}
