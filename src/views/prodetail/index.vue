<template>
  <div class="prodetail">
    <van-nav-bar
      fixed
      title="商品详情页"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 商品轮播图 -->
    <van-swipe :autoplay="3000" @change="onChange">
      <!-- 展示部分 -->
      <van-swipe-item v-for="item in productDetailImages" :key="item.file_id">
        <img :src="item.external_url" />
      </van-swipe-item>
      <!-- 显示第几页 -->
      <!-- 怎么实现页码变化功能 -->
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }} / {{ productDetailImages.length }}
        </div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <!-- 商品标题 -->
      <div class="title">
        <!-- 商品价格 -->
        <div class="price">
          <!-- 打折价格 -->
          <span class="now">¥{{ productDetailList.goods_price_min }}</span>
          <!-- 原价 -->
          <span class="oldprice"
            >￥{{ productDetailList.goods_price_max }}</span
          >
        </div>
        <!-- 已售出件数 -->
        <div class="sellcount">已售{{ productDetailList.goods_sales }}件</div>
      </div>

      <!-- 商品详情 -->
      <div class="msg text-ellipsis-2">
        {{ productDetailList.goods_name }}
      </div>

      <!-- 店铺服务 -->
      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <!-- 评价标题 -->
      <div class="comment-title">
        <div class="left">商品评价 ({{ productCommentsList.length }}条)</div>
        <!-- 这里要完善功能 点击箭头之后要展示一整个评论列表 -->
        <div class="right">查看更多 <van-icon name="arrow" /></div>
      </div>
      <!-- 评价列表 -->
      <div class="comment-list">
        <div
          class="comment-item"
          v-for="item in productCommentsList"
          :key="item.id"
        >
          <!-- 评价头部 -->
          <div class="top">
            <!-- 图片 -->
            <img :src="item.user.avatar_url" alt="" />
            <!-- 用户 -->
            <div class="name">{{ item.user.nick_name }}</div>
            <!-- 评分 -->
            <van-rate
              :size="16"
              :value="item.score / 2"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <!-- 内容 -->
          <div class="content">{{ item.content }}</div>
          <!-- 评价发布时间 -->
          <div class="time">{{ item.create_time }}</div>
        </div>
      </div>
    </div>

    <!-- 商品描述(这个被写死了后端没有提供接口) -->
    <div class="desc">
      <img
        src="https://uimgproxy.suning.cn/uimg1/sop/commodity/kHgx21fZMWwqirkMhawkAw.jpg"
        alt=""
      />
      <img
        src="https://uimgproxy.suning.cn/uimg1/sop/commodity/0rRMmncfF0kGjuK5cvLolg.jpg"
        alt=""
      />
      <img
        src="https://uimgproxy.suning.cn/uimg1/sop/commodity/2P04A4Jn0HKxbKYSHc17kw.jpg"
        alt=""
      />
      <img
        src="https://uimgproxy.suning.cn/uimg1/sop/commodity/MT4k-mPd0veQXWPPO5yTIw.jpg"
        alt=""
      />
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o" />
        <span @click="$router.push('/home')">首页</span>
      </div>
      <div class="icon-cart">
        <span v-if="cartTotal > 0" class="num">{{ cartTotal }}</span>
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <!-- 点击加入购物车之后会显示弹窗 -->
      <div @click="addFn()" class="btn-add">加入购物车</div>
      <div @click="buyFn()" class="btn-buy">立刻购买</div>
    </div>

    <!-- 加入购物车弹窗 -->
    <van-action-sheet
      v-model="showPannel"
      :title="mode === 'cart' ? '加入购物车' : '立刻购买'"
    >
      <div class="product">
        <!-- 标题部分 -->
        <div class="product-title">
          <!-- 标题部分左侧 -->
          <div class="left">
            <!-- 商品图片 -->
            <img
              :src="productDetailList.goods_image"
              alt=""
            />
          </div>
          <!-- 标题部分右侧 -->
          <div class="right">
            <div class="price">
              <span>¥</span>
              <!-- 商品的现在价格 -->
              <span class="nowprice">{{ productDetailList.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <!-- 商品库存数据 -->
              <span>{{ productDetailList.stock_total }}</span>
            </div>
          </div>
        </div>
        <!-- 商品数量 -->
        <div class="num-box">
          <span>数量{{ this.value }}</span>
          <CountBox v-model="value" />
        </div>
        <!-- 控制底部按钮以什么方式显示 -->
        <div class="showbtn" v-if="productDetailList.stock_total>0">
          <!-- 点击加入购物车按钮之后 该商品要被添加到购物车列表中 -->
          <div @click="addCart()" class="btn" v-if="isCart">加入购物车</div>
          <!-- 点击立即购买需要直接跳转到购买页面 -->
          <div class="btn now" v-else>立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProductDetail, getProductComments } from '@/api/prodetial'
import CountBox from '@/components/CountBox.vue'
import { Dialog, Toast } from 'vant'
import { mapState } from 'vuex'
import { addCart } from '@/api/cart'
export default {
  name: 'ProDetailIndex',
  data () {
    return {
      productDetailList: {},
      productDetailImages: {},
      productCommentsList: {},
      current: 0,
      mode: 'cart',
      showPannel: false,
      isCart: true,
      value: 1,
      cartTotal: 0
    }
  },
  created () {
    this.getProductDetail()
    this.getProductComments()
  },
  mounted () {
    // 加载到页面的时候自动滚动到顶部
    window.scrollTo(0, 0)
  },
  computed: {
    // 获取路径参数
    pathParam () {
      return this.$route.params.id
    },
    ...mapState('user', {
      token: state => state.userInfo.token
    })
  },
  methods: {
    // 获取商品详情信息
    async getProductDetail () {
      const {
        data: { detail }
      } = await getProductDetail(this.pathParam)
      console.log(detail)
      this.productDetailList = detail
      this.productDetailImages = detail.goods_images
    },
    // onchange会自己传入当前图片的索引
    onChange (index) {
      this.current = index
    },
    // 获取商品评价信息
    async getProductComments () {
      const {
        data: { list }
      } = await getProductComments(this.pathParam, 3)
      // console.log(list)
      this.productCommentsList = list
    },
    // 控制显示哪一个弹窗
    addFn () {
      this.mode = 'cart'
      this.showPannel = true
      this.isCart = true
    },
    buyFn () {
      this.mode = 'buy'
      this.showPannel = true
      this.isCart = false
    },
    async addCart () {
      console.log(this.token)
      if (!this.token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '加入购物车操作需要用户登陆',
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
      console.log('用户存在token 可以进行加入购物车操作')
      // goodsId, goodsNum, goodsSkuId
      const data = await addCart(this.token, this.productDetailList.goods_id, this.value, this.productDetailList.skuList[0].goods_sku_id)
      this.cartTotal = data.data.cartTotal
      Toast(data.message)
      this.showPannel = false
      // console.log(this.token)
      // console.log(data.data.cartTotal)
      // console.log(data.message)
    }
  },
  components: {
    CountBox
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home,
    .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

.footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}
</style>
