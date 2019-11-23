import { userService } from '@/_api';


const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };


const state = initialState;

const getters = {};

const actions = {
    async login({ dispatch, commit }, { email, password, remember }) {
        console.log('action login');
        
        try {
            const user = await userService.login(email, password, remember);
            // console.log('user: ' +  user);
            if (user) {
                commit('loginSuccess', user)
                return user;
            }
        } catch (error) {
            // console.log('action error')
            commit('loginFailure', error)
            
            throw error;
        }
    },
    async logout({ commit, dispatch }) {
        await userService.logout();
        commit('logout');
        dispatch('alert/success', {
            message: "You are logged out!"
        }, { root: true });
    },
};

const mutations = {
    // loginRequest(state, user) {
    //     state.status = { loggingIn: true };
    //     state.user = user;
    // },
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
