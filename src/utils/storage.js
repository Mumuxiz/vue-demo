/**
 * Created by Mireia.
 * Date: 2019/09/11 10:50
 * Describe: 本地存储操作
 */

/**
 * 存取sessionStorage
 */
function setStorage (key, data) {
  if (data && typeof data === 'object') {
    data = JSON.stringify(data);
  }
  if (data === '{}' || data === '[]') {
    window.sessionStorage.removeItem(key)
  } else {
    try {
      window.sessionStorage.setItem(key, data)
    } catch (e) {
      console.error(`${key}, 存储本地sessionStorage失败`, e)
    }
  }
}

function getStorage (key) {
  return JSON.parse(window.sessionStorage.getItem(key))
}


/**
 * 存取LocalStorage
 */
function setLocalStorage (key, data) {
  if (data && typeof data === 'object') {
    data = JSON.stringify(data);
  }
  if (data === '{}' || data === '[]') {
    window.localStorage.removeItem(key)
  } else {
    try {
      window.localStorage.setItem(key, data)
    } catch (e) {
      console.error(`${key}, 存储本地sessionStorage失败`, e)
    }
  }
}

function getLocalStorage (key) {
  return JSON.parse(window.sessionStorage.getItem(key))
}


/**
 * 清除Storage
 */
function clearStorage (key) {
  window.sessionStorage.clear(key)
}

function clearLocalStorage (key) {
  window.localStorage.clear(key)
}

export {
  setStorage,
  getStorage,
  setLocalStorage,
  getLocalStorage,
  clearStorage,
  clearLocalStorage
}
