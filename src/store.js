import Vue from 'vue'
import Vuex from 'vuex'
import map from "./store/map";
import auth from "./store/auth";
import order from "./store/order";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    map,
    auth,
    order
  }
})
