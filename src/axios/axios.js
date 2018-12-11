import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
import { Notification } from 'element-ui'

Vue.prototype.$notify = Notification

axios.defaults.baseURL = 'http://localhost:8888'
axios.defaults.withCredentials = false
axios.defaults.timeout = 50000

//请求拦截处理
axios.interceptors.request.use(config => {
  let user = localStorage.getItem("user")
  console.log("user:",user)
  if (user != undefined && user !== 'undefined' && user !== null && user !== 'null' && user !== '') {
  	let jUser = null;
  	if (jUser != undefined && jUser !== 'undefined' && jUser !== null && jUser !== 'null' && jUser !== '') {
  		jUser = JSON.parse(user)
  	}
	  if (config.method === 'get') {
			if (config.params === undefined) {
			  config.params = {}
			}
			if (jUser != null) {
				config.params.userId = jUser.userId
				config.params.token = jUser.token
			}
		} else if (config.method === 'post') {
			if (config.data === undefined) {
				config.data = {}
			}
			if (jUser !== null) {
				config.data.userId = jUser.userId
				config.data.token = jUser.token
			}
		}
	}

	return config
})

//响应拦截处理
axios.interceptors.response.use((response) => {
	if (response.data.code === 0 || response.data.code === '0' || response.data.code === 1 || response.data.code === '1') {
		return response.data
	} else if (response.data.code === 402 || response.data.code === '402') {
		Notification({
			title: '叮叮o(╥﹏╥)o',
      message: '登录失效,请重新登录哟',
      type: 'warning',
      position: 'bottom-right'
		})
		router.push({path: '/'})
	}
})

export default axios