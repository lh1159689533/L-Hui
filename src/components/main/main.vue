<template>
  <div id="main" :class="cls">
    <HRegister :style="regcls" @trigger="trig"></HRegister>
    <HLogin :style="logcls" @trigger="trig"></HLogin>
  </div>
</template>
<script>
import axios from '../../axios/axios'
import router from '../../router/index'
import storage from '../../localStorage'
import HRegister from './register'
import HLogin from './login'
export default {
  name: 'Main',
  components: {
    HRegister,
    HLogin
  },
  data () {
    return {
      user: {
        name: '',
        password: ''
      },
      cls: '',
      clsKey: true,
      logcls: { top:0, zIndex:999 },
      regcls: { top:'100%', zIndex:0 }
    }
  },
  methods: {
    trig () {
      const key = this.clsKey
      setTimeout(() => {
        this.trigTop(key)
      }, 1500)
      this.cls = this.clsKey ? 'log' : 'reg'
      this.clsKey = !this.clsKey
    },
    trigTop (key) {
      if (key) {
        this.logcls = { top:'100%', zIndex:0 }
        this.regcls = { top:0, zIndex:999 }
      } else {
        this.logcls = { top:0, zIndex:999 }
        this.regcls = { top:'100%', zIndex:0 }
      }
    }
  }
}
</script>
<style>
@import './main.css';
</style>
