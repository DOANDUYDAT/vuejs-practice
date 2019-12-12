import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';



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
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/orders`,
        headers: {
            ...headers,
            ...auth
        },

    };
    try {
        const response = await axios(options);
        console.log(response.status);
        if (response.status === 200) {

            console.log(response.data);
            const data = response.data;
            const orders = data.map(e => {
                return {
                    id: data.id,
                    user: {
                        phone: data.user.phone,
                        name: data.user.name,
                        address: data.user.address
                    },
                    items: data.items,
                    note: data.note,
                    status: data.status
                }
            })
            return orders;
        }
    } catch (error) {
        if (error) throw error;
    }
}


async function createOrder(order) {
    console.log('createOrder');
    const auth = authHeader();
    const data = {
        user: {
            name: order.name,
            phone: order.phone,
            address: order.address,
        },
        items: order.items,
        note: order.note
    }
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/orders/`,
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

async function getOrder(orderId) {
    console.log('getOrder: ' + orderId);
    const auth = authHeader();
    const options = {
        method: 'get',
        url: `${config.apiUrl}/orders/${orderId}`,
        headers: {
            ...headers,
            ...auth
        },
    };
    try {
        const response = await axios(options);
        console.log(response.status);
        if (response.status === 200) {

            console.log(response.data);
            const data = response.data;
            const order = {
                id: data.id,
                user: {
                    phone: data.user.phone,
                    name: data.user.name,
                    address: data.user.address
                },
                note: data.note,
                items: data.items,
                status: data.status
            };
            return order;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function updateOrder(order) {
    console.log('updateOrder: ' + order.id);
    const auth = authHeader();
    const data = {
        status: order.status
    }
    console.log(data);
    const options = {
        method: 'put',
        url: `${config.apiUrl}/orders/${order.id}/`,
        headers: {
            ...headers,
            ...auth
        },
        data: JSON.stringify(data)
    };
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

async function deleteOrder(orderId) {
    console.log('deleteOrder: ' + orderId);
    const auth = authHeader();
    const options = {
        method: 'delete',
        url: `${config.apiUrl}/orders/${orderId}/`,
        headers: {
            ...headers,
            ...auth
        },
    };
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