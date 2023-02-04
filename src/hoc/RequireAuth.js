import { Navigate, useLocation } from "react-router-dom";

import { authService } from "../services";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const access = authService.getAccessToken();

    if (!access) {
        return <Navigate to={'/login'} state={location}/>
    }

    return children

};

export {
    RequireAuth
};