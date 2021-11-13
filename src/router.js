import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from './views/Order'
import store from '@/store';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'order',
    component: Order,
    meta: {
      title: 'Главная',
      layout: 'main',
      requiredAuth: true,
    }
  },
  {
    path: '/add',
    name: 'addLocations',
    component: () => import('./views/AddLocations.vue'),
    meta: {
      title: 'Добавить новую локацию',
      layout: 'empty',
      requiredAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
    meta: {
      title: 'Login',
      layout: 'main',
      requiredAuth: false,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  store.dispatch('auth/refresh')
      .then(() => {
        const isAuthorized = store.getters['auth/isAuthorized'];

        if (to.meta.requiredAuth && !isAuthorized) {
          next({ name: 'login' });
        } else {
          document.title = `${to.meta.title} - Ecoforum40.ru`;
          next();
        }
      })
      .catch(() => {
        if (to.meta.requiredAuth) {
          next({ name: 'Login' });
        } else {
          document.title = `${to.meta.title} - Ecoforum40.ru`;
          next();
        }
      });
});

export default router
