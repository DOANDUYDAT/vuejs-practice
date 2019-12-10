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
    getProduct,
    getAllComments,
    createComment,
    getAllReviews,
    createReview
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
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data);
            const data = response.data;
            let allProducts = [];
            if (data.length > 0) {
                allProducts = data.map(e => {
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
            return allProducts;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function createProduct(product) {
    console.log('createProduct');
    const data = {
        supplier_id: product.supplierId,
        guarantee: product.guarantee,
        guarantee_des: product.guaranteeDes,
        name: product.name,
        color: product.color,
        screen: product.screen,
        resolution: product.resolution,
        front_camera: product.frontCamera,
        rear_camera: product.rearCamera,
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
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/products/`,
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
                rearCamera: data.rear_camera,
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
                images: data.images,
                voting: data.voting
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
        rear_camera: product.rearCamera,
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
    console.log(data);
    const options = {
        method: 'put',
        url: `${config.apiUrl}/products/${product.id}/`,
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

async function getAllComments(productId) {
    console.log('getAllComments: ' + productId);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/products/${productId}/comments`,
        headers: { ...headers },
    };
    try {
        const response = await axios(options);
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data);
            const data = response.data;
            let allComments = [];
            if (data.length > 0) {
                allComments = data.map(e => {
                    const comment = {
                        id: e.id,
                        user: e.user,
                        content: e.content,
                        createdAt: e.created_at
                    };
                    return comment;
                })
            }
            return allComments;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function createComment(comment, productId) {
    console.log('createComment');
    const data = {
        user: comment.user,
        content: comment.content
    };
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/products/${productId}/comments/`,
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

async function getAllReviews(productId) {
    console.log('getAllReviews: ' + productId);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/products/${productId}/votes`,
        headers: { ...headers },
    };
    try {
        const response = await axios(options);
        if (response.status === 200) {
            console.log(response.status);
            console.log(response.data);
            const data = response.data;
            let allComments = [];
            if (data.length > 0) {
                allComments = data.map(e => {
                    const comment = {
                        id: e.id,
                        user: e.user,
                        content: e.content,
                        createdAt: e.created_at
                    };
                    return comment;
                })
            }
            return allComments;
        }
    } catch (error) {
        if (error) throw error;
    }
}

async function createReview(review, productId) {
    console.log('createReview');
    const data = {
        user: review.user,
        content: review.content,
        vote: review.vote
    };
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/products/${productId}/votes/`,
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