/// {type, message}
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
    },
    success({ dispatch }, { message }) {
        const alert = {
            type: 'success',
            message
        };
        dispatch('addAlert', alert);
    },
    error({ dispatch }, { message }) {
        const alert = {
            type: 'error',
            message
        };
        dispatch('addAlert', alert);
    },
    warning( { dispatch }, { message }) {
        const alert = {
            type: 'warning',
            message
        };
        dispatch('addAlert', message);
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
