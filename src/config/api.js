/**
 * @Author Mumuxiz.
 * @Date: 2020/4/17
 * @Describe: 页面接口管理文档
 * @Last Modified time: 2020/4/17
 */
import request from './request'

// 登录接口
export const login = params => {
  return request.post('/login', params)
}
