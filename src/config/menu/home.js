/**
 * Created by Mireia.
 * Date: 2019/09/12 17:15
 * Describe: 首页模块权限
 */
export default {
  name: '首页',
  desc: '',
  icon: 'el-icon-s-home',
  order: 1,
  module: 'home',
  children: [
    {
      api: 'home',
      path: 'home',
      name: '首页',
      desc: '',
      method: {
      }
    }
  ]
}
