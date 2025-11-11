import request from '@/utils/request'
// 获取地址信息
export const getAddressList = () => {
  return request({
    url: '/address/list',
    method: 'GET'
  })
}
// 添加收获地址
export const addAddress = () => {
  return request({
    url: '/address/add',
    method: 'POST',
    data: {
      form: {
        name: '张小二',
        phone: '18999292929',
        region: [
          {
            value: 782,
            label: '上海'
          },
          {
            value: 783,
            label: '上海市'
          },
          {
            value: 785,
            label: '徐汇区'
          }
        ],
        detail: '北京路1号楼8888室'
      }
    }
  })
}
