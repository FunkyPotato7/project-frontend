import { axiosService } from "./axios.service";
import { urls } from "../configs";

const _accessTokenKey = 'accessToken'
const _refreshTokenKey = 'refreshToken'


const authService = {
    login: (user) => axiosService.post(urls.auth.login, user),
    refresh: (refreshToken) => axiosService.post(urls.auth.refresh, { refreshToken }),

    setTokens: ({accessToken, refreshToken}) =>  {
        localStorage.setItem(_accessTokenKey, accessToken)
        localStorage.setItem(_refreshTokenKey, refreshToken)
    },
    deleteTokens: () => {
        localStorage.removeItem(_accessTokenKey)
        localStorage.removeItem(_refreshTokenKey)
    },

    getAccessToken: () => localStorage.getItem(_accessTokenKey),

    getRefreshToken: () => localStorage.getItem(_refreshTokenKey)
};

export {
    authService
};