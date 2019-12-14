import config from 'config';
import {
    authHeader
} from '@/_helpers';
import axios from 'axios';
import _ from 'lodash';

export const staffService = {
    createStaff,
    updateStaff,
    deleteStaff
};

const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function createStaff(staff) {
    console.log('createStaff');
    const data = {
        last_name: staff.lastName,
        first_name: staff.firstName,
        email: staff.email,
        group: staff.role
    };
    console.log(data);
    const auth = authHeader();
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/`,
        headers: {
            ...headers,
            ...auth
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


async function updateStaff(staffInfo) {
    console.log('updateStaff');
    const auth = authHeader();
    const data = {
        last_name: staffInfo.lastName,
        first_name: staffInfo.firstName,
        email: staffInfo.email,
        group: staffInfo.role
    }
    console.log(data);
    const options = {
        method: 'put',
        url: `${config.apiUrl}/users/${staffInfo.id}/`,
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

async function deleteStaff(staffId) {
    console.log('deleteStaff');
    const auth = authHeader();
    const options = {
        method: 'delete',
        url: `${config.apiUrl}/users/${staffId}/`,
        headers: {
            ...headers,
            ...auth
        }
    }
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 204) {
            console.log(response.data);
            return true;
        }

    } catch (error) {
        console.log(error.response);
        throw error;
    }
}