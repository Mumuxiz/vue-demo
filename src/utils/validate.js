/**
 * Created by Mireia.
 * Date: 2019/09/10 15:54
 * Describe: 表单验证
 */
function checkCode (rule, value, callback) {
  if (value) {
    if (this.identifyCode.toLowerCase() !== value.toLowerCase()) {
      callback(new Error('验证码错误'));
    } else {
      callback();
    }
  } else {
    callback(new Error('请输入验证码'));
  }
}


export {
  checkCode
}
