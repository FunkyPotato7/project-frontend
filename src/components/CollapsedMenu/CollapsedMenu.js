import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { useSelector } from "react-redux";
import {
    Box,
    Button,
    Collapse,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TableCell,
    TableRow,
    TextField
} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

import css from './CollapsedMenu.module.css';
import { courses, types, statuses, groups, formats } from "../../configs";
import { paidValidator } from "../../validators";
import { Comment } from "../Comment/Comment";
import { paidService } from "../../services";


const CollapsedMenu = (props) => {
    const { collapse, paid, setPaid, handleSnackOpen } = props;

    const { user } = useSelector(store => store.userReducer);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: joiResolver(paidValidator)
    });

    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setComments(paid.comments);
    },
        [paid.comments]);


    const handleOpen = () => setOpen(!open);

    const update = async (info) => {
        console.log(info);
        if (info.comment) {
            info.status = 'In work';
        }

        if (info.status === '') {
            info.status = null;
        }

        const { data } = await paidService.update(paid._id, {...info});

        setPaid({id: paid.id, ...data});
        setValue('comment', '');
        setOpen(false);
        handleSnackOpen();
    };

    return(
        <TableRow>
            <TableCell sx={{padding: 0}} colSpan={15}>
                <Collapse in={collapse} timeout="auto" unmountOnExit>
                    <Box className={css.MainBox}>
                        <div className={css.Info}>
                            <h4>Message: {paid.msg ? paid.msg : 'Empty'}</h4>
                            {paid.utm &&
                                <div>
                                    <hr/>
                                    <h4>UTM: {paid.utm}</h4>
                                </div>
                            }
                        </div>
                        <div className={css.CommentBox}>
                            <div className={css.Comments}>
                                {comments?.map((comment) => <Comment key={comment._id} item={comment}/>)}
                                <form onSubmit={handleSubmit(update)}>
                                    <TextField
                                        className={css.TextField}
                                        label="Comment"
                                        error={errors.comment && true}
                                        helperText={errors.comment && errors.name.message}
                                        disabled={paid.manager?._id && user.profile._id !== paid.manager?._id}
                                        {...register('comment')}
                                    />
                                </form>
                            </div>
                            <Button className={css.updateBtn} sx={{borderRadius: 50, margin: 1}} disabled={!!(user.profile?._id !== paid.manager?._id && paid.manager?._id)} onClick={handleOpen}><ModeEditIcon/></Button>
                            <Modal
                                className={css.Modal}
                                open={open}
                                onClose={handleOpen}
                            >
                                <Box className={css.ModalBox}>
                                    <form className={css.Form} onSubmit={handleSubmit(update)}>
                                        <Box className={css.Header}>
                                            <FolderSharedIcon sx={{fontSize: 65, color: "#1976d2"}}/>
                                            <Box className={css.HeaderFields}>
                                                <FormControl>
                                                    <InputLabel id="select-group">Group</InputLabel>
                                                    <Select
                                                        className={css.Select}
                                                        label="Group"
                                                        defaultValue={ paid.group ? paid.group : '' }
                                                        {...register('group')}
                                                    >{groups.map(group => <MenuItem key={group} value={ group === ' ' || null ? '' : group }>{group}</MenuItem>)}</Select>
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel id="select-status">Status</InputLabel>
                                                    <Select
                                                        className={css.Select}
                                                        label="Status"
                                                        defaultValue={ !paid.status || paid.status === 'New'
                                                            ? 'In work' : paid.status }
                                                        {...register('status')}
                                                    >{statuses.map(status => <MenuItem key={status} value={ status === ' ' || null ? '' : status }>{status}</MenuItem>)}</Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                        <Box className={css.Wrapper}>
                                            <Box className={css.Fields}>
                                                <TextField
                                                    sx={{width: 250, marginBottom: 2}}
                                                    label="Name"
                                                    error={errors.name && true}
                                                    helperText={errors.name && errors.name.message}
                                                    defaultValue={paid.name}
                                                    {...register('name')}
                                                />
                                                <TextField
                                                    sx={{width: 250, marginBottom: 2}}
                                                    label="Surname"
                                                    error={errors.surname && true}
                                                    helperText={errors.surname && errors.surname.message}
                                                    defaultValue={paid.surname}
                                                    {...register('surname')}
                                                />
                                                <TextField
                                                    sx={{width: 250, marginBottom: 2}}
                                                    label="Email"
                                                    error={errors.email && true}
                                                    helperText={errors.email && errors.email.message}
                                                    defaultValue={paid.email}
                                                    {...register('email')}
                                                />
                                                <TextField
                                                    sx={{width: 250, marginBottom: 2}}
                                                    label="Phone"
                                                    error={errors.phone && true}
                                                    helperText={errors.phone && errors.phone.message}
                                                    defaultValue={paid.phone}
                                                    {...register('phone')}
                                                />
                                                <TextField
                                                    sx={{width: 250, marginBottom: 2}}
                                                    label="Age"
                                                    error={errors.age && true}
                                                    helperText={errors.age && errors.age.message}
                                                    defaultValue={paid.age}
                                                    {...register('age')}
                                                />
                                            </Box>
                                            <Box className={css.Fields}>
                                                <TextField
                                                    sx={{width: 250, marginBottom: 2}}
                                                    label="Sum"
                                                    error={errors.sum && true}
                                                    helperText={errors.sum && errors.sum.message}
                                                    defaultValue={paid.sum}
                                                    {...register('sum')}
                                                />
                                                <TextField
                                                    sx={{width: 250, marginBottom: 2}}
                                                    label="Already Paid"
                                                    error={errors.already_paid && true}
                                                    helperText={errors.already_paid && errors.already_paid.message}
                                                    defaultValue={paid.already_paid}
                                                    {...register('already_paid')}
                                                />
                                                <FormControl>
                                                    <InputLabel id="select-course">Course</InputLabel>
                                                    <Select
                                                        sx={{width: 250, marginBottom: 2}}
                                                        label="Course"
                                                        defaultValue={paid.course}
                                                        {...register('course')}
                                                    >{courses.map(course => <MenuItem key={course} value={ course === ' ' || null ? '' : course }>{course}</MenuItem>)}</Select>
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel id="select-format">Course Format</InputLabel>
                                                    <Select
                                                        sx={{width: 250, marginBottom: 2}}
                                                        label="Course Format"
                                                        defaultValue={paid.course_format}
                                                        {...register('course_format')}
                                                    >{formats.map(format => <MenuItem key={format} value={ format === ' ' || null ? '' : format }>{format}</MenuItem>)}</Select>
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel id="select-type">Course Type</InputLabel>
                                                    <Select
                                                        sx={{width: 250, marginBottom: 2}}
                                                        label="Course Type"
                                                        defaultValue={paid.course_type}
                                                        {...register('course_type')}
                                                    >{types.map(type => <MenuItem key={type} value={ type === ' ' || null ? '' : type }>{type}</MenuItem>)}</Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                        <Box className={css.Buttons}>
                                            <Button sx={{fontWeight: "bold"}} variant="outlined" onClick={handleOpen}>Cancel</Button>
                                            <Button sx={{fontWeight: "bold"}} variant="contained" type="submit">Save</Button>
                                        </Box>
                                    </form>
                                </Box>
                            </Modal>
                        </div>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export {
    CollapsedMenu
};
