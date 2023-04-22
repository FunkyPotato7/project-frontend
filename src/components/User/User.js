import { useState } from "react";
import { format, parseISO } from 'date-fns';
import { Button } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoDisturbOnTwoToneIcon from '@mui/icons-material/DoDisturbOnTwoTone';
import DoDisturbOffTwoToneIcon from '@mui/icons-material/DoDisturbOffTwoTone';

import css from './User.module.css';
import { style } from './muiStyle';
import { adminService } from "../../services";

const User = ({userData, actionToken, handleSnackOpen}) => {
    const [user, setUser] = useState(userData || null);
    const [token, setToken] = useState(actionToken || null);

    const { _id, email, is_active, last_login, profile, orders } = user;

    const Recreate = async () => {
        const { data } = await adminService.recreate(_id);
        setToken(data.actionToken);
    };

    const copy = () => {
        const link = 'http://localhost:3000/activate/'
        const activateLink = link + token;

        handleSnackOpen();
        return navigator.clipboard.writeText(activateLink);
    };

    const block = async () => {
        const { data } = await adminService.block(user._id);
        setUser(data);
    };

    return(
        <div className={css.Box}>
            <div className={css.Info}>
                <h3>Name: {profile.name}</h3>
                <h3>Surname: {profile.surname}</h3>
                <h3>Email: {email}</h3>
                <h3>Active: {is_active ? 'true' : 'false'}</h3>
                <h3>Last login: {last_login && format(parseISO(last_login),'d MMM yyyy')}</h3>
            </div>
            <div>
                <h3>Statistic:</h3>
                {orders.status_count.map(status => <h4 key={status.status}>{status.status} - {status.count}</h4>)}
            </div>
            <div className={css.Btns}>
                {!token ? <Button sx={style.RoundButton} onClick={Recreate} ><CreateIcon/></Button> : <Button sx={style.RoundButton} onClick={copy}><ContentCopyIcon/></Button>}
                {user.last_login && <Button sx={style.Button} variant="contained" startIcon={user.is_active ? <DoDisturbOnTwoToneIcon/> : <DoDisturbOffTwoToneIcon/>} onClick={block}>{user.is_active ? 'BAN' : 'UNBAN'}</Button>}
            </div>
        </div>
    );
};

export {
    User
};