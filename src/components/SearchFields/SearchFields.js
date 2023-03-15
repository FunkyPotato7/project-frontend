import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

import css from "./SearchFields.module.css";
import { courses, types, statuses, groups, formats } from "../../configs";

const SearchFields = () => {
    const [ query, setQuery ] = useSearchParams();

    const [my, setMy] = useState(true);

    const checkBoxChange = () => {
        setMy(!my);
    }

    const handleChange = (e) => {

        if (e.target.value) {
            query.set(e.target.name, e.target.value);
        } else if (!e.target.value) {
            query.delete(e.target.name);
        }

        setQuery(query);

    };


    return(
        <div className={css.fields} onChange={handleChange}>
                <TextField
                    name="name"
                    label="Name"
                    variant="standard"
                    size="small"
                    value={ query.get('name') ? query.get('name') : '' }
                    sx={{width: 140}}
                />
                <TextField
                    name="surname"
                    label="Surname"
                    variant="standard"
                    size="small"
                    value={ query.get('surname') ? query.get('surname') : '' }
                    sx={{width: 140}}
                />
                <TextField
                    name="age"
                    label="Age"
                    variant="standard"
                    size="small"
                    value={ query.get('age') ? query.get('age') : '' }
                    sx={{width: 80}}
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    size="small"
                    value={ query.get('email') ? query.get('email') : '' }
                    variant="standard" sx={{width: 210}}
                />
                <TextField
                    name="phone"
                    label="Phone"
                    type="tel"
                    variant="standard"
                    size="small"
                    value={ query.get('phone') ? query.get('phone') : '' }
                    sx={{width: 140}}
                />
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course">Course</InputLabel>
                    <Select
                        name='course'
                        defaultValue=''
                        size="small"
                        value={ query.get('course') ? query.get('course') : '' }
                        onChange={handleChange}
                    >
                        {courses.map(course => <MenuItem key={course} value={ course === ' ' ? '' : course }>{course}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course_format">Course Format</InputLabel>
                    <Select
                        name='course_format'
                        defaultValue=''
                        size="small"
                        value={ query.get('course_format') ? query.get('course_format') : '' }
                        onChange={handleChange}
                    >
                        {formats.map(format => <MenuItem key={format} value={ format === ' ' ? '' : format }>{format}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course_format">Course Type</InputLabel>
                    <Select
                        name='course_type'
                        defaultValue=''
                        size="small"
                        value={ query.get('course_type') ? query.get('course_type') : '' }
                        onChange={handleChange}
                    >
                        {types.map(type => <MenuItem key={type} value={ type === ' ' ? '' : type }>{type}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course_format">Status</InputLabel>
                    <Select
                        name='status'
                        defaultValue=''
                        size="small"
                        value={ query.get('status') ? query.get('status') : '' }
                        onChange={handleChange}
                    >
                        {statuses.map(status => <MenuItem key={status} value={ status === ' ' ? '' : status }>{status}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{width: 140}}>
                    <InputLabel id="select-course_format">Group</InputLabel>
                    <Select
                        name='group'
                        defaultValue=''
                        size="small"
                        value={ query.get('group') ? query.get('group') : '' }
                        onChange={handleChange}
                    >
                        {groups.map(group => <MenuItem key={group} value={ group === ' ' ? '' : group }>{group}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField
                    name="created_at"
                    type="date"
                    label="Created at"
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    value={ query.get('created_at') ? query.get('created_at') : '' }
                    sx={{width: 140}}
                    size="small"
                />
            <FormControlLabel
                control={
                <Checkbox
                    name="my"
                    sx={{marginLeft: 5}}
                    value={ my ? 'true' : '' }
                    checked={ !!query.get('my') }
                    onChange={checkBoxChange}/>
                } label="My"
            />
        </div>
    );
};

export {
    SearchFields
};