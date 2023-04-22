import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import css from './BannedPage.module.css';

const BannedPage = () => {
    const navigate = useNavigate();

    return(
        <div className={css.Page}>
            <div className={css.Content}>
                <NotInterestedIcon sx={{fontSize: 64}}/>
                <h3>You are banned</h3>
                <div className={css.Text}>
                    <p align="center">Sorry, unless you`ve got a block, that content is unavailable until admin unbans you</p>
                    <Button sx={{fontWeight: "bold"}} variant="contained" onClick={() => navigate('/login')}>Go back</Button>
                </div>
            </div>
        </div>
    );
};

export {
    BannedPage
};