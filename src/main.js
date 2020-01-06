import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUl from 'element-ui'

// 导入axios
import axios from 'axios'

// 引入全局初始化样式
import '@/assets/css/global.css'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
Vue.prototype.$http = axios
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUl)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
