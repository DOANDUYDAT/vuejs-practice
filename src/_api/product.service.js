import config from 'config';
import axios from 'axios';
import { authHeader } from '@/_helpers';
import _ from 'lodash';

const auth = authHeader();

export const productService = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct
};


const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function getAllProducts() {
    console.log('getAllProducts');
    const options = {
        method: 'get',
        url: `${config.apiUrl}/products`,
        headers: { ...headers },
    };
    try {
        const response = await axios(options);
        if (response.data.length > 0) {
            console.log(response.status);
            console.log(response.data);
            const data = response.data;
            const allProducts = data.map(e => {
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
                    images: e.images
                };
                return product;
            });
            return allProducts;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function createProduct(product) {
    console.log('createProduct');
    const data = {
        supplier: product.supplier,
        guarantee: product.guarantee,
        guarantee_des: product.guaranteeDes,
        name: product.name,
        color: product.color,
        screen: product.screen,
        resolution: product.resolution,
        front_camera: product.frontCamera,
        rear_camera: product.backCamera,
        chip: product.chip,
        ram: product.ram,
        rom: product.rom,
        pin: product.pin,
        operating_system: product.operatingSystem,
        charging_port: product.chargingPort,
        retail_price: product.retailPrice,
        listed_price: product.listedPrice,
        promotional_price: product.promotionalPrice,
        count: product.count,
        description: product.description,
        images: product.images
    };
    console.log(JSON.stringify(data));
    const options = {
        method: 'post',
        url: `${config.apiUrl}/products`,
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

async function getProduct(productId) {
    console.log('getProduct: ' + productId);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/products/${productId}`,
        headers: { ...headers },
    };
    try {
        const response = await axios(options);
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data);
            const data = response.data;
            const product = {
                id: data.id,
                supplier: data.supplier,
                guarantee: data.guarantee,
                guaranteeDes: data.guarantee_des,
                name: data.name,
                color: data.color,
                screen: data.screen,
                resolution: data.resolution,
                frontCamera: data.front_camera,
                backCamera: data.rear_camera,
                chip: data.chip,
                ram: data.ram,
                rom: data.rom,
                pin: data.pin,
                operatingSystem: data.operating_system,
                chargingPort: data.charging_port,
                retailPrice: data.retail_price,
                listedPrice: data.listed_price,
                promotionalPrice: data.promotional_price,
                count: data.count,
                description: data.description,
                images: data.images
            };
            return product;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function updateProduct(product) {
    console.log('updateProduct: ' + product.id);
    const data = {
        supplier: product.supplier,
        guarantee: product.guarantee,
        guarantee_des: product.guaranteeDes,
        name: product.name,
        color: product.color,
        screen: product.screen,
        resolution: product.resolution,
        front_camera: product.frontCamera,
        rear_camera: product.backCamera,
        chip: product.chip,
        ram: product.ram,
        rom: product.rom,
        pin: product.pin,
        operating_system: product.operatingSystem,
        charging_port: product.chargingPort,
        retail_price: product.retailPrice,
        listed_price: product.listedPrice,
        promotional_price: product.promotionalPrice,
        count: product.count,
        description: product.description,
        images: product.images
    };
    console.log(JSON.stringify(data));
    const options = {
        method: 'put',
        url: `${config.apiUrl}/products/${product.id}`,
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


async function deleteProduct(productId) {
    console.log('deleteProduct: ' + productId);
    const options = {
        method: 'delete',
        url: `${config.apiUrl}/products/${productId}/`,
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

