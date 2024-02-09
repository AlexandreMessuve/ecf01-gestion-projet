import {defineStore} from "pinia";
import {getPayloadToken, isTokenValid, removeToken, setToken} from "../services/tokenService.js";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};
export const useAuthStore = defineStore('auth', {
    state:() => ({
        isAuthenticated: initialState.isAuthenticated,
        token: initialState.token,
        user: initialState.user,
    }),
    actions: {
        login(token) {
            this.token = token;
            const claims = getPayloadToken(token);
            const user = {
                username: claims.username,
                firstname: claims.firstname,
                lastname: claims.lastname,
            }
            this.user = user;
            this.isAuthenticated = isTokenValid(token);
            setToken(token);
        },
        logout() {
            removeToken();
            this.isAuthenticated = false;
            this.token = null;
            this.user = null;
        },
    },
    getters: {
        selectIsLogged: (state) => state.isAuthenticated,
        selectUser: (state) => state.user,
        selectToken: (state) => state.token
    }
})