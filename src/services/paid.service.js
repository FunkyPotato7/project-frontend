import { axiosService } from "./axios.service";
import { urls } from "../configs";

const paidService = {
    getAll: (query) => axiosService.get(urls.paid, {params: query})
};

export {
    paidService
};

