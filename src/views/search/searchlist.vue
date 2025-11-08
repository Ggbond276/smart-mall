<template>
 <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in searchProductList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getSearchProductList } from '@/api/product'
export default {
  name: 'SearchList',
  data () {
    return {
      page: 1,
      searchProductList: []
    }
  },
  components: {
    GoodsItem
  },
  // 获取搜索商品的列表
  async created () {
    const { data: { list } } = await getSearchProductList({
      goodsName: this.querySearch,
      page: this.page
    })
    this.searchProductList = list.data
  },
  // 解析路由路径参数
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>

<!-- 我使用了数组过滤的方法来获取了搜索后的列表 -->
<!-- <script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'SearchList',
  data () {
    return {
      goodsList: [],
      filteredGoodsList: []
    }
  },
  components: {
    GoodsItem
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    this.goodsList = pageData.items[6].data
    this.filterGoodsList()
  },
  // 解析路由路径参数
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  methods: {
    filterGoodsList () {
      this.filteredGoodsList = this.goodsList.filter(item => item.goods_name.includes(this.querySearch))
      console.log(this.filteredGoodsList)
    }
  }
}
</script> -->
