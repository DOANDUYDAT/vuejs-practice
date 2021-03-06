import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';



export const importProductService = {
    createImportProduct,
    getAllImports,
    getImport

};


const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}


async function createImportProduct(importOrder) {
    const auth = authHeader();
    const items = importOrder.items.map(e => {
        return {
            product_id: e.id,
            quantity: e.quantity,
            import_price: e.importPrice,
            price: e.price,
        }
    })
    const data = {
        items: items,
        total: importOrder.total
    }
    // console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/imports/`,
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
            // console.log('createImportProduct done');
            return true;
        }
    } catch (error) {
        // console.log('createImportProduct error');
        // console.log(error.response);
        if (error) throw error;
    }
}

async function getAllImports() {
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/imports`,
        headers: {
            ...headers,
            ...auth
        }
    };
    try {
        const response = await axios(options);
        // console.log(response);
        if (response.status === 200) {
            // console.log('getAllImports done');
            const data = response.data;
            const d = new Date();
            const allImports = data.map(e => {
                const anImport = {
                    id: e.id,
                    createdAt: d.getFullYear(data.created_at) + '-' + Number(d.getMonth(data.created_at) + 1) + '-' + d.getDate(data.created_at),
                    items: e.items,
                    total: e.total,
                    user: e.user
                }
                return anImport;
            })
            return allImports;
        }
    } catch (error) {
        // console.log('getAllImports error');
        // console.log(error.response);
        if (error) throw error;
    }
}

async function getImport(importId) {
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/imports/${importId}`,
        headers: {
            ...headers,
            ...auth
        }
    };
    try {
        const response = await axios(options);
        // console.log(response);
        if (response.status === 200) {
            // console.log('getImport done');
            const data = response.data;
            const d = new Date();
            const anImport = {
                id: data.id,
                createdAt: d.getFullYear(data.created_at) + '-' + Number(d.getMonth(data.created_at) + 1) + '-' + d.getDate(data.created_at),
                items: data.items,
                total: data.total,
                user: data.user
            }
            return anImport;
        }
    } catch (error) {
        // console.log('getImport error');
        // console.log(error.response);
        if (error) throw error;
    }
}