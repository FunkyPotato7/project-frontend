import { axiosService } from "./axios.service";
import { urls } from "../configs";

const userService = {
    getAuthUser: () => axiosService.get(urls.user.getAuthUser)
};

export {
    userService
};