import { axiosService } from "./axios.service";
import { urls } from "../configs";

const groupsService = {
    getAll: () => axiosService.get(urls.groups.getAll),
    create: (data) => axiosService.post(urls.groups.create, data)
};

export {
    groupsService
};