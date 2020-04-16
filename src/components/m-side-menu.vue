<template>
  <!-- 左侧伸缩菜单 -->
  <div :class="['side-menu-ui', isHide ? 'isHide':'']" :style="`width:${width}px`">
    <div class="side-logo">
      <el-image
        :src="logoUrl"
        fit="cover"></el-image>
      <h4 class="ml-max side-title" v-show="!isHide">管理后台</h4>
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo text-left"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      unique-opened
      :router="true"
      text-color="#ccc"
      background-color="#323649">
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="product">
        <i class="el-icon-menu"></i>
        <span slot="title">产品管理</span>
      </el-menu-item>
      <el-menu-item index="permission">
        <i class="el-icon-document"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>
      <el-menu-item index="upload">
        <i class="el-icon-upload"></i>
        <span slot="title">上传组件</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
import bus from '../config/bus'
import { getStorage } from "../utils/storage";

export default {
  name: 'side-menu-ui',
  props: {
    width: {
      type: [Number, String],
      default: 200
    }
  },
  data () {
    return {
      logoUrl: require('../assets/img/logo.png'),
      isCollapse: getStorage('isCollapse') || false,
      isHide: getStorage('isCollapse') || false
    }
  },
  mounted () {
    this.$nextTick(function(){
      bus.$on('isCollapse', (resp) => {
        this.isCollapse = resp
      })
    });
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      this.$emit('open', key, keyPath)
    },
    handleClose (key, keyPath) {
      this.$emit('close', key, keyPath)
    }
  },
  watch: {
    isCollapse (val) {
      this.isHide = val
    }
  }
}
</script>

<style lang="scss">
  .isHide {
    transition: width 0.4s;
    width: 70px !important;
  }
  .side-menu-ui {
    height: 100%;
    transition: width 0.4s;
    .side-logo{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      color: $lightGray;
      background-color: rgba(41, 45, 62, 0.99);
      .el-image{
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      .side-title{
        overflow: hidden;
        white-space : nowrap;
      }
    }
    .el-menu.el-menu-vertical-demo {
      width: 100% !important;
      height: calc(100% - 60px);
      overflow-y: auto;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar-track {
      background-color: $mainColor;
    }
    ::-webkit-scrollbar {
      // 垂直滚动条宽度
      width: 4px;
      // 水平滚动条高度
      height: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #636464;
      cursor: pointer;
      border-radius: 10px;
    }
  }
</style>
