import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { setToken, getToken  } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

const LOGIN_PAGE_NAME = 'login'

// 路由跳转前验证
router.beforeEach((to, from, next) => {
    const token = getToken()
   // console.log('rout')
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        // 未登录且要跳转的页面不是登录页
        next({
          name: LOGIN_PAGE_NAME // 跳转到登录页
        })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // console.log('token && to.name === LOGIN_PAGE_NAME')
        // 已登录且要跳转的页面是登录页
        next({
          name: homeName // 跳转到homeName页
        })
      } else{ 
        next();
    }
    
     
})


router.afterEach(() => {
})

export default router
