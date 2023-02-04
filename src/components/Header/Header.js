import { AppBar } from "@mui/material";
import { Typography } from "@mui/material";

import css from './Header.module.css';
import { SearchFields } from "../SearchFields/SearchFields";


const Header = () => {

    return(
        <div>
            <AppBar position="relative" className={css.header}>
                <Typography sx={{marginLeft: '40px'}} variant="h5">Admin</Typography>
            </AppBar>
            <SearchFields/>
        </div>
    );
};

export {
    Header
};