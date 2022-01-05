import apiRequest from "../utils/apiRequest";

const WS_URL = process.env.VUE_APP_WS_URL;
function  getId(url){
    let someUrl = url.split('/')
    return someUrl[someUrl.length-2]
}


export default {
    namespaced: true,
    state: {
        websocekt: '',
        allOrders: '',
        allUsers: '',
    },

    getters: {
        getAllOrders: state => {
            return state.allOrders;
        },
        getOrdersByStatus: state => (status) => {
            return state.allOrders.filter(order => order.status === status);
        },
        getAllUsers: state => {
            return state.allUsers
        },
        getUserById: state => (id) => {
            return state.allUsers.filter(user => user.pk === id);
        }
    },

    mutations: {
        SET_ALL_ORDERS(state, allOrders){
            state.allOrders = allOrders
        },
        SET_ALL_USERS(state, allUsers){
            const users = allUsers.filter(user => user.is_superuser === false);
            state.allUsers = users
        }
    },

    actions: {
        async createOrder({dispatch}, order) {
            await new Promise((resolve) => {
                apiRequest
                    .post('/admin/order/', order)
                    .then(res => {
                        const id = getId(res.data.url)
                        alert(id)
                        dispatch('sendOrder', {
                            type: "send_order",
                            order_id: id
                        })
                        resolve()
                    })
            })
        },

        webSocket({state}) {
            state.websocekt = new WebSocket(`${WS_URL}`);
            state.websocekt.onopen = (e) => {
                console.log(e)
            };
            state.websocekt.onmessage = (e) => {
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

    },

};