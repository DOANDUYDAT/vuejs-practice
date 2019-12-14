import config from 'config';
import axios from 'axios';
import {
    authHeader
} from '@/_helpers';
import _ from 'lodash';



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
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
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
                        importPrice: e.import_price,
                        price: e.price,
                        count: e.count,
                        description: e.description,
                        images: e.images,
                        voting: e.voting ? e.voting : 0
                    };
                    return product;
                });
            }
            return allProducts;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function createProduct(product) {
    console.log('createProduct');
    const auth = authHeader();
    let formData = new FormData();
    formData.append('supplier_id', product.supplierId);
    formData.append('guarantee', product.guarantee);
    formData.append('guarantee_des', product.guaranteeDes);
    formData.append('name', product.name);
    formData.append('color', product.color);
    formData.append('screen', product.screen);
    formData.append('resolution', product.resolution);
    formData.append('front_camera', product.frontCamera);
    formData.append('rear_camera', product.rearCamera);
    formData.append('chip', product.chip);
    formData.append('ram', product.ram);
    formData.append('rom', product.rom);
    formData.append('pin', product.pin);
    formData.append('operating_system', product.operatingSystem);
    formData.append('charging_port', product.chargingPort);
    formData.append('description', product.description);
    for (var i = 0; i < product.images.length; i++) {
        let image = product.images[i];

        formData.append('images[' + i + ']', image);
    }
    console.log(formData);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/products/`,
        headers: {
            'Content-Type': 'multipart/form-data',
            ...auth
        },
        data: formData
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

async function getProduct(productId) {
    console.log('getProduct: ' + productId);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/products/${productId}`,
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
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
                importPrice: data.import_price,
                price: data.price,
                count: data.count,
                description: data.description,
                images: data.images,
                voting: data.voting ? data.voting : 0
            };
            return product;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function updateProduct(product) {
    console.log('updateProduct: ' + product.id);
    const auth = authHeader();
    console.log(product);
    let formData = new FormData();
    formData.append('supplier', product.supplier);
    formData.append('guarantee', product.guarantee);
    formData.append('guarantee_des', product.guaranteeDes);
    formData.append('name', product.name);
    formData.append('color', product.color);
    formData.append('screen', product.screen);
    formData.append('resolution', product.resolution);
    formData.append('front_camera', product.frontCamera);
    formData.append('rear_camera', product.rearCamera);
    formData.append('chip', product.chip);
    formData.append('ram', product.ram);
    formData.append('rom', product.rom);
    formData.append('pin', product.pin);
    formData.append('operating_system', product.operatingSystem);
    formData.append('charging_port', product.chargingPort);
    formData.append('price', product.price);
    formData.append('description', product.description);
    for (var i = 0; i < product.images.length; i++) {
        let image = product.images[i];
        if (image.name && typeof image.name == 'string') {
            formData.append('images[' + i + ']', image);
        }
    }
    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }
    const options = {
        method: 'put',
        url: `${config.apiUrl}/products/${product.id}/`,
        headers: {
            'Content-Type': 'multipart/form-data',
            ...auth
        },
        data: formData
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


async function deleteProduct(productId) {
    console.log('deleteProduct: ' + productId);
    const auth = authHeader();
    const options = {
        method: 'delete',
        url: `${config.apiUrl}/products/${productId}/`,
        headers: {
            ...headers,
            ...auth
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 204) {

            console.log(response.data);
            return true;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function getAllComments(productId) {
    console.log('getAllComments: ' + productId);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/products/${productId}/comments`,
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log(response.data);
            const data = response.data;
            let allComments = [];
            if (data.length > 0) {
                allComments = data.map(e => {
                    const comment = {
                        id: e.id,
                        name: e.name,
                        content: e.content,
                        createdAt: e.created_at
                    };
                    return comment;
                })
            }
            return allComments;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}

async function createComment(comment, productId) {
    console.log('createComment');
    const auth = authHeader();
    const data = {
        name: comment.name,
        content: comment.content
    };
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/products/${productId}/comments/`,
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

async function getAllReviews(productId) {
    console.log('getAllReviews: ' + productId);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/products/${productId}/votes`,
        headers: {
            ...headers
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {

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
        console.log(error.response);
        if (error) throw error;
    }
}

async function createReview(review, productId) {
    console.log('createReview');
    const auth = authHeader();
    const data = {
        content: review.content,
        vote: review.vote
    };
    console.log(data);
    const options = {
        method: 'post',
        url: `${config.apiUrl}/products/${productId}/votes/`,
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