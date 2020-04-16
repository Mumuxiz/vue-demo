/**
 * Created by Mireia.
 * Date: 2019/09/12 17:10
 * Describe: 产品管理模块权限（根据接口定权限）
 */
export default {
  name: '产品管理',
  desc: '',
  icon: 'el-icon-food',
  order: 2,
  module: 'product',
  children: [
    {
      api: 'pro_list',
      path: 'product',
      name: '产品管理',
      desc: '',
      method: {
        proList: '产品列表'
      }
    }
  ]
}
