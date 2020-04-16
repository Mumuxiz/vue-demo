<template>
  <div id="login">
    <div class="l-logo">
      <!--<el-image :src="logoUrl" fit="cover">-->
        <!--<div slot="error" class="image-slot info">logo</div>-->
      <!--</el-image>-->
    </div>
    <div class="l-form">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="loginForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div class="flex">
            <el-input v-model.number="loginForm.code"></el-input>
            <!-- 引用验证码 -->
            <m-sms-code :identify-code="identifyCode" @click.native="getCode"></m-sms-code>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { checkCode } from '../../utils/validate'
import { createMenu } from '../../utils/permission'

export default {
  name: 'login',
  data () {
    return {
      logoUrl: require('../../assets/img/logo.png'),
      loginForm: {
        userName: '',
        pass: '',
        code: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: checkCode.bind(this), trigger: 'blur' }
        ]
      },
      // 后台传值的验证码
      identifyCode: '1234'
    }
  },
  created () {
    console.log('登录页创建成功', process.env.VUE_APP_BASE_API)
    this.getCode()
  },
  methods: {
    // 获取验证码
    getCode () {
      this.identifyCode = 1234
      // this.$axios.get('/code').then(resp => {
      //   this.identifyCode = resp.data
      //   console.log('验证码：', resp)
      // }).catch(error => {
      //   this.$message.error(error)
      // })
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.loginForm).then(resp => {
            console.log(resp)
            let menu = createMenu()
            console.log(menu)
          }).catch(error => {
            this.message.error(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style lang="scss">
  #login {
    .l-logo {
      width: 100%;
      height: 200px;
      line-height: 200px;
    }
    .l-form{
      margin: 0 auto;
      padding: 50px;
      width: 400px;
      border: 1px solid $lightGray;
      border-radius: 4px;
    }
  }
</style>
