import { BASE_URL } from "../constants/values";
import { setAuthorizationHeader } from "./auth.service";
import Axios from "axios";


export function getCategories() {
    return Axios.get(`${BASE_URL}category/my-categories`, {
        headers:setAuthorizationHeader()
    }).then(response => response.data).catch(err => {
        throw err;
    });
}

export function addNewCategory(category) {
    return Axios.post(`${BASE_URL}category/`, category, {
        headers: setAuthorizationHeader()
    }).then(response => response.data).catch(err => {
        throw err
    });
}

export function deleteCategory(categoryId) {
    return Axios.delete(`${BASE_URL}category/delete/${categoryId}`, {
        headers: setAuthorizationHeader()
    }).then(response => response.data).catch(e => { throw e });
}