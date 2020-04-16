/**
 * Created by Mireia.
 * Date: 2019/09/17 10:35
 * Describe: 菜单权限模块
 */
export default {
  name: '系统设置',
  desc: '',
  icon: 'el-icon-setting',
  order: 3,
  module: 'setting',
  children: [
    {
      api: 'permission',
      path: 'permission',
      name: '权限管理',
      desc: '',
      method: {
      }
    },
    {
      api: 'account',
      path: 'account',
      name: '账号管理',
      desc: '',
      method: {
      }
    },
    {
      api: 'role',
      path: 'role',
      name: '角色管理',
      desc: '',
      method: {
      }
    }
  ]
}
