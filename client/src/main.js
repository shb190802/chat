import Vue from 'vue'
import App from './App.vue'
import Socket from './libs/socket'
import ShbVueUpload from 'shb-vue-upload'

Vue.use(Socket)
Vue.use(ShbVueUpload)


Vue.config.productionTip = false

new Vue({
  render: function (h) {
    return h(App)
  },
}).$mount('#app')