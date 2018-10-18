import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Hello'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Login
    },
    {
    	path: '/home',
    	name: 'Home',
    	component: Home
    }
  ]
})
