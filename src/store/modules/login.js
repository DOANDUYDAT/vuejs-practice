const state = {
    loginStatus: false
}

const getters = {

}

const mutations = {
    changeLoginStatus(state) {
        console.log('change login status mutation!')
        state.loginStatus = !state.loginStatus
        console.log('state loginStatus = ' + state.loginStatus)
    }
}

const actions = {
    login({ commit, state }) {
        console.log('login action')
        commit('changeLoginStatus')
    },
    logout({ commit, state }) {
        console.log('logout action')
        commit('changeLoginStatus')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}