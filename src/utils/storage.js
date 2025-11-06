// 设置个人信息凭证
const INFO_KEY = 'pigge_smart_shopping'

// 添加个人信息
export const setUserInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 获取个人信息
export const getUserInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result
    ? JSON.parse(result)
    : {
        token: '',
        userId: ''
      }
}

// 移除个人信息
export const removeUserInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
