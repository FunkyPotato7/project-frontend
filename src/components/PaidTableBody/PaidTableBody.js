import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { TableBody, TableCell, TableRow } from "@mui/material";

import { PaidMenu } from "../PaidMenu/PaidMenu";


const PaidTableBody = (props) => {
    const { paid } = props

    const [open, setOpen] = useState(false);


    const handler = () => {
        setOpen(!open)
    };


    return (
        <TableBody>
                <TableRow hover onClick={() => handler()}>
                    <TableCell>{paid.id}</TableCell>
                    <TableCell>{paid.name ? paid.name : 'null'}</TableCell>
                    <TableCell>{paid.surname ? paid.surname : 'null'}</TableCell>
                    <TableCell>{paid.age ? paid.age : 'null'}</TableCell>
                    <TableCell>{paid.email ? paid.email : 'null'}</TableCell>
                    <TableCell>{paid.phone ? paid.phone : 'null'}</TableCell>
                    <TableCell>{paid.course ? paid.course : 'null'}</TableCell>
                    <TableCell>{paid.course_format ? paid.course_format : 'null'}</TableCell>
                    <TableCell>{paid.course_type ? paid.course_type : 'null'}</TableCell>
                    <TableCell>{paid.status ? paid.status : 'null'}</TableCell>
                    <TableCell>{paid.sum ? paid.sum : 'null'}</TableCell>
                    <TableCell>{paid.already_paid ? paid.already_paid : 'null'}</TableCell>
                    <TableCell>{paid.group ? paid.group : 'null'}</TableCell>
                    <TableCell>{paid.created_at ? format(parseISO(paid.created_at),'d MMM yyyy') : 'null'}</TableCell>
                </TableRow>
            <PaidMenu paid={paid} open={open}/>
        </TableBody>
    );
};

export {
    PaidTableBody
};
