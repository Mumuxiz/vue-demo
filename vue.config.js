/**
 * Created by zmm.
 * Date: 2019/08/21 15:47
 * Describe: vue.config.js配置
 */
module.exports = {
  publicPath: './', // 默认'/'，部署应用包时的基本 URL
  outputDir: 'dist', // 'dist', 生产环境构建文件的目录
  lintOnSave: false,
  css: {
    modules: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量
        data: `@import "~@/assets/css/config.scss";`
      }
    }
  }
}
