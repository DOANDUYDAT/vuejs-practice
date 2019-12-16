import {
    userService
} from '@/_api';


let initialState = null;
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    const tokenCreated = user.created;
    const currentDate = Date.now();
    // check nếu token quá hạn 1 ngày, tính theo milliseconds
    if (currentDate - Date.parse(tokenCreated) >= 86400000) {
        localStorage.removeItem('user');
        initialState = { status: {}, user: null };
    } else {
        initialState = { status: { loggedIn: true }, user };
    }
}


const state = initialState;

const getters = {};

const actions = {
    async login({
        dispatch,
        commit
    }, {
        email,
        password,
        remember
    }) {
        try {
            const isSuccess = await userService.login(email, password, remember);
            const user = JSON.parse(localStorage.getItem('user'));

            if (isSuccess) {
                commit('loginSuccess', user)
                return true;
            }
        } catch (error) {
            // console.log('action error')
            commit('loginFailure', error)

            throw error;
        }
    },
    async logout({
        commit,
        dispatch
    }) {
        try {
            const isSuccess = await userService.logout();
            if (isSuccess) {
                commit('logout');
                return true;
            }
        } catch (error) {
            throw error;
        }

    },
};

const mutations = {
    // loginRequest(state, user) {
    //     state.status = { loggingIn: true };
    //     state.user = user;
    // },
    loginSuccess(state, user) {
        state.status = {
            loggedIn: true
        };
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