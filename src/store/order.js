import apiRequest from "../utils/apiRequest";

const WS_URL = process.env.VUE_APP_WS_URL;
function  getId(url){
    let someUrl = url.split('/')
    console.log(someUrl[someUrl.length-2])
    console.log(someUrl)
    return someUrl[someUrl.length-2]
}


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
                        commit('SET_ORDER', res.data)
                        const id = getId(res.data.url)
                        dispatch('sendOrder', {
                            type: "send_order",
                            order_id: id
                        })
                        resolve()
                    })
            })
        },
        webSocket({state, commit}) {
            state.websocekt = new WebSocket(`${WS_URL}`);
            state.websocekt.onopen = (e) => {
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