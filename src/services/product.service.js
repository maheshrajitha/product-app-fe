import axios from 'axios';
import { BASE_URL } from '../constants/values';
import { setAuthorizationHeader } from './auth.service';
import Axios from 'axios';

export function getProducts() {
    return axios.get(`${BASE_URL}product/all`, { headers: setAuthorizationHeader() }).then(response => response.data).catch(err => {
        throw err
    });
}

export function addNewProduct(newProduct) {
    return Axios.post(`${BASE_URL}product`, newProduct, {
        headers: setAuthorizationHeader()
    }).then(response => response.data).catch(err => {
        throw err
    });
}

export function addDiscount(discount) {
    return Axios.patch(`${BASE_URL}product/add-discounts`, discount, {
        headers: setAuthorizationHeader()
    }).then(response => response.data).catch(err => { console.log(err.response); throw err });
}