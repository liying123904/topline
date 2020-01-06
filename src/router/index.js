import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {path:'/login',component:箭头函数}
  //
  { path: '/login', name: 'login', component: () => import('@/vues/login') },
  { path: '/home', name: 'home', component: () => import('@/vues/home') }
]

const router = new VueRouter({
  routes
})
// 配置全局前置守卫
router.beforeEach((to, from, next) => {
  let userinfo = window.sessionStorage.getItem('userinfo')
  // 登录状态: userinfo就是字符串, 非登录状态userinfo就是 null
  if (!userinfo && to.path !== '/login') {
    return false
  }
  next()
})
export default router
