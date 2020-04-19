import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './config/request'
// 引入element-ui及样式
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义样式
import './assets/css/index.scss'
// 注册全局组件
import './config/vue-component'
import Router from 'vue-router'

// 引入mock
import './config/mock'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// 项目中所有拥有 size 属性的组件的默认尺寸均为 'small'
// Vue.use(Element, { size: 'small' })

Vue.use(Element)

// url加密与解密
const originPush = Router.prototype.push
Router.prototype.push = function push (location) {
  console.log(location)
  let obj = location
  if (Object.prototype.toString.call(obj).replace(/\/\//g, '').split(' ')[1] === 'Object') {
    location.query.isEncryption = 'true'
    // location.query = location.query
  }
  return originPush.call(this, location).catch(error => error)
}

// watch: {
// $route () {
//   let deCodeData = (this.$route.query)
//   Vue.prototype.$routes = {
//     ...this.$route,
//     query: deCodeData.isEncryption === 'true' ? deCodeData : this.$route.query
//   }
// }
// },

new Vue({
  router,
  store,
  watch: {
    $route () {
      let deCodeData = (this.$route.query)
      Vue.prototype.$routes = {
        ...this.$route,
        query: deCodeData.isEncryption === 'true' ? deCodeData : this.$route.query
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
