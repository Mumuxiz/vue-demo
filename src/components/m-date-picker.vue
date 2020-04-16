<template>
  <!-- 在element-ui中的日期控制的基础上加了异常日期标记 -->
  <div class="date-picker-ui">
    <el-date-picker
      :popper-class="className"
      v-model="dateRange"
      type="datetimerange"
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @focus="focus">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'date-picker-ui',
  props: {
    // 避免页面同时使用多个组件是出错
    className: {
      type: String,
      default: 'datePicker'
    },
    tags: {
      type: Array,
      default () {
        return [1, 5, 16, 20]
      }
    },
    defaultDate: {
      type: Array,
      default () {
        return [new Date(2019, 7, 2, 10, 10), new Date(2019, 8, 6, 10, 10)]
      }
    }
  },
  data () {
    return {
      dateRange: this.defaultDate
    }
  },
  mounted () {
    console.log(this.$refs.datePicker)
  },
  methods: {
    focus () {
      this.$nextTick(() => {
        let left = document.getElementsByClassName(this.className)[0].getElementsByClassName('is-left')[0]
        let rangeLeft = left.getElementsByClassName('in-range')

        for (let i = 0; i < rangeLeft.length; i++) {
          let span = rangeLeft[i].getElementsByTagName('span')[0]
          let spanValue = span.innerText
          let className = rangeLeft[i].className
          console.log(className)
          if (this.tags.includes(+spanValue)) {
            if (!className.split(' ').includes('danger')) {
              rangeLeft[i].className = className + ' danger'
            }
          } else if (!className.split(' ').includes('success')) {
            rangeLeft[i].className = className + ' success'
          }
        }

        // 右边月份
        let right = document.getElementsByClassName(this.className)[0].getElementsByClassName('el-date-range-picker__content is-right')[0]
        let rangeRight = right.getElementsByClassName('in-range')
        console.log(right)

        for (let i = 0; i < rangeRight.length; i++) {
          let span = rangeRight[i].getElementsByTagName('span')[0]
          let spanValue = span.innerText
          let className = rangeRight[i].className
          console.log(className)
          if (this.tags.includes(+spanValue)) {
            if (!className.split(' ').includes('danger')) {
              rangeRight[i].className = className + ' danger'
            }
          } else if (!className.split(' ').includes('success')) {
            rangeRight[i].className = className + ' success'
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .el-date-range-picker__content{
    .available.in-range.start-date, .available.in-range.end-date {
      span{
        color: #606266;
        background-color: #F0F5FB;
      }
    }
    .el-date-table td.today.end-date span, .el-date-table td.today.start-date span{
      /*background-color: #52A6FB;*/
    }
    .el-date-table td.end-date div, .el-date-table td.start-date div{
      /*color: #333333;*/
    }
    .available.in-range.start-date.success, .available.today.in-range.success{
      color: $color-success !important;
      div, span{
        color: $color-success !important;
      }
    }
    .available.in-range.start-date.danger, .available.today.in-range.danger{
      color: $color-danger !important;
      div, span{
        color: $color-danger !important;
      }
    }
    .today {
      span {
        /*background-color: #72bbff;*/
      }
    }
  }
</style>
