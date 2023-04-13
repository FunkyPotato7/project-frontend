import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import css from "../ActivateForm/ActivateForm.module.css";
import { authService } from "../../services";
import { userValidator } from "../../validators";


const ActivateForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        mode: "onSubmit",
        resolver: joiResolver(userValidator.passwordValidator)
    });

    const [type, setType] = useState(false);

    const handleClickShowPassword = () => setType(!type);

    const submit = async ({password, confirmPassword}) => {
        try {
            if (password === confirmPassword) {
               await authService.activate(location.pathname.slice(10), password);
               navigate('/login');
            } else if (password !== confirmPassword) {
                setError("confirmPassword", { message: "Passwords must be same" });
            }
        } catch (e) {
            setError("expired", { message: "Sorry, but your token is expired. Ask admin for another URL." });
        }

    };

    if (errors.password?.message.includes('pattern')) {
        setError('password', {message: "Password must be 8 - 30 characters long, have at least one capital letter, a number and a special character [#$@!%&*?]"})
    }

    return(
        <Modal
            className={css.Modal}
            open
        >
            <Box className={css.Box}>
                <form onSubmit={handleSubmit(submit)} className={css.Form}>
                    <TextField
                        sx={{marginBottom: 2, width: 250}}
                        label="Password"
                        type={type ? 'text' : 'password'}
                        error={errors.password && true}
                        helperText={errors.password && `${errors.password.message}`}
                        {...register("password")}
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
                    <TextField
                        sx={{marginBottom: 2, width: 250}}
                        label="Confirm Password"
                        type={type ? 'text' : 'password'}
                        error={errors.confirmPassword && true}
                        helperText={errors.confirmPassword && `${errors.confirmPassword.message}`}
                        {...register("confirmPassword")}
                    />
                    {errors.expired &&
                        <p className={css.Error}>{errors.expired.message}
                            <br/>
                        <span
                            className={css.ToLoginButton}
                            onClick={() => navigate('/login')}
                        >
                           {'<- To login'}
                        </span>
                        </p>
                    }
                    <Button type="submit" variant="contained" sx={{fontWeight: "bold"}}>Save</Button>
                </form>
            </Box>
        </Modal>
    );
};

export {
    ActivateForm
};