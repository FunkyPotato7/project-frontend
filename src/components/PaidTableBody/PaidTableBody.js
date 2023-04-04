import {useEffect, useState} from 'react';
import { format, parseISO } from 'date-fns';
import { TableBody, TableCell, TableRow } from "@mui/material";

import { CollapsedMenu } from "../CollapsedMenu/CollapsedMenu";


const PaidTableBody = (props) => {
    let { value, handleSnackOpen } = props

    const [paid, setPaid] = useState([]);
    const [collapse, setCollapse] = useState(false);

    useEffect(() => {
        setPaid(value);
    },
        [value]);

    const collapseHandler = () => {
        setCollapse(!collapse)
    };

    return (
        <TableBody>
                <TableRow hover onClick={() => collapseHandler()}>
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
                    <TableCell>{paid.group ? paid.group.name : 'null'}</TableCell>
                    <TableCell>{paid.created_at ? format(parseISO(paid.created_at),'d MMM yyyy') : 'null'}</TableCell>
                    <TableCell>{paid.manager ? paid.manager.name : 'null'}</TableCell>
                </TableRow>
            <CollapsedMenu paid={paid} setPaid={setPaid} collapse={collapse} handleSnackOpen={handleSnackOpen} />
        </TableBody>
    );
};

export {
    PaidTableBody
};
