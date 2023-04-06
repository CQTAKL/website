// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入样式
import './assets/css/base.css'
import './assets/css/common.css'
import './assets/font/iconfont.css'

Vue.config.productionTip = false

// 引入三方插件
import axios from 'axios';
Vue.prototype.$axios = axios;
import VueCookies from 'vue-cookies';
Vue.prototype.$base_url = "http://localhost:3000";
Vue.use(VueCookies);
// 全局设置 axios 发送请求带上cookie
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
