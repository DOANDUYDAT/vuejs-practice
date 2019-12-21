import config from 'config';
import {
    authHeader
} from '@/_helpers';
import axios from 'axios';
import _ from 'lodash';

export const statisticService = {
    getStatistic
};

const headers = {
    'Content-Type': 'application/json',
    // "Host": 'http://127.0.0.1:8000'

}

async function getStatistic(time) {
    const auth = authHeader();
    let query = {};
    if (time.month) {
        query = {
            ...query,
            month: time.month
        };
    }
    if (time.year) {
        query = {
            ...query,
            year: time.year
        };
    }
    console.log(query);
    const options = {
        method: 'get',
        url: `${config.apiUrl}/statisticate`,
        params: {
            ...query
        },
        headers: {
            ...headers,
            ...auth
        },
    };
    try {
        const response = await axios(options);
        console.log(response);
        if (response.status === 200) {
            console.log('getStatistic done');
            let data = response.data;
            let statistic = {
                exportProductSum: data.export_product_sum,
                exportTotalSum: data.export_total_sum,
                exportProductMax: data.export_product_max,
                importProductSum: data.import_product_sum,
                importTotalSum: data.import_total_sum
            }
            return statistic;
        }
    } catch (error) {
        console.log('getStatistic error');
        console.log(error.response);
        if (error) throw error;
    }
}

