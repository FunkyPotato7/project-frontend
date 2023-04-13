import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from "react-redux";
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
import { courses, types, statuses, formats } from "../../configs";
import { paidValidator } from "../../validators";
import { groupsService, paidService } from "../../services";
import { paidActions } from "../../store";
import { Comment } from "../Comment/Comment";


const CollapsedMenu = (props) => {
    const { collapse, paid, setPaid, handleSnackOpen } = props;

    const { user } = useSelector(store => store.userReducer);
    const { groups } = useSelector(store => store.paidReducer);
    const { register: createGroupForm, handleSubmit: createHandleSubmit, setValue: setCreateValue } = useForm();
    const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm({
        mode: "onSubmit",
        resolver: joiResolver(paidValidator)
    });
    const dispatch = useDispatch();

    const [comments, setComments] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        setComments(paid.comments);
        setSelectedGroup(paid.group ? paid.group._id : '');
    },
        [paid.comments, paid.group]);


    const handleOpenUpdate = () => {
        setValue('comment', '');
        setOpenUpdate(!openUpdate);
    }

    const handleOpenCreate = () => {
        setSelectedGroup('');
        setCreateValue('name', '');
        setOpenCreate(!openCreate);
    }

    const update = async (info) => {
        if (info.comment) {
            info.status = 'In work';
        }

        if (info.status === '') {
            info.status = null;
        }

        const { data } = await paidService.update(paid._id, {...info});

        setPaid({id: paid.id, ...data});
        setValue('comment', '');

        if (!info.comment) {
            handleOpenUpdate();
            handleSnackOpen();
        }
    };

    const createGroup = async (name) => {
        const { data } = await groupsService.create(name);
        await dispatch(paidActions.getAllGroups());

        setSelectedGroup(data._id);
        setOpenCreate(false);
    };

    const handleChange = (event) => {
        setSelectedGroup(event.target.value);
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
                                        disabled={paid.manager?._id && user.profile?._id !== paid.manager?._id}
                                        {...register('comment')}
                                    />
                                </form>
                            </div>
                            <Button sx={{borderRadius: 50, margin: 1}} disabled={!!(user?.profile?._id !== paid.manager?._id && paid.manager?._id)} onClick={handleOpenUpdate}><ModeEditIcon/></Button>
                            <Modal
                                className={css.Modal}
                                open={openUpdate}
                                onClose={handleOpenUpdate}
                            >
                                <Box className={css.ModalBox}>
                                    <form className={css.Form} onSubmit={handleSubmit(update)}>
                                        <Box className={css.Header}>
                                            <FolderSharedIcon sx={{fontSize: 65, color: "#1976d2"}}/>
                                            <Box className={css.HeaderFields}>
                                                <FormControl>
                                                    <InputLabel>Group</InputLabel>
                                                        <Select
                                                            className={css.Select}
                                                            label="Group"
                                                            value={ selectedGroup }
                                                            {...register("group", {onChange: handleChange})}
                                                        >
                                                            <MenuItem value={''}> </MenuItem>
                                                            <MenuItem value={'create'} onClick={handleOpenCreate}>Create Group</MenuItem>
                                                            {groups.map(({_id, name}) => <MenuItem key={_id} value={ _id }>{name}</MenuItem>)}
                                                        </Select>
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        className={css.Select}
                                                        label="Status"
                                                        defaultValue={ !paid.status || paid.status === 'New'
                                                            ? 'In work' : paid.status }
                                                        {...register('status')}
                                                    >
                                                        <MenuItem value={''}> </MenuItem>
                                                        {statuses.map(status => <MenuItem key={status} value={ status }>{status}</MenuItem>)}</Select>
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
                                                    helperText={errors.email && errors.email?.message.includes('pattern') ?
                                                        'Wrong email pattern' :
                                                        errors.email?.message
                                                    }
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
                                                    <InputLabel>Course</InputLabel>
                                                    <Select
                                                        sx={{width: 250, marginBottom: 2}}
                                                        label="Course"
                                                        defaultValue={paid.course}
                                                        {...register('course')}
                                                    >
                                                        <MenuItem value={''}> </MenuItem>
                                                        {courses.map(course => <MenuItem key={course} value={ course }>{course}</MenuItem>)}</Select>
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel>Course Format</InputLabel>
                                                    <Select
                                                        sx={{width: 250, marginBottom: 2}}
                                                        label="Course Format"
                                                        defaultValue={paid.course_format}
                                                        {...register('course_format')}
                                                    >
                                                        <MenuItem value={''}> </MenuItem>
                                                        {formats.map(format => <MenuItem key={format} value={ format }>{format}</MenuItem>)}</Select>
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel>Course Type</InputLabel>
                                                    <Select
                                                        sx={{width: 250, marginBottom: 2}}
                                                        label="Course Type"
                                                        defaultValue={paid.course_type}
                                                        {...register('course_type')}
                                                    >
                                                        <MenuItem value={''}> </MenuItem>
                                                        {types.map(type => <MenuItem key={type} value={ type }>{type}</MenuItem>)}</Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                        <Box className={css.Buttons}>
                                            <Button sx={{fontWeight: "bold"}} variant="outlined" onClick={handleOpenUpdate}>Cancel</Button>
                                            <Button sx={{fontWeight: "bold"}} variant="contained" type="submit">Save</Button>
                                        </Box>
                                    </form>
                                </Box>
                            </Modal>
                            <Modal
                                className={css.Modal}
                                open={openCreate}
                                onClose={handleOpenCreate}
                            >
                                <Box className={css.ModalBox}>
                                    <form onSubmit={createHandleSubmit(createGroup)}>
                                        <TextField
                                            sx={{width: 250, marginBottom: 2}}
                                            label="Group Name"
                                            autoFocus={true}
                                            {...createGroupForm('name')}
                                        />
                                        <div className={css.Buttons}>
                                            <Button variant="outlined" onClick={handleOpenCreate}>Cancel</Button>
                                            <Button sx={{fontWeight: "bold"}} variant="contained" type="submit">Create</Button>
                                        </div>
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
