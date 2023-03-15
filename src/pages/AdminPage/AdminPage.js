import { Alert, Snackbar } from "@mui/material";

import css from './AdminPage.module.css';
import { UserList } from "../../components";
import {useState} from "react";


const AdminPage = () => {
    const [snackOpen, setSnackOpen] = useState(false);

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