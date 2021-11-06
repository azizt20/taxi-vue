import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: {
    //   title: 'Главная',
    //   layout: 'empty'
    // }
  },
  {
    path: '/add',
    name: 'AddLocations',
    component: () => import('./views/AddLocations.vue'),
    // meta: {
    //   title: 'Добавить новую локацию',
    //   layout: 'main'
    // }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
