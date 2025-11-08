// 设置个人信息凭证
const INFO_KEY = 'pigge_smart_shopping'
const SEARCH_HISTORY = 'search_history'
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

// 设置本地搜索历史
export const setSeatchHistory = (info) => {
  localStorage.setItem(SEARCH_HISTORY, JSON.stringify(info))
}
// 获取本地搜索历史
export const getSearchHistory = () => {
  const result = localStorage.getItem(SEARCH_HISTORY)
  return result ? JSON.parse(result) : []
}
// 删除本地搜索历史
export const removeSearchHistory = () => {
  localStorage.removeItem(SEARCH_HISTORY)
}
