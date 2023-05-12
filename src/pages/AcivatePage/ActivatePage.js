import { useEffect } from "react";

import { ActivateForm } from "../../components";
import { authService } from "../../services";

const ActivatePage = () => {

    useEffect(() => {
        authService.deleteTokens()
    });

    return(
        <div>
            <ActivateForm/>
        </div>
    );
};

export {
    ActivatePage
};