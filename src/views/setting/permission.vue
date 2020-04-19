<template>
  <div class="permission main-box">
  </div>
</template>

<script>

export default {
  name: 'permission',
  data () {
    return {
    }
  },
  created () {
    this.getList()
  },
  methods: {
  }
}
</script>


<style lang="scss">
  $height: 32px;
  .el-tree {
    .el-tree-node__content {
      height: $height;
    }
    .custom-tree-node {
      position: relative;
      width: 100%;
      font-size: 14px;
      height: $height;
      box-sizing: border-box;
      line-height: $height;
      border-bottom: 1px #ccc dashed;
      .r {
        position: absolute;
        top: 0;
        right: 0;
        .el-button {
          padding: 0;
        }
      }
    }
  }
</style>
