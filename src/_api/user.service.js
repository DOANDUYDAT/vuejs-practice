import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';
import _ from 'lodash';

export const userService = {
    login,
    logout,
    register,
    getProfile,
    updateProfile,
    resetPassword
};

const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function login(email, password, remember) {
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/login`,
        headers: headers,
        data: {
            email,
            password,
            remember
        }
    };
    console.log('login service')
    try {
        const response = await axios(options);
        // login successful if there's a jwt token in the response
        // console.log(response.data.token);
        if (response.data.Token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            let user = { token: response.data.Token };
            // console.log(JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(user));
            const userInfo = await getProfile();
            // console.log(JSON.stringify(userInfo));
            user = {...user, ...userInfo}
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user)
            return user;
        }
    } catch (error) {
        // console.log('errr: ' + error);
        if (error) throw error;
    }
}

async function logout() {
    // remove user from local storage to log user out
    const user = JSON.parse(localStorage.getItem('user'));
    const auth = authHeader();
    console.log(auth)
    const options = {
        method: 'get',
        url: `${config.apiUrl}/users/logout`,
        headers: { ...headers, ...auth }
    }
    try {
        await axios(options)
        localStorage.removeItem('user');
    } catch (error) {
        throw error;
    }
}

async function register(userInfo) {
    console.log(userInfo)
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/register`,
        headers: headers,
        data: JSON.stringify(userInfo)
    };
    // console.log('log in service')
    try {
        const response = await axios(options);
        // login successful if there's a jwt token in the response
        // console.log(response.data.token);
        if (response.data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const user = { token: response.data.token };
            console.log(JSON.stringify(user));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
    } catch (error) {
        // console.log('errr: ' + error);
        if (error) throw error;
    }
}

async function getProfile() {
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/users/profile`,
        headers: { ...headers, ...auth }
    }
    try {
        const response = await axios(options);
        if (response.data) {
            const user = response.data;
            return user;
        }

    } catch (error) {
        throw error;
    }
}

async function updateProfile(userInfo) {
    const auth = authHeader();
    const options = {
        method: 'put',
        url: `${config.apiUrl}/users/profile`,
        headers: { ...headers, ...auth },
        data: JSON.stringify(userInfo)
    }
    try {
        const response = await axios(options);
        if (response.data) {
            const user = response.data;
            console.log("user after update: " + user);
            return user;
        }

    } catch (error) {
        throw error;
    }
}

async function resetPassword(email) {
    const auth = authHeader();
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/password-reset`,
        headers: { ...headers },
        data: {
            email
        }
    }
    try {
        const response = await axios(options);
        if (response.status === 200) {
            return true;
        }

    } catch (error) {
        throw error;
    }
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}