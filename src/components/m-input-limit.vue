<template>
  <!-- 在element-ui中input的基础上增加了上下限 -->
  <div class="input-limit-ui">
    <div :class="['input-wrapper', show ? 'border':'']">
      <el-input
        v-model.trim="limitDown"
        size="small"
        placeholder="请输入下限"
        @focus="show = true"
        @blur="show = false"
        @keyup.native="enterValidate"></el-input>
      <div class="line"></div>
      <el-input
        v-model.trim="limitUp"
        size="small"
        placeholder="请输入上限"
        @focus="show = true"
        @blur="show = false"
        @keyup.native="enterValidate"></el-input>
      <div class="clear">
        <i class="el-icon-circle-close" v-show="limitUp || limitDown" @click="clearable"></i>
      </div>
      <el-button type="primary" size="mini" @click="submit">确定</el-button>
    </div>
    <p class="danger text-left text-sm mt-min" v-if="tip && limitUp && limitDown && +limitUp <= +limitDown">上限必须大于下限</p>
  </div>
</template>

<script>
export default {
  name: 'input-limit-ui',
  props: {
    tip: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      show: false,
      limitDown: '',
      limitUp: ''
    }
  },
  methods: {
    clearable () {
      this.limitDown = ''
      this.limitUp = ''
    },
    // 验证输入是否合法
    enterValidate () {
      let regNum = /^[1-9]\d*|0$/
      if (!regNum.test(this.limitDown)) {
        this.limitDown = ''
      }
      if (!regNum.test(this.limitUp)) {
        this.limitUp = ''
      }
    },
    submit () {
      if (this.limitUp && this.limitDown && +this.limitUp > +this.limitDown) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss">
  .input-limit-ui{
    width: 270px;
    font-size: 14px;
    .input-wrapper{
      display: flex;
      border: 1px solid #DCDFE6;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      .el-input{
        width: 100px;
        height: 32px;
        input{
          border: none;
        }
      }
      .line{
        width: 1px;
        position: relative;
        &:after{
          content: '';
          position: absolute;
          top: 9px;
          left: 0;
          width: 1px;
          height: 14px;
          background-color: $color-info;
        }
      }
      .clear{
        width: 20px;
      }
      i{
        line-height: 32px;
        margin-right: 4px;
        cursor: pointer;
      }
      .el-button{
        width: 60px;
      }

      /*.input{
        width: 50%;
        padding: 8px 10px;
        box-sizing: border-box;
        text-align: left;
        position: relative;
        color: $black;
      }
      !*为空时显示 element attribute content*!
      .input:empty:before{
        content: attr(placeholder);   !* element attribute*!
        color: $color-info;
        position: absolute;
        top: 8px;
        height: 20px;
        font-size: 14px;
        width: calc(100% - 10px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      !*焦点时内容为空*!
      .input:focus:before{
        content:none;
      }
      .line {
        position: relative;
        &:after{
          content: '';
          position: absolute;
          top: 9px;
          left: 0;
          width: 1px;
          height: 16px;
          background-color: $color-info;
        }
      }
      .el-button{
        width: 60px;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }*/
    }

    .border {
      border: 1px solid $color-primary !important;
    }
  }
</style>
