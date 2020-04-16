<template>
  <dl class="xm-pagination" :class="{small: small}">
    <dd>
      <transition name="xm-left-in">
        <div class="selection-info" v-show="selectedTotal > 0">
          <i class="el-icon-info"/>已选 <span>{{ selectedTotal }}</span> 项
          <span class="cur" @click="clearAll">清空</span>
        </div>
      </transition>
      <slot></slot>
    </dd>
    <dd class="text-right">
      <el-pagination
        background
        @current-change="pageChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :small="small"
        :total="total">
      </el-pagination>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'm-pagination',
  props: {
    value: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    // 已被选中的列表元素数量
    selectedTotal: {
      type: Number,
      default: 0
    },
    // 分页对应的表格组件
    // 需要调用表格方法，执行clearSelection()
    table: {
      type: Object,
      default () {
        return {}
      }
    },
    small: Boolean
  },
  data () {
    return {}
  },
  methods: {
    pageChange (page) {
      // 可能会移除改方法，目前使用不到该方法
      this.$emit('current-change', page)
    },
    clearAll () {
      try {
        this.table.clearSelection()
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
