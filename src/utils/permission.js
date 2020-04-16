/**
 * Created by Mireia.
 * Date: 2019/09/12 17:34
 * Describe: 生成默认菜单和权限
 */
import menuConfig from '../config/menu/index'

/**
 * 从菜单配置数据，创建操作名
 * @param menu
 * @return {Array}
 */
function createMenu () {
  let arr = [];
  if (Array.isArray(menuConfig) && menuConfig.length) {
    menuConfig.forEach(item => {
      arr.push({
        parent_code: '',
        action_code: item.module,
        action_name: item.name,
        action_desc: item.desc,
        type: 0,
        is_check: 0
      });
      if (item.hasOwnProperty('children') && item.children.length) {
        arr = arr.concat(_children(item.children, item.module))
      }
    })
  }

  return arr
}

function _children(list, parentCode) {
  let arr = [];
  if (Array.isArray(list) && list.length) {
    list.forEach(item => {
      arr.push({
        parent_code: parentCode,
        action_code: `${parentCode}_${item.path}`,
        action_name: item.name,
        action_desc: item.desc,
        type: 1,
        is_check: 0
      });
      if (item.method) {
        arr = arr.concat(_method(item.method, `${parentCode}_${item.path}`))
      }
    })
  }
  return arr
}

function _method (methods ,parentCode) {
  let arr = [];
  let val;
  for (let method in methods) {
    // 规则 method: { a: '名称:说明文字' }
    val = methods[method].split(':');
    // api + method
    arr.push({
      parent_code: parentCode,
      action_code: `api_${method}`,
      action_name: val[0],
      action_desc: val[1] || '',
      type: 2,
      is_check: 1
    })
  }
  return arr
}


/**
 * 判断2个对象是否相等
 * @param object
 * @return Boolean
 */
function equal (local, server) {
  for (let key in local) {
    // 不对比id
    if (key === 'action_id') continue;
    if (local.hasOwnProperty(key)) {
      if (server[key] !== local[key]) return false
    }
  }
  return true
}

/**
 * 根据服务器返回list，创建action_code健值数据
 * @param list
 * @return {{}}
 */
function createActionsFromServer (list) {
  if (!Array.isArray(list) || list.length === 0) return {}
  let data = {};
  list.forEach(item => {
    data[item.action_code] = item
  });
  return data
}


/**
 * 根据list创建el-tree数据
 * @param list
 * @return {Array}
 */
function createElTreeData (list) {
  if (!Array.isArray(list)) return []
  list = JSON.parse(JSON.stringify(list))
  let arr = []
  list.forEach((item, index) => {
    if (item.parent_id === 0) {
      item.children = _getChild(item.action_id, list)
      arr.push(item)
      list[index] = null
    }
  })
  return arr
}

/**
 * 获取子元素
 * @param pid 父级id
 * @param list 所有待归类数据
 * @return {Array}
 */
function _getChild (pid, list) {
  // 过滤空元素
  list = list.filter(item => item)
  let arr = []
  list.forEach((item, index) => {
    if (item.parent_id === pid) {
      item.children = _getChild(item.action_id, list)
      arr.push(item)
      list[index] = null
    }
  })
  return arr
}

export {
  createMenu,
  equal,
  createActionsFromServer,
  createElTreeData
}
