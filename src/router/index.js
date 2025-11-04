import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout/index.vue'
import login from '@/views/login/index.vue'
import search from '@/views/search/index.vue'
import pay from '@/views/pay/index.vue'
import myorder from '@/views/myorder/index.vue'
import prodetail from '@/views/prodetail/index.vue'

import home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import user from '@/views/layout/user.vue'
import cart from '@/views/layout/cart.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        { path: '/home', component: home },
        { path: '/category', component: category },
        { path: '/user', component: user },
        { path: '/cart', component: cart }
      ]
    },
    { path: '/login', component: login },
    { path: '/search', component: search },
    { path: '/pay', component: pay },
    { path: '/myorder', component: myorder },
    { path: '/prodetail/:id', component: prodetail }
  ]
})

export default router
