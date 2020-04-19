/**
 * Created by Mumuxiz.
 * Date: 2019/08/20 17:48
 */
import axios from 'axios'
import router from '../router'
// import { Message } from 'element-ui'

let options = {
  // 使用mock.js时不需要加baseURL
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 1000, // Timeout
  withCredentials: false // Check cross-site Access-Control
}

const _axios = axios.create(options)

// 请求发出拦截器
_axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 请求响应拦截
_axios.interceptors.response.use(
  response => {
    // return response.data
    // if (response.data.code === 0) {
    //   return response.data
    // } else {
    //   Message.error(response.data.message)
    // }
    // 与后端人员沟通根据实际code码返回
    if (response.status === 200) {
      if (response.code === 4) {
        router.push('/login')
      }
      return Promise.reject(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    if (!error.response) {
      return false
    } else {
      console.log(error.response.status)
      // 自定义404等错误跳转页面，自己根据页面路由去修改
      switch (error.response.status) {
        case 404:
          router.push({ path: '/404' })
          break
        case 500:
          alert('服务器异常!')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default _axios
