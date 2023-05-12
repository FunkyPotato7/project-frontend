import axios from "axios";
import { createBrowserHistory } from 'history';

import { baseURL } from "../configs";
import { authService } from "./auth.service";

const history = createBrowserHistory();

const axiosService = axios.create({baseURL});

let isRefreshing = false;
let isBanned = false;
let expired = false;

axiosService.interceptors.request.use((config) => {
    const accessToken = authService.getAccessToken();

    if (accessToken) {
        config.headers.Authorization = accessToken;
    }

    return config;
});

axiosService.interceptors.response.use((config) => {
        return config;
    },
    async (error) => {
        const refreshToken = authService.getRefreshToken();

        if (error.response?.status === 401 && refreshToken && !isRefreshing && error.response?.data === "Token not valid" ) {
            isRefreshing = true

            try {
                const { data } = await authService.refresh(refreshToken);
                authService.setTokens(data);
            } catch (e) {
                authService.deleteTokens();
                history.replace('/login?expSession=true');
            }
            isRefreshing = false
            return axiosService(error.config);

        }

        if (error.response?.status === 401 && !expired && error.response?.data === "Action token not valid") {
            expired = true;
            return axiosService(error.config);
        }

        if (error.response?.status === 403 && error.response?.data === "You are banned" && !isBanned) {
            isBanned = true;
            window.location.href ='/bannedPage';
            authService.deleteToken('refreshToken');
            return axiosService(error.config);
        }

        return Promise.reject(error);

    }
);

export {
    axiosService
};
