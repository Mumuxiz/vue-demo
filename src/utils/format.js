/**
 * Created by Mumuxiz.
 * Date: 2019/09/12 17:36
 * Describe: 格式化数据
 */

const format = {
  /**
   * 将字符串中空格或-，转为下划线
   * @param str
   * @return {string}
   */
  toUnderline: function (str) {
    if (arguments.length > 1) {
      str = Array.prototype.join.call(arguments, '_')
    }
    return typeof str === 'string' ? str.replace(/[-\s]/g, '_').toLowerCase() : str
  }
};

export default format
