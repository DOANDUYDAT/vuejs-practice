import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';



export const searchService = {
    search
};


async function search(query) {
    console.log('search');
    const data = {
        search: query
    }
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/search/`,
        headers: {
            ...headers,
        },
        data: JSON.stringify(data)
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            const data = response.data;
            let productsSearch = [];
            if (data.length > 0) {
                productsSearch = data.map(e => {
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
                        retailPrice: e.retail_price,
                        listedPrice: e.listed_price,
                        promotionalPrice: e.promotional_price,
                        count: e.count,
                        description: e.description,
                        images: e.images,
                        voting: e.voting
                    };
                    return product;
                });
            }
            return productsSearch;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}