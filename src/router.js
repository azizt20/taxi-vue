import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateOrder from './views/CreateOrder'
import store from '@/store';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'order',
    component: CreateOrder,
    meta: {
      title: 'Главная',
      layout: 'empty',
      requiredAuth: false,
    }
  },
  {
    path: '/add',
    name: 'addLocations',
    component: () => import('./views/AddLocations.vue'),
    meta: {
      title: 'Добавить новую локацию',
      layout: 'empty',
      requiredAuth: false,
    }
  },
  {
    path: '/edit',
    name: 'editLocations',
    component: () => import('./views/EditLocations.vue'),
    meta: {
      title: 'Редактировать локации',
      layout: 'empty',
      requiredAuth: false,
    }
  },
  {
    path: '/orders',
    name: 'orderInfo',
    component: () => import('./views/OrdersInfo'),
    meta: {
      title: 'Информация о заказах',
      layout: 'empty',
      requiredAuth: false,
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
          document.title = `${to.meta.title}`;
          next();
        }
      })
      .catch(() => {
        if (to.meta.requiredAuth) {
          next({ name: 'login' });
        } else {
          document.title = `${to.meta.title}`;
          next();
        }
      });
});

export default router
