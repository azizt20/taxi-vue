import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import YmapPlugin from 'vue-yandex-maps'
import Antd from 'ant-design-vue'
import './registerServiceWorker'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(YmapPlugin)
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
