import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';

const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

export const filterService = {
    filter
};


async function filter(filter) {
    console.log('filter');
    console.log(filter);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/filter`,
        headers: {
            ...headers,
        },
        data: JSON.stringify(filter)
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            const data = response.data;
            let productsFilter = [];
            if (data.length) {
                productsFilter = data.map(e => {
                    const product = {
                        id: e.id,
                        supplier: e.supplier,
                        guarantee: e.guarantee,
                        guaranteeDes: e.guarantee_des,
                        name: e.name,
                        color: e.color,
                        screen: e.screen,
                        resolution: e.resolution,
                        frontCamera: e.front_camera,
                        backCamera: e.rear_camera,
                        chip: e.chip,
                        ram: e.ram,
                        rom: e.rom,
                        pin: e.pin,
                        operatingSystem: e.operating_system,
                        chargingPort: e.charging_port,
                        importPrice: e.import_price,
                        price: e.price,
                        count: e.count,
                        description: e.description,
                        images: e.images,
                        voting: e.voting
                    };
                    return product;
                });
            }
            return productsFilter;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}