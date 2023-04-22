import {useNavigate} from "react-router-dom";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { Button } from "@mui/material";

import css from "./NotFoundPage.module.css";


const NotFoundPage = () => {
    const navigate = useNavigate();

    return(
        <div className={css.Page}>
            <div className={css.Content}>
                <NotInterestedIcon sx={{fontSize: 64}}/>
                <h3>Page Not Found</h3>
                <div className={css.Text}>
                    <p align="center">Sorry, page with this URL does not exist</p>
                    <Button sx={{fontWeight: "bold"}} variant="contained" onClick={() => navigate('/login')}>Go back</Button>
                </div>
            </div>
        </div>
    )
};

export {
    NotFoundPage
};