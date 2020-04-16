<template>
  <div class="account">
    账号管理
    <m-table :data="tableData"></m-table>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      tableData: {
        list: [],
        limit: 20,
        page: 1
      }
    }
  }
}
</script>

<style lang="scss">
</style>
