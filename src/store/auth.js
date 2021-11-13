import apiRequest from '@/utils/apiRequest';
import router from "../router";

export default {
    namespaced: true,
    state: {
        token: undefined,
        isAuthorized: undefined,
    },
    getters: {
        isAuthorized: (state) => state.isAuthorized === true,
    },
    mutations: {
        SET_TOKEN(state, token) {
            localStorage.setItem('token', token);
            apiRequest.defaults.headers.Authorization = `Token ${token}`;
            state.token = token;
        },
        SET_AUTHORIZED_STATUS(state, status) {
            state.isAuthorized = status;

        },

        REMOVE_TOKEN(state) {
            localStorage.removeItem('token');
            state.token = undefined;
            apiRequest.defaults.headers.Authorization = `Token ${state.token}`;
        }
    },
    actions: {
        login({commit}, formData) {
            return new Promise((resolve, reject) => {
                alert("asdasda")
                apiRequest
                    .post('/login/', formData)
                    .then((result) => {
                        const key = result.data.key;
                        alert(key)
                        commit('SET_TOKEN', key);
                        commit('SET_AUTHORIZED_STATUS', true);
                        resolve();
                    })
                    .catch((error) => {
                        // alert("Вы ввели неправельный логин или пароль!!!")
                        reject(error);
                    });
            });
        },
        refresh({commit, getters}) {
            return new Promise((resolve, reject) => {
                if (getters.isAuthorized) {
                    resolve();
                } else {
                    const key = localStorage.getItem('token');
                    if (key) {
                        commit('SET_TOKEN', key);
                        commit('SET_AUTHORIZED_STATUS', true);
                        resolve();
                    } else {
                        reject();
                    }
                }
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                alert("asdas")
                apiRequest
                    .post('/logout/')
                    .then(() => {
                        commit('REMOVE_TOKEN');
                        commit('SET_AUTHORIZED_STATUS', false);
                        router.push({name: 'login'})

                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
        },
    },
};