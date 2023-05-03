import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

    const [type, setType] = useState(false);

    const handleClickShowPassword = () => setType(() => !type);

    const submit = async (user) => {
        try {
            await authService.login(user).then(({data}) => {
                authService.setTokens(data);
                dispatch(userActions.getUser(data.user));
            });

            navigate('/paid?page=1&limit=30&order=-num');

        } catch (e) {
            setError('email', { message: 'Wrong email or password' });
            setError('password', { message: 'Wrong email or password' });
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
                helperText={errors.email && errors.email.message.includes('pattern') ?
                    'Wrong email pattern' :
                    errors.email?.message
                }
                {...register('email')}
            />
                <TextField
                    label="Password"
                    variant="outlined"
                    type={type ? 'text' : 'password'}
                    error={errors.password && true}
                    helperText={errors.password && errors.password.message}
                    {...register('password')}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {type ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                />

            <Button sx={{fontWeight: "bold"}} variant='contained' onClick={handleSubmit(submit)}>Login</Button>
        </div>
    );
};

export {
    LoginForm
};