<template>
  <div id="hello">
    <div style="padding: 15%">
      <el-container>
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
                  <el-input v-model="user.password" :placeholder="info.plhod_pass" @focus="input_pass_focus" @blur="input_pass_blur" clearable></el-input>
                </el-form-item>
                <Icon type="md-arrow-forward" size="24" color="#ffffff" @click="login('userForm')" />
              </el-form>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import axios from '../axios/axios'
import router from '../router/index'
import snow from './snow/index'
import cherry from './cherry/index'
export default {
  name: 'Hello',
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
              localStorage.setItem("user", JSON.stringify(res.data))
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
  #hello .el-header {
    color: #409EFF;
    font-size: 26px;
  }
  #hello .el-input__inner {
    border:1px solid #808695;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    border-radius: 0;
    background-color: transparent;
    color: #fff;
  }
  #hello .name-label {
    top: -15px;
  }
  #hello .pass-label {
    top: 53px;
  }
  #hello .el-form-label {
    position: absolute;
    z-index: 1000;
    display: block;
    float: left;
    padding: 0;
    color: #409EFF;
    font-size: 15px;
    line-height: 20px;
    font-family: 'Hiragino Sans GB';
    font-weight: 800;
  }
  #hello .el-form-label-name-show {
    animation:show-name 0.6s ease-in-out 0s backwards;
  }
  #hello .el-form-label-name-hide {
    animation:hide-name 0.6s ease-in-out 0s backwards;
  }
  @keyframes show-name{
    0%{
      transform:translate3d(15px, 20px, 0);
    }
    100%{
      transform:translate3d(0px, 0px, 0);
    }
  }
  @keyframes hide-name{
    0%{
      transform:translate3d(0px, 0px, 0);
    }
    100%{
      transform:translate3d(15px, 20px, 0);
    }
  }
  #hello .el-form-label-pass-show {
    animation:show-pass 0.6s ease-in-out 0s backwards;
  }
  #hello .el-form-label-pass-hide {
    animation:hide-pass 0.6s ease-in-out 0s backwards;
  }
  @keyframes show-pass{
    0%{
      transform:translate3d(15px, 21px, 0);
    }
    100%{
      transform:translate3d(0px, 0px, 0);
    }
  }
  @keyframes hide-pass{
    0%{
      transform:translate3d(0px, 0px, 0);
    }
    100%{
      transform:translate3d(15px, 21px, 0);
    }
  }
  #hello .ivu-icon {
    font-size: 24px;
    position: absolute;
    top: 50%;
    left: 61.5%;
    cursor: pointer;
  }
  #hello .ivu-icon:hover {
    color: #2db7f5 !important;
  }
  #hello .el-input__inner::-webkit-input-placeholder { /* WebKit browsers */
    color: #409EFF;
    font-weight: 800;
    font-size: 15px;
  }
  #hello .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #409EFF;
    font-weight: 800;
    font-size: 14px;
  }
  #hello .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #409EFF;
    font-weight: 800;
    font-size: 14px;
  }
  #hello .el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #409EFF;
    font-weight: 800;
    font-size: 14px;
  }
</style>
