import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

import css from './Header.module.css';
import { muiStyle } from './muiStyle';
import { authService } from "../../services";
import { userActions } from "../../store";


const Header = () => {
    const { user } = useSelector(store => store.userReducer);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //axiosService routing, activate 401 err, !styles, ??rewrite search fields

    useEffect(() => {
        !user && dispatch(userActions.getAuthUser());
    }, [dispatch, user]);

    const toAdmin = () => {
        navigate('/admin');
    }

    const back = () => {
        navigate('/paid?page=1');
    }

    const logout = async () => {
        await authService.logout();
        navigate('/login');
    }

    return(
        <div className={css.Header}>
            <Typography variant="h5">{user?.profile.name}</Typography>
            <div className={css.Buttons}>
                {user?.is_superuser === 1 &&
                    <Button
                        sx={muiStyle.Button}
                        variant="contained"
                        onClick={location.pathname === '/admin' ? back : toAdmin }
                    >
                        {location.pathname === '/admin' ? 'Back' : 'Admin'}
                    </Button>
                }
                <Button sx={muiStyle.Button} variant="contained" onClick={logout}>Logout</Button>
            </div>
       </div>
    );
};

export {
    Header
};