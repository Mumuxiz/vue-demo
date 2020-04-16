module.exports = {
  // presets: [
  //   '@vue/app'
  // ]
  presets: [
    ['@babel/preset-env', {
      // 配置babel预置编译器为@babel/preset-env
      targets: {
        node: 'current'
      }
    }]
  ]
}
