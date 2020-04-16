/**
 * Created by zmm.
 * Date: 2019/08/20 17:48
 */
import axios from 'axios'
import { Message } from 'element-ui'

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
    return response.data
    // if (response.data.code === 0) {
    //   return response.data
    // } else {
    //   Message.error(response.data.message)
    // }
  },
  error => {
    return Promise.reject(error)
  }
)

export default _axios
