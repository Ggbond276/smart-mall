<template>
  <div class="login">
    <!-- 登录页顶部 -->
    <van-nav-bar  title="会员登陆" left-arrow @click-left="$router.go(-1)"/>
    <!-- 登录页内容 -->
     <div class="container">
      <!-- 标题 -->
       <div class="title">
        <h3>手机号登陆</h3>
        <p>未注册的手机号登陆后将自动注册</p>
       </div>
       <!-- 表单 -->
       <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" type="text" placeholder="请输入手机号" maxlength="11">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" type="text" placeholder="请输入图形验证码" maxlength="5">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode()">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" type="text" placeholder="请输入短信验证码">
          <button @click="getCode()">
            {{ second === totalSecond ? '获取验证码' : `(${second})秒后重新获取` }}
          </button>
        </div>
       </div>

       <button @click="codeLogin()" class="login-btn">登陆</button>
     </div>
  </div>
</template>

<script>
import { getPicCode, getCode, codeLogin } from '@/api/login.js'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
import { setUserInfo } from '@/utils/storage'
export default {
  name: 'LoginIndex',
  async created () {
    this.getPicCode()
  },
  data () {
    return {
      picUrl: '',
      picKey: '',
      picCode: '',
      mobile: '',
      totalSecond: 60,
      second: 60,
      timerId: null,
      smsCode: ''
    }
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 获取短信验证码
    async getCode () {
      console.log('获取短信验证码')
      // 校验图形验证码和手机号是否正确
      if (!this.validFn()) {
        console.log('图形验证码或者手机号错误')
        return
      }
      // 校验正确则提示短信验证码已发送
      Toast('短信验证码已发送')
      // 然后开始发送请求 并开启倒计时
      if (!this.timerId && this.totalSecond === this.second) {
        // 生成倒计事件
        this.timerId = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timerId)
            this.timerId = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
      const res = await getCode(this.picCode, this.picKey, this.mobile)
      Toast(`${res.message}`)
    },
    // 输入框数据校验
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 手机验证码登陆
    async codeLogin () {
      // 校验图形验证码验证码和手机号
      // 手机号码:15751776629 验证码246810
      if (!this.validFn()) {
        return
      }
      // 校验短信验证码
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      // 校验无误之后向后台发送登陆请求
      const res = await codeLogin(this.mobile, this.smsCode)
      // 收到登陆请求之后将响应数据提交到user数据库中
      console.log(res.data)
      // 将获取的token和UserId扔到本地持久化存储
      // 将数据扔到本地
      setUserInfo(res.data)
      // 让user去修改仓库数据
      this.$store.commit('user/setUserInfo')

      // 这里跳转回首页 但是我们现在要修改这个操作 因为我们从购买页跳转过来等下要跳回去
      // this.$router.push('/')
      // 登录成功后，跳转回原来的页面
      const backUrl = this.$route.query.backUrl
      if (backUrl) {
        this.$router.replace(backUrl) // 跳回商品详情页
      } else {
        this.$router.replace('/') // 默认跳转到首页
      }
      Toast('登陆成功')
      // 返回首页
      // 提示登陆成功
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }
}
</style>
