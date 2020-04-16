/**
 * Created by Mireia.
 * Date: 2019/09/11 15:36
 * Describe:
 */
/**
 * 监听window.resize，
 * 处理页面高度等
 * @param handler
 */
function WatchWinResize (handler) {
  // if (!App.isElement(el)) throw new Error(`${el} is not HTMLElement`)
  if (typeof handler !== 'function') throw new Error(`${handler} is not a function`)
  // this.el = el
  this.handler = handler
  window.addEventListener('resize', this.handler)
}

WatchWinResize.prototype.destroy = function () {
  window.removeEventListener('resize', this.handler)
}

export default WatchWinResize
