<template>
  <div id="login">
    <el-header><span>LiuH</span></el-header>
    <el-main>
      <el-row>
        <el-col :span="6" :offset="9">
          <el-form :model="user" :rules="rules" ref="userForm" label-width="80px" size="small" label-position="top">
            <label :class="showClass.name_label_cls" v-show="info.show_name">用户名</label>
            <el-form-item prop="name">
              <el-input v-model="user.name" :placeholder="info.plhod_name" @focus="input_name_focus" @blur="input_name_blur" clearable></el-input>
            </el-form-item>
            <el-form-item></el-form-item>
            <label :class="showClass.pass_label_cls" v-show="info.show_pass">密码</label>
            <el-form-item prop="password">
              <el-input type="password" v-model="user.password" :placeholder="info.plhod_pass" @focus="input_pass_focus" @blur="input_pass_blur" @keyup.enter.native="login('userForm')" clearable></el-input>
            </el-form-item>
            <Icon type="md-arrow-forward" size="24" color="#ffffff" @click="login('userForm')" />
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>
<script>
import axios from '../../axios/axios'
import router from '../../router/index'
import snow from '../snow/index'
import cherry from '../cherry/index'
import storage from '../../localStorage'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        name: '',
        password: ''
      },
      info: {
        show_name: false,
        plhod_name: '用户名',
        show_pass: false,
        plhod_pass: '密码'
      },
      showClass: {
        name_label_cls: '',
        pass_label_cls: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      season: 'Spring',
      seasons: [{
        label: '春',
        value: 'Spring'
      }, {
        label: '夏',
        value: 'Summer'
      }, {
        label: '秋',
        value: 'Autumn'
      }, {
        label: '冬',
        value: 'Winter'
      }]
    }
  },
  mounted: function() {
    this.init()
  },
  methods: {
    init () {
      let n = Math.random() * 10
      if (n < 5) {
        cherry.init(document.getElementById('cv'))
      } else {
        snow.init(document.getElementById('cv'))
      }
    },
    input_name_focus () {
      this.info.show_name = true
      this.info.plhod_name = ''
      this.showClass.name_label_cls = 'el-form-label name-label el-form-label-name-show'
    },
    input_name_blur () {
      if (this.user.name === '') {
        setTimeout(() => {
          this.info.show_name = false
          this.info.plhod_name = '用户名'
        }, 580)
        this.showClass.name_label_cls = 'el-form-label name-label el-form-label-name-hide'
      }
    },
    input_pass_focus () {
      this.info.show_pass = true
      this.info.plhod_pass = ''
      this.showClass.pass_label_cls = 'el-form-label pass-label el-form-label-pass-show'
    },
    input_pass_blur () {
      if (this.user.password === '') {
        setTimeout(() => {
          this.info.show_pass = false
          this.info.plhod_pass = '密码'
        }, 580)
        this.showClass.pass_label_cls = 'el-form-label pass-label el-form-label-pass-hide'
      }
    },
    login (formName) {
      var user = this.user
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/hui/user/login', user).then(res => {
            if (res.code === 1) {
              this.$notify({
                title: '登录失败',
                type: 'error',
                message: res.message,
                position: 'bottom-right'
              })
            } else {
              this.$notify({
                title: '^_^ 欢迎回来 ' + res.data.name,
                type: 'success',
                position: 'bottom-right'
              })
              storage.set("user", res.data)
              router.push({path: '/home'})
            }
          }).catch(error => {
            console.log('error:',error)
            this.$notify({
              title: '登录失败',
              message: '登录出错',
              type: 'error',
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
@import './login.css';
</style>
