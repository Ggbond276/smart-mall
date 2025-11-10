<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <!-- 购物车开头 -->
    <div class="cart-title">
      <span class="all">共<i>{{ cartTotal || 0}}</i>件商品</span>
      <span v-if="!isEdit" class="edit">
        <van-icon @click="isEdit = !isEdit" name="edit" />
        编辑
      </span>
      <span v-else class="edit">
        <van-icon @click="isEdit = !isEdit" name="edit" />
        取消编辑
      </span>
    </div>
    <!-- 购物车列表 -->
    <div class="cart-list">
      <div class="cart-item" v-for="item in cartList" :key="item.id">
        <!-- 单选checkbox -->
        <van-checkbox @click="toggleCheck(item.goods_id)" :value="item.isChecked"></van-checkbox>
        <!-- 图片部分 -->
        <div class="show">
          <img
            :src="item.goods.goods_image"
            alt=""
          />
          <!-- 信息部分 -->
        </div>
        <div class="info">
          <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
          <span class="bottom">
            <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
            <div class="count-box">
              <!-- 点击按钮之后商品数量会减少 -->
              <button @click="changeCount(item.goods_id, item.goods_num - 1, item.goods_sku_id)" class="minus">-</button>
              <input class="inp" :value="item.goods_num" type="text" readonly />
              <!-- 点击按钮之后商品数量会增加 -->
              <button @click="changeCount(item.goods_id, item.goods_num + 1, item.goods_sku_id)" class="add">+</button>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="footer-fixed">
      <!-- 全选checkbox -->
      <div class="all-check">
        <van-checkbox @click="toggleAllCheck()" icon-size="18" :value="isAllChecked"></van-checkbox>
        全选
      </div>

      <div class="all-total">
        <div class="price">
          <span>合计：</span>
          <span>¥<i class="totalPrice">{{ selPrice }}</i></span>
        </div>
        <!-- 非编辑模式的时候显示这个按钮 -->
        <button @click="$router.push('/pay')" v-if="!isEdit" :class="{ disabled: selCategory === 0 }"  :disabled="selCategory === 0" class="goPay">结算({{ selCategory }})</button>
        <!-- 编辑模式的时候显示这个按钮 -->
        <button @click="handleDelete()" v-else :class="{ disabled: selCategory === 0 }"  :disabled="selCategory === 0"  class="delete">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'CartIndex',
  data () {
    return {
      isEdit: false
    }
  },
  created () {
    // 先检查token(思考一下这一步是否是必要的操作)
    if (!this.Token) {
      Dialog.confirm({
        title: '温馨提示',
        message: '查看此页面需要用户登陆',
        confirmButtonText: '去登录',
        cancelButtonText: '再逛逛'
      })
        .then(() => {
          // on confirm
          this.$router.replace({
            path: '/login',
            query: {
              // 这里是用来记录是从哪个页面跳转过去的 到时候在登陆页面要使用 因为登陆成功后要跳转回去
              backUrl: this.$route.fullPath
            }
          })
        })
        .catch(() => {})
      return
    }
    // 有token就获取数据 这里的数据会被存放在vuex里面 我们要取出来使用
    this.getCartAction().then(() => {
      console.log(this.cartList)
    })
  },
  methods: {
    ...mapActions('cart', ['getCartAction', 'toggleCheckAction', 'toggleAllCheckAction', 'delSelectAction', 'changeCountAction']),
    toggleCheck (goodsId) {
      this.toggleCheckAction(goodsId)
    },
    toggleAllCheck () {
      this.toggleAllCheckAction()
    },
    // 这里点击删除后会删除所有的数据 我猜测可能是后端的bug因为我的前端逻辑没有任何问题
    async handleDelete () {
      if (this.selCategory === 0) return
      await this.delSelectAction()
      this.isEdit = false
    },
    async changeCount (goodsId, goodsNum, goodsSkuId) {
      console.log('参数检查1:', { goodsId, goodsNum, goodsSkuId })
      if (goodsNum < 1) return
      await this.changeCountAction({ goodsId, goodsNum, goodsSkuId })
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    // 获取仓库中的cartList数据
    ...mapState('cart', ['cartList']),
    // 获取购物车的统计数据
    ...mapGetters('cart', ['cartTotal', 'selList', 'selCategory', 'selPrice', 'isAllChecked']),
    // 用来判断本地是否有token
    Token () {
      return this.userInfo.token
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      border: none;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}
</style>
