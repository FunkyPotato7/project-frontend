import { axiosService } from "./axios.service";
import { urls } from "../configs";

const paidService = {
    getAll: (query) => axiosService.get(urls.paid.getAll, {params: query}),
    export: (query) => axiosService.get(urls.paid.export, {params: query,  responseType: 'blob'}),
    statistic: () => axiosService.get(urls.paid.statistic),
    update: (id, data) => axiosService.put(urls.paid.update(id), data)
};

export {
    paidService
};

