import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateOrder from './views/CreateOrder'
import store from '@/store';
import apiRequest from "./utils/apiRequest";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('./views/Login.vue'),
        meta: {
            title: 'Login',
            layout: 'main',
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
            requiredAuth: true,
        }
    },
    {
        path: '/edit',
        name: 'editLocations',
        component: () => import('./views/EditLocations.vue'),
        meta: {
            title: 'Редактировать локации',
            layout: 'empty',
            requiredAuth: true,
        }
    },
    {
        path: '/orders',
        name: 'orderInfo',
        component: () => import('./views/OrdersInfo'),
        meta: {
            title: 'Информация о заказах',
            layout: 'empty',
            requiredAuth: true,
        }
    },
    {
        path: '/panel',
        name: 'panel',
        component: () => import('./views/ControlPanel'),
        meta: {
            title: 'Панель конроля',
            layout: 'empty',
            requiredAuth: true,
        }
    },
    {
        path: '/driver',
        name: 'driver',
        component: () => import('./views/DriverPanel'),
        meta: {
            title: 'Водитель',
            layout: 'empty',
            requiredAuth: true,
        }
    },
    {
        path: '/privacy_policy',
        name: 'politics',
        component: () => import('./views/Politika'),
        meta: {
            title: 'Политика конфиденциальности',
            layout: 'main',
            requiredAuth: false,
        }
    },
    {
        path: '/create',
        name: 'order',
        component: CreateOrder,
        meta: {
            title: 'Главная',
            layout: 'empty',
            requiredAuth: true,
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
                next({name: 'login'});
            } else {
                document.title = `${to.meta.title}`;
                next();
            }
        })
        .catch(() => {
            if (to.meta.requiredAuth) {
                next({name: 'login'});
            } else {
                document.title = `${to.meta.title}`;
                next()
            }
        });
    apiRequest.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status) {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                router.replace({
                    name: 'login'

                })
            }
            return Promise.reject(error.response.data);
        }
    });

});

export default router
