<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
/*引入自定义字体*/
*{
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: 'PingFangSC-Regular';
  src: url("./assets/font/PingFangSC-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}
body{
  font-family: 'PingFangSC-Regular', sans-serif;
  font-size: 14px;
  background-color: $bgColor;
}
html, body{
  height: 100%;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #d7d7d7;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
