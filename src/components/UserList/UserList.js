import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Button, Modal, TextField } from "@mui/material";

import css from './UserList.module.css';
import { style } from './muiStyle';
import { userActions } from "../../store";
import { adminService } from "../../services";
import { userValidator } from "../../validators";
import { User } from "../User/User";


const UserList = ({handleSnackOpen}) => {
    let { users } = useSelector(state => state.userReducer);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: joiResolver(userValidator.createValidator)
    });
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        dispatch(userActions.getAll());
    },
        [dispatch]);

    const handleOpen = () => setOpen(!open);

    const create = async (user) => {
        try {
            const { data } = await adminService.create(user);

            dispatch(userActions.getAll());
            setToken(data.actionToken);

            handleOpen();
        } catch (e) {
            setError("email", { message: e.response.data });
        }
    }


    return(
        <Box className={css.UserList}>
            <Button sx={style.Button} variant="contained" onClick={handleOpen}>Create</Button>
            {users.map(user => <User key={user._id} userData={user} actionToken={token} handleSnackOpen={handleSnackOpen}/>)}
            <Modal
                className={css.Modal}
                open={open}
                onClose={handleOpen}
            >
                <Box className={css.Box}>
                    <form className={css.Form} onSubmit={handleSubmit(create)}>
                        <TextField
                            sx={style.TextField}
                            label="Name"
                            error={errors.name && true}
                            helperText={errors.name && errors.name.message}
                            {...register('name')}
                        />
                        <TextField
                            sx={style.TextField}
                            className={css.TextField}
                            label="Surname"
                            error={errors.surname && true}
                            helperText={errors.surname && errors.surname.message}
                            {...register('surname')}
                        />
                        <TextField
                            sx={style.TextField}
                            className={css.TextField}
                            label="Email"
                            error={errors.email && true}
                            helperText={errors.email && errors.email.message}
                            {...register('email')}
                        />
                        <Box className={css.Buttons}>
                            <Button sx={style.Button} variant="outlined" onClick={handleOpen}>Cancel</Button>
                            <Button sx={style.Button} type="submit" variant="contained">Save</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export {
    UserList
};