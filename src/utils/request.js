import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  store.dispatch('loading/showLoading')
  return config
}, function (error) {
  // 对请求错误做些什么
  store.dispatch('loading/hideLoading')
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 拦截响应数据 如果响应数据状态码不等于200 就显示返回的响应信息
  const res = response.data
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  }
  // 如果响应数据状态码等于200 就返回响应数据
  store.dispatch('loading/hideLoading')
  return res
}, function (error) {
  // 对响应错误做点什么
  store.dispatch('loading/hideLoading')
  return Promise.reject(error)
})

export default request
