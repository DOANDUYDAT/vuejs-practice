import shop from '@/_api/shop';
import { orderService } from "@/_api";
import { formatCurrency } from '@/_api/format-currency';
// initial state
// shape: [{ id, quantity }]
const cart = JSON.parse(localStorage.getItem('cart'));
// console.log(cart.items);
const initialState = cart ? { items: cart.items.slice(0), checkoutStatus: null } : { items: [], checkoutStatus: null };
// const initialState = { items: [], checkoutStatus: null };
const state = initialState;

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    if (!state.items.length) {
      return [];
    }
    return state.items.map(({ id, quantity }) => {
      const products = rootState.products.allProducts;
      if (products.length) {
        const product = products.find(product => product.id == id);
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images.length ? product.images[0].image : "",
          quantity
        }
      } else {
        return [];
      }

    })
  },

  cartTotalPrice: (state, getters) => {
    let total = getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0);
    return total;
  }
}

// actions
const actions = {
  async checkout({ commit, state }, order) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })

    try {
      const isSuccess = await orderService.createOrder(order);
      console.log(isSuccess);
      if (isSuccess) {
        // commit('setCheckoutStatus', 'successful')
        // remove  item from stock
        // products.forEach((product) => {
        //   commit('products/decrementProductInventory', { id: product.id, quantity: product.quantity }, { root: true })
        // })
        localStorage.removeItem('cart');
        return true;
      }
    } catch (error) {
        commit('setCheckoutStatus', 'failed')
        // rollback to the cart saved before sending the request
        commit('setCartItems', { items: savedCartItems })
        throw error;
    }

    // shop.buyProducts(
    //   products,
    //   () => {
    //     commit('setCheckoutStatus', 'successful')
    //     // remove  item from stock
    //     products.forEach((product) => {
    //       commit('products/decrementProductInventory', { id: product.id, quantity: product.quantity }, { root: true })
    //     })
    //     localStorage.removeItem('cart');
    //   },
    //   () => {
    //     commit('setCheckoutStatus', 'failed')
    //     // rollback to the cart saved before sending the request
    //     commit('setCartItems', { items: savedCartItems })
    //   }
    // )
  },

  addProductToCart({ state, commit }, { product, quantity }) {

    commit('setCheckoutStatus', null)
    if (state.items.length) {
      const cartItem = state.items.find(item => item.id === product.id)

      if (!cartItem) {
        commit('pushProductToCart', { id: product.id, quantity: quantity });
      } else {
        commit('incrementItemQuantity', { id: cartItem.id, quantity: quantity });
      }

    } else {
      commit('pushProductToCart', { id: product.id, quantity: quantity });
    }
  }
}

// mutations
const mutations = {
  pushProductToCart(state, { id, quantity }) {
    state.items.push({
      id,
      quantity: quantity
    });
    const cart = { items: state.items };
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  removeProductFromCart(state, { id }) {
    state.items = state.items.filter(item => item.id !== id);
    const cart = state.items.length ? { items: state.items } : null;
    if (!cart) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  },

  incrementItemQuantity(state, { id, quantity }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity += quantity;
    const cart = { items: state.items };
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  decrementItemQuantity(state, { id, quantity }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity -= quantity;
    const cart = { items: state.items };
    localStorage.setItem('cart', JSON.stringify(cart));
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