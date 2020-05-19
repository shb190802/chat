import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('localhost')
}))
new Vue({
  render: function (h) {
    return h(App)
  },
}).$mount('#app')