import request from '@/utils/request'

// 获取图片验证码
export const getPicCode = () => {
  return request({
    url: '/captcha/image',
    method: 'GET'
  })
}

// 发送验证码校验 返回手机验证码
export const getCode = (captchaCode, captchaKey, mobile) => {
  return request({
    url: '/captcha/sendSmsCaptcha',
    method: 'POST',
    from: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 向后台发送登陆请求
export const codeLogin = (mobile, smsCode) => {
  return request({
    url: '/passport/login',
    method: 'POST',
    headers: {
      platform: 'H5' // 必需：在 Header 中传递
    },
    data: {
      form: {
        smsCode,
        mobile,
        isParty: false,
        partyData: {}
      }
    }
  })
}
