import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';



export const importProductService = {
    createImportProduct,
    getAllImports
    
};


const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}


async function createImportProduct(importOrder) {
    console.log('createImportProduct');
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
    console.log(data);
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

async function getAllImports() {
    console.log('getAllImports');
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