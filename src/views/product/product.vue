  <template>
  <div class="product">
    <!-- 面包屑导航 -->
    <m-breadcrumb></m-breadcrumb>

    <div class="main-box" :style="style">
    </div>
  </div>
</template>

<script>

export default {
  name: 'product',
  data () {
    return {
      height: 0
    }
  },
  computed: {
    style () {
      return `height:${this.height}px`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.height = window.innerHeight - 130
    });
    this.wr = new this.$WatchWinResize(() => {
      this.height = window.innerHeight - 130
    })
  },
  beforeDestroy () {
    this.wr.destroy()
  }
}
</script>

<style lang="scss">
</style>
