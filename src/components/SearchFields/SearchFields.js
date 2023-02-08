import { useSearchParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import css from "./SearchFields.module.css";


const SearchFields = () => {
    const [ query, setQuery ] = useSearchParams();


    const handleChange = (e) => {

        if (e.target.value) {
            query.set(e.target.name, e.target.value);
        } else if (!e.target.value) {
            query.delete(e.target.name);
        }

        setQuery(query);

    };

    const courses = [' ', 'FE', 'FS', 'JCX', 'JSCX', 'PCX', 'QACX'];
    const formats = [' ', 'online', 'static'];
    const types = [' ', 'incubator', 'minimal', 'premium', 'pro', 'vip'];
    const statuses = [' ', 'Согласен', 'Не соласен', 'Дубляж', 'В работе', 'Новый'];
    const groups = [' ', 'qwerty', 'вреорео'];


    return(
        <div className={css.fields}>
            <TextField
                name="name"
                label="Name"
                variant="standard"
                size="small"
                value={ query.get('name') ? query.get('name') : '' }
                sx={{width: 120}}
                onChange={handleChange}
            />
            <TextField
                name="surname"
                label="Surname"
                variant="standard"
                size="small"
                value={ query.get('surname') ? query.get('surname') : '' }
                sx={{width: 150}}
                onChange={handleChange}
            />
            <TextField
                name="age"
                label="Age"
                variant="standard"
                size="small"
                value={ query.get('age') ? query.get('age') : '' }
                sx={{width: 80}}
                onChange={handleChange}
            />
            <TextField
                name="email"
                label="Email"
                type="email"
                size="small"
                value={ query.get('email') ? query.get('email') : '' }
                variant="standard" sx={{width: 210}}
                onChange={handleChange}
            />
            <TextField
                name="phone"
                label="Phone"
                type="tel"
                variant="standard"
                size="small"
                value={ query.get('phone') ? query.get('phone') : '' }
                sx={{width: 160}}
                onChange={handleChange}
            />
            <FormControl variant="standard" sx={{width: 120}}>
                <InputLabel id="select-course">Course</InputLabel>
                <Select
                    name='course'
                    defaultValue=''
                    size="small"
                    onChange={handleChange}
                    value={ query.get('course') ? query.get('course') : '' }
                >
                    {courses.map(course => <MenuItem value={ course === ' ' ? '' : course }>{course}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 180}}>
                <InputLabel id="select-course_format">Course Format</InputLabel>
                <Select
                    name='course_format'
                    defaultValue=''
                    size="small"
                    onChange={handleChange}
                    value={ query.get('course_format') ? query.get('course_format') : '' }
                >
                    {formats.map(format => <MenuItem value={ format === ' ' ? '' : format }>{format}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 180}}>
                <InputLabel id="select-course_format">Course Type</InputLabel>
                <Select
                    name='course_type'
                    defaultValue=''
                    size="small"
                    onChange={handleChange}
                    value={ query.get('course_type') ? query.get('course_type') : '' }
                >
                    {types.map(type => <MenuItem value={ type === ' ' ? '' : type }>{type}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 120}}>
                <InputLabel id="select-course_format">Status</InputLabel>
                <Select
                    name='status'
                    defaultValue=''
                    size="small"
                    onChange={handleChange}
                    value={ query.get('status') ? query.get('status') : '' }
                >
                    {statuses.map(status => <MenuItem value={ status === ' ' ? '' : status }>{status}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 120}}>
                <InputLabel id="select-course_format">Group</InputLabel>
                <Select
                    name='group'
                    defaultValue=''
                    size="small"
                    onChange={handleChange}
                    value={ query.get('group') ? query.get('group') : '' }
                >
                    {groups.map(group => <MenuItem value={ group === ' ' ? '' : group }>{group}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                name="created_at"
                type="date"
                label="Created at"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                value={ query.get('created_at') ? query.get('created_at') : '' }
                sx={{width: 180}}
                size="small"
                onChange={handleChange}
            />
        </div>
    );
};

export {
    SearchFields
};