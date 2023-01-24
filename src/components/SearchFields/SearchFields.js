import { useSearchParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import css from "./SearchFields.module.css"


const SearchFields = () => {
    const [ query, setQuery ] = useSearchParams();

        // let someValue; //maybe fix, date input, maybe sorting from query, you committed new changes on your back side
        //
        // const queryChanger = () => {
        //     query.forEach((value, key) => {
        //         console.log(`Value: ${value}, Key: ${key}`)
        //         someValue = {...someValue, [key]: value}
        //     });
        // }
        //
        // queryChanger()

    const handleChange = (e) => {

        if (e.target.value) {
            query.set(e.target.name, e.target.value);
        } else if (!e.target.value) {
            query.delete(e.target.name);
        }

        setQuery(prev => query);

    }


    return(
        <div className={css.fields}>
            <form>
                <TextField name="name" label="Name" variant="standard" sx={{width: 120}} onChange={handleChange}/>
                <TextField name="surname"  label="Surname" variant="standard" sx={{width: 150}} onChange={handleChange}/>
                <TextField name="age" label="Age" variant="standard" sx={{width: 100}} onChange={handleChange}/>
                <TextField name="email"  label="Email" variant="standard" sx={{width: 230}} onChange={handleChange}/>
                <TextField name="phone" label="Phone" variant="standard" sx={{width: 180}} onChange={handleChange}/>
            </form>
            <FormControl variant="standard" sx={{width: 100}}>
                <InputLabel id="simple-select-course" sx={{fontSize: 12}}>Course</InputLabel>
                <Select
                    name='course'
                    defaultValue=''
                    onChange={handleChange}
                >
                    <MenuItem value={''}> </MenuItem>
                    <MenuItem value={'FE'}>FE</MenuItem>
                    <MenuItem value={'FS'}>FS</MenuItem>
                    <MenuItem value={'JCX'}>JCX</MenuItem>
                    <MenuItem value={'JSCX'}>JSCX</MenuItem>
                    <MenuItem value={'PCX'}>PCX</MenuItem>
                    <MenuItem value={'QACX'}>QACX</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 120}}>
                <InputLabel id="simple-select-course_format" sx={{fontSize: 12}}>Course_format</InputLabel>
                <Select
                    name='course_format'
                    defaultValue=''
                    onChange={handleChange}
                >
                    <MenuItem value=''> </MenuItem>
                    <MenuItem value={'online'}>online</MenuItem>
                    <MenuItem value={'static'}>static</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{width: 120}}>
                <InputLabel id="simple-select-course_format" sx={{fontSize: 12}}>Course_type</InputLabel>
                <Select
                    name='course_type'
                    defaultValue=''
                    onChange={handleChange}
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
                <InputLabel id="simple-select-course_format" sx={{fontSize: 12}}>Status</InputLabel>
                <Select
                    name='status'
                    defaultValue=''
                    onChange={handleChange}
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
                <InputLabel id="simple-select-course_format" sx={{fontSize: 12}}>Group</InputLabel>
                <Select
                    name='group'
                    defaultValue=''
                    onChange={handleChange}
                >
                    <MenuItem value=''> </MenuItem>
                    <MenuItem value={'qwerty'}>qwerty</MenuItem>
                    <MenuItem value={'вреорео'}>вреорео</MenuItem>
                </Select>
            </FormControl>
            <TextField name="created_at" type="date" label="Created at"  variant="standard" sx={{width: 180}}/>
        </div>
    )
};

export {
    SearchFields
};