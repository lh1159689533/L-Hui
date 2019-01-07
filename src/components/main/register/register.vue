<template>
  <div id="register" class="register">
      <slot></slot>
      <el-header><span>LiuH</span></el-header>
      <el-main>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form :model="userReg" :rules="rules" ref="regForm" label-width="80px" size="small" label-position="top">
              <label :class="regshowClass.name_label_cls" v-show="reginfo.show_name">用户名</label>
              <el-form-item prop="name">
                <el-input v-model="userReg.name" :placeholder="reginfo.plhod_name" @focus="input_name_focus" @blur="input_name_blur" clearable></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <label :class="regshowClass.pass_label_cls" v-show="reginfo.show_pass">密码</label>
              <el-form-item prop="password">
                <el-input type="password" v-model="userReg.password" :placeholder="reginfo.plhod_pass" @focus="input_pass_focus" @blur="input_pass_blur" clearable></el-input>
              </el-form-item>
              <el-form-item></el-form-item>
              <label :class="regshowClass.email_label_cls" v-show="reginfo.show_email">邮箱</label>
              <el-form-item prop="email">
                <el-input type="email" v-model="userReg.email" :placeholder="reginfo.plhod_email" @focus="input_email_focus" @blur="input_email_blur" @keyup.enter.native="register('regForm')" clearable></el-input>
              </el-form-item>
              <el-form-item size="large" style="margin-top: 60px;">
                <el-button type="primary" @click="register('regForm')">注册</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <span @click="toLog"><a>去登录</a></span>
      </el-footer>
    </div>
</template>
<script>
import axios from '../../../axios/axios'
export default {
  name: 'HRegister',
  data () {
    return {
      userReg: {
        name: '',
        password: '',
        email: ''
      },
      reginfo: {
        show_name: false,
        plhod_name: '用户名',
        show_pass: false,
        plhod_pass: '密码',
        show_email: false,
        plhod_email: '邮箱'
      },
      regshowClass: {
        name_label_cls: '',
        pass_label_cls: '',
        email_label_cls: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    toLog () {
      this.$emit("trigger")
    },
    input_name_focus () {
      this.reginfo.show_name = true
      this.reginfo.plhod_name = ''
      this.regshowClass.name_label_cls = 'el-form-label name-label el-form-label-name-show'
    },
    input_name_blur () {
      if (this.userReg.name === '') {
        setTimeout(() => {
          this.reginfo.show_name = false
          this.reginfo.plhod_name = '用户名'
        }, 580)
        this.regshowClass.name_label_cls = 'el-form-label name-label el-form-label-name-hide'
      }
    },
    input_pass_focus () {
      this.reginfo.show_pass = true
      this.reginfo.plhod_pass = ''
      this.regshowClass.pass_label_cls = 'el-form-label pass-label el-form-label-pass-show'
    },
    input_pass_blur () {
      if (this.userReg.password === '') {
        setTimeout(() => {
          this.reginfo.show_pass = false
          this.reginfo.plhod_pass = '密码'
        }, 580)
        this.regshowClass.pass_label_cls = 'el-form-label pass-label el-form-label-pass-hide'
      }
    },
    input_email_focus () {
      this.reginfo.show_email = true
      this.reginfo.plhod_email = ''
      this.regshowClass.email_label_cls = 'el-form-label email-label el-form-label-email-show'
    },
    input_email_blur () {
      if (this.userReg.email === '') {
        setTimeout(() => {
          this.reginfo.show_email = false
          this.reginfo.plhod_email = '邮箱'
        }, 580)
        this.regshowClass.email_label_cls = 'el-form-label email-label el-form-label-email-hide'
      }
    },
    register (formName) {
      const user = this.userReg
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/hui/user/register', user).then((res) => {
            if (res.code == 0) {
              this.$notify({
                title: '注册成功,请登录',
                type: 'success',
                position: 'bottom-right'
              })
              _this.toLog()
              _this.userReg = {}
            }
          }).catch((err) => {
            console.log(err)
            this.$notify({
              title: '注册失败',
              type: 'error',
              message: err.message,
              position: 'bottom-right'
            })
          })
        } else {
          console.log(valid)
        }
      })
    }
  }
}
</script>
<style>
@import './register.css';
</style>

