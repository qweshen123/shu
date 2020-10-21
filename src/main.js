import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios  from 'vue-axios'
import vantConfig from './vant.config.js'
import elementUi from './elementUi.config.js'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import WebIM from './utils/WebIM'

Vue.prototype.webIM = WebIM
Vue.use(VueAxios,axios)
Vue.use(vantConfig)
Vue.use(elementUi)

Vue.config.productionTip = false

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 自动登录
let userInfo = localStorage.getItem('userInfo')

if(userInfo){
  userInfo = JSON.parse(userInfo)

  store.dispatch('onAutoLoginUser',userInfo)
}
// // 登录验证
// router.beforeEach((to, from, next) => {
//   // 先判断用户是否一登录
//   if(store.state.userName || to.name === 'Login'){
//     next()  
//   }else{
//     next('/login')
//   }
// })




// // 自动跳转
// router.push('/')


