import { axiosService } from "./axios.service";
import { urls } from "../configs";

const adminService = {
    getAll: () => axiosService.get(urls.admin.getAll),
    create: (data) => axiosService.post(urls.admin.create, data),
    block: (id) => axiosService.put(urls.admin.block(id)),
    recreate: (id) => axiosService.get(urls.admin.recreate(id))
};

export {
    adminService
};