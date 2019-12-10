import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';

const auth = authHeader();

export const supplierService = {
    getAllSuppliers,
    createSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier,
};


const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function getAllSuppliers() {
    console.log('getAllSuppliers');
    const options = {
        method: 'get',
        url: `${config.apiUrl}/suppliers`,
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        console.log(response.status);
        if (response.status === 200) {

            console.log(response.data);
            let suppliers = response.data;
            return suppliers;
        }
    } catch (error) {
        if (error) throw error;
    }
}


async function createSupplier(supplier) {
    console.log('createSupplier');
    const data = {
        name: supplier.name
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
        console.log(response.status);
        if (response.status === 201) {

            console.log(response.data);
            return true;
        }
    } catch (error) {
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
        console.log(response.status);
        if (response.status === 200) {

            console.log(response.data);
            let product = response.data;
            return product;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function updateSupplier(supplier) {
    console.log('updateSupplier: ' + supplier.id);
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
        console.log(response.status);
        if (response.status === 200) {

            console.log(response.data);
            return true;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function deleteSupplier(supplierId) {
    console.log('deleteSupplier: ' + supplierId);
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
        console.log(response.status);
        if (response.status === 204) {

            console.log(response.data);
            return true;
        }
    } catch (error) {
        if (error) throw error;
    }
}