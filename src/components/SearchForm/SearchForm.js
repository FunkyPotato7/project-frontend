import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileDownload from "js-file-download";
import format from "date-fns/format";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AssessmentTwoToneIcon from "@mui/icons-material/AssessmentTwoTone";
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";

import css from "./SearchForm.module.css";
import { courses, types, statuses, formats } from "../../configs";
import { paidActions } from "../../store";
import { paidService } from "../../services";
import { DateRangeSelect } from "../DateRangeSelect/DateRangeSelect";


const SearchForm = ({handleOpen}) => {
    const { groups } = useSelector(store => store.paidReducer);
    const [query, setQuery] = useSearchParams({page: '1', order: '-num'});
    const dispatch = useDispatch();

    const [dateValue, setDateValue] = useState(
        query.get('start_date') && query.get('end_date')
            ? `${format(new Date(query.get('start_date')), 'MM/dd/yyyy')} - ${format(new Date(query.get('end_date')), 'MM/dd/yyyy')}`
            : ''
    );
    const [my, setMy] = useState(true);

    useEffect(() => {
        dispatch(paidActions.getAllGroups());
    },
        [dispatch]);

    let timeout = null;

    const checkBoxChange = () => {
        setMy(!my);
    }

    const search = (name, value) => {
        query.set('page', '1');

        if (value) {
            query.set(name, value);
        } else if (!value) {
            query.delete(name);
        }
    };

    const handleSearchChange = async (e) => {
        let value = e.target.value;
        let name = e.target.name;

        clearTimeout(timeout);

        if (name === 'Created_At') {
            if (value?.length === 23) {
                const [startDate, endDate] = value.split(' - ');

                search('start_date', startDate);
                search('end_date', endDate);

                setQuery(query);
            } else if (value?.length < 23) {
                search('start_date', '');
                search('end_date', '');

                setQuery(query);
            }

        } else {

            search(name, value);

            if (name === 'name' || name === 'surname' || name === 'age' ||
                name === 'email' || name === 'phone' ) {

                timeout = setTimeout(() => {
                    setQuery(query);
                }, 1000);

            } else {
                setQuery(query);
            }

        }
    };

    const Reset = () => {
        setQuery('page=1');
        setDateValue('');
    }

    const download = async () => {
        const { data } = await paidService.export(query);
        FileDownload(data, "paid.xlsx");
    };

    return(
        <form className={css.Form} onChange={handleSearchChange}>
            <div className={css.Fields}>
                <TextField
                    name="name"
                    label="Name"
                    variant="standard"
                    size="small"
                    defaultValue={ query.get('name') }
                    sx={{width: 140}}
                />
                <TextField
                    name="surname"
                    label="Surname"
                    variant="standard"
                    size="small"
                    defaultValue={ query.get('surname') }
                    sx={{width: 140}}
                />
                <TextField
                    name="age"
                    label="Age"
                    variant="standard"
                    size="small"
                    defaultValue={ query.get('age') }
                    sx={{width: 80}}
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    size="small"
                    variant="standard"
                    defaultValue={ query.get('email') }
                    sx={{width: 210}}
                />
                <TextField
                    name="phone"
                    label="Phone"
                    type="tel"
                    variant="standard"
                    size="small"
                    defaultValue={ query.get('phone') }
                    sx={{width: 140}}
                />
                <FormControl variant="standard" sx={{width: 110}}>
                    <InputLabel id="select-course">Course</InputLabel>
                    <Select
                        name='course'
                        size="small"
                        value={ query.get('course') ? query.get('course') : '' }
                        onChange={handleSearchChange}
                    >
                        <MenuItem value={''}> </MenuItem>
                        {courses.map(course => <MenuItem key={course} value={ course }>{course}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course_format">Course Format</InputLabel>
                    <Select
                        name='course_format'
                        size="small"
                        value={ query.get('course_format') ? query.get('course_format') : '' }
                        onChange={handleSearchChange}
                    >
                        <MenuItem value={''}> </MenuItem>
                        {formats.map(format => <MenuItem key={format} value={ format }>{format}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course_format">Course Type</InputLabel>
                    <Select
                        name='course_type'
                        defaultValue=''
                        size="small"
                        value={ query.get('course_type') ? query.get('course_type') : '' }
                        onChange={handleSearchChange}
                    >
                        <MenuItem value={''}> </MenuItem>
                        {types.map(type => <MenuItem key={type} value={ type }>{type}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course_format">Status</InputLabel>
                    <Select
                        name='status'
                        size="small"
                        value={ query.get('status') ? query.get('status') : '' }
                        onChange={handleSearchChange}
                    >
                        <MenuItem value={''}> </MenuItem>
                        {statuses.map(status => <MenuItem key={status} value={ status }>{status}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course_format">Group</InputLabel>
                    <Select
                        name='group'
                        size="small"
                        value={ query.get('group') ? query.get('group') : '' }
                        onChange={handleSearchChange}
                    >
                        <MenuItem value={''}> </MenuItem>
                        {groups.map(({_id, name}) => <MenuItem key={_id} value={ name }>{name}</MenuItem>)}
                    </Select>
                </FormControl>
                <DateRangeSelect
                    dateValue={dateValue}
                    setDateValue={setDateValue}
                    defQuery={query}
                />
                <FormControlLabel
                    label="My"
                    control={
                        <Checkbox
                            name="my"
                            value={ my ? 'true' : '' }
                            checked={ !!query.get('my') }
                            sx={{marginLeft: 5}}
                            onChange={checkBoxChange}/>
                    }
                />
            </div>
            <div className={css.Buttons}>
                <Button type="reset" onClick={Reset}><ClearAllIcon/></Button>
                <Button onClick={handleOpen}><AssessmentTwoToneIcon/></Button>
                <Button onClick={download}><FileDownloadTwoToneIcon/></Button>
            </div>
        </form>
    );
};

export {
    SearchForm
};