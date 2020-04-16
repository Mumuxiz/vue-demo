<template>
  <header class="top-header">
    <i class="el-icon-s-fold text-xxl cur info" @click="handCollapse"></i>
    <div class="info">
      <el-avatar class="cur" size="small" :src="logoUrl"></el-avatar>
      <el-dropdown class="ml-max cur">
      <span class="el-dropdown-link">
        admin<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人主页</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import bus from '../../config/bus'
import { setStorage, getStorage } from "../../utils/storage";

export default {
  name: 'top-header',
  data () {
    return {
      logoUrl: require('../../assets/img/logo.png'),
      isCollapse: getStorage('isCollapse') || false
    }
  },
  methods: {
    // 收缩菜单
    handCollapse () {
      this.isCollapse = !this.isCollapse;
      setStorage('isCollapse', this.isCollapse);
      bus.$emit('isCollapse', this.isCollapse)
    }
  }
}
</script>

<style lang="scss">
  .top-header{
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px 0 20px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 1px 4px $inputBorderColor;
    .info{
      display: flex;
      align-items: center;
    }
  }
</style>
