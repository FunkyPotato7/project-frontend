import { PaidTable } from "../../components";
import css from './PaidPage.module.css'
import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";

const PaidPage = () => {
    const [snackOpen, setSnackOpen] = useState(false);

    const handleSnackOpen = () => setSnackOpen(!snackOpen);

    return(
        <div className={css.paidPage}>
            <PaidTable handleSnackOpen={handleSnackOpen}/>
            <Snackbar
                sx={{position: "absolute", top: 600}}
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleSnackOpen}
            >
                <Alert severity="success" sx={{color: "black"}}>Updated!</Alert>
            </Snackbar>
        </div>
    )
};

export {
    PaidPage
};
