import { useSearchParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import css from "./SearchFields.module.css";


const SearchFields = () => {
    const [ query, setQuery ] = useSearchParams();

    //phone input, tfoot err, id`s, clear code, comment window

    const handleChange = (e) => {

        if (e.target.value) {
            query.set(e.target.name, e.target.value);
        } else if (!e.target.value) {
            query.delete(e.target.name);
        }

        setQuery(query);

    };


    return(
        <div className={css.fields}>
            <TextField name="name" label="Name" variant="standard" value={ query.get('name') ? query.get('name') : '' } sx={{width: 120}} onChange={handleChange}/>
            <TextField name="surname" label="Surname" variant="standard" value={ query.get('surname') ? query.get('surname') : '' } sx={{width: 150}} onChange={handleChange}/>
            <TextField name="age" label="Age" variant="standard" value={ query.get('age') ? query.get('age') : '' } sx={{width: 80}} onChange={handleChange}/>
            <TextField name="email"  label="Email" type="email" value={ query.get('email') ? query.get('email') : '' } variant="standard" sx={{width: 210}} onChange={handleChange}/>
            <TextField name="phone" label="Phone" type="tel" variant="standard" value={ query.get('phone') ? query.get('phone') : '' } sx={{width: 160}} onChange={handleChange}/>
            <FormControl variant="standard" sx={{width: 120}}>
                <InputLabel id="simple-select-course">Course</InputLabel>
                <Select
                    name='course'
                    defaultValue=''
                    onChange={handleChange}
                    value={ query.get('course') ? query.get('course') : '' }
                >
                    <MenuItem value={''}> </MenuItem>
                    <MenuItem value={'FE'} >FE</MenuItem>
                    <MenuItem value={'FS'}>FS</MenuItem>
                    <MenuItem value={'JCX'}>JCX</MenuItem>
                    <MenuItem value={'JSCX'}>JSCX</MenuItem>
                    <MenuItem value={'PCX'}>PCX</MenuItem>
                    <MenuItem value={'QACX'}>QACX</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 180}}>
                <InputLabel id="simple-select-course_format">Course Format</InputLabel>
                <Select
                    name='course_format'
                    defaultValue=''
                    onChange={handleChange}
                    value={ query.get('course_format') ? query.get('course_format') : '' }
                >
                    <MenuItem value=''> </MenuItem>
                    <MenuItem value={'online'}>online</MenuItem>
                    <MenuItem value={'static'}>static</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 180}}>
                <InputLabel id="simple-select-course_format">Course Type</InputLabel>
                <Select
                    name='course_type'
                    defaultValue=''
                    onChange={handleChange}
                    value={ query.get('course_type') ? query.get('course_type') : '' }
                >
                    <MenuItem value=''> </MenuItem>
                    <MenuItem value={'incubator'}>incubator</MenuItem>
                    <MenuItem value={'minimal'}>minimal</MenuItem>
                    <MenuItem value={'premium'}>premium</MenuItem>
                    <MenuItem value={'pro'}>pro</MenuItem>
                    <MenuItem value={'vip'}>vip</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 120}}>
                <InputLabel id="simple-select-course_format">Status</InputLabel>
                <Select
                    name='status'
                    defaultValue=''
                    onChange={handleChange}
                    value={ query.get('status') ? query.get('status') : '' }
                >
                    <MenuItem value=''> </MenuItem>
                    <MenuItem value={'Соласен'}>Соласен</MenuItem>
                    <MenuItem value={'Не соласен'}>Не соласен</MenuItem>
                    <MenuItem value={'Дубляж'}>Дубляж</MenuItem>
                    <MenuItem value={'В работе'}>В работе</MenuItem>
                    <MenuItem value={'Новый'}>Новый</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 120}}>
                <InputLabel id="simple-select-course_format">Group</InputLabel>
                <Select
                    name='group'
                    defaultValue=''
                    onChange={handleChange}
                    value={ query.get('group') ? query.get('group') : '' }
                >
                    <MenuItem value=''> </MenuItem>
                    <MenuItem value={'qwerty'}>qwerty</MenuItem>
                    <MenuItem value={'вреорео'}>вреорео</MenuItem>
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
                onChange={handleChange}
            />
        </div>
    );
};

export {
    SearchFields
};