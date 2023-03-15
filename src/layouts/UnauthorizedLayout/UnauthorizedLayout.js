import { Outlet } from "react-router-dom";

import css from './UnauthorizedLayout.module.css';

const UnauthorizedLayout = () => {
    return(
        <div className={css.layout}>
            <Outlet/>
        </div>
    );
};

export {
    UnauthorizedLayout
};