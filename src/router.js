import Vue from 'vue'
import Router from 'vue-router'

// 必须加载的组件
import login from './views/login/login'
import layout from './views/layout/layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.VUE_APP_BASE_API,
  routes: [
    {
      path: '/login',
      name: 'login',
      isEncryption: true,
      component: login
    },
    {
      path: '',
      component: layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./views/home/home.vue')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/home/home.vue')
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('./views/product/product.vue')
        },
        {
          path: '/permission',
          name: 'permission',
          component: () => import('./views/setting/permission.vue')
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('./views/setting/account.vue')
        },
        {
          path: '/upload',
          name: 'upload',
          component: () => import('./views/upload/upload.vue')
        }
      ]
    }
    // {
    //   path: '/menu',
    //   name: 'side-menu-ui',
    //   component: () => import('./components/side-menu-ui.vue')
    // }
  ]
})
