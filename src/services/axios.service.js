import axios from "axios";
import { createBrowserHistory } from 'history';

import { baseURL } from "../configs";
import { authService } from "./auth.service";

const history = createBrowserHistory();

const axiosService = axios.create({baseURL});


axiosService.interceptors.request.use((config) => {
    const accessToken = authService.getAccessToken();

    if (accessToken) {
        config.headers.Authorization = accessToken;
    }

    return config;
});

let isRefreshing = false;

axiosService.interceptors.response.use((config) => {
        return config;
    },
    async (error) => {
        const refreshToken = authService.getRefreshToken();

        if (error.response?.status === 401 && refreshToken && !isRefreshing) {
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

        if (error.response?.status === 401) {
            console.log(error);
            history.replace('/login');
        }

        if (error.response?.status === 403) {
            history.replace('/bannedPage');
        }

        return Promise.reject(error);

    }
);

export {
    axiosService
};
