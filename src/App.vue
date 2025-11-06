<template>
  <div id="app">
    <router-view/>
    <!-- 使用加载组件 -->
    <loadingComponents2 :show="isLoading"></loadingComponents2>
  </div>
</template>

<script>
// 导入第一个加载组件
import LoadingComponents2 from '@/components/Loading2.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    // 注册第一个加载组件
    LoadingComponents2
  },
  computed: {
    ...mapGetters('loading', ['isLoading'])
  }
}
</script>

<style lang="less">
</style>
