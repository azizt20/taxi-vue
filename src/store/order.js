import apiRequest from "../utils/apiRequest";

const WS_URL = process.env.VUE_APP_WS_URL;

export default {
    namespaced: true,
    state: {
        oreder: null,
        websocekt: '',
        status: '',
        allOrders: ''
    },
    getters: {
        getAllOrders: state => {
            return state.allOrders;
        },
    },
    mutations: {
        SET_ORDER(state, order) {
            state.order = order
        },
        SET_STATUS(state, status) {
            state.status = status
        },
        SET_ALL_ORDERS(state, allOrders){
            state.allOrders.push(allOrders)
        }

    },
    actions: {
        async createOrder({dispatch, commit}, order) {
            await new Promise((resolve) => {
                apiRequest
                    .post('/admin/order/', order)
                    .then(res => {
                        commit('SET_ORDER', res)
                        dispatch('sendOrder', {
                            type: "accept_order",
                            order_id: order.url
                        })
                        resolve()
                    })
            })
        },
        webSocket(state, {commit}) {
            state.websocekt = new WebSocket(`${WS_URL}`);
            state.websocekt.onopen = (e) => {
                alert(e)
                console.log(e)
                commit('SET_STATUS', "connected")
            };
            state.websocekt.onmessage = (e) => {
                console.log(e)
            }
        },
        sendOrder(state, orderUrl) {
            console.log(state.websocekt);
            state.websocekt.send(orderUrl);
        }
    },

};