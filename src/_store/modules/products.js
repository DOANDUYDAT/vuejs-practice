import shop from '@/_api/shop';
import { productService } from "@/_api";

// initial state
const state = {
  allProducts: [],
}

// getters
const getters = {}

// actions
const actions = {
  async getAllProducts({ commit }) {
    try {
      const allProducts = await productService.getAllProducts();
      if (allProducts.length > 0) {
        commit('setAllProducts', allProducts);
        return true;
      }
    } catch (error) {
      throw error;
    }

  },
  async getProduct({ commit }, { id }) {

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
    state.allProducts = products;
  },
  setProduct(state, product) {
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