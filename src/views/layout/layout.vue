<template>
  <div class="layout">
    <m-side-menu></m-side-menu>
    <div class="container">
      <myHeader></myHeader>
      <div class="con-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '@/views/layout/top-header'

export default {
  name: 'layout',
  components: {
    myHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .layout{
    display: flex;
    height: 100%;
    background-color: #fff;
    .container{
      flex: 1;
      .con-main{
        height: calc(100% - 60px);
        box-sizing: border-box;
        padding: 20px;
      }
    }
  }
</style>
