<template>
  <div>
    <el-table
      ref="table"
      :data="data.list"
      style="width: 100%">
      <el-table-column v-if="selectable" type="selection" width="50" align="right" :selectable="selectionHand"></el-table-column>
      <slot></slot>
    </el-table>

    <m-pagination
      v-if="showPage"
      v-model="query.page"
      :page-size="data.limit"
      :selected-total="selectedItems.length"
      :table="$refs.table"
      :total="data.total">
      <slot name="pagination"></slot>
    </m-pagination>
  </div>
</template>

<script>
export default {
  name: 'm-table',
  props: {
    data: Object,
    selectable: {
      type: Boolean,
      default: true
    },
    selectionHand: Function,
    // 是否显示分页
    showPage: {
      type: Boolean,
      default: true
    },
    // 表格的查询
    query: {
      type: Object,
    },
    // 多选框
    selectedItems: Array
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
</style>
