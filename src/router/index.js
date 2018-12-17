import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'


Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})


// 路由跳转前验证
router.beforeEach((to, from, next) => {
    if(to.path != '/'){//未登录，强制登录
        next({
            name:"login"  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
    }else{
        next();
    }
     
})


router.afterEach(() => {
})

export default router
