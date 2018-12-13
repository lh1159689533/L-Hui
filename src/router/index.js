import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Hello'
import Home from '@/components/home'
import Gobang from '@/components/gobang'
import Tzfe from '@/components/tzfe'

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
      component: Home,
      children: [
        {
          path: '/golang',
          component: Gobang
        },{
          path: '/2048',
          component: Tzfe
        }
      ]
    }
  ]
})
