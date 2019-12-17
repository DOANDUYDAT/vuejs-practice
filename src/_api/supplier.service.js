import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';



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
    const options = {
        method: 'get',
        url: `${config.apiUrl}/suppliers`,
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        // console.log(response);
        if (response.status === 200) {
            // console.log('getAllSuppliers done');
            let suppliers = response.data;
            return suppliers;
        }
    } catch (error) {
        // console.log('getAllSuppliers error');
        // console.log(error.response);
        if (error) throw error;
    }
}


async function createSupplier(supplier) {
    const auth = authHeader();
    const data = {
        name: supplier.name
    }
    // console.log(data);
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
        // console.log(response);
        if (response.status === 201) {
            // console.log('createSupplier done');
            return true;
        }
    } catch (error) {
        // console.log('createSupplier error');
        // console.log(error.response);
        if (error) throw error;
    }
}

async function getSupplier(supplierId) {
    const options = {
        method: 'get',
        url: `${config.apiUrl}/suppliers/${supplierId}/`,
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        // console.log(response);
        if (response.status === 200) {
            // console.log('getSupplier done');
            let product = response.data;
            return product;
        }
    } catch (error) {
        // console.log('getSupplier error');
        // console.log(error.response);
        if (error) throw error;
    }
}

async function updateSupplier(supplier) {
    const auth = authHeader();
    const data = {
        name: supplier.name
    };
    // console.log(data);
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
        // console.log(response);
        if (response.status === 200) {
            // console.log('updateSupplier done');
            return true;
        }
    } catch (error) {
        // console.log('updateSupplier error');
        // console.log(error.response);
        if (error) throw error;
    }
}

async function deleteSupplier(supplierId) {
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
        // console.log(response);
        if (response.status === 204) {
            // console.log('deleteSupplier done');
            return true;
        }
    } catch (error) {
        // console.log('deleteSupplier error');
        // console.log(error.response);
        if (error) throw error;
    }
}