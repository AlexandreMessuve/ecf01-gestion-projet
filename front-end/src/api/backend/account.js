import * as URL from '../../constants/urls/urlBackEnd.js';
import apiBackend from "./api.Backend.js";

export function authenticate(values) {
    return apiBackend.post(URL.BACK_AUTH, values,{
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
    });
}

export function register(values) {
    return apiBackend.post(URL.BACK_REGISTER, values, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
    });
}