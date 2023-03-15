import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Modal, TextField } from "@mui/material";

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

    const submit = async ({password, confirmPassword}) => {
        try {
            if (password === confirmPassword) {
                authService.activate(location.pathname.slice(10), password);
                navigate('/login');
            } else if (password !== confirmPassword) {
                setError("confirmPassword", { message: "Passwords must be same" });
            }
        } catch (e) {
            setError("expired", { message: "Expired token" });
        }

    };

    return(
        <Modal
            className={css.Modal}
            open
        >
            <Box className={css.Box}>
                <form onSubmit={handleSubmit(submit)} className={css.Form}>
                    <TextField
                        className={css.TextField}
                        label="Password"
                        error={errors.password && true}
                        helperText={errors.password && `${errors.password.message}`}
                        {...register("password")}
                    />
                    <TextField
                        className={css.TextField}
                        label="Confirm Password"
                        error={errors.confirmPassword && true}
                        helperText={errors.confirmPassword && `${errors.confirmPassword.message}`}
                        {...register("confirmPassword")}
                    />
                    {errors.expired && errors.expired.message}
                    <Button type="submit" variant="contained" sx={{fontWeight: "bold"}}>Save</Button>
                </form>
            </Box>
        </Modal>
    );
};

export {
    ActivateForm
};