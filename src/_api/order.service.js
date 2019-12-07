import config from 'config';
import axios from 'axios';
import { authHeader } from '@/_helpers';
import _ from 'lodash';

const auth = authHeader();

export const orderService = {
    getAllOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
};


const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function getAllOrders() {
    console.log('getAllOrders');
    const options = {
        method: 'get',
        url: `${config.apiUrl}/orders`,
        headers: { ...headers, ...auth },

    };
    try {
        const response = await axios(options);
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data);
            let orders = response.data;
            return orders;
        }
    } catch (error) {
        if (error) throw error;
    }
}


async function createOrder(order) {
    console.log('createOrder');
    const data = {
        name: order.name,
        list_cart_item: order.listCartItem
    }
    console.log(JSON.stringify(data));
    const options = {
        method: 'post',
        url: `${config.apiUrl}/orders`,
        headers: { ...headers, ...auth },
        data: JSON.stringify(data)
    };
    try {
        const response = await axios(options);
        if (response.status === 201) {
            console.log(response.status);
            console.log(response.data);
            return true;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function getOrder(orderId) {
    console.log('getOrder: ' + orderId);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/orders/${orderId}`,
        headers: { ...headers },
    };
    try {
        const response = await axios(options);
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data);
            let order = response.data;
            return order;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function updateOrder(order) {
    console.log('updateOrder: ' + order.id);
    const data = {
        list_cart_item: order.listCartItem
    }
    console.log(JSON.stringify(data));
    const options = {
        method: 'put',
        url: `${config.apiUrl}/orders/${order.id}`,
        headers: { ...headers, ...auth },
        data: JSON.stringify(data)
    };
    try {
        const response = await axios(options);
        if (response.status === 204) {
            console.log(response.status);
            console.log(response.data);
            return true;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function deleteOrder(orderId) {
    console.log('deleteOrder: ' + orderId);
    const options = {
        method: 'delete',
        url: `${config.apiUrl}/orders/${orderId}`,
        headers: { ...headers, ...auth },
    };
    try {
        const response = await axios(options);
        if (response.status === 204) {
            console.log(response.status);
            console.log(response.data);
            return true;
        }
    } catch (error) {
        if (error) throw error;
    }
}

