// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
    // "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 0.0.0.0"
