import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';



export const groupService = {
    getAllGroups,
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    getAllPermissions
};


const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function getAllGroups() {
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/users/groups`,
        headers: {
            ...headers,
            ...auth
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log('getAllGroups done');
            let groups = response.data;
            return groups;
        }
    } catch (error) {
        console.log('getAllGroups error');
        console.log(error.response);
        if (error) throw error;
    }
}


async function createGroup(group) {
    const auth = authHeader();
    const data = {
        name: group.name,
        permissions: group.permissions
    }
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/users/groups/`,
        headers: {
            ...headers,
            ...auth
        },
        data: JSON.stringify(data)
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 201) {
            console.log('createGroup done');
            return true;
        }
    } catch (error) {
        console.log('createGroup error');
        console.log(error.response);
        if (error) throw error;
    }
}

async function getGroup(groupId) {
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/users/groups/${groupId}/`,
        headers: {
            ...headers,
            ...auth
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log('getGroup done');
            let product = response.data;
            return product;
        }
    } catch (error) {
        console.log('getGroup error');
        console.log(error.response);
        if (error) throw error;
    }
}

async function updateGroup(group) {
    const auth = authHeader();
    const data = {
        name: group.name,
        permissions: group.permissions
    };
    console.log(data);
    const options = {
        method: 'put',
        url: `${config.apiUrl}/users/groups/${group.id}/`,
        headers: {
            ...headers,
            ...auth
        },
        data: JSON.stringify(data)
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log('updateGroup done');
            return true;
        }
    } catch (error) {
        console.log('updateGroup error');
        console.log(error.response);
        if (error) throw error;
    }
}

async function deleteGroup(groupId) {
    const auth = authHeader();
    const options = {
        method: 'delete',
        url: `${config.apiUrl}/users/groups/${groupId}/`,
        headers: {
            ...headers,
            ...auth
        },
    }
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 204) {
            console.log('deleteGroup done');
            return true;
        }
    } catch (error) {
        console.log('deleteGroup error');
        console.log(error.response);
        if (error) throw error;
    }
}

async function getAllPermissions() {
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/users/permissions`,
        headers: {
            ...headers,
            ...auth
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            console.log('getAllPermissions done');
            const permissions = response.data;
            return permissions;
        }
    } catch (error) {
        console.log('getAllPermissions error');
        console.log(error.response);
        if (error) throw error;
    }
}