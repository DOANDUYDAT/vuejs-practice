import Vue from 'vue'
import Vuex from 'vuex'

// import login from './modules/login'
import cart from './modules/cart'
import products from './modules/products'
import alert from './modules/alert'
import authentication from './modules/authentication'
import navigator from './modules/navigator'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    // login,
    cart,
    products,
    alert,
    authentication,
    navigator
  },
  strict: debug,

})