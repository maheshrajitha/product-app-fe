import axios from 'axios';
import { BASE_URL } from '../constants/values';

export function login(credentials) {
    return axios.post(`${BASE_URL}auth`, credentials).then(response => {
        localStorage.setItem('token',response.data.token)
        return response.data;
    }).catch(e => {
        throw e;
    });
}

export function setAuthorizationHeader() {
    return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}