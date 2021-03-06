import apiRequest from "../utils/apiRequest";
import ReconnectingWebSocket from 'reconnecting-websocket';


const WS_URL = process.env.VUE_APP_WS_URL;

function getId(url) {
    let someUrl = url.split('/')
    return someUrl[someUrl.length - 2]
}


export default {
    namespaced: true,
    state: {
        websocekt: '',
        allOrders: [],
        allUsers: [],
        category: '',
        cars: [],
        color: [],
    },

    getters: {
        getAllOrders: state => {
            return state.allOrders.reverse();
        },
        getAllCategory: state => {
            return state.category;
        },
        getAllCars: state => {
            return state.cars;
        },
        getAllColors: state => {
            return state.color;
        },
        getOrdersByStatus: state => (status) => {
            let a =state.allOrders.filter(order => order.status === status).reverse()
            return a;
        },
        getOrdersByDriver: state => (receiver) => {
            return state.allOrders.filter(order => order && order.receiver === receiver).reverse() || false;
        },
        getAllUsers: state => {
            return state.allUsers.reverse()
        },
        getSearchUsersByUsername: state => (searchText) => {
            return state.allUsers.filter(order => order.username.toUpperCase().includes(searchText.toUpperCase()));
        },
        getSearchUsersByCarNumber: state => (number) => {
            return state.allUsers.filter(order => order.info_driver.car_number && order.info_driver.car_number.toUpperCase().includes(number.toUpperCase()));
        },
        getUserById: state => (id) => {
            return state.allUsers.find(user => user.pk === id);
        },
        getUserByUrl: state => (url) => {
            return state.allUsers.find(user => user.url === url);
        },
        getCategoryByUrl: state => (url) => {
            return state.category.find(user => user.url === url);
        }
    },

    mutations: {
        SET_ALL_ORDERS(state, allOrders) {
            state.allOrders = allOrders
        },
        SET_ALL_CATEGORY(state, category) {
            state.category = category
        },
        SET_ALL_CARS(state, cars) {
            state.cars = cars
        },
        SET_ALL_COLORS(state, color) {
            state.color = color
        },
        SET_ALL_USERS(state, allUsers) {
            const users = allUsers.filter(user => user.is_superuser === false);
            state.allUsers = users
        },
        SET_NEW_CATEGORY(state, category) {
            state.category.push(category)
        },
        SET_NEW_CAR(state, car) {
            state.cars.push(car)
        },
        SET_NEW_COLOR(state, color) {
            state.color.push(color)
        },
    },

    actions: {
        async createOrder({dispatch}, order) {
            await new Promise((resolve) => {
                apiRequest
                    .post('/admin/order/', order)
                    .then(res => {
                        const id = getId(res.data.url)
                        dispatch('sendOrder', {
                            type: "send_order",
                            order_id: id,
                            user_id: ''
                        })
                        resolve()
                    })
                    .catch(error => {
                            alert("?????????? ???? ????????????????\n" +
                                error)
                    })
            })
        },
        async postCategory({commit}, category) {
            await new Promise((resolve) => {
                apiRequest
                    .post('/admin/category/', category)
                    .then(res => {
                        commit('SET_NEW_CATEGORY', res.data)
                        console.log(res)
                        resolve()
                    })
            })
        },

        async postCar({commit}, car) {
            await new Promise((resolve) => {
                apiRequest
                    .post('/admin/car/', car)
                    .then(res => {
                        commit('SET_NEW_CAR', res.data)
                        resolve()
                    })
            })
        },

        async postColor({commit}, color) {
            await new Promise((resolve) => {
                apiRequest
                    .post('/admin/color/', color)
                    .then(res => {
                        commit('SET_NEW_COLOR', res.data)
                        resolve()
                    })
            })
        },
        async putCategory({dispatch}, newCategory) {
            await new Promise((resolve) => {
                const id = getId(newCategory.url)
                apiRequest
                    .put(`/admin/category/${id}/`, newCategory)
                    .then(res => {
                        dispatch('getCategory')
                        alert("?????????????????? " + res.data.name + " ???????? ?????????????????????????????? !!! ")
                        resolve()
                    })
            })
        },
        webSocket({state}) {
            state.websocekt = new ReconnectingWebSocket(`${WS_URL}`);
            state.websocekt.onopen = (e) => {
                console.log(e)
            };
            state.websocekt.onmessage = (e) => {
                console.log(e)

            }
            state.websocekt.onclose = (e) => {
                console.log(e)
            }
            state.websocekt.onerror = (e) => {
                console.log(e)
            }
        },

        sendOrder({state}, order) {
            let orderJson = JSON.stringify(order)
            console.log(state.websocekt);
            state.websocekt.send(orderJson);
        },

        async getOrders({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get('/admin/order/')
                    .then(res => {
                        commit('SET_ALL_ORDERS', res.data)
                        resolve()
                    })
            })
        },


        async getUsers({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get('/admin/user/')
                    .then(res => {
                        commit('SET_ALL_USERS', res.data)
                        resolve()
                    })
            })
        },

        async getCategory({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get('/admin/category/')
                    .then(res => {
                        commit('SET_ALL_CATEGORY', res.data)
                        resolve()
                    })
            })
        },

        async getCars({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get('/admin/car/')
                    .then(res => {
                        commit('SET_ALL_CARS', res.data)
                        resolve()
                    })
            })
        },

        async getColors({commit}) {
            await new Promise((resolve) => {
                apiRequest
                    .get('/admin/color/')
                    .then(res => {
                        commit('SET_ALL_COLORS', res.data)
                        resolve()
                    })
            })
        },


        async patchBalance(state, balance) {
            await new Promise((resolve) => {
                apiRequest
                    .patch(`/admin/driver/${balance.id}/`, balance)
                    .then(res => {
                        alert("???????????? ???????????????????????? ?????? ???????????????? ?????????????????????? \n ?????????????? ???????????? " + res.data.balance)
                        resolve()
                    })
            })
        },


        async patchDriverInfo(state, info) {
            await new Promise((resolve) => {
                apiRequest
                    .patch(`/admin/driver/${info.id}/`, info)
                    .then(
                        alert("???????? ???????????????? ???????? ??????????????????"),
                        resolve()
                    )
            })
        },

    },

};
