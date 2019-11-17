import shop from '../../_api/shop'

// initial state
const state = {
  all: [],
  product: {}
}

// getters
const getters = {}

// actions
const actions = {
  async getAllProducts({ commit }) {
    // console.log('getAllProduct actions');
    try {
      const allProducts = await shop.getAllProducts();
      if (allProducts) {
        commit('setAllProducts', allProducts);
        return allProducts;
      }
    } catch (error) {
      throw error;
    }
    // }
  },
  async getProduct({ commit }, { id }) {
    // console.log('getProduct action');
    try {
      const product = await shop.getProduct(id);
      if (product) {
        commit('setProduct', product);
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
}

// mutations
const mutations = {
  setAllProducts(state, products) {
    // console.log('setAllProducts mutation');
    state.all = products;
  },
  setProduct(state, product) {
    // console.log('setProduct mutation');
    state.product = product;
  },
  decrementProductInventory(state, { id, quantity }) {
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