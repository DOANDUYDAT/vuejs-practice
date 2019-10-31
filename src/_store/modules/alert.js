
const state = {
    all: []
}

const getters = {}

const actions = {
    addAlert({ commit, dispatch }, alert) {
        commit("pushAlert", alert)
        setTimeout(() => dispatch("deleteAlert"), 2000)
    },
    deleteAlert({ commit }) {
        commit("removeAlert")
    }
   
}

const mutations = {
    pushAlert(state, { type, message }) {
        state.all.unshift({
            type,
            message
        })
    },
    removeAlert(state) {
        state.all.pop()
    }
    
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
