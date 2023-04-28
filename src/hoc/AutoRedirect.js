import { Navigate } from "react-router-dom";

import { authService } from "../services";

const AutoRedirect = ({children}) => {
    const access = authService.getAccessToken();
    const refresh = authService.getRefreshToken();

    if (access && refresh) {
        return <Navigate to={'/paid?page=1&order=-num'}/>
    }

    return children
};

export {
    AutoRedirect
};