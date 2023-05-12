import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

import css from './AdminPage.module.css';
import { UserList } from "../../components";
import { userActions } from "../../store";

const AdminPage = () => {
    const { user } = useSelector(state => state.userReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [snackOpen, setSnackOpen] = useState(false);

    useEffect(() => {
        !user && dispatch(userActions.getAuthUser());

        if (!user?.is_superuser)
            navigate('/paid?page=1&limit=30&order=-num');

    }, [navigate, dispatch, user]);

    const handleSnackOpen = () => setSnackOpen(!snackOpen);

    return(
        <div className={css.page}>
            <UserList handleSnackOpen={handleSnackOpen}/>
            <Snackbar
                sx={{position: "absolute"}}
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleSnackOpen}
            >
                <Alert severity="info" sx={{color: "black"}}>Copied!</Alert>
            </Snackbar>
        </div>
    );
};

export {
    AdminPage
};