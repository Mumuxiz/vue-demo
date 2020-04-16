<template>
  <div class="home">
    <!-- 面包屑导航 -->
    <breadcrumbUi></breadcrumbUi>
    <div class="main-box" :style="style">
      <el-row :gutter="10" class="box">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="box-item">
            <div class="item-info">
              <span>360</span>
              <p>今日新增库存</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="box-item">
            <div class="item-info">
              <span class="text-red text-bold">360</span>
              <p>今日新增库存</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="box-item">
            <div class="item-info">
              <span>360</span>
              <p>今日新增库存</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="box-item">
            <div class="item-info">
              <span>360</span>
              <p>今日新增库存</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import breadcrumbUi from '@/components/m-breadcrumb'

export default {
  name: 'home',
  components: {
    breadcrumbUi
  },
  computed: {
    style () {
      return `height:${this.height}px`
    }
  },
  data () {
    return {
      height: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.height = window.innerHeight - 130
    })
    this.wr = new this.$WatchWinResize(() => {
      this.height = window.innerHeight - 130
    })

    this.$router.push('/login')
  },
  beforeDestroy () {
    this.wr.destroy()
  }
}
</script>

<style lang="scss">
  .home {
    max-height: 100%;
    .box{
      width: 100%;
      height: 200px;
      .box-item{
        height: 100%;
        border-radius: 4px;
        padding: $spacingMid;
        border: 1px solid $inputBorderColor;
        background-color: #ffff;
        box-shadow: 0 2px 2px $inputBorderColor;
      }
    }
  }
</style>
