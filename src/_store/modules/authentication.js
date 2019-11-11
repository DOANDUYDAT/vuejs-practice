import { userService } from '../../_api';


const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };


const state = initialState;

const getters = {};

const actions = {
    async login({ dispatch, commit }, { email, password }) {
        console.log('action login');
        // commit('loginRequest', { email });
        try {
            const user = await userService.login(email, password);
            console.log('user: ' + user);
            if (user) {
                commit('loginSuccess', user)
                dispatch('alert/success', {
                    message: 'Login Successfully!'
                }, { root: true })
            }
        } catch (error) {
            console.log(error);
            commit('loginFailure', error)
            dispatch('alert/error', {
                message: 'Login failed!'
            }, { root: true })
        }
    },
    async logout({ commit }) {
        await userService.logout();
        commit('logout');
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    }
};



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
