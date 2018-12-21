import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from '@/config'
import iView from 'iview'
import './index.less'

Vue.use(iView)
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
