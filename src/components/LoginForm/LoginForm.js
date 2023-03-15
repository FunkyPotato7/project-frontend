import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, TextField } from "@mui/material";
import SuccessSlider  from '@mui/material/Slider';

import css from './LoginForm.module.css';
import { authService } from "../../services";
import { userActions } from "../../store";
import { authValidator } from "../../validators";

const LoginForm = () => {
    const { handleSubmit, register, setError, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: joiResolver(authValidator)
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submit = async (user) => {
        try {
            await authService.login(user).then(({data}) => {
                authService.setTokens(data);
                dispatch(userActions.getUser(data.user));
            });

            navigate('/paid?page=1');

        } catch (e) {
            setError(e.response.data.slice(6), { message: e.response.data });
        }

    };


    return(
        <div className={css.LoginForm}>
            <h2>Login</h2>
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                autoFocus={true}
                error={errors.email && true}
                helperText={errors.email && errors.email.message}
                {...register('email')}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                error={errors.password && true}
                helperText={errors.password && errors.password.message}
                {...register('password')}
            />
            <Button sx={{fontWeight: "bold"}} variant='contained' onClick={handleSubmit(submit)}>Login</Button>
        </div>
    );
};

export {
    LoginForm
};