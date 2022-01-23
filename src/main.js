import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import YmapPlugin from 'vue-yandex-maps'
import Antd from 'ant-design-vue'
import i18n from "./i18n";
import './registerServiceWorker'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(YmapPlugin)
Vue.use(Antd)


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
