<template>
  <div class="breadcrumb-ui">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(list, index) in crumbList"
        :key="index"
        :to="list.path">{{ list.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb-ui',
  props: {
    crumbList: Array
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .breadcrumb-ui{
    height: 30px;
  }
</style>
