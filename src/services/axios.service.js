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

        console.log(history.location);
        console.log(error);

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

        if (error.response?.status === 403 && history.location.pathname !== '/bannedPage') {
            history.push('/bannedPage');
            return axiosService(error.config);
        }

        return Promise.reject(error);

    }
);

export {
    axiosService
};
