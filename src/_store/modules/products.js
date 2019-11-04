import shop from '../../_api/shop'

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products)
    })
  }
}

// mutations
const mutations = {
  setProducts (state, products) {
    state.all = products
  },

  decrementProductInventory (state, { id, quantity }) {
    const product = state.all.find(product => product.id === id)
    product.inventory -= quantity
    console.log(product.inventory)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}