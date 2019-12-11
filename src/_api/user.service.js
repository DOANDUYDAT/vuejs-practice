import config from 'config';
import {
    authHeader
} from '@/_helpers';
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

const auth = authHeader();

async function login(email, password, remember) {
    console.log('login');
    const data = {
        email,
        password
    }
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/login`,
        headers: {
            ...headers
        },
        data: JSON.stringify(data)
    };
    try {
        const response = await axios(options);
        // login successful if there's a jwt token in the response
        console.log(response.status);
        if (response.status === 200) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            console.log(response.data);
            let user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
    } catch (error) {
        // console.log('errr: ' + error);
        if (error) throw error;
    }
}

async function logout() {
    console.log('logout');
    // remove user from local storage to log user out
    const options = {
        method: 'get',
        url: `${config.apiUrl}/users/logout`,
        headers: {
            ...headers,
            ...auth
        }
    }
    try {
        const response = await axios(options);
        console.log(response.status);
        if (response.status === 200) {

            console.log(response.data);
            localStorage.removeItem('user');
        }
    } catch (error) {
        throw error;
    }
}

async function register(userInfo) {
    console.log('register');
    const data = {
        last_name: userInfo.lastName,
        first_name: userInfo.firstName,
        email: userInfo.email,
        password: userInfo.password
    };
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/register`,
        headers: {
            ...headers
        },
        data: JSON.stringify(data)
    };
    // const response = await axios(options);
    // console.log(response);
    try {
        const response = await axios(options);
        console.log(response.status);
        console.log(response);
        if (response.status === 201) {

            console.log(response.data);
            return true;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function getProfile() {
    console.log('getProfile');
    const options = {
        method: 'get',
        url: `${config.apiUrl}/users/profile`,
        headers: {
            ...headers,
            ...auth
        }
    }
    try {
        const response = await axios(options);
        console.log(response.status);
        if (response.status === 200) {
            const user = response.data;

            console.log(response.data);
            return user;
        }

    } catch (error) {
        throw error;
    }
}

async function updateProfile(userInfo) {
    console.log('updateProfile');
    const data = {
        last_name: userInfo.lastName,
        first_name: userInfo.firstName,
        phone: userInfo.phone,
        gender: userInfo.gender,
        address: userInfo.address,
        date_of_birth: userInfo.dateOfBirth
    }
    console.log(data);
    const options = {
        method: 'put',
        url: `${config.apiUrl}/users/profile`,
        headers: {
            ...headers,
            ...auth
        },
        data: JSON.stringify(data)
    }
    try {
        const response = await axios(options);
        console.log(response.status);
        if (response.status === 200) {

            console.log(response.data);
            return true;
        }

    } catch (error) {
        throw error;
    }
}

async function resetPassword(email) {
    console.log('resetPassword');
    const data = {
        email: email
    };
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/password-reset`,
        headers: {
            ...headers
        },
        data: JSON.stringify(data)
    }
    try {
        const response = await axios(options);
        console.log(response.status);
        if (response.status === 200) {

            console.log(response.data);
            return true;
        }

    } catch (error) {
        throw error;
    }
}