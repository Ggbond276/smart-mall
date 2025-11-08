<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.push('/home')" />

    <van-search v-model="search" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <!-- 搜索按钮 -->
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" />
      </div>
      <!-- 最近搜索列表 -->
      <div class="list">
        <!-- 历史记录按钮 -->
        <div @click="goSearch(item)" v-for="item in history" :key="item" class="list-item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHistory, setSeatchHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '',
      history: getSearchHistory()
    }
  },
  methods: {
    goSearch (search) {
      // 通过search来判断这次搜索是否是使用历史记录的搜索
      const index = this.history.indexOf(search)
      // 如果index小于零 就说明是使用搜索框搜索的
      if (index !== -1) {
        // 如果是搜索框搜索的就直接删除
        this.history.splice(index, 1)
      }
      // 将搜索结果统一插入到数组的最前端
      this.history.unshift(search)
      // 更新本地数据
      setSeatchHistory(this.history)
      // 路由跳转到对应的页面
      this.$router.push(`/searchlist?search=${search}`)
      // 关键字清空
      this.search = ''
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
