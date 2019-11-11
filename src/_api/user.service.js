import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    // getAll
};

async function login(email, password) {
    const options = {
        method: 'post',
        url: `${config.apiUrl}/user/login`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            email,
            password
        }
    };
    console.log('log in service')
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

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
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