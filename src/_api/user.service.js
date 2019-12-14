import config from 'config';
import {
    authHeader
} from '@/_helpers';
import axios from 'axios';
import _ from 'lodash';

export const userService = {
    getAllUsers,
    login,
    logout,
    register,
    getProfile,
    updateProfile,
    resetPassword,
    changePassword
};

const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function getAllUsers() {
    console.log('getAllUsers');
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/users`,
        headers: {
            ...headers,
            ...auth
        }
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            const data = response.data;
            let allUsers = [];
            if (data.length > 0) {
                allUsers = data.map(e => {
                    const user = {
                        id: e.id,
                        firstName: e.first_name,
                        lastName: e.last_name,
                        email: e.email,
                        phone: e.phone,
                        address: e.address,
                        gender: e.gender,
                        dateOfBirth: e.date_of_birth,
                        role: e.groups[0].name
                    };
                    return user;
                });
            }
            return allUsers;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

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
        console.log(response);
        if (response.status === 200) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(response.data);
            let user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function logout() {

    console.log('logout');
    const auth = authHeader();
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
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            localStorage.removeItem('user');
            return true;
        }
    } catch (error) {
        console.log(error.response);
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
        console.log(response);
        if (response.status === 201) {
            console.log(response.data);
            return true;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function getProfile() {

    console.log('getProfile');
    const auth = authHeader();
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
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            const data = response.data;
            const user = {
                id: data.id,
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                dateOfBirth: data.date_of_birth,
                role: e.groups[0].name
            };
            return user;
        }
    } catch (error) {
        console.log(error.response);
        throw error;
    }
}

async function updateProfile(userInfo) {
    console.log('updateProfile');
    const auth = authHeader();
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
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            return true;
        }

    } catch (error) {
        console.log(error.response);
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
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            return true;
        }
    } catch (error) {
        console.log(error.response);
        throw error;
    }
}

async function changePassword({ oldPasword, password }) {
    console.log('changePassword');
    const data = {
        old_pasword: oldPasword,
        password: password
    };
    const auth = authHeader();
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/change-password`,
        headers: {
            ...headers,
            ...auth
        },
        data: JSON.stringify(data)
    }
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            return true;
        }
    } catch (error) {
        console.log(error.response);
        throw error;
    }
}