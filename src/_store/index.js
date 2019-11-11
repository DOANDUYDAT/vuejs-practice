import Vue from 'vue'
import Vuex from 'vuex'

// import login from './modules/login'
import cart from './modules/cart'
import products from './modules/products'
import alert from './modules/alert'
import authentication from './modules/authentication'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    // login,
    cart,
    products,
    alert,
    authentication
  },
  strict: debug,

})