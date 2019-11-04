import shop from '../../_api/shop'
import { formatCurrency } from '../../_api/format-currency'
// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    if (!state.items.length) {
      return [];
    }
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        id: product.id,
        title: product.title,
        price: product.gia_khuyen_mai.length > 0 ? product.gia_khuyen_mai : product.gia_ban_le,
        image: product.images[0],
        quantity
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    let total = getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0);
    let result = formatCurrency(total);
    return result;
  }
}

// actions
const actions = {
  checkout({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    shop.buyProducts(
      products,
      () => {
        commit('setCheckoutStatus', 'successful')
        // remove  item from stock
        products.forEach((product) => {
          commit('products/decrementProductInventory', { id: product.id, quantity: product.quantity }, { root: true })
        })
        
      },
      () => {
        commit('setCheckoutStatus', 'failed')
        // rollback to the cart saved before sending the request
        commit('setCartItems', { items: savedCartItems })
      }
    )
  },

  addProductToCart({ state, commit }, { product, quantity }) {

    commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)

      if (!cartItem) {
        commit('pushProductToCart', { id: product.id, quantity: quantity })
      } else {
        commit('incrementItemQuantity', { id: cartItem.id, quantity: quantity })
      }

    }
  }
}

// mutations
const mutations = {
  pushProductToCart(state, { id, quantity }) {
    state.items.push({
      id,
      quantity: quantity
    })
  },

  removeProductFromCart(state, { id }) {
    state.items = state.items.filter(item => item.id !== id)
  },

  incrementItemQuantity(state, { id, quantity }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity += quantity
  },

  decrementItemQuantity(state, { id, quantity }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity -= quantity
  },

  setCartItems(state, { items }) {
    state.items = items
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}