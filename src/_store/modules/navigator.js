const state = {
    drawerStatus: true
}

const getters = {

}

const actions = {
    changeDrawer({ commit }, { value }) {
        commit('setDrawer', { value: value});
    }
}

const mutations = {
    setDrawer(state, { value }) {
        state.drawerStatus = value;
    }
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}