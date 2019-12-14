import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';



export const groupService = {
    getAllGroups,
    createGroup,
    // getGroup,
    // updateGroup,
    // deleteGroup,
    // getAllPermissions
};


const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function getAllGroups() {
    console.log('getAllGroups');
    const options = {
        method: 'get',
        url: `${config.apiUrl}/groups`,
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            let groups = response.data;
            return groups;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}


async function createGroup(group) {
    console.log('createGroup');
    const auth = authHeader();
    const data = {
        name: group.name
    }
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/suppliers/`,
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
            console.log(response.data);
            return true;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function getSupplier(supplierId) {
    console.log('getSupplier: ' + supplierId);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/suppliers/${supplierId}/`,
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            let product = response.data;
            return product;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function updateSupplier(supplier) {
    console.log('updateSupplier: ' + supplier.id);
    const auth = authHeader();
    const data = {
        name: supplier.name
    };
    console.log(data);
    const options = {
        method: 'put',
        url: `${config.apiUrl}/suppliers/${supplier.id}/`,
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
            console.log(response.data);
            return true;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function deleteSupplier(supplierId) {
    console.log('deleteSupplier: ' + supplierId);
    const auth = authHeader();
    const options = {
        method: 'delete',
        url: `${config.apiUrl}/suppliers/${supplierId}/`,
        headers: {
            ...headers,
            ...auth
        },
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
        if (error) throw error;
    }
}

async function getAllPermissions() {
    console.log('getAllPermissions');
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/permissions`,
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
            let permissions = response.data;
            return permissions;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}