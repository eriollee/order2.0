import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import NProgress from 'nprogress'


NProgress.configure({ showSpinner: false });
Vue.use(Router)

const router = new Router({
//   routes,
  mode: 'history'
})


// 路由跳转前验证
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
})


router.afterEach(() => {
    NProgress.done(); // 结束Progress
})

export default router
