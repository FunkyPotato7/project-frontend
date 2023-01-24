import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

import { authService } from "../../services";
import css from './LoginForm.module.css'

const LoginForm = () => {

    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();

    let [emailError, setEmailError] = useState(null);
    let [passwordError, setPasswordError] = useState(null);

    const submit = async (user) => {
        try {
            let { data } = await authService.login(user);
            authService.setTokens(data);

            setEmailError(null);
            setPasswordError(null);

            navigate('/paid');
        } catch (e) {
            if (e.response.data.slice(1,6) === 'email') {
                setEmailError(e.response.data);
            }

            if (e.response.data.slice(1,9) === 'password' || e.response.data.slice(6,14) === 'password') {
                setPasswordError(e.response.data);
                setEmailError(null)
            }

            if (e.response.data === 'User not found') {
                setPasswordError(e.response.data)
                setEmailError(null)
            }
        }

    };

    return(
        <div className={css.loginForm}>
            <h2>Login</h2>
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                sx={{ marginBottom: 5 }}
                autoFocus={true}
                error={emailError && true}
                helperText={emailError}
                {...register('email')}
            />
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                sx={{ marginBottom: 5 }}
                error={passwordError && true}
                helperText={passwordError}
                {...register('password')}
            />
            <Button variant='contained' onClick={handleSubmit(submit)} >Login</Button>
        </div>
    )
};

export {
    LoginForm
};