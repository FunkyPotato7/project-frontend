import css from "./LoginPage.module.css";
import { LoginForm } from "../../components";

const LoginPage = () => {

    return(
        <div className={css.loginPage}>
           <LoginForm/>
        </div>
    );
};

export {
    LoginPage
};