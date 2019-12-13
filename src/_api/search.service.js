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
        if (response.status === 201) {
            console.log(response.data);
            return true;
        }
    } catch (error) {
        console.log(error.response);
        if (error) throw error;
    }
}