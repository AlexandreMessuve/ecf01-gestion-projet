import {jwtDecode}from "jwt-decode";

const TOKEN_NAME = 'token';

export function setToken(token){
    localStorage.setItem(TOKEN_NAME, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_NAME);
}

export function getPayloadToken(token) {
    return jwtDecode(token);
}

export function isTokenValid(token){
    try {
        const payload = getPayloadToken(token);
        const expirationDate = payload.exp;
        const login = payload.username;
        const dateNow = new Date();
        return token && login && expirationDate < dateNow.getTime();
    } catch {
        return false;
    }
}